import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {useState, useEffect} from 'react';
import MovieCard from './MovieCard';
import {SEARCH_API, getSimilarMoviesEndpoint} from "./APIUtils";

const useStyles = makeStyles((theme) => ({
  title : {
    margin: "0 auto"
  },
  loadMore: {
    margin: "0 auto",
    width: "100%"
  },
  movie: {
    width: "100%"
  }

}));

function App() {

  function updateQuery(evt) {
    const input = evt.target.value;
    const newQuery = encodeURIComponent(input);
    if (newQuery.length > 0 && input.replace(/\s/g, '').length) {
      setQuery(newQuery);
      setPage(1);
    }
  }

  function loadMore() {
    setPage(page + 1);
    window.scrollTo(0,0);
  }  

  function getMovieData(movie) {
    return {
      id:movie.id, 
      title:movie.title, 
      releaseDate:movie.release_date, 
      rating:movie.vote_average, 
      numReviews:movie.vote_count,
      posterPath:movie.poster_path,
      overview: movie.overview
    };
  }

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  async function searchMovies() {
    const fullEndpoint = SEARCH_API + "&query=" + query + "&page="+page.toString();
    try {
      const response = await fetch(fullEndpoint);
      const data = await response.json();
      const movieData = data['results'].map(getMovieData);
      setMovies(movieData);
    } catch(e) {
      console.warn(e);
    }
  }

  async function getSimilarMovies(movie_id) {
    try{
      const response = await fetch(getSimilarMoviesEndpoint(movie_id));
      const data = await response.json();
      const movieData = data['results'].map(getMovieData);
      setMovies(movieData);
    } catch (e) {
      console.warn(e);
    }
    
  }

  useEffect(() => {
    if (query.length > 0) {
      searchMovies(); 
    }
  }, [query, page]);

  return (
    <>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Movie Search App
        </Typography>
      </Toolbar>
    </AppBar>
    <Box component="div" p={4}>
      <Input placeholder="Search movies" fullWidth={true} inputProps={{ 'aria-label': 'search' }} onChange={updateQuery} />
    </Box>
    <Grid container spacing={1}>
      {movies.map((movie) => 
        <Grid container item spacing={3} key={movie.id}>
          <Grid item className={classes.movie}>
            <MovieCard 
              id={movie.id}
              title={movie.title}
              releaseDate={movie.releaseDate}
              overview={movie.overview}
              rating={movie.rating}
              posterPath={movie.posterPath}
              numReviews={movie.numReviews}
            />
            <Button variant="contained" onClick={() => getSimilarMovies(movie.id)}>Similar</Button>
          </Grid>
        </Grid>
      )}
    </Grid>
    <Button className={classes.loadMore} variant="contained" onClick={loadMore}>Load more</Button>
    </>
  );
}

export default App;
