!function($) { 
	$(function() {


	/*
	 * Основные настройки конфигуратора
	 */
	
	// Ебический и охуитительный конфигуратор
	var fo = '<option value="0">-- Выберите из списка --</option>'
	$('#PBXtype').change(function() {
		var type = $(this).val()
		if (type == 0) {
			$('[data-form*=muted]').addClass('muted')
			$('[data-form-select*=muted]').attr('disabled', true).html(fo)
			$('[data-form-input*=muted]').attr('disabled', true).attr('value', '')
			$('#CRTconf').attr("disabled", true)
		} else {
			$.post("index.php", { act: "wizard", pbxtype: type },
				function (data) {
					$('#PBXrelease').empty().html(data.option)
					$('#CRTconf').attr("disabled", true)
					$('#GPBXrelease').removeClass('muted')
					$('#PBXrelease').removeAttr('disabled')
					$('#GPBXlicense').addClass('muted')
					$('#PBXlicense').attr('disabled', true).html(fo)
					
					$('[data-form*=cm]').addClass('muted')
					$('[data-form-input*=cm]').attr('disabled', true).attr('value','')
					$('[data-form*=sm]').addClass('muted')
					$('[data-form-input*=sm]').attr('disabled', true).attr('value','')
					$('[data-form*=ipo]').addClass('muted')
					$('[data-form-input*=ipo]').attr('disabled', true).attr('value','')
					
					if (data.form == "ipo") {
						$('[data-form*=ipo]').removeClass('muted')
						$('[data-form-input*=ipo]').removeAttr('disabled')
					}
					if (data.form == "cm") {
						$('[data-form*=cm]').removeClass('muted')
						$('[data-form-input*=cm]').removeAttr('disabled')
					}
					if (data.form == "sm") {
						$('[data-form*=sm]').removeClass('muted')
						$('[data-form-input*=sm]').removeAttr('disabled')
					}
					
			}, "json")
		}
	})
	
	// Обработка событий при изменении версий релиза
	$('#PBXrelease').change(function() {
		var rel = $(this).val()
		var type = $('#PBXtype').val()
		if (rel == 0) {
			$('#GPBXlicense').addClass('muted')
			$('#PBXlicense').attr('disabled', true).html(fo)
			$('#CRTconf').attr("disabled", true)
		} else {
			$.post("index.php", { act: "wizard", pbxtype: type }, function (data) {
				if (data.form == "ipo") {
					$.post("index.php", { act: "wizard", pbxrelease: rel },
						function (data) {
							$('#PBXlicense').empty().html(data)
							$('#GPBXlicense').removeClass('muted')
							$('#PBXlicense').removeAttr('disabled')
					})
				} else {
					$('#GPBXlicense').addClass('muted')
					$('#PBXlicense').attr('disabled', true).attr('value', '0')
				}
			}, "json")
			$('#CRTconf').removeAttr("disabled")
		}
	})
		
	// Активация поля моделей SIP телефонов
	$('#SIPext').change(function() {
		var ext = $(this).val()
		var Hext = $('#H323ext').val()
		var rel = $('#PBXrelease').find("option:selected").val()
		
		if (ext != '' && ext != '0') {
			$('#GSIPtel').removeClass('muted')
			$('#SIPtel').removeAttr('disabled')
			$.post("index.php", { act: "wizard", teltype: "sip", pbxrel: rel }, function(data) {
				$('#SIPtel').empty().html(data)
			})
		} else {
			$('#GSIPtel').addClass('muted')
			$('#SIPtel').attr('disabled', true).attr('value','0')
			if (Hext == '' || Hext == '0') {
				$('[data-form*=pwr]').addClass('muted')
				$('[data-form-input*=pwr]').attr('disabled', true).attr('value','')
			}
		}
	})
	
	// Активация поля моделей H323 телефонов
	$('#H323ext').change(function() {
		var ext = $(this).val()
		var Sext = $('#SIPext').val()
		var rel = $('#PBXrelease').val()
		
		if (ext != '' && ext != '0') {
			$('#GH323tel').removeClass('muted')
			$('#H323tel').removeAttr('disabled')
			$.post("index.php", { act: "wizard", teltype: "h323", pbxrel: rel }, function(data) {
				$('#H323tel').empty().html(data)
			})
		} else {
			$('#GH323tel').addClass('muted')
			$('#H323tel').attr('disabled', true).attr('value','0')
			if (Sext == '' || Sext == '0') {
				$('[data-form*=pwr]').addClass('muted')
				$('[data-form-input*=pwr]').attr('disabled', true).attr('value','')
			}
		}
	})
	
	// Активация поля моделей цифровых телефонов
	$('#DIGext').change(function() {
		var ext = $(this).val()
		var rel = $('#PBXrelease').val()
		
		if (ext != '' && ext != '0') {
			$('#GDIGtel').removeClass('muted')
			$('#DIGtel').removeAttr('disabled')
			$.post("index.php", { act: "wizard", teltype: "digital", pbxrel: rel }, function(data) {
				$('#DIGtel').empty().html(data)
			})
		} else {
			$('#GDIGtel').addClass('muted')
			$('#DIGtel').attr('disabled', true).attr('value','0')
		}
	})
	
	// Активация поля моделей аналоговых телефонов
	$('#ANGext').change(function() {
		var ext = $(this).val()
		var rel = $('#PBXrelease').val()
		
		if (ext != '' && ext != '0') {
			$('#GANGtel').removeClass('muted')
			$('#ANGtel').removeAttr('disabled')
			$.post("index.php", { act: "wizard", teltype: "analog", pbxrel: rel }, function(data) {
				$('#ANGtel').empty().html(data)
			})
		} else {
			$('#GANGtel').addClass('muted')
			$('#ANGtel').attr('disabled', true).attr('value','0')
		}
	})
	
	// Активация полей питания IP телефонов
	$('#SIPtel').change(function() {
		var SIPtel = $(this).val()
		var H323tel = $('#H323tel').val()
		var H323tel_t = $('#H323tel').find('option:selected').text()
		if (SIPtel == '0' && (H323tel == '0' || H323tel_t == 'Avaya 1603 IP Phone')) {
			if (H323tel_t == 'Avaya 1603 IP Phone') {
				$('#GPOEpwr').addClass('muted')
				$('#POEpwr').attr('disabled', true).attr('value','')
			} else {
				$('#GSTDpwr').addClass('muted')
				$('#STDpwr').attr('disabled', true).attr('value','')
				$('#GPOEpwr').addClass('muted')
				$('#POEpwr').attr('disabled', true).attr('value','')
				$('#GPOE03pwr').addClass('muted')
				$('#POE03pwr').attr('disabled', true).attr('value','')
			}
		} else {
			$('#GSTDpwr').removeClass('muted')
			$('#STDpwr').removeAttr('disabled')
			$('#GPOEpwr').removeClass('muted')
			$('#POEpwr').removeAttr('disabled')
		}
	})
	$('#H323tel').change(function() {
		var SIPtel = $('#SIPtel').val()
		var H323tel = $(this).val()
		var H323tel_t = $(this).find('option:selected').text()
		if (SIPtel == '0' && H323tel == '0') {
			$('#GSTDpwr').addClass('muted')
			$('#STDpwr').attr('disabled', true).attr('value','')
			$('#GPOEpwr').addClass('muted')
			$('#POEpwr').attr('disabled', true).attr('value','')
			$('#GPOE03pwr').addClass('muted')
			$('#POE03pwr').attr('disabled', true).attr('value','')
		} else {
			$('#GSTDpwr').removeClass('muted')
			$('#STDpwr').removeAttr('disabled')
			if (H323tel_t == 'Avaya 1603 IP Phone') {
				$('#GPOE03pwr').removeClass('muted')
				$('#POE03pwr').removeAttr('disabled')
				if (SIPtel == '0') {
					$('#GPOEpwr').addClass('muted')
					$('#POEpwr').attr('disabled', true).attr('value','')
				}
			} else {
				$('#GPOE03pwr').addClass('muted')
				$('#POE03pwr').attr('disabled', true).attr('value','')
				$('#GPOEpwr').removeClass('muted')
				$('#POEpwr').removeAttr('disabled')
			}
		}
	})
	
	// Нажимаем кнопку для составления конфига, наконец-то, бля!!!
	$('#CRTconf').click(function () {
		$('#wizardConfirm').modal('show')
	})
	
	// Подгрузка списка клиентов на живую
	$('#CFGclient').typeahead({
		source: function (query, process) {
			$.post('index.php', { act: 'wizard', search: query}, function (data) {
				process(data)
			}, "json")
		}
	})
	
	// Глушим события формы конфигуратора
	$('#PBXConfForm').submit(function(e) {
		if($(":not(#CRTconf)").attr("disabled")) {
			$('#wizardConfirm').modal('show')
		}
		e.preventDefault()
	})
	
	
	})
}(window.jQuery)