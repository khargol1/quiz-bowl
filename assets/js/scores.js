let text=document.getElementById("name").value;
let goBackEl = document.getElementById("go-back");
let submitEl = document.getElementById("submit");

goBackEl.addEventListener("click", startPage);
submitEl.addEventListener("click", addScore);

onLoad();

let testObject ={
    name: "",
    score: 0
};

//this only fires if they can add a score.
function addScore(event){
    let name=document.getElementById("name").value; //grab name
    document.getElementById("name").value = ""; //clear it
    if(name == ""){return;} //do nothing
    //clear buttons and things off screen
    document.getElementById("name").style.display = "none";
    document.getElementById("submit").style.display = "none";
    document.querySelector(".wrapper").style.display = "none";
    console.log(name);

    //get score from local storage
    let score = parseInt(localStorage.getItem("score"));
    console.log(score);

    //package into an object
    testObject.name = name;
    testObject.score = score;
    console.log(testObject);

    let scores = makeList(testObject); //returns undefined on initial page load
    console.log(scores);
    //display scores after adding
    for(var i = 0; i < scores.length; i++){
        displayList(scores[i]);
    }
}


function displayList(item){
    let node = document.createElement("li");
    let textNode = document.createTextNode(item.name + " " + item.score);
    console.log(textNode);
    node.appendChild(textNode);
    document.getElementById("high-scores").appendChild(node);
}

//status: Working
function onLoad(){
    //figure out what to show user
    let proceed = localStorage.getItem("new");
    console.log(proceed);
    
    if(proceed == null){
        proceed = "no";
        }
    if(proceed == "no"){
        //then we are just viewing the page. only show go back
        document.getElementById("name").style.display = "none";
        document.getElementById("submit").style.display = "none";
        document.querySelector(".wrapper").style.display = "none";
        //and show scores. 
        if("top-scores" in localStorage){
            let scores = JSON.parse(localStorage.getItem('top-scores'));
            for(var i = 0; i < scores.length; i++){
                displayList(scores[i]);
            }
        }else{
            document.getElementById("message").style.display = "block";
        }
    }
    
    if(proceed = "yes"){
        //We need to let a player add thier score before showing scores.
        localStorage.setItem("new", "no"); //on refresh or revist page prevents re entery
    }
    //regardless of button displays, show scores
}

//makes the list of top scores
function makeList(item){
     
    console.log(item);
    let list = [];
    // check to see if its in local storage
    if ("top-scores" in localStorage) {
        list = JSON.parse(localStorage.getItem('top-scores'));
         
    } else { //its not, so make a list and put in local storage, a list of 1 item is trivially sorted
        list = [item];
        console.log(list);
        localStorage.setItem("top-scores", JSON.stringify(list));
        return list;
    }
    console.log(list);
     
    //now to sort the high score into the list
    finalList = [];
    console.log(finalList);
    //compare to first element, if first elment is bigger, add to list
    while(list.length != 0){
        console.log(list[0], item);
        let x = compare(list[0], item);
        finalList.push(x);
        if(x == item){break;} 
        else{
            list.shift();
        }
        console.log(list);
        //finally if this is the lowest score
        if(list.length == 0)
        {
            finalList.push(item);
        }
    }

     
    //now i have 2 sorted lists, one high one low
    console.log(finalList, typeof finalList);
    console.log(list);
    let realFinalList = finalList.concat(list); 
    console.log(realFinalList);
    
    //update local storage
    localStorage.setItem("top-scores", JSON.stringify(realFinalList));
    
    //if list.lenght > 10, trim it
    while(realFinalList.length > 10){
        finalList.pop();
    }
    

    return realFinalList;
}

//compares value for next list item
function compare(a, b){

    if(a.score > b.score){
        return a;
    }
    else{return b;}

}

function startPage(event){
    window.location.href = "index.html";
}