import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {RadioGroup} from "@/components/ui/radio-group.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {useEffect, useState} from "react";

export const QuizQuestionCheckbox = ({question, position, response, result}) => {
    
    const {
        answers,
        questionId,
        prompt,
    } = question;
    
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    
    useEffect(() => {
        setShuffledAnswers(answers.sort(() => Math.random() - 0.5))
    }, [question])
    
    const handleCheckChange = (e, i) => {
        if (e) {
            response.push(answers[i].text)
        } else {
            const index = response.indexOf(answers[i].text);
            if (index > -1) { // Ensure the item exists in the array
                response.splice(index, 1);
            }
        }
        console.log(answers[i].text);
        // response[i] = e;
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

        if (result.length === 0 && response.includes(e)) {
            return "bg-correct";
        }
        
        if (response.includes(e) && result.includes(e)) {
            return "bg-correct"
        }

        if (response.includes(e) && !result.includes(e)) {
            return "bg-destructive"
        }
        
        if (!response.includes(e) && result.includes(e)) {
            return "bg-correct"
        }
    }
    
    return (
        <Card className={`w-[600px] ${resultStyle}`}>
            <CardHeader>
                <CardTitle>{position}. {prompt}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup  defaultValue="option-one">
                    {shuffledAnswers.map((answer, index) => (
                        <div key={index} className={`flex items-center space-x-2 p-[1px] rounded ${getStyle(answer.text)}`}>
                            <Label htmlFor={`${questionId}${answer.answerId}`} className="min-w-[20px]">{index + 1}. </Label>
                            <Checkbox disabled={result} onCheckedChange={(e) => handleCheckChange(e, index)} id={`${questionId}${answer.answerId}`}/>
                            <Label className="peer-disabled:opacity-100" htmlFor={`${questionId}${answer.answerId}`}>{answer.text}</Label>
                        </div>
                    ))}
                </RadioGroup>
            </CardContent>
        </Card>
    )
}