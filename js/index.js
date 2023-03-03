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
      <div class="card h-100">
        <img src="${tool.image}" class="card-img-top" alt="${tool.title}">
        <div class="card-body">
          <h5 class="card-title">${tool.title}</h5>
          <p class="card-text">${tool.description}</p>
        </div>
        <div class="card-footer">
          <small class="text-muted">Last updated ${tool.lastUpdated}</small>
        </div>
      </div>
    `;
    toolsContainer.appendChild(toolDiv);
  });
};


loadTools();
