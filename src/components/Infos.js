import React, { Component } from 'react';

class Infos extends Component{
	render(){
		return(
			<div className="infos">
				<div className="box stars">
					<span>Total de Stars</span>
					<div className="num">90.000</div>
				</div>

				<div className="box forks">
					<span>Total de Forks</span>
					<div className="num">90.000</div>
				</div>

				<div className="box contribs">
					<span>Total de Contribs</span>
					<div className="num">90.000</div>
				</div>
			</div>
		);
	}
}

export default Infos;