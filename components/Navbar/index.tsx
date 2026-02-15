import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggleBtn } from "../ModeToggleBtn";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Menu } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserMenu } from "./UserMenu";

export default async function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50 transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Kickbid
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <UserMenu />
          <ModeToggleBtn />
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggleBtn />

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="pt-10">
              {/* Accessibility */}
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access authentication and navigation links
                </SheetDescription>
              </VisuallyHidden>

              {/* Mobile Nav Items */}
              <div className="flex flex-col gap-4 p-5">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

