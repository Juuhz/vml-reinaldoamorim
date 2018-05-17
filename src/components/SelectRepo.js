import React, { Component } from 'react';

class SelectRepo extends Component{
	render(){
		return(
			<div className="fakeSelect">
				<div className="arrow"><i class="fas fa-angle-down"></i></div>
				<div className="selected">Selecione um repositório</div>
				<ul className="options">
					<li>Teste repositório 1</li>
					<li>Teste repositório 2</li>
					<li>Teste repositório 3</li>
				</ul>
			</div>
		);
	}
}

export default SelectRepo;