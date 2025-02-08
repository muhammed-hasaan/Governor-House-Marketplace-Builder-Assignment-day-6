import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			darkPrimary: 'var(--color-dark-primary)',
  			primary: 'var(--color-primary)',
  			lightGrey: 'var(--color-light-grey)',
  			borderGrey: 'var(--color-border-grey)',
  			white: 'var(--color-white)',
  			borderDark: 'var(--color-border-dark)'
  		},
  		fontFamily: {
  			satoshi: [
  				'var(--font-satoshi)',
  				'sans-serif'
  			],
  			clash: [
  				'var(--font-clash-display)',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'clash-36': '48px',
  			'clash-32': '43px',
  			'clash-24': '32px',
  			'clash-20': '27px',
  			'clash-16': '21px',
  			'clash-14': '19px',
  			'satoshi-16': '21px',
  			'satoshi-14': '19px',
  			'satoshi-18': '24px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		screens: {
  			xs: {
  				min: '420px'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
