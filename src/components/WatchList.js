import React, { useState, useEffect } from "react";
import addmovie from "../assets/addmovie.jpg";

const MyWatchlist = ({ onClose }) => {
    // const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist =
            JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(storedWatchlist);
    }, []);

    const handleRemoveFromWatchlist = (movie) => {
        const updatedWatchlist = watchlist.filter(
            (item) => item.id !== movie.id
        );
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    const handleMarkWatched = (movie) => {
        const updatedWatchlist = watchlist.map((item) => {
            if (item.id === movie.id) {
                return { ...item, watched: true };
            }
            return item;
        });
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
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
        <div className="watchlist-cover">
            <div className="my-watchlist">
                <div className="close-button" onClick={onClose}>
                    <i class="fa fa-times" />
                </div>
                <h2>Watchlist</h2>
                <div>
                    {watchlist.length > 0 ? (
                        <>
                            {watchlist.map((movie) => (
                                <>
                                    <div key={movie.id} className="moviecard">
                                        <img
                                            style={{ borderRadius: "10px" }}
                                            src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`}
                                            width="100px"
                                            alt={movie.title}
                                        />
                                        <div className="infobar">
                                            <div className="title-section">
                                                <div className="movie-title">
                                                    <div
                                                        className="ring"
                                                        style={{
                                                            width: "38px",
                                                            height: "38px",
                                                            color: "black",
                                                            backgroundColor:
                                                                getStarColor(
                                                                    movie.vote_average
                                                                ),
                                                        }}
                                                    >
                                                        {movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A"}
                                                    </div>
                                                    <div className="title">
                                                        <div
                                                            style={{
                                                                width: "400px",
                                                                display:
                                                                    "-webkit-box",
                                                                webkitBoxOrient:
                                                                    "vertical",
                                                                overflow:
                                                                    "hidden",
                                                                textOverflow:
                                                                    "ellipsis",
                                                                webkitLineClamp:
                                                                    "1",
                                                            }}
                                                        >
                                                            <h2>
                                                                {movie.title}
                                                            </h2>
                                                        </div>
                                                        <span className="release_date">
                                                            {movie.release_date}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div>
                                                    {movie.watched ? (
                                                        <span className="watched">
                                                            Watched
                                                        </span>
                                                    ) : (
                                                        <button
                                                            className="add-btn"
                                                            onClick={() =>
                                                                handleMarkWatched(
                                                                    movie
                                                                )
                                                            }
                                                        >
                                                            Mark Watched
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => {
                                                            handleRemoveFromWatchlist(
                                                                movie
                                                            );
                                                        }}
                                                        className="card__btn"
                                                    >
                                                        <i class="fa fa-trash" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <p>{movie.overview}</p>
                                            </div>
                                            {/* <button className="card__btn">
                <i class="fa fa-trash"/>&nbsp;&nbsp;Remove from WatchList
                <i class="fa fa-plus"/>&nbsp;&nbsp;Add to WatchList
            </button> */}
                                        </div>
                                    </div>
                                </>
                            ))}
                        </>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                height: "500px",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            {" "}
                            Please add something to the watchlist!
                            <img
                                src={addmovie}
                                width="400px"
                                alt="Empty Watchlist"
                            />
                        </div>
                    )}
                </div>
                {/* {selectedMovie && (
        <MovieDetails movie={selectedMovie} onClose={handleCloseMovieDetails} />
      )} */}
            </div>
        </div>
    );
};

export default MyWatchlist;
