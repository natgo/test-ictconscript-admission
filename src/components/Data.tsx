import { DataCard } from "@/components/DataCard";
import { useData } from "@/lib/data";

export function Data() {
  const { data } = useData();

  return (
    <div className="grid max-w-xl gap-2">
      {data.map((item) => (
        <DataCard data={item} key={item.id} />
      ))}
    </div>
  );
}
