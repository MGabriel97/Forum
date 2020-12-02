package backend.main.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.main.entities.User;

@Repository
public interface UserRepository  extends JpaRepository<User, Integer> {
     Optional<User>  findById(Integer id);
    
    @Query(value = "SELECT user " +
            "FROM User user " +
            "WHERE user.username = :username")
    Optional<User> findUserByUsername(String username);
    
    @Query(value = "SELECT user " +
            "FROM User user " +
            "WHERE user.username = :username and user.password = :password ")
    User findUserByUsernameandPassword(String username,String password);

}
