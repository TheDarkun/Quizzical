import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {Button} from "@/components/ui/button.jsx";

export const AdminQuizCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>(VELKÝ NÁZEV KVÍZU)</CardTitle>
                <CardDescription>(AUTOR KVÍZU)</CardDescription>
            </CardHeader>
            <CardFooter>
                <Button>Smazat Kvíz</Button>
            </CardFooter>
        </Card>
    )
}