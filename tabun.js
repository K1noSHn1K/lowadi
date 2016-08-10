// ==UserScript==
// @name Прогон табуна
// @description Бот для браузерной игры Lowadi
// @author HumanoID
// @license Mozilla Public License Version 2.0
// @version 1.4
// @include http://www.lowadi.com/*
// @grant none
// ==/UserScript==




	
// Опция для настройки количества дней при записи в КСК.
var KCK_option = 3;

/* Возможные значения:
0 - 1 день
1 - 3 дня
2 - 10 дней
3 - 30 дней
4 - 60 дней */

var SPEED = 0; // Скорость прогона. Время прибавки к базовым задержкам, мс

settings();

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

function is_lic()
{
 /* Logins */
var l = ["2400030474", "168364849", "2699251275", "3047797807", "576883550", "30978012", "586036770", "549146730", "3525182426", "3998243183", "814745076", "1652390262", "847179424", "1569475330", "96465151", "304541404", "2671962595", "2785536398", "2595068121", "2912178197", "2835493391", "2234626590", "1499734799"];
var myhash = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);
var lic = false;

 	for (var h=0; h<l.length; h++)
 		{
 			if (l[h] == myhash) lic = true;	
 		}
 return lic;		
 		
}


// --------------------------- Настройки скрипта --------------------------------->
function set_kck_option()
	{
		var val = $("#kck_option option:selected").val();
		localStorage.setItem("lwb_kck", val);
	}
	
function set_sluchki_option()
	{
		var val = $("#sluchka_option option:selected").val();
		if ($("#slchkbx").prop("checked"))
			var sl_check = "1";
			else var sl_check = "0";
		localStorage.setItem("lwb_slu", val);	
		localStorage.setItem("lwb_chk", sl_check);	
	}	
	
function get_kck_option()	
	{
	value = localStorage.getItem("lwb_kck");
	$("#kck_option [value='"+value+"']").attr("selected", "selected");
	
	return value;
	}
	
	
function get_sluchki_option()	
	{
	value = localStorage.getItem("lwb_slu");
	sl_check = localStorage.getItem("lwb_chk");
	$("#sluchka_option [value='"+value+"']").attr("selected", "selected");
	if(sl_check=="1") 
		{
			$('#slchkbx').prop('checked', true);
			$('.lwb_sl_hide').show();
		}
		else  $('.lwb_sl_hide').hide();
	
	return value;
	}	
	

function savesettings()
	{
		var shablon = $("#lw_template").val();
		var speed = $('input[name=lw_speed]:radio:checked').val();
		if ($("#settings_fourrage").prop("checked"))
			var settings_fourrage = "1";	
				else settings_fourrage = "0";
				
		if ($("#settings_zerno").prop("checked"))
			var settings_zerno = "1";	
				else settings_zerno = "0";	
		localStorage.setItem("settings_fourrage", settings_fourrage);
		localStorage.setItem("settings_zerno", settings_zerno);	
		localStorage.setItem("settings_speed", speed);	
		localStorage.setItem("settings_shablon", shablon);
			alert('Сохранено');
	}	
	
function loadsettings()
	{
		settings_shablon = localStorage.getItem("settings_shablon");
			if (settings_shablon == "" || settings_shablon==null) settings_shablon = "%GENDER%";
		settings_fourrage = localStorage.getItem("settings_fourrage");
		settings_zerno = localStorage.getItem("settings_zerno");
		settings_speed = localStorage.getItem("settings_speed");
		
		if (settings_fourrage=="1") $('#settings_fourrage').prop('checked', true);
		if (settings_zerno=="1") $('#settings_zerno').prop('checked', true);
		
		if (settings_speed) $("#"+settings_speed+"").attr("checked", true);
			else $("#norm").attr("checked", true);
		$("#lw_template").val(settings_shablon);	

	}	
	
$('#kck_option').on('change', function() {
 set_kck_option();
});

$('#sluchka_option').on('change', function() {
 set_sluchki_option();
});

$('#slchkbx').on('change', function() {
 set_sluchki_option();
 	if ($("#slchkbx").prop("checked"))  $('.lwb_sl_hide').show('slow');
 		else  $('.lwb_sl_hide').hide('slow');
});

if (!localStorage.getItem('lwb_kck')) set_kck_option();
KCK_option = get_kck_option();
SL_option = get_sluchki_option();

settings_speed = localStorage.getItem("settings_speed");
if (settings_speed == "norm") SPEED = 600; 

