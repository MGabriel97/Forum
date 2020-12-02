package backend.main.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class Threads {
	

	@Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	
	@OneToOne(cascade = CascadeType.ALL)
    @JsonManagedReference
    @JoinColumn(name = "namepostId", referencedColumnName = "id")
	  private Post post;
	
	@Column(name = "namepost")
	  private String namePost;
	
	@Column(name = "namethread")
	  private String nameThread;
	
	 @ManyToOne
	 @JoinColumn(name="subForumId")
	  private SubForum subForum;
	
	public SubForum getSubForum() {
		return subForum;
	}

	public void setSubForum(SubForum subForum) {
		this.subForum = subForum;
	}

	public Threads() {
		super();
	}

	public Threads(Integer id, Post post, String namePost, String nameThread) {
		super();
		this.id = id;
		this.post = post;
		this.namePost = namePost;
		this.nameThread = nameThread;
	}
	
	public Integer getId() {
		return id;
	}

	public Post getPost() {
		return post;
	}

	public void setPost(Post post) {
		this.post = post;
	}

	public String getNamePost() {
		return namePost;
	}

	public void setNamePost(String namePost) {
		this.namePost = namePost;
	}

	public String getNameThread() {
		return nameThread;
	}

	public void setNameThread(String nameThread) {
		this.nameThread = nameThread;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Threads(Post post, String namePost, String nameThread) {
		super();
		this.post = post;
		this.namePost = namePost;
		this.nameThread = nameThread;
	}

	public Threads(Post post, String namePost, String nameThread, SubForum subForum) {
		this.post = post;
		this.namePost = namePost;
		this.nameThread = nameThread;
		this.subForum = subForum;

	}

	
}
