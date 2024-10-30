(function (blocks) {
    const { registerBlockStyle } = blocks;

    registerBlockStyle('mdlui-block-line/colored-line', {
        name: 'striped',
        label: 'Striped',
    });

    registerBlockStyle('mdlui-block-line/colored-line', {
        name: 'shade',
        label: 'Shade',
    });

    registerBlockStyle('mdlui-block-line/colored-line', {
        name: 'dotted',
        label: 'Dotted',
    });
})(window.wp.blocks);
