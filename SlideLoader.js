import { Observable, Computed, bind2DOM } from './Bindings.js';
import { Slide } from '/Slide.js';
import { Control } from '/Controls.js';
import { SlideDeck } from './SlideDeck.js';
import { removeAllChildren } from './Swissknife.js';

async function update_DOM(index) {
    /*
    Create custom HTML elements,
    slide-deck and slide-control,
    for insertion into the DOM.
    Set the attributes of the new elements
    for use in fleshing out the nodes
    at the time of insertion into DOM
    via the connectedCallback() method.
    Insert into DOM using appendChild()
    after removing previous children.
    The slide-deck loads an array 
    of slide-quiz elements and 
    the slide-control element
    handles pagination. Slide advancement
    occurs via the attributeChangedCallback()
    on the observed attribute, current,
    which is the current slide numvber. 
    */
    var slideDeck = document.createElement("slide-deck");
    slideDeck.setAttribute("from", "1");
    slideDeck.setAttribute("to", "3");
    slideDeck.setAttribute("current", "1");
    var question = document.getElementById("Question");
    removeAllChildren(question);
    question.appendChild(slideDeck);
    
    var control = document.createElement("slide-control");
    control.setAttribute("path2html", "./controls.html");
    var answer = document.getElementById("Answer");
    removeAllChildren(answer);
    answer.appendChild(control);

    return answer.parentElement;
};

function makeBindings() {
    /* 
    Make bindings to update 
    the player's status in real-time
    while s/he enters their response 
    in the text-box.
    The status is computed based on
    the answer that is embedded in
    the quiz HTML.
    Bindings are made each time that
    the slide-deck is advanced.
    */   
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
};

function activateControls() {
    /*
    Advance to the next slide 
    on the clicked of a button.
    The button is in the slide-control element.
    The advancement mechanism consists of 
    attributeChangedCallback() of the div tag
    that is the wrapper of the slide-deck element.
    The attribute, current, is changed upon 
    clicking the button via setAttribute() method,
    triggering the attributeChangedCallback(),
    advancing to the slide referenced by current.
    Note that the HTML of every slide-quiz element
    includes the number ID of the next page,
    with the numbering scheme starting from 1. 
    The slide-quiz elements are contained 
    in an array with indexes starting from 0. 
    */ 
    document.getElementById("Next").addEventListener("click", () => {
        document.querySelectorAll("[current]").forEach( (deckElement) => {
            deckElement.setAttribute("current",
                    document.getElementById("Pagination").getAttribute("data-pagedn"));
            setTimeout(() => makeBindings(), 100);
            console.log(deckElement);
        })
    });
};

export function loadSlide(index) {
    update_DOM(index);
    
    /* 
    Allow some time for the creation of new nodes
    and their insertion into DOM. 
    Then, execute data-bindings for reactive elements
    and set the callback for the slide advancement.
    */

    setTimeout( () => { 
        makeBindings(); 
        activateControls();
    }, 100);
};

