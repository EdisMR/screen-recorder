let start = document.getElementById('start');
let stop = document.getElementById('stop');



let mediaRecorder;
start.addEventListener('click', async function () {
	let stream = await recordScreen();
	let mimeType = 'video/webm';
	mediaRecorder = createRecorder(stream, mimeType);
	Messages.startedRecording();
})
stop.addEventListener('click', function () {
	mediaRecorder.stop();
	Messages.stoppedRecording();
})





async function recordScreen() {
	return await navigator.mediaDevices.getDisplayMedia({
		audio: true,
		video: { mediaSource: "screen" }
	});
}






function createRecorder(stream, mimeType) {
	// the stream data is stored in this array
	let recordedChunks = [];

	const mediaRecorder = new MediaRecorder(stream);

	mediaRecorder.ondataavailable = function (e) {
		if (e.data.size > 0) {
			recordedChunks.push(e.data);
		}
	};
	mediaRecorder.onstop = function () {
		saveFile(recordedChunks);
		recordedChunks = [];
	};
	mediaRecorder.start(200); // For every 200ms the stream data will be stored in a separate chunk.
	return mediaRecorder;
}





function saveFile(recordedChunks) {

	const blob = new Blob(recordedChunks, {
		type: 'video/webm'
	});

	let filename = getFileName();
	downloadLink = URL.createObjectURL(blob);

	Messages.link = `<a href="${downloadLink}" download="${filename}">Download</a>`

	window.setTimeout(() => {
		URL.revokeObjectURL(blob); // clear from memory
		Messages.link = '';
	}, 5000);
}




function getFileName(){
	let date = new Date();
	let filename = ""
	
	filename += `${date.getFullYear()}`;

	if(date.getMonth() < 10){
		filename += `0${date.getMonth()}`;
	}else{
		filename += `${date.getMonth()}`;
	}

	if(date.getDate() < 10){
		filename += `0${date.getDate()}`;
	} else {
		filename += `${date.getDate()}`;
	}

	filename += '-';

	if(date.getHours() < 10){
		filename += `0${date.getHours()}`;
	} else {
		filename += `${date.getHours()}`;
	}

	if(date.getMinutes() < 10){
		filename += `0${date.getMinutes()}`;
	} else {
		filename += `${date.getMinutes()}`;
	}

	if(date.getSeconds() < 10){
		filename += `0${date.getSeconds()}`;
	} else {
		filename += `${date.getSeconds()}`;
	}

	return filename;
}