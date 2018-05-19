import React, { Component } from 'react';
import { connect } 			from 'react-redux';

import Logo					from './Logo';
import SelectRepo 			from './SelectRepo';
import Infos 				from './Infos';
import Chart				from './Chart';

class App extends Component{
	render(){

		const 	{ showLoader, showInfos } 	= this.props,
				isHidden 					= ( !showInfos ? 'hidden' : '' ), 		//Mostra / Esconde informações
				isLoading 					= ( !showLoader  ? 'isLoading' : '' );	//Mostra / Esconde Loader


		return (
			<div id="main-wrapper">
				<Logo />
				<SelectRepo />
				<div className={`container-statics ${isHidden} ${isLoading}`}>
					<Infos />
					<Chart />
				</div>	
      		</div>
		);
	}
}

//Envia novo estado
const mapStateToProps = state => {
	return {
		showLoader: state.showLoader,
		showInfos: 	state.showInfos
	}
}

//Export
export default connect(
	mapStateToProps,
)(App);
