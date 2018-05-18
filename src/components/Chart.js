import React, { Component } from 'react';

class Chart extends Component{

	constructor(){
		super();

		this.state = {
			chart: {
				'cht': 		'ls', // Tipo de gráfico: linha
				'chd': 		't:50,25,150|25,37,30|12,80,80', // Valores 
				'chs': 		'800x220', // Tamanho (usado 800x220)
				'chdl': 	'Stars|Forks|Contribs', //  Legendas
				'chdlp': 	'b', // Posição da legenda
				'chdls': 	'333333,14', // Cor,tamanho da legenda
				'chg': 		'0,25,0,0', // Grid
				'chco': 	'cd150c,359e00,ff8100', // Cores das linhas
				'chtt': 	'', // Título do gráfico
				'chts': 	'333333,20', // Cor,tamanho do título
				'chxt': 	'y,x', // Quais eixos mostrar
				'chxl': 	'', //Nomes dos valores no eixo X
				'chls': 	'2|2|2', // Espessura da linha
				'chma': 	'5,40', // Margem do gráfico
				'chm': 		'' // Texto nos pontos
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