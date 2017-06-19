using UnityEngine;
using System.Collections;

public class segueMenu : MonoBehaviour {

    private GameObject essaew;

    void Update()
    {

        essaew = GameObject.FindGameObjectWithTag("PlayerRiftPos");

        this.transform.localRotation = essaew.transform.localRotation;
    }
}
