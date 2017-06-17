using UnityEngine;
using System.Collections;
using System.Collections.Generic;
using System;
using Leap;

public class MovLeap : MonoBehaviour {
	Controller controller;

	public GameObject Pedra1;
	public GameObject Pedra2;
    public Vector3 forca;
    public CharacterController  cc;
    public GameObject Rift;
    public Vector3 forca_convertida;	
    public float velocidade;		
    public float gravidade;
    public bool no_chao;			
    public Animator anima;	
    public float velocidade_atual;
    public bool magia;
    public int aux_observer;
    public GameObject cameraInicial;
    public bool aux_pause;
    public bool aux_pauseMenu;
    public bool aux_go;
    public bool aux_incrivel;
    public GUISkin Skin_Menu;
    public GUIStyle Style_Menu;
    public AudioSource Som;
    public Texture2D img_pause;
    public Texture2D img_go;
    public Texture2D img_incrivel;
    public Texture2D img_borda;
    public Texture2D img_parabens;
    public Texture2D img_feriu;
    
    public int Vel;

    public float InitialYRotation = 0.0f;

    void Start () {
        velocidade = 5;
        Vel = 0;
        gravidade = 9;
		forca.z = 0;
        InitialYRotation = 0.0f;
        cc = GetComponent<CharacterController>();
        //anima = GetComponentInChildren<Animator>();
        magia = false;
        //// anima.SetTrigger("Magia");
        aux_pause = false;
        aux_pauseMenu = false;
        aux_incrivel = false;
        aux_go = false;
        Cursor.visible = false;
		controller = new Controller ();
        controller.EnableGesture(Gesture.GestureType.TYPESWIPE);
        controller.EnableGesture(Gesture.GestureType.TYPECIRCLE);
		//configuraçao da velocidade e distancia(sepa n precisa)
		controller.Config.SetFloat("Gesture.Swipe.MinLength", 20.0f);
		controller.Config.SetFloat("Gesture.Swipe.MinVelocity", 200f);
		controller.Config.Save ();

        

    }
    
    

    void Update () {

        Frame frame = controller.Frame();
        GestureList gestures = frame.Gestures();
		
        Rift = GameObject.Find("Camera (eye)");
        velocidade_atual = cc.velocity.magnitude;
        Quaternion quat = Rift.transform.localRotation;

        // anima.SetFloat("Velocidade", velocidade_atual);

        //forca_convertida = transform.TransformDirection(forca);

        
        Vector3 quatEuler = quat.eulerAngles;
        quatEuler.z = quatEuler.x = 0f;
        //quatEuler.y *= Mathf.Rad2Deg;
        quat = Quaternion.Euler(quatEuler);

        this.transform.rotation = quat;
        

        if (!magia)
        {

          //  cc.Move(forca_convertida);
        }
        if (Input.GetKeyUp("escape"))
        {

            if (!aux_pauseMenu)
            {

                aux_pause = true;
                aux_pauseMenu = true;
                Time.timeScale = 0;


            }
            else
            {

                aux_pause = false;
                aux_pauseMenu = false;
                Cursor.visible = false;
                Time.timeScale = 1;

            }

        }



        if (aux_observer == 1 && !cameraInicial.gameObject.activeInHierarchy)
        {
            // anima.SetTrigger("Para");
            magia = false;
            aux_observer = 0;
        }

        velocidade_atual = cc.velocity.magnitude;

        // anima.SetFloat("Velocidade", velocidade_atual);

        for (int i = 0; i < gestures.Count; i++)
        {
            Gesture gesture = gestures[i];
            if (gesture.Type == Gesture.GestureType.TYPECIRCLE)
            {

                magia = true;
                //// anima.SetTrigger("Magia");

            }
            else
            {
                // anima.SetTrigger("Para");
                magia = false;
            }
        }
        

           for (int i = 0; i < gestures.Count; i++)
            {
                Gesture gesture_MOV = gestures[i];
                if (gesture_MOV.Type == Gesture.GestureType.TYPESWIPE)
                {
                    SwipeGesture Swipe = new SwipeGesture(gesture_MOV);
                    Vector swipeDirection = Swipe.Direction;
                    if (!magia && !aux_pause)
                    {
                        //forca.x = swipeDirection.x * velocidade * Time.deltaTime;
                        if (swipeDirection.z != 0)
                        {
                            forca.z = 1 * velocidade * Time.deltaTime;
                        }

                    }

                }
                
            }
       
        if (Input.GetMouseButtonDown(0) && aux_observer == 0)
        {

            magia = true;
            // anima.SetTrigger("Magia");
        }

        if (Input.GetMouseButtonUp(0) && aux_observer == 0)
        {

            // anima.SetTrigger("Para");
            magia = false;
        }

        if (Input.GetKey(KeyCode.W))
        {
            forca.z = 1 * velocidade * Time.deltaTime;
        }

        if (!no_chao)
        {
            forca.y -= gravidade * Time.deltaTime;
        }
        else
        {
            forca.y = -1 * Time.deltaTime;
        }

        forca_convertida = transform.TransformDirection(forca);

        if (!magia && !aux_pause)
        {

            cc.Move(forca_convertida);
            
        }
        if (cc.isGrounded)
        {
            no_chao = true;
        }
        else
        {
            no_chao = false;
        }
        if (forca.z > 0)
        {
            forca.z -= 0.04f;
        }
        else
        {
            forca.z = 0;
        }
	}

