#pragma strict
var cc : CharacterController;
var forca : Vector3;		
var forca_convertida : Vector3;	
var gravidade : float = 9;
var velocidade : float = 5;		
var velocidade_atual : float;
var nView : NetworkView;

function Start () {
		cc = GetComponent(CharacterController);
		nView = GetComponent.<NetworkView>();
}

function Update () {
	if(nView.isMine){		
		velocidade_atual = cc.velocity.magnitude;
		transform.eulerAngles.y += Input.GetAxis("Mouse X");
		forca.x = Input.GetAxis("Horizontal") * velocidade * Time.deltaTime;
		forca.z = Input.GetAxis("Vertical") * velocidade * Time.deltaTime;
		forca.y -= gravidade * Time.deltaTime;
		forca_convertida = transform.TransformDirection(forca);
		cc.Move(forca_convertida);
		
	}
	else{
		enabled = false;
	}
}