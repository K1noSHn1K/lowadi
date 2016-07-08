// Опция для настройки количества дней при записи в КСК.
var KCK_option = 3;
/* Возможные значения:
0 - 1 день
1 - 3 дня
2 - 10 дней
3 - 30 дней
4 - 60 дней */

settings();

// --------------------------- Настройки скрипта --------------------------------->
function set_kck_option()
	{
		var val = $("#kck_option option:selected").val()
		localStorage.setItem("lwb_kck", val);
	}
	
function set_sluchki_option()
	{
		var val = $("#sluchka_option option:selected").val()
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
		if ($("#settings_fourrage").prop("checked"))
			var settings_fourrage = "1";	
				else settings_fourrage = "0";
				
		if ($("#settings_zerno").prop("checked"))
			var settings_zerno = "1";	
				else settings_zerno = "0";	
		localStorage.setItem("settings_fourrage", settings_fourrage);
		localStorage.setItem("settings_zerno", settings_zerno);		
			alert('Сохранено');
	}	
	
function loadsettings()
	{
		settings_fourrage = localStorage.getItem("settings_fourrage");
		settings_zerno = localStorage.getItem("settings_zerno");
		
		if (settings_fourrage=="1") $('#settings_fourrage').prop('checked', true);
		if (settings_zerno=="1") $('#settings_zerno').prop('checked', true);
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
loadsettings();
// ---------------------- Конец настроек ------------------------------->

// Если сайт лагает, и кидает на всех лошадей, то ищем записанную в КСК, но не уложенную спать
function bug_finder()
{
	$('.item-relative').each(function(i,elem) { 
		var text = $(this).find("[data-tooltip='Размещена в комплексе']").html();
		if (text!=undefined)
			{
				kon = ($(this).find('.horsename').attr('href'));
				location.href=kon;
			}
			
	});
}

setTimeout(bug_finder, 500);

if (/\/elevage\/chevaux\/cheval\?id=/.test(window.location.href))
{
	
		
  // Если конь свежекуплен, останавливаем скрипт
  if (/www.lowadi.com\/elevage\/chevaux\/cheval\?id=[0-9]+\&message=acheter/.test(window.location.href))
  {
    throw 'stop';
  }  // Если конь не уложен спать

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
      //ORProg();
      usualProg();
    }
  }
  
}

// Выжеребка
if (/www.lowadi.com\/elevage\/chevaux\/choisirNoms\?jument=/.test(window.location.href))
{
  if (document.body.innerHTML.indexOf('femelle.png') !== - 1)
  {
    document.getElementById('poulain-1').setAttribute('value', 'Кобыла');
  } 
  else document.getElementById('poulain-1').setAttribute('value', 'Жеребец');
  var d = document.getElementsByTagName('button');
  if (d[0].getAttribute('type') == 'submit')
  {
    d[0].click();
  }
}// Запись в КСК

if (/www.lowadi.com\/elevage\/chevaux\/centreInscription\?id=/.test(window.location.href))
{
  // Выставление дней
  var pause = 0;
  pause = pause + getRandomPause(1000, 2000);
  setTimeout(eqCenterReg2, pause);
  // Запись
  var pause1 = pause + getRandomPause(700, 2000);
  setTimeout(eqCenterReg3, pause1);
  // Проверка результата
  var pause2 = pause1 + getRandomPause(700, 2000);
  setTimeout(eqCenterReg4, pause2);
}


// Программа обычного прогона
function usualProg()
{
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
		pause = pause + getRandomPause(500, 2000);
		setTimeout(eqCenterReg, pause);
		return;
	  }  

	//Случка 
	var pauseS = pause + getRandomPause(900, 1400);
	setTimeout(sluchka, pauseS);
	// Чистка
	  var pause1 = pauseS + getRandomPause(1500, 2000);
	setTimeout(groom, pause1);
	  // Урок
	  var pause2 = pause1 + getRandomPause(500, 1500);
	setTimeout(lesson, pause2);
	  // Корм
	  var pause3 = pause2 + getRandomPause(500, 2500);
	setTimeout(openFeeding, pause3);
	  var pause4 = pause3 + getRandomPause(700, 1500);
	setTimeout(doEatNorm, pause4);
	  // Ласка            
	  var pause5 = pause4 + getRandomPause(400, 1000);
	setTimeout(stroke, pause5);
	  // Спать
	  var pause6 = pause5 + getRandomPause(500, 1000);
	setTimeout(sleep, pause6);
	    var pause7 = pause6 + getRandomPause(200, 400);
	setTimeout(stroke, pause7);
	setTimeout(minEnergy,300);
	 // Следующий
	  var pause8 = pause7 + getRandomPause(800, 1000);
	setTimeout(prev, pause8);

}
// Рост ОРками
function ORProg()
{
  var pause = 0;
  // Запись в КСК
  if (document.body.innerHTML.indexOf('centreInscription') !== - 1)
  {
    // Нажатие на кнопку
    pause = pause + getRandomPause(500, 800);
    setTimeout(eqCenterReg, pause);
    return;
  }  // Урок

  pause = pause + getRandomPause(500, 800);
  setTimeout(lesson, pause);
  // Корм
  var pause1 = pause + getRandomPause(1100, 1800);
  setTimeout(doEatNorm, pause1);
  // Чистка
  var pause2 = pause1 + getRandomPause(500, 800);
  setTimeout(groom, pause2);
  // Если энергии <20
  var en = document.getElementById('energie').textContent;
  if (en < 20)
  {
    // Ласка
    var pause5 = pause2 + getRandomPause(200, 400);
    setTimeout(stroke, pause5);
  }  // Спать

  var pause3 = pause2 + getRandomPause(500, 1000);
  setTimeout(sleep, pause3);
  // Следующий
  var pause4 = pause3 + getRandomPause(900, 1400);
  setTimeout(OR, pause4);
}// Запись в КСК

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
  if (KCK_option > 1)
  {
    var f = e.onclick.toString();
    var onClick = f.substr(f.indexOf('AjaxJSON'));
    onClick = onClick.substr(0, onClick.indexOf('}')) + '}))';
    e.setAttribute('onclick', onClick);
  }
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
}// Пустая функция

