"use strict";

const flashProducts = [
  { name: "Cà Phê Robusta Cầu Đất Hạt Rang Mộc 500g", price: 89000, oldPrice: 145000, discount: "-38%", image: "photo-1442512595331-e89e73853f31", sold: 85 },
  { name: "Nồi Cơm Điện Mini Đa Năng 1.2L Bear", price: 329000, oldPrice: 550000, discount: "-40%", image: "photo-1556911220-e15b29be8c8f", sold: 92 },
  { name: "Bình Giữ Nhiệt Inox 316 Cao Cấp 800ml", price: 159000, oldPrice: 250000, discount: "-36%", image: "photo-1602143407151-7111542de6e8", sold: 75 },
  { name: "Đèn Bàn LED Chống Cận Thị 3 Cấp Độ", price: 199000, oldPrice: 320000, discount: "-37%", image: "photo-1507473885765-e6ed057f782c", sold: 78 },
  { name: "Bộ 4 Hộp Thủy Tinh Chịu Nhiệt Lock&Lock", price: 249000, oldPrice: 420000, discount: "-41%", image: "photo-1547592180-85f173990554", sold: 64 }
];

const featuredProducts = [
  { name: "Cà Phê Túi Lọc Arabica Cầu Đất Thượng Hạng (Hộp 10 túi)", price: 115000, oldPrice: 145000, image: "photo-1442512595331-e89e73853f31", tag: "Giao 2H", rating: 5, reviews: 124, category: "coffee" },
  { name: "Máy Xay Sinh Tố Cầm Tay Mini Sạc Pin Tiện Lợi 350ml", price: 225000, oldPrice: 300000, image: "photo-1570222094114-d054a817e56b", tag: "-25%", rating: 5, reviews: 310, category: "home" },
  { name: "Máy Xông Tinh Dầu Phun Sương Vân Gỗ Sang Trọng 500ml", price: 189000, oldPrice: 270000, image: "photo-1608571423902-eed4a5ad8108", tag: "Tặng Tinh Dầu", rating: 5, reviews: 89, category: "home" },
  { name: "Giá Đỡ Laptop Nhôm Tản Nhiệt Gấp Gọn 7 Cấp Độ", price: 139000, oldPrice: 199000, image: "photo-1496181133206-80ce9b88a853", tag: "-30%", rating: 5, reviews: 452, category: "tech" },
  { name: "Cây Lưỡi Hổ Để Bàn Thanh Lọc Không Khí Kèm Chậu Sứ", price: 95000, oldPrice: 120000, image: "photo-1501004318641-b39e6451bec6", tag: "Bán Chạy", rating: 5, reviews: 78, category: "plants" },
  { name: "Bình Pha Cà Phê Kiểu Pháp French Press 600ml Thủy Tinh", price: 165000, oldPrice: 220000, image: "photo-1495474472287-4d71bcdd2085", tag: "Giao 2H", rating: 5, reviews: 64, category: "coffee" },
  { name: "Ấm Đun Nước Siêu Tốc Giữ Nhiệt Hai Lớp 1.8L Inox 304", price: 259000, oldPrice: 315000, image: "photo-1615196345808-e93bdc71b1d2", tag: "-18%", rating: 5, reviews: 193, category: "home" },
  { name: "Nến Thơm Cao Cấp Tinh Dầu Tự Nhiên Bắc Gỗ Thuần 200g", price: 149000, oldPrice: 190000, image: "photo-1603006905003-be475563bc59", tag: "Hot Trend", rating: 5, reviews: 215, category: "decor" },
  { name: "Thảm Trải Bàn Làm Việc Da PU Chống Thấm 80x40cm", price: 89000, oldPrice: 135000, image: "photo-1523726491678-bf852e717f6a", tag: "-35%", rating: 5, reviews: 521, category: "office" },
  { name: "Ly Sứ Uống Nước Có Quai Gỗ Kèm Thìa Mạ Vàng 400ml", price: 79000, oldPrice: 110000, image: "photo-1514228742587-6b1558fcca3d", tag: "Quà Tặng", rating: 5, reviews: 110, category: "home" },
  { name: "Bình Hoa Trang Trí Tối Giản", price: 129000, oldPrice: 180000, image: "photo-1578500494198-246f612d3b3d", tag: "Mới", rating: 4.9, reviews: 56, category: "decor" },
  { name: "Sổ Tay Mini Kèm Bút Bi", price: 59000, oldPrice: 85000, image: "photo-1544816155-12df9643f363", tag: "Ưu Đãi", rating: 4.9, reviews: 88, category: "office" }
];

