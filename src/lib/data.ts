import * as v from "valibot";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import baseData from "@/../sample-data/data.json";

export const DataSchema = v.object({
  id: v.string(),
  title: v.pipe(v.string(), v.nonEmpty()),
  body: v.pipe(v.string(), v.nonEmpty()),
  isoTime: v.pipe(
    v.string(),
    v.transform((date) => dayjs.utc(date).tz()),
  ),
  lat: v.nullable(v.number()),
  lon: v.nullable(v.number()),
});

export type Data = v.InferOutput<typeof DataSchema>;

const DataArraySchema = v.array(DataSchema);

const sampleData = v.parse(DataArraySchema, baseData);

const dataAtom = atomWithStorage("data", sampleData, {
  getItem(key, initialValue) {
    const storedValue = localStorage.getItem(key);
    try {
      return v.parse(DataArraySchema, JSON.parse(storedValue ?? ""));
    } catch {
      return initialValue;
    }
  },
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
});

export function useData() {
  const [data, setData] = useAtom(dataAtom);

  const addItem = (item: Data) => {
    setData((prev) => [...prev, item]);
  };

  return {
    data: data.toSorted((a, b) =>
      dayjs(a.isoTime).isBefore(b.isoTime) ? 1 : -1,
    ),
    setData,
    addItem,
  };
}
