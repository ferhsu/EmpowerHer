document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitButton');
    var userInput = document.getElementById('userInput');
    var chatContainer = document.getElementById('chatContainer');
    
    submitButton.addEventListener('click', function () {
        var enteredText = userInput.value;
        var llamaMessage = ''

        // User message
        var userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = 'You: ' + enteredText;
        chatContainer.appendChild(userMessage);

        axios.get("http://localhost:8000/process_input", {params: {enteredText}}) 
            .then((response) => {
                llamaMessage = response.data;
                console.log(response.data);
                console.log(enteredText);
                var botMessage = document.createElement('div');
                botMessage.className = 'bot-message';
                botMessage.textContent = "Wominspiration: Okay! Here is someone who is just like you: " + llamaMessage;
                chatContainer.appendChild(botMessage);
                
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }) 
            .catch((error) => {
                console.error("Error:", error);
            })

        userInput.value = '';

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
});