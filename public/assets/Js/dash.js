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
      //use params
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
async function acadrequest() {
  await axios
    .get("http://localhost:5000/acad", {
      proxy: {
        host: "127.0.0.1",
        port: 5000,
      },
    })
    .then((res) => {
      window.location.href = "http://localhost:5000/acad";
      console.log(res);
    });
}

//bakwas
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
