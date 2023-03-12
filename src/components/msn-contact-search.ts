import { LitElement, html, css } from 'lit';
import { common } from './styles';

class MSNContactSearch extends LitElement {
  static properties = {
    name: {},
  };
  // Define scoped styles right with your component, in plain CSS
  static styles = css`
      ${common}
      :host {
        display: grid;
        grid-template-columns: [input] auto [buttons] 80px;
        
      }
      #input-wrapper {
        display: block;
        grid-column: input;
        margin-top: 2px;
      }
      #input-wrapper input {
        box-sizing: border-box;
        width: 100%;
        display: block;
        padding: 5px;
        border: 1px solid #ddd;
      }
      input:focus{
        outline: none;
        box-shadow: 0px 0px 10px #a4ddff;
      }
      #input-wrapper, #buttons {
        padding: 5px;
      }
      
      #buttons {
        grid-column: buttons;
        padding: 7px 5px;
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
        <div id="input-wrapper">
          <input type="text" placeholder="Find a contact" />
        </div>
        <div id="buttons">
          <msn-img-button style="justify-content:flex-end" icon="invite"></msn-img-button>
          <msn-img-button style="justify-content:flex-end" icon="sort-contacts"></msn-img-button>
        </div>`;
  }
}
customElements.define('msn-contact-search', MSNContactSearch);