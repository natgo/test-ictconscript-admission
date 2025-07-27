import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Data } from "@/lib/data";

import { MapPicker } from "./MapPicker";

export function DataCard({ data }: { data: Data }) {
  return (
    <Card key={data.id}>
      <CardHeader>
        <div>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.isoTime.format("l LT")}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid auto-cols-fr grid-flow-col">
        <div className="col-span-2 whitespace-pre-wrap">{data.body}</div>
        {data.lat && data.lon && (
          <div className="aspect-square">
            <MapPicker location={{ lat: data.lat, lon: data.lon }} miniMap />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
