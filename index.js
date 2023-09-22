document.addEventListener("DOMContentLoaded", ready);
function ready() {
  readyProgram();
}

const NASA_API_KEY = "cWZHXoFsUDSrWhxPt0IGWLmNG5ogkuxjR5ytwZSc";
const defaultData = {
  copyright: "Jeff Dai",
  date: "2023-09-22",
  explanation:
    "During the day, over 12,000 large mirrors reflect sunlight at the 100-megawatt, molten-salt, solar thermal power plant at the western edge of the Gobi desert near Dunhuang, Gansu Province, China. Individual mirror panels turn to track the sun like sunflowers. They conspire to act as a single super mirror reflecting the sunlight toward a fixed position, the power station's central tower. During the night the mirrors stand motionless though. They reflect the light of the countless distant stars, clusters and nebulae of the Milky Way and beyond. This sci-fi night skyscape was created with a camera fixed to a tripod near the edge of the giant mirror matrix on September 15. The camera's combined sequence of digital exposures captures concentric arcs of celestial star trails through the night with star trails in surreal mirrored reflection.",
  hdurl: "https://apod.nasa.gov/apod/image/2309/CosmosinReflection-1.jpg",
  media_type: "image",
  service_version: "v1",
  title: "Cosmos in Reflection",
  url: "https://apod.nasa.gov/apod/image/2309/CosmosinReflectionTrails.jpg",
};

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
      `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&date=${date}`
    );
    printResponse(data);
  } catch (error) {
    const dataErrorText = document.getElementById("myModalText");
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    dataErrorText.textContent = error.response.data.msg;
    myModal.show();
  }
};

const printResponse = (data = defaultData) => {
  const dataCopyright = document.querySelector("[data-copyright]");
  const dataDate = document.querySelector("[data-date]");
  const dataTitle = document.querySelector("[data-title]");
  const dataExplanation = document.querySelector("[data-explanation]");
  const dataImg = document.querySelector("[data-img]");
  //   const dataVideo = document.querySelector("[data-video]");

  dataCopyright.textContent = data.copyright;
  dataDate.textContent = data.date;
  dataTitle.textContent = data.title;
  dataExplanation.textContent = data.explanation;
  dataImg.src = data.url;
  //   dataVideo.src = data.thumbs;

  lazyLoadImg();
};

function lazyLoadImg() {
  const img = $("[data-img]");
  img.removeClass("show");

  const placeholder = $(".placeholder-my");
  placeholder.addClass("look");

  img.on("load", function () {
    placeholder.removeClass("look");
    $(this).addClass("show");
  });
}