    void OnControllerColliderHit(ControllerColliderHit colisao) {

    string nome;
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

void OnGUI () {

    float posx;
    float posy;
    float tamx;
    float tamy;


	if(aux_pauseMenu){
	
		aux_pause = true;
		
		Cursor.visible = true;
		
		GUI.skin = Skin_Menu;

        tamx = UnityEngine.Screen.width * 0.13f;
        tamy = UnityEngine.Screen.height * 0.1f;
        
        posx = UnityEngine.Screen.width / 7f;
        posy = UnityEngine.Screen.height / 1.2f - tamy / 2f;
        Style_Menu.fontSize = (int)(0.015 * (UnityEngine.Screen.width + UnityEngine.Screen.height));

        GUI.DrawTexture(new Rect(UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10, UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10), img_pause);
						
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Resumir", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_pauseMenu = false;
			Cursor.visible = false;
			Time.timeScale = 1;
		}

        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_pauseMenu = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}

        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
	
	if(aux_go){
		
		Time.timeScale = 0;
		
		Cursor.visible = true;
		
		aux_pause = true;
		
		GUI.skin = Skin_Menu;

        tamx = UnityEngine.Screen.width * 0.13f;
        tamy = UnityEngine.Screen.height * 0.1f;

        posx = UnityEngine.Screen.width / 7f;
        posy = UnityEngine.Screen.height / 1.2f - tamy / 2f;
        Style_Menu.fontSize = (int)(0.03 * (UnityEngine.Screen.width + UnityEngine.Screen.height));

        GUI.DrawTexture(new Rect(UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10, UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10), img_go);

        GUI.DrawTexture(new Rect(UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 3, UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 3), img_feriu);

        Style_Menu.fontSize = (int)(0.015 * (UnityEngine.Screen.width + UnityEngine.Screen.height));
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Reiniciar", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_go = false;
			Cursor.visible = false;
			Time.timeScale = 1;
			Application.LoadLevel(Application.loadedLevel);
		}

        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_go = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}

        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
	
	if(aux_incrivel){
		
		Time.timeScale = 0;
		
		Cursor.visible = true;
				
		aux_pause = true;
		
		GUI.skin = Skin_Menu;

        tamx = UnityEngine.Screen.width * 0.13f;
        tamy = UnityEngine.Screen.height * 0.1f;

        posx = UnityEngine.Screen.width / 7f;
        posy = UnityEngine.Screen.height / 1.2f - tamy / 2f;

        Style_Menu.fontSize = (int)(0.03 * (UnityEngine.Screen.width + UnityEngine.Screen.height));

        GUI.DrawTexture(new Rect(UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10, UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 10), img_incrivel);

        GUI.DrawTexture(new Rect(UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 3, UnityEngine.Screen.width / 3, UnityEngine.Screen.height / 3), img_parabens);

        Style_Menu.fontSize = (int)(0.015 * (UnityEngine.Screen.width + UnityEngine.Screen.height));
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Menu", Style_Menu)) {
			Som.Play();
			aux_pause = false;
			aux_incrivel = false;
			Time.timeScale = 1;
			Application.LoadLevel("Menu");
		}

        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
        posx += UnityEngine.Screen.width / 7;
		
		if (GUI.Button(new Rect(posx,posy,tamx,tamy), "Sair", Style_Menu)) {
			Som.Play();
			Application.Quit();
		}
	}
}




}
