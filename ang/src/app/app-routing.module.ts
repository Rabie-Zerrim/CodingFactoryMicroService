// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';

import { Full_ROUTES } from './shared/routes/full-layout.routes';
import { CONTENT_ROUTES } from './shared/routes/content-layout.routes';

import { TimelineVerticalCenterPageComponent } from './pages/full-pages/timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component';
import { InvoicePageComponent } from './pages/full-pages/invoice/invoice-page.component';
import { AddAgreementsComponent } from './add-agreements/add-agreements.component';  // import your component
import { EntrepriseAddComponent } from './entreprise/entreprise/entreprise-add/entreprise-add.component';
import { AssessmentListComponent } from './Assessment/assessment-list.component';
import { AddAssessmentComponent } from './Assessment/assessment-add.component';
import { ScrapingComponent } from './WebScraping/scraping.component';
import { PotentialPartnersComponent } from './potentialpartners/potentialpartners.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FullLayoutComponent,
    data: { title: 'Full Views' },
    children: [
      ...Full_ROUTES,
      { path: 'invoice/:id', component: InvoicePageComponent },
      { path: 'partnerships/:id/add-agreements', component: AddAgreementsComponent },
      { path: 'entreprise/add', component: EntrepriseAddComponent },
      { path: 'scraping', component: ScrapingComponent },
      { path: 'addassessment', component: AddAssessmentComponent },
      { path: 'assessment-list', component: AssessmentListComponent },
      { path: 'assessments', component: AssessmentListComponent },
      {
        path: 'entreprise',
        loadChildren: () => import('./entreprise/entreprise/entreprise.module').then(m => m.EntrepriseModule),
      },
      {
        path: 'partnership',
        loadChildren: () => import('./partnership/partnership.module').then(m => m.PartnershipModule),
      },
      {
        path: 'proposal',
        loadChildren: () => import('./proposal/proposal.module').then(m => m.ProposalModule),
      },
      {
        path: 'partnerships',
        loadChildren: () => import('./data-tables/data-tables.module').then(m => m.DataTablesModule),
      },
      { path: '', redirectTo: '/partnerships', pathMatch: 'full' }, // Only one default redirect
      { path: 'potentialpartners', component: PotentialPartnersComponent },
      { path: 'TimelineVerticalCenterPage', component: TimelineVerticalCenterPageComponent },
      { path: 'assessments', redirectTo: '/assessments' }, // Only one default redirect

    ]
    ,
  },
  {
    path: '',
    component: ContentLayoutComponent,
    data: { title: 'Content Views' },
    children: CONTENT_ROUTES, // Add your content layout-specific routes here
  },
  {
    path: '**', // Wildcard route for unmatched paths (404 page)
    redirectTo: 'pages/error',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}