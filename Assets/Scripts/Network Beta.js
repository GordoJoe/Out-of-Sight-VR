#pragma strict

var btnX:float;
var btnY:float;
var btnW:float;
var btnH:float;

var PlayerPrefab:GameObject;
var spawnObject:Transform;

var GameName:String = "AAA";
var refreshing:boolean = false;
var host:HostData[];

function Start(){
	btnX = Screen.width * 0.05;
	btnY = Screen.height * 0.05;
	btnW = Screen.width * 0.1;
	btnH = Screen.width * 0.1;
}

function StartServer(){

	Network.InitializeServer(32, 25001, !Network.HavePublicAddress);
	MasterServer.RegisterHost(GameName, "Teste", "Teste de Network");
}

function RefreshHostList(){

	MasterServer.RequestHostList(GameName);
	refreshing = true;
}

function OnServerInitialized(){
	Debug.Log("Servidor Iniciado");
	spawPlayer();
}

function spawPlayer(){
	Network.Instantiate(PlayerPrefab, spawnObject.position, Quaternion.identity, 0);
}

function OnConnectToServer(){
	spawPlayer();
}

function OnMasterServerEvent(mse:MasterServerEvent){

	if(mse == MasterServerEvent.RegistrationSucceeded){
		Debug.Log("Registrado");
	}
}

function Update(){
	if(refreshing){
		if(MasterServer.PollHostList().Length >0){
			refreshing = false;
			Debug.Log(MasterServer.PollHostList().Length);
			host = MasterServer.PollHostList();
		}
	}
}

function OnGUI(){
	if(!Network.isClient && !Network.isServer){
		if(GUI.Button(Rect(btnX, btnY, btnW, btnH), "Start Server")){
			Debug.Log("Starting Server");
			StartServer();
		}
		if(GUI.Button(Rect(btnX, btnY+btnH, btnW, btnH), "Refresh Hosts")){
			Debug.Log("Refreshing");
			RefreshHostList();
		}
		if(host){
			for(var i:int=0;i<host.length;i++ )	{
				if(GUI.Button(Rect(btnX * 1.5 + btnW, btnY+btnH+(btnH*i), btnW*3, btnH*0.5), host[i].gameName)){
					Network.Connect(host[i]);
				}
			}
		}
	}

}