import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth } from "@/utils/auth"
import { headers } from "next/headers"
import Link from "next/link"
import NextImage from "next/image";
import { getMyProfile } from "@/lib/actions/user-actions"

export async function UserMenu() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const profile = await getMyProfile();


  const handleLogout = async () => {
    'use server';
    await auth.api.signOut({
      headers: await headers(),
    });
  }

  return (
    <div className="flex items-center gap-4 mx-2">
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2">
              <NextImage
                src={profile?.data?.image ?? `https://ui-avatars.com/api/?name=${user.name ?? user.email![0]}`}
                alt="User Avatar"
                className="w-8 h-8 rounded-full cursor-pointer"
                width={32}
                height={32}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <Link href={"/profile"}>
                <DropdownMenuItem>Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <form action={handleLogout}>
                <button type="submit" className="w-full">
                  <DropdownMenuItem>
                    Logout
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      ) : (
        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Log In</Link>
          </Button>
        </div>
      )
      }
    </div >
  )
}

