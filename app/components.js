// Styles entry file
import './assets/styles/main.scss';

// Global
import './assets/scripts/global';

// Handlebars
import './pages/index.hbs';

import { intro } from './components/intro/intro';
import './components/intro/intro.hbs';
import './components/intro/intro.json';

/**
 * Module definition
 * Object that contains Javascript modules
 */
const APP = {
    intro
};

/**
 * Module init controller
 * Init the modules automatically only if they are preset in a page
 */
const initController = (() => {
        const componentIdAttribute = 'data-action';

        const init = () => {
            const matchingComponents = document.querySelectorAll('*[data-action]');
            initComponents(matchingComponents);
        };

        const initComponents = (matchingComponents) => {
            Array.from(matchingComponents).forEach((component) => {
                const componentAttr = component.getAttribute(componentIdAttribute);
                const finalName = componentAttr.charAt(0) + componentAttr.slice(1);

                // Call the components as needed
                if (finalName === APP[finalName].name) {
                    APP[finalName].init(component);
                }
            });
        };

        init();
})();

