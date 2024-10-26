// components/Contact.js

import React from 'react';
import { contact, places } from '../utils/data';
import SendCvButton from './SendCvButton';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent with SSR disabled
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <p>Loading map...</p>, // Optional: loading state
});

export default function Contact() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Message sent successfully!');
        // Reset form fields
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="relative">
      <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
        <div className="lg:w-2/3 md:w-1/2 bg-gray-900 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
          {/* Dynamically Imported Leaflet Map */}
          <MapComponent places={places} />

          <div className="bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md w-full">
            <div className="lg:w-1/2 px-6">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                ADDRESS
              </h2>
              <p className="mt-1">Paris, France</p>
            </div>
            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
              <h2 className="title-font font-semibold text-white tracking-widest text-xs">
                EMAIL
              </h2>
              <a
                href={`mailto:${contact.email}`}
                className="text-blue-400 leading-relaxed"
              >
                {contact.email}
              </a>
            </div>
            {/* LinkedIn Link */}
            <div className="lg:w-1/2 px-6 mt-4">
              <h2 className="title-font font-semibold text-yellow-200 tracking-widest text-xs">
                LINKEDIN
              </h2>
              <a
                href={contact.linkedin.url}
                className="text-blue-400 leading-relaxed"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.linkedin.text}
              </a>
            </div>
            {/* GitHub Link */}
            <div className="lg:w-1/2 px-6 mt-4">
              <h2 className="title-font font-semibold text-yellow-200 tracking-widest text-xs">
                GITHUB
              </h2>
              <a
                href={contact.github.url}
                className="text-blue-400 leading-relaxed"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contact.github.text}
              </a>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 md:w-1/2 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
          <form
            name="contact"
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            <h2 className="text-white sm:text-4xl text-3xl mb-1 font-medium title-font">
              Write to me
            </h2>
            <p className="leading-relaxed mb-5">
              If you’re into black holes, or coding, we’d probably get along
              great! I’m always up for talking about these topics or diving into
              any puzzle that needs cracking. Plus, I’m currently on the hunt
              for an internship where I can apply my skills and curiosity—so if
              you’re interested or have any tips, I’d love to hear from you!
            </p>
            <div className="relative mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                className="w-full bg-gray-800 rounded border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </form>

          <div className="text-center mt-1">
            or
            <div className="mt-3 flex flex-col ">
              <SendCvButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