if (localStorage.getItem("settings_shablon")) 
	var settings_shablon = localStorage.getItem("settings_shablon");
if (settings_shablon == "") settings_shablon = "%GENDER%";

loadsettings();
// ---------------------- Конец настроек ------------------------------->

// Парсинг URI
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Если сайт лагает, и кидает на всех лошадей, то ищем записанную в КСК, но не уложенную спать
function bug_finder()
{
	var  horse = localStorage.getItem("horse_status");
		if (horse=='1')
		{
		horse_href = localStorage.getItem("horse_id");	
		location.href="http://www.lowadi.com/elevage/chevaux/cheval?id="+horse_href;			
		/*	$('.item-relative').each(function(i,elem) { 
				var text = $(this).find("[data-tooltip='Размещена в комплексе']").html();
				if (text!=undefined)
					{
						kon = ($(this).find('.horsename').attr('href'));
						location.href=kon;
					}
					
			});*/

		}
}

setTimeout(bug_finder, 500);


if (/\/elevage\/chevaux\/cheval\?id=/.test(window.location.href))
{
		
  // Если конь свежекуплен, останавливаем скрипт
  if (/www.lowadi.com\/elevage\/chevaux\/cheval\?id=[0-9]+\&message=acheter/.test(window.location.href))
  {
    throw 'stop';
  }  

  // Если конь не уложен спать
    //if ($("#boutonCoucher").hasClass("action-disabled") == false)
  if (document.getElementById('countDownWakeUp') == null)
  {
    // Если конь старше 30ти
    if (chevalAge > 358)
    {
      // Следующий конь
      var pause = getRandomPause(600, 1500);
      setTimeout(prev, pause);
    } 
    else
    {
       if (is_lic()===true) usualProg();
    }
  }
  
}

/*else
{
	if (/\/jeu/.test(window.location.href)) 
	$.get("http://ctrl-z.ru/lowadi/stat.php?nick="+document.getElementsByClassName('forumAvatar')[0].alt);
}	
*/	

// Выжеребка
if (/www.lowadi.com\/elevage\/chevaux\/choisirNoms\?jument=/.test(window.location.href))
{
var horseid = getParameterByName('jument');	
localStorage.setItem("horse_status", "2");
localStorage.setItem("horse_id", horseid);	
	
  if (document.body.innerHTML.indexOf('женск.') !== - 1)
 //alert($('#page-contents:contains('женск')').text());
 //if ($('#page-contents:contains('женск')').text)
  {
    document.getElementById('poulain-1').setAttribute('value', 'Кобыла');
  } 
  else document.getElementById('poulain-1').setAttribute('value', 'Жеребец');


  $('#boutonChoisirNom').click();
}


// Запись в КСК

if (/www.lowadi.com\/elevage\/chevaux\/centreInscription\?id=/.test(window.location.href))
{
  // Выставление дней
  var pause = 0;
  pause = pause + getRandomPause(700, 1500+SPEED);
  setTimeout(eqCenterReg2, pause);
  // Запись
  var pause1 = pause + getRandomPause(700, 1500+SPEED);
  setTimeout(eqCenterReg3, pause1);
  // Проверка результата
  var pause2 = pause1 + getRandomPause(700, 1500+SPEED);
  setTimeout(eqCenterReg4, pause2);
}


