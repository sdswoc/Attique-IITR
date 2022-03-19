let yearinput;
let branchinput;

function year() {
  (async () => {
    const { value: year } = await Swal.fire({
      title: "Select Year",
      input: "select",
      inputOptions: {
        Year: {
          1: "1",
          2: "2",
          3: "3",
          4: "4",
        },
      },
      inputPlaceholder: "Select your year",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value != "") {
            resolve();
          } else {
            resolve("You need to select year :)");
          }
        });
      },
    });

    if (year) {
      console.log("okay clicked");
      yearinput = year;
      document.cookie = `branch=${branchinput};same-site=lax;httpOnly: true;max-age=${
        60 * 60 * 24 * 14
      }`;
      document.cookie = `year=${yearinput};same-site=lax;httpOnly: true;max-age=${
        60 * 60 * 24 * 14
      }`;
      acadrequest();
    }
  })();
}
function acadrequest() {
  axios.get("http://localhost:5000/acad").then((res) => {
    console.log(res);
  });
}

function branch1() {
  branchinput = 1;
  year();
}
function branch2() {
  branchinput = 7;
  year();
}
function branch3() {
  branchinput = 4;
  year();
}
function branch4() {
  branchinput = 3;
  year();
}
function branch5() {
  branchinput = 5;
  year();
}
function branch6() {
  branchinput = 2;
  year();
}
function branch7() {
  branchinput = 8;
  year();
}
function branch8() {
  branchinput = 6;
  year();
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}
