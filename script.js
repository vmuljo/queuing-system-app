const modal = document.querySelector("#queue-modal");
const infoModal = document.querySelector('#info-modal')
const queueModalBlock = document.querySelector("#queue-modal-content");
const infoModalBlock = document.querySelector("#info-modal-content");
const adminModal = document.querySelector("#admin-modal");
const adminModalBlock = document.querySelector("#admin-modal-content");
var btn = document.querySelector("#btn");
const queueclose = document.querySelector("#queueclose");
const infoclose = document.querySelector("#infoclose");
const adminclose = document.querySelector("#adminclose");
const list = document.querySelector(".namesList");
const admin = document.querySelector(".admin-enable");
var contents = document.querySelector(".contents");

var queue = [];
var queueList = document.querySelectorAll(".namesList li");
var queueArray = Array.from(queueList); 
var queuelock = document.querySelector('#queue-lock');
var lockToggle=false;

class Person{
    name;
    number;
    // queueSpot;
    status;

    // constructor(name_, number_){
    //     this.name = name_;
    //     this.number = number_;
    // }

    constructor(name_, number_, status_){
        this.name = name_;
        this.number = number_;
        this.status = status_;
    }

    getPersonInfo(){
        var info = '';
        if(this.name !== undefined && this.number !== undefined){
            info = this.name + " (" + this.number + ")";
        }

        return info;
    }

    addPersonToDOM(){
        // Creates DOM elements
        const li = document.createElement('li');
        const deleteSpan =  document.createElement('span');
        const readySpan = document.createElement('span');
        const div_li = document.createElement('div');

        // Adds classes and styling to each element
        div_li.classList.add('queue-entry');
        deleteSpan.classList.add('guest-option', 'remove');
        readySpan.classList.add('guest-option', 'ready');
        li.classList.add('guest-name');
        li.style.cursor = "default";
        // If currently in admin mode when adding to queue:
        if(document.querySelector('.contents').classList.contains('admin')){
            deleteSpan.classList.add('admin-option');
            readySpan.classList.add('admin-option');
            deleteSpan.classList.remove('guest-option');
            readySpan.classList.remove('guest-option');
            li.style.cursor = "pointer";
        }

        // Sets innerhtml of dom elements
        deleteSpan.innerHTML = "&#10006;";
        readySpan.innerHTML = "&#10004;";
        li.innerHTML = this.name;

        // Sets the DOM structure and puts in HTML code
        div_li.appendChild(readySpan);
        div_li.appendChild(li);
        div_li.appendChild(deleteSpan);
        list.appendChild(div_li);
    }
}

function saveQueue(){
    localStorage.queue = JSON.stringify(queue);
}

console.log(localStorage.queue);
function loadQueue(){
    if(localStorage.queue != '[]' && localStorage.queue != undefined){
        var oldQueue = JSON.parse(localStorage.queue);
        // Creates DOM elements
        if(list.classList.contains('empty')){
            list.classList.remove('empty');
            list.innerHTML = "";
        }
        // console.log(oldQueue);
        oldQueue.forEach(function(queueitem){
            // console.log(queueitem);
            // queueitem.addPersonToDOM();
            const p = new Person(queueitem.name, queueitem.number, queueitem.status);
            queue.push(p);
            p.addPersonToDOM();
            // console.log(queue);
        })
        saveQueue();
        // localStorage.clear();
    }
}
loadQueue();

// Saves status of lock so if admin locks the queue, the status is saved and guests can't simply refresh to override it
function saveLockStatus(){
    localStorage.lock = lockToggle;
}
// Checks the lock status in local storage
console.log(localStorage.lock);
function checkLock(){
    console.log(localStorage.lock);
    if(localStorage.lock == 'true'){
        lockToggle = true;
        btn.disabled = true;
        btn.classList.add('disabled-button','noHover');
        queuelock.innerHTML = "Unlock Queue";
    }
}
checkLock();

