import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {useEffect, useState} from "react";

export const QuizQuestionRadio = ({question, position, response, result}) => {
    const {
        answers,
        questionId,
        prompt,
    } = question;

    const handleCheckChange = (e) => {
        // response.fill(false)
        // response[e] = true;
        // console.log(e);
        response[0] = answers[e].text;
        console.log(answers[e].text);
    }
    
    const [resultStyle, setResultStyle] = useState(null);
    
    useEffect(() => {
        if (result !== null) {
            console.warn(result);
            if (result.length === 0) {
                setResultStyle("border-correct")
            } else {
                setResultStyle("border-destructive");
            }
        }
    }, [result])
    
    const getStyle = (e) => {
        if (resultStyle === null) {
            return 
        }
        console.log(e);
        

        if (result.length === 0 && response[0] === e) {
            return "bg-correct";
        }
        
        // ${result && result.includes(answer.text) ? "bg-red-500" : ""}
        if (response[0] === e && !result.includes(response[0])) {
            return "bg-destructive"
        }
        
        if (result.includes(e)) {
            return "bg-correct"
        }
    }
    
    return (
        <Card className={`w-[600px] ${resultStyle}`}>
            <CardHeader>
                <CardTitle>{position}. {prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup disabled={result} onValueChange={handleCheckChange}>
                    {answers.map((answer, index) => (
                        <div key={index} className={`flex items-center space-x-2 p-[1px] rounded ${getStyle(answer.text)}`}>
                            <Label htmlFor={`${questionId}${answer.answerId}`} className="min-w-[20px]">{index + 1}. </Label>
                            <RadioGroupItem id={`${questionId}${answer.answerId}`} value={index} />
                            <Label htmlFor={`${questionId}${answer.answerId}`}>{answer.text}</Label>
                        </div>
                    ))}

                </RadioGroup>
            </CardContent>
        </Card>
    )
}