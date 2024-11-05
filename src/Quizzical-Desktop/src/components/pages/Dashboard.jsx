import {Card} from "@/components/ui/card.jsx";
import {Link, Outlet} from "react-router-dom";

export const Dashboard = () => {
    return (
        <>
            <aside className="">
                <Card className="h-full flex flex-col p-8 font-normal">
                    <Link className="hover:text-primary" to="/dashboard" >Základní informace</Link>
                    <Link className="hover:text-primary" to="/dashboard/admin" >Admin</Link>

                </Card>
            </aside>

            <main>
                <Outlet/>
            </main>
        </>
    )
}