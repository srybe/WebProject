const track = document.getElementById("image-track");

const handleOnDown = (e) => {
  track.dataset.mouseDownAt = e.clientX;
};

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
  const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + nextPercentage}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};


window.addEventListener("mousedown", (e) => {
  handleOnDown(e);
});

window.addEventListener("touchstart", (e) => {
  handleOnDown(e.touches[0]);
});

window.addEventListener("mouseup", (e) => {
  handleOnUp(e);
});

window.addEventListener("touchend", (e) => {
  handleOnUp(e.touches[0]);
});

window.addEventListener("mousemove", (e) => {
  handleOnMove(e);
});

window.addEventListener("touchmove", (e) => {
  handleOnMove(e.touches[0]);
});
