/**
 * PLACEHOLDERS ONLY.
 *
 * No review text has been written or invented. Paste the genuine testimonials
 * from the existing site into `quote`, set `name` / `context`, and flip
 * `placeholder` to false — the placeholder notice disappears automatically.
 */
export type Testimonial = {
  quote: string;
  name: string;
  context: string;
  placeholder: boolean;
};

export const testimonials: Testimonial[] = [
  { quote: '[Insert existing testimonial — loft conversion, on workmanship quality]', name: 'Client name', context: 'Loft conversion', placeholder: true },
  { quote: '[Insert existing testimonial — extension, on communication and reliability]', name: 'Client name', context: 'Extension', placeholder: true },
  { quote: '[Insert existing testimonial — whole-house renovation, on trustworthiness]', name: 'Client name', context: 'Whole-house renovation', placeholder: true },
];

export const hasPlaceholders = testimonials.some((t) => t.placeholder);
