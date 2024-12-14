import React from "react";

function MovieCard({ movie, setSelectedMovie }) {
    const handleClick = () => setSelectedMovie(movie);

    const getStarColor = (rating) => {
        return rating >= 8
            ? "#4CAF50" // Green for high ratings
            : rating >= 6
            ? "#FFC107" // Yellow for medium ratings
            : "#F44336"; // Red for low ratings
    };

    const ratingStyle = {
        width: 38,
        height: 38,
        color: "black",
        backgroundColor: getStarColor(movie.vote_average),
    };

    return (
        <div className="moviecard" onClick={handleClick}>
            <img
                className="image"
                src={`https://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`}
                alt={movie.title}
            />
            <div className="infobar">
                <div
                    className="title-section"
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <div className="movie-title">
                        <div className="ring" style={ratingStyle}>
                        {movie.vote_average !== undefined ? movie.vote_average.toFixed(1) : "N/A"}
                        </div>
                        <div className="title">
                            <div>
                                <h2>{movie.title}</h2>
                            </div>
                            <span className="release_date">
                                {movie.release_date}
                            </span>
                        </div>
                    </div>
                    {/* Removed unused button section */}
                </div>
                <div className="overview">
                    <p>{movie.overview}</p>
                </div>
                {/* Removed unused button */}
            </div>
        </div>
    );
}

export default MovieCard;
