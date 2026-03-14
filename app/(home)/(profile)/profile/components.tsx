"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPlayerProfileSchema, AddPlayerProfileSchema } from "@/lib/zod"
import { createProfile } from "@/lib/actions/user-actions";
import { toast } from "sonner";

export function CreateProfileDialog({
  trigger,
}: {
  trigger: React.ReactNode;
}) {

  const { register, handleSubmit, formState: { errors }
  } = useForm<AddPlayerProfileSchema>({
    resolver: zodResolver(addPlayerProfileSchema)
  })

  const onSubmit = async (data: AddPlayerProfileSchema) => {
    const toastId = toast.loading("Create Player Profile...");
    const res = await createProfile(data);
    if (!res.success) { toast.error(res.error, { id: toastId }); return; }
    toast.success("Player Profile Creted", { id: toastId });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create Player Profile</DialogTitle>
          <DialogDescription>
            Fill the below details to create a player profile
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit( // NOTE: Use handleSubmit(onsubmit) for no debugging and consoles
            (data) => {
              console.log("VALID SUBMIT", data);
              onSubmit(data);
            },
            (errors) => {
              console.log("FORM ERRORS", errors);
            }
          )}
        >
          <FieldGroup>
            <Field>
              <Label htmlFor="position">Position</Label>
              <Input id="position" defaultValue="Winger" {...register("position")} />
            </Field>
            <Field>
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" defaultValue={5}
                {...register("rating", { valueAsNumber: true })}
              />
            </Field>
            {errors.position && <p>{errors.position.message}</p>}
            {errors.rating && <p>{errors.rating.message}</p>}
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

