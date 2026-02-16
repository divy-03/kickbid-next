import { getMyProfile } from "@/lib/actions/user-actions";
import { Loader2 } from "lucide-react";

export default async function ProfilePage() {
  const session = await getMyProfile();
  console.log("user", session);
  return (
    <div>Profile
    </div>
  )
}
