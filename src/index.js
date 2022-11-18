import React from "react"
import {createRoot} from "react-dom/client"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
// import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import MoviesContextProvider from "./contexts/moviesContext"
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
                {/* <ThemeToggle /> */}
                <MoviesContextProvider>
                  <Routes>
                    <Route exact path="/" element={<PrivateRoute />}>
                      <Route exact path="/" element={<HomePage />} />
                      <Route exact path="/movies/favourites" element={<FavouriteMoviesPage />} />
                    </Route>
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/login" element={<LoginPage />} />
                  </Routes>
                </MoviesContextProvider>
              </ToggleColorMode>
            </AuthProvider>
          </Router>
      <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      // <QueryClientProvider client={queryClient}>
      //   <BrowserRouter>
      //     <SiteHeader />
      //     <MoviesContextProvider>
      //       <Routes>
      //         <Route path="/reviews/form" element={<AddMovieReviewPage />} />
      //         <Route path="/reviews/:id" element={ <MovieReviewPage />} />
      //         <Route exact path="/movies/favourites" element={<FavouriteMoviesPage />} />
      //         <Route exact path="/movies/upcoming" element={<UpcomingMoviesPage />} />
      //         <Route path="/movies/:id" element={<MoviePage />} />
      //         <Route path="/" element={<HomePage />} />
      //         <Route path="*" element={<Navigate to="/" />} />
      //       </Routes>
      //     </MoviesContextProvider>
      //   </BrowserRouter>
      //   <ReactQueryDevtools initialIsOpen={false} />
      // </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />)