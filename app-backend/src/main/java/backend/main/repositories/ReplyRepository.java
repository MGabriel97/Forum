package backend.main.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import backend.main.entities.Reply;


@Repository
public interface ReplyRepository  extends JpaRepository<Reply, Integer> {
	@Query(value = "SELECT * " +
            "FROM Reply  " +
            "WHERE namepost_id = :namepostId",nativeQuery=true)
    List<Reply> findByPostId(Integer namepostId);
	
	 @Query(value = "SELECT reply " +
	            "FROM Reply reply " +
	            "WHERE reply.user.id = :userpostid")
	    List<Reply> findReplyByUser(Integer userpostid);
	 @Query(value = "SELECT count(*) " +
	            "FROM Reply reply " +
	            "WHERE reply.post.id = :postid")
	    Integer countByPost(Integer postid);
	 
	 @Query(value = "SELECT * FROM Reply where namepost_id= :postid order by id desc LIMIT 1 ;",nativeQuery=true)
	    Reply findLastReply(Integer postid);
	 
	 @Query("SELECT m FROM Reply m WHERE  m.post.id = :postid AND m.dataPost LIKE  %:datapost% ")
	 List<Reply> searchByReplyData(String datapost,Integer postid);
	 
	 
}