export class ChatbotController {
    #chatbotView;
    #promptService;

    constructor({ chatbotView, promptService }) {
        this.#chatbotView = chatbotView;
        this.#promptService = promptService;
    }

    async init({ firstBotMessage, text }) {
        this.#setupEvents();
        this.#chatbotView.renderWelcomeBubble();
        this.#chatbotView.setInputEnabled(true);
        this.#chatbotView.appendBotMessage(firstBotMessage, null, false);
    }

    #setupEvents() {
        this.#chatbotView.setupEventHandlers({
            onOpen: this.#onOpen.bind(this),
            onSend: this.#chatBotReply.bind(this),
            onStop: this.#handleStop.bind(this),
        });
    }

    #handleStop() {}

    async #chatBotReply(userMsg) {
        console.log('received', userMsg);
        this.#chatbotView.showTypingIndicator();
        this.#chatbotView.setInputEnabled(false);
        setTimeout(() => {
            this.#chatbotView.appendBotMessage(
                'Opa! Ainda não estou pronto para isso.',
                null,
                false
            );
            this.#chatbotView.setInputEnabled(true);
            this.#chatbotView.hideTypingIndicator();
        }, 500);
    }

    async #onOpen() {
        this.#chatbotView.setInputEnabled(true);
    }
}
