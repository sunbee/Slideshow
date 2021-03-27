import { Observable, Computed, bind2DOM } from './Bindings.js';

/*
Wrap the data in an instance of Observable class.
Get a reference to the DOM element by ID.
Enable two-way binding. Now update the text box 
and the change to the data is logged to console.
Or update the data via setter for the Observable instance
and see the input field updated.
Use a timeout function to see step-step changes.
*/
document.addEventListener('DOMContentLoaded', () => {

	var index = 1;

	/* 
	Get the container for the slide,
	and populate contents with ref. to index. 
	First add the quiz (e.g. Quiz001.html) and then
	add the slideshow controls (controls.html). 
	*/
	var answer;

	fetch('controls.html')
		.then(data => data.text())
		.then( (html) => document.getElementById("Answer").innerHTML = html );
	fetch('./Slides/Quiz001.html')
		.then( (data) => data.text() )
		.then( (html) => document.getElementById("Question").innerHTML = html )
		.then( () => {
			answer = document.getElementById("Expected").getAttribute("data-answer");

			var data_entry = new Observable('ans');
			var success = new Computed( () => {
				console.log(data_entry.value);
				return (data_entry.value == answer) ? "Good!" : "Try!";
			}, [data_entry]);

			var context = {
				response: data_entry,
				passfail: success
			};

			document.querySelectorAll("[data-binding]").forEach( (inputElement) => {
				console.log(inputElement);
				bind2DOM(inputElement, context[inputElement.getAttribute("data-binding")]);

			});
		})
		.then( () => [].slice.call(document.querySelectorAll("[data-binding]"))
		.forEach( div_element => console.log(div_element.id) ));
});
