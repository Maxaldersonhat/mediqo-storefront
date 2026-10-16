export const CATEGORY_ICONS: Record<string, string> = {
  'Medical Equipment': '🩺',
  'Diagnostic Supplies': '📈',
  'Consumables & Dressings': '🩹',
  'PPE & Infection Control': '😷',
  'Laboratory Supplies': '🔬',
  'Hospital Furniture': '🛏️',
  'First Aid & Trauma': '➕',
  'Maternal & Infant Care': '👶',
};

export function iconFor(name: string): string {
  return CATEGORY_ICONS[name] ?? '📦';
}