import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuthActions } from "@convex-dev/auth/react"
import { Separator } from "@radix-ui/react-separator"
import { TriangleAlert } from "lucide-react"
import { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"
interface SignUpCardProps {
    setState: (state: "signIn" | "signUp") => void
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions()
    const [name, setName] = useState("")

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [pending, setPending] = useState(false)
    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (password !== confirmPassword) {
            setError("Password do not match")
            return
        }
        setPending(true)
        signIn("password", {name , email, password, flow: "signUp" }).
            catch((error) => {
                setError("Invalid email or password")

            }).
            finally(() => setPending(false))
    }

    const handleSignUpProvider = (value: "github" | "google") => {
        setPending(true)
        signIn(value).finally(() => setPending(false))
    }
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Signup to Continue

                </CardTitle>
                <CardDescription>
                    Use your email or other services to signup
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlert className="size-4" />
                    <span>{error}</span>

                </div>
            )}


            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        required
                    />
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
                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        type="password"
                        required
                    />
                    <Button type="submit" className="w-full" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button className="w-full relative"
                        variant='outline'
                        onClick={() => handleSignUpProvider("google")}
                        size='lg'
                        disabled={pending}>
                        <FcGoogle className="absolute top-3 left-2.5  size-5" />
                        Continue with Google
                    </Button>
                    <Button className="w-full relative"
                        onClick={() => handleSignUpProvider("github")}
                        variant='outline'
                        size='lg'
                        disabled={pending}>
                        <FaGithub className="absolute top-3 left-2.5  size-5" />
                        Continue with Github
                    </Button>





                </div>
                <p className="text-xs text-muted-foreground">
                    Already have a account? <span onClick={() => setState("signIn")} className="text-primary cursor-pointer">Sign In</span>

                </p>
            </CardContent>

        </Card>
    )
}