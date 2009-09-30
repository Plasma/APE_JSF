var APE={Config:{identifier:"ape",init:true,frequency:0,scripts:[]},Client:function(a){if(a){this.core=a}}};APE.Client.prototype.eventProxy=[];APE.Client.prototype.fireEvent=function(c,b,a){this.core.fireEvent(c,b,a)};APE.Client.prototype.addEvent=function(d,c,a){var e=c.bind(this),b=this;if(this.core==undefined){this.eventProxy.push([d,c,a])}else{var b=this.core.addEvent(d,e,a);this.core.$originalEvents[d]=this.core.$originalEvents[d]||[];this.core.$originalEvents[d][c]=e;delete this.core.$originalEvents[d][c]}return b};APE.Client.prototype.onRaw=function(c,b,a){this.addEvent("raw_"+c,b,a)};APE.Client.prototype.onCmd=function(c,b,a){this.addEvent("cmd_"+c,b,a)};APE.Client.prototype.onError=function(c,b,a){this.addEvent("error_"+c,b,a)};APE.Client.prototype.writeCookie=function(a,b){document.cookie=a+"="+b+"; path=/"};APE.Client.prototype.readCookie=function(d,a){var f=d+"=";var b=document.cookie.split(";");for(var e=0;e<b.length;e++){var g=b[e];while(g.charAt(0)==" "){g=g.substring(1,g.length)}if(g.indexOf(f)==0){return g.substring(f.length,g.length)}}return null};APE.Client.prototype.load=function(config){config=config||{};config.transport=config.transport||APE.Config.transport||0;config.frequency=config.frequency||0;config.domain=config.domain||APE.Config.domain||document.domain;config.scripts=config.scripts||APE.Config.scripts;config.server=config.server||APE.Config.server;config.init=function(core){this.core=core;for(var i=0;i<this.eventProxy.length;i++){this.addEvent.apply(this,this.eventProxy[i])}}.bind(this);document.domain=config.domain;var cookie=unescape(this.readCookie("APE_Cookie"));var tmp=eval("("+cookie+")");if(tmp){config.frequency=tmp.frequency}else{cookie="{'frequency':0}"}var reg=new RegExp("'frequency':([ 0-9]+)","g");config.frequency++;cookie=cookie.replace(reg,"'frequency': "+config.frequency+"");this.writeCookie("APE_Cookie",cookie);var iframe=document.createElement("iframe");iframe.setAttribute("id","ape_"+config.identifier);iframe.style.display="none";iframe.style.position="absolute";iframe.style.left="-300px";iframe.style.top="-300px";APE.Config[config.identifier]=config;document.body.appendChild(iframe);if(config.transport==2){iframe.contentDocument.open();var theHtml="<html><head></head>";for(var i=0;i<config.scripts.length;i++){theHtml+='<script src="'+config.scripts[i]+'"><\/script>'}theHtml+="<body></body></html>";iframe.contentDocument.write(theHtml);iframe.contentDocument.close()}else{iframe.setAttribute("src","http://"+config.frequency+"."+config.server+'/?[{"cmd":"script","params":{"scripts":["'+config.scripts.join('","')+'"]}}]');iframe.contentWindow.location.href=iframe.getAttribute("src")}};if(Function.prototype.bind==null){Function.prototype.bind=function(b,a){return this.create({bind:b,"arguments":a})}}if(Function.prototype.create==null){Function.prototype.create=function(b){var a=this;b=b||{};return function(){var c=b.arguments||arguments;if(c&&!c.length){c=[c]}var d=function(){return a.apply(b.bind||null,c)};return d()}}};
/***
 * APE JSF Setup
 */
/*
APE.Config.baseUrl = 'http://yourdomain.com/APE_JSF/Source'; //APE JSF 
APE.Config.domain = 'yourdomain.com'; //Your domain, must be the same than the domain in aped.conf of your server
APE.Config.server = 'ape.yourdomain.com'; //APE server URL
*/
APE.Config.baseUrl = 'http://ape-git.dev.weelya.net/APE_JSF/Source'; //APE JSF 
APE.Config.domain = 'dev.weelya.net'; //Your domain, must be the same than the domain in aped.conf of your server
APE.Config.server = 'ape.ape-project.dev.weelya.net:6970'; //APE server URL

//Scripts to load for APE JSF
(function(){
	for (var i = 0; i < arguments.length; i++)
		APE.Config.scripts.push(APE.Config.baseUrl + '/' + arguments[i] + '.js');
})('mootools-core', 'Core/Events', 'Core/Core', 'Pipe/Pipe', 'Pipe/PipeProxy', 'Pipe/PipeMulti', 'Pipe/PipeSingle', 'Request/Request','Request/Request.Stack', 'Request/Request.CycledStack', 'Transport/Transport.longPolling','Transport/Transport.SSE', 'Transport/Transport.XHRStreaming', 'Transport/Transport.JSONP', 'Core/Utility');
/***
 * End of APE JSF setup
 */
