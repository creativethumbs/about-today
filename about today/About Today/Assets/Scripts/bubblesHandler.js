#pragma strict

private var dadbubble : GameObject; 
private var mybubble : GameObject; 
private var continuebubble : GameObject; 
private var speech : GameObject; 
var popSound : AudioClip; 
var BubblePrefab : Transform; 
var MouthPrefab : Transform; 
var music : GameObject;

function Start () {
	dadbubble = GameObject.Find ("dadbubble");  
	mybubble = GameObject.Find ("gloomyrect"); 
	continuebubble = GameObject.Find ("continue"); 
	Instantiate(music);
	//mybubble.renderer.enabled = false;
}

function Update () {
	//print(Time.timeSinceLevelLoad);
	if(!continuebubble.renderer.enabled && Time.timeSinceLevelLoad > 12.0) {  
		continuebubble.renderer.enabled = true; 
	} 
	else if(!mybubble.renderer.enabled && Time.timeSinceLevelLoad > 7.0) {  
		mybubble.renderer.enabled = true;
		Instantiate(BubblePrefab); 
		Instantiate(MouthPrefab); 
	} 
	else if(dadbubble.renderer.enabled && Time.timeSinceLevelLoad > 6.0) { 
		dadbubble.renderer.enabled = false;
	} 
	else if(!dadbubble.renderer.enabled && 3.0 < Time.timeSinceLevelLoad && Time.timeSinceLevelLoad < 6.0) { 
		dadbubble.renderer.enabled = true;
		audio.PlayOneShot(popSound); 
	}  
}