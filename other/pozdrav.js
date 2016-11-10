// ==UserScript== 
// @name Поздравление
// @description Бот поздравлений
// @author HumanoID
// @license MIT
// @version 1.1
// @include http://www.lowadi.com/*
// @grant none
// ==/UserScript== 



function murmurhash(key, seed) {
	var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
	
	remainder = key.length & 3; // key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;
	
	while (i < bytes) {
	  	k1 = 
	  	  ((key.charCodeAt(i) & 0xff)) |
	  	  ((key.charCodeAt(++i) & 0xff) << 8) |
	  	  ((key.charCodeAt(++i) & 0xff) << 16) |
	  	  ((key.charCodeAt(++i) & 0xff) << 24);
		++i;
		
		k1 = ((((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16))) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16))) & 0xffffffff;

		h1 ^= k1;
        h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((((h1 & 0xffff) * 5) + ((((h1 >>> 16) * 5) & 0xffff) << 16))) & 0xffffffff;
		h1 = (((h1b & 0xffff) + 0x6b64) + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16));
	}
	
	k1 = 0;
	
	switch (remainder) {
		case 3: k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2: k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1: k1 ^= (key.charCodeAt(i) & 0xff);
		
		k1 = (((k1 & 0xffff) * c1) + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = (((k1 & 0xffff) * c2) + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
		h1 ^= k1;
	}
	
	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = (((h1 & 0xffff) * 0x85ebca6b) + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((((h1 & 0xffff) * 0xc2b2ae35) + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16))) & 0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}


//------------------------------------------------>
var DEF_SEC = 10000;
var myhash = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);

if (myhash=='2400030474') DEF_SEC = 25000;


//<-------------------------------------------------

$('body').append('<div class="myrez" style="display:block; position:absolute; width:150px; height:auto; right:0; top:250px; padding:5px; background-color: rgba(0, 0, 0, 0.55);  border-radius: 20px 0px 0px 20;"></div>');
$('.myrez').append('<p style="color:#fff;">ID: '+myhash+'</p> <hr>');


if (/www.lowadi.com\/classements\/general/.test(window.location.href))
{
	var TOKEN = localStorage.getItem("horse_token");	
	var out = ''; 
	
	// Тестовая проверка
	$.post('http://www.lowadi.com/member/social/doCongratulation', { id: '15108956', csrf_token: TOKEN })
		.done (function(data) { $('.myrez').append('<p style="color:#fff;"><center>TOKEN OK</center></p>');  })	
		.fail (function(data) { $('.myrez').append('<p style="color:#fff;"><center>TOKEN ERROR!</center></p>');   });
	        
	
	
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

