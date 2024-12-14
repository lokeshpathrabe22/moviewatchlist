import "./App.css";
import React, { useState } from "react";
import ScrollCards from "./components/ScrollCards";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";
import MyWatchlist from "./components/WatchList";
import Home from "./components/molecule/Home";

function App() {
    const [searchQuery, setSearchQuery] = useState("");
    const [showWatchlist, setShowWatchlist] = useState(false);

    const handleCloseWatchlist = () => {
        setShowWatchlist(false);
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const firstsection = [
        {
            category: "In Theaters",
            url: "https://api.themoviedb.org/3/discover/movie",
        },
        { category: "On TV", url: "https://api.themoviedb.org/3/discover/tv" },
        {
            category: "Trending Movies",
            url: "https://api.themoviedb.org/3/trending/movie/day",
        },
    ];

    const secondsection = [
        {
            category: "Top Rated",
            url: "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        },
        {
            category: "Upcoming",
            url: "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        },
    ];

    return (
        <>
            <Navbar
                setShowWatchlist={setShowWatchlist}
                onSearch={handleSearch}
            />

            {/* Show search results only if there's a query */}
            {searchQuery ? (
                <div>
                    <SearchResults query={searchQuery} />
                </div>
            ) : (
                <>
                    {/* Show home page when no search query */}
                    <Home />
                    <ScrollCards
                        heading={"What's Popular"}
                        selectItems={firstsection}
                    />
                    <div style={{ backgroundColor: "whitesmoke" }}>
                        <ScrollCards
                            style={{ backgroundColor: "#333" }}
                            heading={"Movies"}
                            selectItems={secondsection}
                        />
                    </div>
                </>
            )}

            {showWatchlist && <MyWatchlist onClose={handleCloseWatchlist} />}
        </>
    );
}

export default App;
