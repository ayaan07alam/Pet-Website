import { Pet } from '@/components/PetCard';

// ─────────────────────────────────────────────
//  MOCK PETS — Client Inventory (March 2025)
// ─────────────────────────────────────────────

export const mockPets: Pet[] = [

  // ══════════════ BIRDS ══════════════

  // Pigeons
  {
    id: 'bird-fg-01', name: 'Fancy Pigeon', breed: 'Fantail / Jacobin Mix',
    species: 'bird', age: '6 months', gender: 'Male', price: 3500,
    image: 'https://images.unsplash.com/photo-1526662092594-e98c1e356d6a?w=600&q=80',
    rating: 4.5, reviews: 12, available: true, featured: false, isNew: true, category: 'birds',
    description: 'Stunning fancy pigeons with ornamental plumage. Available in Fantail, Jacobin, and Pouter varieties. Show-quality birds, hand-reared and well-socialized.',
  },
  {
    id: 'bird-pp-01', name: 'Performance Pigeon', breed: 'Tippler / Tumbler',
    species: 'bird', age: '8 months', gender: 'Male', price: 4500,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.4, reviews: 8, available: true, featured: false, category: 'birds',
    description: 'Athletic performance pigeons bred for endurance and acrobatic flight. Healthy, vaccinated, and ready for training.',
  },

  // Exotic Finches
  {
    id: 'bird-ef-01', name: 'Exotic Finch Pair', breed: 'Gouldian Finch',
    species: 'bird', age: '5 months', gender: 'Male', price: 5500,
    image: 'https://images.unsplash.com/photo-1567325836699-2fb7c3bbef80?w=600&q=80',
    rating: 4.7, reviews: 19, available: true, featured: true, isNew: true, category: 'birds',
    description: 'Brilliantly coloured Gouldian finches — a rainbow in a cage. Hardy, lively, and perfect for aviary setups. Also available: Zebra Finch, Society Finch, and Star Finch.',
  },

  // Conures
  {
    id: 'bird-sc-01', name: 'Sun Conure', breed: 'Sun Conure (Aratinga solstitialis)',
    species: 'bird', age: '5 months', gender: 'Female', price: 28000,
    image: 'https://images.unsplash.com/photo-1620733723572-11c53fc805e0?w=600&q=80',
    rating: 4.8, reviews: 34, available: true, featured: true, isNew: true, category: 'birds',
    description: 'Beautiful, bold, and extremely playful Sun Conure. Brilliant orange-yellow plumage. Loves head scratches, talking, and being the center of attention.',
  },
  {
    id: 'bird-gc-01', name: 'Green-cheeked Conure', breed: 'Green-cheeked Conure (Pyrrhura molinae)',
    species: 'bird', age: '4 months', gender: 'Male', price: 18000,
    image: 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600&q=80',
    rating: 4.6, reviews: 22, available: true, category: 'birds',
    description: 'Affectionate and quiet compared to other conures. Loves cuddling under collars and is great for apartment living. Hand-fed & tame.',
  },
  {
    id: 'bird-bc-01', name: 'Blue-crowned Conure', breed: 'Blue-crowned Conure (Thectocercus acuticaudatus)',
    species: 'bird', age: '6 months', gender: 'Male', price: 35000,
    image: 'https://images.unsplash.com/photo-1516434233442-f3dd28065c41?w=600&q=80',
    rating: 4.5, reviews: 11, available: true, category: 'birds',
    description: 'One of the best talking conures. Highly intelligent, very playful, and forms deep bonds with owners. Beautiful blue-crowned head.',
  },

  // Macaws
  {
    id: 'bird-sm-01', name: 'Scarlet Macaw', breed: 'Ara macao',
    species: 'bird', age: '8 months', gender: 'Male', price: 85000,
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80',
    rating: 4.9, reviews: 27, available: true, featured: true, category: 'birds',
    description: 'Stunning wild-coloured Scarlet Macaw. Hand-raised, very social, and an excellent talker. A true showstopper. Includes health certificate.',
  },
  {
    id: 'bird-bm-01', name: 'Blue & Gold Macaw', breed: 'Ara ararauna',
    species: 'bird', age: '10 months', gender: 'Female', price: 90000,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&q=80',
    rating: 4.8, reviews: 21, available: true, featured: true, category: 'birds',
    description: 'Magnificent Blue & Gold Macaw. Known for intelligence, playfulness, and an impressive vocabulary. A lifetime companion. DNA tested.',
  },
  {
    id: 'bird-hm-01', name: 'Hahn\'s Macaw', breed: 'Diopsittaca nobilis (Mini Macaw)',
    species: 'bird', age: '5 months', gender: 'Male', price: 45000,
    image: 'https://images.unsplash.com/photo-1606567595334-d39972c85e55?w=600&q=80',
    rating: 4.7, reviews: 14, available: true, isNew: true, category: 'birds',
    description: 'The smallest of all macaws but big in personality! Bold, funny, and a great talker. Perfect for those wanting a macaw without the full-size commitment.',
  },

  // Cockatoo
  {
    id: 'bird-ct-01', name: 'Sulphur-crested Cockatoo', breed: 'Cacatua galerita',
    species: 'bird', age: '1 year', gender: 'Male', price: 95000,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.9, reviews: 18, available: true, featured: true, category: 'birds',
    description: 'The iconic white cockatoo with a brilliant yellow crest. Extremely affectionate and clever. Loves dancing, mimicking, and cuddles. Hand-tame.',
  },
  {
    id: 'bird-mc-01', name: 'Moluccan Cockatoo', breed: 'Cacatua moluccensis',
    species: 'bird', age: '14 months', gender: 'Female', price: 120000,
    image: 'https://images.unsplash.com/photo-1612024782955-49fae79e42bb?w=600&q=80',
    rating: 4.8, reviews: 9, available: true, category: 'birds',
    description: 'One of the most beautiful and affectionate cockatoos. Salmon-pink plumage and a massive pink crest. Extremely rare in India.',
  },

  // African Grey
  {
    id: 'bird-ag-01', name: 'African Grey Parrot', breed: 'Congo African Grey (Psittacus erithacus)',
    species: 'bird', age: '1 year', gender: 'Female', price: 120000,
    image: 'https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=600&q=80',
    rating: 5.0, reviews: 24, available: true, featured: true, category: 'birds',
    description: 'The most intelligent parrot species on Earth. Capable of understanding context and speaking in full sentences. DNA-tested, health-certified, and hand-tame.',
  },
  {
    id: 'bird-tg-01', name: 'Timneh African Grey', breed: 'Timneh Grey (Psittacus timneh)',
    species: 'bird', age: '10 months', gender: 'Male', price: 95000,
    image: 'https://images.unsplash.com/photo-1612024782955-49fae79e42bb?w=600&q=80',
    rating: 4.8, reviews: 12, available: true, isNew: true, category: 'birds',
    description: 'Slightly smaller than the Congo Grey but equally intelligent. Known to start talking earlier and has a darker, charcoal-grey plumage.',
  },

  // Amazon
  {
    id: 'bird-bfa-01', name: 'Blue-fronted Amazon', breed: 'Amazona aestiva',
    species: 'bird', age: '10 months', gender: 'Male', price: 75000,
    image: 'https://images.unsplash.com/photo-1567612529009-afe5f2c43a49?w=600&q=80',
    rating: 4.6, reviews: 16, available: true, category: 'birds',
    description: 'Outstanding singer and talker. Loves music, learns songs quickly, and performs tricks enthusiastically. Vivid green with beautiful blue-and-yellow face patches.',
  },
  {
    id: 'bird-yha-01', name: 'Yellow-headed Amazon', breed: 'Amazona oratrix',
    species: 'bird', age: '1 year', gender: 'Female', price: 90000,
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80',
    rating: 4.7, reviews: 10, available: true, featured: true, category: 'birds',
    description: 'Arguably the best talking Amazon species. Remarkable vocal range. Yellow head and vivid green body. Very rare and highly sought after.',
  },

  // Lorikeet
  {
    id: 'bird-rl-01', name: 'Rainbow Lorikeet', breed: 'Trichoglossus moluccanus',
    species: 'bird', age: '4 months', gender: 'Male', price: 22000,
    image: 'https://images.unsplash.com/photo-1559893098-ebb5085ab7b7?w=600&q=80',
    rating: 4.7, reviews: 20, available: true, isNew: true, category: 'birds',
    description: 'A living rainbow! Spectacular multi-coloured plumage. Loves bathing, playing, and nectar. Very energetic and entertaining. Weaned onto liquid diet included.',
  },

  // Eclectus
  {
    id: 'bird-ek-01', name: 'Eclectus Parrot', breed: 'Eclectus roratus (Male)',
    species: 'bird', age: '1 year', gender: 'Male', price: 65000,
    image: 'https://images.unsplash.com/photo-1434820173434-2a53fc80c3df?w=600&q=80',
    rating: 4.8, reviews: 15, available: true, featured: true, category: 'birds',
    description: 'One of the most visually striking parrots — the male is brilliant green; the female is scarlet & blue. Calm, gentle, and a good talker. Loves fruit-based diet.',
  },

  // Budgies
  {
    id: 'bird-bg-01', name: 'English Budgerigar', breed: 'Melopsittacus undulatus (Show-type)',
    species: 'bird', age: '3 months', gender: 'Male', price: 3500,
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80',
    rating: 4.5, reviews: 45, available: true, category: 'birds',
    description: 'Large exhibition-type budgies with fluffy heads. Available in blue, green, yellow, albino, and lutino varieties. Great starter birds. Pairs available.',
  },

  // Cockatiels
  {
    id: 'bird-ck-01', name: 'Normal Grey Cockatiel', breed: 'Nymphicus hollandicus',
    species: 'bird', age: '4 months', gender: 'Male', price: 4500,
    image: 'https://images.unsplash.com/photo-1591198936750-16d8e15edb9e?w=600&q=80',
    rating: 4.7, reviews: 55, available: true, isNew: false, category: 'birds',
    description: 'Classic grey cockatiel. Whistles tunes, loves head scratches, and gets along with everyone. Hardy, long-lived, and perfect for beginners.',
  },
  {
    id: 'bird-ck-02', name: 'Lutino Cockatiel', breed: 'Nymphicus hollandicus (Lutino)',
    species: 'bird', age: '3 months', gender: 'Female', price: 6500,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
    rating: 4.8, reviews: 32, available: true, isNew: true, category: 'birds',
    description: 'Beautiful yellow-and-white mutation with striking red eyes. Hand-tame and very affectionate. One of the most popular cockatiel mutations.',
  },

  // ══════════════ BIG BIRDS ══════════════

  {
    id: 'big-os-01', name: 'Ostrich', breed: 'Common Ostrich (Struthio camelus)',
    species: 'bird', age: '1 year', gender: 'Male', price: 250000,
    image: 'https://images.unsplash.com/photo-1527236438218-d82077ae1f85?w=600&q=80',
    rating: 4.3, reviews: 5, available: true, featured: false, category: 'birds',
    description: 'The world\'s largest bird. Bred on licensed farms. Suitable for large properties and farms only. Requires spacious outdoor enclosure. Enquire for delivery.',
  },
  {
    id: 'big-em-01', name: 'Emu', breed: 'Dromaius novaehollandiae',
    species: 'bird', age: '10 months', gender: 'Female', price: 180000,
    image: 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80',
    rating: 4.2, reviews: 4, available: true, category: 'birds',
    description: 'Australia\'s iconic flightless bird. Curious, curious, and surprisingly friendly when hand-reared. Requires large outdoor space. Farm/property required.',
  },

  // ══════════════ RODENTS ══════════════

  {
    id: 'rod-dh-01', name: 'Dwarf Hamster', breed: 'Roborovski Dwarf Hamster',
    species: 'rodent', age: '6 weeks', gender: 'Female', price: 800,
    image: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?w=600&q=80',
    rating: 4.6, reviews: 38, available: true, isNew: true, category: 'rodents',
    description: 'Tiny, adorable, and lightning-fast! Roborovski dwarfs are the smallest hamsters. Perfect for watching, less for frequent handling. Social — best in same-sex pairs.',
  },
  {
    id: 'rod-sh-01', name: 'Syrian Hamster', breed: 'Syrian Hamster (Golden)',
    species: 'rodent', age: '8 weeks', gender: 'Male', price: 1200,
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80',
    rating: 4.7, reviews: 50, available: true, featured: true, category: 'rodents',
    description: 'The classic "teddy bear" hamster. Solitary by nature and easy to tame. Loves running on wheels and burrowing. Available in several colour morphs.',
  },
  {
    id: 'rod-lhh-01', name: 'Long-hair Hamster', breed: 'Angora Hamster (Long-hair Syrian)',
    species: 'rodent', age: '7 weeks', gender: 'Male', price: 1800,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.7, reviews: 22, available: true, isNew: true, category: 'rodents',
    description: 'Long, silky, flowing coat that looks like a fluffy ball. Requires gentle grooming. Same great temperament as the Syrian. Very photogenic and popular!',
  },
  {
    id: 'rod-gb-01', name: 'Mongolian Gerbil', breed: 'Meriones unguiculatus',
    species: 'rodent', age: '6 weeks', gender: 'Male', price: 600,
    image: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=600&q=80',
    rating: 4.5, reviews: 18, available: true, category: 'rodents',
    description: 'Active, curious, and sociable little gerbils that love to explore. Must be kept in pairs or groups. Rarely bite and have almost no odour.',
  },
  {
    id: 'rod-mi-01', name: 'Fancy Mouse', breed: 'Mus musculus (Fancy)',
    species: 'rodent', age: '5 weeks', gender: 'Male', price: 350,
    image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80',
    rating: 4.3, reviews: 30, available: true, category: 'rodents',
    description: 'Colourful, lively fancy mice in various coat colours and patterns. Social and entertaining to watch. Inexpensive to keep and great for kids.',
  },
  {
    id: 'rod-dg-01', name: 'Degu', breed: 'Octodon degus',
    species: 'rodent', age: '8 weeks', gender: 'Female', price: 2500,
    image: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?w=600&q=80',
    rating: 4.4, reviews: 10, available: true, isNew: true, category: 'rodents',
    description: 'Highly intelligent and social chipmunk-like rodents from Chile. They live in groups, enjoy obstacle courses and puzzles, and are very active during the day.',
  },
  {
    id: 'rod-abgp-01', name: 'Abyssinian Guinea Pig', breed: 'Cavia porcellus (Abyssinian)',
    species: 'rodent', age: '6 weeks', gender: 'Female', price: 1800,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.7, reviews: 28, available: true, featured: true, category: 'rodents',
    description: 'Distinctive Abyssinian guinea pig with its characteristic rosette (swirling) coat pattern. Friendly, vocal, and loves interaction. Ideal family pet.',
  },
  {
    id: 'rod-pgp-01', name: 'Peruvian Guinea Pig', breed: 'Cavia porcellus (Peruvian)',
    species: 'rodent', age: '7 weeks', gender: 'Male', price: 2200,
    image: 'https://images.unsplash.com/photo-1548366086-7f1b76106622?w=600&q=80',
    rating: 4.6, reviews: 15, available: true, isNew: true, category: 'rodents',
    description: 'Long, flowing, silky coat that can grow several inches. Needs regular grooming. Gentle, calm, and loves to be hand-fed leafy greens.',
  },

  // ══════════════ REPTILES ══════════════

  {
    id: 'rep-bd-01', name: 'Bearded Dragon', breed: 'Pogona vitticeps',
    species: 'reptile', age: '6 months', gender: 'Male', price: 18000,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.7, reviews: 29, available: true, featured: true, category: 'reptiles',
    description: 'The most beginner-friendly lizard available. Docile, curious, and easily tamed. Omnivore — eats insects and greens. Comes with care guide. CB captive-bred.',
  },
  {
    id: 'rep-ig-01', name: 'Green Iguana', breed: 'Iguana iguana',
    species: 'reptile', age: '8 months', gender: 'Male', price: 12000,
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=600&q=80',
    rating: 4.3, reviews: 18, available: true, category: 'reptiles',
    description: 'Classic full-green iguana. Hand-tamed, healthy, and eating well. A magnificent reptile that becomes a true pet when properly handled from a young age.',
  },
  {
    id: 'rep-bp-01', name: 'Ball Python', breed: 'Python regius',
    species: 'reptile', age: '1 year', gender: 'Female', price: 22000,
    image: 'https://images.unsplash.com/photo-1515536765-9b2a70c4b333?w=600&q=80',
    rating: 4.8, reviews: 24, available: true, featured: true, category: 'reptiles',
    description: 'The most popular pet snake in the world. Docile, manageable, and beautifully patterned. Normal morph available. Captive-bred, healthy, and feeding on frozen-thawed.',
  },
  {
    id: 'rep-cs-01', name: 'Corn Snake', breed: 'Pantherophis guttatus',
    species: 'reptile', age: '6 months', gender: 'Male', price: 9000,
    image: 'https://images.unsplash.com/photo-1530989527-ad659cec3e56?w=600&q=80',
    rating: 4.7, reviews: 20, available: true, isNew: true, category: 'reptiles',
    description: 'Slender, beautiful, and incredibly easy to care for. Non-venomous. Perfect beginner snake. Available in classic anerythristic (charcoal) morph.',
  },
  {
    id: 'rep-wh-01', name: 'Western Hognose Snake', breed: 'Heterodon nasicus',
    species: 'reptile', age: '8 months', gender: 'Female', price: 35000,
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=600&q=80',
    rating: 4.9, reviews: 14, available: true, featured: true, isNew: true, category: 'reptiles',
    description: 'The drama queen of snakes! Famous for its upturned snout and theatrical death-feigning behaviour. Rear-fanged but harmless to humans. Captive-bred.',
  },

  // ══════════════ TURTLES ══════════════

  {
    id: 'tur-res-01', name: 'Red-Eared Slider', breed: 'Trachemys scripta elegans',
    species: 'tortoise', age: '1 year', gender: 'Male', price: 3500,
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600&q=80',
    rating: 4.5, reviews: 35, available: true, featured: true, category: 'turtles',
    description: 'The most popular aquatic turtle in the world. Bright red ear patches and an olive-green shell. Thrives in a well-maintained tank with basking area. Hardy and long-lived.',
  },
  {
    id: 'tur-ybs-01', name: 'Yellow-Bellied Slider', breed: 'Trachemys scripta scripta',
    species: 'tortoise', age: '8 months', gender: 'Female', price: 4500,
    image: 'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?w=600&q=80',
    rating: 4.6, reviews: 18, available: true, isNew: true, category: 'turtles',
    description: 'Gorgeous yellow markings on the underside and distinctive yellow stripes on the neck. Slightly calmer than the Red-Eared Slider. Great for beginners.',
  },

  // ══════════════ CATS ══════════════

  {
    id: 'cat-sib-01', name: 'Siberian Kitten', breed: 'Siberian',
    species: 'cat', age: '3 months', gender: 'Female', price: 55000,
    image: 'https://images.unsplash.com/photo-1587300003388-59208cb962cd?w=600&q=80',
    rating: 4.8, reviews: 18, available: true, featured: true, isNew: true, category: 'cats',
    description: 'Large, majestic Siberian with a triple-layer waterproof coat. Hypoallergenic — suitable for mild cat allergy sufferers. Athletic, playful, and deeply devoted to family.',
  },
  {
    id: 'cat-elh-01', name: 'Exotic Longhair Kitten', breed: 'Exotic Longhair',
    species: 'cat', age: '4 months', gender: 'Male', price: 50000,
    image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80',
    rating: 4.9, reviews: 22, available: true, featured: true, category: 'cats',
    description: 'Persian-type face with a long silky coat. Calm, quiet, and affectionate. Loves lounging in laps. Less demanding than a Persian but equally beautiful.',
  },
  {
    id: 'cat-rd-01', name: 'Ragdoll Kitten', breed: 'Ragdoll',
    species: 'cat', age: '3 months', gender: 'Female', price: 42000,
    image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&q=80',
    rating: 5.0, reviews: 45, available: true, featured: true, category: 'cats',
    description: 'Blue-eyed, pointed Ragdoll — the ultimate lap cat. Goes limp when held. Dog-like personality, follows owner from room to room. Vaccinated & dewormed.',
  },
  {
    id: 'cat-si-01', name: 'Siamese Kitten', breed: 'Siamese',
    species: 'cat', age: '3 months', gender: 'Male', price: 35000,
    image: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&q=80',
    rating: 4.7, reviews: 40, available: true, category: 'cats',
    description: 'Seal-point Siamese with piercing sapphire-blue eyes and vocal personality. The most talkative cat breed! Craves attention and bonds deeply with one person.',
  },
  {
    id: 'cat-bsh-01', name: 'British Shorthair', breed: 'British Shorthair (Blue)',
    species: 'cat', age: '3 months', gender: 'Female', price: 42000,
    image: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&q=80',
    rating: 4.8, reviews: 51, available: true, featured: true, isNew: true, category: 'cats',
    description: 'Plush, dense "teddy bear" coat with round copper eyes. Independent yet gentle nature. Excellent with children. One of the calmest and most adaptable breeds.',
  },
  {
    id: 'cat-sf-01', name: 'Scottish Fold Kitten', breed: 'Scottish Fold',
    species: 'cat', age: '3 months', gender: 'Male', price: 50000,
    image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&q=80',
    rating: 4.8, reviews: 28, available: true, category: 'cats',
    description: 'Iconic folded ears and large, round eyes give this breed an eternally surprised expression. Calm, sociable, and great with kids and other pets.',
  },
  {
    id: 'cat-esh-01', name: 'Exotic Shorthair Kitten', breed: 'Exotic Shorthair',
    species: 'cat', age: '4 months', gender: 'Female', price: 45000,
    image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=600&q=80',
    rating: 4.9, reviews: 38, available: true, featured: true, category: 'cats',
    description: 'The "lazy man\'s Persian." Plush, dense coat without the grooming demands. Flat face, big eyes, quiet and cuddly. Incredibly sweet-natured.',
  },
  {
    id: 'cat-mc-01', name: 'Maine Coon Kitten', breed: 'Maine Coon',
    species: 'cat', age: '4 months', gender: 'Male', price: 58000,
    image: 'https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=600&q=80',
    rating: 4.9, reviews: 33, available: true, featured: true, category: 'cats',
    description: 'The gentle giant of the cat world. Tufted ears, bushy tail, and magnificent mane. Dog-like loyalty — walks on leash, plays fetch, and loves water.',
  },
  {
    id: 'cat-bg-01', name: 'Bengal Kitten', breed: 'Bengal',
    species: 'cat', age: '4 months', gender: 'Female', price: 85000,
    image: 'https://images.unsplash.com/photo-1620021674486-53c8291c28c8?w=600&q=80',
    rating: 4.9, reviews: 20, available: true, featured: true, isNew: true, category: 'cats',
    description: 'Wild leopard markings with a domestic temperament. Athletic, playful, and endlessly energetic. Loves climbing and water. SBT (5th generation+), no wild blood.',
  },
  {
    id: 'cat-ps-01', name: 'Persian Kitten', breed: 'Persian',
    species: 'cat', age: '3 months', gender: 'Female', price: 38000,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80',
    rating: 4.9, reviews: 60, available: true, featured: true, category: 'cats',
    description: 'Classic white/cream Persian kitten with a flat face and luxurious flowing coat. Gentle, quiet, and deeply affectionate. Vaccinated, dewormed, vet-checked.',
  },
];

