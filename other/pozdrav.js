// ==UserScript== 
// @name Поздравление
// @description Бот поздравлений
// @author HumanoID
// @license MIT
// @version 1.1
// @include http://www.lowadi.com/*
// @grant none
// ==/UserScript== 

var DEF_SEC = 10000;

if (/www.lowadi.com\/classements\/general/.test(window.location.href))
{
	var TOKEN = localStorage.getItem("horse_token");	
	var out = ''; 
	$('body').append('<div class="myrez" style="display:block; position:absolute; width:150px; height:auto; right:0; top:250px; padding:5px; background-color: rgba(0, 0, 0, 0.55);  border-radius: 20px 0px 0px 20;"></div>');

	// Тестовая проверка
	$.post('http://www.lowadi.com/member/social/doCongratulation', { id: '15108956', csrf_token: TOKEN })
		.done (function(data) { $('.myrez').append('<p style="color:#fff;"><b>TOKEN OK</b></p>');  })	
		.fail (function(data) { $('.myrez').append('<p style="color:#fff;">TOKEN ERROR!</p>');   });
	        
	
	
	var timerId = setInterval(function() {
	  $('#lien-player-overall').click()
	  $('#lien-player-popularity').click();
	}, 1000);  

	setTimeout(function() {
	  clearInterval(timerId);
	}, DEF_SEC);

	setTimeout(start, DEF_SEC+1000);

	}


if (/www.lowadi.com\/joueur\/fiche\/\?id=/.test(window.location.href))
	{
		var token = get_token();
			localStorage.setItem("horse_token", token);
	}
	
	
function send(id)
	{	
		var ids = id.split("=");
		var tmp_id = ids[1];
		$.post('http://www.lowadi.com/member/social/doCongratulation', { id: tmp_id, csrf_token: TOKEN })
		.done (function(data) { $('.myrez').append('<p style="color:#fff;">'+tmp_id+' ok</p>');  })	
			.fail (function(data) { $('.myrez').append('<p style="color:#fff;">ERROR!!!</p>');   });

	}
		 
		 
function start()
{
	$('.usergroup_2').each(function (indx, element) {
	setTimeout((function(){ 
	var tmp = $(element).attr('href').split('?'); 
			send(tmp[1]);
	  }).bind(this) , 2000*indx);
	});
}


function get_token()
{
/*CSRF Token Get*/
var text = $('body').html();

var result = text.split('csrf_token=');
var result2 = result[1].split('\'');
return result2[0];
}

