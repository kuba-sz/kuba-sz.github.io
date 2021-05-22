var rok = 2021;
var miesiac = 3;
var miesiace = {
    1: "styczeń",
    2: "luty",
    3: "marzec",
    4: "kwiecień",
    5: "maj",
    6: "czerwiec",
    7: "lipiec",
    8: "sierpień",
    9: "wrzesień",
    10: "październik",
    11: "listopad",
    12: "grudzień",
};
var daneProgramu = {
    ustawienia: {
        nazwiska: {
            0: "Czapiewscy",
            1: "Cysewscy",
        },
    },
    dane: {
        "2021-03-13": {
            0: 5,
            1: 2,
        },
    },
    zapiszDane: function () {
        localStorage.setItem("daneProgramu", JSON.stringify(this));
    },
    dodajNazwisko: function (nr, nazwisko) {
        this.ustawienia.nazwiska[nr] = nazwisko;
        this.zapiszDane();
    },
    wczytajZBazy: function () {
        let stareDane = localStorage.getItem(`daneProgramu`);
        if (stareDane) {
            if (stareDane.hasOwnProperty(`ustawienia`)) {
                this.ustawienia = stareDane.ustawienia;
            }
            if (stareDane.hasOwnProperty(`dane`)) {
                this.dane = stareDane.dane;
            }
        }
    },
};

document.addEventListener("DOMContentLoaded", function () {
    let elementy = document.getElementsByTagName("input");

    for (let input of elementy) {
        input.addEventListener("change", zapiszDane);
    }
    let blokUstawienia = document.getElementById(`blokUstawienia`);
    blokUstawienia.style.display = `none`;
    daneProgramu.wczytajZBazy();

    wczytajDane();

    daneProgramu.zapiszDane();
});

function wczytajNazwiska() {
    let miejsceNaNazwiska = document.getElementById(`miejsceNaNazwiska`);
    miejsceNaNazwiska.innerText = ``;
    for (let nr in daneProgramu.ustawienia.nazwiska) {
        let nazwisko = daneProgramu.ustawienia.nazwiska[nr];
        dodajLinieZNazwiskem(nr, nazwisko);
    }
}

function wczytajDane() {
    let wiersz;
    let naglowekMiesiaca = document.querySelectorAll("h2.miesiac")[0];
    naglowekMiesiaca.innerText = miesiace[miesiac] + " " + rok;
    for (let dzien = 1; dzien <= 28; dzien++) {
        let data =
            rok +
            "-" +
            (miesiac < 10 ? "0" : "") +
            miesiac +
            "-" +
            (dzien < 10 ? "0" : "") +
            dzien;
        wiersz = localStorage.getItem(data);
        daneObiekt = JSON.parse(wiersz);

        if (wiersz != null) {
            dodajWiersz(data, daneObiekt.czapiewscy, daneObiekt.cysewscy);
        }
    }

    wczytajNazwiska();
}

