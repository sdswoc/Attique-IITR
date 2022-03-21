let bool = 0;
let message = "";
let tagged = "";
function add() {
  (async () => {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Message",
      inputPlaceholder: "Type your message here...",
      inputAttributes: {
        "aria-label": "Type your message here",
      },
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    if (text) {
      bool = 1;
      message = text;
      filter();
    }
  })();
}

function filter() {
  (async () => {
    const inputOptions = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          Submission: "Submission",
          Exam: "Exam",
          Event: "Event",
        });
      }, 0);
    });

    const { value: tag } = await Swal.fire({
      title: "Select Category",
      input: "radio",
      inputOptions: inputOptions,
      inputValidator: (value) => {
        if (!value) {
          return "You need to choose something!";
        }
      },
    });

    if (tag) {
      if (bool) {
        bool = 0;
        tagged = tag;
        swal.fire("Sent!!");
        postmessage(message, tagged);
      } else {
        tagged = tag;
        Swal.fire("Selected!!");
        postfilter(tagged);
      }
    }
  })();
}
document.getElementById("add").addEventListener("click", add);
//document.getElementById("filter").addEventListener("click", filter);

function postmessage(message, tag) {
  axios
    .post("/club/addclubpost", {
      message: `${message}`,
      tag: `${tag}`,
    })
    .then((res) => {
      window.location.href = "http://localhost:5000/club";
      console.log(res);
    });
}

/*function postfilter(tag) {
  axios
    .post("/acad/filteracad", {
      tag: `${tag}`,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:5000/acad/filterviewacad";
    });
}*/
