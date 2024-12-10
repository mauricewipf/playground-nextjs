import Table from "@/components/Table";

export default async function Page() {

  const res = await fetch('https://mauwi-playground.com/api/cats')
  const data = await res.json();

  // const data = [
  //   { _id: "647d8118d103b744e5f31764", name: "Pussy", age: 6, breed: "Egypt" },
  //   { _id: "647d8118d103b744e5f31765", name: "Whiskers", age: 3, breed: "Persian" },
  //   { _id: "647d8118d103b744e5f31766", name: "Fluffy", age: 2, breed: "Maine Coon" },
  // ];

  return (
    <>
      <h1>Cats Overview</h1>
      <Table data={data} />
    </>
  );
}
