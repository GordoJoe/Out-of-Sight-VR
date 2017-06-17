#pragma strict

var img_fundo : Texture2D;	
var Skin_Menu : GUISkin;
var Style_Menu : GUIStyle;
var Som : AudioSource;
var tuto : boolean;

function Start () {
	tuto = true;
	Time.timeScale = 0;
}

function Update () {

}

function OnGUI () {

	if (tuto){
		Cursor.visible = true;
		GUI.skin = Skin_Menu;
				
		var posx : int;
		var posy : int;
		var tamx : int;
		var tamy : int;
		
		tamx = Screen.width * 0.2;
		tamy = Screen.height * 0.2;
		
		posx = Screen.width /2 - tamx / 2;
		posy = Screen.height/1.2 - tamy / 2;
		
		Style_Menu.fontSize = 0.05 * (Screen.width + Screen.height);
				
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), img_fundo);
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "OK", Style_Menu)) {
				
			Som.Play();
			Cursor.visible = false;			
			Time.timeScale = 1;
			tuto = false;
		}
	}
}








