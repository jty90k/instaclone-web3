import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 10px;
  ${"" /* hasTag글씨 변경해주는 로직 */}
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    ${"" /* 마우스 커서 변경 : 화살표 -> 손모양 */}
    cursor: pointer;
    ${"" /* 마우스 커서 이동시 hasTag에 밑줄이 생긴다. */}
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Comment({ author, payload }) {
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption>
        {payload.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word}</Link>{" "}
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
    </CommentContainer>
  );
}

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;
