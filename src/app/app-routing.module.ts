import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KanbanComponent } from './components/kanban/kanban.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  
  {path: 'kanban', component: KanbanComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: '/register', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
