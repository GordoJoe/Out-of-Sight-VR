#pragma strict

var cc : CharacterController;
var forca : Vector3;		
var forca_convertida : Vector3;	
var velocidade : float = 5;		
var gravidade : float = 9;
var no_chao : boolean;			
var anima : Animator;	
var velocidade_atual : float;
var magia : boolean;
var aux_observer : int;
var cameraInicial : GameObject;
var aux_pause : boolean;
var aux_pauseMenu : boolean;
var aux_go : boolean;
var aux_incrivel : boolean;
var Skin_Menu : GUISkin;
var Style_Menu : GUIStyle;
var Som : AudioSource;
var img_pause : Texture2D;
var img_go : Texture2D;
var img_incrivel : Texture2D;
var img_borda : Texture2D;
var img_parabens : Texture2D;
var img_feriu : Texture2D;

function Start () {

		cc = GetComponent(CharacterController);
		anima = GetComponentInChildren(Animator);
		magia = true;
		aux_observer = 1;
		cameraInicial = GameObject.Find("Camera Inicial");
		anima.SetTrigger("Magia");
		aux_pause = false;
		aux_pauseMenu = false;
		aux_incrivel = false;
		aux_go = false;
		Cursor.visible = false;
}

function Update () {
	
	if(Input.GetKeyUp("escape")){
	
			if(!aux_pauseMenu){
			
				aux_pause = true;
				aux_pauseMenu = true;
				Time.timeScale = 0;
								
									
			}
			else{
			
				aux_pause = false;
				aux_pauseMenu = false;
				Cursor.visible = false;
				Time.timeScale = 1;
				
			}
	
	}	
	
	if(aux_observer == 1 && !cameraInicial.gameObject.activeInHierarchy){
		anima.SetTrigger("Para");
		magia = false;
		aux_observer = 0;		
	}
	
	velocidade_atual = cc.velocity.magnitude;
	
	anima.SetFloat("Velocidade", velocidade_atual);
	
	if (!magia && !aux_pause)
	{
		forca.x = Input.GetAxis("Horizontal") * velocidade * Time.deltaTime;
		forca.z = Input.GetAxis("Vertical") * velocidade * Time.deltaTime;
	}
	
	if (Input.GetMouseButtonDown(0) && aux_observer == 0){
	
		magia = true;
		anima.SetTrigger("Magia");
	}
	
	if (Input.GetMouseButtonUp(0) && aux_observer == 0){
	
		anima.SetTrigger("Para");
		magia = false;
	}
			
	if (!no_chao) {
		forca.y -= gravidade * Time.deltaTime;
	}
	else {
		forca.y = -1 * Time.deltaTime;
	}
	
	if (!magia && !aux_pause)
	{
		transform.eulerAngles.y += Input.GetAxis("Mouse X"); 
	}
	forca_convertida = transform.TransformDirection(forca);
	
	if(!magia && !aux_pause){
	
		cc.Move(forca_convertida);
	}
	if (cc.isGrounded) {
		no_chao = true;
	}
	else {
		no_chao = false;
	}
}
function OnControllerColliderHit(colisao : ControllerColliderHit) {

	var nome : String;
	nome = colisao.gameObject.name;	
	if(colisao.gameObject.tag == "Obras" || colisao.gameObject.tag == "Buraco" || colisao.gameObject.tag == "Rua" || colisao.gameObject.tag == "Arame" || colisao.gameObject.tag == "Incendio"){
		aux_go = true;
	}
	if(nome == "Cap1"){
		Application.LoadLevel("Capitulo 2");
	}
	if(nome == "Cap2"){
		Application.LoadLevel("Capitulo 3");
	}
	if(nome == "Cap3"){
		Application.LoadLevel("Capitulo 4");
	}
	if(nome == "Cap4"){
		Application.LoadLevel("Capitulo 5");
	}
	if(nome == "Cap5"){
		aux_incrivel = true;
	}
}

function OnGUI () {
	
	var posx : int;
	var posy : int;
	var posVx : int;
	var posVy : int;
	var tamx : int;
	var tamy : int;
	
	if(aux_pauseMenu){
	
		aux_pause = true;
		
		Cursor.visible = true;
		
		GUI.skin = Skin_Menu;
					
		tamx = Screen.width * 0.13;
		tamy = Screen.height * 0.1;
				
		posx = Screen.width /7;
		posy = Screen.height/1.2 - tamy / 2;
		Style_Menu.fontSize = 0.015 * (Screen.width + Screen.height);
		
		GUI.DrawTexture(Rect(Screen.width/3, Screen.height/10, Screen.width/3, Screen.height/10), img_pause);
						
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Resumir", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_pauseMenu = false;
			Cursor.visible = false;
			Time.timeScale = 1;
		}
		
		posx += Screen.width /7;
		posx += Screen.width /7;
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_pauseMenu = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}
		
		posx += Screen.width /7;
		posx += Screen.width /7;
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
	
	if(aux_go){
		
		Time.timeScale = 0;
		
		Cursor.visible = true;
		
		aux_pause = true;
		
		GUI.skin = Skin_Menu;
						
		tamx = Screen.width * 0.13;
		tamy = Screen.height * 0.1;
				
		posx = Screen.width /7;
		posy = Screen.height/1.2 - tamy / 2;
		Style_Menu.fontSize = 0.03 * (Screen.width + Screen.height);
		
		GUI.DrawTexture(Rect(Screen.width/3, Screen.height/10, Screen.width/3, Screen.height/10), img_go);
		
		GUI.DrawTexture(Rect(Screen.width/3, Screen.height/3, Screen.width/3, Screen.height/3), img_feriu);
		
		Style_Menu.fontSize = 0.015 * (Screen.width + Screen.height);
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Reiniciar", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_go = false;
			Cursor.visible = false;
			Time.timeScale = 1;
			Application.LoadLevel(Application.loadedLevel);
		}
		
		posx += Screen.width /7;
		posx += Screen.width /7;
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_go = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}
		
		posx += Screen.width /7;
		posx += Screen.width /7;
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
	
	if(aux_incrivel){
		
		Time.timeScale = 0;
		
		Cursor.visible = true;
				
		aux_pause = true;
		
		GUI.skin = Skin_Menu;
						
		tamx = Screen.width * 0.13;
		tamy = Screen.height * 0.1;
				
		posx = Screen.width /7;
		posy = Screen.height/1.2 - tamy / 2;
		
		Style_Menu.fontSize = 0.03 * (Screen.width + Screen.height);
		
		GUI.DrawTexture(Rect(Screen.width/3, Screen.height/10, Screen.width/3, Screen.height/10), img_incrivel);
		
		GUI.DrawTexture(Rect(Screen.width/3, Screen.height/3, Screen.width/3, Screen.height/3), img_parabens);
		
		Style_Menu.fontSize = 0.015 * (Screen.width + Screen.height);
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_incrivel = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}
		
		posx += Screen.width /7;
		posx += Screen.width /7;
		posx += Screen.width /7;
		
		if (GUI.Button(Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
}



