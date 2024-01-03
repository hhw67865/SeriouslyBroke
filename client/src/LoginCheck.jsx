import { useEffect, useState } from "react";
import fetchAxios from "./lib/fetchAxios";
import Data from "./Data";

const LoginCheck = ({ session }) => {
  const [signedIn, setSignedIn] = useState(false);
  useEffect(() => {
    fetchAxios({ method: "GET", url: "/api/users" }, session).then(() => {
      setSignedIn(true);
    })
    .catch((err) => {
      console.log(err);
      setSignedIn(false);
      console.log("failed to signin")
    });
  }, [session]);
  return <>{signedIn && <Data session={session} />}</>;
};
export default LoginCheck;
