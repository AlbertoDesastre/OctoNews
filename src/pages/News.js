import { Header } from "../components/Header";
/* import { NewsCards } from "../components/NewsCards"; */
import { LoginOrRegisterBox } from "../components/LoginOrRegisterBox";
import { CreateComment } from "../components/CreateComment";
import { CommentsBanner } from "../components/CommentsBanner";

export const News = () => {
  return (
    <>
      <Header />
      {/* <NewsCards /> */}
      <LoginOrRegisterBox />
      <CreateComment />
      <CommentsBanner />
    </>
  );
};
