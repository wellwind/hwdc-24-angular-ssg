import * as yaml from 'js-yaml';
import { MarkdownMeta, MarkdownYamlMeta } from './markdown.interface';
import { transformMarkdown } from './transform-markdown';

const markdownYamlMetaPattern = /^(?:\-\-\-)(.*?)(?:\-\-\-|\.\.\.)/s;

export const parseMarkdownMeta = (markdownContent: string, slug: string) => {
  const yamlMetaMatch = markdownContent.match(markdownYamlMetaPattern);

  if (!yamlMetaMatch || yamlMetaMatch.length <= 1) {
    return null;
  }

  const yamlContent = yamlMetaMatch[1];
  const yamlMeta = yaml.load(yamlContent) as MarkdownYamlMeta;

  // split by <!-- more -->
  const blogContent = markdownContent.replace(yamlMetaMatch[0], '');
  const blogContentChunks = blogContent.split(/<!--\s*more\s*-->/);

  let summary = '';
  let content = '';
  if (blogContentChunks.length === 1) {
    summary = blogContentChunks[0];
    content = blogContentChunks[0];
  } else {
    summary = blogContentChunks[0];
    content = blogContentChunks.slice(1).join('\r\n');
  }

  return <MarkdownMeta>{
    slug: slug,
    title: yamlMeta.title,
    date: new Date(yamlMeta.date).toISOString().slice(0, 19).replace(/T/g, ' '),
    summary: transformMarkdown(summary, slug),
    content: transformMarkdown(content, slug),
  };
};
