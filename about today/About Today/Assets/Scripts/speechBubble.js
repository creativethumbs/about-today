#pragma strict

var customGuiStyle : GUIStyle;
private var output : String; 
var popSound : AudioClip; 
private var currwidth : float;
private var currheight : float;

function Start () { 
	currwidth = Screen.currentResolution.width;
	currheight = Screen.currentResolution.height; 
	var OSCscript : OSCReceiver = GetComponent(OSCReceiver); 
	output = OSCscript.output; 
	audio.PlayOneShot(popSound);  
	
}

function OnGUI() { 
	customGuiStyle.normal.textColor = Color.white; 
	GUI.Box(Rect(currwidth/12,currheight/6,600,250), output, customGuiStyle);

}
