import "./say-hello.js";
import "./say-hello-input.js";
import { SayHelloElement } from "./say-hello";
import { SayHelloInputElement } from "./say-hello-input.js";

/**
  * An element that manages interaction between say-hello and say-hello-input elements
 * @example <say-hello-wrapper to="World"/>
*/
export class SayHelloWrapperElement extends HTMLElement
{
    public to: string;

    private sayHello: SayHelloElement;

    constructor()
    {
        super();

        this.to = this.getAttribute("to");

        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        // Clone template and add to shadow DOM
        shadow.appendChild(tmpl.content.cloneNode(true));
    }

    connectedCallback()
    {
        // Get the say-hello element from the shadow DOM
        this.sayHello = this.shadowRoot.querySelector("say-hello");
        this.sayHello.to = this.to;

        // Listen for keyup events
        const sayHelloInput: SayHelloInputElement = this.shadowRoot.querySelector("say-hello-input");
        sayHelloInput.to = this.to;
        sayHelloInput.addEventListener("to-change", ev => this.handleToChanged(ev as CustomEvent));
    }

    private handleToChanged(ev: CustomEvent)
    {
        // Update the to property every time "to" changes
        this.to = ev.detail.to;
        // Update to property on say-hello element too
        this.sayHello.to = this.to;
    }
}

const tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>
        :host { display: block; }
        :host([hidden]) { display: none }
    </style>
    <h1>
        <say-hello></say-hello>
    </h1>
    <say-hello-input></say-hello-input>
`;

customElements.define('say-hello-wrapper', SayHelloWrapperElement);