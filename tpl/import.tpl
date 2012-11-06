<section id="import">
	<div class="page-header">
		<h1>Импорт <small>Засунь в меня поглубже!</small></h1>
	</div>
	<p>Что такое импорт, думаю рассказывать никому не надо, поэтому пошли-ка вы нахуй, если требуете описание этой херни, здесь и догадаться то не сложно, судя по всему.</p>
	
	<h2>Загрузка прайса Comptek <small>def-partners.xls &mdash; это правильный файл, атвечаю!</small></h2>
	<p>Каждый раз кто-то из вас получает прайс Комптека, где нет группировки и нет русского описание позиций, вот именно его сюда загружать и нужно, иначе получите говно вместо мозгов.</p>
	<form id="priceform" method="post" enctype="multipart/form-data" action="php/ajaxfile.php">
		<div class="well">
			<input type="file" name="comptek-price" id="comptek-price" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
			<div class="input-append">
				<span id="priceName" class="input-xlarge uneditable-input">Выберите файл&hellip;</span>
				<a class="btn" id="priceBrowse" href="#">Обзор&hellip;</a>
			</div>
			<span class="help-inline">Поддерживаемые типы файлов: <span class="label label-inverse">XLS</span>, <span class="label label-inverse">XLSX</span>. Максимальный размер файла <span class="label label-inverse">10 МБайт</span>.</span>
			<br><br><div class="progress"><div class="bar" style="width: 0%;"></div></div>
			Итого позиций в прайсе: <span class="badge" id="total-len-price">{total_len_price}</span>
		</div>
		<div id="price-preview"></div>
	</form>
	
	<h2>Загрузка шаблона Comptek <small>template.xls &mdash; это правильный файл</small></h2>
	<p>А вот здесь необходимо загружать тот самый темплейт, который так часто используете, он в общем-то особо не нужен, но в нем мы получим русское описание некоторых позиций из прайса, но опять же не всех и не всего, думаю большинство придется обзывать в процессе самому, а чо делать-то?</p>
	<form id="templateform" method="post" enctype="multipart/form-data" action="php/ajaxfile.php">
		<div class="well">
			<input type="file" name="comptek-template" id="comptek-template" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
			<div class="input-append">
				<span id="templateName" class="input-xlarge uneditable-input">Выберите файл&hellip;</span>
				<a class="btn" id="templateBrowse" href="#">Обзор&hellip;</a>
			</div>
			<span class="help-inline">Поддерживаемые типы файлов: <span class="label label-inverse">XLS</span>, <span class="label label-inverse">XLSX</span>. Максимальный размер файла <span class="label label-inverse">10 МБайт</span>.</span>
			<br><br><div class="progress"><div class="bar" style="width: 0%;"></div></div>
		</div>
		<div id="template-preview"></div>
	</form>
</section>