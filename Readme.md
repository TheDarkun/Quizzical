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
