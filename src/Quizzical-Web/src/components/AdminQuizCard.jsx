import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

export const AdminQuizCard = ({title, author, onDeleteQuiz}) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{author}</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button onClick={onDeleteQuiz}>Smazat Kvíz</Button>
            </CardFooter>
        </Card>
    )
}