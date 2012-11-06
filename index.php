<?php 
	error_reporting(E_ERROR); // Выводим только сообщения об ошибках
	date_default_timezone_set('Asia/Irkutsk');
	setlocale(LC_ALL, 'ru_RU');
	$cfg = parse_ini_file("inc/config.ini"); // Загружаем наши дефолтные настройки
	include("inc/db.ini.php"); // Подключаем БД.
	session_start();
	$session_id = 1;
	$logo_dir = $cfg['logo_dir'];
	$dbhost = $cfg['host'];
	$dbuser = $cfg['user'];
	$dbpass = $cfg['password'];
	$db = $cfg['database'];
	$mysql_bin = $cfg['mysql'];
	
	/*
	 * Отслеживаем заголовок страницы 
	 */
	if (!isset($title)) { $title = ''; }
	else { $title .= ' -'; }
	
	/*
	 * Получаем реквизиты бреда-да-да 
	 */
	if ($result = $my->query("SELECT `Text` FROM `Settings` LIMIT 1")) {
		$row = $result->fetch_row();
		$firm_details = $row[0];
	} else {
		$firm_details = '';
	}
	
	/*
	 * Узнаем кол-во записей в базе по прайсу 
	 */
	$r = $my->query("SELECT SQL_CALC_FOUND_ROWS * FROM `Price` LIMIT 0,1");
	$r = $my->query("SELECT FOUND_ROWS() as total");
	$row = $r->fetch_assoc();
	$total_len_price = $row['total'];
	
	/*
	 * Получаем список типов АТС 
	 */
	$PBX_type = '';
	$r = $my->query("SELECT SQL_CALC_FOUND_ROWS * FROM `PBXtype` ORDER BY `Name`");
	while ($pbxtype = $r->fetch_assoc()) {
		$PBX_type .= "<option value=\"".$pbxtype['id']."\">".$pbxtype['Name']."</option>";
	}
	$r = $my->query("SELECT FOUND_ROWS() as total");
	$row = $r->fetch_assoc();
	$PBX_type_num = $row['total'];
	
	/*
	 * Получем типы телефонов 
	 */
	$TEL_type = '';
	$r = $my->query("SELECT SQL_CALC_FOUND_ROWS * FROM `TELtype` ORDER BY `Name`");
	while ($teltype = $r->fetch_assoc()) {
		$TEL_type .= "<option value=\"".$teltype['id']."\">".$teltype['Name']."</option>";
	}
	$r = $my->query("SELECT FOUND_ROWS() as total");
	$row = $r->fetch_assoc();
	$TEL_type_num = $row['total'];
	
	/*
	 * Ебучий визард, нахуй! 
	 */
	if (isset($_POST['act']) && $_POST['act'] == 'wizard') {
	
		// Создаем список типов АТС
		if (isset($_POST['pbxtype'])) {
			$option = "<option value=\"0\">-- Выберите из списка --</option>";
			$r = $my->query("SELECT * FROM `PBXrelease` WHERE `idPBX` = ".$_POST['pbxtype']." ORDER BY `Name` DESC");
			while ($pbxrelease = $r->fetch_assoc()) {
				$option .= "<option value=\"".$pbxrelease['id']."\">".$pbxrelease['Name']."</option>";
			}
			$r = $my->query("SELECT * FROM `Wizard` WHERE `idPBX` = ".$_POST['pbxtype']);
			$arr = $r->fetch_assoc();
			$dataform = $arr['Data'];
			echo json_encode(array("option"=>$option,"form"=>$dataform));
		} 
		
		// Создаем список версий релиза АТС
		if (isset($_POST['pbxrelease'])) {
			echo "<option value=\"0\">-- Выберите из списка --</option>";
			$r = $my->query("SELECT * FROM `PBXlicense` t1, `LICtype` t2 WHERE t1.idLicense = t2.id AND t1.idRelease = ".$_POST['pbxrelease']." ORDER BY t2.Name");
			while ($pbxlic = $r->fetch_assoc()) {
				echo "<option value=\"".$pbxlic['id']."\">".$pbxlic['Name']."</option>";
			}
		}
		
		// Создаем список телефонов
		if (isset($_POST['teltype']) && isset($_POST['pbxrel'])) {
			$r = $my->query("select *, t3.Name as TelName, t3.id as TelId from TELmodel t1, TELtype t2, TELname t3 where t1.idType = t2.id and t1.idName = t3.id and t2.Name like '".$_POST['teltype']."' and t1.idRel = '".$_POST['pbxrel']."' order by TelName");
			echo "<option value=\"0\">-- Выберите из списка --</option>";
			while ($telmodel = $r->fetch_assoc()) {
				echo "<option value=\"".$telmodel['TelId']."\">".$telmodel['TelName']."</option>";
			}
		}
		
		if (isset($_POST['search'])) {
			$r = $my->query("select * from `Client` where `Name` like '%".$_POST['search']."%' LIMIT 8");
			$return = array();
			while ($client = $r->fetch_assoc()) {
				$return[] = $client['Name'];
			}
			echo json_encode($return);
		}
		
		exit();
		
	}
	
	/*
	 * Редактирование волшебника 
	 */
	if (isset($_POST['act']) && $_POST['act'] == 'wedit') {
		if (isset($_POST['from']) && $_POST['from'] == 'TELlist') {
			// Создаем список релизов для соответствующей АТС
			if (isset($_POST['pbxtype'])) {
				$r = $my->query("select SQL_CALC_FOUND_ROWS * from `PBXrelease` where idPBX = '".$_POST['pbxtype']."' order by Name desc");
				$option = '';
				while ($rel = $r->fetch_assoc()) {
					$option .= "<option value=\"".$rel['id']."\">".$rel['Name']."</option>";
				}
				$r = $my->query("SELECT FOUND_ROWS() as total");
				$row = $r->fetch_assoc();
				$data_num = $row['total'];
				echo json_encode(array("option"=>$option,"size"=>$data_num));
			}
			
			// Создаем список лицензий
			if (isset($_POST['lic_rel'])) {
				$r = $my->query("SELECT SQL_CALC_FOUND_ROWS t2.id as LicId, t2.Name as LicName FROM PBXlicense t1, LICtype t2  WHERE t1.idLicense = t2.id and t1.idRelease = '{$_POST['lic_rel']}'");
				$option = '';
				while ($row = $r->fetch_assoc()) {
					$option .= "<option value=\"{$row['LicId']}\">{$row['LicName']}</option>";
				}
				$r = $my->query("SELECT FOUND_ROWS() as total");
				$row = $r->fetch_assoc();
				$data_num = $row['total'];
				echo json_encode(array("option"=>$option,"size"=>$data_num));
			}
			
			// Создаем список телефонов
			if (isset($_POST['release']) && isset($_POST['teltype'])) {
				$r = $my->query("select SQL_CALC_FOUND_ROWS *, t2.id as TelId, t2.Name as TelName from TELmodel t1, TELname t2 where t1.idName = t2.id and t1.idType = '{$_POST['teltype']}' and t1.idRel = '{$_POST['release']}'");
				$option = '';
				while ($row = $r->fetch_assoc()) {
					$option .= "<option value=\"{$row['TelId']}\">{$row['TelName']}</option>";
				}
				$r = $my->query("SELECT FOUND_ROWS() as total");
				$row = $r->fetch_assoc();
				$data_num = $row['total'];
				echo json_encode(array("option"=>$option,"size"=>$data_num));
			}
			
			// Отправляем ID разрешенных релизов для этого типа телефонного аппарата
			if (isset($_POST['multiselect']) && isset($_POST['teltype'])) {
				$r = $my->query("select * from TELmodel where idName = {$_POST['multiselect']} and idType = {$_POST['teltype']}");
				$return = array();
				while ($row = $r->fetch_assoc()) {
					$return[] = $row['idRel'];
				}
				echo json_encode($return);
			}
			// Отправляем ID разрешенных релизов для конкретной лицензии
			elseif (isset($_POST['multiselect']) && isset($_POST['db']) && $_POST['db'] == 'lic') {
				$r = $my->query("SELECT idRelease FROM PBXlicense WHERE idLicense = {$_POST['multiselect']}");
				$return = array();
				while ($row = $r->fetch_assoc()) {
					$return[] = $row['idRelease'];
				}
				echo json_encode($return);
			}
		}
		
		// Автоподстановка
		if (isset($_POST['search'])) {
			if (isset($_POST['db']) && $_POST['db'] == 'tel') {
				$r = $my->query("select * from `TELname` where Name like '%{$_POST['search']}%' order by Name limit 8");
				$return = array();
				while ($row = $r->fetch_assoc()) {
					$return[] = $row['Name'];
				}
				echo json_encode($return);
			}
			elseif (isset($_POST['db']) && $_POST['db'] == 'lic') {
				$r = $my->query("SELECT Name FROM LICtype WHERE Name LIKE '%{$_POST['search']}%' ORDER BY Name LIMIT 8");
				$return = array();
				while ($row = $r->fetch_assoc()) {
					$return[] = $row['Name'];
				}
				echo json_encode($return);
			}
		}
		
		if (isset($_POST['from']) && $_POST['from'] == 'TELform') {
			$text = ''; $cls = '';
			if (isset($_POST['idtel']) && $_POST['idtel'] != '') { // Редактирование существующей модели телефона
				if (empty($_POST['name'])) {
					$text = 'Поле имени не может быть пустым';
					$cls = "alert-error";
				} else {
					$my->query("update TELname set Name = '{$_POST['name']}' where id = '{$_POST['idtel']}'");
					$r = $my->query("select t1.`id`, t1.`idRel` from TELmodel t1, PBXrelease t2 where t1.`idRel` = t2.`id` and t2.`idPBX` = '{$_POST['pbx']}' and t1.`idType` = '{$_POST['type']}' and t1.`idName` = '{$_POST['idtel']}' order by t1.idRel asc");
					$rel_new = explode("|", $_POST['rel']);
					$rel = array();
					while ($rel_old = $r->fetch_assoc()) {
						$rel[$rel_old['id']] = $rel_old['idRel'];
					}
					asort($rel_new); 
					
					// Удаляем повторяющиеся значения в двух массивах
					foreach($rel_new as $kkey => $vval) {
						foreach($rel as $key => $val) {
							if ($vval == $val) {
								unset($rel_new[$kkey], $rel[$key]);
							}
						}
					}
					
					// Начинаем свистопляски, сука нах!
					$i = $j = 0;
					while (count($rel_new) > 0 || count($rel) > 0) {
						if (count($rel_new) > 0 && count($rel) > 0) {
							if (!is_null($rel_new[$i]) && (!is_null($rel[$j]))) {
								$my->query("UPDATE `TELmodel` SET `idRel` = '{$rel_new[$i]}' WHERE `id` = '$j'");
								unset($rel_new[$i], $rel[$j]);
								$i++; $j++;
								continue;
							}
							if (is_null($rel_new[$i]) && (!is_null($rel[$j]))) $i++;
							if (!is_null($rel_new[$i]) && (is_null($rel[$j]))) $j++;
							if (is_null($rel_new[$i]) && (is_null($rel[$j]))) {
								$j++; $i++;
							}
						}
						if (count($rel_new) == 0 && count($rel) > 0) {
							if (is_null($rel_new[$i]) && (!is_null($rel[$j]))) {
								$my->query("DELETE FROM `TELmodel` WHERE id = '$j'");
								unset($rel[$j]);
								$j++;
								continue;
							}
							if (is_null($rel_new[$i]) && (is_null($rel[$j]))) $j++;
						}
						if (count($rel_new) > 0 && count($rel) == 0) {
							if (!is_null($rel_new[$i]) && (is_null($rel[$j]))) {
								$my->query("INSERT INTO `TELmodel` (`idType`, `idRel`, `idName`) VALUES ('{$_POST['type']}', '{$rel_new[$i]}', '{$_POST['idtel']}')");
								unset($rel_new[$i]);
								$i++;
								continue;
							}
							if (is_null($rel_new[$i]) && (is_null($rel[$j]))) $i++;
						}
						
					}

					$text = 'ДАННЫЕ ОБНОВЛЕНЫ';
					$cls = "alert-success";
				}
			}
			elseif (isset($_POST['iddel']) && $_POST['iddel'] != '' && $_POST['iddel'] != '0') { // Удаление телефона
				$my->query("DELETE FROM `TELname` WHERE `id` = '{$_POST['iddel']}'");
				$text = "МОДЕЛЬ ТЕЛЕФОНА УСПЕШНО УДАЛЕНА!";
				$cls = "alert-success";
			}
			elseif (!isset($_POST['idtel']) && !isset($_POST['iddel'])) { // Добавление новой модели телефона
				if (empty($_POST['name'])) {
					$text = 'Поле имени не может быть пустым';
					$cls = "alert-error";
				}
				else {
					$rel_new = explode("|", $_POST['rel']);
					$r = $my->query("SELECT `id` FROM `TELname` WHERE `Name` LIKE '{$_POST['name']}' LIMIT 1");
					$row = $r->fetch_array();
					$idtel = $row[0];
					$row_cnt = $r->num_rows;
					if ($row_cnt != 0) {
						foreach ($rel_new as $val) {
							$r = $my->query("SELECT `id` FROM `TELmodel` WHERE `idType` = '{$_POST['type']}' and `idRel` = '{$val}' and `idName` = '{$idtel}' LIMIT 1");
							$row_cnt = $r->num_rows;
							if ($row_cnt == 0) {
								$my->query("INSERT INTO `TELmodel` (`idType`, `idRel`, `idName`) VALUES ('{$_POST['type']}','{$val}','{$idtel}')");
							}
						}
						$text = "ДОБАВЛЕНЫ НОВЫЕ ОПЦИИ К СУЩЕСТВУЮЩЕМУ ТЕЛЕФОНУ";
						$cls = "alert-success";
					}
					else {
						$my->query("INSERT INTO `TELname` (`Name`) VALUES ('{$_POST['name']}')");
						$idtel = $my->insert_id;
						foreach ($rel_new as $val) {
							$my->query("INSERT INTO `TELmodel` (`idType`, `idRel`, `idName`) VALUES ('{$_POST['type']}','{$val}','{$idtel}')");
						}
						$text = "ДОБАВЛЕН НОВЫЙ ТЕЛЕФОН СООТВЕТСТВУЮЩЕГО ТИПА К ВЫБРАННОЙ АТС И СООТВЕТСТВУЮЩИМ РЕЛИЗАМ";
						$cls = "alert-success";
					}
				}
			}
			
			// Редактирование существующей лицензии
			if (isset($_POST['idlic']) && $_POST['idlic'] != '') {
				if (empty($_POST['name'])) {
					$text = 'Поле имени не может быть пустым';
					$cls = "alert-error";
				} 
				else {
					
				}
			}
			
			echo json_encode(array("text"=>$text, "cls"=>$cls, "debug"=>$debug));
		}
		
		exit();
	}
	
	/*
	 * Импортируем прайс 
	 */
	if (isset($_POST) && $_POST['act'] == 'import_price') {
		passthru($mysql_bin." -u".$dbuser." -p".$dbpass." ".$db." < ".$logo_dir."price.sql", $ierr);
		unlink($logo_dir.'price.sql');
		if ($ierr == 0) {
			echo '<br><div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a> Данные успешно загружены&hellip;</div>';
		} else {
			echo '<br><div class="alert alert-error"><a href="#" class="close" data-dismiss="alert">&times;</a> Данные загрузить не удалось&hellip; Обратитесь к разработчику данного ПО!</div>';
		}
		exit();
	}
	
	/*
	 * Импортируем шаблон 
	 */
	if (isset($_POST['act']) && $_POST['act'] == 'import_template') {
		passthru($mysql_bin." -u".$dbuser." -p".$dbpass." ".$db." < ".$logo_dir."template.sql", $ierr);
		unlink($logo_dir.'template.sql');
		if ($ierr == 0) {
			echo '<br><div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a> Данные успешно загружены&hellip;</div>';
		} else {
			echo '<br><div class="alert alert-error"><a href="#" class="close" data-dismiss="alert">&times;</a> Данные загрузить не удалось&hellip; Обратитесь к разработчику данного ПО!</div>';
		}
		exit();
	}
	
	/*
	 * Обновляем счетчик кол-ва позиций в прайсе, НАХУЙ! 
	 */
	if (isset($_POST['act']) && $_POST['act'] == 'total_len_price') {
		$r = $my->query("SELECT SQL_CALC_FOUND_ROWS * FROM `Price` LIMIT 0,1");
		$r = $my->query("SELECT FOUND_ROWS()");
		$row = $r->fetch_row();
		echo $row[0];
		exit();
	}
	
	/*
	 * Сканирует Uploads директорию на ниличие в ней нужных файлов 
	 */
	$image_list = scanimage($logo_dir);
	if (isset($_POST) && $_POST['act'] == 'refresh_logo') {
		echo $image_list;
		exit();
	}
	
	/*
	 * Выбираем логотип для коммпреда, ёба! 
	 */
	if (isset($_POST) && $_POST['act'] == 'check_komm_logo') {
		if ($my->query("UPDATE `Settings` SET `LogoKomm` = '".$_POST['logoid']."'") === TRUE) {
			echo scanimage($logo_dir);
		}
		exit();
	}
	
	/*
	 * Выбираем логотип для спеки, НАХУЙ! 
	 */
	if (isset($_POST) && $_POST['act'] == 'check_spec_logo') {
		if ($my->query("UPDATE `Settings` SET `LogoSpec` = '".$_POST['logoid']."'") === TRUE) {
			echo scanimage($logo_dir);
		}
		exit();
	}
	
	/*
	 * Удаляем логотипы, сука нахуй! 
	 */
	if (isset($_POST) && $_POST['act'] == 'del_logo') {
		unlink($cfg['logo_dir'].$_POST['logoid'].'.jpg');
		unlink($cfg['logo_dir'].$_POST['logoid'].'.jpeg');
		unlink($cfg['logo_dir'].$_POST['logoid'].'.png');
		unlink($cfg['logo_dir'].$_POST['logoid'].'.gif');
		unlink($cfg['logo_dir'].$_POST['logoid'].'.bmp');
		echo scanimage($logo_dir);
		exit();
	}
	
	/*
	 * Обновляем всякую хуйню! 
	 */
	if (isset($_POST) && $_POST['act'] == 'update_details') {
		if ($my->query("UPDATE `Settings` SET `Text` = '".$_POST['text']."'") === TRUE) {
			echo '<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a> Данные успешно обновлены</div>';
		}
		exit();
	}
	
	$my->close(); // Закрываем соединение с БД
	
	/* 
	 * Подключаем и выводим шаблон 
	 */
	$tpl = file_get_contents("tpl/header.tpl");
	if (isset($err_msg)) $tpl .= file_get_contents("tpl/alerts.tpl");
	$tpl.= file_get_contents("tpl/navbar.tpl");
	$tpl.= file_get_contents("tpl/welcome.tpl");
	$tpl.= file_get_contents("tpl/config.tpl");
	$tpl.= file_get_contents("tpl/archive.tpl");
	$tpl.= file_get_contents("tpl/export.tpl");
	$tpl.= file_get_contents("tpl/import.tpl");
	$tpl.= file_get_contents("tpl/settings.tpl");
	$tpl.= file_get_contents("tpl/help.tpl");
	$tpl.= file_get_contents("tpl/footer.tpl");
	$tpl = str_replace("{title}", $title, $tpl); // Заголовок
	$tpl = str_replace("{suffix}", $cfg["suffix"], $tpl); // Суффикс для заголовка
	$tpl = str_replace("{brand_name}", $cfg["brand_name"], $tpl); // Название программы
	$tpl = str_replace("{alert-type}", "alert-".$err_type, $tpl); // Тип сообщения об ошибке
	$tpl = str_replace("{alert-message}", $err_msg, $tpl); // Сообщения об ошибках при первой загрузке
	$tpl = str_replace("{PBX_type}", $PBX_type, $tpl); // Типы АТС
	$tpl = str_replace("{SWPBX_type}", $PBX_type, $tpl); // Типы АТС
	$tpl = str_replace("{SWPBX_type_num}", $PBX_type_num, $tpl); // Кол-во типов АТС
	$tpl = str_replace("{SWTEL_type}", $TEL_type, $tpl);
	$tpl = str_replace("{SWTEL_type_num}", $TEL_type_num, $tpl);
	$tpl = str_replace("{total_len_price}", $total_len_price, $tpl); // Всего наименований в прайсе
	$tpl = str_replace("{spec-logo}", $image_list, $tpl); // Логотипы спецификаций
	$tpl = str_replace("{komm-logo}", $image_list, $tpl); // Логотипы для комм. предложений
	$tpl = str_replace("{firm_details}", $firm_details, $tpl); // Различные реквизиты
	echo $tpl;
	
