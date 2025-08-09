import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {path: 'kanban', component: KanbanComponent, canActivate: [authGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: RegisterComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
