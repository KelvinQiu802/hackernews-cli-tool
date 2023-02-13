import axios from 'axios';

export const storyCategorys = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
};

export async function getTopByRange(start, end, category) {
  const topId = await getTopIdByRange(start, end, category);
  const topItems = await Promise.all(
    topId.map(async (id) => {
      return await getItemById(id);
    })
  );
  return topItems;
}

async function getTop500(category) {
  try {
    const { data: top500Id } = await axios.get(
      `https://hacker-news.firebaseio.com/v0/${category}.json`
    );
    return top500Id;
  } catch (error) {
    throw new Error('Unable to connect to the API server');
  }
}

async function getTopIdByRange(start, end, category) {
  const top500Id = await getTop500(category);
  return top500Id.slice(start, end);
}

async function getItemById(id) {
  const { data: item } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return item;
}
