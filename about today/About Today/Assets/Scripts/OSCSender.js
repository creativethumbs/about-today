
public var RemoteIP : String = "192.168.1.117"; 
public var SendToPort : int = 9000; //the port you will be sending from
public var ListenerPort : int = 8000; //the port you will be listening on
//public var controller : Transform;
//public var character = "girl"; //the tag of the object on stage that you want to manipulate
//public var situation = "";
private var handler : Osc;

private var friendliness : float; 
private var smile : float;
private var laugh = [false, false, false, false, false]; 
private var screaming : boolean; 
private var crying : boolean; 
private var compassion : float;
private var praise : float;
private var humor : float;
private var agreeability : float;
private var bragging : float;
private var sarcasm : float;
public static var output : String;

private var gameEnd : boolean = false; 

//var OldResultsScript : OldResultsScript; 
 
public function Start() {

	var udp : UDPPacketIO = GetComponent("UDPPacketIO");
	udp.init(RemoteIP, SendToPort, ListenerPort);
	handler = GetComponent("Osc");
	handler.init(udp);
	handler.SetAllMessageHandler(AllMessageHandler);
	
	if (Application.loadedLevelName != "Date") {
		print("WHAT");
		var oscM = Osc.StringToOscMessage("/2");
        handler.Send(oscM);
	}

}
Debug.Log("Running");

function Update () {

}



public function AllMessageHandler(oscMessage: OscMessage){

	var msgString = Osc.OscMessageToString(oscMessage); //the message and value combined
	var msgAddress = oscMessage.Address; //the message parameters
	var msgValue = oscMessage.Values[0]; //the message value
	Debug.Log(msgString); //log the message and values coming from OSC

	//FUNCTIONS YOU WANT CALLED WHEN A SPECIFIC MESSAGE IS RECEIVED
	switch (msgAddress){
		default:
			break;
	}


}


