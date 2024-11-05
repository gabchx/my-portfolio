// /Users/Gabriel/IT/my-portfolio/components/Experience.js

import React from 'react';
import { BriefcaseIcon } from '@heroicons/react/solid';
import { experience } from '../utils/data';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper modules
import { Pagination, A11y } from 'swiper/modules';

export default function Experience() {
  // Determine if the total number of experiences is odd
  const isOddTotal = experience.length % 2 !== 0;

  return (
    <section id="experience" className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-10 mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <BriefcaseIcon className="w-10 inline-block mb-4 text-gray-400" />
          <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
            Professional Experience
          </h1>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Here are some of the roles I've held and the projects I've worked
            on.
          </p>
        </div>

        {/* Experience for Large Screens */}
        <div className="hidden md:flex flex-wrap -m-4">
          {experience.map((exp, index) => {
            const isLastItem = index === experience.length - 1;
            // If total is odd and this is the last item, span full width on medium screens
            const widthClass =
              isOddTotal && isLastItem ? 'md:w-full w-full' : 'md:w-1/2 w-full';

            return (
              <div key={index} className={`p-4 ${widthClass}`}>
                <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                  <div className="flex items-center mb-4">
                    <BriefcaseIcon className="w-6 h-6 text-gray-400 mr-2" />
                    <h2 className="text-white text-lg title-font font-medium">
                      {exp.position} at {exp.company}
                    </h2>
                  </div>
                  <p className="leading-relaxed mb-6 text-gray-300">
                    {exp.duration} | {exp.location}
                  </p>
                  <ul className="list-disc list-inside text-gray-400">
                    {exp.responsibilities.map((item, idx) => (
                      <li key={idx} className="mb-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel for Small Screens */}
        <div className="md:hidden">
          <Swiper
            modules={[Pagination, A11y]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
            }}
          >
            {experience.map((exp, index) => (
              <SwiperSlide key={index}>
                <div className="p-4">
                  <div className="h-full bg-gray-800 bg-opacity-40 p-8 rounded">
                    <div className="flex items-center mb-4">
                      <BriefcaseIcon className="w-6 h-6 text-gray-400 mr-2" />
                      <h2 className="text-white text-lg title-font font-medium">
                        {exp.position} at {exp.company}
                      </h2>
                    </div>
                    <p className="leading-relaxed mb-6 text-gray-300">
                      {exp.duration} | {exp.location}
                    </p>
                    <ul className="list-disc list-inside text-gray-400">
                      {exp.responsibilities.map((item, idx) => (
                        <li key={idx} className="mb-2">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
