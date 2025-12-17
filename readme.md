###  Answer the following questions clearly:

1. What is the difference between **getElementById, getElementsByClassName, and querySelector / querySelectorAll**?
Ans:
     1.The document.getElementById() method is a fundamental part of the JavaScript Document Object Model (DOM) used to directly access and manipulate a specific HTML element by its unique id attribute. 
     2.The getElementsByClassName method of Document interface returns an array-like object of all child elements which have all of the given class name(s).
     3. querySelector(): Returns only the first matching element (or null).
     4. **querySelectorAll()** method returns a static NodeList containing all elements within the document or a specific element that match a specified group of CSS selectors. It is a versatile tool for selecting elements based on their tag names, classes, IDs, attributes, and more, using standard CSS syntax. 
     querySelectorAll(): Returns a static NodeList containing all matching elements (or an empty NodeList if none are found). You can iterate over the returned NodeList using forEach() or a for...of loop. 


2. How do you **create and insert a new element into the DOM**?
Ans: Use the document.createElement() method to create a new HTML element. 


3. What is **Event Bubbling** and how does it work?
Ans:Event Bubbling is javaScript mechanism that work like a child element first triggers its own handler, then "bubbles up" the DOM tree, triggering handlers on its parent, grandparent, and all ancestor elements until it reaches the document root


4. What is **Event Delegation** in JavaScript? Why is it useful?
Ans: Event Delegation is a pattern based upon the concept of Event Bubbling. It is an event-handling pattern that allows you to handle events at a higher level in the DOM tree other than the level where the event was first received.
  * it useful because when JavaScript events let you create interactive web pages by responding to user actions like user clicks, keypresses, and scrolling. They help you build dynamic experiences, from handling form submissions to triggering animations.

5. What is the difference between **preventDefault() and stopPropagation()** methods?
Ans: preventDefault() is used to prevent the default action that belongs to the event, such as preventing a form from submitting.
    *stopPropagation() is used to stop the event from bubbling up to parent elements, preventing any parent event handlers from being executed.
