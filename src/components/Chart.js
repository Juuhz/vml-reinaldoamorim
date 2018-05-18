import React, { Component } from 'react';

class Chart extends Component{

	constructor(){
		super();

		this.state = {
			chart: {
				'cht': 		'ls', // Tipo de gráfico: linha
				'chd': 		't:50,25,150', // Valores 
				'chs': 		'800x220', // Tamanho (usado 800x220)
				'chdls': 	'333333,14', // Cor,tamanho da legenda
				'chg': 		'0,10,0,0', // Grid
				'chco': 	'000000', // Cores das linhas
				'chxt': 	'y,x', // Quais eixos mostrar
				'chls': 	'3', // Espessura da linha
			},
			urlChart: ''
		}

	}

	componentWillMount(){

		let url = '';

		//Pega os index do array de objeto "chart" e transforma em GET
		for( let key in this.state.chart ){

			url += key + '=' + ( this.state.chart[key] != undefined ? this.state.chart[key] : '' ) + '&';

		}

		this.setState({
			urlChart: url
		});

	}

	render(){
		return(
			<img src={`http://chart.apis.google.com/chart?${this.state.urlChart}`} />
		);
	}
}

export default Chart;