// Программа обычного прогона
function usualProg()
{
	// Статус 2 означает, что кобыла родила, переименовываем жеребенка
	var  horse = localStorage.getItem("horse_status");
		if (horse=='2')
		{
			horsename(settings_shablon);
		}
	else		
	// Статус 3 означает, что жеребенок переименован, идем обратно к родившей кобыле	
		if (horse=='3')
		{
			horse_href = localStorage.getItem("horse_id");	
			localStorage.setItem("horse_status", "0");
			setTimeout(sleep,200);
			setTimeout(location.href="http://www.lowadi.com/elevage/chevaux/cheval?id="+horse_href, 800);
		}
	else
		{
	localStorage.setItem("horse_status", "0");
	localStorage.setItem("horse_id", chevalId);
	  if (document.body.innerHTML.indexOf('/elevage/chevaux/mettreBas?jument=') != - 1)
	  {
		var d = document.getElementById('reproduction-body-content').childNodes[3].getElementsByTagName('a');
		d[0].removeAttribute('onclick');
		d[0].click();
	  }
	  var pause = 0;
	  // Запись в КСК
	  if (/elevage\/chevaux\/centreInscription\?id=/.test(document.body.innerHTML))
	  {
		// Нажатие на кнопку
		pause = pause + getRandomPause(500, 1500+SPEED);
		setTimeout(eqCenterReg, pause);
		return;
	  }  
	
	 //Игры с жеребятами
	var pauseG = pause + getRandomPause(400, 600+SPEED);
	setTimeout(games, pause);	
	
	//Случка 
	var pauseS = pauseG + getRandomPause(500, 1200+SPEED);
	setTimeout(sluchka, pauseS);
	// Чистка
	  var pause1 = pauseS + getRandomPause(300, 500+SPEED);
	setTimeout(groom, pause1);
	  // Урок
	  var pause2 = pause1 + getRandomPause(500, 1000+SPEED);
	setTimeout(lesson, pause2);
	  // Корм
	  var pause3 = pause2 + getRandomPause(200, 800+SPEED);
	setTimeout(openFeeding, pause3);
	  var pause4 = pause3 + getRandomPause(600, 1000+SPEED);
	setTimeout(doEatNorm, pause4);
	  // Ласка            
	  var pause5 = pause4 + getRandomPause(200, 900+SPEED);
	setTimeout(stroke, pause5);
	  // Спать
	  var pause6 = pause5 + getRandomPause(500, 800+SPEED);
	setTimeout(sleep, pause6);
	    var pause7 = pause6 + getRandomPause(200, 400+SPEED);
	setTimeout(stroke, pause7);
	setTimeout(minEnergy,300);
	
	// Дополнительные случки 
	var pause8 = pause7 + getRandomPause(500, 1400+SPEED);	
	setTimeout(function() {
		var energy = $("#energie").text();
		if (energy>42)
		{
			setTimeout(sluchka, 200);	
		}	
		
	}, pause8);
	
	 // Следующий
	  var pause9 = pause8 + getRandomPause(800, 1300+SPEED);
	setTimeout(prev, pause9);
	


}
}


// Запись в КСК
function eqCenterReg()
{
  if (document.body.innerHTML.indexOf('cheval-inscription') !== - 1)
  {	
    // Нажимаем на кнопку
    var d = document.getElementById('cheval-inscription').firstChild;
    if (d !== null)
    {
      d.click();
    }
  }
}
function eqCenterReg2()
{
	localStorage.setItem("horse_status", "1");
	// Смотрим настройки, и если надо, то подбираем КСК по заданным параметрам
	settings_fourrage = localStorage.getItem("settings_fourrage");
	settings_zerno = localStorage.getItem("settings_zerno");
	if (settings_fourrage == "1") setTimeout($('#fourrageCheckbox').click(),200);
	if (settings_zerno == "1") setTimeout($('#avoineCheckbox').click(),400);
	
  // Сортировка
  var c = document.getElementsByClassName('grid-cell spacer-small-top spacer-small-bottom');
  var d = c[KCK_option].getElementsByTagName('a');
  d[0].click();
}
function eqCenterReg3()
{
  // Запись в первый
  var c = document.getElementsByClassName('odd highlight');
  var d = c[0].getElementsByTagName('button');
  var e = d[KCK_option];
 /* if (KCK_option > 1)
  {
    var f = e.onclick.toString();
    var onClick = f.substr(f.indexOf('AjaxJSON'));
    onClick = onClick.substr(0, onClick.indexOf('}')) + '}))';
    e.setAttribute('onclick', onClick);
  }*/
  e.click();
}
function eqCenterReg4()
{
  // Проверка результата
  // Если не записано, записать
  if (/message=centreOk/.test(window.location.href) != true)
  {
    location.reload();
  }
  

  
}

// Пустая функция

function pauseFunc()
{
  if (document.body.innerHTML.indexOf('chevalId') !== - 1)
  {
    return;
  }
}

