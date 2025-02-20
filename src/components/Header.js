import React from'react';
import '../styles.css' ;

export default function Headers(){
    return (
        <>
            <div className = 'header' >
                {/* logo .png have the png formate for this  */}
                <img className='logo' src= 'logo.png' alt="moviedux" />
                <h2 className="app-subtitle">Its time to popcorn! find the next movie </h2>

            </div>
        </>
    );
}