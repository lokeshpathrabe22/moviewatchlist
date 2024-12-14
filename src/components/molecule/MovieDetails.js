import React, { useState } from "react";

const MovieDetails = ({ movie, onClose }) => {
    const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(
        JSON.parse(localStorage.getItem("watchlist"))?.some(
            (item) => item.id === movie.id
        ) || false
    );

    const handleAddToWatchlist = () => {
        // Add the movie to the watchlist in local storage
        const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        if (!watchlist.some((item) => item.id === movie.id)) {
            watchlist.push(movie);
            localStorage.setItem("watchlist", JSON.stringify(watchlist));
            setIsAddedToWatchlist(true);
        }
    };

    return (
        <div className="movie-details">
            <div className="movie-info">
                <div className="close-button" onClick={onClose}>
                    <i class="fa fa-times" />
                </div>
                <img
                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                    alt={movie.title}
                />
                <div className="content-overview">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <button
                        className="add-btn"
                        onClick={handleAddToWatchlist}
                        disabled={isAddedToWatchlist}
                    >
                        {isAddedToWatchlist
                            ? "Added to Watchlist"
                            : "Add to Watchlist"}
                    </button>
                    {/* {isAddedToWatchlist ? (
            <button className='card__btn' onClick={handleRemoveFromWatchlist}><i class="fa fa-trash"/> Remove from Watchlist</button>
          ) : (
            <button className='add-btn' onClick={handleAddToWatchlist}><i class="fa fa-plus"/> Add to Watchlist</button>
          )} */}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
