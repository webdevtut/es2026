type RGB = [number, number, number];
type Color = string | RGB;

// ❌ `as` tells TypeScript what you want
const a = {
  red: [255, 0, 0],
  green: '#00ff00',
} as Record<string, Color>;

a.green.toUpperCase();
// ❌ Error — might be an RGB tuple


// ✅ `satisfies` validates without losing the actual type
const b = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, Color>;

b.green.toUpperCase();  // ✅ string
b.red.map(n => n / 255); // ✅ tuple