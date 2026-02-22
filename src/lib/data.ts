export interface Event {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
  categoryEmoji: string;
  date: string;
  time?: string;
  location: string;
  city: string;
  price: string;
  priceNum: number;
  image: string;
  featured?: boolean;
  capacity?: string;
  description?: string;
  rating?: number;
  tag?: string;
}

export const events: Event[] = [
  {
    id: 1,
    title: "Orchestre Philharmonique de Paris",
    subtitle: "Soirée Beethoven",
    category: "Concert",
    categoryEmoji: "",
    date: "15 Mars 2025",
    time: "20h30",
    location: "Philharmonie de Paris",
    city: "Paris",
    price: "45€",
    priceNum: 45,
    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&q=80",
    featured: true,
    capacity: "2 400",
    description:
      "Une soirée magistrale sous la direction du maestro Gustavo Dudamel. Beethoven, une création mondiale et le Concerto pour violon de Brahms avec Hilary Hahn en soliste.",
    rating: 4.9,
    tag: "En vedette",
  },
  {
    id: 2,
    title: "Summit IA & Innovation 2025",
    category: "Conférence",
    categoryEmoji: "",
    date: "22 Mars 2025",
    time: "09h00",
    location: "Paris La Défense",
    city: "Paris",
    price: "180€",
    priceNum: 180,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    rating: 4.7,
    tag: "Populaire",
  },
  {
    id: 3,
    title: "Lumière Perpétuelle",
    subtitle: "Exposition contemporaine",
    category: "Exposition",
    categoryEmoji: "",
    date: "5 Avr – 12 Juin",
    location: "Palais de Tokyo",
    city: "Paris",
    price: "18€",
    priceNum: 18,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&q=80",
    rating: 4.8,
  },
  {
    id: 4,
    title: "Gala de Charité Étoiles du Sud",
    category: "Gala",
    categoryEmoji: "",
    date: "8 Mars 2025",
    time: "19h00",
    location: "Hôtel Martinez",
    city: "Cannes",
    price: "250€",
    priceNum: 250,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80",
    rating: 4.9,
    tag: "Prestige",
  },
  {
    id: 5,
    title: "Festival Taste of Bordeaux",
    category: "Gastronomie",
    categoryEmoji: "",
    date: "10 Mars 2025",
    time: "12h00",
    location: "Quais de Bordeaux",
    city: "Bordeaux",
    price: "Gratuit",
    priceNum: 0,
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&q=80",
    rating: 4.6,
  },
  {
    id: 6,
    title: "Festival Électronique Nuit Blanche",
    category: "Festival",
    categoryEmoji: "",
    date: "18–21 Mars",
    location: "Strasbourg Arena",
    city: "Strasbourg",
    price: "65€",
    priceNum: 65,
    image: "https://images.unsplash.com/photo-1485841938031-1bf81239b815?w=600&q=80",
    rating: 4.7,
    tag: "3 jours",
  },
  {
    id: 7,
    title: "Marathon de Lyon Prestige",
    category: "Sport",
    categoryEmoji: "",
    date: "30 Mars 2025",
    time: "08h00",
    location: "Lyon Centre",
    city: "Lyon",
    price: "35€",
    priceNum: 35,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
    rating: 4.5,
  },
  {
    id: 8,
    title: "Sunrise Yoga — Côte d'Azur",
    category: "Bien-être",
    categoryEmoji: "",
    date: "14 Mars 2025",
    time: "06h30",
    location: "Plage du Miramar",
    city: "Nice",
    price: "12€",
    priceNum: 12,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
    rating: 4.8,
  },
];

export const categories = [
  { name: "Tous" },
  { name: "Concert" },
  { name: "Conférence" },
  { name: "Exposition" },
  { name: "Gala" },
  { name: "Festival" },
  { name: "Sport" },
  { name: "Gastronomie" },
  { name: "Bien-être" },
];
