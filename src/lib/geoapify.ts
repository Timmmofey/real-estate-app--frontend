export async function fetchGeoapify(text: string) {
  if (!text) throw new Error("Missing text");

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    text
  )}&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch from Geoapify");

  return res.json();
}