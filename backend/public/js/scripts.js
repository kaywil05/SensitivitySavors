function submitRecipe(formElement) {
    var formData = new FormData(formElement);
    var xhr = new XMLHttpRequest();
    
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request was successful
            console.log(xhr.responseText);
        } else {
            // Request failed
            console.error('Request failed with status ' + xhr.status);
        }
    };
    xhr.onerror = function () {
        console.error('Request failed');
    };

    xhr.send(formData);
}