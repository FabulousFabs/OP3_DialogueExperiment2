<?php
$id = @isset($_GET['ppn']) ? $_GET['ppn'] : 1;
$list = rand(0, 3);
header('Location: ./experiment.html?ppn=' . $id . '&list=' . $list);
exit;
?>
