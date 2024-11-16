import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Checkbox } from "@/components/ui/checkbox.jsx";
import { useState } from "react";
import axios from "axios";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";
import {useNavigate} from "react-router-dom";

export const CreateQuiz = () => {
    const defaultQuestion = {
        prompt: "",
        answers: [
            { 
                text: "",
                isCorrect: false
            },
            { 
                text: "",
                isCorrect: false
            }
        ]
    };
    const [title, setTitle] = useState("");
    const [questions, setQuestions] = useState([]);
    const [jwtToken, setJwtToken, deleteJwtToken] = useLocalStorage("jwtToken");
    const [refreshToken, setRefreshToken, deleteRefreshToken] = useLocalStorage("refreshToken");
    
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleNewQuestion = () => {
        setQuestions((prevQuestions) => [...prevQuestions, defaultQuestion]);
    };

    const handleNewAnswer = (questionIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, index) =>
                index === questionIndex
                    ? {
                        ...q,
                        answers: [...q.answers, { text: "", isCorrect: false }]
                    }
                    : q
            )
        );
    };

    const handleAnswerChange = (questionIndex, answerIndex, newText) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, qIdx) =>
                qIdx === questionIndex
                    ? {
                        ...q,
                        answers: q.answers.map((ans, aIdx) =>
                            aIdx === answerIndex
                                ? { ...ans, text: newText }
                                : ans
                        )
                    }
                    : q
            )
        );
    };

    const handleCheckChange = (state, questionIndex, answerIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((q, qIdx) =>
                qIdx === questionIndex
                    ? {
                        ...q,
                        answers: q.answers.map((ans, aIdx) =>
                            aIdx === answerIndex
                                ? { ...ans, isCorrect: state }
                                : ans
                        )
                    }
                    : q
            )
        );
    }
    
    const handleDeleteAnswer = (questionIndex, answerIndex) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question, qIdx) =>
                qIdx === questionIndex
                    ? {
                        ...question,
                        answers: question.answers.filter((_, aIdx) => aIdx !== answerIndex)
                    }
                    : question
            )
        );
    };

    const deleteQuestion = (index) => {
        setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
    };

    const handleSubmitQuiz = async () => {
        try {
            await submitQuizRequest();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                try {
                    await refreshAuthTokens();
                    await submitQuizRequest(); // Retry the original request with refreshed tokens
                } catch (e) {
                    deleteRefreshToken();
                    deleteJwtToken();
                    navigate("/");
                }
            } else {
                console.error("Quiz submission error:", error);
                if (error.response && error.response.status === 400) {
                    setError(error.response.data);
                }
            }
        }
    };

    const submitQuizRequest = async () => {
        const response = await axios.post("http://localhost:5006/quiz",
            { title, questions },
            { headers: { Authorization: `Bearer ${jwtToken()}` } }
        );
        navigate("/");
    };

    const refreshAuthTokens = async () => {
        const response = await axios.post("http://localhost:5006/user/refresh",
            { refreshToken: refreshToken() },
        );
        if (response.status === 200) {
            const { jwtToken: newJwtToken, refreshToken: newRefreshToken } = response.data;
            setJwtToken(newJwtToken);
            setRefreshToken(newRefreshToken);
        } else {
            navigate("/");
        }
    };


    return (
        <div className="p-8 flex flex-col items-center gap-8" style={{ width: "calc(100vw - 2rem)" }}>
            <Card className="w-[600px]">
                <CardHeader>
                    <CardTitle>Název kvízu</CardTitle>
                </CardHeader>
                <CardContent>
                    <Label>Název kvízu</Label>
                    <Input onChange={(e) => setTitle(e.target.value)} value={title} />
                </CardContent>
            </Card>

            {questions.map((question, questionIndex) => (
                <Card key={questionIndex} className="w-[600px]">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Otázka {questionIndex + 1}</CardTitle>
                        <Button onClick={() => deleteQuestion(questionIndex)}>Smazat otázku</Button>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-8">
                            <Label>Otázka</Label>
                            <Input value={question.prompt} onChange={(e) => setQuestions((prevQuestions) =>
                                prevQuestions.map((q, idx) =>
                                    idx === questionIndex ? { ...q, prompt: e.target.value } : q
                                )
                            )} />
                        </div>
                        {question.answers.map((answer, answerIndex) => (
                            <div key={answerIndex} className="flex items-end">
                                <div className="flex-grow">
                                    <Label>Odpověď {answerIndex + 1}</Label>
                                    <Input
                                        value={answer.text}
                                        onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col items-center gap-4 pb-3">
                                    <Label>Správně</Label>
                                    <Checkbox onCheckedChange={(e) => handleCheckChange(e, questionIndex, answerIndex)}/>
                                </div>
                                <div>
                                    <Button onClick={() => handleDeleteAnswer(questionIndex, answerIndex)} size="icon" className={answerIndex <= 2 && question.answers.length <= 2 ? "hidden" : ""}>X</Button>
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-center mt-8">
                            <Button onClick={() => handleNewAnswer(questionIndex)}>Přidat odpověď</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            {error && <p>{error}</p>}
            <div className="flex gap-8">
                <Button onClick={handleNewQuestion}>Přidat otázku</Button>
                <Button onClick={handleSubmitQuiz}>Vytvořit kvíz</Button>
            </div>
        </div>
    );
};
