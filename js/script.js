const PageManager = {
    pageIcons: {
        'tuneit.html': [
            '../res/icons/linux.svg',
            '../res/icons/docker.svg',
            '../res/icons/python.svg',
            '../res/icons/django.svg',
            '../res/icons/django_rest.svg',
            '../res/icons/postgres.svg',
        ],
        'gazprom-neft.html': [
            '../res/icons/linux.svg',
            '../res/icons/kuber.svg',
            '../res/icons/python.svg',
            '../res/icons/fastapi.svg',
            '../res/icons/swagger.svg',
            '../res/icons/postgres.svg',
            '../res/icons/mongodb.svg',
            '../res/icons/redis.svg',
            '../res/icons/numpy.svg',
            '../res/icons/pandas.svg',
        ]
    },

    loadIconsForCurrentPage: function () {
        const currentPage = window.location.pathname.split('/').pop();
        const icons = this.pageIcons[currentPage] || [];
        if (icons.length === 0) {
            return;
        }
        this.loadIcons('tech-icons-container', icons);
    },

    loadIcons: function (iconContainerId, icons) {
        const container = document.getElementById(iconContainerId);
        container.innerHTML = '';
        let row;

        icons.forEach((iconPath, index) => {
            if (index % 2 === 0) {
                row = document.createElement('div');
                row.className = 'icon-row';
                container.appendChild(row);
            }

            const icon = document.createElement('img');
            icon.src = iconPath;
            icon.className = 'tech-icon';
            row.appendChild(icon);
        });
    },

    createGazpromGraph: function () {
        const trace = {
            x: ['Май (Устроился)', 'Июнь', 'Июль', 'Август', 'Сентябрь', '...'],
            y: [100, 150, 130, 170, 210, 420],
            type: 'scatter'
        };

        const layout = {
            title: 'Акции газпрома'
        };

        Plotly.newPlot('graph-container', [trace], layout);
    },

    createTuneItGraph: function () {
        const trace = {
            x: ['До устройства', 'После устройства'],
            y: [3.1, 4.9],
            type: 'bar'
        };

        const layout = {
            title: 'Средний балл в ИТМО'
        };

        Plotly.newPlot('graph-container', [trace], layout);
    },

    loadGraphForCurrentPage: function () {
        const currentPage = window.location.pathname.split('/').pop();
        if (currentPage === 'gazprom-neft.html') {
            this.createGazpromGraph();
        } else if (currentPage === 'tuneit.html') {
            this.createTuneItGraph();
        }
    },

    loadHTMLContent: function (url, containerSelector) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.querySelector(containerSelector).innerHTML = html;
            })
            .catch(error => {
                console.error(`Error loading content from ${url}:`, error);
            });
    },

    adjustMainContentMargin: function () {
        const footerHeight = document.querySelector('footer').offsetHeight;
        document.querySelector('main').style.paddingBottom = footerHeight + 'px';
    },

    init: function () {
        this.loadHTMLContent('header.html', 'header');
        this.loadHTMLContent('footer.html', 'footer');
        this.loadIconsForCurrentPage();
        this.loadGraphForCurrentPage();
    }
};

window.addEventListener('DOMContentLoaded', () => {
    PageManager.init();
    window.addEventListener('resize', () => PageManager.adjustMainContentMargin());
});