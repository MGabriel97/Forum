package backend.main.controller;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import backend.main.dto.UpdateUserDTO;
import backend.main.dto.UserLoginDTO;
import backend.main.dto.UserRegisterDTO;
import backend.main.entities.Image;
import backend.main.entities.User;
import backend.main.repositories.ImageRepository;
import backend.main.repositories.UserRepository;
import backend.main.services.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "user")

public class UserController {
    private final ImageRepository imageRepository;

	  private final UserService userService;
	  private final UserRepository userRepository;
	  @Autowired
	    public UserController(UserService userService,UserRepository userRepository
	    		,ImageRepository imageRepository) {
	        this.userService = userService;
	        this.userRepository = userRepository;
	        this.imageRepository =imageRepository;
	    }
	
	@PostMapping("/add")
	  User newUser(@RequestBody UserRegisterDTO user) throws IOException {
	    return userService.addUser(user);
	  }
	
	
	@PostMapping("/login")
	  public String  login(@RequestBody UserLoginDTO userLoginDTO) {
	    return userService.findUserByUsernameandPassword(userLoginDTO);
	  }
	@GetMapping(path="/all")
	  public @ResponseBody Iterable<User> getAllUsers() {
	    // This returns a JSON or XML with the users
	    return userService.getAllUsers();
	  }
	@GetMapping("/findbyid/{id}")
	  public  Optional<User> loadUserById(@PathVariable Integer id)  {
	    // This returns a JSON or XML with the users
	    return userService.findById(id);
	  }
	@PostMapping("/update/{id}")
	  public User update(@PathVariable Integer id,@RequestBody UpdateUserDTO updateUserDTO)  {
	    // This returns a JSON or XML with the users
	    return userService.update(id, updateUserDTO);
	  }
	@GetMapping(path="/getuserbyName/{userName}")
	  public @ResponseBody Optional<User> loadUserByUsername(@PathVariable String userName)  {
	    // This returns a JSON or XML with the users
	    return userService.findUserByUsername(userName);
	  }
	
	@PostMapping("/updateimage/{id}")
	public  void updateProfile(@PathVariable Integer id,@RequestParam("image") MultipartFile file) throws IOException {
		final Image retrievedImage = imageRepository.findById(id).get();
 		retrievedImage.setImage(file.getBytes());
 		imageRepository.save(retrievedImage);
	}
 	
	@GetMapping(path = { "/getimage/{id}" })
	public Image getImage(@PathVariable Integer id) throws IOException {

		final Image retrievedImage = imageRepository.findById(id).get();
		return retrievedImage;
	}
	
	
	
}
