song1= "";
song2= "";

leftWristX=0;
leftWristY=0;

rightWristX=0;
rightWristY=0;

score_leftWrist=0;
score_rightWrist=0;

song_status1="";
song_status2="";

function preload(){
    song1=loadSound("dua_lipa.mp3");
   song2=loadSound("post_malone.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function modelLoaded(){
    console.log("PoseNet is initialised!");
}

function draw(){
    image(video, 0, 0, 600, 500);

    song_status1=song1.isPlaying();
    song_status2=song2.isPlaying();

    fill('red');
    stroke('red');

    if(score_rightWrist>0.2){

        circle(rightWristX, rightWristY, 20);

        song2.stop();

        if(song_status1==false){

            song1.play();

            document.getElementById("song").innerHTML=="New Rules is playing";

        }
    }

    if(score_leftWrist>0.2){

        circle(leftWristX, leftWristY, 20);

        song1.stop();
    
        if(song_status2==false){
           song2.play();
           document.getElementById("song").innerHTML="Sunflower is playing";

        }
    }
}

function gotResults(results){
    if(results.length > 0){
        console.log(results);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left Wrist X : " + leftWristX + "left Wrist Y : " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right Wrist X : " + rightWristX + "right Wrist Y : " + rightWristY);
        
        score_leftWrist=results[0].pose.keypoints[9].score;
        console.log(score_leftWrist);

        score_rightWrist=results[0].pose.keypoints[10].score;
        console.log(score_rightWrist);

    }
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

