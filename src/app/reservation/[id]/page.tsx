import { reservations } from "@/lib/data";
import ReservationDetail from "./ReservationDetail";

export function generateStaticParams() {
  return reservations.map((r) => ({ id: r.id.toString() }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ReservationDetail id={id} />;
}