// Корм по норме
function doEatNorm()
{
  // Если кормим молоком
  if (document.body.innerHTML.indexOf('boutonAllaiter') !== - 1)
  {
    var d = document.getElementById('boutonAllaiter');
    if (d !== null)
    {
      d.click();
    }
    return;
  }
  var subm = false;
  var d2 = document.getElementById('feeding').innerHTML;
  var hay = hayToGive();
  var oats = oatsToGive();
 // alert('hay' + hay);
 // alert('oats' + oats);
  if (hay + oats == 0) return;
  if (d2.indexOf('толст') !== - 1) return;
  if (d2.indexOf('недостаточный') !== - 1)
  {
    hay = 20000 - hayGiven() * 1000;
    oats = 15000 - oatsGiven() * 1000;
  }  
  
  // Для слайдеров
  if (d2.indexOf('haySlider') !== - 1)
  {
    // Выставляем сено
    var spans = document.getElementById('haySlider').getElementsByTagName('li');
    var i = hay / 1000;
    spans[i].className = spans[i].className + ' selected';
    spans[i].click();
    var hidden = document.getElementById('haySlider-sliderHidden');
    hidden.setAttribute('value', i);
    subm = true;
  }  // Выставляем зерно, если оно есть

  if (d2.indexOf('oatsSlider') !== - 1)
  {
    var spans = document.getElementById('oatsSlider').getElementsByTagName('li');
    var i = oats / 1000;
    spans[i].className = spans[i].className + '  selected';
    spans[i].click();
    var hidden = document.getElementById('oatsSlider-sliderHidden');
    hidden.setAttribute('value', i);
    subm = true;
  }
  if (subm == false)
  {
    // Для выпадающих списков
    if (d2.indexOf('id="feedingHay"') !== - 1)
    {
      document.getElementById('feedingHay').options[hay / 1000].selected = true;
    }
    if (d2.indexOf('id="feedingOats"') !== - 1)
    {
      document.getElementById('feedingOats').options[oats / 1000].selected = true;
    }
  }  // Нажимаем на кнопку

  var d = document.getElementById('feed-button');
  if (d !== null)
  {
    d.click();
    
  }

  
}
function openFeeding()
{
  if (document.body.innerHTML.indexOf('boutonAllaiter') == - 1)
  {
    var dd = document.getElementById('boutonNourrir');
    dd.click();
  }
}

// Вычисление необходимой нормы сена
function hayToGive()
{
  // Дано сена
  var hay_to_give = (hayNorm() * 1 - hayGiven() * 1) * 1000;
  // Округляем до 500
  hay_to_give = 500 * Math.floor(hay_to_give / 500);
  // Не меньше нуля
  if (hay_to_give < 0) hay_to_give = 0;
  // Не больше 20 кг
  if (hay_to_give > 20000) hay_to_give = 20000;
  // Норма сена
  return hay_to_give;
}

// Вычисление необходимой нормы зерна
function oatsToGive()
{
  if (document.getElementById('feeding').outerHTML.indexOf('oats') !== - 1 || document.getElementById('feeding').outerHTML.indexOf('Oats') !== - 1)
  {
    var oats_to_give = (oatsNorm() * 1 - oatsGiven() * 1) * 1000;
    // Округляем до 250
    oats_to_give = 500 * Math.floor(oats_to_give / 500);
    // Не меньше нуля
    if (oats_to_give < 0) oats_to_give = 0;
    // Не больше 15 кг
    if (oats_to_give > 15000) oats_to_give = 15000;
    // Норма сена
    return oats_to_give;
  } 
  else return 0;
}

// Нормы корма
// Норма сена
function hayNorm()
{
  var d2 = document.getElementById('feeding').outerHTML;
  // Для слайдеров
  if (d2.indexOf('haySlider') !== - 1)
  {
    var d = d2.substring(d2.indexOf('/doEat'), d2.indexOf('id="haySlider"'));
    var hay_norm = trim(d.substring(d.indexOf('/ <strong class="section-fourrage section-fourrage-target">') + ('/ <strong class="section-fourrage section-fourrage-target">').length, d.lastIndexOf('</strong>')));
    return hay_norm;
  }  // Для выпадающих списков

  if (d2.indexOf('id="feedingHay"') !== - 1)
  {
    var d = document.getElementById('feedingHay').parentNode.outerHTML;
    var hay_norm = trim(d.substring(d.indexOf('/ <strong class="section-fourrage section-fourrage-target">') + ('/ <strong class="section-fourrage section-fourrage-target">').length, d.lastIndexOf('</strong>')));
    return hay_norm;
  }
}

// Съедено сена
function hayGiven()
{
  var d2 = document.getElementById('feeding').outerHTML;
  // Для слайдеров
  if (d2.indexOf('haySlider') !== - 1)
  {
    var d = d2.substring(d2.indexOf('/doEat'), d2.indexOf('id="haySlider"'));
    var hay_given = trim(d.substring(d.indexOf('/ <strong class="section-fourrage section-fourrage-target">') - 3, d.lastIndexOf('/ <strong class="section-fourrage section-fourrage-target">')));
    return hay_given;
  }  // Для выпадающих списков

  if (d2.indexOf('id="feedingHay"') !== - 1)
  {
    var d = document.getElementById('feedingHay').parentNode.outerHTML;
    var hay_given = trim(d.substring(d.indexOf('/ <strong class="section-fourrage section-fourrage-target">') - 3, d.lastIndexOf('/ <strong class="section-fourrage section-fourrage-target">')));
    return hay_given;
  }
}

