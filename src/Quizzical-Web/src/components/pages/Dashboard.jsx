import {Card} from "@/components/ui/card.jsx";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLocalStorage} from "@/hooks/useLocalStorage.js";
import {jwtDecode} from "jwt-decode";

export const Dashboard = () => {

    const [profile, setProfile] = useState({});
    const [role, setRole] = useState("User");
    
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

        const decoded = jwtDecode(jwtToken());
        setRole(decoded.role);
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
        <>
            <aside className="">
                <Card className="h-full flex flex-col p-8 font-normal">
                    <Link className="hover:text-primary" to="/dashboard" >Základní informace</Link>
                    {role === "Admin" && <Link className="hover:text-primary" to="/dashboard/admin" >Admin</Link>}

                </Card>
            </aside>

            <main>
                <Outlet context={[profile, role, jwtToken()]}/>
            </main>
        </>
    )
}