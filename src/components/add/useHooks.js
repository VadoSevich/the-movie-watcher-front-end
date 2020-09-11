import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { uploadMovieList } from "@store/modules/movies/middleware";

const DEFAULT_INPUT_FILE_MESSAGE = "Upload File ...";

const useHooks = () => {
  const [listLabel, setListLabel] = useState(DEFAULT_INPUT_FILE_MESSAGE);
  const [isBtnDisabled, setIsBtnDisabled] = useState(null);

  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.accept = ".txt";
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      const file = inputRef.current.files[0];
      const isFileUpload = Boolean(file);

      setIsBtnDisabled(!isFileUpload);
    }
  }, [listLabel]);

  const changed = e => {
    setListLabel(e.target.files[0].name);
  };

  const upload = async e => {
    e.preventDefault();
    const file = inputRef.current.files[0];

    const formData = new FormData();
    await formData.append("file", file);

    dispatch(uploadMovieList(formData));

    inputRef.current.value = "";
    inputRef.current.files = null;

    setListLabel(DEFAULT_INPUT_FILE_MESSAGE);
  };

  return {
    addProps: {
      isBtnDisabled,
      changed,
      upload,
      inputRef,
      listLabel
    }
  };
};

export default useHooks;
