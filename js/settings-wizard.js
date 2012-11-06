!function($) { 
	$(function() {
	

	/*
	 * Форма редактирования лицензий
	 */
	
	// Автоподстановка лицензий
	$('#SWFPBXlic #PBXlic').typeahead({
		source: function (query, process) {
			$.post('index.php', { act: 'wedit', db: 'lic', search: query }, function(data) {
				$('#SWFPBXlic #GPBXlic').removeClass('error')
				process(data)
			}, "json")
		}
	})
	
	// Погрузка списка релизов справа
	$('#SWFPBXlic').on('change', '#PBXtype-list', function() {
		var pbx = $(this).find('option:selected').val()
		$('#SWFPBXlic #LICedit-list').attr('disabled', true)
		$('#SWFPBXlic #LICid').val('')
		$.post('index.php', { act: "wedit", from: "TELlist", pbxtype: pbx }, function(data) {
			$('#SWFPBXlic #PBXrelease-list').empty().html(data.option)
			$('#SWFPBXlic #PBXrelease-list').attr('size', data.size)
		}, "json")
	})
	
	// Подгрузка списка лицензий
	$('#SWFPBXlic').on('change', '#PBXrelease-list', function() {
		var rel = $(this).find('option:selected').val()
		$('#SWFPBXlic #LICedit-list').attr('disabled', true)
		$('#SWFPBXlic #LICid').val('')
		$.post('index.php', { act: 'wedit', from: 'TELlist', lic_rel: rel}, function(data) {
			if (data.size != 0) {
				$('#SWFPBXlic #PBXlic-list').empty().html(data.option)
				if (data.size > 1) {
					$('#SWFPBXlic #PBXlic-list').attr('size', data.size)
				}
			} else {
				$('#SWFPBXlic #PBXlic-list').empty()
			}
		}, "json")
	})
	
	// Заполняем поля слева и активируем кнопочку
	$('#SWFPBXlic').on('change', '#PBXlic-list', function() {		
		var lic  = $(this).find('option:selected').text()
		var llic = $(this).find('option:selected').val()
		var rel  = $('#SWFPBXlic #PBXrelease-list').find('option:selected').val()
		var pbx  = $('#SWFPBXlic #PBXtype-list').find('option:selected').val()
		
		$('#SWFPBXlic #PBXlic').val(lic)
		$('#SWFPBXlic #PBXtype-link [value='+pbx+']').attr('selected', true)
		$('#SWFPBXlic #PBXtype-link').removeAttr('disabled')
		$('#SWFPBXlic #mode').slideUp()
		$('#SWFPBXlic #LICid').val('')
		$.post('index.php', { act: "wedit", from: "TELlist", pbxtype: pbx }, function(data) {
			$('#SWFPBXlic #PBXrelease-link').empty().html(data.option)
			$('#SWFPBXlic #PBXrelease-link').attr('size', data.size)
			$('#SWFPBXlic #LICedit-list').removeAttr('disabled')
			$.post('index.php', { act: "wedit", from: "TELlist", db: 'lic', multiselect: llic }, function(data) {
				$('#SWFPBXlic #PBXrelease-link').val(data)
			}, "json")
		}, "json")
	})
	
	// Входим в режим редактирования
	$('#SWFPBXlic').on('click', '#LICedit-list', function() {
		var idlic = $('#SWFTELmodel #PBXlic-list').val()
		$('#SWFPBXlic #LICid').val(idlic)
		$('#SWFPBXlic #mode').addClass('alert')
		$('#SWFPBXlic #mode').removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
		$('#SWFPBXlic #mode').slideDown().html('РЕЖИМ РЕДАКТИРОВАНИЯ!').addClass('alert-info')
		$('#SWFPBXlic #PBXtype-link').attr('disabled', true)
		$(this).attr('disabled', true)
	})
	
	// Создать новый телефон
	$('#SWFTELmodel').on('click', '#NEW', function() {
		var name = $('#SWFTELmodel #TELmodel').val()
		var type = $('#SWFTELmodel #TELtype-link').val()
		var pbx  = $('#SWFTELmodel #PBXtype-link').val()
		var rel  = $('#SWFTELmodel #PBXrelease-link').val() || []
		$.post('index.php', { act: "wedit", from: "TELform", name: name, type: type, pbx: pbx, rel: rel.join('|') }, function(data) {
			var $status = $('#SWFTELmodel #status')
			$status.removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
			$status.addClass('alert ' + data.cls)
			$status.html(data.text)
			if ($status.is(':hidden')) {
				$status.slideDown().delay('2000').slideUp()
			} else {
				$status.delay('2000').slideUp()
			}
		}, "json")
	})
	
	// Редактировать лицензию
	$('#SWFPBXlic').on('click', '#OK', function() {
		var name  = $('#SWFPBXlic #PBXlic').val()
		var idlic = $('#SWFPBXlic #LICid').val()
		var pbx   = $('#SWFPBXlic #PBXtype-link').val()
		var rel   = $('#SWFPBXlic #PBXrelease-link').val() || []
		if (name == '') $('#SWFPBXlic #GPBXlic').addClass('error')
		$.post('index.php', { act: "wedit", from: "TELform", name: name, idlic: idlic, pbx: pbx, rel: rel.join('|') }, function(data) {
			var $status = $('#SWFTELmodel #status')
			$status.removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
			$status.addClass('alert ' + data.cls)
			$status.html(data.text)
			if ($status.is(':hidden')) {
				$status.slideDown().delay('2000').slideUp()
			} else {
				$status.delay('2000').slideUp()
			}
		}, "json")
	})
	
	// Нажатие на кнопку удаления лицензии
	$('#SWFPBXlic').on('click', '#DEL', function() {
		$('#LICdel').modal('show')
	})
	
	// Перебиваем событие формы
	$('#SWFPBXlic').submit(function(e) {
		e.preventDefault()
		var idlic = $('#SWFPBXlic #LICid').val()
		if (idlic != '') {
			$('#SWFPBXlic #OK').click()
		} else {
			$('#SWFPBXlic #NEW').click()
		}
	})
	
	
	
	/*
	 * Форма редактирования телефонов
	 */
	
	// Автоподстановка телефонов
	$('#SWFTELmodel #TELmodel').typeahead({
		source: function (query, process) {
			$.post('index.php', { act: 'wedit', db: 'tel', search: query }, function (data) {
				$('#SWFTELmodel #GTELmodel').removeClass('error')
				process(data)
			}, "json")
		}
	})
	 
	// Погрузка списка релизов справа
	$('#SWFTELmodel').on('change', '#PBXtype-list', function() {
		var pbx = $(this).find('option:selected').val()
		$('#SWFTELmodel #TELedit-list').attr('disabled', true)
		$('#SWFTELmodel #TELid').val('')
		$.post('index.php', { act: "wedit", from: "TELlist", pbxtype: pbx }, function(data) {
			$('#SWFTELmodel #PBXrelease-list').empty().html(data.option)
			$('#SWFTELmodel #PBXrelease-list').attr('size', data.size)
		}, "json")
	})
	
	// Погрузка списка релизов слева
	$('#SWFTELmodel').on('change', '#PBXtype-link', function() {
		var pbx = $(this).find('option:selected').val()
		$('#SWFTELmodel #TELid').val('')
		$.post('index.php', { act: "wedit", from: "TELlist", pbxtype: pbx }, function(data) {
			$('#SWFTELmodel #PBXrelease-link').empty().html(data.option)
			$('#SWFTELmodel #PBXrelease-link').attr('size', data.size)
		}, "json")
	})
	
	// Разблокировака типов телефонов
	$('#SWFTELmodel').on('change', '#PBXrelease-list', function() {
		$('#SWFTELmodel #TELtype-list').removeAttr('disabled')
		$('#SWFTELmodel #TELtype-list').val([])
		$('#SWFTELmodel #TELedit-list').attr('disabled', true)
		$('#SWFTELmodel #TELid').val('')
	})
	
	// Подгрузка списка телефонов
	$('#SWFTELmodel').on('change', '#TELtype-list', function() {
		var tel = $(this).find('option:selected').val()
		var rel = $('#SWFTELmodel #PBXrelease-list').find('option:selected').val()
		$('#SWFTELmodel #TELedit-list').attr('disabled', true)
		$('#SWFTELmodel #TELid').val('')
		
		$.post('index.php', { act: 'wedit', from: 'TELlist', release: rel, teltype: tel }, function(data) {
			if (data.size != 0) {
				$('#SWFTELmodel #TELmodel-list').empty().html(data.option)
				if (data.size > 1) {
					$('#SWFTELmodel #TELmodel-list').attr('size', data.size)
				}
			} else {
				$('#SWFTELmodel #TELmodel-list').empty()
			}
		}, "json")
	})
	
	// Заполняем поля слева и активируем кнопочку
	$('#SWFTELmodel').on('change', '#TELmodel-list', function() {
		var tel  = $(this).find('option:selected').text()
		var ttel = $(this).find('option:selected').val()
		var rel  = $('#SWFTELmodel #PBXrelease-list').find('option:selected').val()
		var type = $('#SWFTELmodel #TELtype-list').find('option:selected').val()
		var pbx  = $('#SWFTELmodel #PBXtype-list').find('option:selected').val()
		
		$('#SWFTELmodel #TELmodel').val(tel)
		$('#SWFTELmodel #TELtype-link [value='+type+']').attr('selected', true)
		$('#SWFTELmodel #PBXtype-link [value='+pbx+']').attr('selected', true)
		$('#SWFTELmodel #TELtype-link').removeAttr('disabled')
		$('#SWFTELmodel #PBXtype-link').removeAttr('disabled')
		$('#SWFTELmodel #mode').slideUp()
		$('#SWFTELmodel #TELid').val('')
		$.post('index.php', { act: "wedit", from: "TELlist", pbxtype: pbx }, function(data) {
			$('#SWFTELmodel #PBXrelease-link').empty().html(data.option)
			$('#SWFTELmodel #PBXrelease-link').attr('size', data.size)
			$('#SWFTELmodel #TELedit-list').removeAttr('disabled')
			$.post('index.php', { act: "wedit", from: "TELlist", multiselect: ttel, teltype: type }, function(data) {
				$('#SWFTELmodel #PBXrelease-link').val(data)
			}, "json")
		}, "json")
	})
	
	// Входим в режим редактирования
	$('#SWFTELmodel').on('click', '#TELedit-list', function() {
		var idtel = $('#SWFTELmodel #TELmodel-list').val()
		$('#SWFTELmodel #TELid').val(idtel)
		$('#SWFTELmodel #mode').addClass('alert')
		$('#SWFTELmodel #mode').removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
		$('#SWFTELmodel #mode').slideDown().html('РЕЖИМ РЕДАКТИРОВАНИЯ!').addClass('alert-info')
		$('#SWFTELmodel #TELtype-link').attr('disabled', true)
		$('#SWFTELmodel #PBXtype-link').attr('disabled', true)
		$(this).attr('disabled', true)
	})
	
	// Создать новый телефон
	$('#SWFTELmodel').on('click', '#NEW', function() {
		var name = $('#SWFTELmodel #TELmodel').val()
		var type = $('#SWFTELmodel #TELtype-link').val()
		var pbx  = $('#SWFTELmodel #PBXtype-link').val()
		var rel  = $('#SWFTELmodel #PBXrelease-link').val() || []
		$.post('index.php', { act: "wedit", from: "TELform", name: name, type: type, pbx: pbx, rel: rel.join('|') }, function(data) {
			var $status = $('#SWFTELmodel #status')
			$status.removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
			$status.addClass('alert ' + data.cls)
			$status.html(data.text)
			if ($status.is(':hidden')) {
				$status.slideDown().delay('2000').slideUp()
			} else {
				$status.delay('2000').slideUp()
			}
		}, "json")
	})
	
	// Редактировать телефон
	$('#SWFTELmodel').on('click', '#OK', function() {
		var name  = $('#SWFTELmodel #TELmodel').val()
		var idtel = $('#SWFTELmodel #TELid').val()
		var type  = $('#SWFTELmodel #TELtype-link').val()
		var pbx   = $('#SWFTELmodel #PBXtype-link').val()
		var rel   = $('#SWFTELmodel #PBXrelease-link').val() || []
		if (name == '') $('#SWFTELmodel #GTELmodel').addClass('error')
		$.post('index.php', { act: "wedit", from: "TELform", name: name, idtel: idtel, type: type, pbx: pbx, rel: rel.join('|') }, function(data) {
			var $status = $('#SWFTELmodel #status')
			$status.removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
			$status.addClass('alert ' + data.cls)
			$status.html(data.text)
			if ($status.is(':hidden')) {
				$status.slideDown().delay('2000').slideUp()
			} else {
				$status.delay('2000').slideUp()
			}
		}, "json")
	})
	
	// Нажатие на кнопку удаления телефона
	$('#SWFTELmodel').on('click', '#DEL', function() {
		$('#TELdel').modal('show')
	})
	
	// Удаление телефона
	$('#SWFTELmodel').on('click', '#CDEL', function() {
		var idtel = $('#SWFTELmodel #TELmodel-list').val()
		$.post('index.php', { act: "wedit", from: "TELform", iddel: idtel }, function(data){
			$('#SWFTELmodel #TELdel').modal('hide')
			var $status = $('#SWFTELmodel #status')
			$status.removeClass('alert-success').removeClass('alert-error').removeClass('alert-info')
			$status.addClass('alert ' + data.cls)
			$status.html(data.text)
			if ($status.is(':hidden')) {
				$status.slideDown().delay('2000').slideUp()
			} else {
				$status.delay('2000').slideUp()
			}
		}, "json")
		var tel = $('#SWFTELmodel #TELtype-list').find('option:selected').val()
		var rel = $('#SWFTELmodel #PBXrelease-list').find('option:selected').val()
		$('#SWFTELmodel #TELedit-list').attr('disabled', true)
		$('#SWFTELmodel #TELid').val('')
		$.post('index.php', { act: 'wedit', from: 'TELlist', release: rel, teltype: tel }, function(data) {
			if (data.size != 0) {
				$('#SWFTELmodel #TELmodel-list').empty().html(data.option)
				if (data.size > 1) {
					$('#SWFTELmodel #TELmodel-list').attr('size', data.size)
				}
			} else {
				$('#SWFTELmodel #TELmodel-list').empty()
			}
		}, "json")
	})
	
	// Перебиваем событие формы
	$('#SWFTELmodel').submit(function(e) {
		e.preventDefault()
		var idtel = $('#SWFTELmodel #TELid').val()
		if (idtel != '') {
			$('#SWFTELmodel #OK').click()
		} else {
			$('#SWFTELmodel #NEW').click()
		}
	})


	})
}(window.jQuery)