import { html, LitElement, customElement, property, css } from 'lit-element';

/**
 * An element that creates an unordered list from a comma separated list of values
 * @attribute items  Comma separated list of items
 * @example <unordered-list items="a, b, c, d"/>
 */
@customElement('unordered-list')
export class UnorderedListElement extends LitElement
{
    @property({ converter: (value: string) => value.split(",").map(i => i.trim()) }) items: string[];

    static styles = css`
        :host { display: block }
        :host([hidden]) { display: none }
    `;
    
    render() {
        return html`
            <ul>
                ${this.items.map(item => html`<li>${item}</li>`)}    
            </ul>
        `;
    }
}
