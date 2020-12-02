package backend.main.dto;

import java.util.Optional;

import org.springframework.web.bind.annotation.RestController;

import backend.main.entities.Post;
import backend.main.entities.Threads;
@RestController

public class ThreadDTOid {
	
	  public String namePost;
	  public String nameThread;
	  public Integer namePostId;
	  public Integer subForumId;

	  public static ThreadDTOid fromEntity(Threads threads) {
		    ThreadDTOid threadDTO  = new ThreadDTOid();
		    threadDTO.namePostId=threads.getPost().getId();
		    threadDTO.namePost=threads.getNamePost();
		    threadDTO.nameThread=threads.getNameThread();
	        return threadDTO;
	    }

	  
	    public static Post fromOptional(Optional<Post> post)
	    {
	    	
	    	return new Post(post.get().getNamePost(),post.get().getUser(),post.get().getNamePost(),post.get().getThreadName());
	    }
}
