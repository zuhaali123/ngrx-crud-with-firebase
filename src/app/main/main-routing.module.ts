import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModule } from './main.module';
import { MainComponent } from './main.component';

const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: [
        {
            path: '',
            redirectTo: 'main',
            pathMatch: 'full',
        },
        {
            path: 'home',
            loadChildren: () =>
              import('./home/home.module').then((m) => m.HomeModule),
        },
        {
            path: 'messages',
            loadChildren: () =>
              import('./messages/messages.module').then((m) => m.MessagesModule),
        },
      ],
    },
      {
        path: '**',
        redirectTo: 'main',
      },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
