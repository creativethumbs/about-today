#pragma strict
 
public static var PowerupTimerActive : boolean;
private var startTime: int ; 
private var count : float = 45;
private var seconds : float = 10; 
private var millis : float = 99; 
public static var timeUp : boolean; 
var intro : GameObject; 

function Start () { 
	timeUp = false;
	PowerupTimerActive = false; 
}

function Update () { 
	if (intro.renderer.enabled && Time.timeSinceLevelLoad >= 4.0) {
		intro.renderer.enabled = false;
		TimerOn();
	}
	
	if(PowerupTimerActive){ 
      	count += Time.deltaTime; 
      	var minutes : int = count; 
      	
     	if(count >= 60){
 		   guiText.text = "12:00";
           TimerOff();
      	}
      	else { 
      		var hour = (minutes == 60 ? 12 : 11); 
      		minutes = (minutes == 60 ? 0 : minutes); 
      		guiText.text = String.Format (hour + ":{0:00}", minutes);
      	}
   } 
}

function TimerOn(){
	timeUp = false;
    PowerupTimerActive = true; 
 
}

function TimerOff(){
	timeUp = true;
    PowerupTimerActive = false; 
    count = startTime; 
 
}
 
