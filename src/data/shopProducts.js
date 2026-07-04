import brakingImage from "../assets/reference-redesign/braking-system.webp";
import suspensionImage from "../assets/reference-redesign/suspension-parts.webp";
import engineMountImage from "../assets/reference-redesign/engine-mounts.webp";
import filtrationImage from "../assets/reference-redesign/filtration.webp";
import steeringImage from "../assets/reference-redesign/steering-parts.webp";
import drivetrainImage from "../assets/reference-redesign/drivetrain-parts.webp";

export const shopCategories = [
  "braking",
  "suspension",
  "mounts",
  "filtration",
  "steering",
  "drivetrain",
];

export const productCatalog = [
  {
    id: "braking-system-pro",
    category: "braking",
    image: brakingImage,
    price: 420,
    sku: "BRY-BRK-610",
    availability: "inStock",
    warrantyMonths: 24,
    featured: 1,
  },
  {
    id: "suspension-control-arm",
    category: "suspension",
    image: suspensionImage,
    price: 365,
    sku: "BRY-SUS-240",
    availability: "inStock",
    warrantyMonths: 18,
    featured: 2,
  },
  {
    id: "engine-mount-premium",
    category: "mounts",
    image: engineMountImage,
    price: 275,
    sku: "BRY-MNT-330",
    availability: "limited",
    warrantyMonths: 18,
    featured: 3,
  },
  {
    id: "filtration-performance-kit",
    category: "filtration",
    image: filtrationImage,
    price: 145,
    sku: "BRY-FLT-120",
    availability: "inStock",
    warrantyMonths: 12,
    featured: 4,
  },
  {
    id: "steering-precision-link",
    category: "steering",
    image: steeringImage,
    price: 310,
    sku: "BRY-STR-440",
    availability: "inStock",
    warrantyMonths: 18,
    featured: 5,
  },
  {
    id: "drivetrain-joint-assembly",
    category: "drivetrain",
    image: drivetrainImage,
    price: 395,
    sku: "BRY-DRV-520",
    availability: "preOrder",
    warrantyMonths: 24,
    featured: 6,
  },
];

export function getProductById(productId) {
  return productCatalog.find((product) => product.id === productId);
}

export function getRelatedProducts(product, limit = 3) {
  return productCatalog
    .filter((item) => item.id !== product.id && item.category === product.category)
    .concat(productCatalog.filter((item) => item.id !== product.id && item.category !== product.category))
    .slice(0, limit);
}
