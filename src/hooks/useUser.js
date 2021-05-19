import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";

export const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

// 사용자가 Local Storage를 통해 로그인 한 경우에만 실행되는 query / 즉, Local Storage에 토큰을 가지고 있는 경우를 뜻한다.
// 사용자가 로그인 했는지를 먼저 확인했다. / 리액트 js상에서 유저가 로그인 했는지를 확인했다.
function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  //useEffect는 hook가 마운트되면 한 번 실행되고, 데이터가 변경될 때마다 실행 된다.
  // token 보내는 로직
  useEffect(() => {
    if (data?.me !== undefined && data.me === null) {
      logUserOut();
    }
  }, [data]);
  // data : Avatar 사진을 위해서 반환한다.
  return { data };
}
export default useUser;
