async function load_slide(path2html) {
	const response =  await fetch(path2html);
	const slide = await response.text();
	return slide;
  };
  
  export class Control extends HTMLElement {
	  constructor() {
	  super();
	};

	async connectedCallback() {
	  this.innerHTML = await load_slide(this.getAttribute("path2html"));
	};
  };

  customElements.define('slide-control', Control);