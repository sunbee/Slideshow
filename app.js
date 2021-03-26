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

	var number_first = new Observable(3);
	var number_second = new Observable(4);
	var summa = new Computed(() => Number(number_first.value) + Number(number_second.value),
						[number_first, number_second]);
	var name_first = new Observable("Lal");
	var name_last = new Observable("Bahadur");
	var name_full = new Computed(() => `${name_first.value} ${name_last.value}`, [name_first, name_last]);
	var score = new Computed(() => { 
		if (name_last.value == 'Shastri') {
			return "Bravo! You win!"
		} else {
			return "Keep trying!"
		}}, [name_last]);

	var context = {
		number_one: number_first,
		number_two: number_second,
		summa: summa,
		given_name: name_first,
		surname: name_last,
		fullname: name_full,
		score: score 
	};

	var dataBindings = document.querySelectorAll("[data-binding]");
	dataBindings.forEach(inputElement => {
		console.log(inputElement);

		bind2DOM(inputElement, context[inputElement.getAttribute("data-binding")])
	});

});
