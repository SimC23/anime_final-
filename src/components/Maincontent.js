import React from 'react'
import AnimeCard from './AnimeCard'


export const Maincontent = ({ search, handleSearch, animeList, loading }) => {


	const handleSubmit = e => {
		e.preventDefault()
		// setLoading(false)
	}

	return (
		<main>
			<div className='main-head'>
				<form
					className="search-box"
					onSubmit={handleSubmit}
				>
					<input
						type="search"
						placeholder="Search for an anime..."
						required
						value={search}
						onChange={handleSearch}
					// onKeyPress={getSearch}
					/>
				</form>
			</div>
			<div className='main-head'>
				{loading && (<span>Loading...</span>)}
			</div>
			<div className="anime-list" >
				{animeList.map(anime => (
					<AnimeCard
						anime={anime}
						key={anime.mal_id}
					/>
				))}
			</div>
		</main>
	)
}
