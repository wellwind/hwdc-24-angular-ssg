import { AfterViewInit, Component, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div>
      <router-outlet />
    </div>
    <hr />
    <div>
      <a routerLink="/">Home</a>
      <span class="link-between">|</span>
      <a routerLink="/about">About</a>
    </div>
  `,
  styles: [
    `
      .link-between {
        margin: 0 8px;
      }
    `,
  ],
})
export class AppComponent implements AfterViewInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngAfterViewInit() {
    this.title.setTitle('Angular SSG Demo');
    this.meta.addTag({ name: 'description', content: 'Angular SSG Demo' });
  }
}
