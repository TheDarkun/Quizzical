import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const Login = () => {
    return (
        <>
            <section className="absolute z-0 w-full h-full flex items-center justify-center">
                <Card className="w-[400px] p-4">
                    <CardHeader>
                        <CardTitle>Přihlášení</CardTitle>
                        <CardDescription>Zadejte svůj e-mail a heslo níže pro přihlášení do svého účtu.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="joedoe@example.com"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Heslo</Label>
                                    <Input type="password" id="password"/>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-stretch ">
                        <Button className="w-full">Přihlásit se</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