// ─────────────────────────────────────────────
//  MOCK PRODUCTS — Accessories & Food
// ─────────────────────────────────────────────

export const mockProducts = [

  // ── CAT ACCESSORIES ──

  {
    id: 'acc-ca-fwb', name: 'Stainless Steel Food & Water Bowls (Set of 2)',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 450, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.6, reviews: 42, stock: 50,
    description: 'Premium stainless steel bowls — rust-proof, easy to clean, and hygienic. Non-slip rubber base. Set of 2 (food + water). Suitable for cats and small dogs.',
  },
  {
    id: 'acc-ca-wf', name: 'Cat Water Fountain — 2L',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 1800, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.7, reviews: 28, stock: 20,
    description: 'Running water encourages cats to drink more, promoting kidney health. 2-litre capacity, quiet pump, replaceable carbon filter. Cats love it!',
  },
  {
    id: 'acc-ca-col', name: 'Breakaway Safety Collar',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 250, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    rating: 4.4, reviews: 35, stock: 80,
    description: 'Safety breakaway buckle releases under pressure, preventing strangulation. Adjustable, lightweight, and available in multiple colours with bell.',
  },
  {
    id: 'acc-ca-car', name: 'Hard-shell Cat Carrier',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 2200, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.6, reviews: 20, stock: 15,
    description: 'Airline-approved hard-shell carrier with ventilation on all sides. Secure latch, comfortable interior, and removable tray for easy cleaning.',
  },
  {
    id: 'acc-ca-ct', name: 'Deluxe Cat Tree — 5 Levels',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 4500, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600',
    rating: 4.8, reviews: 46, stock: 8,
    description: '5-level activity centre: sisal scratching posts, two plush hammocks, a top perch, and interactive hanging toys. Screws into ceiling for stability.',
  },
  {
    id: 'acc-ca-bed', name: 'Orthopedic Cat Bed',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 950, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    rating: 4.7, reviews: 38, stock: 25,
    description: 'Memory foam base with removable, machine-washable fleece cover. Raised rim for cats who love to rest their heads. Available in S and L sizes.',
  },
  {
    id: 'acc-ca-lt', name: 'Hooded Litter Tub — XL',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 1100, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.5, reviews: 55, stock: 30,
    description: 'Large hooded litter box with carbon filter flap — keeps odour and scatter controlled. Smooth interior for easy cleaning. Front-entry with swing door.',
  },
  {
    id: 'acc-ca-ls', name: 'Bentonite Clumping Litter Sand — 5kg',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 650, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.7, reviews: 72, stock: 60,
    description: 'Premium clumping bentonite litter. 99% dust-free, odour-neutralising formula. Tight clumps for easy scooping. Unscented and natural.',
  },
  {
    id: 'acc-ca-lm', name: 'Litter Mat & Stainless Scooper Set',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 550, image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600',
    rating: 4.5, reviews: 30, stock: 40,
    description: 'Honeycomb-design litter mat traps scatter as your cat exits. Comes with a heavy-duty metal scooper with deep slots for perfect sifting.',
  },
  {
    id: 'acc-ca-sp', name: 'Sisal Scratching Post — 70cm',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 750, image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600',
    rating: 4.6, reviews: 48, stock: 35,
    description: 'Tall natural sisal post on a weighted wooden base. Satisfies scratching instincts and protects furniture. Comes with a dangling toy. Easy assembly.',
  },
  {
    id: 'food-ca-meo', name: 'Meo Adult Cat Food — 1.2kg',
    category: 'food', subCategory: 'cat-food',
    price: 680, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
    rating: 4.5, reviews: 62, stock: 45,
    description: 'Thai-origin cat food approved by Indian vets. High chicken protein, balanced omega-3/6 for coat health. Loved by most cat breeds.',
  },
  {
    id: 'food-ca-whk', name: 'Whiskas Adult Dry Food — 3kg',
    category: 'food', subCategory: 'cat-food',
    price: 890, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
    rating: 4.4, reviews: 120, stock: 80,
    description: 'India\'s most popular cat food brand. Balanced nutrition for adult cats with real chicken flavour. Available in ocean fish and chicken variants.',
  },
  {
    id: 'food-ca-zg', name: 'Zero Grain Cat Food — 1.5kg',
    category: 'food', subCategory: 'cat-food',
    price: 1650, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
    rating: 4.7, reviews: 34, stock: 20,
    description: 'Grain-free formula for cats with sensitive stomachs. High meat content (70%+), no wheat, corn, or soy. Ideal for Persians, Bengals, and allergy-prone cats.',
  },
  {
    id: 'food-ca-rc', name: 'Royal Canin Persian Adult — 2kg',
    category: 'food', subCategory: 'cat-food',
    price: 2200, image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600',
    rating: 4.9, reviews: 88, stock: 30,
    description: 'Breed-specific formula for Persian cats. Special almond-shaped kibble for easier jaw pickup. Promotes long coat, digestive health, and hairball control.',
  },
  {
    id: 'acc-ca-cg', name: 'Folding Cat Cage — Double Door',
    category: 'accessories', subCategory: 'cat-accessories',
    price: 3800, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.4, reviews: 14, stock: 10,
    description: 'Heavy-gauge wire cat cage with 4 levels, ramps, hammocks, and litter tray space. Collapsible for easy storage and transport. Great for new kittens.',
  },

  // ── PIGEON ACCESSORIES ──

  {
    id: 'acc-pg-wf', name: 'Pigeon Automatic Water Feeder',
    category: 'accessories', subCategory: 'pigeon-accessories',
    price: 320, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.4, reviews: 16, stock: 30,
    description: 'Self-refilling water feeder with gravity-fed mechanism. Holds 500ml of water. Easy to clean and attach to cage bars. Reduces waste and keeps water fresh.',
  },
  {
    id: 'acc-pg-ft', name: 'Pigeon Food Tray (Set of 2)',
    category: 'accessories', subCategory: 'pigeon-accessories',
    price: 180, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    rating: 4.3, reviews: 22, stock: 50,
    description: 'Heavy-duty plastic food trays with attachment hooks. Low profile to prevent seed scratching. Set of 2. Easy to remove for cleaning.',
  },
  {
    id: 'acc-pg-cg', name: 'Breeding Pigeon Cage — 2ft',
    category: 'accessories', subCategory: 'pigeon-accessories',
    price: 2200, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.5, reviews: 11, stock: 8,
    description: 'Sturdy galvanised wire cage designed for breeding pairs. Includes two nest boxes, perches, and a sliding drop tray for easy cleaning.',
  },

  // ── HAMSTER ACCESSORIES ──

  {
    id: 'acc-hm-wb', name: 'Hamster Water Bottle — 300ml',
    category: 'accessories', subCategory: 'hamster-accessories',
    price: 280, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.4, reviews: 44, stock: 60,
    description: 'Drip-free ball-bearing sipper bottle. Attaches to cage wire or tank. BPA-free plastic, easy to fill, and includes mounting bracket.',
  },
  {
    id: 'acc-hm-cg', name: 'Hamster Cage with Wheel & Tunnel',
    category: 'accessories', subCategory: 'hamster-accessories',
    price: 1500, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.6, reviews: 52, stock: 20,
    description: 'Large 60cm hamster home with silent spinner wheel, coloured tubes, hideout, and food dish. Deep plastic base for burrowing. Easy clean-out access.',
  },

  // ── TURTLE ACCESSORIES ──

  {
    id: 'food-tr-hb', name: 'Turtle & Aquatic Turtle Pellets — 200g',
    category: 'food', subCategory: 'turtle-food',
    price: 380, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
    rating: 4.6, reviews: 36, stock: 40,
    description: 'Nutritionally complete floating pellets. Fortified with calcium for healthy shell growth. Suitable for Red-Eared Sliders, Yellow-Bellied Sliders, and map turtles.',
  },
  {
    id: 'acc-tr-enc', name: 'Aquatic Turtle Tank Enclosure — 3ft',
    category: 'accessories', subCategory: 'turtle-accessories',
    price: 4800, image: 'https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600',
    rating: 4.7, reviews: 18, stock: 5,
    description: 'Complete 3ft aquatic turtle setup: glass tank, external filter, basking platform with ramp, UV-B lamp, and water heater. All-in-one ready to use.',
  },
];

