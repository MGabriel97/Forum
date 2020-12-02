package backend.main.dto;

import backend.main.entities.User;

public class UserRegisterDTO{
	public String username;
	public String email;
	public String password;
	public String joinDate;
	public String role;
	public byte[] image;

	
	public static UserRegisterDTO fromEntity(User userProfile) {
		UserRegisterDTO userRegisterDTO  = new UserRegisterDTO();
		userRegisterDTO.username=userProfile.getUsername();
		userRegisterDTO.email=userProfile.getEmail();
		userRegisterDTO.password=userProfile.getPassword();
		userRegisterDTO.joinDate=userProfile.getJoinDate();
		userRegisterDTO.role=userProfile.getRole();

	        return userRegisterDTO;
	    }

	  
	 public static User toEntity(UserRegisterDTO userRegisterDTO) {

	        return new User(userRegisterDTO.username, userRegisterDTO.email,
	        		userRegisterDTO.password,userRegisterDTO.joinDate,userRegisterDTO.role,userRegisterDTO.image);
	    }
	
}