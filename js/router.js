class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }

    init() {
        window.addEventListener('DOMContentLoaded', () => {
            const path = window.location.pathname.split('/').pop().replace('.html', '');
            const route = this.routes[path];

            if (route) {
                const container = document.querySelector('main');
                route(container);
            }
        });
    }
}