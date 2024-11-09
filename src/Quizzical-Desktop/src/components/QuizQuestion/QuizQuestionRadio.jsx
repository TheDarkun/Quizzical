import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";

export const QuizQuestionRadio = ({question, position}) => {
    const {
        answers,
        questionId,
        prompt,
    } = question;
    
    return (
        <Card className="w-[600px]">
            <CardHeader>
                <CardTitle>{position}. {prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup>
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <Label htmlFor={`${questionId}${answer.answerId}`} className="min-w-[20px]">{index + 1}. </Label>
                            <RadioGroupItem id={`${questionId}${answer.answerId}`} value={answer.answerId} />
                            <Label htmlFor={`${questionId}${answer.answerId}`}>{answer.text}</Label>
                        </div>
                    ))}

                </RadioGroup>
            </CardContent>
        </Card>
    )
}