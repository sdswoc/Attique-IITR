let bool = 0;
let message = "";
let tagged = "";
let clubinput = "";
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
          Workshop: "Workshop",
          IntroTalk: "IntroTalk",
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
        postfilter(tagged, clubinput);
      }
    }
  })();
}
document.getElementById("add").addEventListener("click", add);
document.getElementById("filter").addEventListener("click", filterclub);

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

function postfilter(tag, club) {
  axios
    .post("/club/filterclub", {
      tag: `${tag}`,
      club: `${club}`,
    })
    .then((res) => {
      console.log(res);
      window.location.href = "http://localhost:5000/club/clubfilterender";
    });
}

function filterclub() {
  (async () => {
    const { value: club } = await Swal.fire({
      title: "Select Club",
      input: "select",
      inputOptions: {
        Technical: {
          SDSlabs: "SDSLabs",
          MDG: "MDG", //mobiledev
          DSG: "DSG", //datascience
        },
        Cultural: {
          GeekGazette: "Geek Gazette", //getgeeky
          Eco: "Eco", //savewater
          Cinesec: "Cinesec", //cinema
        },
      },
      inputPlaceholder: "Select a club",
      showCancelButton: true,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value === "") {
            resolve("You need to select something :)");
          } else {
            resolve();
          }
        });
      },
    });

    if (club) {
      clubinput = club;
      filter();
    }
  })();
}
