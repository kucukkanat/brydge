import { LitElement, html, css } from 'lit';

class MSNProfileSection extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        display: block;
        padding: 10px 20px;

        width: 500px;
        left: calc(50% - 201px/2 - 0.5px);
        top: calc(50% - 116px/2);

        background: linear-gradient(180deg, #D0E4FB 0%, #CEE3F9 12.5%, #D1E6F9 25%, #D5E9FA 36.46%, #DDECFB 50%, #E3F1FD 63.54%, #E9F6FE 76.56%, #E9F7FF 88.54%, #E4F4FF 100%);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9), inset 1px 1px 0px #FFFFFF, inset -1px -1px 0px rgba(97, 211, 244, 0.8);
        border-radius: 6px;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html``;
    }
}
customElements.define('msn-profile-section', MSNProfileSection);