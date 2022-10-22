const postComment = async (itemId, name, message) => {
  const response = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YDk6ZvYJ9bRgBt60cLN9/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: itemId,
      username: name,
      comment: message,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const responseText = await response.text();
  return responseText;
};

const getComments = async (itemId) => {
  const response = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/YDk6ZvYJ9bRgBt60cLN9/comments?item_id=${itemId}`);
  if (response.status === 200) {
    const responseJSON = await response.json();
    return responseJSON;
  }
  return [];
};

export { postComment, getComments };
