document.addEventListener("DOMContentLoaded", function () {
  // Inisialisasi produk
  let products = [
    {
      id: 1,
      name: "Kemplang",
      price: 45000,
      description: "Kerupuk khas Bangka Belitung dengan rasa ikan yang gurih",
      image: "images/default-product.jpg",
    },
    {
      id: 2,
      name: "Lempah Kuning",
      price: 35000,
      description:
        "Bumbu masakan tradisional Bangka Belitung dengan rasa asam pedas",
      image: "images/default-product.jpg",
    },
    {
      id: 3,
      name: "Rusip",
      price: 40000,
      description: "Fermentasi ikan dengan rasa khas yang unik",
      image: "images/default-product.jpg",
    },
  ];

  // DOM Elements
  const productsContainer = document.getElementById("products-container");
  const productImageInput = document.getElementById("product-image");
  const productPreview = document.getElementById("product-preview");
  const uploadBtn = document.getElementById("upload-btn");
  const productNameInput = document.getElementById("product-name");
  const productPriceInput = document.getElementById("product-price");
  const productDescInput = document.getElementById("product-desc");
  const addProductBtn = document.getElementById("add-product-btn");

  // Render produk
  function renderProducts() {
    productsContainer.innerHTML = "";
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
                <img src="${product.image}" alt="${
        product.name
      }" class="product-image">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-price">Rp ${product.price.toLocaleString(
                      "id-ID"
                    )}</p>
                    <p class="product-desc">${product.description}</p>
                    <button class="edit-btn" data-id="${
                      product.id
                    }">Edit Foto</button>
                </div>
            `;
      productsContainer.appendChild(productCard);
    });

    // Tambahkan event listener untuk tombol edit
    document.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productId = parseInt(this.getAttribute("data-id"));
        editProductImage(productId);
      });
    });
  }

  // Fungsi untuk mengedit gambar produk
  function editProductImage(productId) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const newImageUrl = event.target.result;

          // Update produk di array
          const productIndex = products.findIndex((p) => p.id === productId);
          if (productIndex !== -1) {
            products[productIndex].image = newImageUrl;
            renderProducts();
          }
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  // Event listener untuk upload gambar
  uploadBtn.addEventListener("click", function () {
    productImageInput.click();
  });

  productImageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        productPreview.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Event listener untuk menambahkan produk
  addProductBtn.addEventListener("click", function () {
    const name = productNameInput.value.trim();
    const price = parseInt(productPriceInput.value);
    const description = productDescInput.value.trim();
    const image = productPreview.src;

    if (!name || isNaN(price) || !description) {
      alert("Harap isi semua field dengan benar!");
      return;
    }

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name,
      price,
      description,
      image,
    };

    products.push(newProduct);
    renderProducts();

    // Reset form
    productNameInput.value = "";
    productPriceInput.value = "";
    productDescInput.value = "";
    productPreview.src = "images/default-product.jpg";
    productImageInput.value = "";

    alert("Produk berhasil ditambahkan!");
  });

  // Render produk pertama kali
  renderProducts();
});
