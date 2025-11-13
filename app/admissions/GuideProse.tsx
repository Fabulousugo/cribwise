/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Components } from 'react-markdown'
import { CheckCircle2, AlertCircle, Lightbulb, ExternalLink, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface GuideProseProps {
  content: string
}

export function GuideProse({ content }: GuideProseProps) {
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  // Custom components for markdown rendering
  const components: Components = {
    // Headings with anchor links
    h1: ({ children, ...props }) => (
      <h1 
        className="text-4xl md:text-5xl font-black mb-6 mt-12 first:mt-0 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent" 
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 
        className="text-3xl md:text-4xl font-bold mb-5 mt-12 pb-3 border-b-2 border-gradient-to-r from-purple-200 to-pink-200 dark:from-purple-800 dark:to-pink-800 scroll-mt-20" 
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 
        className="text-2xl md:text-3xl font-bold mb-4 mt-8 text-slate-900 dark:text-slate-100 scroll-mt-20" 
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ children, ...props }) => (
      <h4 
        className="text-xl md:text-2xl font-semibold mb-3 mt-6 text-slate-800 dark:text-slate-200 scroll-mt-20" 
        {...props}
      >
        {children}
      </h4>
    ),

    // Paragraphs with better spacing
    p: ({ children, ...props }) => {
      // Check if this paragraph contains special markers
      const text = String(children)
      
      // Check for warning/alert paragraphs
      if (text.startsWith('⚠️') || text.includes('CRITICAL:') || text.includes('WARNING:')) {
        return (
          <div className="my-6 p-4 bg-orange-50 dark:bg-orange-950/20 border-l-4 border-orange-500 rounded-r-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed" {...props}>
                {children}
              </p>
            </div>
          </div>
        )
      }

      // Check for success/tip paragraphs
      if (text.startsWith('✅') || text.startsWith('💡')) {
        return (
          <div className="my-6 p-4 bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500 rounded-r-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed" {...props}>
                {children}
              </p>
            </div>
          </div>
        )
      }

      return (
        <p className="mb-5 leading-relaxed text-slate-700 dark:text-slate-300 text-base md:text-lg" {...props}>
          {children}
        </p>
      )
    },

    // Enhanced links
    a: ({ children, href, ...props }) => {
      const isExternal = href?.startsWith('http')
      return (
        <a
          href={href}
          className="text-purple-600 dark:text-purple-400 hover:text-pink-600 dark:hover:text-pink-400 font-semibold underline decoration-2 underline-offset-2 hover:decoration-pink-600 dark:hover:decoration-pink-400 transition-all inline-flex items-center gap-1"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="h-3.5 w-3.5" />}
        </a>
      )
    },

    // Styled lists
    ul: ({ children, ...props }) => (
      <ul className="mb-6 ml-6 space-y-3 list-none" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-6 ml-6 space-y-3 list-decimal marker:text-purple-600 marker:font-bold" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => {
      const text = String(children)
      
      // Style checkbox items
      if (text.includes('[ ]') || text.includes('[x]') || text.includes('[X]')) {
        const isChecked = text.includes('[x]') || text.includes('[X]')
        const content = text.replace(/\[\s*[xX]?\s*\]/, '').trim()
        
        return (
          <li className="flex items-start gap-3 leading-relaxed" {...props}>
            <div className={cn(
              "w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
              isChecked 
                ? "bg-green-500 border-green-500" 
                : "border-slate-300 dark:border-slate-600"
            )}>
              {isChecked && <Check className="h-3 w-3 text-white" />}
            </div>
            <span className={cn(
              "flex-1 text-slate-700 dark:text-slate-300",
              isChecked && "line-through opacity-60"
            )}>
              {content}
            </span>
          </li>
        )
      }

      // Style items with emoji bullets
      if (text.match(/^[✓✅❌⏰💰📋📄🎯]/)) {
        return (
          <li className="flex items-start gap-3 leading-relaxed text-slate-700 dark:text-slate-300" {...props}>
            <span className="text-xl flex-shrink-0">{text.charAt(0)}</span>
            <span className="flex-1">{text.slice(1).trim()}</span>
          </li>
        )
      }

      return (
        <li className="flex items-start gap-3 leading-relaxed text-slate-700 dark:text-slate-300" {...props}>
          <span className="text-purple-600 dark:text-purple-400 font-bold flex-shrink-0 mt-1">•</span>
          <span className="flex-1">{children}</span>
        </li>
      )
    },

    // Beautiful blockquotes
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-6 border-l-4 border-purple-500 pl-6 py-4 italic bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-r-xl"
        {...props}
      >
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
          <div className="flex-1">{children}</div>
        </div>
      </blockquote>
    ),

    // Code blocks with copy button
    code: ({ inline, children, className, ...props }: any) => {
      const codeString = String(children).trim()
      const codeId = `code-${Math.random().toString(36).substr(2, 9)}`
      
      if (inline) {
        return (
          <code
            className="bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 rounded text-sm font-mono text-purple-700 dark:text-purple-300 font-semibold"
            {...props}
          >
            {children}
          </code>
        )
      }
      
      return (
        <div className="relative my-6 group">
          <div className="absolute right-3 top-3 z-10">
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-3 bg-slate-700/80 hover:bg-slate-700 text-white"
              onClick={() => copyToClipboard(codeString, codeId)}
            >
              {copiedCode === codeId ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1.5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1.5" />
                  Copy
                </>
              )}
            </Button>
          </div>
          <pre className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 pt-12 rounded-xl overflow-x-auto border-2 border-slate-700 dark:border-slate-800">
            <code className="text-sm font-mono" {...props}>
              {children}
            </code>
          </pre>
        </div>
      )
    },

    // Beautiful tables
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-xl border-2 border-slate-200 dark:border-slate-800 shadow-lg">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: ({ children, ...props }) => (
      <thead className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30" {...props}>
        {children}
      </thead>
    ),
    tbody: ({ children, ...props }) => (
      <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900" {...props}>
        {children}
      </tbody>
    ),
    tr: ({ children, ...props }) => (
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors" {...props}>
        {children}
      </tr>
    ),
    th: ({ children, ...props }) => (
      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 dark:text-slate-100" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300" {...props}>
        {children}
      </td>
    ),

    // Styled horizontal rule
    hr: ({ ...props }) => (
      <hr className="my-12 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" {...props} />
    ),

    // Strong/Bold with color
    strong: ({ children, ...props }) => (
      <strong className="font-bold text-slate-900 dark:text-slate-100" {...props}>
        {children}
      </strong>
    ),

    // Emphasis/Italic
    em: ({ children, ...props }) => (
      <em className="italic text-slate-700 dark:text-slate-300" {...props}>
        {children}
      </em>
    ),
  }

  return (
    <div className="prose prose-slate dark:prose-invert max-w-none prose-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}