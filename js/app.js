document.addEventListener("DOMContentLoaded", async () => {
    
  let title;
  let tagline;
  let vote_average; 
  let divs; 
  
 
  async function fetchURL(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const pelis = await fetchURL(
    "https://japceibal.github.io/japflix_api/movies-data.json"
  );
  

  let btnBuscar = document.getElementById("btnBuscar");
  btnBuscar.addEventListener("click", searchFilter);
  divs = document.createElement("div");
  
  
  function searchFilter() {
    let count = 0;
    let searchBar = document.getElementById("inputBuscar").value.trim().toLowerCase();
    if(searchBar !== " ") {
      
        const peliFiltrada = pelis.filter((peli => 
            peli.title.toLowerCase().includes(searchBar) ||
            peli.tagline.toLowerCase().includes(searchBar) ||
            peli.overview.toLowerCase().includes(searchBar) ||
            peli.genres.filter(({ name }) => name.toLowerCase().includes(searchBar)).length > 0

    ));
    
      let lista = document.getElementById("lista");
      for (let i = 0; i < peliFiltrada.length; i++) {
        title = peliFiltrada[i].title;
        tagline = peliFiltrada[i].tagline;
        vote_average = parseInt(peliFiltrada[i].vote_average)
        divs.style.display = "block";
        let estrellas = `<div class=" vote_average">`;
        for (let j = 0; j < Math.floor(vote_average / 2); j++) {
          estrellas += `<i class="fa fa-star checked"></i>`;
        }
        let estrellasVacias = (10 - vote_average) / 2;
        for (let k = 0; k < estrellasVacias; k++) {
          estrellas += `<i class="fa fa-star"></i>`;
        }
        estrellas += "</div> ";
        let offcanvasId = `offcanvasTop-${count}`;
        divs.innerHTML += `
        <div class="contenedorSeparo1">
          <li class="list-group-item text-center color1">${peliFiltrada[i].title} <br />${peliFiltrada[i].tagline}
            <div class="amarillo mb-3">
              <p>Calificacion: </p>${estrellas}
            </div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#${offcanvasId}" aria-controls="${offcanvasId}">Desplegar</button>

            <div class="separo">
              <div class="offcanvas offcanvas-top docanvas" tabindex="-1" id="${offcanvasId}" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                  <h5 class="offcanvas-title" id="offcanvasTopLabel">Pelicula: ${peliFiltrada[i].title}</h5><br>
                  <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                  <h6>Reseña: ${peliFiltrada[i].overview}</h6>
                  <hr />
                </div>
                <div class="divSep">
                  <h6>Generos: ${peliFiltrada[i].genres[0].name + " - " + peliFiltrada[i].genres[1].name + " - " + peliFiltrada[i].genres[2].name}</h6>
                  <div class="dropdown">
                    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Mostrar Información
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">Year: ${peliFiltrada[i].release_date.slice(0, 4)}</a></li>
                      <li><a class="dropdown-item" href="#">Runtime: ${peliFiltrada[i].runtime + "min"}</a></li>
                      <li><a class="dropdown-item" href="#">Budget: ${"$" + peliFiltrada[i].budget}</a></li>
                      <li><a class="dropdown-item" href="#">Revenue: ${"$" + peliFiltrada[i].revenue}</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      `;
        lista.appendChild(divs);
      }
    };
  };
});
