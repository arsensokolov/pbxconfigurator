<?php 
	$my = new mysqli($cfg["host"], $cfg["user"], $cfg["password"], $cfg["database"]);
	
	if ($my->connect_error) {
		$title = "Критическая ошибка";
		$err_type = "error";
		$err_msg = 'Ошибка подключения (' . $my->connect_errno . '): ' . $my->connect_error;
	}
	
	$my->set_charset("utf8");
?>