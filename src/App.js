import { useReactiveVar } from "@apollo/client";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import { darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyles, lightTheme } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path={routes.home} exact>
            {isLoggedIn ? <Home /> : <Login />}
            {/* Route는 로그인 하지 않았을 때에만 접근할 수 있다. */}
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp}>
              <SignUp />
            </Route>
          ) : null}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
export default App;

// Router 란?
// Router는 components를 보여줘. 특정 URL로 가게되면
// 1) has router  // 2) browser router
// (1)http://localhost:3000/#/banana 중간에 Hash 값이 있어서 Hashrouter가 된다.
// (2)

//  로그인 안 했으면, "Login"을 볼 거야*/}
//   이런방식으로 한다. 왜? 어떤 routes는 로그인했을 때, 안했을 때 둘 다 사용할 수 있기 때문이야 */}
//   어떤 routes는 로그아웃했을 때에만 접근이 가능해. 예를 들면, 계정을 만드는 거 말이야 */}
//   isLoggedIn ? (
//     <Home setIsLoggedIn={setIsLoggedIn} />
//   ) : (
//     <Login setIsLoggedIn={setIsLoggedIn} />
//   )}

// router는 많은 route를 동시에, 할 수 있는 한 최대로 render할 거야.
// exact : 말 그대로 URL이 정확히 맞는지 확인해 (정확히 원하는 부분만써야 한다는 뜻)
// Switch를 사용한다면, 그건 불가능해. Switch는 여러분의 router가 한번에 하나만 render할 수 있게 해주거든.
// react router의 설징 때문에 pattern matching을하는데, 이 경로(/)는 potato와 banana와도 매치가 될 거야
// path= ~ 사용자가 이 경로로 가게 되면 보게 되는 것들
