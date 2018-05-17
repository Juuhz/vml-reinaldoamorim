import React, { Component } from 'react';
import Logo					from './Logo';
import SelectRepo 			from './SelectRepo';
import Infos 				from './Infos';
import Chart				from './Chart';

class App extends Component{
	render(){
		return (
			<div id="main-wrapper">
				<Logo />
				<SelectRepo />
				<Infos />
      		</div>		
		);
	}
}

export default App;
