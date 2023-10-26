import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";
import { UserButton } from "@clerk/clerk-react";

const Summary = () => {
  const session = useContext(SessionContext);
  session.getToken().then(console.log)
  console.log(session)

  return (
    <>
      <div>Hello {session.user.fullName?session.user.fullName:session.user.username}!</div>
      <UserButton afterSignOutUrl={"/"} userProfileMode="modal" />
    </>
  );
}
export default Summary;