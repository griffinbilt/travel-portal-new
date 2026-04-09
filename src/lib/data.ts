// ─── Guest Profile ───

export type BiltTier = "X" | "Platinum" | "Gold" | "Silver" | "Blue";

export interface BehaviorTag {
  emoji: string;
  label: string;
}

export interface TravelInsight {
  category: string;
  detail: string;
}

export interface GuestProfile {
  originCity: string;
  originState: string;
  biltTier: BiltTier;
  memberSince: string;
  lifetimeSpend: number;
  totalStays: number;
  avgNightlyRate: number;
  pointsBalance: number;
  diningPreference: string;
  roomPreference: string;
  occasion?: string;
  travelCompanions?: number;
  pastProperties: string[];
  tags: string[];
  birthday?: string;
  languages: string[];
  behaviorTags: BehaviorTag[];
  hotelPreferences: string[];
  travelInsights: TravelInsight[];
}

export interface RestaurantCredit {
  amount: number;
  applied: boolean;
}

export interface BiltReservation {
  id: number;
  guest: string;
  email: string;
  phone: string;
  profile: GuestProfile;
  source: string;
  rate: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  status: "Confirmed" | "Checked-in" | "Pending" | "Arriving today" | "Departing today";
  roomNo: string;
  roomType: string;
  total: string;
  commission: string;
  vip?: boolean;
  credit?: RestaurantCredit;
  specialRequests?: string;
  confirmationNo: string;
}

// ─── Reservations ───

