import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";

import { InvoicePageComponent } from "./invoice/invoice-page.component";

import { TimelineVerticalCenterPageComponent } from "./timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
@NgModule({
  declarations: [TimelineVerticalCenterPageComponent],
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
  ],
  
})
export class FullPagesModule {}
