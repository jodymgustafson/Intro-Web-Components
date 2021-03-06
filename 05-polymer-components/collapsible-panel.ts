import { html, LitElement } from 'lit-element';

/**
 * A panel with a button to show or hide it
 * @attribute expanded  If defined the panel will be expanded
 * @attribute header  Text for the panel header
 */
export class CollapsiblePanelElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            header: { type: String },
            expanded: { type: Boolean }
        }
    }

    // Declare for TS compiler
    header: string;
    expanded: boolean;

    constructor()
    {
        super();
        this.header = "Unnamed";
        this.expanded = false;
    }

    render()
    {
        return html`
        <style>
            :host {
                display: block;
                font-size: 16px;
                font-family: Roboto, sans-serif;
            }
            header {
                display: inline;
                font-weight: bold;
                cursor: pointer;
            }
            button {
                width: 1.5em;
                height: 1.5em;
                border: none;
                background: transparent;
                padding: 0;
            }
            .content {
                padding: 1em;
                background: var(--background, rgb(240, 245, 240));
            }
        </style>
        
        <div>
            <header @click="${this.toggleState}">
                ${this.header}
                ${this.expanded ? 
                    html`<span title="Hide contents">&#9650;</span>` :
                    html`<span title="Show contents">&#9660;</span>`}
            </header>
        </div>
        <div class="content" ?hidden="${!this.expanded}">
            <slot>Default content</slot>
        </div>
        `;
    }
    
    toggleState(ev: MouseEvent): void
    {
        this.expanded = !this.expanded;
    }
}

customElements.define('collapsible-panel', CollapsiblePanelElement);