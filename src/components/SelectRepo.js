import React, { Component } from 'react';
import { connect } 			from 'react-redux';

class SelectRepo extends Component{

	//Ajax para carregar os repositorios
	componentDidMount(){
		const { loadRepo } = this.props;
		loadRepo();
	}

	searchRepo( e ){
			
		let search 		= e.target.value,
			ocultados 	= 0,
			repos 		= document.querySelectorAll('.options li');

			//Transforma tudo em lower case para facilitar a comparação
			search = search.toLowerCase();

			for ( let i = 0; i < repos.length; i++ ) {
				
				if ( repos[i].innerHTML.toLowerCase().indexOf( search ) > -1 ) {
					repos[i].style.display = "";
				} else {
					repos[i].style.display = "none";
					ocultados++;
				}

			}

			//Verifica se há li sendo exibida

			console.log( ocultados );
			console.log( repos.length );

			if( ocultados >= repos.length )
				document.querySelectorAll('.options li.empty')[0].style.display = "block";
			else
				document.querySelectorAll('.options li.empty')[0].style.display = "none";

	}

	render(){
		const { openDropdown, openRepo, isLoadRepo, repositories, getStatisRepo, curRepo, chart } = this.props;

		if( !isLoadRepo ){
			return(
				<div className="fakeSelect">
					<div className="viewAction" onClick={openRepo.bind( this, openDropdown )}>
						<div className="arrow"><i className="fas fa-angle-down"></i></div>
						<div className="selected">{curRepo}</div>
					</div>
					<div className="boxDropdown" style={{ display: openDropdown }}>
						<ul className="options">
							<li>Carregando repositórios, aguarde...</li>
						</ul>
					</div>
				</div>
			);
		}

		return(
			<div className="fakeSelect">
				<div className="viewAction" onClick={openRepo.bind( this, openDropdown )}>
					<div className="arrow"><i className="fas fa-angle-down"></i></div>
					<div className="selected">{curRepo}</div>
				</div>
				<div className="boxDropdown" style={{ display: openDropdown }}>
					<div className="serachBox">
						<i className="fas fa-search"></i> <input type="texte" placeholder="Buscar..." onKeyUp={this.searchRepo} />
					</div>
					<ul className="options">
						<li className="empty">Nada encontrado.</li>
						{	
							repositories.map( function( repository ){
								return (
									<li key={repository.id} onClick={getStatisRepo.bind( this, repository, chart )} >{repository.name}</li>
								);
							})
						}
					</ul>
				</div>
			</div>
		);
	}
}

//Envia novo estado
const mapStateToProps = state => {
	return {
		openDropdown: 	state.openDropdown,
		isLoadRepo: 	state.isLoadRepo,
		repositories: 	state.repositories,
		curRepo: 		state.curRepo,
		starsCount: 	state.starsCount,
		forkCount: 		state.forkCount,
		contribsCount: 	state.contribsCount,
		showLoader: 	state.showLoader,
		chart: 			state.chart,
		urlChart: 		state.urlChart
	}
}

//Actions
const mapDispatchToProps = (dispatch) => {
	return {
		openRepo: ( flag ) => {
			dispatch({ type: 'OPEN_DROPDOWN', payload: ( flag == 'block' ? 'none' : 'block' ) });
		},
		loadRepo: () => {
			fetch( 'https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=200' )
			.then( res => res.json() )
			.then(
				( result ) => {
					dispatch({ type: 'LOAD_REPOSITORIES', payload: result.items });
				}
			);
		},
		getStatisRepo: ( repository, chart ) => {

			dispatch({ type: 'OPEN_DROPDOWN', payload: 'none' });
			dispatch({ type: 'SET_REPOSITORY', payload: repository.name });
			dispatch({ type: 'SHOW_LOADER', payload: false });

			fetch( `https://api.github.com/repos/globocom/${repository.name}/stats/contributors` )
			.then( res => res.json() )
			.then(
				( result ) => {

					//Carrega novo estado para as estatísticas
					dispatch({ 
						type: 		'SET_STATICS',
						stars: 		repository.stargazers_count,
						fork: 		repository.forks_count,
						contribs: 	( result.length > 0 ? result.length : 0 ),
						//loader: 	true
					});

					//Monta o gráfico
					fetch( `https://api.github.com/repos/globocom/${repository.name}/commits?per_page=999` )
					.then( res => res.json() )
					.then(
						( result ) => {

							//Monta o gráfico
							let months		= [ 
									'Jan', 'Fev', 'Mar', 'Abr', 
									'Mai', 'Jun', 'Jul', 'Ago', 
									'Set', 'Out', 'Nov', 'Dez' 
								],
								arValores 	= [],
								chxl 		= '1:|',
								chd 		= 't:';

								//Popula array com a linha do tempo de commits ( mes / ano );
								result.map( function( commit ){

									let dateCommit 	= new Date( commit.commit.committer.date ),
										key 		= dateCommit.getFullYear() + '-' + ( dateCommit.getMonth() + 1 );

										arValores[key] = ( arValores[key] == undefined ? 1 : arValores[key] + 1 );

								});

								//Com base na linha do tempo, monta o grafico, com os ultimos 12 meses com base no ultimo commit
								let nextDate = '';

								for ( let i = 1; i <= 12; i++ ) {

									if( nextDate == '' )
										nextDate = Object.keys(arValores)[0];

									let data = new Date( nextDate );

									//Adiciona meses no eixo X
									chxl += months[data.getMonth()] + '/'+ data.getFullYear() +'|';

									//Adiciona o valor do mês
									chd += ( arValores[nextDate] != undefined ? arValores[nextDate] : 0 ) + ( i != 12 ? ',' : '' );

									//Pega o próximo mês
									data = new Date( nextDate );
									data.setMonth( data.getMonth() - 1 );
									
									nextDate = data.getFullYear() + '-' + ( data.getMonth() + 1 );
								}

								let url 			= '',
									newChart 		= chart;
									newChart.chxl 	= chxl;
									newChart.chd 	= chd;

								//Monta a URL do gráfico
								for( let key in newChart ){
									url += key + '=' + ( newChart[key] != undefined ? newChart[key] : '' ) + '&';
								}

								//Remove o Loader e exibe as informações
								dispatch({ type: 'RENDER_CHART_URL', payload: url });
								dispatch({ type: 'SHOW_LOADER', payload: true });

						}
					);

				}
			);

		}
	}
}

//Export
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SelectRepo);