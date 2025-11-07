import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home";
import PageNotFound from "@/pages/PageNotFound";
import {ListArtists} from "@/pages/ListArtists.tsx";
import NewArtist from "@/pages/NewArtist.tsx";
import EditArtist from "@/pages/EditArtist.tsx";
import ListFestivals from "@/pages/ListFestivals";


/**
 * import BaseLayout from "@/layouts/base.tsx";
 export const router = createBrowserRouter([
 {
 element: <BaseLayout/>,
 children:[
 { path: "/", element: <Home /> },
 { path: "/artists", element: <ListArtists /> },
 { path: "/new-artist", element: <NewArtist /> },
 { path: "/edit-artist/:id", element: <EditArtist /> },
 ]
 },
 { path: "*", element: <PageNotFound /> },
 ]);
 **/

export const router = createBrowserRouter([

    {path: "/", element: <Home/>},
    {path: "/artists", element: <ListArtists/>},
    {path: "/new-artist", element: <NewArtist/>},
    {path: "/edit-artist/:id", element: <EditArtist/>},
    {path: "/festivals", element: <ListFestivals/>},
    {path: "*", element: <PageNotFound/>},
]);