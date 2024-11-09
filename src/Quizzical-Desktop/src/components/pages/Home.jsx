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
import {QuizCard} from "@/components/QuizCard.jsx";
import {useEffect, useState} from "react";


export const Home = () => {
    
    const [quizzes, setQuizzes] = useState({});
    
    useEffect(() => {
        async function fetchQuizzes() {
            const response = await axios.get()
        }
    }, [])
    
    return (
        <div className=" flex flex-col gap-8 p-8" style={{width:"calc(100vw - 4rem)"}}>
                <h1 className="text-center" style={{width:"inherit"}}>Vyberte si kvíz</h1>
            <div className="grid grid-cols-4 gap-8" style={{width:"inherit"}}>
                {Array.from({length: 80}).map((item, index) => (
                    <QuizCard title="BALLS" author="YE"/>
                ))}
            </div>
        </div>
    )
}
