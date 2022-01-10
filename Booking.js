fetch("https://bookingdata-api.herokuapp.com/Booking")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    var res = "";

    res =
      "<table id='sort' class='table table-striped table-bordered table-sm' cellspacing=0 width=100%><thead><tr><th class='th-sm'>Name</th><th class='th-sm'>BookedDate</th><th class='th-sm'>Session</th><th class='th-sm'>Status</th></tr></thead><tbody>";

    for (var i = 0; i < data.length; i++) {
      res +=
        "<tr><td>" +
        data[i].Name +
        "</td><td>" +
        data[i].BookedDate +
        "</td><td>" +
        data[i].Session +
        "</td><td>" +
        data[i].Status +
        "</td></tr>";
    }
    res += "</tbody></table>";
    document.getElementById("result").innerHTML = res;

    $(document).ready(function () {
      $("#sort").DataTable({
        // columnDefs: [
        //   { type: "Name", targets: [0] },
        //   { type: "BookedDate", targets: [1] },
        //   { type: "Session", targets: [2] },
        //   { type: "Status", targets: [3] },
        // ],
      });
      $(".dataTables_length").addClass("bs-select");
    });
  });
