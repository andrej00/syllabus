<template>
	<b-container>
		<NavbarNavigation />

		<div class="mt-5">
			<h1 class="headline">PREDDIPLOMSKI STUDIJ</h1>
            <div v-for="(semestar, i) in preddiplomskiStudij" :key="i" class="pb-5">
                <h2> {{ semestarNames[i] }}</h2>
                <b-table striped bordered hover :items="semestar" @row-clicked="rowClick"></b-table>
            </div>

			<hr />

			<h1 class="headline">DIPLOMSKI STUDIJ</h1>
            <div v-for="(semestar, i) in diplomskiStudij" :key="i + 10" class="pb-5">
                <h2> {{ semestarNames[i] }}</h2>
                <b-table striped bordered hover :items="semestar" @row-clicked="rowClick"></b-table>
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
import pdfFonts from "pdfmake/build/vfs_fonts";
import { pdfmake } from "pdfmake";
import preddiplomskiStudij from "@/variables/preddiplomskiStudij.js";
import diplomskiStudij from "@/variables/diplomskiStudij.js";
import NavbarNavigation from "../components/NavbarNavigation.vue";

export default {
	name: "Home",
	components: {
		NavbarNavigation
	},

	data() {
		return {
			preddiplomskiStudij: preddiplomskiStudij,
			diplomskiStudij: diplomskiStudij,
			merged: preddiplomskiStudij.concat(diplomskiStudij).flat(),
			semestarNames: ["Prvi semestar", "Drugi semestar", "Treći semestar", "Četvrti semestar", "Peti semestar", "Šesti semestar" ],
		};
	},

    methods: {
		rowClick(item) {
			const id = item.Kod;
			this.$router.push({ path: "opiskolegija", query: { id: id } });
		},
        
        createPDF() {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            const concatted = this.preddiplomskiStudij.concat(this.diplomskiStudij);
            const margin = [0, 25, 40, 5];
            const content = [];
            let body = [];

            content.push({
                text: "Preddiplomski Studij",
                style: { fontSize: 20, bold: true },
                margin: margin
            });

            concatted.map((semestar, index) => {
                if (index === 6) {
                    content.push({
                        text: "Diplomski Studij",
                        style: { fontSize: 20, bold: true },
                        margin: margin,
                    });
                    index = 0
                }
                content.push({
                    text: `Semestar ${index + 1}`,
                    style: { fontSize: 16, bold: true },
                    margin: margin
                });
                body.push(["Redni broj", "Kod", "Naziv kolegija", 
                        "P", "S", "V", "Status kolegija", 
                        "ECTS bodovi", "Nastavnik/asistent"]);

                semestar.map(subject => {
                    let values = Object.values(subject);
                    body.push(values);
                })

                content.push({
                    table: {
                        widths: ["auto", "auto", "auto", "auto", 
                            "auto","auto", "auto", "auto", "auto"],
                        body
                    },
                    layout: {
                        fillColor: function(rowIndex) {
                            return rowIndex % 2 === 0 ? "" : "#BBDEFB";
                        }
                    }
                });

                body = [];
            });

            const docDefinition = { content };
            pdfMake.createPdf(docDefinition).download("Opis Programa");
        }
	}
};
</script>
<style scoped>
    .headline {
        margin: 45px 0;
    }
</style>
