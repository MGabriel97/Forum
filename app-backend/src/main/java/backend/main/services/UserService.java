package backend.main.services;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import backend.main.dto.UpdateUserDTO;
import backend.main.dto.UserLoginDTO;
import backend.main.dto.UserRegisterDTO;
import backend.main.entities.Image;
import backend.main.entities.User;
import backend.main.repositories.ImageRepository;
import backend.main.repositories.UserRepository;
import org.springframework.util.StreamUtils;

@Service
public class UserService {
	
    private final UserRepository userRepository;
    private final ImageRepository imageRepository;

    @Autowired
    public UserService(UserRepository userRepository,ImageRepository imageRepository) {
        this.userRepository = userRepository;
        this.imageRepository = imageRepository;
    }
    
    
    public Optional < User > findById(Integer id) {
        return userRepository.findById(id);
    }
    
    public  User  update(Integer id, UpdateUserDTO updateUserDTO) {
        User user=userRepository.findById(id).get();
        user.setLocation(updateUserDTO.location);
        user.setEmail(updateUserDTO.email);
        return userRepository.save(user);
    }
    
    public Optional < User > findUserByUsername(String userName) {
        return userRepository.findUserByUsername(userName);
    }
    public Iterable<User> getAllUsers() {
	    // This returns a JSON or XML with the users
	    return userRepository.findAll();
    }
    
    
    
    public User addUser(UserRegisterDTO user) throws IOException {
    	 Date currentUtilDate = new Date();
    	 user.joinDate=currentUtilDate.toString().substring(0, 10);
    	 user.role="user";
    	 ClassPathResource imgFile = new ClassPathResource("image/avatar.jpg");
         byte[] bytes = StreamUtils.copyToByteArray(imgFile.getInputStream());
         //user.image=bytes;
         User user1;
	     user1=userRepository.save(UserRegisterDTO.toEntity(user));
         Image image=new Image(user1.getId(),bytes);
         imageRepository.save(image);
	     return user1;
    }

    public String findUserByUsernameandPassword(UserLoginDTO  userLoginDTO) {
    	User loginUser=userRepository.findUserByUsernameandPassword(userLoginDTO.username, userLoginDTO.password);
        if(userRepository.findUserByUsernameandPassword(userLoginDTO.username, userLoginDTO.password) != null
        			&& (loginUser.getPassword().equals(userLoginDTO.password)) && (loginUser.getUsername().equals(userLoginDTO.username)))
        {
        	return loginUser.getId()+"";
        }
        else
        {
        	return "Incorrect username and paasword";
        }
    }

}
