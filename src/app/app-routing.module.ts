import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    loadChildren: './core/core.module#CoreModule',
    path: 'app',
  },
  {
    loadChildren: './auth/auth.module#AuthModule',
    path: 'auth',
  },
  { loadChildren: './landing/landing.module#LandingModule',
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
