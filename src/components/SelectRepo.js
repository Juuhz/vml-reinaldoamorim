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

	//Retorna Dropdown
	renderDropdown(){

		if( !this.state.isLoadRepo ){
			return(
				<ul className="options" style={{ display: this.state.openDropdown }}>
					<li>Carregando repositórios, aguarde...</li>
				</ul>
			);
		}

		return(
			<ul className="options" style={{ display: this.state.openDropdown }}>
				{	
					this.state.repositories.map( function( repository ){
						return (
							<li key={repository.id}>{repository.name}</li>
						);
					})
				}
			</ul>
		);
	}

	render(){
		return(
			<div className="fakeSelect">
				<div className="viewAction" onClick={this.openRepo}>
					<div className="arrow"><i className="fas fa-angle-down"></i></div>
					<div className="selected">Selecione um repositório | Globo.com</div>
				</div>
				{this.renderDropdown()}
			</div>
		);
	}
}

export default SelectRepo;