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
          <h2 style="margin-bottom: 30px">{{ item["Naziv predmeta"] }}</h2>

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
import opisiKolegija from "@/variables/opisiKolegija.js";

export default {
  name: "Home",
  data() {
    return {
      opisiKolegija: opisiKolegija,
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