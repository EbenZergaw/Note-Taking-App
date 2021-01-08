var isEditing = false;

function loadUIvars(){
    // UI VARIABLES
    window.userTextValue = document.querySelector("#textField").innerHTML;

    window.li = document.createElement("li");
    window.listDiv = document.createElement("div");
    window.listText = document.createElement("div");

    li.className = "noteRightLi";
    listDiv.className = "listDiv";
    listText.className = "listText";

    // DELETE BUTTON
    window.delButton = document.createElement("button");
    delButton.innerHTML = "X";
    delButton.className = "delButton";

    window.editSpan = document.createElement("span");
    editSpan.innerHTML = "EDIT"
    editSpan.className = "editSpan"
}

// EVENT LISTENERS
loadEventListeners();

function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getNotes)

    document.querySelector("#noteSubmit").addEventListener("click", submitNote);
    document.querySelector("#clearAll").addEventListener("click", deleteAll);
    document.body.addEventListener("click", deleteList);
    document.body.addEventListener("click", expand);

    document.body.addEventListener("click", editNote)

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
        li.appendChild(editSpan);
        document.querySelector("#noteRightUl").appendChild(li);
    });
}

function submitNote(){
    loadUIvars();

    if(isEditing === false){
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
            li.appendChild(editSpan);
            document.querySelector("#noteRightUl").appendChild(li);

        // STORES IN LOCAL STORAGE
            storeNote(userTextValue);
            document.querySelector("#textField").innerHTML = "";
            } else {
                alert("Enter at least 4 characters")
            }
    } else {
        let notes = JSON.parse(localStorage.getItem("notes"));
        let replaceIndex = notes.indexOf(document.querySelector(".editPending").firstChild.firstChild.innerHTML);

        document.querySelector(".editPending").firstChild.firstChild.innerHTML = userTextValue;
        document.querySelector(".editPending").classList.toggle("editPending");
        document.querySelector("#textField").innerHTML = ""

        notes[replaceIndex] = userTextValue;
        localStorage.setItem("notes", JSON.stringify(notes));
        isEditing = false;
    }

}

function editNote(e){
    if(e.target.className === "editSpan"){
        
        let ul = document.querySelector("ul");
        let items = ul.getElementsByTagName("li");

        for(let i = 0; i <= items.length - 1; i++){
            if(items[i].classList.contains("editPending")){
                items[i].classList.remove("editPending")
            }
        }

        e.target.parentElement.classList.toggle("editPending")
        document.querySelector("#textField").innerHTML = e.target.parentElement.querySelector(".listDiv").firstChild.innerHTML;
        isEditing = true;
    }
}

function deleteList(e){
    if(e.target.className.includes("delButton")){
        if(confirm("Are You Sure?") === true){
            if(isEditing === true){
                document.querySelector("#textField").innerHTML = ""
            }
            e.target.parentElement.remove();
            removeNote(e.target.parentElement);
            isEditing = false;
        }
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

function removeNote(){
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

function deleteAll(){
    if(document.querySelector("#noteRightUl").childElementCount > 0){
        var answer = confirm("Are You Sure?");
    }
    if(answer === true){
        while(document.querySelector("#noteRightUl").firstChild){
        document.querySelector("#noteRightUl").lastChild.remove();
    }

    }
    localStorage.removeItem("notes")
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