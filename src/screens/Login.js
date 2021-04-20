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

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

function Login() {
  const { register, watch, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    console.log(data);
  };
  const onSubmitInvalid = (data) => {
    console.log(data, "invalid");
  };
  return (
    <AuthLayout>
      <PageTitle title="Login in" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", {
              required: "Username is required",
              minLength: 5,
              validate: async (currentValue) => currentValue.includes("Potato"),
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", { required: "Password is requried" })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
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
