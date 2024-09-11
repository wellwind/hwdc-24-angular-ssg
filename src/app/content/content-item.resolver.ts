import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { ContentService } from './content.service';
import { inject } from '@angular/core';
import { MarkdownMeta } from '../../../utils/markdown.interface';

export const contentItemResolver: ResolveFn<MarkdownMeta | null> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const contentService = inject(ContentService);
  return contentService.getContentItem(route.paramMap.get('slug') ?? '');
};
