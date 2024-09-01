'use client'


import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AuthScreen } from "@/features/auth/components/auth_screen";
import { useAuthActions } from "@convex-dev/auth/react";
export default function Home() {
  const { signOut } = useAuthActions();
  return (
   <div>
    Loggend Users
    <Button onClick={signOut}>Sign Out</Button>
   </div>


  );
}
