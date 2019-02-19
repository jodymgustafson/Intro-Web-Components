import "./say-hello";
import { html, LitElement } from 'lit-element';

/**
 * An element that allows user to input whom to say hello to
 * @event to-change Fired when the value of "to" changes
 * @example <say-hello-input to="World"/>
 */
export class SayHelloInputElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            to: { type: String }
        }
    }

    to: string;

    firstUpdated(changedProperties)
    {
        // Perform one-time work after the element’s template has been created
        let input = this.renderRoot.querySelector("input");
        input.focus();
    }

    render() {
        return html`
            <style>
                :host {
                    display: block;
                    font-style: italic;
                    font-size: 1.2em;
                }
                :host([hidden]) { display: none }
            </style>
            <label>Say hello to <input type="text" @keyup="${this.keyPressed}" .value="${this.to}"></label>
        `;
    }

    private keyPressed(ev: KeyboardEvent)
    {
        // Update the to property every time a key is pressed
        this.to = (ev.target as HTMLInputElement).value;
        this.dispatchEvent(new CustomEvent("to-change", { 
            detail: { to : this.to },
            composed: true
        }));
    }
}

customElements.define('say-hello-input', SayHelloInputElement);