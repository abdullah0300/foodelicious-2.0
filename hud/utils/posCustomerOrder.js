const apiUrl = "http://127.0.0.1:9090";

const addListItemNav = function (name, id, handleSelect) {
  return `<li class="nav-item" data-category='${id}' onclick=${handleSelect}>
  <a class="nav-link active" href="#" data-filter="all">
    <div class="card" >
      <div class="card-body"  style="color: black;">${name}</div>
    </div>
  </a>
  </li>`;
};

const menuNavList = document.querySelector("#menuNav");
console.log(menuNavList);

document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(`${apiUrl}/api/v1/productCategory`)
    .then((res) => {
      res.data.data.forEach((el, i) => {
        menuNavList.insertAdjacentHTML(
          "afterbegin",
          addListItemNav(el.name, el._id)
        );
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

const productListCard = `<div
class="col-xxl-3 col-xl-4 col-lg-6 col-md-4 col-sm-6 pb-4"
data-type="meat"
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
        <div class="title">Grill Chicken Chop&reg;</div>
      </div>
    </a>
  </div>
</div>
</div>`;

const handleSelect = (e, id) => {
  console.log(e, "e");
  console.log(id, "id");
};
