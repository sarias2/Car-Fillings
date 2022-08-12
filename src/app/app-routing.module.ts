import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddFillingComponent } from './pages/add-filling/add-filling.component';
import { AllFillingsComponent } from './pages/all-fillings/all-fillings.component';
import { GraphicsComponent } from './pages/graphics/graphics.component';

const routes: Routes = [
  { path: '', component: AllFillingsComponent},
  { path: 'add-filling', component: AddFillingComponent},
  { path: 'graphics', component: GraphicsComponent},
  { path: '*', component: AppComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
