document.addEventListener("DOMContentLoaded", function () {
    if (wp && wp.hooks) {

        // Filter to add custom attributes to the block
        wp.hooks.addFilter(
            "blocks.registerBlockType",
            "my-custom-plugin/add-attributes",
            function (settings, name) {
                if (name === "core/separator") {
                    settings.attributes = Object.assign(settings.attributes, {
                        customHeight: {
                            type: "number",
                            default: 20,
                        },
                    });
                }
                return settings;
            }
        );

        // Filter to add the controls to the Dimensions panel
        wp.hooks.addFilter(
            "editor.BlockEdit",
            "my-custom-plugin/with-inspector-controls",
            wp.compose.createHigherOrderComponent(function (BlockEdit) {
                return function (props) {
                    if (props.name !== "core/separator") {
                        return wp.element.createElement(
                            BlockEdit,
                            props
                        );
                    }

                    var el = wp.element.createElement;
                    var PanelBody = wp.components.PanelBody;
                    var RangeControl = wp.components.RangeControl;
                    var InspectorControls = wp.editor.InspectorControls;

                    return el(
                        "div",
                        {},
                        el(
                            BlockEdit,
                            props
                        ),
                        el(
                            InspectorControls,
                            {},
                            el(
                                PanelBody,
                                {
                                    title: "Dimensions",
                                    initialOpen: true
                                },
                                el(RangeControl, {
                                    label: "Height",
                                    value: props.attributes.customHeight,
                                    onChange: function (newHeight) {
                                        props.setAttributes({
                                            customHeight: newHeight
                                        });
                                    },
                                    min: 1,
                                    max: 300,
                                })
                            )
                        )
                    );
                };
            }, "withInspectorControls")
        );

        // Filter to apply styles on the frontend
        wp.hooks.addFilter(
            "blocks.getSaveContent.extraProps",
            "my-custom-plugin/apply-styles",
            function (extraProps, blockType, attributes) {
                if (blockType.name === "core/separator") {
                    extraProps.style = Object.assign(extraProps.style || {}, {
                        height: attributes.customHeight + "px"
                    });
                }
                return extraProps;
            }
        );
    }
});
