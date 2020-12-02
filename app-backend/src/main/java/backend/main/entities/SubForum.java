package backend.main.entities;


import java.util.Set;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Entity;

@Entity
public class SubForum {
	@Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	
	@Column(name = "subforumname")
	  private String subForumName;
	
	@Column(name = "descrption")
	  private String description;
	
	@Column(name = "category")
	  private String category;
	
	  @JsonIgnore   
	 @OneToMany(mappedBy="subForum")
	 private Set<Threads> threads;

	public SubForum(Integer id, String subForumName, String description, Set<Threads> threads) {
		super();
		this.id = id;
		this.subForumName = subForumName;
		this.description = description;
		this.threads = threads;
	}

	public SubForum(String subForumName, String description, Set<Threads> threads) {
		super();
		this.subForumName = subForumName;
		this.description = description;
		this.threads = threads;
	}

	public SubForum() {
		super();
	}

	public SubForum(String subForumName, String description,String category) {
		super();
		this.subForumName = subForumName;
		this.description = description;
		this.category= category;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSubForumName() {
		return subForumName;
	}

	public void setSubForumName(String subForumName) {
		this.subForumName = subForumName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Threads> getThreads() {
		return threads;
	}

	public void setThreads(Set<Threads> threads) {
		this.threads = threads;
	}

	
	
}
