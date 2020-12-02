package backend.main.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.main.dto.LastPostDTO;
import backend.main.dto.ReplyDTO;
import backend.main.dto.ReplyDTOid;
import backend.main.entities.Post;
import backend.main.entities.Reply;
import backend.main.entities.User;
import backend.main.repositories.PostRepository;
import backend.main.repositories.ReplyRepository;


@Service
public class ReplyService {
	
private final ReplyRepository replyRepository;
private final PostRepository postRepository;
private final UserService userService;

    @Autowired
    public ReplyService(ReplyRepository replyRepository,PostRepository postRepository
    		,UserService userService) {
        this.postRepository = postRepository;
		this.replyRepository = replyRepository;
		this.userService = userService;

    }
    
    
    public Reply addPost(ReplyDTO reply) {
    	Date currentUtilDate = new Date();
    	reply.dateTime=currentUtilDate.toString();
	    return replyRepository.save(ReplyDTO.toEntity(reply));
    }
    
    
    public Reply addReplyWithId(ReplyDTOid reply) {
    	Post post=postRepository.findById(reply.namePostId).get();
    	ReplyDTO replyDTO = new ReplyDTO();
    	replyDTO.post=post;
    	replyDTO.userPost=reply.userPost;
    	replyDTO.dataPost=reply.dataPost;
    	User user=userService.findById(reply.userPostId).get();
    	Date currentUtilDate = new Date();
    	replyDTO.dateTime=currentUtilDate.toString();
    	replyDTO.user=user;
	    return replyRepository.save(ReplyDTO.toEntity(replyDTO));
    }
    
    public List<Reply> findByPostId(Integer namepostId) {
	    return replyRepository.findByPostId(namepostId);
    }
    
    public List <Reply > findAll() {
        return replyRepository.findAll();
    }
    public List <Reply > findReplyByUser(Integer userpostid) {
        return replyRepository.findReplyByUser(userpostid);
    }
    public Optional<Reply> findById(Integer id) {
        return replyRepository.findById(id);
    }
    
    public Integer countByPost(Integer postid) {
        return replyRepository.countByPost(postid);
    }
    public LastPostDTO  findLastReply(Integer postid)
    {
    	Post post=postRepository.findById(postid).get();
    	Reply reply=replyRepository.findLastReply(postid);
    	LastPostDTO lastPost=new LastPostDTO();
    	if(reply==null)
    	{
    		lastPost.dateTime=post.getDateTime();
    		lastPost.name=post.getUser().getUsername();
    	}
    	else
    	{
    		lastPost.dateTime=reply.getDateTime();
    		lastPost.name=reply.getUser().getUsername();
    	}
    	return lastPost;    }
    
    
    public String addReply()
    {
    	return "saved";
    }
    
    public List<Reply> searchByReplyData(String datapost,Integer postid)
    {
    	return replyRepository.searchByReplyData(datapost,postid);
    }
    
   
}
