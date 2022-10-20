const getMeals = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood', {
    method: 'GET',
  });
  const responseJSON = await response.json();
  return responseJSON;
};

export default getMeals;