<template>
  <b-container>

    <div class="mt-4 pb-1">
      <b-row align-h="center">
        <b-col sm="3" class="mt-3">
          <b-button to="/" variant="outline-primary">Opis Programa</b-button>
        </b-col>

        <b-col sm="3" class="mt-3">
          <b-button to="/opiskolegija" variant="outline-primary">Opis Kolegija</b-button>
        </b-col>
      </b-row>
    </div>

    <div class="mt-5">
      <div class="pb-5">
        <h2>PRVI SEMESTAR</h2>
        <b-table striped bordered hover :items="semestar1"></b-table>
      </div>

      <div class="pb-5">
        <h2>DRUGI SEMESTAR</h2>
        <b-table striped bordered hover :items="semestar2"></b-table>
      </div>

      <div class="pb-5">
        <h2>TREĆI SEMESTAR</h2>
        <b-table striped bordered hover :items="semestar3"></b-table>
      </div>

      <div class="pb-5">
        <h2>ČETVRTI SEMESTAR</h2>
        <b-table striped bordered hover :items="semestar4"></b-table>
      </div>
    </div>

    <b-row align-h="center" class="pb-5">
      <b-col sm="2" class="mt-3">
        <b-button variant="success">
          <download-excel
            class="export-excel-wrapper"
            :data="jsonData"
            name="Opis Programa.xls"
            >Opis Programa Excel
          </download-excel>
        </b-button>
      </b-col>
      <b-col sm="2" class="mt-3">
        <b-button @click="createPDF2" variant="success">Opis Programa PDF</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { pdfmake } from "pdfmake";
import { fs } from "fs";
import "jspdf-autotable";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { exceljs } from "exceljs";

