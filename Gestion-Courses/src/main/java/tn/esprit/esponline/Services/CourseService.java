package tn.esprit.esponline.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import tn.esprit.esponline.DAO.entities.CategoryEnum;
import tn.esprit.esponline.DAO.entities.Course;
import tn.esprit.esponline.DAO.repositories.CourseRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService implements ICourseService {

    @Autowired
    private CourseRepository courseRepository;


    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public Course addCourse(Course course) {
        return courseRepository.save(course);
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



    @Override
    public Course findById(Long courseId) {
        return courseRepository.findById(courseId);
    }


}