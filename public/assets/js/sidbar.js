let minimized = false;
    let sidebarMobile = false;
    let activeItem = 'Tarefas';
    let userRole = null;
    let membros = [];
    let clients = [];
    let alert = null;

    function filterMenuItems() {
      const restrictedRoutesForMember = ['Equipa', 'Documentos', 'Configurações', 'Permissões'];
      const menuItems = document.querySelectorAll('#menu-items .menu-item');
      menuItems.forEach(item => {
        const name = item.getAttribute('data-name');
        if (userRole === 'member' && restrictedRoutesForMember.includes(name)) {
          item.style.display = 'none';
        } else {
          item.style.display = 'block';
        }
      });

      const currentPath = window.location.pathname;
      const restrictedPaths = ['/workspace/equipa', '/workspace/documentos', '/configuracao', '/workspace/permissoes'];
      if (userRole === 'member' && restrictedPaths.includes(currentPath)) {
        window.location.href = '/workspace';
      }
    }

    function toggleSidebar() {
      const sidebar = document.getElementById('sidebar');
      const toggleIcon = document.getElementById('toggle-icon');
      const workspaceSection = document.getElementById('workspace-section');
      const mainContent = document.querySelector('.main-content');

      if (window.innerWidth < 768) {
        sidebarMobile = !sidebarMobile;
        sidebar.classList.toggle('active', sidebarMobile);
        sidebar.classList.toggle('sidebar-mobile', sidebarMobile);
      } else {
        minimized = !minimized;
        sidebar.classList.toggle('sidebar-mini', minimized);
        if (minimized) {
          toggleIcon.classList.remove('fa-chevron-left');
          toggleIcon.classList.add('fa-chevron-right');
          workspaceSection.querySelector('span').style.display = 'none';
          workspaceSection.querySelector('i').classList.add('mx-auto');
          document.querySelectorAll('.menu-item i, .workspace-button i').forEach(icon => {
            icon.style.fontSize = '20px';
          });
        } else {
          toggleIcon.classList.remove('fa-chevron-right');
          toggleIcon.classList.add('fa-chevron-left');
          workspaceSection.querySelector('span').style.display = 'inline';
          workspaceSection.querySelector('i').classList.remove('mx-auto');
          document.querySelectorAll('.menu-item i, .workspace-button i').forEach(icon => {
            icon.style.fontSize = '20px';
          });
        }
      }
    }

    function handleClickOutside(event) {
      const mobileMenu = document.getElementById('mobile-menu');
      const sidebar = document.getElementById('sidebar');
      if (mobileMenu && !mobileMenu.contains(event.target) && !event.target.closest('.btn')) {
        mobileMenu.classList.add('d-none');
      }
      if (sidebarMobile && sidebar && !sidebar.contains(event.target) && !event.target.closest('.btn')) {
        sidebarMobile = false;
        sidebar.classList.remove('active');
        sidebar.classList.remove('sidebar-mobile');
      }
    }

    function handleItemClick(name) {
      activeItem = name;
      document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.toggle('active', item.getAttribute('data-name') === name);
      });
    }

    // Initialize menu item click handlers
    document.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => handleItemClick(item.getAttribute('data-name')));
    });

    // Set active item based on current path
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPath || (href !== '/dashboard' && currentPath.startsWith(href))) {
        activeItem = item.getAttribute('data-name');
        item.classList.add('active');
      }
    });

    // Carregar dados ao iniciar
    fetchUserData();
    fetchMembersAndClients();

    // Adicionar evento de clique fora para fechar o menu
    document.addEventListener('mousedown', handleClickOutside);