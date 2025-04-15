import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { TimelineVerticalCenterPageComponent } from './timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  {
    path: '',
    children: [

    
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },
      
      {
        path: 'timeline-vertical-center',
        component: TimelineVerticalCenterPageComponent,
        data: {
          title: 'Timeline Vertical Center Page'
        }
      },
    
     
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings Page'
        }
      },
     
     
    
      {
        path: 'kb',
        loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
      },
  
      
      
      
     
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
