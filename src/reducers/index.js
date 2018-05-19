//Define os estados iniciais
const initStates = {
	openDropdown: 		'none',
	isLoadRepo: 		false,
	repositories: 		[],
	starsCount: 		0,
	forkCount: 			0,
	contribsCount: 		0,
	curRepo: 			'Selecione um repositório | Globo.com',
	showLoader: 		false,
	showInfos: 			false,
	chart: {
		'cht': 		'ls', 				// Tipo de gráfico: linha
		'chd': 		't:',	 			// Valores 
		'chs': 		'800x220', 			// Tamanho (usado 800x220)
		'chdls': 	'333333,14', 		// Cor, tamanho da legenda
		'chg': 		'0,10,0,0', 		// Grid
		'chco': 	'333333', 			// Cores das linhas
		'chxt': 	'y,x', 				// Quais eixos mostrar
		'chls': 	'3', 				// Espessura da linha
		'chxl': 	''					// Meses / Min e Máximo
	},
	urlChart: 			false
}

function reducer( state = initStates, action ){

	switch( action.type ){
		case 'OPEN_DROPDOWN':
			return Object.assign({}, state, { openDropdown: action.payload });

		case 'LOAD_REPOSITORIES':
			return Object.assign({}, state, { 
				isLoadRepo: true,
				repositories: action.payload
			});

		case 'SET_REPOSITORY':
			return Object.assign({}, state, { curRepo: action.payload });

		case 'SET_STATICS':
			return Object.assign({}, state, { 
				starsCount: 	action.stars,
				forkCount: 		action.fork,
				contribsCount: 	action.contribs,
				//showLoader: 	action.loader
			});

		case 'SHOW_INFOS':
			return Object.assign({}, state, { showInfos: action.payload });

		case 'SHOW_LOADER':
			return Object.assign({}, state, { 
				showLoader: action.payload,
				showInfos: true
			});

		case 'RENDER_CHART_URL':
			return Object.assign({}, state, { urlChart: action.payload });

		default:
			return state;
	}

	return state;

}

export default reducer;