import { Routes } from '@angular/router';
export const appRoutes: Routes = [
    // {
    //     path: 'account',
    //     loadChildren: './features/account/account.module#AccountModule'
    // },
    {
        path: 'sample',
        loadChildren: './features/sample/sample.module#SampleModule'
    },    
    { path: '**', redirectTo: 'sample' }
];
