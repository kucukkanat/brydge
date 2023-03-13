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
        grid-template-columns: [input] auto [buttons] 90px;
        
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
  keyword: string
  constructor() {
    super();
    // Declare reactive properties
    this.keyword = '';
  }
  firstUpdated(): void {
    
    const input = this.shadowRoot.getElementById("search-input");
    
    (input as HTMLInputElement).addEventListener("change", (event:HashChangeEvent) => {
      const changeEvent = new CustomEvent('change', {detail:(event.target as HTMLInputElement).value, bubbles: true, composed: true, cancelable: true})
      this.keyword = (event.target as HTMLInputElement).value
      this.dispatchEvent(changeEvent)
    })
  }
  // Render the UI as a function of component state
  render() {
    return html`
        <div id="input-wrapper">
          <input type="text" id="search-input" placeholder="Find a contact" />
        </div>
        <div id="buttons">
          <msn-img-button style="justify-content:flex-end" size=35 icon="img/invite.png"></msn-img-button>
          <msn-img-button style="justify-content:flex-end" size=35 icon="img/sort-contacts.png"></msn-img-button>
        </div>`;
  }
}
customElements.define('msn-contact-search', MSNContactSearch);