import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as path from 'path';

import * as fs from 'fs';
import * as matter from 'gray-matter';
import * as marked from 'marked';

interface ContentItem {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

interface Options {
  contentDir: string;
  contentListPath: string;
  routesPath: string;
}

export function generateContentList(options: Options): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('📄 Generate content list');

    const { contentDir, contentListPath, routesPath } = options;

    const contentList: Array<ContentItem> = [];
    const routes: Array<string> = [];

    // 讀取內容目錄
    const folders = fs.readdirSync(contentDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    folders.forEach(folder => {
      const files = fs.readdirSync(path.join(contentDir, folder));
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const filePath = path.join(contentDir, folder, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data, content: markdown } = matter(content);

          const slug = path.basename(file, '.md');
          const title = data.title || '';
          const date = data.date ? new Date(data.date).toISOString() : '';

          // 提取摘要
          const summaryMatch = markdown.match(/^([\s\S]*?)<!-- more -->/);
          const summary = summaryMatch ? marked.parse(summaryMatch[1].trim(), { async: false }) : '';

          contentList.push({ slug, title, date, summary: summary.trim() });
          routes.push(slug);
        }
      });

      // 按日期排序
      contentList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // 寫入 content-list.json
      if (!tree.exists(contentListPath)) {
        tree.create(contentListPath, '[]');
      }
      tree.overwrite(contentListPath, JSON.stringify(contentList));

      // 寫入 routes.txt
      if (!tree.exists(routesPath)) {
        tree.create(routesPath, '');
      }
      tree.overwrite(routesPath, routes.join('\n'));
    });

    _context.logger.info('✅ Done');

    return tree;
  };
}
