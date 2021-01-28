import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import MovieCard from "./MovieCard";


test('renders base ui', () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText("Search movies");
  const loadMoreButton = screen.getByText("Load more");
  expect(searchElement).toBeInTheDocument();
  expect(loadMoreButton).toBeInTheDocument();
});

test('serch input updates state', async () => {
  render(<App />);
  const searchElement = screen.getByPlaceholderText("Search movies");

  let fakeMovies = {
    "page": 1,
    "results": [
      {
        "poster_path": "/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
        "adult": false,
        "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
        "release_date": "2012-04-25",
        "genre_ids": [
          878,
          28,
          12
        ],
        "id": 24428,
        "original_title": "The Avengers",
        "original_language": "en",
        "title": "The Avengers",
        "backdrop_path": "/hbn46fQaRmlpBuUrEiFqv0GDL6Y.jpg",
        "popularity": 7.353212,
        "vote_count": 8503,
        "video": false,
        "vote_average": 7.33
      },
    ],
    "total_results": 1,
    "total_pages": 1
  }

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeMovies)
    })
  );

  fireEvent.change(searchElement, { target: { value: 'Ave' } });

  const titleElem = await screen.findByText("The Avengers");
  expect(titleElem).toBeInTheDocument();

  global.fetch.mockRestore();
})

test("renders movie card", () =>{
  let fakeMovie = {
    title: "Test Movie",
    releaseDate:"2002-09-12", 
    overview:"This is a test", 
    rating:0.0, 
    posterPath: null,
    numReviews: 0
  };
  render(
    <MovieCard 
    title={fakeMovie.title} 
    releaseDate={fakeMovie.releaseDate} 
    overview={fakeMovie.overview}
    rating={fakeMovie.rating}
    posterPath={fakeMovie.posterPath}
    numReviews={fakeMovie.numReviews}/>);
  const titleElem = screen.getByText(fakeMovie.title);
  const yearElem = screen.getByText("2002");
  const overviewElem = screen.getByText(fakeMovie.overview);
  const reviewElem = screen.getByText("0 reviews");
  expect(titleElem).toBeInTheDocument();
  expect(yearElem).toBeInTheDocument();
  expect(overviewElem).toBeInTheDocument();
  expect(reviewElem).toBeInTheDocument();
})
