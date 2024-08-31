import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

interface SignInCardProps {
    setState: (state: "signIn" | "signUp") => void
}


export const SignInCard = ({setState}:SignInCardProps) => {
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")

    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Login to Continue

                </CardTitle>
                <CardDescription>
                Use your email or other services to login
            </CardDescription>
            </CardHeader>
           
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <Input
                        disabled={false}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative"
                    variant='outline'
                    size='lg'
                     disabled={false}>
                        <FcGoogle className="absolute top-3 left-2.5  size-5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative"
                    variant='outline'
                    size='lg'
                     disabled={false}>
                        <FaGithub className="absolute top-3 left-2.5  size-5" />
                        Continue with Github
                    </Button>

                    
                    
                

                </div>
                <p className="text-xs text-muted-foreground">
                    Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-primary cursor-pointer">Sign Up</span>
                    
                </p>
            </CardContent>

        </Card>
    )

}