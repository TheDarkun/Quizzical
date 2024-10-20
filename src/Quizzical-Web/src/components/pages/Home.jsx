import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export const Home = () => {
    return (
        <>
            <aside>
                <Card className="h-full">
                    aside
                </Card>
            </aside>

            <main className="flex flex-col gap-8 leading-7">
                <div className="flex flex-col gap-4">
                    <h1>Quizzical 🎓 - Jednoduchá kvízová platforma</h1>
                    <p>
                        <strong>Quizzical</strong> je ořezaná verze Kahootu, kterou jsem vytvořil jako svůj samostatný
                        maturitní
                        projekt. Aplikace umožňuje snadno vytvářet a odpovídat na kvízy, přičemž výsledky se zobrazují
                        ve veřejné tabulce. Hlavním cílem je poskytnout jednoduchý, ale efektivní způsob, jak soutěžit v
                        kvízech, a sledovat skóre uživatelů.
                    </p>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>O projektu</h2>
                    <p><strong>Quizzical</strong> je interaktivní kvízová aplikace, která uživatelům umožňuje zodpovědět
                        otázky z
                        jednoho
                        jednoduchého kvízu a získat za to body. Výsledky se následně zobrazují v přehledné veřejné
                        tabulce.
                        Aplikace využívá moderní webové technologie, díky čemuž nabízí rychlé a intuitivní prostředí pro
                        uživatele.</p>
                    <ul>
                        <li>
                            <strong>Frontend</strong>: React + ShadCN - Kombinace Reactu a knihovny ShadCN pro rychlé a
                            elegantní uživatelské rozhraní.
                        </li>
                        <li>
                            <strong>Backend</strong>: ASP.NET FastEndpoints - Lehký a rychlý framework pro tvorbu API.
                            FastEndpoints umožňuje rychlé nasazení RESTových služeb s minimálním overheadem a skvělou
                            výkonností.
                        </li>
                        <li>
                            <strong>Databáze</strong>: SQLite - Jednoduchá, lehká databáze ideální pro malé projekty,
                            kde není potřeba komplexní správa dat.
                        </li>
                        <li>
                            <strong>Desktop</strong>: Electron + React + ShadCN - Pro zajištění přehledné a uživatelsky
                            přívětivé správy úkolů je použita Electronová aplikace, která běží na Reactu.
                        </li>
                    </ul>
                </div>
                <hr/>
                
            </main>
        </>
    )
}

