import { Pipe, PipeTransform, Sanitizer, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  transform(value?: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(value ?? '');
  }
}
