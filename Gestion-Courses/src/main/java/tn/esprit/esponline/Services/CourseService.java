package tn.esprit.esponline.Services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.DAO.entities.CategoryEnum;
import tn.esprit.esponline.DAO.entities.Course;
import tn.esprit.esponline.DAO.repositories.CourseRepository;
import tn.esprit.esponline.Feign.AuthServiceClient;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CourseService implements ICourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private AuthServiceClient authServiceClient;

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course addCourse(Course course, Integer trainerId) {
        course.setTrainerId(Long.valueOf(trainerId));
        return courseRepository.save(course);
    }

    @Override
    public Page<Course> searchCoursesByTrainer(String searchQuery, CategoryEnum category, Integer trainerId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());
        return courseRepository.findByTrainerIdWithResources(trainerId, pageable);
    }

    @Override
    public Page<Course> searchCoursesByStudent(String searchQuery, CategoryEnum category, Integer studentId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());

        // If no filters, return all enrolled courses
        if ((searchQuery == null || searchQuery.isEmpty()) && category == null) {
            return courseRepository.findByStudentIdsContaining(studentId, pageable);
        }

        // If filters exist, apply them
        return courseRepository.findByStudentIdAndSearch(
                studentId,
                searchQuery != null ? searchQuery : "",
                category,
                pageable
        );
    }

    @Override
    public Page<Course> searchCourses(String searchQuery, CategoryEnum category, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("title").ascending());
        return courseRepository.searchCourses(searchQuery, category, pageable);
    }

    @Override
    public Course updateCourse(Course course, int courseId) {
        Optional<Course> existingCourse = courseRepository.findById(courseId);
        if (existingCourse.isPresent()) {
            course.setId(courseId);
            return courseRepository.save(course);
        } else {
            return null;
        }
    }

    @Override
    public void deleteCourse(int courseId) {
        courseRepository.deleteById(courseId);
    }

    @Override
    public Course getCourseById(int courseId) {
        return courseRepository.findById(courseId).orElse(null);
    }

    public List<Course> getCoursesByTrainer(Integer trainerId) {
        return courseRepository.findByTrainerId(trainerId);
    }

    @Override
    public Course findById(Long courseId) {
        return courseRepository.findById(courseId);
    }

    @Override
    public Course enrollStudentInCourse(int courseId, int studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("Course not found"));
        course.getStudentIds().add(studentId);
        return courseRepository.save(course);
    }

    @Override
    public void removeStudentFromCourse(int courseId, int studentId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.getStudentIds().remove(studentId);
        courseRepository.save(course);
    }

    @Override
    public List<Course> getCoursesByStudent(int studentId) {
        return courseRepository.findByStudentIdsContaining(studentId);
    }

    @Override
    public List<Map<String, Object>> getEnrolledStudentsWithDetails(int courseId) {
        Course course = getCourseById(courseId);
        if (course == null || course.getStudentIds() == null) {
            return Collections.emptyList();
        }

        return course.getStudentIds().stream()
                .map(authServiceClient::getStudentById)
                .collect(Collectors.toList());
    }
}
