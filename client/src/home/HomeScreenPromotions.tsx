export type PromotionTier = {
  title: string;
  subheader?: string;
  price: string;
  description: string[];
  buttonText: string;
  showStar?: boolean;
  buttonVariant: "text" | "outlined" | "contained" | undefined;
};

export const promotions: PromotionTier[] = [
  {
    title: "Familie",
    price: "0",
    description: [
      "Unlimitierte Anzahl Hausarbeiten",
      "Unlimitierte Anzahl Belohnungen",
      "Limite von 2 Eltern und 6 Kindern",
    ],
    buttonText: "Jetzt loslegen",
    buttonVariant: "outlined",
  },
  {
    title: "Familie Plus",
    subheader: "Am meisten gekauft",
    showStar: true,
    price: "20",
    description: [
      "Unlimitierte Anzahl Hausarbeiten",
      "Unlimitierte Anzahl Belohnungen",
      "Limite von 5 Eltern und 20 Kindern",
      "Exklusive Features*",
    ],
    buttonText: "Jetzt kaufen",
    buttonVariant: "contained",
  },
  {
    title: "Geschäft",
    subheader: "Ideal für Schulen/Institutionen",
    price: "50+",
    description: [
      "Unlimitierte Anzahl Hausarbeiten",
      "Unlimitierte Anzahl Belohnungen",
      "Unlimitierte Anzahl Bezugspersonen",
      "Unlimitierte Anzahl Kinder",
      "Exklusive Features*",
    ],
    buttonText: "Kontaktieren Sie uns",
    buttonVariant: "outlined",
  },
];
