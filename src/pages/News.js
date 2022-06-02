import { Header } from "../components/Header";
/* import { NewsCards } from "../components/NewsCards"; */
import { LoginOrRegisterBox } from "../components/LoginOrRegisterBox";
import { CreateComment } from "../components/CreateComment";
import { CommentsBanner } from "../components/CommentsBanner";

export const News = () => {
  return (
    /* Este div me hace falta para poder separar las 
    secciones */
    <main>
      <div className="news-page">
        <Header />
        {/*  <NewsCards props={props} /> */}

        <LoginOrRegisterBox />
        <CreateComment />
        <CommentsBanner />
      </div>
    </main>
  );
};
