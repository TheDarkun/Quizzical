import {Button} from "@/components/ui/button.jsx";
import {Link, Outlet} from "react-router-dom";
const Header = () => {
    return (
        <header className="border bg-card text-card-foreground shadow-sm flex justify-between p-2 border-l-0 border-r-0 border-t-0">
            <div className="w-full">
                <Link to="/">
                    <Button variant="ghost" size="icon"><img className="h-8" src="/logo.svg" alt="logo"/></Button>
                </Link>
            </div>
            <div className="w-full flex justify-center gap-2">
                <Link to="/motivation" className="text-red-500">
                    <Button variant="ghost">Motivace</Button>
                </Link>
                <Link to="/table">
                    <Button variant="ghost">Tabulka</Button>
                </Link>
            </div>
            <div className=" w-full flex justify-end gap-2">
                <Link to="/login">
                    <Button variant="ghost">Přihlášení</Button>
                </Link>
                <Link to="/register">
                    <Button variant="ghost">Registrace</Button>
                </Link>
            </div>
        </header>
    )
}

export default Header;