package backend.main.dto;

import backend.main.entities.Post;
import backend.main.entities.Reply;
import backend.main.entities.User;

public class ReplyDTO {
	public Post post;
	public String userPost;
	public String dataPost;
	public User user;
	public String dateTime;


	public static ReplyDTO fromEntity(Reply reply) {
		ReplyDTO replyDTO = new ReplyDTO();
		replyDTO.post=reply.getPost();
		replyDTO.dataPost=reply.getDataPost();
		replyDTO.userPost=reply.getUserPost();
		replyDTO.user=reply.getUser();
		replyDTO.dateTime=reply.getDateTime();
        return replyDTO;
    }

    public static Reply toEntity(ReplyDTO replyDTO) {
        return new Reply(replyDTO.post, replyDTO.userPost,replyDTO.dataPost,replyDTO.user,replyDTO.dateTime);
    }
}
