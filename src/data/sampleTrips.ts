import { TripPlan } from '../types/travel';

export const sampleTrips: TripPlan[] = [
  {
    id: 'tokyo-kyoto-7d',
    title: '7 Days of Neon, Shrines & Culinary Wonders in Tokyo & Kyoto',
    destination: 'Tokyo & Kyoto, Japan',
    tagline: 'Futuristic metropolis meets ancient serene gardens and legendary ramen alleys',
    summary: 'Embark on an unforgettable journey through Japan’s contrasting jewels. Experience Shibuya’s pulsating crossing, tranquil bamboo groves in Arashiyama, century-old izakayas, and world-class culinary mastery.',
    durationDays: 7,
    travelGroup: 'couple',
    budgetLevel: 'moderate',
    pace: 'balanced',
    bestTimeToVisit: 'March–May (Cherry Blossoms) or October–November (Autumn Foliage)',
    weatherForecast: {
      summary: 'Crisp mornings with mild sunny afternoons, occasional light breeze.',
      tempRange: '14°C - 22°C (57°F - 72°F)',
      clothingAdvice: 'Layerable cardigan or light jacket, slip-on comfortable shoes for temples.'
    },
    currency: {
      code: 'JPY',
      symbol: '¥',
      rateDescription: '1 USD ≈ 152 JPY. Suica / Pasmo IC card or digital card recommended for all transit.'
    },
    estimatedBudget: {
      totalMinUSD: 1650,
      totalMaxUSD: 2400,
      categories: [
        { category: 'Accommodation', amountUSD: 850, percentage: 42, note: 'Boutique hotels near Shinjuku & Kyoto Station' },
        { category: 'Food & Dining', amountUSD: 520, percentage: 26, note: 'Ramen, Wagyu dining, street food & matchas' },
        { category: 'Transit & Shinkansen', amountUSD: 310, percentage: 15, note: 'Bullet train ticket + Tokyo & Kyoto Metro' },
        { category: 'Temples & Attractions', amountUSD: 180, percentage: 9, note: 'TeamLab Planets, temple entries, tea ceremony' },
        { category: 'Souvenirs & Buffer', amountUSD: 160, percentage: 8, note: 'Matcha treats, pottery & emergency reserve' }
      ]
    },
    days: [
      {
        dayNumber: 1,
        theme: 'Neon Horizons & High-Altitude Views',
        neighborhood: 'Shinjuku & Shibuya',
        morning: {
          title: 'Arrival & Shinjuku Gyoen National Garden',
          timeSlot: '10:00 AM - 12:30 PM',
          duration: '2.5 hours',
          location: 'Shinjuku Gyoen, 11 Naitomachi',
          description: 'Unwind from travel among manicured French formal, English landscape, and traditional Japanese garden ponds with koi and weeping willows.',
          category: 'relaxation',
          estimatedCost: '¥500 (~$3.50)',
          highlights: ['Traditional Taiwanese Pavilion', 'Tranquil Bonsai & tea groves'],
          tips: 'Bring your passport for discounted admission or buy ticket via QR kiosk.'
        },
        afternoon: {
          title: 'Sensory Immersion at Shibuya Scramble & Miyashita Park',
          timeSlot: '02:00 PM - 05:00 PM',
          duration: '3 hours',
          location: 'Shibuya Crossing & Rooftop Miyashita Park',
          description: 'Cross the world’s busiest pedestrian intersection, pay homage to Hachiko, and grab matcha lattes on the rooftop park overlooking the Yamanote train line.',
          category: 'sightseeing',
          estimatedCost: 'Free',
          highlights: ['Iconic Shibuya Scramble vista', 'Rooftop skatepark and green space'],
          tips: 'Go up to Shibuya Sky 45 minutes before sunset for 360-degree views of Mt. Fuji if clear.'
        },
        evening: {
          title: 'Atmospheric Omoide Yokocho (Memory Lane)',
          timeSlot: '06:30 PM - 09:30 PM',
          duration: '3 hours',
          location: 'Omoide Yokocho, Shinjuku West Exit',
          description: 'Squeeze into charming lantern-lit alleys filled with miniature yakitori grills, clinking glasses, and smoky charcoal aromas.',
          category: 'food',
          estimatedCost: '¥3,500 (~$23)',
          highlights: ['Charcoal yakitori skewers', 'Vibrant postwar Tokyo atmosphere'],
          tips: 'Small cover charge (otoushi) of ¥300-500 is standard and includes a small appetizer.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Afuri Ramen Shibuya',
            cuisine: 'Yuzu Shio Ramen',
            estimatedCost: '$$',
            description: 'Famous for its delicate chicken broth infused with citrusy Japanese yuzu and charcoal-charred pork chashu.',
            location: 'Shibuya',
            recommendedDishes: ['Yuzu Ratan Ramen', 'Aburi Chashu Don']
          },
          {
            mealType: 'dinner',
            name: 'Kushiyaki Asahina',
            cuisine: 'Charcoal Skewers & Craft Beer',
            estimatedCost: '$$',
            description: 'Intimate counter seating serving artisan grilled skewers and crisp local draft lagers.',
            location: 'Omoide Yokocho, Shinjuku',
            recommendedDishes: ['Tsukune with egg yolk', 'Shiitake mushroom skewers']
          }
        ],
        transportationTips: 'Use Yamanote line between Shinjuku and Shibuya (7 mins, ¥170). Tap phone with Apple/Google Wallet Suica.',
        insiderTip: 'The Starbucks overlooking Shibuya Crossing gets crowded; head to the 7th floor of Shibuya 109 MAG’s observatory for fewer tourists.'
      },
      {
        dayNumber: 2,
        theme: 'Historic Asakusa & Digital Art Odyssey',
        neighborhood: 'Asakusa & Toyosu',
        morning: {
          title: 'Senso-ji Temple & Nakamise-dori Market',
          timeSlot: '08:30 AM - 11:30 AM',
          duration: '3 hours',
          location: '2 Chome-3-1 Asakusa, Taito City',
          description: 'Tokyo’s oldest Buddhist temple founded in 645 AD. Cleanse with incense at the great bronze urn before browsing fresh Ningyo-yaki doll cakes.',
          category: 'cultural',
          estimatedCost: 'Free',
          highlights: ['Thunder Gate (Kaminarimon) lantern', '5-story pagoda', 'Omikuji fortune slips'],
          tips: 'Arrive before 9 AM to admire the serene temple grounds without the tour crowds.'
        },
        afternoon: {
          title: 'teamLab Planets Immersive Digital Art',
          timeSlot: '01:30 PM - 04:30 PM',
          duration: '3 hours',
          location: '6 Chome-1-16 Toyosu, Koto City',
          description: 'Wade barefoot through crystal water rooms where projected koi transform into flowers, and lie under a cascading floating orchid dome.',
          category: 'sightseeing',
          estimatedCost: '¥3,800 (~$25)',
          highlights: ['Infinite Crystal Universe', 'Floating Flower Garden of orchids'],
          tips: 'Wear pants that can roll above knees as you will walk through knee-deep warm water.'
        },
        evening: {
          title: 'Tokyo Skytree Sunset & Solamachi Riverside Walk',
          timeSlot: '05:30 PM - 08:30 PM',
          duration: '3 hours',
          location: 'Oshiage, Sumida City',
          description: 'Gaze over Tokyo’s vast glitter from 350 meters above ground as the evening metropolis illuminates beneath the darkening sky.',
          category: 'photo',
          estimatedCost: '¥2,100 (~$14)',
          highlights: ['Vast 360-degree city panorama', 'Sumida river twilight illumination'],
          tips: 'Book advance combo tickets online to skip the main ticket booth line.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Asakusa Imahan',
            cuisine: 'Sukiyaki & Beef Donburi',
            estimatedCost: '$$$',
            description: 'Legendary beef house operating since 1895 serving melt-in-your-mouth Kuroge Wagyu.',
            location: 'Asakusa',
            recommendedDishes: ['Special Sukiyaki Lunch Set', 'Wagyu Gozen']
          },
          {
            mealType: 'dinner',
            name: 'Toyosu Senkyaku Banrai',
            cuisine: 'Fresh Seafood & Edomae Sushi',
            estimatedCost: '$$',
            description: 'Vibrant Edo-style marketplace right next to Toyosu Fish Market with fresh tuna nigiri and grilled scallops.',
            location: 'Toyosu',
            recommendedDishes: ['Otoro fatty tuna nigiri', 'Grilled butter scallops with soy']
          }
        ],
        transportationTips: 'Take Ginza Line to Asakusa, then Yurikamome monorail to Toyosu for scenic waterfront views.',
        insiderTip: 'Ride the water bus "Hotaluna" designed by anime legend Leiji Matsumoto from Asakusa to Odaiba for an architectural boat trip.'
      },
      {
        dayNumber: 3,
        theme: 'Subculture & Serenity in Akihabara & Meiji Jingu',
        neighborhood: 'Harajuku & Akihabara',
        morning: {
          title: 'Meiji Jingu Sacred Forest & Shrine',
          timeSlot: '09:00 AM - 11:30 AM',
          duration: '2.5 hours',
          location: '1-1 Yoyogikamizonocho, Shibuya City',
          description: 'Stroll through 170 acres of evergreen sacred forest planted with 100,000 trees donated from across Japan, passing giant cedar Torii gates.',
          category: 'cultural',
          estimatedCost: 'Free',
          highlights: ['Grand Cypress Torii', 'Sake barrel offerings display', 'Ema wooden prayer plaques'],
          tips: 'Bow twice, clap twice, and bow once when offering prayers at the main altar.'
        },
        afternoon: {
          title: 'Electric Town, Retro Arcades & Mandarake Complex',
          timeSlot: '01:00 PM - 04:30 PM',
          duration: '3.5 hours',
          location: 'Akihabara Station vicinity, Chiyoda City',
          description: 'Dive into floors of vintage gaming cartridges, rare anime figurines, high-tech electronic bazaars, and multi-story claw machine halls.',
          category: 'adventure',
          estimatedCost: '¥1,500 (claw games & collectibles)',
          highlights: ['Super Potato retro gaming floor', 'Radio Kaikan 10-story hobby mall'],
          tips: 'Tax-free shopping is available in major stores with passport for purchases above ¥5,500.'
        },
        evening: {
          title: 'Ginza Stroll & Craft Cocktail Speakeasy',
          timeSlot: '06:00 PM - 09:30 PM',
          duration: '3.5 hours',
          location: 'Ginza District, Chuo City',
          description: 'Admire stunning luxury architecture before stepping into an authentic Ginza cocktail bar where master mixologists carve ice spheres by hand.',
          category: 'relaxation',
          estimatedCost: '¥4,500 (~$30)',
          highlights: ['Architectural flagships of Ginza', 'Artisanal Japanese highballs'],
          tips: 'Dress smart casual for Ginza evening venues.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Kanda Matsuya',
            cuisine: 'Handmade Soba',
            estimatedCost: '$$',
            description: 'Historic Edo-style wooden soba shop serving freshly rolled buckwheat noodles with savory dipping dashi broth.',
            location: 'Near Akihabara / Kanda',
            recommendedDishes: ['Kamo Nanban (Duck Soba)', 'Tenzaru Soba (Cold soba with crisp tempura)']
          },
          {
            mealType: 'dinner',
            name: 'Ginza Kagari Main Branch',
            cuisine: 'Tori Paitan (Rich Chicken Ramen)',
            estimatedCost: '$$',
            description: 'Michelin Bib Gourmand recognized creamy chicken broth ramen garnished with seasonal vegetables and truffle oil.',
            location: 'Ginza 6-Chome',
            recommendedDishes: ['Special Tori Paitan Soba', 'Truffle Egg Over Rice']
          }
        ],
        transportationTips: 'Harajuku to Akihabara is direct on the JR Yamanote line (30 mins).',
        insiderTip: 'Visit the rooftop garden of GINZA SIX mall for a peaceful green sanctuary above the glamorous boutiques.'
      },
      {
        dayNumber: 4,
        theme: 'Bullet Train to Ancient Kyoto & Gion Lanterns',
        neighborhood: 'Kyoto Station & Gion',
        morning: {
          title: 'Shinkansen Bullet Train & Bento Experience',
          timeSlot: '08:30 AM - 11:45 AM',
          duration: '3 hours',
          location: 'Tokyo Station to Kyoto Station',
          description: 'Board the Tokaido Shinkansen (Nozomi) cruising at 285 km/h. Enjoy seasonal Ekiben railway lunchboxes and gaze at Mt. Fuji from row E seats.',
          category: 'sightseeing',
          estimatedCost: '¥14,000 (~$92)',
          highlights: ['Bullet train velocity', 'Breathtaking Mt. Fuji views on clear days'],
          tips: 'Book seats on the right side (Seats D/E) departing Tokyo to see Mt. Fuji around 45 mins in.'
        },
        afternoon: {
          title: 'Fushimi Inari Shrine & 10,000 Vermilion Gates',
          timeSlot: '01:30 PM - 05:00 PM',
          duration: '3.5 hours',
          location: '68 Fukakusa Yabunouchicho, Fushimi Ward',
          description: 'Hike through winding corridors of vivid scarlet torii gates dedicated to Inari, the Shinto deity of rice and prosperity.',
          category: 'cultural',
          estimatedCost: 'Free',
          highlights: ['Senbon Torii tunnels', 'Fox statues holding keys to granaries'],
          tips: 'Most tourists stop at the first clearing; hike 20 mins higher to Yotsutsuji intersection for panoramic views.'
        },
        evening: {
          title: 'Gion Twilight Walk & Pontocho Alley Lanterns',
          timeSlot: '06:30 PM - 09:30 PM',
          duration: '3 hours',
          location: 'Pontocho & Hanami-koji, Higashiyama Ward',
          description: 'Walk past preserved wooden machiya merchant houses alongside the Kamogawa River, catching glimpses of Geiko and Maiko heading to appointments.',
          category: 'cultural',
          estimatedCost: '¥4,000 (~$26)',
          highlights: ['Historic wooden lattice facades', 'Riverside terrace platforms (Kawayuka)'],
          tips: 'Photography of geishas on private side streets is prohibited to protect privacy; respect all posted signs.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Kyoto Ekiben Market',
            cuisine: 'Japanese Gourmet Train Bento',
            estimatedCost: '$$',
            description: 'Intricately arranged bento boxes featuring Kyoto pickled vegetables, grilled unagi, and simmered seasonal mushrooms.',
            location: 'Kyoto Station / Shinkansen',
            recommendedDishes: ['Kyoto Seasonal Gozen Bento', 'Katsu Sando']
          },
          {
            mealType: 'dinner',
            name: 'Pontocho Robin',
            cuisine: 'Kyoto Kaiseki & Seasonal Obanzai',
            estimatedCost: '$$$',
            description: '150-year-old machiya house over Kamogawa river serving traditional multi-course Kyoto delicacies.',
            location: 'Pontocho Alley, Kyoto',
            recommendedDishes: ['Yuba (Tofu skin) tempura', 'Wagyu beef hotpot with seasonal greens']
          }
        ],
        transportationTips: 'JR Nara Line runs from Kyoto Station to Inari Station in just 5 minutes.',
        insiderTip: 'Sit on the banks of Kamogawa River at sunset with a cold drink like Kyoto locals do.'
      },
      {
        dayNumber: 5,
        theme: 'Zen Temples & Golden Pavilions of Kyoto',
        neighborhood: 'Northern Kyoto & Arashiyama',
        morning: {
          title: 'Kinkaku-ji (The Golden Pavilion)',
          timeSlot: '09:00 AM - 11:30 AM',
          duration: '2.5 hours',
          location: '1 Kinkakujicho, Kita Ward, Kyoto',
          description: 'Behold the top two floors covered in pure gold leaf, reflecting dramatically across the Mirror Pond (Kyoko-chi) framed by pine isles.',
          category: 'sightseeing',
          estimatedCost: '¥500 (~$3.50)',
          highlights: ['Golden leaf reflection', 'Centuries-old Zen strolling garden'],
          tips: 'Visit mid-morning when sunlight catches the southern gilded facade.'
        },
        afternoon: {
          title: 'Arashiyama Bamboo Grove & Tenryu-ji Zen Temple',
          timeSlot: '01:00 PM - 04:30 PM',
          duration: '3.5 hours',
          location: 'Ukyo Ward, Kyoto',
          description: 'Towering emerald green bamboo stalks swaying with the wind, followed by UNESCO-listed Tenryu-ji garden designed in the 14th century.',
          category: 'relaxation',
          estimatedCost: '¥500 (Tenryu-ji garden)',
          highlights: ['Soothing rustling sound of bamboo', 'Sogenchi garden pond framed by mountains'],
          tips: 'Step into Okochi Sanso Villa at the grove exit for included matcha tea with fewer crowds.'
        },
        evening: {
          title: 'Togetsukyo Bridge & Kyoto Craft Beer House',
          timeSlot: '05:30 PM - 08:30 PM',
          duration: '3 hours',
          location: 'Arashiyama / Sanjo Dori',
          description: 'Watch the moon rise over the Oi River from the wooden Togetsukyo bridge before heading to Sanjo for Kyoto craft beer flights.',
          category: 'food',
          estimatedCost: '¥3,000 (~$20)',
          highlights: ['Riverside dusk vistas', 'Kyoto Matcha Stout & Yuzu ales'],
          tips: 'Take the retro Keifuku Randen tram line back into central Kyoto.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Shigetsu (inside Tenryu-ji)',
            cuisine: 'Shojin Ryori (Zen Buddhist Vegan)',
            estimatedCost: '$$$',
            description: 'Exquisite multi-course vegan temple food prepared according to Zen philosophy overlooking gardens.',
            location: 'Tenryu-ji grounds, Arashiyama',
            recommendedDishes: ['Yuzu miso grilled eggplant', 'Sesame tofu with fresh wasabi']
          },
          {
            mealType: 'dinner',
            name: 'Chao Chao Gyoza Sanjo',
            cuisine: 'Crispy Pan-Fried Dumplings',
            estimatedCost: '$',
            description: 'Lively, delicious casual tavern serving signature crispy winged gyoza with creative fillings.',
            location: 'Sanjo Kawaramachi, Kyoto',
            recommendedDishes: ['Chao Chao Pork Gyoza', 'Shrimp & Cheese Gyoza', 'Cold Draft Suntory']
          }
        ],
        transportationTips: 'Kyoto City Bus 205 connects northern temples; Randen tram runs between Arashiyama and Shijo-Omiya.',
        insiderTip: 'Monkey Park Iwatayama across the river has a steep 20-min hike but rewards you with wild macaque monkeys and a view over all Kyoto.'
      },
      {
        dayNumber: 6,
        theme: 'Day Excursion to Nara & Friendly Deer',
        neighborhood: 'Nara & Higashiyama',
        morning: {
          title: 'Nara Deer Park & Todai-ji Giant Buddha',
          timeSlot: '08:45 AM - 12:30 PM',
          duration: '3.75 hours',
          location: '406-1 Zoshicho, Nara',
          description: 'Bow to hundreds of gentle free-roaming sika deer who bow back for deer crackers, then enter the colossal wooden hall housing a 15-meter bronze Buddha.',
          category: 'adventure',
          estimatedCost: '¥600 (Todai-ji) + ¥200 (deer shika-senbei)',
          highlights: ['World largest bronze Buddha statue', 'Bowing wild deer in parkland'],
          tips: 'Keep paper maps and train tickets in your pocket as deer love to nibble paper!'
        },
        afternoon: {
          title: 'Kasuga Taisha Lantern Shrine & Naramachi Merchant Quarter',
          timeSlot: '01:30 PM - 04:30 PM',
          duration: '3 hours',
          location: '160 Kasuganocho, Nara',
          description: 'Walk through 3,000 stone and bronze lanterns covered in green moss within an ancient primeval forest, then explore Edo-period sake breweries.',
          category: 'cultural',
          estimatedCost: '¥500',
          highlights: ['Path of 3,000 hanging lanterns', 'Naramachi traditional wooden lattices'],
          tips: 'Sample 5 distinct regional sakes for ¥500 at Harushika Sake Brewery.'
        },
        evening: {
          title: 'Kiyomizu-dera Wooden Stage & Sunset over Kyoto',
          timeSlot: '05:30 PM - 08:30 PM',
          duration: '3 hours',
          location: '1 Chome-294 Kiyomizu, Higashiyama Ward',
          description: 'Perched on wooden pillars without a single nail, offering iconic views over maple valleys and the Kyoto cityscape at twilight.',
          category: 'photo',
          estimatedCost: '¥400',
          highlights: ['Otowa Waterfall (Drink for health, wisdom or love)', 'Massive timber cliffside stage'],
          tips: 'Walk down through Sannenzaka and Ninenzaka preservation stone slopes under lanterns.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Kura (Naramachi)',
            cuisine: 'Miwa Somen & Kaki-no-Ha Sushi',
            estimatedCost: '$$',
            description: 'Nara specialty: mackerel and salmon sushi wrapped in aromatic persimmon leaves.',
            location: 'Naramachi, Nara',
            recommendedDishes: ['Kaki-no-ha persimmon sushi', 'Warm Miwa somen noodles']
          },
          {
            mealType: 'dinner',
            name: 'Gion Duck Noodles',
            cuisine: 'Kyoto Duck Ramen',
            estimatedCost: '$$',
            description: 'Hidden restaurant indicated only by an emoji sign, serving duck breast ramen with sansho pepper foam.',
            location: 'Gion, Kyoto',
            recommendedDishes: ['Duck Tsukemen with Berry Dip', 'Smoked Duck Chashu']
          }
        ],
        transportationTips: 'JR Rapid train from Kyoto Station to Nara takes only 45 minutes.',
        insiderTip: 'Visit Kasuga Taisha’s inner lantern chamber where lanterns are lit in pitch dark for an enchanting mystical experience.'
      },
      {
        dayNumber: 7,
        theme: 'Tea Ceremonies, Souvenirs & Farewell Feast',
        neighborhood: 'Higashiyama & Kyoto Station',
        morning: {
          title: 'Traditional Uji Matcha Tea Ceremony',
          timeSlot: '09:30 AM - 11:30 AM',
          duration: '2 hours',
          location: 'Camellia Tea House, Higashiyama',
          description: 'Learn the meditative Zen art of Chado (The Way of Tea). Whisk organic ceremonial grade matcha and savor handcrafted seasonal wagashi sweets.',
          category: 'cultural',
          estimatedCost: '¥3,500 (~$23)',
          highlights: ['Authentic tatami room etiquette', 'Whisking your own frothy matcha'],
          tips: 'Wear socks as shoes must be removed on tatami mats.'
        },
        afternoon: {
          title: 'Nishiki Food Market 400-Year-Old "Kyoto’s Kitchen"',
          timeSlot: '12:30 PM - 03:30 PM',
          duration: '3 hours',
          location: 'Nakagyo Ward, Kyoto',
          description: 'Five narrow blocks packed with over 100 stalls: dashi tamagoyaki rolled eggs, grilled unagi skewers, baby octopus, and pickled Kyoto daikon.',
          category: 'food',
          estimatedCost: '¥2,500 (tasting grazing)',
          highlights: ['Freshly rolled dashi omelets', 'Kyoto ceremonial matcha soft-serve'],
          tips: 'Eat at the designated benches beside stalls; walking while eating is discouraged on the narrow alley.'
        },
        evening: {
          title: 'Farewell Wagyu Teppanyaki & Sky Garden',
          timeSlot: '05:30 PM - 08:30 PM',
          duration: '3 hours',
          location: 'Kyoto Station Sky Garden & Isetan',
          description: 'Celebrate the journey with sizzling A5 Wagyu beef prepared before your eyes, then gaze out at Kyoto Tower illuminating against the dark hills.',
          category: 'relaxation',
          estimatedCost: '¥8,000 (~$52)',
          highlights: ['Melting A5 Wagyu striploin', 'Kyoto Tower night view'],
          tips: 'Take the soaring grand staircase of Kyoto Station up to the open-air rooftop observation deck.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Nishiki Market Tastings',
            cuisine: 'Street Food & Kyoto Delicacies',
            estimatedCost: '$$',
            description: 'Graze from stall to stall picking up hot delicacies prepared right on the griddle.',
            location: 'Nishiki Market',
            recommendedDishes: ['Miki Keiran Dashi Egg', 'Charcoal Grilled Scallops', 'Matcha Warabi Mochi']
          },
          {
            mealType: 'dinner',
            name: 'Moritaya Teppanyaki',
            cuisine: 'A5 Wagyu & Kyoto Vegetables',
            estimatedCost: '$$$$',
            description: 'Panoramic views of the city serving prized Kyoto beef with garlic chips and wasabi salt.',
            location: '11th Floor JR Kyoto Isetan',
            recommendedDishes: ['A5 Tenderloin Course', 'Garlic Fried Rice with Wagyu crisps']
          }
        ],
        transportationTips: 'Haruka Express train connects Kyoto Station directly to Kansai Airport (KIX) in 75 mins, or Shinkansen back to Tokyo in 2h 15m.',
        insiderTip: 'Pick up "Yatsuhashi" (cinnamon & matcha soft mochi triangles filled with red bean) at Kyoto Station for the quintessential Kyoto souvenir.'
      }
    ],
    packingList: [
      {
        category: 'Essentials & Documents',
        items: [
          { id: 'jp-1', name: 'Passport (valid > 6 months)', checked: true, essential: true, reason: 'Required at check-in & tax-free shopping' },
          { id: 'jp-2', name: 'Visit Japan Web QR code', checked: true, essential: true, reason: 'Speeds up immigration & customs' },
          { id: 'jp-3', name: 'Travel Insurance Documents', checked: false, essential: true },
          { id: 'jp-4', name: 'Digital Suica / Pasmo IC card in Apple/Google Wallet', checked: true, essential: true }
        ]
      },
      {
        category: 'Footwear & Clothing',
        items: [
          { id: 'jp-5', name: 'Slip-on comfortable walking shoes', checked: true, essential: true, reason: 'Easy to remove at temples & 15k+ steps daily' },
          { id: 'jp-6', name: 'Clean, hole-free socks (5-7 pairs)', checked: false, essential: true, reason: 'Visible when taking shoes off in traditional venues' },
          { id: 'jp-7', name: 'Light layerable jacket or cardigan', checked: false },
          { id: 'jp-8', name: 'Compact travel umbrella', checked: false, reason: 'Handy for passing showers' }
        ]
      },
      {
        category: 'Electronics & Connectivity',
        items: [
          { id: 'jp-9', name: '10,000mAh Power Bank', checked: true, essential: true, reason: 'Navigating & Google Translate drains phone battery' },
          { id: 'jp-10', name: 'Japan eSIM or Pocket Wi-Fi reservation', checked: false, essential: true },
          { id: 'jp-11', name: 'Two-prong US Type A plug adapter (no ground pin)', checked: false }
        ]
      },
      {
        category: 'Daily Comfort & Health',
        items: [
          { id: 'jp-12', name: 'Coin pouch / Small wallet for yen coins', checked: false, essential: true, reason: 'Japan still uses coins (¥1 to ¥500) frequently' },
          { id: 'jp-13', name: 'Small hand towel (tenugui)', checked: false, reason: 'Public restrooms rarely have paper towels' },
          { id: 'jp-14', name: 'Personal medications & blister plasters', checked: false }
        ]
      }
    ],
    localEtiquetteAndTips: {
      tippingCustoms: 'No tipping in Japan! Leaving extra money will cause the staff to run down the street to return it to you. Sincere "Arigato gozaimasu" is the highest compliment.',
      transportHighlights: 'Trains run with millisecond precision. Keep your phone on silent ("manner mode") and avoid phone calls on trains.',
      culturalDoAndDonts: [
        'Do: Bow slightly when receiving items with both hands (change, business cards, tea).',
        'Do: Slurp your ramen noodles loudly; it aerates the broth and shows appreciation to the chef.',
        'Don\'t: Stick chopsticks vertically in a bowl of rice (associated with Buddhist funeral rituals).',
        'Don\'t: Walk and eat on crowded streets; enjoy food in front of the shop or at seating areas.',
        'Don\'t: Talk loudly on public transit or blow your nose loudly in public.'
      ],
      emergencyNumbers: [
        { name: 'Police', number: '110' },
        { name: 'Ambulance / Fire Department', number: '119' },
        { name: 'Japan Helpline (24/7 English support)', number: '0570-000-911' }
      ],
      usefulPhrases: [
        { phrase: 'Arigatou Gozaimasu', translation: 'Thank you very much', pronunciation: 'ah-ree-GAH-toh goh-zahy-MAHS' },
        { phrase: 'Sumimasen', translation: 'Excuse me / Sorry', pronunciation: 'soo-mee-mah-SEN' },
        { phrase: 'Kore o kudasai', translation: 'This one, please', pronunciation: 'KOH-reh oh koo-dah-SAI' },
        { phrase: 'O-kaikei onegaishimasu', translation: 'The bill, please', pronunciation: 'oh-KAI-kay oh-neh-gah-ee-shee-MAHS' },
        { phrase: 'Oishii desu!', translation: 'It is delicious!', pronunciation: 'oy-SHEE dess' }
      ]
    },
    createdAt: 1714000000000
  },
  {
    id: 'paris-5d',
    title: '5 Days in Paris: Masterpieces, Hidden Cafés & Seine Romance',
    destination: 'Paris, France',
    tagline: 'Gilded palace halls, fragrant boulangeries, vintage bookstores, and twilight river cruises',
    summary: 'Immerse yourself in the City of Light. Marvel at the Louvre and Musée d’Orsay, sip velvety café au lait in Saint-Germain-des-Prés, and watch the Eiffel Tower sparkle under the Parisian stars.',
    durationDays: 5,
    travelGroup: 'couple',
    budgetLevel: 'moderate',
    pace: 'balanced',
    bestTimeToVisit: 'April–May or September–October',
    weatherForecast: {
      summary: 'Mild, pleasantly warm afternoons with cooler romantic evenings.',
      tempRange: '13°C - 21°C (55°F - 70°F)',
      clothingAdvice: 'Smart casual layers, trench coat, stylish comfortable walking boots or sneakers.'
    },
    currency: {
      code: 'EUR',
      symbol: '€',
      rateDescription: '1 USD ≈ 0.92 EUR. Contactless cards widely accepted everywhere including bakeries.'
    },
    estimatedBudget: {
      totalMinUSD: 1450,
      totalMaxUSD: 2100,
      categories: [
        { category: 'Boutique Hotel', amountUSD: 750, percentage: 45, note: 'Charming 3-star hotel in Le Marais or Latin Quarter' },
        { category: 'Bistros & Wine', amountUSD: 450, percentage: 27, note: 'Wine bars, fresh baguettes, pastries & classic bistros' },
        { category: 'Museums & Cruises', amountUSD: 180, percentage: 11, note: 'Louvre, Orsay, Sainte-Chapelle & Vedettes du Pont Neuf' },
        { category: 'Metro & Taxis', amountUSD: 70, percentage: 5, note: 'Navigo Easy card and occasional late G7 taxi' },
        { category: 'Perfumes & Shopping', amountUSD: 200, percentage: 12, note: 'Macarons, vintage books, French beauty products' }
      ]
    },
    days: [
      {
        dayNumber: 1,
        theme: 'The Historic Heart: Île de la Cité & Saint-Germain',
        neighborhood: '1st & 6th Arrondissements',
        morning: {
          title: 'Sainte-Chapelle Stained Glass & Notre-Dame Forecourt',
          timeSlot: '09:30 AM - 12:00 PM',
          duration: '2.5 hours',
          location: '10 Boulevard du Palais, 75001 Paris',
          description: 'Step into a jewel box of 1,113 13th-century stained-glass panels soaring toward vaulted gothic ceilings, followed by a view of the restored Notre-Dame Cathedral.',
          category: 'cultural',
          estimatedCost: '€13 (~$14)',
          highlights: ['Spectacular 15-meter stained glass windows', 'Historic Conciergerie exterior'],
          tips: 'Pre-book the 09:30 AM timed ticket slot online to bypass the general queue.'
        },
        afternoon: {
          title: 'Shakespeare and Company & Jardin du Luxembourg',
          timeSlot: '01:30 PM - 05:00 PM',
          duration: '3.5 hours',
          location: '37 Rue de la Bûcherie & Luxembourg Gardens',
          description: 'Browse bohemian wooden bookshelves where Hemingway and Joyce once gathered, then sit by the Medici Fountain in the manicured Luxembourg Gardens.',
          category: 'relaxation',
          estimatedCost: 'Free',
          highlights: ['Historic bookstore lending library', 'Sailboats in the grand Luxembourg basin'],
          tips: 'Grab warm macarons from Pierre Hermé nearby before relaxing on the iconic green park chairs.'
        },
        evening: {
          title: 'Sunset Vedettes du Pont Neuf Cruise on the Seine',
          timeSlot: '07:00 PM - 09:30 PM',
          duration: '2.5 hours',
          location: 'Square du Vert-Galant, Pont Neuf',
          description: 'Glide underneath ancient stone bridges as monuments light up in golden amber and the Eiffel Tower sparkles on the hour.',
          category: 'sightseeing',
          estimatedCost: '€15 (~$16)',
          highlights: ['Illuminated Louvre and Musée d\'Orsay', 'Golden hour reflections on the Seine'],
          tips: 'Pick an open-air upper deck seat on the left side of the boat departing Pont Neuf.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Café de Flore',
            cuisine: 'Classic French Brasserie',
            estimatedCost: '$$$',
            description: 'Legendary literary café frequented by Sartre and Simone de Beauvoir. Perfect for people-watching.',
            location: 'Boulevard Saint-Germain',
            recommendedDishes: ['Croque Monsieur Special', 'Chocolat Chaud à l\'ancienne']
          },
          {
            mealType: 'dinner',
            name: 'Bistrot Paul Bert',
            cuisine: 'Traditional French Bistro',
            estimatedCost: '$$$',
            description: 'Celebrated authentic bistro renowned for sublime steak au poivre and floating island dessert.',
            location: '11th Arrondissement',
            recommendedDishes: ['Filet de bœuf au poivre', 'Grand soufflé au Grand Marnier']
          }
        ],
        transportationTips: 'Purchase a Navigo Easy card at any Metro ticket window and load 10 single t+ tickets (€17.35).',
        insiderTip: 'Cross Pont des Arts just before twilight to hear street jazz musicians playing acoustic accordions.'
      },
      {
        dayNumber: 2,
        theme: 'Louvre Treasures & Tuileries Elegance',
        neighborhood: '1st & 8th Arrondissements',
        morning: {
          title: 'Musée du Louvre Masterpieces',
          timeSlot: '09:00 AM - 01:00 PM',
          duration: '4 hours',
          location: 'Rue de Rivoli, 75001 Paris',
          description: 'Traverse the former royal palace to see the Winged Victory of Samothrace, Venus de Milo, and the Italian Renaissance galleries.',
          category: 'cultural',
          estimatedCost: '€22 (~$24)',
          highlights: ['I.M. Pei glass pyramid', 'Winged Victory staircase', 'Napoleon III Apartments'],
          tips: 'Enter through the Carrousel du Louvre underground mall entrance (99 Rue de Rivoli) for shorter lines.'
        },
        afternoon: {
          title: 'Jardin des Tuileries & Musée de l’Orangerie',
          timeSlot: '02:00 PM - 05:00 PM',
          duration: '3 hours',
          location: 'Jardin des Tuileries',
          description: 'Sit in the curved oval rooms of l’Orangerie surrounded by Monet’s colossal Water Lilies (Nymphéas) panoramic canvases.',
          category: 'cultural',
          estimatedCost: '€12.50 (~$13)',
          highlights: ['Monet\'s Water Lilies 360-degree rooms', 'Sculptures by Rodin and Giacometti'],
          tips: 'Timed reservation is mandatory for l’Orangerie.'
        },
        evening: {
          title: 'Place de la Concorde & Champs-Élysées Twilight Stroll',
          timeSlot: '06:30 PM - 09:30 PM',
          duration: '3 hours',
          location: 'Place de la Concorde to Arc de Triomphe',
          description: 'Walk past grand chestnut trees up the avenue to the Arc de Triomphe, climbing to the rooftop terrace for the twelve radiant avenues view.',
          category: 'sightseeing',
          estimatedCost: '€16 (Arc de Triomphe rooftop)',
          highlights: ['Twelve radiantly lit grand boulevards', 'Tomb of the Unknown Soldier eternal flame'],
          tips: 'Visit the Arc de Triomphe rooftop 10 minutes before the top of the hour to catch the Eiffel Tower sparkling.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Angelina Paris',
            cuisine: 'French Salon de Thé',
            estimatedCost: '$$$',
            description: 'Belle Époque tea room famous since 1903 for decadent hot chocolate and Mont-Blanc pastry.',
            location: '226 Rue de Rivoli',
            recommendedDishes: ['L\'Africain Hot Chocolate', 'Mont-Blanc chestnut pastry']
          },
          {
            mealType: 'dinner',
            name: 'Bouillon Chartier',
            cuisine: 'Historic Belle Époque Dining',
            estimatedCost: '$',
            description: 'Operated in a grand classified historic dining hall since 1896, where waiters write your order on paper tablecloths.',
            location: 'Rue du Faubourg Montmartre',
            recommendedDishes: ['Escargots de Bourgogne (half dozen)', 'Confit de canard with roasted potatoes']
          }
        ],
        transportationTips: 'Metro Line 1 cuts directly across Paris from Louvre to Concorde and Champs-Élysées.',
        insiderTip: 'Palais Royal courtyard with Daniel Buren’s black-and-white striped columns is directly across from the Louvre and far less crowded.'
      },
      {
        dayNumber: 3,
        theme: 'Bohemian Montmartre & Sacré-Cœur Panorama',
        neighborhood: '18th Arrondissement',
        morning: {
          title: 'Sacré-Cœur Basilica & Village of Montmartre',
          timeSlot: '09:00 AM - 12:30 PM',
          duration: '3.5 hours',
          location: '35 Rue du Chevalier de la Barre, 75018 Paris',
          description: 'Climb the travertine marble steps to Paris’s highest summit, exploring cobbled alleys where Picasso and Renoir had studios.',
          category: 'photo',
          estimatedCost: 'Free (Dome climb €8)',
          highlights: ['Panoramic view of all Paris', 'Vineyard of Clos Montmartre', 'Place du Tertre artists'],
          tips: 'Skip the funicular line and take the quiet staircases via Square Suzanne Buisson.'
        },
        afternoon: {
          title: 'Hidden Passages: Passage des Panoramas & Galerie Vivienne',
          timeSlot: '02:00 PM - 05:00 PM',
          duration: '3 hours',
          location: '2nd Arrondissement',
          description: 'Step into 19th-century glass-roofed arcades lined with antique print dealers, rare stamp shops, cozy tea salons, and mosaic tile floors.',
          category: 'cultural',
          estimatedCost: 'Free',
          highlights: ['Glass-domed ceilings', 'Historic boutique bookshops and bistros'],
          tips: 'Galerie Vivienne is home to Jean-Paul Gaultier’s first boutique and wonderful wine cellar Legrand Filles et Fils.'
        },
        evening: {
          title: 'Moulin Rouge Exterior & Rooftop Drinks at Terrass" Hotel',
          timeSlot: '06:30 PM - 09:30 PM',
          duration: '3 hours',
          location: '12-14 Rue Joseph de Maistre, 75018 Paris',
          description: 'Snap the neon red windmill of the Moulin Rouge before heading up to Terrass" Hotel rooftop for cocktails looking out at the Eiffel Tower.',
          category: 'relaxation',
          estimatedCost: '€18 per cocktail',
          highlights: ['Rooftop sunset view over Paris rooftops', 'Neon Moulin Rouge facade'],
          tips: 'Rooftop bar opens at 3:30 PM; arrive around 6:00 PM to secure an outdoor lounge couch.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Le Consulat Montmartre',
            cuisine: 'Traditional Bistro & Onion Soup',
            estimatedCost: '$$',
            description: 'Historic picture-postcard café situated at the fork in the cobbled street where Monet and Van Gogh dined.',
            location: 'Rue Norvins, Montmartre',
            recommendedDishes: ['French Onion Soup gratinée', 'Quiche Lorraine with green salad']
          },
          {
            mealType: 'dinner',
            name: 'Chez Janou',
            cuisine: 'Provençal Cuisine & Chocolate Mousse',
            estimatedCost: '$$',
            description: 'Lively bistro filled with vintage pastis posters serving rich South of France flavors.',
            location: 'Near Place des Vosges',
            recommendedDishes: ['Canard aux figues (Duck with figs)', 'Unlimited Chocolate Mousse bowl']
          }
        ],
        transportationTips: 'Metro Line 12 to Abbesses station (deepest station in Paris with exquisite art nouveau entrance).',
        insiderTip: 'Visit the "Wall of Love" (Le Mur des Je t\'aime) right at the Abbesses metro garden to see "I love you" written in 250 languages.'
      },
      {
        dayNumber: 4,
        theme: 'Impressionist Magic & Eiffel Tower Magic',
        neighborhood: '7th Arrondissement',
        morning: {
          title: 'Musée d’Orsay Inside the Beaux-Arts Railway Station',
          timeSlot: '09:30 AM - 01:00 PM',
          duration: '3.5 hours',
          location: '1 Rue de la Légion d\'Honneur, 75007 Paris',
          description: 'Housed in a 1900 Beaux-Arts railway station, home to the greatest collection of Impressionist and Post-Impressionist masterworks by Van Gogh, Degas, Renoir, and Manet.',
          category: 'cultural',
          estimatedCost: '€16 (~$17)',
          highlights: ['Van Gogh\'s Starry Night over the Rhône', 'Giant station clock face viewpoint looking at Montmartre'],
          tips: 'Head straight to the 5th floor Impressionist gallery first before crowds assemble.'
        },
        afternoon: {
          title: 'Rue Cler Market Street & Champ de Mars',
          timeSlot: '02:00 PM - 05:00 PM',
          duration: '3 hours',
          location: 'Rue Cler, 75007 Paris',
          description: 'Cobblestone pedestrian market street filled with fromageries, charcuteries, and flower displays. Assemble a Parisian picnic for Champ de Mars lawn.',
          category: 'food',
          estimatedCost: '€25 (picnic supplies)',
          highlights: ['Artisan cheese tasting', 'Freshly baked baguette from award-winning bakeries'],
          tips: 'Buy Comté cheese aged 24 months and fresh raspberries for your picnic.'
        },
        evening: {
          title: 'Eiffel Tower Ascent & Twilight Illumination',
          timeSlot: '06:30 PM - 10:00 PM',
          duration: '3.5 hours',
          location: 'Champ de Mars, 5 Avenue Anatole France',
          description: 'Ascend Gustave Eiffel’s iron masterpiece to the second floor or summit for sweeping views as the city lights stretch to the horizon.',
          category: 'sightseeing',
          estimatedCost: '€29.40 (Summit elevator)',
          highlights: ['City of Light skyline panorama', 'Sparkling light show every hour on the hour'],
          tips: 'Book summit tickets exactly 60 days ahead online, or climb stairs to the 2nd floor for half the price and no wait.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'Picnic on Champ de Mars',
            cuisine: 'Gourmet French Picnic',
            estimatedCost: '$$',
            description: 'Fresh warm baguette from Boulangerie Nelly Julien, Comté from Fromagerie Cler, cured saucisson and sparkling cider.',
            location: 'Champ de Mars lawn',
            recommendedDishes: ['Freshly baked Baguette de Tradition', 'Aged Comté & Truffle Brie', 'Cured duck saucisson']
          },
          {
            mealType: 'dinner',
            name: 'Les Ombres (Quai Branly)',
            cuisine: 'Contemporary French Haute Cuisine',
            estimatedCost: '$$$$',
            description: 'Rooftop glass terrace with directly unobstructed, jaw-dropping views of the illuminated Eiffel Tower.',
            location: 'Musée du Quai Branly rooftop',
            recommendedDishes: ['Roasted rack of Pyrenean lamb', 'Chocolate Eiffel crisp with gold leaf']
          }
        ],
        transportationTips: 'RER C train connects Musée d\'Orsay along the Seine directly to Champ de Mars - Tour Eiffel.',
        insiderTip: 'Cross Pont d\'Iéna to the Trocadéro fountains at night for the most iconic Eiffel Tower photo frame without foreground obstructions.'
      },
      {
        dayNumber: 5,
        theme: 'Le Marais Aristocratic Mansions & Place des Vosges',
        neighborhood: '3rd & 4th Arrondissements',
        morning: {
          title: 'Place des Vosges & Maison de Victor Hugo',
          timeSlot: '09:30 AM - 12:00 PM',
          duration: '2.5 hours',
          location: 'Place des Vosges, 75004 Paris',
          description: 'Paris’s oldest planned square, surrounded by symmetrical red brick and limestone arcades where Victor Hugo penned Les Misérables.',
          category: 'relaxation',
          estimatedCost: 'Free (Victor Hugo apartment free permanent collection)',
          highlights: ['Symmetrical Renaissance arcades', 'Fountain lawns surrounded by 17th-century mansions'],
          tips: 'Sit under the vaulted brick arcades on a rainy morning or sunny bench.'
        },
        afternoon: {
          title: 'Rue des Rosiers, Vintage Boutiques & Musée Picasso',
          timeSlot: '01:30 PM - 05:00 PM',
          duration: '3.5 hours',
          location: 'Rue des Rosiers & Hôtel Salé',
          description: 'Stroll the Jewish Quarter with hot falafel pitas, browse independent fragrance boutiques, and marvel at Picasso’s personal collection inside the 1650s Hôtel Salé.',
          category: 'shopping',
          estimatedCost: '€14 (Musée Picasso)',
          highlights: ['Historic Jewish Quarter bakeries', 'Picasso masterpieces across 3 floors'],
          tips: 'L\'As du Fallafel line moves remarkably fast (order the Special Falafel Pita with roasted aubergines).'
        },
        evening: {
          title: 'Canal Saint-Martin Wine Bars & Footbridges',
          timeSlot: '06:00 PM - 09:30 PM',
          duration: '3.5 hours',
          location: 'Quai de Valmy & Quai de Jemmapes, 10th Arrondissement',
          description: 'Join Parisian locals dangling their legs over the canal locks under cast-iron footbridges, sipping natural wine and nibbling charcuterie boards.',
          category: 'relaxation',
          estimatedCost: '€25 (~$27)',
          highlights: ['Arched iron Venetian-style footbridges', 'Vibrant natural wine bar scene'],
          tips: 'Bring a bottle of wine and plastic cups to sit along the stone canal quay like a local.'
        },
        meals: [
          {
            mealType: 'lunch',
            name: 'L\'As du Fallafel',
            cuisine: 'Middle Eastern Falafel & Shawarma',
            estimatedCost: '$',
            description: 'World-famous pita stuffed with crunchy spiced chickpea falafel, fried aubergine, crunchy cabbage, and creamy tahini.',
            location: '34 Rue des Rosiers',
            recommendedDishes: ['Falafel Spécial Pita', 'Homemade Lemonade with Mint']
          },
          {
            mealType: 'dinner',
            name: 'Le Verre Volé',
            cuisine: 'Natural Wine & Seasonal Bistro',
            estimatedCost: '$$$',
            description: 'Pioneering natural wine bistro along Canal Saint-Martin with chalked daily specials on the blackboard.',
            location: '67 Rue de Lancry',
            recommendedDishes: ['Pan-seared scallops with Jerusalem artichoke puree', 'Artisanal cheese board']
          }
        ],
        transportationTips: 'Le Marais is most pleasantly discovered on foot. Metro Line 8 connects Saint-Sébastien - Froissart.',
        insiderTip: 'Visit the courtyard of Hôtel de Sully to discover the secret garden gateway directly linking to Place des Vosges.'
      }
    ],
    packingList: [
      {
        category: 'Essentials & Documents',
        items: [
          { id: 'fr-1', name: 'Passport & Copies', checked: true, essential: true },
          { id: 'fr-2', name: 'Navigo Easy card or Transit app', checked: false, essential: true },
          { id: 'fr-3', name: 'Pre-booked Museum Pass / Timed QR Tickets', checked: true, essential: true, reason: 'Louvre & Orsay require timed reservation' }
        ]
      },
      {
        category: 'Chic Parisian Wardrobe',
        items: [
          { id: 'fr-4', name: 'Classic Trench Coat or stylish wool overcoat', checked: false, essential: true },
          { id: 'fr-5', name: 'Comfortable broken-in leather walking sneakers', checked: true, essential: true, reason: 'Cobblestone streets require sturdy soles' },
          { id: 'fr-6', name: 'Neutral color capsules (navy, black, beige, cream)', checked: false },
          { id: 'fr-7', name: 'Silk scarf or lightweight wool scarf', checked: false }
        ]
      },
      {
        category: 'Electronics & Gear',
        items: [
          { id: 'fr-8', name: 'Type C / E European round two-pin plug adapter', checked: true, essential: true },
          { id: 'fr-9', name: 'High-speed Portable Power Bank', checked: false, essential: true },
          { id: 'fr-10', name: 'Tote bag for market grazing & pastries', checked: false }
        ]
      }
    ],
    localEtiquetteAndTips: {
      tippingCustoms: 'Service is included by law ("Service Compris" 15%). Leaving €1 to €3 on a café table or 5% in nice restaurants for exceptional care is a polite gesture, but large tips are not expected.',
      transportHighlights: 'The Paris Metro has 16 lines and 300+ stations. Hold onto your metro ticket until you exit the station; random ticket inspections by RATP officers carry €50 on-the-spot fines.',
      culturalDoAndDonts: [
        'Do: Always say "Bonjour, Madame/Monsieur" immediately upon entering ANY shop, bakery or restaurant before speaking. It is the golden rule of French etiquette.',
        'Do: Keep your voice modulated at a conversational tone in restaurants and transit.',
        'Don\'t: Demand tap water aggressively; politely ask for "une carafe d\'eau, s\'il vous plaît" (it is complimentary by French law).',
        'Don\'t: Touch produce at outdoor markets without asking; the vendor will happily pick the best fruit for you.'
      ],
      emergencyNumbers: [
        { name: 'European Emergency (General)', number: '112' },
        { name: 'SAMU (Ambulance / Medical)', number: '15' },
        { name: 'Police Secours', number: '17' }
      ],
      usefulPhrases: [
        { phrase: 'Bonjour', translation: 'Hello / Good morning', pronunciation: 'bohn-ZHOOR' },
        { phrase: 'S\'il vous plaît', translation: 'Please', pronunciation: 'seel voo PLEH' },
        { phrase: 'Merci beaucoup', translation: 'Thank you very much', pronunciation: 'mehr-SEE boh-KOO' },
        { phrase: 'L\'addition, s\'il vous plaît', translation: 'The check, please', pronunciation: 'lah-dee-SYOHN seel voo PLEH' },
        { phrase: 'Parlez-vous anglais?', translation: 'Do you speak English?', pronunciation: 'par-lay voo ahn-GLEH' }
      ]
    },
    createdAt: 1714100000000
  }
];
