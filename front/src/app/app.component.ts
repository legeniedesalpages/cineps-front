/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 29/08/2024 - 19:57:05
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 29/08/2024
    * - Author          : renau
    * - Modification    : 
**/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      CinePS
    </div>
  `,
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.info("Launching 'CinePS'");
  }
}
