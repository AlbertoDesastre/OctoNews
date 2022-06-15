import { useEffect, useState } from "react";
import { copyNewsLinkToClipBoard } from "../../../utils/copyNewsLinkToClipBoard";
import { DropdownMenu } from "./DropdownMenu";
import { LikeDislikeButtons } from "./LikeDislikeButtons";

export const FooterNewsCard = ({ className, votes, comments, newsId }) => {
  const [isDropdownShare, setIsDropdownShare] = useState(false);

  const handleDropdown = (e) => {
    setIsDropdownShare(!isDropdownShare);
    copyNewsLinkToClipBoard(newsId);
  };

  useEffect(() => {
    let countdownToHide;
    if (isDropdownShare) {
      countdownToHide = setTimeout(() => {
        setIsDropdownShare(false);
      }, 1000);
    }

    return () => {
      clearTimeout(countdownToHide);
    };
  }, [isDropdownShare]);

  return (
    <footer
      className={className ? "news-page" : "action-news"}
      id={className ? "action-from-news" : undefined}
    >
      <button
        className={className ? className + " share" : "share"}
        type="button"
        onClick={handleDropdown}
      />
      <DropdownMenu
        isDropdown={isDropdownShare}
        idOfDropDown={
          className === "news-page" ? "drop-down-on-news-page" : null
        }
      />
      <button className="comments" type="button">
        {comments}
      </button>
      <LikeDislikeButtons votes={votes} idNews={newsId} />
    </footer>
  );
};
