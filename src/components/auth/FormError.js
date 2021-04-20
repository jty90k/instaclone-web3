import styled from "styled-components";

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function FormError({ message }) {
  // message의 값이 빈 문자열인 경우 아무것도 보여주지 않는다 (null)
  // 근데 이 경우 message가 빈 문자열이거나 혹은 message가 존재하지 않으면null을 보여준다.
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;
