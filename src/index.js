import './style.css';
import './stylesheets/slider.css';
import './stylesheets/meals.css';
import './stylesheets/comment.css';
import slideShow from './modules/slider.js';
import getMeals from './modules/getMeals.js';
import showPopup from './modules/commentsPopup.js';
import { getLikes } from './modules/getLikes.js';

const mealsSection = document.querySelector('.meals-section');
const popUpSection = document.querySelector('.popup-section');
const parser = new DOMParser();

slideShow();

let mealsList = [];
const likesArray = getLikes();
const loadInitialData = async () => {
  mealsList = await getMeals();
  mealsList.meals.forEach((data) => {
    const string = `
      <div>
        <img src="${data.strMealThumb}" alt="meal" class="meal-img">        
        <div class="meal-details">
          <div class="meal-desc">
            <p class="title m-0">${data.strMeal}</p>  
            <p class="like m-0" id="${data.idMeal}"><i class="fa-solid fa-heart"></i></p>
          </div>
          <button type="button" class="comment-btn">Comments</button>
        </div>
      </div>`;

    const stringElement = parser.parseFromString(string, 'text/html').body.firstChild;
    mealsSection.append(stringElement);

    const commentbtn = stringElement.querySelector('.comment-btn');
    commentbtn.addEventListener('click', (e) => {
      e.preventDefault();
      popUpSection.classList.remove('hidden');
      showPopup(data.idMeal);
    });
  });
};

loadInitialData();

mealsList.forEach((meal) => {
  const tempLikesArray = likesArray.filter((like) => like.item_id === meal.idMeal);
  if (tempLikesArray.length === 0) {
    likesArray.push({
      likes: 0,
      item_id: meal.mealId,
    });
  }
});