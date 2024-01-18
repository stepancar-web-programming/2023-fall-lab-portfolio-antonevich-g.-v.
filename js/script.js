const PageManager = {
    iconPathPrefix: "../res/icons/",

    getCurrentPageName: function () {
        return window.location.pathname.split('/').pop().replace('.html', '');
    },

    fetchPageConfig: function (pageName) {
        const configUrl = `../json/${pageName}.json`;
        return fetch(configUrl)
            .then(response => response.json())
            .catch(error => {
                console.error(`Error loading config for ${pageName}:`, error);
                return {};
            });
    },

    loadIconsForCurrentPage: function () {
        const currentPage = this.getCurrentPageName();
        this.fetchPageConfig(currentPage).then(config => {
            if (config.icons && config.icons.length > 0) {
                const iconPaths = config.icons.map(iconName => `${this.iconPathPrefix}${iconName}.svg`);
                this.loadIcons('tech-icons-container', iconPaths);
            }
        });
    },

    loadGraphForCurrentPage: function () {
        const currentPage = this.getCurrentPageName();
        this.fetchPageConfig(currentPage).then(config => {
            if (config.graph) {
                this.createGraph(config.graph);
            }
        });
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

    createGraph: function (graphConfig) {
        const trace = {
            x: graphConfig.data.x,
            y: graphConfig.data.y,
            type: graphConfig.type
        };
        Plotly.newPlot('graph-container', [trace], graphConfig.layout);
    },

    loadHTMLContent: function (url, containerSelector) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                document.querySelector(containerSelector).innerHTML = this.cleanHTML(html);
            })
            .catch(error => {
                console.error(`Error loading content from ${url}:`, error);
            });
    },

    cleanHTML: function (html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const scripts = doc.querySelectorAll('script');
        scripts.forEach(script => script.remove());

        const allElements = doc.querySelectorAll('*');
        allElements.forEach(el => {
            [...el.attributes].forEach(attr => {
                if (attr.name.startsWith('on')) {
                    el.removeAttribute(attr.name);
                }
            });
        });

        return doc.body.innerHTML;
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
});