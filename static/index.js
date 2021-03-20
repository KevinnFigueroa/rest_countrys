var app = new Vue({
  el: "#app",
  data: {
    informationCards: [],
    axiosConfig: {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    },
    informationCard: {
      country: "",
      population: "",
      region: "",
      capital: "",
    },
    filterByCountry: "",
    regionSelected: "",
  },
  methods: {
    getCountrys: getCountrys(),
    keymonitor: ($event) => {
      searchByCountry();
    },
    onChangeOptionRegion: (optionSelected) => {
      searchByregion(optionSelected.target.value);
    },
  },
  /*async created() {
    try {
      let response = await axios.get("https://restcountries.eu/rest/v2/all");
      console.log("respuesta del read: ", response["data"]);

      this.informationCards = response["data"];
      //console.log(`Objetos ${response["data"]}`);

      console.log(`IMPRIMO INFORMATIONCARD ${this.informationCards}`);
    } catch (error) {
      console.log(error);
    }
  },*/
});

async function getCountrys() {
  try {
    let response = await axios.get("https://restcountries.eu/rest/v2/all");

    app.informationCards = response["data"];
  } catch (error) {
    console.log(error);
  }
}

async function searchByCountry() {
  if (app.filterByCountry != "") {
    let arrayFilter = app.informationCards.filter((country) => {
      if (
        country.name.toUpperCase().includes(app.filterByCountry.toUpperCase())
      ) {
        return true;
      } else {
        return false;
      }
    });
    app.informationCards = arrayFilter;
  } else {
    if (app.regionSelected != "") {
      searchByregion(app.regionSelected);
    } else {
      getCountrys();
    }
  }
}

async function searchByregion(region) {
  console.log(region);
  app.regionSelected = region;
  let url = `https://restcountries.eu/rest/v2/region/${region}`;
  let result = await axios.get(url);

  app.informationCards = result["data"];
}

//background-image: url('https://restcountries.eu/data/col.svg')
