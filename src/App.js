import Header from './components/Header';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Maincontent } from './components/Maincontent';

let searchDelay = null;

const App = () => {


	const [animeList, setAnimeList] = useState([])
	const [topAnime, setTopAnime] = useState([])
	const [search, setSearch] = useState('')
	const [loading,setLoading] = useState()
	const [page,setPage] = useState(1)

	useEffect(() => {
		GetTopAnime();
	
	}, [] )

	
	// useEffect(() => {
	// 	const loadAnime = async () => {
	// 	  const newAnime = await GetTopAnime(page);
	// 	  setTopAnime((prev) => [...prev, ...newAnime]);
	// 	  console.log(topAnime)
	// 	};
	
	// 	loadAnime();
		
	//   }, [page]);



	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());
			setTopAnime(temp.top.slice(0,10))
	}

	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

		if ((scrollTop + clientHeight) >= (scrollHeight-100)) {
			setPage(prev => prev + 1)
			
		}
	
	}


	useEffect(() => {
		const downAnime = async () => {
		  const listAnime = await GetAnimeList(search, page);
		  setAnimeList((prev) => [...prev, ...listAnime]);
		  console.log(listAnime)
		};
	
		downAnime();
		
	  }, [page]);



	const GetAnimeList = async (search, page) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=20&page=${page}`)
			.then(res => res.json());
			return (temp.results)
	}







	const handleSearch = e => {
		const searchValue = e.target.value;
		
		setSearch(searchValue)

		clearTimeout(searchDelay);

		if (searchValue) {
      searchDelay = setTimeout(async () => {

				fetch(`https://api.jikan.moe/v3/search/anime?q=${searchValue}&order_by=title&sort=asc&limit=20&page=1`)
				.then(res => res.json())
				.then(result => {

					if (result.results) {
						setAnimeList(result.results);
						setSearch('')
						setLoading(true)
					}
				});

      }, 1000);
    
	}

	}

	




	
	// const getSearch = e => {

	// 	if (e.key === 'Enter') {
	// 		fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=20`)
	// 			.then(res => res.json())
	// 			.then(result => {
	// 				setAnimeList(result.results)
	// 				setSearch('')
	// 			})
	// 	}
	// }

	return (
		<div className="App">
			<Header />
			<div className='content-wrap' onScroll={handleScroll}>
				<Maincontent handleSearch={handleSearch} search={search} animeList={animeList} loading={loading} setLoading={setLoading}/>
				<Sidebar topAnime={topAnime} />
			</div>
		</div>
	);
}

export default App;
