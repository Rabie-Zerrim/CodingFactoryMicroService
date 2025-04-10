import { Component, Input, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/courses';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CategoryEnum } from '../../models/CategoryEnum';

@Component({
  selector: 'app-edit-course-modal',
  templateUrl: './edit-course-modal.component.html',
  styleUrls: ['./edit-course-modal.component.scss']
})
export class EditCourseModalComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Input() courseId!: number;
  @Output() showModalChange = new EventEmitter<boolean>();
  @Output() courseUpdated = new EventEmitter<Course>();

  // Keep both string array and enum for flexibility
  categoryEnumStrings = ["WEB_DEVELOPMENT", "DATA_SCIENCE", "SECURITY", "AI", "CLOUD"];
  categoryEnum = CategoryEnum;
  course: Course = new Course();
  imageUploading: boolean = false;
  imageUploaded: boolean = false;

  // Error messages for validation
  titleError: string | null = null;
  descriptionError: string | null = null;
  categoryError: string | null = null;
  levelError: string | null = null;
  imageError: string | null = null;

  constructor(
    private courseService: CourseService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.loadCourseData();
    }
  }

  ngOnChanges(): void {
    if (this.courseId && this.showModal) {  // Only load when modal is shown
      this.loadCourseData();
    }
  }


  loadCourseData(): void {
    console.log('Loading course data for ID:', this.courseId);
    this.courseService.getCourseById(this.courseId).subscribe(
      (response: any) => { // Temporarily use 'any' to bypass type checking
        console.log('Full API response:', response);

        // Handle both nested and direct course responses
        const apiCourse = response.course ? response.course : response;
        console.log('Extracted course data:', apiCourse);

        // Create a new Course object with all properties
        this.course = {
          id: apiCourse.id,
          title: apiCourse.title,
          description: apiCourse.description,
          level: apiCourse.level,
          rate: apiCourse.rate || 0,
          image: apiCourse.image,
          categoryCourse: apiCourse.categoryCourse,
          qrCodeUrl: apiCourse.qrCodeUrl,
          trainerId: apiCourse.trainerId,
          trainerName: apiCourse.trainerName,
          resources: apiCourse.resources || []
        };

        console.log('Assigned course object:', this.course);
        this.imageUploaded = !!this.course.image;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching course:', error);
        Swal.fire('Error', 'Failed to load course data', 'error');
      }
    );
  }
  closeModal(): void {
    this.showModal = false;
    this.showModalChange.emit(this.showModal);
  }

  validateForm(): boolean {
    let isValid = true;

    // Validate Title
    if (!this.course.title) {
      this.titleError = 'Title is required.';
      isValid = false;
    } else if (this.course.title.length > 100) {  // Changed to match backend (100 chars)
      this.titleError = 'Title must be less than 100 characters.';
      isValid = false;
    } else {
      this.titleError = null;
    }

    // Validate Description
    if (!this.course.description) {
      this.descriptionError = 'Description is required.';
      isValid = false;
    } else if (this.course.description.length > 500) {  // Changed to match backend (500 chars)
      this.descriptionError = 'Description must be less than 500 characters.';
      isValid = false;
    } else {
      this.descriptionError = null;
    }

    // Validate Category
    if (!this.course.categoryCourse) {
      this.categoryError = 'Category is required.';
      isValid = false;
    } else {
      this.categoryError = null;
    }

    // Validate Level
    if (!this.course.level) {
      this.levelError = 'Level is required.';
      isValid = false;
    } else if (this.course.level.length > 20) {  // Changed to match backend (20 chars)
      this.levelError = 'Level must be less than 20 characters.';
      isValid = false;
    } else {
      this.levelError = null;
    }

    // Validate Image
    if (!this.course.image) {
      this.imageError = 'Image is required.';
      isValid = false;
    } else {
      this.imageError = null;
    }

    return isValid;
  }
  private prepareCourseForUpdate(): Course {
    const courseToUpdate = { ...this.course };

    // Convert category string back to enum for backend
    if (typeof courseToUpdate.categoryCourse === 'string') {
      courseToUpdate.categoryCourse = CategoryEnum[courseToUpdate.categoryCourse as keyof typeof CategoryEnum];
    }

    return courseToUpdate;
  }

  updateCourse(): void {
    if (!this.validateForm()) {
      return;
    }

    const courseToUpdate = this.prepareCourseForUpdate();

    this.courseService.updateCourse(this.courseId, courseToUpdate).subscribe(
      (updatedCourse) => {
        this.courseUpdated.emit(updatedCourse);
        this.closeModal();
        Swal.fire('Success!', 'Course updated successfully!', 'success');
      },
      (error) => {
        console.error('Error updating course:', error);
        if (error.error) {
          const errorMessages = Object.values(error.error).join('\n');
          Swal.fire('Validation Error', errorMessages, 'error');
        } else {
          Swal.fire('Error', 'Failed to update course', 'error');
        }
      }
    );
  }
  async onImageSelected(event: Event): Promise<void> {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.imageUploading = true;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const fileUrl = await this.http.post(
        'http://localhost:8090/courses/upload',
        formData,
        { responseType: 'text' }
      ).toPromise();

      if (fileUrl) {
        this.course.image = fileUrl;
        this.imageUploaded = true;
        this.imageError = null;
        Swal.fire('Success!', 'Image uploaded successfully!', 'success');
      }
    } catch (error: any) {
      console.error('Error uploading image:', error);
      const errorMsg = error.error?.message || error.message || 'Failed to upload image';
      this.imageError = errorMsg;
      Swal.fire('Error', errorMsg, 'error');
    } finally {
      this.imageUploading = false;
      this.cdr.detectChanges();
    }
  }

  // Helper to display category name properly
  categories = Object.keys(CategoryEnum)
    .filter(key => isNaN(Number(key))) // Filter out numeric keys
    .map(key => ({
      value: CategoryEnum[key as keyof typeof CategoryEnum],
      display: this.getCategoryDisplayName(key)
    }));
  // Update the getCategoryDisplayName method
  getCategoryDisplayName(category: string): string {
    if (!category) return '';
    return category.split('_').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
  }
}
