export const filterPublicRecipes = (keyword, publicRecipes, searchFilter) => {
  if (keyword === 'random') {
    return [publicRecipes[Math.floor(Math.random()*publicRecipes.length)]];
  } else if (searchFilter === 'byTitle') {
    const filteredRecipes = publicRecipes.filter(publicRecipe => {
      return publicRecipe.title.toLowerCase().includes(keyword.toLowerCase());
    });
    if (filteredRecipes.length !== 0) {
      return filteredRecipes;
    } else {
      return "no matches found."
    }
  } else if (searchFilter === 'byIngredient') {
    publicRecipes.map(publicRecipe => Object.keys(publicRecipe).forEach(key => {
      if (key === 'ingredients') {
        publicRecipe[key] = publicRecipe[key].join('\n')
      }
    }))
    const filteredRecipes = publicRecipes.filter(publicRecipe => {
      return publicRecipe.ingredients.toLowerCase().includes(keyword.toLowerCase());
    })
    publicRecipes.map(publicRecipe => Object.keys(publicRecipe).forEach(key => {
      if (key === 'ingredients') {
        publicRecipe[key] = publicRecipe[key].split('\n')
      }
    }))
    if (filteredRecipes.length !== 0) {
      return filteredRecipes
    } else {
      return "no matches found."
    }
  }
}