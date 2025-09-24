const plugin = require("tailwindcss/plugin");
const { blackA, mauve, violet, indigo, purple } = require("@radix-ui/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				...blackA,
				...mauve,
				...violet,
				...purple,
				...indigo,
			},
			keyframes: {
				enterFromRight: {
					from: { opacity: "0", transform: "translateX(200px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				enterFromLeft: {
					from: { opacity: "0", transform: "translateX(-200px)" },
					to: { opacity: "1", transform: "translateX(0)" },
				},
				exitToRight: {
					from: { opacity: "1", transform: "translateX(0)" },
					to: { opacity: "0", transform: "translateX(200px)" },
				},
				exitToLeft: {
					from: { opacity: "1", transform: "translateX(0)" },
					to: { opacity: "0", transform: "translateX(-200px)" },
				},
				scaleIn: {
					from: { opacity: "0", transform: "rotateX(-10deg) scale(0.9)" },
					to: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
				},
				scaleOut: {
					from: { opacity: "1", transform: "rotateX(0deg) scale(1)" },
					to: { opacity: "0", transform: "rotateX(-10deg) scale(0.95)" },
				},
				fadeIn: {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				fadeOut: {
					from: { opacity: "1" },
					to: { opacity: "0" },
				},
				slideUp: {
					from: { opacity: "0", transform: "translateY(20px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				"marquee-reverse": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0%)" },
				},
			},
			animation: {
				scaleIn: "scaleIn 200ms ease",
				scaleOut: "scaleOut 200ms ease",
				fadeIn: "fadeIn 200ms ease",
				fadeOut: "fadeOut 200ms ease",
				slideUp: "slideUp 300ms ease-out",
				enterFromLeft: "enterFromLeft 250ms ease",
				enterFromRight: "enterFromRight 250ms ease",
				exitToLeft: "exitToLeft 250ms ease",
				exitToRight: "exitToRight 250ms ease",
				marquee: "marquee 10s linear infinite",
				"marquee-reverse": "marquee-reverse 10s linear infinite",
				"marquee-fast": "marquee 15s linear infinite",
			},
		},
	},
	plugins: [
		plugin(({ matchUtilities }: any) => {
			matchUtilities({
				perspective: (value: any) => ({
					perspective: value,
				}),
			});
		}),
	],
};
