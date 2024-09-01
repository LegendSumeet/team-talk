import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
import { useAuthActions } from "@convex-dev/auth/react"
import { TriangleAlert } from "lucide-react"

interface SignInCardProps {
    setState: (state: "signIn" | "signUp") => void
}


export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error , setError] = useState("")
    const [pending, setPending] = useState(false)
    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setPending(true)
        signIn("password", { email, password,flow:"signIn" }).
        catch((error) => {
            setError("Invalid email or password")

        }).
        finally(() => setPending(false))
    }

    const handleSignInProvider = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => setPending(false))
    }

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
           {!!error && (
            <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
<TriangleAlert className="size-4"/>
<span>{error}</span>

            </div>
           )}

            <CardContent className="space-y-5 px-0 pb-0">
                <form 
                onSubmit={onPasswordSignIn}
                className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />

                    <Input
                        disabled={pending}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" 
                    disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative"
                        variant='outline'
                        size='lg'
                        onClick={() => handleSignInProvider("google")}
                        disabled={pending}>
                        <FcGoogle className="absolute top-3 left-2.5  size-5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative"
                        variant='outline'
                        onClick={() => handleSignInProvider("github")}
                        size='lg'
                        disabled={pending}>
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