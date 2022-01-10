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
            element.TotalConfirmed;
          document.getElementById("idNewConfirmed").innerHTML =
            element.NewConfirmed;
          document.getElementById("idTotalDeaths").innerHTML =
            element.TotalDeaths;
        }
        document.getElementById("idTotalConfirmedG").innerHTML =
          data.Global.TotalConfirmed;
        document.getElementById("idNewConfirmedG").innerHTML =
          data.Global.NewConfirmed;
        document.getElementById("idTotalDeathsG").innerHTML =
          data.Global.TotalDeaths;
      });
      sort();
    });
}

load();
