//@prepros-append "../../app/app.module.js"
//@prepros-append "../../app/app.filter.js"
//@prepros-append "../../app/app.routes.js"
//@prepros-append "../../app/common/*/*.js"
//@prepros-append "../../app/components/*/*.js"
;var app = angular.module('tutApp', [
	'ngRoute', 'ngFileUpload', 'angular-storage', 'angularUtils.directives.dirPagination', 'ui.bootstrap'
]) //;

	.run(function ($rootScope) {
	})
;/* */
;app.config(['$routeProvider', function ($routeProvider) {
	$routeProvider

	/* Home */
		.when("/", {
			templateUrl: "app/components/home/homeView.html",
			controller: "HomeCtrl"
		})

		/* Static Pages */
		.when("/faq", {
			templateUrl: "app/components/static/faqView.html",
			controller: "HomeCtrl"
		})
		.when("/about", {
			templateUrl: "app/components/static/aboutView.html",
			controller: "HomeCtrl"
		})
		.when("/contact", {
			templateUrl: "app/components/static/contactView.html",
			controller: "HomeCtrl"
		})

		/* Login & Register - Members */

		.when("/register/members", {
			templateUrl: "app/components/register/registerMembersView.html",
			controller: "RegisterCtrl"
		})
		.when("/login/members", {
			templateUrl: "app/components/login/loginMembersView.html",
			controller: "LoginCtrl"
		})

		/* Login & Register - Providers */
		.when("/register/providers", {
			templateUrl: "app/components/register/registerProvidersView.html",
			controller: "RegisterCtrl"
		})
		.when("/login/providers", {
			templateUrl: "app/components/login/loginProvidersView.html",
			controller: "LoginCtrl"
		})

		/* Search */
		.when("/search/:keyword", {
			templateUrl: "app/components/search/resultView.html",
			controller: "SearchCtrl"
		})

		/* Course Details */
		.when("/courses/:coursesId", {
			templateUrl: "app/components/courses/coursesView.html",
			controller: "CoursesCtrl"
		})

		/* Payments */
		.when("/payments/login/:coursesId", {
			templateUrl: "app/components/payments/loginView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/register/:coursesId", {
			templateUrl: "app/components/register/registerMembersView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/:coursesId", {
			templateUrl: "app/components/payments/paymentsView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/successful/:coursesId", {
			templateUrl: "app/components/payments/successfulView.html",
			controller: "PaymentsCtrl"
		})
		.when("/payments/failure/:coursesId", {
			templateUrl: "app/components/payments/failureView.html",
			controller: "PaymentsCtrl"
		})

		/* Members */

		.when("/members/dashboard", {
			templateUrl: "app/components/members/dashboardView.html",
			controller: "MembersCtrl"
		})
		.when("/members/profile", {
			templateUrl: "app/components/members/profileView.html",
			controller: "MembersCtrl"
		})
		.when("/members/password", {
			templateUrl: "app/components/members/passwordView.html",
			controller: "MembersCtrl"
		})
		.when("/members/payment-records", {
			templateUrl: "app/components/members/paymentRecordsView.html",
			controller: "MembersCtrl"
		})

		/* Providers */

		.when("/providers/dashboard", {
			templateUrl: "app/components/providers/dashboardView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/transaction-records", {
			templateUrl: "app/components/providers/transactionRecordsView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/profile", {
			templateUrl: "app/components/providers/profileView.html",
			controller: "ProvidersCtrl"
		})
		.when("/providers/password", {
			templateUrl: "app/components/providers/passwordView.html",
			controller: "ProvidersCtrl"
		})

		/* Providers - Attendance / Lessons Management */

		.when("/providers/lessons/:coursesId", {
			templateUrl: "app/components/attendance/lessonsView.html",
			controller: "AttendanceCtrl"
		})
		.when("/providers/attendance/:coursesId", {
			templateUrl: "app/components/attendance/attendanceView.html",
			controller: "AttendanceCtrl"
		})
		.when("/providers/upload/:coursesId", {
			templateUrl: "app/components/upload/uploadView.html",
			controller: "UploadCtrl"
		})
		.when("/providers/documents/:coursesId", {
			templateUrl: "app/components/documents/documentsView.html",
			controller: "DocumentsCtrl"
		})

		/* Else 404 */
		.otherwise('/');
}]);
app.directive('bookingCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<booking-course dir-paginate='course in courses | itemsPerPage: 5' course='course' city='city' category='category' coursesDetails='coursesDetails'></booking-course>"
		}
	})
	.directive('bookingCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/bookingCourses.html"
		}
	})
;app.directive('coursesHead', function () {
	return {
		restrict: 'E',
		scope: {
			title: '@title',
			description: '@description',
			category: '@category',
			color: '@color',
			location: '@location',
			courseDate: '@courseDate'
		},
		templateUrl: "app/common/app/coursesHead.html"
	}
});
app.directive('dashboardHead', function () {
	return {
		restrict: 'E',
		scope: {
			title: '@title',
			description: '@description'
		},
		templateUrl: "app/common/app/dashboardHead.html"
	}
});
app.directive('datetimepicker', function () {
	return {

		restrict: 'A',
		// Always use along with an ng-model
		require: '?ngModel',

		link: function (scope, element, attrs, ngModel) {
			if (!ngModel) return;

			ngModel.$render = function () { //This will update the view with your model in case your model is changed by another code.
				element.datetimepicker('update', ngModel.$viewValue || '');
			};
			element.datetimepicker().on("dp.change", function (event) {
				scope.$apply(function () {
					ngModel.$setViewValue(moment(event.date).format('YYYY-MM-DD'));//This will update the model property bound to your ng-model whenever the datepicker's date changes.
				});
			});
		}
	};
});
app.directive('footer', function () {
    return {
        restrict: 'A',
        scope: {
            user: '='
        },
        templateUrl: "app/common/app/footer.html"
    }
});
app.directive('fullCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<full-course dir-paginate='course in courses | itemsPerPage: 5' city='city' course='course' category='category' coursesDetails='coursesDetails'></full-course>"
		}
	})
	.directive('fullCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/fullCourses.html"
		}
	})
