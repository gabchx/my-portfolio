import React from 'react';
import SendCvButton from '../components/SendCvButton';
import { useRouter } from 'next/router';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuAlt4Icon, ArrowRightIcon, StopIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ navigation }) {
  const router = useRouter();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: router.pathname.startsWith(item.href),
  }));
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between z-50">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <StopIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt4Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="./thtore.svg"
                    alt="Logo"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="./thtore.svg"
                    alt="Logo"
                  />
                </div>
                <div className="title-font font-medium text-white py-1 md:border-r pr-20 md:border-gray-700 block">
                  <a href="/" className="pl-3 text-xl">
                    Gabriel Chaix
                  </a>
                </div>
                <nav className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {updatedNavigation.map((item) => (
                      <Link legacyBehavior href={item.href} key={item.name}>
                        <a
                          className={classNames(
                            item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                    <a className="mr-3">
                      <SendCvButton />
                    </a>
                  </div>
                </nav>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a
                  href="/#contact"
                  className="rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 flex items-center"
                >
                  <span className="sr-only">Go to contact section</span>
                  <span className="mr-1"> Contact me</span>
                  <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <a className="mt-2">
                <SendCvButton />
              </a>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
