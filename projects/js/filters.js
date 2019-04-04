function previewFile() {
  var preview = document.querySelector('img');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

function updateFilter() {
  var preview = document.querySelector('img');
  var filter = document.querySelector('#filter');
  var amount = document.querySelector('#amount');
  preview.style.filter = filter.value + "(" + amount.value.toString() + "%)";
  preview.style.WebkitFilter = filter.value + "(" + amount.value.toString() + "%)";
}
