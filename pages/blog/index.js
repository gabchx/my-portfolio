import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '../../utils/blog';
import Head from 'next/head';
import Navbar from '../../components/Navbar';

export default function Blog({ posts }) {
  const navigation = [{ name: 'Blog', href: '/blog', current: false }];
  return (
    <>
      <Head>
        <title>Blog - Gabriel Chaix</title>
        <meta
          name="description"
          content="Read articles and tutorials by Gabriel Chaix."
        />
      </Head>
      <section className="text-gray-400 bg-gray-900 body-font">
        <Navbar navigation={navigation} />
        <div className="container px-5 py-10 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-4">
              My Blog
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
              Insights, tutorials, and updates on quantum computing, data
              science, and more.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            {posts.map((post) => {
              const slug = post.slug.join('/');
              return (
                <div key={slug} className="p-4 bg-gray-800 rounded-lg">
                  <h2 className="text-2xl font-bold text-white">
                    <Link legacyBehavior href={`/blog/${slug}`}>
                      <a className="hover:underline">{post.title}</a>
                    </Link>
                  </h2>
                  <p className="text-gray-400 text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                  <p className="mt-2 text-gray-300">{post.excerpt}</p>
                  <Link legacyBehavior href={`/blog/${slug}`}>
                    <a className="mt-2 text-blue-500 hover:underline inline-block">
                      Read More &rarr;
                    </a>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return {
    props: {
      posts,
    },
  };
}
