document.addEventListener("DOMContentLoaded", ready);
function ready() {
  readyProgram();
}

const NASA_API_KEY = "cWZHXoFsUDSrWhxPt0IGWLmNG5ogkuxjR5ytwZSc";

const readyProgram = () => {
  $(function () {
    $(".datepicker").datepicker({
      language: "es",
      autoclose: true,
      format: "yyyy-mm-dd",
    });
  });
  // init default today acticle
  const today = new Date().toISOString().split("T")[0];
  getNasaData(today);
  chooseDate();
};

const chooseDate = () => {
  $(".datepicker").on("change", function (e) {
    const date = $(this).datepicker("getUTCDate").toISOString().split("T")[0];
    getNasaData(date);
  });
};

const getNasaData = async (date) => {
  try {
    const { data } = await axios.get(
      "https://api.nasa.gov/planetary/apod?api_key=" +
        NASA_API_KEY +
        `&date=${date}`
    );
    printResponse(data);
  } catch (error) {
    const dataErrorText = document.getElementById("myModalText");
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    dataErrorText.textContent = error.response.data.msg;
    myModal.show();
  }
};

const printResponse = (data) => {
  const dataCopyright = document.querySelector("[data-copyright]");
  const dataDate = document.querySelector("[data-date]");
  const dataTitle = document.querySelector("[data-title]");
  const dataExplanation = document.querySelector("[data-explanation]");
  const dataImg = document.querySelector("[data-img]");
  const dataVideo = document.querySelector("[data-video]");

  dataCopyright.textContent = data.copyright;
  dataDate.textContent = data.date;
  dataTitle.textContent = data.title;
  dataExplanation.textContent = data.explanation;
  dataImg.src = data.url;
  //   dataVideo.src = data.thumbs;
};
