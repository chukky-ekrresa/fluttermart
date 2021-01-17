module.exports = {
	purge: [],
	darkMode: false, // or 'media' or 'class'
	theme: {
		flex: {
			20: '1 1 20%',
			80: '2 2 80%',
			40: '1 1 40%',
			60: '2 2 60%',
		},

		fontSize: {
			14: '0.875rem',
			24: '1.5rem',
		},
		maxWidth: {
			400: '400px',
			500: '500px',
			900: '900px',
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
				lightGrey: 'rgba(0, 0, 0, 0.04)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
