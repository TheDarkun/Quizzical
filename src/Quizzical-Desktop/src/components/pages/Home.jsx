import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Check} from "lucide-react";


export const Home = () => {
    return (
        <main>
            <div className="grid grid-cols-3 gap-8 ">
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                        <CardDescription>(AUTOR KVÍZU)</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Zkusit Kvíz</Button>
                    </CardFooter>
                </Card>
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                        <CardDescription>(AUTOR KVÍZU)</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Zkusit Kvíz</Button>
                    </CardFooter>
                </Card>
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                        <CardDescription>(AUTOR KVÍZU)</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Zkusit Kvíz</Button>
                    </CardFooter>
                </Card>
                <Card className="w-[300px]">
                    <CardHeader>
                        <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                        <CardDescription>(AUTOR KVÍZU)</CardDescription>
                    </CardHeader>
                    <CardFooter>
                        <Button>Zkusit Kvíz</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>
    )
}

