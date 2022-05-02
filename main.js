song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;
function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#57A639");
    stroke("#2A6478");

    if(scoreRightWrist > 0.2)
    {
    circle(rightWristX, rightWristY, 20);
    if(rightWristY > 0 && rightWristY <= 100)
    {
    document.getElementById("speed").innerHTML = "speed = 0.5x";
    song.rate(0.5);
    }
   
    if(rightWristY > 100 && rightWristY <= 200)
    {
    document.getElementById("speed").innerHTML = "speed = 1px";
    song.rate(1);
    }

    if(rightWristY > 200 && rightWristY <= 300)
    {
    document.getElementById("speed").innerHTML = "speed = 1.5px";
    song.rate(1.5);
    }

    if(rightWristY > 300 && rightWristY <= 400)
    {
    document.getElementById("speed").innerHTML = "speed = 2.0px";
    song.rate(2);
    }

    if(rightWristY > 400 && rightWristY <= 500)
    {
    document.getElementById("speed").innerHTML = "speed = 2.5px";
    song.rate(2.5);
    }

    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals / 500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function stop() {
    song.stop();
}

function pause() {
    song.pause();
}