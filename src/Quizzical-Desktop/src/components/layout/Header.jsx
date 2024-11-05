import {Button} from "@/components/ui/button.jsx";
import {Link} from "react-router-dom";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
    return (
        <header className="border bg-card text-card-foreground shadow-sm flex justify-between p-2 border-l-0 border-r-0 border-t-0">
            <div className="w-full">
                <Link to="/">
                    <Button variant="ghost" size="icon"><img className="h-8" src="/logo.svg" alt="logo"/></Button>
                </Link>
            </div>

            <div>
                <Link to="/create">
                    <Button variant="ghost">Vytvořit</Button>
                </Link>
            </div>
            
            <div className=" w-full flex justify-end gap-2">
                <Link to="/login">
                    <Button variant="ghost">Přihlášení</Button>
                </Link>
                <Link to="/register">
                    <Button variant="ghost">Registrace</Button>
                </Link>

                {/*<DropdownMenu>*/}
                {/*    <DropdownMenuTrigger>*/}
                {/*        <Button variant="ghost" className="text-primary">(JMÉNO UŽIVATELE)</Button>*/}
                {/*    </DropdownMenuTrigger>*/}
                {/*    <DropdownMenuContent>*/}
                {/*        <DropdownMenuItem>*/}
                {/*            <Link to="dashboard">Profil</Link>*/}
                {/*        </DropdownMenuItem>*/}
                {/*        <DropdownMenuSeparator />*/}
                {/*        <DropdownMenuItem>Odhlásit se</DropdownMenuItem>*/}
                {/*    </DropdownMenuContent>*/}
                {/*</DropdownMenu>*/}

            </div>
        </header>
    )
}

export default Header;