import { getComments, postComment } from './comment.js';
import commentsCounter from './counter/commentCounter.js'; // counter wala krna hai

const getMealDetail = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const responseJSON = await response.json();
  return responseJSON;
};

const popUpSection = document.querySelector('.popup-section');

const showPopup = async (idMeal) => {
  popUpSection.innerHTML = '<div class="backdrop"></div>';

  const commentsList = await getComments(idMeal);

  getMealDetail(idMeal).then((meal) => {
    const string = `
    <div class="popup-wrapper">
      <div class="popup">
        <i class="fa-solid fa-xmark close"></i>
        <div class="popup-details">
          <img src=${meal.meals[0].strMealThumb} alt="Thumbnail" class="popup-img">  
          <h3 class="game-title">${meal.meals[0].strMeal}</h3>
          <div class="meal-links">
            <button> <a href="${meal.meals[0].strSource}"> Source</a></button>
            <button> <a href="${meal.meals[0].strYoutube}"> Youtube</a></button>
          </div>
          <div class="popup-desc">    
            <p><b> Main Ingredients </b></p>
            <ul>
              <li>${meal.meals[0].strIngredient1}: ${meal.meals[0].strMeasure1}</li>
              <li>${meal.meals[0].strIngredient2}: ${meal.meals[0].strMeasure2}</li>
              <li>${meal.meals[0].strIngredient3}: ${meal.meals[0].strMeasure3}</li>
              <li>${meal.meals[0].strIngredient4}: ${meal.meals[0].strMeasure4}</li>
              <li>${meal.meals[0].strIngredient5}: ${meal.meals[0].strMeasure5}</li>
            </ul>
            <p><b>Procedure to Follow</b></p>
            <p>${meal.meals[0].strInstructions}</p>  
            <div class="tags"> <b>Tags:</b> ${(meal.meals[0].strTags || '').split(',').map((el) => `<code class='tag'>${el}</code>`)}</div>
          </div>
        </div>

        <h3 class="counter">Comments(<b class="total-comments">0</b>)</h3>  
        <div class='meal-comments'> 
        ${commentsList ? commentsList.map((comment) => `
          <div class="comment d-flex justify-content-between align-items-center mb-3">
            <div class="d-flex justify-content-between align-items-center p-1">
              <div class="username"><b>${comment.username}:</b></div>
              <div class="message">${comment.comment}</div>
            </div>
          <div class="date">${comment.creation_date}</div>
          </div>
        `).join('') : ''}
        
        </div>
          <h3>Add a new Comment</h3>
          <form class="post-comments">
            <input type="text" name="username" class="user-name" placeholder="Your name">
            <textarea class="user-comment" name="comment" placeholder="Your insights"></textarea>
            <button type="submit" class="submit-btn">Submit</button>
          </form>
        </div>
      </div>`;

    const parser = new DOMParser();

    const stringElement = parser.parseFromString(string, 'text/html').body.firstChild;
    popUpSection.append(stringElement);

    const closeBtn = stringElement.querySelector('.close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      popUpSection.classList.add('hidden');
    });
    const form = stringElement.querySelector('form');

    const commentSection = document.querySelector('.meal-comments');
    const commentsCounterEl = stringElement.querySelector('.total-comments');
    commentsCounterEl.innerHTML = `${commentsCounter()}`;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const user = formData.get('username');
      const message = formData.get('comment');
      postComment(idMeal, user, message);
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const yyyy = today.getFullYear();

      today = `${mm}/${dd}/${yyyy}`;
      const commentString = `
        <div class="comment d-flex justify-content-between mb-3">
          <div class="d-flex justify-content-between align-items-center p-1">
            <div class="username"><b>${user}:</b></div>
            <div class="message">${message}</div>
          </div>
        <div class="date">${today}</div>
      </div>`;

      const commentElement = parser.parseFromString(commentString, 'text/html').body.firstChild;
      commentSection.append(commentElement);
      form.reset();
      commentsCounterEl.innerHTML = `${commentsCounter()}`;
    });
  });
};

export default showPopup;
