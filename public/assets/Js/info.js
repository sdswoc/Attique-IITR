let bool = 0;
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
        swal.fire("Sent!!");
      } else {
        Swal.fire("Selected!!");
      }
    }
  })();
}
document.getElementById("add").addEventListener("click", add);
document.getElementById("filter").addEventListener("click", filter);
