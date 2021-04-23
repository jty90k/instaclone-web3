import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";
// 이 작업으로 makeVar는 String 아니면 null 값을 줄 거야
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("token")));

// 로그인 token 저장 로직
export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
// 로그아웃 token 저장 삭제 로직
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);
export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
