import {
  Award,
  CircleGauge,
  DraftingCompass,
  Factory,
  Globe2,
  Microscope,
  ScanLine,
  ShieldCheck,
} from "lucide-react";

import brakingImage from "../assets/reference-redesign/braking-system.webp";
import suspensionImage from "../assets/reference-redesign/suspension-parts.webp";
import engineMountImage from "../assets/reference-redesign/engine-mounts.webp";
import filtrationImage from "../assets/reference-redesign/filtration.webp";
import steeringImage from "../assets/reference-redesign/steering-parts.webp";
import drivetrainImage from "../assets/reference-redesign/drivetrain-parts.webp";

export const navigation = [
  { key: "home", page: "home", href: "#/" },
  { key: "shop", page: "shop", href: "#/shop" },
  { key: "about", page: "about", href: "#/about" },
  { key: "technology", page: "technology", href: "#/technology" },
  { key: "manufacturing", page: "manufacturing", href: "#/manufacturing" },
  { key: "quality", page: "quality", href: "#/quality" },
  { key: "contact", page: "contact", href: "#/contact" },
];

export const values = [
  { id: "quality", icon: Award },
  { id: "precision", icon: CircleGauge },
  { id: "reliability", icon: ShieldCheck },
  { id: "global", icon: Globe2 },
];

export const products = [
  { id: "braking", image: brakingImage },
  { id: "suspension", image: suspensionImage },
  { id: "mounts", image: engineMountImage },
  { id: "filtration", image: filtrationImage },
  { id: "steering", image: steeringImage },
  { id: "drivetrain", image: drivetrainImage },
];

export const technologySteps = [
  { number: "01", id: "definition", icon: DraftingCompass },
  { number: "02", id: "manufacturing", icon: Factory },
  { number: "03", id: "control", icon: ScanLine },
  { number: "04", id: "validation", icon: Microscope },
];

export const qualityMetrics = [
  { value: 4, suffix: "" },
  { value: 360, suffix: "°" },
  { value: 100, suffix: "%" },
];
