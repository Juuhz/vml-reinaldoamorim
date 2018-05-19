import React, { Component } from 'react';
import { connect } 			from 'react-redux';

class Infos extends Component{
	render(){

		const { starsCount, forkCount, contribsCount } = this.props;

		return(
			<div className="infos">
				<div className="box stars">
					<span>Total de Stars</span>
					<div className="num">{starsCount}</div>
				</div>

				<div className="box forks">
					<span>Total de Forks</span>
					<div className="num">{forkCount}</div>
				</div>

				<div className="box contribs">
					<span>Total de Contribs</span>
					<div className="num">{contribsCount}</div>
				</div>
			</div>
		);
	}
}

//Envia novo estado
const mapStateToProps = state => {
	return {
		starsCount: 	state.starsCount,
		forkCount: 		state.forkCount,
		contribsCount: 	state.contribsCount
	}
}

//Export
export default connect(
	mapStateToProps,
)(Infos);
