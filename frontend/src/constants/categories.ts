export const blogCategories = ['technology', 'startup', 'lifestyle', 'finance'] as const;

export type BlogCategory = typeof blogCategories[number];