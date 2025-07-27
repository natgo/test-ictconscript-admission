import { createFileRoute } from "@tanstack/react-router";

import { AddNewItem } from "@/components/AddNewForm";
import { Data } from "@/components/Data";

export const Route = createFileRoute("/test-ictconscript-admission")({
  // Don't try to render with initial data
  ssr: false,
  component: App,
});

function App() {
  return (
    <div className="grid justify-items-center p-4">
      <h1 className="py-2 text-2xl font-bold">Unit Logbook</h1>
      <div className="fixed justify-self-end">
        <AddNewItem />
      </div>
      <Data />
    </div>
  );
}
