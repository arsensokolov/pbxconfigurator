<?php
session_start();
$session_id = 1;
$path = "../uploads/";

$valid_formats = array("jpg", "png", "gif", "bmp", "jpeg");
if (isset($_POST) && $_SERVER['REQUEST_METHOD'] == "POST") {
	$name = $_FILES['photoimg']['name'];
	$size = $_FILES['photoimg']['size'];
	if (strlen($name)) {
		list($txt, $ext) = explode(".", $name);
		$ext = strtolower($ext);
		if (in_array($ext, $valid_formats)) {
			if ($size<(1024*1024)) { // Размер файла максимально 1 МБайт
				$actual_image_name = time().$session_id.'.'.$ext;
				$tmp = $_FILES['photoimg']['tmp_name'];
				if (move_uploaded_file($tmp, $path.$actual_image_name)) {
					echo "<br><img src='uploads/".$actual_image_name."' class='img-polaroid'>";
				} else { echo "<br><div class=\"alert alert-error\"><a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>Критическая ошибка! ТЫ ВСЕ СЛОМАЛ!</div>"; }
			 } else { echo "<br><div class=\"alert alert-error\"><a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>Размер изображение превышает 1 МБ, нахуя такой большой логотип?</div>"; }
		} else { echo "<br><div class=\"alert alert-error\"><a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>Неверный тип файла! Ты вообще смотрел какие типы файла поддерживаются?</div>"; }
	} else { echo "<br><div class=\"alert alert-error\"><a class=\"close\" data-dismiss=\"alert\" href=\"#\">&times;</a>Выберите ваш логотип&hellip;</div>"; exit;}
}