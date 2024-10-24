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
            <aside className="">
                <Card className="h-full flex flex-col p-8 font-normal">
                    <a className="hover:text-primary" href="#project">O projektu</a>
                    <a className="hover:text-primary" href="#usecases">Ukázky použití</a>
                    <a href="#login" className="ml-8 hover:text-primary">Přihlášení a účast kvízu</a>
                    <a href="#table" className="ml-8 hover:text-primary">Veřejná tabulka</a>
                    <a href="#desktop" className="ml-8 hover:text-primary">Desktopová aplikace</a>
                    <a className="hover:text-primary" href="#install">Instalace a spuštění</a>
                    <a href="#frontend-install" className="ml-8 hover:text-primary">Frontend (Webová aplikace)</a>
                    <a href="#backend-install" className="ml-8 hover:text-primary">Backend (Server)</a>
                    <a href="#desktop-install" className="ml-8 hover:text-primary">Desktopová aplikace</a>
                </Card>
            </aside>

            <main className="flex flex-col gap-8 leading-7 overflow-y-auto">
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
                    <h2 id="project">O projektu</h2>
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
                <div className="flex flex-col gap-4">
                    <h2 id="usecases">Ukázky použití</h2>
                    blablabla
                    <h3 id="login">Přihlášení a účast kvízu</h3>
                    Uživatelé mohou soutěžit v jednoduchém kvízu a za každou správnou odpověď získat bod.
                    <h3 id="table">Veřejná tabulka</h3>
                    Výsledky uživatelů se zobrazují ve veřejně dostupné tabulce, kde mohou sledovat své skóre.
                    <h3 id="desktop">Desktopová aplikace</h3>
                    Možnost vytvářet nové kvízové úkoly pomocí samostatné elektronové aplikace.
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h1 id="install">Instalace a spuštění</h1>
                    <h2 id="frontend-install">Frontend (Webová aplikace)</h2>
                    <p>Přejděte do adresáře <strong>Quizzical-Web</strong></p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        cd .\Quizzical-Web
                    </span>
                    <p>Nainstalujte potřebné balíčky pomocí npm <strong>(verze 22.2.20)</strong></p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        npm install
                    </span>
                    <p>Spusťte vývojový server</p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        npm run dev
                    </span>
                    <h2 id="backend-install">Backend (Server)</h2>
                    <ul>
                        <li>
                            Ujistěte se, že máte nainstalované <strong>.NET 8 SDK</strong>
                        </li>
                        <li>
                            Přejděte do adresáře <strong>Quizzical-Server</strong>
                        </li>
                    </ul>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        cd .\Quizzical-Server
                    </span>
                    <p>Spusťte server</p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        dotnet run
                    </span>
                    <h2 id="desktop-install">Desktopová aplikace</h2>
                    <p>Přejděte do adresáře <strong>Quizzical-Desktop</strong></p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        cd .\Quizzical-Desktop
                    </span>
                    <p>Nainstalujte potřebné balíčky pomocí npm <strong>(verze 22.2.20)</strong></p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        npm install
                    </span>
                    <p>Spusťte vývojový server</p>
                    <span
                        className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm ring-offset-background font-mono">
                        npm run dev
                    </span>
                </div>
            </main>
        </>
    )
}

