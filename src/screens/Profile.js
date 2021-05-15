import { useLocation, useParams } from "react-router";

function Profile() {
  const params = useParams();
  console.log(params);
  return "Profile";
}

export default Profile;