export const reservations: BiltReservation[] = [
  {
    id: 1, guest: "Lauren Henderson", email: "lauren.h@gmail.com", phone: "+1 (305) 555-0134",
    profile: {
      originCity: "Miami", originState: "FL", biltTier: "X", memberSince: "Jan 2023",
      lifetimeSpend: 142800, totalStays: 26, avgNightlyRate: 745, pointsBalance: 284600,
      diningPreference: "Mediterranean, Private dining", roomPreference: "Ocean view, High floor, King bed",
      occasion: "Birthday", travelCompanions: 1, pastProperties: ["Four Seasons Maui", "Aman Tokyo", "JW Marriott NYC"],
      tags: ["VIP", "Repeat guest", "Birthday"],
      birthday: "April 6th", languages: ["English", "Spanish"],
      behaviorTags: [
        { emoji: "🧳", label: "Early planner" }, { emoji: "🎭", label: "Culture seeker" },
        { emoji: "⭐", label: "Quality focused" }, { emoji: "💬", label: "Responsive" },
      ],
      hotelPreferences: [
        "Boutique hotels (80%+ of bookings)",
        "Significant engagement with Accor (100k pt transfer) and luxury brands like JW Marriott and Hyatt",
        "Notable stays at JW Marriott NYC and Hyatt Miami",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Extensive point transfers across United, Virgin Atlantic, Qatar Airways, Emirates, Japan Airlines, and Air France/KLM. Active across Star Alliance, oneworld, SkyTeam, and independents." },
        { category: "CRUISES", detail: "Multiple transactions with Virgin Cruises totaling ~$781." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT-X", checkIn: "May 8", checkOut: "May 15", nights: 7,
    status: "Pending", roomNo: "1201", roomType: "Ocean View Suite", total: "$1,786.41",
    commission: "$178.64", vip: true, credit: { amount: 100, applied: false },
    specialRequests: "Birthday during stay (April 6th). Champagne and cake requested.", confirmationNo: "1608882O1",
  },
  {
    id: 2, guest: "Alexander Smith", email: "alex.smith@outlook.com", phone: "+1 (212) 555-0198",
    profile: {
      originCity: "New York", originState: "NY", biltTier: "Platinum", memberSince: "Mar 2022",
      lifetimeSpend: 234100, totalStays: 41, avgNightlyRate: 920, pointsBalance: 412000,
      diningPreference: "Omakase, Chef's table", roomPreference: "Penthouse, Butler service",
      travelCompanions: 1, pastProperties: ["Mandarin Oriental Barcelona", "The Brando", "Amangiri"],
      tags: ["VIP", "Repeat guest", "Private dining"],
      birthday: "September 12th", languages: ["English"],
      behaviorTags: [
        { emoji: "🍷", label: "Wine enthusiast" }, { emoji: "⭐", label: "Quality focused" },
        { emoji: "🍽", label: "Foodie" },
      ],
      hotelPreferences: [
        "Ultra-luxury properties exclusively",
        "Prefers suites with separate living areas",
        "Consistent Aman and Mandarin Oriental guest",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Delta One and Emirates First Class. 1.2M lifetime miles across programs." },
        { category: "HOTEL LOYALTY", detail: "Aman Junkies member. Previously Hyatt Globalist." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 1", checkOut: "May 10", nights: 9,
    status: "Pending", roomNo: "2351", roomType: "Presidential Suite", total: "$5,432.78",
    commission: "$543.28", vip: true, credit: { amount: 200, applied: false },
    confirmationNo: "5683475543",
  },
  {
    id: 3, guest: "Brian Johnson", email: "brian.j@icloud.com", phone: "+1 (213) 555-0167",
    profile: {
      originCity: "Los Angeles", originState: "CA", biltTier: "Gold", memberSince: "Jun 2023",
      lifetimeSpend: 89200, totalStays: 18, avgNightlyRate: 780, pointsBalance: 156300,
      diningPreference: "Japanese, Sushi bar", roomPreference: "Pool access, Late checkout",
      travelCompanions: 2, pastProperties: ["1 Hotel South Beach", "Nobu Malibu", "Faena Miami Beach"],
      tags: ["VIP", "Group travel", "Foodie"],
      birthday: "July 22nd", languages: ["English"],
      behaviorTags: [
        { emoji: "🍽", label: "Foodie" }, { emoji: "🏄", label: "Adventure seeker" },
        { emoji: "👥", label: "Group organizer" },
      ],
      hotelPreferences: [
        "Beach and resort properties preferred",
        "Books group trips 3-4x per year",
        "High on-property F&B spend ($400+/night avg)",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "American Airlines Executive Platinum. Frequent LAX-MIA and LAX-CUN routes." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 3", checkOut: "May 12", nights: 9,
    status: "Confirmed", roomNo: "1005", roomType: "Beachfront Suite", total: "$12,345.67",
    commission: "$1,234.57", vip: true, credit: { amount: 150, applied: false },
    confirmationNo: "5473368332",
  },
  {
    id: 4, guest: "Catherine Williams", email: "cat.williams@proton.me", phone: "+1 (415) 555-0145",
    profile: {
      originCity: "San Francisco", originState: "CA", biltTier: "X", memberSince: "Sep 2021",
      lifetimeSpend: 298500, totalStays: 52, avgNightlyRate: 1100, pointsBalance: 520000,
      diningPreference: "Farm-to-table, Natural wine", roomPreference: "Corner suite, Fireplace",
      travelCompanions: 1, pastProperties: ["Aman New York", "One&Only Reethi Rah", "Soneva Fushi"],
      tags: ["VIP", "Repeat guest", "BLADE user"],
      languages: ["English", "French"],
      behaviorTags: [
        { emoji: "🧳", label: "Early planner" }, { emoji: "🌿", label: "Wellness oriented" },
        { emoji: "⭐", label: "Quality focused" }, { emoji: "💬", label: "Responsive" },
      ],
      hotelPreferences: [
        "Books 6+ months in advance consistently",
        "Sustainability-focused properties preferred",
        "BLADE helicopter transfers on 90% of resort stays",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "United Polaris and Singapore Airlines Suites. 800k+ points across programs." },
        { category: "LIFESTYLE", detail: "SoulCycle 4x/week member. Equinox. Regular Sweetgreen orders via Bilt." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT-X", checkIn: "May 5", checkOut: "May 15", nights: 10,
    status: "Confirmed", roomNo: "2307", roomType: "Grand Suite", total: "$3,890.12",
    commission: "$389.01", vip: true, credit: { amount: 250, applied: false },
    specialRequests: "BLADE arrival arranged. SoulCycle class on property. Vegan menu options.", confirmationNo: "1224674578",
  },
  {
    id: 5, guest: "David Brown", email: "david.brown@gmail.com", phone: "+1 (312) 555-0189",
    profile: {
      originCity: "Chicago", originState: "IL", biltTier: "Blue", memberSince: "Jan 2025",
      lifetimeSpend: 4200, totalStays: 2, avgNightlyRate: 540, pointsBalance: 6300,
      diningPreference: "Steakhouse, Casual", roomPreference: "Standard, No preference",
      travelCompanions: 1, pastProperties: [],
      tags: ["First time guest", "BILT member"],
      languages: ["English"],
      behaviorTags: [
        { emoji: "🆕", label: "New member" },
      ],
      hotelPreferences: [
        "First Bilt booking — no historical data",
      ],
      travelInsights: [],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 2", checkOut: "May 5", nights: 3,
    status: "Checked-in", roomNo: "404", roomType: "Resort Room", total: "$9,876.54",
    commission: "$987.65", confirmationNo: "4536468456",
  },
  {
    id: 6, guest: "Elena Jones", email: "elena.j@yahoo.com", phone: "+1 (713) 555-0123",
    profile: {
      originCity: "Houston", originState: "TX", biltTier: "Silver", memberSince: "May 2024",
      lifetimeSpend: 19400, totalStays: 5, avgNightlyRate: 640, pointsBalance: 29100,
      diningPreference: "Mediterranean, Grilled meats", roomPreference: "Quiet, Away from elevator",
      travelCompanions: 3, pastProperties: ["Hotel Granduca Houston"],
      tags: ["Family", "BILT member", "Halal"],
      birthday: "November 3rd", languages: ["English", "Arabic"],
      behaviorTags: [
        { emoji: "👨‍👩‍👧‍👦", label: "Family traveler" }, { emoji: "🥗", label: "Dietary needs" },
      ],
      hotelPreferences: [
        "Family-friendly properties with kids programs",
        "Requests connecting rooms consistently",
      ],
      travelInsights: [
        { category: "FAMILY TRAVEL", detail: "2 children (ages 4, 7). Books during school breaks." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 4", checkOut: "May 20", nights: 16,
    status: "Pending", roomNo: "1201", roomType: "Family Suite", total: "$1,999.99",
    commission: "$200.00", confirmationNo: "8546434Z5",
  },
  {
    id: 7, guest: "Francisco Garcia", email: "fgarcia@outlook.com", phone: "+52 (55) 555-0176",
    profile: {
      originCity: "Mexico City", originState: "MX", biltTier: "X", memberSince: "Feb 2022",
      lifetimeSpend: 178900, totalStays: 31, avgNightlyRate: 920, pointsBalance: 267000,
      diningPreference: "Mexican fine dining, Mezcal", roomPreference: "Suite, Ocean view, Balcony",
      travelCompanions: 1, pastProperties: ["Chablé Yucatán", "Rosewood San Miguel", "One&Only Palmilla"],
      tags: ["VIP", "Repeat guest", "Honeymoon"],
      birthday: "March 15th", languages: ["Spanish", "English", "Portuguese"],
      behaviorTags: [
        { emoji: "🍷", label: "Wine enthusiast" }, { emoji: "🎭", label: "Culture seeker" },
        { emoji: "⭐", label: "Quality focused" },
      ],
      hotelPreferences: [
        "Strong preference for Latin American luxury properties",
        "Michelin/fine dining a key booking factor",
        "Returns to properties where staff remembers him",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Aeromexico Premier Platinum. Frequent MEX-LAX, MEX-JFK." },
        { category: "HOTEL LOYALTY", detail: "Rosewood Elite. Previous Four Seasons Preferred Partner." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 6", checkOut: "May 14", nights: 8,
    status: "Checked-in", roomNo: "809", roomType: "Oceanfront Suite", total: "$14,321.00",
    commission: "$1,432.10", vip: true, credit: { amount: 200, applied: true },
    confirmationNo: "1235645B8",
  },
  {
    id: 8, guest: "Grace Martinez", email: "grace.m@gmail.com", phone: "+1 (303) 555-0154",
    profile: {
      originCity: "Denver", originState: "CO", biltTier: "Blue", memberSince: "Dec 2024",
      lifetimeSpend: 6800, totalStays: 3, avgNightlyRate: 520, pointsBalance: 10200,
      diningPreference: "Vegan, Smoothie bar", roomPreference: "Near gym, Ground floor",
      travelCompanions: 0, pastProperties: ["The Crawford Denver"],
      tags: ["BILT member", "Fitness", "Solo traveler"],
      languages: ["English"],
      behaviorTags: [
        { emoji: "🏋️", label: "Fitness focused" }, { emoji: "🌿", label: "Wellness oriented" },
      ],
      hotelPreferences: [
        "Prioritizes fitness facilities in hotel selection",
        "Early riser — requests early breakfast access",
      ],
      travelInsights: [
        { category: "LIFESTYLE", detail: "Active SoulCycle and Equinox member. Marathon runner." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 7", checkOut: "May 19", nights: 12,
    status: "Checked-in", roomNo: "1201", roomType: "Fitness King", total: "$7,654.32",
    commission: "$765.43", confirmationNo: "6547365A2",
  },
  {
    id: 9, guest: "Hugo Rodriguez", email: "hugo.r@proton.me", phone: "+55 (11) 555-0198",
    profile: {
      originCity: "São Paulo", originState: "BR", biltTier: "Platinum", memberSince: "Apr 2022",
      lifetimeSpend: 156800, totalStays: 28, avgNightlyRate: 870, pointsBalance: 245200,
      diningPreference: "Brazilian steakhouse, Wine pairing", roomPreference: "Balcony, Sea view, King bed",
      travelCompanions: 1, pastProperties: ["The Peninsula Paris", "Belmond Cap Juluca", "Copacabana Palace"],
      tags: ["VIP", "Repeat guest", "Wine enthusiast"],
      birthday: "August 19th", languages: ["Portuguese", "English", "Spanish"],
      behaviorTags: [
        { emoji: "🍷", label: "Wine enthusiast" }, { emoji: "🧳", label: "Early planner" },
        { emoji: "💬", label: "Responsive" },
      ],
      hotelPreferences: [
        "Palace-style and heritage hotels preferred",
        "Wine cellar/sommelier access is a booking driver",
        "Books anniversary trips annually — loyal repeater",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "LATAM Black tier. Frequent GRU-MIA, GRU-JFK, GRU-CDG routes." },
        { category: "HOTEL LOYALTY", detail: "Belmond Bellini Club. Rosewood Elite." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 8", checkOut: "May 13", nights: 5,
    status: "Checked-in", roomNo: "1132", roomType: "Oceanfront Suite", total: "$2,500.00",
    commission: "$250.00", vip: true, credit: { amount: 150, applied: false },
    confirmationNo: "3246375A6",
  },
  {
    id: 10, guest: "Isabella Wilson", email: "isabella.w@icloud.com", phone: "+44 (20) 555-0167",
    profile: {
      originCity: "London", originState: "UK", biltTier: "X", memberSince: "Jun 2021",
      lifetimeSpend: 312000, totalStays: 56, avgNightlyRate: 1050, pointsBalance: 580000,
      diningPreference: "Michelin dining, Private chef", roomPreference: "Presidential suite, Full bar",
      travelCompanions: 1, pastProperties: ["Claridge's London", "Aman Venice", "Four Seasons Bora Bora"],
      tags: ["VIP", "Repeat guest", "BLADE user", "Private dining"],
      birthday: "December 1st", languages: ["English", "Italian", "French"],
      behaviorTags: [
        { emoji: "⭐", label: "Quality focused" }, { emoji: "🧳", label: "Early planner" },
        { emoji: "🍽", label: "Foodie" }, { emoji: "💬", label: "Responsive" },
      ],
      hotelPreferences: [
        "Top 0.1% spender across all Bilt properties",
        "Books presidential/penthouse suites exclusively",
        "Personal chef dinner on 70% of stays",
        "BLADE transfers on every resort visit",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "British Airways First, Emirates First. 2M+ lifetime miles. Private jet for short hops." },
        { category: "LIFESTYLE", detail: "Art collector. Requests gallery/museum guides at every destination." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT-X", checkIn: "May 1", checkOut: "May 21", nights: 20,
    status: "Checked-in", roomNo: "1131", roomType: "Presidential Suite", total: "$15,000.00",
    commission: "$1,500.00", vip: true, credit: { amount: 300, applied: false },
    specialRequests: "Private chef dinner May 5. Art gallery visit arranged. BLADE on arrival.",
    confirmationNo: "8763234212",
  },
  {
    id: 11, guest: "James Anderson", email: "james.a@gmail.com", phone: "+1 (206) 555-0134",
    profile: {
      originCity: "Seattle", originState: "WA", biltTier: "Gold", memberSince: "Oct 2023",
      lifetimeSpend: 54300, totalStays: 11, avgNightlyRate: 740, pointsBalance: 81400,
      diningPreference: "Pacific Northwest, Craft cocktails", roomPreference: "Modern design, USB outlets",
      travelCompanions: 1, pastProperties: ["The Hoxton Portland", "Ace Hotel Seattle"],
      tags: ["VIP", "Couple", "BILT member"],
      birthday: "February 14th", languages: ["English"],
      behaviorTags: [
        { emoji: "💻", label: "Remote worker" }, { emoji: "🍷", label: "Wine enthusiast" },
      ],
      hotelPreferences: [
        "Design-forward boutique properties",
        "Strong wifi and workspace are non-negotiable",
        "Prefers walkable downtown locations",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Alaska Airlines MVP Gold. Frequent SEA-SFO, SEA-LAX." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 3", checkOut: "May 22", nights: 19,
    status: "Pending", roomNo: "1201", roomType: "Design Suite", total: "$8,888.88",
    commission: "$888.89", vip: true, credit: { amount: 75, applied: false },
    confirmationNo: "1608882O1",
  },
  {
    id: 12, guest: "Katherine Thomas", email: "kat.thomas@outlook.com", phone: "+1 (404) 555-0189",
    profile: {
      originCity: "Atlanta", originState: "GA", biltTier: "Platinum", memberSince: "Aug 2022",
      lifetimeSpend: 118600, totalStays: 22, avgNightlyRate: 820, pointsBalance: 178000,
      diningPreference: "Southern, Farm-to-table", roomPreference: "Suite, Separate living area",
      occasion: "Anniversary", travelCompanions: 1, pastProperties: ["The St. Regis Atlanta", "Montage Palmetto Bluff"],
      tags: ["Repeat guest", "Anniversary", "Couple"],
      birthday: "June 28th", languages: ["English"],
      behaviorTags: [
        { emoji: "💑", label: "Romantic traveler" }, { emoji: "⭐", label: "Quality focused" },
        { emoji: "🧳", label: "Early planner" },
      ],
      hotelPreferences: [
        "Anniversary trip booked same week every year",
        "Montage brand loyalist — 8 stays across portfolio",
        "Always requests turndown service with chocolates",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Delta Diamond Medallion. ATL hub. Frequent ATL-LAX, ATL-CUN." },
        { category: "HOTEL LOYALTY", detail: "Montage loyalist. Marriott Bonvoy Titanium (dormant)." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 5", checkOut: "May 16", nights: 11,
    status: "Pending", roomNo: "2351", roomType: "Anniversary Suite", total: "$4,567.89",
    commission: "$456.79", vip: false, credit: { amount: 100, applied: false },
    confirmationNo: "5683475543",
  },
  {
    id: 13, guest: "Luis Fernandez", email: "luis.f@gmail.com", phone: "+1 (786) 555-0156",
    profile: {
      originCity: "Miami", originState: "FL", biltTier: "Gold", memberSince: "Jul 2023",
      lifetimeSpend: 41200, totalStays: 8, avgNightlyRate: 690, pointsBalance: 61800,
      diningPreference: "Cuban, Rooftop bars", roomPreference: "High floor, City/Ocean view",
      travelCompanions: 2, pastProperties: ["Faena Miami Beach", "1 Hotel South Beach"],
      tags: ["BILT member", "Group travel", "Nightlife"],
      languages: ["English", "Spanish"],
      behaviorTags: [
        { emoji: "🎉", label: "Nightlife enthusiast" }, { emoji: "👥", label: "Group organizer" },
      ],
      hotelPreferences: [
        "Books for friend groups 2-3 rooms at a time",
        "High F&B and nightlife spend",
      ],
      travelInsights: [
        { category: "LIFESTYLE", detail: "Frequent SoulCycle member. Regular at Miami nightlife venues." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 10", checkOut: "May 14", nights: 4,
    status: "Confirmed", roomNo: "915", roomType: "Premium Ocean View", total: "$3,240.00",
    commission: "$324.00", credit: { amount: 75, applied: false },
    confirmationNo: "9182736455",
  },
  {
    id: 14, guest: "Maria Nakamura", email: "maria.n@gmail.com", phone: "+81 (3) 555-0143",
    profile: {
      originCity: "Tokyo", originState: "JP", biltTier: "Platinum", memberSince: "Nov 2022",
      lifetimeSpend: 167400, totalStays: 30, avgNightlyRate: 890, pointsBalance: 251000,
      diningPreference: "Omakase, Kaiseki", roomPreference: "Japanese-style amenities, Soaking tub",
      travelCompanions: 0, pastProperties: ["Aman Tokyo", "Park Hyatt Tokyo", "The Peninsula Tokyo"],
      tags: ["VIP", "Solo traveler", "Repeat guest"],
      birthday: "October 5th", languages: ["Japanese", "English"],
      behaviorTags: [
        { emoji: "🍽", label: "Foodie" }, { emoji: "🌿", label: "Wellness oriented" },
        { emoji: "📸", label: "Photography enthusiast" },
      ],
      hotelPreferences: [
        "Solo luxury traveler — books suites for herself",
        "Photography is a key activity — requests rooms with best light",
        "Traditional spa treatments preferred over western",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "ANA Diamond. JAL Premier. NRT-LAX, NRT-LHR frequent routes." },
        { category: "HOTEL LOYALTY", detail: "Aman Junkies. Park Hyatt devotee (12 properties visited)." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 12", checkOut: "May 19", nights: 7,
    status: "Confirmed", roomNo: "1108", roomType: "Sunset Suite", total: "$6,890.00",
    commission: "$689.00", vip: true,
    specialRequests: "Japanese green tea in room. Soaking tub requested. Photography-friendly room.",
    confirmationNo: "7291836450",
  },
  {
    id: 15, guest: "Nathan Clark", email: "n.clark@proton.me", phone: "+1 (512) 555-0178",
    profile: {
      originCity: "Austin", originState: "TX", biltTier: "Silver", memberSince: "Mar 2024",
      lifetimeSpend: 15600, totalStays: 4, avgNightlyRate: 590, pointsBalance: 23400,
      diningPreference: "BBQ, Craft beer", roomPreference: "Near pool, Firm mattress",
      travelCompanions: 1, pastProperties: ["Hotel San José Austin"],
      tags: ["First time guest", "BILT member", "Couple"],
      languages: ["English"],
      behaviorTags: [
        { emoji: "🆕", label: "New to property" }, { emoji: "🏊", label: "Pool lover" },
      ],
      hotelPreferences: [
        "Budget-conscious but values unique experiences",
        "First international resort booking via Bilt",
      ],
      travelInsights: [],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 14", checkOut: "May 18", nights: 4,
    status: "Confirmed", roomNo: "305", roomType: "Pool View Room", total: "$2,360.00",
    commission: "$236.00", confirmationNo: "5518293740",
  },
  {
    id: 16, guest: "Olivia Park", email: "olivia.p@icloud.com", phone: "+1 (646) 555-0134",
    profile: {
      originCity: "New York", originState: "NY", biltTier: "Gold", memberSince: "May 2023",
      lifetimeSpend: 73400, totalStays: 15, avgNightlyRate: 810, pointsBalance: 110000,
      diningPreference: "Korean, Vegetarian options", roomPreference: "Sunset view, Balcony",
      occasion: "Babymoon", travelCompanions: 1, pastProperties: ["The Setai Miami", "Auberge Chileno Bay"],
      tags: ["Babymoon", "Repeat guest", "Vegetarian"],
      birthday: "March 8th", languages: ["English", "Korean"],
      behaviorTags: [
        { emoji: "🤰", label: "Babymoon" }, { emoji: "🥗", label: "Dietary needs" },
        { emoji: "💆", label: "Spa lover" },
      ],
      hotelPreferences: [
        "Pregnancy-safe spa treatments required this stay",
        "Prefers properties with excellent room service",
        "Auberge brand fan — 4 stays across portfolio",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "JetBlue Mosaic. Frequent JFK-CUN, JFK-SJD routes." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT", checkIn: "May 6", checkOut: "May 12", nights: 6,
    status: "Checked-in", roomNo: "718", roomType: "Garden Suite", total: "$5,460.00",
    commission: "$546.00", credit: { amount: 100, applied: false },
    specialRequests: "Pregnancy-safe spa treatments. Extra pillows. Decaf coffee in room.",
    confirmationNo: "6638291045",
  },
  {
    id: 17, guest: "Patrick O'Brien", email: "pat.ob@gmail.com", phone: "+1 (617) 555-0198",
    profile: {
      originCity: "Boston", originState: "MA", biltTier: "Silver", memberSince: "Aug 2024",
      lifetimeSpend: 12800, totalStays: 3, avgNightlyRate: 580, pointsBalance: 19200,
      diningPreference: "Seafood, Raw bar", roomPreference: "Ocean view, Near gym",
      travelCompanions: 0, pastProperties: ["The Liberty Hotel Boston"],
      tags: ["BILT member", "Fitness", "Solo traveler"],
      languages: ["English"],
      behaviorTags: [
        { emoji: "🏋️", label: "Fitness focused" }, { emoji: "🆕", label: "New to property" },
      ],
      hotelPreferences: [
        "Gym quality is a top priority in hotel selection",
      ],
      travelInsights: [
        { category: "LIFESTYLE", detail: "CrossFit athlete. Runs Boston Marathon annually." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 15", checkOut: "May 19", nights: 4,
    status: "Confirmed", roomNo: "422", roomType: "Fitness King", total: "$2,320.00",
    commission: "$232.00", confirmationNo: "4429183650",
  },
  {
    id: 18, guest: "Rachel Kim", email: "rachel.kim@outlook.com", phone: "+1 (310) 555-0167",
    profile: {
      originCity: "Los Angeles", originState: "CA", biltTier: "Gold", memberSince: "Apr 2023",
      lifetimeSpend: 58700, totalStays: 13, avgNightlyRate: 750, pointsBalance: 88100,
      diningPreference: "Plant-based, Juice bar", roomPreference: "Eco-friendly, Natural light",
      travelCompanions: 1, pastProperties: ["Treehouse Hotel London", "1 Hotel West Hollywood"],
      tags: ["Couple", "Wellness", "Vegan"],
      languages: ["English", "Korean"],
      behaviorTags: [
        { emoji: "🌿", label: "Wellness oriented" }, { emoji: "🥗", label: "Dietary needs" },
        { emoji: "♻️", label: "Eco-conscious" },
      ],
      hotelPreferences: [
        "Sustainability certifications influence booking decisions",
        "Plant-based dining options are non-negotiable",
        "Prefers properties with yoga/meditation programs",
      ],
      travelInsights: [
        { category: "LIFESTYLE", detail: "Yoga teacher training graduate. Daily meditation practice." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT", checkIn: "May 8", checkOut: "May 14", nights: 6,
    status: "Arriving today", roomNo: "612", roomType: "Wellness Suite", total: "$4,500.00",
    commission: "$450.00", credit: { amount: 75, applied: false },
    confirmationNo: "7782910346",
  },
  {
    id: 19, guest: "Samuel Davis", email: "sam.d@gmail.com", phone: "+1 (202) 555-0143",
    profile: {
      originCity: "Washington", originState: "DC", biltTier: "Platinum", memberSince: "Jan 2022",
      lifetimeSpend: 198300, totalStays: 35, avgNightlyRate: 910, pointsBalance: 297000,
      diningPreference: "French, Wine cellar access", roomPreference: "Club level, Executive lounge",
      travelCompanions: 0, pastProperties: ["The Watergate Hotel DC", "Rosewood Washington", "The Hay-Adams"],
      tags: ["VIP", "Solo traveler", "Business traveler"],
      birthday: "January 18th", languages: ["English", "French"],
      behaviorTags: [
        { emoji: "💼", label: "Business traveler" }, { emoji: "🍷", label: "Wine enthusiast" },
        { emoji: "⭐", label: "Quality focused" },
      ],
      hotelPreferences: [
        "50/50 business and leisure travel",
        "Executive lounge access is expected",
        "Wine collection — requests sommelier pairing dinners",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "United 1K. Star Alliance Gold. Frequent IAD-LHR, IAD-CDG." },
        { category: "BUSINESS", detail: "Government/consulting sector. Expense account covers most stays." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 9", checkOut: "May 14", nights: 5,
    status: "Confirmed", roomNo: "1405", roomType: "Executive Suite", total: "$5,150.00",
    commission: "$515.00", vip: true, credit: { amount: 100, applied: false },
    confirmationNo: "8891027364",
  },
  {
    id: 20, guest: "Tara Patel", email: "tara.p@icloud.com", phone: "+1 (929) 555-0189",
    profile: {
      originCity: "New York", originState: "NY", biltTier: "Gold", memberSince: "Sep 2023",
      lifetimeSpend: 47600, totalStays: 9, avgNightlyRate: 780, pointsBalance: 71400,
      diningPreference: "Indian, Vegetarian", roomPreference: "Quiet floor, Extra blankets",
      occasion: "Wellness retreat", travelCompanions: 0, pastProperties: ["Canyon Ranch Tucson", "COMO Shambhala"],
      tags: ["Wellness", "Solo traveler", "Vegetarian"],
      birthday: "May 22nd", languages: ["English", "Hindi", "Gujarati"],
      behaviorTags: [
        { emoji: "🌿", label: "Wellness oriented" }, { emoji: "🧘", label: "Yoga practitioner" },
        { emoji: "🥗", label: "Dietary needs" },
      ],
      hotelPreferences: [
        "Wellness/spa is the primary reason for travel",
        "Books 2-3 wellness retreats per year",
        "Requires vegetarian/Ayurvedic meal options",
      ],
      travelInsights: [
        { category: "WELLNESS", detail: "Annual Canyon Ranch guest. Ayurvedic treatment specialist." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 11", checkOut: "May 18", nights: 7,
    status: "Confirmed", roomNo: "603", roomType: "Spa Suite", total: "$5,460.00",
    commission: "$546.00", credit: { amount: 75, applied: false },
    specialRequests: "Daily spa treatments pre-booked. Yoga mat in room. Herbal tea selection.",
    confirmationNo: "3310928745",
  },
  {
    id: 21, guest: "Victor Andersen", email: "victor.a@outlook.com", phone: "+45 555-0134",
    profile: {
      originCity: "Copenhagen", originState: "DK", biltTier: "Silver", memberSince: "Jun 2024",
      lifetimeSpend: 22100, totalStays: 6, avgNightlyRate: 650, pointsBalance: 33200,
      diningPreference: "Nordic, Sustainable seafood", roomPreference: "Minimalist, Natural materials",
      travelCompanions: 1, pastProperties: ["Noma Residence Copenhagen"],
      tags: ["Couple", "BILT member", "Eco-conscious"],
      languages: ["Danish", "English", "German"],
      behaviorTags: [
        { emoji: "♻️", label: "Eco-conscious" }, { emoji: "🎨", label: "Design lover" },
      ],
      hotelPreferences: [
        "Scandinavian design aesthetic preference",
        "Sustainability practices influence booking",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "SAS EuroBonus Gold. Frequent CPH-JFK, CPH-LAX." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 13", checkOut: "May 20", nights: 7,
    status: "Confirmed", roomNo: "507", roomType: "Design Suite", total: "$4,550.00",
    commission: "$455.00", confirmationNo: "2219384756",
  },
  {
    id: 22, guest: "Wendy Liu", email: "wendy.liu@gmail.com", phone: "+1 (628) 555-0198",
    profile: {
      originCity: "San Francisco", originState: "CA", biltTier: "Platinum", memberSince: "May 2022",
      lifetimeSpend: 134500, totalStays: 24, avgNightlyRate: 860, pointsBalance: 201800,
      diningPreference: "Chinese, Dim sum, Tea ceremony", roomPreference: "High floor, Bathtub, Tea set",
      travelCompanions: 1, pastProperties: ["The Peninsula Hong Kong", "Mandarin Oriental Singapore"],
      tags: ["VIP", "Repeat guest", "Culture seeker"],
      birthday: "September 30th", languages: ["English", "Mandarin", "Cantonese"],
      behaviorTags: [
        { emoji: "🎭", label: "Culture seeker" }, { emoji: "🍵", label: "Tea enthusiast" },
        { emoji: "⭐", label: "Quality focused" },
      ],
      hotelPreferences: [
        "Peninsula and Mandarin Oriental loyalist",
        "Tea service in room is a consistent special request",
        "Cultural excursions booked on every trip",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "Cathay Pacific Diamond. United 1K. SFO-HKG, SFO-SIN." },
        { category: "HOTEL LOYALTY", detail: "Peninsula PenClub. Mandarin Oriental Fan Club." },
      ],
    },
    source: "Bilt Concierge", rate: "VSO", checkIn: "May 7", checkOut: "May 13", nights: 6,
    status: "Checked-in", roomNo: "1215", roomType: "Premium Suite", total: "$5,160.00",
    commission: "$516.00", vip: true, credit: { amount: 100, applied: true },
    confirmationNo: "9918273640",
  },
  {
    id: 23, guest: "Xavier Brooks", email: "xbrooks@yahoo.com", phone: "+1 (470) 555-0167",
    profile: {
      originCity: "Atlanta", originState: "GA", biltTier: "Blue", memberSince: "Feb 2025",
      lifetimeSpend: 2800, totalStays: 1, avgNightlyRate: 560, pointsBalance: 4200,
      diningPreference: "Southern comfort, BBQ", roomPreference: "No preference",
      travelCompanions: 1, pastProperties: [],
      tags: ["First time guest", "BILT member"],
      languages: ["English"],
      behaviorTags: [
        { emoji: "🆕", label: "New member" },
      ],
      hotelPreferences: [
        "First Bilt property stay — no historical data",
      ],
      travelInsights: [],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 16", checkOut: "May 19", nights: 3,
    status: "Confirmed", roomNo: "203", roomType: "Resort Room", total: "$1,680.00",
    commission: "$168.00", confirmationNo: "1128394756",
  },
  {
    id: 24, guest: "Yuki Tanaka", email: "yuki.t@outlook.co.jp", phone: "+81 (90) 555-0154",
    profile: {
      originCity: "Osaka", originState: "JP", biltTier: "Gold", memberSince: "Jan 2024",
      lifetimeSpend: 38900, totalStays: 7, avgNightlyRate: 720, pointsBalance: 58400,
      diningPreference: "Kaiseki, Soba, Sake", roomPreference: "Japanese bath amenities, Quiet room",
      travelCompanions: 1, pastProperties: ["The Ritz-Carlton Osaka", "Aman Tokyo"],
      tags: ["Couple", "BILT member", "Foodie"],
      birthday: "April 15th", languages: ["Japanese", "English"],
      behaviorTags: [
        { emoji: "🍽", label: "Foodie" }, { emoji: "🎎", label: "Cultural traveler" },
      ],
      hotelPreferences: [
        "Japanese hospitality standards expected globally",
        "Fine dining and sake selection are key factors",
      ],
      travelInsights: [
        { category: "AIRLINE TRAVEL", detail: "ANA Super Flyer. Frequent KIX-LAX, KIX-SJD." },
      ],
    },
    source: "Bilt App", rate: "BLT", checkIn: "May 10", checkOut: "May 16", nights: 6,
    status: "Confirmed", roomNo: "820", roomType: "Ocean View King", total: "$4,320.00",
    commission: "$432.00", credit: { amount: 75, applied: false },
    confirmationNo: "5567384920",
  },
  {
    id: 25, guest: "Zara Mitchell", email: "zara.m@gmail.com", phone: "+1 (917) 555-0143",
    profile: {
      originCity: "Brooklyn", originState: "NY", biltTier: "Gold", memberSince: "Dec 2022",
      lifetimeSpend: 62100, totalStays: 12, avgNightlyRate: 770, pointsBalance: 93200,
      diningPreference: "Mediterranean, Natural wine", roomPreference: "Bathtub, Art on walls",
      occasion: "Honeymoon", travelCompanions: 1, pastProperties: ["Hotel Costes Paris", "Cheval Blanc St-Barth"],
      tags: ["Honeymoon", "Couple", "VIP"],
      birthday: "July 4th", languages: ["English"],
      behaviorTags: [
        { emoji: "💍", label: "Honeymoon" }, { emoji: "🎨", label: "Design lover" },
        { emoji: "🍷", label: "Wine enthusiast" },
      ],
      hotelPreferences: [
        "Design-forward properties with character",
        "Honeymoon — first major trip as married couple",
        "Natural wine bars and art galleries are priorities",
      ],
      travelInsights: [
        { category: "LIFESTYLE", detail: "Fashion industry. Interior design background. Gallery visits on every trip." },
      ],
    },
    source: "Bilt Concierge", rate: "BLT", checkIn: "May 9", checkOut: "May 17", nights: 8,
    status: "Arriving today", roomNo: "1302", roomType: "Honeymoon Suite", total: "$7,120.00",
    commission: "$712.00", vip: true, credit: { amount: 150, applied: false },
    specialRequests: "Honeymoon package. Champagne on arrival. Couples spa May 11. Sunset sailing May 13.",
    confirmationNo: "8839201745",
  },
];

// ─── Stats ───

export function getReservationStats() {
  const arriving = reservations.filter(r => r.status === "Arriving today").length;
  const departing = reservations.filter(r => r.status === "Departing today").length;
  const checkedIn = reservations.filter(r => r.status === "Checked-in").length;
  const pending = reservations.filter(r => r.status === "Pending").length;
  const totalRevenue = reservations.reduce((sum, r) => sum + parseFloat(r.total.replace(/[$,]/g, "")), 0);
  const avgNightly = reservations.reduce((sum, r) => sum + r.profile.avgNightlyRate, 0) / reservations.length;
  const vipCount = reservations.filter(r => r.vip).length;

  return {
    totalGuests: reservations.length,
    arrivingToday: arriving,
    departingToday: departing,
    inHouse: checkedIn,
    pending,
    totalRevenue,
    avgNightlyRate: avgNightly,
    vipGuests: vipCount,
    commissionableRevenue: totalRevenue * 0.1,
  };
}

// ─── Folio ───

export interface FolioLine {
  date: string;
  description: string;
  charges: string;
  credits?: string;
}

export function generateFolio(reservation: BiltReservation): FolioLine[] {
  const lines: FolioLine[] = [];
  const [monthStr, dayStr] = reservation.checkIn.split(" ");
  const startDay = parseInt(dayStr);
  const totalNum = parseFloat(reservation.total.replace(/[$,]/g, ""));
  const nightlyRate = totalNum / reservation.nights;

  for (let i = 0; i < Math.min(reservation.nights, 5); i++) {
    const day = startDay + i;
    lines.push({ date: `${monthStr} ${day}, 2026`, description: `${reservation.roomType} — ${reservation.roomNo}`, charges: nightlyRate.toFixed(2) });
  }

  // Taxes
  lines.push({ date: `${monthStr} ${startDay}, 2026`, description: "NY State Sales Tax 8.875%", charges: (totalNum * 0.08875).toFixed(2) });
  lines.push({ date: `${monthStr} ${startDay}, 2026`, description: "NYC Occupancy Tax 5.875%", charges: (totalNum * 0.05875).toFixed(2) });
  lines.push({ date: `${monthStr} ${startDay}, 2026`, description: "NYC Unit Occupancy Tax", charges: "2.00" });

  // Payment
  const [outMonth, outDay] = reservation.checkOut.split(" ");
  lines.push({ date: `${outMonth} ${outDay}, 2026`, description: "Mastercard •*" + reservation.confirmationNo.slice(-4), charges: "", credits: totalNum.toFixed(2) });

  return lines;
}

// Points earned
export function getPointsEarned(reservation: BiltReservation): number {
  const total = parseFloat(reservation.total.replace(/[$,]/g, ""));
  const multiplier = reservation.profile.biltTier === "X" ? 3 : reservation.profile.biltTier === "Platinum" ? 2.5 : reservation.profile.biltTier === "Gold" ? 2 : 1;
  return Math.round(total * multiplier);
}

// ─── Experiences ───

export interface OutreachMessage {
  title: string;
  description: string;
  trigger: string;
}

export interface ExperienceService {
  id: string;
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  isDefault?: boolean;
  status: "wip" | "ready";
  partnerBrand?: string;
  partnerColor?: string;
  offer?: { type: string; value: string; details: string; };
  escalation?: { handoffTo: string; };
  notifications?: { onStart: boolean; onComplete: boolean; onIncomplete24h: boolean; };
}

export interface Experience {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  status: "Published" | "Draft" | "Unpublished";
  segment: string;
  segmentDescription: string;
  servicePills: { emoji: string; label: string }[];
  outreachMessages: OutreachMessage[];
  services: ExperienceService[];
}

export const experiences: Experience[] = [
  {
    id: "booking", name: "Booking Experience", icon: "booking", iconBg: "#fef3c7",
    description: "Pre-arrival communication and preference collection. Send personalized welcome messages, gather dietary restrictions, and prepare the property for guest arrival.",
    status: "Published", segment: "All Bilt members", segmentDescription: "All guests who book through Bilt channels",
    servicePills: [{ emoji: "✉️", label: "Welcome email" }, { emoji: "📋", label: "Preference survey" }, { emoji: "🎁", label: "Pre-arrival offer" }],
    outreachMessages: [
      { title: "Send automated welcome email", description: "Includes transfer booking link", trigger: "Triggered 7 days before arrival" },
      { title: "Preference collection survey", description: "Dietary, pillow type, minibar preferences", trigger: "Triggered 5 days before" },
      { title: "Transfer confirmation + flight details request", description: "Collects flight info for Blacklane/BLADE", trigger: "Triggered 3 days before" },
      { title: "Day-of arrival SMS", description: "Room readiness + concierge intro", trigger: "Triggered morning of arrival" },
      { title: "Post-check-in follow-up", description: "Experience satisfaction + dining recs", trigger: "Triggered 2 hours after check-in" },
    ],
    services: [
      { id: "welcome-email", name: "Personalized Welcome Email", description: "Branded welcome with property details, local recommendations, and digital concierge link.", icon: "mail", enabled: true, isDefault: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a" },
      { id: "preference-collection", name: "Preference Collection", description: "Gather guest preferences for room setup, dining, activities, and special occasions.", icon: "clipboard", enabled: true, status: "ready", partnerBrand: "Bilt Rewards", partnerColor: "#171717" },
      { id: "pre-arrival-concierge", name: "Pre-arrival Concierge Outreach", description: "Connect high-tier guests with a dedicated concierge 5 days before arrival.", icon: "concierge", enabled: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a" },
    ],
  },
  {
    id: "arrival", name: "Arrival Experience", icon: "arrival", iconBg: "#dbeafe",
    description: "Make first impressions extraordinary. BLADE helicopter transfers from the airport, Blacklane premium car service, and a personalized welcome amenity in-room.",
    status: "Published", segment: "X & Platinum members", segmentDescription: "Bilt X and Platinum tier guests",
    servicePills: [{ emoji: "🚁", label: "BLADE helicopter" }, { emoji: "🚗", label: "Blacklane transfer" }, { emoji: "🎁", label: "Welcome amenity" }],
    outreachMessages: [
      { title: "Send automated welcome email", description: "Includes transfer booking link", trigger: "Triggered 7 days before arrival" },
      { title: "Preference collection survey", description: "Dietary, pillow type, minibar preferences", trigger: "Triggered 5 days before" },
      { title: "Transfer confirmation + flight details request", description: "Collects flight info for Blacklane/BLADE", trigger: "Triggered 3 days before" },
      { title: "Day-of arrival SMS", description: "Room readiness + concierge intro", trigger: "Triggered morning of arrival" },
      { title: "Post-check-in follow-up", description: "Experience satisfaction + dining recs", trigger: "Triggered 2 hours after check-in" },
    ],
    services: [
      { id: "blade-transfer", name: "BLADE Helicopter Transfer", description: "Airport-to-property helicopter. SJD → Montage Los Cabos, ~15 min flight.", icon: "helicopter", enabled: true, status: "ready", partnerBrand: "BLADE", partnerColor: "#171717",
        offer: { type: "Credit", value: "$500.00", details: "BLADE helicopter credit for X & Platinum members" },
        escalation: { handoffTo: "VIP Services Manager" },
        notifications: { onStart: true, onComplete: true, onIncomplete24h: true } },
      { id: "blacklane-car", name: "Blacklane Premium Transfer", description: "Chauffeured First Class vehicle. Airport pickup with welcome signage and cold towels.", icon: "car", enabled: true, status: "ready", partnerBrand: "Blacklane", partnerColor: "#171717",
        offer: { type: "Credit", value: "$150.00", details: "Blacklane car service credit" },
        notifications: { onStart: true, onComplete: false, onIncomplete24h: false } },
      { id: "welcome-amenity", name: "In-Room Welcome Amenity", description: "Personalized welcome package based on guest profile. Champagne, local treats, handwritten note.", icon: "gift", enabled: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a",
        offer: { type: "Complimentary", value: "$75.00", details: "Welcome amenity per room" } },
    ],
  },
  {
    id: "dining", name: "Dining Experience", icon: "dining", iconBg: "#fee2e2",
    description: "Elevate every meal. Complimentary welcome dinner, 10% off partner restaurants, and surprise birthday desserts powered by Bilt's guest intelligence.",
    status: "Published", segment: "All Bilt members", segmentDescription: "All Bilt member guests",
    servicePills: [{ emoji: "🍽", label: "Welcome dinner" }, { emoji: "🎂", label: "Birthday surprise" }, { emoji: "🍷", label: "10% restaurant credit" }],
    outreachMessages: [
      { title: "Dining reservation confirmation", description: "Welcome dinner auto-booked for first night", trigger: "Triggered on check-in" },
      { title: "Birthday dining alert", description: "Notify F&B team of birthday guests", trigger: "Triggered day before birthday" },
    ],
    services: [
      { id: "welcome-dinner", name: "Welcome Dinner Credit", description: "Complimentary first-night dinner at the property's signature restaurant. One main course and dessert.", icon: "dining", enabled: true, isDefault: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a",
        offer: { type: "Complimentary", value: "$120.00", details: "Welcome dinner for two" },
        notifications: { onStart: true, onComplete: true, onIncomplete24h: false } },
      { id: "birthday-surprise", name: "Birthday Surprise", description: "Auto-triggered for guests with birthdays during their stay. Cake, 2 tickets to hotel show, and a card.", icon: "cake", enabled: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a",
        offer: { type: "Complimentary", value: "$85.00", details: "Birthday cake and show tickets" },
        escalation: { handoffTo: "F&B Manager" } },
      { id: "dining-discount", name: "10% Restaurant Credit", description: "10% off at all on-property restaurants for Bilt members, any time, any card.", icon: "percent", enabled: true, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a",
        offer: { type: "Discount", value: "10%", details: "All on-property restaurants" } },
    ],
  },
  {
    id: "departure", name: "Departure Experience", icon: "departure", iconBg: "#dcfce7",
    description: "Extend the stay's magic. Late checkout for top-tier members, Blacklane airport transfer, and a post-stay follow-up with bonus points for their next booking.",
    status: "Draft", segment: "Gold+ members", segmentDescription: "Bilt Gold, Platinum, and X members",
    servicePills: [{ emoji: "🕐", label: "Late checkout" }, { emoji: "🚗", label: "Airport transfer" }, { emoji: "⭐", label: "Bonus points" }],
    outreachMessages: [
      { title: "Late checkout offer", description: "Sent morning of departure", trigger: "Triggered 8am on checkout day" },
      { title: "Post-stay thank you + survey", description: "Includes return booking incentive", trigger: "Triggered 24 hours after checkout" },
    ],
    services: [
      { id: "late-checkout", name: "Late Checkout", description: "Guaranteed 2pm late checkout for Gold+. 4pm for Platinum and X members.", icon: "checkout", enabled: false, status: "wip", partnerBrand: "Property", partnerColor: "#16a34a" },
      { id: "departure-car", name: "Airport Transfer", description: "Blacklane car service to the airport for departing guests.", icon: "car", enabled: false, status: "wip", partnerBrand: "Blacklane", partnerColor: "#171717" },
      { id: "bonus-points", name: "Bonus Points", description: "500 bonus Bilt points for completing post-stay survey and booking return visit.", icon: "points", enabled: false, status: "wip", partnerBrand: "Bilt Rewards", partnerColor: "#171717" },
    ],
  },
  {
    id: "wellness", name: "Wellness Experience", icon: "wellness", iconBg: "#fce7f3",
    description: "Mind, body, and points. Complimentary SoulCycle class, spa credit, and 10x Bilt points on all wellness spend during their stay.",
    status: "Draft", segment: "X members only", segmentDescription: "Bilt X tier members",
    servicePills: [{ emoji: "🚴", label: "SoulCycle class" }, { emoji: "💆", label: "Spa credit" }, { emoji: "⭐", label: "10x points on wellness" }],
    outreachMessages: [],
    services: [
      { id: "soulcycle", name: "SoulCycle Class Credit", description: "Complimentary SoulCycle class during stay. Available at 80+ studios worldwide.", icon: "fitness", enabled: true, status: "ready", partnerBrand: "SoulCycle", partnerColor: "#eab308",
        offer: { type: "Credit", value: "$35.00", details: "One complimentary SoulCycle class" } },
      { id: "spa-credit", name: "Spa Credit", description: "$50–$200 spa credit depending on Bilt tier. Applicable to any treatment on-property.", icon: "spa", enabled: false, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a" },
      { id: "points-wellness", name: "10x Points on Wellness", description: "Earn 10x Bilt points on all spa, fitness, and wellness spend during stay.", icon: "points", enabled: true, status: "ready", partnerBrand: "Bilt Rewards", partnerColor: "#171717" },
    ],
  },
  {
    id: "vip-concierge", name: "VIP Concierge Suite", icon: "concierge", iconBg: "#e5e5e5",
    description: "The ultimate Bilt X experience. Full concierge package with BLADE transfers, private dining, SoulCycle, spa, and 10x points on all on-property spend.",
    status: "Unpublished", segment: "X members only", segmentDescription: "Bilt X tier members only",
    servicePills: [{ emoji: "🚁", label: "BLADE" }, { emoji: "🍽", label: "Private dining" }, { emoji: "💆", label: "Full wellness" }, { emoji: "⭐", label: "10x all spend" }],
    outreachMessages: [],
    services: [
      { id: "blade-vip", name: "BLADE Helicopter Transfer", description: "Round-trip BLADE helicopter transfer.", icon: "helicopter", enabled: false, status: "ready", partnerBrand: "BLADE", partnerColor: "#171717" },
      { id: "private-dining-vip", name: "Private Chef Dinner", description: "In-suite private chef experience with wine pairing.", icon: "dining", enabled: false, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a" },
      { id: "full-wellness-vip", name: "Full Wellness Package", description: "Daily spa treatment, SoulCycle, and yoga.", icon: "spa", enabled: false, status: "ready", partnerBrand: "Property", partnerColor: "#16a34a" },
      { id: "10x-all-vip", name: "10x Points All Spend", description: "10x Bilt points on every dollar spent on property.", icon: "points", enabled: false, status: "ready", partnerBrand: "Bilt Rewards", partnerColor: "#171717" },
    ],
  },
];

// ─── Available Services (standalone from partner network) ───

export interface AvailableService {
  id: string;
  name: string;
  description: string;
  icon: string;
  partnerBrand: string;
  partnerColor: string;
  enabled: boolean;
}

export const availableServices: AvailableService[] = [
  { id: "blade", name: "BLADE Helicopter Transfer", description: "Airport-to-property helicopter transfer for a dramatic arrival. Available at 40+ BLADE lounges.", icon: "helicopter", partnerBrand: "BLADE", partnerColor: "#171717", enabled: true },
  { id: "blacklane", name: "Blacklane Premium Transfer", description: "Chauffeured airport pickup and drop-off. Business class or First class vehicle options.", icon: "car", partnerBrand: "Blacklane", partnerColor: "#171717", enabled: true },
  { id: "soulcycle", name: "SoulCycle Class Credit", description: "Complimentary SoulCycle class during stay. Available at 80+ studios worldwide.", icon: "fitness", partnerBrand: "SoulCycle", partnerColor: "#eab308", enabled: true },
  { id: "10x-points", name: "10x Points on Property", description: "Earn 10x Bilt points on all on-property spend — restaurants, spa, golf, minibar, and more.", icon: "points", partnerBrand: "Bilt Rewards", partnerColor: "#171717", enabled: true },
  { id: "welcome-dinner", name: "Welcome Dinner Credit", description: "Complimentary first-night dinner at the property's signature restaurant. One main course and dessert.", icon: "dining", partnerBrand: "Property", partnerColor: "#16a34a", enabled: false },
  { id: "birthday", name: "Birthday Surprise", description: "Auto-triggered for guests with birthdays during their stay. Cake, 2 tickets to hotel show, and a card.", icon: "cake", partnerBrand: "Property", partnerColor: "#16a34a", enabled: true },
  { id: "spa-credit", name: "Spa Credit", description: "$50–$200 spa credit depending on Bilt tier. Applicable to any treatment on-property.", icon: "spa", partnerBrand: "Property", partnerColor: "#16a34a", enabled: false },
  { id: "shuttle", name: "Local Area Shuttle", description: "Complimentary shuttle to nearby attractions, beaches, and Bilt neighborhood partners.", icon: "map", partnerBrand: "Property", partnerColor: "#16a34a", enabled: false },
  { id: "room-stocking", name: "Room Stocking", description: "Pre-arrival room stocking with guest's preferred snacks, drinks, and amenities based on Bilt profile data.", icon: "minibar", partnerBrand: "Property", partnerColor: "#16a34a", enabled: false },
];
