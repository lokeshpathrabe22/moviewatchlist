import React, { useState, useEffect } from "react";
import MovieCard from "./molecule/MovieCard";
import axios from "axios";
import MovieDetails from "./molecule/MovieDetails";

const SearchResults = ({ query }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async (page) => {
            if (!query.trim()) return; // Skip API call for empty query

            const api_key = process.env.REACT_APP_API_KEY;
            const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;

            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${api_key}`,
                    },
                });

                setSearchResults(response.data.results || []);
                setTotalPages(response.data.total_pages || 0);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to fetch movies. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovies(currentPage);
    }, [query, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseMovieDetails = () => {
        setSelectedMovie(null);
    };

    if (!query.trim()) {
        return <p className="placeholder-message">Start typing to search for movies...</p>;
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && searchResults.length === 0 && (
                <p className="no-results-message">No movies found for "{query}".</p>
            )}

            {!loading && !error && searchResults.length > 0 && (
                <>
                    {searchResults.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            setSelectedMovie={setSelectedMovie}
                            onClick={() => {
                                handleMovieClick(movie);
                            }}
                        />
                    ))}
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>{currentPage}</span>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

            {selectedMovie && (
                <MovieDetails
                    movie={selectedMovie}
                    onClose={handleCloseMovieDetails}
                />
            )}
        </div>
    );
};

export default SearchResults;


// import React, { useState, useEffect } from "react";
// import MovieCard from "./molecule/MovieCard";
// import axios from "axios";
// import MovieDetails from "./molecule/MovieDetails";

// const SearchResults = ({ query }) => {
//     const [searchResults, setSearchResults] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(0);
//     const [selectedMovie, setSelectedMovie] = useState(null);

//     useEffect(() => {
//         const fetchMovies = async (page) => {
//             const api_key = process.env.REACT_APP_API_KEY;
//             const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}`;
//             try {
//                 const response = await axios.get(apiUrl, {
//                     headers: {
//                         Authorization: `Bearer ${api_key}`,
//                     },
//                 });

//                 setSearchResults(response.data.results);
//                 setTotalPages(response.data.total_pages);
//             } catch (error) {
//                 console.error("Error fetching search results:", error);
//             }
//         };
//         fetchMovies(currentPage);
//     }, [query, currentPage]);

//     const handlePreviousPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage((prevPage) => prevPage - 1);
//         }
//     };

//     const handleNextPage = () => {
//         if (currentPage < totalPages) {
//             setCurrentPage((prevPage) => prevPage + 1);
//         }
//     };

//     const handleMovieClick = (movie) => {
//         setSelectedMovie(movie);
//     };

//     const handleCloseMovieDetails = () => {
//         setSelectedMovie(null);
//     };

//     return (
//         <div>
//             {searchResults.map((movie) => (
//                 <MovieCard
//                     key={movie.id}
//                     movie={movie}
//                     setSelectedMovie={setSelectedMovie}
//                     onClick={() => {
//                         handleMovieClick(movie);
//                     }}
//                 />
//             ))}
//             {selectedMovie && (
//                 <MovieDetails
//                     movie={selectedMovie}
//                     onClose={handleCloseMovieDetails}
//                 />
//             )}
//             {searchResults.length > 0 ? (
//                 <div className="pagination">
//                     <button
//                         onClick={handlePreviousPage}
//                         disabled={currentPage === 1}
//                     >
//                         Previous
//                     </button>
//                     <span>{currentPage}</span>
//                     <button
//                         onClick={handleNextPage}
//                         disabled={currentPage === totalPages}
//                     >
//                         Next
//                     </button>
//                 </div>
//             ) : (
//                 <></>
//             )}
//         </div>
//     );
// };

// export default SearchResults;