const state = { query: "", category: "all", sort: "all", visibleCount: 10, cartCount: 0 };
const money = value => `${value.toLocaleString("vi-VN")}₫`;
const imageUrl = id => `../asset/picture/${id}.jpg`;
const flashRoot = document.querySelector("#flash-products");
const featuredRoot = document.querySelector("#featured-products");

function renderFlash() {
  flashRoot.innerHTML = flashProducts.map(product => `
    <article class="product">
      <span class="discount">${product.discount}</span>
      <img class="product-photo" src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy">
      <p class="product-name">${product.name}</p>
      <div><span class="price">${money(product.price)}</span><span class="old">${money(product.oldPrice)}</span></div>
      <div class="stock"><span> ĐÃ BÁN ${product.sold}/100</span><i style="width:${product.sold}%"></i></div>
      <button class="buy" type="button" data-add-cart="${product.name}">🛒 Thêm vào giỏ</button>
    </article>`).join("");
}

function renderFeatured() {
  const query = state.query.trim().toLocaleLowerCase("vi");
  let products = featuredProducts.filter(product => {
    const matchesQuery = !query || product.name.toLocaleLowerCase("vi").includes(query);
    const matchesCategory = state.category === "all" || product.category === state.category;
    return matchesQuery && matchesCategory;
  });

  if (state.sort === "popular") products.sort((a, b) => b.reviews - a.reviews);
  if (state.sort === "price") products.sort((a, b) => a.price - b.price);
  if (state.sort === "rating") products.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);

  const visible = products.slice(0, state.visibleCount);
  featuredRoot.innerHTML = visible.length ? visible.map(product => `
    <article class="featured">
      <div class="photo-wrap"><img class="product-photo" src="${imageUrl(product.image)}" alt="${product.name}" loading="lazy"><span class="tag">${product.tag}</span></div>
      <div class="rating"> ${product.rating.toFixed(1)} (${product.reviews})</div>
      <p class="product-name">${product.name}</p>
      <div><span class="price">${money(product.price)}</span><span class="old">${money(product.oldPrice)}</span></div>
      <button class="buy" type="button" data-add-cart="${product.name}">🛒 Thêm vào giỏ</button>
    </article>`).join("") : '<p class="empty-state">Không tìm thấy sản phẩm phù hợp.</p>';

  const loadMore = document.querySelector("#load-more");
  loadMore.hidden = state.visibleCount >= products.length;
}

function addToCart() {
  state.cartCount += 1;
  const count = document.querySelector("#cart-count");
  count.textContent = state.cartCount;
  count.hidden = false;
  document.querySelector("#cart-status").textContent = `Added to cart. Giỏ hàng hiện có ${state.cartCount} sản phẩm.`;
}

function startSaleTimer() {
  let remaining = 2 * 60 * 60 + 45 * 60 + 17;
  const timer = document.querySelector("#sale-timer");
  const tick = () => {
    const hours = String(Math.floor(remaining / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, "0");
    const seconds = String(remaining % 60).padStart(2, "0");
    timer.innerHTML = `KẾT THÚC TRONG: <b>${hours}</b> : <b>${minutes}</b> : <b>${seconds}</b>`;
    if (remaining > 0) remaining -= 1;
  };
  tick();
  window.setInterval(tick, 1000);
}

document.querySelector("#search-form").addEventListener("submit", event => event.preventDefault());
document.querySelector("#search-input").addEventListener("input", event => {
  state.query = event.target.value;
  state.category = "all";
  state.visibleCount = 10;
  document.querySelectorAll(".category").forEach(tile => tile.classList.remove("selected"));
  renderFeatured();
});

document.querySelectorAll(".category").forEach(tile => {
  tile.addEventListener("click", () => {
    const wasSelected = tile.classList.contains("selected");
    document.querySelectorAll(".category").forEach(item => item.classList.remove("selected"));
    state.category = wasSelected ? "all" : tile.dataset.category;
    if (!wasSelected) tile.classList.add("selected");
    state.query = "";
    document.querySelector("#search-input").value = "";
    state.visibleCount = 10;
    renderFeatured();
  });
});

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelector(".tab.active").classList.remove("active");
    tab.classList.add("active");
    state.sort = tab.dataset.sort;
    state.visibleCount = 10;
    renderFeatured();
  });
});

document.querySelector("#load-more").addEventListener("click", () => {
  state.visibleCount += 5;
  renderFeatured();
});
document.addEventListener("click", event => {
  if (event.target.closest("[data-add-cart]")) addToCart();
});
document.querySelector(".cart-button").addEventListener("click", () => {
  document.querySelector("#cart-status").textContent = state.cartCount
    ? `Giỏ hàng hiện có ${state.cartCount} sản phẩm.`
    : "Giỏ hàng đang trống.";
});

renderFlash();
renderFeatured();
startSaleTimer();




