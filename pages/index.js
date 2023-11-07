import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Testimonials from '../components/Testimonials';
import Head from 'next/head';
import Example from '../components/Navbar';

export default function Home() {
  var title;
  let isDark;
  return (
    <>
      <Head>
        <title>{title ? `${title} - Gabriel Chaix` : 'Gabriel Chaix'}</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="/thtore.svg" />
      </Head>
      <style jsx global>{`
        body {
          background: ${isDark ? 'rgb(31 41 55)' : 'rgb(31 41 55)'};
        }
      `}</style>
      <div className="text-gray-400 bg-gray-900">
        <Navbar />
        <About />
        <Skills />
      </div>
    </>
  );
}