/* 
 * Функция сканирования директорий на наличие изображений 
 */
function scanimage($dir) {
	$myq = new mysqli($GLOBALS['dbhost'], $GLOBALS['dbuser'], $GLOBALS['dbpass'], $GLOBALS['db']);
	$r = $myq->query("SELECT `LogoKomm`, `LogoSpec` FROM `Settings` LIMIT 1");
	$rows = $r->fetch_row();
	$myq->close();
	$skl = $rows[0];
	$ssl = $rows[1];
	$checked = '';
	$lendir = strlen($dir);
	$image_list = '<ul class="thumbnails">';
	$ch = 0;
	if (is_readable($dir)) {
		$jpg = glob($dir.'*.jpg');
		$jpeg = glob($dir.'*.jpeg');
		$png = glob($dir.'*.png');
		$gif = glob($dir.'*.gif');
		$bmp = glob($dir.'*.bmp');
		if (!empty($jpg)) {
			foreach ($jpg as $filename) {
				$fileid = substr($filename, $lendir, -4);
				if ($fileid == $skl) $checked .= ' skl-focused';
				if ($fileid == $ssl) $checked .= ' ssl-focused';
				$image_list .= '<li class="span4">';
				$image_list .= '<a href="#" class="thumbnail'.$checked.'" id="'.$fileid.'">';
				$image_list .= '<img src="'.$filename.'" alt="" width="300" height="200">';
				$image_list .= '</a></li>';
				$checked = '';
			}	
		} else $ch++;
		if (!empty($jpeg)) {
			foreach ($jpeg as $filename) {
				$fileid = substr($filename, $lendir, -5);
				if ($fileid == $skl) $checked .= ' skl-focused';
				if ($fileid == $ssl) $checked .= ' ssl-focused';
				$image_list .= '<li class="span4">';
				$image_list .= '<a href="#" class="thumbnail'.$checked.'" id="'.$fileid.'">';
				$image_list .= '<img src="'.$filename.'" alt="" width="300" height="200">';
				$image_list .= '</a></li>';
				$checked = '';
			}
		} else $ch++;
		if (!empty($png)) {
			foreach ($png as $filename) {
				$fileid = substr($filename, $lendir, -4);
				if ($fileid == $skl) $checked .= ' skl-focused';
				if ($fileid == $ssl) $checked .= ' ssl-focused';
				$image_list .= '<li class="span4">';
				$image_list .= '<a href="#" class="thumbnail'.$checked.'" id="'.$fileid.'">';
				$image_list .= '<img src="'.$filename.'" alt="" width="300" height="200">';
				$image_list .= '</a></li>';
				$checked = '';
			}
		} else $ch++;
		if (!empty($gif)) {
			foreach ($gif as $filename) {
				$fileid = substr($filename, $lendir, -4);
				if ($fileid == $skl) $checked .= ' skl-focused';
				if ($fileid == $ssl) $checked .= ' ssl-focused';
				$image_list .= '<li class="span4">';
				$image_list .= '<a href="#" class="thumbnail'.$checked.'" id="'.$fileid.'">';
				$image_list .= '<img src="'.$filename.'" alt="" width="300" height="200">';
				$image_list .= '</a></li>';
				$checked = '';
			}
		} else $ch++;
		if (!empty($bmp)) {
			foreach ($bmp as $filename) {
				$fileid = substr($filename, $lendir, -4);
				if ($fileid == $skl) $checked .= ' skl-focused';
				if ($fileid == $ssl) $checked .= ' ssl-focused';
				$image_list .= '<li class="span4">';
				$image_list .= '<a href="#" class="thumbnail'.$checked.'" id="'.$fileid.'">';
				$image_list .= '<img src="'.$filename.'" alt="" width="300" height="200">';
				$image_list .= '</a></li>';
				$checked = '';
			}
		} else $ch++;
		$image_list .= '</ul>';
		$image_list .= '<div class="btn-group pull-right">';
		$image_list .= '<button type="button" class="btn" name="check">Выбрать</button>';
		$image_list .= '<button type="button" class="btn btn-danger" name="del">Удалить</button>';
		$image_list .= '</div>';
		if ($ch >= 5) $image_list = 'Логотипов нет! Загрузи сначало логотип и делай с ним что угодно!';
	} else {
		$image_list = 'Директория не может быть прочитана!';
	}
	return $image_list;
}
?>