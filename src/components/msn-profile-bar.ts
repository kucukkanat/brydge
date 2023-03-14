import { LitElement, html, css, unsafeCSS } from "lit";
import { common } from "./styles";
import "./msn-img-button";
import backgroundLarge from "../assets/img/backgrounds/background-large.png";
import navbarppl from "../assets/img/navbar-contacts.png";
import navbarmail from "../assets/img/navbar-mail.png";
import navbarnews from "../assets/img/navbar-news.png";
class MSNProfileBar extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
    ${common}
    :host {
      display: block;
      height: 40px;
      padding-left: 10px;
      padding-top: 5px;
      background-image: url(${unsafeCSS(backgroundLarge)});
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
    this.name = "World";
  }

  // Render the UI as a function of component state
  render() {
    return html`
      <div id="app-bar">
        <msn-img-button icon=${navbarmail} size="35"></msn-img-button>
        <msn-img-button icon=${navbarppl} size="35"></msn-img-button>
        <msn-img-button icon=${navbarnews} size="35"></msn-img-button>
      </div>
    `;
  }
}
customElements.define("msn-profile-bar", MSNProfileBar);
