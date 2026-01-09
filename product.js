const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const product = products.find(p => p.id === id);

const cont = document.getElementById("productDetail");

if(product){
  cont.innerHTML = `
    <img src="${product.img}" class="product-img">
    <h1>${product.name}</h1>
    <p>Tipo: ${product.type}</p>
    <p>Talle: ${product.size.toUpperCase()}</p>
    <p>Disponibilidad: ${product.available ? "Disponible" : "Agotado"}</p>

    <a href="https://wa.me/1153792905?text=Hola!%20Quiero%20consultar%20por%20${encodeURIComponent(product.name)}"
       target="_blank"
       class="btn">
       Consultar por WhatsApp
    </a>
  `;
}else{
  cont.innerHTML = "<p>Producto no encontrado.</p>";
}