;app.directive('header', function () {
	return {
		restrict: 'A',
		scope: {
			category: '=',
			user: '=',
			status: '=',
			type: '=',
			logout: '=',
			token: '=',
			username: '='
		},
		templateUrl: "app/common/app/header.html"
	}
});
/*! 12.0.4 */
!function(){function a(a,b){window.XMLHttpRequest.prototype[a]=b(window.XMLHttpRequest.prototype[a])}function b(a,b,c){try{Object.defineProperty(a,b,{get:c})}catch(d){}}if(window.FileAPI||(window.FileAPI={}),!window.XMLHttpRequest)throw"AJAX is not supported. XMLHttpRequest is not defined.";if(FileAPI.shouldLoad=!window.FormData||FileAPI.forceLoad,FileAPI.shouldLoad){var c=function(a){if(!a.__listeners){a.upload||(a.upload={}),a.__listeners=[];var b=a.upload.addEventListener;a.upload.addEventListener=function(c,d){a.__listeners[c]=d,b&&b.apply(this,arguments)}}};a("open",function(a){return function(b,d,e){c(this),this.__url=d;try{a.apply(this,[b,d,e])}catch(f){f.message.indexOf("Access is denied")>-1&&(this.__origError=f,a.apply(this,[b,"_fix_for_ie_crossdomain__",e]))}}}),a("getResponseHeader",function(a){return function(b){return this.__fileApiXHR&&this.__fileApiXHR.getResponseHeader?this.__fileApiXHR.getResponseHeader(b):null==a?null:a.apply(this,[b])}}),a("getAllResponseHeaders",function(a){return function(){return this.__fileApiXHR&&this.__fileApiXHR.getAllResponseHeaders?this.__fileApiXHR.getAllResponseHeaders():null==a?null:a.apply(this)}}),a("abort",function(a){return function(){return this.__fileApiXHR&&this.__fileApiXHR.abort?this.__fileApiXHR.abort():null==a?null:a.apply(this)}}),a("setRequestHeader",function(a){return function(b,d){if("__setXHR_"===b){c(this);var e=d(this);e instanceof Function&&e(this)}else this.__requestHeaders=this.__requestHeaders||{},this.__requestHeaders[b]=d,a.apply(this,arguments)}}),a("send",function(a){return function(){var c=this;if(arguments[0]&&arguments[0].__isFileAPIShim){var d=arguments[0],e={url:c.__url,jsonp:!1,cache:!0,complete:function(a,d){a&&angular.isString(a)&&-1!==a.indexOf("#2174")&&(a=null),c.__completed=!0,!a&&c.__listeners.load&&c.__listeners.load({type:"load",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),!a&&c.__listeners.loadend&&c.__listeners.loadend({type:"loadend",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),"abort"===a&&c.__listeners.abort&&c.__listeners.abort({type:"abort",loaded:c.__loaded,total:c.__total,target:c,lengthComputable:!0}),void 0!==d.status&&b(c,"status",function(){return 0===d.status&&a&&"abort"!==a?500:d.status}),void 0!==d.statusText&&b(c,"statusText",function(){return d.statusText}),b(c,"readyState",function(){return 4}),void 0!==d.response&&b(c,"response",function(){return d.response});var e=d.responseText||(a&&0===d.status&&"abort"!==a?a:void 0);b(c,"responseText",function(){return e}),b(c,"response",function(){return e}),a&&b(c,"err",function(){return a}),c.__fileApiXHR=d,c.onreadystatechange&&c.onreadystatechange(),c.onload&&c.onload()},progress:function(a){if(a.target=c,c.__listeners.progress&&c.__listeners.progress(a),c.__total=a.total,c.__loaded=a.loaded,a.total===a.loaded){var b=this;setTimeout(function(){c.__completed||(c.getAllResponseHeaders=function(){},b.complete(null,{status:204,statusText:"No Content"}))},FileAPI.noContentTimeout||1e4)}},headers:c.__requestHeaders};e.data={},e.files={};for(var f=0;f<d.data.length;f++){var g=d.data[f];null!=g.val&&null!=g.val.name&&null!=g.val.size&&null!=g.val.type?e.files[g.key]=g.val:e.data[g.key]=g.val}setTimeout(function(){if(!FileAPI.hasFlash)throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';c.__fileApiXHR=FileAPI.upload(e)},1)}else{if(this.__origError)throw this.__origError;a.apply(c,arguments)}}}),window.XMLHttpRequest.__isFileAPIShim=!0,window.FormData=FormData=function(){return{append:function(a,b,c){b.__isFileAPIBlobShim&&(b=b.data[0]),this.data.push({key:a,val:b,name:c})},data:[],__isFileAPIShim:!0}},window.Blob=Blob=function(a){return{data:a,__isFileAPIBlobShim:!0}}}}(),function(){function a(a){return"input"===a[0].tagName.toLowerCase()&&a.attr("type")&&"file"===a.attr("type").toLowerCase()}function b(){try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(a)return!0}catch(b){if(void 0!==navigator.mimeTypes["application/x-shockwave-flash"])return!0}return!1}function c(a){var b=0,c=0;if(window.jQuery)return jQuery(a).offset();if(a.offsetParent)do b+=a.offsetLeft-a.scrollLeft,c+=a.offsetTop-a.scrollTop,a=a.offsetParent;while(a);return{left:b,top:c}}if(FileAPI.shouldLoad){if(FileAPI.hasFlash=b(),FileAPI.forceLoad&&(FileAPI.html5=!1),!FileAPI.upload){var d,e,f,g,h,i=document.createElement("script"),j=document.getElementsByTagName("script");if(window.FileAPI.jsUrl)d=window.FileAPI.jsUrl;else if(window.FileAPI.jsPath)e=window.FileAPI.jsPath;else for(f=0;f<j.length;f++)if(h=j[f].src,g=h.search(/\/ng\-file\-upload[\-a-zA-z0-9\.]*\.js/),g>-1){e=h.substring(0,g+1);break}null==FileAPI.staticPath&&(FileAPI.staticPath=e),i.setAttribute("src",d||e+"FileAPI.min.js"),document.getElementsByTagName("head")[0].appendChild(i)}FileAPI.ngfFixIE=function(d,e,f){if(!b())throw'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';var g=function(){var b=e.parent();d.attr("disabled")?b&&b.removeClass("js-fileapi-wrapper"):(e.attr("__ngf_flash_")||(e.unbind("change"),e.unbind("click"),e.bind("change",function(a){h.apply(this,[a]),f.apply(this,[a])}),e.attr("__ngf_flash_","true")),b.addClass("js-fileapi-wrapper"),a(d)||(b.css("position","absolute").css("top",c(d[0]).top+"px").css("left",c(d[0]).left+"px").css("width",d[0].offsetWidth+"px").css("height",d[0].offsetHeight+"px").css("filter","alpha(opacity=0)").css("display",d.css("display")).css("overflow","hidden").css("z-index","900000").css("visibility","visible"),e.css("width",d[0].offsetWidth+"px").css("height",d[0].offsetHeight+"px").css("position","absolute").css("top","0px").css("left","0px")))};d.bind("mouseenter",g);var h=function(a){for(var b=FileAPI.getFiles(a),c=0;c<b.length;c++)void 0===b[c].size&&(b[c].size=0),void 0===b[c].name&&(b[c].name="file"),void 0===b[c].type&&(b[c].type="undefined");a.target||(a.target={}),a.target.files=b,a.target.files!==b&&(a.__files_=b),(a.__files_||a.target.files).item=function(b){return(a.__files_||a.target.files)[b]||null}}},FileAPI.disableFileInput=function(a,b){b?a.removeClass("js-fileapi-wrapper"):a.addClass("js-fileapi-wrapper")}}}(),window.FileReader||(window.FileReader=function(){var a=this,b=!1;this.listeners={},this.addEventListener=function(b,c){a.listeners[b]=a.listeners[b]||[],a.listeners[b].push(c)},this.removeEventListener=function(b,c){a.listeners[b]&&a.listeners[b].splice(a.listeners[b].indexOf(c),1)},this.dispatchEvent=function(b){var c=a.listeners[b.type];if(c)for(var d=0;d<c.length;d++)c[d].call(a,b)},this.onabort=this.onerror=this.onload=this.onloadstart=this.onloadend=this.onprogress=null;var c=function(b,c){var d={type:b,target:a,loaded:c.loaded,total:c.total,error:c.error};return null!=c.result&&(d.target.result=c.result),d},d=function(d){b||(b=!0,a.onloadstart&&a.onloadstart(c("loadstart",d)));var e;"load"===d.type?(a.onloadend&&a.onloadend(c("loadend",d)),e=c("load",d),a.onload&&a.onload(e),a.dispatchEvent(e)):"progress"===d.type?(e=c("progress",d),a.onprogress&&a.onprogress(e),a.dispatchEvent(e)):(e=c("error",d),a.onerror&&a.onerror(e),a.dispatchEvent(e))};this.readAsDataURL=function(a){FileAPI.readAsDataURL(a,d)},this.readAsText=function(a){FileAPI.readAsText(a,d)}});
/*! 12.0.4 */
!window.XMLHttpRequest||window.FileAPI&&FileAPI.shouldLoad||(window.XMLHttpRequest.prototype.setRequestHeader=function(a){return function(b,c){if("__setXHR_"===b){var d=c(this);d instanceof Function&&d(this)}else a.apply(this,arguments)}}(window.XMLHttpRequest.prototype.setRequestHeader));var ngFileUpload=angular.module("ngFileUpload",[]);ngFileUpload.version="12.0.4",ngFileUpload.service("UploadBase",["$http","$q","$timeout",function(a,b,c){function d(d){function e(a){j.notify&&j.notify(a),k.progressFunc&&c(function(){k.progressFunc(a)})}function h(a){return null!=d._start&&g?{loaded:a.loaded+d._start,total:d._file&&d._file.size||a.total,type:a.type,config:d,lengthComputable:!0,target:a.target}:a}function i(){a(d).then(function(a){g&&d._chunkSize&&!d._finished&&d._file?(e({loaded:d._end,total:d._file&&d._file.size,config:d,type:"progress"}),f.upload(d,!0)):(d._finished&&delete d._finished,j.resolve(a))},function(a){j.reject(a)},function(a){j.notify(a)})}d.method=d.method||"POST",d.headers=d.headers||{};var j=d._deferred=d._deferred||b.defer(),k=j.promise;return d.disableProgress||(d.headers.__setXHR_=function(){return function(a){a&&a.upload&&a.upload.addEventListener&&(d.__XHR=a,d.xhrFn&&d.xhrFn(a),a.upload.addEventListener("progress",function(a){a.config=d,e(h(a))},!1),a.upload.addEventListener("load",function(a){a.lengthComputable&&(a.config=d,e(h(a)))},!1))}}),g?d._chunkSize&&d._end&&!d._finished?(d._start=d._end,d._end+=d._chunkSize,i()):d.resumeSizeUrl?a.get(d.resumeSizeUrl).then(function(a){d._start=d.resumeSizeResponseReader?d.resumeSizeResponseReader(a.data):parseInt((null==a.data.size?a.data:a.data.size).toString()),d._chunkSize&&(d._end=d._start+d._chunkSize),i()},function(a){throw a}):d.resumeSize?d.resumeSize().then(function(a){d._start=a,i()},function(a){throw a}):(d._chunkSize&&(d._start=0,d._end=d._start+d._chunkSize),i()):i(),k.success=function(a){return k.then(function(b){a(b.data,b.status,b.headers,d)}),k},k.error=function(a){return k.then(null,function(b){a(b.data,b.status,b.headers,d)}),k},k.progress=function(a){return k.progressFunc=a,k.then(null,null,function(b){a(b)}),k},k.abort=k.pause=function(){return d.__XHR&&c(function(){d.__XHR.abort()}),k},k.xhr=function(a){return d.xhrFn=function(b){return function(){b&&b.apply(k,arguments),a.apply(k,arguments)}}(d.xhrFn),k},f.promisesCount++,k["finally"](function(){f.promisesCount--}),k}function e(a){var b={};for(var c in a)a.hasOwnProperty(c)&&(b[c]=a[c]);return b}var f=this;f.promisesCount=0,this.isResumeSupported=function(){return window.Blob&&window.Blob.prototype.slice};var g=this.isResumeSupported();this.isUploadInProgress=function(){return f.promisesCount>0},this.rename=function(a,b){return a.ngfName=b,a},this.jsonBlob=function(a){null==a||angular.isString(a)||(a=JSON.stringify(a));var b=new window.Blob([a],{type:"application/json"});return b._ngfBlob=!0,b},this.json=function(a){return angular.toJson(a)},this.isFile=function(a){return null!=a&&(a instanceof window.Blob||a.flashId&&a.name&&a.size)},this.upload=function(a,b){function c(b,c){if(b._ngfBlob)return b;if(a._file=a._file||b,null!=a._start&&g){a._end&&a._end>=b.size&&(a._finished=!0,a._end=b.size);var d=b.slice(a._start,a._end||b.size);return d.name=b.name,d.ngfName=b.ngfName,a._chunkSize&&(c.append("_chunkSize",a._chunkSize),c.append("_currentChunkSize",a._end-a._start),c.append("_chunkNumber",Math.floor(a._start/a._chunkSize)),c.append("_totalSize",a._file.size)),d}return b}function h(b,d,e){if(void 0!==d)if(angular.isDate(d)&&(d=d.toISOString()),angular.isString(d))b.append(e,d);else if(f.isFile(d)){var g=c(d,b),i=e.split(",");i[1]&&(g.ngfName=i[1].replace(/^\s+|\s+$/g,""),e=i[0]),a._fileKey=a._fileKey||e,b.append(e,g,g.ngfName||g.name)}else if(angular.isObject(d)){if(d.$$ngfCircularDetection)throw"ngFileUpload: Circular reference in config.data. Make sure specified data for Upload.upload() has no circular reference: "+e;d.$$ngfCircularDetection=!0;try{for(var j in d)if(d.hasOwnProperty(j)&&"$$ngfCircularDetection"!==j){var k=null==a.objectKey?"[i]":a.objectKey;d.length&&parseInt(j)>-1&&(k=null==a.arrayKey?k:a.arrayKey),h(b,d[j],e+k.replace(/[ik]/g,j))}}finally{delete d.$$ngfCircularDetection}}else b.append(e,d)}function i(){a._chunkSize=f.translateScalars(a.resumeChunkSize),a._chunkSize=a._chunkSize?parseInt(a._chunkSize.toString()):null,a.headers=a.headers||{},a.headers["Content-Type"]=void 0,a.transformRequest=a.transformRequest?angular.isArray(a.transformRequest)?a.transformRequest:[a.transformRequest]:[],a.transformRequest.push(function(b){var c,d=new window.FormData;b=b||a.fields||{},a.file&&(b.file=a.file);for(c in b)if(b.hasOwnProperty(c)){var e=b[c];a.formDataAppender?a.formDataAppender(d,c,e):h(d,e,c)}return d})}return b||(a=e(a)),a._isDigested||(a._isDigested=!0,i()),d(a)},this.http=function(b){return b=e(b),b.transformRequest=b.transformRequest||function(b){return window.ArrayBuffer&&b instanceof window.ArrayBuffer||b instanceof window.Blob?b:a.defaults.transformRequest[0].apply(this,arguments)},b._chunkSize=f.translateScalars(b.resumeChunkSize),b._chunkSize=b._chunkSize?parseInt(b._chunkSize.toString()):null,d(b)},this.translateScalars=function(a){if(angular.isString(a)){if(a.search(/kb/i)===a.length-2)return parseFloat(1024*a.substring(0,a.length-2));if(a.search(/mb/i)===a.length-2)return parseFloat(1048576*a.substring(0,a.length-2));if(a.search(/gb/i)===a.length-2)return parseFloat(1073741824*a.substring(0,a.length-2));if(a.search(/b/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/s/i)===a.length-1)return parseFloat(a.substring(0,a.length-1));if(a.search(/m/i)===a.length-1)return parseFloat(60*a.substring(0,a.length-1));if(a.search(/h/i)===a.length-1)return parseFloat(3600*a.substring(0,a.length-1))}return a},this.urlToBlob=function(c){var d=b.defer();return a({url:c,method:"get",responseType:"arraybuffer"}).then(function(a){var b=new Uint8Array(a.data),c=a.headers("content-type")||"image/WebP",e=new window.Blob([b],{type:c});d.resolve(e)},function(a){d.reject(a)}),d.promise},this.setDefaults=function(a){this.defaults=a||{}},this.defaults={},this.version=ngFileUpload.version}]),ngFileUpload.service("Upload",["$parse","$timeout","$compile","$q","UploadExif",function(a,b,c,d,e){function f(a,b,c){var e=[i.emptyPromise()];return angular.forEach(a,function(d,f){0===d.type.indexOf("image/jpeg")&&i.attrGetter("ngfFixOrientation",b,c,{$file:d})&&e.push(i.happyPromise(i.applyExifRotation(d),d).then(function(b){a.splice(f,1,b)}))}),d.all(e)}function g(a,b,c){var e=i.attrGetter("ngfResize",b,c);if(!e||!i.isResizeSupported()||!a.length)return i.emptyPromise();if(!(e instanceof Function))return h(e,a,b,c);var f=d.defer();e(a).then(function(d){h(d,a,b,c).then(function(a){f.resolve(a)},function(a){f.reject(a)})},function(a){f.reject(a)})}function h(a,b,c,e){function f(d,f){if(0===d.type.indexOf("image")){if(a.pattern&&!i.validatePattern(d,a.pattern))return;var h=i.resize(d,a.width,a.height,a.quality,a.type,a.ratio,a.centerCrop,function(a,b){return i.attrGetter("ngfResizeIf",c,e,{$width:a,$height:b,$file:d})},a.restoreExif!==!1);g.push(h),h.then(function(a){b.splice(f,1,a)},function(a){d.$error="resize",d.$errorParam=(a?(a.message?a.message:a)+": ":"")+(d&&d.name)})}}for(var g=[i.emptyPromise()],h=0;h<b.length;h++)f(b[h],h);return d.all(g)}var i=e;return i.getAttrWithDefaults=function(a,b){if(null!=a[b])return a[b];var c=i.defaults[b];return null==c?c:angular.isString(c)?c:JSON.stringify(c)},i.attrGetter=function(b,c,d,e){var f=this.getAttrWithDefaults(c,b);if(!d)return f;try{return e?a(f)(d,e):a(f)(d)}catch(g){if(b.search(/min|max|pattern/i))return f;throw g}},i.shouldUpdateOn=function(a,b,c){var d=i.attrGetter("ngModelOptions",b,c);return d&&d.updateOn?d.updateOn.split(" ").indexOf(a)>-1:!0},i.emptyPromise=function(){var a=d.defer(),c=arguments;return b(function(){a.resolve.apply(a,c)}),a.promise},i.rejectPromise=function(){var a=d.defer(),c=arguments;return b(function(){a.reject.apply(a,c)}),a.promise},i.happyPromise=function(a,c){var e=d.defer();return a.then(function(a){e.resolve(a)},function(a){b(function(){throw a}),e.resolve(c)}),e.promise},i.updateModel=function(c,d,e,h,j,k,l){function m(f,g,j,l,m){d.$$ngfPrevValidFiles=f,d.$$ngfPrevInvalidFiles=g;var n=f&&f.length?f[0]:null,o=g&&g.length?g[0]:null;c&&(i.applyModelValidation(c,f),c.$setViewValue(m?n:f)),h&&a(h)(e,{$files:f,$file:n,$newFiles:j,$duplicateFiles:l,$invalidFiles:g,$invalidFile:o,$event:k});var p=i.attrGetter("ngfModelInvalid",d);p&&b(function(){a(p).assign(e,m?o:g)}),b(function(){})}function n(){function a(a,b){return a.name===b.name&&(a.$ngfOrigSize||a.size)===(b.$ngfOrigSize||b.size)&&a.type===b.type}function b(b){var c;for(c=0;c<s.length;c++)if(a(b,s[c]))return!0;for(c=0;c<t.length;c++)if(a(b,t[c]))return!0;return!1}if(j){r=[],u=[];for(var c=0;c<j.length;c++)b(j[c])?u.push(j[c]):r.push(j[c])}}function o(a){return angular.isArray(a)?a:[a]}function p(){w=[],v=[],angular.forEach(r,function(a){a.$error?v.push(a):w.push(a)})}function q(){function a(){b(function(){m(x?s.concat(w):w,x?t.concat(v):v,j,u,y)},A&&A.debounce?A.debounce.change||A.debounce:0)}g(z?r:w,d,e).then(function(){z?i.validate(r,s.length,c,d,e).then(function(){p(),a()}):a()},function(a){throw"Could not resize files "+a})}var r,s,t,u=[],v=[],w=[];s=d.$$ngfPrevValidFiles||[],t=d.$$ngfPrevInvalidFiles||[],c&&c.$modelValue&&(s=o(c.$modelValue));var x=i.attrGetter("ngfKeep",d,e);r=(j||[]).slice(0),("distinct"===x||i.attrGetter("ngfKeepDistinct",d,e)===!0)&&n(d,e);var y=!x&&!i.attrGetter("ngfMultiple",d,e)&&!i.attrGetter("multiple",d);if(!x||r.length){i.attrGetter("ngfBeforeModelChange",d,e,{$files:j,$file:j&&j.length?j[0]:null,$newFiles:r,$duplicateFiles:u,$event:k});var z=i.attrGetter("ngfValidateAfterResize",d,e),A=i.attrGetter("ngModelOptions",d,e);i.validate(r,s.length,c,d,e).then(function(){l?m(r,[],j,u,y):(A&&A.allowInvalid||z?w=r:p(),i.attrGetter("ngfFixOrientation",d,e)&&i.isExifSupported()?f(w,d,e).then(function(){q()}):q())})}},i}]),ngFileUpload.directive("ngfSelect",["$parse","$timeout","$compile","Upload",function(a,b,c,d){function e(a){var b=a.match(/Android[^\d]*(\d+)\.(\d+)/);if(b&&b.length>2){var c=d.defaults.androidFixMinorVersion||4;return parseInt(b[1])<4||parseInt(b[1])===c&&parseInt(b[2])<c}return-1===a.indexOf("Chrome")&&/.*Windows.*Safari.*/.test(a)}function f(a,b,c,d,f,h,i,j){function k(){return"input"===b[0].tagName.toLowerCase()&&c.type&&"file"===c.type.toLowerCase()}function l(){return t("ngfChange")||t("ngfSelect")}function m(b){if(j.shouldUpdateOn("change",c,a)){for(var e=b.__files_||b.target&&b.target.files,f=[],g=0;g<e.length;g++)f.push(e[g]);j.updateModel(d,c,a,l(),f.length?f:null,b)}}function n(a){if(b!==a)for(var c=0;c<b[0].attributes.length;c++){var d=b[0].attributes[c];"type"!==d.name&&"class"!==d.name&&"style"!==d.name&&((null==d.value||""===d.value)&&("required"===d.name&&(d.value="required"),"multiple"===d.name&&(d.value="multiple")),a.attr(d.name,"id"===d.name?"ngf-"+d.value:d.value))}}function o(){if(k())return b;var a=angular.element('<input type="file">');n(a);var c=angular.element("<label>upload</label>");return c.css("visibility","hidden").css("position","absolute").css("overflow","hidden").css("width","0px").css("height","0px").css("border","none").css("margin","0px").css("padding","0px").attr("tabindex","-1"),g.push({el:b,ref:c}),document.body.appendChild(c.append(a)[0]),a}function p(c){if(b.attr("disabled"))return!1;if(!t("ngfSelectDisabled",a)){var d=q(c);if(null!=d)return d;r(c);try{k()||document.body.contains(w[0])||(g.push({el:b,ref:w.parent()}),document.body.appendChild(w.parent()[0]),w.bind("change",m))}catch(f){}return e(navigator.userAgent)?setTimeout(function(){w[0].click()},0):w[0].click(),!1}}function q(a){var b=a.changedTouches||a.originalEvent&&a.originalEvent.changedTouches;if("touchstart"===a.type)return v=b?b[0].clientY:0,!0;if(a.stopPropagation(),a.preventDefault(),"touchend"===a.type){var c=b?b[0].clientY:0;if(Math.abs(c-v)>20)return!1}}function r(b){j.shouldUpdateOn("click",c,a)&&w.val()&&(w.val(null),j.updateModel(d,c,a,l(),null,b,!0))}function s(a){if(w&&!w.attr("__ngf_ie10_Fix_")){if(!w[0].parentNode)return void(w=null);a.preventDefault(),a.stopPropagation(),w.unbind("click");var b=w.clone();return w.replaceWith(b),w=b,w.attr("__ngf_ie10_Fix_","true"),w.bind("change",m),w.bind("click",s),w[0].click(),!1}w.removeAttr("__ngf_ie10_Fix_")}var t=function(a,b){return j.attrGetter(a,c,b)};j.registerModelChangeValidator(d,c,a);var u=[];u.push(a.$watch(t("ngfMultiple"),function(){w.attr("multiple",t("ngfMultiple",a))})),u.push(a.$watch(t("ngfCapture"),function(){w.attr("capture",t("ngfCapture",a))})),u.push(a.$watch(t("ngfAccept"),function(){w.attr("accept",t("ngfAccept",a))})),c.$observe("accept",function(){w.attr("accept",t("accept"))}),u.push(function(){c.$$observers&&delete c.$$observers.accept});var v=0,w=b;k()||(w=o()),w.bind("change",m),k()?b.bind("click",r):b.bind("click touchstart touchend",p),-1!==navigator.appVersion.indexOf("MSIE 10")&&w.bind("click",s),d&&d.$formatters.push(function(a){return(null==a||0===a.length)&&w.val()&&w.val(null),a}),a.$on("$destroy",function(){k()||w.parent().remove(),angular.forEach(u,function(a){a()})}),h(function(){for(var a=0;a<g.length;a++){var b=g[a];document.body.contains(b.el[0])||(g.splice(a,1),b.ref.remove())}}),window.FileAPI&&window.FileAPI.ngfFixIE&&window.FileAPI.ngfFixIE(b,w,m)}var g=[];return{restrict:"AEC",require:"?ngModel",link:function(e,g,h,i){f(e,g,h,i,a,b,c,d)}}}]),function(){function a(a){return"img"===a.tagName.toLowerCase()?"image":"audio"===a.tagName.toLowerCase()?"audio":"video"===a.tagName.toLowerCase()?"video":/./}function b(b,c,d,e,f,g,h,i){function j(a){var g=b.attrGetter("ngfNoObjectUrl",f,d);b.dataUrl(a,g)["finally"](function(){c(function(){var b=(g?a.$ngfDataUrl:a.$ngfBlobUrl)||a.$ngfDataUrl;i?e.css("background-image","url('"+(b||"")+"')"):e.attr("src",b),b?e.removeClass("ng-hide"):e.addClass("ng-hide")})})}c(function(){var c=d.$watch(f[g],function(c){var d=h;if("ngfThumbnail"===g&&(d||(d={width:e[0].clientWidth,height:e[0].clientHeight}),0===d.width&&window.getComputedStyle)){var f=getComputedStyle(e[0]);d={width:parseInt(f.width.slice(0,-2)),height:parseInt(f.height.slice(0,-2))}}return angular.isString(c)?(e.removeClass("ng-hide"),i?e.css("background-image","url('"+c+"')"):e.attr("src",c)):void(!c||!c.type||0!==c.type.search(a(e[0]))||i&&0!==c.type.indexOf("image")?e.addClass("ng-hide"):d&&b.isResizeSupported()?b.resize(c,d.width,d.height,d.quality).then(function(a){j(a)},function(a){throw a}):j(c))});d.$on("$destroy",function(){c()})})}ngFileUpload.service("UploadDataUrl",["UploadBase","$timeout","$q",function(a,b,c){var d=a;return d.base64DataUrl=function(a){if(angular.isArray(a)){var b=c.defer(),e=0;return angular.forEach(a,function(c){d.dataUrl(c,!0)["finally"](function(){if(e++,e===a.length){var c=[];angular.forEach(a,function(a){c.push(a.$ngfDataUrl)}),b.resolve(c,a)}})}),b.promise}return d.dataUrl(a,!0)},d.dataUrl=function(a,e){if(!a)return d.emptyPromise(a,a);if(e&&null!=a.$ngfDataUrl||!e&&null!=a.$ngfBlobUrl)return d.emptyPromise(e?a.$ngfDataUrl:a.$ngfBlobUrl,a);var f=e?a.$$ngfDataUrlPromise:a.$$ngfBlobUrlPromise;if(f)return f;var g=c.defer();return b(function(){if(window.FileReader&&a&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 8")||a.size<2e4)&&(!window.FileAPI||-1===navigator.userAgent.indexOf("MSIE 9")||a.size<4e6)){var c=window.URL||window.webkitURL;if(c&&c.createObjectURL&&!e){var f;try{f=c.createObjectURL(a)}catch(h){return void b(function(){a.$ngfBlobUrl="",g.reject()})}b(function(){if(a.$ngfBlobUrl=f,f){g.resolve(f,a),d.blobUrls=d.blobUrls||[],d.blobUrlsTotalSize=d.blobUrlsTotalSize||0,d.blobUrls.push({url:f,size:a.size}),d.blobUrlsTotalSize+=a.size||0;for(var b=d.defaults.blobUrlsMaxMemory||268435456,e=d.defaults.blobUrlsMaxQueueSize||200;(d.blobUrlsTotalSize>b||d.blobUrls.length>e)&&d.blobUrls.length>1;){var h=d.blobUrls.splice(0,1)[0];c.revokeObjectURL(h.url),d.blobUrlsTotalSize-=h.size}}})}else{var i=new FileReader;i.onload=function(c){b(function(){a.$ngfDataUrl=c.target.result,g.resolve(c.target.result,a),b(function(){delete a.$ngfDataUrl},1e3)})},i.onerror=function(){b(function(){a.$ngfDataUrl="",g.reject()})},i.readAsDataURL(a)}}else b(function(){a[e?"$ngfDataUrl":"$ngfBlobUrl"]="",g.reject()})}),f=e?a.$$ngfDataUrlPromise=g.promise:a.$$ngfBlobUrlPromise=g.promise,f["finally"](function(){delete a[e?"$$ngfDataUrlPromise":"$$ngfBlobUrlPromise"]}),f},d}]),ngFileUpload.directive("ngfSrc",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfSrc",a.attrGetter("ngfResize",f,d),!1)}}}]),ngFileUpload.directive("ngfBackground",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){b(a,c,d,e,f,"ngfBackground",a.attrGetter("ngfResize",f,d),!0)}}}]),ngFileUpload.directive("ngfThumbnail",["Upload","$timeout",function(a,c){return{restrict:"AE",link:function(d,e,f){var g=a.attrGetter("ngfSize",f,d);b(a,c,d,e,f,"ngfThumbnail",g,a.attrGetter("ngfAsBackground",f,d))}}}]),ngFileUpload.config(["$compileProvider",function(a){a.imgSrcSanitizationWhitelist&&a.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/),a.aHrefSanitizationWhitelist&&a.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|local|file|data|blob):/)}]),ngFileUpload.filter("ngfDataUrl",["UploadDataUrl","$sce",function(a,b){return function(c,d,e){if(angular.isString(c))return b.trustAsResourceUrl(c);var f=c&&((d?c.$ngfDataUrl:c.$ngfBlobUrl)||c.$ngfDataUrl);return c&&!f?(!c.$ngfDataUrlFilterInProgress&&angular.isObject(c)&&(c.$ngfDataUrlFilterInProgress=!0,a.dataUrl(c,d)),""):(c&&delete c.$ngfDataUrlFilterInProgress,(c&&f?e?b.trustAsResourceUrl(f):f:c)||"")}}])}(),ngFileUpload.service("UploadValidate",["UploadDataUrl","$q","$timeout",function(a,b,c){function d(a){var b="",c=[];if(a.length>2&&"/"===a[0]&&"/"===a[a.length-1])b=a.substring(1,a.length-1);else{var e=a.split(",");if(e.length>1)for(var f=0;f<e.length;f++){var g=d(e[f]);g.regexp?(b+="("+g.regexp+")",f<e.length-1&&(b+="|")):c=c.concat(g.excludes)}else 0===a.indexOf("!")?c.push("^((?!"+d(a.substring(1)).regexp+").)*$"):(0===a.indexOf(".")&&(a="*"+a),b="^"+a.replace(new RegExp("[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]","g"),"\\$&")+"$",b=b.replace(/\\\*/g,".*").replace(/\\\?/g,"."))}return{regexp:b,excludes:c}}function e(a,b){null==b||a.$dirty||(a.$setDirty?a.$setDirty():a.$dirty=!0)}var f=a;return f.validatePattern=function(a,b){if(!b)return!0;var c=d(b),e=!0;if(c.regexp&&c.regexp.length){var f=new RegExp(c.regexp,"i");e=null!=a.type&&f.test(a.type)||null!=a.name&&f.test(a.name)}for(var g=c.excludes.length;g--;){var h=new RegExp(c.excludes[g],"i");e=e&&(null==a.type||h.test(a.type))&&(null==a.name||h.test(a.name))}return e},f.ratioToFloat=function(a){var b=a.toString(),c=b.search(/[x:]/i);return b=c>-1?parseFloat(b.substring(0,c))/parseFloat(b.substring(c+1)):parseFloat(b)},f.registerModelChangeValidator=function(a,b,c){a&&a.$formatters.push(function(d){a.$dirty&&(d&&!angular.isArray(d)&&(d=[d]),f.validate(d,0,a,b,c).then(function(){f.applyModelValidation(a,d)}))})},f.applyModelValidation=function(a,b){e(a,b),angular.forEach(a.$ngfValidations,function(b){a.$setValidity(b.name,b.valid)})},f.getValidationAttr=function(a,b,c,d,e){var g="ngf"+c[0].toUpperCase()+c.substr(1),h=f.attrGetter(g,a,b,{$file:e});if(null==h&&(h=f.attrGetter("ngfValidate",a,b,{$file:e}))){var i=(d||c).split(".");h=h[i[0]],i.length>1&&(h=h&&h[i[1]])}return h},f.validate=function(a,c,d,e,g){function h(b,c,h){if(a){for(var i=a.length,j=null;i--;){var k=a[i];if(k){var l=f.getValidationAttr(e,g,b,c,k);null!=l&&(h(k,l,i)||(k.$error=b,(k.$errorMessages=k.$errorMessages||{})[b]=!0,k.$errorParam=l,a.splice(i,1),j=!1))}}null!==j&&d.$ngfValidations.push({name:b,valid:j})}}function i(c,h,i,k,l){function m(a,b,d){null!=d?k(b,d).then(function(e){l(e,d)?a.resolve():(b.$error=c,(b.$errorMessages=b.$errorMessages||{})[c]=!0,b.$errorParam=d,a.reject())},function(){j("ngfValidateForce",{$file:b})?(b.$error=c,(b.$errorMessages=b.$errorMessages||{})[c]=!0,b.$errorParam=d,a.reject()):a.resolve()}):a.resolve()}var n=[f.emptyPromise()];return a?(a=void 0===a.length?[a]:a,angular.forEach(a,function(a){var d=b.defer();return n.push(d.promise),!i||null!=a.type&&0===a.type.search(i)?void("dimensions"===c&&null!=f.attrGetter("ngfDimensions",e)?f.imageDimensions(a).then(function(b){m(d,a,j("ngfDimensions",{$file:a,$width:b.width,$height:b.height}))},function(){d.reject()}):"duration"===c&&null!=f.attrGetter("ngfDuration",e)?f.mediaDuration(a).then(function(b){m(d,a,j("ngfDuration",{$file:a,$duration:b}))},function(){d.reject()}):m(d,a,f.getValidationAttr(e,g,c,h,a))):void d.resolve()}),b.all(n).then(function(){d.$ngfValidations.push({name:c,valid:!0})},function(){d.$ngfValidations.push({name:c,valid:!1})})):void 0}d=d||{},d.$ngfValidations=d.$ngfValidations||[],angular.forEach(d.$ngfValidations,function(a){a.valid=!0});var j=function(a,b){return f.attrGetter(a,e,g,b)};if(null==a||0===a.length)return f.emptyPromise(d);a=void 0===a.length?[a]:a.slice(0),h("maxFiles",null,function(a,b,d){return b>c+d}),h("pattern",null,f.validatePattern),h("minSize","size.min",function(a,b){return a.size+.1>=f.translateScalars(b)}),h("maxSize","size.max",function(a,b){return a.size-.1<=f.translateScalars(b)});var k=0;if(h("maxTotalSize",null,function(b,c){return k+=b.size,k>f.translateScalars(c)?(a.splice(0,a.length),!1):!0}),h("validateFn",null,function(a,b){return b===!0||null===b||""===b}),!a.length)return f.emptyPromise(d,d.$ngfValidations);var l=b.defer(),m=[];return m.push(f.happyPromise(i("maxHeight","height.max",/image/,this.imageDimensions,function(a,b){return a.height<=b}))),m.push(f.happyPromise(i("minHeight","height.min",/image/,this.imageDimensions,function(a,b){return a.height>=b}))),m.push(f.happyPromise(i("maxWidth","width.max",/image/,this.imageDimensions,function(a,b){return a.width<=b}))),m.push(f.happyPromise(i("minWidth","width.min",/image/,this.imageDimensions,function(a,b){return a.width>=b}))),m.push(f.happyPromise(i("dimensions",null,/image/,function(a,b){return f.emptyPromise(b)},function(a){return a}))),m.push(f.happyPromise(i("ratio",null,/image/,this.imageDimensions,function(a,b){for(var c=b.toString().split(","),d=!1,e=0;e<c.length;e++)Math.abs(a.width/a.height-f.ratioToFloat(c[e]))<1e-4&&(d=!0);return d}))),m.push(f.happyPromise(i("maxRatio","ratio.max",/image/,this.imageDimensions,function(a,b){return a.width/a.height-f.ratioToFloat(b)<1e-4}))),m.push(f.happyPromise(i("minRatio","ratio.min",/image/,this.imageDimensions,function(a,b){return a.width/a.height-f.ratioToFloat(b)>-1e-4}))),m.push(f.happyPromise(i("maxDuration","duration.max",/audio|video/,this.mediaDuration,function(a,b){return a<=f.translateScalars(b)}))),m.push(f.happyPromise(i("minDuration","duration.min",/audio|video/,this.mediaDuration,function(a,b){return a>=f.translateScalars(b)}))),m.push(f.happyPromise(i("duration",null,/audio|video/,function(a,b){return f.emptyPromise(b)},function(a){return a}))),m.push(f.happyPromise(i("validateAsyncFn",null,null,function(a,b){return b},function(a){return a===!0||null===a||""===a}))),b.all(m).then(function(){l.resolve(d,d.$ngfValidations)})},f.imageDimensions=function(a){if(a.$ngfWidth&&a.$ngfHeight){var d=b.defer();return c(function(){d.resolve({width:a.$ngfWidth,height:a.$ngfHeight})}),d.promise}if(a.$ngfDimensionPromise)return a.$ngfDimensionPromise;var e=b.defer();return c(function(){return 0!==a.type.indexOf("image")?void e.reject("not image"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].clientWidth,c=h[0].clientHeight;h.remove(),a.$ngfWidth=b,a.$ngfHeight=c,e.resolve({width:b,height:c})}function f(){h.remove(),e.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].clientWidth?d():i>10?f():g())},1e3)}var h=angular.element("<img>").attr("src",b).css("visibility","hidden").css("position","fixed").css("max-width","none !important").css("max-height","none !important");h.on("load",d),h.on("error",f);var i=0;g(),angular.element(document.getElementsByTagName("body")[0]).append(h)},function(){e.reject("load error")})}),a.$ngfDimensionPromise=e.promise,a.$ngfDimensionPromise["finally"](function(){delete a.$ngfDimensionPromise}),a.$ngfDimensionPromise},f.mediaDuration=function(a){if(a.$ngfDuration){var d=b.defer();return c(function(){d.resolve(a.$ngfDuration)}),d.promise}if(a.$ngfDurationPromise)return a.$ngfDurationPromise;var e=b.defer();return c(function(){return 0!==a.type.indexOf("audio")&&0!==a.type.indexOf("video")?void e.reject("not media"):void f.dataUrl(a).then(function(b){function d(){var b=h[0].duration;a.$ngfDuration=b,h.remove(),e.resolve(b)}function f(){h.remove(),e.reject("load error")}function g(){c(function(){h[0].parentNode&&(h[0].duration?d():i>10?f():g())},1e3)}var h=angular.element(0===a.type.indexOf("audio")?"<audio>":"<video>").attr("src",b).css("visibility","none").css("position","fixed");h.on("loadedmetadata",d),h.on("error",f);var i=0;g(),angular.element(document.body).append(h)},function(){e.reject("load error")})}),a.$ngfDurationPromise=e.promise,a.$ngfDurationPromise["finally"](function(){delete a.$ngfDurationPromise}),a.$ngfDurationPromise},f}]),ngFileUpload.service("UploadResize",["UploadValidate","$q",function(a,b){var c=a,d=function(a,b,c,d,e){var f=e?Math.max(c/a,d/b):Math.min(c/a,d/b);return{width:a*f,height:b*f,marginX:a*f-c,marginY:b*f-d}},e=function(a,e,f,g,h,i,j,k){var l=b.defer(),m=document.createElement("canvas"),n=document.createElement("img");return n.onload=function(){if(null!=k&&k(n.width,n.height)===!1)return void l.reject("resizeIf");try{if(i){var a=c.ratioToFloat(i),b=n.width/n.height;a>b?(e=n.width,f=e/a):(f=n.height,e=f*a)}e||(e=n.width),f||(f=n.height);var o=d(n.width,n.height,e,f,j);m.width=Math.min(o.width,e),m.height=Math.min(o.height,f);var p=m.getContext("2d");p.drawImage(n,Math.min(0,-o.marginX/2),Math.min(0,-o.marginY/2),o.width,o.height),l.resolve(m.toDataURL(h||"image/WebP",g||.934))}catch(q){l.reject(q)}},n.onerror=function(){l.reject()},n.src=a,l.promise};return c.dataUrltoBlob=function(a,b,c){for(var d=a.split(","),e=d[0].match(/:(.*?);/)[1],f=atob(d[1]),g=f.length,h=new Uint8Array(g);g--;)h[g]=f.charCodeAt(g);var i=new window.Blob([h],{type:e});return i.name=b,i.$ngfOrigSize=c,i},c.isResizeSupported=function(){var a=document.createElement("canvas");return window.atob&&a.getContext&&a.getContext("2d")&&window.Blob},c.isResizeSupported()&&Object.defineProperty(window.Blob.prototype,"name",{get:function(){return this.$ngfName},set:function(a){this.$ngfName=a},configurable:!0}),c.resize=function(a,d,f,g,h,i,j,k,l){if(0!==a.type.indexOf("image"))return c.emptyPromise(a);var m=b.defer();return c.dataUrl(a,!0).then(function(b){e(b,d,f,g,h||a.type,i,j,k).then(function(d){if("image/jpeg"===a.type&&l)try{d=c.restoreExif(b,d)}catch(e){setTimeout(function(){throw e},1)}try{var f=c.dataUrltoBlob(d,a.name,a.size);m.resolve(f)}catch(e){m.reject(e)}},function(b){"resizeIf"===b&&m.resolve(a),m.reject(b)})},function(a){m.reject(a)}),m.promise},c}]),function(){function a(a,c,d,e,f,g,h,i,j,k){function l(){return c.attr("disabled")||r("ngfDropDisabled",a)}function m(b,c){i.updateModel(e,d,a,r("ngfChange")||r("ngfDrop"),b,c)}function n(b,c){if(!i.shouldUpdateOn(b,d,a)||!c)return i.rejectPromise([]);var e=[];c.replace(/<(img src|img [^>]* src) *=\"([^\"]*)\"/gi,function(a,b,c){e.push(c)});var f=[],g=[];if(e.length){angular.forEach(e,function(a){f.push(i.urlToBlob(a).then(function(a){g.push(a)}))});var h=k.defer();return k.all(f).then(function(){h.resolve(g)},function(a){h.reject(a)}),h.promise}return i.emptyPromise()}function o(a,b,c,d){var e=r("ngfDragOverClass",a,{$event:c}),f="dragover";if(angular.isString(e))f=e;else if(e&&(e.delay&&(v=e.delay),e.accept||e.reject)){var g=c.dataTransfer.items;if(null!=g&&g.length)for(var h=e.pattern||r("ngfPattern",a,{$event:c}),j=g.length;j--;){if(!i.validatePattern(g[j],h)){f=e.reject;break}f=e.accept}else f=e.accept}d(f)}function p(b,c,e,f){function g(a,b){var c=k.defer();if(null!=a)if(a.isDirectory){var d=[i.emptyPromise()];if(m){var e={type:"directory"};e.name=e.path=(b||"")+a.name+a.name,n.push(e)}var f=a.createReader(),h=[],p=function(){f.readEntries(function(e){try{e.length?(h=h.concat(Array.prototype.slice.call(e||[],0)),p()):(angular.forEach(h.slice(0),function(c){n.length<=j&&l>=o&&d.push(g(c,(b?b:"")+a.name+"/"))}),k.all(d).then(function(){c.resolve()},function(a){c.reject(a)}))}catch(f){c.reject(f)}},function(a){c.reject(a)})};p()}else a.file(function(a){try{a.path=(b?b:"")+a.name,m&&(a=i.rename(a,a.path)),n.push(a),o+=a.size,c.resolve()}catch(d){c.reject(d)}},function(a){c.reject(a)});return c.promise}var j=i.getValidationAttr(d,a,"maxFiles")||Number.MAX_VALUE,l=i.getValidationAttr(d,a,"maxTotalSize")||Number.MAX_VALUE,m=r("ngfIncludeDir",a),n=[],o=0,p=[i.emptyPromise()];if(b&&b.length>0&&"file"!==h.protocol())for(var q=0;q<b.length;q++){if(b[q].webkitGetAsEntry&&b[q].webkitGetAsEntry()&&b[q].webkitGetAsEntry().isDirectory){var s=b[q].webkitGetAsEntry();if(s.isDirectory&&!e)continue;null!=s&&p.push(g(s))}else{var t=b[q].getAsFile();null!=t&&(n.push(t),o+=t.size)}if(n.length>j||o>l||!f&&n.length>0)break}else if(null!=c)for(var u=0;u<c.length;u++){var v=c.item(u);if((v.type||v.size>0)&&(n.push(v),o+=v.size),n.length>j||o>l||!f&&n.length>0)break}var w=k.defer();return k.all(p).then(function(){if(f||m||!n.length)w.resolve(n);else{for(var a=0;n[a]&&"directory"===n[a].type;)a++;w.resolve([n[a]])}},function(a){w.reject(a)}),w.promise}var q=b(),r=function(a,b,c){return i.attrGetter(a,d,b,c)};if(r("dropAvailable")&&g(function(){a[r("dropAvailable")]?a[r("dropAvailable")].value=q:a[r("dropAvailable")]=q}),!q)return void(r("ngfHideOnDropNotAvailable",a)===!0&&c.css("display","none"));null==r("ngfSelect")&&i.registerModelChangeValidator(e,d,a);var s,t=null,u=f(r("ngfStopPropagation")),v=1;c[0].addEventListener("dragover",function(b){if(!l()&&i.shouldUpdateOn("drop",d,a)){if(b.preventDefault(),u(a)&&b.stopPropagation(),navigator.userAgent.indexOf("Chrome")>-1){var e=b.dataTransfer.effectAllowed;b.dataTransfer.dropEffect="move"===e||"linkMove"===e?"move":"copy"}g.cancel(t),s||(s="C",o(a,d,b,function(d){s=d,c.addClass(s),r("ngfDrag",a,{$isDragging:!0,$class:s,$event:b})}))}},!1),c[0].addEventListener("dragenter",function(b){!l()&&i.shouldUpdateOn("drop",d,a)&&(b.preventDefault(),u(a)&&b.stopPropagation())},!1),c[0].addEventListener("dragleave",function(b){!l()&&i.shouldUpdateOn("drop",d,a)&&(b.preventDefault(),u(a)&&b.stopPropagation(),t=g(function(){s&&c.removeClass(s),s=null,r("ngfDrag",a,{$isDragging:!1,$event:b})},v||100))},!1),c[0].addEventListener("drop",function(b){if(!l()&&i.shouldUpdateOn("drop",d,a)){b.preventDefault(),u(a)&&b.stopPropagation(),s&&c.removeClass(s),s=null;var e,f=b.dataTransfer.items;try{e=b.dataTransfer&&b.dataTransfer.getData&&b.dataTransfer.getData("text/html")}catch(g){}p(f,b.dataTransfer.files,r("ngfAllowDir",a)!==!1,r("multiple")||r("ngfMultiple",a)).then(function(a){a.length?m(a,b):n("dropUrl",e).then(function(a){m(a,b)})})}},!1),c[0].addEventListener("paste",function(b){if(navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&r("ngfEnableFirefoxPaste",a)&&b.preventDefault(),!l()&&i.shouldUpdateOn("paste",d,a)){var c=[],e=b.clipboardData||b.originalEvent.clipboardData;if(e&&e.items)for(var f=0;f<e.items.length;f++)-1!==e.items[f].type.indexOf("image")&&c.push(e.items[f].getAsFile());c.length?m(c,b):n("pasteUrl",e).then(function(a){m(a,b)})}},!1),navigator.userAgent.toLowerCase().indexOf("firefox")>-1&&r("ngfEnableFirefoxPaste",a)&&(c.attr("contenteditable",!0),c.on("keypress",function(a){a.metaKey||a.ctrlKey||a.preventDefault()}))}function b(){var a=document.createElement("div");return"draggable"in a&&"ondrop"in a&&!/Edge\/12./i.test(navigator.userAgent)}ngFileUpload.directive("ngfDrop",["$parse","$timeout","$location","Upload","$http","$q",function(b,c,d,e,f,g){
return{restrict:"AEC",require:"?ngModel",link:function(h,i,j,k){a(h,i,j,k,b,c,d,e,f,g)}}}]),ngFileUpload.directive("ngfNoFileDrop",function(){return function(a,c){b()&&c.css("display","none")}}),ngFileUpload.directive("ngfDropAvailable",["$parse","$timeout","Upload",function(a,c,d){return function(e,f,g){if(b()){var h=a(d.attrGetter("ngfDropAvailable",g));c(function(){h(e),h.assign&&h.assign(e,!0)})}}}])}(),ngFileUpload.service("UploadExif",["UploadResize","$q",function(a,b){function c(a,b,c,d){switch(b){case 2:return a.transform(-1,0,0,1,c,0);case 3:return a.transform(-1,0,0,-1,c,d);case 4:return a.transform(1,0,0,-1,0,d);case 5:return a.transform(0,1,1,0,0,0);case 6:return a.transform(0,1,-1,0,d,0);case 7:return a.transform(0,-1,-1,0,d,c);case 8:return a.transform(0,-1,1,0,0,c)}}function d(a){for(var b="",c=new Uint8Array(a),d=c.byteLength,e=0;d>e;e++)b+=String.fromCharCode(c[e]);return window.btoa(b)}var e=a;return e.isExifSupported=function(){return window.FileReader&&(new FileReader).readAsArrayBuffer&&e.isResizeSupported()},e.readOrientation=function(a){var c=b.defer(),d=new FileReader,e=a.slice?a.slice(0,65536):a;return d.readAsArrayBuffer(e),d.onerror=function(a){return c.reject(a)},d.onload=function(a){var b={orientation:1},d=new DataView(this.result);if(65496!==d.getUint16(0,!1))return c.resolve(b);for(var e=d.byteLength,f=2;e>f;){var g=d.getUint16(f,!1);if(f+=2,65505===g){if(1165519206!==d.getUint32(f+=2,!1))return c.resolve(b);var h=18761===d.getUint16(f+=6,!1);f+=d.getUint32(f+4,h);var i=d.getUint16(f,h);f+=2;for(var j=0;i>j;j++)if(274===d.getUint16(f+12*j,h)){var k=d.getUint16(f+12*j+8,h);return k>=2&&8>=k&&(d.setUint16(f+12*j+8,1,h),b.fixedArrayBuffer=a.target.result),b.orientation=k,c.resolve(b)}}else{if(65280!==(65280&g))break;f+=d.getUint16(f,!1)}}return c.resolve(b)},c.promise},e.applyExifRotation=function(a){if(0!==a.type.indexOf("image/jpeg"))return e.emptyPromise(a);var f=b.defer();return e.readOrientation(a).then(function(b){return b.orientation<2||b.orientation>8?f.resolve(a):void e.dataUrl(a,!0).then(function(g){var h=document.createElement("canvas"),i=document.createElement("img");i.onload=function(){try{h.width=b.orientation>4?i.height:i.width,h.height=b.orientation>4?i.width:i.height;var g=h.getContext("2d");c(g,b.orientation,i.width,i.height),g.drawImage(i,0,0);var j=h.toDataURL(a.type||"image/WebP",.934);j=e.restoreExif(d(b.fixedArrayBuffer),j);var k=e.dataUrltoBlob(j,a.name);f.resolve(k)}catch(l){return f.reject(l)}},i.onerror=function(){f.reject()},i.src=g},function(a){f.reject(a)})},function(a){f.reject(a)}),f.promise},e.restoreExif=function(a,b){var c={};return c.KEY_STR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",c.encode64=function(a){var b,c,d,e,f,g="",h="",i="",j=0;do b=a[j++],c=a[j++],h=a[j++],d=b>>2,e=(3&b)<<4|c>>4,f=(15&c)<<2|h>>6,i=63&h,isNaN(c)?f=i=64:isNaN(h)&&(i=64),g=g+this.KEY_STR.charAt(d)+this.KEY_STR.charAt(e)+this.KEY_STR.charAt(f)+this.KEY_STR.charAt(i),b=c=h="",d=e=f=i="";while(j<a.length);return g},c.restore=function(a,b){a.match("data:image/jpeg;base64,")&&(a=a.replace("data:image/jpeg;base64,",""));var c=this.decode64(a),d=this.slice2Segments(c),e=this.exifManipulation(b,d);return"data:image/jpeg;base64,"+this.encode64(e)},c.exifManipulation=function(a,b){var c=this.getExifArray(b),d=this.insertExif(a,c);return new Uint8Array(d)},c.getExifArray=function(a){for(var b,c=0;c<a.length;c++)if(b=a[c],255===b[0]&225===b[1])return b;return[]},c.insertExif=function(a,b){var c=a.replace("data:image/jpeg;base64,",""),d=this.decode64(c),e=d.indexOf(255,3),f=d.slice(0,e),g=d.slice(e),h=f;return h=h.concat(b),h=h.concat(g)},c.slice2Segments=function(a){for(var b=0,c=[];;){if(255===a[b]&218===a[b+1])break;if(255===a[b]&216===a[b+1])b+=2;else{var d=256*a[b+2]+a[b+3],e=b+d+2,f=a.slice(b,e);c.push(f),b=e}if(b>a.length)break}return c},c.decode64=function(a){var b,c,d,e,f,g="",h="",i=0,j=[],k=/[^A-Za-z0-9\+\/\=]/g;k.exec(a)&&console.log("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, NaNExpect errors in decoding."),a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do d=this.KEY_STR.indexOf(a.charAt(i++)),e=this.KEY_STR.indexOf(a.charAt(i++)),f=this.KEY_STR.indexOf(a.charAt(i++)),h=this.KEY_STR.indexOf(a.charAt(i++)),b=d<<2|e>>4,c=(15&e)<<4|f>>2,g=(3&f)<<6|h,j.push(b),64!==f&&j.push(c),64!==h&&j.push(g),b=c=g="",d=e=f=h="";while(i<a.length);return j},c.restore(a,b)},e}]);
app.directive('paymentList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				transaction: '=',
				caption: '@caption'
			},
			templateUrl: "app/common/members/paymentList.html"
		}
	})
	.directive('payment', function () {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				payment: '='
			},
			templateUrl: "app/common/members/payment.html"
		}
	})
