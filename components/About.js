// About.js
import React from 'react';
import Image from 'next/image';
import styles from '../styles/About.module.css';

export default function About() {
  return (
    <section id="about">
      <div className="container mx-auto flex px-10 py-20 md:flex-row flex-col items-center z-0">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-2xl mb-4 font-medium text-white">
            Hi, I'm Gabriel.&thinsp;
            <br className="hidden lg:inline-block" />I love math and physics, I
            feel like computing is their interface with real life.
          </h1>
          <p className="mb-8 leading-relaxed">
            I am a final year passion guided engineering student. My hunger to
            learn, understand and imagine drives me through creation. I look
            forward to take a <u>6 months from february 2025</u> internship in{' '}
            <b>data sciences</b> or <b>quantum information</b>.
          </p>
          <div className="flex justify-center z-10">
            <a
              href="#contact"
              className="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg"
            >
              Work With Me
            </a>
            <a
              href="#projects"
              ou
              className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
            >
              See My Past Work
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 relative overflow-visible mr-20 z-0">
          <Image
            src="/me-svg.svg"
            alt="Illustrated portrait of Gabriel, the wind turbine engineer"
            width={500} // Adjust as needed
            height={500} // Adjust as needed
            draggable="false"
            className={`-top-5 -left-5 ${styles.fadingBorder} ${styles.zoomedImage}`}
          />
        </div>
      </div>
    </section>
  );
}
