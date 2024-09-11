import { dasherize } from '@angular-devkit/core/src/utils/strings';
import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import * as path from 'path';

interface Options {
  name: string;
}

export function generateContentMarkdown(options: Options): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info('📄 Generate a content');

    // file name & path
    const dasherizeName = `${dasherize(options.name)}`;
    const fileName = `${dasherizeName}.md`;
    const filePath = ['public', 'content', dasherizeName, fileName].join(path.sep);

    // content
    const date = new Date();
    const isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();

    const fileContent = `---
title: "${options.name}"
date: ${isoDateTime.substr(0, 19).replace('T', ' ')}
---

<!-- more -->
`;

    // create file
    tree.create(filePath, fileContent);

    _context.logger.info('✅ Done');

    return tree;
  };
}
