// components/CodeBlock.js

import React from 'react';
import { ClipboardIcon } from '@heroicons/react/outline';

const CodeBlock = ({ language, code }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    alert('Code copied to clipboard!');
  };

  return (
    <div className="relative">
      <button
        onClick={copyToClipboard}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
      >
        <ClipboardIcon className="h-5 w-5" />
      </button>
      <pre className={`language-${language}`}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
