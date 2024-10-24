import {Button} from "@/components/ui/button.jsx";
export const Footer = () => {
    return (
        <footer className="border bg-card text-card-foreground shadow-sm flex justify-between p-2 border-l-0 border-r-0 border-b-0">
            <div className="flex items-center ml-1">
                <span>Vytvořeno <a className="text-primary" href="https://github.com/TheDarkun">Václavem Stančíkem</a> v roce 2024/2025</span>
            </div>
            <div>
                <a href="https://github.com/TheDarkun/Quizzical">
                    <Button variant="ghost" size="icon">
                        <img className="h-8 invert" src="/github-mark-white.svg" alt="github"/>
                    </Button>
                </a>
            </div>
        </footer>
    )
}