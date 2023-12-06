<?php
if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $tempFile = $_FILES['file']['tmp_name'];
  $targetPath = 'uploads/'; // Папка для сохранения загруженных фотографий
  $targetFile = $targetPath . $_FILES['file']['name'];

  if (move_uploaded_file($tempFile, $targetFile)) {
    echo $_FILES['file']['name']; // Верните имя загруженной фотографии обратно на клиентскую сторону
  }
  
}
?>