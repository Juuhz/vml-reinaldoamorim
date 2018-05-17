import React, { Component } from 'react';
import SelectRepo 			from './SelectRepo';
import Infos 				from './Infos';
import Chart				from './Chart';

class App extends Component{
	render(){
		return (
			<div id="main-wrapper">
				<SelectRepo />
				{/*
				<Infos />
        		<Chart />*/}
      		</div>		
		);
	}
}

export default App;
