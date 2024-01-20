const routes = {
    'index': (container) => {
        PageManager.loadHTMLContent('header.html', 'header');
        PageManager.loadHTMLContent('footer.html', 'footer');
    }, 'tuneit': (container) => {
        PageManager.loadHTMLContent('header.html', 'header');
        PageManager.loadHTMLContent('footer.html', 'footer');
        loadIconsForPage('tuneit');
        loadGraphForPage('tuneit');
    }, 'gazprom-neft': (container) => {
        PageManager.loadHTMLContent('header.html', 'header');
        PageManager.loadHTMLContent('footer.html', 'footer');
        loadIconsForPage('gazprom-neft');
        loadGraphForPage('gazprom-neft');
    }
};

const loadIconsForPage = (pageName) => {
    fetch(`../json/${pageName}/icons.json`)
        .then(response => response.json())
        .then(config => {
            if (config.icons) {
                IconLoader.loadIcons('tech-icons-container', config.icons.map(iconName => `../res/icons/${iconName}.svg`));
            }
        })
        .catch(error => console.error(`Error loading icons for ${pageName}:`, error));
};

const loadGraphForPage = (pageName) => {
    fetch(`../json/${pageName}/graph.json`)
        .then(response => response.json())
        .then(config => {
            if (config.graph) {
                GraphLoader.createGraph('graph-container', config.graph);
            }
        })
        .catch(error => console.error(`Error loading graph for ${pageName}:`, error));
};

const router = new Router(routes);