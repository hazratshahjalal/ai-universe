const loadTools = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  const res = await fetch(url);
  const data = await res.json();
  displayTools(data.data.tools.slice(0, 6))
}

const displayTools = tools => {
  const toolsContainer = document.getElementById('tools-container');
  tools.forEach(tool => {

    const toolDiv = document.createElement('div');
    toolDiv.classList.add('col');
    toolDiv.innerHTML = `
      <div class="card h-100 p-3">
        <img src="${tool.image}" class="card-img-top" alt="${tool.name}">
        <div class="card-body">
          <h3 class="card-title">Featurs</h3>
          <p class="card-text">1. ${tool.features[0]}</p>
          <p class="card-text">2. ${tool.features[1]}</p>
          <p class="card-text">3. ${tool.features[2]}</p>
        </div>
        <div class="card-footer d-flex align-items-center justify-content-around">
            <div class = "row">
             <h4>${tool.name}</h4>
             <p class="text-muted"><i class="fa-regular fa-calendar-days pe-3"></i> ${tool.published_in}</p>
            </div>
            <div class = "row">
            <button onclick="loadTooldetails(${tool.id})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#toolModal">
            <i class="fa-solid fa-arrow-right"></i>
        </button>
          </div>
      </div>
    `;
    toolsContainer.appendChild(toolDiv);
  });
};

loadTools();

// for see more button to display remaining cards
document.getElementById('btn-more').addEventListener('click', function () {
  const loadAllTools = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayAllTools(data.data.tools.slice(7, 13))
  }

  const displayAllTools = tools => {
    const toolsContainer = document.getElementById('tools-container');

    tools.forEach(tool => {

      const toolDiv = document.createElement('div');
      toolDiv.classList.add('col');
      toolDiv.innerHTML = `
        <div class="card h-100 p-3">
          <img src="${tool.image}" class="card-img-top" alt="${tool.name}">
          <div class="card-body">
            <h3 class="card-title">Featurs</h3>
            <p class="card-text">1. ${tool.features[0]}</p>
            <p class="card-text">2. ${tool.features[1]}</p>
            <p class="card-text">3. ${tool.features[2]}</p>
          </div>
          <div class="card-footer d-flex align-items-center justify-content-around">
              <div class = "row">
               <h4>${tool.name}</h4>
               <p class="text-muted"><i class="fa-regular fa-calendar-days pe-3"></i> ${tool.published_in}</p>
              </div>
              <div class = "row">
              <button id="btn-show-details" onclick="loadToolDetails(${tool.id})" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#toolModal">
              <i class="fa-solid fa-arrow-right"></i>
          </button>
            </div>
        </div>
      `;
      toolsContainer.appendChild(toolDiv);
    });
  };

  loadAllTools();
})

// load tool details
const loadTooldetails = async (id) => {

  const url = `https://openapi.programming-hero.com/api/ai/tool/0${id}`
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  displayToolDetails(data.data)
}
const displayToolDetails = tool => {

  const modalTitle = document.getElementById('toolModalLabel');
  modalTitle.innerText = tool.tool_name;
  const toolDetails = document.getElementById('modal-container');
  toolDetails.innerHTML = `
  <div class="container text-center">
    <div class="row">
      <div class="col bg-light p-3 border border-danger rounded">
        <h5 class="fw-bold text-dark">${tool.description}</h5>
        <div class="row fw-bolder gap-1 my-1">
          <div class="col text-success bg-white rounded">${tool.pricing[0].price}<br>${tool.pricing[0].plan}</div>
          <div class="col text-danger bg-white rounded">${tool.pricing[1].price}<br>${tool.pricing[1].plan}</div>
          <div class="col text-warning bg-white rounded">${tool.pricing[2].price}<br>${tool.pricing[2].plan}</div>
        </div>
        <div class="row mt-2">
          <div class="col text-start">
            <h5 class="fw-bold text-dark">Features</h5>
            <p class="card-text">1. ${tool.features[1].feature_name}</p>
            <p class="card-text">2.${tool.features[2].feature_name}</p>
            <p class="card-text">3. ${tool.features[3].feature_name}</p>
          </div>
          <div class="col text-start">
            <h5 class="fw-bold text-dark">Integration</h5>
            <p class="card-text">1. ${tool.integrations[0]}</p>
            <p class="card-text">2. ${tool.integrations[1]}</p>
            <p class="card-text">3. ${tool.integrations[2]}</p>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-danger mb-3  p-2" style="max-width: 18rem;">
          <img src="${tool.image_link[0]}" class="card-img-top" alt="${tool.tool_name}">
          <div class="position-absolute top-0 end-0 bg-danger text-white rounded">${(parseFloat(tool.accuracy.score) * 100)}% accuracy</div>

          <div class="card-body">
            <h4 class="card-title">${JSON.stringify(tool.input_output_examples[0].input)}</h4>
            <p class="card-text">${JSON.stringify(tool.input_output_examples[0].output)}</p>
          </div>
        </div>
      </div>
    </div>
  `
}

// sort button
const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', function () {
  // Get all the card elements
  const cardsContainer = document.getElementById('tools-container');
  const cards = cardsContainer.querySelectorAll('.card');

  const cardsArray = Array.from(cards);

  // Sort the array by the date 
  cardsArray.sort(function (card1, card2) {
    const date1 = new Date(card1.dataset.date);
    const date2 = new Date(card2.dataset.date);
    return date1 - date2;
  });

  // Re-attach
  cardsArray.forEach(function (card) {
    cardsContainer.appendChild(card);
  });
});





// Show the spinner
document.getElementById('btn-more').addEventListener('click', function () {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';

  fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    .then(res => res.json())
    .then(data => {
      displayAllTools(data.data.tools.slice(7, 12));

      // Hide the spinner after 2 seconds
      setTimeout(function () {
        spinner.style.display = 'none';
      }, 2000);
    })
    .catch(error => {
      console.error('Error loading data:', error);
      spinner.style.display = 'none';
    });
});




