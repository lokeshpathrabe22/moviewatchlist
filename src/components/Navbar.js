import React, { useState, useEffect } from "react";

function Navbar({ onSearch, setShowWatchlist, setHome }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleMyWatchlistClick = () => {
        setShowWatchlist(true);
    };

    const handleHome = () => {
        setHome(true);
        onSearch(""); // Clear search results when navigating home
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Trigger search whenever the user types
    useEffect(() => {
        onSearch(searchTerm);
    }, [searchTerm, onSearch]);

    return (
        <div className="navbar">
            <div
                className={`navbar_left ${isMenuOpen ? "collapsed" : ""}`}
                onClick={handleHome}
            >
                <span className="navbar_title" style={{ cursor: "pointer" }}>
                    MovieWatchlist
                </span>
            </div>
            <div className={`navbar_middle ${isMenuOpen ? "active" : ""}`}>
                <input
                    type="text"
                    placeholder="Search movies..."
                    onChange={handleInputChange}
                    value={searchTerm}
                />
            </div>
            <div className={`navbar_right ${isMenuOpen ? "active" : ""}`}>
                <button
                    className="watchlist_button"
                    onClick={handleMyWatchlistClick}
                >
                    Watchlist
                </button>
            </div>

            {/* Hamburger menu icon */}
            <div className="navbar_hamburger" onClick={toggleMenu}>
                {isMenuOpen ? (
                    <div className="close-icon">
                        <span className="line line1"></span>
                        <span className="line line2"></span>
                    </div>
                ) : (
                    "☰"
                )}
            </div>
        </div>
    );
}

export default Navbar;

// import React, { useState, useEffect } from "react";

// function Navbar({ onSearch, setShowWatchlist, setHome }) {
//     const [searchTerm, setSearchTerm] = useState("");

//     const handleInputChange = (event) => {
//         setSearchTerm(event.target.value);
//     };

//     const handleMyWatchlistClick = () => {
//         setShowWatchlist(true);
//     };

//     const handleHome = () => {
//         setHome(true);
//         onSearch(""); // Clear search results when navigating home
//     };

//     // Trigger search whenever the user types
//     useEffect(() => {
//         onSearch(searchTerm);
//     }, [searchTerm, onSearch]);

//     return (
//         <div className="navbar">
//             <div className="navbar_left" onClick={handleHome}>
//                 <span className="navbar_title" style={{ cursor: "pointer" }}>
//                     MovieWatchlist
//                 </span>
//             </div>
//             <div className="navbar_middle">
//                 <input
//                     type="text"
//                     placeholder="Search movies..."
//                     onChange={handleInputChange}
//                     value={searchTerm}
//                 />
//             </div>
//             <div className="navbar_right">
//                 <button
//                     className="watchlist_button"
//                     onClick={handleMyWatchlistClick}
//                 >
//                     Watchlist
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
