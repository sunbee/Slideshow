## Multi-Page Quiz in SPA

Advance slides and check the answer dynamically. Implementation has the following features:
1. Each slide in the deck is in the **Slides** folder as an HTML page.
2. The **Slide.js** module implements the `loadSlide()` method for loading the quiz.
3. The *Next* button will advance the deck. The click event has the callback `loadSlide()` which accepts the  index of the next slide from the current slide.
 
Note that a slide contains the quiz question and other important information such as the expected answer and the index of the slide to advance to when the *Next* button is clicked. The information is stashed as meta-data with HTML elements.