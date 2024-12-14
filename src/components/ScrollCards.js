import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import MovieDetails from "./molecule/MovieDetails";

function ScrollCards({ heading, selectItems }) {
    const [currentFilter, setCurrentFilter] = useState(selectItems[0].category);
    const [urllink, setURL] = useState(selectItems[0].url);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const {
        isLoading,
        error,
        data: movies,
    } = useQuery(
        ["movies", urllink],
        () => {
            const api_key = process.env.REACT_APP_API_KEY;
            return axios
                .get(urllink, {
                    headers: {
                        Authorization: `Bearer ${api_key}`,
                    },
                })
                .then((response) => {
                    return response.data.results;
                });
        },
        {
            staleTime: Infinity, // Adjust stale time as needed
            cacheTime: Infinity, // Adjust cache time as needed
        }
    );

    const handleFilterClick = (filterValue, urlValue) => {
        setCurrentFilter(filterValue);
        setURL(urlValue);
    };

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseMovieDetails = () => {
        setSelectedMovie(null);
    };

    const getStarColor = (rating) => {
        if (rating >= 8) {
            return "#4CAF50"; // Green for high ratings (8 and above)
        } else if (rating >= 6) {
            return "#FFC107"; // Yellow for medium ratings (6 to 7.9)
        } else {
            return "#F44336"; // Red for low ratings (below 6)
        }
    };

    return (
        <div className="scrollcard">
            <div className="section__header">
                <h2>{heading}</h2>
                <div className="ui-group">
                    {selectItems.map((i, index) => (
                        <button
                            key={index}
                            className={`button ${
                                currentFilter === `${i.category}`
                                    ? "is-checked"
                                    : ""
                            }`}
                            onClick={() =>
                                handleFilterClick(`${i.category}`, `${i.url}`)
                            }
                        >
                            {i.category}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error fetching movies: {error.message}</p>
            ) : (
                <section>
                    <div className="wrapper">
                        {movies?.map((item, index) => (
                            <div
                                key={index}
                                className="card"
                                onClick={() => handleMovieClick(item)}
                            >
                                <div className="card__body">
                                    <img
                                        loading="eager"
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                                        className="card__image"
                                        alt={item.title}
                                    />
                                    <p className="card__description">
                                        <i
                                            style={{
                                                color: getStarColor(
                                                    item.vote_average
                                                ),
                                            }}
                                            className="fa fa-star"
                                        />{" "}
                                        {item.vote_average}
                                    </p>
                                    <p className="card__title">
                                        {item.title || item.original_name}
                                    </p>
                                    <p className="card__description">
                                        {item.release_date ||
                                            item.first_air_date}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {selectedMovie && (
                <MovieDetails
                    movie={selectedMovie}
                    onClose={handleCloseMovieDetails}
                />
            )}
        </div>
    );
}

export default ScrollCards;
