using UnityEngine;

/// <summary>
/// Title screen script
/// </summary>
/// 

class changeScene : MonoBehaviour
{
	void OnGUI()
	{
		string level = "LivingRoom"; 
		if(Input.GetMouseButtonDown(0))
			Application.LoadLevel(level); 
		
	}
	
	
}
