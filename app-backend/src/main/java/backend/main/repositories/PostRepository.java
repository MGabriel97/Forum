package backend.main.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.main.entities.Post;

@Repository
public interface PostRepository  extends JpaRepository<Post, Integer> {
	 @Query(value = "SELECT post " +
	            "FROM Post post " +
	            "WHERE post.namePost = :namepost")
	    Optional<Post> findUserByNamePost(String namepost);
	 
	 @Query(value = "SELECT post " +
	            "FROM Post post " +
	            "WHERE post.user.id = :userpostid")
	    List<Post> findPostByUser(Integer userpostid);
	 
	 @Query(value = "SELECT post FROM Post post WHERE post.namePost LIKE %:namePost%")
	    List<Post> searchByPostStartsWith(String namePost);
}
