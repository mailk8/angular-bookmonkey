import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { API_URL } from './environments/tokens';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
     platformBrowserDynamic([
  {
    provide: API_URL,
    useValue: environment.apiUrl
  }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));
   });
