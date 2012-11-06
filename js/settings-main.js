!function($) { 
	$(function() {

	
	/*
	 * Основные настройки конфигуратора
	 */

	// Автоматическое обновление данных в БД
	$('#details').change(function() {
		var str = $(this).val()
		$.post("index.php", { act: "update_details", text: str },
			function (data) {
				$("#result").empty().append(data).slideDown().delay(2000).slideUp()
		})
	})
	.change()
	
	// Обновление логотипов
	$('#refresh_komm').click(function() {
		$.post("index.php", { act: "refresh_logo" },
		function (data) {
			$('#spec-logo').empty().append(data)
			$('#komm-logo').empty().append(data).fadeOut().fadeIn()
		})
	})
	
	$('#refresh_spec').click(function() {
		$.post("index.php", { act: "refresh_logo" },
		function (data) {
			$('#spec-logo').empty().append(data).fadeOut().fadeIn()
			$('#komm-logo').empty().append(data)
		})
	})
		
	// Загрузка изображений
	$('#photoimg').on('change', function () {
		var progress = $('#imageform .progress')
		var bar = $('#imageform .bar')
		var status = $('#preview')
		var button = $('#fileBrowse')
		$('#imageform').ajaxForm({ 
			beforeSend: function () {
				status.slideUp()
				var percentVal = '0%'
				bar.css('width', percentVal).removeClass('bar-success')
				button.addClass('disabled')
				progress.addClass('active progress-striped')
			},
			uploadProgress: function (event, position, total, percentComplete) {
				var percentVal = percentComplete + '%'
				bar.css('width', percentVal)
			},
			complete: function (xhr) {
				status.html(xhr.responseText).slideDown("slow").delay(5000).slideUp("slow")
				bar.css('width', '100%')
				button.removeClass('disabled')
				progress.removeClass('active progress-striped')
				bar.addClass('bar-success').delay(3000).animate({ width: '0%' })
				$.post("index.php", { act: "refresh_logo" },
				function (data) {
					$('#spec-logo').empty().append(data)
					$('#komm-logo').empty().append(data)
				})
				$('html, body').animate({
					scrollTop: $('#preview').offset().top-130
				}, 2000)
			}
		}).submit()
	})
	
	// Загрузка файлов: прайс и шаблон
	$('#comptek-price').on('change', function() {
		var progress = $('#priceform .progress')
		var bar = $('#priceform .bar')
		var status = $('#price-preview')
		var button = $('#priceBrowse')
		$('#priceform').ajaxForm({ 
			beforeSend: function () {
				status.slideUp()
				var percentVal = '0%'
				bar.css('width', percentVal).removeClass('bar-success')
				button.addClass('disabled')
				button.click(function (e) { e.preventDefault() })
				progress.addClass('active progress-striped')
			},
			uploadProgress: function (event, position, total, percentComplete) {
				var percentVal = percentComplete + '%'
				bar.css('width', percentVal)
			},
			complete: function (xhr) {
				status.html(xhr.responseText).slideDown("slow")
				button.removeClass('disabled')
				progress.removeClass('active progress-striped')
				bar.addClass('bar-success').delay(3000).animate({ width: '0%' })
				$('html, body').animate({
					scrollTop: $('#price-preview').offset().top-130
				}, 2000)
			}
		}).submit()
	})
	
	$('#comptek-template').on('change', function() {
		var progress = $('#templateform .progress')
		var bar = $('#templateform .bar')
		var status = $('#template-preview')
		var button = $('#templateBrowse')
		$('#templateform').ajaxForm({ 
			beforeSend: function () {
				status.slideUp()
				var percentVal = '0%'
				bar.css('width', percentVal).removeClass('bar-success')
				button.addClass('disabled')
				progress.addClass('active progress-striped')
			},
			uploadProgress: function (event, position, total, percentComplete) {
				var percentVal = percentComplete + '%'
				bar.css('width', percentVal)
			},
			complete: function (xhr) {
				status.html(xhr.responseText).slideDown("slow")
				button.removeClass('disabled')
				progress.removeClass('active progress-striped')
				bar.addClass('bar-success').delay(3000).animate({ width: '0%' })
				$('html, body').animate({
					scrollTop: $('#template-preview').offset().top-130
				}, 2000)
			}
		}).submit()
	})
	
	// Выбор изображений логотипов )))
	$('#spec-logo').on('click', 'a', function() {
		$(this).toggleClass('focused')
	})
	$('#komm-logo').on('click', 'a', function() {
		$(this).toggleClass('focused')
	})
	
	// Удаление логотипов нахуй!
	$('#spec-logo').on('click', 'button[name=del]', function (e) {
		e.preventDefault()
		var lid = $('#spec-logo a.focused').attr('id')
		$.post("index.php", { act: "del_logo", logoid: lid },
		function (data) {
			$('#spec-logo').empty().append(data)
			$('#komm-logo').empty().append(data)
		})
	})
	
	// Выбрать логотип для коммпред!
	$('#komm-logo').on('click', 'button[name=check]', function (e) {
		e.preventDefault()
		var lid = $('#komm-logo a.focused').attr('id')
		$.post("index.php", { act: "check_komm_logo", logoid: lid },
		function (data) { 
			$('#komm-logo').empty().append(data)
		})
	})
	
	// Выбрать логотип для спеки!
	$('#spec-logo').on('click', 'button[name=check]', function (e) {
		e.preventDefault()
		var lid = $('#spec-logo a.focused').attr('id')
		$.post("index.php", { act: "check_spec_logo", logoid: lid },
		function (data) { 
			$('#spec-logo').empty().append(data)
		})
	})
	
	// Загрузка прайса в БД
	$('#price-preview').on('click', '#import-price', function (e) {
		e.preventDefault()
		$.post("index.php", { act: "import_price" },
		function (data) {
			$('#price-preview').slideUp().empty().html(data).slideDown().delay(10000).slideUp()
		})
		$.post("index.php", { act: "total_len_price" },
		function (data) {
			$('#total-len-price').empty().append(data)
		})
	})
	
	// Загрузка шаблона в БД
	$('#template-preview').on('click', '#import-template', function(e) {
		e.preventDefault()
		$.post("index.php", { act: "import_template" },
		function (data) {
			$('#template-preview').slideUp().empty().html(data).slideDown().delay(10000).slideUp()
		})
	})
	
	// Форма загрузки логотипов, прайсов и шаблонов
	$('#fileBrowse').on('click', function() {
		 $('#photoimg').click()
	})
	$('#photoimg').change(function() {
		$('#fileName').empty().append($(this).val())
	})
	
	$('#priceBrowse').on('click', function() {
		$('#comptek-price').click()
	})
	$('#comptek-price').change(function() {
		$('#priceName').empty().append($(this).val())
	})
	
	$('#templateBrowse').on('click', function() {
		$('#comptek-template').click()
	})
	$('#comptek-template').change(function() {
		$('#templateName').empty().append($(this).val())
	})
	
	
	})
}(window.jQuery)