import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";
import {AdminQuizCard} from "@/components/AdminQuizCard.jsx";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import {useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export const DashboardAdmin = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(null);
    const [pageCount, setPageCount] = useState(null);

    const profile = useOutletContext()[0];
    const role = useOutletContext()[1];
    const jwtToken = useOutletContext()[2];
    useEffect(() => {
        
        if (role !== "Admin"){
            navigate("/dashboard");
        } 
        
        async function fetchPageCount() {
            try {
                const response = await axios.get("http://localhost:5006/quiz/page");
                if (response.status === 200) {
                    setPageCount(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchPageCount();

    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id") || "1";
        if (id <= 0) {
            navigate("/dashboard/admin");
        } else {
            setCurrentPage(id);
        }
    }, [location]);

    useEffect(() => {

        if (pageCount === null)
            return;

        const queryParams = new URLSearchParams(location.search);
        const id = queryParams.get("id") || "1";

        if (id > pageCount) {
            navigate(`?id=${pageCount}`);
        }

        async function fetchQuizzes() {
            try {
                const response = await axios.get(`http://localhost:5006/quiz/page/${currentPage}`);
                if (response.status === 200) {
                    setQuizzes(response.data);
                }
            } catch (error) {
                console.warn(error);
            }
        }
        console.log("Current page is: ", currentPage);


        if (currentPage === null)
            return;

        fetchQuizzes();
    }, [currentPage, navigate, pageCount])
    
    const handleDeleteQuiz = async (index) => {
        await axios.delete(`http://localhost:5006/quiz/${index}`, { headers: { Authorization: `Bearer ${jwtToken}` } });
    }
    
    return pageCount && (
        <div className="flex flex-col gap-8">
            <h1>Vítejte {profile.name}</h1>
            <div className="grid grid-cols-3 gap-8">
                {quizzes && quizzes.map((item) => (
                    <AdminQuizCard key={item.id} title={item.title} author={`${item.author} ${item.id}`} onDeleteQuiz={() => handleDeleteQuiz(item.id)} />
                ))}
            </div>

            <Pagination>
                <PaginationContent className="!text-foreground">
                    <PaginationItem>
                        <PaginationPrevious  to={`?id=${+currentPage - 1}`} className={`!text-foreground ${currentPage === "1" && "opacity-50 pointer-events-none cursor-default hover:bg-transparent hover:cursor-default"}`}/>
                    </PaginationItem>
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <PaginationItem>
                            <PaginationLink key={index} to={`?id=${index + 1}`} className="!text-foreground">{index + 1} </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext to={`?id=${+currentPage + 1}`} className={`!text-foreground ${+currentPage === pageCount && "opacity-50 pointer-events-none cursor-default hover:bg-transparent hover:cursor-default"}`}/>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}