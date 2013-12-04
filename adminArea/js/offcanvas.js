$(document).ready(function() {
  $('[data-toggle=offcanvas]').click(function() {
    $('.row-offcanvas').toggleClass('active');
  });
  
  $('#form-submit-button').click(function() {
    _id= $('#id').val();
	_bgcolor=$('#bgcolor').val();
	_txtcolor=$('#txtcolor').val();
	_msg=$('#msg').val();
	_url=$('#url').val();
	
	postData(_id , _bgcolor , _txtcolor , _msg , _url);
	//postData('jo','#ff0000','#fff','test message !!!!!!!!!!!!!!!!!!!!!!!!!!','http://www.google.com');
	});
	$('#form-display-button').click(function() {
		_id= $('#id').val();
		_bgcolor=$('#bgcolor').val();
		_txtcolor=$('#txtcolor').val();
		_msg=$('#msg').val();
		_url=$('#url').val();
		displayData(_id , _bgcolor , _txtcolor , _msg , _url);
	});
  $('#id').change(function(e) {
    currentSubDomain = $(this).val();
	//console.log(currentSubDomain);
});

  $('#colortheme').change(function(e) {
    selectValue = $(this).val().split('|');
	bgcolor = '#'+selectValue[0];
	txtcolor = '#'+selectValue[1];
	$('#bgcolor').val(bgcolor);
	$('#txtcolor').val(txtcolor);
	});
  
  
  getHistory();
  
});


$('.delete-btn').live("click",function() {
	deleteHistory($(this).attr('history-id'));
});

function validateURL(textval) {
      var urlregex = new RegExp( "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
      return urlregex.test(textval);
}
function postData(_id , _bgcolor , _txtcolor , _msg , _url){
	if(!validateURL(_url)){
		alert('Invalid URL');
	}else{
		jQuery.support.cors = true;
		$.ajax({
			type:'POST',
			crossDomain:true,
			headers:{'Authorization' : 'Basic eW91c2VmOndhZGk='},
			contentType:"application/json",
			dataType:'json',
			url: 'http://37.139.11.220:8080/push',
			data: JSON.stringify({data:{id:_id , msg:_msg , bgcolor:_bgcolor , txtcolor:_txtcolor, url:_url}}),
		}).done(function(data){
			location.reload();
		});
	}
}
function getHistory(){
	jQuery.support.cors = true;
		$.ajax({
			type:'GET',
			crossDomain:true,
			headers:{'Authorization' : 'Basic eW91c2VmOndhZGk='},
			contentType:"application/json",
			dataType:'json',
			url: 'http://37.139.11.220:8080/getHistory',
		}).done(function(data){
			
			$.each(data , function(){
				$('.messages-history').append('<div class="history-message"><div class="delete-btn" history-id="'+this.id+'"></div><span class="history-message-id">'+this.id+'</span><a href="'+this.url+'" style="color:'+this.txtcolor+'; background:'+this.bgcolor+'; padding:5px; width:95%; display: inline-block; direction:rtl; float: right; border-bottom: 1px solid #ccc;">'+this.msg+'</a></div>');
				
				console.log(this);
			});
		});
}
function deleteHistory(id){
	jQuery.support.cors = true;
		$.ajax({
			type:'GET',
			crossDomain:true,
			headers:{'Authorization' : 'Basic eW91c2VmOndhZGk='},
			contentType:"application/json",
			dataType:'json',
			url: 'http://37.139.11.220:8080/delHistory/'+id,
		}).done(function(data){
			location.reload();
		});
}

function displayData(_id , _bgcolor , _txtcolor , _msg , _url){
	
	if(!validateURL(_url)){
		alert('Invalid URL');
	}else{
		if( $('#push-notification .notification-msg').length == 0 ){
		$('body').append('<div id="push-notification" style="position:fixed; bottom:0; width:100%; z-index:9999; background:'+_bgcolor+'; line-height:27px; padding-top: 4px; text-align:right; direction:rtl; display: none; border-top: 1px solid #ccc; color:'+_txtcolor+';"><div class="notification-msg" style="width:970px; margin:0 auto;"><a href='+_url+' style="color:'+_txtcolor+'">'+_msg+'</a></div></div>');
               $('#push-notification').slideDown(200);
                $('#push-notification').append('<div id="notification-colse" onClick="closeNotification()" style="width:20px; height:20px; background: #ccc;line-height: 22px;text-align: center;font-weight: bold;color: #000;border: 1px solid #000;border-radius: 4px;position: absolute;right: 3px; top: 5px; cursor:pointer;">x</div>');
		}else{
			$('#push-notification').slideUp(200,function(){
				$('#push-notification .notification-msg a').html(_msg); 
				$('#push-notification').css('background' , _bgcolor);
				$('#push-notification .notification-msg a').css('color' , _txtcolor);
				$('#push-notification').slideDown(200);
			});
		};
   }
}

function closeNotification(){
   $('#push-notification').slideUp(200);
}