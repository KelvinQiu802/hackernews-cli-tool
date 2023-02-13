export default function getUrlByIndex(news, index) {
  if (news[index].url) {
    return news[index].url;
  }
  return `https://news.ycombinator.com/item?id=${news[index].id}`;
}
