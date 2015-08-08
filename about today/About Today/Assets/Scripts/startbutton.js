#pragma strict
 
function OnMouseDown(){
    var fadeScript : screenFade = GetComponent(screenFade);  
	fadeScript.sceneEnding = true;
 }