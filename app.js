const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
  sidebar.classList.add("active");
  overlay.style.display = "block";
  menuBtn.style.display = "none";
};

overlay.onclick = () => {
  sidebar.classList.remove("active");
  overlay.style.display = "none";
  menuBtn.style.display = "block";
};

document.getElementById("year").textContent = new Date().getFullYear();

const searchInput = document.getElementById("search");
const filterType = document.getElementById("filterType");
const filterSize = document.getElementById("filterSize");

const carouselSection = document.getElementById("carouselSection");
const filteredSection = document.getElementById("filteredCatalog");
const filteredProducts = document.getElementById("filteredProducts");

function renderCarousels(){
  ["gorras","remeras","jeans","pantalones"].forEach(type=>{
    const cont = document.getElementById(type);
    cont.innerHTML="";
    products.filter(p=>p.type===type).forEach(p=>{
      cont.innerHTML+=productCard(p);
    });
  });
}

function productCard(p){
  return `
    <div class="card">
      <img src="${p.img}">
      <h3>${p.name}</h3>

      <p>$${p.price.toLocaleString("es-AR")}</p>

      <p>
        ${p.type === "gorras"
          ? `Tipo: ${p.fit === "regulable" ? "Regulable" : "Cerrada"}`
          : `Talle: ${p.size.toUpperCase()}`
        }
      </p>

      <a class="btn"
         href="https://wa.me/549XXXXXXXXXX?text=Hola!%20Quiero%20consultar%20por%20${encodeURIComponent(p.name)}"
         target="_blank">
         Consultar por WhatsApp
      </a>

      <a class="btn secondary" href="producto.html?id=${p.id}">
        Ver más
      </a>
    </div>
  `;
}


function applyFilters(){
  const search = searchInput.value.toLowerCase();
  const type = filterType.value;
  const size = filterSize.value;

  const filtered = products.filter(p =>
    (!search || p.name.toLowerCase().includes(search)) &&
    (!type || p.type === type) &&
    (!size || p.size === size || p.fit === size)
  );

  if(search || type || size){
    carouselSection.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    filteredProducts.innerHTML = filtered.map(productCard).join("");
  }else{
    carouselSection.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }
}

searchInput.addEventListener("input", applyFilters);
filterType.addEventListener("change", applyFilters);
filterSize.addEventListener("change", applyFilters);

renderCarousels();
