import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import type {Artist, ArtistRequest} from "@/types/artist.ts";
import {createArtists} from "@/services/artists.ts";
import type {ErrorResponse} from "@/types/common.ts";
import { createFestivals } from "@/services/festivals";
import type { Festival } from "@/types/festivals";

type FestivalForm = {
  title: string;
  about: string;
  city: string;
  from: string;
  to: string;
  price_from: number;
  price_to: number
}

const defaultFestivalForm:FestivalForm = {
    title: "",
    about: "",
    city: "",
    from: "",
    to: "",
    price_from: 0,
    price_to: 0
}
export default function NewArtist(){

    const [form, setForm] = useState<FestivalForm>(defaultFestivalForm);
    const [isValid, setValid] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleTitleOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            title: value,
        })
    }

    const handleAboutOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            about: value,
        })
    }

    const handleCityOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            city: value,
        })
    }

    const handleAboutOnChange = (evt : ChangeEvent<HTMLTextAreaElement>)=> {
        const  {value} = evt.target;
        setForm({
            ...form,
            about: value,
        })
    }

    const handleFromOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        const value = Date();
        setForm({
            ...form,
            from: value,
        })
    }

    const handleToOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value} = evt.target;
        const value = Date();
        setForm({
            ...form,
            to: value,
        })
    }

    const handlePriceFromOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const  {value:valueText} = evt.target;
        const value = Number(valueText);
        setForm({
            ...form,
            listeners: value,
        })
    }

    const handleReset = () => {
        setForm(defaultFestivalForm);
    }

    const handleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const request:FestivalRequest = {
            ...form,
            listeners:form.listeners==""?0 :form.listeners,
        }
        try{
            const response = await createFestivals(request);
            if ("id" in response) {
                const festival: Artist = response as Festival;
                alert(`Festival con id ${festival.id} ha sido creado con éxito.`);
                navigate('/festivals');
            } else {
               const error: ErrorResponse = response as ErrorResponse;
               alert(error.detail);
            }
        }catch(err:any){
            console.log(err)
            alert(err?.message ??  'Error desconocido');
        };

    }

    //El código dentro de useEffect se ejecuta cuando 'form' cambia de valor
    useEffect(()=>{
        setValid(
            form.title.trim().length>2 &&
            form.city.trim().length>2);
    },[form])

    const btnSaveClassnames = "px-4 py-2 rounded-lg text-white "+(isValid?"bg-green-900":"bg-gray-400");

    return (
    <>
    <Header/>
    <div className="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
      <a href="./index.html" className="font-semibold">Festify Dashboard</a>
      <nav className="hidden md:flex items-center gap-4 text-sm">
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a className="underline"  href="/festivales">Festivales</a>
          <a href="/artistas">Artistas</a>
          <a href="/albums">Albums</a>
        </nav>
      </nav>
    </div>
 
 
  <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
    <div className="flex items-center justify-between mb-6">
      <a href="/festivals" className="text-sm px-3 py-2 rounded-lg border">Volver</a>
      <h1 className="font-semibold text-xl">Nuevo festival</h1>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmitForm}>
      
      <div className="sm:col-span-2">
        <label className="block text-neutral-700 mb-1">Nombre</label>
        <input type="text" value={form.name}  onChange={handleNameOnChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Nombre del festival"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Ciudad</label>
        <input type="text" value={form.city} onChange={handleCityOnChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Madrid, Mojacar, etc"/>
      </div>

      <div>
        <label className="block text-neutral-700 mb-1">Breve descripción</label>
        <textarea rows={5} className="w-full px-3 py-2 rounded-lg border" placeholder="Descripción" onChange={handleAboutOnChange} value={form.about}/>
      </div>
      
      <div>
        <label className="block text-neutral-700 mb-1">Precio (€)</label>
        <input placeholder="Precio desde (€)" className="w-8.5  px-3 py-2 rounded-lg border"/>
        <input placeholder="Precio hasta (€)" className="w-8.5 px-3 py-2 rounded-lg border"/>
      </div>
      
      <div>
        <label className="block text-neutral-700 mb-1">Fecha inicio</label>
        <input type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Fecha fin</label>
        <input type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>

      <div className="sm:col-span-2 flex items-center gap-3 mt-2">
        <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white">Guardar</button>
        <button type="reset" className="px-4 py-2 rounded-lg border">Limpiar</button>
      </div>
    </form>
  </main>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmitForm}>

                

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

                
                <div className="sm:col-span-2 flex items-center gap-3 mt-2">

                    <button type="reset" onClick={handleReset} className="px-4 py-2 rounded-lg border">Limpiar</button>
                    <button type="submit" disabled={!isValid}  className={btnSaveClassnames}>Guardar artista</button>
  
<Footer/>
</>

)
}