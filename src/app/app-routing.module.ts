import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {path:"", loadChildren: () => import("./core/auth/auth.module").then(m => m.AuthModule)},
  {path:"", canActivateChild: [AuthGuard], loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
