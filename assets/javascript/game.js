var winCount = 0;
var lossCount = 0;
var enemies = 3;
var JarJar = {
    name: "Jar Jar Binks",
    species: "Gungan",
    isProtag: false,
    isAntag: false,
    choose: "#chooseJarJar",
    fight: "#fightJarJar",
    HPTot: 300,
    HP: 300,
    BA: 4,
    Atk: 0,
    Cntr: 10,
};
var Yoda = {
    name: "Yoda",
    species: "Goblin",
    isProtag: false,
    isAntag: false,
    choose: "#chooseYoda",
    fight: "#fightYoda",
    HPTot: 40,
    HP: 40,
    BA: 50,
    Atk: 0,
    Cntr: 50,
};
var Ahsoka = {
    name: "Ahsoka Tano",
    species: "Twi-lek-ish",
    isProtag: false,
    isAntag: false,
    choose: "#chooseAhsoka",
    fight: "#fightAhsoka",
    HPTot: 100,
    HP: 100,
    BA: 20,
    Atk: 0,
    Cntr: 3,
};
var Anakin = {
    name: "Anakin Skywalker",
    species: "Flammable",
    isProtag: false,
    isAntag: false,
    choose: "#chooseAnakin",
    fight: "#fightAnakin",
    HPTot: 130,
    HP: 130,
    BA: 10,
    Atk: 0,
    Cntr: 20,
};
var charList = [JarJar, Yoda, Ahsoka, Anakin];

function restart() {
    enemies = 3;
    for(i in charList){
        charList[i].HP = charList[i].HPTot;
        charList[i].Atk = 0;
        charList[i].isProtag = false;
        display(charList[i],0);
    }
    $("#Protag").empty();
    $("#Antag").empty();
    $("article").empty();
    $("#restart").empty();
};

function display(chara,row) {
    switch(row){
        case 0:
            row = chara.choose;
            break;
        case 1:
            row = "#Protag";
            break;
        case 2:
            row = chara.fight;
            break;
        case 3:
            row = "#Antag";
            break;
    }
    $(row).html('<p>' + chara.name + '</p><img alt="' + chara.species + '"><p>' + chara.HP + '</p>');
}

$(JarJar.choose).on("click", function() {
    JarJar.isProtag = true;
});
$(Yoda.choose).on("click", function() {
    Yoda.isProtag = true;
});
$(Ahsoka.choose).on("click", function() {
    Ahsoka.isProtag = true;
});
$(Anakin.choose).on("click", function() {
    Anakin.isProtag = true;
});
$(".choose").on("click", function () {
    $("article").empty();
    for(i in charList){
        $(charList[i].choose).empty();
        if(charList[i].isProtag){
            display(charList[i],1);
        }
        else{
            display(charList[i],2);
        }
    }
});

$(JarJar.fight).on("click", function() {
    JarJar.isAntag = true;
});
$(Yoda.fight).on("click", function() {
    Yoda.isAntag = true;
});
$(Ahsoka.fight).on("click", function() {
    Ahsoka.isAntag = true;
});
$(Anakin.fight).on("click", function() {
    Anakin.isAntag = true;
});
$(".fight").on("click", function () {
    $("article").empty();
    $("#Antag").removeClass("invisible");
    for(i in charList){
        if(charList[i].isAntag) {
            $(charList[i].fight).empty();
            display(charList[i],3);
        }
    }
});

$("#attack").on("click", function() {
    if(!enemies){
        return;
    }
    var Protag = -1;
    var Antag = -1;
    for(i in charList){
        if(charList[i].isProtag){
            Protag = i;
        }
        if(charList[i].isAntag){
            Antag = i;
        }
    }

    if(Antag===-1){
        if(Protag===-1){
            $("article").html('<p>Choose a character to fight as!</p>');
        }
        else{
            $("article").html('<p>Choose an enemy to fight!</p>');
        }
    }
    else if(!charList[Antag].HP){
        $("article").html('<p>Press restart to play again!</p>');
    }
    else{
        charList[Protag].Atk += charList[Protag].BA;
        charList[Antag].HP -= charList[Protag].Atk;
        if(charList[Antag].HP <= 0){
            charList[Antag].HP = 0;
            charList[Antag].isAntag = false;
            enemies--;
            if(enemies){
                $("article").html('<p>You have defeated ' + charList[Antag].name + '; choose another enemy.</p>');
            }
            else{
                winCount++;
                $("#winCount").html(winCount);
                $("article").html('<p>YOU WIN!!!! GAME OVER!!!</p>');
                $("#restart").html('Restart');
            }
            $("#Antag").addClass("invisible");
        }
        else{
            charList[Protag].HP -= charList[Antag].Cntr;
            if(charList[Protag].HP <= 0){
                charList[Protag].HP = 0;
                lossCount++;
                $("#lossCount").html(lossCount);
                $("article").html('<p>You have been defeated...GAME OVER!!!</p>');
                $("#restart").html('Restart');
            }
            else{
                $("article").html('<p>You attacked ' + charList[Antag].name + ' for ' + charList[Protag].Atk + ' damage.</p>'
                                + '<p>' + charList[Antag].name + ' attacked you back for ' + charList[Antag].Cntr + ' damage.</p>');
            }
            display(charList[Antag],3);
        }
    }
    display(charList[Protag],1);
});

$("#restart").on("click", function(){
    restart();
});

restart();