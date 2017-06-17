#pragma strict
var cc : CharacterController;
var costas : GameObject;
var Olho : GameObject;
var Player : GameObject;
var cameraInicial : GameObject;
var camerajogo : GameObject;
var forca : Vector3;		
var velocidade : float = 5;		
var distancia : float;

function Start () {
	
	cc = GetComponent(CharacterController);
	costas = GameObject.Find("Costas");
	Olho = GameObject.Find("Olho");
	cameraInicial = GameObject.Find("Camera Inicial");
	camerajogo = GameObject.Find("Camera");
}

function Update () {
	
	transform.LookAt(costas.transform.position);
	
	forca = Vector3(0,0,velocidade) * Time.deltaTime;
	
	forca = transform.TransformDirection(forca);
	
	distancia = Vector3.Distance(transform.position, costas.transform.position);
	
	if(distancia <= 0.5){
		cameraInicial.gameObject.SetActive(false);	
		enabled = false;
	}
	
	cc.Move(forca);
	
}