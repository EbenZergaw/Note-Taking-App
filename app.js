function loadUIvars(){
    // UI VARIABLES
    window.userTextValue = document.querySelector("#textField").innerHTML;

    window.li = document.createElement("li");
    window.listDiv = document.createElement("div");
    window.listText = document.createElement("div");

    listDiv.className = "listDiv";
    listText.className = "listText";

    // DELETE BUTTON
    window.delButton = document.createElement("button");
    delButton.innerHTML = "X";
    delButton.className = "delButton";

    // EDIT BUTTON
    window.editButton = document.createElement("i");
    editButton.className = "editButton";

}

// EVENT LISTENERS
loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getNotes)

    document.querySelector("#noteSubmit").addEventListener("click", submitNote);
    document.querySelector("#clearAll").addEventListener("click", deleteAll);
    document.body.addEventListener("click", deleteList);
    document.body.addEventListener("click", expand);

    document.querySelector("#searchBar").addEventListener("keyup", searchNotes)

    document.body.addEventListener("click", removeBottomBug)
}

function getNotes(){
    loadUIvars();
    let notes;
    if(localStorage.getItem("notes") === null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    notes.forEach(function(index){
        loadUIvars();
        listText.innerHTML = index;
        listDiv.appendChild(listText);
        li.appendChild(listDiv);
        li.appendChild(delButton);
        document.querySelector("ul").appendChild(li);
    });
}

function submitNote(){
    loadUIvars();

    // CHECKS IF BLANK
    function isBlank(){
        if(userTextValue.length < 4){
            return true;
        } else {
            return false;
        }
    }

    // CREATES LIST ELEMENT
    if(isBlank() === false){
        listText.innerHTML = userTextValue;
        listDiv.appendChild(listText);
        li.appendChild(listDiv);
        li.appendChild(delButton);
        li.appendChild(editButton);
        document.querySelector("ul").appendChild(li);

    // STORES IN LOCAL STORAGE
        storeNote(userTextValue);

        document.querySelector("#textField").innerHTML = "";
    } 
}

function storeNote(note){
    let notes;
    if(localStorage.getItem("notes") === null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }
    notes.push(note);

    localStorage.setItem("notes", JSON.stringify(notes))
}

function deleteList(e){
    if(e.target.className.includes("delButton")){
        if(confirm("Are You Sure?") === true){
            e.target.parentElement.remove();
            removeNote(e.target.parentElement);
        }
    }

}

function removeNote(note){
    let notes;
    if(localStorage.getItem("notes") === null){
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem("notes"));
    }

    notes.forEach(function(note, index){
        if(note === note){
            notes.splice(index, 1)
        }
    })
    localStorage.setItem("notes", JSON.stringify(notes))
}

function deleteAll(e){
    if(document.querySelector("ul").childElementCount > 0){
        var answer = confirm("Are You Sure?");
    }
    if(answer === true){
        while(document.querySelector("ul").firstChild){
        document.querySelector("ul").lastChild.remove();
    }

    }
    localStorage.clear();
}

function expand(e){

    if(e.target.classList.contains("listDiv")){
        e.target.parentElement.classList.toggle("expandLi");
        e.target.querySelector(".listText").classList.toggle("expandListText");
    }

    if(e.target.classList.contains("listText")){
        e.target.parentElement.classList.toggle("expandLi");
        e.target.classList.toggle("expandListText");
        removeBottomBug();
    }

    if(e.target.parentElement.classList.contains("listText")){
        e.target.parentElement.parentElement.parentElement.classList.toggle("expandLi");
        e.target.parentElement.classList.toggle("expandListText");
    }

    if(e.target.tagName === "li"){
        e.target.classList.toggle("expandLi");
        e.target.querySelector(".listText").classList.toggle("expandListText");
    }


    if(e.target.outerHTML.includes("listText")){
        e.target.parentElement.classList.toggle("expandListText");
        e.target.parentElement.parentElement.classList.toggle("expandLi");
    }

    document.body.querySelector(".container").classList.remove("expandLi");
    document.body.querySelector(".container").classList.remove("expandListText");
    document.body.classList.remove("expandLi");
    document.body.querySelector("#noteRight").classList.remove("expandListText")
    document.body.querySelector("#noteRight").classList.remove("expandLi")
}

function searchNotes(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll("li").forEach(function(note){
        const item = note.firstChild.innerHTML;
        if(item.toLowerCase().indexOf(text) != -1){
            note.style.display = "block";
        } else {
            note.style.display = "none"
        }
    });
}

function removeBottomBug(){
    for(i = 1; i < document.querySelector("ul").getElementsByTagName("li").length; i++){
        document.querySelector("ul").getElementsByTagName("li")[i].classList.remove("expandListText");
    }
}