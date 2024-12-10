import Table from "@/components/Table";
import {Pet} from "@/models/Pet";

export default async function Page() {
  let data: Pet[] = [];

  try {
    const res = await fetch('http://localhost:3000/api/cats')
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);
  }

  return (
    <>
      <h1>Cats Overview</h1>
      <Table data={data} />
    </>
  );
}
