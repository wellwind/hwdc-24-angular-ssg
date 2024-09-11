import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

const markedHighlightExtension = markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
});

marked.use(markedHighlightExtension);

const markdown = {
  render: (content: string) => marked.parse(content) as string,
};
export const transformMarkdown = (content: string, slug: string) =>
  markdown.render(content);
