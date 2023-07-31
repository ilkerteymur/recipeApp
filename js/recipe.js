import { elements } from "./helpers.js";

export class Recipe {
  constructor() {
    // tarif hakkında bütün bilgiler
    this.info = {};
    // tarifin malzemeleri
    this.ingredients = [];
  }

  //   tarif bilgilerini alma
  async getRecipe(id) {
    // verileri alma
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/get?rId=${id}`
    );
    // verileri işleme
    const data = await res.json();
    // class'ın içerisine aktarma
    this.info = data.recipe;
    this.ingredients = data.recipe.ingredients;
  }

  // her bir tarif için tarifi temsil eden liste elemanı oluşturur
  createIngredient() {
    const html = this.ingredients
      .map(
        (ingredient) => `
              <li>
                <i class="bi bi-check-circle"></i>
                <p>${ingredient}</p>
              </li>
    `
      )
      .join("");

    return html;
  }

  //   bu bilgileri ekran basma
  renderRecipe(recipe) {
    const markup = `
         <figure>
            <img
              src=${recipe.image_url}
            />
            <h1>${recipe.title}</h1>

            <p class="like-area">
              <i class="bi bi-heart"></i>
            </p>
          </figure>

          <div class="ingredients">
            <ul>
              ${this.createIngredient()}
            </ul>
            <button id="add-to-basket">
              <i class="bi bi-cart2"></i>
              <span>Add To Baset</span>
            </button>
          </div>
          <div class="directions">
            <h2>How To Cook ?</h2>
            <p>
              Bu tarif dikkatlice
              <span>${recipe.publisher}</span> tarafından
              hazırlanmış ve test edilmiştir. Diğer detaylara onların
              websitesi üzerinden erişebilirsiniz.
            </p>
            <a href="${recipe.source_url}" target="_blank">Yönerge</a>
          </div>
    `;

    elements.recipeArea.innerHTML = markup;
  }
};
