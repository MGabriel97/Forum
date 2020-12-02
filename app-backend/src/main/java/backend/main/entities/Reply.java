package backend.main.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Reply {
	
	@Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	
	 @ManyToOne
	 @JoinColumn(name="namepostId", nullable=false)
	  private Post post;
	
	@Column(name = "userpost")
	  private String userPost;
	
	@Column(name = "datapost")
	  private String dataPost;

	 @ManyToOne
	 @JoinColumn(name="userpostid", nullable=false)
	 private User user;
	 
	 @Column(name = "datetime")
	  private String dateTime;
	 
	public Reply(Post post, String userPost, String dataPost, User user, String dateTime) {
		super();
		this.post = post;
		this.userPost = userPost;
		this.dataPost = dataPost;
		this.user = user;
		this.dateTime = dateTime;
	}

	public String getDateTime() {
		return dateTime;
	}

	public void setDateTime(String dateTime) {
		this.dateTime = dateTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public String getUserPost() {
		return userPost;
	}

	public void setUserPost(String userPost) {
		this.userPost = userPost;
	}

	public String getDataPost() {
		return dataPost;
	}

	public void setDataPost(String dataPost) {
		this.dataPost = dataPost;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Reply(Integer id, Post post, String userPost, String dataPost, User user) {
		super();
		this.id = id;
		this.post = post;
		this.userPost = userPost;
		this.dataPost = dataPost;
		this.user = user;
	}

	public Reply() {
		super();
	}

	public Reply(Post post, String userPost, String dataPost, User user) {
		super();
		this.post = post;
		this.userPost = userPost;
		this.dataPost = dataPost;
		this.user = user;
	}

	@Override
	public String toString() {
		return "Reply [id=" + id + ", post=" + post + ", userPost=" + userPost + ", dataPost=" + dataPost + ", user="
				+ user + ", dateTime=" + dateTime + "]";
	}
	 
	
	
	
	
}
