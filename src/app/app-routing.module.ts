import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  
  {path: 'kanban', component: KanbanComponent, canActivate: [authGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
