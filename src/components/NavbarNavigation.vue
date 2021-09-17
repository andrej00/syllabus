<template>
    <div class="mt-4 pb-1">
        <b-row align-h="center">
            <b-col sm="3" class="mt-3">
                    <b-button to="/" :class="$route.name == 'OpisPrograma' ? 'button-active' : ''" variant="outline-primary">Opis Programa</b-button>
            </b-col>

            <b-col sm="3" class="mt-3">
                <b-button to="/opiskolegija" :class="$route.name == 'OpisKolegija' ? 'button-active' : ''" variant="outline-primary">Opis Kolegija</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<style scoped>
    .button-active {
        color: #fff;
        background-color: #0d6efd;
    }
</style>