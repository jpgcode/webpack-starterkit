/**
 * Intro component
 * Controls intro component functionality
 */

const intro = (() => {

    const init = () => {
        console.log('This is a console from intro component');
    }

    return {
        init,
        name: 'intro'
    };

})();

export { intro };

