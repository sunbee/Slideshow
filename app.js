import { Observable, bind2DOM } from './Bindings.js';

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

	const input_data = new Observable("Oh-tah!");
	const input_element = document.getElementById("bound_input");
	bind2DOM(input_element, input_data);
	input_data.value = "Clap!";
	setTimeout(() => {input_data.value = "Humbug!";}, 3000);
});
