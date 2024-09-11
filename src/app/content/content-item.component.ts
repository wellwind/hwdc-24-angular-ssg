import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { MarkdownMeta } from '../../../utils/markdown.interface';
import { Title, Meta } from '@angular/platform-browser';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';

@Component({
  selector: 'app-content-item',
  standalone: true,
  imports: [SafeHtmlPipe],
  template: `
    <h1>{{ contentItem()?.title }}</h1>
    <div [innerHTML]="contentItem()?.summary | safeHtml"></div>
    <div [innerHTML]="contentItem()?.content | safeHtml"></div>
  `,
  styles: ``,
})
export default class ContentItemComponent {
  private route = inject(ActivatedRoute);

  private contentItem$ = this.route.data.pipe(
    map((data) => data['contentItem'] as MarkdownMeta),
  );
  protected contentItem = toSignal(this.contentItem$);

  private title = inject(Title);
  private meta = inject(Meta);

  seoEffect = effect(() => {
    this.title.setTitle(`${this.contentItem()?.title} | Angular SSG Demo`);
    this.meta.updateTag({
      name: 'description',
      content: this.contentItem()?.summary ?? '',
    });
  });
}
