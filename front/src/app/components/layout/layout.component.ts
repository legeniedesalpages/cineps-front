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
import { CommonModule, Location } from '@angular/common'
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIcon } from '@angular/material/icon'
import { fromEvent } from "rxjs"

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatIcon,
    MatButtonModule,
    CommonModule
  ],
  template: `
    <div class="container">
      <div class="header background-primary" #headerDiv>
        <button mat-icon-button *ngIf="withBackButton" (click)="back()"><mat-icon>keyboard_backspace</mat-icon></button>
        <ng-content select="ng-container[role=header]"></ng-content>
      </div>
      
      <div class="content" #contentDiv>
        <ng-content select="ng-container[role=body]" (scrollPosition)="scrollChanged($event)"></ng-content>
      </div>
      
      <div class="bottom">
        <ng-content select="ng-container[role=footer]"></ng-content>
      </div>
    </div>

  `,
  styles: [`
    .container {
      width:100%;
      height:100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .header {
      width: 100%;
      height: 60px;
      display: flex;
      flex-direction: row;
      align-items: center;
      z-index:999;
      overflow: hidden;
    }

    .scrolling {
      box-shadow: 0 8px 5px 1px rgba(0, 0, 0, 0.3);
    }

    .content {
      flex: 1;
      overflow: auto;
    }

    .bottom {
      width:100%;
    }

    ::ng-deep.title {
      text-align: center;
      width:100%;
      text-transform: uppercase;
    }
  `]
})
export class LayoutComponent implements OnInit {

  @ViewChild('headerDiv', { static: true }) private headerDiv!: ElementRef<HTMLDivElement>
  @ViewChild('contentDiv', { static: true }) private contentDiv!: ElementRef<HTMLDivElement>

  @Input() public withBackButton!: boolean
  @Output() public backButtonAction = new EventEmitter<void>

  constructor(private location: Location) { }

  ngOnInit(): void {
    fromEvent(this.contentDiv.nativeElement, "scroll").subscribe(() => {
      const elt = this.contentDiv.nativeElement
      if (elt.scrollTop == 0) {
        this.headerDiv.nativeElement.classList.remove('scrolling')
      } else {
        this.headerDiv.nativeElement.classList.add('scrolling')
      }
    })
  }

  public back(): void {
    if (this.backButtonAction.observed) {
      this.backButtonAction.emit()
    } else {
      this.location.back()
    }
  }
}
