import "./say-hello";
import "./say-hello-input";
import { html, LitElement } from 'lit-element';

/**
 * An element that manages interaction between say-hello and say-hello-input elements
 * @example <say-hello-wrapper to="World"/>
 */
export class SayHelloWrapperElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            to: { type: String }
        }
    }

    to: string;

    render() {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
            </style>
            <h1>
                <say-hello to="${this.to}"></say-hello>
            </h1>
            <say-hello-input to="${this.to}" @to-change="${this.handleToChanged}"></say-hello-input>
        `;
    }

    handleToChanged(ev: CustomEvent)
    {
        // Update our "to" property using the value say-hello-input sent in the event
        this.to = ev.detail.to;
    }

}

customElements.define('say-hello-wrapper', SayHelloWrapperElement);