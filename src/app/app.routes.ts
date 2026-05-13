import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { SobreNosotrosComponent } from './components/sobre-nosotros/sobre-nosotros.component';
import { NuestroTrabajoComponent } from './components/nuestro-trabajo/nuestro-trabajo.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'nuestro-trabajo', component: NuestroTrabajoComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'productos/:slug', component: ProductCategoryComponent },
  { path: '**', redirectTo: '' },
];
