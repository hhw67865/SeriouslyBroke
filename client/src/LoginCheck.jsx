import { useEffect, useState } from "react";
import fetchAxios from "./lib/fetchAxios";
import Data from "./Data";
import { useClerk } from "@clerk/clerk-react";


const LoginCheck = ({ session }) => {
  const [signedIn, setSignedIn] = useState(false);
  const { signOut } = useClerk();
  
  useEffect(() => {
    fetchAxios({ method: "GET", url: "/api/users" }, session).then(() => {
      setSignedIn(true);
    })
    .catch(() => {
      setSignedIn(false);
      signOut();
    });
  }, []);
  return <>{signedIn && <Data session={session}/>}</>;
};
export default LoginCheck;
