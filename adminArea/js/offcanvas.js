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
  
  $('#colortheme').change(function(e) {
    selectValue = $(this).val().split('|');
	bgcolor = '#'+selectValue[0];
	txtcolor = '#'+selectValue[1];
	$('#bgcolor').val(bgcolor);
	$('#txtcolor').val(txtcolor);
	});
  
  
  getHistory();
  
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
			url: 'http://37.139.29.90:8095/push',
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
			url: 'http://37.139.29.90:8095/getHistory',
		}).done(function(data){
			console.log(data);
		});
}
