/**
 * An element that says hello
 * @example <say-hello to="World"/>
 */
export class SayHelloElement extends HTMLElement
{
    constructor()
    {
        // Always call super() first
        super();

        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        
        // Create the DOM structure programatically
        // <style>span { color: green; }</style>
        // <div>Hello, <span></span></div>

        // Add style element to shadow
        let style = document.createElement("style");
        style.innerText = "span { color: green; }";
        shadow.appendChild(style);

        // Add the HTML elements to shadow
        let div = document.createElement("div");
        div.innerText = "Hello, ";

        let span = document.createElement("span");
        // Get the "to" attribute and put it into the span
        span.innerText = this.getAttribute("to");
        div.appendChild(span);

        shadow.appendChild(div);
    }
}

customElements.define('say-hello', SayHelloElement);