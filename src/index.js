import './style.css';
import './stylesheets/slider.css';
import './stylesheets/meals.css';
import slideShow from './modules/slider.js';
import getMeals from './modules/getMeals.js';
import { postComment, getComments } from './modules/comment.js';

// popup Class : Handle popup tasks
import './stylesheets/comment.css';
import showPopup from './modules/commentsPopup.js';

const mealsSection = document.querySelector('.meals-section');
const popUpSection = document.querySelector('.popup-section');
const parser = new DOMParser();

slideShow();

let mealsList = [];
const loadInitialData = async () => {
  mealsList = await getMeals();
  // loadMeals(mealsList);
  mealsList.meals.forEach((data) => {
    const string = `
      <div>
        <img src="${data.strMealThumb}" alt="meal" class="meal-img">
        
        <div class="meal-details">
          <div class="meal-desc">
            <p class="title m-0">${data.strMeal}</p>  
            <p class="like m-0" id="${data.idMeal}><i class="fa-solid fa-heart"></i></p>
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
