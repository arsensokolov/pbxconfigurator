!function($) { 
	$(function() {
	
	var $window = $(window)
	
	// Disable certain links in docs
	$('section').on('click', '[href^=#]', function (e) {
		e.preventDefault()
	})
	
	// side bar
	$('.bs-docs-sidenav').affix({
		offset: {
			top: function () { return $window.width() <= 980 ? 290 : 210 },
			bottom: 270
		}
	})
	
	// Check correct browser
	if ($.browser.msie) {
		$('#IEerror').modal({
			show: true,
			backdrop: 'static',
			keyboard: false
		})
	}
	
	// Popover
	$("a[rel=popover]")
		.popover()
		.click(function(e) {
			e.preventDefault()
	})
	
	// Фильтр ввода данных: циферки, сука
	var numberInputs = $('input[data-filter^=num]')
	
	numberInputs.keydown(function(e) {
		// Разрешаем: backspace, delete, tab, escape и enter
		if ( e.keyCode == 46 || e.keyCode == 8 || e.keyCode == 9 || e.keyCode == 27 || e.keyCode == 13 ||
			// Разрешаем: ctrl+a
			(e.keyCode == 65 && e.ctrlKey == true) ||
			// Разрешаем: cmd+a
			(e.keyCode == 65 && e.metaKey == true) ||
			// Разрешаем: home, end, left, right
			(e.keyCode >= 35 && e.keyCode <= 39)) {
				// все супер! пучек в пучке!
				return
		} else {
				// Убеждаемся что это ёбаное число и оставлям клавишу нажатой
				if ( e.shiftKey || (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105)) {
					e.preventDefault()
				}
		}
	})
	
	numberInputs.autoNumeric({ aSep: ' ', vMin: '0', vMax: '999999', mDec: '0' })
		
	})
}(window.jQuery)