using UnityEngine;
using System.Collections;
using Leap;

public class ImgLeap : MonoBehaviour
{

   Controller controller;

   public ParticleSystem Particula;

   public Collider colisao;

    // Use this for initialization
    void Start()
    {
		controller = new Controller ();
        controller.EnableGesture(Gesture.GestureType.TYPESCREENTAP);
        controller.EnableGesture(Gesture.GestureType.TYPEKEYTAP);
        controller.EnableGesture(Gesture.GestureType.TYPECIRCLE);

    }


    // Update is called once per frame
    void Update()
    {
        Frame frame = controller.Frame();
        GestureList gestures = frame.Gestures();

        for (int i = 0; i < gestures.Count; i++) {
			Gesture gesture = gestures [i];
			if (gesture.Type == Gesture.GestureType.TYPEKEYTAP || gesture.Type == Gesture.GestureType.TYPECIRCLE || gesture.Type == Gesture.GestureType.TYPESCREENTAP) {

				if (transform.localScale.x < 0.5f) {
					transform.localScale += new Vector3 (0.4f * Time.deltaTime, 0, 0);
				}
				if (transform.localScale.y < 0.3f) {
					transform.localScale += new Vector3 (0, 0.4f * Time.deltaTime, 0);
				}
				if (transform.localScale.z < 0.5f) {
					transform.localScale += new Vector3 (0, 0, 0.4f * Time.deltaTime);
				}
			}
		}
			    if (transform.localScale.x > 0.01f)
                {
                    transform.localScale -= new Vector3 (0.085f * Time.deltaTime, 0, 0);
                }
                if (transform.localScale.y > 0.01f)
                {
                    transform.localScale -= new Vector3(0, 0.085f * Time.deltaTime, 0);
                }
                if (transform.localScale.z > 0.01f)
                {
                    transform.localScale -= new Vector3(0, 0, 0.085f * Time.deltaTime);
                }
	

        if(transform.localScale.x > 0.01f)
        {
            Particula.emissionRate = 10000f * transform.localScale.x;
        }
        else
        {
            Particula.emissionRate = 0f;
        }

    }

    void OnTriggerEnter(Collider colisao)
    {

        string nome;

        nome = colisao.gameObject.name;
        
        if (colisao.gameObject.tag == "Modelo")
        {
            colisao.gameObject.GetComponent<Renderer>().enabled = true;
        }
        if (colisao.gameObject.tag == "Particulas")
        {
            colisao.GetComponent<ParticleSystem>().Stop();
        }
        if (colisao.gameObject.tag == "Particulas_Modelo")
        {
            colisao.gameObject.GetComponent<ParticleSystem>().Play();
        }
        if (colisao.gameObject.tag == "Rua")
        {
            colisao.gameObject.GetComponent<Renderer>().enabled = false;
        }

    }

    void OnTriggerExit(Collider colisao)
    {

        string nome;

        if (colisao.gameObject.tag == "Modelo")
        {
            colisao.gameObject.GetComponent<Renderer>().enabled = false;
        }
        if (colisao.gameObject.tag == "Particulas")
        {
            colisao.gameObject.GetComponent<ParticleSystem>().Play();
        }
        if (colisao.gameObject.tag == "Particulas_Modelo")
        {
            colisao.gameObject.GetComponent<ParticleSystem>().Stop();
        }
        if (colisao.gameObject.tag == "Rua")
        {
            colisao.gameObject.GetComponent<Renderer>().enabled = true;
        }
    }
}