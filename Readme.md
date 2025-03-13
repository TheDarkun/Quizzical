# Quizzical 🎓 - Jednoduchá kvízová platforma

**Quizzical** je ořezaná verze Kahootu, kterou jsem vytvořil jako svůj samostatný maturitní projekt. Aplikace umožňuje snadno vytvářet a odpovídat na kvízy, přičemž výsledky se zobrazují ve veřejné tabulce. Hlavním cílem je poskytnout jednoduchý, ale efektivní způsob, jak soutěžit v kvízech, a sledovat skóre uživatelů.

## Obsah
- [O projektu](#o-projektu)
- [Hlavní funkce](#hlavní-funkce)
- [Ukázky použití](#ukázky-použití)
- [Instalace a spuštění](#instalace-a-spuštění)

## O projektu

**Quizzical** je interaktivní kvízová aplikace, která uživatelům umožňuje zodpovědět otázky z jednoho jednoduchého kvízu a získat za to body. Výsledky se následně zobrazují v přehledné veřejné tabulce. Aplikace využívá moderní webové technologie, díky čemuž nabízí rychlé a intuitivní prostředí pro uživatele.

Aplikace se skládá z:

- **Frontend**: React + ShadCN - Kombinace Reactu a knihovny ShadCN pro rychlé a elegantní uživatelské rozhraní.
- **Backend**: ASP.NET FastEndpoints - Lehký a rychlý framework pro tvorbu API. FastEndpoints umožňuje rychlé nasazení RESTových služeb s minimálním overheadem a skvělou výkonností.
- **Databáze**: SQLite - Jednoduchá, lehká databáze ideální pro malé projekty, kde není potřeba komplexní správa dat.
- **Desktop aplikace**: Electron + React + ShadCN - Pro zajištění přehledné a uživatelsky přívětivé správy úkolů je použita Electronová aplikace, která běží na Reactu.

## Hlavní funkce

- **Přihlášení a účast v kvízu**: Uživatelé mohou soutěžit v jednoduchém kvízu a za každou správnou odpověď získat bod.
- **Veřejná tabulka**: Výsledky uživatelů se zobrazují ve veřejně dostupné tabulce, kde mohou sledovat své skóre.
- **Desktopová aplikace**: Možnost vytvářet nové kvízové úkoly pomocí samostatné elektronové aplikace.

## Ukázky použití

### Veřejná tabulka

Každý uživatel, který se přihlásí a zodpoví otázku kvízu, získá bod. Tyto body jsou následně viditelné ve veřejné tabulce.
<p align="center">
   <img src="https://github.com/user-attachments/assets/6639df77-e49b-4e63-80f8-467365c0cb46" alt="Alt Text" style="width:500px; height:auto;">
</p>

### Kvíz

Jednoduchý kvíz pro rychlé testování znalostí uživatelů.
<p align="center">
   <img src="https://github.com/user-attachments/assets/30455ed7-f14e-4fc7-9293-24904acae2d6" alt="Alt Text" style="width:500px; height:auto;">
</p>

### Desktopová aplikace

Pomocí Electronové aplikace můžete vytvářet nové kvízové otázky.

<p align="center">
   <img src="https://github.com/user-attachments/assets/402cceed-4dce-4ec7-b0db-667b14618e1e" alt="Alt Text" style="width:500px; height:auto;">
</p>

## Instalace a spuštění
### Pomocí binaries a bez admin práv
#### IDE
- Pokud čirou náhodou má vaše instituce VS Code z roku 2022, tak lze nainstalovat nové VS Code bez potřeby práv, protože se defaultně instaluje pro jednoho uživatele (doporučuji zaškrtnout přidání zástupce na plochu) https://code.visualstudio.com/
#### Node
- U Node je potřeba nainstalovat standalone binary https://nodejs.org/en/download
- Dále je potřeba daný zip extrahovat a v extrahovaném adresáři spustit cmd
- V cmd dočasně nastavit node.js přes `set PATH=C:\Users\User\Downloads\node-v22.14.0-win-x64\node-v22.14.0-win-x64;%PATH%`
> [!WARNING]
> Nezapomeňte změnit cestu u každého příkazu, například **User** nahraďte stancikv. Dále zkontrolujte verzi dané binary, může se mírně lišit podle toho, kdy tuto dokumentaci čtete
#### Git
- git disponuje portable verzi https://git-scm.com/downloads/win
- poté v adresáři bin se nachází **git.exe**, které lze nastavit ve vs code v nastavení **git: path** `"git.path": "C:/Users/User/Downloads/PortableGit/bin/git.exe"`
- Dále můžeme naklovat projekt za pomocí `git clone https://github.com/TheDarkun/Quizzical`

#### Web
- v Quzzical-Web stačí poté napsat `npm i` a pro spuštění `npm run dev`
- pro stylování je potřeba nainstalovat **Tailwind CSS IntelliSense** extension

#### Desktop
- Quizzical-Desktop funguje stejně, kde je potřeba prvně napsat `npm i` a poté `npm run dev`, bude také ale potřeba spustit electron v druhém cmd za pomocí `npm run electron` (je potřeba znovu dočasně nastavit node.js)

#### Server
- Dotnet funguje na podobném principu, kde je potřeba stáhnout binary https://dotnet.microsoft.com/en-us/download/dotnet/9.0
- a poté v extrahovaném adresáři znova v cmd napsat
   1. `set DOTNET_ROOT=C:\Users\User\Downloads\Quizzical\src\Quizzical-Server\sdk\9.0.201`
   2. `set PATH=C:\Users\User\Downloads\Quizzical\src\Quizzical-Server\sdk\9.0.201;%PATH%`
   3. `set DOTNET_MULTILEVEL_LOOKUP=0`
> [!WARNING]
> před spuštěním projektu je ale nejdříve potřeba upravit soubor appsettings.json, kde stačí zkopírovat:
```
"SERVER_PROTOCOL": "http",
"SERVER_HOST": "localhost",
"SERVER_PORT": 5006,
"JWT_SECRET_KEY": "=h91<[mDHWwUf.zmk%?([P.G<*x=Xgju"
```
- Dále stačí jen v Quizzical-Server spustit `dotnet watch run`
> [!TIP]
> Je možné, že po použití `cd` přestane dotnet fungovat. Je poté tedy potřeba přesunou celou binary do adresáře **Quizzical-Server**, kde se poté ve stejném adresáří dá použít dotnet.
- Pro snadnější práci lze stáhnout extensions: **C#**, **C# Dev Kit**, **IntelliCode for C# Dev Kit**, **.NET Install Tool** a **SQLite**
  - Po spuštění solution se v Exploreru na spodu zobrazí nová karta **Solution Explorer**
  - Pro propojení SQLite databáze je potřeba v Command Palette (Ctrl+Shift+P) potřeba spustit **SQLite: Open Database** a poté se v exploreru zobrazí nová SQLITE EXPLORER
#### Databáze
- V neposlední řadě, pokud chcete nahlížet do databáze, tak je potřeba si stáhnout https://sqlitebrowser.org/dl/ a to konkrétně **Windows PortableApp**
### Normálně
1. **Frontend (Webová aplikace)**:
   - Přejděte do adresáře `Quizzical-Web`:
     ```bash
     cd .\Quizzical-Web
     ```
   - Nainstalujte potřebné balíčky pomocí npm (verze 22.2.20):
     ```bash
     npm install
     ```
   - Spusťte vývojový server:
     ```bash
     npm run dev
     ```

2. **Backend (Server)**:
   - Ujistěte se, že máte nainstalované .NET 8 SDK.
   - Přejděte do adresáře `Quizzical-Server`:
     ```bash
     cd .\Quizzical-Server
     ```
   - Nastavte si secrets.json
     ```json
      {
        "SERVER_PROTOCOL": "http",
        "SERVER_HOST": "localhost",
        "SERVER_PORT": 5006,
        "JWT_SECRET_KEY": "=h91<[mDHWwUf.zmk%?([P.G<*x=Xgju"
      }
     ```
   - Spusťte server:
     ```bash
     dotnet run
     ```

3. **Desktopová aplikace**:
   - Přejděte do adresáře `Quizzical-Desktop`:
     ```bash
     cd .\Quizzical-Desktop
     ```
   - Nainstalujte potřebné balíčky:
     ```bash
     npm install
     ```
   - Spusťte vývojový server:
     ```bash
     npm run dev
     ```

---
