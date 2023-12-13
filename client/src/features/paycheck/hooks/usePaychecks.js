import { useState, useEffect } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const usePaychecks = (url, session) => {
  const [paychecks, setPaychecks] = useState(null);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(false);

  const updatePaychecks = () => {
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
        setPaychecks(res.data);
      })
      .catch((err) => {
        setError(formatAxiosErrors(err));
        console.log(err);
      });
  }, [update]);

  return { paychecks, error, updatePaychecks };
};

export default usePaychecks;
