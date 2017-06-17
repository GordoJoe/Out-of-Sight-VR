#pragma strict

	var mat1 : Material;
	var mat2 : Material;
	
function Start () {

}

function Update () {
	
}

function OnTriggerStay(colisao : Collider){
	
	var nome : String;
	
	nome = colisao.gameObject.name;
	
	if (colisao.gameObject.tag == "Parede" ){
		colisao.gameObject.GetComponent.<Renderer>().material = mat1;
	}
}

function OnTriggerExit(colisao : Collider){
	
	var nome : String;
	
	if (colisao.gameObject.tag == "Parede" ){
		colisao.gameObject.GetComponent.<Renderer>().material = mat2;
	}
}