// Toggles between guest and admin mode
function adminToggle(){
    contents = document.querySelector('.contents')
    contents.classList.toggle("admin");
    if(contents.classList.contains("admin")){
        const guestoptions = document.querySelectorAll('.guest-option');
        queueEntryAttended();
        guestoptions.forEach(guestoption => {
            guestoption.classList.add('admin-option');
            guestoption.classList.remove('guest-option');
            guestoption.parentNode.childNodes[1].style.cursor = "pointer";
            
        });
        if(btn.classList.contains('disabled-button')){
            btn.disabled = false;
            btn.classList.remove('disabled-button', 'noHover');
        }
        viewGuest();
        saveQueue();
    }
    else{
        const adminoptions = document.querySelectorAll('.admin-option');
        adminoptions.forEach(adminoption => {
            adminoption.classList.add('guest-option');
            adminoption.classList.remove('admin-option');
            adminoption.parentNode.childNodes[1].style.cursor = "default";
        });

        if(lockToggle){
            btn.disabled = true;
            btn.classList.add('disabled-button','noHover');
        }
        else{
            btn.disabled = false;
            btn.classList.remove('disabled-button','noHover');
        }

        saveQueue();
    }
}

// Toggles the modal depending on what type of modal
function modalToggle(modalClass, modalContent){
    modalClass.classList.toggle('modal-active');
    if(modalClass.classList.contains('modal-active')){
        modalContent.style.animation = `animateModal 0.3s`;
        modalClass.style.animation = `modalBackgroundFadeIn 0.3s`;
        modalClass.style.display = 'block';
    }
    else{
        modalContent.style.animation = `animateModalOut 0.3s`;
        modalClass.style.animation = `modalBackgroundFadeOut 0.3s`;
        setTimeout(function(){
            modalClass.style.display = 'none';
        }, 250)
    }
}

var clickedGuest;
var clickedGuestIndex;
// Sets the info modal to clicked guest information from on queue
function viewGuest(){

    var name = document.querySelector('#person');
    var spot = document.querySelector('#index');
    var phone = document.querySelector('#num');
    var status = document.querySelector('#status');

    if(document.querySelector('.contents').classList.contains("admin")){
        queueList = document.querySelectorAll(".queue-entry li");
        queueList.forEach((guest, i) =>{
            guest.onclick = function(){
                clickedGuest = this;
                clickedGuestIndex = i;
                // console.log(this.parentNode);
                console.log(i);
                name.innerHTML = queue.at(i).name;
                spot.innerHTML = i+1;
                phone.innerHTML = queue[i].number;
                if(queue[i].status){
                    status.innerHTML = "Attended to";
                }
                else{status.innerHTML = "Waiting"}
                // status.innerHTML = queue[i].status;
                modalToggle(infoModal, infoModalBlock);
            }
        })
    }
}
viewGuest();

function removeQueueEntry(){
    var guestList = document.getElementsByClassName('remove');
    Array.from(guestList).forEach((guest, i) => {
        guest.onclick = function(){
            this.parentNode.remove();
            console.log(i);
            if(guestList.length == 0) makeEmpty();
            console.log(queue);
            queue.splice(i, 1);
            removeQueueEntry(); //recursion for updated list and index values after removal
            queueEntryAttended();
            viewGuest();
            saveQueue();
        }
    });

}
removeQueueEntry();

// Function to set guest as attended if check mark clicked
function queueEntryAttended(){
    var guestList = document.querySelectorAll('.ready');
    guestList.forEach((guest, i) => {
        guest.onclick = function(){
            // console.log(i);
            // console.log(guestList.length);
            queue[i].status = true;
            saveQueue();
        }
    })
}
queueEntryAttended();

// Function to add text to empty queue and set list as empty
function makeEmpty(){
    list.classList.add("empty");
    list.innerHTML = "No one is in the Queue!";
    console.log("No one is in the Queue!");
}

