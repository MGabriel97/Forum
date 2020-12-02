package backend.main.dto;

import backend.main.entities.Post;
import backend.main.entities.User;

public class PostDTO {
	public String namePost;
	public User user;
	public String dataPost;
	public String threadName;
	public String dateTime;

	public static PostDTO fromEntity(Post post) {
        PostDTO postDTO = new PostDTO();
        postDTO.namePost=post.getNamePost();
        postDTO.dataPost=post.getDataPost();
        postDTO.user=post.getUser();
        postDTO.threadName=post.getThreadName();
        postDTO.dateTime=post.getDateTime();
        return postDTO;
    }

    public static Post toEntity(PostDTO postDTO) {
        return new Post(postDTO.namePost, postDTO.user,postDTO.dataPost, postDTO.threadName,postDTO.dateTime);
    }
}
