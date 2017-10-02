var Spielfeld = new Array();
var Kandidaten = new Array();

Array.prototype.finden = function (Element) {
    var gefunden = false;
    for (var i = 0; i < this.length && !gefunden; i++) {
        if (this[i] == Element) {
            gefunden = true;
        }
    }
    return gefunden;
}

Array.prototype.Beinhaltet = function (Inhalt) {
    var beinhaltet = false;
    for (var i = 0; i < this.length && !beinhaltet; i++) {
        if (this[i] == Inhalt) {
            beinhaltet = true;
        }
    }
    return beinhaltet;
}

function AnzahlVorkommen (Feld, Inhalt) {
    var Anzahl = 0;
    for (var i = 0; i < Feld.length; i++) {
        if (Feld[i] == Inhalt) {
            Anzahl++;
        }
    }
    return Anzahl;
}

function unbelegteSpielfelder()
{
    var Anzahl = 0;
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            if(Spielfeld[i][j] == 0)
            {
                Anzahl++;
            }
        }
    }
    return Anzahl;
}

window.onload = function () {
    var Tabelle = document.getElementById("Tabelle");
    var Inhalt = "";
    for (var i = 0; i < 9; i++) {
        if ((i + 1) % 3 == 0) {
            Inhalt += "<tr class='breiterRandUnten'>";
        }
        else {
            Inhalt += "<tr>";
        }
        for (var j = 0; j < 9; j++) {
            if ((j + 1) % 3 == 0) {
                Inhalt += "<td class='breiterRandRechts'><input size='1' maxlength='1' id='" + i + "_" + j + "' value=''></td>";
            }
            else {
                Inhalt += "<td><input size='1' maxlength='1' id='" + i + "_" + j + "' value=''></td>";
            }
        }
        Inhalt += "<\/tr>";
    }
    Tabelle.innerHTML = Inhalt;
};

function ErgebnisBerechnen()
{
    Spielfeld = undefined;
    Spielfeld = new Array();
    for(var i = 0; i < 9; i++)
    {
        Spielfeld.push(new Array());
        for(var j = 0; j < 9; j++)
        {
            var Inhalt = document.getElementById(i + "_" + j).value;
            Spielfeld[i].push(Inhalt);
        }
    }
    var Fehlermeldung = "";
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            if(( isNaN(Spielfeld[i][j] )) && ( Spielfeld[i][j].replace(/ /g,"") != "" ))
            {
                Fehlermeldung += "<li>Das Feld in der " + (i + 1) + ". Zeile und " + (j + 1) + ". Spalte ist weder leer noch eine Zahl</li>";
            }
            if((Spielfeld[i][j] > 9 || Spielfeld[i][j] < 1) && ( Spielfeld[i][j].replace(/ /g,"") != "" ))
            {
                Fehlermeldung += "<li>Das Feld in der " + (i + 1) + ". Zeile und " + (j + 1) + ". Spalte ist mit eine Zahl belegt, die nicht zwischen 1 und 9 liegt</li>";
            }
        }
    }
    if(unbelegteSpielfelder() == 81)
    {
        Fehlermeldung = "<li>F&uuml;r ein leeres Feld k&ouml;nnen keine Werte berechnet werden!</li>";
    }
    if(!KorrektesFormat())
    {
        Fehlermeldung = "<li>Dieses Sudoku hat <b>keine L&ouml;sung<\/b>, weil es Ziffern gibt, die innerhalb einer Zeile, einer Spalte oder eines Blockes mehrmals vorkommen!</li>";
    }
    if(Fehlermeldung == "")
    {
        for(var i = 0; i < 9; i++)
        {
            for(var j = 0; j < 9; j++)
            {
                if((Spielfeld[i][j] == "") || (Spielfeld[i][j] == 0))
                {
                    Spielfeld[i][j] = 0;
                }
                else
                {
                    Spielfeld[i][j] = parseInt(Spielfeld[i][j]);
                }
            }
        }
        setTimeout(WerteBerechnen(),1);
    }
    else
    {
        FehlermeldungAusgeben(Fehlermeldung);
    }
}

