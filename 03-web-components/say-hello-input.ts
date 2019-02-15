/**
 * An element that allows user to input whom to say hello to
 * @event to-change Fired when the value of "to" changes
 * @example <say-hello-input to="World"/>
 */
export class SayHelloInputElement extends HTMLElement
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

    constructor()
    {
        super();

        // Create a shadow root
        let shadow = this.attachShadow({mode: 'open'});
        // Clone template and add to shadow DOM
        shadow.appendChild(tmpl.content.cloneNode(true));
    }

    connectedCallback()
    {
        // Get the input element from the shadow DOM
        let input = this.shadowRoot.querySelector("input");
        // Set the value from the value passed in
        input.value = this.to;
        // Listen for keyup events
        input.addEventListener("keyup", ev => this.keyPressed(ev));
        input.focus();
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
            this.shadowRoot.querySelector("input").value = this.to;
        }
    }

    keyPressed(ev: KeyboardEvent)
    {
        // Update the "to" property every time a key is pressed
        this.to = (ev.target as HTMLInputElement).value;
        
        // And dispatch a custom event to notify the parent
        this.dispatchEvent(new CustomEvent("to-change", { 
            detail: { to: this.to },
            composed: true  // when true the event will propagate across the shadow DOM boundary
        }));
    }
}

const tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>
        :host {
            display: block;
            font-style: italic;
            font-size: 1.2em;
        }
        :host([hidden]) { display: none }
    </style>
    <label>Say hello to <input type="text"></label>
`;

customElements.define('say-hello-input', SayHelloInputElement);