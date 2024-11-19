import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";

export const DashboardInfoPage = () => {

    const [profile, setProfile] = useState({});
    
    const [jwtToken, setJwtToken, deleteJwtToken] = useLocalStorage("jwtToken");
    const [refreshToken, setRefreshToken, deleteRefreshToken] = useLocalStorage("refreshToken");

    const navigate = useNavigate();
    
    useEffect( () => {
        async function fetchData() {
            try {
                await fetchProfile();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    try {
                        await refreshAuthTokens();
                        await fetchProfile(); // Retry the original request with refreshed tokens
                    } catch (e) {
                        deleteRefreshToken();
                        deleteJwtToken();
                        navigate("/");
                    }
                } else {
                    console.error("Profile fetch error:", error);
                }
            }
        }
        fetchData();
    }, [])

    const fetchProfile = async () => {
        const response = await axios.get("http://localhost:5006/profile",
            { headers: { Authorization: `Bearer ${jwtToken()}` } }
        );
        setProfile(response.data);
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