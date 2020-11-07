import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RateComponent } from './components/rate/rate.component';
// importar componentes

// arreglo de rutas
const routes: Routes = [ {path: '', component: HomeComponent},
{path: 'home', component: HomeComponent},
{path: 'rate', component: RateComponent},
{path: '', redirectTo:'home', pathMatch: 'full'}, // cuando este vacia la redirigimos 
{path: '**', component: HomeComponent} // cuando la ruta falle, cargamos tienda

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
