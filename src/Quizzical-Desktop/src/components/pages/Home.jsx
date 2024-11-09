import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Check, ChevronRight} from "lucide-react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {QuizCard} from "@/components/QuizCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination.jsx";
import * as React from "react";


export const Home = () => {
    
    const location = useLocation();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(null);
    const [pageCount, setPageCount] = useState(null);
    
    useEffect(() => {
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
            navigate("/");
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
    
    return pageCount && (
        <div className=" flex flex-col gap-8 p-8" style={{width:"calc(100vw - 4rem)"}}>
                <h1 className="text-center" style={{width:"inherit"}}>Vyberte si kvíz</h1>
            <div className="grid grid-cols-4 gap-8" style={{width:"inherit"}}>
                {quizzes && quizzes.map((item) => (
                    <QuizCard key={item.id} title={item.title} author={`${item.author} ${item.id}`} link={item.id} />
                ))}
            </div>
            <Pagination>
                <PaginationContent className="!text-foreground">
                    <PaginationItem>
                        <PaginationPrevious  to={`?id=${+currentPage - 1}`} className={`!text-foreground ${currentPage === "1" && "opacity-50 pointer-events-none cursor-default hover:bg-transparent hover:cursor-default"}`}/>
                    </PaginationItem>
                    {Array.from({ length: pageCount }).map((_, index) => (
                        <PaginationItem>
                            <PaginationLink to={`?id=${index + 1}`} className="!text-foreground">{index + 1}</PaginationLink>
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
