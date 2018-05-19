import React, { Component } from 'react';
import { connect } 			from 'react-redux';

class SelectRepo extends Component{

	//Ajax para carregar os repositorios
	componentDidMount(){
		const { loadRepo } = this.props;
		loadRepo();
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
					<ul className="options" style={{ display: openDropdown }}>
						<li>Carregando repositórios, aguarde...</li>
					</ul>
				</div>
			);
		}

		return(
			<div className="fakeSelect">
				<div className="viewAction" onClick={openRepo.bind( this, openDropdown )}>
					<div className="arrow"><i className="fas fa-angle-down"></i></div>
					<div className="selected">{curRepo}</div>
				</div>
				<ul className="options" style={{ display: openDropdown }}>
					{	
						repositories.map( function( repository ){
							return (
								<li key={repository.id} onClick={getStatisRepo.bind( this, repository, chart )} >{repository.name}</li>
							);
						})
					}
				</ul>
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
			fetch( 'https://api.github.com/users/globocom/repos?sort=stars:desc&per_page=999' )
			.then( res => res.json() )
			.then(
				( result ) => {
					dispatch({ type: 'LOAD_REPOSITORIES', payload: result });
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
					let months		= [ 
							'Jan', 'Fev', 'Mar', 'Abr', 
							'Mai', 'Jun', 'Jul', 'Ago', 
							'Set', 'Out', 'Nov', 'Dez' 
						],
						date 		= new Date(),
						curMonth 	= date.getMonth() + 1,
						curYear 	= date.getFullYear(),
						chxl 		= '1:|',
						chd 		= '',
						valores 	= [];

					for ( let i = 1; i <= 12; i++ ) {

						//Adiciona meses no eixo X
						chxl += months[i - 1] + '/'+ curYear +'|';

						//Caso seja menor ou igual ao mês atual, faz o fetch
						if( i <= curMonth ){

							fetch( 'https://api.github.com/repos/globocom/'+ repository.name +'/commits?since='+ curYear +'-'+ i +'-01&until='+ curYear +'-'+ i +'-31' )
							.then( res => res.json() )
							.then(
								( result ) => {

									valores[i - 1] = ( result.length > 0 ? result.length : 0 );

									//Exibe informações com os novos estados
									if( i == curMonth ){

										let url 			= '',
											newChart 		= chart;
											newChart.chxl 	= chxl;
											newChart.chd 	= 't:' + valores.join();

											//Monta a URL do gráfico
											for( let key in newChart ){
												url += key + '=' + ( newChart[key] != undefined ? newChart[key] : '' ) + '&';
											}

											dispatch({ type: 'RENDER_CHART_URL', payload: url });
											dispatch({ type: 'SHOW_LOADER', payload: true });

									}

								}
							);

						}else 
							valores[i - 1] = 0; //Os meses que do futuro tem que ter o valor setado para 0

					}

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