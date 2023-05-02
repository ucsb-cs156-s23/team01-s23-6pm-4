import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";
import AvilaBeachPage from "main/pages/Towns/AvilaBeachPage";
import LosAlamosPage from "main/pages/Towns/LosAlamosPage";
import ArroyoGrandePage from "main/pages/Towns/ArroyoGrandePage";

import "bootstrap/dist/css/bootstrap.css";
import RestaurantCreatePage from "main/pages/Restaurants/RestaurantCreatePage";
import RestaurantEditPage from "main/pages/Restaurants/RestaurantEditPage";
import RestaurantIndexPage from "main/pages/Restaurants/RestaurantIndexPage";
import RestaurantDetailsPage from "main/pages/Restaurants/RestaurantDetailsPage";

import MusicCreatePage from "main/pages/Musics/MusicCreatePage";
import MusicEditPage from "main/pages/Musics/MusicEditPage";
import MusicIndexPage from "main/pages/Musics/MusicIndexPage";
import MusicDetailsPage from "main/pages/Musics/MusicDetailsPage";

import BookCreatePage from "main/pages/Books/BookCreatePage";
import BookEditPage from "main/pages/Books/BookEditPage";
import BookIndexPage from "main/pages/Books/BookIndexPage";
import BookDetailsPage from "main/pages/Books/BookDetailsPage";

import ApartmentCreatePage from "main/pages/Apartments/ApartmentCreatePage";
import ApartmentEditPage from "main/pages/Apartments/ApartmentEditPage";
import ApartmentIndexPage from "main/pages/Apartments/ApartmentIndexPage";
import ApartmentDetailsPage from "main/pages/Apartments/ApartmentDetailsPage";


function App() {

  const reload = () => window.location.reload();

  return (
    <BrowserRouter basename="/team01-s23-6pm-4">
      <Routes>
        <Route path="/storybook-static" onEnter={reload}/>
        <Route exact path="/" element={<HomePage />} />

        <Route exact path="/towns/AvilaBeach" element={<AvilaBeachPage />} />
        <Route exact path="/towns/LosAlamos" element={<LosAlamosPage />} />
        <Route exact path="/towns/ArroyoGrande" element={<ArroyoGrandePage />} />
        
        <Route exact path="/restaurants/create" element={<RestaurantCreatePage />} />
        <Route exact path="/restaurants/edit/:id" element={<RestaurantEditPage />} />
        <Route exact path="/restaurants/details/:id" element={<RestaurantDetailsPage />} />
        <Route exact path="/restaurants/" element={<RestaurantIndexPage />} />

        <Route exact path="/musics/create" element={<MusicCreatePage />} />
        <Route exact path="/musics/edit/:id" element={<MusicEditPage />} />
        <Route exact path="/musics/details/:id" element={<MusicDetailsPage />} />
        <Route exact path="/musics/" element={<MusicIndexPage />} />

        <Route exact path="/books/create" element={<BookCreatePage />} />
        <Route exact path="/books/edit/:id" element={<BookEditPage />} />
        <Route exact path="/books/details/:id" element={<BookDetailsPage />} />
        <Route exact path="/books/" element={<BookIndexPage />} />

        <Route exact path="/apartments/create" element={<ApartmentCreatePage />} />
        <Route exact path="/apartments/edit/:id" element={<ApartmentEditPage />} />
        <Route exact path="/apartments/details/:id" element={<ApartmentDetailsPage />} />
        <Route exact path="/apartments/" element={<ApartmentIndexPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
