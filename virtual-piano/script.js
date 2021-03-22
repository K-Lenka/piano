const btnContainer = document.querySelector('.btn-container');
const btnNotes = document.querySelector('#notes');
const btnLetters = document.querySelector('#letters');
const piano = document.querySelector('.piano');
const pianoKeys = document.querySelectorAll('.piano-key');
const btnFullScreen = document.querySelector('#fullScreenBtn');





function playAudio(audio) {
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
}

btnContainer.addEventListener('click', (event) => {
    if (!event.target.classList.contains('btn-active')) {
        btnLetters.classList.toggle('btn-active');
        btnNotes.classList.toggle('btn-active');
        toggleActiveLettersClass();
    }
});

function toggleActiveLettersClass() {
    pianoKeys.forEach(element => element.classList.toggle('piano-key-letter'));
};

function toggleActiveClass(key) {
    ['piano-key-active', 'piano-key-active-pseudo', 'piano-key-remove-mouse'].forEach(element => key.classList.toggle(element));

};

btnFullScreen.addEventListener('click', toggleFullScreen);

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

piano.addEventListener('mousedown', (event) => {
    const key = event.target;
    if (key.classList.contains('piano-key')) {
        toggleActiveClass(key);
        const audio = document.querySelector(`audio[data-key = "Key${key.dataset.letter}"]`)
        playAudio(audio);
    }
});

piano.addEventListener('mouseup', (event) => {
    const key = event.target;
    if (key.classList.contains('piano-key')) {
        toggleActiveClass(key);
    }
});

pianoKeys.forEach((element) => {
    element.addEventListener('mouseover', (event) => {
        const key = event.target;
        if (event.buttons === 1 && key.classList.contains('piano-key')) {
            toggleActiveClass(key);
            const audio = document.querySelector(`audio[data-key = "Key${key.dataset.letter}"]`);
            playAudio(audio);
        }
    })
    element.addEventListener('mouseout', (event) => {
        const key = event.target;
        if (key.classList.contains('piano-key-active')) {
            toggleActiveClass(key);
        }
    })
})

window.addEventListener('keydown', (event) => {
    const key = document.querySelector(`div[data-key = "${event.code}"]`);
    if (!key.classList.contains('piano-key-active')) {
        toggleActiveClass(key);
        const audio = document.querySelector(`audio[data-key = "${event.code}"]`)
        playAudio(audio);
    }
});

window.addEventListener('keyup', (event) => {
    const key = document.querySelector(`div[data-key = "${event.code}"]`);
    toggleActiveClass(key);
})