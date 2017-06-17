#pragma strict
var player : GameObject;
var altura : float = 2;
var distancia : float = -5;
var angulo_ajuste : float;
var observer : GameObject;

function Start () {

	player = GameObject.Find("Player");
	observer = GameObject.Find("Observer");
}
function Update () {
	
	angulo_ajuste += Input.GetAxis("Mouse X");
	
	//angulo do player
	var angulo : float;
	angulo = player.transform.eulerAngles.y + angulo_ajuste;
	angulo = angulo * Mathf.Deg2Rad; //converte o angulo para radianos
	
	transform.position.x = player.transform.position.x + distancia * Mathf.Sin(angulo);
	transform.position.y = player.transform.position.y + altura;
	transform.position.z = player.transform.position.z + distancia * Mathf.Cos(angulo);
	
	
	//transform.position = observer.transform.position;
	
	transform.LookAt(player.transform.position);

	
	distancia += Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime * 150;
	
	if(distancia > -3){
		distancia = -3;
	}
	if(distancia < -10){
		distancia = -10;
	}
	
}