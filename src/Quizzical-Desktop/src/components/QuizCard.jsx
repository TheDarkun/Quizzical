import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.jsx";

export const QuizCard = ({title, author, link}) => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{author}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Link to={`quiz?id=${link}`}>
                    <Button>Zkusit Kvíz</Button>
                </Link>
            </CardFooter>
        </Card>
    )
}