// ─────────────────────────────────────────────
//  MOCK TESTIMONIALS
// ─────────────────────────────────────────────

export const mockTestimonials = [
  {
    id: 1, name: 'Ayaan Sheikh', location: 'Hyderabad', rating: 5,
    text: "Got my African Grey from Rumzee's and it's been the best decision! The bird was healthy, hand-tame, and came with complete vaccination records. Exceptional service!",
    pet: 'African Grey Parrot', avatar: 'AS',
  },
  {
    id: 2, name: 'Priya Mehra', location: 'Bangalore', rating: 5,
    text: "My Persian kitten is absolutely adorable. Rumzee's team was super knowledgeable and helped me choose the right breed for my lifestyle. Highly recommend!",
    pet: 'Persian Kitten', avatar: 'PM',
  },
  {
    id: 3, name: 'Rahul Verma', location: 'Mumbai', rating: 5,
    text: "Amazing experience! The Red-Eared Slider I bought is thriving. They provided a complete care guide and even followed up a week later to check on progress.",
    pet: 'Red-Eared Slider Turtle', avatar: 'RV',
  },
  {
    id: 4, name: 'Fatima Noor', location: 'Delhi', rating: 5,
    text: "Bought a Sun Conure pair. The most vibrant, healthy birds I've seen. The cage setup they recommended was perfect. Will definitely shop again!",
    pet: 'Sun Conure', avatar: 'FN',
  },
  {
    id: 5, name: 'Karthik Reddy', location: 'Chennai', rating: 4,
    text: "Great variety of reptiles. My Ball Python arrived healthy and calm. The packaging was excellent. Very satisfied with the care instructions provided!",
    pet: 'Ball Python', avatar: 'KR',
  },
];

