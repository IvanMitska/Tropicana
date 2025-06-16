/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        primary: {
          DEFAULT: '#22A699',
          light: '#4DC0B5',
          dark: '#1C857A',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: '#F2BE22',
          light: '#F7D056',
          dark: '#D9A50E',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        dark: {
          DEFAULT: '#333333',
          light: '#4D4D4D',
          dark: '#222222',
        },
        light: {
          DEFAULT: '#F5F5F5',
          dark: '#E0E0E0',
          darker: '#CCCCCC',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          dark: '#B45309',
          light: '#FCD34D',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
        sm: '4px',
        xl: '16px',
      },
    },
  },
  plugins: [],
} 