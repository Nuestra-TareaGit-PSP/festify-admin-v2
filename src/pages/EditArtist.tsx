import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getArtist, updateArtist} from "@/services/artists.ts";
import type {Artist, ArtistRequest} from "@/types/artist.ts";
import type {ErrorResponse} from "@/types/common.ts";


type ArtistForm = {
    id: string;
    name: string;
    genres: string;
    country: string;
    listeners: "" | number;
    status: "Activo" | "Borrador";
    biography:string;
}

const defaultArtistForm:ArtistForm = {
    id: "",
    name: "",
    genres: "",
    country: "ES",
    listeners: 0,
    status: "Activo",
    biography: "",
}

export default function EditArtist(){

    const [form,setForm] = useState<ArtistForm>(defaultArtistForm);
    const [formOriginal, setFormOriginal] = useState<ArtistForm>(defaultArtistForm);
    const [isValid, setValid] = useState<boolean>(false);
    const {id} = useParams();
    const [error, setError] = useState<string>();
    const navigate = useNavigate();

    useEffect(()=>{
        if (id){
            getArtist(id).then((res:Artist|ErrorResponse)=>{
                if ("id" in res){
                    const artist:Artist = res as Artist;
                    setForm({
                        ...artist,
                        genres: artist.genres.join(", ")
                    })
                    setFormOriginal({
                        ...artist,
                        genres: artist.genres.join(", ")
                    });
                }else{
                    const errorResponse:ErrorResponse = res as ErrorResponse;
                    setError(errorResponse.detail);
                }
            }).catch((err)=>{
                setError(err?.message ?? "Error cargando el usuario");
            });
        }
    },[])

    useEffect(()=>{
        setValid(
            form.name.trim().length>2 &&
            form.genres.trim().length>2);
    },[form])

    const handleNameOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            name: value,
        })
    }

    const handleGenresOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            genres: value,
        })
    }

    const handleCountryOnChange = (evt : ChangeEvent<HTMLSelectElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            country: value,
        })
    }

    const handleBiographyOnChange = (evt : ChangeEvent<HTMLTextAreaElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            biography: value,
        })
    }

    const handleStatusOnChange = (evt : ChangeEvent<HTMLSelectElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            status: value === 'Activo' ? 'Activo' : 'Borrador',
        })
    }

    const handleListenersOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value:valueText} = evt.target;
        const value = Number(valueText);
        setForm({
            ...form,
            listeners: value,
        })
    }

    const handleReset = () => {
        setForm(formOriginal);
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

    const handleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if (!id){
            return;
        }
        const request:ArtistRequest = {
            ...form,
            listeners:form.listeners==""?0 :form.listeners,
            genres: form.genres.split(",").map(a=>a.trim()),
        }
        try{
            const response = await updateArtist(id, request);
            if ("id" in response) {
                const artist: Artist = response as Artist;
                alert(`Artista con id ${artist.id} ha sido actualizado con éxito.`);
                navigate('/artists');
            } else {
                const error: ErrorResponse = response as ErrorResponse;
                alert(error.detail);
            }
        }catch(err:any){
            console.log(err)
            alert(err?.message ??  'Error desconocido');
        };

    }

    const btnSaveClassnames = "px-4 py-2 rounded-lg text-white "+(isValid?"bg-green-900":"bg-gray-400");

    return <>
        <Header/>
        <main className="max-w-4xl mx-auto px-4 py-8">
            <Link to="/artists" className="text-sm px-3 py-2 rounded-lg border">Volver</Link>
            <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-center"><h1
                className="font-semibold">Editar artista</h1></div>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmitForm}>
                <div className="sm:col-span-2">
                    <label className="block text-neutral-700 mb-1">Nombre</label>
                    <input type="text" value={form.name}  onChange={handleNameOnChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Nombre del artista"/>
                </div>
                <div>
                    <label className="block text-neutral-700 mb-1">Géneros (coma)</label>
                    <input type="text" value={form.genres} onChange={handleGenresOnChange}  className="w-full px-3 py-2 rounded-lg border" placeholder="Indie, Electrónica"/>
                </div>
                <div>
                    <label className="block text-neutral-700 mb-1">País</label>
                    <select value={form.country}  onChange={handleCountryOnChange} className="w-full px-3 py-2 rounded-lg border">
                        <option>ES</option>
                        <option>FR</option>
                        <option>PT</option>
                        <option>UK</option>
                    </select>
                </div>
                <div>
                    <label className="block text-neutral-700 mb-1">Oyentes mensuales</label>
                    <input type="number" onChange={handleListenersOnChange} value={form.listeners} className="w-full px-3 py-2 rounded-lg border" placeholder="1200000"/>
                </div>
                <div>
                    <label className="block text-neutral-700 mb-1">Estado</label>
                    <select value={form.status} onChange={handleStatusOnChange}  className="w-full px-3 py-2 rounded-lg border">
                        <option>Activo</option>
                        <option>Borrador</option>
                    </select>
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-neutral-700 mb-1">Biografía</label>
                    <textarea rows={5} className="w-full px-3 py-2 rounded-lg border"
                              placeholder="Resumen del artista, estilo, trayectoria…" onChange={handleBiographyOnChange} value={form.biography}/>
                </div>
                <div className="sm:col-span-2 flex items-center gap-3 mt-2">

                    <button type="reset" onClick={handleReset} className="px-4 py-2 rounded-lg border">Deshacer cambios</button>
                    <button type="submit" disabled={!isValid}  className={btnSaveClassnames}>Guardar artista</button>
                </div>
            </form>
        </main>
        <Footer/>
    </>
}