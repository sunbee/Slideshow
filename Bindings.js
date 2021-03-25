
export class Observable {
	constructor(value) {
		this._value = value;
		this._listeners = [];   
	}

	subscribe(listener) {
		this._listeners.push(listener)
	}

	notify() {
		this._listeners.forEach(listener => listener(this._value));
	}

	get value() {
		return this._value;
	}

	set value(val) {
		if (this._value != val) {
		  this._value = val;
		  this.notify();
		}
	}
} 

	let protagonist = new Observable("Joker!");
	protagonist.subscribe((val) => console.log(`Protagonist changed to ${val}`));
	protagonist.value = "Zhankar";
	console.log(protagonist.value);

export class Computed extends Observable {
	constructor (computer, dependents) {
		super(computer());	// Initialize computed value 
							// by call to constructor of Observable class
		const listener = (_) => {
			/*
			Helper function, corrals all dependents 
			(which are Observable instances,) and 
			recomputes the computed value, then
			notifies any listeners.
			Note that 'listeners' property is inherited
			from parent Observable class, hence the chaining effect.
			*/
			console.log('Listener in Computed got ' + _);
			this._value = computer();
			this.notify();  // Notify listeners of 'this' instance 
						  // of Computed class

		}
		dependents.forEach(dependent => dependent.subscribe(listener));    
	}

	get value() {
		return this._value;
	}

	set value(_) {
		/*
		Raise an exception, the value is computed from dependents, 
		not set.
		*/
		throw "Set no computed property.";
	}

}

	first_name = new Observable("Dalai");
	second_name = new Observable("Lama");

	full_name = new Computed(() => `HH ${first_name.value} ${second_name.value}`, [first_name, second_name]);
	full_name.subscribe((val) => console.log(`The HH changed to ${val}`)); // Chaining

	first_name.value = "Panchen";
	first_name.value = "Vishnu";
	first_name.value = "Vishnu";

export const bind2DOM = (input, observed) => {
		/*
		Bind a DOM element of type input to data,
		with data wrapped in an instance of Observable class,
		so that any change to data updates the DOM and
		any change to the DOM updates the data (i.e. Observable instance).
		*/
		input.value = observed.value;
		observed.subscribe(() => input.value = observed.value);
		input.onkeyup = () => {observed.value = input.value; console.log(observed.value);}
	}

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
