<section id="settings">
	<div class="page-header">
		<h1>Настройка <small>И вовсе не ебля гребля</small></h1>
	</div>
	
	<ul class="nav nav-tabs">
		<li class="active"><a data-toggle="tab" href="#main-settings">Основные настройки</a></li>
		<li><a data-toggle="tab" href="#wizard-settings">Настройки волшебника</a></li>
		<li><a data-toggle="tab" href="#wizard-conformity">Таблицы соответствий</a></li>
	</ul>
	
	<div class="tab-content">
		<div class="tab-pane active" id="main-settings">
			<h4>Логотип в коммерческом предложении</h4>
			<p>Как и множество пафосных фирм, я предлагаю тоже стать охуенной фирмой с логотипом в коммерческом предложении, поэтому выбирайте нужное лого из имеющихся ниже!</p>
			<div class="well">
				<a class="btn btn-large pull-right" id="refresh_komm" href="#"><i class="icon-refresh"></i> Обновить</a>
				<div class="alert alert-info">Если вы ничего не видите, нажмите кнопу "Обновить".</div>
				<div id="komm-logo">{komm-logo}</div>
			</div>
			
			<h4>Логотип в спецификации</h4>
			<p>Если в спецификации имеется логотип конторы, то это ваще охуенно! И по иронии судьбы и неисповедимых божьих путей логотипы для коммерческого предложения и спецификации стали разными, но могут быть одинаковыми благодаря вам! Выбирай из имеющихся для размещения в спеке.</p>
			<div class="well">
				<a class="btn btn-large pull-right" id="refresh_spec" href="#"><i class="icon-refresh"></i> Обновить</a>
				<div class="alert alert-info">Если вы ничего не видите, нажмите кнопу "Обновить".</div>
				<div id="spec-logo">{spec-logo}</div>
			</div>
			
			<h4>Загрузка логотипа <small>Но не другой ёбаной хуйни</small></h4>
			<p>Чтобы было из чего выбирать загружай лого через форму ниже!</p>
			<form id="imageform" method="post" enctype="multipart/form-data" action="php/ajaximage.php">
				<div class="well">
					<input type="file" name="photoimg" id="photoimg" accept="image/jpeg, image/gif, image/png, image/bmp">
					<div class="input-append">
						<span id="fileName" class="input-xlarge uneditable-input">Выберите файл&hellip;</span>
						<a class="btn" id="fileBrowse" href="#">Обзор&hellip;</a>
					</div>
					<span class="help-inline">Поддерживаемые типы файлов: <span class="label label-inverse">JPG</span>, <span class="label label-inverse">JPEG</span>, <span class="label label-inverse">GIF</span>, <span class="label label-inverse">PNG</span>, <span class="label label-inverse">BMP</span>. Максимальный размер файла <span class="label label-inverse">1 МБайт</span>.</span>
					<br><br><div class="progress"><div class="bar" style="width: 0%;"></div></div>
					<div id="preview"></div>
				</div>
			</form>
			
			<h4>Реквизиты <small>И прочая хуйня</small></h4>
			<p>Для того, чтобы помечать помимо лого свои бумажки еще всяким бредом, то предлагаю забить этот бредовый текст ниже, разумеется все на ваше личное усмотрение и никаких критерий. <strong>Возможно</strong> эта информация будет отображаться под вашим логотипом <em>(Ха, пиздец смешное слово — логотипом, типа типом&hellip;)</em>.</p>
			<div class="well">
				<div class="alert alert-info">Когда наберете текст, он автоматически сохранится, ничего нажимать не нужно! Но, для того, чтобы он сохранился, кликните вне текстовой формы.</div>
				<textarea rows="5" style="width: 98%; text-align: center;" id="details">{firm_details}</textarea>
				<div id="result"></div>
			</div>
		</div>
		<div class="tab-pane" id="wizard-settings">
			<form class="form-horizontal" id="SWFPBXtype">
				<legend>Типы АТС</legend>
				<div class="row">
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="SWPBXtype">Название</label>
							<div class="controls">
								<input type="text" id="SWPBXtype" placeholder="Введите тип АТС">
							</div>
						</div>
					</div>
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="SWPBXtype-list">АТС, сука</label>
							<div class="controls">
								<select id="SWPBXtype-list" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<button type="button" id="PBXedit-list" class="btn" disabled>編集 <i class="icon-edit"></i></button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" id="OK" class="btn btn-primary">良い <i class="icon-ok icon-white"></i></button>
					<button type="button" id="NEW" class="btn btn-success">新しい <i class="icon-plus icon-white"></i></button>
					<button type="button" id="DEL" class="btn btn-danger pull-right">削除 <i class="icon-remove icon-white"></i></button>
				</div>
			</form>
			<form class="form-horizontal" id="SWFPBXrelease">
				<legend>Релиз версии АТС</legend>
				<div class="row">
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="SWPBXrelease">Версия</label>
							<div class="controls">
								<input type="text" id="SWPBXrelease" placeholder="Введите релиз АТС">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="SWPBXtype-link">Соответствует</label>
							<div class="controls">
								<select id="SWPBXtype-link" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
					</div>
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="SWPBXtype-list">АТС, сука</label>
							<div class="controls">
								<select id="SWPBXtype-list" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="SWPBXrelease-list">Релиз, сука</label>
							<div class="controls">
								<select id="SWPBXrelease-list" size="2"></select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<button type="button" id="RELedit-list" class="btn" disabled>編集 <i class="icon-edit"></i></button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" id="OK" class="btn btn-primary">良い <i class="icon-ok icon-white"></i></button>
					<button type="button" id="NEW" class="btn btn-success">新しい <i class="icon-plus icon-white"></i></button>
					<button type="button" id="DEL" class="btn btn-danger pull-right">削除 <i class="icon-remove icon-white"></i></button>
				</div>
			</form>
			<form class="form-horizontal" id="SWFPBXlic" autocomplete="off">
				<legend>Типы лицензий</legend>
				<div id="mode"></div>
				<div id="status"></div>
				<div class="row">
					<div class="span4">
						<div class="control-group" id="GPBXlic">
							<label class="control-label" for="PBXlic">Название</label>
							<div class="controls">
								<input type="text" id="PBXlic" placeholder="Введите название лицензии" data-provide="typeahead">
								<input type="hidden" id="LICid" value="">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="PBXtype-link">Соответствует</label>
							<div class="controls">
								<select id="PBXtype-link" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="PBXrelease-link"></label>
							<div class="controls">
								<select id="PBXrelease-link" size="2" multiple></select>
							</div>
						</div>
					</div>
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="PBXtype-list">АТС, сука</label>
							<div class="controls">
								<select id="PBXtype-list" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="PBXrelease-list">Релиз, сука</label>
							<div class="controls">
								<select id="PBXrelease-list" size="2"></select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="PBXlic-list">Лицуха, сука</label>
							<div class="controls">
								<select id="PBXlic-list" size="2"></select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<button type="button" id="LICedit-list" class="btn" disabled>編集 <i class="icon-edit"></i></button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" id="OK" class="btn btn-primary">良い <i class="icon-ok icon-white"></i></button>
					<button type="button" id="NEW" class="btn btn-success">新しい <i class="icon-plus icon-white"></i></button>
					<button type="button" id="DEL" class="btn btn-danger pull-right">削除 <i class="icon-remove icon-white"></i></button>
				</div>
				
				<!-- Модальное окошко для подтверждения удаления лицензии -->
				<div id="LICdel" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="ConfirmLabel" aria-hidden="true" style="display: none; ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h3 id="ConfirmLabel">ОПАНЬКИ! ОПАТУЛИЧКИ! ОПА-ОПА!</h3>
					</div>
					<div class="modal-body">
						<p>В данный момент времени случается ужасающая весчь! Кое-кто пытается удалить одну лицензию и по видимому совершенно намеренно! А вот эта лицензия может же пригодиться в дальнейшем кому-нибудь, возможно даже тебе! Эка ты хлопец удалой, берешь так просто и решаешь удалить бедную беззащитную лицензию!</p>
						<p>Ты подумай еще разок, перед тем как удалить!</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Пощадить!</button>
						<button type="button" class="btn btn-primary" id="CDEL">Удалить, НАХУЙ!</button>
					</div>
				</div>
				<!-- Конец модального окошечка -->
				
			</form>
			<form class="form-horizontal" id="SWFTELmodel" autocomplete="off">
				<legend>Модели телефонов</legend>
				<div id="mode"></div>
				<div id="status"></div>
				<div class="row">
					<div class="span4">
						<div class="control-group" id="GTELmodel">
							<label class="control-label" for="TELmodel">Название</label>
							<div class="controls">
								<input type="text" id="TELmodel" placeholder="Введите название телефона" data-provide="typeahead">
								<input type="hidden" id="TELid" value="">
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="TELtype-link">Соответствует</label>
							<div class="controls">
								<select id="TELtype-link" size="{SWTEL_type_num}">{SWTEL_type}</select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<select id="PBXtype-link" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<select id="PBXrelease-link" multiple></select>
							</div>
						</div>
					</div>
					<div class="span4">
						<div class="control-group">
							<label class="control-label" for="PBXtype-list">АТС, сука</label>
							<div class="controls">
								<select id="PBXtype-list" size="{SWPBX_type_num}">{SWPBX_type}</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="PBXrelease-list">Релиз, сука</label>
							<div class="controls">
								<select id="PBXrelease-list" size="2"></select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="TELtype-list">Тип, сука</label>
							<div class="controls">
								<select id="TELtype-list" size="{SWTEL_type_num}" disabled>{SWTEL_type}</select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="TELmodel-list">Телефон, сука</label>
							<div class="controls">
								<select id="TELmodel-list" size="2"></select>
							</div>
						</div>
						<div class="control-group">
							<div class="controls">
								<button type="button" id="TELedit-list" class="btn" disabled>編集 <i class="icon-edit"></i></button>
							</div>
						</div>
					</div>
				</div>
				<div class="form-actions">
					<button type="submit" id="OK" class="btn btn-primary">良い <i class="icon-ok icon-white"></i></button>
					<button type="button" id="NEW" class="btn btn-success">新しい <i class="icon-plus icon-white"></i></button>
					<button type="button" id="DEL" class="btn btn-danger pull-right">削除 <i class="icon-remove icon-white"></i></button>
				</div>
				
				<!-- Модальное окошко для подтверждения удаления телефончика -->
				<div id="TELdel" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="ConfirmLabel" aria-hidden="true" style="display: none; ">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h3 id="ConfirmLabel">ОПАНЬКИ! ОПАТУЛИЧКИ! ОПА-ОПА!</h3>
					</div>
					<div class="modal-body">
						<p>Сейчас вы пытаетесь удалить один несчастный телефончик! Возможно это крайне необходимо и вы пытаетесь таким образом самоутвердиться, за счет угнетения слабых, но помните, что удаляя этот несчастный телефончик, вы, возможно, нарушаете закон и родственники этого телефона вас запомнят на всю жизнь. Возможно именно Вы узнаете что такое возмездие телефонов и тогда уже будет поздно сожалеть о содеянном.</p>
						<p>Подумайте 1000 раз перед тем как удалить! Ваше решении может сохранить жизнь еще одного телефона в бескрайних просторах базы данных!</p>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn" data-dismiss="modal" aria-hidden="true">Пощадить!</button>
						<button type="button" class="btn btn-primary" id="CDEL">Удалить, НАХУЙ!</button>
					</div>
				</div>
				<!-- Конец модального окошечка -->
				
			</form>
		</div>
		<div class="tab-pane" id="wizard-conformity">
			<p class="lead">Пока ничего — ХУЙ!</p>
		</div>
	</div>
</section>