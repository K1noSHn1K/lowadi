
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
    return text.replace("Лето", "Седьмое пекло");
    });
	
    $(".hud-clock").html(function(index, text) {
    return text.replace("Осень", "Зима близко");
    });

    $(".hud-clock").html(function(index, text) {
    return text.replace("Зима", "Время Старков");
    });

    $(".hud-clock").html(function(index, text) {
    return text.replace("Весна", "Пес трется о нога");
    });	
	
    $(".new-console").html(function(index, text) {
    return text.replace("Покрыть кобылу", "Присунуть");
    });	

    $(".new-console").html(function(index, text) {
    return text.replace("Случить кобылу", "Отдаться");
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
    return text.replace("Отправить спать", "Скрыть месяц");
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
		
    $(".new-console").html(function(index, text) {
    return text.replace("Урок", "Вкалывать");
    });	
		
    $(".new-console").html(function(index, text) {
    return text.replace("Транспортировать железо", "Крест");
    });
		
    $(".new-console").html(function(index, text) {
    return text.replace("Транспортировать песок", "Насыпали тут!");
    });	
				
		
    $(".new-console").html(function(index, text) {
    return text.replace("Заготовка леса", "Развести костер");
    });			
		
    $(".new-console").html(function(index, text) {
    return text.replace("Информация", "Кто ты по жизни");
    });	
		
   $(".header-currency-label").html(function(index, text) {
    return text.replace("экю", "Побрякушки");
    });			
	
   $(".header-currency-label").html(function(index, text) {
    return text.replace("пропусков", "Прелести");
    });	
		
   $(".header-currency-label").html(function(index, text) {
    return text.replace("пропуска", "Прелести");
    });		
		
   $(".header-currency-label").html(function(index, text) {
    return text.replace("пропуск", "Прелести");
    });		
			
	}


 setInterval(function(){
 if (/\/elevage\/chevaux\/cheval\?id=/.test(window.location.href))
  	fun();
}, 1000); 	
