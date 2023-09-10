const modalPokemon = document.getElementById("modalWindow");

pokemonList.onclick = function (event) {
  const pokemonNumber = event.target
    .closest(".pokemon")
    .querySelector(".number")
    .textContent.replace("#", "");
  loadAndPopulateModal(pokemonNumber);
  modalPokemon.showModal();
};

function loadAndPopulateModal(pokemonNumber) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`)
    .then((response) => response.json())
    .then((data) => {
      populateModal(data);
      console.log(data);
      console.log(
        data.stats.map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
      );
    })
    .catch((error) => {
      console.error("Erro ao carregar dados da API:", error);
    });
}

function populateModal(data) {
  modalPokemon.innerHTML = `
    <div class="modal-wrapper ${data.types[0].type.name}">
    <button type="button" class="buttonClose ${
      data.types[0].type.name
    }" aria-label="Close">X</button>
    <div class="modalContent ">
      <div class="modalHeader">
        <h3>${data.name}</h3>
        <h5>#${data.id}</h5>
      </div>
      <img src="${data.sprites.other.dream_world.front_default}" alt="${
    data.name
  }">
      <div class="types">
        <div class="types">
            ${data.types
              .map(
                (type) =>
                  `<span class="type ${type.type.name}">${type.type.name}</span>`
              )
              .join("")}
        </div>
        <div class="modal-stats">
        <dl>
        <div>
        <div>
        <h5 class="stats">height:</h5>
        <p>${data.height}cm</p>
        </div>
        <div>
        <h5 class="stats">weight:</h5>
        <p>${data.weight}kg</p>
        </div>
        </div>

        ${data.stats
          .map(
            (stat) => `
          <dt class="stats">${stat.stat.name}:</dt> 
          <dd><progress class="progress-bar" role="progressbar" max="150" value=${stat.base_stat}></progress>${stat.base_stat}</dd>`
          )
          .join("")}
        </dl>
        </div>
    </div>
    `;
  const buttonClose = document.querySelector(".buttonClose");
  buttonClose.onclick = function () {
    console.log("fechar");
    modalPokemon.close();
  };
}

const pokemonItems = document.querySelectorAll(".pokemon");
pokemonItems.forEach((item) => {
  item.addEventListener("click", () => {
    const pokemonId = parseInt(
      item.querySelector(".number").textContent.replace("#", ""),
      10
    );
    loadAndPopulateModal(pokemonId);
  });
});
