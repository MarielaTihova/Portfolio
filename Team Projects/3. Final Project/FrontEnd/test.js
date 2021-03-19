<!DOCTYPE html>
<html>
  <head>
<!--     <title>BootstrapBay</title> -->
    
	<!-- Required meta tags -->
    <meta charset="UTF-8">
<script>window.NREUM||(NREUM={});NREUM.info={"beacon":"bam.nr-data.net","errorBeacon":"bam.nr-data.net","licenseKey":"529b23c193","applicationID":"164241266","transactionName":"dAsLR0RbDllQE0sTS1IWFhxXVwFaQA8QOUhFCwNaWlE=","queueTime":4,"applicationTime":100,"agent":""}</script>
<script>(window.NREUM||(NREUM={})).loader_config={licenseKey:"529b23c193",applicationID:"164241266"};window.NREUM||(NREUM={}),__nr_require=function(e,n,t){function r(t){if(!n[t]){var i=n[t]={exports:{}};e[t][0].call(i.exports,function(n){var i=e[t][1][n];return r(i||n)},i,i.exports)}return n[t].exports}if("function"==typeof __nr_require)return __nr_require;for(var i=0;i<t.length;i++)r(t[i]);return r}({1:[function(e,n,t){function r(){}function i(e,n,t){return function(){return o(e,[u.now()].concat(c(arguments)),n?null:this,t),n?void 0:this}}var o=e("handle"),a=e(5),c=e(6),f=e("ee").get("tracer"),u=e("loader"),s=NREUM;"undefined"==typeof window.newrelic&&(newrelic=s);var d=["setPageViewName","setCustomAttribute","setErrorHandler","finished","addToTrace","inlineHit","addRelease"],p="api-",l=p+"ixn-";a(d,function(e,n){s[n]=i(p+n,!0,"api")}),s.addPageAction=i(p+"addPageAction",!0),s.setCurrentRouteName=i(p+"routeName",!0),n.exports=newrelic,s.interaction=function(){return(new r).get()};var m=r.prototype={createTracer:function(e,n){var t={},r=this,i="function"==typeof n;return o(l+"tracer",[u.now(),e,t],r),function(){if(f.emit((i?"":"no-")+"fn-start",[u.now(),r,i],t),i)try{return n.apply(this,arguments)}catch(e){throw f.emit("fn-err",[arguments,this,e],t),e}finally{f.emit("fn-end",[u.now()],t)}}}};a("actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get".split(","),function(e,n){m[n]=i(l+n)}),newrelic.noticeError=function(e,n){"string"==typeof e&&(e=new Error(e)),o("err",[e,u.now(),!1,n])}},{}],2:[function(e,n,t){function r(e,n){var t=e.getEntries();t.forEach(function(e){"first-paint"===e.name?d("timing",["fp",Math.floor(e.startTime)]):"first-contentful-paint"===e.name&&d("timing",["fcp",Math.floor(e.startTime)])})}function i(e,n){var t=e.getEntries();t.length>0&&d("lcp",[t[t.length-1]])}function o(e){e.getEntries().forEach(function(e){e.hadRecentInput||d("cls",[e])})}function a(e){if(e instanceof m&&!g){var n=Math.round(e.timeStamp),t={type:e.type};n<=p.now()?t.fid=p.now()-n:n>p.offset&&n<=Date.now()?(n-=p.offset,t.fid=p.now()-n):n=p.now(),g=!0,d("timing",["fi",n,t])}}function c(e){d("pageHide",[p.now(),e])}if(!("init"in NREUM&&"page_view_timing"in NREUM.init&&"enabled"in NREUM.init.page_view_timing&&NREUM.init.page_view_timing.enabled===!1)){var f,u,s,d=e("handle"),p=e("loader"),l=e(4),m=NREUM.o.EV;if("PerformanceObserver"in window&&"function"==typeof window.PerformanceObserver){f=new PerformanceObserver(r);try{f.observe({entryTypes:["paint"]})}catch(v){}u=new PerformanceObserver(i);try{u.observe({entryTypes:["largest-contentful-paint"]})}catch(v){}s=new PerformanceObserver(o);try{s.observe({type:"layout-shift",buffered:!0})}catch(v){}}if("addEventListener"in document){var g=!1,y=["click","keydown","mousedown","pointerdown","touchstart"];y.forEach(function(e){document.addEventListener(e,a,!1)})}l(c)}},{}],3:[function(e,n,t){function r(e,n){if(!i)return!1;if(e!==i)return!1;if(!n)return!0;if(!o)return!1;for(var t=o.split("."),r=n.split("."),a=0;a<r.length;a++)if(r[a]!==t[a])return!1;return!0}var i=null,o=null,a=/Version\/(\S+)\s+Safari/;if(navigator.userAgent){var c=navigator.userAgent,f=c.match(a);f&&c.indexOf("Chrome")===-1&&c.indexOf("Chromium")===-1&&(i="Safari",o=f[1])}n.exports={agent:i,version:o,match:r}},{}],4:[function(e,n,t){function r(e){function n(){e(a&&document[a]?document[a]:document[i]?"hidden":"visible")}"addEventListener"in document&&o&&document.addEventListener(o,n,!1)}n.exports=r;var i,o,a;"undefined"!=typeof document.hidden?(i="hidden",o="visibilitychange",a="visibilityState"):"undefined"!=typeof document.msHidden?(i="msHidden",o="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(i="webkitHidden",o="webkitvisibilitychange",a="webkitVisibilityState")},{}],5:[function(e,n,t){function r(e,n){var t=[],r="",o=0;for(r in e)i.call(e,r)&&(t[o]=n(r,e[r]),o+=1);return t}var i=Object.prototype.hasOwnProperty;n.exports=r},{}],6:[function(e,n,t){function r(e,n,t){n||(n=0),"undefined"==typeof t&&(t=e?e.length:0);for(var r=-1,i=t-n||0,o=Array(i<0?0:i);++r<i;)o[r]=e[n+r];return o}n.exports=r},{}],7:[function(e,n,t){n.exports={exists:"undefined"!=typeof window.performance&&window.performance.timing&&"undefined"!=typeof window.performance.timing.navigationStart}},{}],ee:[function(e,n,t){function r(){}function i(e){function n(e){return e&&e instanceof r?e:e?f(e,c,o):o()}function t(t,r,i,o){if(!p.aborted||o){e&&e(t,r,i);for(var a=n(i),c=v(t),f=c.length,u=0;u<f;u++)c[u].apply(a,r);var d=s[w[t]];return d&&d.push([b,t,r,a]),a}}function l(e,n){h[e]=v(e).concat(n)}function m(e,n){var t=h[e];if(t)for(var r=0;r<t.length;r++)t[r]===n&&t.splice(r,1)}function v(e){return h[e]||[]}function g(e){return d[e]=d[e]||i(t)}function y(e,n){u(e,function(e,t){n=n||"feature",w[t]=n,n in s||(s[n]=[])})}var h={},w={},b={on:l,addEventListener:l,removeEventListener:m,emit:t,get:g,listeners:v,context:n,buffer:y,abort:a,aborted:!1};return b}function o(){return new r}function a(){(s.api||s.feature)&&(p.aborted=!0,s=p.backlog={})}var c="nr@context",f=e("gos"),u=e(5),s={},d={},p=n.exports=i();p.backlog=s},{}],gos:[function(e,n,t){function r(e,n,t){if(i.call(e,n))return e[n];var r=t();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(e,n,{value:r,writable:!0,enumerable:!1}),r}catch(o){}return e[n]=r,r}var i=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(e,n,t){function r(e,n,t,r){i.buffer([e],r),i.emit(e,n,t)}var i=e("ee").get("handle");n.exports=r,r.ee=i},{}],id:[function(e,n,t){function r(e){var n=typeof e;return!e||"object"!==n&&"function"!==n?-1:e===window?0:a(e,o,function(){return i++})}var i=1,o="nr@id",a=e("gos");n.exports=r},{}],loader:[function(e,n,t){function r(){if(!x++){var e=E.info=NREUM.info,n=l.getElementsByTagName("script")[0];if(setTimeout(s.abort,3e4),!(e&&e.licenseKey&&e.applicationID&&n))return s.abort();u(w,function(n,t){e[n]||(e[n]=t)});var t=a();f("mark",["onload",t+E.offset],null,"api"),f("timing",["load",t]);var r=l.createElement("script");r.src="https://"+e.agent,n.parentNode.insertBefore(r,n)}}function i(){"complete"===l.readyState&&o()}function o(){f("mark",["domContent",a()+E.offset],null,"api")}function a(){return O.exists&&performance.now?Math.round(performance.now()):(c=Math.max((new Date).getTime(),c))-E.offset}var c=(new Date).getTime(),f=e("handle"),u=e(5),s=e("ee"),d=e(3),p=window,l=p.document,m="addEventListener",v="attachEvent",g=p.XMLHttpRequest,y=g&&g.prototype;NREUM.o={ST:setTimeout,SI:p.setImmediate,CT:clearTimeout,XHR:g,REQ:p.Request,EV:p.Event,PR:p.Promise,MO:p.MutationObserver};var h=""+location,w={beacon:"bam.nr-data.net",errorBeacon:"bam.nr-data.net",agent:"js-agent.newrelic.com/nr-1177.min.js"},b=g&&y&&y[m]&&!/CriOS/.test(navigator.userAgent),E=n.exports={offset:c,now:a,origin:h,features:{},xhrWrappable:b,userAgent:d};e(1),e(2),l[m]?(l[m]("DOMContentLoaded",o,!1),p[m]("load",r,!1)):(l[v]("onreadystatechange",i),p[v]("onload",r)),f("mark",["firstbyte",c],null,"api");var x=0,O=e(7)},{}],"wrap-function":[function(e,n,t){function r(e){return!(e&&e instanceof Function&&e.apply&&!e[a])}var i=e("ee"),o=e(6),a="nr@original",c=Object.prototype.hasOwnProperty,f=!1;n.exports=function(e,n){function t(e,n,t,i){function nrWrapper(){var r,a,c,f;try{a=this,r=o(arguments),c="function"==typeof t?t(r,a):t||{}}catch(u){p([u,"",[r,a,i],c])}s(n+"start",[r,a,i],c);try{return f=e.apply(a,r)}catch(d){throw s(n+"err",[r,a,d],c),d}finally{s(n+"end",[r,a,f],c)}}return r(e)?e:(n||(n=""),nrWrapper[a]=e,d(e,nrWrapper),nrWrapper)}function u(e,n,i,o){i||(i="");var a,c,f,u="-"===i.charAt(0);for(f=0;f<n.length;f++)c=n[f],a=e[c],r(a)||(e[c]=t(a,u?c+i:i,o,c))}function s(t,r,i){if(!f||n){var o=f;f=!0;try{e.emit(t,r,i,n)}catch(a){p([a,t,r,i])}f=o}}function d(e,n){if(Object.defineProperty&&Object.keys)try{var t=Object.keys(e);return t.forEach(function(t){Object.defineProperty(n,t,{get:function(){return e[t]},set:function(n){return e[t]=n,n}})}),n}catch(r){p([r])}for(var i in e)c.call(e,i)&&(n[i]=e[i]);return n}function p(n){try{e.emit("internal-error",n)}catch(t){}}return e||(e=i),t.inPlace=u,t.flag=a,t}},{}]},{},["loader"]);</script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google-site-verification" content="2ab_qmT25aj0bKn26aieOG1vuNtjTsUi7kSEpal6Zas" />

    <link rel="shortcut icon" type="image/x-icon" href="/assets/favicon-e7a08f1c8dda62173836173c67e39c509f835c648e3d9c6b46a0dd434fd00253.ico" />
    <title>BootstrapBay</title>
    <meta name="csrf-param" content="authenticity_token" />
<meta name="csrf-token" content="tHE//1TYnbyI7duF+ej1C0e6GrDeW6TVhetTc0VUkhjjdpSey8PAm39fNA4sNbaQKGBmsEXwqddK4zrL1+In+g==" />
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css">
    <link rel="stylesheet" media="all" href="/assets/application-b7366a30d6f8e3ae07e64f37612e0e8b2dc2a6eebf7d48dedac34a6d55d57420.css" data-turbolinks-track="reload" />
    <script src="/assets/application-7a986b197ea091722ae4700b374dad29e6b7b691af7f4a226edd318b13778b5b.js" data-turbolinks-track="reload"></script>
  </head>
    
  <body >
			

		

    <nav class="navbar navbar-expand-lg navbar-light navbar-transparent">
	<div class="container">
	  <a class="navbar-brand" href="/" itemprop="url">
		  <img src="/white_logo.png" alt="BootstrapBay - Bootstrap Themes & Templates" itemprop="logo">
	  </a>
	  
	  <button class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<!-- 	    <span class="navbar-toggler-icon"></span> -->
	    <i class="zmdi zmdi-menu"></i>
	  </button>
	
	  <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav">
		      	<li class="nav-item dropdown">
			        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			          Categories
			        </a>
			        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
			            <a class="dropdown-item" href="/themes">All Categories</a>
			            <a class="dropdown-item" href="/themes?type=free">Free Themes</a>
			            <a class="dropdown-item" href="/themes?type=premium">Premium Themes</a>
			            <div class="dropdown-divider"></div>
			                <a class="dropdown-item" href="/themes?category=business-corporate" tabindex="-1" role="menuitem">Business &amp; Corporate</a>
			                <a class="dropdown-item" href="/themes?category=admin-dashboard" tabindex="-1" role="menuitem">Admin &amp; Dashboard</a>
			                <a class="dropdown-item" href="/themes?category=profile-portfolio" tabindex="-1" role="menuitem">Profile &amp; Portfolio</a>
			                <a class="dropdown-item" href="/themes?category=blog-magazine" tabindex="-1" role="menuitem">Blog &amp; Magazine</a>
			                <a class="dropdown-item" href="/themes?category=e-commerce" tabindex="-1" role="menuitem">E-Commerce</a>
			                <a class="dropdown-item" href="/themes?category=landing-page" tabindex="-1" role="menuitem">Landing Page</a>
			                <a class="dropdown-item" href="/themes?category=resume-cv" tabindex="-1" role="menuitem">Resume &amp; CV</a>
			                <a class="dropdown-item" href="/themes?category=misc" tabindex="-1" role="menuitem">Misc</a>
			        </div>
                </li>
		        <li class="nav-item">
		        	<a class="nav-link" href="/sell">Sell</a>
		        </li>
		        <li class="nav-item">
		        	<a class="nav-link" href="https://bootstrapbay.com/blog/">Blog</a>
                </li>
		    </ul>
		    
		    <div class="d-flex justify-content-center justify-content-lg-start">
			    <form class="form-inline my-2 my-lg-0 search-form" action="/themes" accept-charset="UTF-8" method="get"><input name="utf8" type="hidden" value="&#x2713;" />
	                <input type="text" name="q" id="q" value="" class="form-control white-input mr-sm-2" placeholder="search here for your next theme" />
	                <button type="submit" class="btn btn-success btn-icon my-2 my-sm-2">
	                	<i class="zmdi zmdi-search"></i>
</button></form>		    </div>
		    
			<div class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle " data-toggle="dropdown" role="button" href="#"><span>dimitar17</span></a>
                        <div class="dropdown-menu" role="menu">
                            <a class="dropdown-item" href="/account" tabindex="-1" role="menuitem">Dashboard</a>
                            <a class="dropdown-item" href="/account/profile" tabindex="-1" role="menuitem">Edit Profile</a>
                            <a class="dropdown-item" href="/account/downloads" tabindex="-1" role="menuitem">Downloads</a>
                            <a class="dropdown-item" href="/account/earnings" tabindex="-1" role="menuitem">Earnings &amp; Payouts</a>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/account/upload-theme" tabindex="-1" role="menuitem">Upload Theme</a>
                            <a class="dropdown-item" href="/account/manage-themes" tabindex="-1" role="menuitem">Manage Themes</a>
                            
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/logout" tabindex="-1" role="menuitem">Log Out</a>
                        </ul>
                    </li>
			</div>
	  </div>
	</div>
</nav>
<!-- Login Modal -->
<div class="modal fade" id="log-in" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-title">
                    <h4 class="modal-title">Log In</h4>
                    <p>Enter your details below</p>
                </div>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
                </button>
            </div>
            <div id="notice" class="alert alert-danger d-none">
            </div>
            

            <div class="modal-body">

                <form action="/login" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="lTdNCipEhkJiFkcsjRXoUjp/GuQD8C3J3G/SUI6y6mFI1KbEa6/m7tU/85OlY8h34wReNOy2hUef/Rk/n01ffw==" />
				<input type="hidden" name="authenticity_token" id="authenticity_token" value="tmHQRrlvfvPDk8o7SjoDj/hGpmFVpXjnkFZAaAivXhrhZnsnJnQj1DQhJbCf50AUl5zaYc4OdeVfXinQmhnr+A==" />
                    <label> Username or Email </label>
                    <input class="form-control" placeholder="johndoe" type="text" name="session[identity]" id="session_identity" />
                    
										<label> Password </label>
                    <div class="input-group">
                        <input id="log-password" class="form-control" placeholder="Enter your password" type="password" name="session[password]" />
                        <div class="input-group-append toggle-password" data-password="log-password">
                            <span class="input-group-text">
                                <i class="zmdi zmdi-eye-off"></i>
                            </span>
                        </div>
                    </div>	 

                    <div class="d-flex justify-content-end">
                        
                        <a class="forgot-password" href="#a" data-toggle="modal" data-target="#recover-password" data-untoggle="#log-in">Forgot password?</a>
                    </div>

                    <input value="https://bootstrapbay.com/account" type="hidden" name="session[last_page]" id="session_last_page" />				

                    <input type="submit" name="commit" value="Log in" class="btn btn-success btn-submit" data-disable-with="Log in" />
</form>            </div>
            <div class="modal-footer d-flex justify-content-center text-center">
                <p>Don't have a BootstrapBay account yet? <a href="#a" data-toggle="modal" data-target="#sign-up" data-untoggle="#log-in">Create Account</a>.
                <br />
                <a href="/faq#faq-cat-1-sub-2" target="_blank">Why do I need an account?</a></p>
            </div>
        </div>
    </div>
</div>

<!-- Signup Modal -->
<div class="modal fade" id="sign-up" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
	      <div class="modal-title">
	        <h4 class="modal-title">Create your account</h4>
	        <p>Enter your details below</p>
	      </div>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          	<span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
		  </button>
      </div>
	  <div id="signup-notice" class="alert alert-danger d-none"></div>
	  

      <div class="modal-body">

          <form action="/sign-up" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="fz+gqc9Cq/Oe/qR72+Y0kC7RhbByclL/Stj7KuNbEaXNIassRSTePRSLBzX7SXvhOnwcZO1qCKdCPR1EcHC8jg==" />
            <input type="hidden" name="authenticity_token" id="authenticity_token" value="aeNnmLnr1ZctGS+ZOPmQuXfnOOkqbtcK7x9Pcm+wOh8+5Mz5JvCIsNqrwBLtJNMiGD1E6bHF2gggFybK/QaP/Q==" />
            <label> Username </label>
            <input class="form-control" placeholder="johndoe" type="text" name="user[username]" id="user_username" />
            
            <label> Email </label>
            <input id="email" class="form-control" placeholder="jonh@doe.com" type="text" name="user[email]" />
            
            <label> Password </label> 
			<div class="input-group">
			  <input id="password" class="form-control" placeholder="Enter your password" type="password" name="user[password]" />
			  <div class="input-group-append toggle-password" data-password="password">
			    <span class="input-group-text">
			    	<i class="zmdi zmdi-eye-off"></i>
			    </span>
			  </div>
			</div> 
			
            <label> Confirm password </label>
            <div class="input-group">
			  <input id="confirm-password" class="form-control" placeholder="Confirm your password" type="password" name="user[password_confirmation]" />
			  <div class="input-group-append toggle-password" data-password="confirm-password">
			    <span class="input-group-text">
			    	<i class="zmdi zmdi-eye-off"></i>
			    </span>
			  </div>
			</div>
            
            <div class="form-group">
                <div class="checkbox newsletter">
                    <label>
                        <input type="checkbox" name="newsletter" id="newsletter" value="1"> I'd like to hear about promos, new templates, and much more!
                    </label>
                </div>
            </div>
            <input type="submit" name="commit" value="Create account" id="signup_btn" class="btn btn-success signupBtn" data-disable-with="Create account" />
            <label class="terms">
            	By clicking Create Account, you have read and agree to the <a href="/terms" target="_blank">Terms &amp; Conditions</a> and <a href="/privacy"  target="_blank">Privacy Policy</a>.
            </label>
</form>      </div>
      <div class="modal-footer d-flex justify-content-center">
	  	<p>Already have an account? <a href="#a" data-toggle="modal" data-target="#log-in" data-untoggle="#sign-up">Log In</a>.</p>
      </div>
    </div>
  </div>
</div>

<!-- Recover Password Modal -->
<div class="modal fade" id="recover-password" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
	      <div class="modal-title">
	        <h4 class="modal-title">Recover Password</h4>
	        <p>Please enter the email address you provided during registration.</p>
	      </div>
		  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          	<span aria-hidden="true"><i class="zmdi zmdi-close"></i></span>
		  </button>
      </div>
      

      <div class="modal-body">
            <form action="https://bootstrapbay.com/reset-password-send" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="OXXG73xiXDTMuUduA/Cy94bsQXTZ9BMNXYrlGS/kSBXwvg/4GAVXeO39I6KcpRretKZw+/fa7qNuq+oHBFVJhQ==" />
            	<label>Email</label>
                <input class="form-control" placeholder="john@doe.com" type="text" name="user[email]" id="user_email" /> 
                <input type="submit" name="commit" value="Request reset link" class="btn btn-success btn-submit" data-disable-with="Request reset link" />  
</form>      </div>
      <div class="modal-footer d-flex justify-content-center">
	  	<p><a href="#a" data-toggle="modal" data-target="#log-in" data-untoggle="#recover-password">Back to login</a>.</p>
      </div>
    </div>
  </div>
</div>

    
    <div class="mini-header header-author" style="background-image: url('/purple_theme/mini_header.jpg');">
	<div class="container">
		<div class="d-flex justify-content-between">
			<div class="title">
				<h2>Edit Profile</h2>
			</div>
			<div class="live">
				<a class="btn btn-lg btn-outline-light" href=/user/dimitar17 target="_blank">View profile</a>	
			</div>
		</div>
	</div>
</div>



<div class="profile container">
	<div class="row">
		<div class="d-none d-md-block col-md-3">
						
<div class="sidebar">
	<ul class="list-unstyled">
			<li>
			    <a href="/account" class=>
				  Dashboard
				</a>
	  		</li>
			<li>
			    <a href="/account/profile" class=active>
				  Edit Profile
				</a>
	  		</li>
			<li>
			    <a href="/account/downloads" class=>
				  Downloads
				</a>
	  		</li>
			<li>
			    <a href="/account/earnings" class=>
				  Earnings &amp; Payouts
				</a>
	  		</li>
	  			<hr />
			<li>
			    <a href="/account/upload-theme" class=>
				  Upload Theme
				</a>
	  		</li>
			<li>
			    <a href="/account/manage-themes" class=>
				  Manage Themes
				</a>
	  		</li>
	</ul>
</div>
		</div>
		<div class="col-12 col-md-9 dashboard-content">
            


            <h6> Edit details </h6>
			<div class="edit-details">
	            <form enctype="multipart/form-data" action="https://bootstrapbay.com/account/profile/edit" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="7+fwZgzJEzWmmIhJTDZd/N+HxJBA7FxdgejxmwSqFPIt5GKWXguwqx+oW3HCCeLNb7cpsbJw5Ph2Ff3rfoqrWg==" />
	            	<div class="row">
		            	<div class="col-12 col-md-4 offset-md-4">	
				            <div class="fileinput fileinput-new d-flex" data-provides="fileinput">
							  	<div class="fileinput-new thumbnail">
							    	<img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaybox/uploads/user/profile_pic/defaultProfile.jpg" alt="Defaultprofile" />
							  	</div>
							  	<div class="fileinput-preview fileinput-exists thumbnail">
								  	<img src="https://s3.eu-central-1.amazonaws.com/bootstrapbaybox/uploads/user/profile_pic/defaultProfile.jpg" alt="Defaultprofile" />
							  	</div>
							  	<div>
								  	<label>Member</label>
							   	 	<div class="btn btn-success btn-file">
								    	<div class="fileinput-new">Select image</div>
								    	<div class="fileinput-exists">Change</div>
								    	<input type="file" name="user[profile_pic]" id="user_profile_pic" />
									</div>
									<a href="#" class="btn btn-primary fileinput-exists" data-dismiss="fileinput">Remove</a>
							  	</div>
							</div>
		            	</div>
	            	</div>
					<div class="row">
						<div class="col-12 col-md-6">
							<label>Email Address</label>
							<input type="text" class="form-control" name="" placeholder="Your Email…" value="dimitar.toneff@gmail.com" disabled>
							<div class="d-flex info-with-icon">
								<div class="icon text-orange">
									<i class="zmdi zmdi-info-outline"></i>
								</div>
								<div class="message">
									If you want to change your email address or deactivate your account, please contact support.
								</div>
							</div>	
						</div>
						<div class="col-12 col-md-6">
							<label> Username </label>
							<input type="text" class="form-control" name="" placeholder="Your Username..." value="dimitar17" disabled>
						</div>
					</div>
	            	<div class="row">
		            	<div class="col-12 col-md-4">
			                <label> Display name </label>
			                <input class="form-control" placeholder="John Doe" value="" type="text" name="user[full_name]" id="user_full_name" />
		            	</div>
		            	<div class="col-12 col-md-4">
			                <label> Location </label>
			                <input class="form-control" placeholder="Somewhere Nice" value="" type="text" name="user[location]" id="user_location" />
		            	</div>
		            	<div class="col-12 col-md-4">
			                <label> Website </label>
			                <input class="form-control" placeholder="www.johndoe.com" value="" type="text" name="user[website]" id="user_website" />	 
		            	</div>           	
	            	</div>
	
                    <label> About </label>
                    <textarea id="about" class="form-control" placeholder="Write a little about yourself and/or your company." name="user[about]"></textarea>
                    <div class="row">
                        <div class="col-12 col-md-6">
                            <div class="d-flex info-with-icon">
                                <div class="icon text-orange">
                                    <i class="zmdi zmdi-info-outline"></i>
                                </div>
                                <div class="message">
                                    Adding details about you and your business will increase the trust that future customers invest in you.
                                </div>
                            </div>
                        </div>	
                    </div>	

                    <div class="row">
                        <div class="custom-control custom-checkbox mt-2">
                            <input name="user[wants_reply_notification]" type="hidden" value="0" /><input class="custom-control-input" id="wants_reply_notification" type="checkbox" value="1" checked="checked" name="user[wants_reply_notification]" />
                            <label class="custom-control-label" for="wants_reply_notification">
                                I want to receive email notifications when someone replies to my comments.
                            </label>
                        </div>
                    </div>

	                <div class="row">
		                <div class="col-12 col-md-4">
			                <label> Twitter </label>
			                
			  			    <div class="input-group">
							  <input class="form-control" placeholder="Twitter username" value="" type="text" name="user[twitter]" id="user_twitter" />
							  <div class="input-group-append social">
							    <span class="input-group-text text-twitter">
							    	<i class="zmdi zmdi-twitter"></i>
							    </span>
							  </div>
							</div>
	                	</div>
	                	<div class="col-12 col-md-4">
			                <label> Facebook </label>
			                <div class="input-group">
							  <input class="form-control" placeholder="Facebook page or profile ID" value="" type="text" name="user[facebook]" id="user_facebook" />
							  <div class="input-group-append social">
							    <span class="input-group-text text-facebook">
							    	<i class="zmdi zmdi-facebook"></i>
							    </span>
							  </div>
							</div>
	                	</div>
	                	<div class="col-12 col-md-4">
	<!-- 	                	TODO: schimbat Google în Dribble -->
			                <label> Google+ </label>
							<div class="input-group">
							  <input class="form-control" placeholder="Google+ account ID" value="" type="text" name="user[google]" id="user_google" />
							  <div class="input-group-append social">
							    <span class="input-group-text text-google">
							    	<i class="zmdi zmdi-google-old"></i>
							    </span>
							  </div>
							</div>
	                	</div>
	                </div>
	                <div class="d-flex justify-content-end">
	                	<input type="submit" name="commit" value="Save changes" class="btn btn-success" data-disable-with="Save changes" />
	                </div>
</form>			</div>
            <div class="change-password">
	            <h6> Change your password </h6>
	
	            <form action="https://bootstrapbay.com/account/profile/edit" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="eo4E19kqScEvrYwVG64ZZYhiayMsI3bu3aoJ66FB6wa4jZYni+jqX5adXy2VkaZUOFKGAt6/zksqVwWb22FUrg==" />
	            	<div class="row">
		            	<div class="col-12 col-md-4">
			                <label> Current password </label>
			                <div class="input-group">
							  <input class="form-control" placeholder="..." id="current" type="password" name="change_password[current_password]" />
							  <div class="input-group-append toggle-password" data-password="current">
							    <span class="input-group-text">
							    	<i class="zmdi zmdi-eye-off"></i>
							    </span>
							  </div>
							</div>
		            	</div>
		            	<div class="col-12 col-md-4">
			                <label> New password </label>
							<div class="input-group">
							  <input class="form-control" placeholder="..." id="new" type="password" name="change_password[new_password]" />
							  <div class="input-group-append toggle-password" data-password="new">
							    <span class="input-group-text">
							    	<i class="zmdi zmdi-eye-off"></i>
							    </span>
							  </div>
							</div>
		            	</div>
		            	<div class="col-12 col-md-4">
			                <label> Confirm new password </label>
							<div class="input-group">
							  <input class="form-control" placeholder="..." id="confirm-new" type="password" name="change_password[confirm_new_password]" />
							  <div class="input-group-append toggle-password" data-password="confirm-new">
							    <span class="input-group-text">
							    	<i class="zmdi zmdi-eye-off"></i>
							    </span>
							  </div>
							</div>      
		            	</div>
	            	</div>
	            	<div class="d-flex justify-content-end">
	                	<input type="submit" name="commit" value="Change password" class="btn btn-primary" data-disable-with="Change password" />
	            	</div>
</form>            </div>
		</div>
	</div>
</div>


<script type="text/javascript">
    //TODO: validate picture before upload
	$(document).ready(function() {

		$("#about").markdown({
			iconlibrary: 'fa'
		});

		$("#website").blur(function() {
			var https = $("#website").val().substring(0, 8);
			var http = $("#website").val().substring(0, 7);
			if (https === 'https://' || https == ''){
				return false;
			}
			else if (http === 'http://'){
				return false;
			}
			else {
				var cur_val = $("#website").val();
				$("#website").val('http://' + cur_val);
			}
		});

		$("#submit_form").click(function(){
			$("#submit_form").button("loading");
		});

/*
		$("#profile_form").validate({
			rules: {
				website: {
					url: true
				}
			},
			invalidHandler: function(form, validator) {
				var errors = validator.numberOfInvalids();
				if (errors) {
					validator.errorList[0].element.focus();
					$('#submit_form').button('reset');
					$(".main_alert").html('<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Please check the form for errors.</div>');
					$(".main_alert").show();
					$('html, body').animate({scrollTop: 0}, 500);
				}
			},
			submitHandler: function(form)
			{
			    var form_data = $("#profile_form").serialize();
        		//event.preventDefault();
        		$.ajax({
        			type: "POST",
        			url: "/account/profile",
        			data: form_data,
        			dataType: 'json',
        			success:function(data){
        			    $('#submit_form').button('reset');
        				$('#token').val(data.a);
        				$(".main_alert").html(data.b);
						$(".main_alert").show();
						$('html, body').animate({scrollTop: 0}, 500);
        			}
        		});
		    }
		});
*/

	});
</script>
    
    
    <footer class="footer" style="background-image: url('/purple_theme/footer.jpg');">
	<div class="container">
		<div class="row">
			<div class="col-6 col-md-2">
				<h6>Company</h6>
				<ul class="list-unstyled">
					<li><a href="http://bootstrapbay.com/blog/">Blog</a></li>
					<li><a href="/about">About Us</a></li>
					<li><a href="/feed">RSS Feed</a></li>
				</ul>
			</div>
			<div class="col-6 col-md-2">
				<h6>Help &amp; Support</h6>
				<ul class="list-unstyled">
					<li><a href="/faq">FAQ</a></li>
					<li><a href="/submission-guidelines">Submission Guidelines</a></li>
					<li><a href="/payment-rates">Payment Rates</a></li>
					<li><a href="/contact-support">Contact &amp; Support</a></li>
				</ul>
			</div>
			<div class="col-6 col-md-2">
				<h6>Resources</h6>
				<ul class="list-unstyled">
					<li><a href="http://bootstrapbay.com/blog/bootstrap-resources/">Resource List</a></li>
					<li><a href="https://stocksnap.io" target="_blank">Free Stock Photos</a></li>
					<li><a href="https://snappa.io" target="_blank">Graphic Design Tool</a></li>
                    <li><a href="https://www.instamobile.io/?source=2" target="_blank">React Native Templates</a></li>
                    <li><a href="https://themeisle.com/" target="_blank">Wordpress Themes</a></li>
				</ul>
			</div>
			<div class="col-6 col-md-2">
				<h6>Legal</h6>
				<ul class="list-unstyled">
					<li><a href="/licenses">Licenses</a></li>
					<li><a href="/terms">Terms &amp; Conditions</a></li>
					<li><a href="/privacy">Privacy Policy</a></li>
				</ul>				
			</div>
			<div class="col-12 col-md-4">
				<h6>Join our community</h6>	
				
		        <form class="form-subscribe form-inline w-100" action="/subscribe" accept-charset="UTF-8" method="post"><input name="utf8" type="hidden" value="&#x2713;" /><input type="hidden" name="authenticity_token" value="7AxJgBaZ6j+7a5XaM/3iHJ5o22wA5PvO6uiGQyW7CRhQpK71KxeD2B2lL/urMjheg5x90BnBxWZUpFSFq1fRgw==" />
		            <label class="sr-only"> Email </label>
		            <input type="email" name="subscribe_email" id="subscribe_email" class="form-control white-input mb-2 mr-sm-2 w-80" placeholder="Your Email…" />
					<input type="submit" name="commit" value="Join" class="btn btn-success mb-2" data-disable-with="Join" />
</form>	        				
				<div class="social d-flex justify-content-between">
					<div class="title">
						<h6>Follow us</h6>
					</div>
					<div class="networks">
						<a itemprop="sameAs" href="https://twitter.com/bootstrapbay" target="_blank"> <i class="zmdi zmdi-twitter"></i> </a>
						<a itemprop="sameAs" href="https://ro-ro.facebook.com/bootstrapbayofficial/" target="_blank"> <i class="zmdi zmdi-facebook-box"></i> </a>
						<a itemprop="sameAs" href="https://www.linkedin.com/company/bootstrapbay" target="_blank"> <i class="zmdi zmdi-linkedin"></i> </a>
						<a itemprop="sameAs" href="https://dribbble.com/bootstrapbay" target="_blank"> <i class="zmdi zmdi-dribbble"></i> </a>
						<a itemprop="sameAs" href="http://www.youtube.com/user/bootstrapbayofficial" target="_blank"> <i class="zmdi zmdi-youtube"></i> </a>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="row no-gutters">
			<div class="col-7 col-md-4 sell d-flex">
				<div class="sell-btn">
					<a href="/sell" class="btn btn-success">
						Sell Templates
					</a>
				</div>
				<p class="info d-none d-md-block">
					Earn 55% and more on all sales
				</p>
			</div>
			<div class="col-5 col-md-4 affiliate d-flex">
				<div class="aff-btn">
					<a href="/affiliate" class="btn btn-primary">
						Affiliate
					</a>
				</div>
				<p class="info d-none d-md-block">
					Earn 30% on all sales you refer
				</p>
			</div>
			<div class="col-12 col-md-4">
				<div class="d-flex flex-row justify-content-between">
					<div class="fact">
						<h6>55,954</h6>
						<p>Members</p>
					</div>
					<div class="fact">
						<h6>13,125</h6>
						<p>Downloads</p>
					</div>
					<div class="fact">
						<h6>107</h6>
						<p>Authors</p>
					</div>
					<div class="fact">
						<h6>302</h6>
						<p>Themes</p>
					</div>
				</div>
			</div>
		</div>
		<hr>
		<div class="copyright d-flex justify-content-between">
			<div class="credits" itemprop="name">
				&copy; 2020 BootstrapBay. All rights reserved.
			</div>
			<div class="payment">
				<i class="zmdi zmdi-lock-outline"></i> Secure Payment: 
				<img class="img paypal-logo" src="/purple_theme/paypal.png" alt="Paypal" />
				<img class="img fastspring-logo" src="/purple_theme/fastspring.png" alt="Fastspring" />
			</div>
		</div>
	</div>
</footer>

<!-- google analytics tracking code -->
<script>
	(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	ga('create', 'UA-48244800-1', 'bootstrapbay.com');
	ga('send', 'pageview');
	
	ga('require', 'linker');
	ga('linker:autoLink', ['bootstrapbay.onfastspring.com','bootstrapbay.test.onfastspring.com']);

</script>

<!-- fastspring affiliates tracking code -->
<script type="text/javascript"> (function(a,b,c,d,e,f,g){e['ire_o']=c;e[c]= e[c]||function(){(e[c].a=e[c].a||[]).push(arguments)};f=d.createElement(b);g=d.getElementsByTagName(b)[0];f.async=1;f.src=a;g.parentNode.insertBefore(f,g);})('//d.impactradius-event.com/A1214463-fc21-4586-9938-4459f16d3cc31.js','script','ire',document,window); </script>


<!-- Facebook Pixel Code -->
<!--
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '1506685732808272');
  fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1506685732808272&ev=PageView&noscript=1"
/></noscript>
-->
<!-- End Facebook Pixel Code -->

    
  </body>
</html>
