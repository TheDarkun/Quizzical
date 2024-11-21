import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {useEffect, useState} from "react";
import axios from "axios";

export const TablePage = () => {

    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        async function fetchLeaderboard() {
            try {
                const response = await axios.get("http://localhost:5006/leaderboard");
                if (response.status === 200) {
                    setLeaderboard(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeaderboard();

    }, [])
    
    return (
        <section className="absolute gap-8 z-0 w-full h-full flex flex-col items-center justify-center">
            <Table className="w-[400px] relative border bg-card text-card-foreground shadow-sm">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[120px]">Jméno hráče</TableHead>
                        <TableHead>Vytvořené kvízy</TableHead>
                        <TableHead>Vyplněné kvízy</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {leaderboard.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.createdQuizzes}</TableCell>
                            <TableCell>{row.completedQuizzes}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}
