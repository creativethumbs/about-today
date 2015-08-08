#pragma strict
private var howtoscreen : GameObject;
private var close : GameObject;
function Start() {
	howtoscreen = GameObject.Find("tutorial");
	close = GameObject.Find("close");

}

function OnMouseDown(){
    howtoscreen.renderer.enabled = false;
    close.renderer.enabled = false;
 }