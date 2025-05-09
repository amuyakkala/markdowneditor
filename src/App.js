import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features

- ✨ Real-time preview
- 📝 Rich text formatting
- 📄 PDF export
- 📋 Copy to clipboard
- 🎨 Beautiful UI

## Try it out!

Type some **bold** or *italic* text.

\`\`\`javascript
// Code blocks with syntax highlighting
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> Beautiful blockquotes

| Tables | Are | Cool |
|--------|-----|------|
| col 1  | col 2 | col 3 |
| row 2  | row 2 | row 2 |

[Learn more about Markdown](https://www.markdownguide.org)`);

  const handleExport = () => {
    // Get the first heading or use default name
    const firstHeading = markdown.match(/^#\s+(.+)$/m)?.[1] || 'document';
    const filename = `${firstHeading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`;
    
    const element = document.getElementById('markdown-preview');
    const opt = {
      margin: [15, 15],
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait'
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Show loading state
    const button = document.getElementById('exportButton');
    const originalContent = button.innerHTML;
    button.innerHTML = '<span role="img" aria-label="exporting">⏳</span> Exporting...';

    html2pdf().set(opt).from(element).save().then(() => {
      // Show success state
      button.innerHTML = '<span role="img" aria-label="success">✓</span> Exported!';
      setTimeout(() => {
        button.innerHTML = '<span role="img" aria-label="export">📄</span> Export PDF';
      }, 2000);
    }).catch(err => {
      // Show error state
      button.innerHTML = '<span role="img" aria-label="error">❌</span> Error';
      setTimeout(() => {
        button.innerHTML = '<span role="img" aria-label="export">📄</span> Export PDF';
      }, 2000);
      console.error('PDF export failed:', err);
    });
  };

  const handleCopy = () => {
    const element = document.getElementById('markdown-preview');
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
      const button = document.getElementById('copyButton');
      button.innerHTML = '<span role="img" aria-label="success">✓</span> Copied!';
      setTimeout(() => {
        button.innerHTML = '<span role="img" aria-label="copy">📋</span> Copy';
      }, 2000);
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Markdown Editor</h1>
          <div className="header-actions">
            <button 
              className="icon-button" 
              onClick={handleExport} 
              id="exportButton"
              title="Export as PDF (includes filename from first heading)"
            >
              <span role="img" aria-label="export">📄</span> Export PDF
            </button>
            <button 
              className="icon-button" 
              onClick={handleCopy} 
              id="copyButton" 
              title="Copy formatted text to clipboard"
            >
              <span role="img" aria-label="copy">📋</span> Copy
            </button>
          </div>
        </div>
      </header>
      
      <div className="editor-container">
        <div className="editor-pane">
          <div className="pane-header">
            <span className="pane-title">Editor</span>
            <span className="pane-subtitle">Write your markdown here</span>
          </div>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Start typing your markdown..."
          />
        </div>
        <div className="preview-pane">
          <div className="pane-header">
            <span className="pane-title">Preview</span>
            <span className="pane-subtitle">See how it looks</span>
          </div>
          <div id="markdown-preview">
            <ReactMarkdown 
              children={markdown} 
              remarkPlugins={[remarkGfm]}
            />
          </div>
        </div>
      </div>

      <footer className="app-footer">
        <p>Built with React • Powered by Markdown</p>
      </footer>
    </div>
  );
}

export default App;
