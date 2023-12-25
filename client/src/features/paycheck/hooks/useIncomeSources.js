import { useState, useEffect } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";

const useIncomeSources = (url, session) => {
  const [incomeSources, setIncomeSources] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAxios(
      {
        url: url,
      },
      session,
    )
      .then((res) => {
        setIncomeSources(
          res.data.map((incomeSource) => {
            return {
              value: incomeSource.id,
              label: incomeSource.name,
            };
          }),
        );
      })
      .catch((err) => {
        setError(formatAxiosErrors(err));
      });
  }, []);

  return { incomeSources, error };
};

export default useIncomeSources;
