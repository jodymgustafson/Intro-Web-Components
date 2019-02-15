import { html, LitElement } from 'lit-element';
import "./collapsible-panel";

/**
 * Displays info about a custom element
 * @attribute componentName Name of the component
 * @attribute tagName Element tag name
 * @slot attributes Holds a list of attributes for the component
 * @slot example-tag Holds an example usage of the element
 * @slot example Holds an example of the element in action
 */
export class ComponentInfoElement extends LitElement
{
    static get properties() { 
        return { 
            componentName: { type: String },
            tagName: { type: String },
        }
    }

    componentName: string;
    tagName: string;

    render(): HTMLTemplateElement {
        return html`
            <style>
                :host { display: block }
                :host([hidden]) { display: none }
            </style>
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

customElements.define('component-info', ComponentInfoElement);
