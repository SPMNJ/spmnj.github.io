var url = "https://script.google.com/macros/s/AKfycbzv_ckPbcoqz14EKzR-AvQ8Bs_4Rk0JrwI8sVw5NEo/dev";
(function ($) {
    "use strict";
	$.ajaxSetup({
crossDomain: true,
	type: "GET",
	dataType: "jsonp",
});
    /*==================================================================
    [ Focus input ]*/


    /*==================================================================
    [ Validate ]*/
// Bind to the submit event of our form
$(document).on('submit',"#searchForm",function(event){
	event.preventDefault();
	$('#info').hide();
	$('#info').html("");
    $(".btn-loading").show();
	$(".search-form-btn").hide();
	var input = $("#searchbox").val();
	$.ajax({
		url: url + "?type=search&q="+input, 		
});

	return false; 
});

	
})(jQuery);



function loadprofessor(){
	$("#content").slideUp(1000, function() {
    	$("#content").parent().append('<div class="content-loading" style="display: none"><img src="images/Rolling-1s-200px.svg" alt="" height="100px" width="100px"></div>');
		$('.content-loading').fadeIn();
		$.ajax({
				url: window.url + "?type=loadpage&page=search" 
		});
	});
}
function loadpage(responce){
	if (responce.status == 200){
		$("#content").html(responce.message);
		setTimeout(function() {
		$(".content-loading").fadeOut().remove();
		$("#content").slideDown(1000);
							  },2000);
	}
	else{
		alert(responce.message);
	}
}
function search(responce){
	$(".btn-loading").hide();
	$(".search-form-btn").show();
	if(responce.status === 200){
		$("#search-results").html(responce.message);
		setTimeout(function() {
		$(".content-loading").fadeOut().remove();
		$("#search-results").slideDown(1000);
							  },500);
		loadpasses();

	}
	else {
		studentid = null;
		$("#info").removeClass();
		$("#info").addClass("warning");
		$('#info').html("<strong>"+responce.message+"</strong>");
		$('#info').fadeIn();
	}
}

function getAllUrlParams(url) {
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  var obj = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr = queryString.split('&');
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i].split('=');
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
      if (paramName.match(/\[(\d+)?\]$/)) {
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];
        if (paramName.match(/\[\d+\]$/)) {
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }
  return obj;
}

