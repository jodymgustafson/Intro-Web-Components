import { html, LitElement } from 'lit-element';
import { ComponentInfoElement } from './component-info';

/** Builds the index from a list of ComponentInfoElements */
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

    /** Updates the links from a list of ComponentInfoElements */
    buildIndex(items: NodeListOf<Element>)
    {
        this.links = []
        items.forEach(el => this.links.push((el as any)));
    }

    render(): HTMLTemplateElement {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
            </style>
            <ul>
                ${this.links.map(item => html`<li><a href="#${item.tagName}" @click="${this.jumpToElement}">${item.componentName}</a></li>`)}    
            </ul>
        `;
    }

    private jumpToElement(ev: MouseEvent): void
    {
        const tagName = ev.srcElement.getAttribute("href").slice(1);
        const el = this.links.find(i => i.tagName === tagName) as any;
        el.scrollIntoView();
    }
}

customElements.define('component-index', ComponentIndexElement);
