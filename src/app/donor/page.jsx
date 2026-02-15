import { getDonors } from "@/lib/data";

export default async function Donor() {
  const donors = await getDonors()
  return (
    <main>
      <h1 className="text-blue-500 ">Donor Page</h1>
      <h2>Total Donors {donors.length}</h2>
    </main>
  );
}
