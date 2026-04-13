import { fetchPokemons } from "../js/productServices.js";
import { createCard } from "../js/cards.js";

const searchInput = document.getElementById("search");
const pokeContainer = document.getElementById("container");

const controls = document.createElement("div");
controls.className = "controls";
document.body.appendChild(controls);

let allPokemons = [];

let offset = 0;
const limit = 10;

// 🔥 função única de renderização
function renderPokemons(list) {
  pokeContainer.innerHTML = "";

  if (list.length === 0) {
    pokeContainer.innerHTML = "<spam>Nenhum Pokémon encontrado</spam>";
    return;
  }

  for (const poke of list) {
    const card = createCard(poke);
    pokeContainer.appendChild(card);
  }
}

// 🔎 filtro
searchInput.addEventListener("input", () => {
  const value = searchInput.value.trim().toLowerCase();

  const filtered = allPokemons.filter((poke) =>
    poke.name.toLowerCase().includes(value)
  );

  renderPokemons(filtered);
});

// cria botões UMA vez
const btnPrev = document.createElement("button");
btnPrev.innerHTML = '<img src="../assets/img/arrow-left.svg" alt="Anterior">';
btnPrev.className = "prev-btn";

const btnNext = document.createElement("button");
btnNext.innerHTML = '<img src="../assets/img/arrow-right.svg" alt="Próximo">';
btnNext.className = "next-btn";

controls.append(btnPrev, btnNext);

btnNext.addEventListener("click", () => {
  offset += limit;
  loadPokemons();
});

btnPrev.addEventListener("click", () => {
  if (offset >= limit) {
    offset -= limit;
    loadPokemons();
  }
});

// função principal
async function loadPokemons() {
  const pokemons = await fetchPokemons(offset, limit);

  allPokemons = []; // limpa antes de preencher

  for (const poke of pokemons) {
    const resp = await fetch(poke.url);
    const data = await resp.json();

    allPokemons.push(data); 
  }

  renderPokemons(allPokemons);

  btnPrev.disabled = offset === 0;
  btnNext.disabled = pokemons.length < limit;
}

loadPokemons();