// ─────────────────────────────────────────────
//  MOCK CATEGORIES
// ─────────────────────────────────────────────

export const mockCategories = [
  {
    id: 'birds',
    name: 'Birds & Parrots',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=400&q=80',
    count: 21,
    description: 'Macaws, Conures, Cockatoos & more',
    color: '#E8A020',
    bg: 'linear-gradient(135deg, #FFF3D6, #FFE0A0)',
  },
  {
    id: 'cats',
    name: 'Exotic Cats',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80',
    count: 10,
    description: 'Persian, Maine Coon, Ragdoll & more',
    color: '#C97D0E',
    bg: 'linear-gradient(135deg, #FFF0E0, #FFD9A0)',
  },
  {
    id: 'rodents',
    name: 'Rodents',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80',
    count: 8,
    description: 'Hamsters, Gerbils, Guinea Pigs & more',
    color: '#A0614A',
    bg: 'linear-gradient(135deg, #F5EBE0, #E8CBA0)',
  },
  {
    id: 'reptiles',
    name: 'Reptiles',
    image: 'https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?w=400&q=80',
    count: 5,
    description: 'Bearded Dragons, Ball Pythons & more',
    color: '#4A7C2E',
    bg: 'linear-gradient(135deg, #E8F5E0, #C8E8A0)',
  },
  {
    id: 'turtles',
    name: 'Turtles',
    image: 'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&q=80',
    count: 2,
    description: 'Red-Eared Sliders, Yellow-Bellied & more',
    color: '#6B3A2A',
    bg: 'linear-gradient(135deg, #F0EBE8, #DEC8A0)',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&q=80',
    count: 18,
    description: 'Cages, beds, feeders & essentials',
    color: '#6B3A2A',
    bg: 'linear-gradient(135deg, #F5E6E0, #E8C0A0)',
  },
  {
    id: 'food',
    name: 'Pet Food',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&q=80',
    count: 8,
    description: 'Premium, breed-specific nutrition',
    color: '#4A7C2E',
    bg: 'linear-gradient(135deg, #E0F5E0, #A0E8A0)',
  },
];
