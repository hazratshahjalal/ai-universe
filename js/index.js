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
            <button onclick="loadToolDetails(${tool.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit"> <i class="fa-solid fa-arrow-right text-danger"></i></button>
            </div>
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
              <button onclick="loadToolDetails(${tool.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit"> <i class="fa-solid fa-arrow-right text-danger"></i></button>
              </div>
            </div>
        </div>
      `;
      toolsContainer.appendChild(toolDiv);
    });
  };

  loadAllTools();
})

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

// modal details
const loadToolDetails = idTool => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${idTool}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayToolDetails(data.tools[0]));
}

const displayToolDetails = tool => {
  document.getElementById('toolModalLabel').innerText = tool.name;
  const toolDetails = document.getElementById('')
}


