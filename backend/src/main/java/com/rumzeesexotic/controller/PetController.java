package com.rumzeesexotic.controller;

import com.rumzeesexotic.entity.Pet;
import com.rumzeesexotic.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pets")
@RequiredArgsConstructor
public class PetController {
    private final PetRepository petRepository;

    @GetMapping
    public ResponseEntity<Page<Pet>> getAll(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String species,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") double minPrice,
            @RequestParam(defaultValue = "999999") double maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String direction) {
        Sort sort = direction.equalsIgnoreCase("asc") ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Pet> result = petRepository.search(search, species, category, minPrice, maxPrice, pageable);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/featured")
    public ResponseEntity<List<Pet>> getFeatured() {
        return ResponseEntity.ok(petRepository.findByFeaturedTrue());
    }

    @GetMapping("/new")
    public ResponseEntity<List<Pet>> getNew() {
        return ResponseEntity.ok(petRepository.findByIsNewTrue());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pet> getById(@PathVariable String id) {
        return petRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pet> create(@RequestBody Pet pet) {
        return ResponseEntity.ok(petRepository.save(pet));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Pet> update(@PathVariable String id, @RequestBody Pet pet) {
        if (!petRepository.existsById(id))
            return ResponseEntity.notFound().build();
        pet.setId(id);
        return ResponseEntity.ok(petRepository.save(pet));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        petRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
