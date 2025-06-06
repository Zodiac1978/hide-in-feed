/**
 * JavaScript for the block editor
 * Adds "Hide from Feed" inspector control to all blocks
 */
(function(wp) {
    const { __ } = wp.i18n;
    const { addFilter } = wp.hooks;
    const { createHigherOrderComponent } = wp.compose;
    const { Fragment } = wp.element;
    const { InspectorControls } = wp.blockEditor;
    const { PanelBody, ToggleControl } = wp.components;

    /**
     * Add hide in feed attribute to all blocks
     *
     * @param {Object} settings Block settings
     * @param {string} name Block name
     * @return {Object} Modified settings
     */
    const addHideInFeedAttribute = (settings, name) => {
        // If the block doesn't have attributes, add them
        if (!settings.attributes) {
            settings.attributes = {};
        }

        // Add hideInFeed attribute if it doesn't exist
        if (!settings.attributes.hideInFeed) {
            settings.attributes.hideInFeed = {
                type: 'boolean',
                default: false,
            };
        }

        return settings;
    };

    /**
     * Add hide in feed control to all blocks
     */
    const withHideInFeedControl = createHigherOrderComponent((BlockEdit) => {
        return (props) => {
            // If it's not a valid block, just return the original component
            if (!props || !props.name) {
                return wp.element.createElement(BlockEdit, props);
            }

            const { attributes, setAttributes } = props;
            
            return wp.element.createElement(
                Fragment,
                {},
                wp.element.createElement(BlockEdit, props),
                wp.element.createElement(
                    InspectorControls,
                    {},
                    wp.element.createElement(
                        PanelBody,
                        {
                            title: __('Hide from Feed', 'hide-from-feed'),
                            initialOpen: false,
                            className: 'hide-from-feed-panel'
                        },
                        wp.element.createElement(
                            ToggleControl,
                            {
                                label: __('Do not show this block in RSS feed', 'hide-from-feed'),
                                checked: !!attributes.hideInFeed,
                                onChange: (value) => setAttributes({ hideInFeed: value }),
                                help: attributes.hideInFeed
                                    ? __('This block will be hidden in RSS feeds.', 'hide-from-feed')
                                    : __('This block will be shown in RSS feeds.', 'hide-from-feed')
                            }
                        )
                    )
                )
            );
        };
    }, 'withHideInFeedControl');

    // Add filters
    addFilter(
        'blocks.registerBlockType',
        'hide-from-feed/add-attribute',
        addHideInFeedAttribute
    );

    addFilter(
        'editor.BlockEdit',
        'hide-from-feed/add-control',
        withHideInFeedControl
    );
})(window.wp);