import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Partnership } from 'app/models/partnership';

    @Component({
        selector: 'app-invoice',
        templateUrl: './invoice-page.component.html',  // Make sure the path is correct
        styleUrls: ['./invoice-page.component.scss']
      })
      
      export class InvoicePageComponent implements OnInit {
        selectedPartnership: any;  // Ensure this is correctly populated
        partnershipService: any;
        
        ngOnInit() {
          // Log to check if selectedPartnership is populated
          console.log('selectedPartnership:', this.selectedPartnership);
      
          // Example assignment for testing
          this.selectedPartnership = {
            idPartnership: 1,
            partnershipStatus: 'Active',
            entreprise: {
              nameEntreprise: 'Test Enterprise'
            },
            proposals: {
              idProposal: 101,
              startDate: new Date('2025-01-01'),
              endDate: new Date('2025-12-31')
            }
          };
        }
      
        closeDetails() {
          this.selectedPartnership = null;
        }
        viewPartnershipDetails(id: number): void {
            this.partnershipService.getPartnershipById(id).subscribe((partnership) => {
              this.selectedPartnership = partnership;
              console.log('Selected Partnership:', this.selectedPartnership); // Debugging to check data
            });
          }
          
          
       
          
      }