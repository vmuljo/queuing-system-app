const modal = document.querySelector("#modalForm");
const modalBlock = document.querySelector("#modal-content");
const btn = document.querySelector("#btn");
const close = document.querySelector("#queueclose");
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
        const guestoptions = document.querySelectorAll('.guest-option');
        guestoptions.forEach(guestoption => {
            guestoption.classList.add('admin-option');
            guestoption.classList.remove('guest-option');
        });
    }
    else{
        const adminoptions = document.querySelectorAll('.admin-option');
        adminoptions.forEach(adminoption => {
            adminoption.classList.add('guest-option');
            adminoption.classList.remove('admin-option');
        });
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

function viewGuest(){
    const guestList = document.querySelectorAll('.queue-entry');

    guestList.forEach(guest => {
        guest[i].onclick = () => {

        }
    })
    for(var i = 0; i<guest.length; i++){
        guest[i].onclick = () => {
            console.log(queue)
        }
    }
}

function guestModal(){

}

function removeQueueEntry(){
    var guestList = document.getElementsByClassName('remove');
    for(var i = 0; i<guestList.length; i++){
        guestList[i].onclick = function(){
            console.log(guestList.length);
            this.parentNode.remove();
            if(guestList.length == 0) makeEmpty();
        }
    }
}

function makeEmpty(){
    list.classList.add("empty");
    list.innerHTML = "No one is in the Queue!";
    console.log("No one is in the Queue!");
}

removeQueueEntry();

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
        const deleteSpan =  document.createElement('span');
        const readySpan = document.createElement('span');
        const div_li = document.createElement('div');

        div_li.classList.add('queue-entry');
        deleteSpan.classList.add('guest-option', 'remove');
        readySpan.classList.add('guest-option', 'ready');
        if(document.querySelector('.contents').classList.contains('admin')){
            deleteSpan.classList.add('admin-option');
            readySpan.classList.add('admin-option');
            deleteSpan.classList.remove('guest-option');
            readySpan.classList.remove('guest-option');
        }

        deleteSpan.innerHTML = "&#10006;";
        readySpan.innerHTML = "&#10004;";
        li.innerHTML = latestPushedName;

        div_li.appendChild(readySpan);
        div_li.appendChild(li);
        div_li.appendChild(deleteSpan);
        list.appendChild(div_li);

        queueList = document.querySelectorAll(".namesList li");
        // queueArray = Array.from(queueList); 
        // console.log(queueArray);
        document.querySelector("#name").value = "";
        document.querySelector("#pNumber").value = "";
        modalToggle();
        // removeQueueEntry();
    }

}

document.querySelector('#btn-remove').onclick = () => {
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
            makeEmpty();
        }
    }
    else{
        makeEmpty();
        alert("No one is in the queue!");
        
        var cleared = true;
    }
    console.log(queueList.length);
}

document.querySelector('#btn-clear').onclick = () => {
    if(queueList.length > 0){
        list.innerHTML = '';
        queueList = document.querySelectorAll(".namesList li");
        queue = [];
        makeEmpty();
        return;
    }
    console.log("No one is in the Queue!");
    alert("No one is in the queue!");
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







