import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {deleteArtists, listArtists} from "@/services/artists.ts";

type ArtistTableItem = {
    id: string;
    name: string;
    genres?: string;
    listeners: "N/A" | number;
    country: string;
    status: "Activo" | "Borrador";
}
export function ListArtists() {

    const [artists, setArtists] = useState<ArtistTableItem[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        setLoading(true);

        const loadArtists = async () => {
            //await new Promise(r => setTimeout(r, 2000));
            try {
                const artistsResponse = await listArtists();
                const result: ArtistTableItem[] = artistsResponse.map(a => {
                    return {
                        ...a,
                        genres: a.genres.join(" | ")
                    }
                })
                setArtists(result);
            } catch (err: any) {
                setError(err?.message ?? 'Error desconocido');
            } finally {
                setLoading(false);
            }
        }
        loadArtists();

    }, [])


    const handleOnSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSearchText(value);
    }

    const filteredArtists =
        artists?.filter((artist) =>
            artist.name.toLowerCase().includes(searchText.toLowerCase())
        ) ?? [];


    const handleDeleteArtist = (artistId: string) => {

        deleteArtists(artistId).then((error) => {

            if (error) {
                alert(error.detail || "Error al eliminar el artista");
                return;
            } else {
                alert("Usuario eliminado con éxito");
                setArtists((prev) => prev?.filter((artist) => artist.id !== artistId));
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
                <Link to="/" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Volver al inicio</Link>
            </div>
            <Footer/>
        </>
    }

    return <>
        <Header/>
        <main className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-extrabold">Artistas</h1>
                    <p className="text-sm text-neutral-600">Gestiona artistas: crear, editar, eliminar.</p>
                </div>
                <div className="flex items-center gap-2">
                    <input placeholder="Buscar por nombre o género" value={searchText}
                           onChange={handleOnSearchTextChange} className="px-3 py-2 rounded-lg border w-64"/>
                    <Link to="/new-artist"
                          className="px-3 py-2 rounded-lg bg-neutral-900 text-white text-sm">Nuevo artista</Link>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                    <tr className="text-left border-b">
                        <th className="py-2">Artista</th>
                        <th>Géneros</th>
                        <th>Oyentes</th>
                        <th>País</th>
                        <th>Estado</th>
                        <th className="text-right">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredArtists?.map(artist =>
                        <tr key={artist.id} className="border-b hover:bg-neutral-50">
                            <td className="py-2">
                                <div className="flex items-center gap-3">
                                    <img className="w-10 h-10 rounded-md object-cover"
                                         src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=120&auto=format&fit=crop"/>
                                    <div>
                                        <p className="font-medium">{artist.name}</p>
                                        <p className="text-xs text-neutral-500">ID: {artist.id}</p>
                                    </div>
                                </div>
                            </td>
                            <td>{artist.genres || "Sin asignar"}</td>
                            <td>{artist.listeners}</td>
                            <td>{artist.country}</td>
                            <td><span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Activo</span>
                            </td>
                            <td className="text-right">

                                <Link to={"/edit-artist/" + artist.id}
                                      className="px-2 py-1 rounded border">Editar</Link>
                                <button className="px-2 py-1 rounded border text-red-700" onClick={(evt) => {
                                    evt.preventDefault();
                                    handleDeleteArtist(artist.id)
                                }}>Eliminar
                                </button>
                            </td>
                        </tr>
                    )}

                    </tbody>
                </table>
            </div>
        </main>
        <Footer/>
    </>
}