import { html, LitElement } from 'lit-element';

/**
 * An element that says hello
 * @example <say-hello to="World"/>
 */
export class SayHelloElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            to: { type: String }
        }
    }

    // Declare for TS compiler
    to: string;

    constructor()
    {
        super();
    }

    // Listen for attribute changes
    attributeChangedCallback(name, oldVal, newVal)
    {
        console.log(`"${name}" changed from ${oldVal} to ${newVal}`);
        super.attributeChangedCallback(name, oldVal, newVal);
    }

    render() {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
                span {
                    color: green;
                }
            </style>
            <div>Hello, <span>${this.to}!</span></div>
        `;
    }
}

customElements.define('say-hello', SayHelloElement);