import React from 'react'

export const Sidebar = ({topAnime}) => {
    return (
        <aside>
            <nav>
            <h3>Top Anime</h3>
            {topAnime.map(anime => (
                 <a href = {anime.url} target = '_blank' rel ='noreferrer' key={anime.mal_id}>
                 {anime.title}
                 </a>
            ))}
            </nav>
        </aside>
    )
}