// When the submit button is clicked, add to queue
document.querySelector("#submitbtn").onclick = function(){
    // gets user input
    var name = document.querySelector("#name").value.trim();
    var num = document.querySelector("#pNumber").value.trim();
    var valid = true;

    //Check if valid name or number
    if(name.length == 0){
        document.querySelector("#name-error").innerHTML = "&#9888; Name cannot be empty.";
        valid = false;
    }
    else{document.querySelector("#name-error").innerHTML =""; valid = true;}

    if(num.length == 0){
        document.querySelector("#num-error").innerHTML = "&#9888; Phone number cannot be empty.";
        valid = false;
    }
    else if(/(^\d{10}$)/.test(num) == false){
        document.querySelector("#num-error").innerHTML = "&#9888; Invalid phone format, use 0123456789";
        valid = false;
    }
    else{document.querySelector("#num-error").innerHTML =""; valid = true;}

    // if name and number is valid:
    if(valid){
        if(list.classList.contains('empty')){
            list.classList.remove('empty');
            list.innerHTML = "";
        }
        // Add a new Person object to a queue
        const person = new Person(name, num, false);
        queue.push(person);
        // person.queueSpot = queue.indexOf(person);
        console.log(queue);
        person.addPersonToDOM();

        queueList = document.querySelectorAll(".namesList li");
        document.querySelector("#name").value = "";
        document.querySelector("#pNumber").value = "";
        modalToggle(modal, queueModalBlock);
        removeQueueEntry();
        viewGuest();
        queueEntryAttended();
        saveQueue();
    }
}
// Admin button: Removes first person from queue
document.querySelector('#btn-remove').onclick = () => {
    var cleared = false;
    console.log(queueList);
    if(queueList.length > 0 && !cleared){
        queue.splice(0, 1);
        list.removeChild(list.children[0]);
        queueList = document.querySelectorAll(".namesList li");
        if(queueList.length == 0) makeEmpty();
    }
    else{
        makeEmpty();
        alert("No one is in the queue!");
        
        var cleared = true;
    }
    queueEntryAttended();
    viewGuest();
    saveQueue();
}

// Admin button: Clears the queue
document.querySelector('#btn-clear').onclick = () => {
    if(queueList.length > 0){
        list.innerHTML = '';
        queueList = document.querySelectorAll(".namesList li");
        queue = [];
        makeEmpty();
        localStorage.clear();
        console.log(queue);
        return;
    }
    console.log("No one is in the Queue!");
    alert("No one is in the queue!");
}

// Admin button: Locks Add to Queue button in guest mode to prevent more people
queuelock.onclick = () => {
    lockToggle = !lockToggle;
    saveLockStatus();
    console.log(localStorage.lock);
    if(lockToggle){
        queuelock.innerHTML = "Unlock Queue";
        return;
    }
    queuelock.innerHTML = "Lock Queue";
}

// Info Modal Remove Button: Removes the selected guest item from the queue
document.querySelector('#remove-guest').onclick = function(){
    console.log(queue);
    var guestList = document.getElementsByClassName('guest-name');
    clickedGuest.parentNode.remove();
    modalToggle(infoModal, infoModalBlock);
    if(guestList.length == 0) makeEmpty();
    
    queue.splice(clickedGuestIndex, 1);
    queueEntryAttended()
    viewGuest();
    saveQueue();
}

btn.onclick = () => {modalToggle(modal, queueModalBlock);} // When "Add to queue" button is clicked, open modal
// When "x" in modal is clicked, close the modal and clear input fields
queueclose.onclick = function(){
        modalToggle(modal, queueModalBlock);
        document.querySelector("#name-error").innerHTML ="";
        document.querySelector("#num-error").innerHTML ="";
}

// Close info modal
infoclose.onclick = () => {
    modalToggle(infoModal, infoModalBlock);
}

adminclose.onclick = () => {
    modalToggle(adminModal, adminModalBlock);
}

// When admin (tool symbol) button is clicked, close modal
admin.onclick = ()=>{
    contents = document.querySelector('.contents')

    if(!contents.classList.contains("admin")){
        
        modalToggle(adminModal, adminModalBlock);
        document.querySelector('#adminsubmit').onclick = function(){
            var valid = true;
            var pin = document.querySelector('#pin').value.trim();
            
            if(pin != "1234"){
                document.querySelector('#admin-error').innerHTML = "&#9888; Invalid PIN";
                valid = false;
            }
            else{
                document.querySelector('#admin-error').innerHTML = "";
                valid = true;
            }
            
            if(valid){
                adminToggle();
                modalToggle(adminModal, adminModalBlock);
            }
            document.querySelector('#pin').value = "";
        }
    }
    else{adminToggle();}

    
    
}
// When anywhere outside of the modal window is clicked, close the modal
window.onclick = (e) => {
    if(e.target == modal){
        modalToggle(modal, queueModalBlock);
        document.querySelector("#name-error").innerHTML ="";
        document.querySelector("#num-error").innerHTML ="";
        return;
    }
    if(e.target == infoModal){
        modalToggle(infoModal, infoModalBlock);
    }
    if(e.target == adminModal){
        modalToggle(adminModal, adminModalBlock);
    }
}

