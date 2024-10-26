import '../styles/globals.css';
import React from 'react';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

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
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="z-50" // Ensure toast has high z-index
      />
      ;
    </>
  );
}

export default MyApp;
