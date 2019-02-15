import { html, LitElement } from 'lit-element';

/**
 * An element that displays a tip in a popup when the element is hovered
 * @attribute text  Popup tip text
 * @attribute position  Position of the popup (bottom, top)
 */
export class TipPopupElement extends LitElement
{
    // Declare the properties
    static get properties() { 
        return { 
            text: { type: String },
            position: { type: String },
            popupClass: {type: String, attribute: false } // this one is only a property
        }
    }

    // Implement our own property accessor with validation
    private _position: string;
    get position(): string { return this._position; }
    set position(val: string) {
        this._position = val;
        if (["bottom", "top"].indexOf(val) < 0)
        {
            this._position = "top";
        }
        (this as any).requestUpdate('position', this._position);
    }

    // Declare for TS compiler
    text: string;
    private popupClass: string;

    constructor()
    {
        super();
        this.text = "";
        this.popupClass = "hidden";
        this.position = "top";
    }

    render() {
        return html`
        <style>
            :host { display: inline }
            :host([hidden]) { display: none }
            div {
                position: relative;
                display: inline-block;
                border-radius: 50%;
                width: 1em;
                height: 1em;
                background-color: blue;
                color: white;
                font-weight: bold;
                text-align: center;
            }
            #popup {
                position: absolute;
                display: block;
                left: 0;
                padding: .5em;
                background-color: #eee;
                color: black;
                font-weight: normal;
                text-align: center;
                min-width: 10em;
                font-size: 14px;
                border-radius: 8px;
            }
            #popup.top {
                bottom: 1.5em;
            }
            #popup.bottom {
                top: 2em;
            }
            #popup.hidden {
                display: none;
            }
        </style>
        <div @mouseover="${this.showPopup}" @mouseout="${this.hidePopup}">?<span id="popup" class="${this.popupClass}">${this.text}</span></div>
        `;
    }

    showPopup()
    {
        this.popupClass = this.position;
    }

    hidePopup()
    {
        this.popupClass = "hidden";
    }
}

customElements.define('tip-popup', TipPopupElement);