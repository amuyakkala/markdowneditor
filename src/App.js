import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import html2pdf from 'html2pdf.js';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(`# Markdown Editor Demo

## Text Formatting

This is a paragraph with **bold text**, *italic text*, and ***bold italic text***. You can also use _underscores_ for emphasis.

You can ~~strike through~~ text as well.

## Links and Images

[Visit OpenAI](https://www.openai.com)

![Cute Cat](https://placekitten.com/200/200)

## Lists

### Unordered List
- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered List
1. First step
2. Second step
   1. Sub-step A
   2. Sub-step B
3. Third step

## Code Examples

Inline code: \`const greeting = "Hello, World!";\`

Code block with syntax highlighting:
\`\`\`javascript
function calculateSum(a, b) {
  return a + b;
}

// Example usage
const result = calculateSum(5, 3);
console.log(result); // Output: 8
\`\`\`

## Tables

| Feature | Description | Support |
|---------|-------------|---------|
| Tables | Organized data display | ✅ |
| Lists | Bullet and numbered lists | ✅ |
| Code Blocks | Syntax highlighting | ✅ |
| Math | LaTeX-style equations | ✅ |

## Blockquotes

> This is a blockquote
> 
> It can span multiple lines
>> And can be nested

## Task Lists

- [x] Create markdown editor
- [x] Add preview pane
- [x] Implement export feature
- [x] Add copy feature
- [ ] Deploy to production

## Mathematical Expressions

When \`a ≠ 0\`, there are two solutions to \`ax² + bx + c = 0\`:

\`\`\`
x = (-b ± √(b² - 4ac)) / (2a)
\`\`\`

## Diagrams (ASCII Art)

\`\`\`
+---------------+
|   Markdown    |
|    Editor     |
+-------+-------+
        |
        v
+---------------+
|    Preview    |
|     Pane      |
+---------------+
\`\`\`

## Horizontal Rule

---

## Footnotes

Here's a sentence with a footnote[^1].

[^1]: This is the footnote content.

## Emoji Support

:smile: :rocket: :books: :computer:

## Definition Lists

Markdown
: A lightweight markup language for creating formatted text.

Preview
: A real-time display of the formatted output.

## Custom HTML (if supported)

<details>
<summary>Click to expand</summary>
This is hidden content that can be expanded.
</details>

---

*End of demonstration*`);

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
            <ReactMarkdown 
              children={markdown} 
              remarkPlugins={[remarkGfm]}
            />
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
