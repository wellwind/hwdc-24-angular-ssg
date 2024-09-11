import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ContentService } from './content.service';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [RouterLink, JsonPipe],
  template: `
    @for (contentItem of contentList(); track contentItem.slug) {
      <div>
        <h2>
          <a [routerLink]="contentItem.slug">{{ contentItem.title }}</a>
        </h2>
        <div>{{ contentItem.date }}</div>
        <div [innerHTML]="contentItem.summary"></div>
      </div>
    }
  `,
  styles: ``,
})
export default class ContentListComponent {
  private contentService = inject(ContentService);

  private contentList$ = this.contentService.getContentList();
  protected contentList = toSignal(this.contentList$);
}
