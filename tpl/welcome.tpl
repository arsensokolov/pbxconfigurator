<section id="overview">
	<div class="page-header">
		<h1>Добро пожаловать в АТС конфигуратор</h1>
	</div>
	
	<h2>Соглашение</h2>
	<p>Эта разработка является индивидуальной, ни на что не претендует и создана лишь для облегчения составления спецификаций и коммерческих предложений для рядя клиентов на оборудовании Avaya.</p>
	<p>За работоспособность данного приложения автор никакой ответственности не несет и все претензии принимаются как форма замечания и не более того, в связи с чем автор приложения на свое усмотрение может исправить существующую ошибку или оставить так как есть, тем самым приравнивая бак к фиче.</p>
	<p>Если вы являетесь пользователем данного приложения, то вы автоматически принимаете все условия программного соглашения и иже с вами! В том случае если вас что-то не устраивает и вы не согласны с условиями пользования данного ПО, то вы можете выбрать множество вариантов, где в самом простом случае достаточно закрыть данную страницу, об остальные вариантах можно лишь догадываться и строить предположения.</p>
	
	<h2>Возможности</h2>
	<p>Конфигуратор имеет не множество возможностей по сравнению с другими подобными и по большей части это связано со специфичностью приложения. Возможно, но не обязательно, в будущем возможности будут приростать или наоборот уменьшаться — автору похер, главное чтобы работало так как нужно.</p>
	<h4>Но тем не менее, перечислю:</h4>	
	<ul>
		<li>Загрузка прайсов дистрибутора <span class="label label-warning">Comptek</span></li>
		<li>Загрузка темплейтов для русификации позиций прайса дистрибутора <span class="label label-warning">Comptek</span></li>
		<li>Поддержка составления коммерческого предложения <span class="label label-warning">только один формат!</span></li>
		<li>Хранение коммерческих предложений в базе данных</li>
		<li>Удаление коммерческих предложений из базы данных</li>
		<li>Выгрузка коммерческих предложений в формате <span class="label label-warning">PDF</span>, <span class="label label-warning">XLS</span> и хуй знает каком</li>
		<li>Поддерживает загрузку стоимости товаров до <strong>999 999,9999</strong> за единицу — это предельный верхний порог и до <strong>-99 999,9999</strong> является предельным нижним порогом. <em>Если надо больше, обращайтесь, исправлю <s>баг</s> фичу.</em></li>
		<li>Почти везде реализована технология AJAX</li>
		<li><strong>Версия 18+</strong> (содержится некоторое кол-во матов, а хуле сделать?)</li>
		<li>Возможность загрузки логотипа фирмы</li>
		<li class="muted">Возможность преобразовать коммерческое предложение в спецификацию <span class="label label-warning">В БУДУЩЕМ!</span></li>
		<li class="muted">Возможность добавления сторонних прайсов (не только Comptek) <span class="label label-warning">В БУДУЩЕМ!</span></li>
		<li class="muted">Авторизация и разделения прав пользователей <span class="label label-warning">В БУДУЩЕМ!</span></li>
	</ul>
	
	<h2>История версий</h2>
<pre class="prettyprint linenums">
1.0.0	Первая особо не стабильная версия. И мне как-то похуй!
1.0.1	Появилась возможность загрузки логотипов компании.
	Увеличена скорость обработки больших файлов Excel.
	Уменьшен объем потребляемой оперативной памяти на обработку больших Excel файлов.
	Добавлены фильтры предварительной обработки исходных Excel файлов.
	Изменен формат создаваемых SQL дампов.
	Добавлена кнопка загрузки SQL дампа после обработки загруженного Excel файла.
	Дабавлена возможность выбора логотипа для спецификаций и коммерческих предложений.
	Исправления мелких недочетов и прочей мешающей гадости.
</pre>
</section>