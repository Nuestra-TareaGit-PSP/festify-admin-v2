import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { listFestivals } from "@/services/festivals";
import {useEffect, useState, ChangeEvent} from "react";
import { Link } from "react-router-dom";

export default function ListFestivals() {


type FestivalTableItem = {
    id: string;
    name: string;
    genres?: string;
    listeners: "N/A" | number;
    country: string;
    status: "Activo" | "Borrador";
}

const [festivals, setFestivals] = useState<FestivalTableItem[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        setLoading(true);

        const loadFestivals = async () => {
            //await new Promise(r => setTimeout(r, 2000));
            try {
                const festivalsResponse = await ListFestivals();
                const result: FestivalTableItem[] = festivalsResponse.map(a => {
                    return {
                        ...a,
                        genres: a.genres.join(" | ")
                    }
                })
                setFestivals(result);
            } catch (err: any) {
                setError(err?.message ?? 'Error desconocido');
            } finally {
                setLoading(false);
            }
        }
        loadFestivals();

    }, [])


    const handleOnSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchText(value);
    }

    const filteredFestivals =
        festivals?.filter((festival) =>
            festival.name.toLowerCase().includes(searchText.toLowerCase())
        ) ?? [];


    const handleDeleteFestival = (festivalId: string) => {

        deleteFestivals(festivalId).then((error) => {

            if (error) {
                alert(error.detail || "Error al eliminar el festival");
                return;
            } else {
                alert("Festival eliminado con éxito");
                setFestivals((prev) => prev?.filter((festival) => festival.id !== festivalId));
            }
        }).catch((err) => {
            setError(err?.message ?? "Error desconocido");
        })

    }


    if (loading) {
        return <>
            <Header/>
            <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                <h1 className="text-6xl font-bold text-orange-400">Cargando...</h1>
            </div>
            <Footer/>
        </>
    }
    if (error) {
        return <>
            <Header/>
            <div className="flex flex-col items-center justify-center h-screen text-center p-4">
                <h1 className="text-6xl font-bold text-red-500">Error</h1>
                <h2 className="text-2xl mt-4">Error inesperado</h2>
                <p className="text-gray-600 mt-2">
                    {error}
                </p>
                <Link
                    to="/"
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                    Volver al inicio
                </Link>
            </div>
            <Footer/>
        </>
    }



return <>
        <Header/>