function poprzedniMiesiac() {
    if (miesiac == 1) {
        miesiac = 12;
        rok = rok - 1;
    } else {
        miesiac = miesiac - 1;
    }

    wyczyscTabele();
    wczytajDane();
}
function nastepnyMiesiac() {
    if (miesiac == 12) {
        miesiac = 1;
        rok = rok + 1;
    } else {
        miesiac = miesiac + 1;
    }
    wyczyscTabele();
    wczytajDane();
}
function wyczyscTabele() {
    let wiersze = document.querySelectorAll("tr.wierszZDanymi");

    for (let tr of wiersze) {
        tr.remove();
    }
}
function dodajWiersz(data, czapiewscyWartosc, cysewscyWartosc) {
    let zmiennatr;
    let pierwszakomorkatd;
    let pierwszyinput;
    let komorkazlitrami;
    let komorkazlitrami2;
    let inputzlitrami;
    let inputzlitrami2;
    let atrybutdata;
    let atrybutliczba;
    let atrybutliczba2;
    let atrybutminimum;
    let atrybutminimum2;

    let atrybutKalendarzWiersz;
    let atrybutKalendarzId;
    let atrybutInput1Wiersz;
    let atrybutInput1Id;
    let atrybutInput2Wiersz;
    let atrybutInput2Id;

    zmiennatr = document.createElement("tr");
    pierwszakomorkatd = document.createElement("td");
    komorkazlitrami = document.createElement("td");
    komorkazlitrami2 = document.createElement("td");
    pierwszyinput = document.createElement("input");
    inputzlitrami = document.createElement("input");
    inputzlitrami2 = document.createElement("input");
    atrybutdata = document.createAttribute("type");
    atrybutdata.value = "date";
    atrybutliczba = document.createAttribute("type");
    atrybutliczba.value = "number";
    atrybutliczba2 = document.createAttribute("type");
    atrybutliczba2.value = "number";
    atrybutminimum = document.createAttribute("min");
    atrybutminimum.value = "0";
    atrybutminimum2 = document.createAttribute("min");
    atrybutminimum2.value = "0";

    let wszystkieWierszeZDanymi = document.querySelectorAll(".wierszZDanymi");
    let numerWiersza = 0;
    for (let wiersz of wszystkieWierszeZDanymi) {
        numerWiersza = numerWiersza + 1;
    }

    let numerNowegoWiersza = parseInt(numerWiersza) + 1;

    pierwszyinput.dataset.wiersz = numerNowegoWiersza;
    pierwszyinput.id = "data-" + numerNowegoWiersza;
    pierwszyinput.value = data;

    inputzlitrami.value = czapiewscyWartosc;
    inputzlitrami2.value = cysewscyWartosc;
    inputzlitrami.dataset.wiersz = numerNowegoWiersza;
    inputzlitrami.id = "czapiewscy-" + numerNowegoWiersza;

    inputzlitrami2.dataset.wiersz = numerNowegoWiersza;
    inputzlitrami2.id = "cysewscy-" + numerNowegoWiersza;

    pierwszyinput.attributes.setNamedItem(atrybutdata);
    inputzlitrami.attributes.setNamedItem(atrybutliczba);
    inputzlitrami2.attributes.setNamedItem(atrybutliczba2);
    inputzlitrami.attributes.setNamedItem(atrybutminimum);
    inputzlitrami2.attributes.setNamedItem(atrybutminimum2);
    pierwszakomorkatd.appendChild(pierwszyinput);
    komorkazlitrami.appendChild(inputzlitrami);
    komorkazlitrami2.appendChild(inputzlitrami2);
    zmiennatr.appendChild(pierwszakomorkatd);
    zmiennatr.appendChild(komorkazlitrami);
    zmiennatr.appendChild(komorkazlitrami2);
    zmiennatr.className = "wierszZDanymi";

    let tabelka;
    tabelka = document.getElementById("nasza-tabelka");
    let wierszzprzyciskem = document.getElementById("wierszzprzyciskem");
    wierszzprzyciskem.after(zmiennatr);

    let noweInputy = zmiennatr.getElementsByTagName("input");
    for (let nowyInput of noweInputy) {
        nowyInput.addEventListener("change", zapiszDane);
    }
}

function zapiszDane(e) {
    let numerWiersza = e.target.dataset.wiersz;
    let nowaData = document.getElementById("data-" + numerWiersza).value;
    let czapiewscyLitry = document.getElementById(
        "czapiewscy-" + numerWiersza
    ).value;
    let cysewscyLitry = document.getElementById(
        "cysewscy-" + numerWiersza
    ).value;

    let dane = { czapiewscy: czapiewscyLitry, cysewscy: cysewscyLitry };

    if (nowaData != "") {
        localStorage.setItem(nowaData, JSON.stringify(dane));
    }
}

function dodajLinieZNazwiskem(nr, nazwisko) {
    if (nr == "nastepny") {
        let numery = Object.keys(daneProgramu.ustawienia.nazwiska);

        numery = numery.map(function (numer) {
            return Number(numer).valueOf();
        });

        nr = Math.max(...numery) + 1;
    }

    let inputNumeru = document.createElement("input");
    inputNumeru.id = `numer_${nr}`;
    inputNumeru.value = nr;
    inputNumeru.readOnly = true;

    let inputNazwiska = document.createElement(`input`);
    inputNazwiska.id = `nazwisko_${nr}`;
    inputNazwiska.value = nazwisko;
    inputNazwiska.addEventListener("change", function (e) {
        let nazwisko = e.target.value;
        daneProgramu.dodajNazwisko(nr, nazwisko);
    });

    let divLinia = document.createElement(`div`);
    divLinia.dataset.liniaNr = nr;
    divLinia.appendChild(inputNumeru);
    divLinia.appendChild(inputNazwiska);

    let miejsceNaNazwiska = document.getElementById("miejsceNaNazwiska");
    miejsceNaNazwiska.appendChild(divLinia);

    daneProgramu.dodajNazwisko(nr, nazwisko);
}

function przelaczUstawienia() {
    let blokUstawienia = document.getElementById(`blokUstawienia`);
    if (blokUstawienia.style.display == `none`) {
        blokUstawienia.style.display = `block`;
    } else {
        blokUstawienia.style.display = `none`;
    }
}
