const pageIcons = {
    'tuneit.html': [
        'res/icons/linux.svg',
        'res/icons/docker.svg',
        'res/icons/python.svg',
        'res/icons/django.svg',
        'res/icons/django_rest.svg',
        'res/icons/postgres.svg',
    ],
    'gazprom-neft.html': [
        'res/icons/linux.svg',
        'res/icons/kuber.svg',
        'res/icons/python.svg',
        'res/icons/fastapi.svg',
        'res/icons/swagger.svg',
        'res/icons/postgres.svg',
        'res/icons/redis.svg',
        'res/icons/numpy.svg',
        'res/icons/pandas.svg',
    ]
};

function loadIconsForCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const icons = pageIcons[currentPage] || [];
    loadIcons('tech-icons-container', icons);
}

function loadIcons(iconContainerId, icons) {
    const container = document.getElementById(iconContainerId);
    container.innerHTML = '';
    icons.forEach(iconPath => {
        const icon = document.createElement('img');
        icon.src = iconPath;
        icon.classList.add('tech-icon');
        container.appendChild(icon);
    });
}

function createGazpromGraph() {
    const trace = {
        x: ['Май', 'Июнь', 'Июль', 'Август', 'Сентярь', '...'],
        y: [100, 150, 130, 170, 210, 420],
        type: 'scatter'
    };

    const layout = {
        title: 'Акции газпрома с момента как я присоединился'
    };

    Plotly.newPlot('graph-container', [trace], layout);
}

function createTuneItGraph() {
    const trace = {
        x: ['До', 'После'],
        y: [3.1, 4.9], // Replace with actual average scores
        type: 'bar'
    };

    const layout = {
        title: 'Средний балл в ИТМО ... устройства'
    };

    Plotly.newPlot('graph-container', [trace], layout);
}

function loadGraphForCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage === 'gazprom-neft.html') {
        createGazpromGraph();
    } else if (currentPage === 'tuneit.html') {
        createTuneItGraph();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    loadIconsForCurrentPage();
    loadGraphForCurrentPage();
});