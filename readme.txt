=== Hide in Feed ===
Contributors: zodiac1978
Donate link: https://www.paypal.com/paypalme/zodiac1978
Tags: feed, RSS, Hide
Requires at least: 5.0
Tested up to: 6.8
Stable tag: 1.0.0
Requires PHP: 7.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds a "Hide in Feed" option to all blocks, allowing you to exclude specific blocks from RSS feeds.

== Description ==

This plugin allows editors to selectively hide individual blocks from a post's RSS feed without affecting how the content appears on the website.

Each block gains a "Hide in feed" panel in the editor sidebar, letting you toggle whether that block appears in the feed.

This is useful for:
* Removing call-to-action buttons, forms, or other content that makes no sense in a feed reader.

The block is still fully rendered on the website — it’s only excluded from the feed.

== Installation ==

1. Upload the plugin folder to `/wp-content/plugins/hide-in-feed` or install via the WordPress Plugin Directory.
2. Activate the plugin through the **Plugins** menu.
3. Edit a post and select a block.
4. In the block sidebar, find the **"Hide in feed"** panel and toggle the switch.
5. Save the post. The block will no longer appear in the RSS feed.

== Frequently Asked Questions ==

= Can I contribute to this plugin? =

Yes! Contributions are welcome on GitHub. You can submit issues, suggest improvements, or open pull requests at:

👉 [https://github.com/zodiac1978/hide-in-feed](https://github.com/zodiac1978/hide-in-feed)

= Will this affect my website content? =

No. The plugin only filters block content **when it's rendered for RSS feeds**. It does not change what’s displayed on your website.

= What if a block is duplicated or moved? =

Each block’s state is tracked by a unique internal ID (`clientId`), which can change if you duplicate or move blocks. Re-check the setting if something gets reset.

== Screenshots ==

1. The “Hide in feed” toggle panel in the block editor.

== Changelog ==

= 1.0.0 =
* Initial release. Adds toggle to all blocks and filters feed output accordingly.

== Upgrade Notice ==

= 1.0.0 =
First release. Adds feed filtering based on block editor settings.
