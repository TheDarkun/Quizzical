import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {QuizQuestionCheckbox} from "@/components/QuizQuestion/QuizQuestionCheckbox.jsx";
import {QuizQuestionRadio} from "@/components/QuizQuestion/QuizQuestionRadio.jsx";

export const QuizPage = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [result, setResult] = useState(null);
    
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id");
        
        if (isNaN(id) || id < 1) {
            navigate("/");
        }
        
        async function fetchQuiz() {
            try {
                const response = await axios.get(`http://localhost:5006/quiz/${id}`);
                if (response.status === 200) {
                    setQuiz(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuiz();
    }, [location])
    
    return quiz && (
        <div className="flex flex-col items-center gap-8 p-8" style={{width: "calc(100vw - 2rem)"}}>
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>{quiz.title}</CardTitle>
                    <CardDescription>{quiz.author}</CardDescription>
                </CardHeader>
            </Card>
            {result && (
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>Hodnocení</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul>
                            <li>
                                <span className="font-semibold">Počet chyb: </span>
                                <span className="font-medium text-primary">[ČÍSLO]</span>
                            </li>
                            <li>
                                <span className="font-semibold">Správné odpovědi: </span>
                                <span className="font-medium text-primary">[ČÍSLO]</span>
                            </li>
                            <li>
                                <span className="font-semibold">Úspěšnost: </span>
                                <span className="font-medium text-primary">[ČÍSLO] %</span>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            )}
            {quiz.questions.map((question, index) => (
                <>{question.multipleChoices ? (
                    <QuizQuestionCheckbox question={question} position={index + 1}/>
                ) : (
                    <QuizQuestionRadio question={question} position={index + 1}/>
                )}</>
            ))}
            <Button className="w-[300px]">Vyhodnotit</Button>
        </div>
    )
}