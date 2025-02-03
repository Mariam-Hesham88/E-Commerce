import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProductsComponent } from './Components/products/products.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { CartComponent } from './Components/cart/cart.component';
import { BrandsComponent } from './Components/brands/brands.component';

export const routes: Routes = [
    {path:'', component:AuthLayoutComponent , 
        children:[
            {path:'', redirectTo:'register', pathMatch:'full'},
            {path:'register', component:RegisterComponent},
            {path:'login', component:LoginComponent},
        ]
    },
    {path:'', component:BlankLayoutComponent,
        children:[
            {path:'', redirectTo:'home', pathMatch: 'full'},
            {path:'home', component:HomeComponent},
            {path:'products', component:ProductsComponent},
            {path:'categories', component:CategoriesComponent},
            {path:'cart', component:CartComponent},
            {path:'brands', component:BrandsComponent},
        ]
    },

    {path:'**', component:NotfoundComponent},
];
