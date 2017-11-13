/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2017 OA Wu Design
 * @license     http://creativecommons.org/licenses/by-nc/2.0/tw/
 */
// !function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.fn.extend({OAdropUploadImg:function(b){var c={},d=function(b){e(b),a(this).attr("data-loading","讀取中..").removeClass("no")},e=function(b){a(this).removeAttr("data-loading").addClass("no"),b.attr("src","")},f=function(a,b,c){var d=new Image;d.src=a.target.result,d.onload=function(){_vmxw=1024;var a=document.createElement("canvas");6==c||8==c?(a.height=d.width,a.width=d.height):(a.width=d.width,a.height=d.height),Math.max(a.width,a.height)>_vmxw&&(a.width>a.height?(a.height=_vmxw/a.width*a.height,a.width=_vmxw):(a.width=_vmxw/a.height*a.width,a.height=_vmxw)),3==c?(a.getContext("2d").transform(-1,0,0,-1,a.width,a.height),a.getContext("2d").drawImage(d,0,0,a.width,a.height)):6==c?(a.getContext("2d").transform(0,1,-1,0,a.width,0),a.getContext("2d").drawImage(d,0,0,a.height,a.width)):8==c?(a.getContext("2d").transform(0,-1,1,0,0,a.height),a.getContext("2d").drawImage(d,0,0,a.height,a.width)):a.getContext("2d").drawImage(d,0,0,a.width,a.height),b(a)}},g=function(a,b){var c=new FileReader;c.onload=function(a){var c=new DataView(a.target.result);if(65496!=c.getUint16(0,!1))return f(this,b,-2);for(var d=c.byteLength,e=2;e<d;){var g=c.getUint16(e,!1);if(e+=2,65505==g){if(1165519206!=c.getUint32(e+=2,!1))return f(this,b,-1);var h=18761==c.getUint16(e+=6,!1);e+=c.getUint32(e+4,h);var i=c.getUint16(e,h);e+=2;for(var j=0;j<i;j++)if(274==c.getUint16(e+12*j,h))return f(this,b,c.getUint16(e+12*j+8,h))}else{if(65280!=(65280&g))break;e+=c.getUint16(e,!1)}}return f(this,b,-1)}.bind(this),c.readAsArrayBuffer(a.slice(0,65536))},h=function(b,c){var d=a(this),e=new FileReader;e.onload=function(a){g.bind(a,c,function(a){b.attr("src",a.toDataURL()).load(function(){d.removeAttr("data-loading")})})()},e.readAsDataURL(c)},i=function(b){var c=a(this),f=c.find("img"),g=c.find('input[type="file"]').change(function(){d.bind(c,f)(),a(this).val().length&&a(this).get(0).files&&a(this).get(0).files[0]?h.bind(c,f,a(this).get(0).files[0])():e.bind(c,f)(),a(this).css({top:0,left:0})});f.attr("src").length||c.addClass("no"),c.bind("dragover",function(b){b.stopPropagation(),b.preventDefault(),a(this).addClass("ho"),g.offset({top:b.originalEvent.pageY-15,left:b.originalEvent.pageX-10})}).bind("dragleave",function(b){b.stopPropagation(),b.preventDefault(),a(this).removeClass("ho")}).bind("drop",function(b){a(this).removeClass("ho")})};return a(this).each(function(){i.bind(a(this))(a.extend(!0,c,b))}),a(this)}})});
/**
 * @author      OA Wu <comdan66@gmail.com>
 * @copyright   Copyright (c) 2016 OA Wu Design
 */

(function( factory ) { if ((typeof define === 'function') && define.amd) define (['jquery'], factory); else factory (jQuery); }(function ($) {
  $.fn.extend ({
    OAdropUploadImg: function (opt, file) {
      var d4Opt = {
        muti: false,
      },
      loading = function ($img) {
        clean ($img);
        $(this).attr ('data-loading', '讀取中..').removeClass ('no');
      },
      clean = function ($img) {
        $(this).removeAttr ('data-loading').addClass ('no');
        $img.attr ('src', '');
      },
      rotate = function (e, callback, a) {
        var img = new Image ();
        img.src = e.target.result;
        img.onload = function () {
          _vmxw = 512;
          var ca = document.createElement ('canvas');

          if (a == 6 || a == 8) { ca.height = img.width; ca.width = img.height; } else { ca.width = img.width; ca.height = img.height; }
          if (Math.max (ca.width, ca.height) > _vmxw) { if (ca.width > ca.height) { ca.height = (_vmxw / ca.width) * ca.height; ca.width = _vmxw; } else { ca.width = (_vmxw / ca.height) * ca.width; ca.height = _vmxw; } }
          
          if (a == 3) {
            ca.getContext ('2d').transform (-1, 0, 0, -1, ca.width, ca.height);
            ca.getContext ('2d').drawImage (img, 0, 0, ca.width, ca.height);
          } else if (a == 6) {
            ca.getContext ('2d').transform (0, 1, -1, 0, ca.width, 0);
            ca.getContext ('2d').drawImage (img, 0, 0, ca.height, ca.width);
          } else if (a == 8) {
            ca.getContext ('2d').transform (0, -1, 1, 0, 0, ca.height);
            ca.getContext ('2d').drawImage (img, 0, 0, ca.height, ca.width);
          } else {
            ca.getContext ('2d').drawImage (img, 0, 0, ca.width, ca.height);
          }
          callback (ca);
        };
      },
      rotateAngle = function (file, callback) {
        var reader = new FileReader ();

        reader.onload = function (e) {
          var view = new DataView (e.target.result);

          if (view.getUint16 (0, false) != 0xFFD8)
            return rotate (this, callback, -2);

          var length = view.byteLength, offset = 2;

          while (offset < length) {
            var marker = view.getUint16 (offset, false);
            offset += 2;

            if (marker == 0xFFE1) {
              if (view.getUint32 (offset += 2, false) != 0x45786966)
                return rotate (this, callback, -1);

              var little = view.getUint16 (offset += 6, false) == 0x4949;
              offset += view.getUint32 (offset + 4, little);

              var tags = view.getUint16 (offset, little);
              offset += 2;

              for (var i = 0; i < tags; i++)
                if (view.getUint16 (offset + (i * 12), little) == 0x0112)
                  return rotate (this, callback, view.getUint16 (offset + (i * 12) + 8, little));

            } else if ((marker & 0xFF00) != 0xFF00) {
              break;
            }
            else {
              offset += view.getUint16 (offset, false);
            }
          }

          return rotate (this, callback, -1);
        }.bind (this);

        reader.readAsArrayBuffer (file.slice (0, 64 * 1024));
      },
      loadPic = function ($img, file) {
        var $obj = $(this);
        var reader = new FileReader ();
        // $obj.get (0).files.set (file);

        reader.onload = function (e) {
          rotateAngle.bind (e, file, function (ca) {
            $img.attr ('src', ca.toDataURL ()).load (function () {
             $obj.removeAttr ('data-loading');
            });
          }) ();
        };

        reader.readAsDataURL (file);
      },
      init = function (opt, file) {
        var $parent = $(this).parent (),
            $obj = $(this),
            $img = $obj.find ('img'),
            $a = $obj.find ('a'),
            $input = $obj.find ('input[type="file"]').change (function () {
              loading.bind ($obj, $img) ();

              if (!($(this).val ().length && $(this).get (0).files && $(this).get (0).files.length))
                clean.bind ($obj, $img) ();
              else {
                var files = $(this).get (0).files;

                for (var i = 0; i < files.length; i++) {
                  if (!$(this).prop ('multiple'))
                    loadPic.bind ($obj, $img, files.item (i)) ();
                  else {
                    var $c = $obj.clone ();
                    $c.find ('input[type="file"]').val (files.item (i));
                    $c.insertBefore ($obj).OAdropUploadImg ({}, files.item (i));
                  }

                  // if (!i) {

                  //   loadPic.bind ($obj, $img, files.item (i)) ();
                  //   // $(this).get (0).files = new FileList (files.item (i));
                  // }
                  // else $(this).prop ('multiple') && $obj.clone ().appendTo ($parent).OAdropUploadImg ({}, files.item (i));                  
                }
              }
                
              $(this).css ({'top' : 0, 'left': 0});
              if ($(this).prop ('multiple')) {
                $obj.removeAttr ('data-loading').addClass ('no');
                $(this).val ('');
              }
            });

        if ($input.prop ('multiple'))
          $a.click (function () { $obj.remove (); });

        if (!($img.attr ('src') && $img.attr ('src').length))
          $obj.addClass ('no');

        if (file) {
          loadPic.bind ($obj.removeClass ('no'), $img, file) ();
        }

        $obj.bind ('dragover', function (e) {
          e.stopPropagation ();
          e.preventDefault ();
          $(this).addClass ('ho');
          $input.offset ({ top: e.originalEvent.pageY - 15, left: e.originalEvent.pageX - 10 });
        })
        .bind ('dragleave', function (e) {
          e.stopPropagation ();
          e.preventDefault ();
          $(this).removeClass ('ho');
        })
        .bind ('drop', function (e) {
          $(this).removeClass ('ho');
        });
      };

      $(this).each (function () {
        init.bind ($(this)) ($.extend (true, d4Opt, opt), file);
      });
      return $(this);
    }
  });
}));