// Норма зерна
function oatsNorm()
{
  var d2 = document.getElementById('feeding').outerHTML;
  // Для слайдеров
  if (d2.indexOf('oatsSlider') !== - 1)
  {
    var d = d2.substring(d2.indexOf('avoine.png'), d2.indexOf('id="oatsSlider"'));
    var oats_norm = trim(d.substring(d.lastIndexOf('/ <strong class="section-avoine section-avoine-target">') + ('/ <strong class="section-avoine section-avoine-target">').length, d.lastIndexOf('</strong>')));
    return oats_norm;
  }  // Для выпадающих списков

  if (d2.indexOf('id="feedingOats"') !== - 1)
  {
    var d = document.getElementById('feedingOats').parentNode.outerHTML;
    var oats_norm = trim(d.substring(d.indexOf('/ <strong class="section-avoine section-avoine-target">') + ('/ <strong class="section-avoine section-avoine-target">').length, d.lastIndexOf('</strong>')));
    return oats_norm;
  }
}

// Съедено зерна
function oatsGiven()
{
  var d2 = document.getElementById('feeding').outerHTML;
  // Для слайдеров
  if (d2.indexOf('oatsSlider') !== - 1)
  {
    var d = d2.substring(d2.indexOf('avoine.png'), d2.indexOf('oatsSlider'));
    var oats_given = trim(d.substring(d.lastIndexOf('/ <strong class="section-avoine section-avoine-target">') - 3, d.lastIndexOf('/ <strong class="section-avoine section-avoine-target">')));
    oats_given = oats_given.substring(oats_given.indexOf(' ') + 1, oats_given.lastIndexOf(' '));
    return oats_given;
  }  // Для выпадающих списков

  if (d2.indexOf('id="feedingOats"') !== - 1)
  {
    var d = document.getElementById('feedingOats').parentNode.outerHTML;
    var oats_given = trim(d.substring(d.indexOf('/ <strong class="section-avoine section-avoine-target">') - 3, d.lastIndexOf('/ <strong class="section-avoine section-avoine-target">')));
    oats_given = oats_given.substring(oats_given.indexOf(' ') + 1, oats_given.lastIndexOf(' '));
    return oats_given;
  }
}

// Удаление пробелов
function trim(str, chars)
{
  return ltrim(rtrim(str, chars), chars);
}
function ltrim(str, chars)
{
  chars = chars || '\\s';
  return str.replace(new RegExp('^[' + chars + ']+', 'g'), '');
}
function rtrim(str, chars)
{
  chars = chars || '\\s';
  return str.replace(new RegExp('[' + chars + ']+$', 'g'), '');
}

// Случайное число
function getRandomPause(min, max)
{
  var rand = Math.random() * (max - min) + min;
  return rand;
}

// Урок
function lesson()
{
  var d = document.getElementById('boutonMissionEquus');
  if (d !== null)
  {
    d.click();
  }
  var d = document.getElementById('boutonMissionMontagne');
  if (d !== null)
  {
    d.click();
  }
  var d = document.getElementById('boutonMissionForet');
  if (d !== null)
  {
    d.click();
  }
  var d = document.getElementById('boutonMissionPlage');
  if (d !== null)
  {
    d.click();
  }
}

// Корм
// Чистка
function groom()
{
  var d = document.getElementById('boutonPanser');
  if (d !== null)
  {
    d.click();
  }
}

// Если энергии меньше 40, то
function minEnergy()
{
  if (chevalEnergie < 40)
  {
    // Ласка
    var d = document.getElementById('boutonCaresser');
    if (d !== null)
    {
      d.click();
    }    
	// Пить
    var d = document.getElementById('boutonBoire');
    if (d !== null)
    {
      d.click();
    }
  }
}

// Сон
function sleep()
{
  var d = document.getElementById('boutonCoucher');
  if (d !== null)
  {
    d.click();
  }
}

// Ласка
function stroke()
{
  // Если энергии <50
  var en = document.getElementById('energie').textContent;
  if (en < 50)
  {
    var d = document.getElementById('boutonCaresser');
    if (d !== null)
    {
      d.click();
    }
  }
}

// Предыдущий
function prev()
{
  var d = document.getElementById('nav-previous');
  if (d !== null && d.hasAttribute('href'))
  {
    d.click();
  }
}