;app.directive('providersCoursesList', function () {
	return {
		restrict: "E",
		replace: true,
		scope: {
			courses: '=',
			city: '=',
			category: '=',
			coursesDetails: '=',
			postCourses: '='
		},
		template: "<providers-course dir-paginate='course in courses | itemsPerPage: 5' city='city' post-courses='postCourses' lessons='lessons' course='course' category='category' coursesDetails='coursesDetails'></providers-course>"
	}
})
	.directive('providersCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '=',
				postCourses: '='
			},
			templateUrl: "app/common/courses/providersCourses.html"
		}
	})
;app.directive('shortCoursesList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				courses: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			template: "<short-course dir-paginate='course in courses | itemsPerPage: 5' course='course' category='category' coursesDetails='coursesDetails'></short-course>"
		}
	})
	.directive('shortCourse', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				course: '=',
				city: '=',
				category: '=',
				coursesDetails: '='
			},
			templateUrl: "app/common/courses/shortCourses.html"
		}
	})
;app.directive('collection', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				title: '@title',
				description: '@description',
				icon: '@icon',
				collection: '='
			},
			templateUrl: "app/common/sidebar/sidebar.html"
		}
	})

	.directive('member', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				member: '='
			},
			template: "<li><a href='{{member.link}}'>{{member.name}}</a></li>"
		}
	})
