import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
    const [randomBackdrop, setRandomBackdrop] = useState(null); // Initial state as null to avoid empty image

    useEffect(() => {
        const fetchMovies = async () => {
            const api_key = process.env.REACT_APP_API_KEY;
            const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day`;
            try {
                const response = await axios.get(trendingMoviesUrl, {
                    headers: {
                        Authorization: `Bearer ${api_key}`,
                    },
                });
                const movies = response.data.results;
                const randomIndex = Math.floor(Math.random() * movies.length);
                const randomMovie = movies[randomIndex];
                setRandomBackdrop(randomMovie.backdrop_path);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchMovies();

        const intervalId = setInterval(fetchMovies, 15000); // Store interval id for cleanup

        return () => clearInterval(intervalId); // Cleanup function using stored id
    }, []);

    return (
        <div className="hero-section">
        <>
            <div className="hero-background">
                {randomBackdrop && ( // Conditionally render image only if backdrop exists
                    <img
                        src={`https://image.tmdb.org/t/p/original/${randomBackdrop}`}
                        alt="Hero Background"
                    />
                )}
            </div>
            <div className="hero-content">
                <p>Discover and explore your favorite movies and TV shows.</p>
            </div>
            </>
        </div>
    );
};

export default Home;
