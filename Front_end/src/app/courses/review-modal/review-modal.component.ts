// review-modal.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ReviewService } from '../../services/review';
import { StorageService } from 'app/shared/auth/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss']
})
export class ReviewModalComponent {
  @Input() showModal: boolean = false;
  @Input() selectedCourse: any;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() reviewAdded = new EventEmitter<void>();

  review = {
    studentId: 0,
    rating: 1,
    comment: ''
  };
  hasReviewed = false;
  loading = false;

  constructor(
    private reviewService: ReviewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.review.studentId = StorageService.getUserId();
    this.checkIfReviewed();
  }

  checkIfReviewed(): void {
    if (this.selectedCourse && this.review.studentId) {
      this.reviewService.hasStudentReviewed(this.review.studentId, this.selectedCourse.id)
        .subscribe(hasReviewed => {
          this.hasReviewed = hasReviewed;
          this.cdr.detectChanges();
        });
    }
  }

  setRating(rating: number): void {
    this.review.rating = rating;
  }

  submitReview(): void {
    if (this.hasReviewed) {
      Swal.fire('Error', 'You have already reviewed this course', 'error');
      return;
    }

    this.loading = true;

    const reviewData = {
      studentId: this.review.studentId,
      courseId: this.selectedCourse.id,
      rating: this.review.rating,
      comment: this.review.comment
    };

    this.reviewService.addReview(reviewData).subscribe({
      next: () => {
        this.hasReviewed = true;
        this.loading = false;
        Swal.fire('Success', 'Review submitted successfully!', 'success');
        this.reviewAdded.emit();
        this.closeModal();
      },
      error: (error) => {
        this.loading = false;
        console.error('Review submission error:', error);

        // Handle 409 Conflict (already reviewed)
        if (error.status === 409) {
          this.hasReviewed = true;
          Swal.fire('Info', 'You have already reviewed this course', 'info');
          this.closeModal();
          return;
        }

        // Handle other errors
        const errorMessage = error.error?.message ||
          (typeof error.error === 'string' ? error.error : 'Failed to submit review');
        Swal.fire('Error', errorMessage, 'error');
      }
    });
  }
  closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(false);
  }
}
