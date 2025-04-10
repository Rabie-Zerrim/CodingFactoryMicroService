import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Course } from '../models/courses';
import { User } from '../models/User';
import { Page } from '../models/page';

interface ApiCourseResponse {
  course: Course;
  qrCodeUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:8090/courses';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching courses:', error);
        return throwError(() => new Error('Failed to fetch courses'));
      })
    );
  }

  addCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      catchError(error => {
        console.error('Error adding course:', error);
        return throwError(() => new Error('Failed to add course'));
      })
    );
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting course:', error);
        return throwError(() => new Error('Failed to delete course'));
      })
    );
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      catchError(error => {
        console.error('Error updating course:', error);
        return throwError(() => new Error('Failed to update course'));
      })
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching course:', error);
        return throwError(() => new Error('Failed to fetch course'));
      })
    );
  }
  getTrainerName(courseId: number): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/${courseId}/trainer-name`).pipe(
      catchError(error => {
        console.error('Error fetching trainer name:', error);
        return throwError(() => new Error('Failed to fetch trainer name'));
      })
    );
  }

  getAllStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/students`).pipe(
      catchError(error => {
        console.error('Error fetching students:', error);
        return throwError(() => new Error('Failed to fetch students'));
      })
    );
  }

  enrollStudentInCourse(courseId: number, studentId: number): Observable<Course> {
    return this.http.post<Course>(
      `${this.apiUrl}/${courseId}/enroll/${studentId}`,
      {}
    ).pipe(
      catchError(error => {
        console.error('Error enrolling student:', error);
        return throwError(() => new Error('Failed to enroll student'));
      })
    );
  }

  getEnrolledStudents(courseId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${courseId}/students`).pipe(
      catchError(error => {
        console.error('Error fetching enrolled students:', error);
        return throwError(() => new Error('Failed to fetch enrolled students'));
      })
    );
  }

  searchCourses(
    searchQuery: string = '',
    category: string = '',
    page: number = 0,
    size: number = 6
  ): Observable<Page<Course>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (searchQuery) params = params.set('searchQuery', searchQuery);
    if (category) params = params.set('category', category);

    return this.http.get<Page<Course>>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(error => {
        console.error('Error searching courses:', error);
        return throwError(() => new Error('Failed to search courses'));
      })
    );
  }
}
