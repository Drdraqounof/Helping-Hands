// Edit this file to set course prices and details.
// `price: null` shows "Contact for pricing" on the Pricing page.
// `duration: null` hides the class length.

export type Course = {
  id: string;
  name: string;
  icon: "heart" | "cross" | "aed" | "pulse";
  description: string;
  price: number | null;
  priceNote?: string;
  duration: string | null;
  includes: string[];
  featured?: boolean;
};

export const courses: Course[] = [
  {
    id: "cpr-aed",
    name: "CPR & AED",
    icon: "heart",
    description:
      "Learn to recognize cardiac emergencies, give high-quality chest compressions, and use an AED with confidence.",
    price: null,
    priceNote: "per person",
    duration: null,
    includes: [
      "Hands-on practice with manikins",
      "AED trainer practice",
      "Adult, child, and infant skills",
    ],
  },
  {
    id: "first-aid",
    name: "First Aid",
    icon: "cross",
    description:
      "Be ready for everyday emergencies, from bleeding and burns to choking and allergic reactions.",
    price: null,
    priceNote: "per person",
    duration: null,
    includes: [
      "Real-world scenarios",
      "Bleeding control and wound care",
      "Choking and allergic reactions",
    ],
  },
  {
    id: "cpr-aed-first-aid",
    name: "CPR, AED & First Aid",
    icon: "aed",
    description:
      "Our most complete class for workplaces, schools, churches, and families who want to be fully prepared.",
    price: null,
    priceNote: "per person",
    duration: null,
    includes: [
      "Everything in CPR & AED",
      "Everything in First Aid",
      "Great for staff and volunteer teams",
    ],
    featured: true,
  },
  {
    id: "bls",
    name: "BLS for Healthcare Providers",
    icon: "pulse",
    description:
      "Basic Life Support for nurses, students, and healthcare professionals, taught by a Licensed Practical Nurse.",
    price: null,
    priceNote: "per person",
    duration: null,
    includes: [
      "Team-based resuscitation",
      "Bag-valve-mask practice",
      "Taught with real clinical experience",
    ],
  },
];
