package backend.main.entities;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class User {
	  

	@Id
	  @GeneratedValue(strategy=GenerationType.AUTO)
	  private Integer id;
	
	@NotNull
	@Length(min = 1, max = 13)
	@Column(name = "username",unique = true,nullable = false)
	  private String username;
	
	@Column(name = "email")
	  private String email;
	
	@NotNull
	@Column(name = "password",nullable = false)
	@Length(min = 1, max = 13)
	  private String password;
	
	 @JsonIgnore   
	 @OneToMany(mappedBy="user")
	 private Set<Post> post;
	 
	 @JsonIgnore   
	 @OneToMany(mappedBy="user")
	 private Set<Reply> reply;
	 
	 @Column(name = "role")
	  private String role;
	 
	 @Column(name = "image", length = 2500)
		private byte[] image;
	 
	 public User(Integer id, String username, String email, String location, String joinDate) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.location = location;
		this.joinDate = joinDate;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}





	public User(String username, String email, String password, String joinDate,String role,byte[] image) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.joinDate = joinDate;
		this.role = role;
		this.image=image;

	}





	public User(Integer id, String username, String email, String location) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.location = location;
	}





	@Column(name = "location")
	  private String location;
	
	@Column(name = "joindate")
	  private String joinDate;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Post> getPost() {
		return post;
	}

	public void setPost(Set<Post> post) {
		this.post = post;
	}

	public Set<Reply> getReply() {
		return reply;
	}

	public void setReply(Set<Reply> reply) {
		this.reply = reply;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getJoinDate() {
		return joinDate;
	}

	public String setJoinDate(String joinDate) {
		return this.joinDate = joinDate;
	}

	public User() {
		super();
	}

	public User(Integer id, byte[] image) {
		super();
		this.id = id;
		this.image = image;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public User(Integer id, String username, String email, String password, String location, String joinDate) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.location = location;
		this.joinDate = joinDate;
	}

	
	 
	



	
	 
	
	  
	  
}