function FehlermeldungAusgeben(Inhalt)
{
    document.getElementById("ErgebnisBerechnen").style.display = 'none';
    document.getElementById("Fehlermeldung").style.display = 'inline-block';
    document.getElementById("FehlermeldungAusgabezeile").innerHTML = Inhalt;
}

function KorrektesFormat()
{
    var AllesKorrekt = true;
    for(var i = 1; i < 10 && AllesKorrekt; i++)
    {
        for(var j = 0; j < 9 && AllesKorrekt; j++)
        {
            var Anzahl = 0;
            for(var k = 0; k < 9; k++)
            {
                if(Spielfeld[j][k] == i)
                {
                    Anzahl++;
                }
            }
            if(Anzahl > 1)
            {
                AllesKorrekt = false;
            }
        }
        for(var j = 0; j < 9 && AllesKorrekt; j++)
        {
            var Anzahl = 0;
            for(var k = 0; k < 9; k++)
            {
                if(Spielfeld[k][j] == i)
                {
                    Anzahl++;
                }
            }
            if(Anzahl > 1)
            {
                AllesKorrekt = false;
            }
        }
        if(AllesKorrekt)
        {
            AllesKorrekt = KorrektesFormatBloecke(i);
        }
    }
    return AllesKorrekt;
}

function KorrektesFormatBloecke(i)
{
    var AllesKorrekt = true;
    var Anzahl = 0;
    for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 0; k < 3 && AllesKorrekt; k++) {
        for (var l = 3; l < 6; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 0; k < 3 && AllesKorrekt; k++) {
        for (var l = 6; l < 9; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 3; k < 6 && AllesKorrekt; k++) {
        for (var l = 0; l < 3; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 3; k < 6 && AllesKorrekt; k++) {
        for (var l = 3; l < 6; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 3; k < 6 && AllesKorrekt; k++) {
        for (var l = 6; l < 9; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 6; k < 9 && AllesKorrekt; k++) {
        for (var l = 0; l < 3; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 6; k < 9 && AllesKorrekt; k++) {
        for (var l = 3; l < 6; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    for (var k = 6; k < 9 && AllesKorrekt; k++) {
        for (var l = 6; l < 9; l++) {
            if (Spielfeld[k][l] == i) {
                Anzahl ++;
            }
        }
    }
    if(Anzahl > 1) {
        AllesKorrekt = false;
    }
    else {
        Anzahl = 0;
    }
    return AllesKorrekt;
}

function WerteBerechnen()
{
    Kandidaten = undefined;
    Kandidaten = new Array();
    for(var i = 0; i < 9; i++)
    {
        Kandidaten.push(new Array());
        for(var j = 0; j < 9; j++)
        {
            if(Spielfeld[i][j] != 0)
            {
                Kandidaten[i].push(-1);
            }
            else
            {
                Kandidaten[i].push(KandidatenAuflisten(i, j));
            }
        }
    }
    var EtwasVeraendert = false;
    for(var i = 0; i < 9; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            if(Kandidaten[i][j].length == 1)
            {
                Spielfeld[i][j] = Kandidaten[i][j][0];
                EtwasVeraendert = true;
            }
        }
    }
    if(unbelegteSpielfelder() != 0)
    {
        if(EtwasVeraendert)
        {
            setTimeout(WerteBerechnen(),1);
        }
        else
        {
            setTimeout(VertiefteSuche(),1);
        }
    }
    else
    {
        Ausgeben();
    }
}

function KandidatenAuflisten(i,j)
{
    var Zeile = new Array();
    for(var k = 0; k < 9; k++)
    {
        if(Spielfeld[i][k] != 0)
        {
            Zeile.push(Spielfeld[i][k]);
        }
    }
    var Spalte = new Array();
    for(var k = 0; k < 9; k++)
    {
        if(Spielfeld[k][j] != 0)
        {
            Spalte.push(Spielfeld[k][j]);
        }
    }
    var Block = BlockKandidatenErmitteln(i,j);
    var AnzahlKandidaten = 0;
    var Rueckgabewert = new Array();
    for(var k = 1; k < 10; k++)
    {
        if((!Spalte.finden(k)) && (!Zeile.finden(k)) && (!Block.finden(k)))
        {
            Rueckgabewert.push(k);
            AnzahlKandidaten++;
        }
    }
    if(AnzahlKandidaten > 0)
    {
        return Rueckgabewert;
    }
    else
    {
        return 0;
    }
}

function BlockKandidatenErmitteln(i,j)
{
    var Block = new Array();
    if(i < 3) {
        if(j < 3) {
            for(var k = 0; k < 3; k++) {
                for(var l = 0; l < 3; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 2 && j < 6) {
            for(var k = 0; k < 3; k++) {
                for(var l = 3; l < 6; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 5) {
            for(var k = 0; k < 3; k++) {
                for(var l = 6; l < 9; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
    }
    if(i > 2 && i < 6) {
        if(j < 3) {
            for(var k = 3; k < 6; k++) {
                for(var l = 0; l < 3; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 2 && j < 6) {
            for(var k = 3; k < 6; k++) {
                for(var l = 3; l < 6; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 5) {
            for(var k = 3; k < 6; k++) {
                for(var l = 6; l < 9; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
    }
    if(i > 5) {
        if(j < 3) {
            for(var k = 6; k < 9; k++) {
                for(var l = 0; l < 3; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 2 && j < 6) {
            for(var k = 6; k < 9; k++) {
                for(var l = 3; l < 6; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
        if(j > 5) {
            for(var k = 6; k < 9; k++) {
                for(var l = 6; l < 9; l++) {
                    Block.push(Spielfeld[k][l]);
                }
            }
        }
    }
    return Block;
}

function VertiefteSuche()
{
    var EtwasGefunden = false;
    for(var i = 1; i < 10 && !EtwasGefunden; i++)
    {
        for(var j = 0; j < 9; j++)
        {
            var Anzahl = 0; 
            for(var k = 0; k < 9; k++)
            {
                if(Kandidaten[j][k] != -1)
                {
                    Anzahl += AnzahlVorkommen(Kandidaten[j][k], i);
                }
            }
            if(Anzahl == 1)
            {
                for(var l = 0; l < 9 && !EtwasGefunden; l++)
                {
                    var Kandidat = Kandidaten[j][l];
                    if(Kandidat != -1 && Kandidat.Beinhaltet(i))
                    {
                        Spielfeld[j][l] = i;
                        EtwasGefunden = true;
                    }
                }
            }
        }
        for(var j = 0; j < 9 && !EtwasGefunden; j++)
        {
            var Anzahl = 0; 
            for(var k = 0; k < 9; k++)
            {
                if(Kandidaten[k][j] != -1)
                {
                    Anzahl += AnzahlVorkommen(Kandidaten[k][j], i);
                }
            }
            if(Anzahl == 1)
            {
                for(var l = 0; l < 9 && !EtwasGefunden; l++)
                {
                    var Kandidat = Kandidaten[l][j];
                    if(Kandidat != -1 && Kandidat.Beinhaltet(i))
                    {
                        Spielfeld[l][j] = i;
                        EtwasGefunden = true;
                    }
                }
            }
        }
        if(!EtwasGefunden)
        {
            vertiefteSucheBloecke(i);
        }
    }
    if(unbelegteSpielfelder() != 0)
    {
        if(EtwasGefunden)
        {
            setTimeout(WerteBerechnen(),1);
        }
        else
        {
            setTimeout(FinaleSuche(),1);
        }
    }
    else
    {
        Ausgeben();
    }
}

function vertiefteSucheBloecke(i) {
    var Anzahl = 0;
    var EtwasGefunden = false;
    for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1) {
        for (var m = 0; m < 3 && !EtwasGefunden; m++) {
            for (var n = 0; n < 3; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 0; k < 3 && !EtwasGefunden; k++) {
        for (var l = 3; l < 6; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 0; m < 3 && !EtwasGefunden; m++) {
            for (var n = 3; n < 6; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 0; k < 3 && !EtwasGefunden; k++) {
        for (var l = 6; l < 9; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 0; m < 3 && !EtwasGefunden; m++) {
            for (var n = 6; n < 9; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 3; k < 6 && !EtwasGefunden; k++) {
        for (var l = 0; l < 3; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 3; m < 6 && !EtwasGefunden; m++) {
            for (var n = 0; n < 3; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 3; k < 6 && !EtwasGefunden; k++) {
        for (var l = 3; l < 6; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 3; m < 6 && !EtwasGefunden; m++) {
            for (var n = 3; n < 6; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 3; k < 6 && !EtwasGefunden; k++) {
        for (var l = 6; l < 9; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 3; m < 6 && !EtwasGefunden; m++) {
            for (var n = 6; n < 9; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 6; k < 9 && !EtwasGefunden; k++) {
        for (var l = 0; l < 3; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 6; m < 9 && !EtwasGefunden; m++) {
            for (var n = 0; n < 3; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 6; k < 9 && !EtwasGefunden; k++) {
        for (var l = 3; l < 6; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 6; m < 9 && !EtwasGefunden; m++) {
            for (var n = 3; n < 6; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    Anzahl = 0;
    for (var k = 6; k < 9 && !EtwasGefunden; k++) {
        for (var l = 6; l < 9; l++) {
            if (Kandidaten[k][l] != -1) {
                Anzahl += AnzahlVorkommen(Kandidaten[k][l], i);
            }
        }
    }
    if (Anzahl == 1 && !EtwasGefunden) {
        for (var m = 6; m < 9 && !EtwasGefunden; m++) {
            for (var n = 6; n < 9; n++) {
                var Kandidat = Kandidaten[m][n];
                if (Kandidat != -1 && Kandidat.Beinhaltet(i)) {
                    Spielfeld[m][n] = i;
                    EtwasGefunden = true;
                }
            }
        }
    }
    return EtwasGefunden;
}

function Ausgeben()
{
    var Inhalt = "";
    for (var i = 0; i < 9; i++) {
        if ((i + 1) % 3 == 0) {
            Inhalt += "<tr class='breiterRandUnten'>";
        }
        else {
            Inhalt += "<tr>";
        }
        for (var j = 0; j < 9; j++) {
            if ((j + 1) % 3 == 0) {
                Inhalt += "<td class='breiterRandRechts'><input readonly value='" + Spielfeld[i][j] + "'></td>";
                
            }
            else {
                Inhalt += "<td><input readonly value='" + Spielfeld[i][j] + "'></td>";
            }
        }
        Inhalt += "<\/tr>";
    }
    document.getElementById("Ausgabetabelle").innerHTML = Inhalt.replace(/0/g," ");
    document.getElementById("ErgebnisBerechnen").style.display = 'none';
    document.getElementById("Fehlermeldung").style.display = 'none';
    document.getElementById("Ausgabe").style.display = 'inline-block';
}

function FinaleSuche()
{
    if(unbelegteSpielfelder() == 0)
    {
        Ausgeben();
        return true;
    }
    else
    {
        var erledigt = false;
        KandidatenVorhanden = true;
        for(var i = 0; i < 9 && !erledigt && KandidatenVorhanden; i++)
        {
            for(var j = 0; j < 9 && !erledigt && KandidatenVorhanden; j++)
            {
                var Kandidat = KandidatenAuflisten(i, j);
                if(Spielfeld[i][j] == 0 && Kandidat == 0)
                {
                    KandidatenVorhanden = false;
                }

                if(Spielfeld[i][j] == 0 && Kandidat.length != 0 && KandidatenVorhanden)
                {
                    passend = true;
                    for(var k = 0; k < Kandidat.length && !erledigt; k++)
                    {
                        Spielfeld[i][j] = Kandidat[k];
                        erledigt = FinaleSuche();
                        if(!erledigt)
                        {
                            Spielfeld[i][j] = 0;
                        }
                    }
                }
            }
        }
        return erledigt;
    }
}