export default {
  name: "Home",
  data() {
    return {
      splittedJsonData: [],
      semestar1: [{
          "Redni broj": "1.",
          "Kod": "INM1017",
          "Naziv kolegija": "Metodika nastave informatike 1",
          "P": "30",
          "S": "30",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "7",
          "Nastavnik/asistent": "dr.sc. Ivica Boljat, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM1024",
          "Naziv kolegija": "Sustavi e-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM1034",
          "Naziv kolegija": "Opća pedagogija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Sonja Kovačević, doc. Tina Barbarić, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM1044",
          "Naziv kolegija": "Osnove psihologije",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Kristina Sesar, doc. Marijana Barišić, asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni matematički kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM1072",
          "Naziv kolegija": "Hrvatski jezik i jezična kultura",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "D",
          "ECTS bodovi": "2",
          "Nastavnik/asistent": "dr. sc. Marko Tokić, doc. Ivana Krešić, ml. asist."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM1084",
          "Naziv kolegija": "Razvojna okruženja za objektno orijentirano programiranje",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Branko Žitko, doc."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM1094",
          "Naziv kolegija": "Baze podataka ",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM10105",
          "Naziv kolegija": "Optimizacija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc.  Ljiljanka Kvesić, doc. mr. sc. Anela Čolak, asist."
        },
        {
          "Redni broj": "11",
          "Kod": "INM10115",
          "Naziv kolegija": "Numerička matematika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Vedrana Mikulić"
        },
      ],
      semestar2: [
        {
          "Redni broj": "1.",
          "Kod": "INM2016",
          "Naziv kolegija": "Metodika nastave informatike 2",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "6",
          "Nastavnik/asistent": "dr. sc. Ivica Boljat, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM2025",
          "Naziv kolegija": "Projektiranje sustava e-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM2034",
          "Naziv kolegija": "Didaktika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Mario Vasilj, izv. prof. Anita Imre, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM2045",
          "Naziv kolegija": "Metodologija istraživanja u obrazovanju",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Ivica Musić, doc. Mate Penava, asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM2075",
          "Naziv kolegija": "Napredna arhitektura računala",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Sven Gotovac, red. prof. Željko Marušić, asist."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM2085",
          "Naziv kolegija": "",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Dražena Gašpar, red. prof."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM2095",
          "Naziv kolegija": "Pretraživanje informacija ",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "Dr.sc. Drago Žagar, red.prof."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM20105",
          "Naziv kolegija": "Uvod u obradu prirodnog jezika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Branko Žitko, doc."
        },
      ],
      semestar3: [
        {
          "Redni broj": "1.",
          "Kod": "INM3015",
          "Naziv kolegija": "Vrednovanje sustava E-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM3025",
          "Naziv kolegija": "Raspodijeljeni sustavi",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Marko Rosić, red. prof. željko Marušić, asist."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM3035",
          "Naziv kolegija": "Teorija informacija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr.sc. Irena Galić, doc. Daniel Vasić, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM3045",
          "Naziv kolegija": "Sigurnost računalnih mreža",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Drago Žagar, red. prof. Tomislav Volarić, viš. asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc."
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM3075",
          "Naziv kolegija": "Elektroničko poslovanje",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Željko Stojkić, doc."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM3085",
          "Naziv kolegija": "Programiranje aplikacija za mobilne uređaje",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc. Daniel Vasić, asist."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM3095",
          "Naziv kolegija": "Rudarenje podataka ",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "Dr.sc. Goran Kraljević,doc."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM30105",
          "Naziv kolegija": "Multimedijalni sustavi",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Siniša Fajt, izv. prof."
        },
      ],
      semestar4: [{
          "Redni broj": "1.",
          "Kod": "INM4013",
          "Naziv kolegija": "Filozofija odgoja i obrazovanja",
          "P": "30",
          "S": "0",
          "V": "15",
          "Status kolegija": "A",
          "ECTS bodovi": "3",
          "Nastavnik/asistent": "Dr. sc. Irena Musa, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM4025",
          "Naziv kolegija": "Metodički informatički seminar s praksom",
          "P": "0",
          "S": "30",
          "V": "45",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Tonćo Marušić, doc. Tomislav Volarić, asist."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM40312",
          "Naziv kolegija": "Diplomski rad",
          "P": "0",
          "S": "6",
          "V": "0",
          "Status kolegija": "A",
          "ECTS bodovi": "12",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "4.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "INM4065",
          "Naziv kolegija": "Upravljanje znanjem",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Vladimir Šimović, red. prof."
        },
        {
          "Redni broj": "7.",
          "Kod": "",
          "Naziv kolegija": "Inteligentni agenti",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Marko Rosić, red. prof."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM4085",
          "Naziv kolegija": "Robotika u obrazovanju",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Snježana Rezić, red. prof."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM4095",
          "Naziv kolegija": "Računalni vid",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Irena Galić, doc. Daniel Vasić, asist."
        },
      ],
      jsonData: [
        {
          "Redni broj": "1.",
          "Kod": "INM1017",
          "Naziv kolegija": "Metodika nastave informatike 1",
          "P": "30",
          "S": "30",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "7",
          "Nastavnik/asistent": "dr.sc. Ivica Boljat, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM1024",
          "Naziv kolegija": "Sustavi e-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM1034",
          "Naziv kolegija": "Opća pedagogija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Sonja Kovačević, doc. Tina Barbarić, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM1044",
          "Naziv kolegija": "Osnove psihologije",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Kristina Sesar, doc. Marijana Barišić, asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni matematički kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM1072",
          "Naziv kolegija": "Hrvatski jezik i jezična kultura",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "D",
          "ECTS bodovi": "2",
          "Nastavnik/asistent": "dr. sc. Marko Tokić, doc. Ivana Krešić, ml. asist."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM1084",
          "Naziv kolegija": "Razvojna okruženja za objektno orijentirano programiranje",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Branko Žitko, doc."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM1094",
          "Naziv kolegija": "Baze podataka ",
          "P": "15",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM10105",
          "Naziv kolegija": "Optimizacija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc.  Ljiljanka Kvesić, doc. mr. sc. Anela Čolak, asist."
        },
        {
          "Redni broj": "11",
          "Kod": "INM10115",
          "Naziv kolegija": "Numerička matematika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "C",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Vedrana Mikulić"
        },



        {
          "Redni broj": "1.",
          "Kod": "INM2016",
          "Naziv kolegija": "Metodika nastave informatike 2",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "6",
          "Nastavnik/asistent": "dr. sc. Ivica Boljat, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM2025",
          "Naziv kolegija": "Projektiranje sustava e-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM2034",
          "Naziv kolegija": "Didaktika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "4",
          "Nastavnik/asistent": "dr. sc. Mario Vasilj, izv. prof. Anita Imre, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM2045",
          "Naziv kolegija": "Metodologija istraživanja u obrazovanju",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Ivica Musić, doc. Mate Penava, asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM2075",
          "Naziv kolegija": "Napredna arhitektura računala",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Sven Gotovac, red. prof. Željko Marušić, asist."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM2085",
          "Naziv kolegija": "",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Dražena Gašpar, red. prof."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM2095",
          "Naziv kolegija": "Pretraživanje informacija ",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "Dr.sc. Drago Žagar, red.prof."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM20105",
          "Naziv kolegija": "Uvod u obradu prirodnog jezika",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Branko Žitko, doc."
        },




        {
          "Redni broj": "1.",
          "Kod": "INM3015",
          "Naziv kolegija": "Vrednovanje sustava E-učenja",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Slavomir Stankov, red. prof."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM3025",
          "Naziv kolegija": "Raspodijeljeni sustavi",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Marko Rosić, red. prof. željko Marušić, asist."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM3035",
          "Naziv kolegija": "Teorija informacija",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr.sc. Irena Galić, doc. Daniel Vasić, asist."
        },
        {
          "Redni broj": "4.",
          "Kod": "INM3045",
          "Naziv kolegija": "Sigurnost računalnih mreža",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Drago Žagar, red. prof. Tomislav Volarić, viš. asist."
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc."
        },
        {
          "Redni broj": "6.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "7.",
          "Kod": "INM3075",
          "Naziv kolegija": "Elektroničko poslovanje",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Željko Stojkić, doc."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM3085",
          "Naziv kolegija": "Programiranje aplikacija za mobilne uređaje",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Goran Kraljević, doc. Daniel Vasić, asist."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM3095",
          "Naziv kolegija": "Rudarenje podataka ",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "Dr.sc. Goran Kraljević,doc."
        },
        {
          "Redni broj": "10.",
          "Kod": "INM30105",
          "Naziv kolegija": "Multimedijalni sustavi",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Siniša Fajt, izv. prof."
        },


        {
          "Redni broj": "1.",
          "Kod": "INM4013",
          "Naziv kolegija": "Filozofija odgoja i obrazovanja",
          "P": "30",
          "S": "0",
          "V": "15",
          "Status kolegija": "A",
          "ECTS bodovi": "3",
          "Nastavnik/asistent": "Dr. sc. Irena Musa, doc."
        },
        {
          "Redni broj": "2.",
          "Kod": "INM4025",
          "Naziv kolegija": "Metodički informatički seminar s praksom",
          "P": "0",
          "S": "30",
          "V": "45",
          "Status kolegija": "A",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Tonćo Marušić, doc. Tomislav Volarić, asist."
        },
        {
          "Redni broj": "3.",
          "Kod": "INM40312",
          "Naziv kolegija": "Diplomski rad",
          "P": "0",
          "S": "6",
          "V": "0",
          "Status kolegija": "A",
          "ECTS bodovi": "12",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "4.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "5.",
          "Kod": "",
          "Naziv kolegija": "Izborni kolegij",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": ""
        },
        {
          "Redni broj": "6.",
          "Kod": "INM4065",
          "Naziv kolegija": "Upravljanje znanjem",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Vladimir Šimović, red. prof."
        },
        {
          "Redni broj": "7.",
          "Kod": "",
          "Naziv kolegija": "Inteligentni agenti",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Marko Rosić, red. prof."
        },
        {
          "Redni broj": "8.",
          "Kod": "INM4085",
          "Naziv kolegija": "Robotika u obrazovanju",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Snježana Rezić, red. prof."
        },
        {
          "Redni broj": "9.",
          "Kod": "INM4095",
          "Naziv kolegija": "Računalni vid",
          "P": "30",
          "S": "0",
          "V": "30",
          "Status kolegija": "B",
          "ECTS bodovi": "5",
          "Nastavnik/asistent": "dr. sc. Irena Galić, doc. Daniel Vasić, asist."
        },
      ],
    };
  },

  methods: {
    createPDF() {
      const doc = new jsPDF()
      let body = [];
      let arr = [];

      for (let i = 0; i < this.jsonData.length; i++) {
        arr = [];
  
        Object.values(this.jsonData[i]).map((value) => {

        if (value == "1." && i !== 0) {
          
            doc.autoTable({
              head: [["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"]],
              body: body,
            });
            doc.text("Some content...", 40, doc.lastAutoTable.finalY + 40);

            body = [];
            arr = [];
          }
          value = value.replaceAll("đ", "d").replaceAll("Đ", "D").replaceAll("č", "c").replaceAll("Č", "C").replaceAll("ć", "c").replaceAll("Ć", "C");
          arr.push(value);
        });

        body.push(arr);
      }

      doc.autoTable({
        head: [["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"]],
        body: body
      });

      doc.save('Opis Programa.pdf')
    },


    createPDF2() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      let body2 = [];

      let content = [];
      body2.unshift(["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V,", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"],)
      
      let j = 1;

      for (let i = 0; i < this.jsonData.length; i++) {
        let values = Object.values(this.jsonData[i]);
        body2.push(values);

        if (this.jsonData[i + 1] && this.jsonData[i + 1]["Redni broj"] === "1." || i == this.jsonData.length - 1) {
          content.push({text: `Semestar ${j}`, style: {fontSize: 16, bold: true}, margin: [0, 10, 40, 5]})
          content.push({
            margin: [0, 10, 0, 30],
            table: {
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: body2,
            },
            layout: {
              fillColor: function (rowIndex) {
                return (rowIndex % 2 === 0) ? '' : '#BBDEFB';
              }
            }
          });
          body2 = [];
          body2.push(["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V,", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"],)
          j++;
        }
      }

      console.log(body2);

      var docDefinition = { content: content }
      console.log(docDefinition);

      pdfMake.createPdf(docDefinition).download("Opis Programa");
    },
  },

  created() {
    let arr = [];
    this.jsonData.map(kolegij => {
      arr.push(kolegij);
      if (kolegij["Redni broj"] == "1.") {
        console.log(kolegij);
      }
    });
  }
};
</script>
