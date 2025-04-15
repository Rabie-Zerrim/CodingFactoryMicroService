import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Entreprise } from 'app/models/entreprise';
import { EntrepriseService } from 'app/services/entreprise.service';

@Component({
  selector: 'app-entreprise-add',
  templateUrl: './entreprise-add.component.html',
  styleUrls: ['./entreprise-add.component.scss'],
})
export class EntrepriseAddComponent {
  entreprise: Entreprise = {
    nameEntreprise: '',
    addressEntreprise: '',
    phoneEntreprise: '',
    emailEntreprise: '',
    descriptionEntreprise: '',
  };

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router
  ) {}

  // Submit the form
  onSubmit(): void {
    this.entrepriseService.createEntreprise(this.entreprise).subscribe({
      next: () => {
        console.log('Entreprise created successfully');
        this.router.navigate(['/entreprise']); // Navigate back to the list
      },
      error: (error) => {
        console.error('Error creating entreprise:', error);
      },
    });
  }

  // Cancel and navigate back to the list
  onCancel(): void {
    this.router.navigate(['/entreprise']);
  }
}