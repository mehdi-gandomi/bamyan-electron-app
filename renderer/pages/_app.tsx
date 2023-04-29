import type { AppProps } from 'next/app'
import '../styles/globals.css'

import NextNProgress from 'nextjs-progressbar'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        color="#FFFFFF"
        startPosition={0.3}
        stopDelayMs={200}
        height={12}
        showOnShallow={true}
      />
      <Component {...pageProps} />
    </>
  )
}
