const modal = document.querySelector("#modalForm");
const btn = document.querySelector("#btn");
var close = document.querySelector(".close");
console.log("working");
btn.addEventListener('click', ()=>{
    modal.style.display = 'block';
});

close.addEventListener('click', ()=>{
    modal.style.display = "none";
});

window.addEventListener('click', (e)=>{
    if(e.target == modal){
        modal.style.display = "none";
    }
});

// btn.onclick = function(){
//     console.log("hello");
// };

