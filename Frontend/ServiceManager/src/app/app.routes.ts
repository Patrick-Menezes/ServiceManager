import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'AddOrder',
        loadComponent: () => import('./components/add-order/add-order').then(m => m.AddOrder)
    },
    {
        path: 'Home', // Dê um nome à rota
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },

    {
        path: '',
        redirectTo: 'Home',
        pathMatch: 'full'
    },
    {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details').then(m => m.Details),
   
    },
    {
        path: 'update/:id',
        loadComponent: () => import('./components/update/update').then(m => m.Update)
    }

   
];

    
