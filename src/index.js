import React from "react"
import {createRoot} from "react-dom/client"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MoviesContextProvider from "./contexts/moviesContext"
import ActorsContextProvider from "./contexts/actorsContext"
import HomePage from "./pages/homePage"
import MoviePage from "./pages/movieDetailsPage"
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"
import MovieReviewPage from "./pages/movieReviewPage"
import SiteHeader from "./components/siteHeader"
import UpcomingMoviesPage from "./pages/upcomingMoviesPage"
import AddMovieReviewPage from "./pages/addMovieReviewPage"
import SignUpPage from "./pages/signupPage"
import LoginPage from "./pages/loginPage"
import { AuthProvider } from "./contexts/authContext"
import { ToggleColorMode, ThemeToggle} from "./components/themeToggle";
import PrivateRoute from "./components/privateRoute"
import PopularMoviesPage from "./pages/popularMoviesPage"
import RatedMoviesPage from "./pages/ratedMoviesPage"
import PopularActorsPage from "./pages/actorsPage"
import ActorDetailsPage from "./pages/actorDetailsPage"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
    return (
      <QueryClientProvider client={queryClient}>
          <Router>
            <AuthProvider>
              <ToggleColorMode>
                <SiteHeader />
                <MoviesContextProvider>
                <ActorsContextProvider>
                  <Routes>
                    <Route exact path="/" element={<PrivateRoute />}>
                      <Route exact path="/" element={<HomePage />} />
                      <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                      <Route path="/reviews/:id" element={ <MovieReviewPage />} />
                      <Route path="/movies/:id" element={<MoviePage />} />
                      <Route exact path="/movies/favourites" element={<FavouriteMoviesPage />} />
                      <Route exact path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                      <Route exact path="/movies/popular" element={<PopularMoviesPage />} />
                      <Route exact path="/movies/rated" element={<RatedMoviesPage />} />
                      <Route exact path="/actors/" element={<PopularActorsPage />} />
                      <Route path="/actors/:id" element={<ActorDetailsPage />} />
                    </Route>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Routes>
                  </ActorsContextProvider>
                </MoviesContextProvider>
              </ToggleColorMode>
            </AuthProvider>
          </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />)