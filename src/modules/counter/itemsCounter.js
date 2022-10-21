const ItemsCounter = () => {
  const mealsEl = document.querySelectorAll('.meals-section > div');
  return mealsEl.length;
};

export default ItemsCounter;
