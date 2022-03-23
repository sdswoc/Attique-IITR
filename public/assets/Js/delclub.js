let msgID;

function checkId(element) {
  msgID = element;
  console.log(msgID);
  confirm();
}

function postbutton() {
  axios
    .post("/club/deleteclub", {
      msgID: `${msgID}`,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:5000/club";
    });
}

function confirm() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      postbutton();
    }
  });
}
