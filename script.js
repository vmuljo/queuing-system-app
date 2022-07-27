const modal = document.querySelector(".modal");
const modalBlock = document.querySelector("#modal-content");
const btn = document.querySelector("#btn");
const close = document.querySelector(".close");
const list = document.querySelector(".namesList");
console.log(list);

class Person{
    name;
    number;
    // email;

    constructor(name_, number_){
        this.name = name_;
        this.number = number_;
    }

    getPersonInfo(){
        var info = '';
        if(this.name !== undefined && this.number !== undefined){
            info = this.name + " (" + this.number + ")";
        }

        return info;
    }
}

btn.addEventListener('click', ()=>{
    modalToggle();
});

close.addEventListener('click', ()=>{
    modalToggle();
});

window.addEventListener('click', (e)=>{
    if(e.target == modal){
        modalToggle();
    }
});

document.querySelector("#submitbtn").onclick = function(){
    var name = document.querySelector("#name").value.trim();
    var num = document.querySelector("#pNumber").value.trim();
    var valid = true;

    if(name.length == 0){
        document.querySelector("#name-error").innerHTML = "Name cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#name-error").innerHTML ="";}

    if(num.length == 0){
        document.querySelector("#num-error").innerHTML = "Number cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#num-error").innerHTML ="";}

    if(name.length > 0 && num.length > 0){
        valid = true;
        const li = document.createElement('li');
        li.innerHTML = name;
        list.appendChild(li);
        console.log(document.querySelectorAll(".namesList li"))
    }

    // Clear form fields
    name = "";
    num = "";
    if(valid){
        modal.style.display = "none";
        // const out = document.querySelector("#modal-content");
        // out.style.animation = 'animateModalOut';
    }
}

function modalToggle(){
    modal.classList.toggle('.modal-active');
    if(modal.classList.contains('.modal-active')){
        modalBlock.style.animation = `animateModal 0.3s`;
        modal.style.animation = `modalBackgroundFadeIn 0.3s`;
        modal.style.display = 'block';
    }
    else{
        modalBlock.style.animation = `animateModalOut 0.3s`;
        modal.style.animation = `modalBackgroundFadeOut 0.3s`;
        setTimeout(function(){
            modal.style.display = 'none';
        }, 250)
        
    }
}

