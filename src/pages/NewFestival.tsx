import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import {type ChangeEvent, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import type {Festival, FestivalRequest} from "@/types/festivals";
import type {ErrorResponse} from "@/types/common.ts";
import { createFestivals } from "@/services/festivals";

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
export default function NewFestival(){

    const [form, setForm] = useState<FestivalForm>(defaultFestivalForm);
    const [isValid, setValid] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleTitleOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value} = evt.target;
        setForm({
            ...form,
            title: value,
        })
    }

    const handleAboutOnChange = (evt : ChangeEvent<HTMLTextAreaElement>)=> {
        const {value} = evt.target;
        setForm({
            ...form,
            about: value,
        })
    }

    const handleCityOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value} = evt.target;
        setForm({
            ...form,
            city: value,
        })
    }

   
    const handleFromOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value} = evt.target; 
        setForm({
            ...form,
            from: value,
        })
    }

    const handleToOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value} = evt.target; 
        setForm({
            ...form,
            to: value,
        })
    }

    const handlePriceFromOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value:valueText} = evt.target;
        const value = Number(valueText);
        setForm({
            ...form,
            price_from: value,
        })
    }

    const handlePriceToOnChange = (evt : ChangeEvent<HTMLInputElement>)=> {
        const {value:valueText} = evt.target;
        const value = Number(valueText);
        setForm({
            ...form,
            price_to: value,
        })
    }

    const handleReset = () => {
        setForm(defaultFestivalForm);
    }

    const handleSubmitForm = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const request:FestivalRequest = {
            ...form,
        }
        try{
            const response = await createFestivals(request);
            if ("id" in response) {
                const festival: Festival = response as Festival;
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
        //Comprobación básica para las fechas y precios
        setValid(
            form.title.trim().length>2 &&
            form.city.trim().length>2 &&
            form.from.length > 0 &&
            form.to.length > 0 &&
            form.price_to >= form.price_from //Asegurar que el precio 'hasta' es >= el precio 'desde'
        );
    },[form])

    const btnSaveClassnames = "px-4 py-2 rounded-lg text-white "+(isValid?"bg-green-900":"bg-gray-400");


    return <>
    <Header/>

  <main className="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
    <div className="flex items-center justify-between mb-6">
      <Link to="/festivals" className="text-sm px-3 py-2 rounded-lg border">Volver</Link>
      <h1 className="font-semibold text-xl">Nuevo festival</h1>
    </div>
    
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm" onSubmit={handleSubmitForm}>

      <div className="sm:col-span-2">
        <label className="block text-neutral-700 mb-1">Nombre</label>
        <input type="text" value={form.title} onChange={handleTitleOnChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Nombre del festival"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Ciudad</label>
        <input type="text" value={form.city} onChange={handleCityOnChange} className="w-full px-3 py-2 rounded-lg border" placeholder="Madrid, Mojacar, etc"/>
      </div>

      <div className="sm:col-span-2"> {/*Mover la descripción a ocupar 2 columnas para más espacio */}
        <label className="block text-neutral-700 mb-1">Breve descripción</label>
        <textarea rows={5} className="w-full px-3 py-2 rounded-lg border" placeholder="Descripción" onChange={handleAboutOnChange} value={form.about}/>
      </div>

      <div className="flex gap-4"> {/*Agrupar los campos de precio en un div para mejor control si es necesario*/}
        <div>
            <label className="block text-neutral-700 mb-1">Precio desde (€)</label>
            <input type="number" value={form.price_from} onChange={handlePriceFromOnChange} placeholder="Precio desde (€)" className="w-full px-3 py-2 rounded-lg border"/>
        </div>
        <div>
            <label className="block text-neutral-700 mb-1">Precio hasta (€)</label>
            <input type="number" value={form.price_to} onChange={handlePriceToOnChange} placeholder="Precio hasta (€)" className="w-full px-3 py-2 rounded-lg border"/>
        </div>
      </div>
      
      <div>
        <label className="block text-neutral-700 mb-1">Fecha inicio</label>
        <input value={form.from} onChange={handleFromOnChange} type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label className="block text-neutral-700 mb-1">Fecha fin</label>
        <input value={form.to} onChange={handleToOnChange} type="date" className="w-full px-3 py-2 rounded-lg border"/>
      </div>

      <div className="sm:col-span-2 flex items-center gap-3 mt-2">
        <button type="submit" disabled={!isValid} className={btnSaveClassnames}>Guardar festival</button>
        <button type="reset" onClick={handleReset} className="px-4 py-2 rounded-lg border">Limpiar</button>
      </div>
    </form>
  </main>


    <Footer/>
</>
}