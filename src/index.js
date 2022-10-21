import './style.css';
import './stylesheets/slider.css';
import './stylesheets/meals.css';
import './stylesheets/comment.css';
import slideShow from './modules/slider.js';
import getMeals from './modules/getMeals.js';
import showPopup from './modules/commentsPopup.js';
import { getLikes, postLike } from './modules/getLikes.js';

const mealsSection = document.querySelector('.meals-section');
const popUpSection = document.querySelector('.popup-section');
const parser = new DOMParser();

slideShow();

const init = async () => {
  const likesArray = await getLikes();
  const mealsArray = await getMeals();

  const combinedArray = mealsArray.meals.map((meal) => {
    const likeForThisMeal = likesArray.filter((likeObj) => likeObj.item_id === meal.idMeal);
    return {
      strMealThumb: meal.strMealThumb,
      strMeal: meal.strMeal,
      idMeal: meal.idMeal,
      likes: likeForThisMeal.length === 0 ? 0 : likeForThisMeal[0].likes,
    };
  });

  combinedArray.forEach((mealWithLike) => {
    const string = `
      <div>
        <img src="${mealWithLike.strMealThumb}" alt="meal" class="meal-img">
        <div class="meal-details">
          <div class="meal-desc">
            <p class="title m-0">${mealWithLike.strMeal}</p>
            <div class="like m-0" id="${mealWithLike.idMeal}">
              <p class='likes'>${mealWithLike.likes}</p>
              <i class="fa-solid fa-heart like-btn"></i>
            </div>
          </div>
          <button type="button" class="comment-btn">Comments</button>
        </div>
      </div>`;

    const stringElement = parser.parseFromString(string, 'text/html').body.firstChild;

    const likeBtn = stringElement.querySelector('.like-btn');
    const likeEl = stringElement.querySelector('.likes');

    likeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      postLike(mealWithLike.idMeal);
      mealWithLike.likes += 1;
      likeEl.innerHTML = `${mealWithLike.likes}`;
    });

    mealsSection.append(stringElement);

    const commentbtn = stringElement.querySelector('.comment-btn');
    commentbtn.addEventListener('click', (e) => {
      e.preventDefault();
      popUpSection.classList.remove('hidden');
      showPopup(mealWithLike.idMeal);
    });
  });
};

init();