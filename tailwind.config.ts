import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'solmate-green': '#00C896',
        'solmate-black': '#000000',
        'solmate-white': '#FFFFFF',
        'solmate-dark-card': '#111111',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            'box-shadow': '0 0 20px 0px rgba(0, 200, 150, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 40px 0px rgba(0, 200, 150, 0.5)',
          },
        },
        'flywheel-spin': {
          'from': {
            'transform': 'rotate(0deg)',
          },
          'to': {
            'transform': 'rotate(360deg)',
          },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'flywheel-spin': 'flywheel-spin 8s linear infinite',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle, rgba(0, 200, 150, 0.15) 0%, rgba(0, 200, 150, 0) 70%)',
        'radial-glow-strong': 'radial-gradient(circle, rgba(0, 200, 150, 0.25) 0%, rgba(0, 200, 150, 0) 70%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
