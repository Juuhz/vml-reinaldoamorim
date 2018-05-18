import React, { Component } from 'react';

class SelectRepo extends Component{

	constructor() {
		super();

		this.state = {
			openDropdown: 'none',
			isLoadRepo: false,
			repositories: []
		}

	}

	//Evento onClick para abrir a dropdown
	openRepo = () => {
		this.setState({
			openDropdown: ( this.state.openDropdown === 'block' ? 'none' : 'block' )	
		});
	}

	//Ajax para carregar os repositorios
	componentWillMount(){

		fetch( 'https://api.github.com/search/repositories?q=user:globocom&sort=stars:desc&per_page=999' )
		.then( res => res.json() )
		.then(
			( result ) => {
				
				this.setState({
					repositories: result.items,
					isLoadRepo: true
				});

			}
		)

	}

	render(){
		return(
			<div className="fakeSelect">
				<div className="viewAction" onClick={this.openRepo}>
					<div className="arrow"><i className="fas fa-angle-down"></i></div>
					<div className="selected">Selecione um repositório | Globo.com</div>
				</div>
				<RenderDropdown 
					isLoadRepo={this.state.isLoadRepo}
					openDropdown={this.state.openDropdown}
					repositories={this.state.repositories} 
				/>
			</div>
		);
	}
}

//Retorna Dropdown
const RenderDropdown = ( props ) => {
	
	if( !props.isLoadRepo ){
		return(
			<ul className="options" style={{ display: props.openDropdown }}>
				<li>Carregando repositórios, aguarde...</li>
			</ul>
		);
	}

	return(
		<ul className="options" style={{ display: props.openDropdown }}>
			{	
				props.repositories.map( function( repository ){
					return (
						<li key={repository.id}>{repository.name}</li>
					);
				})
			}
		</ul>
	);
}

export default SelectRepo;