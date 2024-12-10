// export const revalidate = 60

import {Pet} from "@/models/Pet";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  let data: Pet | null;

  try {
    const res = await fetch(`${process.env.ENDPOINT}/${slug}`)
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);

    data = null;

  }

  return Response.json(data)
}