/*
Board on ns. toiminnallinen eli "älykäs" komponentti joka sisältää
sovelluslogiikan.
*/
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    // Pelin tila eli state tallennetaan squares -taulukkoon
    squares: any[]; // Taulukko jossa on eri tyyppisiä arvoja: null, 'X', '0'
    xIsNext: boolean; // Kertoo kumpi on seuraavaksi vuorossa
    winner: string; // Kertoo voittajan 'X' tai '0'
    //boolean переменная, которая сообщает о ничьей
    //переменная moves которая должна писать количество ходов


    constructor() { }

    ngOnInit() {
        this.newGame(); // newGame suoritetaan aina kun komponentti alustetaan
    }
    // newGame() -metodin suoritus käynnistää uuden pelin
    newGame() {
        // Kun uusi peli alkaa, pelin muuttujat alustetaan.
        // Squares-taulukkoon laitetaan 9 tyhjää paikkaa
        this.squares = Array(9).fill(null);
//перенести сюда на место true  предложение, которая edellisen pelin hävinnyt saa aloittaa
//делаем, чтобы можно было выиграть не заполняя все поля
        this.xIsNext = true; 
        this.winner = null;
        //ничья on false
        //moves вначале 0
    }

    /*
   Tässä on sovelluksen model eli tietomalli. Se muodostuu
   risteistä ja nollista jotka välitetään ruutuihin player-
   get propertyn kautta. Get property joka on TS:n piirre,
   tarjoilee vuorotellen ristin tai nollan.
   */
    get player() {
        // ternäärinen operaattori joka korvaa if-elsen
        return this.xIsNext ? 'X' : '0';
        /*
        if (this.xIsNext) {
            return 'X';
        } else {
            return '0';
        }
        */
    }

    // makeMove(index: number) laittaa ristin tai nollan squares -taulukkoon indeksiin index
    makeMove(index: number) {

//ecли игра закончилась делаем return кщторый не может больше делать siirtoa, koska ollaan
//poistuttu metodista

        // Paikan johon risti tai nolla laitetaan pitää olla tyhjä, eli null
        if (!this.squares[index]) {
            // splice-metodi poistaa indeksistä alkion ja laittaa
            // tilalle yhden alkion joka tulee this.player -get propertyltä
            this.squares.splice(index, 1, this.player);
            this.xIsNext = !this.xIsNext; // Vaihdetaan vuoroa
            //this.moves++;
        }
        // Yritetään määritellä voittaja. Metodi tuottaa 'X', '0' tai null
        // tilanteesta riippuen. Jos voittaja on olemassa, se näytetään templaatissa.
        this.winner = this.calculateWinner();
        //здесь выясняется есть ли победитель и сделаны ли все ходы onko kaikki siirrot tehty
        //jos näin on , niin tasapeli on true

    }
    // Metodi joka määrittää pelin voittajan
    calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (const line of lines) {
            const [a, b, c] = line;
            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a]; // palautetaan 'X' tai '0'
            }
        }
        return null;
    }



}
