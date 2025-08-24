// app/api/geoapify/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get("text");

  if (!text) {
    return NextResponse.json({ error: "Missing text" }, { status: 400 });
  }

  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    text
  )}&type=city&format=json&apiKey=${process.env.GEOAPIFY_API_KEY}`;

  const geoRes = await fetch(url);
  const data = await geoRes.json();

  return NextResponse.json(data);
}