// Рост ОР
function OR()
{
  var d = document.getElementById('age');
  if (d !== null && d.hasAttribute('onsubmit'))
  {
    d.onsubmit();
  }
}


function settings()
	{
		$('body#global').append('<div class="lwb_logo" style="display: block; position: fixed; width: 105px; top: 30px; left: 20px; z-index: 900;"><img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/robothorseday.png" width="100px"></div>');
		$('body#global').append('<div class="lwb" style="display:block; position:fixed; width:120px; height:115px; left:0; top:105px; padding:5px; background-color:rgba(0, 0, 0, 0.7);  border-radius: 0px 0px 20px 0;"></div>');
		$('.lwb').append('<span class="header-currency-label" style="color:#fafe6c;  z-index:990;"><b>LwBot v1.4.2</b></span>   <span class="lwb_setting" style="cursor:pointer; position:absolute; right:5px; top:3px; z-index:999;">  <img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/settings-n.png" width="20px" title="Показать настройки" /></span>');
		
		if (is_lic()===true)
		{
			$('.lwb').append('<span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Запись в КСК</span>	 <select id="kck_option"> <option value="0">1 день</option>	<option value="1">3 дня</option>	<option value="2">10 дней</option>	<option selected value="3">30 дней</option> </select> &nbsp  ');
			$('.lwb').append('<br> <div style="padding-top:5px;"></div> <span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Предлагать случки</span></td> <td><input id="slchkbx" name="slchkbx" value="1" type="checkbox">');
			$('.lwb').append('<div class="lwb_sl_hide"><span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;"> По цене</span>  <select id="sluchka_option"> <option value="500">500</option> <option value="1000">1000</option> <option value="1500">1500</option> <option value="2000">2000</option> <option value="2500">2500</option> <option value="3000">3000</option> <option value="3500">3500</option> <option value="4000">4000</option> <option value="4500">4500</option> <option value="5000">5000</option> <option value="5500">5500</option> <option value="6000">6000</option> <option value="6500">6500</option> <option value="7000">7000</option> <option value="7500">7500</option>	</select></div>');
		}
		else
		{
			var hashlogin = murmurhash(document.getElementsByClassName('forumAvatar')[0].alt, 5);	
			$('.lwb').append('<center><p style="color: #fff; " >Unregistred</p></center>');
			$('.lwb').append('<center><p style="color: #fff; font-size: 11px">ID: '+hashlogin+' </p>  <p style="color: #fff; font-size: 11px">Login: '+document.getElementsByClassName('forumAvatar')[0].alt+'</p>   </center> <p style="color: #fff; font-size: 11px"> Подробнее о боте и контакты для покупки: <a style="color:#F8563B;" href="http://lowadibot.ctrl-z.ru/">lowadibot.ctrl-z.ru</a></p>');
			
		}
		$('body#global').append('<div class="lwb_settings" style="display: none; position: fixed; width: 600px; height:630px; top: 25px; left: 130px; z-index: 999; padding:5px; background-color:rgba(0, 0, 0, 0.95);  border-radius: 0px 5px 5px 5px;"></div>');
		$('.lwb_settings').append('<center><h2 style="color:#fff;">Настройки</h2> <br> <h3 style="color:#FFF;">Запись в КСК</h3></center> <span class="lwb_setting" style="position:absolute;  right:5px; top:2px; color:#fff; cursor:pointer;"><b>X</b></span>');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/fourrage_v1828806360.png" /> <input id="settings_fourrage" name="settings_fourrage" value="0" type="checkbox">  Выбирать КСК с фуражом </div>');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/avoine_v1828806360.png" /> <input id="settings_zerno" name="settings_zerno" value="0" type="checkbox"> Выбирать КСК с зерном </div>');
		$('.lwb_settings').append('<center> <br> <h3 style="color:#FFF;">Скорость прогона</h3></center> ');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:10px;"> <input type="radio" name="lw_speed" id="norm" value="norm"> Нормальная<Br> <input type="radio" name="lw_speed" value="fast" id="fast"> Высокая<Br>  </div> ');
		$('.lwb_settings').append('<center> <br> <h3 style="color:#FFF;">Опции родов</h3></center> ');	
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px;">Шаблон имени <font color="red"><sup>beta</sup></font> <input type="text" id="lw_template" size="38" value="%GENDER%"> &nbsp; <button id="lwb_check" style="margin: 5px 0 0 0;" onclick="check_shablon()" class="button button-style-0"><span class="button-align-0"><span class="button-inner-0"><span class="button-text-0">Проверить шаблон</span></span></span></button> <br> Можно назначить шаблон, по которому будут именоваться все рожденные жеребята. Список возможных параметров:  </div>');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px; font-size: 11px;"><b>%NAME%</b> - Имя, выбирается одно из нормальных имен в зависимости от пола <br><b>%GENDER%</b> - пол жеребенка (Жеребец или Кобыла)<br><b>%GENDER_MIN%</b> - Сокращенное написание пола (Жер или Коб)<br><b>%GP%</b> - генетический потенциал  <br><b>%SKILLS%</b> - сумма навыков </div> ');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.85) none repeat scroll 0% 0%; padding:5px; font-size: 11px;">  В качестве разделителя между параметрами можно использовать символы: пробел, запятая, <b>-</b>, <b>|</b>  <br> Стоит учесть, что максимальная длина имени не может превышать 20 символов, поэтому перед сохранением рекомендуется нажимать кнопку "Проверить шаблон". <br> <br> <b>Примеры шаблонов: </b> <br>  <b>%NAME% %SKILLS% </b> - будет выглядеть Афродита 77.54 <br> <b>%GENDER%|%GP%</b> будет выглядеть, как Кобыла|3677.54</div> ');
		
		$('.lwb_settings').append('<br><center><button id="lwb_savesettings" style="margin: 5px 0 0 0;" onclick="savesettings();" class="button button-style-0"><span class="button-align-0"><span class="button-inner-0"><span class="button-text-0">Сохранить</span></span></span></button></center>');


	}



