/**
my own internationalization tools. see language-es.js for an example. 
need jquery for fixing markup see fixMarkup()
@author: sgurin
*/

var langUtil = {
                
	addLocale : function(localeName, url, listener) {
		
		if(!langUtil.localeUrls) {
			langUtil.localeUrls={};
		}
		langUtil.localeUrls[localeName]=url;		
		
		langUtil._loadF(url, "js", listener);		
	},	
	
	registerLocale : function(localeName, data) {
//		alert("registerLocale: "+localeName+" - "+data);
		if(!langUtil.locales) {
			langUtil.locales={};
		}
		langUtil.locales[localeName]=data;
	},
	
	getString : function(localeName, key) {
//		alert("getString: "+localeName+" - "+key+"- "+(langUtil.locales[localeName])[key]);
		return (langUtil.locales[localeName])[key];
	},
	
	fixMarkup : function(localeName) {
		$(".translate").each(function(){
			var key = $(this).attr("translate-inner");
			if(key) {
				$(this).html(langUtil.getString(localeName, key));
			}
			key = $(this).attr("translate-value");
			if(key) {
				$(this).attr("value", langUtil.getString(localeName, key));
			}
		}); 
	},
	 
	/**loades a javascript file or css stylesheet in current document. 
	 *  Usage Examples:
	 * @param name : the url of the resource to load. I think there is no cross site problems here.
	 * @param type : "js" or "css". if "js" then a new javascript script will be loaded
	 * @param listener an optional function that will be called when loading of the resource is ready. 
	 * @author: sgurin
	 */
	_loadF : function(name, type, listener){
	 var el=null;
	 if (type=="js"){ 
	  el=document.createElement("script");
	  el.setAttribute("type","text/javascript");
	  if(listener) {
	   el.onreadystatechange = function () {
	    if (this.readyState == 'complete') listener();
	   };
	   el.onload=listener;
	  }
	  el.setAttribute("src", name);
	 }
	 else if (type=="css"){ 
	  el=document.createElement("link");  
	  el.setAttribute("rel", "stylesheet");
	  el.setAttribute("type", "text/css");
	  el.setAttribute("href", name);
	 }
	 document.body.appendChild(el);
	},
	
	"":""
	
}