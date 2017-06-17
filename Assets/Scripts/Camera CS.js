#pragma strict
var player : GameObject;

function Start () {

	player = GameObject.Find("Olho");
}
function Update () {
	
		transform.LookAt(player.transform.position);
}