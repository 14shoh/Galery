// script.js

// Обработчик события загрузки фотографии
document.getElementById('upload-button').addEventListener('click', function() {
  var fileInput = document.getElementById('file-upload');
  var file = fileInput.files[0];

  // Создайте объект FormData и добавьте в него выбранный файл
  var formData = new FormData();
  formData.append('file', file);

  // Выполните AJAX-запрос на сервер для загрузки фотографии
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Если загрузка прошла успешно, вызовите функцию для добавления фотографии в галерею
      addImageToGallery(xhr.responseText);
    }
  };
  xhr.send(formData);
});

// Функция для добавления фотографии в галерею
function addImageToGallery(imageName) {
  var imageContainer = document.getElementById('image-container');
  var imageElement = document.createElement('div');
  imageElement.classList.add('image-item');

  var imgElement = document.createElement('img');
  imgElement.src = 'uploads/' + imageName;
  imageElement.appendChild(imgElement);

  var deleteButton = document.createElement('button');
  deleteButton.textContent = 'Удалить';
  deleteButton.addEventListener('click', function() {
    deleteImage(imageName);
    imageContainer.removeChild(imageElement);
  });
  imageElement.appendChild(deleteButton);

  imageContainer.appendChild(imageElement);
}

// Функция для удаления фотографии
function deleteImage(imageName) {
  // Отправьте AJAX-запрос на сервер для удаления фотографии с помощью PHP
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'delete.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send('image=' + encodeURIComponent(imageName));
}

// Вызов функции для загрузки фотографий из XML при загрузке страницы
window.addEventListener('load', function() {
  getImagesFromXML();
});

// Получение информации о фотографиях из XML-файла
function getImagesFromXML() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'images.xml', true);
  xhr.onload = function() {
    if (xhr.status === 200) {
      var xmlDoc = xhr.responseXML;
      var images = xmlDoc.getElementsByTagName('image');

      for (var i = 0; i < images.length; i++) {
        var imageUrl = images[i].getElementsByTagName('url')[0].textContent;
        addImageToGallery(imageUrl);
      }
    }
  };
  xhr.send();
}
