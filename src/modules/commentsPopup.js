
import { getComments } from './comment.js';

const getMealDetail = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const responseJSON = await response.json();
  return responseJSON;
};

const popUpSection = document.querySelector('.popup-section');

const showPopup = async (idMeal) => {
  popUpSection.innerHTML = '';

  const commentsList = await getComments(idMeal);

  getMealDetail(idMeal).then((meal) => {
    const string = `
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
      <div class='meal-comments'> 
      <h3>Comments</h3>
      ${commentsList ? commentsList.map((comment) => `
        <div class="comment d-flex justify-content-between mb-3">
          <div class="d-flex justify-content-between align-items-center p-1">
            <div class="username"><b>${comment.username}:</b></div>
            <div class="date">${comment.creation_date}</div>
          </div>
          
          <div class="message">${comment.comment}</div>

        </div>
      `).join('') : ''}
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
  });
};

export default showPopup;