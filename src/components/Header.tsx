import {Link} from "react-router-dom";

export default function Header(){
    return <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
            <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
                <Link to="/" className="font-semibold">Festify Dashboard</Link>
                <nav className="hidden md:flex items-center gap-4 text-sm">
                    <Link to="/artists">Artistas</Link>
                    <Link to="/festivals">Festivales</Link>
                    <Link to="/stages">Escenarios</Link>
                    <Link to="/tickets">Entradas</Link>
                    <Link to="/news">Noticias</Link>
                    <Link to="/users">Usuarios</Link>
                </nav>
            </div>
        </header>
}