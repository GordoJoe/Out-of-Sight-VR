#pragma strict

var Particula : ParticleSystem;

function Start () {

}

function Update () {
	
	if(Input.GetMouseButton(0)){
		
		if(transform.localScale.x < 0.5){
			transform.localScale.x += 0.2 * Time.deltaTime;
		}
		if(transform.localScale.y < 0.3){
			transform.localScale.y += 0.2 * Time.deltaTime;
		}
		if(transform.localScale.z < 0.5){
			transform.localScale.z += 0.2 * Time.deltaTime;
		}						
	}
	else {
				
		if(transform.localScale.x > 0.01){
			transform.localScale.x -= 0.085 * Time.deltaTime;
		}
		if(transform.localScale.y > 0.01){
			transform.localScale.y -= 0.085 * Time.deltaTime;
		}
		if(transform.localScale.z > 0.01){
			transform.localScale.z -= 0.085 * Time.deltaTime;
		}
	
	}
	
	if(transform.localScale.x > 0.01){
			Particula.emissionRate = 10000 * transform.localScale.x;
		}
	else {
			Particula.emissionRate = 0;
	}
	
}

function OnTriggerEnter(colisao : Collider){
	
	var nome : String;
		
	nome = colisao.gameObject.name;
		
		
	if (colisao.gameObject.tag == "Modelo"){
		colisao.gameObject.GetComponent.<Renderer>().enabled = true;
	}
	if (colisao.gameObject.tag == "Particulas"){
		colisao.GetComponent.<ParticleSystem>().Stop();
	}
	if (colisao.gameObject.tag == "Particulas_Modelo"){
		colisao.gameObject.GetComponent.<ParticleSystem>().Play();
	}
	if (colisao.gameObject.tag == "Rua"){
		colisao.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	
}

function OnTriggerExit(colisao : Collider){
	
	var nome : String;
		
	if (colisao.gameObject.tag == "Modelo"){
		colisao.gameObject.GetComponent.<Renderer>().enabled = false;
	}
	if (colisao.gameObject.tag == "Particulas" ){
		colisao.gameObject.GetComponent.<ParticleSystem>().Play();
	}
	if (colisao.gameObject.tag == "Particulas_Modelo"){
		colisao.gameObject.GetComponent.<ParticleSystem>().Stop();
	}
	if (colisao.gameObject.tag == "Rua"){
		colisao.gameObject.GetComponent.<Renderer>().enabled = true;
	}
}