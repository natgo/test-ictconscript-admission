import { useState } from "react";

import * as v from "valibot";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import dayjs from "dayjs";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DataSchema, useData } from "@/lib/data";

import { MapPicker } from "./MapPicker";
import { Label } from "./ui/label";

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>
          {field.state.meta.errors.map((error) => error.message).join(",")}
        </em>
      ) : null}
      {field.state.meta.isValidating ? "Validating..." : null}
    </>
  );
}

export function AddNewItem() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          New entry
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-2">
        <DialogHeader>
          <DialogTitle>Add new entry</DialogTitle>
        </DialogHeader>

        <AddNewForm closeDialog={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

const AddNewSchema = v.omit(DataSchema, ["id", "isoTime"]);

function AddNewForm({ closeDialog }: { closeDialog: () => void }) {
  const { addItem } = useData();
  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
      lat: null,
      lon: null,
    } as v.InferInput<typeof AddNewSchema>,
    validators: {
      onChange: AddNewSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);

      addItem({ ...value, id: crypto.randomUUID(), isoTime: dayjs.tz() });
      closeDialog();
    },
  });
  return (
    <form
      className="contents"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="title">
        {(field) => (
          <>
            <Label htmlFor={field.name}>
              Title<span className="text-red-500">*</span>
            </Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </>
        )}
      </form.Field>
      <form.Field name="body">
        {(field) => (
          <>
            <Label htmlFor={field.name}>
              Body<span className="text-red-500">*</span>
            </Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
          </>
        )}
      </form.Field>
      <form.Subscribe
        selector={(state) => [state.values.lat, state.values.lon] as const}
      >
        {([lat, lon]) => (
          <>
            <Label>Location</Label>
            <MapPicker
              location={lat && lon ? { lat, lon } : null}
              updateLocation={(location) => {
                form.setFieldValue("lat", location.lat);
                form.setFieldValue("lon", location.lon);
              }}
            />
          </>
        )}
      </form.Subscribe>
      <form.Subscribe selector={(state) => [state.canSubmit, state.isPristine]}>
        {([canSubmit, isPristine]) => (
          <Button
            type="submit"
            disabled={!canSubmit || isPristine}
            className="justify-self-end"
          >
            Save
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
