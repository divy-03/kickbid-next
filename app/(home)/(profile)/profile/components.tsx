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
import NextImage from "next/image";

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

type Props = {
  user: {
    name: string;
    email: string;
    image?: string | null;
    playerProfile?: {
      rating: number;
      position: string;
    } | null;
  };
};

export default function ProfileCard({ user }: Props) {
  return (
    <div className="border bg-gray-900 rounded-xl p-6 space-y-4 shadow-sm">

      <div className="flex items-center gap-4">
        <NextImage
          src={user.image ?? `https://ui-avatars.com/api/?name=${user.name ?? user.email![0]}`}
          alt="User Avatar"
          className="w-10 h-10 rounded-full cursor-pointer"
          width={32}
          height={32}
        />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      {user.playerProfile ? (
        <div className="border-t pt-4 space-y-2">

          <div className="flex justify-between">
            <span className="text-muted-foreground">Position</span>
            <span className="font-medium">{user.playerProfile.position}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-muted-foreground">Rating</span>
            <span className="font-medium">{user.playerProfile.rating}</span>
          </div>

        </div>
      ) : (
        <div className="border-t pt-4 text-sm text-muted-foreground">
          No player profile created yet.
        </div>
      )}

    </div>
  );
}
