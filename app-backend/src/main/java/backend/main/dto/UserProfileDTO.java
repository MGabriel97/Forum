package backend.main.dto;

import backend.main.entities.User;



public class UserProfileDTO {
	public Integer id;
	public String username;
	public String email;
	public String location;

	//public MultipartFile profileImage;
	
	 public static UserProfileDTO fromEntity(User userProfile) {
		 UserProfileDTO userProfileDTO  = new UserProfileDTO();
		 userProfileDTO.id=userProfile.getId();
		 userProfileDTO.username=userProfile.getUsername();
		 userProfileDTO.email=userProfile.getEmail();
		 userProfileDTO.location=userProfile.getLocation();

	        return userProfileDTO;
	    }

	  
	 public static User toEntity(UserProfileDTO userProfileDTO) {

	        return new User(userProfileDTO.id,userProfileDTO.username, userProfileDTO.email,userProfileDTO.location);
	    }
}