;app.directive('transactionsList', function () {
		return {
			restrict: "E",
			replace: true,
			scope: {
				list: '=',
				caption: '@caption'
			},
			templateUrl: "app/common/providers/transactionList.html"
		}
	})
	.directive('transactions', function () {
		return {
			restrict: "EA",
			replace: true,
			scope: {
				transactions: '='
			},
			templateUrl: "app/common/providers/transaction.html"
		}
	})
;app.controller('AttendanceCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store, $routeParams) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	$scope.courses_id = $routeParams['coursesId'];
	$scope.courses = [];
	$scope.courses_lessons = [];
	$scope.lessons = [];
	$scope.new_lesson = [];
	$scope.postAttendance = postAttendance;
	$scope.postLessons = postLessons;
	$scope.postEditLessons = postEditLessons;
	getCourses();
	getLessons();
	getAttendance();

	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '返回課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '課堂列表',
			link: '#/providers/lessons/' + $scope.courses_id
		},
		{
			name: '相片',
			link: '#/providers/upload/' + $scope.courses_id
		},
		{
			name: '文件',
			link: '#/providers/documents/' + $scope.courses_id
		},
		{
			name: '出席清單',
			link: '#/providers/attendance/' + $scope.courses_id
		}
	];

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getLessons() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/lessons/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses_lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postLessons(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_lessons/',
			data: $httpParamSerializer({
				courses_id: $scope.courses_id,
				start_time: data['start_time'],
				end_time: data['end_time'],
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status === "success")) {
							getLessons();
							$(function () {
								$('#new_lesson').modal('hide');
							});
						}
						else {
							alert("未能更新紀錄。請確保填寫了課堂時間。");
							console.log(data);
						}
					}
				}
			);
	}

	function postEditLessons(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/edit_courses_lessons/',
			data: $httpParamSerializer({
				lessons_id: data['lessons_id'],
				start_time: data['start_time'],
				end_time: data['end_time'],
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status === "success")) {
							for ($j = 0; $j < $scope.lessons.length; $j++) {
								$scope.lessons[$j].edit = false;
							}
						}
						else {
							alert("未能更新紀錄。請確保修改了課堂時間。");
							console.log(data);
						}
					}
				}
			);
	}

	function getAttendance() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/attendance/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postAttendance($courses_id, $lessons_id, $members_id) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/attendance/',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				lessons_id: $lessons_id,
				members_id: $members_id,
				status: 1
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getAttendance();
						} else {
							alert("未能更新紀錄。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}
})
;

