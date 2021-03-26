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

	const number_first = new Observable(3);
	const number_one = document.getElementById("number_one");
	bind2DOM(number_one, number_first);

	const number_second = new Observable(4);
	const number_two = document.getElementById("number_two");
	bind2DOM(number_two, number_second)

	const result_summa = new Computed(() => Number(number_first.value) + Number(number_second.value),
						[number_first, number_second]);
	const result_out = document.getElementById("summa");
	bind2DOM(summa, result_summa);

	const name = new Observable("Lal");
	const name_first = document.getElementById("name_first");
	bind2DOM(name_first, name);

	const surname = new Observable("Bahadur");
	const name_second = document.getElementById("name_second");
	bind2DOM(name_second, surname);

	const full_name = new Computed(() => `${name.value} ${surname.value}`, [name, surname]);
	const answer = document.getElementById("name_full");
	bind2DOM(answer, full_name);

	const outcome = new Computed(() => { 
		if (surname.value == 'Shastri') {
			return "Bravo! You win!"
		} else {
			return "Keep trying!"
		}}, [surname]);
	const score = document.getElementById("score");
	bind2DOM(score, outcome);
});
