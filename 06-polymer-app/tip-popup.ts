import { html, LitElement, customElement, property, css } from 'lit-element';

/**
 * An element that displays a tip in a popup when the element is hovered
 * @attribute text  Popup tip text
 * @attribute position  Position of the popup (bottom, top)
 */
@customElement('tip-popup')
export class TipPopupElement extends LitElement
{
    @property({type: String}) text = "";
    @property({type: String, attribute: false}) popupClass = "hidden"; // this is only a property

    // Declare position here because we want to implement our own property accessor
    static get properties() { 
        return { 
            position: { type: String }
        }
    }

    // Implement our own property accessor for position with validation
    private _position = "top";
    get position(): string { return this._position; }
    set position(val: string) {
        const oldValue = this._position;
        if (["bottom", "top"].indexOf(val) < 0)
        {
            this._position = "top";
        }
        else
        {
            this._position = val;
        }
        // Since we're implementing it ourselves, we need to tell Polymer the property changed
        this.requestUpdate('position', oldValue);
    }

    static styles = css`
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
    `;
    
    render() {
        return html`
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
