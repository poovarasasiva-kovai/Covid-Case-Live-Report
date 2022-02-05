function sort() {
  $(document).ready(function () {
    $("#selectedColumn").DataTable();
  });
}
function load() {
  const countries = ["IN", "AUS", "SGT"];
  const countryTimeZoneCodes = {
    IND: 0,
    IST: 0,
    AUS: 1,
    AES: 1,
    ACS: 1,
    AWS: 1,
    SGT: 2,
    SIN: 2,
    SST: 2,
  }; // Probable three characters from timezone part of Date object
  let index = 0;
  try {
    const codeToCheck = new Date()
      .toString()
      .split("(")[1]
      .split(" ")[0]
      .toUpperCase()
      .substring(0, 3);
    index = countryTimeZoneCodes[codeToCheck];
  } catch (e) {
    document.write(e);
    index = 0;
  }

  document.getElementById("clsLocation").innerHTML = countries[index];
  var res = "";

  res =
    "<table id='selectedColumn' class='table table-striped table-bordered table-sm' cellspacing=0 width=100%><thead><tr><th class='th-sm'>Country</th><th class='th-sm'>NewConfirmed</th><th class='th-sm'>TotalConfirmed</th><th class='th-sm'>TotalDeaths</th></tr></thead><tbody>";

  fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (var i = 0; i < data.Countries.length; i++) {
        res +=
          "<tr><td>" +
          data.Countries[i].Country +
          "</td><td>" +
          data.Countries[i].NewConfirmed +
          "</td><td>" +
          data.Countries[i].TotalConfirmed +
          "</td><td>" +
          data.Countries[i].TotalDeaths +
          "</td></tr>";
      }
      res += "</tbody></table>";
      document.getElementById("result").innerHTML = res;

      // // Basic example
      // $(document).ready(function () {
      //   $("#selectedColumn").DataTable({
      //     ordering: true, // false to disable sorting (or any other option)
      //   });
      //   $(".dataTables_length").addClass("bs-select");
      // });
      // // $(document).ready(function () {
      // //   $("#selectedColumn").DataTable({
      // //     // columnDefs: [
      // //     //   { type: "Name", targets: [0] },
      // //     //   { type: "BookedDate", targets: [1] },
      // //     //   { type: "Session", targets: [2] },
      // //     //   { type: "Status", targets: [3] },
      // //     // ],
      // //   });
      // //   $(".dataTables_length").addClass("bs-select");
      // // });

      data.Countries.forEach((element) => {
        if (element.CountryCode == countries[index]) {
          document.getElementById("idTotalConfirmed").innerHTML =
          changeNumberFormat(element.TotalConfirmed, 3);
          document.getElementById("idNewConfirmed").innerHTML =
          changeNumberFormat(element.NewConfirmed, 3);
          document.getElementById("idTotalDeaths").innerHTML =
          changeNumberFormat(element.TotalDeaths, 3);
        }
        document.getElementById("idTotalConfirmedG").innerHTML =
        changeNumberFormat(data.Global.TotalConfirmed, 3);
        document.getElementById("idNewConfirmedG").innerHTML =
        changeNumberFormat(data.Global.NewConfirmed, 3);
        document.getElementById("idTotalDeathsG").innerHTML =
        changeNumberFormat(data.Global.TotalDeaths, 3);
      });
      sort();
    });
}

function changeNumberFormat(number, decimals, recursiveCall) {
  const decimalPoints = decimals || 2;
  const noOfLakhs = number / 100000;
  let displayStr;
  let isPlural;

  // Rounds off digits to decimalPoints decimal places
  function roundOf(integer) {
      return +integer.toLocaleString(undefined, {
          minimumFractionDigits: decimalPoints,
          maximumFractionDigits: decimalPoints,
      });
  }

  if (noOfLakhs >= 1 && noOfLakhs <= 99) {
      const lakhs = roundOf(noOfLakhs);
      isPlural = lakhs > 1 && !recursiveCall;
      displayStr = `${lakhs} Lakh${isPlural ? 's' : ''}`;
  } else if (noOfLakhs >= 100) {
      const crores = roundOf(noOfLakhs / 100);
      const crorePrefix = crores >= 100000 ? changeNumberFormat(crores, decimals, true) : crores;
      isPlural = crores > 1 && !recursiveCall;
      displayStr = `${crorePrefix} Crore${isPlural ? 's' : ''}`;
  } else {
      displayStr = roundOf(+number);
  }

  return displayStr;
}

load();
