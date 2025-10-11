'use client';

import { useMemo } from "react";

// Tiny safeguard: naive markdown-to-HTML fallback; replace with a proper MD/MDX
function basicMarkdownToHTML(md: string) {
  // super-light conversions (headings + bold + italics + line breaks)
  const html = md
    .replace(/^###\s(.+)$/gm, '<h3>$1</h3>')
    .replace(/^##\s(.+)$/gm, '<h2>$1</h2>')
    .replace(/^#\s(.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br/>');
  return html;
}

export function GuideProse({ content }: { content: string }) {
  const html = useMemo(() => {
    if (!content) return "";
    const looksLikeHTML = /<\w+[^>]*>/.test(content);
    if (looksLikeHTML) return content; // trust your own CMS source; sanitize if user-generated
    return basicMarkdownToHTML(content);
  }, [content]);

  return (
    <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
