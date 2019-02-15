
/**
 * A panel with a button to show or hide its content
 * @attribute expanded  If defined the panel will be expanded
 * @attribute header  Text for the panel header
 */
export class CollapsiblePanelElement extends HTMLElement
{
    // Properties
    expanded = false;
    header = "";

    constructor()
    {
        super();

        this.header = this.getAttribute("header");
        this.expanded = this.hasAttribute("expanded");

        // Create a shadow root
        var shadow = this.attachShadow({mode: 'open'});
        // Clone template and add to shadow DOM
        shadow.appendChild(tmpl.content.cloneNode(true));
    }
    
    connectedCallback()
    {
        const headerEl = this.shadowRoot.querySelector("header") as HTMLElement;
        headerEl.addEventListener("click", ev => this.toggleState(ev));
        (headerEl.querySelector("#header-text") as HTMLElement).innerText = this.header

        this.updateVisibility();
    }

    toggleState(ev: MouseEvent): void
    {
        this.expanded = !this.expanded;
        this.updateVisibility();
    }

    /**
     * Changes the visibility of the content
     */
    updateVisibility(): void
    {
        // Look, we can query by id and not worry about about getting elements outside of this one!
        const collapse = this.shadowRoot.getElementById("collapse");
        const expand = this.shadowRoot.getElementById("expand");
        const content = this.shadowRoot.querySelector(".content") as HTMLElement;

        if (this.expanded)
        {
            collapse.removeAttribute("hidden");
            expand.setAttribute("hidden", "hidden");
            content.removeAttribute("hidden");
        }
        else
        {
            expand.removeAttribute("hidden");
            collapse.setAttribute("hidden", "hidden");
            content.setAttribute("hidden", "hidden");
        }
    }
}


const tmpl = document.createElement('template');
tmpl.innerHTML = `
    <style>
        :host {
            display: block;
            font-size: 16px;
            font-family: Roboto, sans-serif;
        }
        :host([hidden]) { display: none }
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
        <header>
            <span id="header-text"></span>
            <span id="collapse" title="Hide contents">&#9650;</span>
            <span id="expand" title="Show contents">&#9660;</span>
        </header>
    </div>
    <div class="content">
        <slot>
            Default content
        </slot>
    </div>
`;

customElements.define('collapsible-panel', CollapsiblePanelElement);