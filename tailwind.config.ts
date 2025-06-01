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
			// Your existing color definitions using HSL variables
			colors: {
				'custom-blue-light': '#5D9CEC', // Lighter blue for gradient
              'custom-blue': '#205781',       // Main blue
              'custom-blue-dark': '#102C44',  // Darker blue for gradient
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))', // This is often used by shadcn/ui for input backgrounds
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},

				// **NEW** colors for the sign-in/up template
				'custom-orange': '#FF4B2B',
				'custom-pink': '#FF416C',
				'custom-gray-light': '#eee',      // For input backgrounds in the template
				'custom-gray-text': '#333',
				'custom-gray-border': '#DDDDDD',
				'custom-page-bg': '#f6f5f7',
				'custom-footer-bg': '#222',
				'custom-link-blue': '#3c97bf',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				// **NEW** specific border radius for template buttons/elements if needed
				'template-md': '20px', // As per template button `border-radius: 20px;`
			},
			// **NEW** keyframes for the 'show' animation
			keyframes: {
				show: {
					'0%, 49.99%': { opacity: '0', zIndex: '1' },
					'50%, 100%': { opacity: '1', zIndex: '5' },
				},
			},
			// **NEW** animation utility
			animation: {
				show: 'show 0.6s ease-in-out', // Matched duration and easing from original CSS
			},
			// **NEW** box shadow for the form container
			boxShadow: {
				'custom-form': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
			},
			// **NEW** font family (ensure Montserrat is linked in your project)
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")], // You already have this, which is great!
} satisfies Config;