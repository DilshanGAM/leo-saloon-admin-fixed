"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/lib/api";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Home() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin(){
    
  // const response = await axios.post("http://localhost:3000/api/auth",
  //     {
  //       email : email,
  //       password : password
  //     }
  //   )


  const response = await api.post("/api/auth",
      {
        email : email,
        password : password
      }
      
  )

  window.location.href = "/dashboard"

    

    
  

  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <Card className="w-[400px]">
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email-spacing">Email</Label>
              <Input
                id="email-spacing"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password-spacing">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                id="password-spacing" 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full"
              onClick={handleLogin}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
}