import React from "react";
import {Pet} from "@/models/Pet";
import Link from "next/link";

const Table = ({ data }: { data: Pet[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Age</th>
          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Breed</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row: Pet) => (
          <tr key={row._id} className="border-b border-gray-200">
            <td className="px-4 py-2 text-sm text-gray-600">{row._id}</td>
            <td className="px-4 py-2 text-sm text-blue-500 hover:underline">
              <Link href={`/cats/${row._id}`}>
                {row.name}
              </Link>
            </td>
            <td className="px-4 py-2 text-sm text-gray-600">{row.age}</td>
            <td className="px-4 py-2 text-sm text-gray-600">{row.breed}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
