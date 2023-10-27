import axios from "axios";

const useAxios = async (obj, session) => {
  return axios({ ...obj, headers: { session_id: session.id } });
};

export default useAxios;
