(function (blocks, blockEditor, element, components) {
    const { __ } = wp.i18n; // The __() for internationalization.
    const { createElement: el, Fragment } = element; // The wp.element.createElement() function to create elements.
    const { registerBlockType } = blocks; // The registerBlockType() to register blocks.

    const {
        InspectorControls,
        BlockControls,
        AlignmentToolbar,
        PanelColorSettings,
    } = blockEditor;
    const { PanelBody, PanelRow, RangeControl, ToggleControl, TextControl, __experimentalUnitControl: UnitControl } = components;

    registerBlockType('mdlui-block-line/colored-line', {
        title: __('Colored Line', 'mdlui-block-line'), // Block title.
        icon: 'text', // Block icon from Dashicons - https://developer.wordpress.org/resource/dashicons/.
        category: 'common', // Block category - Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
        keywords: ['divider', 'line', 'separator'], // Keywords for custom block
        attributes: {
            lineWidthValue: {
                type: "string",
                default: "256px", // Default value with unit
            },
            lineHeightValue: {
                type: "string",
                default: "10px",
            },
            alignment: {
                type: "string",
                default: "center",
            },
            lineColor: {
                type: "string",
                default: '',
            },
            textColor: {
                type: "string",
                default: "#000000",
            },
            linePadding: {
                type: "number",
                selector: ".linePadding",
                default: 24,
            },
            paddingSize: {
                type: "string",
                default: "4",
            },
        }, // Placeholders to store customized settings information about the block

        edit: function (props) {
            const { attributes, setAttributes, className } = props;

            const onChangeAlignment = (newAlignment) => {
                setAttributes({
                    alignment: newAlignment === undefined ? "left" : newAlignment,
                });
            };

            const blockParentStyle = {
                padding: `${attributes.linePadding}px 0`,
                justifyContent: attributes.alignment,
            };

            const blockInnerStyle = {
                backgroundColor: attributes.lineColor || 'transparent',
                color: attributes.textColor,
                width: attributes.lineWidthValue,
                height: attributes.lineHeightValue,
            };

            return [
                el(
                    Fragment,
                    {},
                    el(
                        InspectorControls,
                        {},
                        el(PanelColorSettings, {
                            title: "Color Settings",
                            initialOpen: true,
                            colorSettings: [
                                {
                                    value: attributes.lineColor,
                                    label: "Background color",
                                    enableAlpha: true,
                                    clearable: true,
                                    onChange: (value) => setAttributes({ lineColor: value || '' }),
                                },
                                {
                                    value: attributes.textColor,
                                    label: "Text color",
                                    enableAlpha: true,
                                    clearable: true,
                                    onChange: (value) => setAttributes({ textColor: value || '' }),
                                },
                            ],
                        }),
                        el(
                            PanelBody,
                            { title: "Line Settings", initialOpen: true },
                            el(UnitControl, {
                                label: "Line Width",
                                value: attributes.lineWidthValue,
                                onChange: (value) => setAttributes({ lineWidthValue: value }),
                                units: [{ value: 'px', label: 'px' }, { value: '%', label: '%' }, { value: 'em', label: 'em' }, { value: 'rem', label: 'rem' }], // Explicitly defining units
                            }),
                            el(UnitControl, {
                                label: "Line Height",
                                value: attributes.lineHeightValue,
                                onChange: (value) => setAttributes({ lineHeightValue: value }),
                                units: [{ value: 'px', label: 'px' }, { value: 'em', label: 'em' }, { value: 'rem', label: 'rem' }], // Explicitly defining units
                            }),
                            el(RangeControl, {
                                label: "Line Padding (px)",
                                min: 0,
                                max: 100,
                                initialPosition: 16,
                                value: attributes.linePadding,
                                onChange: (value) => setAttributes({ linePadding: value }),
                            })
                        )
                    )
                ),
                el(
                    BlockControls,
                    { key: "controls" },
                    el(AlignmentToolbar, {
                        value: attributes.alignment,
                        onChange: onChangeAlignment,
                    })
                ),
                el(
                    "div",
                    { className: className },
                    el(
                        "div",
                        { className: "mdlui-block-line", style: blockParentStyle },
                        el("div", { style: blockInnerStyle })
                    )
                ),
            ];
        },

        save: function (props) {
            const { attributes, className } = props;

            const blockParentStyle = {
                padding: `${attributes.linePadding}px 0`,
                justifyContent: attributes.alignment,
            };
            const blockInnerStyle = {
                backgroundColor: attributes.lineColor || 'transparent',
                color: attributes.textColor,
                width: attributes.lineWidthValue,
                height: attributes.lineHeightValue,
            };

            return el(
                'div',
                { className: className },
                el(
                    'div',
                    { className: 'mdlui-block-line', style: blockParentStyle },
                    el('div', { className: 'mdlui-block-line--inner', style: blockInnerStyle })
                )
            );
        },
    });
})(window.wp.blocks, window.wp.blockEditor, window.wp.element, window.wp.components);
