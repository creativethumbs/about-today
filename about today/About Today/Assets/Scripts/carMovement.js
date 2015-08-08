#pragma strict
private var deltay : float = 0; 
function Start () {

}

function Update () {
	var timerScript : Timer = GetComponent(Timer); 
	
	if(timerScript.PowerupTimerActive) {
		if(transform.position.x < -0.47) {
			transform.position = Vector2(transform.position.x - 0.1, transform.position.y - 0.05 + Mathf.Sin(deltay)*0.02);
		}
		else {
			transform.position = Vector2(transform.position.x - 0.1, transform.position.y + Mathf.Sin(deltay)*0.02);
		}
		deltay += 0.6;
		
		if(transform.position.y < -11) {
			Destroy(gameObject); 
		}
	}
}