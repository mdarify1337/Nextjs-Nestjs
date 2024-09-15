// _app.tsx
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '../path/to/fontAwesome'; // Adjust the path to where you placed fontAwesome.ts

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
