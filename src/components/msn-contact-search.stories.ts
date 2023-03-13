import {html} from "lit"

import "./msn-contact-search"

export default {
    title: 'msn-contact-search',
    parameters: {
        shortcuts: false
    }
}


export const Primary = (args) => html`
        <msn-contact-search></msn-contact-search>
        <strong>Keyword</strong>: <span id="kw"></span>
    `

setTimeout(() => {
    const s = document.querySelector('msn-contact-search')
    s.addEventListener("change", v => {
        document.getElementById("kw").innerHTML=s.keyword
    })
    
}, 0);