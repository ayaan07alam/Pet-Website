package com.rumzeesexotic.config;

import com.rumzeesexotic.entity.Pet;
import com.rumzeesexotic.entity.User;
import com.rumzeesexotic.repository.PetRepository;
import com.rumzeesexotic.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {
    private final PetRepository petRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        seedUsers();
        seedPets();
        log.info("✅ Database seeded with sample data!");
    }

    private void seedUsers() {
        if (userRepository.count() == 0) {
            userRepository.saveAll(List.of(
                    User.builder().name("Admin").email("admin@rumzeesexotic.com")
                            .password(passwordEncoder.encode("admin123")).role(User.Role.ADMIN).build(),
                    User.builder().name("Test User").email("user@rumzeesexotic.com")
                            .password(passwordEncoder.encode("user123")).phone("+91 9876543210").build()));
            log.info("👤 Users seeded: admin@rumzeesexotic.com / admin123");
        }
    }

    private void seedPets() {
        if (petRepository.count() == 0) {
            petRepository.saveAll(List.of(
                    Pet.builder().name("Scarlet Macaw").breed("Ara macao").species("bird").category("birds")
                            .age("8 months").gender("Male").price(85000.0).available(true).featured(true).isNew(true)
                            .imageUrl("https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600")
                            .description(
                                    "Stunning Scarlet Macaw, hand-raised and extremely social. Talks well and loves attention.")
                            .rating(4.8).reviewCount(24).build(),
                    Pet.builder().name("African Grey Parrot").breed("Psittacus erithacus").species("bird")
                            .category("birds")
                            .age("1 year").gender("Female").price(120000.0).available(true).featured(true)
                            .imageUrl("https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600")
                            .description(
                                    "The most intelligent parrot species. Perfect for families who want a talking companion.")
                            .rating(5.0).reviewCount(18).build(),
                    Pet.builder().name("Sun Conure").breed("Aratinga solstitialis").species("bird").category("birds")
                            .age("6 months").gender("Male").price(28000.0).available(true).isNew(true)
                            .imageUrl("https://images.unsplash.com/photo-1620733723572-11c53fc805e0?w=600")
                            .description("Vibrant and playful Sun Conure with beautiful orange-yellow plumage.")
                            .rating(4.6).reviewCount(31).build(),
                    Pet.builder().name("Persian Princess").breed("Persian").species("cat").category("cats")
                            .age("3 months").gender("Female").price(35000.0).available(true).featured(true).isNew(true)
                            .imageUrl("https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600")
                            .description(
                                    "Fluffy white Persian kitten with golden eyes. Vaccinated, dewormed, and vet-checked.")
                            .rating(4.9).reviewCount(38).build(),
                    Pet.builder().name("Maine Coon Mango").breed("Maine Coon").species("cat").category("cats")
                            .age("4 months").gender("Male").price(55000.0).available(true).featured(true)
                            .imageUrl("https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=600")
                            .description(
                                    "Majestic Maine Coon kitten, exceptionally gentle and dog-like in personality.")
                            .rating(4.8).reviewCount(29).build(),
                    Pet.builder().name("Green Iguana").breed("Iguana iguana").species("reptile").category("reptiles")
                            .age("6 months").gender("Male").price(12000.0).available(true).isNew(true)
                            .imageUrl("https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=600")
                            .description("Healthy green iguana, hand-tame. Comes with a full setup guide.")
                            .rating(4.3).reviewCount(15).build(),
                    Pet.builder().name("Sulcata Tortoise").breed("Centrochelys sulcata").species("tortoise")
                            .category("tortoises")
                            .age("2 years").gender("Male").price(22000.0).available(true)
                            .imageUrl("https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600")
                            .description("Large and healthy Sulcata tortoise. A long-lived companion for life.")
                            .rating(4.5).reviewCount(11).build(),
                    Pet.builder().name("Cockatiel").breed("Nymphicus hollandicus").species("bird").category("birds")
                            .age("4 months").gender("Female").price(6500.0).available(true)
                            .imageUrl("https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600")
                            .description("Hand-tame Cockatiel, perfect starter bird. Whistles tunes and loves cuddles.")
                            .rating(4.7).reviewCount(45).build()));
            log.info("🐾 {} pets seeded!", petRepository.count());
        }
    }
}
