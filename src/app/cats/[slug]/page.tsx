import {Pet} from "@/models/Pet";

export default async function Page({params}: { params: Promise<{ slug: string }> }) {
  const id = (await params).slug;
  let data: Pet | null = null;

  try {
    const url = `${process.env.API_ENDPOINT}/${id}`;
    const res = await fetch(url)
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);
  }

  return (
    <>
      <h1 className="font-black m-3">Cat Details</h1>

      {data && <div>Name: {data.name}</div>}
    </>
  );
}