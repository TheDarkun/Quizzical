import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";
import { useOutletContext } from "react-router-dom";

export const DashboardInfoPage = () => {
    
    const profile = useOutletContext()[0];
    
    return (
        <div className="flex flex-col gap-8 w-1/2">
            {profile ? (
                <>
                    <h1>Vítejte {profile.name}</h1>
                    <div className="flex items-center justify-stretch gap-8">
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle>Vytvořené Kvízy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{profile.createdQuizzes}</p>
                            </CardContent>
                        </Card>
                        <Card className="flex-1">
                            <CardHeader>
                                <CardTitle>Splněné Kvízy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>{profile.completedQuizzes}</p>
                            </CardContent>
                        </Card>
                    </div>
                </>
            ) : <div></div>}
        </div>
    )
}