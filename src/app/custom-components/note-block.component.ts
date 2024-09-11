import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  template: `
    <div class="color-{{ color }}">
      <div class="content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      margin: 8px 0;
    }

    .content {
      padding: 8px;
    }

    .color-warning {
      border: 1px solid red;
      background-color: #fdd;
    }

    .color-important {
      border: 1px solid green;
      background-color: #dfd;
    }

    .color-info {
      border: 1px solid blue;
      background-color: #ddf;
    }
  `,
})
export class NoteBlockComponent {
  @Input()
  color = '';
}
