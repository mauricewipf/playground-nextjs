import {Pet} from "@/models/Pet";

export const dynamic = 'force-dynamic'

export async function GET() {
  let data: Pet[];

  try {
    const res = await fetch(process.env.API_ENDPOINT || '')
    data = await res.json();
  } catch (e) {
    console.error('API Fetch error', e);

    data = [];

  }

  return Response.json(data)
}