import { LitElement, html, css } from 'lit';

const friends = new Array(100).fill(0);

class MSNFriendList extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        display: block;
        height: calc(100vh - 288px);
        overflow-y: auto;
        border-top: 1px solid #ddd;
        padding: 10px 10px;
        // Disable text select
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }
      ul {
        list-style: none;
        padding-left: 10px;
        margin-top: 5px;
      }
      ul li {
        display: flex;
        align-items: center;
        padding: 5px 0px;
      }
      ul li:active {
        background-color: #f5f5f5;
      }
      img {
        width: 20px;
      }
      .arrow {
        width: 10px;
      }
      .muted {
        opacity: 0.7;
        font-size: 12px;
      } 
      li span {
        display: inline-block;
        margin: 0px 5px;
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<div id="contacts">
        <img class="arrow" src="arrow-down.png" alt="" /> <strong>Online (4)</strong>
        <ul>
            ${
                friends.map((friend, index) => {
                    return html`<li><img src="status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>`
                })
            }
            <li><img src="status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            <li><img src="status/away.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            <li><img src="status/busy.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            
        </ul>
    </div>`;
    }
}
customElements.define('msn-friendlist', MSNFriendList);