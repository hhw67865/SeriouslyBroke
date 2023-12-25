import { useState, useEffect } from "react";
import fetchAxios from "../lib/fetchAxios";
import formatAxiosErrors from "../utils/formatAxiosErrors";

const useAxios = (url, session) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const updateData = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    fetchAxios(
      {
        url: url,
      },
      session,
    )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(formatAxiosErrors(err));
      });
  }, [update]);

  return { data, error, updateData };
};

export default useAxios;
