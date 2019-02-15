import { html, LitElement, TemplateResult } from 'lit-element';

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

    render(): TemplateResult
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
                background: rgba(230, 235, 230, .5);
            }
        </style>
        
        <div>
            <header>${this.header}</header>
            <button title="Toggle contents" @click="${this.toggleState}">
                ${this.expanded ? 
                    html`<span>&#9650;</span>` :
                    html`<span>&#9660;</span>`}
            </button>
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