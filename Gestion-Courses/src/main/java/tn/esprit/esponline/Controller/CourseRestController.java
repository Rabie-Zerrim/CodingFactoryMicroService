package tn.esprit.esponline.Controller;

import com.google.zxing.WriterException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.esponline.DAO.entities.CategoryEnum;
import tn.esprit.esponline.DAO.entities.Course;
import tn.esprit.esponline.Services.ICourseService;
import tn.esprit.esponline.Services.IFileStorageService;
import tn.esprit.esponline.Services.QRCodeService;

import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name = "Courses", description = "This web service handles CRUD operations for courses.")
@RestController
@RequestMapping("/courses")
public class CourseRestController {

    @Autowired
    private ICourseService courseService;


    @Autowired
    private IFileStorageService fileStorageService;

    @Autowired
    private QRCodeService qrCodeService;

    @Operation(summary = "Retrieve all courses", description = "This endpoint retrieves all courses from the database.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved all courses"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @Operation(summary = "Retrieve course by ID", description = "This endpoint retrieves a course by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved course"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })



    @PostMapping
    public ResponseEntity<Course> addCourse(@Valid @RequestBody Course course) throws IOException, WriterException {
        Course savedCourse = courseService.addCourse(course);


        // Generate and store QR code
        String qrText = String.format("Course: %s\nID: %d", savedCourse.getTitle(), savedCourse.getId());
        byte[] qrCode = qrCodeService.generateQRCodeImage(qrText, 250, 250);
        String qrCodeUrl = fileStorageService.uploadQRCode(qrCode, "qr-code-" + savedCourse.getId() + ".png");

        // Update course with QR code URL
        savedCourse.setQrCodeUrl(qrCodeUrl);
        courseService.updateCourse(savedCourse, savedCourse.getId());



        return ResponseEntity.status(HttpStatus.CREATED).body(savedCourse);
    }
    @GetMapping("/{id}/qr-code-base64")
    public ResponseEntity<Map<String, String>> getCourseQRCodeBase64(@PathVariable int id) {
        try {
            Course course = courseService.getCourseById(id);
            if (course == null) {
                return ResponseEntity.notFound().build();
            }

            String qrText = String.format("Course: %s\nTrainer: %s\nCategory: %s",
                    course.getTitle(), course.getTrainerName(), course.getCategoryCourse());

            byte[] qrCode = qrCodeService.generateQRCodeImage(qrText, 250, 250);
            String base64Image = Base64.getEncoder().encodeToString(qrCode);

            Map<String, String> response = new HashMap<>();
            response.put("qrCodeBase64", "data:image/png;base64," + base64Image);
            response.put("downloadUrl", "/courses/" + id + "/qr-code");

            return ResponseEntity.ok(response);
        } catch (WriterException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @Operation(summary = "Generate QR code for course",
            description = "Generates a QR code containing course details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "QR code generated successfully"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })
    @GetMapping("/{id}/qr-code")
    public ResponseEntity<byte[]> getCourseQRCode(@PathVariable int id) {
        try {
            Course course = courseService.getCourseById(id);
            if (course == null) {
                return ResponseEntity.notFound().build();
            }

            // Create text for QR code
            String qrText = String.format("Course: %s\nTrainer: %s\nCategory: %s",
                    course.getTitle(), course.getTrainerName(), course.getCategoryCourse());

            byte[] qrCode = qrCodeService.generateQRCodeImage(qrText, 250, 250);

            // Set proper headers for download
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=\"course-" + id + "-qrcode.png\"")
                    .body(qrCode);

        } catch (WriterException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Generate QR code with course URL",
            description = "Generates a QR code containing a URL to access the course")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "QR code generated successfully"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })
    @GetMapping(value = "/{id}/qr-code-url", produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<byte[]> getCourseQRCodeWithUrl(
            @PathVariable int id,
            @RequestParam String baseUrl) {

        try {
            Course course = courseService.getCourseById(id);
            if (course == null) {
                return ResponseEntity.notFound().build();
            }

            String courseUrl = baseUrl + "/courses/" + id;
            byte[] qrCode = qrCodeService.generateQRCodeImage(courseUrl, 250, 250);
            return ResponseEntity.ok().body(qrCode);

        } catch (WriterException | IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @Operation(summary = "Update an existing course", description = "This endpoint updates a course by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully updated course"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(
            @PathVariable int id,
            @Valid @RequestBody Course course) {

        Course updatedCourse = courseService.updateCourse(course, id);
        if (updatedCourse != null) {
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Delete a course", description = "This endpoint deletes a course by its ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully deleted course"),
            @ApiResponse(responseCode = "404", description = "Course not found")
    })
    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable int id) {
        courseService.deleteCourse(id);
    }





    @GetMapping("/search")
    public ResponseEntity<Page<Course>> searchCourses(
            @RequestParam(required = false) String searchQuery,
            @RequestParam(required = false) CategoryEnum category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "6") int size
    ) {
        Page<Course> courses = courseService.searchCourses(searchQuery, category, page, size);
        return ResponseEntity.ok(courses);
    }

    // In your Spring controller
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getCourseById(@PathVariable int id) {
        Course course = courseService.getCourseById(id);
        if (course == null) {
            return ResponseEntity.notFound().build();
        }

        Map<String, Object> response = new HashMap<>();
        response.put("course", course);
        response.put("qrCodeUrl", course.getQrCodeUrl());

        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}/update-rate")
    public ResponseEntity<Void> updateCourseRate(
            @PathVariable int id,
            @RequestBody Map<String, Double> request) {

        try {
            if (request == null || !request.containsKey("rate")) {
                return ResponseEntity.badRequest().build();
            }

            Double rate = request.get("rate");
            Course course = courseService.getCourseById(id);

            if (course == null) {
                return ResponseEntity.notFound().build();
            }

            course.setRate(rate);
            courseService.updateCourse(course, id);
            return ResponseEntity.ok().build();

        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    ///hedhi mta3 springboot
    /*
    @PutMapping("/{id}/update-rate")
    public ResponseEntity<Void> updateCourseRate(@PathVariable int id, @RequestBody double rate) {
        Course course = courseService.getCourseById(id);
        if (course != null) {
            course.setRate(rate);
            courseService.updateCourse(course, id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

*/
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileUrl = fileStorageService.uploadFile(file);
            return ResponseEntity.ok(fileUrl); // Just return the plain string URL
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file: " + e.getMessage());
        }
    }
    @DeleteMapping("/delete-file")
    public ResponseEntity<String> deleteFile(@RequestParam String fileUrl) {
        try {
            fileStorageService.deleteFile(fileUrl);
            return ResponseEntity.ok("File deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete file: " + e.getMessage());
        }
    }
}