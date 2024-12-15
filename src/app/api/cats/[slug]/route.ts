// export const revalidate = 60

import {Pet} from "@/models/Pet";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  let data: Pet | null;

  try {
    const url = `${process.env.API_ENDPOINT}/${slug}`;
    console.log('fetch url:', url)
    const res = await fetch(url);
    data = await res.json();
  } catch (e: any) {
    console.error('API Fetch error', e, e.error, e.message);

    data = null;

  }

  return Response.json(data)
}