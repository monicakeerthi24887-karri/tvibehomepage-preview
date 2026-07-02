import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') || 'performers';

  try {
    // Return dummy data since Supabase isn't configured
    let data = [];
    if (type === 'performers') {
      data = [
        { id: 1, name: "DJ Nova", description: "EDM / House", total_votes: 1240, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/MUSIC-ARENA-IMG-1-768x512.png" },
        { id: 2, name: "The Lunar Band", description: "Indie Rock", total_votes: 980, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/creators-space-768x512.png" },
        { id: 3, name: "MC Flow", description: "Hip Hop", total_votes: 850, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/youth-hub-768x512.png" }
      ];
    } else if (type === 'food') {
      data = [
        { id: 4, name: "Smoke & Grill", description: "BBQ & Ribs", total_votes: 1520, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/food-festival-768x512.png" },
        { id: 5, name: "Vegan Eats", description: "Plant-based", total_votes: 1100, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/food-festival-768x512.png" }
      ];
    } else if (type === 'shopping') {
      data = [
        { id: 6, name: "Vintage Kicks", description: "Sneakers", total_votes: 890, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/SHOPPING-VILLAGE-768x512.png" },
        { id: 7, name: "Glow Up", description: "Cosmetics", total_votes: 760, image_url: "https://tvibe.ca/wp-content/uploads/2026/05/beauty-district-768x512.png" }
      ];
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(`Error fetching trending ${type}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
