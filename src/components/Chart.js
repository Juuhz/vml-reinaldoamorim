import React, { Component } from 'react';
import { connect } 			from 'react-redux';

class Chart extends Component{

	render(){

		const { urlChart } = this.props;

		if( !urlChart ){
			return(
				<div className="chart"></div>
			);	
		}

		return(
			<div className="chart">
				<h2>Commits</h2>
				<img src={`http://chart.apis.google.com/chart?${urlChart}`} />
			</div>
		);
	}
}

//Envia novo estado
const mapStateToProps = state => {
	return {
		urlChart: 	state.urlChart
	}
}

//Export
export default connect(
	mapStateToProps,
)(Chart);
