document.addEventListener('DOMContentLoaded', function () {
    var submitButton = document.getElementById('submitButton');
    var userInput = document.getElementById('userInput');
    var chatContainer = document.getElementById('chatContainer');

    submitButton.addEventListener('click', function () {
        var enteredText = userInput.value;

        // User message
        var userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = 'You: ' + enteredText;
        chatContainer.appendChild(userMessage);

        // Bot message (for demonstration purposes, you can replace this with actual bot responses)
        var botMessage = document.createElement('div');
        botMessage.className = 'bot-message';
        botMessage.textContent = 'Bot: Thanks for your message!';
        chatContainer.appendChild(botMessage);

        // Clear input field
        userInput.value = '';

        // Scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    });
});
