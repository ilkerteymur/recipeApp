// UUID IMPORT
import { v4 } from 'https://jspm.dev/uuid';
import { elements } from "./js/helpers.js";
import { Search } from "./js/api.js";
import { clearLoader, renderLoader, renderResults,renderBasketItems } from "./js/ui.js";
import { Recipe } from "./js/recipe.js";

const recipe = new Recipe();

//! Olay izleyicilieri
elements.form.addEventListener("submit", handleSubmit);



// uzun yol
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

//! Fonksiyonlar
async function handleSubmit(e){
    e.preventDefault();

// aratılan kelime
  const query = elements.searchInput.value;
  // arama terimi boş değilse çalışır
  if(query){
    // search sınıfının bir örneğini oluşturur.
   const search = new Search(query);

   //istek atmaya başlamadan önce loader'ı ekrana bas
    renderLoader(elements.resultList);
   // istek atma
   try{
    await search.getResults();

    // isteğe cevap gelince loader'ı ekrandan kaldır.
    clearLoader();
    

    // gelen cevabı ekrana bas
    renderResults(search.result);
   } catch(err) {
    alert("Aradığınız kriterlere uygunt tarif bulunamadı")
    clearLoader();
   }
  }
}

// tarif detaylarını alma
const controlRecipe = async () => {
  const id = location.hash.replace('#', '');
  if (id) {
    // ekran loader'ı basma
    renderLoader(elements.recipeArea);

    try {
      // tarif bilgilerini alma
      await recipe.getRecipe(id);

      // loader'ı kaldır
      clearLoader();

      // ekrana tarif arayüzünü basma
      recipe.renderRecipe(recipe.info);
    } catch (err) {
      clearLoader();
    }
  }
};

// iki farklı olayı izleme
['hashchange', 'load'].forEach((eventName) => {
  window.addEventListener(eventName, controlRecipe);
});

const basket = [];

// tarif alanındaki tıklanmalarda çalışır
const handleClick = (e) => {
  if(e.target.id === "add-to-basket"){
    // tarifler dizisini dön
    recipe.ingredients.forEach((title) => {
      // her bir tarif için obje oluştur ve id ekle
      const newItem = {
        id: v4(),
        title,
      };

      // yeni oluşan tarifleri sepete ekle
      basket.push(newItem);
    });
    // ekrana sepet elemanlarını basma
    renderBasketItems(basket);
  }
};

// Add To Basket butonuna tıklanmayı izleme
elements.recipeArea.addEventListener("click", handleClick);

