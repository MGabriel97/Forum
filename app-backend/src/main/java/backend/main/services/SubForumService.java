package backend.main.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.main.dto.SearchSubForumDTO;
import backend.main.dto.SubForumDTO;
import backend.main.entities.SubForum;
import backend.main.repositories.SubForumRepository;


@Service
public class SubForumService {
	 private final SubForumRepository subForumRepository;
	    
	    @Autowired
	    public SubForumService(SubForumRepository subForumRepository) {
	        this.subForumRepository = subForumRepository;
	    }
	    
	    
	    public SubForum addSubForum(SubForumDTO subForumDTO) {
	    
		    return subForumRepository.save(SubForumDTO.toEntity(subForumDTO));
	    }
	    
	      
	    
	    public List <SubForum> findAll() {
	        return subForumRepository.findAll();
	    }
	    public List <SubForum> getSubForumOrderByCategory() {
	        return subForumRepository.getSubForumOrderByCategory();
	    }
	    public List <SubForum> findByCategory(String category) {
	        return subForumRepository.findByCategory(category);
	    }
	    public List <SubForum> searchSubForum(SearchSubForumDTO searchSubForumDTO) {
	    	String subForumName=searchSubForumDTO.subForumName;
	    	String category=searchSubForumDTO.category;
	        return subForumRepository.searchSubForum(subForumName, category);
	    }
	    public Optional<SubForum> findById(Integer id) {
	        return subForumRepository.findById(id);
	    }

}
