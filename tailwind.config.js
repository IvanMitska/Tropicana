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
          DEFAULT: '#4FB0A5',      // Бирюзово-зелёный
          light: '#6FC0B5',        // Светлый вариант
          dark: '#235F5A',         // Тёмно-бирюзовый
          foreground: '#FFFFFF',   // Белый текст на primary
        },
        secondary: {
          DEFAULT: '#235F5A',      // Тёмно-бирюзовый
          light: '#357570',        // Светлый вариант
          dark: '#1A4945',         // Тёмный вариант
          foreground: '#FFFFFF',   // Белый текст на secondary
        },
        dark: {
          DEFAULT: '#1E1E1E',      // Основной текст
          light: '#3E3E3E',        // Светлый вариант
          dark: '#0E0E0E',         // Тёмный вариант
        },
        light: {
          DEFAULT: '#F5F5F5',      // Светло-серый
          dark: '#E5E5E5',         // Серый
          darker: '#D5D5D5',       // Более тёмный серый
        },
        accent: {
          DEFAULT: '#5C4531',      // Тёплый серо-коричневый
          dark: '#453526',         // Тёмный вариант
          light: '#6D5540',        // Светлый вариант
          foreground: '#FFFFFF',   // Белый текст на accent
        },
        background: '#FFFFFF',     // Белый фон
        foreground: '#1E1E1E',     // Основной текст
        surface: '#F5F5F5',        // Светло-серый для карточек
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