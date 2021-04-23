import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  # 아래 login은 연결된 곳이 없고 여기서 시작
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

function Login() {
  const location = useLocation();
  console.log(location);
  // getValues는 우리가 필요한 값을 불러 준다.
  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    // clearErros를 하면 아이디를 잘 못 써도 에러를 없애주고 다시 활성화된다.
    clearErrors,
  } = useForm({
    mode: "onChange",
    // 회원가입 후 home으로 돌아온 뒤 아이디와 패스워드가 기본값으로 뜬다.
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    // 왜 이런 식으로 error를 return 받는지 이해하기
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      // 받은 토큰을 저장하는 방법  // 원한다면 token을 저장하는 기능이 담긴 파일 하나를 생성, token을 삭제하는 기능이 담긴 파일을 생성해서 token을 관리 할 수도 있어
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };
  // argument 없이 호출하면 모든 에러들을 없애줄 거야
  const clearLoginError = () => {
    clearErrors("result");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login in" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          {/* Username */}
          <Input
            ref={register({
              required: "Username is required",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            onChange={clearLoginError}
            name="username"
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            onChange={clearLoginError}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            // form이 유효(isVaild)하지 않으면 disabled라 클릭이 안된다.
            // 동시에 우리가 설정한 error가 뜨도록 설정함.  if (!ok) {setError("result", { message: error })
            // 그래서 아이디를 지워도 invalid 상태이다.
            disabled={!formState.isValid || loading}
          />
          {/* 에러가 글씨가 뜨게 하는 로직 */}
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        linkText="Sign up"
        link={routes.signUp}
      />
    </AuthLayout>
  );
}
export default Login;
