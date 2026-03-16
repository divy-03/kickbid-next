import { getMyProfile } from "@/lib/actions/user-actions";
import { PersonStanding } from "lucide-react";
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { CreateProfileDialog } from "./components";

export default async function ProfilePage() {
  const res = await getMyProfile();

  if (!res.success) {
    return (
      <div className="p-6 text-red-500">
        {res.error}
      </div>
    );
  }
  const profile = res.data;
  console.log("user", profile); // NOTE: the profile is null in start beacause profile is not created now.
  return (
    <div>
      {profile && profile.playerProfile ? (
        <div className="">
          {profile.playerProfile.position}
        </div>
      ) : (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <PersonStanding />
            </EmptyMedia>
            <EmptyTitle>Profie Missing</EmptyTitle>
            <EmptyDescription>
              You haven&apos;t created your player profile yet</EmptyDescription>
          </EmptyHeader>
          <EmptyContent className="flex-row justify-center gap-2">
            <CreateProfileDialog
              trigger={<Button>Create Profile</Button>}
            />
          </EmptyContent>
        </Empty>
      )
      }
    </div>
  )
}
