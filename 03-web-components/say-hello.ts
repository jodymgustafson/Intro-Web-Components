/**
 * An element that says hello, and can be updated
 * @example <say-hello to="World"/>
 */
export class SayHelloElement extends HTMLElement
{
    // We will reflect the "to" attribute to the "to" property so they stay in sync
    /** Gets the "to" property's value */
    get to(): string {
        return this.getAttribute("to");
    }
    /** Sets the "to" property's value */
    set to(value: string) {
        this.setAttribute("to", value);
    }

    // List the attributes we want to observe in attributeChangedCallback
    static get observedAttributes(): string[] {
        return ['to'];
    }

    // Listen for attribute changes
    attributeChangedCallback(name: string, oldValue: string, newValue: string)
    {
        console.log(`${name} changed from ${oldValue} to ${newValue}`);
        if (name === "to")
        {
            this.shadowRoot.querySelector("span").innerText = this.to + "!";
        }
    }

    constructor()
    {
        // Always call super() first
        super();

        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        // Clone template and add to shadow DOM
        shadow.appendChild(tmpl.content.cloneNode(true));
    }
}

const tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>
        :host { display: block }
        :host([hidden]) { display: none }
        span { color: green; }
    </style>
    <div>Hello, <span></span></div>
`;


customElements.define('say-hello', SayHelloElement);