$('.lwb_setting').click(function(){
   $('.lwb_settings').toggle("slow");
});

$('.lwb_chat_button').click(function(){
   $('.lwb_chat').toggle("slow");
});
	
$('#lwb_savesettings').click(function(){
  savesettings();	
});	

$('#lwb_check').click(function(){
  check_shablon();	
});

function get_sluchka()
	{
	if ($("#reproduction-wrapper:contains('Покрыть')").text()!=="") 
		{
			setTimeout($("#reproduction-wrapper").find("span:contains('Покрыть')").click(),100);
			setTimeout($("#formMalePublicTypePublic").click(),200);
			setTimeout($('#formMalePublicPrice option[value="'+SL_option+'"]').prop('selected', true),300);
			setTimeout($("#boutonMaleReproduction").click(),400);
		}
	}

function sluchka()
{
	if ($("#reproduction-wrapper:contains('Покрыть')").text()!=="") 
	{
		if ($("#slchkbx").prop("checked"))
		setTimeout(get_sluchka(),200);
	}	
}


function games()
	{
	var status = localStorage.getItem("game_id");
	var horseid = chevalId;
	if (horseid!=status) {
		if ($("a").is('#boutonJouer')) {
			$('#boutonJouer').click();
			
				var d2 = document.getElementById('formCenterPlay').innerHTML;
				// Для слайдеров
				if (d2.indexOf('centerPlaySlider') !== - 1)
				{
					var spans = document.getElementById('centerPlaySlider').getElementsByTagName('li');
					var i = $('#centerPlaySlider').find('li.disabled').attr("data-number") - 1;
					spans[i].className = spans[i].className + ' selected';
					spans[i].click();
					var hidden = document.getElementById('centerPlaySlider-sliderHidden');
					hidden.setAttribute('value', i);		
				}
				else
				{
					if ($('[id^="formCenterPlay"]') !== "")
						{
							var en = Math.floor(($('#energie').text())/6);
						  $('[id^="formCenterPlay"] [value="'+en+'"]').attr('selected', 'selected');
						}
				}	
				
				
				$('#formCenterPlaySubmit').click();	
			
		// Ласка
		var d = document.getElementById('boutonCaresser');
		if (d !== null)
		{
		  d.click();
		}    
		// Пить
		var d = document.getElementById('boutonBoire');
		if (d !== null)
		{
		  d.click();
		}	

		// Морковка
		var d = document.getElementById('boutonCarotte');
		if (d !== null)
		{
		  d.click();
		}		
			
			}
	}
		localStorage.setItem("game_id", horseid);		
		
	}
	
