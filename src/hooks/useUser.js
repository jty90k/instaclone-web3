import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

// 사용자가 Local Storage를 통해 로그인 한 경우에만 실행되는 query / 즉, Local Storage에 토큰을 가지고 있는 경우를 뜻한다.
function useUser() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery(ME_QUERY, {
    skip: !isLoggedIn,
  });
  console.log(data, error);
  return;
}
export default useUser;
