import { Routes } from '@angular/router';
import { logedGuard } from './Core/Guards/loged.guard';
import { authGuard } from './Core/Guards/auth.guard';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    {
        path: '',
        canActivate: [logedGuard],
        loadComponent: () =>
            import('./Layouts/auth-layout/auth-layout.component').then(
                (m) => m.AuthLayoutComponent
            ),
        children: [
            { path: '', redirectTo: 'register', pathMatch: 'full' },
            {
                path: 'register',
                loadComponent: () =>
                    import('./Components/register/register.component').then(
                        (m) => m.RegisterComponent
                    ),
            },
            {
                path: 'login',
                loadComponent: () =>
                    import('./Components/login/login.component').then(
                        (m) => m.LoginComponent
                    ),
            },
            {
                path: 'forget',
                loadComponent: () =>
                    import('./Components/forget-password/forget-password.component').then(
                        (m) => m.ForgetPasswordComponent
                    ),
            },
        ],
    },
    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () =>
            import('./Layouts/blank-layout/blank-layout.component').then(
                (m) => m.BlankLayoutComponent
            ),
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                component:HomeComponent
            },
            {
                path: 'products',
                loadComponent: () =>
                    import('./Components/products/products.component').then(
                        (m) => m.ProductsComponent
                    ),
            },
            {
                path: 'details/:id',
                loadComponent: () =>
                    import('./Components/details/details.component').then(
                        (m) => m.DetailsComponent
                    ),
            },
            {
                path: 'categories',
                loadComponent: () =>
                    import('./Components/categories/categories.component').then(
                        (m) => m.CategoriesComponent
                    ),
            },
            {
                path: 'cart',
                loadComponent: () =>
                    import('./Components/cart/cart.component').then(
                        (m) => m.CartComponent
                    ),
            },
            {
                path: 'brands',
                loadComponent: () =>
                    import('./Components/brands/brands.component').then(
                        (m) => m.BrandsComponent
                    ),
            },
            {
                path: 'orders/:id',
                loadComponent: () =>
                    import('./Components/orders-form/orders-form.component').then(
                        (m) => m.OrdersFormComponent
                    ),
            },
            {
                path: 'wishlist',
                loadComponent: () =>
                    import('./Components/wishlist/wishlist.component').then(
                        (m) => m.WishlistComponent
                    ),
            },
            {
                path: 'allorders',
                loadComponent: () =>
                    import('./Components/allorders/allorders.component').then(
                        (m) => m.AllordersComponent
                    ),
            },
        ],
    },
    {
        path: '**',
        loadComponent: () =>
            import('./Components/notfound/notfound.component').then(
                (m) => m.NotfoundComponent
            ),
    },
];




////-------------> Without Lazyloading
// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './Layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './Layouts/blank-layout/blank-layout.component';
// import { NotfoundComponent } from './Components/notfound/notfound.component';
// import { RegisterComponent } from './Components/register/register.component';
// import { LoginComponent } from './Components/login/login.component';
// import { HomeComponent } from './Components/home/home.component';
// import { ProductsComponent } from './Components/products/products.component';
// import { CategoriesComponent } from './Components/categories/categories.component';
// import { CartComponent } from './Components/cart/cart.component';
// import { BrandsComponent } from './Components/brands/brands.component';
// import { logedGuard } from './Core/Guards/loged.guard';
// import { authGuard } from './Core/Guards/auth.guard';
// import { DetailsComponent } from './Components/details/details.component';
// import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
// import { OrdersFormComponent } from './Components/orders-form/orders-form.component';
// import { AllordersComponent } from './Components/allorders/allorders.component';



// export const routes: Routes = [
//     {path:'', component:AuthLayoutComponent , canActivate:[logedGuard],
//         children:[
//             {path:'', redirectTo:'register', pathMatch:'full'},
//             {path:'register', component:RegisterComponent},
//             {path:'login', component:LoginComponent},
//             {path:'forget', component:ForgetPasswordComponent},
//         ]
//     },
//     {path:'', component:BlankLayoutComponent, canActivate:[authGuard],
//         children:[
//             {path:'', redirectTo:'home', pathMatch: 'full'},
//             {path:'home', component:HomeComponent},
//             {path:'products', component:ProductsComponent},
//             {path:'details/:id', component:DetailsComponent},
//             {path:'categories', component:CategoriesComponent},
//             {path:'cart', component:CartComponent},
//             {path:'brands', component:BrandsComponent},
//             {path:'orders/:id', component:OrdersFormComponent},
//             {path:'allorders', component:AllordersComponent},
//         ]
//     },

//     {path:'**', component:NotfoundComponent},
// ];
