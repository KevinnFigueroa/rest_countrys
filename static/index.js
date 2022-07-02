const URL_API = "https://restcountries.com/v3.1"

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

});

var backupInformationCards = [];
var isInit = true;

async function getCountrys() {
  
  try {
    let result = await axios.get(`${URL_API}/all`);
    
    result = formatCapital(result);
    app.informationCards = result;
  } catch (error) {
    console.log(error);
  }

  if(isInit){
    // Hacemos backup
    backupInformationCards = app.informationCards;
    isInit = false;
  }
}

function filterByCountry(object){
  let filter = object.filter((country) => {
    if (
      country.name.official.toUpperCase().includes(app.filterByCountry.toUpperCase())
    ) {
      return true;
    } else {
      return false;
    }

  });

  return filter;
}


async function searchByCountry() {

  if (app.filterByCountry != "") {
    if(app.regionSelected != ""){
      var arrayFilter = filterByCountry(app.informationCards);  
    }else{
      var arrayFilter = filterByCountry(backupInformationCards);
    }

    app.informationCards = arrayFilter;
  } else {
    if (app.regionSelected != "") {
      searchByregion(app.regionSelected);
    } else {
      app.informationCards = backupInformationCards;
    }
  }
}

function formatCapital(result) {
  result = result["data"]

  Array.from(result).forEach((country) => {
    if ('capital' in country) {
      country["capital"] = country["capital"][0];
    }
  })

  return result;
}

async function searchByregion(region) {
  app.regionSelected = region;

  if (region == "filter-by-region") {
    app.informationCards = backupInformationCards;
    return;
  }

  let url = `${URL_API}/region/${region}`;
  let result = await axios.get(url);

  result = formatCapital(result);
  app.informationCards = result;
}

//background-image: url('https://restcountries.eu/data/col.svg')
