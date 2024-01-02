class MessagesDefinition {
	constructor() {
		this.message = '';
		this.fillMessage = document.getElementById('message');
	}
	startedRecording() {
		start.style.display = 'none';
		this.message = `Recording started <span class='beating'>🔴</span>`;
		this.display();
	}
	stoppedRecording() {
		start.style.display = 'flex';
		this.message = 'Recording stopped';
		this.display();
	}
	display() {
		this.fillMessage.innerHTML = '';
		this.fillMessage.innerHTML = this.message;
	}
	get link() {
		return this.message;
	}
	set link(link) {
		this.message = link;
		this.display();
	}
}

const Messages = new MessagesDefinition();
