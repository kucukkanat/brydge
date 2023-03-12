import { LitElement, html, css } from 'lit';
import { common } from './styles';

class Component extends LitElement {
    static get styles() {
        return css`
        ${common}
        :host {
            display: flex;
            flex-direction: column;
            height: calc(100vh - 104px);
            background: linear-gradient(#9cd7fb 10%, #fff 20%,#fff 75%, #cfe7ff 100%);
            min-height:400px;
        }
        input::placeholder {
            font-style: italic;
        }
        input {
            padding: 5px;
            width: 300px;
            margin: 5px 0px;
            width: 100%;
        }
        .sign-in-form {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .sign-in-form>div {
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid #ddd;
            padding: 10px;
            width: 400px;
        }
        .sign-in-form>div>div {
            width: 100%;
            margin: 5px 0px;
        }
        #login-checkboxes>div {
            display: grid;
            grid-template-columns: [input] 25px [label] auto;
            margin: 5px 0px;
        }
        #login-checkboxes input {
            margin: 0px;
            grid-column: input;
        }
        #login-checkboxes label {
            grid-column: label;
        }
        
        input[type=checkbox] { 
            width:15px;
        }
        button {
            background: linear-gradient(180deg, #fff, #dedede 45%, #c3c3c3 50%, #bdbdbd 100%);
            border: 1px solid #bdbdbd;
            outline: none;
            padding: 5px 10px;
            border-radius: 5px;
        }
        button:active {
            background: linear-gradient(180deg, #bdbdbd, #c3c3c3 45%, #dedede 50%, #fff 100%);
            border: 1px solid #bdbdbd;
            outline: none;
        }
        `;
    }
    render() {
        return html`
        <div style="display:flex;justify-content:center;align-items:center;padding: 20px 0px;">
            <msn-avatar src="img/avatars/chess.png"></msn-avatar>
        </div>
        <div class="text-center">
            <h4>Sign in</h4>
            <p>Sign in with your Windows Live ID. Don't have one? <a href="#">Sign up!</a></p>
        </div>
        <div class="sign-in-form">
            <div>
                <div>
                    <input type="text" placeholder="kucukkanat@hotmail.com" />
                </div>
                <div>
                    <input type="password" placeholder="Enter your password" />
                </div>
                <div>
                    <span>Sign in as :</span> <select>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                        <option value="away">Away</option>
                    </select>
                </div>
                <div id="login-checkboxes">
                    <div><input type="checkbox" id="remember-me" /><label for="remember-me">Remember me</label></div>
                    <div><input type="checkbox" id="remember-password" /><label for="remember-password">Remember my
                            password</label></div>
                    <div>
                        <input type="checkbox" id="auto-signin" /><label for="auto-signin">Sign me in automatically</label>
                    </div>
                    <div>
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
                <div class="text-center">
                    <button @click=${this.login}>Sign in</button>
                </div>
            </div>
        </div>
        `
    }
    login() {
        window.location.replace("./friendlist.html")
    }
}

customElements.define('msn-login-wrapper', Component);