import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseResourceService } from '../services/course-resource.service';
import { Course } from '../models/courses';
import { User } from '../models/User';
import { CategoryEnum } from '../models/CategoryEnum';
import Swal from 'sweetalert2';
import { CourseResource } from '../models/CourseResource';
import { Page } from '../models/page';
import { StorageService } from 'app/shared/auth/storage.service';
import {EnrollStudentsModalComponent} from './enroll-students-modal/enroll-students-modal.component';
import {ReviewService} from '../services/review';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  categoryEnum = CategoryEnum;
  categoryColors: { [key: string]: string } = {};
  page: Page<Course> = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 6,
    number: 0,
    numberOfElements: 0
  };
  selectedCourse: Course | null = null;
  trainers: User[] = [];
  // Add this to your CourseComponent class
  showQRModal = false;
  qrCodeImageUrl: string | null = null;
  public isTrainerLoggedIn = false;
  public isStudentLoggedIn = false;
  public StorageService = StorageService; // Make the service available in template
  showModal = false;
  showAddResourceModal = false;
  showResourcesModal = false;
  showEditModal = false;
  showEnrollModal = false;
  showStudentsModal = false;
  showReviewModal = false;
  searchQuery = '';
  selectedCategory = '';
  enrolledStudents: User[] = []; // or any[] if you have a specific interface for enrolled students
  showAIImprovementsModal = false;
  loading = false;
  enrollModalComponent: EnrollStudentsModalComponent;

  constructor(
    private courseService: CourseService,
    private courseResourceService: CourseResourceService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService ,
    private reviewService: ReviewService
    // Add this
  ) {}

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn())  {
      return;
    }

    // First set the roles
    this.updateRoleFlags();

    console.log('Raw user data:', this.StorageService.getUser());
    console.log('Processed role:', StorageService.getUserRole());
    console.log(`User is ${this.isTrainerLoggedIn ? 'Trainer' : this.isStudentLoggedIn ? 'Student' : 'Guest'}`);

    this.assignRandomColorsToCategories();
    this.loadInitialCourses();
  }
  private updateRoleFlags(): void {
    const role = StorageService.getUserRole()?.replace(/[\[\]]/g, '');
    this.isTrainerLoggedIn = role === 'TRAINER';
    this.isStudentLoggedIn = role === 'STUDENT';
    this.cdr.detectChanges();
  }
  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  assignRandomColorsToCategories(): void {
    Object.keys(this.categoryEnum).forEach(category => {
      this.categoryColors[category] = this.generateRandomColor();
    });
  }
  loadInitialCourses(): void {
    this.loading = true;
    this.cdr.detectChanges();

    const observable = this.isTrainerLoggedIn
      ? this.courseService.searchMyCourses(
        this.searchQuery,
        this.selectedCategory,
        this.page.number,
        this.page.size
      )
      : this.isStudentLoggedIn
        ? this.courseService.searchMyCourses(
          this.searchQuery,
          this.selectedCategory,
          this.page.number,
          this.page.size
        )
        : this.courseService.getAllCoursesWithPagination(
          this.searchQuery,
          this.selectedCategory,
          this.page.number,
          this.page.size
        );

    observable.subscribe({
      next: (page: Page<Course>) => {
        this.handleCoursesResponse(page);
      },
      error: (err: any) => {
        this.handleCoursesError(err);
      }
    });
  }

  private handleCoursesError(err: any): void {
    console.error('Error loading courses:', err);
    this.loading = false;
    this.cdr.detectChanges();
    Swal.fire('Error', 'Failed to load courses', 'error');
  }
  searchCourses(): void {
    this.loading = true;
    this.cdr.detectChanges();

    const observable = this.isTrainerLoggedIn || this.isStudentLoggedIn
      ? this.courseService.searchMyCourses(
        this.searchQuery,
        this.selectedCategory,
        this.page.number,
        this.page.size
      )
      : this.courseService.getAllCoursesWithPagination(
        this.searchQuery,
        this.selectedCategory,
        this.page.number,
        this.page.size
      );

    observable.subscribe({
      next: (page: Page<Course>) => {
        // Ensure resources are properly initialized
        page.content.forEach(course => {
          course.resources = course.resources || [];
        });
        this.page = {
          ...page,
          content: page.content.map(course => ({
            ...course,
            image: this.getFile(course.image)
          }))
        };
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error searching courses:', error);
        this.loading = false;
        this.page = {
          content: [],
          totalElements: 0,
          totalPages: 0,
          size: this.page.size,
          number: this.page.number,
          numberOfElements: 0
        };
        Swal.fire('Error', 'Failed to load courses', 'error');
        this.cdr.detectChanges();
      }
    });
  }
  openQRModal(course: Course): void {
    this.selectedCourse = course;
    if (course.qrCodeUrl) {
      // If QR code URL exists, use it directly
      this.qrCodeImageUrl = course.qrCodeUrl;
      this.showQRModal = true;
    } else {
      // If no QR code exists, generate one
      this.courseService.getCourseQRCodeBase64(course.id).subscribe(
        (response) => {
          this.qrCodeImageUrl = response.qrCodeBase64;
          this.showQRModal = true;
          this.cdr.detectChanges();
        },
        (error) => {
          console.error('Error generating QR code:', error);
          Swal.fire('Error', 'Failed to generate QR code', 'error');
        }
      );
    }
  }

  closeQRModal(): void {
    this.showQRModal = false;
    this.qrCodeImageUrl = null;
  }
  onSearchChange(): void {
    this.page.number = 0; // Reset to first page when search/filter changes
    this.searchCourses();
  }

  getFile(fileName: string): string {
    if (fileName.startsWith('https://')) {
      return fileName;
    }
    return `https://wbptqnvcpiorvwjotqwx.supabase.co/storage/v1/object/public/course-images/${fileName}`;
  }

  nextPage(): void {
    if (this.page.number < this.page.totalPages - 1) {
      this.page.number++;
      this.searchCourses();
    }
  }

  prevPage(): void {
    if (this.page.number > 0) {
      this.page.number--;
      this.searchCourses();
    }
  }

  openAddResourceModal(course: Course): void {
    this.selectedCourse = course;
    this.showAddResourceModal = true;
    this.showResourcesModal = false;
    this.cdr.detectChanges();
  }

  openAddCourseModal(): void {
    this.showModal = true;
    this.cdr.detectChanges();
  }

  onCourseAdded(course: Course): void {
    this.searchCourses(); // Refresh the list
    this.cdr.detectChanges();
  }
  private handleCoursesResponse(page: Page<Course>): void {
    const processedCourses = page.content.map(course => ({
      ...course,
      image: this.getFile(course.image),
      hasReviewed: false
    }));

    this.page = {
      content: processedCourses,
      totalElements: page.totalElements,
      totalPages: page.totalPages,
      size: page.size,
      number: page.number,
      numberOfElements: page.numberOfElements
    };

    // Check reviews for each course if student is logged in
    if (this.isStudentLoggedIn) {
      const studentId = StorageService.getUserId();
      if (studentId) {
        processedCourses.forEach(course => {
          this.reviewService.hasStudentReviewed(studentId, course.id)
            .subscribe({
              next: (hasReviewed) => {
                course.hasReviewed = hasReviewed;
                this.cdr.detectChanges();
              },
              error: (err) => {
                console.error('Error checking review status:', err);
                course.hasReviewed = false;
                this.cdr.detectChanges();
              }
            });
        });
      }
    }

    this.loading = false;
    this.cdr.detectChanges();
  }

  openReviewModal(course: Course): void {
    if (course.hasReviewed) {
      return; // Prevent opening modal if already reviewed
    }
    this.selectedCourse = course;
    this.showReviewModal = true;
    this.cdr.detectChanges();
  }
  onReviewAdded(): void {
    // Refresh the course list to show updated ratings
    this.searchCourses();

    // Also update the selected course if it exists
    if (this.selectedCourse) {
      this.selectedCourse.hasReviewed = true;
    }
    this.cdr.detectChanges();
  }

  onResourceAdded(resource: CourseResource): void {
    console.log('Resource added:', resource);
    if (this.selectedCourse && this.selectedCourse.resources) {
      this.selectedCourse.resources.push(resource);
      console.log('Updated selectedCourse:', this.selectedCourse);
      this.page.content = this.page.content.map(course =>
        course.id === this.selectedCourse?.id ? this.selectedCourse : course
      );
      console.log('Updated page.content:', this.page.content);
      this.cdr.detectChanges();
    }
  }



  openAIImprovementsModal(course: Course): void {
    console.log('Opening AI Improvements Modal for Course ID:', course.id);
    this.selectedCourse = course;
    this.showAIImprovementsModal = true;
    this.cdr.detectChanges();
  }

  getFilledStars(rate: number): number[] {
    const filledStars = Math.floor(rate);
    return Array(filledStars).fill(0);
  }

  hasPartialStar(rate: number): boolean {
    return rate % 1 !== 0;
  }

  getEmptyStars(rate: number): number[] {
    const totalStars = 5;
    const filledStars = Math.floor(rate);
    const hasPartial = this.hasPartialStar(rate);
    const emptyStars = totalStars - filledStars - (hasPartial ? 1 : 0);
    return Array(emptyStars).fill(0);
  }

  openResourcesModal(course: Course): void {
    this.selectedCourse = course;
    this.showResourcesModal = true;
    this.showAddResourceModal = false;
    this.courseResourceService.getResourcesForCourse(course.id).subscribe(
      (resources) => {
        this.selectedCourse!.resources = resources;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error fetching resources:', error);
      }
    );
  }

  deleteCourse(courseId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(courseId).subscribe(() => {
          this.searchCourses();
          Swal.fire('Deleted!', 'The course has been deleted.', 'success');
        }, (error) => {
          console.error('Error deleting course:', error);
          Swal.fire('Error!', 'Error deleting course.', 'error');
        });
      }
    });
  }

  closeAllModals(): void {
    this.showModal = false;
    this.showAddResourceModal = false;
    this.showResourcesModal = false;
    this.showEditModal = false;
    this.showEnrollModal = false;
    this.showStudentsModal = false;
    this.cdr.detectChanges();
  }

  openEditModal(course: Course): void {
    this.selectedCourse = course;
    this.showEditModal = true;
    this.cdr.detectChanges();
  }

  onCourseUpdated(updatedCourse: Course): void {
    this.searchCourses(); // Refresh the list
    this.cdr.detectChanges();
  }

  enrollInCourse(course: Course): void {
    this.courseService.enrollCurrentUser(course.id).subscribe({
      next: () => {
        Swal.fire('Success', 'Enrolled successfully!', 'success');
        this.searchCourses(); // Refresh the list
      },
      error: (err) => {
        Swal.fire('Error', err.error.message || 'Enrollment failed', 'error');
      }
    });
  }

  onStudentsEnrolled(): void {
    if (this.selectedCourse) {
      this.courseService.getEnrolledStudents(this.selectedCourse.id)
        .subscribe({
          next: (students) => {
            // @ts-ignore
            this.enrolledStudents = students;
            this.showStudentsModal = true;
            this.cdr.detectChanges();
          },
          error: (error) => {
            console.error('Error fetching enrolled students:', error);
            Swal.fire('Error', 'Failed to load enrolled students', 'error');
          }
        });
    }
  }
  openStudentsModal(course: Course): void {
    this.selectedCourse = course;
    this.showStudentsModal = true;
    this.cdr.detectChanges();
  }
  openEnrollModal(course: Course): void {
    this.selectedCourse = course;
    this.showEnrollModal = true;
    this.cdr.detectChanges();
  }
  clearFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.page.number = 0;
    this.searchCourses();
  }
}