function pauseFunc()
{
  if (document.body.innerHTML.indexOf('chevalId') !== - 1)
  {
    return;
  }
}// Корм по норме

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
  }  // Для слайдеров

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
		$('body').append('<div class="lwb_logo" style="display: block; position: fixed; width: 105px; top: 30px; left: 20px; z-index: 999;"><img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/robothorseday.png" width="100px"></div>');
		$('body').append('<div class="lwb" style="display:block; position:fixed; width:115px; height:115px; left:0; top:100px; padding:5px; background-color:rgba(92, 92, 92, 0.7);  border-radius: 0px 0px 20px 0;"></div>');
		$('.lwb').append('<center><span class="header-currency-label" style="color:#fafe6c;"><b>LowadiBot v1.3.3</b>   </span>  </center>');
		$('.lwb').append('<span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Запись в КСК</span>	 <select id="kck_option"> <option value="0">1 день</option>	<option value="1">3 дня</option>	<option value="2">10 дней</option>	<option selected value="3">30 дней</option> </select> &nbsp  <span class="lwb_setting" style="cursor:pointer;"><img src="https://raw.githubusercontent.com/Crasher69/lowadi/master/settings.png" width="20px" title="Показать настройки" /></span>');
		$('.lwb').append('<br> <div style="padding-top:5px;"></div> <span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;">Предлагать случки</span></td> <td><input id="slchkbx" name="slchkbx" value="1" type="checkbox">');
		$('.lwb').append('<div class="lwb_sl_hide"><span style="font-family: Arial,Helvetica,sans-serif; font-size: 11px; color:#F1F9F1;"> По цене</span>  <select id="sluchka_option"> <option value="500">500</option> <option value="1000">1000</option> <option value="1500">1500</option> <option value="2000">2000</option> <option value="2500">2500</option> <option value="3000">3000</option> <option value="3500">3500</option> <option value="4000">4000</option> <option value="4500">4500</option> <option value="5000">5000</option> <option value="5500">5500</option> <option value="6000">6000</option> <option value="6500">6500</option> <option value="7000">7000</option> <option value="7500">7500</option>	</select></div>');
		
		$('body').append('<div class="lwb_settings" style="display: none; position: fixed; width: 400px; height:170px; top: 100px; left: 125px; z-index: 999; padding:5px; background-color:rgba(92, 92, 92, 0.9);  border-radius: 0px 0px 0px 0px;"></div>');
		$('.lwb_settings').append('<center><h2 style="color:#fff;">Настройки записи в КСК</h2></center> <span class="lwb_setting" style="position:absolute;  right:5px; top:2px; color:#fff; cursor:pointer;"><b>X</b></span>');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.77) none repeat scroll 0% 0%; padding:10px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/fourrage_v1828806360.png" /> <input id="settings_fourrage" name="settings_fourrage" value="0" type="checkbox">  Выбирать КСК с фуражом </div>');
		$('.lwb_settings').append('<div style="background: rgba(255, 255, 255, 0.77) none repeat scroll 0% 0%; padding:10px;"> <img src="http://www.lowadi.com/media/equideo/image/produits/20/avoine_v1828806360.png" /> <input id="settings_zerno" name="settings_zerno" value="0" type="checkbox"> Выбирать КСК с зерном </div>');
		$('.lwb_settings').append('<br><center><button id="lwb_savesettings" style="margin: 5px 0 0 0;" onclick="savesettings();" class="button button-style-0"><span class="button-align-0"><span class="button-inner-0"><span class="button-text-0">Сохранить</span></span></span></button></center>');


	}



$('.lwb_setting').click(function(){
   $('.lwb_settings').toggle("slow");
});
	
$('#lwb_savesettings').click(function(){
  savesettings();	
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
