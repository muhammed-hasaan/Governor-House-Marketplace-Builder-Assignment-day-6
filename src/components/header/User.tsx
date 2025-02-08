import { Package, User2Icon } from "lucide-react";
import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
const User = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <Button variant={"outline"}>Sign In</Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="!flex gap-2">
          <UserButton />
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <User2Icon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-4">
                  <Package className="w-[24px] h-[24px]" />
                  <Link href={"/orders"} aria-label="go to order page">
                    My Orders
                  </Link>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SignedIn>
    </div>
  );
};

export default User;
