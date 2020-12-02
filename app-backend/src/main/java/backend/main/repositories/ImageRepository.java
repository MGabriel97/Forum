package backend.main.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import backend.main.entities.Image;

@Repository
public interface ImageRepository extends JpaRepository<Image, Integer> {

}
