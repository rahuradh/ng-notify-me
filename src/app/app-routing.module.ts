import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalPageComponent } from './portal-page/portal-page.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ApplicationPageComponent } from './application-page/application-page.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'portal/:userName',
    component: PortalPageComponent
  },
  {
    path: 'detail/:userName/:eventId',
    component: ApplicationPageComponent
  },
  {
    path: 'input/:userName/:eventId',
    component: ApplicationPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
component: LoginPageComponent
export const AppRoutingComponents = [AppComponent, LoginPageComponent, PortalPageComponent, ApplicationPageComponent];