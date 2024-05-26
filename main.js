song = "";
status1="";
object=[];
function preload(){
    song = loadSound("alert.mp3");
}

function setup(){
    canvas = createCanvas(480,380)
    canvas.center();
    video=createCapture(VIDEO)
    video.size(380,380)
    vide.hide()
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded!")
    status1= true;
}
function gotResult(error, results){
if (error) {
    console.log(error);
}
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0, 480, 380);
    if(status1 !="")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector, detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML ="status: object detected are: " + objects.lenght;
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are:" + objects.length;
            fill("#FF0000");
            percent = floor(object[i].confidence*1000);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects.y + 15);
            noFill();
            stroke("#FF0000");   
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == "person")
{
    document.getElementById("number_of_objects").innerHTML = "Baby Found";
    console.log("stop");
    song.stop();
}
else
{
    document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
    console.log("play");
    song.play();
}
    }
    if(objects.lenght ==0){
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        console.log("play");
        song.play();
    }
}

}