// PhotoSwipe
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipe=t()}(this,function(){"use strict";var e=function(e,t,n,i,o){var a={features:null,bind:function(e,t,n,i){var o=(i?"remove":"add")+"EventListener";t=t.split(" ");for(var a=0;a<t.length;a++)t[a]&&e[o](t[a],n,!1)},isArray:function(e){return e instanceof Array},createEl:function(e,t){var n=document.createElement(t||"div");return e&&(n.className=e),n},getScrollY:function(){var e=window.pageYOffset;return void 0!==e?e:document.documentElement.scrollTop},unbind:function(e,t,n){a.bind(e,t,n,!0)},removeClass:function(e,t){var n=new RegExp("(\\s|^)"+t+"(\\s|$)");e.className=e.className.replace(n," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")},addClass:function(e,t){a.hasClass(e,t)||(e.className+=(e.className?" ":"")+t)},hasClass:function(e,t){return e.className&&new RegExp("(^|\\s)"+t+"(\\s|$)").test(e.className)},getChildByClass:function(e,t){for(var n=e.firstChild;n;){if(a.hasClass(n,t))return n;n=n.nextSibling}},arraySearch:function(e,t,n){for(var i=e.length;i--;)if(e[i][n]===t)return i;return-1},extend:function(e,t,n){for(var i in t)if(t.hasOwnProperty(i)){if(n&&e.hasOwnProperty(i))continue;e[i]=t[i]}},easing:{sine:{out:function(e){return Math.sin(e*(Math.PI/2))},inOut:function(e){return-(Math.cos(Math.PI*e)-1)/2}},cubic:{out:function(e){return--e*e*e+1}}},detectFeatures:function(){if(a.features)return a.features;var e=a.createEl(),t=e.style,n="",i={};if(i.oldIE=document.all&&!document.addEventListener,i.touch="ontouchstart"in window,window.requestAnimationFrame&&(i.raf=window.requestAnimationFrame,i.caf=window.cancelAnimationFrame),i.pointerEvent=navigator.pointerEnabled||navigator.msPointerEnabled,!i.pointerEvent){var o=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var r=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);r&&r.length>0&&(r=parseInt(r[1],10),r>=1&&8>r&&(i.isOldIOSPhone=!0))}var l=o.match(/Android\s([0-9\.]*)/),s=l?l[1]:0;s=parseFloat(s),s>=1&&(4.4>s&&(i.isOldAndroid=!0),i.androidVersion=s),i.isMobileOpera=/opera mini|opera mobi/i.test(o)}for(var u,c,d=["transform","perspective","animationName"],p=["","webkit","Moz","ms","O"],m=0;4>m;m++){n=p[m];for(var f=0;3>f;f++)u=d[f],c=n+(n?u.charAt(0).toUpperCase()+u.slice(1):u),!i[u]&&c in t&&(i[u]=c);n&&!i.raf&&(n=n.toLowerCase(),i.raf=window[n+"RequestAnimationFrame"],i.raf&&(i.caf=window[n+"CancelAnimationFrame"]||window[n+"CancelRequestAnimationFrame"]))}if(!i.raf){var h=0;i.raf=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-h)),i=window.setTimeout(function(){e(t+n)},n);return h=t+n,i},i.caf=function(e){clearTimeout(e)}}return i.svg=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,a.features=i,i}};a.detectFeatures(),a.features.oldIE&&(a.bind=function(e,t,n,i){t=t.split(" ");for(var o,a=(i?"detach":"attach")+"Event",r=function(){n.handleEvent.call(n)},l=0;l<t.length;l++)if(o=t[l])if("object"==typeof n&&n.handleEvent){if(i){if(!n["oldIE"+o])return!1}else n["oldIE"+o]=r;e[a]("on"+o,n["oldIE"+o])}else e[a]("on"+o,n)});var r=this,l=25,s=3,u={allowPanToNext:!0,spacing:.12,bgOpacity:1,mouseUsed:!1,loop:!0,pinchToClose:!0,closeOnScroll:!0,closeOnVerticalDrag:!0,verticalDragRange:.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:!1,focus:!0,escKey:!0,arrowKeys:!0,mainScrollEndFriction:.35,panEndFriction:.35,isClickableElement:function(e){return"A"===e.tagName},getDoubleTapZoom:function(e,t){return e?1:t.initialZoomLevel<.7?1:1.33},maxSpreadZoom:1.33,modal:!0,scaleMode:"fit"};a.extend(u,i);var c,d,p,m,f,h,v,y,x,g,w,b,I,C,D,M,T,S,A,E,O,k,R,Z,P,F,L,_,z,N,U,H,Y,B,W,G,X,V,K,q,$,j,J,Q,ee,te,ne,ie,oe,ae,re,le,se,ue,ce,de,pe=function(){return{x:0,y:0}},me=pe(),fe=pe(),he=pe(),ve={},ye=0,xe={},ge=pe(),we=0,be=!0,Ie=[],Ce={},De=!1,Me=function(e,t){a.extend(r,t.publicMethods),Ie.push(e)},Te=function(e){var t=nn();return e>t-1?e-t:0>e?t+e:e},Se={},Ae=function(e,t){return Se[e]||(Se[e]=[]),Se[e].push(t)},Ee=function(e){var t=Se[e];if(t){var n=Array.prototype.slice.call(arguments);n.shift();for(var i=0;i<t.length;i++)t[i].apply(r,n)}},Oe=function(){return(new Date).getTime()},ke=function(e){ue=e,r.bg.style.opacity=e*u.bgOpacity},Re=function(e,t,n,i,o){(!De||o&&o!==r.currItem)&&(i/=o?o.fitRatio:r.currItem.fitRatio),e[k]=b+t+"px, "+n+"px"+I+" scale("+i+")"},Ze=function(e){oe&&(e&&(g>r.currItem.fitRatio?De||(hn(r.currItem,!1,!0),De=!0):De&&(hn(r.currItem),De=!1)),Re(oe,he.x,he.y,g))},Pe=function(e){e.container&&Re(e.container.style,e.initialPosition.x,e.initialPosition.y,e.initialZoomLevel,e)},Fe=function(e,t){t[k]=b+e+"px, 0px"+I},Le=function(e,t){if(!u.loop&&t){var n=m+(ge.x*ye-e)/ge.x,i=Math.round(e-gt.x);(0>n&&i>0||n>=nn()-1&&0>i)&&(e=gt.x+i*u.mainScrollEndFriction)}gt.x=e,Fe(e,f)},_e=function(e,t){var n=wt[e]-xe[e];return fe[e]+me[e]+n-n*(t/w)},ze=function(e,t){e.x=t.x,e.y=t.y,t.id&&(e.id=t.id)},Ne=function(e){e.x=Math.round(e.x),e.y=Math.round(e.y)},Ue=null,He=function(){Ue&&(a.unbind(document,"mousemove",He),a.addClass(e,"pswp--has_mouse"),u.mouseUsed=!0,Ee("mouseUsed")),Ue=setTimeout(function(){Ue=null},100)},Ye=function(){a.bind(document,"keydown",r),U.transform&&a.bind(r.scrollWrap,"click",r),u.mouseUsed||a.bind(document,"mousemove",He),a.bind(window,"resize scroll",r),Ee("bindEvents")},Be=function(){a.unbind(window,"resize",r),a.unbind(window,"scroll",x.scroll),a.unbind(document,"keydown",r),a.unbind(document,"mousemove",He),U.transform&&a.unbind(r.scrollWrap,"click",r),V&&a.unbind(window,v,r),Ee("unbindEvents")},We=function(e,t){var n=dn(r.currItem,ve,e);return t&&(ie=n),n},Ge=function(e){return e||(e=r.currItem),e.initialZoomLevel},Xe=function(e){return e||(e=r.currItem),e.w>0?u.maxSpreadZoom:1},Ve=function(e,t,n,i){return i===r.currItem.initialZoomLevel?(n[e]=r.currItem.initialPosition[e],!0):(n[e]=_e(e,i),n[e]>t.min[e]?(n[e]=t.min[e],!0):n[e]<t.max[e]?(n[e]=t.max[e],!0):!1)},Ke=function(){if(k){var t=U.perspective&&!Z;return b="translate"+(t?"3d(":"("),void(I=U.perspective?", 0px)":")")}k="left",a.addClass(e,"pswp--ie"),Fe=function(e,t){t.left=e+"px"},Pe=function(e){var t=e.fitRatio>1?1:e.fitRatio,n=e.container.style,i=t*e.w,o=t*e.h;n.width=i+"px",n.height=o+"px",n.left=e.initialPosition.x+"px",n.top=e.initialPosition.y+"px"},Ze=function(){if(oe){var e=oe,t=r.currItem,n=t.fitRatio>1?1:t.fitRatio,i=n*t.w,o=n*t.h;e.width=i+"px",e.height=o+"px",e.left=he.x+"px",e.top=he.y+"px"}}},qe=function(e){var t="";u.escKey&&27===e.keyCode?t="close":u.arrowKeys&&(37===e.keyCode?t="prev":39===e.keyCode&&(t="next")),t&&(e.ctrlKey||e.altKey||e.shiftKey||e.metaKey||(e.preventDefault?e.preventDefault():e.returnValue=!1,r[t]()))},$e=function(e){e&&($||q||ae||G)&&(e.preventDefault(),e.stopPropagation())},je=function(){r.setScrollOffset(0,a.getScrollY())},Je={},Qe=0,et=function(e){Je[e]&&(Je[e].raf&&F(Je[e].raf),Qe--,delete Je[e])},tt=function(e){Je[e]&&et(e),Je[e]||(Qe++,Je[e]={})},nt=function(){for(var e in Je)Je.hasOwnProperty(e)&&et(e)},it=function(e,t,n,i,o,a,r){var l,s=Oe();tt(e);var u=function(){if(Je[e]){if(l=Oe()-s,l>=i)return et(e),a(n),void(r&&r());a((n-t)*o(l/i)+t),Je[e].raf=P(u)}};u()},ot={shout:Ee,listen:Ae,viewportSize:ve,options:u,isMainScrollAnimating:function(){return ae},getZoomLevel:function(){return g},getCurrentIndex:function(){return m},isDragging:function(){return V},isZooming:function(){return ee},setScrollOffset:function(e,t){xe.x=e,N=xe.y=t,Ee("updateScrollOffset",xe)},applyZoomPan:function(e,t,n,i){he.x=t,he.y=n,g=e,Ze(i)},init:function(n){if(!c&&!d){Ae("pvCallback",n);var i;r.framework=a,r.template=e,r.bg=a.getChildByClass(e,"pswp__bg"),L=e.className,c=!0,U=a.detectFeatures(),P=U.raf,F=U.caf,k=U.transform,z=U.oldIE,r.scrollWrap=a.getChildByClass(e,"pswp__scroll-wrap"),r.container=a.getChildByClass(r.scrollWrap,"pswp__container"),f=r.container.style,r.itemHolders=M=[{el:r.container.children[0],wrap:0,index:-1},{el:r.container.children[1],wrap:0,index:-1},{el:r.container.children[2],wrap:0,index:-1}],M[0].el.style.display=M[2].el.style.display="none",Ke(),x={resize:r.updateSize,scroll:je,keydown:qe,click:$e};var o=U.isOldIOSPhone||U.isOldAndroid||U.isMobileOpera;for(U.animationName&&U.transform&&!o||(u.showAnimationDuration=u.hideAnimationDuration=0),i=0;i<Ie.length;i++)r["init"+Ie[i]]();if(t){var l=r.ui=new t(r,a);l.init()}Ee("firstUpdate"),m=m||u.index||0,(isNaN(m)||0>m||m>=nn())&&(m=0),r.currItem=en(m),(U.isOldIOSPhone||U.isOldAndroid)&&(be=!1),e.setAttribute("aria-hidden","false"),u.modal&&(be?e.style.position="fixed":(e.style.position="absolute",e.style.top=a.getScrollY()+"px")),void 0===N&&(Ee("initialLayout"),N=_=a.getScrollY());var p="pswp--open ";for(u.mainClass&&(p+=u.mainClass+" "),u.showHideOpacity&&(p+="pswp--animate_opacity "),p+=Z?"pswp--touch":"pswp--notouch",p+=U.animationName?" pswp--css_animation":"",p+=U.svg?" pswp--svg":"",a.addClass(e,p),r.updateSize(),h=-1,we=null,i=0;s>i;i++)Fe((i+h)*ge.x,M[i].el.style);z||a.bind(r.scrollWrap,y,r),Ae("initialZoomInEnd",function(){r.setContent(M[0],m-1),r.setContent(M[2],m+1),M[0].el.style.display=M[2].el.style.display="block",u.focus&&e.focus(),Ye()}),r.setContent(M[1],m),r.updateCurrItem(),Ee("afterInit"),be||(C=setInterval(function(){Qe||V||ee||g!==r.currItem.initialZoomLevel||r.updateSize()},1e3)),a.addClass(e,"pswp--visible")}},close:function(){c&&(c=!1,d=!0,Ee("close"),Be(),an(r.currItem,null,!0,r.destroy))},destroy:function(){Ee("destroy"),qt&&clearTimeout(qt),e.setAttribute("aria-hidden","true"),e.className=L,C&&clearInterval(C),a.unbind(r.scrollWrap,y,r),a.unbind(window,"scroll",r),Mt(),nt(),Se=null},panTo:function(e,t,n){n||(e>ie.min.x?e=ie.min.x:e<ie.max.x&&(e=ie.max.x),t>ie.min.y?t=ie.min.y:t<ie.max.y&&(t=ie.max.y)),he.x=e,he.y=t,Ze()},handleEvent:function(e){e=e||window.event,x[e.type]&&x[e.type](e)},goTo:function(e){e=Te(e);var t=e-m;we=t,m=e,r.currItem=en(m),ye-=t,Le(ge.x*ye),nt(),ae=!1,r.updateCurrItem()},next:function(){r.goTo(m+1)},prev:function(){r.goTo(m-1)},updateCurrZoomItem:function(e){if(e&&Ee("beforeChange",0),M[1].el.children.length){var t=M[1].el.children[0];oe=a.hasClass(t,"pswp__zoom-wrap")?t.style:null}else oe=null;ie=r.currItem.bounds,w=g=r.currItem.initialZoomLevel,he.x=ie.center.x,he.y=ie.center.y,e&&Ee("afterChange")},invalidateCurrItems:function(){D=!0;for(var e=0;s>e;e++)M[e].item&&(M[e].item.needsUpdate=!0)},updateCurrItem:function(e){if(0!==we){var t,n=Math.abs(we);if(!(e&&2>n)){r.currItem=en(m),De=!1,Ee("beforeChange",we),n>=s&&(h+=we+(we>0?-s:s),n=s);for(var i=0;n>i;i++)we>0?(t=M.shift(),M[s-1]=t,h++,Fe((h+2)*ge.x,t.el.style),r.setContent(t,m-n+i+1+1)):(t=M.pop(),M.unshift(t),h--,Fe(h*ge.x,t.el.style),r.setContent(t,m+n-i-1-1));if(oe&&1===Math.abs(we)){var o=en(T);o.initialZoomLevel!==g&&(dn(o,ve),hn(o),Pe(o))}we=0,r.updateCurrZoomItem(),T=m,Ee("afterChange")}}},updateSize:function(t){if(!be&&u.modal){var n=a.getScrollY();if(N!==n&&(e.style.top=n+"px",N=n),!t&&Ce.x===window.innerWidth&&Ce.y===window.innerHeight)return;Ce.x=window.innerWidth,Ce.y=window.innerHeight,e.style.height=Ce.y+"px"}if(ve.x=r.scrollWrap.clientWidth,ve.y=r.scrollWrap.clientHeight,je(),ge.x=ve.x+Math.round(ve.x*u.spacing),ge.y=ve.y,Le(ge.x*ye),Ee("beforeResize"),void 0!==h){for(var i,o,l,c=0;s>c;c++)i=M[c],Fe((c+h)*ge.x,i.el.style),l=m+c-1,u.loop&&nn()>2&&(l=Te(l)),o=en(l),o&&(D||o.needsUpdate||!o.bounds)?(r.cleanSlide(o),r.setContent(i,l),1===c&&(r.currItem=o,r.updateCurrZoomItem(!0)),o.needsUpdate=!1):-1===i.index&&l>=0&&r.setContent(i,l),o&&o.container&&(dn(o,ve),hn(o),Pe(o));D=!1}w=g=r.currItem.initialZoomLevel,ie=r.currItem.bounds,ie&&(he.x=ie.center.x,he.y=ie.center.y,Ze(!0)),Ee("resize")},zoomTo:function(e,t,n,i,o){t&&(w=g,wt.x=Math.abs(t.x)-he.x,wt.y=Math.abs(t.y)-he.y,ze(fe,he));var r=We(e,!1),l={};Ve("x",r,l,e),Ve("y",r,l,e);var s=g,u={x:he.x,y:he.y};Ne(l);var c=function(t){1===t?(g=e,he.x=l.x,he.y=l.y):(g=(e-s)*t+s,he.x=(l.x-u.x)*t+u.x,he.y=(l.y-u.y)*t+u.y),o&&o(t),Ze(1===t)};n?it("customZoomTo",0,1,n,i||a.easing.sine.inOut,c):c(1)}},at=30,rt=10,lt={},st={},ut={},ct={},dt={},pt=[],mt={},ft=[],ht={},vt=0,yt=pe(),xt=0,gt=pe(),wt=pe(),bt=pe(),It=function(e,t){return e.x===t.x&&e.y===t.y},Ct=function(e,t){return Math.abs(e.x-t.x)<l&&Math.abs(e.y-t.y)<l},Dt=function(e,t){return ht.x=Math.abs(e.x-t.x),ht.y=Math.abs(e.y-t.y),Math.sqrt(ht.x*ht.x+ht.y*ht.y)},Mt=function(){j&&(F(j),j=null)},Tt=function(){V&&(j=P(Tt),Yt())},St=function(){return!("fit"===u.scaleMode&&g===r.currItem.initialZoomLevel)},At=function(e,t){return e?e.className&&e.className.indexOf("pswp__scroll-wrap")>-1?!1:t(e)?e:At(e.parentNode,t):!1},Et={},Ot=function(e,t){return Et.prevent=!At(e.target,u.isClickableElement),Ee("preventDragEvent",e,t,Et),Et.prevent},kt=function(e,t){return t.x=e.pageX,t.y=e.pageY,t.id=e.identifier,t},Rt=function(e,t,n){n.x=.5*(e.x+t.x),n.y=.5*(e.y+t.y)},Zt=function(e,t,n){if(e-Y>50){var i=ft.length>2?ft.shift():{};i.x=t,i.y=n,ft.push(i),Y=e}},Pt=function(){var e=he.y-r.currItem.initialPosition.y;return 1-Math.abs(e/(ve.y/2))},Ft={},Lt={},_t=[],zt=function(e){for(;_t.length>0;)_t.pop();return R?(de=0,pt.forEach(function(e){0===de?_t[0]=e:1===de&&(_t[1]=e),de++})):e.type.indexOf("touch")>-1?e.touches&&e.touches.length>0&&(_t[0]=kt(e.touches[0],Ft),e.touches.length>1&&(_t[1]=kt(e.touches[1],Lt))):(Ft.x=e.pageX,Ft.y=e.pageY,Ft.id="",_t[0]=Ft),_t},Nt=function(e,t){var n,i,o,a,l=0,s=he[e]+t[e],c=t[e]>0,d=gt.x+t.x,p=gt.x-mt.x;return n=s>ie.min[e]||s<ie.max[e]?u.panEndFriction:1,s=he[e]+t[e]*n,!u.allowPanToNext&&g!==r.currItem.initialZoomLevel||(oe?"h"!==re||"x"!==e||q||(c?(s>ie.min[e]&&(n=u.panEndFriction,l=ie.min[e]-s,i=ie.min[e]-fe[e]),(0>=i||0>p)&&nn()>1?(a=d,0>p&&d>mt.x&&(a=mt.x)):ie.min.x!==ie.max.x&&(o=s)):(s<ie.max[e]&&(n=u.panEndFriction,l=s-ie.max[e],i=fe[e]-ie.max[e]),(0>=i||p>0)&&nn()>1?(a=d,p>0&&d<mt.x&&(a=mt.x)):ie.min.x!==ie.max.x&&(o=s))):a=d,"x"!==e)?void(ae||J||g>r.currItem.fitRatio&&(he[e]+=t[e]*n)):(void 0!==a&&(Le(a,!0),J=a===mt.x?!1:!0),ie.min.x!==ie.max.x&&(void 0!==o?he.x=o:J||(he.x+=t.x*n)),void 0!==a)},Ut=function(e){if(!("mousedown"===e.type&&e.button>0)){if(Qt)return void e.preventDefault();if(!X||"mousedown"!==e.type){if(Ot(e,!0)&&e.preventDefault(),Ee("pointerDown"),R){var t=a.arraySearch(pt,e.pointerId,"id");0>t&&(t=pt.length),pt[t]={x:e.pageX,y:e.pageY,id:e.pointerId}}var n=zt(e),i=n.length;Q=null,nt(),V&&1!==i||(V=le=!0,a.bind(window,v,r),W=ce=se=G=J=$=K=q=!1,re=null,Ee("firstTouchStart",n),ze(fe,he),me.x=me.y=0,ze(ct,n[0]),ze(dt,ct),mt.x=ge.x*ye,ft=[{x:ct.x,y:ct.y}],Y=H=Oe(),We(g,!0),Mt(),Tt()),!ee&&i>1&&!ae&&!J&&(w=g,q=!1,ee=K=!0,me.y=me.x=0,ze(fe,he),ze(lt,n[0]),ze(st,n[1]),Rt(lt,st,bt),wt.x=Math.abs(bt.x)-he.x,wt.y=Math.abs(bt.y)-he.y,te=ne=Dt(lt,st))}}},Ht=function(e){if(e.preventDefault(),R){var t=a.arraySearch(pt,e.pointerId,"id");if(t>-1){var n=pt[t];n.x=e.pageX,n.y=e.pageY}}if(V){var i=zt(e);if(re||$||ee)Q=i;else if(gt.x!==ge.x*ye)re="h";else{var o=Math.abs(i[0].x-ct.x)-Math.abs(i[0].y-ct.y);Math.abs(o)>=rt&&(re=o>0?"h":"v",Q=i)}}},Yt=function(){if(Q){var e=Q.length;if(0!==e)if(ze(lt,Q[0]),ut.x=lt.x-ct.x,ut.y=lt.y-ct.y,ee&&e>1){if(ct.x=lt.x,ct.y=lt.y,!ut.x&&!ut.y&&It(Q[1],st))return;ze(st,Q[1]),q||(q=!0,Ee("zoomGestureStarted"));var t=Dt(lt,st),n=Vt(t);n>r.currItem.initialZoomLevel+r.currItem.initialZoomLevel/15&&(ce=!0);var i=1,o=Ge(),a=Xe();if(o>n)if(u.pinchToClose&&!ce&&w<=r.currItem.initialZoomLevel){var l=o-n,s=1-l/(o/1.2);ke(s),Ee("onPinchClose",s),se=!0}else i=(o-n)/o,i>1&&(i=1),n=o-i*(o/3);else n>a&&(i=(n-a)/(6*o),i>1&&(i=1),n=a+i*o);0>i&&(i=0),te=t,Rt(lt,st,yt),me.x+=yt.x-bt.x,me.y+=yt.y-bt.y,ze(bt,yt),he.x=_e("x",n),he.y=_e("y",n),W=n>g,g=n,Ze()}else{if(!re)return;if(le&&(le=!1,Math.abs(ut.x)>=rt&&(ut.x-=Q[0].x-dt.x),Math.abs(ut.y)>=rt&&(ut.y-=Q[0].y-dt.y)),ct.x=lt.x,ct.y=lt.y,0===ut.x&&0===ut.y)return;if("v"===re&&u.closeOnVerticalDrag&&!St()){me.y+=ut.y,he.y+=ut.y;var c=Pt();return G=!0,Ee("onVerticalDrag",c),ke(c),void Ze()}Zt(Oe(),lt.x,lt.y),$=!0,ie=r.currItem.bounds;var d=Nt("x",ut);d||(Nt("y",ut),Ne(he),Ze())}}},Bt=function(e){if(U.isOldAndroid){if(X&&"mouseup"===e.type)return;e.type.indexOf("touch")>-1&&(clearTimeout(X),X=setTimeout(function(){X=0},600))}Ee("pointerUp"),Ot(e,!1)&&e.preventDefault();var t;if(R){var n=a.arraySearch(pt,e.pointerId,"id");if(n>-1)if(t=pt.splice(n,1)[0],navigator.pointerEnabled)t.type=e.pointerType||"mouse";else{var i={4:"mouse",2:"touch",3:"pen"};t.type=i[e.pointerType],t.type||(t.type=e.pointerType||"mouse")}}var o,l=zt(e),s=l.length;if("mouseup"===e.type&&(s=0),2===s)return Q=null,!0;1===s&&ze(dt,l[0]),0!==s||re||ae||(t||("mouseup"===e.type?t={x:e.pageX,y:e.pageY,type:"mouse"}:e.changedTouches&&e.changedTouches[0]&&(t={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY,type:"touch"})),Ee("touchRelease",e,t));var c=-1;if(0===s&&(V=!1,a.unbind(window,v,r),Mt(),ee?c=0:-1!==xt&&(c=Oe()-xt)),xt=1===s?Oe():-1,o=-1!==c&&150>c?"zoom":"swipe",ee&&2>s&&(ee=!1,1===s&&(o="zoomPointerUp"),Ee("zoomGestureEnded")),Q=null,$||q||ae||G)if(nt(),B||(B=Wt()),B.calculateSwipeSpeed("x"),G){var d=Pt();if(d<u.verticalDragRange)r.close();else{var p=he.y,m=ue;it("verticalDrag",0,1,300,a.easing.cubic.out,function(e){he.y=(r.currItem.initialPosition.y-p)*e+p,ke((1-m)*e+m),Ze()}),Ee("onVerticalDrag",1)}}else{if((J||ae)&&0===s){var f=Xt(o,B);if(f)return;o="zoomPointerUp"}if(!ae)return"swipe"!==o?void Kt():void(!J&&g>r.currItem.fitRatio&&Gt(B))}},Wt=function(){var e,t,n={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function(i){ft.length>1?(e=Oe()-Y+50,t=ft[ft.length-2][i]):(e=Oe()-H,t=dt[i]),n.lastFlickOffset[i]=ct[i]-t,n.lastFlickDist[i]=Math.abs(n.lastFlickOffset[i]),n.lastFlickDist[i]>20?n.lastFlickSpeed[i]=n.lastFlickOffset[i]/e:n.lastFlickSpeed[i]=0,Math.abs(n.lastFlickSpeed[i])<.1&&(n.lastFlickSpeed[i]=0),n.slowDownRatio[i]=.95,n.slowDownRatioReverse[i]=1-n.slowDownRatio[i],n.speedDecelerationRatio[i]=1},calculateOverBoundsAnimOffset:function(e,t){n.backAnimStarted[e]||(he[e]>ie.min[e]?n.backAnimDestination[e]=ie.min[e]:he[e]<ie.max[e]&&(n.backAnimDestination[e]=ie.max[e]),void 0!==n.backAnimDestination[e]&&(n.slowDownRatio[e]=.7,n.slowDownRatioReverse[e]=1-n.slowDownRatio[e],n.speedDecelerationRatioAbs[e]<.05&&(n.lastFlickSpeed[e]=0,n.backAnimStarted[e]=!0,it("bounceZoomPan"+e,he[e],n.backAnimDestination[e],t||300,a.easing.sine.out,function(t){he[e]=t,Ze()}))))},calculateAnimOffset:function(e){n.backAnimStarted[e]||(n.speedDecelerationRatio[e]=n.speedDecelerationRatio[e]*(n.slowDownRatio[e]+n.slowDownRatioReverse[e]-n.slowDownRatioReverse[e]*n.timeDiff/10),n.speedDecelerationRatioAbs[e]=Math.abs(n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]),n.distanceOffset[e]=n.lastFlickSpeed[e]*n.speedDecelerationRatio[e]*n.timeDiff,he[e]+=n.distanceOffset[e])},panAnimLoop:function(){return Je.zoomPan&&(Je.zoomPan.raf=P(n.panAnimLoop),n.now=Oe(),n.timeDiff=n.now-n.lastNow,n.lastNow=n.now,n.calculateAnimOffset("x"),n.calculateAnimOffset("y"),Ze(),n.calculateOverBoundsAnimOffset("x"),n.calculateOverBoundsAnimOffset("y"),n.speedDecelerationRatioAbs.x<.05&&n.speedDecelerationRatioAbs.y<.05)?(he.x=Math.round(he.x),he.y=Math.round(he.y),Ze(),void et("zoomPan")):void 0}};return n},Gt=function(e){return e.calculateSwipeSpeed("y"),ie=r.currItem.bounds,e.backAnimDestination={},e.backAnimStarted={},Math.abs(e.lastFlickSpeed.x)<=.05&&Math.abs(e.lastFlickSpeed.y)<=.05?(e.speedDecelerationRatioAbs.x=e.speedDecelerationRatioAbs.y=0,e.calculateOverBoundsAnimOffset("x"),e.calculateOverBoundsAnimOffset("y"),!0):(tt("zoomPan"),e.lastNow=Oe(),void e.panAnimLoop())},Xt=function(e,t){var n;ae||(vt=m);var i;if("swipe"===e){var o=ct.x-dt.x,l=t.lastFlickDist.x<10;o>at&&(l||t.lastFlickOffset.x>20)?i=-1:-at>o&&(l||t.lastFlickOffset.x<-20)&&(i=1)}var s;i&&(m+=i,0>m?(m=u.loop?nn()-1:0,s=!0):m>=nn()&&(m=u.loop?0:nn()-1,s=!0),(!s||u.loop)&&(we+=i,ye-=i,n=!0));var c,d=ge.x*ye,p=Math.abs(d-gt.x);return n||d>gt.x==t.lastFlickSpeed.x>0?(c=Math.abs(t.lastFlickSpeed.x)>0?p/Math.abs(t.lastFlickSpeed.x):333,c=Math.min(c,400),c=Math.max(c,250)):c=333,vt===m&&(n=!1),ae=!0,Ee("mainScrollAnimStart"),it("mainScroll",gt.x,d,c,a.easing.cubic.out,Le,function(){nt(),ae=!1,vt=-1,(n||vt!==m)&&r.updateCurrItem(),Ee("mainScrollAnimComplete")}),n&&r.updateCurrItem(!0),n},Vt=function(e){return 1/ne*e*w},Kt=function(){var e=g,t=Ge(),n=Xe();t>g?e=t:g>n&&(e=n);var i,o=1,l=ue;return se&&!W&&!ce&&t>g?(r.close(),!0):(se&&(i=function(e){ke((o-l)*e+l)}),r.zoomTo(e,0,200,a.easing.cubic.out,i),!0)};Me("Gestures",{publicMethods:{initGestures:function(){var e=function(e,t,n,i,o){S=e+t,A=e+n,E=e+i,O=o?e+o:""};R=U.pointerEvent,R&&U.touch&&(U.touch=!1),R?navigator.pointerEnabled?e("pointer","down","move","up","cancel"):e("MSPointer","Down","Move","Up","Cancel"):U.touch?(e("touch","start","move","end","cancel"),Z=!0):e("mouse","down","move","up"),v=A+" "+E+" "+O,y=S,R&&!Z&&(Z=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1),r.likelyTouchDevice=Z,x[S]=Ut,x[A]=Ht,x[E]=Bt,O&&(x[O]=x[E]),U.touch&&(y+=" mousedown",v+=" mousemove mouseup",x.mousedown=x[S],x.mousemove=x[A],x.mouseup=x[E]),Z||(u.allowPanToNext=!1)}}});var qt,$t,jt,Jt,Qt,en,tn,nn,on,an=function(t,n,i,o){qt&&clearTimeout(qt),Qt=!0,Jt=!0;var l;t.initialLayout?(l=t.initialLayout,t.initialLayout=null):l=u.getThumbBoundsFn&&u.getThumbBoundsFn(m);var s=i?u.hideAnimationDuration:u.showAnimationDuration,c=function(){et("initialZoom"),i?(r.template.removeAttribute("style"),r.bg.removeAttribute("style")):(ke(1),n&&(n.style.display="block"),a.addClass(e,"pswp--animated-in"),Ee("initialZoom"+(i?"OutEnd":"InEnd"))),o&&o(),Qt=!1};if(!s||!l||void 0===l.x)return Ee("initialZoom"+(i?"Out":"In")),g=t.initialZoomLevel,ze(he,t.initialPosition),Ze(),e.style.opacity=i?0:1,ke(1),void(s?setTimeout(function(){c()},s):c());var d=function(){var n=p,o=!r.currItem.src||r.currItem.loadError||u.showHideOpacity;t.miniImg&&(t.miniImg.style.webkitBackfaceVisibility="hidden"),i||(g=l.w/t.w,he.x=l.x,he.y=l.y-_,r[o?"template":"bg"].style.opacity=.001,Ze()),tt("initialZoom"),i&&!n&&a.removeClass(e,"pswp--animated-in"),o&&(i?a[(n?"remove":"add")+"Class"](e,"pswp--animate_opacity"):setTimeout(function(){a.addClass(e,"pswp--animate_opacity")},30)),qt=setTimeout(function(){if(Ee("initialZoom"+(i?"Out":"In")),i){var r=l.w/t.w,u={x:he.x,y:he.y},d=g,p=ue,m=function(t){1===t?(g=r,he.x=l.x,he.y=l.y-N):(g=(r-d)*t+d,he.x=(l.x-u.x)*t+u.x,he.y=(l.y-N-u.y)*t+u.y),Ze(),o?e.style.opacity=1-t:ke(p-t*p)};n?it("initialZoom",0,1,s,a.easing.cubic.out,m,c):(m(1),qt=setTimeout(c,s+20))}else g=t.initialZoomLevel,ze(he,t.initialPosition),Ze(),ke(1),o?e.style.opacity=1:ke(1),qt=setTimeout(c,s+20)},i?25:90)};d()},rn={},ln=[],sn={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:!1,preload:[1,1],getNumItemsFn:function(){return $t.length}},un=function(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},cn=function(e,t,n){var i=e.bounds;i.center.x=Math.round((rn.x-t)/2),i.center.y=Math.round((rn.y-n)/2)+e.vGap.top,i.max.x=t>rn.x?Math.round(rn.x-t):i.center.x,i.max.y=n>rn.y?Math.round(rn.y-n)+e.vGap.top:i.center.y,i.min.x=t>rn.x?0:i.center.x,i.min.y=n>rn.y?e.vGap.top:i.center.y},dn=function(e,t,n){if(e.src&&!e.loadError){var i=!n;if(i&&(e.vGap||(e.vGap={top:0,bottom:0}),Ee("parseVerticalMargin",e)),rn.x=t.x,rn.y=t.y-e.vGap.top,i){var o=rn.x/e.w,a=rn.y/e.h;e.fitRatio=a>o?o:a;var r=u.scaleMode;"orig"===r?n=1:"fit"===r&&(n=e.fitRatio),n>1&&(n=1),e.initialZoomLevel=n,e.bounds||(e.bounds=un())}if(!n)return;return cn(e,e.w*n,e.h*n),i&&n===e.initialZoomLevel&&(e.initialPosition=e.bounds.center),e.bounds}return e.w=e.h=0,e.initialZoomLevel=e.fitRatio=1,e.bounds=un(),e.initialPosition=e.bounds.center,e.bounds},pn=function(e,t,n,i,o,a){t.loadError||i&&(t.imageAppended=!0,hn(t,i,t===r.currItem&&De),n.appendChild(i),a&&setTimeout(function(){t&&t.loaded&&t.placeholder&&(t.placeholder.style.display="none",t.placeholder=null)},500))},mn=function(e){e.loading=!0,e.loaded=!1;var t=e.img=a.createEl("pswp__img","img"),n=function(){e.loading=!1,e.loaded=!0,e.loadComplete?e.loadComplete(e):e.img=null,t.onload=t.onerror=null,t=null};return t.onload=n,t.onerror=function(){e.loadError=!0,n()},t.src=e.src,t},fn=function(e,t){return e.src&&e.loadError&&e.container?(t&&(e.container.innerHTML=""),e.container.innerHTML=u.errorMsg.replace("%url%",e.src),!0):void 0},hn=function(e,t,n){if(e.src){t||(t=e.container.lastChild);var i=n?e.w:Math.round(e.w*e.fitRatio),o=n?e.h:Math.round(e.h*e.fitRatio);e.placeholder&&!e.loaded&&(e.placeholder.style.width=i+"px",e.placeholder.style.height=o+"px"),t.style.width=i+"px",t.style.height=o+"px"}},vn=function(){if(ln.length){for(var e,t=0;t<ln.length;t++)e=ln[t],e.holder.index===e.index&&pn(e.index,e.item,e.baseDiv,e.img,!1,e.clearPlaceholder);ln=[]}};Me("Controller",{publicMethods:{lazyLoadItem:function(e){e=Te(e);var t=en(e);t&&(!t.loaded&&!t.loading||D)&&(Ee("gettingData",e,t),t.src&&mn(t))},initController:function(){a.extend(u,sn,!0),r.items=$t=n,r.ids=jt=o,en=r.getItemAt,tn=r.getIdsAt,nn=u.getNumItemsFn,on=u.loop,nn()<3&&(u.loop=!1),Ae("beforeChange",function(e){var t,n=u.preload,i=null===e?!0:e>=0,o=Math.min(n[0],nn()),a=Math.min(n[1],nn());for(t=1;(i?a:o)>=t;t++)r.lazyLoadItem(m+t);for(t=1;(i?o:a)>=t;t++)r.lazyLoadItem(m-t)}),Ae("initialLayout",function(){r.currItem.initialLayout=u.getThumbBoundsFn&&u.getThumbBoundsFn(m)}),Ae("mainScrollAnimComplete",vn),Ae("initialZoomInEnd",vn),Ae("destroy",function(){for(var e,t=0;t<$t.length;t++)e=$t[t],e.container&&(e.container=null),e.placeholder&&(e.placeholder=null),e.img&&(e.img=null),e.preloader&&(e.preloader=null),e.loadError&&(e.loaded=e.loadError=!1);ln=null})},getItemAt:function(e){return e>=0&&void 0!==$t[e]?$t[e]:!1},getIdsAt:function(e){return e>=0&&void 0!==jt[e]?jt[e]:!1},allowProgressiveImg:function(){return u.forceProgressiveLoading||!Z||u.mouseUsed||screen.width>1200},setContent:function(e,t){u.loop&&(t=Te(t));var n=r.getItemAt(e.index);n&&(n.container=null);var i,o=r.getItemAt(t);if(!o)return void(e.el.innerHTML="");Ee("gettingData",t,o),e.index=t,e.item=o;var l=o.container=a.createEl("pswp__zoom-wrap");if(!o.src&&o.html&&(o.html.tagName?l.appendChild(o.html):l.innerHTML=o.html),fn(o),dn(o,ve),!o.src||o.loadError||o.loaded)o.src&&!o.loadError&&(i=a.createEl("pswp__img","img"),i.style.opacity=1,i.src=o.src,hn(o,i),pn(t,o,l,i,!0));else{if(o.loadComplete=function(n){if(c){if(e&&e.index===t){if(fn(n,!0))return n.loadComplete=n.img=null,dn(n,ve),Pe(n),void(e.index===m&&r.updateCurrZoomItem());n.imageAppended?!Qt&&n.placeholder&&(n.placeholder.style.display="none",n.placeholder=null):U.transform&&(ae||Qt)?ln.push({item:n,baseDiv:l,img:n.img,index:t,holder:e,clearPlaceholder:!0}):pn(t,n,l,n.img,ae||Qt,!0)}n.loadComplete=null,n.img=null,Ee("imageLoadComplete",t,n)}},a.features.transform){var s="pswp__img pswp__img--placeholder";s+=o.msrc?"":" pswp__img--placeholder--blank";var d=a.createEl(s,o.msrc?"img":"");o.msrc&&(d.src=o.msrc),hn(o,d),l.appendChild(d),o.placeholder=d}o.loading||mn(o),r.allowProgressiveImg()&&(!Jt&&U.transform?ln.push({item:o,baseDiv:l,img:o.img,index:t,holder:e}):pn(t,o,l,o.img,!0,!0))}Jt||t!==m?Pe(o):(oe=l.style,an(o,i||o.img)),e.el.innerHTML="",e.el.appendChild(l)},cleanSlide:function(e){e.img&&(e.img.onload=e.img.onerror=null),e.loaded=e.loading=e.img=e.imageAppended=!1}}});var yn,xn={},gn=function(e,t,n){var i=document.createEvent("CustomEvent"),o={origEvent:e,target:e.target,releasePoint:t,pointerType:n||"touch"};i.initCustomEvent("pswpTap",!0,!0,o),e.target.dispatchEvent(i)};Me("Tap",{publicMethods:{initTap:function(){Ae("firstTouchStart",r.onTapStart),Ae("touchRelease",r.onTapRelease),Ae("destroy",function(){xn={},yn=null})},onTapStart:function(e){e.length>1&&(clearTimeout(yn),yn=null)},onTapRelease:function(e,t){if(t&&!$&&!K&&!Qe){var n=t;if(yn&&(clearTimeout(yn),yn=null,Ct(n,xn)))return void Ee("doubleTap",n);if("mouse"===t.type)return void gn(e,t,"mouse");var i=e.target.tagName.toUpperCase();if("BUTTON"===i||a.hasClass(e.target,"pswp__single-tap"))return void gn(e,t);ze(xn,n),yn=setTimeout(function(){gn(e,t),yn=null},300)}}}});var wn;Me("DesktopZoom",{publicMethods:{initDesktopZoom:function(){z||(Z?Ae("mouseUsed",function(){r.setupDesktopZoom()}):r.setupDesktopZoom(!0))},setupDesktopZoom:function(t){wn={};var n="wheel mousewheel DOMMouseScroll";Ae("bindEvents",function(){a.bind(e,n,r.handleMouseWheel)}),Ae("unbindEvents",function(){wn&&a.unbind(e,n,r.handleMouseWheel)}),r.mouseZoomedIn=!1;var i,o=function(){r.mouseZoomedIn&&(a.removeClass(e,"pswp--zoomed-in"),r.mouseZoomedIn=!1),1>g?a.addClass(e,"pswp--zoom-allowed"):a.removeClass(e,"pswp--zoom-allowed"),l()},l=function(){i&&(a.removeClass(e,"pswp--dragging"),i=!1)};Ae("resize",o),Ae("afterChange",o),Ae("pointerDown",function(){r.mouseZoomedIn&&(i=!0,a.addClass(e,"pswp--dragging"))}),Ae("pointerUp",l),t||o()},handleMouseWheel:function(e){if(g<=r.currItem.fitRatio)return u.modal&&(!u.closeOnScroll||Qe||V?e.preventDefault():k&&Math.abs(e.deltaY)>2&&(p=!0,r.close())),!0;if(e.stopPropagation(),wn.x=0,"deltaX"in e)1===e.deltaMode?(wn.x=18*e.deltaX,wn.y=18*e.deltaY):(wn.x=e.deltaX,wn.y=e.deltaY);else if("wheelDelta"in e)e.wheelDeltaX&&(wn.x=-.16*e.wheelDeltaX),e.wheelDeltaY?wn.y=-.16*e.wheelDeltaY:wn.y=-.16*e.wheelDelta;else{if(!("detail"in e))return;wn.y=e.detail}We(g,!0);var t=he.x-wn.x,n=he.y-wn.y;(u.modal||t<=ie.min.x&&t>=ie.max.x&&n<=ie.min.y&&n>=ie.max.y)&&e.preventDefault(),r.panTo(t,n)},toggleDesktopZoom:function(t){t=t||{x:ve.x/2+xe.x,y:ve.y/2+xe.y};var n=u.getDoubleTapZoom(!0,r.currItem),i=g===n;r.mouseZoomedIn=!i,r.zoomTo(i?r.currItem.initialZoomLevel:n,t,333),a[(i?"remove":"add")+"Class"](e,"pswp--zoomed-in")}}});var bn,In,Cn,Dn,Mn,Tn,Sn,An,En,On,kn,Rn,Zn={history:!0,galleryUID:1},Pn=function(){return kn.hash.substring(1)},Fn=function(){bn&&clearTimeout(bn),Cn&&clearTimeout(Cn)},Ln=function(){var e=Pn(),t={};if(e.length<5)return t;var n,i=e.split("&");for(n=0;n<i.length;n++)if(i[n]){var o=i[n].split("=");o.length<2||(t[o[0]]=o[1])}if(u.galleryPIDs){var a=t.pid;for(t.pid=0,n=0;n<$t.length;n++)if($t[n].pid===a){t.pid=n;break}}else t.pid=parseInt(t.pid,10)-1;return t.pid<0&&(t.pid=0),t},_n=function(){if(Cn&&clearTimeout(Cn),Qe||V)return void(Cn=setTimeout(_n,500));Dn?clearTimeout(In):Dn=!0;var e=m+1,t=en(m);t.hasOwnProperty("pid")&&(e=t.pid);var n=tn(m);Ee("pvCallback",n);var i=Sn+"&gid="+u.galleryUID+"&pid="+e+"&id="+n;An||-1===kn.hash.indexOf(i)&&(On=!0);var o=kn.href.split("#")[0]+"#"+i;Rn?"#"+i!==window.location.hash&&history[An?"replaceState":"pushState"]("",document.title,o):An?kn.replace(o):kn.hash=i,An=!0,In=setTimeout(function(){Dn=!1},60)};Me("History",{publicMethods:{initHistory:function(){if(a.extend(u,Zn,!0),u.history){kn=window.location,On=!1,En=!1,An=!1,Sn=Pn(),Rn="pushState"in history,Sn.indexOf("gid=")>-1&&(Sn=Sn.split("&gid=")[0],Sn=Sn.split("?gid=")[0]),Ae("afterChange",r.updateURL),Ae("unbindEvents",function(){a.unbind(window,"hashchange",r.onHashChange)});var e=function(){Tn=!0,En||(On?history.back():Sn?kn.hash=Sn:Rn?history.pushState("",document.title,kn.pathname+kn.search):kn.hash=""),Fn()};Ae("unbindEvents",function(){p&&e()}),Ae("destroy",function(){Tn||e()}),Ae("firstUpdate",function(){m=Ln().pid});var t=Sn.indexOf("pid=");t>-1&&(Sn=Sn.substring(0,t),"&"===Sn.slice(-1)&&(Sn=Sn.slice(0,-1))),setTimeout(function(){c&&a.bind(window,"hashchange",r.onHashChange)},40)}},onHashChange:function(){return Pn()===Sn?(En=!0,void r.close()):void(Dn||(Mn=!0,r.goTo(Ln().pid),Mn=!1))},updateURL:function(){Fn(),Mn||(An?bn=setTimeout(_n,800):_n())}}}),a.extend(r,ot)};return e});
!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.PhotoSwipeUI_Default=t()}(this,function(){"use strict";var e=function(e,t){var n,o,r,l,i,s,a,u,c,p,d,m,f,h,w,v,g,b,_,T=this,C=!1,I=!0,E=!0,F={barsSize:{top:44,bottom:"auto"},closeElClasses:["item","caption","zoom-wrap","ui","top-bar"],timeToIdle:4e3,timeToIdleOutside:1e3,loadingIndicatorDelay:1e3,addCaptionHTMLFn:function(e,t){return e.title?(t.children[0].innerHTML="<div>"+e.title+"</div>"+(e.content?"<div>"+e.content+"</div>":""),!0):(t.children[0].innerHTML="",!1)},closeEl:!0,captionEl:!0,fullscreenEl:!0,zoomEl:!0,linkEl:!0,shareEl:!0,counterEl:!0,arrowEl:!0,preloaderEl:!0,tapToClose:!1,tapToToggleControls:!0,clickToCloseNonZoomable:!0,shareButtons:[{id:"facebook",label:"分享到 Facebook",url:"https://www.facebook.com/sharer/sharer.php?u={{url}}"},{id:"twitter",label:"分享到 Tweet",url:"https://twitter.com/intent/tweet?text={{text}}&url={{url}}"},{id:"pinterest",label:"分享到 Pinterest",url:"http://www.pinterest.com/pin/create/button/?url={{url}}&media={{image_url}}&description={{text}}"}],getPageHref:function(){return e.currItem.href||""},getImageURLForShare:function(){return e.currItem.src||""},getPageURLForShare:function(){return e.currItem.href||window.location.href},getTextForShare:function(){return e.currItem.title||""},indexIndicatorSep:" / "},x=function(e){if(v)return!0;e=e||window.event,w.timeToIdle&&w.mouseUsed&&!c&&D();for(var n,o,r=e.target||e.srcElement,l=r.className,i=0;i<B.length;i++)n=B[i],n.onTap&&l.indexOf("pswp__"+n.name)>-1&&(n.onTap(),o=!0);if(o){e.stopPropagation&&e.stopPropagation(),v=!0;var s=t.features.isOldAndroid?600:30;g=setTimeout(function(){v=!1},s)}},k=function(){return!e.likelyTouchDevice||w.mouseUsed||screen.width>1200},S=function(e,n,o){t[(o?"add":"remove")+"Class"](e,"pswp__"+n)},K=function(){var e=1===w.getNumItemsFn();e!==h&&(S(o,"ui--one-slide",e),h=e)},L=function(){S(a,"share-modal--hidden",E)},O=function(){return E=!E,E?(t.removeClass(a,"pswp__share-modal--fade-in"),setTimeout(function(){E&&L()},300)):(L(),setTimeout(function(){E||t.addClass(a,"pswp__share-modal--fade-in")},30)),E||y(),!1},R=function(t){t=t||window.event;var n=t.target||t.srcElement;return e.shout("shareLinkClick",t,n),n.href?n.hasAttribute("download")?!0:(window.open(n.href,"pswp_share","scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=550,height=420,top=100,left="+(window.screen?Math.round(screen.width/2-275):100)),E||O(),!1):!1},y=function(){for(var e,t,n,o,r,l="",i=0;i<w.shareButtons.length;i++)e=w.shareButtons[i],n=w.getImageURLForShare(e),o=w.getPageURLForShare(e),r=w.getTextForShare(e),t=e.url.replace("{{url}}",encodeURIComponent(o)).replace("{{image_url}}",encodeURIComponent(n)).replace("{{raw_image_url}}",n).replace("{{text}}",encodeURIComponent(r)),l+='<a href="'+t+'" target="_blank" class="pswp__share--'+e.id+'"'+(e.download?"download":"")+">"+e.label+"</a>",w.parseShareButtonOut&&(l=w.parseShareButtonOut(e,l));a.children[0].innerHTML=l,a.children[0].onclick=R},z=function(e){for(var n=0;n<w.closeElClasses.length;n++)if(t.hasClass(e,"pswp__"+w.closeElClasses[n]))return!0},M=0,D=function(){clearTimeout(_),M=0,c&&T.setIdle(!1)},P=function(e){e=e?e:window.event;var t=e.relatedTarget||e.toElement;t&&"HTML"!==t.nodeName||(clearTimeout(_),_=setTimeout(function(){T.setIdle(!0)},w.timeToIdleOutside))},N=function(){w.fullscreenEl&&!t.features.isOldAndroid&&(n||(n=T.getFullscreenAPI()),n?(t.bind(document,n.eventK,T.updateFullscreen),T.updateFullscreen(),t.addClass(e.template,"pswp--supports-fs")):t.removeClass(e.template,"pswp--supports-fs"))},U=function(){w.preloaderEl&&(A(!0),p("beforeChange",function(){clearTimeout(f),f=setTimeout(function(){e.currItem&&e.currItem.loading?(!e.allowProgressiveImg()||e.currItem.img&&!e.currItem.img.naturalWidth)&&A(!1):A(!0)},w.loadingIndicatorDelay)}),p("imageLoadComplete",function(t,n){e.currItem===n&&A(!0)}))},A=function(e){m!==e&&(S(d,"preloader--active",!e),m=e)},H=function(e){var n=e.vGap;if(k()){var i=w.barsSize;if(w.captionEl&&"auto"===i.bottom)if(l||(l=t.createEl("pswp__caption pswp__caption--fake"),l.appendChild(t.createEl("pswp__caption__center")),o.insertBefore(l,r),t.addClass(o,"pswp__ui--fit")),w.addCaptionHTMLFn(e,l,!0)){var s=l.clientHeight;n.bottom=parseInt(s,10)||44}else n.bottom=i.top;else n.bottom="auto"===i.bottom?0:i.bottom;n.top=i.top}else n.top=n.bottom=0},Z=function(){w.timeToIdle&&p("mouseUsed",function(){t.bind(document,"mousemove",D),t.bind(document,"mouseout",P),b=setInterval(function(){M++,2===M&&T.setIdle(!0)},w.timeToIdle/2)})},q=function(){p("onVerticalDrag",function(e){I&&.95>e?T.hideControls():!I&&e>=.95&&T.showControls()});var e;p("onPinchClose",function(t){I&&.9>t?(T.hideControls(),e=!0):e&&!I&&t>.9&&T.showControls()}),p("zoomGestureEnded",function(){e=!1,e&&!I&&T.showControls()})},B=[{name:"caption",option:"captionEl",onInit:function(e){r=e}},{name:"share-modal",option:"shareEl",onInit:function(e){a=e},onTap:function(){O()}},{name:"button--share",option:"shareEl",onInit:function(e){s=e},onTap:function(){O()}},{name:"button--zoom",option:"zoomEl",onTap:e.toggleDesktopZoom},{name:"button--link",option:"linkEl",onTap:function(e){window.open(w.getPageHref(),"_blank")}},{name:"counter",option:"counterEl",onInit:function(e){i=e}},{name:"button--close",option:"closeEl",onTap:e.close},{name:"button--arrow--left",option:"arrowEl",onTap:e.prev},{name:"button--arrow--right",option:"arrowEl",onTap:e.next},{name:"button--fs",option:"fullscreenEl",onTap:function(){n.isFullscreen()?n.exit():n.enter()}},{name:"preloader",option:"preloaderEl",onInit:function(e){d=e}}],W=function(){var e,n,r,l=function(o){if(o)for(var l=o.length,i=0;l>i;i++){e=o[i],n=e.className;for(var s=0;s<B.length;s++)r=B[s],n.indexOf("pswp__"+r.name)>-1&&(w[r.option]?(t.removeClass(e,"pswp__element--disabled"),r.onInit&&r.onInit(e)):t.addClass(e,"pswp__element--disabled"))}};l(o.children);var i=t.getChildByClass(o,"pswp__top-bar");i&&l(i.children)};T.init=function(){t.extend(e.options,F,!0),w=e.options,o=t.getChildByClass(e.scrollWrap,"pswp__ui"),p=e.listen,q(),p("beforeChange",T.update),p("doubleTap",function(t){var n=e.currItem.initialZoomLevel;e.getZoomLevel()!==n?e.zoomTo(n,t,333):e.zoomTo(w.getDoubleTapZoom(!1,e.currItem),t,333)}),p("preventDragEvent",function(e,t,n){var o=e.target||e.srcElement;o&&o.className&&e.type.indexOf("mouse")>-1&&(o.className.indexOf("__caption")>0||/(SMALL|STRONG|EM)/i.test(o.tagName))&&(n.prevent=!1)}),p("bindEvents",function(){t.bind(o,"pswpTap click",x),t.bind(e.scrollWrap,"pswpTap",T.onGlobalTap),e.likelyTouchDevice||t.bind(e.scrollWrap,"mouseover",T.onMouseOver)}),p("unbindEvents",function(){E||O(),b&&clearInterval(b),t.unbind(document,"mouseout",P),t.unbind(document,"mousemove",D),t.unbind(o,"pswpTap click",x),t.unbind(e.scrollWrap,"pswpTap",T.onGlobalTap),t.unbind(e.scrollWrap,"mouseover",T.onMouseOver),n&&(t.unbind(document,n.eventK,T.updateFullscreen),n.isFullscreen()&&(w.hideAnimationDuration=0,n.exit()),n=null)}),p("destroy",function(){w.captionEl&&(l&&o.removeChild(l),t.removeClass(r,"pswp__caption--empty")),a&&(a.children[0].onclick=null),t.removeClass(o,"pswp__ui--over-close"),t.addClass(o,"pswp__ui--hidden"),T.setIdle(!1)}),w.showAnimationDuration||t.removeClass(o,"pswp__ui--hidden"),p("initialZoomIn",function(){w.showAnimationDuration&&t.removeClass(o,"pswp__ui--hidden")}),p("initialZoomOut",function(){t.addClass(o,"pswp__ui--hidden")}),p("parseVerticalMargin",H),W(),w.shareEl&&s&&a&&(E=!0),K(),Z(),N(),U()},T.setIdle=function(e){c=e,S(o,"ui--idle",e)},T.update=function(){I&&e.currItem?(T.updateIndexIndicator(),w.captionEl&&(w.addCaptionHTMLFn(e.currItem,r),S(r,"caption--empty",!e.currItem.title)),C=!0):C=!1,E||O(),K()},T.updateFullscreen=function(o){o&&setTimeout(function(){e.setScrollOffset(0,t.getScrollY())},50),t[(n.isFullscreen()?"add":"remove")+"Class"](e.template,"pswp--fs")},T.updateIndexIndicator=function(){w.counterEl&&(i.innerHTML=e.getCurrentIndex()+1+w.indexIndicatorSep+w.getNumItemsFn())},T.onGlobalTap=function(n){n=n||window.event;var o=n.target||n.srcElement;if(!v)if(n.detail&&"mouse"===n.detail.pointerType){if(z(o))return void e.close();t.hasClass(o,"pswp__img")&&(1===e.getZoomLevel()&&e.getZoomLevel()<=e.currItem.fitRatio?w.clickToCloseNonZoomable&&e.close():e.toggleDesktopZoom(n.detail.releasePoint))}else if(w.tapToToggleControls&&(I?T.hideControls():T.showControls()),w.tapToClose&&(t.hasClass(o,"pswp__img")||z(o)))return void e.close()},T.onMouseOver=function(e){e=e||window.event;var t=e.target||e.srcElement;S(o,"ui--over-close",z(t))},T.hideControls=function(){t.addClass(o,"pswp__ui--hidden"),I=!1},T.showControls=function(){I=!0,C||T.update(),t.removeClass(o,"pswp__ui--hidden")},T.supportsFullscreen=function(){var e=document;return!!(e.exitFullscreen||e.mozCancelFullScreen||e.webkitExitFullscreen||e.msExitFullscreen)},T.getFullscreenAPI=function(){var t,n=document.documentElement,o="fullscreenchange";return n.requestFullscreen?t={enterK:"requestFullscreen",exitK:"exitFullscreen",elementK:"fullscreenElement",eventK:o}:n.mozRequestFullScreen?t={enterK:"mozRequestFullScreen",exitK:"mozCancelFullScreen",elementK:"mozFullScreenElement",eventK:"moz"+o}:n.webkitRequestFullscreen?t={enterK:"webkitRequestFullscreen",exitK:"webkitExitFullscreen",elementK:"webkitFullscreenElement",eventK:"webkit"+o}:n.msRequestFullscreen&&(t={enterK:"msRequestFullscreen",exitK:"msExitFullscreen",elementK:"msFullscreenElement",eventK:"MSFullscreenChange"}),t&&(t.enter=function(){return u=w.closeOnScroll,w.closeOnScroll=!1,"webkitRequestFullscreen"!==this.enterK?e.template[this.enterK]():void e.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)},t.exit=function(){return w.closeOnScroll=u,document[this.exitK]()},t.isFullscreen=function(){return document[this.elementK]}),t}};return e});

