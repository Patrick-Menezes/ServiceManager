import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', // Home
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },
    {
        path: 'AddOrder', // AddOrder
        loadComponent: () => import('./components/addOrderService/add-order-service').then(m => m.AddOrderService)
    }
];