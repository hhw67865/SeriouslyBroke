import axios from "axios";

const fetchAxios = async (obj, session) => {
  return axios({ ...obj, headers: { 'clerk': session.id } });
};

export default fetchAxios;
