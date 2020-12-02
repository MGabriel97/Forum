package backend.main.controller;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import backend.main.dto.PostDTO;
import backend.main.dto.PostDTOid;
import backend.main.entities.Post;
import backend.main.services.PostService;
import backend.main.services.ThreadService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")

@RequestMapping(path = "post")
public class PostController {
 	@Autowired
 	PostService postservice;
	@Autowired
 	ThreadService threadService;

 	@PostMapping("/add")
	  Post newPost(@RequestBody PostDTO post) {
	      return postservice.addPost(post);

	  }
 	
 	@PostMapping("/addid")
	  Post newPostId(@RequestBody PostDTOid post) {
	      return postservice.addPostwithUserId(post);

	  }
 	
 	@GetMapping("/getpost/{namepost}")
	  Optional<Post> getPost(@PathVariable String namepost) {
	    return postservice.findByNamePost(namepost);
	  }
 	
 	@GetMapping("/searchpost/{namePost}")
	  List<Post> searchPost(@PathVariable String namePost) {
	    return postservice.searchByPostStartsWith(namePost);
	  }
 	@GetMapping("/all")
	  List<Post> getAll() {
	    return postservice.findAll();
	  }
 	
 	@GetMapping("/alluserpost/{userpostid}")
	  List<Post> getAllUserPost(@PathVariable Integer userpostid) {
	    return postservice.findPostByUser(userpostid);
	  }
 	
 	@GetMapping("/findbyid/{id}")
	  Optional<Post> findById(@PathVariable Integer id) {
	    return postservice.findById(id);
	  }
 	@GetMapping("/lastday")
	  List<Post> getLastDay() throws ParseException {
 		 return postservice.findLastDayPosts();
 	}
 	@GetMapping("/lastweek")
	  List<Post> getLastWeek() throws ParseException {
		 return postservice.findLastWeekPosts();
	}
}
