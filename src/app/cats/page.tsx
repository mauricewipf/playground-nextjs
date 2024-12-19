import Table from "@/components/Table";
import {Pet} from "@/models/Pet";

/*
* If you are not using any Dynamic APIs anywhere else in this route,
* it will be prerendered during next build to a static page.
* The data can then be updated using Incremental Static Regeneration.
* To prevent the page from prerendering, you can add the following:
*/
export const dynamic = 'force-dynamic'

export default async function Page() {
  let data: Pet[] = [];

  try {
    const url = `${process.env.API_ENDPOINT}`;
    const res = await fetch(url);
    data = await res.json();
  } catch (e) {
    console.error('Fetch error', e);
  }

  return (
    <>
      <h1 className="font-black m-3">Cats Overview</h1>
      <Table data={data} />
    </>
  );
}
