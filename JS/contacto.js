document.getElementById("boton").onclick  =function() {
    document.getElementById('resultado').innerHTML = '';//Limpiamos pantalla
    var usuario = document.getElementById("numeroCiclos").value;
    var maquina = 8;
    var detener = false;
    var contador = 1;
    var maximo = 10;

    while(contador<=usuario && detener==false){

        if(usuario>maximo){
            document.getElementById("resultado").innerHTML += "stop de ciclo";
            detener = true;
        }
        
        if(usuario==maquina){
            document.getElementById("resultado").innerHTML += "GANASTE!!";
            document.getElementById("numeroCiclos").value=""; detener = true;
        }


        else{
            document.getElementById("resultado").innerHTML += ':( perdiste x:' + contador + '</br>';
            contador++;
        }
    }
}