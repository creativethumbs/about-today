#pragma strict
var music : GameObject;
function Start () {
	if (GameObject.FindGameObjectsWithTag("old").Length > 1) {
		Destroy(GameObject.FindGameObjectsWithTag("old")[0]);
	}
	if (GameObject.Find("musicPrefab(Clone)") == null) {
		Instantiate(music);
	}
}

