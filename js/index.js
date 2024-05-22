// ======== declaration ==========
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var bookmarkList = [];
var bookmark = {
  name: "",
  url: "",
};
var cartona = "";
var myTableRow = document.getElementById("tableRow");

// ======== cheak if loacalstorage have value ==========
if (localStorage.getItem("bookmark") == null) {
  bookmarkList = [];
} else {
  bookmarkList = JSON.parse(localStorage.getItem("bookmark"));
  display(bookmarkList);
}
// ======== Add value from form to localstorge and display it ==========
function addBookmark() {
  if (
    bookmarkName.classList.contains("is-valid") &&
    bookmarkURL.classList.contains("is-valid")
  ) {
    bookmark = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };
    bookmarkList.push(bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
    display(bookmarkList);
    clearInput();
  } else alert("not valid data");
}
// ======== take list of bookmarks and display it ==========
function display(bookmarkList) {
  cartona = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    cartona += `<tr>
    <th scope="row" id="line${i}">${i + 1}</th>
    <td>${bookmarkList[i].name}</td>
    <td class="d-flex flex-column">
    <a href="https://${
      bookmarkList[i].url
    }" class="btn btn-success" target="_blank">
        <i class="fa-solid fa-eye pe-2"></i>Visit
      </a >
      <span class="text-sm-center">${bookmarkList[i].url}</span>
    </td>
    <td>
      <button onclick="deleteBookmark(${i})" class="btn btn-danger pe-2">
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
    <td>
      <a href="#bookmarkName" onclick="writeInput(${i})" class="btn btn-warning pe-2">
        <i class="fa-solid fa-pen"></i> Edite 
      </a>
    </td>
  </tr>`;
  }
  console.log(cartona);
  myTableRow.innerHTML = cartona;
}
// ======== Clear input ==========
function clearInput() {
  bookmarkName.value = null;
  bookmarkURL.value = null;
  bookmarkName.classList.remove("is-valid", "is-invalid");
  bookmarkURL.classList.remove("is-valid", "is-invalid");
}
// ======== Delete value from form to localstorge and display screen ==========
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
  display(bookmarkList);
}
// ======== Edite value from form to localstorge and display screen ==========
// --- write data in input and change submite btn to edite ---
function writeInput(index) {
  bookmarkName.value = bookmarkList[index].name;
  bookmarkURL.value = bookmarkList[index].url;
  document.getElementById("editeBtn").innerHTML = `<a
  href="#line${index}"
   onclick="editeBookmark(${index})"
   class="btn btn-warning px-5"
   id="editeBtn"
 >
   Edite
 </a>`;
}
// --- make bokmark with new date and delete old one then add new bookmark --
// --- push data in localstorge then change edite btn to submite btn ---
function editeBookmark(index) {
  if (
    bookmarkName.classList.contains("is-invalid") ||
    bookmarkURL.classList.contains("is-invalid")
  ) {
    alert("not valid data");
  } else {
    bookmark = {
      name: bookmarkName.value,
      url: bookmarkURL.value,
    };
    bookmarkList.splice(index, 1, bookmark);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkList));
    display(bookmarkList);
    clearInput();
    document.getElementById("editeBtn").innerHTML = `<a
    href="#tablefooter"
  onclick="addBookmark()"
  class="btn btn-danger px-5"
  id="submitBtn"
>
  Submit
</a>`;
  }
}
// ======== validat input with regex ======
function validateInpute(elment) {
  var regex = {
    bookmarkName: /^[A-Za-z][A-Za-z0-9_]{5,29}$/,
    bookmarkURL:
      /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/,
  };
  if (regex[elment.id].test(elment.value)) {
    elment.classList.add("is-valid");
    elment.classList.remove("is-invalid");
    elment.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    elment.classList.add("is-invalid");
    elment.classList.remove("is-valid");
    elment.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
