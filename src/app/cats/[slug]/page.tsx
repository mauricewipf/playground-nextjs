import {Pet} from "@/models/Pet";

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug;
  let data: Pet | null = null;

  try {
    const res = await fetch( `http://localhost:3000/api/cats/${id}`)
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