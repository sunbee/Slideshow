import { Observable, Computed, bind2DOM } from './Bindings.js';
import { Slide } from '/Slide.js';
import { Control } from '/Controls.js'

function removeAllChildren(parent) {
    /*
    Remove all the children of a parent node.
    */
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

function update_DOM(index) {
    /*
    Create custom HTML elements,
    slide-quiz and slide-control,
    for insertion into the DOM.
    Set the attributes of the new elements
    for use in fleshing out the nodes
    at the time of insertion into DOM
    via the connectedCallback() method.
    Insert into DOM using appendChild()
    after removing previous children.
    */
    var quiz_name = './Slides/Quiz00' + index + '.html';
    var slide = document.createElement("slide-quiz");
    slide.setAttribute("path2html", quiz_name);
    var control = document.createElement("slide-control");
    control.setAttribute("path2html", "./controls.html");

    var question = document.getElementById("Question");
    removeAllChildren(question);
    question.appendChild(slide);
    var answer = document.getElementById("Answer");
    removeAllChildren(answer);
    answer.appendChild(control);
};

export var loadSlide = (index) => {
    update_DOM(index);

    /* 
    Allow some time for the creation of new nodes
    and their insertion into DOM. 
    Then, execute data-bindings for reactive elements
    and set the callback for the slide advancement.
    */
    setTimeout( () => {
        var answer = document.getElementById("Expected").getAttribute("data-answer");
        var response = new Observable('ans');
        var passfail = new Computed( () => {
            return (response.value == answer) ? "Good!" : "Try!";
        }, [response]);
    
        var context = {
            response: response,
            passfail: passfail
        };
    
        document.querySelectorAll("[data-binding]").forEach( (inputElement) => {
            console.log("Bound:" + inputElement);
            bind2DOM(inputElement, context[inputElement.getAttribute("data-binding")]);
        });
        
        var pagedn = document.getElementById("Pagination").getAttribute("data-pagedn");
        document.getElementById("Next").addEventListener("click", () => {loadSlide(Number(pagedn))});

    }, 1000);
};

