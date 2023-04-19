const phoneDs = localStorage.getItem('phoneData')
const phoneD = JSON.parse(phoneDs)

console.log('result')
console.log(phoneDs)
console.log(phoneD)

document.getElementById('resultShow').innerHTML=phoneD




function showItem(){
    console.log("result")
    const phoneDs = localStorage.getItem('phoneData')
    const phoneD = JSON.parse(phoneDs)
    console.log(phoneD)


    const queryString = window.location.href;
    console.log('shot url',queryString);

    const urlParams = new URLSearchParams(queryString);
    console.log(urlParams,'shot params');
    const product = urlParams.get('id_token')
    console.log(product,'token');

}

document.getElementById("btn2").onclick = showItem



const queryString = window.location.search;
console.log(queryString,'shot url');

const urlParams = new URLSearchParams(queryString);