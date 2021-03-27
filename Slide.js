import { Observable, Computed, bind2DOM } from './Bindings.js';
export var loadSlide = (index) => {
	/* 
	Get the container for the slide,
	and populate contents with ref. to index. 
	First add the quiz (e.g. Quiz001.html) and then
	add the slideshow controls (controls.html). 
	*/
	var answer;

	var quiz_name = './Slides/Quiz00' + index + '.html';
	fetch('controls.html')
		.then(data => data.text())
		.then( (html) => document.getElementById("Answer").innerHTML = html );
	fetch(quiz_name)
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

            var pagedn = document.getElementById("Pagination").getAttribute("data-pagedn");
            console.log(pagedn);
            document.getElementById("Next").addEventListener("click", () => {loadSlide(Number(pagedn))});
	})
	.then( () => [].slice.call(document.querySelectorAll("[data-binding]"))
	.forEach( div_element => console.log(div_element.id) ));
};