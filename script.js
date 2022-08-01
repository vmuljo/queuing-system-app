const modal = document.querySelector(".modal");
const modalBlock = document.querySelector("#modal-content");
const btn = document.querySelector("#btn");
const close = document.querySelector(".close");
const list = document.querySelector(".namesList");
const admin = document.querySelector(".admin-enable");
var contents = document.querySelector(".contents");
var queue = [];
var queueList = document.querySelectorAll(".namesList li");
var queueArray = Array.from(queueList); 

class Person{
    name;
    number;

    constructor(name_, number_){
        this.name = name_;
        this.number = number_;
    }

    getName(){
        return this.name;
    }

    getPersonInfo(){
        var info = '';
        if(this.name !== undefined && this.number !== undefined){
            info = this.name + " (" + this.number + ")";
        }

        return info;
    }
}

class Admin{
    pin;


}

function adminToggle(){
    contents = document.querySelector('.contents')
    contents.classList.toggle("admin");
    if(contents.classList.contains("admin")){
        // var button = document.createElement('button');
        // button.type = "button";
        // button.id = "btn-remove";
        // button.innerHTML = "Remove First";
        // document.querySelector(".buttons").appendChild(button); 
        document.querySelector('#btn-remove').style.display = "block";
    }
    else{
        document.querySelector("#btn-remove").style.display = 'none';
    }
}

function modalToggle(){
    modal.classList.toggle('modal-active');
    if(modal.classList.contains('modal-active')){
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

document.querySelector("#submitbtn").onclick = function(){
    var name = document.querySelector("#name").value.trim();
    var num = document.querySelector("#pNumber").value.trim();
    var valid = true;

    if(name.length == 0){
        document.querySelector("#name-error").innerHTML = "&#9888; Name cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#name-error").innerHTML =""; valid = true;}

    if(num.length == 0){
        document.querySelector("#num-error").innerHTML = "&#9888; Number cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#num-error").innerHTML =""; valid = true;}

    
    if(valid){
        if(list.classList.contains('empty')){
            list.classList.remove('empty');
            list.innerHTML = "";
        }
        const person = new Person(name, num);
        queue.push(person);
        var latestPushedName = queue.at(-1).name;

        const li = document.createElement('li');
        li.innerHTML = latestPushedName;
        list.appendChild(li);
        queueList = document.querySelectorAll(".namesList li");
        queueArray = Array.from(queueList); 
        console.log(queueArray);
        document.querySelector("#name").value = "";
        document.querySelector("#pNumber").value = "";
        modalToggle();
    }

}

document.querySelector('#btn-remove').onclick = function(){
    var cleared = false;
    // console.log(list);
    console.log(queueList);
    if(queueList.length > 0 && !cleared){
        const first = queueArray.shift();
        const firstOut = queue.shift();
        console.log(list);
        list.removeChild(list.children[0]);
        console.log(queueArray);
        queueList = document.querySelectorAll(".namesList li");
        if(queueList.length == 0){
            list.classList.add("empty");
            list.innerHTML = "No one is in the Queue!";
        }
    }
    else{
        list.classList.add("empty");
        list.innerHTML = "No one is in the Queue!";
        console.log("No one is in the Queue!");
        alert("No one is in the queue!");
        
        var cleared = true;
    }
    console.log(queueList.length);
}

btn.onclick = () => {modalToggle();}
close.onclick = () => {
    modalToggle();
    document.querySelector("#name-error").innerHTML ="";
    document.querySelector("#num-error").innerHTML ="";
}
window.onclick = (e) => {
    if(e.target == modal){
        modalToggle();
        document.querySelector("#name-error").innerHTML ="";
        document.querySelector("#num-error").innerHTML ="";
    }
}
// close.addEventListener('click', ()=>{
//     modalToggle();
//     document.querySelector("#name-error").innerHTML ="";
//     document.querySelector("#num-error").innerHTML ="";
// });

// window.addEventListener('click', (e)=>{
//     if(e.target == modal){
//         modalToggle();
//         document.querySelector("#name-error").innerHTML ="";
//         document.querySelector("#num-error").innerHTML ="";
//     }
// });

admin.onclick = ()=>{
    adminToggle();
}