app.controller('BaseCtrl', function ($scope, $location, store, $http, $httpParamSerializer) {
	/* Global Settings */
	$scope.base_url = "http://localhost/edu-platform/";
	$scope.base_api_url = "http://localhost/edu-backend/api/";
	$scope.login_status = store.get('login_status');
	$scope.username = store.get('username');
	$scope.user = store.get('user');
	$scope.type = store.get('type');
	$scope.token = store.get('token');

	/* Common variables */
	$scope.category = [];
	$scope.city = [];

	/* Functions */
	getCity();
	getCategory();

	/* Public functions */
	$scope.logout = logout;

	/* Private functions */
	function logout() {
		store.remove('user');
		store.remove('token');
		store.remove('username');
		store.remove('type');
		$location.path('/');
	};

	function getCity() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'city',
			//data: $httpParamSerializer({data}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.city = data.data;
							//console.log(data.message);
							//console.log($scope.city);
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getCategory() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'category',
			//data: $httpParamSerializer({data}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.category = data.data;
							//console.log(data.message);
							//console.log($scope.city);
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('CoursesCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	$scope.photo_interval = 5000;
	$scope.courses_id = $routeParams['coursesId'];
	$scope.course = {};
	$scope.lessons = {};
	$scope.providers = {};
	getCourses();
	getLessons();

	/* Courses */
	$scope.course_photos = [{
		id: 0,
		path: 'http://dummyimage.com/600x400/000/fff',
		description: 'test'
	},
		{
			id: 1,
			path: 'http://dummyimage.com/600x400/fff/000',
			description: 'test'
		}];

	/* Public functions */
	$scope.subscribe = subscribe;

	/* Private functions */
	function subscribe(course_id) {
		if ($scope.user) {
			$location.path('/payments/' + course_id);
		} else {
			$location.path('/payments/login/' + course_id);
		}
	}

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.course = data.data;
							getProviders();
							getPhotos();
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getPhotos() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/photos/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.course.photos = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getLessons() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/lessons/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getProviders() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/profile/' + $scope.course.providers_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.providers = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('DocumentsCtrl', function (Upload, $rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store, $routeParams) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	$scope.courses_id = $routeParams['coursesId'];
	$scope.courses_docs = [];

	getDocs();
	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '返回課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '課堂列表',
			link: '#/providers/lessons/' + $scope.courses_id
		},
		{
			name: '相片',
			link: '#/providers/upload/' + $scope.courses_id
		},
		{
			name: '文件',
			link: '#/providers/documents/' + $scope.courses_id
		},
		{
			name: '出席清單',
			link: '#/providers/attendance/' + $scope.courses_id
		}
	];

	$scope.submit = function () {
		if ($scope.form.file.$valid && $scope.file) {
			$scope.upload($scope.file);
		}
	};

	$scope.upload = function (file) {
		Upload.upload({
			url: $scope.base_api_url + 'providers/upload_docs',
			data: {file: file}
		}).then(function (resp) {
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' +
				resp.data);
			postCoursesPhotos($scope.courses_id, resp.data.data);
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

	/* Private functions */
	function getDocs() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/documents/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses_docs = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postCoursesPhotos($courses_id, $path) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_documents',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				path: $path
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getDocs();
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert('上傳失敗，請檢查文件是否正確。');
						}
					}
				}
			);
	}
})
;

