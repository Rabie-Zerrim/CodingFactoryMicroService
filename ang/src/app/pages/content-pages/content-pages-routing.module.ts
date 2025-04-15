import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";



const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
     
       
      
      
     
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
