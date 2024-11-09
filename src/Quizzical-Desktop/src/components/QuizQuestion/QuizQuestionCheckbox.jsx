import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {useEffect} from "react";

export const QuizQuestionCheckbox = ({question, position}) => {
    
    const {
        answers,
        questionId,
        prompt,
    } = question;
    
    useEffect(() => {
        console.log(question)
    }, [question])
    
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <CardTitle>{position}. {prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup defaultValue="option-one">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Label htmlFor={`${questionId}${answer.answerId}`} className="min-w-[20px]">{index + 1}. </Label>
                            <Checkbox id={`${questionId}${answer.answerId}`}/>
                            <Label htmlFor={`${questionId}${answer.answerId}`}>{answer.text}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}