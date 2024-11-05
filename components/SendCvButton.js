// components/SendCvButton.js

import { useState } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { XIcon } from '@heroicons/react/solid'; // Ensure you have Heroicons installed
import { toast } from 'react-toastify'; // Import toast from React Toastify
import { contact } from '../utils/data';

Modal.setAppElement('#__next'); // Accessibility for Next.js

export default function SendCvButton() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data); // Debugging
    // Close the modal immediately upon form submission
    setModalIsOpen(false);

    try {
      const response = await fetch('/api/send-cv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('My CV has been sent successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        reset(); // Reset the form after successful submission
      } else {
        toast.error(result.message || 'Something went wrong.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error sending CV:', error); // Log the error for debugging
    }
  };

  return (
    <>
      {/* Get my CV Button */}
      <button
        onClick={() => {
          const link = document.createElement('a');
          link.href = contact.cv.url;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Get my CV
      </button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Request CV"
        className="relative max-w-sm mx-auto my-20 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center"
        shouldCloseOnOverlayClick={true}
      >
        {/* Close Icon */}
        <button
          onClick={() => setModalIsOpen(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close modal"
        >
          <XIcon className="h-5 w-5" />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              aria-label="Your Email"
              {...register('email', {
                required: 'Email is required.',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Invalid email address.',
                },
              })}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby="email-error"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'Receive'}
          </button>
        </form>
      </Modal>
    </>
  );
}
