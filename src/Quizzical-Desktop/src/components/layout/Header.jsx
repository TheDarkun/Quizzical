import {Button} from "@/components/ui/button.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {useLocalStorage} from "@/hooks/useLocalStorage.js";
import {useEffect} from "react";

const Header = () => {
    
    const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage("refreshToken");
    const [jwtToken, setJwtToken, removeJwtToken] = useLocalStorage("refreshToken");
    
    const location = useLocation();
    
    useEffect(() => {
        console.error(location.pathname)
        if (location.pathname !== "/login" && location.pathname !== "/register") {
            if (jwtToken() === undefined) {
                navigate("/login");
            }
        }
    }, [location.pathname])
    const navigate = useNavigate();
    
    const handleLogout = () => {
        removeRefreshToken();
        removeJwtToken();
        navigate("/login");
    }
    
    return (
        <header className="border bg-card text-card-foreground shadow-sm flex justify-between p-2 border-l-0 border-r-0 border-t-0">
            <div className="w-full">
                <Link to="/">
                    <Button variant="ghost" size="icon"><img className="h-8" src="/logo.svg" alt="logo"/></Button>
                </Link>
            </div>

            <div>
                {jwtToken() && (
                    <Link to="/create">
                        <Button className="text-foreground" variant="ghost">Vytvořit</Button>
                    </Link>
                )}
            </div>
            
            <div className=" w-full flex justify-end gap-2">
                

                {!jwtToken() ? (
                    <>
                        <Link to="/login">
                            <Button className="text-foreground" variant="ghost">Přihlášení</Button>
                        </Link>
                        <Link to="/register">
                            <Button className="text-foreground" variant="ghost">Registrace</Button>
                        </Link>
                    </>
                ) : (
                    <Button onClick={handleLogout} variant="ghost">Odhlásit</Button>
                )}
            </div>
        </header>
    )
}

export default Header;