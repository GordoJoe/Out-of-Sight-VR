#pragma strict

var menu_atual : int = 1;	
var img_fundo : Texture2D;	
var img_creditos : Texture2D;
var img_ajuda : Texture2D;
var img_borda : Texture2D;
var Skin_Menu : GUISkin;
var Style_Menu : GUIStyle;
var Musica : AudioSource;
var Som : AudioSource;
var Filme : MovieTexture;
var Filme2 : AudioSource;

function Start () {

}

function Update () {
    menu_atual = 4;
}

function OnGUI () {

	GUI.skin = Skin_Menu;
			
	var posx : int;
	var posy : int;
	var posVx : int;
	var posVy : int;
	var tamx : int;
	var tamy : int;
	
	tamx = Screen.width * 0.13;
	tamy = Screen.height * 0.1;
	
	posx = Screen.width /7;
	posy = Screen.height/1.2 - tamy / 2;
	
	Style_Menu.fontSize = 0.015 * (Screen.width + Screen.height);
			
	if (menu_atual == 1) {
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), img_fundo);
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Jogar", Style_Menu)) {
			
			Som.Play();
			Application.LoadLevel("Capitulo 1");
		
		}
		posx += Screen.width /7;
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Ajuda", Style_Menu)) {
		
			Som.Play();
			menu_atual = 2;
			
		}
		posx += Screen.width /7;
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Creditos", Style_Menu)) {
		
			Som.Play();
			menu_atual = 3;
		
		}
		posx += Screen.width /7;
		if (GUI.Button(Rect(posx,posy,tamx,tamy), ("Animacao"), Style_Menu)) {
			
			Som.Play();
			menu_atual = 4;
		}
		posx += Screen.width /7;
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
		
			Som.Play();
			Application.Quit();	
		}
	}
	if (menu_atual == 2) {
		
		posVx = 6 * Screen.width/7;
		posVy = 6 * Screen.height / 7;
		
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), img_ajuda);
	
		if (GUI.Button(Rect(posVx,posVy,tamx,tamy), "Voltar", Style_Menu)) {
		
			menu_atual = 1;
		}
	
	}
	
	if (menu_atual == 3) {
		
		posVx = 6 * Screen.width/7;
		posVy = 6 * Screen.height / 7;
		
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), img_creditos);
	
		if (GUI.Button(Rect(posVx,posVy,tamx,tamy), "Voltar", Style_Menu)) {
		
			menu_atual = 1;
		}
	}
	
	if (menu_atual == 4) {
		
		posVx = 6 * Screen.width/7;
		posVy = 6 * Screen.height / 7;
		
		GUI.DrawTexture(Rect(0,0,Screen.width, Screen.height), img_fundo);
		
		GUI.DrawTexture(Rect(0.8 * Screen.width/4, 0.8 * Screen.height/4, 1.2 * Screen.width/2, 1.2 * Screen.height/2), img_borda);
				
		GUI.DrawTexture(Rect(Screen.width/4, Screen.height/4, Screen.width/2, Screen.height/2), Filme);
		
		Musica.volume = 0.1;
		Filme.Play();
		Filme2.enabled = true;		
		
		if (GUI.Button(Rect(posVx,posVy,tamx,tamy), "Voltar", Style_Menu)) {
			
			Filme.Stop();
			Filme2.enabled = false;
			Musica.volume = 1;
			menu_atual = 1;
		}
	
	}
	
	

}








