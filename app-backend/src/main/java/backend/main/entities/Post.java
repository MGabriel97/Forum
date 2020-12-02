package backend.main.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;

@Entity
public class Post {
	@Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	
	@Column(name = "namepost")
	  private String namePost;
	
	 @ManyToOne
	 @JoinColumn(name="userpostid", nullable=false)
	  private User user;
	 
	 
	 @Column(name = "datapost")
	  private String dataPost;
	
	@Column(name = "threadname")
	  private String threadName;
	
	@Column(name = "datetime")
	  private String dateTime;
	
	  public String getDateTime() {
		return dateTime;
	}
	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}
	public Post(String namePost, User user, String dataPost, String threadName, String dateTime) {
		super();
		this.namePost = namePost;
		this.user = user;
		this.dataPost = dataPost;
		this.threadName = threadName;
		this.dateTime = dateTime;
	}

	@OneToOne(mappedBy = "post")
	  @JsonBackReference
	    private Threads threads;
	  
	  public Integer getId() {
		return id;
	}
	@Override
	public String toString() {
		return "Post [id=" + id + ", namePost=" + namePost + ", user=" + user + ", dataPost=" + dataPost
				+ ", threadName=" + threadName + "]";
	}

	public Post(String namePost, User user, String dataPost, String threadName) {
		super();
		this.namePost = namePost;
		this.user = user;
		this.dataPost = dataPost;
		this.threadName = threadName;
	}

	

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNamePost() {
		return namePost;
	}

	public void setNamePost(String namePost) {
		this.namePost = namePost;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getDataPost() {
		return dataPost;
	}

	public void setDataPost(String dataPost) {
		this.dataPost = dataPost;
	}

	public String getThreadName() {
		return threadName;
	}

	public void setThreadName(String threadName) {
		this.threadName = threadName;
	}

	public Threads getThreads() {
		return threads;
	}

	public void setThreads(Threads threads) {
		this.threads = threads;
	}

	public Set<Reply> getReply() {
		return reply;
	}

	public void setReply(Set<Reply> reply) {
		this.reply = reply;
	}

	public Post() {
		super();
	}

	public Post(String namePost, User user, String dataPost, String threadName, Threads threads, Set<Reply> reply) {
		super();
		this.namePost = namePost;
		this.user = user;
		this.dataPost = dataPost;
		this.threadName = threadName;
		this.threads = threads;
		this.reply = reply;
	}

	public Post(Integer id, String namePost, User user, String dataPost, String threadName, Threads threads,
			Set<Reply> reply) {
		super();
		this.id = id;
		this.namePost = namePost;
		this.user = user;
		this.dataPost = dataPost;
		this.threadName = threadName;
		this.threads = threads;
		this.reply = reply;
	}

	@JsonIgnore   
	 @OneToMany(mappedBy="post")
	 private Set<Reply> reply;

	

}