function horsename(shablon)
	{
	/*
	Шаблоны для задания имени:
	
	NAME - имя коня\кобылы, выбирается из списка
	GENDER - Пол, значения: Жеребец, Кобыла
	GENDER_MIN - сокращенный пол: Жер, Коб
	GP - генетический потенциал
	SKILLS - навыки
	
	*/	localStorage.setItem("horse_status", "3");
		var out = new Array();
		var hname = "";
		var male_names = "Снежок,Агат, Азарт,Авалон,Аверон,Алый,Ангел,Амулет,Вольт,Ветер,Вегас,Вираж,Восток,Викинг,Воланд,Виспер,Вереск,Вирго,Оскар,Оникс,Олимп,Озар,Онис,Ойххо,Орик,Омар,Персик,Прайд,Принц,Пион,Плуто,Памир,Пэйн,Пунш,Плутон,Приор,Пульс,Перри,Пауэр,Пафос,Перчик";
		var female_names = "Адель,Агата,Ариэль,Агния,Анна,Бель,Волна,Веста,Вега,Ваниль,Верба,Вики,Вирия,Викси,Вуди,Вария,Варна,Ветта,Вилма,Вупи,Виола,Оззи,Осень,Омега,Опера,Офея,Ола,Олли,Окси,Прага,Пайпер,Персия,Пурга,Прима,Проза,Пеппи,Помпея,Пепер,Палада,Призма,Павия,Пенни";
	
			gender = $("#characteristics-body-content").find("td:contains('Пол')").text();
			gender = gender.replace("Пол: ","");		
			
		
		var a = shablon.split('%');
		var SH = "NAME,GENDER,GENDER_MIN,GP,SKILLS";
		var SH_mas = SH.split(',');	
		
		
		
		for (var i=0; i<a.length; i++)
			{
				for (var y=0; y<SH_mas.length; y++)
					{
						if (a[i] == SH_mas[y])
							out[i] = a[i];
						if(a[i] == " " || a[i] == "|" || a[i] == "," || a[i] == "-"  )
							out[i] = a[i];
					}
			}
		
		for (j=0; j<out.length; j++)
			{
				if (out[j] == "GENDER") hname+=gender;
				if (out[j] == "GENDER_MIN") hname+=gender.substring(0,3);
					
				if (out[j] == "NAME")
					{
						if (gender=="кобыла") 
							{
								var f_names = female_names.split(",");
								f_name = f_names[Math.floor(Math.random() * (f_names.length - 1)) + 1];	
								hname+=f_name+" ";
							}
							else
							{	
								var m_names = male_names.split(",");
								m_name = m_names[Math.floor(Math.random() * (m_names.length - 1)) + 1];	
								hname+=m_name+" ";
							}
					}
					
				if (out[j] == "GP")
					{
							gp = $("#genetic-body-content").find(".align-right:first").text();
							gp = gp.replace("Итог: ","");
							hname+=gp+" ";
					}
					
				if (out[j] == "SKILLS")
					{
						nav = $('#competencesValeur').text();
						hname+=nav+" ";
					}
					
				if(out[j] == " " || out[j] == "|" || out[j] == "," || out[j] == "-")	
					hname+=out[j];	
			}
	var realname = $('.horse-name').text();
	realname = realname.slice(0, -1);	
	if (realname!==hname)
		{
			$("#horseNameName").val(hname);	
			$(".options-button").click();
			setTimeout($('.options-menu').find("a:contains('Изменить')").click(),300);
			setTimeout($('#horseName').submit(),600);	
		}
			
		
	}
	
function check_shablon()
		{
		var shablon = $("#lw_template").val(); 	
		var out = new Array();
		var len = 0;
		var a = shablon.split('%');
		var SH = "NAME,GENDER,GENDER_MIN,GP,SKILLS";
		var SH_mas = SH.split(',');	
		
		for (var i=0; i<a.length; i++)
			{
				for (var y=0; y<SH_mas.length; y++)
					{
						if (a[i] == SH_mas[y])
							out[i] = a[i];
						if(a[i] == " " || a[i] == "|" || a[i] == "," || a[i] == "-"  )
							out[i] = a[i];
					}
			}
			
			
			for (j=0; j<out.length; j++)
			{
				if (out[j] == "GENDER") len+=7;
				if (out[j] == "GENDER_MIN") len+=3;
				if (out[j] == "NAME") len+=6;
				if (out[j] == "GP") len+=7;
				if (out[j] == "SKILLS") len+=7;
				if(out[j] == " " || out[j] == "|" || out[j] == "," || out[j] == "-") len+=1;	
				
			}
			
		if (len<20) alert('Шаблон проверен, все ок!');
		if (len>20) alert("Ошибка! Имя получится более 20 символов, что приведет к ошибкам. Используйте меньше параметров");
		if (len==20) alert("Мда. 20 символов, возможно и прокатит, но возможно и будут сыпаться ошибки. Лучше попытаться сократить шаблон");
		}	



 		
		
