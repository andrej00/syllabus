<template>
  <b-container>
    
    <NavbarNavigation />

    <div class="mt-5">
      <h1 class="headline">PREDDIPLOMSKI STUDIJ</h1>
      <div class="pb-5" v-for="(subject, name, i) in preddiplomskiStudijTable" :key="subject[i]['Naziv Kolegija']">
        <h2>{{ semestarNames[i] }}</h2>
        <b-table striped bordered hover :items="subject" @row-clicked="rowClick"></b-table>
      </div>

      <hr>

      <h1 class="headline">DIPLOMSKI STUDIJ</h1>
      <div class="pb-5" v-for="(subject, name, i) in diplomskiStudijTable" :key="name">
        <h2>{{ semestarNames[i] }}</h2>
        <b-table striped bordered hover :items="subject"  @row-clicked="rowClick"></b-table>
      </div>
    </div>

    <b-row align-h="center" class="pb-5">
      <b-col sm="2" class="mt-3">
        <b-button variant="success">
          <download-excel
            class="export-excel-wrapper"
            :data="merged"
            name="Opis Programa.xls"
            >Opis Programa Excel
          </download-excel>
        </b-button>
      </b-col>
      <b-col sm="2" class="mt-3">
        <b-button @click="createPDF" variant="success">Opis Programa PDF</b-button>
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
import preddiplomskiStudij from "@/variables/preddiplomskiStudij.js";
import diplomskiStudij from "@/variables/diplomskiStudij.js";
import NavbarNavigation from "../components/NavbarNavigation.vue"

export default {
  name: "Home",
  components: {
    NavbarNavigation
  },
  data() {
    return {
      preddiplomskiStudij: preddiplomskiStudij,
      diplomskiStudij: diplomskiStudij,
      merged: preddiplomskiStudij.concat(diplomskiStudij),
      preddiplomskiStudijTable: {},
      diplomskiStudijTable: {},
      semestarNames: ["Prvi semestar", "Drugi semestar", "Treći semestar", "Četvrti semestar", "Peti semestar", "Šesti semestar"],
      splittedJsonData: [],
    };
  },

  methods: {
    rowClick(item) {
      const id = item.Kod
      this.$router.push({ path: 'opiskolegija', query: { id: id } })
    },
    createPDF() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      let body2 = [];
      let semestarCounter = 0;

      let content = [];
      body2.unshift(["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V,", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"],)
      content.push({text: "Preddiplomski Studij", style: {fontSize: 20, bold: true, alignement: "center"}, margin: [0, 10, 40, 5]});
      let j = 1;

      let subjects = this.preddiplomskiStudij.concat(this.diplomskiStudij)

      for (let i = 0; i < subjects.length; i++) {
        let values = Object.values(subjects[i]);
        body2.push(values);

        if (subjects[i]["Redni broj"] === "1.") {
          semestarCounter++;
        }

        if (subjects[i + 1] && subjects[i + 1]["Redni broj"] === "1." || i == subjects.length - 1) {
          if (semestarCounter === 7) {
            content.push({text: "Diplomski Studij", style: {fontSize: 20, bold: true}, margin: [0, 10, 40, 5]});
            j = 1;
          }
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
          body2.push(["Redni broj", "Kod", "Naziv kolegija", "P", "S", "V", "Status kolegija", "ECTS bodovi", "Nastavnik/asistent"],)
          j++;
        }
      }

      var docDefinition = { content: content }

      pdfMake.createPdf(docDefinition).download("Opis Programa");
    },
  },

  created() {
    let i = 0;
    this.preddiplomskiStudij.map(subject => {
      if (subject["Redni broj"] === "1.") {
        i++;
        this.preddiplomskiStudijTable["semestar" + i] = [];
      }
      this.preddiplomskiStudijTable["semestar" + i].push(subject);
    })

    i = 0;

    this.diplomskiStudij.map(subject => {
      if (subject["Redni broj"] === "1.") {
        i++;
        this.diplomskiStudijTable["semestar" + i] = [];
      }
      this.diplomskiStudijTable["semestar" + i].push(subject);
    })
  }
};

</script>
<style scoped>
.headline {
  margin: 45px 0;
}
</style>