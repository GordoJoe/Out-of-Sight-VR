#pragma strict

var particula : ParticleSystem;  

function Start () {
	particula = GetComponent(ParticleSystem);
}

function Update () {
	particula.randomSeed = 0;
}