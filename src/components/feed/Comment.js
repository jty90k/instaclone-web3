import sanitizeHtml from "sanitize-html";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  ${"" /* hasTag글씨 변경해주는 로직 */}
  mark {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    ${"" /* 마우스 커서 변경 : 화살표 -> 손모양 */}
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }) {
  // hasTag기능 예시) #I love shop, 무분별한 html을 없애주고 hasTag만 남게 해준다.
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );

  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
