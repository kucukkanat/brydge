import { LitElement, html, css } from 'lit';
import { common } from './styles';

const friends = new Array(20).fill(0);

class MSNFriendList extends LitElement {
    static properties = {
        name: {},
    };
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
    ${common}
    
      #contacts {
        display: block;
        height: calc(100vh - 288px);
        overflow-y: auto;
        border-top: 1px solid #ddd;
        padding: 0 10px;
        // Disable text select
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
      }
      .sticky {
        width: 100%;
        z-index: 2;
        padding: 5px 0px;
        border-bottom: 1px solid #ddd;
      }
    `;

    constructor() {
        super();
        // Declare reactive properties
        this.name = 'World';
    }

    // Render the UI as a function of component state
    render() {
        return html`<div id="contacts">
          <div style="background: #fff" class="sticky">
            <img class="arrow" src="img/arrow-down.png" alt="" /> <strong>Online (4)</strong>
          </div>
          <ul>
              ${
                  friends.map((friend, index) => {
                      return html`<li><img src="img/status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>`
                  })
              }
              <li><img src="img/status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
              <li><img src="img/status/away.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
              <li><img src="img/status/busy.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
              
          </ul>
          <div style="background: #fff" class="sticky">
            <img class="arrow" src="img/arrow-down.png" alt="" /> <strong>Offline (4)</strong>
          </div>
          <ul>
            <li><img src="img/status/busy.png" alt="" /> <span class="nickname">My crush </span> - <span class="status muted">Aşkın öyle çok büyük ki Kimseye boyun eğmez Bilmez kıymet bilmez.</span></li>
            ${
                  friends.map((friend, index) => {
                      return html`<li><img src="img/status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>`
                  })
              }
          </ul>
    </div>`;
    }
}
customElements.define('msn-friendlist', MSNFriendList);