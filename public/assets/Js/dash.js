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
      acadrequest();
    }
  })();
}
document.querySelectorAll(".a").forEach((item) => {
  item.addEventListener("click", year);
});
function acadrequest() {
  axios.get("http://localhost:5000/acad").then((res) => {
    console.log(res);
  });
}

function branch1(){
  branchinput=document.getElementById('1').value
}
function branch2(){
  branchinput=document.getElementById('2').value
}
function branch3(){
  branchinput=document.getElementById('3').value
}
function branch4(){
  branchinput=document.getElementById('4').value
}
function branch5(){
  branchinput=document.getElementById('5').value
}
function branch6(){
  branchinput=document.getElementById('6').value
}
function branch7(){
  branchinput=document.getElementById('7').value
}
function branch8(){
  branchinput=document.getElementById('8').value
}
function branch9(){
  branchinput=document.getElementById('9').value
}
function branch10(){
  branchinput=document.getElementById('10').value
}
function branch11(){
  branchinput=document.getElementById('11').value
}