export default function queryFilter(moviesArray, inputSearch, shorts) {
  if (!moviesArray) return moviesArray;

  let filteredMovies = moviesArray;

  if (inputSearch) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(inputSearch.toLowerCase())
    );
  };

  if (shorts) {
    return filteredMovies.filter((movie) => movie.duration <= 40);
  }

  return filteredMovies;
}
