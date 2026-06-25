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
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Our Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Quality", href: "#quality" },
  { label: "Contact", href: "#contact" },
];

export const values = [
  {
    title: "Premium Quality",
    text: "We use the finest materials and strict quality control to ensure long-lasting performance.",
    icon: Award,
  },
  {
    title: "Engineered With Precision",
    text: "Every part is designed and tested to meet or exceed OEM standards.",
    icon: CircleGauge,
  },
  {
    title: "Reliability You Can Trust",
    text: "Built for endurance and safety in the most demanding conditions.",
    icon: ShieldCheck,
  },
  {
    title: "Built For Global Drivers",
    text: "Proudly supplying high-performance parts to markets worldwide.",
    icon: Globe2,
  },
];

export const products = [
  {
    title: "Braking System",
    text: "High-performance braking components for maximum safety.",
    image: brakingImage,
  },
  {
    title: "Suspension Parts",
    text: "Built for stability, comfort, and superior control.",
    image: suspensionImage,
  },
  {
    title: "Engine Mounts",
    text: "Reduce vibration. Improve performance.",
    image: engineMountImage,
  },
  {
    title: "Filtration",
    text: "Cleaner performance. Longer engine life.",
    image: filtrationImage,
  },
  {
    title: "Steering Parts",
    text: "Precision steering components for perfect handling.",
    image: steeringImage,
  },
  {
    title: "Drivetrain Parts",
    text: "Power transmission parts that go the extra mile.",
    image: drivetrainImage,
  },
];

export const technologySteps = [
  {
    number: "01",
    title: "Engineering Definition",
    text: "Fit, load, material and performance targets are translated into measurable product requirements.",
    icon: DraftingCompass,
  },
  {
    number: "02",
    title: "Precision Manufacturing",
    text: "Controlled machining and forming processes protect critical geometry and repeatability.",
    icon: Factory,
  },
  {
    number: "03",
    title: "Dimensional Control",
    text: "Critical interfaces are measured against engineering intent throughout production.",
    icon: ScanLine,
  },
  {
    number: "04",
    title: "Performance Validation",
    text: "Components are evaluated for durability, consistency and demanding real-world duty cycles.",
    icon: Microscope,
  },
];

export const qualityMetrics = [
  { value: 4, suffix: "", label: "Engineering validation gates" },
  { value: 360, suffix: "°", label: "Process visibility" },
  { value: 100, suffix: "%", label: "Critical-feature focus" },
];
