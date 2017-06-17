using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class CameraRift : MonoBehaviour {

    public GameObject player;
    public GameObject HMD;
    private Vector3 hmdpos;

	void LateUpdate () {

        player = GameObject.FindGameObjectWithTag("PlayerRiftPos");

        hmdpos = HMD.transform.localPosition;
        //hmdpos += new Vector3(-0.293f, -3.44f, -26.84f);- hmdpos
        this.transform.position = player.transform.position ;
	}
}
