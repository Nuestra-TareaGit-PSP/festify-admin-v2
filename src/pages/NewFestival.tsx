import Header from "@/components/Header";

return (
    <>
    <Header/>
    <div class="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">
      <a href="./index.html" class="font-semibold">Festify Dashboard</a>
      <nav class="hidden md:flex items-center gap-4 text-sm">
        <nav class="hidden md:flex items-center gap-4 text-sm">
          <a class="underline"  href="./admin-festivales.html">Festivales</a>
          <a href="./admin-artistas.html">Artistas</a>
          <a href="./list-albums.html">Albums</a>
        </nav>
      </nav>
    </div>
 

 
  <main class="flex-1 max-w-5xl mx-auto px-4 py-8 w-full">
    <div class="flex items-center justify-between mb-6">
      <a href="/festivals" class="text-sm px-3 py-2 rounded-lg border">Volver</a>
      <h1 class="font-semibold text-xl">Nuevo festival</h1>
      <span></span>
    </div>

    
    <form class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
      
      <div >
        <label class="block text-neutral-700 mb-1">Nombre</label>
        <input placeholder="Nombre del festival" class="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label class="block text-neutral-700 mb-1">Ciudad</label>
        <input placeholder="Ciudad" class="w-full px-3 py-2 rounded-lg border"/>
      </div>

      <div>
        <label class="block text-neutral-700 mb-1">Breve descripción</label>
        <input placeholder="Descripción" class="w-full px-3 py-2 rounded-lg border"/>
      </div>
      
      <div>
        <label class="block text-neutral-700 mb-1">Precio (€)</label>
        <input placeholder="Precio desde (€)" class="w-8.5  px-3 py-2 rounded-lg border"/>
        <input placeholder="Precio hasta (€)" class="w-8.5 px-3 py-2 rounded-lg border"/>
      </div>
      
      <div>
        <label class="block text-neutral-700 mb-1">Fecha inicio</label>
        <input type="date" class="w-full px-3 py-2 rounded-lg border"/>
      </div>
      <div>
        <label class="block text-neutral-700 mb-1">Fecha fin</label>
        <input type="date" class="w-full px-3 py-2 rounded-lg border"/>
      </div>

      <div class="sm:col-span-2 flex items-center gap-3 mt-2">
        <button class="px-4 py-2 rounded-lg bg-neutral-900 text-white">Guardar</button>
        <button type="reset" class="px-4 py-2 rounded-lg border">Limpiar</button>
      </div>
    </form>
  </main>

  
<Footer/>
</>

)