class Timer {
    constructor(durationInput, startButton, pauseButton, stopButton, callbacks) {
        this.durationInput = durationInput;
        this.startButton = startButton;
        this.pauseButton = pauseButton;
        this.stopButton = stopButton;
        this.startingVal = this.durationInput.value;
        this.state = 0;

        if (callbacks) {
            this.onStart = callbacks.onStart;
            this.onTick = callbacks.onTick;
            this.onRestart = callbacks.onRestart;
            this.onComplete = callbacks.onComplete;
        }

        this.startButton.addEventListener('click', () => {
            if (this.state === 0) {
                this.start();
                this.state = 1;
            }
            else if (this.state === 2) {
                //If the input is changed on resume: restart the timer
                if (this.durationInput.value != this.timeRemaining) {
                    this.restart();
                }
                //Else resume the timer
                else {
                    this.resume();
                    this.state = 3;
                }
            }
        });

        this.stopButton.addEventListener("click", () => {
            this.restart();
          });

        this.pauseButton.addEventListener('click', () => {
            if (this.timeRemaining > 0) {
                this.pause();
                this.state = 2;
            }
        });

        this.durationInput.addEventListener("change", () => {
            this.pause();
            this.startingVal = this.durationInput.value;
            this.restart();
        });
    }

    start = () => {
        if (this.onStart) {
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.interval = setInterval(this.tick, 50);
    };

    pause = () => {
        clearInterval(this.interval);
    };

    resume() {
        this.tick();
        this.interval = setInterval(this.tick, 50);
    };

    restart() {
        if (this.onRestart) {
            this.onRestart();
          }
        this.state = 0;
        clearInterval(this.interval);
        this.durationInput.value = this.startingVal;
    };

    tick = () => {
        if (this.timeRemaining <= 0) {
            this.pause();
            if (this.onComplete) {
                this.onComplete();
            }
        } else {
            this.timeRemaining -= .05;
            if (this.onTick) {
                this.onTick(this.timeRemaining);
            };
        }
    };

    get timeRemaining() {
        return parseFloat(this.durationInput.value);
    };

    set timeRemaining(time) {
        this.durationInput.value = time.toFixed(2);
    };

}