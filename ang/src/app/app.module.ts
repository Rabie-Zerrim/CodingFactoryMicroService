import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient,HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PartnershipService } from './services/partnership.service';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastrModule } from "ngx-toastr";
import { AgmCoreModule } from "@agm/core";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { StoreModule } from "@ngrx/store";
import { DragulaService } from "ng2-dragula";
import { NgxSpinnerModule } from 'ngx-spinner';
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from 'ngx-perfect-scrollbar';
import { ModalModule } from '@coreui/angular';

import { SharedModule } from "./shared/shared.module";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { CommonModule } from '@angular/common'; 
import { CourseModule } from './courses/course.module'; 
import { PartnershipModule } from './partnership/partnership.module';
import { ProposalModule } from './proposal/proposal.module';
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule

import { WINDOW_PROVIDERS } from './shared/services/window.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AddAgreementsComponent } from './add-agreements/add-agreements.component';
import { EntrepriseComponent } from './entreprise/entreprise/entreprise.component';
import { from } from 'rxjs';
import { AssessmentListComponent } from './Assessment/assessment-list.component';
import { AssessmentService } from './services/assessment.service';
import { AddAssessmentComponent } from './Assessment/assessment-add.component';
import { PotentialPartnersComponent } from './potentialpartners/potentialpartners.component';

// Firebase configuration (if used)
var firebaseConfig = {
  apiKey: "AIzaSyC9XfnIpwNoSv7cyAsoccFQ5EYPd7lZXrk", //YOUR_API_KEY
  authDomain: "apex-angular.firebaseapp.com", //YOUR_AUTH_DOMAIN
  databaseURL: "https://apex-angular.firebaseio.com", //YOUR_DATABASE_URL
  projectId: "apex-angular", //YOUR_PROJECT_ID
  storageBucket: "apex-angular.appspot.com", //YOUR_STORAGE_BUCKET
  messagingSenderId: "447277845463", //YOUR_MESSAGING_SENDER_ID
  appId: "1:447277845463:web:9a7db7aaeaf3a7217a9992", //YOUR_APP_ID
  measurementId: "G-ZVSYZRJ211" //YOUR_MEASUREMENT_ID
};

// Default configuration for PerfectScrollbar (if used)
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};

// Function to load translations
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    AssessmentListComponent,
    ContentLayoutComponent,
    AddAssessmentComponent,
    AssessmentListComponent,
    AddAgreementsComponent,
    PotentialPartnersComponent, // not PotentialpartnersComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,  // Required for toastr animations
    ToastrModule.forRoot(),    // Required for toastr notifications
    NgxSpinnerModule,
    PartnershipModule,
    ReactiveFormsModule,  // Include ReactiveFormsModule here
    FormsModule,         // ✅ Add this
    ReactiveFormsModule,
    ProposalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyCERobClkCv1U4mDijGm1FShKva_nxsGJY"
    }),
    PerfectScrollbarModule,
    FormsModule, 
    CourseModule,
    PartnershipModule,
    ProposalModule,
  ],
  providers: [
    AssessmentService,
    DragulaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    WINDOW_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
