import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {QuizQuestionCheckbox} from "@/components/QuizQuestion/QuizQuestionCheckbox.jsx";
import {QuizQuestionRadio} from "@/components/QuizQuestion/QuizQuestionRadio.jsx";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";

export const QuizPage = () => {
    
    const location = useLocation();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [response, setResponse] = useState([]);
    const [result, setResult] = useState(null);
    
    const [jwtToken, setJwtToken, deleteJwtToken] = useLocalStorage("jwtToken");
    const [refreshToken, setRefreshToken, deleteRefreshToken] = useLocalStorage("refreshToken");
    
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
                    setResponse(response.data.questions.map((question) => {
                        return []
                    }));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchQuiz();
    }, [location])
    
    useEffect(() => {
        console.log(response);
    }, [response])

    const handleSubmit = async () => {
        console.log(response)
        
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
                    console.error(error.response.data);
                }
            }
        }
    };

    const submitQuizRequest = async () => {
        const queryParams = new URLSearchParams(location.search);
        const quizId = queryParams.get("id");

        const e = await axios.post(`http://localhost:5006/quiz/results`, {
            quizId,
            response
        }, { headers: { Authorization: `Bearer ${jwtToken()}` } });
        setResult(e.data.results);
        window.scrollTo(0, 0)
        console.log(e.data);
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
        <div className="flex flex-col items-center gap-8 p-8" style={{width: "calc(100vw - 2rem)"}}>
            {quiz && (
                <Card className="w-[600px]">
                    <CardHeader>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>{quiz.author}</CardDescription>
                    </CardHeader>
                </Card>
            )}
            {quiz && quiz.questions.map((question, index) => (
                question.multipleChoices ? (
                    <QuizQuestionCheckbox key={index} question={question} response={response[index]} position={index + 1} result={result === null ? null : result[index]} />
                ) : (
                    <QuizQuestionRadio key={index} question={question} response={response[index]} position={index + 1} result={result === null ? null : result[index]} />
                )
            ))}
            {quiz && !result && (
                <Button onClick={handleSubmit} className="w-[300px]">Vyhodnotit</Button>
            )}
        </div>
    )
}