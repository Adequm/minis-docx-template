(function(e){function t(t){for(var r,o,s=t[0],l=t[1],c=t[2],u=0,p=[];u<s.length;u++)o=s[u],Object.prototype.hasOwnProperty.call(n,o)&&n[o]&&p.push(n[o][0]),n[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);d&&d(t);while(p.length)p.shift()();return a.push.apply(a,c||[]),i()}function i(){for(var e,t=0;t<a.length;t++){for(var i=a[t],r=!0,s=1;s<i.length;s++){var l=i[s];0!==n[l]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=i[0]))}return e}var r={},n={app:0},a=[];function o(t){if(r[t])return r[t].exports;var i=r[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=e,o.c=r,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(i,r,function(t){return e[t]}.bind(null,r));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/minis-docx-template/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var d=l;a.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},"15c3":function(e,t,i){},"36f4":function(e,t,i){"use strict";i("63ca")},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d"),i("c4d1");var r,n=i("2b0e"),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container",class:{fullscreen:e.isFullscreen},style:{height:e.innerHeight+"px",maxWidth:e.isDesktop?e.containerWidth+"px":"100vw",maxHeight:e.isDesktop?e.containerHeight+"px":"100vh"}},[e.isPageLoad?i("div",{staticClass:"minis__wrapper"},[e.isDesktop?i("SettingsDesktop",{attrs:{themeIcon:e.themeMain.icon,appHeight:e.appHeight,appWidth:e.appWidth,translate:e.translate,translateDef:e.translateDef,showHints:e.minisHints},on:{switchHints:e.switchHints,switchTheme:e.switchTheme,switchLang:e.switchLang,switchFullscreen:function(t){return e.$store.commit(e.switchFullscreenKey)}},model:{value:e.isClosedSettings,callback:function(t){e.isClosedSettings=t},expression:"isClosedSettings"}}):e._e(),i("LayoutContent",{ref:"layoutContent",style:{filter:e.openedModalName?"blur(2px)":"none"},attrs:{appWidth:e.appWidth,appHeight:e.appHeight,bodyHeight:e.innerHeight,isDesktop:e.isDesktop,isWidthMore768:e.isWidthMore768},on:{switchSettings:function(t){e.isClosedSettings=!e.isClosedSettings},updateInputFocus:function(t){e.onInputFocus=t},openModal:function(t){e.openedModalName=t}}}),i("AppModal",{attrs:{isRoundedBorder:e.isWidthMore768&&!e.isFullscreen},model:{value:e.openedModalName,callback:function(t){e.openedModalName=t},expression:"openedModalName"}},["settings"==e.openedModalName?i("SettingsMobile",{attrs:{themeIcon:e.themeMain.icon,isWidthMore768:e.isWidthMore768},on:{switchTheme:e.switchTheme,switchLang:e.switchLang,switchFullscreen:function(t){return e.$store.commit(e.switchFullscreenKey)}}}):e._e()],1),e.isDesktop?i("div",{staticClass:"resize_button",on:{mousedown:function(t){return t.preventDefault(),e.startResize.apply(null,arguments)},dblclick:function(t){return t.preventDefault(),e.autoResize.apply(null,arguments)}}}):e._e(),e.isDesktop?i("a",{staticClass:"minis",attrs:{href:"https://adequm.github.io/minis",target:"_blank"},domProps:{textContent:e._s("Minis")}}):e._e()],1):i("AppLoader",{attrs:{size:100,rotate:""}})],1)},o=[],s=i("ade3"),l=i("5530"),c=i("2ef0"),d=i.n(c),u=i("b54a"),p=i("1c09"),h=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"minis__content",style:{minHeight:e.appHeight+"px",gridTemplateRows:e.gridTemplateRows}},[i("AppNavigation",{attrs:{isDesktop:e.isDesktop,isModeEditor:e.isModeEditor,isExistRepository:!!e.globalRepositorySize&&!!e.lodash.size(e.renderVariablesArray[e.slideIndexEditor]),isGenerated:e.isGenerated},on:{openModal:function(t){return e.$emit("openModal",t)},switchModeEditor:function(t){e.isModeEditor=!e.isModeEditor},generate:function(t){return e.generateDocx(e.repositoryArray)}}}),i("div",{staticClass:"minis__display"},[e.isModeEditor?i("LayoutEditor",{attrs:{appWidth:e.appWidth,appHeight:e.appHeight,bodyHeight:e.bodyHeight,slideIndex:e.slideIndexEditor,isVariablesMode:!1,delimiterStart:e.delimiterStart,delimiterEnd:e.delimiterEnd,globalRepositoryPath:e.globalRepositoryPath,renderVariablesArray:e.renderVariablesArray},on:{changeSlide:function(t){e.slideIndexEditor=t},deleteRenderVariable:e.deleteRenderVariable,addRenderVariable:e.addRenderVariable,removeEditorHistory:function(t){return e.removeEditorHistory(e.slideIndexEditor)},addEditorHistory:e.addEditorHistory,updatePage:e.updatePage}}):i("LayoutFiles",{attrs:{appWidth:e.appWidth,appHeight:e.appHeight,bodyHeight:e.bodyHeight,repositoryArray:e.repositoryArray,globalRepositoryPath:e.globalRepositoryPath,globalRepositoryHash:e.globalRepositoryHash,globalRepositorySize:e.globalRepositorySize},on:{addFilesToGlobalRepository:e.addFilesToGlobalRepository,deleteFileFromGlobalRepository:e.deleteFileFromGlobalRepository,updateGlobalRepositoryPath:e.updateGlobalRepositoryPath}})],1)],1)},f=[],m=(i("a9e3"),i("99af"),i("3835")),y=i("1da1"),b=(i("d81d"),i("d3b7"),i("ddb0"),i("ac1f"),i("5319"),i("b0c0"),i("3ca3"),i("96cf"),i("547c")),v=i.n(b),g=i("c4e3"),x=i.n(g),w=i("fbf9"),R=i.n(w),k=i("21a6"),S=i("2f62"),E={data:function(){return{isConvertDocToDocx:!1,isGenerated:!1,archiveJSON:{},convertsRenderVariables:{}}},computed:Object(l["a"])({},Object(S["d"])(["delimiterStart","delimiterEnd","renderVariables","renderVariablesArray"])),methods:{generateDocx:function(){var e=arguments,t=this;return Object(y["a"])(regeneratorRuntime.mark((function i(){var r,n,a;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return r=e.length>0&&void 0!==e[0]?e[0]:[],i.prev=1,t.isGenerated=!0,i.next=5,t.getConvertRenderVariables();case 5:return i.next=7,t.addToArchiveJSON(r);case 7:return i.next=9,t.zipArchive(new x.a,t.archiveJSON);case 9:return n=i.sent,i.next=12,n.generateAsync({type:"blob"});case 12:a=i.sent,Object(k["saveAs"])(a,"".concat(Date.now(),".zip")),i.next=19;break;case 16:i.prev=16,i.t0=i["catch"](1),console.error("generateDocx: ",i.t0);case 19:return i.prev=19,t.isGenerated=!1,i.finish(19);case 22:case"end":return i.stop()}}),i,null,[[1,16,19,22]])})))()},getConvertRenderVariables:function(){var e=this.renderVariablesArray[this.slideIndexEditor],t=d.a.chain(e).map(d.a.values).fromPairs().value(),i=this.delimiterStart,r=this.delimiterEnd,a=new Proxy(t,{get:function(e,t){var n="string"==typeof t?i+t+r:t;return t in e?e[t]:n}});n["default"].set(this,"convertsRenderVariables",a)},convertDocToDocx:function(e,t){return new Promise(function(){var i=Object(y["a"])(regeneratorRuntime.mark((function i(r){var n,a,o,s,l,c;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,a=ConvertApi.auth({secret:"MVr5O4MfBxWNyK0U"}),o=a.createParams(),o.add("File",t.file),i.next=6,a.convert("doc","docx",o);case 6:if(s=i.sent,l=null===s||void 0===s||null===(n=s.files)||void 0===n?void 0:n[0].Url,l){i.next=10;break}throw"Empty [link]";case 10:return i.next=12,new Promise((function(e){return fetch(l).then((function(e){return e.blob()})).then(e)}));case 12:c=i.sent,c&&(e=e.replace(/,doc$/,",docx"),t.file=c,t.fullname=t.fullname.replace(/\.doc$/,".docx"),t.ext="docx"),i.next=19;break;case 16:i.prev=16,i.t0=i["catch"](0),console.error("convertDocToDocx: ",i.t0);case 19:return i.prev=19,r({name:e,data:t}),i.finish(19);case 22:case"end":return i.stop()}}),i,null,[[0,16,19,22]])})));return function(e){return i.apply(this,arguments)}}())},convertTemplate:function(e){var t=this;return new Promise(function(){var i=Object(y["a"])(regeneratorRuntime.mark((function i(r,n){var a,o,s;return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:if("docx"!=e.ext){i.next=18;break}return i.prev=1,o=new FileReader,o.readAsBinaryString(e.file),o.onerror=console.error,i.next=7,new Promise((function(e){return o.onload=e}));case 7:return s=i.sent,i.next=10,t.convertTemplateDocx(s);case 10:a=i.sent,i.next=16;break;case 13:i.prev=13,i.t0=i["catch"](1),n(i.t0);case 16:i.next=19;break;case 18:a=e.file;case 19:r(a);case 20:case"end":return i.stop()}}),i,null,[[1,13]])})));return function(e,t){return i.apply(this,arguments)}}())},convertTemplateDocx:function(e){try{var t=e.target.result,i=new v.a(t),r=this.delimiterStart,n=this.delimiterEnd,a={delimiters:{start:r,end:n},paragraphLoop:!0,linebreaks:!0},o=new R.a(i,a);o.render(this.convertsRenderVariables);var s="application/vnd.openxmlformats-officedocument.wordprocessingml.document";return o.getZip().generate({type:"blob",mimeType:s})}catch(l){console.error("Docxtemplater: ",l)}},addToArchiveJSON:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return new Promise(function(){var r=Object(y["a"])(regeneratorRuntime.mark((function r(n){var a;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=d.a.map(t,(function(t){var r=Object(m["a"])(t,2),n=r[0],a=r[1];return new Promise(function(){var t=Object(y["a"])(regeneratorRuntime.mark((function t(r){var o,s,l,c,u;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a.isFile){t.next=21;break}if("doc"!==a.ext||!e.isConvertDocToDocx){t.next=7;break}return t.next=4,e.convertDocToDocx(n,a);case 4:o=t.sent,n=o.name,a=o.data;case 7:return t.prev=7,t.next=10,e.convertTemplate(a);case 10:s=t.sent,l=a.fullname.replace(/\./g,","),c=i?"".concat(i,".").concat(l):l,d.a.set(e.archiveJSON,c,s),t.next=19;break;case 16:t.prev=16,t.t0=t["catch"](7),console.dir("FileReader, convert: ",t.t0);case 19:t.next=24;break;case 21:return u=i?"".concat(i,".").concat(n):n,t.next=24,e.addToArchiveJSON(d.a.entries(a),u);case 24:r();case 25:case"end":return t.stop()}}),t,null,[[7,16]])})));return function(e){return t.apply(this,arguments)}}())})),r.next=3,Promise.all(a);case 3:n();case 4:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())},zipArchive:function(e,t){var i=this,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";return new Promise(function(){var n=Object(y["a"])(regeneratorRuntime.mark((function n(a){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return o=d.a.map(t,(function(t,n){return new Promise(function(){var a=Object(y["a"])(regeneratorRuntime.mark((function a(o){var s,l;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(s=n.replace(/,/g,"."),l=r?"".concat(r,"/").concat(s):s,!d.a.isPlainObject(t)){a.next=7;break}return a.next=5,i.zipArchive(e,t,l);case 5:a.next=9;break;case 7:return a.next=9,e.file(l,t,{createFolders:!0});case 9:o();case 10:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}())})),n.next=3,Promise.all(o);case 3:a(e);case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}())}}},H=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"layout swiper-horizontal",attrs:{id:"layout-editor"}},[i("div",{staticClass:"input_files_container"},[i("AppInputFiles",{attrs:{id:"1",placeholder:e.translate("files.inputs.files.placeholder"),icon:"add-document",multiple:""},on:{upload:function(t){return e.$emit("addFilesToGlobalRepository",t.target.files)}}}),i("AppInputFiles",{attrs:{id:"2",placeholder:e.translate("files.inputs.folders.placeholder"),icon:"add-folder",allowdirs:"",directory:"",webkitdirectory:""},on:{upload:function(t){return e.$emit("addFilesToGlobalRepository",t.target.files)}}})],1),i("div",{staticClass:"layout__display"},[i("div",{staticClass:"layout__display_content"},[i("Swiper",{ref:"swiper"},[i("SwiperSlide",[i("div",{staticClass:"slide__container",style:{height:e.slideHeight+"px"}},[e.globalRepositorySize?i("DisplayFiles",{key:e.globalRepositoryHash,attrs:{data:e.repositoryArray,path:e.globalRepositoryPath,displayWidth:e.appWidth-40},on:{back:function(t){return e.$emit("updateGlobalRepositoryPath")},folder:function(t){return e.$emit("updateGlobalRepositoryPath",t)},remove:function(t){return e.$emit("deleteFileFromGlobalRepository",t)}}}):i("DisplayEmpty",{attrs:{text:e.translate("files.displays.empty.title"),icon:"folder"}})],1)])],1)],1)])])},j=[],O=i("d7cf"),P=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"empty__container"},[i("Icon",{attrs:{type:e.icon,size:96,strokeWidth:1}}),i("span",{domProps:{textContent:e._s(e.text)}}),e.button?i("button",{domProps:{textContent:e._s(e.button)},on:{click:function(t){return e.$emit("click")}}}):e._e()],1)},C=[],A={name:"DisplayEmpty",components:{Icon:u["e"]},props:{text:String,icon:String,button:[String,Number,Boolean]}},M=A,T=(i("90ff"),i("2877")),$=Object(T["a"])(M,P,C,!1,null,"6fc42ace",null),F=$.exports,V=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container-scroll"},[i("div",{staticClass:"chunk",style:{gridTemplateColumns:"repeat("+e.columnsRepeat+", minmax(170px, 1fr))"}},[i("div",{staticClass:"chunk_item chunk_item-first colorful",style:{gridColumnEnd:e.columnsRepeat+1},on:{click:function(t){return e.$emit("back")}}},[i("span",{domProps:{textContent:e._s(e.pathLink)}}),i("div",{staticClass:"chunk_item_icons"},[i("span",{staticStyle:{"margin-right":"3px"},domProps:{textContent:e._s(e.lodash.size(e.data))}}),i("Icon",{attrs:{type:"arrow-down",size:16}})],1)]),e._l(e.data,(function(t){var r=t[0],n=t[1];return i("div",{key:r,staticClass:"chunk_item",class:{colorful:!n.isFile},on:{click:function(t){!n.isFile&&e.$emit("folder",r)}}},[i("span",{domProps:{textContent:e._s(e.getName(n,r))}}),i("div",{staticClass:"chunk_item_icons"},[n.isFile?e._e():i("span",{staticStyle:{"margin-right":"3px"},domProps:{textContent:e._s(e.lodash.size(n))}}),i("Icon",{attrs:{type:"trash",size:16},on:{click:function(t){return t.stopPropagation(),e.$emit("remove",r)}}})],1)])}))],2)])},D=[],I={name:"DisplayFiles",components:{Icon:u["e"]},props:{data:Array,path:String,displayWidth:Number},data:function(){return{lodash:d.a}},computed:{columnsRepeat:function(){var e=d.a.size(this.data),t=Math.floor((this.displayWidth-10*(e+1))/170);return Math.min(t,e)},pathLink:function(){var e="...";return this.path&&(e+="/"+this.path.replace(/\./g,"/")),e}},methods:{getName:function(e,t){return e.isFile?e.fullname:"".concat(t,"/")}}},W=I,N=(i("a21b"),Object(T["a"])(W,V,D,!1,null,"49689634",null)),z=N.exports,G={name:"LayoutFiles",mixins:[p["e"]],components:{AppInputFiles:u["a"],DisplayEmpty:F,DisplayFiles:z,Swiper:O["Swiper"],SwiperSlide:O["SwiperSlide"]},props:{appWidth:Number,appHeight:Number,bodyHeight:Number,repositoryArray:Array,globalRepositoryHash:Number,globalRepositorySize:Number,globalRepositoryPath:String},data:function(){return{lodash:_,swiperRef:null,slideHeight:0}},watch:{appWidth:["setSlideWidth","setSlideHeight"],appHeight:["setSlideWidth","setSlideHeight"],bodyHeight:{immediate:!0,handler:"setSlideHeight"}},methods:{setSlideHeight:function(){var e=this;this.$nextTick((function(){var t,i,r;e.slideHeight=null===(t=e.$refs)||void 0===t||null===(i=t.swiper)||void 0===i||null===(r=i.$el)||void 0===r?void 0:r.offsetHeight}))},setSlideWidth:function(){var e=this,t=this.appWidth-40,i=document.querySelector("#layout-editor .swiper-wrapper");_.invoke(null===i||void 0===i?void 0:i.style,"setProperty","max-width","".concat(t,"px"));var r=document.querySelectorAll("#layout-editor .swiper-slide");[].forEach.call(r,(function(i,r){i.style.setProperty("width","".concat(t,"px")),e.swiperRef.slidesGrid[r]=r*t,e.swiperRef.snapGrid[r]=r*t,e.swiperRef.slidesSizesGrid[r]=t}))}},mounted:function(){this.swiperRef=this.$refs.swiper.swiperRef,this.$nextTick(this.setSlideWidth)}},B=G,L=(i("36f4"),Object(T["a"])(B,H,j,!1,null,"923f7514",null)),K=L.exports,J=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"layout swiper-horizontal",attrs:{id:"layout-editor"}},[i("AppTextarea",{ref:"textarea",staticStyle:{"margin-bottom":"10px"},attrs:{resize:e.appWidth,value:e.isVariablesMode?e.valueKey:e.valueResult,placeholder:e.textareaPlaceholder,title:e.textareaTitle,titlePrepend:e.textareaTitlePrepend},on:{input:e.inputTextarea,submit:e.submitTextarea,updateInputFocus:function(t){return e.$emit("updateInputFocus",t)},clickToTitle:function(t){e.$refs.textarea.focus()&&(e.isVariablesMode=!e.isVariablesMode)}}}),i("div",{staticClass:"layout__display",class:{isEnd:e.isEnd,isBeginning:e.isBeginning}},[i("div",{staticClass:"layout__display_content"},[i("Swiper",{ref:"swiper",on:{activeIndexChange:function(t){return e.$emit("changeSlide",t.realIndex)}}},[e.lodash.size(e.renderVariablesArray)?e._l(e.renderVariablesArray,(function(t,r){return i("SwiperSlide",{key:r},[i("div",{staticClass:"slide__container",style:{height:e.slideHeight+"px"}},[t.length?i("DisplayEditor",{attrs:{chunk:t},on:{remove:e.deleteVariable,edit:e.editVariable}}):i("DisplayEmpty",{attrs:{text:e.translate("editor.displays.empty.title"),icon:"notebook"}})],1)])})):i("SwiperSlide",[i("div",{staticClass:"slide__container",style:{height:e.slideHeight+"px"}},[i("DisplayEmpty",{attrs:{text:e.translate("editor.displays.empty.title"),icon:"notebook"}})],1)])],2)],1),i("SlideButtons",{attrs:{limit:e.slideList.length,isBeginning:e.isBeginning,isEnd:e.isEnd,value:e.slideIndex,showCenterButton:!0,centerButtonDisabled:!e.lodash.size(e.renderVariablesArray[0]),centerButtonIcon:e.slideIndex?"trash":"disk",centerButtonSize:14},on:{input:function(t){return e.$emit("changeSlide",t)},clickToCenterButton:e.clickToCenterButton}})],1)],1)},q=[],U=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"container-scroll"},e._l(e.chunk,(function(t,r){var n=t.key,a=t.value;return i("div",{key:n+"_"+r,staticClass:"item"},[i("span",{staticClass:"item__key",domProps:{textContent:e._s(n)}}),i("span",{staticClass:"item__text",domProps:{textContent:e._s(a)}}),i("div",{staticClass:"item__icons"},[i("Icon",{attrs:{type:"edit",size:16},on:{click:function(t){return e.$emit("edit",{key:n,value:a})}}}),i("Icon",{attrs:{type:"trash",size:16},on:{click:function(t){return e.$emit("remove",{key:n})}}})],1)])})),0)},Z=[],Q={name:"DisplayEditor",components:{Icon:u["e"]},props:{chunk:Array}},X=Q,Y=(i("dc1b"),Object(T["a"])(X,U,Z,!1,null,"04f4fa0c",null)),ee=Y.exports,te={name:"LayoutEditor",mixins:[p["e"]],components:{SlideButtons:u["h"],AppTextarea:u["d"],DisplayEditor:ee,DisplayEmpty:F,Swiper:O["Swiper"],SwiperSlide:O["SwiperSlide"]},props:{appWidth:Number,appHeight:Number,bodyHeight:Number,delimiterStart:String,delimiterEnd:String,renderVariablesArray:Array,slideIndex:Number},data:function(){return{lodash:_,swiperRef:null,slideHeight:0,valueKey:null,valueResult:null,isVariablesMode:!0}},watch:{appWidth:["setSlideWidth","setSlideHeight"],appHeight:["setSlideWidth","setSlideHeight"],slideIndex:function(e){this.swiperRef.slideTo(e),this.setSlideWidth()},bodyHeight:{immediate:!0,handler:"setSlideHeight"},valueKey:["setSlideHeight"],valueResult:["setSlideHeight"]},computed:{isEnd:function(){var e=this.slideIndex===this.slideList.length-1;return!!this.swiperRef&&this.swiperRef.isEnd||e},isBeginning:function(){var e=0===this.slideIndex;return!!this.swiperRef&&this.swiperRef.isBeginning||e},slideList:function(){var e;return(null===(e=this.swiperRef)||void 0===e?void 0:e.slides)||[]},textareaTitle:function(){var e=this.delimiterStart+this.valueKey+this.delimiterEnd;return this.isVariablesMode?this.valueResult:this.valueKey&&e},textareaPlaceholder:function(){return this.isVariablesMode?this.translate("editor.textareas.placeholders.key"):this.translate("editor.textareas.placeholders.value")},textareaTitlePrepend:function(){return this.isVariablesMode?this.translate("editor.textareas.placeholders.value"):this.translate("editor.textareas.placeholders.key")}},methods:{setSlideHeight:function(){var e=this;this.$nextTick((function(){var t,i,r,n;e.slideHeight=null===(t=e.$refs)||void 0===t||null===(i=t.swiper)||void 0===i||null===(r=i.$el)||void 0===r||null===(n=r.parentElement)||void 0===n?void 0:n.offsetHeight}))},setSlideWidth:function(){var e=this,t=this.appWidth-40,i="translate3d(-".concat(this.slideIndex*t,"px, 0px, 0px)"),r=document.querySelector("#layout-editor .swiper-wrapper");_.invoke(null===r||void 0===r?void 0:r.style,"setProperty","max-width","".concat(t,"px")),_.invoke(null===r||void 0===r?void 0:r.style,"setProperty","transform",i);var n=document.querySelectorAll("#layout-editor .swiper-slide");[].forEach.call(n,(function(i,r){i.style.setProperty("width","".concat(t,"px")),e.swiperRef.slidesGrid[r]=r*t,e.swiperRef.snapGrid[r]=r*t,e.swiperRef.slidesSizesGrid[r]=t}))},inputTextarea:function(e){this.isVariablesMode?this.valueKey=e:this.valueResult=e},submitTextarea:function(e){this.isVariablesMode=!this.isVariablesMode,this.valueKey&&this.valueResult&&(this.$emit("addRenderVariable",{index:this.slideIndex,value:this.valueResult,key:this.valueKey}),this.valueKey="",this.valueResult=""),this.$nextTick(this.setSlideWidth)},deleteVariable:function(e,t){var i=e.key;if(this.$emit("deleteRenderVariable",{key:i,index:this.slideIndex}),!t){var r=_.size(this.renderVariablesArray)-1,n=_.clamp(this.slideIndex,0,r);this.$emit("changeSlide",n),this.$emit("updatePage")}},editVariable:function(e){var t=e.key,i=e.value;this.deleteVariable({key:t},!0),this.valueKey=t,this.valueResult=i,this.$refs.textarea.focus(),this.isVariablesMode=!1},clickToCenterButton:function(){if(this.slideIndex){this.$emit("removeEditorHistory");var e=_.size(this.renderVariablesArray)-1,t=_.clamp(this.slideIndex,0,e);this.$emit("changeSlide",t)}else{if(!_.size(this.renderVariablesArray[0]))return;this.$emit("addEditorHistory"),this.$emit("changeSlide",1)}this.$emit("updatePage")}},mounted:function(){this.swiperRef=this.$refs.swiper.swiperRef,this.swiperRef.slideTo(this.slideIndex,0),this.$nextTick(this.setSlideWidth)}},ie=te,re=(i("91ca"),Object(T["a"])(ie,J,q,!1,null,"40bcb044",null)),ne=re.exports,ae=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"navigation"},[i("button",{staticClass:"navigation__item",domProps:{textContent:e._s(e.pageName)},on:{click:function(t){return e.$emit("switchModeEditor")}}}),e.isDesktop?e._e():i("button",{staticClass:"navigation__item navigation__item-settings nofocus nohover",on:{click:function(t){return e.$emit("openModal","settings")}}},[i("Icon",{attrs:{type:"settings"}})],1),i("button",{staticClass:"navigation__item navigation__item-special",attrs:{disabled:!e.isExistRepository},on:{click:function(t){e.isExistRepository&&!e.isGenerated&&e.$emit("generate")}}},[e.isGenerated?i("Icon",{attrs:{type:"time-oclock",rotate:""}}):i("Icon",{attrs:{type:"paper-plane"}})],1)])},oe=[],se={name:"AppNavigation",mixins:[p["e"]],components:{Icon:u["e"]},props:{isDesktop:Boolean,isModeEditor:Boolean,isExistRepository:Boolean,isGenerated:Boolean},data:function(){return{lodash:d.a}},computed:{pageName:function(){return this.isModeEditor?this.translate("files.title"):this.translate("editor.title")}}},le=se,ce=(i("68fb"),Object(T["a"])(le,ae,oe,!1,null,"02c4b34e",null)),de=ce.exports,ue={name:"LayoutContent",mixins:[E],components:{Icon:u["e"],LayoutFiles:K,LayoutEditor:ne,AppNavigation:de},props:{appWidth:Number,appHeight:Number,bodyHeight:Number,isDesktop:Boolean,isWidthMore768:Boolean},data:function(){return{lodash:d.a,isModeEditor:!1,slideIndexEditor:0}},computed:Object(l["a"])(Object(l["a"])({},Object(S["d"])(["repositoryArray","delimiterStart","delimiterEnd","renderVariablesArray","globalRepositoryPath","globalRepositoryHash","globalRepositorySize"])),{},{gridTemplateRows:function(){var e=Math.min(.15*this.appHeight,85),t=this.appHeight-e;return"".concat(e,"px ").concat(t,"px")}}),methods:Object(l["a"])(Object(l["a"])(Object(l["a"])({},Object(S["b"])(["addFilesToGlobalRepository","deleteFileFromGlobalRepository","updateGlobalRepositoryPath"])),Object(S["c"])(["addRenderVariable","deleteRenderVariable","removeEditorHistory","addEditorHistory"])),{},{keydown:function(e){var t=e.key;e.shiftKey;switch(t){case"Escape":this.$emit("switchSettings");break}},updatePage:function(){var e=this,t=this.isModeEditor;this.isModeEditor=!t,this.$nextTick((function(){return e.isModeEditor=t}))}}),beforeMount:function(){document.addEventListener("keydown",this.keydown)},beforeDestroy:function(){document.removeEventListener("keydown",this.keydown)}},pe=ue,he=(i("e133"),Object(T["a"])(pe,h,f,!1,null,null,null)),fe=he.exports,me=(r={components:{LayoutContent:fe,AppModal:u["c"],SettingsDesktop:u["f"],SettingsMobile:u["g"],AppLoader:u["b"]},mixins:[p["b"],p["d"],p["a"],p["e"]],data:function(){return{lodash:d.a,isClosedSettings:!0,openedModalName:null,slideIndexHistory:0}},watch:{isDesktop:function(e){e&&"settings"==this.openedModalName&&(this.openedModalName=null,this.isClosedSettings=!1)}}},Object(s["a"])(r,"components",Object(l["a"])({},Object(S["d"])(["switchFullscreenKey"]))),Object(s["a"])(r,"beforeMount",(function(){var e=this;document.body.addEventListener("click",(function(t){document.body===d.a.get(t.path,0)&&e.isDesktop&&(e.isClosedSettings||(e.isClosedSettings=!0))}))})),r),ye=me,be=(i("5c0b"),Object(T["a"])(ye,a,o,!1,null,null,null)),ve=be.exports,ge=i("9483");Object(ge["a"])("".concat("/minis-docx-template/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var xe,we=i("2909"),Re=(i("a15b"),i("fb6a"),i("1276"),i("2ca0"),i("c740"),i("a434"),i("0e44")),ke=i("0759"),Se=i.n(ke),_e=location.pathname.split("/")[1].split("-").slice(1).join("-"),Ee="".concat(_e,"-isFullscreen"),He={};n["default"].use(S["a"]),He.state=function(){var e;return e={},Object(s["a"])(e,Ee,!1),Object(s["a"])(e,"switchFullscreenKey","switch_".concat(Ee)),Object(s["a"])(e,"projectKey",_e),Object(s["a"])(e,"delimiterStart","{{:"),Object(s["a"])(e,"delimiterEnd",":}}"),Object(s["a"])(e,"globalRepositoryHash",null),Object(s["a"])(e,"globalRepositorySize",null),Object(s["a"])(e,"globalRepositoryPath",null),Object(s["a"])(e,"globalRepository",{}),Object(s["a"])(e,"repositoryArray",[]),Object(s["a"])(e,"renderVariablesArray",[]),e},He.getters={isFullscreen:function(e){return e[Ee]}},He.actions={addFilesToGlobalRepository:function(e,t){var i=e.commit;e.state;d.a.each(t,(function(e,t){if(!e.name.startsWith("~")&&!e.name.startsWith(".")){var r=(e.webkitRelativePath||e.name).replace(/\./g,",").split("/"),n=d.a.last(r).split(","),a=n.join("."),o=d.a.last(n),s=n.slice(0,-1).join("."),l=!0;i("addFileToGlobalRepository",{path:r.join("."),file:{file:e,name:s,ext:o,isFile:l,fullname:a}})}})),i("updateRepositoryArray"),i("updateHash")},updateGlobalRepositoryPath:function(e,t){var i=e.commit,r=e.state,n=d.a.compact(d.a.split(r.globalRepositoryPath,"."));if(t||n.length){var a=t?d.a.join(n.concat(t),"."):d.a.join(n.slice(0,-1),".");i("updateGlobalRepositoryPath",a),i("updateRepositoryArray"),i("updateHash")}},deleteFileFromGlobalRepository:function(e,t){var i=e.commit,r=e.state,n=d.a.chain(r.globalRepositoryPath).split(".").compact().concat(t).join(".").value();i("updateGlobalRepository",d.a.omit(r.globalRepository,n)),i("updateRepositoryArray"),i("updateHash")}},He.mutations=(xe={},Object(s["a"])(xe,"switch_".concat(Ee),(function(e){return n["default"].set(e,Ee,!e[Ee])})),Object(s["a"])(xe,"addFileToGlobalRepository",(function(e,t){var i=t.path,r=t.file,n=e.globalRepositoryPath?e.globalRepository:e,a=e.globalRepositoryPath||"globalRepository",o=d.a.get(n,a,{});d.a.set(o,i,r),d.a.set(n,a,o)})),Object(s["a"])(xe,"updateGlobalRepositoryPath",(function(e,t){return n["default"].set(e,"globalRepositoryPath",t)})),Object(s["a"])(xe,"updateGlobalRepository",(function(e,t){return n["default"].set(e,"globalRepository",t)})),Object(s["a"])(xe,"updateHash",(function(e){e.globalRepositorySize=d.a.size(e.globalRepository),e.globalRepositoryHash=Date.now()})),Object(s["a"])(xe,"updateRepositoryArray",(function(e){var t=!!e.globalRepositoryPath,i=t?e.globalRepository:e,r=t?e.globalRepositoryPath:"globalRepository";e.repositoryArray=d.a.chain(i).get(r,{}).entries().sortBy("[1].isFile").reverse().value()})),Object(s["a"])(xe,"addRenderVariable",(function(e,t){var i=e.renderVariablesArray,r=t.index,a=t.key,o=t.value,s=d.a.get(i,r,[]);s.push({key:a,value:o}),n["default"].set(i,r,s)})),Object(s["a"])(xe,"deleteRenderVariable",(function(e,t){var i=e.renderVariablesArray,r=t.key,a=t.index,o=d.a.get(i,a);if(o){var s=d.a.findIndex(o,{key:r});if(o.splice(s,1),d.a.size(o))n["default"].set(i,a,o);else{if(!a)return;i.splice(a,1)}}})),Object(s["a"])(xe,"removeEditorHistory",(function(e,t){var i=e.renderVariablesArray;i.splice(t,1)})),Object(s["a"])(xe,"addEditorHistory",(function(e){var t=e.renderVariablesArray;t.unshift([])})),xe);var je=[Ee,"renderVariablesArray","delimiterStart","delimiterEnd"];He.modules={minis:p["f"]},He.plugins=[Se()({predicate:function(){return[].concat(Object(we["a"])(p["c"]),je)}}),Object(Re["a"])({paths:p["c"],key:"minis"}),Object(Re["a"])({paths:je,key:"minis-".concat(_e)})];var Oe=new S["a"].Store(He);n["default"].config.productionTip=!1,new n["default"]({store:Oe,render:function(e){return e(ve)}}).$mount("#app")},"5c0b":function(e,t,i){"use strict";i("9c0c")},"63ca":function(e,t,i){},"68fb":function(e,t,i){"use strict";i("15c3")},"90ff":function(e,t,i){"use strict";i("e81e")},"91ca":function(e,t,i){"use strict";i("fb8a")},"9c0c":function(e,t,i){},a21b:function(e,t,i){"use strict";i("f7b5")},d1f2:function(e,t,i){},dc1b:function(e,t,i){"use strict";i("d1f2")},e133:function(e,t,i){"use strict";i("eed6")},e81e:function(e,t,i){},eed6:function(e,t,i){},f7b5:function(e,t,i){},fb8a:function(e,t,i){}});
//# sourceMappingURL=app.5d72af6d.js.map