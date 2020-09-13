import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { clearStatus, clearRedirectTo } from "@store/modules/movies/reducer";
import { fetchMovies } from "@store/modules/movies/middleware";
import {
  selectSearchWord,
  selectFilteredMovies,
  selectPagination
} from "@store/modules/movies/selectors";

import useRedirect from "@hooks/useRedirect";

import View from "./view";

const useHooks = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const currentPage = params?.page || 1;

  useRedirect();

  const searchedWord = useSelector(selectSearchWord);
  const filteredMovies = useSelector(selectFilteredMovies);
  const pagination = useSelector(selectPagination);
  const paginationTotal = pagination?.total;
  const isNoMovies = paginationTotal === 0;
  const isNotFound = searchedWord && filteredMovies.length === 0;

  useEffect(() => {
    dispatch(fetchMovies(currentPage));

    return () => {
      dispatch(clearStatus());
      dispatch(clearRedirectTo());
    };
  }, [dispatch, paginationTotal, currentPage]);

  return (
    <View
      isNoMovies={isNoMovies}
      isNotFound={isNotFound}
      movies={filteredMovies}
      pagination={pagination}
    />
  );
};

export default useHooks;