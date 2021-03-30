import { Slide } from './Slide.js';

async function initialize_deck(from, to) {
    var deck = [];
    for (var idx = from; idx <= to; idx++) {
        var quiz_name = './Slides/Quiz00' + idx + '.html';
        var slide = document.createElement("slide-quiz");
        slide.setAttribute("path2html", quiz_name);
        deck.push(slide);
    };
    return deck;
};

export class SlideDeck extends HTMLElement {
    constructor() {
        super();

        this._deck = [];
    };

    async connectedCallback() {
        var iam = document.createElement("div");

        var from = Number(this.getAttribute("from"));
        var to = Number(this.getAttribute("to"));
        await initialize_deck(from, to)
            .then( (deck) => {
                this._deck = deck;
                iam.appendChild(this._deck[0]);
                console.log(iam);
                this.appendChild(iam);
            }

        );
    };

    get deck() {
        return this._deck;
    }
};

customElements.define('slide-deck', SlideDeck);