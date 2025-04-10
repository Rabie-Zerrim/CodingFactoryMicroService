package tn.esprit.esponline.Services;

import org.springframework.data.domain.Page;
import tn.esprit.esponline.DAO.entities.CategoryEnum;
import tn.esprit.esponline.DAO.entities.Course;

import java.util.List;

public interface ICourseService {
    List<Course> getAllCourses();
    Course addCourse(Course course);

    Page<Course> searchCourses(String searchQuery, CategoryEnum category, int page, int size);

    Course updateCourse(Course course, int courseId);
    void deleteCourse(int courseId);
    Course getCourseById(int courseId);



    Course findById(Long courseId);


}