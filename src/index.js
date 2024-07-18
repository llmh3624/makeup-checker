async function fetchIngredients() {
  const response = await fetch("comedogenic-ingredients.txt");
  const text = await response.text();
  return text.split("\n").map((ingredient) => ingredient.trim().toLowerCase());
}

document
  .getElementById("check-ingredients")
  .addEventListener("click", async function () {
    const ingredientList = document
      .getElementById("list-ingredients")
      .value.split(",");
    const comedoingredients = await fetchIngredients();
    let result = "";

    let length = ingredientList.length;


    ingredientList.forEach((ingredient) => {
      const trimmedIngredient = ingredient.trim().toLowerCase();
      if (ingredient == "") {
        result += `Please enter a list to check.</br>`;
      } else {
        if (comedoingredients.includes(trimmedIngredient)) {
          result += `<p>The ingredient "${trimmedIngredient}" is present in the list. So it is not comedogenic safe.</p><i class="fa-regular result-icon fa-face-frown"></i>`;
        } else {
          result += `<p>The ingredient "${trimmedIngredient}" is not present in the list, so it is comedogenic safe.</p><i class="fa-regular result-icon fa-face-smile"></i>`;
        }
      }
    });

    document.getElementById("result").innerHTML = result;
  });
