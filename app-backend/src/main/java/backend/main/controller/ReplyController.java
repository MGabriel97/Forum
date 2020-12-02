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

import backend.main.dto.LastPostDTO;
import backend.main.dto.ReplyDTO;
import backend.main.dto.ReplyDTOid;
import backend.main.entities.Reply;
import backend.main.services.ReplyService;



@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "reply")
public class ReplyController {
	@Autowired
 	ReplyService replyService;
 	
 	@PostMapping("/add")
	  Reply newPost(@RequestBody ReplyDTO reply) {
	    return replyService.addPost(reply);
	  }
 	
 	@PostMapping("/addid")
	  Reply newPostWithId(@RequestBody ReplyDTOid reply) {
	    return replyService.addReplyWithId(reply);
	  }
	
 	
 	@GetMapping("/all")
	  List<Reply> getAll() {
	    return replyService.findAll();
	  }
 	@GetMapping("/alluserreply/{userpostid}")
	  List<Reply> getAllUserPost(@PathVariable Integer userpostid) {
	    return replyService.findReplyByUser(userpostid);
	  }
	  
	  @GetMapping("/gete")
	  String get() {
	    return "saved";
	  }
	
	@GetMapping("/findbyid/{id}")
	  Optional<Reply> findById(@PathVariable Integer id) {
	    return replyService.findById(id);
	  }
	
	@GetMapping("/findlastreply/{postid}")
	  LastPostDTO findLastReply(@PathVariable Integer postid) {
	    return replyService.findLastReply(postid);
	  }
	
	@GetMapping("/findbypost/{namepostId}")
	  List<Reply> findBySubForum(@PathVariable Integer namepostId) {
	    return replyService.findByPostId(namepostId);
	  }
	@GetMapping("/searchreplydata/{datapost}/{postid}")
	  List<Reply> searchByReplyData(@PathVariable String datapost,@PathVariable Integer postid) {
	    return replyService.searchByReplyData(datapost,postid);
	  }
	
	@GetMapping("/count/{postid}")
	  Integer countByPost(@PathVariable Integer postid) {
	    return replyService.countByPost(postid);
	  }
	
 	
}
