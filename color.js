let colorVariables = undefined;

const colorsBtn = document.body.querySelector("#colorListBtn");

const scheme1 = document.body.querySelector("#scheme1");
const scheme2 = document.body.querySelector("#scheme2");
const scheme3 = document.body.querySelector("#scheme3");
const scheme4 = document.body.querySelector("#scheme4");

getPreviousColors();

function clearTextFieldColor(){
    document.querySelector("#textField").removeAttribute("style");
}

function getPreviousColors(){
    let colorVariables;
    if(localStorage.getItem("selectedScheme") === null){
        colorVariables = `:root{
            --bodyColor: #1a1a2e;
            --mainColor: #e94560;
            --borderColor: #e9456050;
            --backgroundColor: #16213e;
            --accentColor: #0f3460;
            --searchPlaceholder: #65756e;
            --listText: white;
            --buttonHover: #c81937;
            --selectBackground: #ff768c;
            --selectText: #1a1a2e;
        }`
    } else {
        colorVariables = localStorage.getItem("selectedScheme");
        document.querySelector("#colorVars").innerHTML = colorVariables;
    }
}

function storeColors(){
    localStorage.setItem("selectedScheme", colorVariables);
}

colorsBtn.addEventListener("click", function(){
    document.body.querySelector("#colorListUl").classList.toggle("colorListShow")
})

scheme1.addEventListener("click", function(){
    clearTextFieldColor()
    colorVariables = `:root{
        --bodyColor: #1a1a2e;
        --mainColor: #e94560;
        --borderColor: #e9456050;
        --backgroundColor: #16213e;
        --accentColor: #0f3460;
        --searchPlaceholder: #65756e;
        --listText: white;
        --buttonHover: #c81937;
        --selectBackground: #ff768c;
        --selectText: #1a1a2e;
    }`

    document.querySelector("#colorVars").innerHTML = colorVariables;
    storeColors()    
})

scheme2.addEventListener("click", function(){
    clearTextFieldColor()
    colorVariables = `:root{
        --bodyColor: #fffbdb;
        --mainColor: #30362F;
        --borderColor: #e9456050;
        --backgroundColor: #fffbdb;
        --accentColor: #DA7422;
        --searchPlaceholder: #65756e;
        --listText: white;
        --buttonHover: #c81937;
        --selectBackground: #ff768c;
        --selectText: #1a1a2e;
    }`
    document.querySelector("#colorVars").innerHTML = colorVariables
    document.querySelector("#textField").style.color = "#2c0735"
    storeColors()
})

scheme3.addEventListener("click", function(){
    clearTextFieldColor()
    colorVariables = `:root{
        --bodyColor: #2c0735;
        --mainColor: #97dffc;
        --borderColor: #97dffc50;
        --backgroundColor: #613dc1;
        --accentColor: #858ae3;
        --searchPlaceholder: #613dc1;
        --listText: #2c0735;
        --buttonHover: #c81937;
        --selectBackground: #ff768c;
        --selectText: #1a1a2e;
    }`

    document.querySelector("#colorVars").innerHTML = colorVariables;
    storeColors()
})

scheme4.addEventListener("click", function(){
    clearTextFieldColor()
    colorVariables = `:root{
        --bodyColor: #77BFA3;
        --mainColor: #EDEEC9;
        --borderColor: #2A534350;
        --backgroundColor: #98C9A3;
        --accentColor: #2A5343;
        --searchPlaceholder: #EDEEC9;
        --listText: #EDEEC9;
        --buttonHover: #c81937;
        --selectBackground: #ff768c;
        --selectText: #1a1a2e;
    }`

    document.querySelector("#colorVars").innerHTML = colorVariables;
    document.querySelector("#textField").style.color = "#2A5343"
    storeColors();
})