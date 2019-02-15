import { html, LitElement } from 'lit-element';

/**
 * An element that creates an unordered list from a comma separated list of values
 * @attribute items  Comma separated list of items
 * @example <unordered-list items="a, b, c, d"/>
 */
export class UnorderedListElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return {
            // Use a converter to convert the csv string to an array of strings
            items: { converter: (value: string) => value.split(",").map(i => i.trim()) }
        }
    }

    // Declare for TS compiler
    items: string[];

    constructor()
    {
        super();
    }

    render(): HTMLTemplateElement {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
            </style>
            <ul>
                ${this.items.map(item => html`<li>${item}</li>`)}    
            </ul>
        `;
    }
}

customElements.define('unordered-list', UnorderedListElement);