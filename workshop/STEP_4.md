# 透過 Web Components 擴充內容

1. 現況打開 `second-post.md` 檔案，可以看到 `note-block` 標籤，不過目前沒有任何效果

2. 打開 `note-block.component.ts` 檔案，已經有寫好的元件，但還沒辦法正常在 Markdown 產出的 HTML 中使用

3. 在 `main.ts` 中，將內容取代為以下程式

   ```typescript
   import { ApplicationRef } from '@angular/core';
   import { createCustomElement } from '@angular/elements';
   import { createApplication } from '@angular/platform-browser';
   import { AppComponent } from './app/app.component';
   import { appConfig } from './app/app.config';
   import { NoteBlockComponent } from './app/custom-components/note-block.component';
 
   const registerCodeBlockComponent = (app: ApplicationRef) => {
     const counterElement = createCustomElement(NoteBlockComponent, {
       injector: app.injector,
     });
     customElements.define('note-block', counterElement);
   };
 
   (async () => {
     const app = await createApplication(appConfig);
     registerCodeBlockComponent(app);
     app.bootstrap(AppComponent);
   })();
   ```

4. 重新啟動專案，打開 `second-post` 頁面，即可看到效果

> 目前 (18.2.3) 使用 `createCustomElement` 來將元件轉換為 Web Components 的方式，無法使用 Signal Input，以及新的 Flow Syntax (ex: `@if`) 寫法。
