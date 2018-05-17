import React, { Component } from 'react';

class SelectRepo extends Component{
	
	state = { open: 'none' }

	openRepo = () => {
		this.setState ({ open: ( this.state.open == 'block' ? 'none' : 'block' ) });
	}

	render(){
		return(
			<div className="fakeSelect">
				<div className="viewAction" onClick={this.openRepo}>
					<div className="arrow"><i className="fas fa-angle-down"></i></div>
					<div className="selected">Selecione um repositório | Globo.com</div>
				</div>
				<ul className="options" style={{ display: this.state.open }}>
					<li>Teste repositório 1</li>
					<li>Teste repositório 2</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
					<li>Teste repositório 3</li>
				</ul>
			</div>
		);
	}
}

export default SelectRepo;