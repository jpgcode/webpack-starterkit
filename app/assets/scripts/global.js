 /**
 * Global javascript
 * Add any global functionality
 */

const global = (() => {

    const init = () => {
        console.log('This is a console from global JS');
    }

    return {
        init,
        name: 'global'
    };

})();

global.init();


