package backend.main.dto;

import backend.main.entities.SubForum;

public class SubForumDTO {
	  public String subForumName;
	  public String description;
	  public String category;

	  public static SubForumDTO fromEntity(SubForum subForum) {
		  SubForumDTO subForumDTO  = new SubForumDTO();
		  subForumDTO.subForumName=subForum.getSubForumName();
		  subForumDTO.description=subForum.getDescription();
		  subForumDTO.category=subForum.getCategory();
	        return subForumDTO;
	    }

	    public static SubForum toEntity(SubForumDTO subForumDTO) {
	        return new SubForum(subForumDTO.subForumName,subForumDTO.description,subForumDTO.category);
	    }
}
