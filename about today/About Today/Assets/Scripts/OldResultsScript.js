#pragma strict

public static var friendliness : float; 
public static var smile : float;
public static var laugh = [false, false, false, false, false]; 
public static var screaming : boolean; 
public static var crying : boolean; 
public static var compassion : float;
public static var praise : float;
public static var humor : float;
public static var agreeability : float;
public static var bragging : float;
public static var sarcasm : float;
public static var output : String;
public static var situation = [false,false,false,false,false]; 

// Make this game object and all its transform children
// survive when loading a new scene.
function Awake () {
	DontDestroyOnLoad (transform.gameObject); 
}
