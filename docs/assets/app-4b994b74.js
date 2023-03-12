(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}})();var ze=void 0,He=function(){function i(e){e===void 0&&(e={}),this.listeners=e,this.listeners=e}return i.prototype.on=function(e,t){this.listeners[e]=this.listeners[e]||[],this.listeners[e].push(t)},i.prototype.once=function(e,t){var s=this;this.on(e,function n(){for(var r=[],o=0;o<arguments.length;o++)r[o]=arguments[o];s.off(e,n),t.apply(s,r)})},i.prototype.off=function(e,t){this.listeners[e]&&(t?this.listeners[e].splice(this.listeners[e].indexOf(t)>>>0,1):delete this.listeners[e])},i.prototype.emit=function(e,t){(this.listeners[e]||[]).slice().map(function(s){s(t)}),(this.listeners["*"]||[]).slice().map(function(s){s(e,t)})},i}();ze=He;typeof window<"u"&&(window.__Emitter__={Emitter:He});const w=Object.create(null);w.open="0";w.close="1";w.ping="2";w.pong="3";w.message="4";w.upgrade="5";w.noop="6";const j=Object.create(null);Object.keys(w).forEach(i=>{j[w[i]]=i});const ut={type:"error",data:"parser error"},pt=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",ft=typeof ArrayBuffer=="function",mt=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i&&i.buffer instanceof ArrayBuffer,Ie=({type:i,data:e},t,s)=>pt&&e instanceof Blob?t?s(e):we(e,s):ft&&(e instanceof ArrayBuffer||mt(e))?t?s(e):we(new Blob([e]),s):s(w[i]+(e||"")),we=(i,e)=>{const t=new FileReader;return t.onload=function(){const s=t.result.split(",")[1];e("b"+(s||""))},t.readAsDataURL(i)},_e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",M=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let i=0;i<_e.length;i++)M[_e.charCodeAt(i)]=i;const gt=i=>{let e=i.length*.75,t=i.length,s,n=0,r,o,c,a;i[i.length-1]==="="&&(e--,i[i.length-2]==="="&&e--);const h=new ArrayBuffer(e),f=new Uint8Array(h);for(s=0;s<t;s+=4)r=M[i.charCodeAt(s)],o=M[i.charCodeAt(s+1)],c=M[i.charCodeAt(s+2)],a=M[i.charCodeAt(s+3)],f[n++]=r<<2|o>>4,f[n++]=(o&15)<<4|c>>2,f[n++]=(c&3)<<6|a&63;return h},yt=typeof ArrayBuffer=="function",Ve=(i,e)=>{if(typeof i!="string")return{type:"message",data:We(i,e)};const t=i.charAt(0);return t==="b"?{type:"message",data:vt(i.substring(1),e)}:j[t]?i.length>1?{type:j[t],data:i.substring(1)}:{type:j[t]}:ut},vt=(i,e)=>{if(yt){const t=gt(i);return We(t,e)}else return{base64:!0,data:i}},We=(i,e)=>{switch(e){case"blob":return i instanceof ArrayBuffer?new Blob([i]):i;case"arraybuffer":default:return i}},je=String.fromCharCode(30),bt=(i,e)=>{const t=i.length,s=new Array(t);let n=0;i.forEach((r,o)=>{Ie(r,!1,c=>{s[o]=c,++n===t&&e(s.join(je))})})},At=(i,e)=>{const t=i.split(je),s=[];for(let n=0;n<t.length;n++){const r=Ve(t[n],e);if(s.push(r),r.type==="error")break}return s},Ye=4;function p(i){if(i)return wt(i)}function wt(i){for(var e in p.prototype)i[e]=p.prototype[e];return i}p.prototype.on=p.prototype.addEventListener=function(i,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+i]=this._callbacks["$"+i]||[]).push(e),this};p.prototype.once=function(i,e){function t(){this.off(i,t),e.apply(this,arguments)}return t.fn=e,this.on(i,t),this};p.prototype.off=p.prototype.removeListener=p.prototype.removeAllListeners=p.prototype.removeEventListener=function(i,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+i];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+i],this;for(var s,n=0;n<t.length;n++)if(s=t[n],s===e||s.fn===e){t.splice(n,1);break}return t.length===0&&delete this._callbacks["$"+i],this};p.prototype.emit=function(i){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+i],s=1;s<arguments.length;s++)e[s-1]=arguments[s];if(t){t=t.slice(0);for(var s=0,n=t.length;s<n;++s)t[s].apply(this,e)}return this};p.prototype.emitReserved=p.prototype.emit;p.prototype.listeners=function(i){return this._callbacks=this._callbacks||{},this._callbacks["$"+i]||[]};p.prototype.hasListeners=function(i){return!!this.listeners(i).length};const y=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function Ke(i,...e){return e.reduce((t,s)=>(i.hasOwnProperty(s)&&(t[s]=i[s]),t),{})}const _t=y.setTimeout,xt=y.clearTimeout;function Z(i,e){e.useNativeTimers?(i.setTimeoutFn=_t.bind(y),i.clearTimeoutFn=xt.bind(y)):(i.setTimeoutFn=y.setTimeout.bind(y),i.clearTimeoutFn=y.clearTimeout.bind(y))}const Et=1.33;function $t(i){return typeof i=="string"?kt(i):Math.ceil((i.byteLength||i.size)*Et)}function kt(i){let e=0,t=0;for(let s=0,n=i.length;s<n;s++)e=i.charCodeAt(s),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(s++,t+=4);return t}class St extends Error{constructor(e,t,s){super(e),this.description=t,this.context=s,this.type="TransportError"}}class Xe extends p{constructor(e){super(),this.writable=!1,Z(this,e),this.opts=e,this.query=e.query,this.socket=e.socket}onError(e,t,s){return super.emitReserved("error",new St(e,t,s)),this}open(){return this.readyState="opening",this.doOpen(),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=Ve(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}pause(e){}}const Qe="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),re=64,Ct={};let xe=0,V=0,Ee;function $e(i){let e="";do e=Qe[i%re]+e,i=Math.floor(i/re);while(i>0);return e}function Je(){const i=$e(+new Date);return i!==Ee?(xe=0,Ee=i):i+"."+$e(xe++)}for(;V<re;V++)Ct[Qe[V]]=V;function Ze(i){let e="";for(let t in i)i.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(i[t]));return e}function Ot(i){let e={},t=i.split("&");for(let s=0,n=t.length;s<n;s++){let r=t[s].split("=");e[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return e}let Ge=!1;try{Ge=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const Tt=Ge;function et(i){const e=i.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||Tt))return new XMLHttpRequest}catch{}if(!e)try{return new y[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function Rt(){}const Nt=function(){return new et({xdomain:!1}).responseType!=null}();class Bt extends Xe{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const s=location.protocol==="https:";let n=location.port;n||(n=s?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||n!==e.port,this.xs=e.secure!==s}const t=e&&e.forceBase64;this.supportsBinary=Nt&&!t}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let s=0;this.polling&&(s++,this.once("pollComplete",function(){--s||t()})),this.writable||(s++,this.once("drain",function(){--s||t()}))}else t()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=s=>{if(this.readyState==="opening"&&s.type==="open"&&this.onOpen(),s.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(s)};At(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,bt(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let e=this.query||{};const t=this.opts.secure?"https":"http";let s="";this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=Je()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.opts.port&&(t==="https"&&Number(this.opts.port)!==443||t==="http"&&Number(this.opts.port)!==80)&&(s=":"+this.opts.port);const n=Ze(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(n.length?"?"+n:"")}request(e={}){return Object.assign(e,{xd:this.xd,xs:this.xs},this.opts),new A(this.uri(),e)}doWrite(e,t){const s=this.request({method:"POST",data:e});s.on("success",t),s.on("error",(n,r)=>{this.onError("xhr post error",n,r)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,s)=>{this.onError("xhr poll error",t,s)}),this.pollXhr=e}}class A extends p{constructor(e,t){super(),Z(this,t),this.opts=t,this.method=t.method||"GET",this.uri=e,this.async=t.async!==!1,this.data=t.data!==void 0?t.data:null,this.create()}create(){const e=Ke(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;const t=this.xhr=new et(e);try{t.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0);for(let s in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(s)&&t.setRequestHeader(s,this.opts.extraHeaders[s])}}catch{}if(this.method==="POST")try{t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{t.setRequestHeader("Accept","*/*")}catch{}"withCredentials"in t&&(t.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(t.timeout=this.opts.requestTimeout),t.onreadystatechange=()=>{t.readyState===4&&(t.status===200||t.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof t.status=="number"?t.status:0)},0))},t.send(this.data)}catch(s){this.setTimeoutFn(()=>{this.onError(s)},0);return}typeof document<"u"&&(this.index=A.requestsCount++,A.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=Rt,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete A.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}A.requestsCount=0;A.requests={};if(typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",ke);else if(typeof addEventListener=="function"){const i="onpagehide"in y?"pagehide":"unload";addEventListener(i,ke,!1)}}function ke(){for(let i in A.requests)A.requests.hasOwnProperty(i)&&A.requests[i].abort()}const tt=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0))(),W=y.WebSocket||y.MozWebSocket,Se=!0,Pt="arraybuffer",Ce=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Lt extends Xe{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),t=this.opts.protocols,s=Ce?{}:Ke(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(s.headers=this.opts.extraHeaders);try{this.ws=Se&&!Ce?t?new W(e,t):new W(e):new W(e,t,s)}catch(n){return this.emitReserved("error",n)}this.ws.binaryType=this.socket.binaryType||Pt,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const s=e[t],n=t===e.length-1;Ie(s,this.supportsBinary,r=>{const o={};try{Se&&this.ws.send(r)}catch{}n&&tt(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){let e=this.query||{};const t=this.opts.secure?"wss":"ws";let s="";this.opts.port&&(t==="wss"&&Number(this.opts.port)!==443||t==="ws"&&Number(this.opts.port)!==80)&&(s=":"+this.opts.port),this.opts.timestampRequests&&(e[this.opts.timestampParam]=Je()),this.supportsBinary||(e.b64=1);const n=Ze(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+s+this.opts.path+(n.length?"?"+n:"")}check(){return!!W}}const Ut={websocket:Lt,polling:Bt},Mt=/^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,Dt=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function oe(i){const e=i,t=i.indexOf("["),s=i.indexOf("]");t!=-1&&s!=-1&&(i=i.substring(0,t)+i.substring(t,s).replace(/:/g,";")+i.substring(s,i.length));let n=Mt.exec(i||""),r={},o=14;for(;o--;)r[Dt[o]]=n[o]||"";return t!=-1&&s!=-1&&(r.source=e,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=Ft(r,r.path),r.queryKey=qt(r,r.query),r}function Ft(i,e){const t=/\/{2,9}/g,s=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&s.splice(0,1),e.slice(-1)=="/"&&s.splice(s.length-1,1),s}function qt(i,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(s,n,r){n&&(t[n]=r)}),t}let st=class S extends p{constructor(e,t={}){super(),this.writeBuffer=[],e&&typeof e=="object"&&(t=e,e=null),e?(e=oe(e),t.hostname=e.host,t.secure=e.protocol==="https"||e.protocol==="wss",t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=oe(t.host).host),Z(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=t.transports||["polling","websocket"],this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,addTrailingSlash:!0,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},t),this.opts.path=this.opts.path.replace(/\/$/,"")+(this.opts.addTrailingSlash?"/":""),typeof this.opts.query=="string"&&(this.opts.query=Ot(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=Ye,t.transport=e,this.id&&(t.sid=this.id);const s=Object.assign({},this.opts.transportOptions[e],this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new Ut[e](s)}open(){let e;if(this.opts.rememberUpgrade&&S.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",t=>this.onClose("transport close",t))}probe(e){let t=this.createTransport(e),s=!1;S.priorWebsocketSuccess=!1;const n=()=>{s||(t.send([{type:"ping",data:"probe"}]),t.once("packet",l=>{if(!s)if(l.type==="pong"&&l.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;S.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{s||this.readyState!=="closed"&&(f(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const u=new Error("probe error");u.transport=t.name,this.emitReserved("upgradeError",u)}}))};function r(){s||(s=!0,f(),t.close(),t=null)}const o=l=>{const u=new Error("probe error: "+l);u.transport=t.name,r(),this.emitReserved("upgradeError",u)};function c(){o("transport closed")}function a(){o("socket closed")}function h(l){t&&l.name!==t.name&&r()}const f=()=>{t.removeListener("open",n),t.removeListener("error",o),t.removeListener("close",c),this.off("close",a),this.off("upgrading",h)};t.once("open",n),t.once("error",o),t.once("close",c),this.once("close",a),this.once("upgrading",h),t.open()}onOpen(){if(this.readyState="open",S.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade){let e=0;const t=this.upgrades.length;for(;e<t;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let s=0;s<this.writeBuffer.length;s++){const n=this.writeBuffer[s].data;if(n&&(t+=$t(n)),s>0&&t>this.maxPayload)return this.writeBuffer.slice(0,s);t+=2}return this.writeBuffer}write(e,t,s){return this.sendPacket("message",e,t,s),this}send(e,t,s){return this.sendPacket("message",e,t,s),this}sendPacket(e,t,s,n){if(typeof t=="function"&&(n=t,t=void 0),typeof s=="function"&&(n=s,s=null),this.readyState==="closing"||this.readyState==="closed")return;s=s||{},s.compress=s.compress!==!1;const r={type:e,data:t,options:s};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),n&&this.once("flush",n),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},s=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?s():e()}):this.upgrading?s():e()),this}onError(e){S.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,t){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const t=[];let s=0;const n=e.length;for(;s<n;s++)~this.transports.indexOf(e[s])&&t.push(e[s]);return t}};st.protocol=Ye;function zt(i,e="",t){let s=i;t=t||typeof location<"u"&&location,i==null&&(i=t.protocol+"//"+t.host),typeof i=="string"&&(i.charAt(0)==="/"&&(i.charAt(1)==="/"?i=t.protocol+i:i=t.host+i),/^(https?|wss?):\/\//.test(i)||(typeof t<"u"?i=t.protocol+"//"+i:i="https://"+i),s=oe(i)),s.port||(/^(http|ws)$/.test(s.protocol)?s.port="80":/^(http|ws)s$/.test(s.protocol)&&(s.port="443")),s.path=s.path||"/";const r=s.host.indexOf(":")!==-1?"["+s.host+"]":s.host;return s.id=s.protocol+"://"+r+":"+s.port+e,s.href=s.protocol+"://"+r+(t&&t.port===s.port?"":":"+s.port),s}const Ht=typeof ArrayBuffer=="function",It=i=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(i):i.buffer instanceof ArrayBuffer,it=Object.prototype.toString,Vt=typeof Blob=="function"||typeof Blob<"u"&&it.call(Blob)==="[object BlobConstructor]",Wt=typeof File=="function"||typeof File<"u"&&it.call(File)==="[object FileConstructor]";function de(i){return Ht&&(i instanceof ArrayBuffer||It(i))||Vt&&i instanceof Blob||Wt&&i instanceof File}function Y(i,e){if(!i||typeof i!="object")return!1;if(Array.isArray(i)){for(let t=0,s=i.length;t<s;t++)if(Y(i[t]))return!0;return!1}if(de(i))return!0;if(i.toJSON&&typeof i.toJSON=="function"&&arguments.length===1)return Y(i.toJSON(),!0);for(const t in i)if(Object.prototype.hasOwnProperty.call(i,t)&&Y(i[t]))return!0;return!1}function jt(i){const e=[],t=i.data,s=i;return s.data=ae(t,e),s.attachments=e.length,{packet:s,buffers:e}}function ae(i,e){if(!i)return i;if(de(i)){const t={_placeholder:!0,num:e.length};return e.push(i),t}else if(Array.isArray(i)){const t=new Array(i.length);for(let s=0;s<i.length;s++)t[s]=ae(i[s],e);return t}else if(typeof i=="object"&&!(i instanceof Date)){const t={};for(const s in i)Object.prototype.hasOwnProperty.call(i,s)&&(t[s]=ae(i[s],e));return t}return i}function Yt(i,e){return i.data=ce(i.data,e),delete i.attachments,i}function ce(i,e){if(!i)return i;if(i&&i._placeholder===!0){if(typeof i.num=="number"&&i.num>=0&&i.num<e.length)return e[i.num];throw new Error("illegal attachments")}else if(Array.isArray(i))for(let t=0;t<i.length;t++)i[t]=ce(i[t],e);else if(typeof i=="object")for(const t in i)Object.prototype.hasOwnProperty.call(i,t)&&(i[t]=ce(i[t],e));return i}const Kt=5;var d;(function(i){i[i.CONNECT=0]="CONNECT",i[i.DISCONNECT=1]="DISCONNECT",i[i.EVENT=2]="EVENT",i[i.ACK=3]="ACK",i[i.CONNECT_ERROR=4]="CONNECT_ERROR",i[i.BINARY_EVENT=5]="BINARY_EVENT",i[i.BINARY_ACK=6]="BINARY_ACK"})(d||(d={}));class Xt{constructor(e){this.replacer=e}encode(e){return(e.type===d.EVENT||e.type===d.ACK)&&Y(e)?this.encodeAsBinary({type:e.type===d.EVENT?d.BINARY_EVENT:d.BINARY_ACK,nsp:e.nsp,data:e.data,id:e.id}):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===d.BINARY_EVENT||e.type===d.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=jt(e),s=this.encodeAsString(t.packet),n=t.buffers;return n.unshift(s),n}}class ue extends p{constructor(e){super(),this.reviver=e}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e);const s=t.type===d.BINARY_EVENT;s||t.type===d.BINARY_ACK?(t.type=s?d.EVENT:d.ACK,this.reconstructor=new Qt(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(de(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const s={type:Number(e.charAt(0))};if(d[s.type]===void 0)throw new Error("unknown packet type "+s.type);if(s.type===d.BINARY_EVENT||s.type===d.BINARY_ACK){const r=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(r,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");s.attachments=Number(o)}if(e.charAt(t+1)==="/"){const r=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););s.nsp=e.substring(r,t)}else s.nsp="/";const n=e.charAt(t+1);if(n!==""&&Number(n)==n){const r=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}s.id=Number(e.substring(r,t+1))}if(e.charAt(++t)){const r=this.tryParse(e.substr(t));if(ue.isPayloadValid(s.type,r))s.data=r;else throw new Error("invalid payload")}return s}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case d.CONNECT:return typeof t=="object";case d.DISCONNECT:return t===void 0;case d.CONNECT_ERROR:return typeof t=="string"||typeof t=="object";case d.EVENT:case d.BINARY_EVENT:return Array.isArray(t)&&t.length>0;case d.ACK:case d.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&(this.reconstructor.finishedReconstruction(),this.reconstructor=null)}}class Qt{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=Yt(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}const Jt=Object.freeze(Object.defineProperty({__proto__:null,Decoder:ue,Encoder:Xt,get PacketType(){return d},protocol:Kt},Symbol.toStringTag,{value:"Module"}));function b(i,e,t){return i.on(e,t),function(){i.off(e,t)}}const Zt=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class nt extends p{constructor(e,t,s){super(),this.connected=!1,this.recovered=!1,this.receiveBuffer=[],this.sendBuffer=[],this._queue=[],this._queueSeq=0,this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,s&&s.auth&&(this.auth=s.auth),this._opts=Object.assign({},s),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[b(e,"open",this.onopen.bind(this)),b(e,"packet",this.onpacket.bind(this)),b(e,"error",this.onerror.bind(this)),b(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){if(Zt.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');if(t.unshift(e),this._opts.retries&&!this.flags.fromQueue&&!this.flags.volatile)return this._addToQueue(t),this;const s={type:d.EVENT,data:t};if(s.options={},s.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const o=this.ids++,c=t.pop();this._registerAckCallback(o,c),s.id=o}const n=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!n||!this.connected)||(this.connected?(this.notifyOutgoingListeners(s),this.packet(s)):this.sendBuffer.push(s)),this.flags={},this}_registerAckCallback(e,t){var s;const n=(s=this.flags.timeout)!==null&&s!==void 0?s:this._opts.ackTimeout;if(n===void 0){this.acks[e]=t;return}const r=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let o=0;o<this.sendBuffer.length;o++)this.sendBuffer[o].id===e&&this.sendBuffer.splice(o,1);t.call(this,new Error("operation has timed out"))},n);this.acks[e]=(...o)=>{this.io.clearTimeoutFn(r),t.apply(this,[null,...o])}}emitWithAck(e,...t){const s=this.flags.timeout!==void 0||this._opts.ackTimeout!==void 0;return new Promise((n,r)=>{t.push((o,c)=>s?o?r(o):n(c):n(o)),this.emit(e,...t)})}_addToQueue(e){let t;typeof e[e.length-1]=="function"&&(t=e.pop());const s={id:this._queueSeq++,tryCount:0,pending:!1,args:e,flags:Object.assign({fromQueue:!0},this.flags)};e.push((n,...r)=>s!==this._queue[0]?void 0:(n!==null?s.tryCount>this._opts.retries&&(this._queue.shift(),t&&t(n)):(this._queue.shift(),t&&t(null,...r)),s.pending=!1,this._drainQueue())),this._queue.push(s),this._drainQueue()}_drainQueue(e=!1){if(!this.connected||this._queue.length===0)return;const t=this._queue[0];t.pending&&!e||(t.pending=!0,t.tryCount++,this.flags=t.flags,this.emit.apply(this,t.args))}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this._sendConnectPacket(e)}):this._sendConnectPacket(this.auth)}_sendConnectPacket(e){this.packet({type:d.CONNECT,data:this._pid?Object.assign({pid:this._pid,offset:this._lastOffset},e):e})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case d.CONNECT:e.data&&e.data.sid?this.onconnect(e.data.sid,e.data.pid):this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case d.EVENT:case d.BINARY_EVENT:this.onevent(e);break;case d.ACK:case d.BINARY_ACK:this.onack(e);break;case d.DISCONNECT:this.ondisconnect();break;case d.CONNECT_ERROR:this.destroy();const s=new Error(e.data.message);s.data=e.data.data,this.emitReserved("connect_error",s);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const s of t)s.apply(this,e)}super.emit.apply(this,e),this._pid&&e.length&&typeof e[e.length-1]=="string"&&(this._lastOffset=e[e.length-1])}ack(e){const t=this;let s=!1;return function(...n){s||(s=!0,t.packet({type:d.ACK,id:e,data:n}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(t.apply(this,e.data),delete this.acks[e.id])}onconnect(e,t){this.id=e,this.recovered=t&&this._pid===t,this._pid=t,this.connected=!0,this.emitBuffered(),this.emitReserved("connect"),this._drainQueue(!0)}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:d.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let s=0;s<t.length;s++)if(e===t[s])return t.splice(s,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let s=0;s<t.length;s++)if(e===t[s])return t.splice(s,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const s of t)s.apply(this,e.data)}}}function P(i){i=i||{},this.ms=i.min||100,this.max=i.max||1e4,this.factor=i.factor||2,this.jitter=i.jitter>0&&i.jitter<=1?i.jitter:0,this.attempts=0}P.prototype.duration=function(){var i=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*i);i=Math.floor(e*10)&1?i+t:i-t}return Math.min(i,this.max)|0};P.prototype.reset=function(){this.attempts=0};P.prototype.setMin=function(i){this.ms=i};P.prototype.setMax=function(i){this.max=i};P.prototype.setJitter=function(i){this.jitter=i};class he extends p{constructor(e,t){var s;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,Z(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((s=t.randomizationFactor)!==null&&s!==void 0?s:.5),this.backoff=new P({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const n=t.parser||Jt;this.encoder=new n.Encoder,this.decoder=new n.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new st(this.uri,this.opts);const t=this.engine,s=this;this._readyState="opening",this.skipReconnect=!1;const n=b(t,"open",function(){s.onopen(),e&&e()}),r=b(t,"error",o=>{s.cleanup(),s._readyState="closed",this.emitReserved("error",o),e?e(o):s.maybeReconnectOnOpen()});if(this._timeout!==!1){const o=this._timeout;o===0&&n();const c=this.setTimeoutFn(()=>{n(),t.close(),t.emit("error",new Error("timeout"))},o);this.opts.autoUnref&&c.unref(),this.subs.push(function(){clearTimeout(c)})}return this.subs.push(n),this.subs.push(r),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(b(e,"ping",this.onping.bind(this)),b(e,"data",this.ondata.bind(this)),b(e,"error",this.onerror.bind(this)),b(e,"close",this.onclose.bind(this)),b(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){tt(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let s=this.nsps[e];return s?this._autoConnect&&!s.active&&s.connect():(s=new nt(this,e,t),this.nsps[e]=s),s}_destroy(e){const t=Object.keys(this.nsps);for(const s of t)if(this.nsps[s].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let s=0;s<t.length;s++)this.engine.write(t[s],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const s=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(n=>{n?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",n)):e.onreconnect()}))},t);this.opts.autoUnref&&s.unref(),this.subs.push(function(){clearTimeout(s)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const L={};function K(i,e){typeof i=="object"&&(e=i,i=void 0),e=e||{};const t=zt(i,e.path||"/socket.io"),s=t.source,n=t.id,r=t.path,o=L[n]&&r in L[n].nsps,c=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let a;return c?a=new he(s,e):(L[n]||(L[n]=new he(s,e)),a=L[n]),t.query&&!e.query&&(e.query=t.queryKey),a.socket(t.path,e)}Object.assign(K,{Manager:he,Socket:nt,io:K,connect:K});class Gt extends ze{constructor(e){super(),this.ready=!1,this.socket=K(e||"http://localhost:3000"),this.socket.on("connect",()=>{this.id=this.socket.id,this.emit("ready"),this.ready=!0}),this.waitForOffers()}async connect(e){this.ready||await new Promise(a=>this.once("ready",()=>{console.log("Peer not ready yet, waiting for ready event"),a(null)}));const t=new RTCPeerConnection,s=t.createDataChannel("dataChannel"),n=await t.createOffer();await t.setLocalDescription(n);const r=[];t.addEventListener("icecandidate",a=>{a.candidate?r.push(a.candidate):(console.log(`All ice candidates for ${e} collected sending offer`),this.socket.emit("offer",{to:e,offer:n,iceCandidates:r}))}),s.onmessage=a=>{console.log(`Received message from ${e}: ${a.data}`)},t.addEventListener("open",()=>{console.log(`Connection opened for ${e}`)}),s.addEventListener("open",()=>{console.log(`Data channel opened for ${e}`),s.send("Hello from "+this.id)});let o=this;function c(){console.log(`Waiting for answer from ${e}`),o.socket.once("answer",async a=>{const{from:h,answer:f,iceCandidates:l}=a;h===e?(console.log(`Answer received from ${e}. Setting remote description.`),await t.setRemoteDescription(f),l.forEach(u=>{console.log(`Adding ice candidate from ${e}`),t.addIceCandidate(u)})):c()})}c()}waitForOffers(){console.log("Listening for incoming signals"),this.socket.on("offer",async e=>{const{from:t,offer:s,iceCandidates:n}=e;console.log(`Received offer from ${t}`,{data:e});const r=new RTCPeerConnection;await r.setRemoteDescription(s);const o=await r.createAnswer();await r.setLocalDescription(o),console.log(`Answer created for ${t}`);const c=[];r.onicecandidate=a=>{a.candidate?c.push(a.candidate):(console.log(`All ice candidates for ${t} collected sending answer`),this.socket.emit("answer",{to:t,iceCandidates:c,answer:o}))},r.ondatachannel=a=>{console.log(`Data channel opened for ${t}`),a.channel.onmessage=h=>{console.log(`Received message from ${t}: ${h.data}`)}},r.addEventListener("open",()=>{console.log(`Connection opened for ${t}`)}),n.forEach(a=>{console.log(`Adding ice candidate from ${t}`),r.addIceCandidate(a)})})}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=window,pe=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,fe=Symbol(),Oe=new WeakMap;let rt=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==fe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(pe&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Oe.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Oe.set(t,e))}return e}toString(){return this.cssText}};const es=i=>new rt(typeof i=="string"?i:i+"",void 0,fe),x=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,n,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+i[r+1],i[0]);return new rt(t,i,fe)},ts=(i,e)=>{pe?i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const s=document.createElement("style"),n=X.litNonce;n!==void 0&&s.setAttribute("nonce",n),s.textContent=t.cssText,i.appendChild(s)})},Te=pe?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return es(t)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ee;const Q=window,Re=Q.trustedTypes,ss=Re?Re.emptyScript:"",Ne=Q.reactiveElementPolyfillSupport,le={toAttribute(i,e){switch(e){case Boolean:i=i?ss:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},ot=(i,e)=>e!==i&&(e==e||i==i),te={attribute:!0,type:String,converter:le,reflect:!1,hasChanged:ot};let C=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,s)=>{const n=this._$Ep(s,t);n!==void 0&&(this._$Ev.set(n,s),e.push(n))}),e}static createProperty(e,t=te){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,s,t);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(n){const r=this[e];this[t]=n,this.requestUpdate(e,r,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||te}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const n of s)this.createProperty(n,t[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const n of s)t.unshift(Te(n))}else e!==void 0&&t.push(Te(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}u(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ts(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)})}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=te){var n;const r=this.constructor._$Ep(e,s);if(r!==void 0&&s.reflect===!0){const o=(((n=s.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?s.converter:le).toAttribute(t,s.type);this._$El=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,t){var s;const n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){const o=n.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?o.converter:le;this._$El=r,this[r]=c.fromAttribute(t,o.type),this._$El=null}}requestUpdate(e,t,s){let n=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||ot)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(s)):this._$Ek()}catch(n){throw t=!1,this._$Ek(),n}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(s=>{var n;return(n=s.hostUpdated)===null||n===void 0?void 0:n.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,s)=>this._$EO(s,this[s],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};C.finalized=!0,C.elementProperties=new Map,C.elementStyles=[],C.shadowRootOptions={mode:"open"},Ne==null||Ne({ReactiveElement:C}),((ee=Q.reactiveElementVersions)!==null&&ee!==void 0?ee:Q.reactiveElementVersions=[]).push("1.6.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var se;const J=window,T=J.trustedTypes,Be=T?T.createPolicy("lit-html",{createHTML:i=>i}):void 0,E=`lit$${(Math.random()+"").slice(9)}$`,at="?"+E,is=`<${at}>`,R=document,D=(i="")=>R.createComment(i),F=i=>i===null||typeof i!="object"&&typeof i!="function",ct=Array.isArray,ns=i=>ct(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pe=/-->/g,Le=/>/g,$=RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ue=/'/g,Me=/"/g,ht=/^(?:script|style|textarea|title)$/i,rs=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),_=rs(1),N=Symbol.for("lit-noChange"),m=Symbol.for("lit-nothing"),De=new WeakMap,O=R.createTreeWalker(R,129,null,!1),os=(i,e)=>{const t=i.length-1,s=[];let n,r=e===2?"<svg>":"",o=U;for(let a=0;a<t;a++){const h=i[a];let f,l,u=-1,v=0;for(;v<h.length&&(o.lastIndex=v,l=o.exec(h),l!==null);)v=o.lastIndex,o===U?l[1]==="!--"?o=Pe:l[1]!==void 0?o=Le:l[2]!==void 0?(ht.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=$):l[3]!==void 0&&(o=$):o===$?l[0]===">"?(o=n??U,u=-1):l[1]===void 0?u=-2:(u=o.lastIndex-l[2].length,f=l[1],o=l[3]===void 0?$:l[3]==='"'?Me:Ue):o===Me||o===Ue?o=$:o===Pe||o===Le?o=U:(o=$,n=void 0);const H=o===$&&i[a+1].startsWith("/>")?" ":"";r+=o===U?h+is:u>=0?(s.push(f),h.slice(0,u)+"$lit$"+h.slice(u)+E+H):h+E+(u===-2?(s.push(void 0),a):H)}const c=r+(i[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Be!==void 0?Be.createHTML(c):c,s]};class q{constructor({strings:e,_$litType$:t},s){let n;this.parts=[];let r=0,o=0;const c=e.length-1,a=this.parts,[h,f]=os(e,t);if(this.el=q.createElement(h,s),O.currentNode=this.el.content,t===2){const l=this.el.content,u=l.firstChild;u.remove(),l.append(...u.childNodes)}for(;(n=O.nextNode())!==null&&a.length<c;){if(n.nodeType===1){if(n.hasAttributes()){const l=[];for(const u of n.getAttributeNames())if(u.endsWith("$lit$")||u.startsWith(E)){const v=f[o++];if(l.push(u),v!==void 0){const H=n.getAttribute(v.toLowerCase()+"$lit$").split(E),I=/([.?@])?(.*)/.exec(v);a.push({type:1,index:r,name:I[2],strings:H,ctor:I[1]==="."?cs:I[1]==="?"?ls:I[1]==="@"?ds:G})}else a.push({type:6,index:r})}for(const u of l)n.removeAttribute(u)}if(ht.test(n.tagName)){const l=n.textContent.split(E),u=l.length-1;if(u>0){n.textContent=T?T.emptyScript:"";for(let v=0;v<u;v++)n.append(l[v],D()),O.nextNode(),a.push({type:2,index:++r});n.append(l[u],D())}}}else if(n.nodeType===8)if(n.data===at)a.push({type:2,index:r});else{let l=-1;for(;(l=n.data.indexOf(E,l+1))!==-1;)a.push({type:7,index:r}),l+=E.length-1}r++}}static createElement(e,t){const s=R.createElement("template");return s.innerHTML=e,s}}function B(i,e,t=i,s){var n,r,o,c;if(e===N)return e;let a=s!==void 0?(n=t._$Co)===null||n===void 0?void 0:n[s]:t._$Cl;const h=F(e)?void 0:e._$litDirective$;return(a==null?void 0:a.constructor)!==h&&((r=a==null?void 0:a._$AO)===null||r===void 0||r.call(a,!1),h===void 0?a=void 0:(a=new h(i),a._$AT(i,t,s)),s!==void 0?((o=(c=t)._$Co)!==null&&o!==void 0?o:c._$Co=[])[s]=a:t._$Cl=a),a!==void 0&&(e=B(i,a._$AS(i,e.values),a,s)),e}class as{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:s},parts:n}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:R).importNode(s,!0);O.currentNode=r;let o=O.nextNode(),c=0,a=0,h=n[0];for(;h!==void 0;){if(c===h.index){let f;h.type===2?f=new z(o,o.nextSibling,this,e):h.type===1?f=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(f=new us(o,this,e)),this.u.push(f),h=n[++a]}c!==(h==null?void 0:h.index)&&(o=O.nextNode(),c++)}return r}p(e){let t=0;for(const s of this.u)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class z{constructor(e,t,s,n){var r;this.type=2,this._$AH=m,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=n,this._$Cm=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),F(e)?e===m||e==null||e===""?(this._$AH!==m&&this._$AR(),this._$AH=m):e!==this._$AH&&e!==N&&this.g(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):ns(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==m&&F(this._$AH)?this._$AA.nextSibling.data=e:this.T(R.createTextNode(e)),this._$AH=e}$(e){var t;const{values:s,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=q.createElement(n.h,this.options)),n);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.p(s);else{const o=new as(r,this),c=o.v(this.options);o.p(s),this.T(c),this._$AH=o}}_$AC(e){let t=De.get(e.strings);return t===void 0&&De.set(e.strings,t=new q(e)),t}k(e){ct(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,n=0;for(const r of e)n===t.length?t.push(s=new z(this.O(D()),this.O(D()),this,this.options)):s=t[n],s._$AI(r),n++;n<t.length&&(this._$AR(s&&s._$AB.nextSibling,n),t.length=n)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var t;this._$AM===void 0&&(this._$Cm=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class G{constructor(e,t,s,n,r){this.type=1,this._$AH=m,this._$AN=void 0,this.element=e,this.name=t,this._$AM=n,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=m}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,n){const r=this.strings;let o=!1;if(r===void 0)e=B(this,e,t,0),o=!F(e)||e!==this._$AH&&e!==N,o&&(this._$AH=e);else{const c=e;let a,h;for(e=r[0],a=0;a<r.length-1;a++)h=B(this,c[s+a],t,a),h===N&&(h=this._$AH[a]),o||(o=!F(h)||h!==this._$AH[a]),h===m?e=m:e!==m&&(e+=(h??"")+r[a+1]),this._$AH[a]=h}o&&!n&&this.j(e)}j(e){e===m?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class cs extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===m?void 0:e}}const hs=T?T.emptyScript:"";class ls extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==m?this.element.setAttribute(this.name,hs):this.element.removeAttribute(this.name)}}class ds extends G{constructor(e,t,s,n,r){super(e,t,s,n,r),this.type=5}_$AI(e,t=this){var s;if((e=(s=B(this,e,t,0))!==null&&s!==void 0?s:m)===N)return;const n=this._$AH,r=e===m&&n!==m||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==m&&(n===m||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class us{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const Fe=J.litHtmlPolyfillSupport;Fe==null||Fe(q,z),((se=J.litHtmlVersions)!==null&&se!==void 0?se:J.litHtmlVersions=[]).push("2.6.1");const ps=(i,e,t)=>{var s,n;const r=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:e;let o=r._$litPart$;if(o===void 0){const c=(n=t==null?void 0:t.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new z(e.insertBefore(D(),c),c,void 0,t??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ie,ne;class g extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ps(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return N}}g.finalized=!0,g._$litElement$=!0,(ie=globalThis.litElementHydrateSupport)===null||ie===void 0||ie.call(globalThis,{LitElement:g});const qe=globalThis.litElementPolyfillSupport;qe==null||qe({LitElement:g});((ne=globalThis.litElementVersions)!==null&&ne!==void 0?ne:globalThis.litElementVersions=[]).push("3.2.2");const k=x`
* {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    box-sizing: border-box;
}
.no-select{
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
}
.text-center {
    text-align: center;
}
`;class me extends g{constructor(){super(),this.name="World"}render(){return _`
        <div id="input-wrapper">
          <input type="text" placeholder="Find a contact" />
        </div>
        <div id="buttons">
          <msn-img-button style="justify-content:flex-end" icon="invite"></msn-img-button>
          <msn-img-button style="justify-content:flex-end" icon="sort-contacts"></msn-img-button>
        </div>`}}me.properties={name:{}};me.styles=x`
      ${k}
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
    `;customElements.define("msn-contact-search",me);const fs=new Array(100).fill(0);class ge extends g{constructor(){super(),this.name="World"}render(){return _`<div id="contacts">
        <img class="arrow" src="arrow-down.png" alt="" /> <strong>Online (4)</strong>
        <ul>
            ${fs.map((e,t)=>_`<li><img src="status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>`)}
            <li><img src="status/online.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            <li><img src="status/away.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            <li><img src="status/busy.png" alt="" /> <span class="nickname">ThatXPUser </span> - <span class="status muted">i'm sad all day</span></li>
            
        </ul>
    </div>`}}ge.properties={name:{}};ge.styles=x`
    ${k}
      :host {
        display: block;
        height: calc(100vh - 288px);
        overflow-y: auto;
        border-top: 1px solid #ddd;
        padding: 10px 10px;
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
    `;customElements.define("msn-friendlist",ge);class ye extends g{constructor(){super(),this.name="World"}render(){return _`<div id="header" class="no-select">
  <div id="window-bar">
    <img src="live_logo.png" alt="">
    <span>Windows Live Messenger</span>
  </div>
  <div id="profile-wrapper">
    <msn-avatar size="62" src="avatars/dog.png"></msn-avatar>
    <div id="status">
      <div id="nickname">
        <strong> Kucukkanat </strong> <span class="muted">(busy) <div class="chevron-down"></div><span>
      </div>
      <div id="status-picker">
        <span class="muted">stayin' alive</span>
        <div class="chevron-down"></div>
      </div>
    </div>
  </div>
</div>`}}ye.properties={name:{}};ye.styles=x`
      ${k}
      :host {
        display: block;
        height: 100px;
        padding-left: 10px;
        padding-top: 5px;
        background-image: url("backgrounds/background-large.png");
        background-size: 100% 100%;
      }
      
      #window-bar {
        color: white;
        padding-bottom: 5px;
      }
      #window-bar span, #window-bar img {
        height: 15px;
        display: inline-block;
      }
      #window-bar span {
        font-size: 12px;
        position: relative;
        top: -3px;
      }

      #profile-wrapper {
        display: flex;
        color: white;
        flex-direction: row;
      }
      #status {
        padding-left: 10px;
        padding-top: 8px;
      }
      #status-picker {
        padding-top: 5px;
        font-size: 12px;
      }
      .chevron-down {
        display: inline-block;
        position: relative;
        top: -2px;
        right: -4px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 5px 5px 0 5px;
        border-color: #cfe6ff transparent transparent transparent;
      }
      #nickname span {
        font-size: 12px;
        padding-left: 10px;
      }
      .muted {
        opacity: 0.7;
      }
    `;customElements.define("msn-header",ye);class lt extends g{static get styles(){return x`
              :host {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 120px;
                  height: 120px;
                  border-radius: 10px;
                  overflow: hidden;
                  background-image: url("avatar_frame.png");
                  background-repeat: no-repeat;
                  background-position: center center;
                  background-size: 100% 100%;
              }
              img {
                  position: relative;
                  left: -2%;
                  top: -3%;
                  width: 80%;
                  height: 80%;
                  object-fit: cover;
              }
          `}firstUpdated(){this.style.width=this.size+"px",this.style.height=this.size+"px"}render(){return _`<img src="${this.src}" alt="" />`}}lt.properties={src:{type:String},size:{type:Number}};customElements.define("msn-avatar",lt);class ve extends g{constructor(){super(),this.name="World"}render(){return _`
        <div id="app-bar">
          <msn-img-button icon="navbar-mail"></msn-img-button>
          <msn-img-button icon="navbar-contacts"></msn-img-button>
          <msn-img-button icon="navbar-news"></msn-img-button>
        
        </div>
        `}}ve.properties={name:{}};ve.styles=x`
      ${k}
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
    `;customElements.define("msn-profile-bar",ve);class be extends g{constructor(){super(),this.name="World"}render(){return _``}}be.properties={name:{}};be.styles=x`
      ${k}
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
    `;customElements.define("msn-profile-section",be);const ms=".";class Ae extends g{firstUpdated(){this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this.shadowRoot.querySelector("button").style.backgroundImage=`url(${ms}/${this.icon}.png)`}render(){return _`
        <button class="message" @click=${this.click}>
        
        </button>
        `}}Ae.properties={icon:{type:String},size:{type:Number}};Ae.styles=x`
    ${k}
    :host {
        display: inline-block;
    }
    button{
        background-color: transparent;
        border:none;
        border-radius: 2px;
        position:relative;
        width: 25px;
        height: 25px;
        display: flex-inline;
        align-items: center;
        justify-content: center;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 19px 19px;
    }
    button:hover {
        border:1px solid white;
        outline:1px solid #5e5e5e;
    }
    button:active {
        border:1px solid #5e5e5e;
        outline:1px solid #000;
    }
    `;customElements.define("msn-img-button",Ae);let gs=class extends g{static get styles(){return x`
        ${k}
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
        `}render(){return _`
        <div style="display:flex;justify-content:center;align-items:center;padding: 20px 0px;">
            <msn-avatar src="avatars/chess.png"></msn-avatar>
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
        `}login(){window.location.replace("./friendlist.html")}};customElements.define("msn-login-wrapper",gs);const ys="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAJeUExURQAAAEuSOmu2WH/Ma3C+XUWMNlWFbpW2yqbB0p68zZGxxnmguGOMpVV+mFGcP7nS25a2yFZ/mS50IVKfP+Hz/YWnvihuHUmTOO/8/4Kjuh5bEjd9KKG3xdjn7pSzxmCFpBtVDiZmGWm1V0F2YZS2ylyBmViBmnSXv0Z9OzF1JlKXQUd/QXibslhxi0Vrh2eGY1+dUVSbQ2OoUmegX1uDm2WFnkhriGJtZoC3dFyQaVVzh1ZgW2aTYFJ5VU9iUG+zYFCLSD1JVENoP0yTPQAAAAAAADhvLgAcAAAAAAAAADBuJQsvAgAAAAAAAAAYABY5Dhc8DXXBYhY/DhM7DAAAAAAAAAUdAhw+FD1nMVF/RThhLhw7EwQSAAAAAJrei8byvKXhl2uqdvL5/f////v//+j4/dTq87rmrvr2++H02pbAvP7///T7/Of1+9zw+uDx+6bimOX239jy0Yi6s9zu+fr+//L7/e34++z5/XbCZKbolq3sm43VeWGRivj9/9jo7k2WPHbDY4jTdXzFa9Li7F2nSonRd3a8Zdro72KrUG23W12oTcPuuMjsvcHttLfmqrflrcztxcjwvKDrjrr0rb7ws8jvvs7wxcnwwMLwt8D2sJnjhZLhf5Lgf5rmhqbrlKvsnKTrk5/oi5fjg4zbd2WzU3/KboPMcY3WeZfihJvniZbjg5DdfojSdXzGaFmpR2SuUnO8YX7IbYvWd4vUd4TPc3bAZVWeQ0WPNGCvTT5+Lm64W3nCZoLMcIrSd4PLcYDOb3G8XzyFLVCePHO+YY7de5/si6b0kp3sipfmgn0v6tQAAABedFJOUwAGddjwt3+i3+rgq1kFe/70byDp/OFJ+v7mMPP9/flmA5r2pdjPXAIw5coRpsYgN8j7+LOv0SQg0dY0AZFoK+jODGr7SQGppyUJwtEyA1KXs/63lUgTUXqdqJt6TxL6ifLgAAAAAWJLR0RjXL4tqgAAAAd0SU1FB+cDDA8iGHVh3bkAAAEDSURBVBjTY2BgYGBkYmZhZWPn4OTi5uEF8hn44uITEvmTklNS0wQEgXwh4fSMzKzs5JzcvHwRUaCAmHhBYVFxSUppWXmFhCRQQEq6sqq6plZGti6lXk4eKKCg2NDY1KykrJLcoqqmDjJUQ7O1rV1LW6dDVw/EZdA3MOzs6jYyNjE1A/PNLXp6+/onTJxkaQXmW9tMnjJ12vQZM2fNtgUL2NnPmTtv/oKFixYvcXAECTgtXbZ8xcpVq9esXefswuDKwOC2fsPGTZvXbNm6bfsOdw9PBgavnbt279m7b/+Bg4cOe/v4MjD4+QccOXrs+ImTgUHBIa5gY0PDwiMio6JjYsE8AFEEUc042e/UAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIzLTAzLTEyVDE1OjM0OjI0KzAwOjAwMPcUSwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMy0wMy0xMlQxNTozNDoyNCswMDowMEGqrPcAAAAodEVYdGRhdGU6dGltZXN0YW1wADIwMjMtMDMtMTJUMTU6MzQ6MjQrMDA6MDAWv40oAAAAAElFTkSuQmCC";class dt extends g{render(){return _`
        <div id="header">
            <img src="${ys}" />
        </div>
        `}}dt.styles=x`
        :host {
        display: block;
        }
    `;customElements.define("msn-chat-view",dt);new Gt({signalingServerURL:"http://localhost:3000"});
