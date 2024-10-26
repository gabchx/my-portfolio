import React from 'react';
import About from '../components/About';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Head from 'next/head';

export default function Home() {
  var title;
  let isDark;
  const navigation = [
    { name: 'About', href: '#about', current: false },
    { name: 'Skills', href: '#skills', current: false },
    { name: 'Projects', href: '#projects', current: false },
    { name: 'Experience', href: '#experience', current: false },
    { name: 'Blog', href: '/blog', current: false },
  ];
  return (
    <>
      <Head>
        <title>{title ? `${title} - Gabriel Chaix` : 'Gabriel Chaix'}</title>
        <meta name="description" content="Portfolio" />
        <link rel="icon" href="./thtore.svg" />
      </Head>
      <style jsx global>{`
        body {
          background: ${isDark ? 'rgb(31 41 55)' : 'rgb(31 41 55)'};
        }
      `}</style>
      <div className="text-gray-400 bg-gray-900">
        <Navbar navigation={navigation} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </div>
    </>
  );
}
