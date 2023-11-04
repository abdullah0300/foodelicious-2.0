const apiUrl = "http://127.0.0.1:9090";
const menuNavList = document.querySelector("#menuNav");
const productCardsContainer = document.querySelector("#productCardsContainer");
const addListItemNav = function (name, id) {
  return `<li class="nav-item category-nav-item" data-category='${id}'>
  <a class="nav-link" href="#" data-filter="all">
    <div class="card">
      <div class="card-body" style="color: black;">${name}</div>
    </div>
  </a>
  </li>`;
};

const addProductsListCards = (id, name, image) => {
  return `<div
  class="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-6 pb-4"
  data-type="meat"
  data-category="${id}"
  >
  <div class="card h-100">
    <div class="card-body h-100 p-1">
      <a
        href="#"
        class="pos-product"
        data-bs-toggle="modal"
        data-bs-target="#modalPosItem"
      >
        <div
          class="img"
          style="
            background-image: url(../assets/img/pos/countryside.jpg);
          "
        ></div>
        <div class="info">
          <div class="title">${name}</div>
        </div>
      </a>
    </div>
  </div>
  </div>`;
};

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${apiUrl}/api/v1/productCategory?limit=20`)
    .then((res) => {
      menuNavList.innerHTML = "";
      res.data.data.forEach((el, i) => {
        // console.log(i);
        if (
          el.name === "Pizzas" ||
          el.name === "Wraps (Signature)" ||
          el.name === "Burgers" ||
          el.name === "Milkshakes"
        )
          menuNavList.insertAdjacentHTML(
            "beforeend",
            addListItemNav(el.name, el._id)
          );
      });
      addCategorySelectEvent();
    })
    .catch((err) => {
      console.log(err);
    });
});

const addCategorySelectEvent = () => {
  document.querySelectorAll(".category-nav-item").forEach((el, i) => {
    el.addEventListener("click", (e) => {
      document
        .querySelectorAll(".nav-link")
        .forEach((el) => el.classList.remove("active"));
      insertProductCards(e.currentTarget.dataset.category);
      e.currentTarget.querySelector(".nav-link").classList.add("active");
    });
  });
};

let currentProductSubcategory;

const insertProductCards = (subCategoryId) => {
  axios
    .get(`${apiUrl}/api/v1/product?productCategory=${subCategoryId}`)
    .then((res) => {
      productCardsContainer.innerHTML = "";
      currentProductSubcategory = res.data.data[0];
      currentProductSubcategory.productsList.forEach((el, i) => {
        productCardsContainer.insertAdjacentHTML(
          "beforeend",
          addProductsListCards(el._id, el.name, "")
        );
      });
    })
    .catch((err) => console.log(err));
};
