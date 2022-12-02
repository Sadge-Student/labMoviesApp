export const getMovies = (pageNum) => {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${pageNum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch ((error) => {
            throw error;
        });
};

export const getMovie = (args) => {
    //console.log(args);
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.json().message);
            
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getGenres = () => {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then( (response) => {
            if (!response.ok)
                throw new Error(response.json().message);
            
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getMovieImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.json().message);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((res) => res.json())
        .then((json) => {
            return json.results;
        });
};

export const getUpcomingMovies = (pageNum) => {
    return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch ((error) => {
            throw error;
        });
};

export const getPopularMovies = (pageNum) => {
    return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch ((error) => {
            throw error;
        });
};

export const getTopRatedMovies = (pageNum) => {
    return fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch ((error) => {
            throw error;
        });
};

export const getMovieCredits = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
    .then((response) => {
        if (!response.ok)
            throw new Error(response.json().message);
        return response.json();
    })
    .catch((error) => {
        throw error
    });
}

export const getPopularActors = (pageNum) => {
    return fetch(`https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pageNum}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.json().message);
            }
            return response.json();
        })
        .catch ((error) => {
            throw error;
        });
}

export const getActor = (args) => {
    //console.log(args);
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.json().message);
            
            return response.json();
        })
        .catch((error) => {
            throw error;
        });
};

export const getActorImages = ({ queryKey }) => {
    const [, idPart] = queryKey;
    const { id } = idPart;
    return fetch(`https://api.themoviedb.org/3/person/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`)
        .then((response) => {
            if (!response.ok)
                throw new Error(response.json().message);
            return response.json();
        })
        .catch((error) => {
            throw error
        });
};