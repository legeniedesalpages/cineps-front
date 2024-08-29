/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 19/12/2022 - 11:27:36
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 19/12/2022
    * - Author          : renau
    * - Modification    : 
**/
import { Component, OnInit } from '@angular/core'
import { environment } from 'src/environments/environment'
import { LayoutComponent } from '../layout/layout.component'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule} from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    LayoutComponent,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatButtonModule
  ]
})
export class HomeComponent implements OnInit {

  public env = environment

  constructor() {
  }

  ngOnInit(): void {
  }

  logout() {
  }
}