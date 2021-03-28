## Multi-Quiz App with Custom HTML Nodes

Advance slides and check the answer dynamically. Implementation has the following features:
1. Each slide in the deck is in the **Slides** folder as an HTML page.
2. The **Slide.js** and **Controls.js** module implement custom HTML so the slide and the accompanying controls can be added using custom HTML tags `slide-quiz` and `slide-control`.
3. The `loadSlide()` method has been refactored to update the DOM by inserting HTML nodes with the custom  tags via the `appendChild()` method, with a `setTimeout()` to delay the subsequent data-bindings for responsive UX giving enough time for the creation and insertion of nodes.
 
Note that the controls can be expanded to support other types of quiz questions like multiple-choice.