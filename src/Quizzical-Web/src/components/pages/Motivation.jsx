import {Card} from "@/components/ui/card.jsx";

export const Motivation = () => {
    return (
        <>
            <aside className="">
                <Card className="h-full flex flex-col p-8 font-normal">
                    <ul>
                        <li><a href="#x">Programování na SPŠ a VOŠ Kladno</a></li>
                    </ul>
                </Card>
            </aside>

            <main className="flex flex-col gap-8 leading-7 overflow-auto">
                <p>Originální zdroj: <a className="text-primary" href="https://xeon.spskladno.cz/~holecek/Predmet_Programovani/">zde</a></p>
                <div className="flex flex-col gap-4">
                    <h1 id="x">Programování na SPŠ a VOŠ Kladno</h1>
                    <p>Tato stránka shrnuje informace o předmětu Programování na škole SPŠ a VOŠ Kladno.
                        Najdete zde informace o náplni předmětu v jednotlivých ročnících a odkazy na studijní materiály a externí stránky využívané ve výuce.</p>
                    <p>Rozcestník na stránky učitelů:</p>
                    <ul>
                        <li><a className="text-primary" href="https://xeon.spskladno.cz/~podrazky/informace.html">Pavel Podrazký</a></li>
                        <li><a className="text-primary" href="https://xeon.spskladno.cz/~koudelka/info_programovani_koudelka.html">Koudelka Matěj</a></li>
                        <li><a className="text-primary" href="https://xeon.spskladno.cz/~holecek/Predmet_Programovani/programovani_osobni_holecek.html">Jaroslav Holeček</a></li>
                    </ul>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>Samostatný a Skupinový projekt projekt</h2>
                    <p>V průběhu <strong>1.-3. ročníku</strong> pracují studenti na <strong>Skupinovém
                        projektu</strong> (3 nebo 4 členové v skupině).<br/>V prvním ročníku si studenti vymyslí téma a
                        začnou s tvorbou webové prezentace svého (zatím neexistujícícho) programu.<br/>V každém ročníku
                        pak doplňují ke své aplikaci další funkce -&gt; samotná aplikace v Pythonu, propojení s
                        databází, případně ve 4. ročníku testy.</p>
                    <p>Ve <strong>4. ročníku</strong> každý student vytvoří svůj vlastní <strong>Samostatný
                        projekt</strong>. Samostatný projekt se jmenuje samostatný, protože na něm každý student pracuje
                        samostatně. Také se, přirozeně, vypracováním liší od všech skupinových projektů. Téma může být
                        stejné (např. při práci na Skupinovém projektu zjistíte, že by bylo lepší program navrhnout
                        jinak... To se v programování běžně stává. Nebo chcete rozšířit již existujícíc projekt - každý
                        student ale rozšiřuje projekt o svou vlastní funkcionalitu (včetně Pythonu, databáze a webovek)
                        a má svou vlastní kopii projektu). </p>
                    <p>Samostatný projekt je <strong>nutná</strong> práce pro připuštění k maturitě (získání
                        hodnocení &lt; 5 ve čtvrtém ročníku) -&gt; bez odevzdání Samostatného projektu
                        se <strong>všemi</strong> požadovánými částmi je student hodnocen nedostatečně - projekt pak
                        musí dodělat v průběhu prázdnin k reparátu, nebo při opakování ročníku.<br/>Při praktické
                        maturitní zkoušce (pokud si vylosujete otázku z Programování) bude Váš úkol, pracovat s Vaším
                        Samostatným projektem - bez jeho odevzdání tedy ani nemá smysl k maturitní zkoušce chodit...</p>
                    <hr/>
                    <h3>Specifikace Samostatného a Skupinového projektu</h3>
                    <p>Skupinový projekt je práce 3-4 členné skupinky (tedy ne 2 a méně a ne 5 a více lidí). Samostaný
                        projekt je práce jednoho člověka.</p>
                    <p>Skupina si zvolí vedoucího (ten se v průběhu studia mění tak, aby každý ze skupiny byl alespoň
                        jedno pololetí vedoucí). A každý člen skupiny má přiřazeny konkrétní body, na kterých pracuje
                        (samozřejmě může např. na webu pracovat více lidí, potom je ale konkrétně rozdělena práce v
                        rámci webu atd.). Množství práce je rozloženo rovnoměrně. Za správu úkolů a jejich evidenci
                        odpovídá vedoucí skupiny.</p>
                    <p>Každý ve skupině se také seznámí s částmi programu, na kterých nepracoval - do takové úrovně, aby
                        byl schopný principiálně vysvětlit jak fungují a byl v nich schopen provést úpravy/opravy.</p>
                    <p>Samostatný projekt má stejné minimální požadavky jako Skupinový.</p>
                    <p>Minimální požadavky (samozřejmě můžete přidat cokoliv navíc):</p>
                    <ol>
                        <li>
                            Projekt je (nejpozději od druhého ročníku) uložen na Gitu.
                        </li>
                        <li>Webová prezentace projektu
                            <ol>
                                <li>Stručný popis programu, jeho funkce, ukázky použití</li>
                                <li>Seznam použitých algoritmů (včetně pseudokódu/vývojového diagramu/ER diagramu) a
                                    knihoven
                                </li>
                                <li>Seznam autorů</li>
                                <li>Odkaz na Git pro stažení.</li>
                                <li>Možnost přihlášení uživatele + různý obsah pro přihlášeného/nepřihlášeného
                                    uživatele.
                                </li>
                                <li>Zobrazení databázových dat (výsledky programu, žebříček hráčů, seznam registrovaných
                                    uživatelů, a pod.)
                                </li>
                                <li>Po přihlášení na web jako admin lze mazat data z databáze.</li>
                            </ol>
                        </li>
                        <li>Aplikace v Pythonu
                            <ol>
                                <li>Grafické rozhraní - např. v PyQt</li>
                                <li>Grafické zobrazení - např. Pygame či knihovna pro zobrazení grafů a jejich
                                    zpracování a pod.
                                </li>
                                <li>Ukládá a načítá data z/do databáze - výsledky hry/výpočtu, záznamy o použití a
                                    pod.
                                </li>
                                <li>Ukládá a načítá data z/do souboru - např. uživatelské nastavení, poslední použité
                                    hodnoty a pod.
                                </li>
                                <li>Dokumentace kódu dle konvencí jazyka - minimálně dokumentace funkcí a tříd</li>
                            </ol>
                        </li>
                        <li>Databáze
                            <ol>
                                <li>K databázi je zakreslen ER-diagram</li>
                                <li>Využívá vztahy typu 1:N i M:N (tedy i JOIN při čtení dat)</li>
                                <li>Má vytvořené skripty pro tvorbu tabulek (CREATE), vložení několika vzorových dat
                                    (INSERT) do každé tabulky (např. 3 záznamy do každé tabulky) a získání vzorových dat
                                    z tabulek (SELECT, JOIN) včetně filtrování, řazení, seskupování a vyhledávání
                                </li>
                                <li>Využívá atributy (datový typ, UNIQUE, NOT NULL, AUTO_INCREMENT, PK, FK, DEFAULT)
                                </li>
                                <li>Upravuje data v databázi (UPDATE, DELETE)</li>
                                <li>Rozumí nastavení DELETE ON CASCADE</li>
                                <li>Databáze je normalizovaná minimálně po <a
                                    href="https://cs.wikipedia.org/wiki/Boyceho%E2%80%93Coddova_norm%C3%A1ln%C3%AD_forma">Boyceho-Coddovu
                                    normu </a> viz také <a
                                    href="https://cs.wikipedia.org/wiki/Normalizace_datab%C3%A1ze">Normalizace
                                    databáze</a></li>
                                <li>S databází komunikuje přes webové rozhraní (připravené dotazy), vlastní webové
                                    stránky i přes Python
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>Technologie</h2>
                    <p>Veškeré technologie používané v předmětu programování jsou volně přístupné a můžete si je tedy
                        zdarma bez jakýchkoliv omezení stáhnout domů.</p>
                    <p>Programovací jazyk <a href="https://www.python.org">Python</a> a jazyk <a
                        href="https://cs.wikipedia.org/wiki/C_(programovac%C3%AD_jazyk)">C</a></p>
                    <p>Pro Python je ve škole připravené <a href="https://www.jetbrains.com/pycharm/download/">IDE
                        Pycharm</a> - zcela nám stačí Community verze. Také je možné pracovat ve <a
                        href="https://code.visualstudio.com/">Visual Studio Code</a></p>
                    <p>Webové stránky na straně klienta v HTML a CSS (případně JavaScript) jsou pouze textové soubory -
                        využijte tedy libovolný textový editor (ve škole např. SublimeText, nebo VSC) a libovolný webový
                        prohlížeč</p>
                    <p>Webové stránky na straně serveru budeme ve škole tvořit přes <a
                        href="https://www.php.net/">PHP</a>, případně v určených Python knihovnách (dle učitele).
                        Samotný kód je pouze textový soubor. Spustit kód (zobrazit stránku) je potřeba přes PHP server,
                        případně přes "Python server" (viz níže). </p>
                    <p>Databázový server školy běží na technologii <a href="https://mariadb.org/">MariaDB</a>.</p>
                    <p>V jazyku C budeme zkoušet pouze zcela základní věci a postačí nám libovolný kompilátor - např. <a
                        href="MinGW">https://sourceforge.net/projects/mingw/</a></p>
                    <p>Pro jazyk C je ve škole připravené IDE Dev C++ s již přednastaveným kompilátorem.</p>
                    <p>Pro připojení ke Git serveru (např. GitHub nebo GitLab) můžete využít <a href="navody.html#git">návod
                        na Git</a></p>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>Školní prostor</h2>
                    <h3>Disk H://</h3>
                    <p>Ve škole má každý student i učitel vytvořený svůj prostor na disku H://. Tento prostor je
                        přístupný i přes internet z domova.</p>
                    <p>Pro vzdálené (z domova) připojení k vašemu disku H:// můžete na Windows využít např. <a
                        href="https://winscp.net/eng/download.php">WinSCP</a> - host: xeon.spskladno.cz - port: 922 -
                        login a heslo: váš školní login a heslo</p>
                    <p>Pro vzdálené připojení z Linuxu můžete použít např.
                        sftp://[vas_login]@xeon.spskladno.cz:922/mnt/data2/home/[vas_login] - lze použít i přímo v
                        prohlížeči souborů (záložka "+ Další umístění" a políčko vpravo dole).</p>
                    <hr/>
                    <h3>Python</h3>
                    <p>Pycharm i Python ve škole naleznete na disku G://win32app/ == Aplikace SPŠ a VOŠ<br/>Ve škole je
                        verze 2017, která (s Pythonem 3.7) bohatě postačuje pro základní věci.<br/>Ve škole je Python
                        3.7 a také Python 3.10.</p>
                    <p>Pro pokročilejší práci (s knihovnami) si stáhněte <a
                        href="https://www.jetbrains.com/pycharm/download/">aktuální verzi PyCharm Community</a> (školní
                        počítač Vám sice zahlásí potřebu přihlášení jako správce, ale po odkliknutí "Ne" se program bez
                        problému nainstaluje do Vašeho osobního prostoru). Při (prvním) vytváření projektu v rámci
                        PyCharm máte možnost rovnou stáhnout i nejnovější Python.</p>
                    <p>Poznámka: Ve škole volte při vytváření nového projektu v Pythonu "Virtual environment" - zabere
                        sice poměrně dost místa na hard/flash disku, ale umožní vám doinstalovávat libovolné knihovny
                        (což je jedna z podstaty práce v Pythonu).</p>
                    <a href="navody.html#Pycharm_Python">Návod k PyCharmu a Pythonu</a>
                    <p>Poznámka 2: Neváhejte si přinést vlastní flash disk, na který si můžete vytvořit školní Virtual
                        environment. I tak ale doporučujeme na konci hodiny zkopírovat projekt (pouze zdrojové kódy, ne
                        venv) na váš školní disk H:</p>
                    <hr/>
                    <h3>C</h3>
                    <p>Ve škole lze využít IDE Dev C++ x64 pro Win10 -&gt; nezapomeňte případné další vytvářené soubory
                        "Přidávat do projektu".</p>
                    <p>Doma lze využít např. IDE Netbeans a kompilátor MinGW</p>
                    <a href="navody.html#NetBeans_C">Návod k NetBeans a C</a>
                    <hr/>
                    <h3>Dynamický web - PHP server</h3>
                    <p>Školní PHP server je pro vás přístupný i z domova ( přes váš prostor na disku H://public_html/,
                        ke kterému se můžete z domova připojit ). Spuštění souborů uložených zde potom provedete přes
                        prohlížeč na adrese https://xeon.spskladno.cz/~[vas_login]/ . </p>
                    <p>Vaše stránky/soubory musí být uloženy na vašem disku H:// ve složce <i>public_html</i>, ty, ve
                        kterých chcete spouštět PHP kód musí mít příponu <i>.php</i> (pozor, Windows často neukazuje
                        přípony a je nutné jejich zobrazování zapnout v prohlížeči souborů) a je potřeba nastavit <a
                            href="https://cs.wikipedia.org/wiki/P%C5%99%C3%ADstupov%C3%A1_pr%C3%A1va_v_Unixu">přístupová
                            práva</a> (například přes WinSCP) - vaše složka (login): 0711 - složka public_html: 0755 -
                        všechny soubory a složky uvnitř: 0755</p>
                    <p>Při připojení přes WinSCP vyplňujte hostname: xeon.spskladno.cz , port: 922, login a heslo vaše
                        školní. - Práva je třeba nastavit vaší [login] složce (je třeba vyskočit o úroveň výše) a dále
                        složce public_html a všem souborùm uvnitř ní. </p>
                    <hr/>
                    <h3>Databáze - Databázový server</h3>
                    <p>Databázový server má adresu <a href="http://dbs.spskladno.cz">http://dbs.spskladno.cz</a>.
                        Přístup k serveru přes prohlížeč je na adrese <a
                            href="http://dbs.spskladno.cz/myadmin">MyAdmin</a>. Přístupové údaje vám sdělí učitel.</p>
                </div>
                <div className="flex flex-col gap-4">
                    <h2>Materiály, externí stránky</h2>
                    <p>"<strong>Skripta</strong>" ke čtení (hledejte .pdf soubory) <a
                        href="https://github.com/JaroslavHolecek/Teaching/tree/master/Programming">na GitHubu</a></p>
                    <p><strong>Jupyter notebooky</strong> ke čtení a vyplňování (kliknutím na modré tlačítko a
                        přihlášením Google účtem lze spouštět i v prohlížeči) <a
                            href="https://github.com/JaroslavHolecek/Teaching/tree/master/JupyterNotebook">na
                            GitHubu</a>, případně offline lze spouštět programem <a
                            href="https://jupyter.org/">Jupyter</a></p>
                    <p>Demo a ukázkové programy <a
                        href="https://github.com/JaroslavHolecek/Teaching/tree/master/Program/ExampleDone">na
                        GitHubu</a></p>
                    <p>Tutoriály a dokumentace k procházení:</p>
                    <ul>
                        <li><a
                            href="https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web">MDN</a> -
                            webové stránky s tutoriály a ukázkami pro webové stránky a aplikace, přímo od vývojářů
                            Mozilly.
                        </li>
                        <li><a href="https://www.w3schools.com/">W3Schools</a> - mnoho a mnoho programovacích jazyků
                            včetně všech, ve kterých pracujeme ve škole
                        </li>
                        <li><a href="https://algoritmy.net/">Algoritmy.net</a> - mnoho dobře vysvětlených algoritmů s
                            pěknými ukázkami
                        </li>
                        <li><a href="https://www.youtube.com/c/LucieLenertova">Video tutoriál</a> se základy Pythonu
                        </li>
                        <li><a href="https://naucse.python.cz/">NaucsePython</a> mimo jiné pro <a
                            href="https://naucse.python.cz/lessons/intro/pyqt/">PyQt</a> - okenní knihovnu pro Python
                        </li>
                        <li><a href="https://www.pygame.org/docs/">PyGame</a> - 2D grafická/herní knihovna pro Python
                        </li>
                    </ul>
                    <p><a href="https://www.umimeinformatiku.cz/">UmímeTo</a> na domácí úkoly, hraní, trénování a
                        procvičování - pro účet se obraťte na svého učitele Programování, případně Jaroslava Holečka</p>
                    <p><a href="https://www.codingame.com/">Codingame</a> na hraní, procvičování a odkoukávání </p>
                    <p><a href="https://draw.io">Draw.IO</a> - nástroj pro nákres nejrůznějších diagramů</p>
                    <p><a href="https://drawsql.app">DrawSQL</a> - příjemné prostředí pro tvorbu ER diagramů a
                        generování SQL kódu pro vytvoření tabulek z nich</p>
                    <p>Do začátku:</p>
                    <ul>
                        <li><a href="https://robomise.cz/">Robomise </a></li>
                        <li><a href="https://scratch.mit.edu/educators/">Scratch</a></li>
                        <li><a href="https://code.org/">Code.org</a></li>
                        <li><a href="https://blockly.games/">Blockly</a></li>
                        <li><a
                            href="https://imysleni.cz/informaticke-mysleni/inspiromat/inspiromat-souteze">iMyšlení</a>
                        </li>
                    </ul>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>Maturita</h2>
                    <h3>Ústní maturita</h3>
                    <p>Při ústní maturitě máte za úkol 15 minut hovořit na téma dle vylosované otázky.</p>
                    <p>Pokud budete mít jako zkoušejícího Jaroslava Holečka (záleží na třídě a na konkrétní vylosované
                        otázce), bude mít za úkol odpovědět (minimálně) na sadu konkrétních dotazů - dotazy budou
                        vybrány na základě vylosované otázky a jejich celkový přehled (je to přehled pouze pro otázky u
                        kterých je zkoušející Jaroslav Holeček, <strong>nikoliv pro celou ústní maturitní
                            zkoušku</strong>) je <a
                            href="https://docs.google.com/spreadsheets/d/1T3J04Ay_pRlEFoF1okgreEY69_IQuuwO2vrjN_eTiVU/edit?usp=sharing">zde</a>
                    </p>
                    <hr/>
                    <h3>Praktická maturita</h3>
                    <p>Vaším úkolem při praktické maturitní zkoušce bude vytvořit prezentaci/představení/dokumentaci
                        vašeho Samostatného projektu pro vylosovanou cílovou skupinu (uživatel, investor, nový kolega do
                        týmu, ...). Každou z těchto skupin samozřejmě zajímá něco jiného - uživatele zajímá, jak se
                        program používá a co umí; kolegu zajímá, jaká je struktura kódu, jaké technologie a knihovny
                        používáte, jak je spolu vše propojeno atd.<br/>
                        Také budete mít za úkol do programu přidat novou funkci/něco v programu změnit (dle zadání
                        učitele).<br/>
                        V zadání maturitní otázky bude přesně specifikované, co má vaše prezentace obsahovat - nebudou
                        to žádné chytáky a vysvětlit požadované věci bude pro někoho, kdo program vytvářel, velmi
                        jednoduché.<br/>K dispozici budete mít pouze Váš samostatný projekt.<br/>Internet u maturitní
                        zkoušky není k dispozici.</p>
                </div>
                <hr/>
                <div className="flex flex-col gap-4">
                    <h2>Náplň předmětu</h2>
                    <p>Náplň předmětu se řídí <a href="https://www.spskladno.cz/verejne_doc.php">Školním vzdělávacím
                        programem</a> pro každý obor.<br/>V předmětu Programování se student minimálně naučí vytvářet
                        webové stránky na straně klienta pomocí HTML a CSS (případně JavaScript), a webové stránky na
                        straně serveru pomocí PHP či Python (dle učitele), vytvářet programy ve vyšším programovacím
                        jazyku (aktuálně Python a základy C pro vyzkoušení odlišnosti práce s kompilovaným jazykem) a
                        vytvářet a manipulovat s databází pomocí SQL (přímo, přes webové stránky i přes Python).<br/>V
                        Pythonu se student naučí vytvářet konzolové aplikace, okenní aplikace formulářového typu
                        (vstupní políčka, tlačítka) i "herního typu" (ovládání grafických objektů myší, klávesnicí,
                        počítání bodů, ...) a zobrazování dat v grafech.<br/>V jazyku C se student naučí základní
                        programové konstrukce a datové typy včetně pointerů (dynamická správa paměti je již doplněk
                        navíc pro šikovnější studenty/skupiny). <br/>Zde zapsané body jsou pouze minimální společné
                        požadavky pro všechny třídy/obory - dle zkušeností, zájmu a dohody učitele a studentů se v
                        hodinách budete věnovat i dalším tématům, připadně začnete témata z vyšších ročníků.</p>
                </div>
            </main>
        </>
    )
}