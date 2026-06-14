import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BUSINESS = {
  name: "Giggles Kids Play Area",
  tagline: "Where Little Adventures Begin",
  phone: "+91 99164 76751",
  phoneRaw: "919916476751",
  address: "No. 43/1, HariHara Arcade, Manganahalli Road, Near MRPL Petrol Bunk, SMV Layout, Bengaluru, Karnataka 560110",
  hours: "10:30 AM – 8:00 PM (All Days)",
  ageGroup: "1 to 8 Years",
  rating: "4.9",
  whatsapp: `https://wa.me/919916476751`,
  maps: "https://maps.google.com/?q=No.+43/1+HariHara+Arcade+Manganahalli+Road+SMV+Layout+Bengaluru",
  mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5!2d77.5!3d12.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU0JzAwLjAiTiA3N8KwMzAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
};

export const TIME_SLOTS = [
  "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
];

export const PACKAGES = {
  silver: { name: "Silver", price: 4999, color: "#C0C0C0", features: ["Up to 20 kids", "2hr play session", "Basic decoration", "Cake cutting ceremony", "Return gifts (20)", "Dedicated staff"] },
  gold: { name: "Gold", price: 7999, color: "#FFD700", features: ["Up to 35 kids", "3hr play session", "Premium decoration", "Cake cutting ceremony", "Return gifts (35)", "Photography (1hr)", "Snacks & juice", "Dedicated staff"] },
  platinum: { name: "Platinum", price: 12999, color: "#E5E4E2", features: ["Up to 50 kids", "4hr play session", "Luxury decoration", "Custom theme", "Cake & catering", "Photography + video (2hr)", "Return gifts (50)", "Entertainment show", "Dedicated host"] },
};
