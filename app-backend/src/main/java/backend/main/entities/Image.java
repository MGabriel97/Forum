package backend.main.entities;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Entity;

@Entity
public class Image {
	
	@Id
    @Column(name = "id", unique = true, nullable = false)
	  private Integer id;
	
	 public Image(byte[] image) {
		super();
		this.image = image;
	}

	public Image() {
		super();
	}

	public Image(Integer id, byte[] image) {
		super();
		this.id = id;
		this.image = image;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	@Column(name = "image", length = 2500)
		private byte[] image;
}
