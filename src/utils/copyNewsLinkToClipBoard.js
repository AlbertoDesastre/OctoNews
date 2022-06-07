export const copyNewsLinkToClipBoard = (newsId) => {
  const urlToCopy = `${window.location.href}news/${newsId}`;
  navigator.clipboard.writeText(urlToCopy);
};
