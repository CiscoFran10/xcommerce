/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			primary: "Inter",
		},
		extend: {
			colors: {
				dark: "#17223E",
				"light-gray": "#F5F5F5",
				"dark-gray": "#F3F5F9",
				primary: {
					100: "#235EE7",
					200: "#061237",
				},
				secundary: "#D32811",
				gray: {
					100: "#99A0B0",
					200: "#6B7183",
					300: "#636363",
					400: "#101828",
				},
			},
		},
	},
	plugins: [],
};
