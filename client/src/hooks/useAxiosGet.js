import { useState, useEffect } from "react";
import fetchAxios from "../lib/fetchAxios";
import formatAxiosErrors from "../utils/formatAxiosErrors";

const useAxiosGet = (url, session) => {
  const [data, setData] = useState([]);
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
  }, [update, session]);

  return { data, error, updateData };
};

export default useAxiosGet;
