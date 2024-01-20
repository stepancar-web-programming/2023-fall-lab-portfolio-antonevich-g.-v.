class PageManager {
    static loadHTMLContent(url, containerSelector) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                const container = document.querySelector(containerSelector);
                if ('setHTML' in container) {
                    container.setHTML(html);
                } else {
                    container.innerHTML = this.cleanHTML(html);
                }
            })
            .catch(error => {
                console.error(`Error loading content from ${url}:`, error);
            });
    }

    static cleanHTML(html) {
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
    }
}