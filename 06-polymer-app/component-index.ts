import { html, LitElement } from 'lit-element';
import { ComponentInfoElement } from './component-info';

export class ComponentIndexElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            links: { type: Array, attribute: false }
        }
    }

    private links: ComponentInfoElement[];

    constructor()
    {
        super();
        this.links = []
    }

    buildIndex()
    {
        this.links = []
        const items = document.querySelectorAll("component-info");
        items.forEach(el => this.links.push((el as any)));
    }

    render(): HTMLTemplateElement {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
                component-info {
                    margin: 0 0 1em 1em;
                }
            </style>
            <ul>
                ${this.links.map(item => html`<li><a href="#${item.tagName}">${item.componentName}</a></li>`)}    
            </ul>
        `;
    }
}

customElements.define('component-index', ComponentIndexElement);
