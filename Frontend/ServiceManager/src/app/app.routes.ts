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
    }

   
];

    
