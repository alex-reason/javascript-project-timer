//---------------------------------//
const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const stopButton = document.querySelector('#stop');

    // animating the timer circle
const circle = document.querySelector('circle');
const circlePerimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', circlePerimeter);
let currentOffset = 0;
let duration;

const restartCircle = () =>{
    circle.setAttribute("stroke-dasharray", circlePerimeter);
    circle.setAttribute("stroke-dashoffset", 0);
};
    // timer
const timer = new Timer(durationInput, startButton, pauseButton, stopButton,
    {
        onStart(totalDuration) {
            duration = totalDuration;
        },
        onTick(timeRemaining){
            circle.setAttribute('stroke-dashoffset', 
            circlePerimeter * timeRemaining / duration - circlePerimeter);
        },
        onComplete(){
            restartCircle();
            console.log('Timer completed');
        },
        onRestart(){
            restartCircle();
        }
    }
);

