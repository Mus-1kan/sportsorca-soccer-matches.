fetch("https://www.scorebat.com/video-api/v3/")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".match-slider");
    const matches = data.response.slice(0, 10);

    matches.forEach(match => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h2>${match.title}</h2>
        <p>${new Date(match.date).toLocaleString()}</p>
        <a href="${match.matchviewUrl}" target="_blank">Watch Match</a>
      `;
      container.appendChild(card);
    });

    $('.match-slider').slick({
      autoplay: true,
      autoplaySpeed: 3000,
      dots: false,
      arrows: false,
      slidesToShow: 3,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2 }
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 1 }
        }
      ]
    });
  })
  .catch(err => {
    console.error("Failed to fetch match data", err);
    document.querySelector(".match-slider").innerHTML = `
      <p style="color: red;">Could not load match data. Try again later.</p>
    `;
  });
