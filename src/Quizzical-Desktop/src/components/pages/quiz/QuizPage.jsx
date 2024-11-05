import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";

export const QuizPage = () => {
    return (
        <div className="flex flex-col items-center gap-8 p-8" style={{width: "calc(100vw - 2rem)"}}>
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>[NÁZEV KVÍZU]</CardTitle>
                    <CardDescription>[JMÉNO AUTORA]</CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
            </Card>
            {Array.from({length: 4}).map((_, index) => (
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>[ČÍSLO OTÁZKY]. [OTÁZKA]</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-one" className="min-w-[20px]">1. </Label>
                                <RadioGroupItem value="option-one" id="option-one"/>
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">2. </Label>
                                <RadioGroupItem value="option-two" id="option-two"/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">3. </Label>
                                <RadioGroupItem value="option-two" id="option-two"/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">4. </Label>
                                <RadioGroupItem value="option-two" id="option-two"/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
            {Array.from({length: 3}).map((_, index) => (
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>[ČÍSLO OTÁZKY]. [OTÁZKA]</CardTitle>
                    </CardHeader>
                    <CardContent>

                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-one" className="min-w-[20px]">1. </Label>
                                <Checkbox/>
                                <Label htmlFor="option-one">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">2. </Label>
                                <Checkbox/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">3. </Label>
                                <Checkbox/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Label htmlFor="option-two" className="min-w-[20px]">4. </Label>
                                <Checkbox/>
                                <Label htmlFor="option-two">Option One</Label>
                            </div>
                        </RadioGroup>
                    </CardContent>
                </Card>
            ))}
            <Button className="w-[300px]">Vyhodnotit</Button>
        </div>
    )
}