<?php
$my = new mysqli("127.0.0.1", "arsen", "creative", "tsi_configurator");

// Создаем список телефонов
$r = $my->query("select *, t1.Name as TelName from TELmodel t1, TELtype t2 where t1.idType = t2.id and t2.Name like 'sip' and t1.Name like '%".$_POST['query']."%' order by TelName");
$return = array();
while ($telmodel = $r->fetch_assoc()) {
	$return[] = $telmodel['TelName'];
}
file_put_contents("../uploads/query.txt", $_POST['query']);
echo json_encode($return);
