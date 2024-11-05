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

export const Register = () => {
    return (
        <>
            <section className="absolute z-0 w-full h-full flex items-center justify-center">
                <Card className="w-[400px] p-4">
                    <CardHeader>
                        <CardTitle>Registrace</CardTitle>
                        <CardDescription>Zadejte své informace pro vytvoření účtu</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="namr">Jméno</Label>
                                    <Input id="name" placeholder="darkun68"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" placeholder="joedoe@example.com"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Heslo</Label>
                                    <Input type="password" id="password"/>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="confirmpassword">Potvrdit Heslo</Label>
                                    <Input type="password" id="confirmpassword"/>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-stretch ">
                        <Button className="w-full">Zaregistrovat se</Button>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}

