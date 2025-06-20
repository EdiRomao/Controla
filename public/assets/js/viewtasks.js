const orderData = [
    { id: 1, tipo: "T", Tarefa: "Manutenção servidor", Prioridade: "Alta", Responsável: "José Matos", Status: "Concluída", Início: "31 Nov 17", Prazo: "20 Abr", pdf: true, empresa: "Interno" },
    { id: 2, tipo: "T", Tarefa: "Reunião com cliente Top Brands", Prioridade: "Alta", Responsável: "Raquel", Status: "Pendente", Início: "31 Nov 17", Prazo: "10 Abr", pdf: true, empresa: "Top Brands" },
    { id: 3, tipo: "T", Tarefa: "Entrega de peças", Prioridade: "Média", Responsável: "Helder Costa", Status: "Atrasado", Início: "31 Nov 17", Prazo: "15 Mai", pdf: true, empresa: "Interno" },
    { id: 4, tipo: "T", Tarefa: "Reunião com a Chevron", Prioridade: "Alta", Responsável: "Barroso", Status: "Pendente", Início: "31 Nov 17", Prazo: "15 Agos", pdf: true, empresa: "Chevron" },
    { id: 5, tipo: "T", Tarefa: "Assinatura de contrato com o BNA", Prioridade: "Alta", Responsável: "Patricio Maquenze", Status: "Concluída", Início: "20 Set", Prazo: "12 Dec", pdf: true, empresa: "BNA" },
    { id: 6, tipo: "T", Tarefa: "Viagem para Espanha dos funcionários", Prioridade: "Baixa", Responsável: "Raquel", Status: "Atrasada", Início: "31 Nov 17", Prazo: "20 Abr", pdf: true, empresa: "Interno" },
    { id: 7, tipo: "T", Tarefa: "Reunião com a Worten", Prioridade: "Média", Responsável: "Raquel", Status: "Pendente", Início: "31 Nov 17", Prazo: "10 Ouct", pdf: true, empresa: "Worten" }
  ];

  let filteredData = orderData;
  let viewMode = 'grid';
  let selectedCompany = 'todas';

  function getStatusStyle(status) {
    switch(status) {
      case "Concluída": return "text-success";
      case "Atrasada":
      case "Atrasado": return "text-danger";
      case "Pendente": return "text-warning";
      default: return "text-dark";
    }
  }

  function getCompanyColor(company) {
    const colorMap = {
      "todas": "#00565a",
      "Interno": "#5a287d",
      "Top Brands": "#e74c3c",
      "Chevron": "#f39c12",
      "BNA": "#3498db",
      "Worten": "#dc3545"
    };
    return colorMap[company] || "#6c757d";
  }

  function renderTasks() {
    const taskGrid = document.getElementById('taskGrid');
    const taskTable = document.getElementById('taskTable');
    taskGrid.innerHTML = '';
    taskTable.innerHTML = '';

    filteredData.forEach(item => {
      if (viewMode === 'grid') {
        taskGrid.innerHTML += `
          <div class="col-lg-4 mb-4">
            <div class="card border-0 shadow-sm h-100">
              <div class="card-header bg-white py-2 px-3" style="border-left: 4px solid ${getCompanyColor(item.empresa)};">
                <h5 class="mb-0">${item.Tarefa}</h5>
              </div>
              <div class="card-body">
                <div class="row mb-2"><div class="col-4">Empresa:</div><div class="col-8 fw-bold">${item.empresa}</div></div>
                <div class="row mb-2"><div class="col-4">Prioridade:</div><div class="col-8 fw-bold">${item.Prioridade}</div></div>
                <div class="row mb-2"><div class="col-4">Responsável:</div><div class="col-8 fw-bold">${item.Responsável}</div></div>
                <div class="row mb-2"><div class="col-4">Status:</div><div class="col-8 fw-bold ${getStatusStyle(item.Status)}">${item.Status}</div></div>
                <div class="row mb-2"><div class="col-4">Início:</div><div class="col-8 fw-bold">${item.Início}</div></div>
                <div class="row mb-2"><div class="col-4">Prazo:</div><div class="col-8 fw-bold">${item.Prazo}</div></div>
              </div>
            </div>
          </div>
        `;
      } else {
        taskTable.innerHTML += `
          <tr>
            <td class="py-3"><input type="checkbox" class="form-check-input"></td>
            <td class="py-3">
              <div class="d-flex align-items-center">
                <div class="me-2 d-flex align-items-center justify-content-center text-white" style="width: 24px; height: 24px; border-radius: 4px; background-color: ${getCompanyColor(item.empresa)}; font-size: 0.8rem;">${item.tipo}</div>
                ${item.Tarefa}
              </div>
            </td>
            <td class="py-3"><span class="badge" style="background-color: ${getCompanyColor(item.empresa)}; color: white;">${item.empresa}</span></td>
            <td class="py-3">${item.Prioridade}</td>
            <td class="py-3">${item.Responsável}</td>
            <td class="py-3 ${getStatusStyle(item.Status)}">${item.Status}</td>
            <td class="py-3">${item.Início}</td>
            <td class="py-3">${item.Prazo}</td>
            <td class="py-3"><a href="#" class="text-success"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg></a></td>
          </tr>
        `;
      }
    });
  }

  function updateCompanyInfo() {
    const companyInfo = document.getElementById('companyInfo');
    const selectedCompanyName = document.getElementById('selectedCompanyName');
    const totalTasks = document.getElementById('totalTasks');
    const pendingTasks = document.getElementById('pendingTasks');
    const completedTasks = document.getElementById('completedTasks');
    const delayedTasks = document.getElementById('delayedTasks');

    if (selectedCompany === 'todas') {
      companyInfo.classList.add('d-none');
    } else {
      companyInfo.classList.remove('d-none');
      selectedCompanyName.textContent = selectedCompany;
      totalTasks.textContent = filteredData.length;
      pendingTasks.textContent = filteredData.filter(item => item.Status === 'Pendente').length;
      completedTasks.textContent = filteredData.filter(item => item.Status === 'Concluída').length;
      delayedTasks.textContent = filteredData.filter(item => ['Atrasada', 'Atrasado'].includes(item.Status)).length;
    }
  }

  function filterCompany(company) {
    selectedCompany = company;
    document.querySelectorAll('.btn-outline-secondary').forEach(btn => {
      btn.style.backgroundColor = 'transparent';
      btn.style.color = btn.style.borderColor;
    });
    const selectedBtn = document.querySelector(`button[onclick="filterCompany('${company}')"]`);
    selectedBtn.style.backgroundColor = selectedBtn.style.borderColor;
    selectedBtn.style.color = 'white';

    filteredData = company === 'todas' ? orderData : orderData.filter(item => item.empresa === company);
    renderTasks();
    updateCompanyInfo();
  }

  function filterTasks(searchTerm) {
    filteredData = orderData.filter(item => 
      selectedCompany === 'todas' ? true : item.empresa === selectedCompany
    ).filter(item => 
      item.Tarefa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Responsável.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.empresa.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderTasks();
    updateCompanyInfo();
  }

  function toggleView(mode) {
    viewMode = mode;
    document.getElementById('gridView').classList.toggle('d-none', mode !== 'grid');
    document.getElementById('listView').classList.toggle('d-none', mode !== 'list');
    document.getElementById('gridViewBtn').classList.toggle('btn-primary', mode === 'grid');
    document.getElementById('gridViewBtn').classList.toggle('btn-outline-secondary', mode !== 'grid');
    document.getElementById('listViewBtn').classList.toggle('btn-primary', mode === 'list');
    document.getElementById('listViewBtn').classList.toggle('btn-outline-secondary', mode !== 'list');
    document.getElementById('gridViewBtn').style.backgroundColor = mode === 'grid' ? '#00565a' : '';
    document.getElementById('listViewBtn').style.backgroundColor = mode === 'list' ? '#00565a' : '';
    renderTasks();
  }

  // Initial render
  renderTasks();
  updateCompanyInfo();