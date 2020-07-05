import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { AutofillMonitor } from '@angular/cdk/text-field';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UserManagementService } from './service/user-management.service';
import { UserEntity } from './entity/userEntity';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements AfterViewInit, OnDestroy {
  hide = true;
  userModel = new UserEntity('', '', '', '', '', '');
  isUserNameError: Boolean = false;
  isPasswordError: Boolean = false;
  userNameErrorMsg: string = "";
  passwordErrorMsg: string = "";

  readonly phoneFormControl = new FormControl('', [
    Validators.required, Validators.pattern(("[6-9]\\d{9}"))
  ]);

  constructor(private _autofill: AutofillMonitor,
    private _activedRoute: ActivatedRoute,
    private _route: Router,
    private userService: UserManagementService) { }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }
  login() {
    console.log(this.userModel);
    if (this.userModel.userName == "" && this.userModel.password == "") {
      this.isUserNameError = true;
      this.isPasswordError = true;
      this.userNameErrorMsg = "Username is mandatory.";
      this.passwordErrorMsg = "Password is mandatory.";
    } else if (this.userModel.userName == "") {
      this.isPasswordError = false;
      this.passwordErrorMsg = "";
      this.isUserNameError = true;
      this.userNameErrorMsg = "Username is mandatory.";
    } else if (this.userModel.password == "") {
      this.isUserNameError = false;
      this.userNameErrorMsg = "";
      this.isPasswordError = true;
      this.passwordErrorMsg = "Password is mandatory.";
    } else {
      this.isUserNameError = false;
      this.isPasswordError = false;
      this.userNameErrorMsg = "";
      this.passwordErrorMsg = "";
      this.userService.isUserNameExist(this.userModel.userName).subscribe(isUserNameExist => {
        if (isUserNameExist) {
          this.isUserNameError = false;
          this.userNameErrorMsg = "";
          this.userService.isUserExist(this.userModel.userName, this.userModel.password).subscribe(isUserExist => {
            if (isUserExist) {
              this.isPasswordError = false;
              this.passwordErrorMsg = "";
              this._route.navigate(['/portal', this.userModel.userName]);
            } else {
              this.isPasswordError = true;
              this.passwordErrorMsg = "Invalid Password !";
            }
          });
        } else {
          this.isUserNameError = true;
          this.userNameErrorMsg = "Invalid Username !";
        }
      });
    }
  }
  getMeWhileUsernameType(searchValue: string): void {
    this.userNameErrorMsg = "";
  }
  getMeWhilePasswordType(searchValue: string): void {
    this.passwordErrorMsg = "";
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
