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

    ingredientList.forEach((ingredient) => {
      const trimmedIngredient = ingredient.trim().toLowerCase();
      if (ingredient == "") {
        result += `Please enter a list to check.</br>`;
      } else {
        if (comedoingredients.includes(trimmedIngredient)) {
          result += `The ingredient "${trimmedIngredient}" is present in the list. So it is not comedogenic safe.<br>`;
        } else {
          result += `The ingredient "${trimmedIngredient}" is not present in the list, so it is comedogenic safe.<br>`;
        }
      }
    });

    document.getElementById("result").innerHTML = result;
  });

