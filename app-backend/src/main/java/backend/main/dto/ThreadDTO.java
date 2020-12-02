package backend.main.dto;

import backend.main.entities.Post;
import backend.main.entities.SubForum;
import backend.main.entities.Threads;

public class ThreadDTO {
	  public Post post;
	  public String namePost;
	  public String nameThread;
	  public SubForum subForum;
	  public static ThreadDTO fromEntity(Threads threads) {
		    ThreadDTO threadDTO  = new ThreadDTO();
		    threadDTO.post=threads.getPost();
		    threadDTO.namePost=threads.getNamePost();
		    threadDTO.nameThread=threads.getNameThread();
		    threadDTO.subForum=threads.getSubForum();
	        return threadDTO;
	    }

	    public static Threads toEntity(ThreadDTO threadDTO) {
	        return new Threads(threadDTO.post, threadDTO.namePost,threadDTO.nameThread,threadDTO.subForum);
	    }
}
