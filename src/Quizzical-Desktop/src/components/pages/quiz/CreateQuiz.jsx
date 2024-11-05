import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";

export const CreateQuiz = () => {
    return (
        <div className="p-8 flex flex-col items-center gap-8" style={{width: "calc(100vw - 2rem)"}}>
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>Název kvízu</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Název kvízu</Label>
                    <Input/>
                </CardContent>
            </Card>

            {Array.from({length: 4}).map((_, index) => (
                <Card className="w-[600px]">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Otázka [ČÍSLO OTÁZKY]</CardTitle>
                        <Button>Smazat otázku</Button>
                    </CardHeader>
                    <CardContent>
                        <div>
                            <Label>Otázka</Label>
                            <Input></Input>
                        </div>
                        {Array.from({length: 4}).map((_, index) => (
                            <div className="flex items-end">
                                <div className="flex-grow">
                                    <Label>Odpověď [1]</Label>
                                    <Input></Input>
                                </div>

                                <div className="flex flex-col items-center gap-4 pb-3">
                                    <Label>Správně</Label>
                                    <Checkbox></Checkbox>
                                </div>
                                <div>
                                    <Button size="icon">X</Button>
                                </div>
                            </div>
                        ))}

                    </CardContent>
                </Card>
            ))}
            <div className="flex gap-8">
                <Button>Přidat otázku</Button>
                <Button>Vytvořit kvíz</Button>
            </div>
        </div>
    )
}