using UnityEngine;
using System.Collections;
public class segue : MonoBehaviour {

    private GameObject essaew;

	void Update () {

        essaew = GameObject.FindGameObjectWithTag("PlayerRiftPos");

        this.transform.position = essaew.transform.position;
    }
}
