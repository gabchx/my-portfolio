import '../styles/globals.css';
import React from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {' '}
      <Component {...pageProps} />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-KYYXVFSRH5"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {
          "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-KYYXVFSRH5');"
        }
      </Script>
      ;
    </>
  );
}

export default MyApp;
