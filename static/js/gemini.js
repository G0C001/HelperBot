function RESPONSE(id_creation) {
    var HTML_CONTENT = `
    <div id="Question-Answer-con">
        <div id="Question" class="d-flex font-monospace justify-content-end">
            
            <div id="${id_creation}" class="p-2 rounded bg-dark text-light fw-medium" style="white-space: pre-wrap;"></div>
            <i class="p-2 bi bi-person-circle text-primary"></i>
            
        </div>

        <div id="Answer" class="d-flex loader-${id_creation}">
                    <i class="p-2 bi bi-robot text-primary"></i>
                    <div class="loader text-light"></div>
        </div>

    </div>
    `;
    document.getElementById("Question-Answer-con").innerHTML += HTML_CONTENT;
    document.getElementById("textInput").value = "";
    var chatContainer = document.getElementById("Question-Answer-con");
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function() {
var myForm = document.getElementById("myForm");
myForm.addEventListener("submit", function(event) {
    event.preventDefault();
    var inputValue = document.getElementById("textInput").value;
    var id_creation = Date.now();
    RESPONSE(id_creation);
    document.getElementById(id_creation).innerText = inputValue;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "helperbot", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                console.log(responseData);
                var loader = document.querySelector(`.loader-${id_creation}`);
                loader.style.setProperty('display', 'none', 'important');

                    console.log(loader);
                var bot_response = `
                <div id="Answer" class="d-flex">
                    <i class="p-2 bi bi-robot text-primary"></i>
                    <div class="p-2 rounded overflow-y-auto bg-black text-light font-monospace" style="scrollbar-color: rgb(85, 248, 30) #090909;white-space: pre-wrap;">${responseData['message']}</div>
                </div>
                                    `
                document.getElementById("Question-Answer-con").innerHTML += bot_response
                var chatContainer = document.getElementById("Question-Answer-con");
                chatContainer.scrollTop = chatContainer.scrollHeight;
            } else {
                console.error("Request failed");
            }
        }
    };
    var data = JSON.stringify({ inputValue: inputValue });
    xhr.send(data);
});
});

function getCookie(name) {
var cookieValue = null;
if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
        }
    }
}
return cookieValue;
}

