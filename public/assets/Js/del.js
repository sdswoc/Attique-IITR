let msgID;
let bool1 = 0;

async function checkId(element) {
  msgID = element;
  console.log(msgID);
  await confirm();
}

async function permission() {
  let res = await axios.post("/acad//deleteacadpermission", {
    msgID: `${msgID}`,
  });
  console.log(res);
  if (res.data.success === "true") {
    bool1 = 1;
  }
}

function postbutton() {
  axios
    .post("/acad/deleteacad", {
      msgID: `${msgID}`,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:5000/acad";
    });
}

async function confirm() {
  let result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
  if (result.isConfirmed) {
    console.log("permission granted");
    await permission();
    console.log("done");
    console.log(bool1);
    if (bool1) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      bool1 = 0;
      postbutton();
    } else {
      swal.fire("Sorry!", "You don't have the permission", "error");
    }
  }
}
