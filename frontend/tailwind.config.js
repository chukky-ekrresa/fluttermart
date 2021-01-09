module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontSize: {
			14: '0.875rem',
			24: '1.5rem',
		},
		maxWidth: {
			400: '400px',
		},

		extend: {
			fontFamily: {
				quicksand: ['Quicksand', 'sans-serif'],
			},
			colors: {
				lightOrange: '#FFF0DE',
				darkOrange: '#F9A109',
				greyBorder: '#BDBDBD',
				brownish: '#80485b',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
