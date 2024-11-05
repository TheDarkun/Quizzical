import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";

export const DashboardInfoPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <h1>Vítejte (JMÉNO)</h1>
            <div className="flex items-center justify-stretch gap-8">
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Vytvořené Kvízy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>6</p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Splněné Kvízy</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>215</p>
                    </CardContent>
                </Card >
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Správné odpovědi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>4562</p>
                    </CardContent>
                </Card>
                <Card className="flex-1">
                    <CardHeader>
                        <CardTitle>Špatné odpovědi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>89</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}