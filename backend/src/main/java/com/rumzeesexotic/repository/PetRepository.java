package com.rumzeesexotic.repository;

import com.rumzeesexotic.entity.Pet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface PetRepository extends JpaRepository<Pet, String> {
    List<Pet> findByFeaturedTrue();

    List<Pet> findByIsNewTrue();

    Page<Pet> findBySpecies(String species, Pageable pageable);

    Page<Pet> findByCategory(String category, Pageable pageable);

    @Query("""
                SELECT p FROM Pet p WHERE
                (:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%'))
                    OR LOWER(p.breed) LIKE LOWER(CONCAT('%', :search, '%')))
                AND (:species IS NULL OR p.species = :species)
                AND (:category IS NULL OR p.category = :category)
                AND p.price BETWEEN :minPrice AND :maxPrice
            """)
    Page<Pet> search(
            @Param("search") String search,
            @Param("species") String species,
            @Param("category") String category,
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice,
            Pageable pageable);
}
