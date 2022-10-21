import { getData, postData } from './messages.js';

const getMealDetail = async (idMeal) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
  const responseJSON = await response.json();
  return responseJSON;
};

const popUpSection = document.querySelector('.popup-section');

const showPopup = async (idMeal) => {
  popUpSection.innerHTML = '';

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