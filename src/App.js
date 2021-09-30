import Header from './components/Header';
import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Maincontent } from './components/Maincontent';

let searchDelay = null;

const App = () => {


	const [animeList, setAnimeList] = useState([])
	const [topAnime, setTopAnime] = useState([])
	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(false);
	const [dataLimitExceeded, setDataLimitExceeded] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		GetTopAnime();

		fetchAnime("");
	}, []);

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());
		setTopAnime(temp.top.slice(0, 10))
	}


	// useEffect(() => {
	// 	const loadAnime = async () => {
	// 	  const newAnime = await GetTopAnime(page);
	// 	  setTopAnime((prev) => [...prev, ...newAnime]);
	// 	  console.log(topAnime)
	// 	};

	// 	loadAnime();

	//   }, [page]);





	const handleScroll = (event) => {
		const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

		if ((scrollTop + clientHeight) >= (scrollHeight - 100)) {
			if (!loading) {
				setPage(prev => prev + 1)
			}

		}

	}



	const GetAnimeList = async (search, page) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${search}&order_by=title&sort=asc&limit=20&page=${page}`)
			.then(res => res.json());
		return (temp.results)
	}

	useEffect(() => {
		// const downAnime = async () => {
		//   const listAnime = await GetAnimeList(search, page);
		//   setAnimeList((prev) => [...prev, ...listAnime]);
		//   console.log(listAnime)
		// };

		// downAnime();
		if (page > 1) {
			fetchAnime("");
			console.log("Page called...", page);
		}

	}, [page]);

	// useEffect(() => {
	// 	console.log("search called...", search);
	// }, [search]);

	const handleSearch = (e) => {
		const searchValue = e.target.value;

		// Sync
		setSearch(searchValue);
		setPage(1);
		setAnimeList([]);
		fetchAnime(searchValue, 1);

	}

	const fetchAnime = (searchValue = "", pageNo = 0) => {

		setLoading(true);
		const finalSearch = searchValue || search;
		const finalPageNo = pageNo || page;

		clearTimeout(searchDelay);

		searchDelay = setTimeout(async () => {
			fetch(`https://api.jikan.moe/v3/search/anime?q=${finalSearch}&order_by=title&sort=asc&limit=20&page=${finalPageNo}`)
				.then(res => res.json())
				.then(result => {

					if (result.results) {
						setAnimeList((prev) => [...prev, ...result.results]);
					}
					setLoading(false)
					console.log("false");
				});

		}, 1000);

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
				<Maincontent handleSearch={handleSearch} search={search} animeList={animeList} loading={loading} />
				<Sidebar topAnime={topAnime} />
			</div>
		</div>
	);
}

export default App;
