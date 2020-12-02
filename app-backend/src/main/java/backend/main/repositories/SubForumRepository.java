package backend.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.main.entities.SubForum;


@Repository
public interface SubForumRepository  extends JpaRepository<SubForum, Integer> {
	 @Query(value = "SELECT subForum " +
	            "FROM SubForum subForum " +
	            "ORDER BY category ASC")
	    List<SubForum> getSubForumOrderByCategory();
	 
	    List<SubForum> findByCategory(String category);
	    
	    @Query(value = "SELECT subForum FROM SubForum subForum "
	    		+ "WHERE subForum.subForumName LIKE %:subForumName% "
	    		+ "AND subForum.category LIKE %:category%")
	    List<SubForum> searchSubForum(String subForumName,String category);

}