<main className="max-w-7xl mx-auto px-4 py-8">
  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
    <div>
      <h1 className="text-2xl font-extrabold">Festivales</h1>
      <p className="text-sm text-neutral-600">Crea y gestiona eventos.</p>
    </div>
    <div className="flex items-center gap-2">
      <input id="search" placeholder="Buscar por nombre/ciudad" className="px-3 py-2 rounded-lg border w-64"/>
      <a href="./admin-festival-nuevo.html" className="px-3 py-2 rounded-lg bg-neutral-900 text-white text-sm">Nuevo festival</a>
    </div>
  </div>

  <div className="mt-4 flex items-center justify-between text-sm">
    <div className="flex items-center gap-2">
      <span className="text-neutral-600">Resultados:</span>
      <span id="result-count" className="font-medium" aria-live="polite">4</span>
    </div>
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-neutral-600">Ordenar</label>
      <select id="sort" className="px-2 py-1 rounded border">
        <option value="title-asc">Título (A–Z)</option>
        <option value="title-desc">Título (Z–A)</option>
        <option value="start-asc">Fecha inicio (asc)</option>
        <option value="start-desc">Fecha inicio (desc)</option>
        <option value="start-asc">Precio desde (asc)</option>
        <option value="start-desc">Precio desde (desc)</option>
      </select>
    </div>
  </div>


  <section id="grid" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
 
    <article data-festival data-name="SunWave Fest" data-city="Barcelona" data-start="2025-07-12" data-end="2025-07-14"
             className="rounded-xl border p-4 hover:shadow-sm transition shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <header>
          <h3 className="text-lg font-semibold">SunWave Fest</h3>
          <p className="mt-1 text-sm text-neutral-600">Música alternativa</p>
        </header>
        <span className="inline-flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-neutral-100 border">
          JUL 2025
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">🗓️</dt>
          <dd>12 Jul 2025 — 14 Jul 2025</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">📍</dt>
          <dd>Barcelona</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">💶</dt>
          <dd>85€ - 120€</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Link to={"/edit-festival/" + festival.id}
        className="px-2 py-1 rounded border">Editar</Link>
        <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) => {
                evt.preventDefault();
                handleDeleteFestival(festival.id)}}>Eliminar
        </button>
      </div>
    </article>

    <article data-festival data-name="SunWave Fest" data-city="Barcelona" data-start="2025-07-12" data-end="2025-07-14"
             className="rounded-xl border p-4 hover:shadow-sm transition shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <header>
          <h3 className="text-lg font-semibold">SunWave Fest</h3>
          <p className="mt-1 text-sm text-neutral-600">R&B , Trap</p>
        </header>
        <span className="inline-flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-neutral-100 border">
          JUL 2025
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">🗓️</dt>
          <dd>12 Jul 2025 — 14 Jul 2025</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">📍</dt>
          <dd>Barcelona</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">💶</dt>
          <dd>85€ - 120€</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="mt-4 flex items-center justify-end gap-2">
        <Link to={"/edit-festival/" + festival.id}
        className="px-2 py-1 rounded border">Editar</Link>
        <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) => {
                evt.preventDefault();
                handleDeleteFestival(festival.id)}}>Eliminar
        </button>
      </div>
    </div>
    </article>

    <article data-festival data-name="SunWave Fest" data-city="Barcelona" data-start="2025-07-12" data-end="2025-07-14"
             className="rounded-xl border p-4 hover:shadow-sm transition shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <header>
          <h3 className="text-lg font-semibold">SunWave Fest</h3>
          <p className="mt-1 text-sm text-neutral-600">Pop 90's</p>
        </header>
        <span className="inline-flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-neutral-100 border">
          JUL 2025
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">🗓️</dt>
          <dd>12 Jul 2025 — 14 Jul 2025</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">📍</dt>
          <dd>Barcelona</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">💶</dt>
          <dd>85€ - 120€</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-end gap-2">
        <div className="mt-4 flex items-center justify-end gap-2">
        <Link to={"/edit-festival/" + festival.id}
        className="px-2 py-1 rounded border">Editar</Link>
        <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) => {
                evt.preventDefault();
                handleDeleteFestival(festival.id)}}>Eliminar
        </button>
      </div>
    </div>
    </article>

    <article data-festival data-name="SunWave Fest" data-city="Barcelona" data-start="2025-07-12" data-end="2025-07-14"
             className="rounded-xl border p-4 hover:shadow-sm transition shadow-[0_0_0_1px_rgba(0,0,0,0.02)]">
      <div className="flex items-start justify-between gap-3">
        <header>
          <h3 className="text-lg font-semibold">SunWave Fest</h3>
          <p className="mt-1 text-sm text-neutral-600">Techno</p>
        </header>
        <span className="inline-flex items-center justify-center text-xs font-semibold px-2 py-1 rounded-full bg-neutral-100 border">
          JUL 2025
        </span>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">🗓️</dt>
          <dd>12 Jul 2025 — 14 Jul 2025</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">📍</dt>
          <dd>Barcelona</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="text-neutral-500">💶</dt>
          <dd>85€ - 120€</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Link to={"/edit-festival/" + festival.id}
        className="px-2 py-1 rounded border">Editar</Link>
        <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) => {
                evt.preventDefault();
                handleDeleteFestival(festival.id)}}>Eliminar
        </button>
      </div>
    </article>
  </section>
</main>
<Footer/>
 
</>
}