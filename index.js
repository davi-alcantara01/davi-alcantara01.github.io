function win(winner){
    try{clearInterval(runtimer);}
    catch(erro){
        //pass
    }
    if(winner == "blue"){
        bluePoints.style.animation = "blink 1s infinite";
    }
    else if(winner == "red"){
        redPoints.style.animation = "blink 1s infinite";
    }
}

function draw(){
    try{clearInterval(runtimer);}
    catch(erro){
        //pass
    }
    bluePoints.style.animation = "blink 1s infinite";
    redPoints.style.animation = "blink 1s infinite";
}

function timer(minutes, seconds){

    runtimer = window.setInterval( function(){
        console.log("rodando");
        
        if(minutes == 0 && seconds == 0) {
            clearInterval(runtimer);
            end = true;
        }
        else {
            if (seconds == 0 && minutes != 0){
                seconds = 60;
                minutes = minutes - 1;
            }
            seconds = seconds - 1;

        }
        idMinutes.innerText = minutes;
        if (seconds < 10){
            idSeconds.innerText = "0" + seconds
        }
        else {
            idSeconds.innerText = seconds;
        }
        
    },
    1000
    )
    
};
let idMinutes = document.getElementById("minutes");
let idSeconds = document.getElementById("seconds");
let control = false;
let end = false;
let bluePoints = document.getElementById("blue-point");
let redPoints = document.getElementById("red-point");
let blueSenshu = document.getElementById("blue-senshu");
let redSenshu = document.getElementById("red-senshu");


window.addEventListener("keydown", function(event){
    if(event.code == "Space"){
        if (control == false) {
            timer(parseInt(idMinutes.innerText), parseInt(idSeconds.innerHTML));
            control = true;
        }
        else {
            clearInterval(runtimer);
            control = false;
        }
        console.log("Space pressionado.");
        
    }

});


document.getElementById("minutes").addEventListener(
    "click", function(){
        let div = this;
        let timeReset = "0";

        let input = document.createElement("input");
        input.type = "number";
        input.value = timeReset;
        input.style.width = "10vw";
        input.style.fontSize = "0.6em";
        input.max = "59";
        input.min = "00";
        input.maxLength = "2";


        div.replaceWith(input);
        input.focus();

        document.querySelector("input").addEventListener("input", function(){
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2);
            }
        });

        input.addEventListener("blur", function() {
            if (this.value == "" || this.value =="0"){
                this.value = "0";
            };

            if (this.value[0] == "0" && this.value.length == 2){
                this.value = this.value.replace("0", "");
            };

            div.innerText = input.value;
            input.replaceWith(div);
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
);


document.getElementById("seconds").addEventListener(
    "click", function(){
        let div = this;
        let timeReset = "00";

        let input = document.createElement("input");
        input.type = "number";
        input.value = timeReset;
        input.style.width = "10vw";
        input.style.fontSize = "0.6em";

        input.max = "59";
        input.min = "00";

        div.replaceWith(input);
        input.focus();

        document.querySelector("input").addEventListener("input", function(){
            if (this.value.length > 2) {
                this.value = this.value.slice(0, 2);
            }
        });

        input.addEventListener("blur", function() {
            if (this.value == "" || parseInt(this.value) > 59){
                this.value = "00";
            };

            if (this.value.length == 1){
                this.value = "0" + this.value;
            }

            div.innerText = input.value;
            input.replaceWith(div);
        });

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                input.blur();
            }
        });
    }
)

document.querySelectorAll(".points").forEach(element => {
    element.addEventListener(
        "contextmenu", function(event){
            event.preventDefault();
            let point = element.innerHTML;
            let num = parseInt(point);
            if (num > 0){
                element.innerHTML = num  - 1;
                num = 0;
            }
            
        }
    )
})

document.querySelectorAll(".points").forEach(element => {
    element.addEventListener(
        "click", function(){
            let point = element.innerHTML;
            let num = parseInt(point);
            element.innerHTML = num  + 1;
            num = 0;
        }
    )
})


document.querySelectorAll(".fault").forEach(element => {
    element.addEventListener(
        "click", function(){
            if (this.style.backgroundColor == "yellow"){
                this.style.backgroundColor = "black";
            }
            else {
                this.style.backgroundColor = "yellow";
            }
        }
    )
}

)

document.querySelectorAll(".senshu").forEach(element => {
    element.addEventListener(
        "click", function(){
            if (this.style.backgroundColor == "yellow"){
                this.style.backgroundColor = "black";
            }
            else {
                this.style.backgroundColor = "yellow";
            }
        }
    )
})

/*Reseta as configurações padrões ao clicar 'Esc'*/
window.addEventListener("keydown", function(event){
    if(event.key == "Escape"){
        document.querySelectorAll(".fault").forEach(element => {
            element.style.backgroundColor = "black";
        });
        this.document.querySelectorAll(".points").forEach(element => {
            element.innerText = "0";
        });
        control = false;
        document.getElementById("minutes").innerText = "0";
        document.getElementById("seconds").innerText = "00";
        
        try{clearInterval(runtimer)}
        catch(error){
            //pass
            }
        bluePoints.style.animation = "";
        redPoints.style.animation = "";
        blueSenshu.style.backgroundColor ="black";
        redSenshu.style.backgroundColor ="black";


    }
});


/*Verifica quem venceu*/
setInterval(() => {
    if(idMinutes.innerText == "0" && idSeconds.innerText == "00" && end == true){
        end = false;
        if(parseInt(bluePoints.innerText) > parseInt(redPoints.innerText)){
            win("blue")
        }
        else if (parseInt(redPoints.innerText) > parseInt(bluePoints.innerText)){
            win("red")
        }
        else if(redPoints.innerText == bluePoints.innerText ){
            console.log("empate")
            if (parseInt(redPoints.innerText) == 0){
                draw()
            }
            else {
                if(blueSenshu.style.backgroundColor == "yellow") {
                    win("blue")
                }
                else if (redSenshu.style.backgroundColor == "yellow"){
                    win("red")
                }
                else {
                    draw()
                }
            }
        }

    }
    if(document.getElementById("expelled-blue").style.backgroundColor == "yellow"){
        win("red")
    }
    if(document.getElementById("expelled-red").style.backgroundColor == "yellow"){
        win("blue")
    }
    if((parseInt(bluePoints.innerText) - parseInt(redPoints.innerText)) >= 8){
        win("blue")
    }
    if((parseInt(redPoints.innerText) - parseInt(bluePoints.innerText)) >= 8){
        win("red")
    }
}, 250

)

