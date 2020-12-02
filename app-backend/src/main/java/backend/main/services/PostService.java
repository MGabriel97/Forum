package backend.main.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.main.dto.PostDTO;
import backend.main.dto.PostDTOid;
import backend.main.entities.Post;
import backend.main.entities.User;
import backend.main.repositories.PostRepository;


@Service

public class PostService {

    private final PostRepository postRepository;
    private final UserService userService;

    @Autowired
    public PostService(PostRepository postRepository,UserService userService) {
        this.postRepository = postRepository;
        this.userService = userService;
    }
    
    
    public Post addPost(PostDTO post) {
    	Date currentUtilDate = new Date();
    	post.dateTime=currentUtilDate.toString();
	    return postRepository.save(PostDTO.toEntity(post));
    }
    
    public Optional < Post > findByNamePost(String userName) {
        return postRepository.findUserByNamePost(userName);
    }
    
    public List <Post > findAll() {
        return postRepository.findAll();
    }
    
    public List<Post>  findLastDayPosts() throws ParseException {
    	List<Post> posts = postRepository.findAll();
    	List<Post> lastPosts= new ArrayList<Post>();
        for(int i=0;i<posts.size();i++)
        {
        	Post post=posts.get(i);
        	String dateTime=post.getDateTime();
        	Date currentUtilDate = new Date();
        	SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzzz yyyy");

        	Date date = format.parse(dateTime);
        	 long diffInMillies = (currentUtilDate.getTime() -date.getTime() )   / (1000 * 60 * 60 ) ;
        	
        	if(diffInMillies<24)
        	{
        		lastPosts.add(post);
        	}	
        }
        return lastPosts;
    }
    public List<Post>  findLastWeekPosts() throws ParseException {
    	List<Post> posts = postRepository.findAll();
    	List<Post> lastPosts= new ArrayList<Post>();
        for(int i=0;i<posts.size();i++)
        {
        	Post post=posts.get(i);
        	String dateTime=post.getDateTime();
        	Date currentUtilDate = new Date();
        	SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzzz yyyy");

        	Date date = format.parse(dateTime);
        	 long diffInMillies = (currentUtilDate.getTime() -date.getTime() )   / (1000 * 60 * 60 *24) ;
        	
        	if(diffInMillies<7)
        	{
        		lastPosts.add(post);
        	}	
        }
        return lastPosts;
    }
    public List <Post > findPostByUser(Integer userpostid) {
        return postRepository.findPostByUser(userpostid);
    }
    
    public List <Post > searchByPostStartsWith(String namePost) {
        return postRepository.searchByPostStartsWith(namePost);
    }
    
    public Optional<Post> findById(Integer id) {
        return postRepository.findById(id);
    }
    
    public Post addPostwithUserId(PostDTOid postDTOid) {
    	User user=userService.findById(postDTOid.userPostId).get();
    	PostDTO postId=new PostDTO();
    	postId.user=user;
    	postId.namePost=postDTOid.namePost;
    	postId.dataPost=postDTOid.dataPost;
    	postId.threadName=postDTOid.threadName;
    	Date currentUtilDate = new Date();
    	postId.dateTime=currentUtilDate.toString();

	    return postRepository.save(PostDTO.toEntity(postId));
    }
}
