/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 29/08/2024 - 19:57:45
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/08/2024
    * - Author          : renau
    * - Modification    : 
**/
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
