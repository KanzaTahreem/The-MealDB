const url = https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ngliiMWYNlvOIhJPbqhb/comments;

const getData = async () => {
  const { result } = await fetch(url).then((response) => response.json());
  return result;
};

const postData = async (item_id, username,comment) => {
  const data = { item_id, username,comment };
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
  return result;
};

export { getData, postData };
