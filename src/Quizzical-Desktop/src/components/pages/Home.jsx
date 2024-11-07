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
import {Link} from "react-router-dom";


export const Home = () => {
    return (
        <div className=" flex flex-col gap-8 p-8" style={{width:"calc(100vw - 4rem)"}}>
                <h1 className="text-center" style={{width:"inherit"}}>Vyberte si kvíz</h1>
            <div className="grid grid-cols-4 gap-8" style={{width:"inherit"}}>
                {Array.from({length: 80}).map((item, index) => (
                    <Card className="">
                        <CardHeader>
                            <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                            <CardDescription>(AUTOR KVÍZU)</CardDescription>
                        </CardHeader>
                        <CardFooter>
                            <Link to="quiz">
                                <Button>Zkusit Kvíz</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}
