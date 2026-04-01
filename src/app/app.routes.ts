import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'productos/:slug', component: ProductCategoryComponent },
  { path: '**', redirectTo: '' },
];
