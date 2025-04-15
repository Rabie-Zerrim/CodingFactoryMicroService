import { Component, OnInit } from '@angular/core';
import { Partnership } from 'app/models/partnership';
import { PartnershipService } from 'app/services/partnership.service';

@Component({
  selector: 'app-timeline-vertical-center-page',
  templateUrl: './timeline-vertical-center-page.component.html',
  styleUrls: ['./timeline-vertical-center-page.component.scss']
})
export class TimelineVerticalCenterPageComponent implements OnInit {
  partnerships: Partnership[] = []; // Array to store the fetched partnerships
  partnerId = 123; // Example partner ID (you should replace this with dynamic value)
  accessToken: string = 'eyJzdiI6IjAwMDAwMiIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6ImFhYWI5YTdmLTBjZDQtNDJlZi04OWU4LTM2NmE2MjExZjMwZCJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiJSaW5BY0tnM1N1MmoyNGJ3RU1mLXh3IiwidmVyIjoxMCwiYXVpZCI6IjUyNDRiMjc0Y2Y0ZjhkODEwYzk2Nzg3NzViNTliYjgwMWI3ODFmOWQ2YjU4YzY3N2YxZjQxODZiODI0OTFhZjYiLCJuYmYiOjE3NDQyMDUwMzYsImNvZGUiOiJEeTc3aExFRDdPUWZPdjBNUl9RUmEyYnpPbVBXVmdOSGciLCJpc3MiOiJ6bTpjaWQ6b2dDOWdzbzFSSXl4bzJFZ2dydDRhUSIsImdubyI6MCwiZXhwIjoxNzQ0MjA4NjM2LCJ0eXBlIjowLCJpYXQiOjE3NDQyMDUwMzYsImFpZCI6Il9EZWhDM05BVEJXZDQwcVJ1NlRhaHcifQ.DMeGKg-cqbyrog3Xj97s73hTlJBdZL_DgpShlOQMJM4-6mU9-emnz63s20EtkSFYiXlx9Mt8-VTDgZtmMox04g'; // Add the Zoom access token here manually
  errorMessage: string = '';

  constructor(private partnershipService: PartnershipService) {}

  ngOnInit(): void {
    this.loadPartneredPartnerships();
  }

  loadPartneredPartnerships(): void {
    // Fetch the partnerships the partner has applied for from the backend
    this.partnershipService.getPartnerships().subscribe({
      next: (partnerships) => {
        this.partnerships = partnerships;
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch partnerships';
      }
    });
  }

  // Method to book a Zoom meeting for a partnership
  bookMeeting(partnershipId: number): void {
    if (!this.accessToken) {
      this.errorMessage = 'Zoom access token is missing';
      console.error('Zoom access token is missing');
      return;
    }

    const topic = `Meeting for Partnership #${partnershipId}`;
    const startTime = new Date().toISOString(); // Use current time as example
    const duration = 30; // Example: 30 minutes duration
    const recipientEmail = 'partner@example.com'; // Replace with actual recipient email

    // Calling the PartnershipService to create the Zoom meeting
    this.partnershipService.createMeeting(topic, startTime, duration, this.accessToken, recipientEmail).subscribe({
      next: (meetingUrl) => {
        console.log('Zoom meeting created:', meetingUrl);
        alert(`Zoom meeting created! Join here: ${meetingUrl}`);
      },
      error: (err) => {
        this.errorMessage = 'Error creating Zoom meeting';
        console.error(err);
      }
    });
  }
}