$(function () {
  window.fns = {};

  var $tipTexts = $('#tip_texts');
  var $loading = $('#loading');
  var $menuCkb = $('#menu_ckb');
  $('._ic').imgLiquid ({verticalAlign: 'center'});
  $('time[datetime]').timeago ();

  var $group = { div: $('.group > div'), span: $('.group > span') };
  $group.div.find (' > a.show').each (function () { $(this).parent ().prev ().addClass ('show'); });
  $group.div.each (function () { $(this).addClass ('n' + $(this).find ('> a').length); });
  $group.span.click (function () { $(this).toggleClass ('show'); });
  setTimeout (function () { $group.span.addClass ('t'); }, 500);

  $('.drop_img').OAdropUploadImg ();
  window.fns.IsJsonString = function (str) { try { return JSON.parse (str); } catch (e) { return null; } };

  window.fns._fsg = function (key) { return ((typeof (Storage) !== 'undefined') && (value = localStorage.getItem (key)) && (value = JSON.parse (value))) ? value : undefined; };
  window.fns._fss = function (key, data) { try { if (typeof (Storage) !== 'undefined') { localStorage.setItem (key, JSON.stringify (data)); return true; } return false; } catch (err) { console.error ('Set storage failure.', error); return false; } };
  
  if ($(window).width () > 750) $menuCkb.prop ('checked', window.fns._fsg ('oa.admin.menu') ? true : false);
  $menuCkb.click (function () { if ($(window).width () > 750) window.fns._fss ('oa.admin.menu', $(this).prop ('checked')); });
  setTimeout (function () { $('body').addClass ('ani'); }, 300);
  
  // window.fns.mutiImg = function ($obj) {
  //   if ($obj.length <= 0) return;
  //   $obj.on ('click', '.drop_img > a', function () {
  //     var $parent = $(this).parent ();
  //     $parent.remove ();
  //   });

  //   $obj.on ('change', '.drop_img > input[type="file"]', function () {
  //     if (!$(this).val ().length) return;

  //     var $parent = $(this).parent ();
  //     $parent.find ('input[type="hidden"]').remove ();

  //     if ($obj.find ('>.drop_img').last ().hasClass ('no')) return;
  //     var $n = $parent.clone ().removeAttr ('data-loading').addClass ('no');
  //     $n.find ('img').attr ('src', '');
  //     $n.find ('input').val ('');
  //     $n.OAdropUploadImg ().insertAfter ($parent);
  //   });
  // };
  // window.fns.mutiImg ($('.drop_imgs'));

  autosize ($('.autosize'));

  $('textarea.cke').ckeditor ({
    filebrowserUploadUrl: $('#filebrowserUploadUrl').val (),
    filebrowserImageBrowseUrl: $('#filebrowserImageBrowseUrl').val (),
    skin: 'oa',
    height: 300,
    resize_enabled: false,
    removePlugins: 'elementspath',
    toolbarGroups: [{ name: '1', groups: [ 'mode', 'tools', 'links', 'basicstyles', 'colors', 'insert', 'list', 'Table' ] }],
    removeButtons: 'Strike,Underline,Italic,HorizontalRule,Smiley,Subscript,Superscript,Forms,Save,NewPage,Print,Preview,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Form,RemoveFormat,CreateDiv,BidiLtr,BidiRtl,Language,Anchor,Flash,PageBreak,Iframe,About,Styles',
    extraPlugins: 'tableresize,dropler',
    droplerConfig: {
      backend: 'basic',
      settings: {
        uploadUrl: $('#droplerUploadUrl').val ()
      }
    }
  });
  
  $('.table-list:not(.dy)').each (function () { if (!$(this).find ('tbody > tr').length) $(this).find ('tbody').append ($('<tr />').append ($('<td />').attr ('colspan', $(this).find ('thead th').length).text ('沒有任何資料。'))); });
  $('.table-list.dy').each (function () { if (!$(this).find ('tbody > tr').length) $(this).find ('tbody').append ($('<tr />').append ($('<td />').attr ('colspan', $(this).find ('thead th').length).text ('讀取中，請稍候..'))); });


  window.fns.mutiCol = function ($obj) {
    $obj.each (function () {
      var that = this,
          $row = $(this),
          $span = $row.find ('>span'),
          $b = $row.find ('>b');

      $row.data ('i', 0);

      that.fm = function (i, t) {
        return $('<div />').append (
          $('<div />').append (
            $('<a />').click (function () {
              var $p = $(this).parent ().parent ();
              $p.clone (true).insertBefore ($p.index () == 1 ? $span : $p.prev ());
              $p.remove ();
            })).append (
            $('<a />').click (function () {
              var $p = $(this).parent ().parent (), $x = $p.next (), $n = $p.clone (true);
              if ($x.is ('span')) $n.insertAfter ($b); else $n.insertAfter ($x);
              $p.remove ();
            }))).append (Array.apply (null, Array ($row.data ('cnt'))).map (function (_, j) {

              return $('<input />').attr ('type', $row.data ('attrs')[j].type ? $row.data ('attrs')[j].type : null)
                                   .attr ('name', $row.data ('attrs')[j].name + '[' + i + ']' + ($row.data ('attrs')[j].key ? '[' + $row.data ('attrs')[j].key + ']' : ''))
                                   .attr ('placeholder', $row.data ('attrs')[j].placeholder ? $row.data ('attrs')[j].placeholder : null)
                                   .attr ('accept', $row.data ('attrs')[j].accept ? $row.data ('attrs')[j].accept : null)
                                   .attr ('class', $row.data ('attrs')[j].class ? $row.data ('attrs')[j].class : null)
                                   .val (t ? $row.data ('attrs')[j].key && typeof t[$row.data ('attrs')[j].key] !== 'undefined' ? t[$row.data ('attrs')[j].key] : (typeof t === 'object' ? '' : t) : '');
            })).append (
          $('<a />').click (function () { $(this).parent ().remove (); }));
      };

      if ($row.data ('vals'))
        $row.data ('vals').forEach (function (t) {
          that.fm ($row.data ('i'), t).insertBefore ($span);
          $row.data ('i', parseInt ($row.data ('i'), 10) + 1);
        });

      $span.find ('a').click (function () {
        var $t = that.fm ($row.data ('i')).insertBefore ($span);
        $row.data ('i', parseInt ($row.data ('i'), 10) + 1);
        setTimeout (function () { $t.find ('input').first ().focus (); }, 100);
      });

      that.fm ($row.data ('i')).insertBefore ($span);
      $row.data ('i', parseInt ($row.data ('i'), 10) + 1);
    });
  };

  window.fns.mutiCol ($('form .row.muti'));

  window.fns.tipText = function (obj) {
    var $a = $('<a />').click (function () { $(this).parent ().fadeOut (550, function () { $(this).remove (); }); });
    var $t = $('<div />').append (
      $('<span />').text (obj.title)).append (
      $('<span />').text (obj.message)).append (
      typeof obj.error !== 'undefined' ? $('<span />').html ('※ 錯誤原因如下，您可以截圖給工程人員。').add ($('<div />').text (obj.error)) : null).append (
      $a);
    setTimeout (function () { $a.click (); }, 5500);
    return $tipTexts.prepend ($t.fadeIn ());
  };

  window.fns.updateCounter = function (key, result) {
    if (typeof key === 'undefined') return;
    $('*[data-cntrole*="' + key + '"]').each (function () { $(this).attr ('data-cnt', (result ? -1 : 1) + parseInt ($(this).attr ('data-cnt'), 10)); });
  };

  window.fns.updateHide = function (key, result) {
    if (typeof key === 'undefined') return;
    $('*[data-hide*="' + key + '"]').each (function () { $(this).addClass (result ? 'hide' : null).removeClass (result ? null : 'hide'); });
  };

  window.fns.ajaxFail = function (r) {
    if ((t = window.fns.IsJsonString (r.responseText)) !== null) window.fns.tipText ({title: '設定錯誤！', message: t.message});
    else window.fns.tipText ({title: '設定錯誤！', message: '※ 不明原因錯誤，請重新整理網頁確認。', error: r.responseText});
  };

  $('.table-list .switch.ajax[data-column][data-url]').each (function () {
    var $that = $(this), column = $that.data ('column'), url = $that.data ('url'), $inp = $that.find ('input[type="checkbox"]');

    $inp.click (function () {
      if ($that.hasClass ('loading')) return;

      var data = {};
      data[column] = $(this).prop ('checked') ? 1 : 0;

      $that.addClass ('loading');

      $.ajax ({
        url: url,
        data: data,
        async: true, cache: false, dataType: 'json', type: 'POST'
      })
      .done (function (result) {
        $(this).prop ('checked', result);
        
        $that.removeClass ('loading');
        window.fns.updateCounter ($that.data ('forcntrole'), result);
        window.fns.updateHide ($that.data ('forhide'), result);

      }.bind ($(this)))
      .fail (function (result) {
        $that.removeClass ('loading');
        $(this).prop ('checked', !data[column]);

        window.fns.ajaxFail (result);
      }.bind ($(this)));
    });
  });

  $('a[data-method="delete"]').click (function () {
    var title = $(this).data ('alert') ? $(this).data ('alert') : '確定要刪除？';
    if (!confirm (title)) return false;
    else return true;
  });

  $('form.form-type2 .sorts').sortable ({
    items: 'div.sort',
    placeholder: 'sort_highlight',
    update: function () {
      $(this).find ('.sort').each (function (i) {
        $(this).attr ('data-i', i + 1);
      });
    }
  });

  window.fns.showLoading = function (str) {
    $loading.get (0)._t = setTimeout (function () {
      $loading.addClass ('s').find ('span').text (typeof str === 'undefined' ? '請稍候..' : str);
    }, 300);
  };

  window.fns.closeLoading = function () {
    clearTimeout ($loading.get (0)._t);
    $loading.removeClass ('s');
  };

  $('form.loading[method="post"]').submit (function () {
    if ($(this).data ('is_submit') === true) return false;
    $(this).data ('is_submit', true);

    var $m = $(this).find ('input[type="hidden"][name="_method"]');

    return window.fns.showLoading (($m.length && $m.val () == 'put' ? '更新中，' : '新增中，') + '請稍候..');
  });


  $('.search .dysltckb').each (function () {
    var $that = $(this);
    var $select = $that.find ('select');
    var name = $select.attr ('data-name');
    var $checkboxs = $that.find ('.checkboxs');
    var val = (typeof $select.data ('val') === 'undefined' ? [] : $select.data ('val')).map (function (t) {
      return parseInt (t, 10);
    });


    $select.change (function () {
      var ckbs = $(this).data ('ckbs').filter (function (t) {
        return t.parent_id == $(this).val ();
      }.bind ($(this)));

      $checkboxs.empty ().append (ckbs.map (function (t) {
        return $('<label />').addClass ('checkbox').append (
          $('<input />').attr ('type', 'checkbox').attr ('name', name).val (t.value).prop ('checked', $.inArray (t.value, val) != -1)).append (
          $('<span />')).append (
          t.text);
      }));
    });

    if (val.length) {
      var ckbs = $select.data ('ckbs').filter (function (t) { return $.inArray (t.value, val) != -1; }.bind ($(this))).map (function (t) { return t.parent_id; });
      $select.find ('option').each (function () {
        $(this).prop ('selected', $.inArray (parseInt ($(this).val (), 10), ckbs) != -1);
      });
      $select.change ();
    }
  });


  window.fns.oaips = function (gs, fnx) {
    var oaops = function (index, $pswp, $obj, da, fromURL) {
      if (isNaN (index)) return;

      var items = $obj.get (0).$objs.map (function () {
        var $img = $(this).find ('img:not(hide)'), $figcaption = $(this).find ('figcaption'), $himg = $(this).find ('img.hide');
          return { w: $himg.length ? $himg.get (0).width : $img.get (0).width, h: $himg.length ? $himg.get (0).height : $img.get (0).height, src: $himg.length ? $himg.attr ('src') : $img.attr ('src'), href: $(this).attr ('href'), title: $figcaption.html (), content: $figcaption.data ('description'), el: $(this).get (0), };
        }).toArray (), options = {
          showHideOpacity: true,
          galleryUID: $obj.data ('pswp-uid'),
          showAnimationDuration: da ? 0 : 500,
          index: parseInt (index, 10) - (fromURL ? 1 : 0),
          getThumbBoundsFn: function (index) { var pageYScroll = window.pageYOffset || document.documentElement.scrollTop, rect = items[index].el.getBoundingClientRect (); return { x:rect.left, y:rect.top + pageYScroll, w:rect.width }; }
        }, gallery = new PhotoSwipe ($pswp.get (0), PhotoSwipeUI_Default, items, options, $obj.get (0).$objs.map (function () { return $(this).data ('pvid') ? $(this).data ('pvid') : '';
        // $(this).data ('id');
        }));

      gallery.init (function (pvid) { if (!(pvid.length && pvid.split ('-').length == 2)) return false; window.func.addPv (pvid.split ('-')[0], pvid.split ('-')[1]); });

      $pswp.get (0).$conter.width (Math.floor (gallery.currItem.w * gallery.currItem.fitRatio) - 20);
      gallery.listen ('beforeChange', function() { $pswp.get (0).$conter.removeClass ('show'); $pswp.get (0).$conter.width (Math.floor (gallery.currItem.w * gallery.currItem.fitRatio - 20)); });
      gallery.listen ('afterChange', function() { $pswp.get (0).$conter.addClass ('show'); });
      gallery.listen ('resize', function() { $pswp.get (0).$conter.width (Math.floor (gallery.currItem.w * gallery.currItem.fitRatio - 20)); });
    };
    var $pswp = $('<div class="pswp"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="關閉 (Esc)"></button><button class="pswp__button pswp__button--share" title="分享"></button><button class="pswp__button pswp__button--link" title="鏈結"></button><button class="pswp__button pswp__button--fs" title="全螢幕切換"></button><button class="pswp__button pswp__button--zoom" title="放大/縮小"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="上一張"></button><button class="pswp__button pswp__button--arrow--right" title="下一張"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>').appendTo ($('body')), $obj = $(gs), params = {};
    if (!$obj.length) return false;

    $pswp.get (0).$conter = $pswp.find ('div.pswp__caption__center');

    $obj.each (function (i) {
      var $that = $(this);
      $that.data ('pswp-uid', i + 1);
      $that.get (0).$objs = $that.find (fnx).each (function () { if ($(this).data ('src')) $(this).append ($('<img />').attr ('src', $(this).data ('src')).addClass ('hide')); });
      $that.find (fnx).click (function () { oaops ($that.get (0).$objs.index ($(this)), $pswp, $that); });
    });

    window.location.hash.replace ('#', '').split ('&').forEach (function (t, i) { if (!(t && (t = t.split ('=')).length && !isNaN (t[1]))) return; params[t[0]] = t[1]; });
    if (params && params.gid && params.pid) setTimeout (function () { oaops (params.pid - 1,  $pswp, $obj.eq (params.gid - 1), true, true); }, 100);
  }
  $('.oaips').each (function () {
    if ($(this).find ('>*').length > 1)
      $(this).attr ('data-cnt', $(this).find ('>*').length);
  });
  window.fns.oaips ('.oaips', '.oaip');
});