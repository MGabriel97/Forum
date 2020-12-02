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

import backend.main.dto.LastPostDTO;
import backend.main.dto.SearchThreadDTO;
import backend.main.dto.ThreadDTO;
import backend.main.dto.ThreadDTOid;
import backend.main.entities.Threads;
import backend.main.services.ThreadService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "thread")
public class ThreadController {
	@Autowired
 	ThreadService threadService;
 	
 	@PostMapping("/add")
	  Threads newPost(@RequestBody ThreadDTO thread) {
	    return threadService.addThread(thread);
	  }
 	@PostMapping("/addid")
	  Threads newPostId(@RequestBody ThreadDTOid thread) {
	    return threadService.addThreadwithId(thread);
	  }
 	
 	@GetMapping("/searchinposts/{namePost}")
	  List<Threads> searchByPostTitle(@PathVariable String namePost) {
	    return threadService.searchByPostTitle(namePost);
	  }
 	@GetMapping("/all")
	  List<Threads> getAll() {
	    return threadService.findAll();
	  }
 	@GetMapping("/findlast/{subforumid}")
	  Threads searchPost(@PathVariable Integer subforumid) {
	    return threadService.findLastThread(subforumid);
	  }
 	
 	@GetMapping("/findlastpost/{subForumId}")
 	LastPostDTO findLastPost(@PathVariable Integer subForumId) {
	    return threadService.lastPost(subForumId);
	  }
	
	@GetMapping("/findbyid/{id}")
	  Optional<Threads> findById(@PathVariable Integer id) {
	    return threadService.findById(id);
	  }
	
	
	@GetMapping("/findbysubforum/{subForumId}")
	  List<Threads> findBySubForum(@PathVariable Integer subForumId) {
	    return threadService.findBySubForum(subForumId);
	  }
	@PostMapping("/search")
 	List<Threads> search(@RequestBody SearchThreadDTO searchThreadDTO) {
	    return threadService.search(searchThreadDTO);
	  }
	@GetMapping("/count/{subforumid}")
	  Integer countByPost(@PathVariable Integer subforumid) {
	    return threadService.countBySubForum(subforumid);
	  }
	
	@GetMapping("/lastday")
	  List<Threads> getLastDay() throws ParseException {
		 return threadService.findLastDayThreads();
	}
	@GetMapping("/lastweek")
	  List<Threads> getLastWeek() throws ParseException {
		 return threadService.findLastWeekThreads();
	}
}
