import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContentList } from './content.interface';
import { map } from 'rxjs';
import { parseMarkdownMeta } from '../../../utils/parse-markdown-meta';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  private httpClient = inject(HttpClient);

  getContentList() {
    return this.httpClient
      .get<ContentList>('content/content-list.json')
      .pipe(
        map((response) =>
          response.sort((a, b) => b.date.localeCompare(a.date)),
        ),
      );
  }

  getContentItem(slug: string) {
    return this.httpClient
      .get(`./content/${slug}/${slug}.md`, { responseType: 'text' })
      .pipe(map((content) => parseMarkdownMeta(content, slug)));
  }
}
