import {html,LitElement} from "lit"

class Component extends LitElement {
    toggled:boolean
    constructor() {
        super()
    }
    static get properties(){
        return {
            toggled:{type:Boolean}
        }
    }
    firstUpdated(): void {
        this.shadowRoot.querySelector("slot[name='handle']").addEventListener("click",()=>{
            this.toggled = !this.toggled
        })

    }
    render (){ 
        return html`
        <slot name="handle"></slot>
        <div style="display:${this.toggled?"block":"none"}">
        <slot name="content"></slot>
        </div>
        `
    }
}

customElements.define("msn-drawer",Component)