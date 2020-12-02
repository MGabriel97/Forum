package backend.main.controller;

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

import backend.main.dto.SearchSubForumDTO;
import backend.main.dto.SubForumDTO;
import backend.main.entities.SubForum;
import backend.main.services.SubForumService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "subforum")
public class SubForumController {
	@Autowired
 	SubForumService subForumService;
 	
 	@PostMapping("/add")
	  SubForum newPost(@RequestBody SubForumDTO subForumDTO) {
	    return subForumService.addSubForum(subForumDTO);
	  }
 	
 	
 	@GetMapping("/all")
	  List<SubForum> getAll() {
	    return subForumService.findAll();
	  }
 	@PostMapping("/search")
 	List<SubForum> search(@RequestBody SearchSubForumDTO searchSubForumDTO) {
	    return subForumService.searchSubForum(searchSubForumDTO);
	  }
 	
 	@GetMapping("/allorder")
	  List<SubForum> getAllOrdered() {
	    return subForumService.getSubForumOrderByCategory();
	  }
	@GetMapping("/findbyid/{id}")
	  Optional<SubForum> findById(@PathVariable Integer id) {
	    return subForumService.findById(id);
	  }
	
	@GetMapping("/findbycategory/{category}")
	  List<SubForum> findByCategory(@PathVariable String category) {
	    return subForumService.findByCategory(category);
	  }
}