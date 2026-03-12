import productTshirtBlack from "@/assets/product-tshirt-black.jpg";
import productHoodieBeige from "@/assets/product-hoodie-beige.jpg";
import productTshirtWhite from "@/assets/product-tshirt-white.jpg";
import productHoodieBlack from "@/assets/product-hoodie-black.jpg";
import productPantsOlive from "@/assets/product-pants-olive.jpg";
import productSweatshirtCream from "@/assets/product-sweatshirt-cream.jpg";
import productJoggersGrey from "@/assets/product-joggers-grey.jpg";
import productJacketBrown from "@/assets/product-jacket-brown.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  hoverImage: string;
  description: string;
  sizes: string[];
  isNewDrop?: boolean;
  isBestSeller?: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Essential Oversized Tee",
    price: 45,
    category: "T-Shirts",
    image: productTshirtBlack,
    hoverImage: productTshirtWhite,
    description: "Premium heavyweight cotton oversized tee with dropped shoulders. A wardrobe essential built for everyday comfort and effortless style.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestSeller: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Cloud Hoodie",
    price: 89,
    category: "Hoodies",
    image: productHoodieBeige,
    hoverImage: productHoodieBlack,
    description: "Ultra-soft brushed fleece hoodie with kangaroo pocket. Relaxed fit that moves with you from street to couch.",
    sizes: ["S", "M", "L", "XL"],
    isNewDrop: true,
    isBestSeller: true,
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "Clean White Tee",
    price: 42,
    category: "T-Shirts",
    image: productTshirtWhite,
    hoverImage: productTshirtBlack,
    description: "The perfect white tee. Premium cotton, clean silhouette, goes with everything. Period.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestSeller: true,
    rating: 4.7,
    reviews: 201,
  },
  {
    id: "4",
    name: "Stealth Zip Hoodie",
    price: 95,
    category: "Hoodies",
    image: productHoodieBlack,
    hoverImage: productHoodieBeige,
    description: "Full-zip hoodie in heavyweight fleece. Matte black hardware, minimal branding, maximum presence.",
    sizes: ["S", "M", "L", "XL"],
    isNewDrop: true,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "5",
    name: "Cargo Utility Pants",
    price: 78,
    category: "Oversized",
    image: productPantsOlive,
    hoverImage: productJoggersGrey,
    description: "Functional cargo pants with oversized pockets. Elastic waist and cuffed ankles for that perfect streetwear silhouette.",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.5,
    reviews: 43,
  },
  {
    id: "6",
    name: "Butter Crewneck",
    price: 72,
    category: "Oversized",
    image: productSweatshirtCream,
    hoverImage: productHoodieBeige,
    description: "Buttery soft crewneck sweatshirt in a relaxed oversized fit. The comfort piece your wardrobe is missing.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestSeller: true,
    rating: 4.8,
    reviews: 156,
  },
  {
    id: "7",
    name: "Urban Joggers",
    price: 65,
    category: "New Drops",
    image: productJoggersGrey,
    hoverImage: productPantsOlive,
    description: "Tapered joggers with a premium feel. Ribbed cuffs, hidden zip pockets, and that perfect relaxed-but-put-together look.",
    sizes: ["S", "M", "L", "XL"],
    isNewDrop: true,
    rating: 4.4,
    reviews: 38,
  },
  {
    id: "8",
    name: "Heritage Bomber",
    price: 120,
    category: "New Drops",
    image: productJacketBrown,
    hoverImage: productHoodieBlack,
    description: "Timeless bomber jacket reimagined. Premium shell with satin lining, ribbed collar and cuffs. A statement piece.",
    sizes: ["S", "M", "L", "XL"],
    isNewDrop: true,
    rating: 4.9,
    reviews: 22,
  },
];

export const collections = [
  { name: "New Drops", slug: "new-drops", count: products.filter(p => p.isNewDrop).length },
  { name: "Best Sellers", slug: "best-sellers", count: products.filter(p => p.isBestSeller).length },
  { name: "T-Shirts", slug: "t-shirts", count: products.filter(p => p.category === "T-Shirts").length },
  { name: "Hoodies", slug: "hoodies", count: products.filter(p => p.category === "Hoodies").length },
  { name: "Oversized", slug: "oversized", count: products.filter(p => p.category === "Oversized").length },
];
