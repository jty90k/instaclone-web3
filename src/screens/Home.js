import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";

export const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      comments
      createdAt
      isMine
      isLiked
    }
  }
`;

function Home() {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}
export default Home;
// id={photo.id} user={photo.user}
// file={photo.file} isLiked={photo.isLiked} likes={photo.likes}
