package backend.main.services;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.main.dto.LastPostDTO;
import backend.main.dto.SearchThreadDTO;
import backend.main.dto.ThreadDTO;
import backend.main.dto.ThreadDTOid;
import backend.main.entities.Post;
import backend.main.entities.Reply;
import backend.main.entities.SubForum;
import backend.main.entities.Threads;
import backend.main.repositories.PostRepository;
import backend.main.repositories.SubForumRepository;
import backend.main.repositories.ThreadRepository;

@Service
public class ThreadService {
	private final ThreadRepository threadRepository;
    private final PostRepository postRepository;
    private final SubForumRepository subForumRepository;
    private final ReplyService replyService;

    @Autowired
    public ThreadService(ThreadRepository threadRepository,PostRepository postRepository,SubForumRepository subForumRepository
    		,ReplyService replyService) {
        this.subForumRepository = subForumRepository;
		this.postRepository = postRepository;
		this.threadRepository = threadRepository;
		this.replyService = replyService;
    }
    
    public LastPostDTO lastPost(Integer subForumId)
    {
    	List<Threads> threadsBySubForum=threadRepository.findBySubForum(subForumId);
    	int lastPostId=0;
    	String name="";
    	String dateTime="";
    	LastPostDTO lastPostDTO = new LastPostDTO();
    	for(int i=0;i<threadsBySubForum.size();i++)
    	{
    		Threads th=threadsBySubForum.get(i);
    		Post post=postRepository.findById(th.getId()-1).get();
    		if(post.getId()>lastPostId)
    		{
    			lastPostId=post.getId();
    			name=post.getUser().getUsername();
    			dateTime=post.getDateTime();
    		}
        	List<Reply> replies=replyService.findByPostId(post.getId());
        	for(int j=0;j<replies.size();j++)
        	{
        		if(replies.get(j).getId()>lastPostId)
        		{
        			lastPostId=replies.get(j).getId();
        			name=replies.get(j).getUser().getUsername();
        			dateTime=replies.get(j).getDateTime();
        		}
        	}	
    	}
    	lastPostDTO.dateTime=dateTime;
    	lastPostDTO.name=name;
    	return lastPostDTO;
    }
    public Threads addThread(ThreadDTO threads) {
    	
	    return threadRepository.save(ThreadDTO.toEntity(threads));
    }
    
    public List<Threads> findBySubForum(Integer subForumId) {
	    return threadRepository.findBySubForum(subForumId);
    }
    
    public Threads addThreadwithId(ThreadDTOid threads) {
    	Post post=postRepository.findById(threads.namePostId).get();
    	ThreadDTO threadsID=new ThreadDTO();
    	threadsID.post=post;
    	threadsID.namePost=threads.namePost;
    	threadsID.nameThread=threads.nameThread;
    	SubForum subForum=subForumRepository.findById(threads.subForumId).get();
    	threadsID.subForum=subForum;
	    return threadRepository.save(ThreadDTO.toEntity(threadsID));
    }
    
   
    
    public List <Threads > findAll() {
        return threadRepository.findAll();
    }
    public List <Threads > search(SearchThreadDTO searchThreadDTO) {
    	
        return threadRepository.searchThread(searchThreadDTO.subForumName, 
        searchThreadDTO.namePost, searchThreadDTO.dataPost, searchThreadDTO.username);
    }
    public List <Threads > searchByPostTitle(String namePost) {
        return threadRepository.searchByPostTitle(namePost);
    }
    public Optional<Threads> findById(Integer id) {
        return threadRepository.findById(id);
    }
    
    public Integer countBySubForum(Integer subforumid) {
        return threadRepository.countBySubForum(subforumid);
    }
    
    public Threads findLastThread(Integer subforumid) {
        return threadRepository.findLastThread(subforumid);
    }
    
    public List<Threads>  findLastDayThreads() throws ParseException {
    	List<Threads> threads = threadRepository.findAll();
    	List<Threads> lastThreads= new ArrayList<Threads>();
        for(int i=0;i<threads.size();i++)
        {
        	Threads thread=threads.get(i);
        	String dateTime=thread.getPost().getDateTime();
        	Date currentUtilDate = new Date();
        	SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzzz yyyy");

        	Date date = format.parse(dateTime);
        	 long diffInMillies = (currentUtilDate.getTime() -date.getTime() )   / (1000 * 60 * 60 ) ;
        	
        	if(diffInMillies<24)
        	{
        		lastThreads.add(thread);
        	}	
        }
        return lastThreads;
    }
    public List<Threads>  findLastWeekThreads() throws ParseException {
    	List<Threads> threads = threadRepository.findAll();
    	List<Threads> lastThreads= new ArrayList<Threads>();
        for(int i=0;i<threads.size();i++)
        {
        	Threads thread=threads.get(i);
        	String dateTime=thread.getPost().getDateTime();
        	Date currentUtilDate = new Date();
        	SimpleDateFormat format = new SimpleDateFormat("EEE MMM dd HH:mm:ss zzzz yyyy");

        	Date date = format.parse(dateTime);
        	 long diffInMillies = (currentUtilDate.getTime() -date.getTime() )   / (1000 * 60 * 60 *24 ) ;
        	
        	if(diffInMillies<7)
        	{
        		lastThreads.add(thread);
        	}	
        }
        return lastThreads;
    }
    
    
    


	
}
