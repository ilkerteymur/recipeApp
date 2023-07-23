import { elements } from "./js/helpers.js";
import { Search } from "./js/api.js";
import { clearLoader, renderLoader, renderResults } from "./js/ui.js";

//! Olay izleyicilieri
elements.form.addEventListener("submit", handleSubmit)


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