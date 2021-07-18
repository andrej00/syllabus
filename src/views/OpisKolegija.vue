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
        <div v-for="(item, index) in opisiKolegija" :key="item">

        <b-table-simple stacked>
          <b-tbody>
              <b-tr v-for="(v, k, i) in opisiKolegija[index]" :key="v">
                <b-td
                  :style="i % 2 == 0 ? 'background-color: rgba(0, 0, 0, 0.05)' : ''"
                  :stacked-heading="k">{{ v }}</b-td>
              </b-tr>
            
          </b-tbody>
        </b-table-simple>
        </div>
      </div>
    </div>

    <b-row align-h="center" class="pb-5 mb-5" style="margin-top: -20px">
      <b-col sm="2">
        <b-button variant="success">
          <download-excel
            class="export-excel-wrapper"
            :data="opisiKolegija"
            name="Opis Programa.xls"
            >Opis Kolegija Excel
          </download-excel>
        </b-button>
      </b-col>

      <b-col sm="2">
        <b-button @click="createPDF" variant="success">Opis Kolegija PDF</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { pdfmake } from "pdfmake";
import { fs } from "fs";
import "jspdf-autotable";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default {
  name: "Home",
  data() {
    return {
      opisiKolegija: [
        {
          "Naziv predmeta": "Opća Pedagogija",
          "Nositelj predmeta": "Dr. sc. Sonja Kovačević, doc.",
          "Predavanja": "30",
          "Seminar": "0",
          "Vježbe": "30",
          "Status predmeta": "obvezni",
          "Godina studija u kojoj se izvodi predmet": "1",
          "ECTS bodovi": "4 ECTS",
          "Ciljevi predmeta": "Ovladavanje osnovnim znanjima iz područja pedagoške teorije i prakse potrebnima za uspješnu organizaciju i provođenje pedagoških aktivnosti i pedagoških procesa u odgojno-obrazovnoj praksi. Spoznati razvojne tendencije alternativnih pedagoških teorija i prakse; spoznati osnovne karakteristike i razvoj školskih sustava.",
          "Uvjeti za upis predmeta": "Nema uvjeta",
          "Ishodi učenja (kompetencije)":
            "-sposobnost misaonog operiranja (indukcija, analiza, sinteza, komparacija, evaluacija…);- analiziranje složenosti fenomena odgoja;- sposobnost primjene ideja u analizi prakse. Od specifičnih kompetencija, očekuje se da studenti mogu:- opisati, definirati i objasniti fenomen odgoja;- analizirati fenomen odgoja na primjerima i slučajevima;- oblikovati i izloţiti ideje, sudjelovati u polemikama i dijalozima.",
          "Sadržaj predmeta":
            "Predavanja. Pedagogija kao znanost;predmet pedagogije, zadaci pedagogije,sustav pedagogijskih znanosti,metode istraživanja u pedagogiji. Antroploške osnove odgoja.Temeljni pojmovi u pedagogiji;osnovne kategorije pedagogije.Struktura odgojnog procesa.Pedagoške koncepcije prakse-odgojno.obrazovne filozofije.Pregled razvoja pedagoških ideja.Odgojno-obrazovna komunikacija. Struktura i dinamika odgojno-obrazovne skupine Obrazovni sustavi –školski sustav u Republici BIH.Seminar.  Analiza i rasprava o pedagoškim problemima obradom sadržaja iz pojedinih izvora pedagoške literature i pedagoške prakse.",
          "Način izvođenja nastave":
            "Program se realizira na predavanjima i seminarima u kojima sudjeluju svi studenti. Tjedne, individualne i grupne konzultacije.",
          "Obveze studenata": "",
          "ECTS bodovi dodijeljeni na osnovu obveza studenata":
            "Udio aktivnosti u ECTS bodovima:\nNastava\nBilješke predavanja\nZadaće s predavanja - 0.5\nSeminarski rad\nPisani rad\nIzlaganje i PPT - 0.5\nSutdij literature (pročitati 5 knjiga - izborna literatura) - 1\n Kolokvij I - 1\nZavršni ispit - 1",
          "Podatci o ocjenjivanju i bodovanju studenata tijekom nastave i na završnom ispitu":
            "Udio aktivnosti u ECTS bodovima:\nNastava\nBilješke predavanja\nZadaće s predavanja - 0.5, 10\nSeminarski rad\nPisani rad\nIzlaganje i PPT - 0.5, 29\nSutdij literature (pročitati 5 knjiga - izborna literatura) - 1, 20\n Kolokvij I - 1, 21\nZavršni ispit - 1, 21",
          "Obvezna literatura": "1. Mušanović M.,Lukaš M. (2011.).Osnove pedagogije, HFD, Rijeka\n2.	Bratanić M. Mikropedagogija, Zagreb 1990, Školska knjiga\n3.	Bratanić, M. (2002). Paradoks odgoja. II izdanje, Hrvatska sveučilišna naklada, Zagreb",
          "Dopunska literatura": "4.	Giesecke, H.(1993), Uvod u pedagogiju, Zagreb Educa\n5. Gudjons, H.(1994), Pedagogija - temeljna znanja, Zagreb, Educa\n6, Konig, E., Zedler, P. (2000.). Teorije znanosti o odgoju, Educa, Zagreb.",
          "Jezik poduke i mogućnost praćenja na drugim jezicima": "Hrvatski jezik",
          "Način praćenja kvalitete i uspješnosti izvedbe svakog predmeta i/ili modula": "Studenti će nakon svakog semestra ispunjavati anonimni anketni upitnik – ispitivanje stajališta o kvaliteti nastave (upitnik će izraditi studenti koristeći se literaturom), a rezultate će obraditi i objaviti studenti. Nastavnik će pratiti kvalitetu prateći rad studenata tijekom nastave i seminara, te provjerom postignuća na ispitima.",
        },
        {
          "Naziv predmeta": "Didaktika",
          "Nositelj predmeta": "dr. sc. Mario Vasilj, izv. prof.",
          "Predavanja": "30",
          "Seminar": "0",
          "Vježbe": "0",
          "Status predmeta": "obvezni",
          "Godina studija u kojoj se izvodi predmet": "1",
          "ECTS bodovi": "4 ECTS",
          "Ciljevi predmeta": "Upoznati studente s osnovnim didaktičkim spoznajama o nastavi i obrazovanju; demonstrirati suvremene metode i strategije rada u nastavi, te razvijati sposobnosti za njihovu efikasnu primjenu; razvijati kompetencije za kritičko propitivanje recentne nastavne prakse u nas; osposobljavati studente za organizaciju nastave u kojoj dominiraju strategije aktivnog učenja",
          "Uvjeti za upis predmeta": "Položen ispit iz Osnova pedagogije",
          "Ishodi učenja (kompetencije)": "Prorada teorijskih sadržaja i rasprava o didaktičkim problemima,rad u malim skupinama, izrada eseja, i sl. Samostalna proučavanja didaktičke literature, Internet, diskusije, konzultacije",
          "Sadržaj predmeta": "Didaktika – teorija obrazovanja i nastave. Osnovni pojmovi didaktike. Nastava- ciljevi i zadaci. Zadaci odgoja i obrazovanja (Taksonomija)- Bloom ;Planiranje i programiranje nastave; Nastavni plan i program; Teorijsko-metodološki pristupi izradi nastavnih planova i programa; Artikulacija (strukturiranje) i faze nastavnog procesa; Pripremanje  nastavnika i učenika za nastavu,ostvarivanje nastavnog procesa; Evaluacija u procesu nastave i učenja; Principi u procesu nastave i učenja; Pojam i klasifikacija metoda nastave i učenja; Oblici (forme) rada u nastavi i učenju; Mediji u nastavi i učenju",
          "Način izvođenja nastave": "Program se realizira na predavanjima, seminarima i konzultacijama. Seminari se organiziraju kao aktivne studentske radionice u kojima se izrađuju vježbe i kritički razmatraju odabrane teme iz didaktike.",
          "Obveze studenata": "Redovito pohađanje nastave. Seminari se organiziraju kao aktivne studentske radionice u kojima se izrađuju vježbe i kritički razmatraju odabrane teme iz didaktike",
          "ECTS bodovi dodijeljeni na osnovu obveza studenata": "Seminar 1 ETSC, aktivnost  na nastavi 1 ETSC, pohađanje nastave 2 ECTS",
          "Podatci o ocjenjivanju i bodovanju studenata tijekom nastave i na završnom ispitu": "Nakon odslušanih predavanja i ispunjenih seminarskih obveza kandidati pristupaju polaganju pismenog i/ili usmenog ispita.Na konačnu ocjenu utječe i kvaliteta kritičkog razmatranja jednog od izvora iz popisa dopunske literature.",
          "Obvezna literatura": "Bognar, L., Matijević, M. (2002.). Didaktika, Zagreb: Školska knjiga.\n2. Klafki, W. i dr. (1992,). Didaktičke teorije, Zagreb: Educa.\n3. Kyriacou, C. (1995.). Temeljna nastavna umijeća, Zagreb:Educa.\n4. Poljak, V. (1991.). Didaktika, Zagreb: Školska knjiga",
          "Dopunska literatura": "1. Bežen, A. i dr. (1991.). Osnove didaktike, Zagreb: Školske novine.\n2. Jelavić, F. (1998.). Didaktika, Jastrebarsko: Naklada Slap.\n3. March, J.C. (1994.). Kurikulum, Zagreb: Educa.\n4. Matijević, M. (2001.). Alternativne škole, Zagreb: Tipex.\n5. Matijević, M. (2004.). Ocjenjivanje u osnovnoj školi, Zagreb: Tipex.",
          "Jezik poduke i mogućnost praćenja na drugim jezicima": "Hrvatski",
          "Način praćenja kvalitete i uspješnosti izvedbe svakog predmeta i/ili modula": "Dva puta tijekom semestra izvršit će se kooperativna procjena kvalitete izvedbe programa, a u odnosu na očekivanja i obveze, te postavljene zadaće i ciljeve programa",
        }
      ],
    };
  },

  methods: {
    createPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      let body2 = [];
      let content = [];

      for (let i = 0; i < this.opisiKolegija.length; i++) {
        let pair = Object.entries(this.opisiKolegija[i]);
        body2 = pair;
        content.push({
          margin: [0, 10, 0, 30],
          table: {
            widths: [150, "auto"],
            body: pair,
          }
        })
      }

      var docDefinition = { content: content };

      pdfMake.createPdf(docDefinition).download("Opisi Kolegija");
    },
  },
};

</script>
<style scoped>
  .table.b-table.b-table-stacked > tbody > tr > :first-child {
    border-top-width: 0 !important;
  }
  .table.b-table.b-table-stacked {
    margin-bottom: 80px;
  }
</style>