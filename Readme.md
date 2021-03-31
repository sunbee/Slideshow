## Multi-Page Quiz in SPA with Custom HTML Nodes

Advance slides and check the answer dynamically. Implementation has the following features:
1. Each quiz question is a slide in the deck with an HTML page in the **Slides** folder. Add any number of slides in this folder, provided they are follow the naming convention and the standard template.
2. The standard template for a quiz question's HTML page includes information such as the next slide's number ID and the correct answer. These are specified as attributes of named div elements.
3. Bindings provide real-time feedback upon the player's answer. Bindings are made each time that a quiz question is rendered. 
2. There are three custom HTML elements: `'slide-deck`, `slide-quiz` and `slide-control`. 
3. The `slide-deck` element holds an array of `slide-deck` elements and displays one slide at any time based on the value of the 'current' attribute.
3. Advancement to the next slide is based on changing the attribute *current* of the `slide-deck`'s div wrapper via the `setAttribute()` method. Implementation uses the `attributeChangedCallback()`.

Note that the controls can be expanded to support other types of quiz questions like multiple-choice.