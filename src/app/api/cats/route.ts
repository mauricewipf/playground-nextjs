// export const revalidate = 60

import {Pet} from "@/models/Pet";

export async function GET() {
  let data: Pet[];

  try {
    const res = await fetch(process.env.ENDPOINT || '')
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);

    data = [];

  }

  return Response.json(data)
}