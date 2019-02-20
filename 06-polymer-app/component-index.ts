import { html, LitElement, customElement, property, css } from 'lit-element';
import { ComponentInfoElement } from './component-info';

/** Builds the index from a list of ComponentInfoElements */
@customElement('component-index')
export class ComponentIndexElement extends LitElement
{
    @property({type: Array, attribute: false}) links: ComponentInfoElement[] = [];

    /** Updates the links from a list of ComponentInfoElements */
    buildIndex(items: NodeListOf<Element>)
    {
        this.links = []
        items.forEach(el => this.links.push((el as ComponentInfoElement)));
    }

    static styles = css`
        :host { display: block }
        :host([hidden]) { display: none }
    `;
    
    render() {
        return html`
            <ul>
                ${this.links.map(item => html`<li><a href="#${item.tagName}" @click="${this.jumpToElement}">${item.componentName}</a></li>`)}    
            </ul>
        `;
    }

    private jumpToElement(ev: MouseEvent): void
    {
        const tagName = ev.srcElement.getAttribute("href").slice(1);
        const el = this.links.find(i => i.tagName === tagName);
        el.scrollIntoView();
    }
}
