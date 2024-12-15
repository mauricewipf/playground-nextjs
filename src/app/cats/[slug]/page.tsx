import {Pet} from "@/models/Pet";

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug;
  let data: Pet | null = null;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cats/${id}`;
    console.log('cats/[slug]/page.tsx url:', url);
    const res = await fetch(url)
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);
  }

  return (
    <>
      <h1>Cat Details</h1>

      {data && <div>Name: {data.name}</div>}
    </>
  );
}