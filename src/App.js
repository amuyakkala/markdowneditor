import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, World!');

  const handleExport = () => {
    const element = document.getElementById('markdown-preview');
    const opt = {
      margin: 1,
      filename: 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  const handleCopy = () => {
    const element = document.getElementById('markdown-preview');
    const text = element.innerText;
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!');
    });
  };

  return (
    <div className="App">
      <div className="editor-container">
        <div className="editor-pane">
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
          />
        </div>
        <div className="preview-pane">
          <div id="markdown-preview">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
          <div className="button-container">
            <button onClick={handleExport}>Export</button>
            <button onClick={handleCopy}>Copy</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
