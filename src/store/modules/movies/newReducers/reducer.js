import * as actions from "../actions";
import initialState from "../reducer/intialState";

function pending(state) {
  return {
    ...state,
    status: "loading",
    error: ""
  };
}

function rejected(state) {
  return {
    ...state,
    status: "failed",
    error: action.payload
  };
}

function fulfilled(state) {
  return {
    ...state,
    status: "succeeded",
    error: ""
  };
}

function saveMovies(state, action) {
  const stateFulfilled = fulfilled(state);
  const { items, ...rest } = action.payload;

  return {
    ...stateFulfilled,
    entities: items,
    pagination: rest
  };
}

function saveCurrentMovie(state, action) {
  const stateFulfilled = fulfilled(state);

  return {
    ...stateFulfilled,
    current: action.payload
  };
}

function saveMovieAfterCreate(state, action) {
  const stateFulfilled = fulfilled(state);
  const newEntities = state.entities.concat(action.payload);

  return {
    ...stateFulfilled,
    entities: newEntities,
    redirectTo: "movies/1"
  };
}

function saveMoviesAfterDelete(state, action) {
  const stateFulfilled = fulfilled(state);
  const filteredEntities = state.entities.filter(
    entity => entity.id !== action.payload.id
  );
  const redirectTo =
    filteredEntities.length === 0
      ? `movies/${state.pagination?.prevPage}`
      : `movies/${state.pagination?.currentPage}`;

  return {
    ...stateFulfilled,
    entities: filteredEntities,
    redirectTo
  };
}

function saveMoviesAfterUpload(state, action) {
  const stateFulfilled = fulfilled(state);

  return {
    ...stateFulfilled,
    pagination: {
      ...state.pagination,
      total: state.pagination.total + 1
    },
    redirectTo: "movies/1"
  };
}

function movieReducer(state = initialState, action) {
  switch (action.type) {
    // Fetch Movies
    case [actions.saveSearchWord]:
      return {
        ...state,
        searchWord: action.payload
      };

    case [actions.setRedirectTo]:
      return {
        ...state,
        redirectTo: action.payload
      };

    case [actions.clearError]:
      return {
        ...state,
        error: ""
      };

    case [actions.clearStatus]:
      return {
        ...state,
        status: ""
      };

    case [actions.clearRedirectTo]:
      return {
        ...state,
        redirectTo: ""
      };

    // Fetch Movies
    case [actions.fetchMovies.pending]:
      pending(state);

    case [actions.fetchMovies.fulfilled]:
      saveMovies(state, action);

    case [actions.fetchMovies.rejected]:
      rejected(state);

    // Fetch Current Movie
    case [actions.fetchMovieCurrent.pending]:
      pending(state);

    case [actions.fetchMovieCurrent.fulfilled]:
      saveCurrentMovie(state, action);

    case [actions.fetchMovieCurrent.rejected]:
      rejected(state);

    // Create Movie
    case [actions.createMovie.pending]:
      pending(state);

    case [actions.createMovie.fulfilled]:
      saveMovieAfterCreate(state, action);

    case [actions.createMovie.rejected]:
      rejected(state);

    // Delete new Movie
    case [actions.deleteMovie.pending]:
      pending(state);

    case [actions.createMovie.fulfilled]:
      saveMoviesAfterDelete(state, action);

    case [actions.createMovie.rejected]:
      rejected(state);

    // Upload Movies
    case [actions.uploadMovies.pending]:
      pending(state);

    case [actions.uploadMovies.fulfilled]:
      saveMoviesAfterUpload(state, action);

    case [actions.uploadMovies.rejected]:
      rejected(state);

    default:
      return initialState;
  }
}

export default movieReducer;
