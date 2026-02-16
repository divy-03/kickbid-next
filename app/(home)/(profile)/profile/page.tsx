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

export default async function ProfilePage() {
  const session = await getMyProfile();
  console.log("user", session);
  return (
    <div>
      {session ? (
        <div>
          Profile
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
            <Button>Create Profile</Button>
          </EmptyContent>
        </Empty>
      )
      }
    </div>
  )
}
