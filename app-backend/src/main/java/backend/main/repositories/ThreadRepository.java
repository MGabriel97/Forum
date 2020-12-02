package backend.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.main.entities.Threads;


@Repository
public interface ThreadRepository  extends JpaRepository<Threads, Integer> {
	@Query(value = "SELECT * " +
            "FROM Threads  " +
            "WHERE sub_forum_id = :subForumId",nativeQuery=true)
    List<Threads> findBySubForum(Integer subForumId);
	
	@Query(value = "SELECT count(*) " +
            "FROM Threads threads " +
            "WHERE threads.subForum.id = :subforumid")
    Integer countBySubForum(Integer subforumid);
	
	 @Query(value = "SELECT * FROM Threads where sub_forum_id= :subforumid order by id desc LIMIT 1 ;",nativeQuery=true)
	    Threads findLastThread(Integer subforumid);
	 
	 @Query("SELECT m FROM Threads m WHERE m.namePost LIKE  %:namePost% ")
	 List<Threads> searchByPostTitle(String namePost);
	 
	 @Query(value = "SELECT threads FROM Threads threads "
	    		+ "WHERE threads.subForum.subForumName LIKE %:subForumName% "
	    		+ "AND threads.post.namePost LIKE %:namePost% "
	    		+ "AND threads.post.dataPost LIKE %:dataPost% "
	    		+ "AND threads.post.user.username LIKE %:username% ")
	    List<Threads> searchThread(String subForumName,String namePost
	    		,String dataPost,String username);
}