import { useState, useEffect } from "react";
import fetchAxios from "../lib/fetchAxios";
import formatAxiosErrors from "../utils/formatAxiosErrors";

const useAxiosGet = (url, session, dependencies = []) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);

  const updateData = () => {
    setUpdate(!update);
  };

  useEffect(() => {
    setLoading(true);
    fetchAxios(
      {
        url: url,
      },
      session,
    )
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(formatAxiosErrors(err));
        console.log(`failed to fetch data ${url}`, err);
        setLoading(false);
      });
  }, [update, ...dependencies]);

  return { data, error, updateData, loading };
};

export default useAxiosGet;
