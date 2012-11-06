<section id="config">
	<div class="page-header">
		<h1>Составление конфигурации <small>А то, блядь!</small></h1>
	</div>
	<p>Здесь методом вопрос-ответ мы постараемся составить готовое коммерческое предложение и спецификацию исходы из ваших ответов. Все крайне просто и не должно вызвать у специалиста никаких затруднений, если это не так, то сами виноваты и вообще &ndash; сам дурак! По завершению опроса, будет сохранена готовая конфигурация, которую вы найдете в архиве и которую можно будет правит уже как угодно или выгружать в одном из предлагаемых форматов. <em>Короче, удачи в обе гачи!</em></p>
	<form class="form-horizontal" id="PBXConfForm">
	<div class="row"><div class="span4">
		<legend>Определение типа АТС</legend>
		<div class="control-group" id="GPBXtype">
			<label class="control-label" for="PBXtype">Тип АТС</label>
			<div class="controls">
				<select id="PBXtype">
					<option value="0">-- Выберите из списка --</option>
					{PBX_type}
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GPBXrelease" data-form="muted">
			<label class="control-label" for="PBXrelease">Релиз версии АТС</label>
			<div class="controls">
				<select id="PBXrelease" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GPBXlicense" data-form="muted">
			<label class="control-label" for="PBXlicense">Тип лицензии</label>
			<div class="controls">
				<select id="PBXlicense" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GCOPM" data-form="muted cm">
			<label class="control-label" for="COPM">СОРМ</label>
			<div class="controls">
				<label class="checkbox">
					<input type="checkbox" id="COPM" name="COPM" data-form-input="muted cm" disabled> Н-Н-НАДА!
				</label>
			</div>
		</div>
	</div><div class="span4">
		<legend class="muted" data-form="muted cm sm">Выживающий сервер</legend>
		<div class="control-group muted" data-form="muted cm sm">
			<label class="control-label">Нужен?</label>
			<div class="controls">
				<label class="radio">
					<input type="radio" name="SRVenb" value="1" data-form-input="muted sm cm" disabled>ДА!
				</label>
				<label class="radio">
					<input type="radio" name="SRVenb" value="0" data-form-input="muted sm cm" disabled checked>НЕТ БЛЯТЬ!
				</label>
			</div>
		</div>
		<div class="control-group muted" data-form="muted">
			<label class="control-label">Тип сервера</label>
			<div class="controls">
				<select id="SRVtype" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" data-form="muted">
			<label class="control-label" for="SRVnum">Кол-во</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="SRVnum" type="text" placeholder="0" name="SRVnum" maxlength="3" data-filter="num" data-form-input="muted" disabled="" style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
	</div></div>
	<div class="row">
	<div class="span4">
		<legend class="muted" data-form="muted cm ipo sm">Количество абонентов</legend>
		<div class="control-group muted" data-form="muted ipo sm">
			<label class="control-label" for="SIPext">SIP</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="SIPext" size="16" type="text" placeholder="0" name="SIPext" data-filter="num" data-form-input="muted ipo sm" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="H323ext">H.323</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="H323ext" size="16" type="text" placeholder="0" name="H323ext" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="DIGext">Цифровые</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="DIGext" size="16" type="text" placeholder="0" name="DIGext" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="ANGext">Аналоговые</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="ANGext" size="16" type="text" placeholder="0" name="ANGext" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
	</div><div class="span4">
		<legend class="muted" data-form="muted cm ipo sm">Соединительные линии</legend>
		<div class="control-group muted" data-form="muted ipo sm">
			<label class="control-label" for="SIPtrk">SIP</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="SIPtrk" size="16" type="text" placeholder="0" name="SIPtrk" data-filter="num" data-form-input="muted ipo sm" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="H323trk">H.323</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="H323trk" size="16" type="text" placeholder="0" name="H323trk" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="E1trk">E1</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="E1trk" size="16" type="text" placeholder="0" name="E1trk" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" data-form="muted cm ipo">
			<label class="control-label" for="COtrk">Аналоговые</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="COtrk" size="16" type="text" placeholder="0" name="COtrk" data-filter="num" data-form-input="muted cm ipo" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
	</div><div class="span4">
		<legend class="muted" data-form="muted sm cm ipo">Модели телефонов</legend>
		<div class="control-group muted" id="GSIPtel" data-form="muted">
			<label class="control-label" for="SIPtel">IP (SIP & H.323)</label>
			<div class="controls">
				<select id="SIPtel" name="SIPtel" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GH323tel" data-form="muted">
			<label class="control-label" for="H323tel">IP (H.323 Only)</label>
			<div class="controls">
				<select id="H323tel" name="H323tel" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GDIGtel" data-form="muted">
			<label class="control-label" for="DIGtel">Цифровые</label>
			<div class="controls">
				<select id="DIGtel" name="DIGtel" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
		<div class="control-group muted" id="GANGtel" data-form="muted">
			<label class="control-label" for="ANGtel">Аналоговые</label>
			<div class="controls">
				<select id="ANGtel" name="ANGtel" data-form-select="muted" disabled>
					<option value="0">-- Выберите из списка --</option>
				</select>
			</div>
		</div>
	</div><div class="span4">
		<legend class="muted" data-form="muted cm sm ipo">Питание IP телефонов</legend>
		<div class="control-group muted" id="GSTDpwr" data-form="muted pwr">
			<label class="control-label" for="STDpwr">Блоки питания</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="STDpwr" size="16" type="text" placeholder="0" name="STDpwr" data-filter="num" data-form-input="muted pwr" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" id="GPOEpwr" data-form="muted pwr">
			<label class="control-label" for="POEpwr">PoE питание</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="POEpwr" size="16" type="text" placeholder="0" name="POEpwr" data-filter="num" data-form-input="muted pwr" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
		<div class="control-group muted" id="GPOE03pwr" data-form="muted pwr">
			<label class="control-label" for="POE03pwr">1603 PoE питание</label>
			<div class="controls">
				<div class="input-append">
					<input class="span2" id="POE03pwr" size="16" type="text" placeholder="0" name="POE03pwr" data-filter="num" data-form-input="muted pwr" disabled style="text-align: right;"><span class="add-on">шт.</span>
				</div>
			</div>
		</div>
	</div></div>
	<div class="form-actions">
		<button type="button" id="CRTconf" class="btn btn-primary" data-form="CRTconf" disabled>Создать конфигурацию</button>
	</div>
	
	<div id="wizardConfirm" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="ConfirmLabel" aria-hidden="true" style="display: none; ">
		<div class="modal-header">
			<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
			<h3 id="ConfirmLabel">ОПАНЬКИ! ОПАТУЛИЧКИ! ОПА-ОПА!</h3>
		</div>
		<div class="modal-body">
			<div class="control-group muted" id="GCFGname">
				<label class="control-label" for="CFGname">Название, ёба</label>
				<div class="controls">
					<input type="text" id="CFGname" name="CFGname" placeholder="Ёбаная конфигурация&hellip;">
				</div>
			</div>
			<div class="control-group muted" id="GCFGclient">
				<label class="control-label" for="CFGclient">Клиент, сука</label>
				<div class="controls">
					<input class="typeahead" type="text" id="CFGclient" name="CFGclient" placeholder="Рога и копыты" data-provide="typeahead">
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button class="btn" data-dismiss="modal" aria-hidden="true">Отменить</button>
			<button class="btn btn-primary">Создать</button>
		</div>
	</div>
	</form>
</section>