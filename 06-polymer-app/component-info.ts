import { html, LitElement, customElement, property, css } from 'lit-element';
import "./collapsible-panel";

/**
 * Displays info about a custom element
 * @attribute componentName Name of the component
 * @attribute tagName Element tag name
 * @slot attributes Holds a list of attributes for the component
 * @slot example-tag Holds an example usage of the element
 * @slot example Holds an example of the element in action
 */
@customElement('component-info')

export class ComponentInfoElement extends LitElement
{
    @property({type: String}) componentName = "";
    @property({type: String}) tagName = "";

    static styles = css`
        :host { display: block }
        :host([hidden]) { display: none }
    `;

    render() {
        return html`
            <collapsible-panel header="${this.componentName}">
                <h2>&lt;${this.tagName}&gt;</h2>
                <h3>Attributes</h3>
                <slot name="attributes">No attributes</slot>
                <h3>Example</h3>
                <slot name="example-tag">No example</slot>
                <div>
                    <slot name="example"></slot>
                </div>
            </collapsible-panel>
        `;
    }
}
