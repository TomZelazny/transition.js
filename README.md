# transition.js
javascript animations using css transitions

A wrapper around css transition.
allows for a "done" callback.
meant for very simple animations.

example use:
```
let el = document.getElementById("element-to-animate");
Animate(el)
    .animate("left", "500px", "ease", "1s", () => console.log("done with first animation"))
    .animate("top", "500px", "linear", "1s", () => console.log("done with second animation"))
    .animate("top", "0px", "ease-in", "1s", () => console.log("done with third animation"))
    .animate("transform", "rotate(360deg)", "linear", "1s", () => console.log("done with fourth animation"))
    .animate("left", "0px", "ease-out", "1s", (el) => el.parentNode.removeChild(el) );
```
