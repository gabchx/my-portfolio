// utils/blog.js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import prism from 'remark-prism'; // For syntax highlighting

const blogDirectory = path.join(process.cwd(), 'public', 'blog');

function getAllMarkdownFiles(
  dir = blogDirectory,
  fileList = [],
  relativePath = ''
) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const absolutePath = path.join(dir, file);
    const fileRelativePath = path.join(relativePath, file);
    const stat = fs.statSync(absolutePath);

    if (stat.isDirectory()) {
      getAllMarkdownFiles(absolutePath, fileList, fileRelativePath);
    } else if (file.endsWith('.md')) {
      fileList.push(fileRelativePath);
    }
  });

  return fileList;
}

export function getAllPosts() {
  const filePaths = getAllMarkdownFiles();

  const posts = filePaths.map((filePath) => {
    const fullPath = path.join(blogDirectory, filePath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug: filePath.replace(/\.md$/, '').split(path.sep),
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    };
  });

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getPostBySlug(slugArray) {
  const slugPath = path.join(...slugArray) + '.md';
  const fullPath = path.join(blogDirectory, slugPath);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(prism) // Apply syntax highlighting
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug: slugArray,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    contentHtml,
  };
}
