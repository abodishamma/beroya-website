import {
  Activity,
  BatteryCharging,
  CircleDot,
  Cog,
  Fan,
  Filter,
  Gauge,
  Move3d,
  Orbit,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  TimerReset,
  Truck,
  Waypoints,
} from "lucide-react";

export const navigation = [
  { label: "Home", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Technology", href: "#technology" },
  { label: "Products", href: "#products" },
  { label: "Quality", href: "#quality" },
  { label: "Global Presence", href: "#global" },
];

export const technologySteps = [
  {
    number: "01",
    title: "Engineering",
    text: "Application-led design, simulation and tolerance analysis transform a requirement into an exact component specification.",
    icon: Move3d,
  },
  {
    number: "02",
    title: "Materials",
    text: "Every alloy, polymer and surface treatment is selected against load, thermal and lifecycle demands.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Manufacturing",
    text: "Precision machining and controlled production processes deliver repeatable geometry at scale.",
    icon: Cog,
  },
  {
    number: "04",
    title: "Validation",
    text: "Dimensional, fatigue, thermal and performance testing verify the result before release.",
    icon: ShieldCheck,
  },
];

export const products = [
  {
    title: "Braking Systems",
    code: "BRK",
    text: "Controlled stopping power, consistent pedal feel and long-term thermal stability.",
    icon: CircleDot,
  },
  {
    title: "Suspension Parts",
    code: "SUS",
    text: "Engineered ride control and predictable handling across demanding road conditions.",
    icon: SlidersHorizontal,
  },
  {
    title: "Steering Components",
    code: "STR",
    text: "Precise response and durable articulation for confident directional control.",
    icon: Orbit,
  },
  {
    title: "Engine Components",
    code: "ENG",
    text: "High-integrity components designed for pressure, heat and continuous duty.",
    icon: Gauge,
  },
  {
    title: "Filtration",
    code: "FLT",
    text: "Advanced media and sealing systems that protect critical vehicle systems.",
    icon: Filter,
  },
  {
    title: "Cooling Systems",
    code: "CLG",
    text: "Efficient thermal management built for stable performance and extended life.",
    icon: Fan,
  },
  {
    title: "Electrical Components",
    code: "ELC",
    text: "Reliable sensing, switching and power delivery for modern vehicle platforms.",
    icon: BatteryCharging,
  },
  {
    title: "Transmission Components",
    code: "TRN",
    text: "Precision power-transfer parts developed for smooth, durable operation.",
    icon: Waypoints,
  },
];

export const qualityMetrics = [
  { value: 100, suffix: "%", label: "End-of-line inspection coverage" },
  { value: 8, suffix: "D", label: "Structured quality problem solving" },
  { value: 24, suffix: "/7", label: "Production traceability" },
  { value: 0, suffix: ".01", label: "Millimeter measurement capability" },
];

export const advantages = [
  {
    title: "Engineering Excellence",
    text: "Components developed around real application loads, tolerances and lifecycle targets.",
    icon: Activity,
  },
  {
    title: "Agile Manufacturing",
    text: "Responsive production planning without compromising process discipline.",
    icon: TimerReset,
  },
  {
    title: "Premium Materials",
    text: "Material systems chosen for performance, consistency and service life.",
    icon: Sparkles,
  },
  {
    title: "Global Distribution",
    text: "A supply mindset designed for international partners and diverse vehicle markets.",
    icon: Truck,
  },
  {
    title: "Reliable Performance",
    text: "Repeatable performance through controlled geometry, surfaces and assembly.",
    icon: Gauge,
  },
  {
    title: "Trusted Quality",
    text: "Documented controls and verification at every critical production stage.",
    icon: ShieldCheck,
  },
];

export const regions = [
  { name: "North America", x: 19, y: 36 },
  { name: "Europe", x: 49, y: 28 },
  { name: "Middle East", x: 57, y: 43 },
  { name: "Africa", x: 49, y: 58 },
  { name: "Asia Pacific", x: 78, y: 43 },
  { name: "South America", x: 31, y: 70 },
];

export const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
];

export const footerProductLinks = products.slice(0, 5).map((product) => product.title);
