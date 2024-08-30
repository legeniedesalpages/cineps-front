/**
    * @description      : 
    * @author           : renau
    * @group            : 
    * @created          : 13/12/2022 - 11:54:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 13/12/2022
    * - Author          : renau
    * - Modification    : 
**/
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { Router, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/core/service/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public readonly loginForm: FormGroup

  public hidePassword: boolean
  public errors: boolean
  public errorMessage: any
  public loading: boolean

  constructor(private router: Router, private authService: AuthService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
    });

    this.hidePassword = true
    this.errors = false
    this.errorMessage = null
    this.loading = false
  }

  ngOnInit(): void {
    console.debug('Show login page')
  }

  public onSubmit() {
    console.info("submitting login form")
    this.loading = true
    this.errors = false
    this.errorMessage = null

    this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: _ => {
        this.loading = false
        this.router.navigate(['/'])
      },
      error: _ => {
        this.errors = true
        this.errorMessage = "login ou mot de passe inccorect"
        this.loading = false
      }
    })
  }
}
