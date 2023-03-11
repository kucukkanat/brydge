import { LitElement, html, css } from 'lit';

class MSNProfileBar extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        display: block;
        height: 40px;
        padding-left: 10px;
        padding-top: 5px;
        background-image: url("backgrounds/background-large.png");
        background-size: 100% 100%;

        // Disable text select
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`
        <div id="app-bar">
        <msn-img-button icon="navbar-mail"></msn-img-button>
        <msn-img-button icon="navbar-contacts"></msn-img-button>
        <msn-img-button icon="navbar-news"></msn-img-button>
        
      </div>
        `;
    }
}
customElements.define('msn-profile-bar', MSNProfileBar);