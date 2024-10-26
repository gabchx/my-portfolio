// pages/blog/[...slug].js

import React from 'react';
import { getAllPosts, getPostBySlug } from '../../utils/blog';
import Head from 'next/head';
import Link from 'next/link';

export default function Post({ post }) {
  if (!post) {
    return <div className="text-center py-20 text-white">Post not found.</div>;
  }

  const formattedDate = new Date(post.date).toLocaleDateString();

  return (
    <>
      <Head>
        <title>{post.title} - Gabriel Chaix</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="mb-4">
            <Link legacyBehavior href="/blog">
              <a className="text-blue-500 hover:underline">
                &larr; Back to Blog
              </a>
            </Link>
          </div>
          <div className="mb-6">
            <h1 className="sm:text-4xl text-3xl font-medium title-font text-white mb-2">
              {post.title}
            </h1>
            <p className="text-gray-500 text-sm">{formattedDate}</p>
          </div>
          <div
            className="prose prose-xl prose-indigo text-white"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          ></div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);

  return {
    props: {
      post,
    },
  };
}
