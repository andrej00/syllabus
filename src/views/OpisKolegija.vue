<template>
	<b-container>
		<NavbarNavigation />

		<div class="mt-5 mb-5">
			<b-row align-h="center">
				<b-col lg="6" md="8" sm="12">
					<b-form-input
						v-model="subjectInput"
						placeholder="Paralelno programiranje"
					></b-form-input>
				</b-col>
			</b-row>
		</div>

		<b-row class="mt-5" align-h="center">
			<b-col lg="10" sm="12">
				<div v-for="(item, index) in filteredSubjects" :key="index">
					<h2 style="margin-bottom: 30px" :id="item['Kod kolegija']">
						{{ item["Naziv kolegija"] }}
					</h2>
					<b-table-simple stacked>
						<b-tbody>
							<b-tr
								v-for="(v, k, i) in filteredSubjects[index]"
								:key="i"
							>
								<b-td
									:style="
										i % 2 == 0
											? 'background-color: rgba(0, 0, 0, 0.05)'
											: ''
									"
									:stacked-heading="k"
									v-if="k !== 'Ocjenjivanje'"
									>{{ v }}</b-td
								>
								<b-td v-else>
									<b-table
										:items="opisiKolegija[index]['Ocjenjivanje']"
										:fields="Object.keys(opisiKolegija[index]['Ocjenjivanje'][0])"
										bordered
										small
									></b-table>
								</b-td>
							</b-tr>
						</b-tbody>
					</b-table-simple>
					<b-row align-h="end" class="mb-5">
						<b-col sm="2" style="margin-top: -60px !important">
							<b-button
								@click="createPDF([item])"
								variant="success"
								size="sm"
							>
								{{ item["Naziv kolegija"] }} PDF
							</b-button>
						</b-col>
					</b-row>
				</div>
			</b-col>
		</b-row>

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
				<b-button @click="createPDF()" variant="success">
                    Opis Kolegija PDF
                </b-button>
			</b-col>
		</b-row>
	</b-container>
</template>

<script>
import { pdfmake } from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import opisiKolegija from "@/variables/opisiKolegija.js";
import NavbarNavigation from "../components/NavbarNavigation.vue";

export default {
	name: "Home",
	components: {
		NavbarNavigation
	},

	data() {
		return {
			subjectInput: "",
			opisiKolegija: opisiKolegija
		};
	},

	computed: {
		filteredSubjects() {
			return this.opisiKolegija.filter(
				subject =>{
					return subject["Naziv kolegija"]
						.toLowerCase()
						.indexOf(this.subjectInput.toLowerCase()) !== -1}
			);
		}
	},

	methods: {
		createPDF(subject = this.opisiKolegija) {
			pdfMake.vfs = pdfFonts.pdfMake.vfs;
			let content = [];
            let innerContent = [];

			for (let i = 0; i < subject.length; i++) {
				let pair = Object.entries(subject[i]);
                console.log(pair);
                console.log(Object.entries(pair[26][1]));
                if (pair[i][0].text === 'Ocjenjivanje') {
                    console.log(Object.entries(subject[i]['Ocjenjivanje']))
                }
				// content.push({
				// 	margin: [0, 10, 0, 30],
				// 	table: {
				// 		widths: [150, "auto"],
				// 		body: pair
				// 	}
				// });
			}

			var docDefinition = { content: content };

			// pdfMake.createPdf(docDefinition).download("Opisi Kolegija");
		}
	},

	created() {
		const id = this.$route.query.id;
		if (id) {
			setTimeout(() => {
				console.log(document.getElementById(id));
				document.getElementById(id).scrollIntoView();
			}, 150);
		}
	}
};
</script>
<style scoped>
.table.b-table.b-table-stacked > tbody > tr > :first-child {
	border-top-width: 0 !important;
}
.table.b-table.b-table-stacked {
	margin-bottom: 80px;
    white-space: break-spaces;
}

</style>