app.controller('HomeCtrl', function ($scope, $controller, $location) {
	$controller('BaseCtrl', {$scope: $scope});

	/* General Settings */
	
	$scope.keyword;
	$scope.search = search;
	/* Sidebar Menu Item */
	$scope.aboutMenu = [
		{
			name: '說明',
			link: '#/faq'
		},
		{
			name: '關於我們',
			link: '#/about'
		},
		{
			name: '聯絡我們',
			link: '#/contact'
		}
	];

	function search() {
		$location.path('/search/' + $scope.keyword);
	}


});

app.controller('LoginCtrl', function ($scope, $controller, $location, $http, $httpParamSerializer, store) {
	$controller('BaseCtrl', {$scope: $scope});

	/* Public functions */
	$scope.membersLogin = membersLogin;
	$scope.providersLogin = providersLogin;
	$scope.data = [];

	/* Private functions */
	function providersLogin(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'login/providers',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							store.set('user', data.id);
							store.set('username', data.username);
							store.set('type', 'providers');
							store.set('token', data.token);
							$location.path('/providers/dashboard');
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

	function membersLogin(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'login/members',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							store.set('user', data.id);
							store.set('username', data.username);
							store.set('type', 'members');
							store.set('token', data.token);
							$location.path('/members/dashboard');
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

});

app.controller('MembersCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	
	$scope.personal_menu = [
		{
			name: '個人中心',
			link: '#/members/dashboard'
		},
		{
			name: '個人檔案',
			link: '#/members/profile'
		},
		{
			name: '變更密碼',
			link: '#/members/password'
		},
		{
			name: '付款紀錄',
			link: '#/members/payment-records'
		}
	];
	$scope.data = [];
	$scope.courses = [];
	$scope.profile = [];
	$scope.password = [];
	$scope.transaction = [];
	$scope.postProfile = postProfile;
	$scope.postPassword = postPassword;
	getCourses();
	getProfile();
	getTransaction();

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/courses/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getProfile() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/profile/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.profile = data.data;
							$scope.password.members_id = data.data.members_id;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getTransaction() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'members/transaction/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.transaction = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postProfile(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'members/profile',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更個人資料。");
						} else {
							alert("未能變更個人資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postPassword(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'members/password',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更密碼。");
							$scope.password = [];
							$scope.password.members_id = $scope.profile.members_id;
						} else {
							alert("未能變更密碼。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}

});

app.controller('PaymentsCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	$scope.courses_id = $routeParams['coursesId'];
	//$scope.login = {};
	$scope.course = {};
	$scope.lessons = {};
	$scope.providers = {};
	$scope.payment = {
		courses_id: $scope.courses_id,
		members_id: $scope.user,
		providers_id: $scope.course.providers_id
	};
	getCourses();
	getLessons();

	/* Public functions */
	$scope.membersLoginPayment = membersLoginPayment;
	$scope.membersRegisterPayment = membersRegisterPayment;
	$scope.payments = payments;

	/* Private functions */
	function membersLoginPayment(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'login/members',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							store.set('user', data.id);
							store.set('type', 'members');
							store.set('token', data.token);
							$location.path('/payments/' + $scope.courses_id);
						} else {
							alert("未能登入。請檢查您的用戶名和密碼是否正確。");
							console.log(data);
						}
					}
				}
			);
	}

	function membersRegisterPayment() {
		$location.path('/register/members');
	}

	function payments(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'payment',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$location.path('/payments/successful/' + $scope.courses_id);
						} else {
							alert(data.message);
							$location.path('/payments/failure/' + $scope.courses_id);
							console.log(data);
						}
					}
				}
			);
	}

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.course = data.data;
							$scope.payment.providers_id = data.data.providers_id;
							getProviders();
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getLessons() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/lessons/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.lessons = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getProviders() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/profile/' + $scope.course.providers_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.providers = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('ProvidersCtrl', function ($rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */

	$scope.gov_registered = [
		{id: 0, name: '否'},
		{id: 1, name: '是'}
	];

	$scope.courses = [];
	$scope.profile = [];
	$scope.password = [];
	$scope.transaction = [];
	$scope.lessons = [];
	$scope.courses2 = [];
	$scope.postProfile = postProfile;
	$scope.postCourses = postCourses;
	$scope.postPassword = postPassword;
	$scope.postLessons = postLessons;
	$scope.postAddCourses = postAddCourses;

	getCourses();
	getProfile();
	getTransaction();

	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '交易紀錄',
			link: '#/providers/transaction-records'
		},
		{
			name: '服務提供者檔案',
			link: '#/providers/profile'
		}, {
			name: '變更密碼',
			link: '#/providers/password'
		}
	];

	/* Private functions */
	function getCourses() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/courses/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data[0];
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getProfile() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/profile/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.profile = data.data;
							$scope.password.providers_id = data.data.providers_id;
							$scope.profile.gov_registered = $scope.gov_registered[data.data.gov_registered].id;
							$scope.profile.city_id = $scope.city[data.data.city_id - 1].city_id;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function getTransaction() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'providers/transaction/' + $scope.user,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.transaction = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postProfile(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/profile',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更個人資料。");
						} else {
							alert("未能變更個人資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postCourses(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/edit_courses',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更課程資料。");
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert("未能變更課程資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postAddCourses(data) {
		data.providers_id = $scope.profile.providers_id;
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更課程資料。");
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert("未能變更課程資料。");
							console.log(data);
						}
					}
				}
			);
	}

	function postLessons($courses_id, $start_time, $end_time, $status) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_lessons',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				start_time: $start_time,
				end_time: $end_time,
				status: $status
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getCourses();
						} else {
							alert("未能變更。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}

	function postPassword(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/password',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功變更密碼。");
							$scope.password = [];
							$scope.password.providers_id = $scope.profile.providers_id;
						} else {
							alert("未能變更密碼。" + data.message);
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('RegisterCtrl', function ($scope, $controller, $location, $http, $httpParamSerializer, store) {
	$controller('BaseCtrl', {$scope: $scope});

	/* Public functions */
	$scope.membersRegister = membersRegister;
	$scope.providersRegister = providersRegister;
	$scope.gov_registered = [
		{id: 0, name: '否'},
		{id: 1, name: '是'}
	];
	$scope.data = [];
	$scope.providers_register_data = {
		city_id: 1,
		gov_registered: $scope.gov_registered[0].id
	};
	/* Private functions */
	function providersRegister(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'register/providers',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功註冊。請使用您的用戶名和密碼登入。");
							$location.path('/login/providers');
						} else {
							alert(data.message);
							console.log(data);
						}
					}
				}
			);
	}

	function membersRegister(data) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'register/members',
			data: $httpParamSerializer(data),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							alert("成功註冊。請使用您的用戶名和密碼登入。");
							$location.path('/login/members');
						} else {
							alert(data.message);
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('SearchCtrl', function ($rootScope, $scope, $controller, $location, $routeParams, $http, $httpParamSerializer, store) {
	/* General Settings */
	$controller('BaseCtrl', {$scope: $scope});
	
	$scope.keyword = $routeParams['keyword'];
	if ($scope.keyword.substring(0, 3) == "cat") {
		$scope.keyword = $scope.keyword.substring(3);
		catSearch();
	} else {
		postSearch();
	}
	/* Courses result */
	$scope.courses = [];

	function postSearch() {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'search',
			data: $httpParamSerializer({
				title: $scope.keyword
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function catSearch() {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'search',
			data: $httpParamSerializer({
				category_id: $scope.keyword
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}
});

app.controller('UploadCtrl', function (Upload, $rootScope, $scope, $controller, $filter, $http, $httpParamSerializer, store, $routeParams) {

	$controller('BaseCtrl', {$scope: $scope});
	/* General Settings */
	$scope.courses_id = $routeParams['coursesId'];
	$scope.courses_photos = [];

	getPhotos();
	/* Sidebar Menu Item */
	$scope.personal_menu = [
		{
			name: '返回課程管理',
			link: '#/providers/dashboard'
		},
		{
			name: '課堂列表',
			link: '#/providers/lessons/' + $scope.courses_id
		},
		{
			name: '相片',
			link: '#/providers/upload/' + $scope.courses_id
		},
		{
			name: '文件',
			link: '#/providers/documents/' + $scope.courses_id
		},
		{
			name: '出席清單',
			link: '#/providers/attendance/' + $scope.courses_id
		}
	];

	$scope.submit = function () {
		if ($scope.form.file.$valid && $scope.file) {
			$scope.upload($scope.file);
		}
	};

	$scope.upload = function (file) {
		Upload.upload({
			url: $scope.base_api_url + 'providers/upload',
			data: {file: file}
		}).then(function (resp) {
			console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' +
				resp.data);
			postCoursesPhotos($scope.courses_id, resp.data.data);
		}, function (resp) {
			console.log('Error status: ' + resp.status);
		}, function (evt) {
			var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
			console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
		});
	};

	/* Private functions */
	function getPhotos() {
		$http({
			method: 'GET',
			url: $scope.base_api_url + 'courses/photos/' + $scope.courses_id,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							$scope.courses_photos = data.data;
						} else {
							console.log(data);
						}
					}
				}
			);
	}

	function postCoursesPhotos($courses_id, $path) {
		$http({
			method: 'POST',
			url: $scope.base_api_url + 'providers/courses_photos',
			data: $httpParamSerializer({
				courses_id: $courses_id,
				path: $path
			}),
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
			.success(function (data) {
					if (data.errors) {
						console.log(data.errors);
					} else {
						if ((data.status) && (data.status !== "failed")) {
							getPhotos();
							$(function () {
								$('.modal').modal('hide');
							});
						} else {
							alert('上傳失敗，請檢查文件是否正確。');
						}
					}
				}
			);
	}
})
;

