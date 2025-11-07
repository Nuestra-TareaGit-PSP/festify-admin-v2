import {Link} from "react-router-dom";

export default function Header(){
    return <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
                <Link to="/" className="font-semibold">Festify Dashboard</Link>
                <nav className="hidden md:flex items-center gap-4 text-sm">
                    <Link className="underline" to="/artistas">Artistas</Link>
                    <Link className="underline" to="/festivales">Giras/Festivales/Conciertos</Link>
                    <Link className="underline" to="/escenarios">Escenarios</Link>
                    <Link className="underline" to="/entradas">Entradas</Link>
                    <Link className="underline" to="/noticias">Noticias</Link>
                    <Link className="underline" to="/usuarios">Usuarios</Link>
                </nav>
            </div>
        </header>
}