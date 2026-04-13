export function createCard(poke) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const title = document.createElement("h2");
  title.textContent = poke.name;

  const img = document.createElement("img");
  img.src = poke.sprites.front_default;
  img.alt = poke.name;

  const type = document.createElement("span");
  type.textContent = poke.types[0].type.name;

  const stats = document.createElement("ul");
  stats.textContent = `HP: ${poke.stats[0].base_stat}`;

  cardElement.append(title, img, type, stats);

  return cardElement;
}