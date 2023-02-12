import axios from 'axios';

export const storyCategorys = {
  top: 'topstories',
  new: 'newstories',
  best: 'beststories',
};

export async function getTopN(n, category) {
  const topNId = await getTopNId(n, category);
  const topItems = await Promise.all(
    topNId.map(async (id) => {
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

async function getTopNId(n, category) {
  if (n < 0 || n > 500) {
    throw new Error('Invalid number, N must grater than 0 and less than 500');
  }
  const top500Id = await getTop500(category);
  return top500Id.slice(0, n);
}

async function getItemById(id) {
  const { data: item } = await axios.get(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`
  );
  return item;
}
