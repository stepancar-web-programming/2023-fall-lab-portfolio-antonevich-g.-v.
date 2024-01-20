class IconLoader {
    static loadIcons(containerId, iconPaths) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';

        let row;
        iconPaths.forEach((iconPath, index) => {
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
    }
}

class GraphLoader {
    static createGraph(containerId, graphConfig) {
        const trace = {
            x: graphConfig.data.x, y: graphConfig.data.y, type: graphConfig.type
        };

        const layout = graphConfig.layout;

        Plotly.newPlot(containerId, [trace], layout);
    }
}