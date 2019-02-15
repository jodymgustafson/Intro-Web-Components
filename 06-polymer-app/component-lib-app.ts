import { html, LitElement } from 'lit-element';
import "./component-index";
import "./component-info";
import "./collapsible-panel";
import "./tip-popup";
import "./unordered-list";

export class ComponentLibraryAppElement extends LitElement
{
    firstUpdated(changedProperties)
    {
        super.connectedCallback();
        (this as any).shadowRoot.querySelector("component-index").buildIndex();
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

            <h1>
                Component Library
            </h1>

            <component-index></component-index>

            <component-info componentName="Collapsible Panel" tagName="collapsible-panel">
                <ul slot="attributes">
                    <li>header - Text for the panel header</li>
                    <li>expanded - If defined the panel will be expanded</li>
                </ul>
                <p slot="example-tag">
                    &lt;collapsible-panel header="Collapsible Panel" expanded&gt;&lt;collapsible-panel&gt;
                </p>
                <div slot="example">
                    <collapsible-panel header="Collapsible Panel" expanded>
                        Content
                    </collapsible-panel>
                </div>
            </component-info>

            <component-info componentName="Tip Popup" tagName="tip-popup">
                <ul slot="attributes">
                    <li>text - Popup tip text</li>
                    <li>position - Position of the popup (bottom, top)</li>
                </ul>
                <p slot="example-tag">
                    &lt;tip-popup text="This is the popup text" position="top"&gt;&lt;tip-popup&gt;
                </p>
                <div slot="example">
                    <tip-popup text="This is the popup text" position="top"></tip-popup>
                    Hover to display popup
                </div>
            </component-info>

            <component-info componentName="Unordered List" tagName="unordered-list">
                <ul slot="attributes">
                    <li>items - Comma separated list of items</li>
                </ul>
                <p slot="example-tag">
                    &lt;unordered-list items="Apples, Oranges, Bananas, Pears, Mangos"&gt;&lt;unordered-list&gt;
                </p>
                <div slot="example">
                    <unordered-list items="Apples, Oranges, Bananas, Pears, Mangos"></unordered-list>
                </div>
            </component-info>
        `;
    }
}

customElements.define('component-lib-app', ComponentLibraryAppElement);
