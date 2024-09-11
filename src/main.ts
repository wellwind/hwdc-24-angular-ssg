import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// import { ApplicationRef } from '@angular/core';
// import { createCustomElement } from '@angular/elements';
// import { createApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { appConfig } from './app/app.config';
// import { NoteBlockComponent } from './app/custom-components/note-block.component';

// const registerCodeBlockComponent = (app: ApplicationRef) => {
//   const counterElement = createCustomElement(NoteBlockComponent, {
//     injector: app.injector,
//   });
//   customElements.define('note-block', counterElement);
// };

// (async () => {
//   const app = await createApplication(appConfig);
//   registerCodeBlockComponent(app);
//   app.bootstrap(AppComponent);
// })();
