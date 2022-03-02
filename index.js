getAllDogs();
function changeBack() {
  getImage();
  setInterval(() => {
    getImage();
  }, 8000);
}
async function getImage() {
  var imgUrl = "";

  let res1 = await fetch("https://dog.ceo/api/breeds/image/random");

  let res2 = await res1.json();
  imgUrl = res2.message;
  document.getElementById(
    "background"
  ).style.background = `#f3f3f3 url(${imgUrl}) no-repeat `;
}
changeBack();
async function getAllDogs() {
  let res = await fetch("https://dog.ceo/api/breeds/list/all");
  let res1 = await res.json();
  let fin = await res1.message;
  let keyData = await Object.keys(fin);

  getHTML(keyData);
}
async function getHTML(fin) {
  const data = document.getElementById("dogsList");
  for (let a of fin) {
    let details = await fetch(`https://dog.ceo/api/breed/${a}/images/random`);
    let imag = await details.json();
    data.innerHTML += `
        <div  id="${a}" class="display-parent" >
            <div><img id="${a}image" src="${imag.message}" class="display-box" alt="">
                <h1 onclick="selectedDog(${a})">${a}</h1>
                <button class="btn btn-primary" onclick="changeMyDP(${a})">Change My DP</button>
            </div>
        </div>
      `;
  }
}

function selectedDog(dogName) {
  console.log(dogName);
}
var i = 0;
async function changeMyDP(dogName) {
  console.log(dogName);
  let dp = await fetch(`https://dog.ceo/api/breed/${dogName.id}/images`);
  let dp1 = await dp.json();
  document.getElementById(dogName.id + "image").src = dp1.message[i];
  if (i + 1 == dp1.message.length) {
    i = 0;
  } else {
    i++;
  }
}
