# Discord Theme Variables
*Generated on 08/01/2026 at 19:35:26*

This document contains all CSS variables and theme constants currently available in Discord.

## Table of Contents
- [Background](#background)
- [Text & Typography](#text-typography)
- [Interactive](#interactive)
- [Button](#button)
- [Input & Form](#input-form)
- [Border & Divider](#border-divider)
- [Status](#status)
- [Brand & Premium](#brand-premium)
- [Colors - Primary](#colors-primary)
- [Colors - Black/White](#colors-black-white)
- [Colors - Blue](#colors-blue)
- [Colors - Green](#colors-green)
- [Colors - Red](#colors-red)
- [Colors - Yellow](#colors-yellow)
- [Colors - Orange](#colors-orange)
- [Colors - Pink](#colors-pink)
- [Colors - Teal](#colors-teal)
- [Colors - Neutral](#colors-neutral)
- [Guild & Channel](#guild-channel)
- [Modal & Popout](#modal-popout)
- [Shadow & Elevation](#shadow-elevation)
- [Spacing & Size](#spacing-size)
- [Radius](#radius)
- [Custom Properties](#custom-properties)
- [Miscellaneous](#miscellaneous)

---

## Background

| Variable | Value | Type |
|----------|-------|------|
| `--__obscured-background-blur-radius` | `40px` | CSS |
| `--__obscured-background-brightness` | `0.55` | CSS |
| `--__spoiler-background-color--hidden` | `color-mix(in oklab,hsl(234 calc(1*4.673%) 41.96...` | CSS |
| `--__spoiler-background-color--hidden--hover` | `color-mix(in oklab,hsl(233.333 calc(1*3.797%) 5...` | CSS |
| `--__spoiler-background-color--revealed` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--__spoiler-warning-background-color` | `hsl(0 calc(1*0%) 0%/0.6)` | CSS |
| `--__spoiler-warning-background-color--hover` | `hsl(0 calc(1*0%) 0%/0.8784313725490196)` | CSS |
| `--app-frame-background` | `color-mix(in oklab,hsl(240 calc(1*12.5%) 3.137%...` | CSS |
| `--background-accent` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--background-base-low` | `color-mix(in oklab,hsl(240 calc(1*5.882%) 13.33...` | CSS |
| `--background-base-lower` | `color-mix(in oklab,hsl(240 calc(1*7.143%) 10.98...` | CSS |
| `--background-base-lowest` | `color-mix(in oklab,hsl(240 calc(1*5.263%) 7.451...` | CSS |
| `--background-brand` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--background-code` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--background-code-addition` | `color-mix(in oklab,hsl(151.128 calc(1*100%) 26....` | CSS |
| `--background-code-deletion` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--background-feedback-critical` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--background-feedback-info` | `color-mix(in oklab,hsl(209.339 calc(1*100%) 44....` | CSS |
| `--background-feedback-positive` | `color-mix(in oklab,hsl(151.128 calc(1*100%) 26....` | CSS |
| `--background-feedback-warning` | `color-mix(in oklab,hsl(39.435 calc(1*100%) 48.6...` | CSS |
| `--background-mod-muted` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--background-mod-normal` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--background-mod-strong` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--background-mod-subtle` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--background-scrim` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.721568...` | CSS |
| `--background-scrim-lightbox` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.921568...` | CSS |
| `--background-secondary-alt` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--background-surface-high` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--background-surface-higher` | `color-mix(in oklab,hsl(240 calc(1*5.882%) 16.66...` | CSS |
| `--background-surface-highest` | `color-mix(in oklab,hsl(230 calc(1*6.383%) 18.43...` | CSS |
| `--background-tile-gradient-pink-end` | `color-mix(in oklab,hsl(300 calc(1*100%) 20%/0.3...` | CSS |
| `--background-tile-gradient-pink-start` | `color-mix(in oklab,hsl(309.787 calc(1*64.977%) ...` | CSS |
| `--badge-background-brand` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--badge-expressive-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--bg-animated-gradient-background-indigo-1` | `hsl(241.5 calc(1*57.143%) 27.451%/1)` | CSS |
| `--bg-animated-gradient-background-indigo-1-hsl` | `241.5 calc(1*57.143%) 27.451%` | CSS |
| `--bg-animated-gradient-background-indigo-2` | `hsl(257.059 calc(1*100%) 20%/1)` | CSS |
| `--bg-animated-gradient-background-indigo-2-hsl` | `257.059 calc(1*100%) 20%` | CSS |
| `--bg-animated-gradient-background-not-black` | `hsl(240 calc(1*7.143%) 5.49%/1)` | CSS |
| `--bg-animated-gradient-background-not-black-hsl` | `240 calc(1*7.143%) 5.49%` | CSS |
| `--bg-animated-gradient-background-pink-1` | `hsl(327.831 calc(1*80.583%) 59.608%/1)` | CSS |
| `--bg-animated-gradient-background-pink-1-hsl` | `327.831 calc(1*80.583%) 59.608%` | CSS |
| `--bg-gradient-aurora-1` | `hsl(219.74 calc(1*86.517%) 17.451%/1)` | CSS |
| `--bg-gradient-aurora-1-hsl` | `219.74 calc(1*86.517%) 17.451%` | CSS |
| `--bg-gradient-aurora-2` | `hsl(237.778 calc(1*76.415%) 41.569%/1)` | CSS |
| `--bg-gradient-aurora-2-hsl` | `237.778 calc(1*76.415%) 41.569%` | CSS |
| `--bg-gradient-aurora-3` | `hsl(183.556 calc(1*78.035%) 33.922%/1)` | CSS |
| `--bg-gradient-aurora-3-hsl` | `183.556 calc(1*78.035%) 33.922%` | CSS |
| `--bg-gradient-aurora-4` | `hsl(169.2 calc(1*60.241%) 32.549%/1)` | CSS |
| `--bg-gradient-aurora-4-hsl` | `169.2 calc(1*60.241%) 32.549%` | CSS |
| `--bg-gradient-aurora-5` | `hsl(229.839 calc(1*92.537%) 26.275%/1)` | CSS |
| `--bg-gradient-aurora-5-hsl` | `229.839 calc(1*92.537%) 26.275%` | CSS |
| `--bg-gradient-blurple-twilight-1` | `hsl(233.904 calc(1*79.574%) 53.922%/1)` | CSS |
| `--bg-gradient-blurple-twilight-1-hsl` | `233.904 calc(1*79.574%) 53.922%` | CSS |
| `--bg-gradient-blurple-twilight-2` | `hsl(245.294 calc(1*63.75%) 31.373%/1)` | CSS |
| `--bg-gradient-blurple-twilight-2-hsl` | `245.294 calc(1*63.75%) 31.373%` | CSS |
| `--bg-gradient-chroma-glow-1` | `hsl(183.39 calc(1*86.341%) 40.196%/1)` | CSS |
| `--bg-gradient-chroma-glow-1-hsl` | `183.39 calc(1*86.341%) 40.196%` | CSS |
| `--bg-gradient-chroma-glow-2` | `hsl(258.113 calc(1*89.831%) 46.275%/1)` | CSS |
| `--bg-gradient-chroma-glow-2-hsl` | `258.113 calc(1*89.831%) 46.275%` | CSS |
| `--bg-gradient-chroma-glow-3` | `hsl(298.491 calc(1*90.857%) 34.314%/1)` | CSS |
| `--bg-gradient-chroma-glow-3-hsl` | `298.491 calc(1*90.857%) 34.314%` | CSS |
| `--bg-gradient-chroma-glow-4` | `hsl(264.767 calc(1*100%) 66.275%/1)` | CSS |
| `--bg-gradient-chroma-glow-4-hsl` | `264.767 calc(1*100%) 66.275%` | CSS |
| `--bg-gradient-chroma-glow-5` | `hsl(206.702 calc(1*75.494%) 50.392%/1)` | CSS |
| `--bg-gradient-chroma-glow-5-hsl` | `206.702 calc(1*75.494%) 50.392%` | CSS |
| `--bg-gradient-citrus-sherbert-1` | `hsl(39.683 calc(1*88.732%) 58.235%/1)` | CSS |
| `--bg-gradient-citrus-sherbert-1-hsl` | `39.683 calc(1*88.732%) 58.235%` | CSS |
| `--bg-gradient-citrus-sherbert-2` | `hsl(18 calc(1*81.522%) 63.922%/1)` | CSS |
| `--bg-gradient-citrus-sherbert-2-hsl` | `18 calc(1*81.522%) 63.922%` | CSS |
| `--bg-gradient-cotton-candy-1` | `hsl(349.315 calc(1*76.842%) 81.373%/1)` | CSS |
| `--bg-gradient-cotton-candy-1-hsl` | `349.315 calc(1*76.842%) 81.373%` | CSS |
| `--bg-gradient-cotton-candy-2` | `hsl(226.4 calc(1*92.593%) 84.118%/1)` | CSS |
| `--bg-gradient-cotton-candy-2-hsl` | `226.4 calc(1*92.593%) 84.118%` | CSS |
| `--bg-gradient-crimson-moon-1` | `hsl(0 calc(1*88.608%) 30.98%/1)` | CSS |
| `--bg-gradient-crimson-moon-1-hsl` | `0 calc(1*88.608%) 30.98%` | CSS |
| `--bg-gradient-crimson-moon-2` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--bg-gradient-crimson-moon-2-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--bg-gradient-desert-khaki-1` | `hsl(28.696 calc(1*32.394%) 86.078%/1)` | CSS |
| `--bg-gradient-desert-khaki-1-hsl` | `28.696 calc(1*32.394%) 86.078%` | CSS |
| `--bg-gradient-desert-khaki-2` | `hsl(40 calc(1*41.284%) 78.627%/1)` | CSS |
| `--bg-gradient-desert-khaki-2-hsl` | `40 calc(1*41.284%) 78.627%` | CSS |
| `--bg-gradient-desert-khaki-3` | `hsl(50.164 calc(1*49.593%) 75.882%/1)` | CSS |
| `--bg-gradient-desert-khaki-3-hsl` | `50.164 calc(1*49.593%) 75.882%` | CSS |
| `--bg-gradient-dusk-1` | `hsl(292.8 calc(1*13.514%) 36.275%/1)` | CSS |
| `--bg-gradient-dusk-1-hsl` | `292.8 calc(1*13.514%) 36.275%` | CSS |
| `--bg-gradient-dusk-2` | `hsl(223.125 calc(1*41.026%) 69.412%/1)` | CSS |
| `--bg-gradient-dusk-2-hsl` | `223.125 calc(1*41.026%) 69.412%` | CSS |
| `--bg-gradient-easter-egg-1` | `hsl(226.731 calc(1*58.427%) 65.098%/1)` | CSS |
| `--bg-gradient-easter-egg-1-hsl` | `226.731 calc(1*58.427%) 65.098%` | CSS |
| `--bg-gradient-easter-egg-2` | `hsl(227.143 calc(1*30.973%) 44.314%/1)` | CSS |
| `--bg-gradient-easter-egg-2-hsl` | `227.143 calc(1*30.973%) 44.314%` | CSS |
| `--bg-gradient-forest-1` | `hsl(124.286 calc(1*25.926%) 10.588%/1)` | CSS |
| `--bg-gradient-forest-1-hsl` | `124.286 calc(1*25.926%) 10.588%` | CSS |
| `--bg-gradient-forest-2` | `hsl(142.5 calc(1*26.23%) 23.922%/1)` | CSS |
| `--bg-gradient-forest-2-hsl` | `142.5 calc(1*26.23%) 23.922%` | CSS |
| `--bg-gradient-forest-3` | `hsl(76.154 calc(1*20.635%) 24.706%/1)` | CSS |
| `--bg-gradient-forest-3-hsl` | `76.154 calc(1*20.635%) 24.706%` | CSS |
| `--bg-gradient-forest-4` | `hsl(116.667 calc(1*16.981%) 41.569%/1)` | CSS |
| `--bg-gradient-forest-4-hsl` | `116.667 calc(1*16.981%) 41.569%` | CSS |
| `--bg-gradient-forest-5` | `hsl(42.766 calc(1*38.525%) 47.843%/1)` | CSS |
| `--bg-gradient-forest-5-hsl` | `42.766 calc(1*38.525%) 47.843%` | CSS |
| `--bg-gradient-hanami-1` | `hsl(352.174 calc(1*68.317%) 80.196%/1)` | CSS |
| `--bg-gradient-hanami-1-hsl` | `352.174 calc(1*68.317%) 80.196%` | CSS |
| `--bg-gradient-hanami-2` | `hsl(43.146 calc(1*73.554%) 76.275%/1)` | CSS |
| `--bg-gradient-hanami-2-hsl` | `43.146 calc(1*73.554%) 76.275%` | CSS |
| `--bg-gradient-hanami-3` | `hsl(115.714 calc(1*43.077%) 74.51%/1)` | CSS |
| `--bg-gradient-hanami-3-hsl` | `115.714 calc(1*43.077%) 74.51%` | CSS |
| `--bg-gradient-lofi-vibes-1` | `hsl(219.759 calc(1*83.838%) 80.588%/1)` | CSS |
| `--bg-gradient-lofi-vibes-1-hsl` | `219.759 calc(1*83.838%) 80.588%` | CSS |
| `--bg-gradient-lofi-vibes-2` | `hsl(183.81 calc(1*57.798%) 78.627%/1)` | CSS |
| `--bg-gradient-lofi-vibes-2-hsl` | `183.81 calc(1*57.798%) 78.627%` | CSS |
| `--bg-gradient-lofi-vibes-3` | `hsl(129.6 calc(1*46.296%) 78.824%/1)` | CSS |
| `--bg-gradient-lofi-vibes-3-hsl` | `129.6 calc(1*46.296%) 78.824%` | CSS |
| `--bg-gradient-lofi-vibes-4` | `hsl(75.738 calc(1*48.8%) 75.49%/1)` | CSS |
| `--bg-gradient-lofi-vibes-4-hsl` | `75.738 calc(1*48.8%) 75.49%` | CSS |
| `--bg-gradient-mars-1` | `hsl(14.795 calc(1*36.318%) 39.412%/1)` | CSS |
| `--bg-gradient-mars-1-hsl` | `14.795 calc(1*36.318%) 39.412%` | CSS |
| `--bg-gradient-mars-2` | `hsl(0 calc(1*36.19%) 41.176%/1)` | CSS |
| `--bg-gradient-mars-2-hsl` | `0 calc(1*36.19%) 41.176%` | CSS |
| `--bg-gradient-midnight-blurple-1` | `hsl(245.077 calc(1*55.085%) 53.725%/1)` | CSS |
| `--bg-gradient-midnight-blurple-1-hsl` | `245.077 calc(1*55.085%) 53.725%` | CSS |
| `--bg-gradient-midnight-blurple-2` | `hsl(259.024 calc(1*74.545%) 10.784%/1)` | CSS |
| `--bg-gradient-midnight-blurple-2-hsl` | `259.024 calc(1*74.545%) 10.784%` | CSS |
| `--bg-gradient-mint-apple-1` | `hsl(165.625 calc(1*39.669%) 52.549%/1)` | CSS |
| `--bg-gradient-mint-apple-1-hsl` | `165.625 calc(1*39.669%) 52.549%` | CSS |
| `--bg-gradient-mint-apple-2` | `hsl(118.681 calc(1*40.444%) 55.882%/1)` | CSS |
| `--bg-gradient-mint-apple-2-hsl` | `118.681 calc(1*40.444%) 55.882%` | CSS |
| `--bg-gradient-mint-apple-3` | `hsl(86.667 calc(1*48.293%) 59.804%/1)` | CSS |
| `--bg-gradient-mint-apple-3-hsl` | `86.667 calc(1*48.293%) 59.804%` | CSS |
| `--bg-gradient-neon-nights-1` | `hsl(176.407 calc(1*98.817%) 33.137%/1)` | CSS |
| `--bg-gradient-neon-nights-1-hsl` | `176.407 calc(1*98.817%) 33.137%` | CSS |
| `--bg-gradient-neon-nights-2` | `hsl(259.333 calc(1*39.474%) 55.294%/1)` | CSS |
| `--bg-gradient-neon-nights-2-hsl` | `259.333 calc(1*39.474%) 55.294%` | CSS |
| `--bg-gradient-neon-nights-3` | `hsl(313.548 calc(1*52.542%) 46.275%/1)` | CSS |
| `--bg-gradient-neon-nights-3-hsl` | `313.548 calc(1*52.542%) 46.275%` | CSS |
| `--bg-gradient-retro-raincloud-1` | `hsl(201.553 calc(1*47.032%) 42.941%/1)` | CSS |
| `--bg-gradient-retro-raincloud-1-hsl` | `201.553 calc(1*47.032%) 42.941%` | CSS |
| `--bg-gradient-retro-raincloud-2` | `hsl(241.017 calc(1*29.648%) 60.98%/1)` | CSS |
| `--bg-gradient-retro-raincloud-2-hsl` | `241.017 calc(1*29.648%) 60.98%` | CSS |
| `--bg-gradient-retro-storm-1` | `hsl(201.553 calc(1*47.032%) 42.941%/1)` | CSS |
| `--bg-gradient-retro-storm-1-hsl` | `201.553 calc(1*47.032%) 42.941%` | CSS |
| `--bg-gradient-retro-storm-2` | `hsl(240.896 calc(1*27.801%) 47.255%/1)` | CSS |
| `--bg-gradient-retro-storm-2-hsl` | `240.896 calc(1*27.801%) 47.255%` | CSS |
| `--bg-gradient-sepia-1` | `hsl(32.727 calc(1*14.163%) 45.686%/1)` | CSS |
| `--bg-gradient-sepia-1-hsl` | `32.727 calc(1*14.163%) 45.686%` | CSS |
| `--bg-gradient-sepia-2` | `hsl(36.207 calc(1*46.774%) 24.314%/1)` | CSS |
| `--bg-gradient-sepia-2-hsl` | `36.207 calc(1*46.774%) 24.314%` | CSS |
| `--bg-gradient-strawberry-lemonade-1` | `hsl(326.98 calc(1*74.129%) 39.412%/1)` | CSS |
| `--bg-gradient-strawberry-lemonade-1-hsl` | `326.98 calc(1*74.129%) 39.412%` | CSS |
| `--bg-gradient-strawberry-lemonade-2` | `hsl(27.778 calc(1*71.681%) 44.314%/1)` | CSS |
| `--bg-gradient-strawberry-lemonade-2-hsl` | `27.778 calc(1*71.681%) 44.314%` | CSS |
| `--bg-gradient-strawberry-lemonade-3` | `hsl(39.588 calc(1*80.165%) 52.549%/1)` | CSS |
| `--bg-gradient-strawberry-lemonade-3-hsl` | `39.588 calc(1*80.165%) 52.549%` | CSS |
| `--bg-gradient-sunrise-1` | `hsl(326.809 calc(1*41.964%) 43.922%/1)` | CSS |
| `--bg-gradient-sunrise-1-hsl` | `326.809 calc(1*41.964%) 43.922%` | CSS |
| `--bg-gradient-sunrise-2` | `hsl(27.5 calc(1*44.86%) 58.039%/1)` | CSS |
| `--bg-gradient-sunrise-2-hsl` | `27.5 calc(1*44.86%) 58.039%` | CSS |
| `--bg-gradient-sunrise-3` | `hsl(50.286 calc(1*46.256%) 44.51%/1)` | CSS |
| `--bg-gradient-sunrise-3-hsl` | `50.286 calc(1*46.256%) 44.51%` | CSS |
| `--bg-gradient-sunset-1` | `hsl(259.2 calc(1*55.556%) 35.294%/1)` | CSS |
| `--bg-gradient-sunset-1-hsl` | `259.2 calc(1*55.556%) 35.294%` | CSS |
| `--bg-gradient-sunset-2` | `hsl(21.667 calc(1*66.667%) 57.647%/1)` | CSS |
| `--bg-gradient-sunset-2-hsl` | `21.667 calc(1*66.667%) 57.647%` | CSS |
| `--bg-gradient-under-the-sea-1` | `hsl(114.783 calc(1*10.502%) 42.941%/1)` | CSS |
| `--bg-gradient-under-the-sea-1-hsl` | `114.783 calc(1*10.502%) 42.941%` | CSS |
| `--bg-gradient-under-the-sea-2` | `hsl(158.667 calc(1*20.362%) 43.333%/1)` | CSS |
| `--bg-gradient-under-the-sea-2-hsl` | `158.667 calc(1*20.362%) 43.333%` | CSS |
| `--bg-gradient-under-the-sea-3` | `hsl(175.385 calc(1*10.924%) 46.667%/1)` | CSS |
| `--bg-gradient-under-the-sea-3-hsl` | `175.385 calc(1*10.924%) 46.667%` | CSS |
| `--bg-surface-overlay-tmp` | `color-mix(in oklab,hsl(230 calc(1*6.383%) 18.43...` | CSS |
| `--bg-surface-raised` | `color-mix(in oklab,hsl(240 calc(1*6.024%) 16.27...` | CSS |
| `--button-danger-background-disabled` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--button-outline-brand-background-hover` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--card-background-default` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--channeltextarea-background` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--chat-background` | `color-mix(in oklab,hsl(231.429 calc(1*6.542%) 2...` | CSS |
| `--chat-background-default` | `color-mix(in oklab,hsl(228 calc(1*6.849%) 14.31...` | CSS |
| `--checkbox-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--checkbox-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--checkbox-background-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--checkbox-background-selected-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--checkbox-background-selected-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--checkpoint-persona-eight-background-overlay` | `hsl(32 calc(1*60%) 9.804%/1)` | CSS |
| `--checkpoint-persona-eight-background-overlay-hsl` | `32 calc(1*60%) 9.804%` | CSS |
| `--checkpoint-persona-five-background-overlay` | `hsl(339.545 calc(1*66.667%) 12.941%/1)` | CSS |
| `--checkpoint-persona-five-background-overlay-hsl` | `339.545 calc(1*66.667%) 12.941%` | CSS |
| `--checkpoint-persona-four-background-overlay` | `hsl(312.222 calc(1*93.103%) 11.373%/1)` | CSS |
| `--checkpoint-persona-four-background-overlay-hsl` | `312.222 calc(1*93.103%) 11.373%` | CSS |
| `--checkpoint-persona-nine-background-overlay` | `hsl(0 calc(1*0%) 14.902%/1)` | CSS |
| `--checkpoint-persona-nine-background-overlay-hsl` | `0 calc(1*0%) 14.902%` | CSS |
| `--checkpoint-persona-one-background-overlay` | `hsl(169.5 calc(1*76.923%) 10.196%/1)` | CSS |
| `--checkpoint-persona-one-background-overlay-hsl` | `169.5 calc(1*76.923%) 10.196%` | CSS |
| `--checkpoint-persona-seven-background-overlay` | `hsl(44.516 calc(1*100%) 6.078%/1)` | CSS |
| `--checkpoint-persona-seven-background-overlay-hsl` | `44.516 calc(1*100%) 6.078%` | CSS |
| `--checkpoint-persona-six-background-overlay` | `hsl(27 calc(1*80%) 9.804%/1)` | CSS |
| `--checkpoint-persona-six-background-overlay-hsl` | `27 calc(1*80%) 9.804%` | CSS |
| `--checkpoint-persona-three-background-overlay` | `hsl(262.105 calc(1*80.282%) 13.922%/1)` | CSS |
| `--checkpoint-persona-three-background-overlay-hsl` | `262.105 calc(1*80.282%) 13.922%` | CSS |
| `--checkpoint-persona-two-background-overlay` | `hsl(260.426 calc(1*70.149%) 13.137%/1)` | CSS |
| `--checkpoint-persona-two-background-overlay-hsl` | `260.426 calc(1*70.149%) 13.137%` | CSS |
| `--checkpoint-persona-zero-background-overlay` | `hsl(148.8 calc(1*60.976%) 8.039%/1)` | CSS |
| `--checkpoint-persona-zero-background-overlay-hsl` | `148.8 calc(1*60.976%) 8.039%` | CSS |
| `--chip-blurple-dark-background` | `hsl(230.968 calc(1*49.206%) 37.059%/1)` | CSS |
| `--chip-blurple-light-background` | `hsl(227.865 calc(1*100%) 82.549%/1)` | CSS |
| `--chip-blurple-medium-background` | `hsl(231.618 calc(1*89.474%) 70.196%/1)` | CSS |
| `--chip-gray-dark-background` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--chip-gray-light-background` | `hsl(240 calc(1*4.478%) 86.863%/1)` | CSS |
| `--chip-gray-medium-background` | `hsl(234 calc(1*4.274%) 45.882%/1)` | CSS |
| `--chip-green-dark-background` | `hsl(148.571 calc(1*100%) 16.471%/1)` | CSS |
| `--chip-green-light-background` | `hsl(137.368 calc(1*44.706%) 66.667%/1)` | CSS |
| `--chip-green-medium-background` | `hsl(145.234 calc(1*58.47%) 35.882%/1)` | CSS |
| `--chip-orange-dark-background` | `hsl(21.322 calc(1*100%) 23.725%/1)` | CSS |
| `--chip-orange-light-background` | `hsl(22.051 calc(1*81.818%) 71.961%/1)` | CSS |
| `--chip-orange-medium-background` | `hsl(22.125 calc(1*63.492%) 50.588%/1)` | CSS |
| `--chip-pink-dark-background` | `hsl(305.455 calc(1*76.101%) 31.176%/1)` | CSS |
| `--chip-pink-light-background` | `hsl(308 calc(1*90.909%) 87.059%/1)` | CSS |
| `--chip-pink-medium-background` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--chip-purple-dark-background` | `hsl(260.87 calc(1*72.327%) 31.176%/1)` | CSS |
| `--chip-purple-light-background` | `hsl(268.966 calc(1*90.625%) 87.451%/1)` | CSS |
| `--chip-purple-medium-background` | `hsl(268.462 calc(1*85.714%) 64.314%/1)` | CSS |
| `--chip-red-dark-background` | `hsl(354.054 calc(1*71.613%) 30.392%/1)` | CSS |
| `--chip-red-light-background` | `hsl(3.364 calc(1*100%) 79.02%/1)` | CSS |
| `--chip-red-medium-background` | `hsl(358.052 calc(1*68.75%) 56.078%/1)` | CSS |
| `--chip-yellow-dark-background` | `hsl(34.395 calc(1*100%) 30.784%/1)` | CSS |
| `--chip-yellow-light-background` | `hsl(38.54 calc(1*100%) 73.137%/1)` | CSS |
| `--chip-yellow-medium-background` | `hsl(40.8 calc(1*100%) 49.02%/1)` | CSS |
| `--context-menu-backdrop-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.721568...` | CSS |
| `--control-connected-background-active` | `hsl(150.316 calc(1*100%) 18.627%/1)` | CSS |
| `--control-connected-background-default` | `hsl(151.128 calc(1*100%) 26.078%/1)` | CSS |
| `--control-connected-background-hover` | `hsl(150.556 calc(1*100%) 21.176%/1)` | CSS |
| `--control-critical-primary-background-active` | `hsl(354.59 calc(1*67.778%) 35.294%/1)` | CSS |
| `--control-critical-primary-background-default` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--control-critical-primary-background-hover` | `hsl(355.075 calc(1*65.686%) 40%/1)` | CSS |
| `--control-critical-secondary-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-critical-secondary-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-critical-secondary-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--control-expressive-background-active` | `hsl(240 calc(1*6.667%) 94.118%/1)` | CSS |
| `--control-expressive-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-expressive-background-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-only-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-icon-only-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--control-overlay-primary-background-active` | `hsl(240 calc(1*4.274%) 77.059%/1)` | CSS |
| `--control-overlay-primary-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-primary-background-hover` | `hsl(240 calc(1*5.085%) 88.431%/1)` | CSS |
| `--control-overlay-secondary-background-active` | `hsl(0 calc(1*0%) 0%/0.47843137254901963)` | CSS |
| `--control-overlay-secondary-background-default` | `hsl(0 calc(1*0%) 0%/0.5215686274509804)` | CSS |
| `--control-overlay-secondary-background-hover` | `hsl(0 calc(1*0%) 0%/0.6392156862745098)` | CSS |
| `--control-primary-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--control-primary-background-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--control-primary-background-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--control-secondary-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-secondary-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-secondary-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--creator-revenue-info-box-background` | `color-mix(in oklab,hsl(184.889 calc(1*100%) 26....` | CSS |
| `--custom-guild-settings-roles-intro-background-transition` | `500ms` | CSS |
| `--custom-invite-button-resolving-background-width` | `380px` | CSS |
| `--custom-responsive-embed-tile-loading-background-width` | `271px` | CSS |
| `--custom-text-widget-background-color-header-default` | `hsl(231.429 calc(1*6.542%) 20.98%/1)` | CSS |
| `--embed-background` | `color-mix(in oklab,hsl(240 calc(1*6.024%) 16.27...` | CSS |
| `--embed-background-alternate` | `color-mix(in oklab,hsl(240 calc(1*6.024%) 16.27...` | CSS |
| `--gradient-progress-pill-background` | `color-mix(in oklab,hsl(233.333 calc(1*6.04%) 29...` | CSS |
| `--home-background` | `color-mix(in oklab,hsl(240 calc(1*6.024%) 16.27...` | CSS |
| `--input-background-default` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.121568...` | CSS |
| `--input-background-error-default` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--interactive-background-active` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--interactive-background-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--interactive-background-selected` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--mention-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--message-automod-background-default` | `color-mix(in oklab,hsl(1.385 calc(1*87.838%) 70...` | CSS |
| `--message-automod-background-hover` | `color-mix(in oklab,hsl(357.692 calc(1*67.826%) ...` | CSS |
| `--message-background-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--message-highlight-background-default` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--message-highlight-background-hover` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--message-mentioned-background-default` | `color-mix(in oklab,hsl(39.435 calc(1*100%) 48.6...` | CSS |
| `--message-mentioned-background-hover` | `color-mix(in oklab,hsl(39.435 calc(1*100%) 48.6...` | CSS |
| `--message-reacted-background-default` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--mobile-background-scrim-opaque` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/1) 100%,...` | CSS |
| `--mobile-expression-picker-background-default` | `color-mix(in oklab,hsl(240 calc(1*7.143%) 10.98...` | CSS |
| `--modal-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--modal-footer-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--notice-background-critical` | `hsl(348.608 calc(1*100%) 15.49%/1)` | CSS |
| `--notice-background-info` | `hsl(213.418 calc(1*100%) 15.49%/1)` | CSS |
| `--notice-background-positive` | `hsl(139.535 calc(1*100%) 8.431%/1)` | CSS |
| `--notice-background-warning` | `hsl(14.328 calc(1*100%) 13.137%/1)` | CSS |
| `--polls-normal-image-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--profile-gradient-note-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.3) 100...` | CSS |
| `--profile-gradient-role-pill-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--radio-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--radio-background-default` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-background-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-background-selected-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--radio-background-selected-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--radio-thumb-background-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--redesign-button-active-background` | `color-mix(in oklab,hsl(151.406 calc(1*100%) 25....` | CSS |
| `--redesign-button-active-pressed-background` | `color-mix(in oklab,hsl(150.536 calc(1*98.246%) ...` | CSS |
| `--redesign-button-danger-background` | `color-mix(in oklab,hsl(356.625 calc(1*66.116%) ...` | CSS |
| `--redesign-button-destructive-background` | `color-mix(in oklab,hsl(356.625 calc(1*66.116%) ...` | CSS |
| `--redesign-button-destructive-pressed-background` | `color-mix(in oklab,hsl(355.541 calc(1*64.348%) ...` | CSS |
| `--redesign-button-overlay-alpha-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.54) 10...` | CSS |
| `--redesign-button-overlay-alpha-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.64) 10...` | CSS |
| `--redesign-button-positive-background` | `color-mix(in oklab,hsl(151.406 calc(1*100%) 25....` | CSS |
| `--redesign-button-premium-primary-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.1) 100...` | CSS |
| `--redesign-button-primary-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-primary-overlay-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-primary-overlay-pressed-background` | `color-mix(in oklab,hsl(240 calc(1*4.478%) 86.86...` | CSS |
| `--redesign-button-primary-pressed-background` | `color-mix(in oklab,hsl(233.115 calc(1*49.194%) ...` | CSS |
| `--redesign-button-secondary-background` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--redesign-button-secondary-overlay-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.54) 10...` | CSS |
| `--redesign-button-secondary-overlay-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.64) 10...` | CSS |
| `--redesign-button-secondary-pressed-background` | `color-mix(in oklab,hsl(234.545 calc(1*6.509%) 3...` | CSS |
| `--redesign-button-selected-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-selected-pressed-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-tertiary-background` | `color-mix(in oklab,hsl(234 calc(1*4.425%) 44.31...` | CSS |
| `--redesign-button-tertiary-pressed-background` | `color-mix(in oklab,hsl(234 calc(1*4.425%) 44.31...` | CSS |
| `--search-popout-date-picker-hint-value-background` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--search-popout-date-picker-hint-value-background-hover` | `hsl(234.935 calc(1*85.556%) 64.706%/0.321568627...` | CSS |
| `--spoiler-hidden-background` | `color-mix(in oklab,hsl(234 calc(1*4.673%) 41.96...` | CSS |
| `--spoiler-hidden-background-hover` | `color-mix(in oklab,hsl(233.333 calc(1*3.797%) 5...` | CSS |
| `--spoiler-revealed-background` | `color-mix(in oklab,hsl(234 calc(1*4.425%) 44.31...` | CSS |
| `--status-positive-background` | `hsl(151.406 calc(1*100%) 25.098%/1)` | CSS |
| `--status-warning-background` | `hsl(39.505 calc(1*98.058%) 59.608%/1)` | CSS |
| `--switch-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--switch-background-default` | `hsl(0 calc(1*0%) 0%/0.12156862745098039)` | CSS |
| `--switch-background-hover` | `hsl(0 calc(1*0%) 0%/0.12156862745098039)` | CSS |
| `--switch-background-selected-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--switch-background-selected-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--switch-thumb-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--switch-thumb-background-selected-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--user-profile-activity-toolbar-background` | `color-mix(in oklab,hsl(230 calc(1*6.383%) 18.43...` | CSS |
| `--user-profile-background-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--user-profile-note-background-focus` | `color-mix(in oklab,hsl(240 calc(1*5.263%) 7.451...` | CSS |
| `--user-profile-overlay-background` | `color-mix(in oklab,hsl(230 calc(1*6.383%) 18.43...` | CSS |
| `--user-profile-overlay-background-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--user-profile-toolbar-background` | `color-mix(in oklab,hsl(230 calc(1*6.383%) 18.43...` | CSS |
| `ANDROID_NAVIGATION_BAR_BACKGROUND` | `{}` | JS |
| `ANDROID_NAVIGATION_SCRIM_BACKGROUND` | `{}` | JS |
| `BACKGROUND_ACCENT` | `{}` | JS |
| `BACKGROUND_BASE_LOW` | `{}` | JS |
| `BACKGROUND_BASE_LOWER` | `{}` | JS |
| `BACKGROUND_BASE_LOWEST` | `{}` | JS |
| `BACKGROUND_BRAND` | `{}` | JS |
| `BACKGROUND_FEEDBACK_CRITICAL` | `{}` | JS |
| `BACKGROUND_FEEDBACK_INFO` | `{}` | JS |
| `BACKGROUND_FEEDBACK_POSITIVE` | `{}` | JS |
| `BACKGROUND_FEEDBACK_WARNING` | `{}` | JS |
| `BACKGROUND_MOD_MUTED` | `{}` | JS |
| `BACKGROUND_MOD_STRONG` | `{}` | JS |
| `BACKGROUND_MOD_SUBTLE` | `{}` | JS |
| `BACKGROUND_SCRIM` | `{}` | JS |
| `BACKGROUND_SCRIM_LIGHTBOX` | `{}` | JS |
| `BACKGROUND_SECONDARY_ALT` | `{}` | JS |
| `BACKGROUND_SURFACE_HIGH` | `{}` | JS |
| `BACKGROUND_SURFACE_HIGHEST` | `{}` | JS |
| `BACKGROUND_TILE_GRADIENT_PINK_END` | `{}` | JS |
| `BACKGROUND_TILE_GRADIENT_PINK_START` | `{}` | JS |
| `BADGE_BACKGROUND_BRAND` | `{}` | JS |
| `BG_ANIMATED_GRADIENT_BACKGROUND_INDIGO_1` | `#201e6e` | JS |
| `BG_ANIMATED_GRADIENT_BACKGROUND_INDIGO_2` | `#1d0066` | JS |
| `BG_ANIMATED_GRADIENT_BACKGROUND_NOT_BLACK` | `#0d0d0f` | JS |
| `BG_ANIMATED_GRADIENT_BACKGROUND_PINK_1` | `#eb459e` | JS |
| `BG_GRADIENT_AURORA_1` | `#062053` | JS |
| `BG_GRADIENT_AURORA_2` | `#191fbb` | JS |
| `BG_GRADIENT_AURORA_3` | `#13929a` | JS |
| `BG_GRADIENT_AURORA_4` | `#218573` | JS |
| `BG_GRADIENT_AURORA_5` | `#051a81` | JS |
| `BG_GRADIENT_BLURPLE_TWILIGHT_1` | `#2c3fe7` | JS |
| `BG_GRADIENT_BLURPLE_TWILIGHT_2` | `#261d83` | JS |
| `BG_GRADIENT_CHROMA_GLOW_1` | `#0eb5bf` | JS |
| `BG_GRADIENT_CHROMA_GLOW_2` | `#4c0ce0` | JS |
| `BG_GRADIENT_CHROMA_GLOW_3` | `#a308a7` | JS |
| `BG_GRADIENT_CHROMA_GLOW_4` | `#9a53ff` | JS |
| `BG_GRADIENT_CHROMA_GLOW_5` | `#218be0` | JS |
| `BG_GRADIENT_CITRUS_SHERBERT_1` | `#f3b336` | JS |
| `BG_GRADIENT_CITRUS_SHERBERT_2` | `#ee8558` | JS |
| `BG_GRADIENT_COTTON_CANDY_1` | `#f4abb8` | JS |
| `BG_GRADIENT_COTTON_CANDY_2` | `#b1c2fc` | JS |
| `BG_GRADIENT_CRIMSON_MOON_1` | `#950909` | JS |
| `BG_GRADIENT_CRIMSON_MOON_2` | `#000000` | JS |
| `BG_GRADIENT_DESERT_KHAKI_1` | `#e7dbd0` | JS |
| `BG_GRADIENT_DESERT_KHAKI_2` | `#dfd0b2` | JS |
| `BG_GRADIENT_DESERT_KHAKI_3` | `#e0d6a3` | JS |
| `BG_GRADIENT_DUSK_1` | `#665069` | JS |
| `BG_GRADIENT_DUSK_2` | `#91a3d1` | JS |
| `BG_GRADIENT_EASTER_EGG_1` | `#7289da` | JS |
| `BG_GRADIENT_EASTER_EGG_2` | `#4e5d94` | JS |
| `BG_GRADIENT_FOREST_1` | `#142215` | JS |
| `BG_GRADIENT_FOREST_2` | `#2d4d39` | JS |
| `BG_GRADIENT_FOREST_3` | `#454c32` | JS |
| `BG_GRADIENT_FOREST_4` | `#5a7c58` | JS |
| `BG_GRADIENT_FOREST_5` | `#a98e4b` | JS |
| `BG_GRADIENT_HANAMI_1` | `#efaab3` | JS |
| `BG_GRADIENT_HANAMI_2` | `#efd696` | JS |
| `BG_GRADIENT_HANAMI_3` | `#a6daa2` | JS |
| `BG_GRADIENT_LOFI_VIBES_1` | `#a4c0f7` | JS |
| `BG_GRADIENT_LOFI_VIBES_2` | `#a9e4e8` | JS |
| `BG_GRADIENT_LOFI_VIBES_3` | `#b0e2b8` | JS |
| `BG_GRADIENT_LOFI_VIBES_4` | `#cfdfa2` | JS |
| `BG_GRADIENT_MARS_1` | `#895240` | JS |
| `BG_GRADIENT_MARS_2` | `#8f4343` | JS |
| `BG_GRADIENT_MIDNIGHT_BLURPLE_1` | `#5348ca` | JS |
| `BG_GRADIENT_MIDNIGHT_BLURPLE_2` | `#140730` | JS |
| `BG_GRADIENT_MINT_APPLE_1` | `#56b69f` | JS |
| `BG_GRADIENT_MINT_APPLE_2` | `#63bc61` | JS |
| `BG_GRADIENT_MINT_APPLE_3` | `#9eca67` | JS |
| `BG_GRADIENT_NEON_NIGHTS_1` | `#01a89e` | JS |
| `BG_GRADIENT_NEON_NIGHTS_2` | `#7d60ba` | JS |
| `BG_GRADIENT_NEON_NIGHTS_3` | `#b43898` | JS |
| `BG_GRADIENT_RETRO_RAINCLOUD_1` | `#3a7ca1` | JS |
| `BG_GRADIENT_RETRO_RAINCLOUD_2` | `#7f7eb9` | JS |
| `BG_GRADIENT_RETRO_STORM_1` | `#3a7ca1` | JS |
| `BG_GRADIENT_RETRO_STORM_2` | `#58579a` | JS |
| `BG_GRADIENT_SEPIA_1` | `#857664` | JS |
| `BG_GRADIENT_SEPIA_2` | `#5b4421` | JS |
| `BG_GRADIENT_STRAWBERRY_LEMONADE_1` | `#af1a6c` | JS |
| `BG_GRADIENT_STRAWBERRY_LEMONADE_2` | `#c26b20` | JS |
| `BG_GRADIENT_STRAWBERRY_LEMONADE_3` | `#e7a525` | JS |
| `BG_GRADIENT_SUNRISE_1` | `#9f4175` | JS |
| `BG_GRADIENT_SUNRISE_2` | `#c49064` | JS |
| `BG_GRADIENT_SUNRISE_3` | `#a6953d` | JS |
| `BG_GRADIENT_SUNSET_1` | `#48288c` | JS |
| `BG_GRADIENT_SUNSET_2` | `#db7f4b` | JS |
| `BG_GRADIENT_UNDER_THE_SEA_1` | `#647962` | JS |
| `BG_GRADIENT_UNDER_THE_SEA_2` | `#588575` | JS |
| `BG_GRADIENT_UNDER_THE_SEA_3` | `#6a8482` | JS |
| `BG_SURFACE_OVERLAY_TMP` | `{}` | JS |
| `BG_SURFACE_RAISED` | `{}` | JS |
| `BUTTON_DANGER_BACKGROUND_DISABLED` | `{}` | JS |
| `BUTTON_OUTLINE_BRAND_BACKGROUND_HOVER` | `{}` | JS |
| `CARD_BACKGROUND_DEFAULT` | `{}` | JS |
| `CHANNELTEXTAREA_BACKGROUND` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_BACKGROUND_OVERLAY` | `#281a0a` | JS |
| `CHECKPOINT_PERSONA_FIVE_BACKGROUND_OVERLAY` | `#370b1a` | JS |
| `CHECKPOINT_PERSONA_FOUR_BACKGROUND_OVERLAY` | `#38022d` | JS |
| `CHECKPOINT_PERSONA_NINE_BACKGROUND_OVERLAY` | `#262626` | JS |
| `CHECKPOINT_PERSONA_ONE_BACKGROUND_OVERLAY` | `#062e27` | JS |
| `CHECKPOINT_PERSONA_SEVEN_BACKGROUND_OVERLAY` | `#1f1700` | JS |
| `CHECKPOINT_PERSONA_SIX_BACKGROUND_OVERLAY` | `#2d1705` | JS |
| `CHECKPOINT_PERSONA_THREE_BACKGROUND_OVERLAY` | `#1c0740` | JS |
| `CHECKPOINT_PERSONA_TWO_BACKGROUND_OVERLAY` | `#1a0a39` | JS |
| `CHECKPOINT_PERSONA_ZERO_BACKGROUND_OVERLAY` | `#082114` | JS |
| `CONTEXT_MENU_BACKDROP_BACKGROUND` | `{}` | JS |
| `CONTROL_CONNECTED_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_CRITICAL_PRIMARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_PRIMARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_BACKGROUND_ACTIVE` | `{}` | JS |
| `CONTROL_SECONDARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `EMBED_BACKGROUND` | `{}` | JS |
| `EMBED_BACKGROUND_ALTERNATE` | `{}` | JS |
| `GRADIENT_PROGRESS_PILL_BACKGROUND` | `{}` | JS |
| `GUILD_NOTIFICATIONS_BOTTOM_SHEET_PILL_BACKGROUND` | `{}` | JS |
| `INPUT_BACKGROUND_DEFAULT` | `{}` | JS |
| `INTERACTIVE_BACKGROUND_ACTIVE` | `{}` | JS |
| `INTERACTIVE_BACKGROUND_HOVER` | `{}` | JS |
| `INTERACTIVE_BACKGROUND_SELECTED` | `{}` | JS |
| `MENTION_BACKGROUND` | `{}` | JS |
| `MESSAGE_AUTOMOD_BACKGROUND_DEFAULT` | `{}` | JS |
| `MESSAGE_AUTOMOD_BACKGROUND_HOVER` | `{}` | JS |
| `MESSAGE_BACKGROUND_HOVER` | `{}` | JS |
| `MESSAGE_HIGHLIGHT_BACKGROUND_DEFAULT` | `{}` | JS |
| `MESSAGE_HIGHLIGHT_BACKGROUND_HOVER` | `{}` | JS |
| `MESSAGE_MENTIONED_BACKGROUND_DEFAULT` | `{}` | JS |
| `MESSAGE_MENTIONED_BACKGROUND_HOVER` | `{}` | JS |
| `MESSAGE_REACTED_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_ACTIONSHEET_GRADIENT_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_ALERT_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_ANDROID_BUTTON_BACKGROUND_RIPPLE` | `{}` | JS |
| `MOBILE_BACKGROUND_SCRIM_OPAQUE` | `{}` | JS |
| `MOBILE_COACHMARK_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_EXPRESSION_PICKER_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_TOAST_BACKGROUND_DEFAULT` | `{}` | JS |
| `MOBILE_TYPING_INDICATOR_BACKGROUND_DEFAULT` | `{}` | JS |
| `MODAL_BACKGROUND` | `{}` | JS |
| `MODAL_FOOTER_BACKGROUND` | `{}` | JS |
| `NOTICE_BACKGROUND_POSITIVE` | `{}` | JS |
| `POLLS_NORMAL_IMAGE_BACKGROUND` | `{}` | JS |
| `PROFILE_GRADIENT_NOTE_BACKGROUND` | `{}` | JS |
| `PROFILE_GRADIENT_ROLE_PILL_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DANGER_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_POSITIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_OVERLAY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_OVERLAY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_OVERLAY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_OVERLAY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SELECTED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_SELECTED_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_CHAT_INPUT_BACKGROUND` | `{}` | JS |
| `REDESIGN_IMAGE_BUTTON_PRESSED_BACKGROUND` | `{}` | JS |
| `SPOILER_HIDDEN_BACKGROUND` | `{}` | JS |
| `SPOILER_REVEALED_BACKGROUND` | `{}` | JS |
| `STATUS_POSITIVE_BACKGROUND` | `{}` | JS |
| `STATUS_WARNING_BACKGROUND` | `{}` | JS |
| `VOICE_VIDEO_VIDEO_TILE_BACKGROUND` | `{}` | JS |

*Total: 506 variables*

---

## Text & Typography

| Variable | Value | Type |
|----------|-------|------|
| `--__spoiler-text-color--hidden` | `transparent` | CSS |
| `--__spoiler-warning-text-color` | `hsl(240 calc(1*3.846%) 89.804%/1)` | CSS |
| `--__spoiler-warning-text-color--hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--badge-expressive-text-default` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--badge-text-brand` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--channel-text-area-placeholder` | `color-mix(in oklab,hsl(234 calc(1*4.425%) 44.31...` | CSS |
| `--chat-text-muted` | `color-mix(in oklab,hsl(233.333 calc(1*3.704%) 5...` | CSS |
| `--content-inventory-overlay-text-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.85) ...` | CSS |
| `--content-inventory-overlay-text-secondary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.7) 1...` | CSS |
| `--control-connected-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connected-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connected-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-secondary-text-active` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-critical-secondary-text-default` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-critical-secondary-text-hover` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-expressive-text-active` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-text-default` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-text-hover` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-primary-text-active` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-primary-text-default` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-primary-text-hover` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-secondary-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-primary-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-primary-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-primary-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-secondary-text-active` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-text-default` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-text-hover` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--custom-app-launcher-sticky-header-height` | `66px` | CSS |
| `--custom-channel-header-height` | `calc(40px + 8px)` | CSS |
| `--custom-channel-text-area-button-hover-scale` | `0.85714` | CSS |
| `--custom-channel-textarea-text-area-height` | `56px` | CSS |
| `--custom-channel-textarea-text-area-max-height` | `50vh` | CSS |
| `--custom-collection-gallery-text-container-width` | `400px` | CSS |
| `--custom-guild-directory-landing-min-header-height` | `200px` | CSS |
| `--custom-guild-product-download-modal-header-image-width` | `119px` | CSS |
| `--custom-guild-settings-community-intro-text-spacing` | `8px` | CSS |
| `--custom-header-icon-color-expired` | `#4e5058` | CSS |
| `--custom-interaction-iframe-modal-modal-header-height` | `52px` | CSS |
| `--font-clan-body` | `Fraunces,"gg sans",serif,"Noto Sans","Helvetica...` | CSS |
| `--font-clan-signature` | `Corinthia,"gg sans",cursive,"Noto Sans","Helvet...` | CSS |
| `--font-code` | `"gg mono","Source Code Pro",Consolas,"Andale Mo...` | CSS |
| `--font-display` | `"gg sans","Noto Sans","Helvetica Neue",Helvetic...` | CSS |
| `--font-display-marketing` | `"ABC Ginto Discord","gg sans",serif,"Noto Sans"...` | CSS |
| `--font-display-marketing-header` | `"ABC Ginto Nord Discord","gg sans",serif,"Noto ...` | CSS |
| `--font-headline` | `"ABC Ginto Nord","Noto Sans","Helvetica Neue",H...` | CSS |
| `--font-primary` | `"gg sans","Noto Sans","Helvetica Neue",Helvetic...` | CSS |
| `--font-weight-bold` | `700` | CSS |
| `--font-weight-extra-bold` | `800` | CSS |
| `--font-weight-extrabold` | `800` | CSS |
| `--font-weight-light` | `300` | CSS |
| `--font-weight-medium` | `500` | CSS |
| `--font-weight-normal` | `400` | CSS |
| `--font-weight-semibold` | `600` | CSS |
| `--guild-header-text-shadow` | `0 1px 1px hsl(0 calc(1*0%) 0%/0.4)` | CSS |
| `--input-placeholder-text-dark` | `hsl(216 calc(1*2.128%) 53.922%/1)` | CSS |
| `--input-placeholder-text-dark-hsl` | `216 calc(1*2.128%) 53.922%` | CSS |
| `--input-placeholder-text-default` | `color-mix(in oklab,hsl(233.333 calc(1*3.557%) 4...` | CSS |
| `--input-text-default` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--input-text-error-default` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--interactive-text-active` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--interactive-text-default` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `--interactive-text-hover` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--lol-text-dark` | `hsl(37.444 calc(1*81.595%) 31.961%/1)` | CSS |
| `--lol-text-dark-hsl` | `37.444 calc(1*81.595%) 31.961%` | CSS |
| `--lol-text-light` | `hsl(41.143 calc(1*50.239%) 59.02%/1)` | CSS |
| `--lol-text-light-hsl` | `41.143 calc(1*50.239%) 59.02%` | CSS |
| `--message-reacted-text-default` | `color-mix(in oklab,hsl(227.143 calc(1*100%) 86....` | CSS |
| `--mobile-text-heading-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--navigator-header-tint` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--notice-text-critical` | `hsl(2.727 calc(1*100%) 87.059%/1)` | CSS |
| `--notice-text-info` | `hsl(214.177 calc(1*100%) 84.51%/1)` | CSS |
| `--notice-text-positive` | `hsl(136.901 calc(1*53.383%) 73.922%/1)` | CSS |
| `--notice-text-warning` | `hsl(38.698 calc(1*100%) 66.863%/1)` | CSS |
| `--premium-tier-0-header-gradient-1` | `hsl(240.451 calc(1*55.187%) 47.255%/1)` | CSS |
| `--premium-tier-0-header-gradient-1-hsl` | `240.451 calc(1*55.187%) 47.255%` | CSS |
| `--premium-tier-0-header-gradient-2` | `hsl(224.444 calc(1*77.885%) 59.216%/1)` | CSS |
| `--premium-tier-0-header-gradient-2-hsl` | `224.444 calc(1*77.885%) 59.216%` | CSS |
| `--premium-tier-0-header-gradient-3` | `hsl(246.207 calc(1*74.359%) 69.412%/1)` | CSS |
| `--premium-tier-0-header-gradient-3-hsl` | `246.207 calc(1*74.359%) 69.412%` | CSS |
| `--premium-tier-0-header-gradient-4` | `hsl(294.595 calc(1*79.856%) 72.745%/1)` | CSS |
| `--premium-tier-0-header-gradient-4-hsl` | `294.595 calc(1*79.856%) 72.745%` | CSS |
| `--premium-tier-0-header-gradient-5` | `hsl(336.456 calc(1*55.245%) 71.961%/1)` | CSS |
| `--premium-tier-0-header-gradient-5-hsl` | `336.456 calc(1*55.245%) 71.961%` | CSS |
| `--search-popout-option-non-text-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--text-brand` | `color-mix(in oklab,hsl(230.625 calc(1*91.429%) ...` | CSS |
| `--text-code` | `color-mix(in oklab,hsl(213.281 calc(1*87.671%) ...` | CSS |
| `--text-code-addition` | `color-mix(in oklab,hsl(137.778 calc(1*39.512%) ...` | CSS |
| `--text-code-builtin` | `color-mix(in oklab,hsl(22.154 calc(1*76.471%) 6...` | CSS |
| `--text-code-bullet` | `color-mix(in oklab,hsl(38.912 calc(1*100%) 46.8...` | CSS |
| `--text-code-comment` | `color-mix(in oklab,hsl(233.333 calc(1*3.93%) 55...` | CSS |
| `--text-code-deletion` | `color-mix(in oklab,hsl(2.586 calc(1*98.305%) 76...` | CSS |
| `--text-code-keyword` | `color-mix(in oklab,hsl(2.542 calc(1*96.721%) 76...` | CSS |
| `--text-code-section` | `color-mix(in oklab,hsl(213.281 calc(1*87.671%) ...` | CSS |
| `--text-code-string` | `color-mix(in oklab,hsl(184.954 calc(1*47.598%) ...` | CSS |
| `--text-code-tag` | `color-mix(in oklab,hsl(137.468 calc(1*42.246%) ...` | CSS |
| `--text-code-title` | `color-mix(in oklab,hsl(228.261 calc(1*100%) 81....` | CSS |
| `--text-code-variable` | `color-mix(in oklab,hsl(213.214 calc(1*91.803%) ...` | CSS |
| `--text-default` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--text-feedback-critical` | `color-mix(in oklab,hsl(1.343 calc(1*84.81%) 69....` | CSS |
| `--text-feedback-info` | `color-mix(in oklab,hsl(213.117 calc(1*83.696%) ...` | CSS |
| `--text-feedback-positive` | `color-mix(in oklab,hsl(140 calc(1*36%) 49.02%/1...` | CSS |
| `--text-feedback-warning` | `color-mix(in oklab,hsl(38.455 calc(1*100%) 43.1...` | CSS |
| `--text-invert` | `color-mix(in oklab,hsl(230 calc(1*6%) 19.608%/1...` | CSS |
| `--text-link` | `color-mix(in oklab,hsl(212.795 calc(1*82.564%) ...` | CSS |
| `--text-muted` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--text-overlay-dark` | `color-mix(in oklab,hsl(230 calc(1*6%) 19.608%/1...` | CSS |
| `--text-overlay-light` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--text-status-dnd` | `color-mix(in oklab,hsl(358.052 calc(1*68.75%) 5...` | CSS |
| `--text-status-idle` | `color-mix(in oklab,hsl(38.483 calc(1*100%) 71.5...` | CSS |
| `--text-status-offline` | `color-mix(in oklab,hsl(232.5 calc(1*4.255%) 63....` | CSS |
| `--text-status-online` | `color-mix(in oklab,hsl(141.649 calc(1*44.292%) ...` | CSS |
| `--text-strong` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--text-subtle` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `CONTENT_INVENTORY_OVERLAY_TEXT_PRIMARY` | `{}` | JS |
| `CONTENT_INVENTORY_OVERLAY_TEXT_SECONDARY` | `{}` | JS |
| `CONTROL_CRITICAL_PRIMARY_TEXT_DEFAULT` | `{}` | JS |
| `CONTROL_PRIMARY_TEXT_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_TEXT_DEFAULT` | `{}` | JS |
| `INPUT_PLACEHOLDER_TEXT_DARK` | `#87898c` | JS |
| `INPUT_PLACEHOLDER_TEXT_DEFAULT` | `{}` | JS |
| `INPUT_TEXT_DEFAULT` | `{}` | JS |
| `INPUT_TEXT_ERROR_DEFAULT` | `{}` | JS |
| `INTERACTIVE_TEXT_ACTIVE` | `{}` | JS |
| `INTERACTIVE_TEXT_DEFAULT` | `{}` | JS |
| `INTERACTIVE_TEXT_HOVER` | `{}` | JS |
| `LOL_TEXT_DARK` | `#94620f` | JS |
| `LOL_TEXT_LIGHT` | `#cbaa62` | JS |
| `MESSAGE_REACTED_TEXT_DEFAULT` | `{}` | JS |
| `MOBILE_TEXT_HEADING_PRIMARY` | `{}` | JS |
| `NAVIGATOR_HEADER_TINT` | `{}` | JS |
| `PREMIUM_TIER_0_HEADER_GRADIENT_1` | `#3736bb` | JS |
| `PREMIUM_TIER_0_HEADER_GRADIENT_2` | `#4670e8` | JS |
| `PREMIUM_TIER_0_HEADER_GRADIENT_3` | `#8377eb` | JS |
| `PREMIUM_TIER_0_HEADER_GRADIENT_4` | `#e782f1` | JS |
| `PREMIUM_TIER_0_HEADER_GRADIENT_5` | `#df90af` | JS |
| `TEXT_BRAND` | `{}` | JS |
| `TEXT_DEFAULT` | `{}` | JS |
| `TEXT_FEEDBACK_CRITICAL` | `{}` | JS |
| `TEXT_FEEDBACK_INFO` | `{}` | JS |
| `TEXT_FEEDBACK_POSITIVE` | `{}` | JS |
| `TEXT_FEEDBACK_WARNING` | `{}` | JS |
| `TEXT_LINK` | `{}` | JS |
| `TEXT_MUTED` | `{}` | JS |
| `TEXT_OVERLAY_DARK` | `{}` | JS |
| `TEXT_OVERLAY_LIGHT` | `{}` | JS |
| `TEXT_STATUS_DND` | `{}` | JS |
| `TEXT_STATUS_IDLE` | `{}` | JS |
| `TEXT_STATUS_OFFLINE` | `{}` | JS |
| `TEXT_STATUS_ONLINE` | `{}` | JS |
| `TEXT_STRONG` | `{}` | JS |
| `TEXT_SUBTLE` | `{}` | JS |

*Total: 157 variables*

---

## Interactive

| Variable | Value | Type |
|----------|-------|------|
| `--interactive-icon-active` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--interactive-icon-default` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `--interactive-icon-hover` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--interactive-muted` | `color-mix(in oklab,hsl(234.545 calc(1*6.509%) 3...` | CSS |
| `INTERACTIVE_ICON_ACTIVE` | `{}` | JS |
| `INTERACTIVE_ICON_DEFAULT` | `{}` | JS |
| `INTERACTIVE_ICON_HOVER` | `{}` | JS |
| `INTERACTIVE_MUTED` | `{}` | JS |

*Total: 8 variables*

---

## Button

| Variable | Value | Type |
|----------|-------|------|
| `--button-outline-brand-border-active` | `hsl(233.115 calc(1*49.194%) 51.373%/1)` | CSS |
| `--button-outline-primary-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--custom-button-button-lg-height` | `44px` | CSS |
| `--custom-button-button-lg-width` | `130px` | CSS |
| `--custom-button-button-md-height` | `38px` | CSS |
| `--custom-button-button-md-width` | `96px` | CSS |
| `--custom-button-button-sm-height` | `32px` | CSS |
| `--custom-button-button-sm-width` | `60px` | CSS |
| `--custom-button-button-tn-height` | `24px` | CSS |
| `--custom-button-button-tn-width` | `52px` | CSS |
| `--custom-button-button-xl-height` | `50px` | CSS |
| `--custom-button-button-xl-width` | `148px` | CSS |
| `--custom-button-filled-active` | `0.2` | CSS |
| `--custom-button-filled-hover` | `0.1` | CSS |
| `--custom-button-link-underline-offset` | `1px` | CSS |
| `--custom-button-link-underline-stop` | `calc(1px + 1px)` | CSS |
| `--custom-button-link-underline-width` | `1px` | CSS |
| `--custom-button-transition-duration` | `170ms` | CSS |
| `--custom-dropdown-button-hitbox-padding` | `8px` | CSS |
| `--custom-dropdown-button-large-dropdown-size` | `32px` | CSS |
| `--custom-dropdown-button-medium-dropdown-size` | `24px` | CSS |
| `--custom-dropdown-button-separator-padding` | `4px` | CSS |
| `--custom-dropdown-button-small-dropdown-size` | `16px` | CSS |
| `--custom-feedback-modal-close-button-margin` | `12px` | CSS |
| `--custom-icon-button-icon-lg-size` | `36px` | CSS |
| `--custom-icon-button-icon-md-size` | `24px` | CSS |
| `--custom-icon-button-icon-sm-size` | `18px` | CSS |
| `--custom-icon-button-icon-xs-size` | `12px` | CSS |
| `--custom-paginator-round-button-size` | `28px` | CSS |
| `--redesign-button-active-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-destructive-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-overlay-alpha-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-premium-primary-pink-for-gradient` | `color-mix(in oklab,hsl(325.385 calc(1*31.707%) ...` | CSS |
| `--redesign-button-premium-primary-purple-for-gradient` | `color-mix(in oklab,hsl(269.291 calc(1*52.697%) ...` | CSS |
| `--redesign-button-premium-primary-purple-for-gradient-2` | `color-mix(in oklab,hsl(295.645 calc(1*50%) 51.3...` | CSS |
| `--redesign-button-primary-alt-border` | `color-mix(in oklab,hsl(230.625 calc(1*91.429%) ...` | CSS |
| `--redesign-button-primary-overlay-text` | `color-mix(in oklab,hsl(240 calc(1*7.692%) 5.098...` | CSS |
| `--redesign-button-primary-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-secondary-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--redesign-button-secondary-overlay-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-secondary-pressed-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--redesign-button-secondary-text` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--redesign-button-selected-text` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-tertiary-pressed-text` | `color-mix(in oklab,hsl(225 calc(1*4.878%) 83.92...` | CSS |
| `--redesign-button-tertiary-text` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--shadow-button-overlay` | `0 12px 24px 0 hsl(none 0% 0%/0.24)` | CSS |
| `--shadow-button-overlay-filter` | `drop-shadow(0 12px 24px hsl(none 0% 0%/0.24))` | CSS |
| `BUTTON_OUTLINE_BRAND_BORDER_ACTIVE` | `{}` | JS |
| `BUTTON_OUTLINE_PRIMARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PINK_FOR_GRADIENT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PURPLE_FOR_GRADIENT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PURPLE_FOR_GRADIENT_2` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_OVERLAY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_OVERLAY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_PRESSED_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SELECTED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_PRESSED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_TEXT` | `{}` | JS |

*Total: 65 variables*

---

## Input & Form

| Variable | Value | Type |
|----------|-------|------|
| `--chat-input-icon-size` | `20px` | CSS |
| `--checkbox-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--checkbox-border-default` | `hsl(234 calc(1*4.425%) 44.314%/1)` | CSS |
| `--checkbox-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.8)` | CSS |
| `--checkbox-border-selected-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--checkbox-border-selected-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--checkbox-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-input-height-md` | `40px` | CSS |
| `--control-input-height-sm` | `32px` | CSS |
| `--custom-custom-role-icon-form-item-role-icon-preview-size` | `32px` | CSS |
| `--custom-radio-image-border-thickness` | `2px` | CSS |
| `--form-input-height` | `44px` | CSS |
| `--input-border-active` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--input-border-default` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--input-border-error-default` | `color-mix(in oklab,hsl(1.343 calc(1*84.81%) 69....` | CSS |
| `--input-border-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--input-border-readonly` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.0784...` | CSS |
| `--input-icon-default` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `--radio-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-border-default` | `hsl(240 calc(1*4%) 60.784%/0.6392156862745098)` | CSS |
| `--radio-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.8)` | CSS |
| `--radio-border-selected-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-border-selected-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-foreground-active` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--radio-foreground-default` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-foreground-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `INPUT_BORDER_DEFAULT` | `{}` | JS |
| `REDESIGN_INPUT_CONTROL_ACTIVE_BG` | `{}` | JS |
| `REDESIGN_INPUT_CONTROL_SELECTED` | `{}` | JS |

*Total: 29 variables*

---

## Border & Divider

| Variable | Value | Type |
|----------|-------|------|
| `--border-feedback-critical` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--border-focus` | `color-mix(in oklab,hsl(213.043 calc(1*86.25%) 6...` | CSS |
| `--border-muted` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-normal` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-strong` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-subtle` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--control-connected-border-active` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-connected-border-default` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-connected-border-hover` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-active` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-default` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-hover` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-secondary-border-active` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-critical-secondary-border-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-critical-secondary-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-expressive-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-expressive-border-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-expressive-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-icon-only-border-active` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-icon-only-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-overlay-primary-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-overlay-primary-border-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-overlay-primary-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-overlay-secondary-border-active` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-overlay-secondary-border-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-overlay-secondary-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-primary-border-active` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-primary-border-default` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-primary-border-hover` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-secondary-border-active` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-secondary-border-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-secondary-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--custom-app-launcher-container-border-radius` | `8px` | CSS |
| `--custom-avatar-avatar-decoration-border-position` | `calc((1 - 1.2)/2*100%)` | CSS |
| `--custom-base-tile-border-radius` | `8px` | CSS |
| `--custom-emoji-picker-border-radius` | `8px` | CSS |
| `--custom-guild-boosting-marketing-tier-cards-tier-card-border-radius` | `16px` | CSS |
| `--custom-guild-shop-channel-row-border-gradient` | `linear-gradient(113deg,#6591ff,#d150ff)` | CSS |
| `--custom-live-indicator-border-radius` | `16px` | CSS |
| `--custom-reaction-picker-border-radius` | `8px` | CSS |
| `--custom-scrollbar-border-radius` | `calc(14px/2)` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-border-radius` | `4px` | CSS |
| `--custom-stickers-constants-stickers-list-divider-height` | `30px` | CSS |
| `--custom-stickers-constants-stickers-shop-divider-border-top-width` | `1px` | CSS |
| `--custom-stickers-constants-stickers-shop-divider-height` | `1px` | CSS |
| `--shadow-border-filter` | `drop-shadow(0 0 1px hsl(none 0% 100%/0.08))` | CSS |
| `--switch-border-default` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--switch-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.4)` | CSS |
| `--switch-border-selected-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--switch-border-selected-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--video-calls-base-tile-border-radius` | `16px` | CSS |
| `BORDER_FOCUS` | `{}` | JS |
| `BORDER_MUTED` | `{}` | JS |
| `BORDER_STRONG` | `{}` | JS |
| `BORDER_SUBTLE` | `{}` | JS |
| `CONTROL_CONNECTED_BORDER_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_BORDER_DEFAULT` | `{}` | JS |

*Total: 57 variables*

---

## Status

| Variable | Value | Type |
|----------|-------|------|
| `--custom-guild-settings-premium-tier-status-progress-with-subscriptions-margin-top` | `7px` | CSS |
| `--custom-voice-channel-status-modal-emoji-margin` | `10px` | CSS |
| `--custom-voice-channel-status-modal-emoji-size` | `22px` | CSS |
| `--icon-status-dnd` | `color-mix(in oklab,hsl(358.052 calc(1*68.75%) 5...` | CSS |
| `--icon-status-idle` | `color-mix(in oklab,hsl(38.483 calc(1*100%) 71.5...` | CSS |
| `--icon-status-offline` | `color-mix(in oklab,hsl(232.5 calc(1*4.255%) 63....` | CSS |
| `--icon-status-online` | `color-mix(in oklab,hsl(141.649 calc(1*44.292%) ...` | CSS |
| `--status-danger` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--status-online` | `hsl(141.649 calc(1*44.292%) 42.941%/1)` | CSS |
| `--status-positive` | `hsl(141.649 calc(1*44.292%) 42.941%/1)` | CSS |
| `--status-positive-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--status-speaking` | `hsl(141.649 calc(1*44.292%) 42.941%/1)` | CSS |
| `--status-warning` | `hsl(39.505 calc(1*98.058%) 59.608%/1)` | CSS |
| `--status-warning-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `CUSTOM_STATUS_BUBBLE_BG` | `{}` | JS |
| `ICON_STATUS_DND` | `{}` | JS |
| `ICON_STATUS_IDLE` | `{}` | JS |
| `ICON_STATUS_OFFLINE` | `{}` | JS |
| `ICON_STATUS_ONLINE` | `{}` | JS |
| `STATUS_DANGER` | `{}` | JS |
| `STATUS_ONLINE` | `{}` | JS |
| `STATUS_POSITIVE` | `{}` | JS |
| `STATUS_POSITIVE_TEXT` | `{}` | JS |
| `STATUS_SPEAKING` | `{}` | JS |
| `STATUS_WARNING` | `{}` | JS |
| `STATUS_WARNING_TEXT` | `{}` | JS |

*Total: 26 variables*

---

## Brand & Premium

| Variable | Value | Type |
|----------|-------|------|
| `--bd-brand-active` | `#3268b7` | CSS |
| `--bd-brand-hover` | `#3875ce` | CSS |
| `--brand-05a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.05)` | CSS |
| `--brand-100` | `hsl(230.4 calc(1*100%) 95.098%/1)` | CSS |
| `--brand-100-hsl` | `230.4 calc(1*100%) 95.098%` | CSS |
| `--brand-10a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.1)` | CSS |
| `--brand-130` | `hsl(230.4 calc(1*100%) 95.098%/1)` | CSS |
| `--brand-130-hsl` | `230.4 calc(1*100%) 95.098%` | CSS |
| `--brand-15a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.15)` | CSS |
| `--brand-160` | `hsl(230.4 calc(1*100%) 95.098%/1)` | CSS |
| `--brand-160-hsl` | `230.4 calc(1*100%) 95.098%` | CSS |
| `--brand-200` | `hsl(228.333 calc(1*100%) 92.941%/1)` | CSS |
| `--brand-200-hsl` | `228.333 calc(1*100%) 92.941%` | CSS |
| `--brand-20a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.2)` | CSS |
| `--brand-230` | `hsl(228.261 calc(1*100%) 90.98%/1)` | CSS |
| `--brand-230-hsl` | `228.261 calc(1*100%) 90.98%` | CSS |
| `--brand-25a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.25)` | CSS |
| `--brand-260` | `hsl(228.214 calc(1*100%) 89.02%/1)` | CSS |
| `--brand-260-hsl` | `228.214 calc(1*100%) 89.02%` | CSS |
| `--brand-300` | `hsl(227.671 calc(1*100%) 85.686%/1)` | CSS |
| `--brand-300-hsl` | `227.671 calc(1*100%) 85.686%` | CSS |
| `--brand-30a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.3)` | CSS |
| `--brand-330` | `hsl(228.261 calc(1*100%) 81.961%/1)` | CSS |
| `--brand-330-hsl` | `228.261 calc(1*100%) 81.961%` | CSS |
| `--brand-345` | `hsl(228.785 calc(1*100%) 79.02%/1)` | CSS |
| `--brand-345-hsl` | `228.785 calc(1*100%) 79.02%` | CSS |
| `--brand-35a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.35)` | CSS |
| `--brand-360` | `hsl(229.381 calc(1*96.581%) 77.059%/1)` | CSS |
| `--brand-360-hsl` | `229.381 calc(1*96.581%) 77.059%` | CSS |
| `--brand-400` | `hsl(231.364 calc(1*90.411%) 71.373%/1)` | CSS |
| `--brand-400-hsl` | `231.364 calc(1*90.411%) 71.373%` | CSS |
| `--brand-40a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.4)` | CSS |
| `--brand-430` | `hsl(231.739 calc(1*88.462%) 69.412%/1)` | CSS |
| `--brand-430-hsl` | `231.739 calc(1*88.462%) 69.412%` | CSS |
| `--brand-45a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.45)` | CSS |
| `--brand-460` | `hsl(232.966 calc(1*86.826%) 67.255%/1)` | CSS |
| `--brand-460-hsl` | `232.966 calc(1*86.826%) 67.255%` | CSS |
| `--brand-500` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--brand-500-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--brand-50a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.5)` | CSS |
| `--brand-530` | `hsl(234.388 calc(1*65.877%) 58.627%/1)` | CSS |
| `--brand-530-hsl` | `234.388 calc(1*65.877%) 58.627%` | CSS |
| `--brand-55a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.55)` | CSS |
| `--brand-560` | `hsl(233.115 calc(1*49.194%) 51.373%/1)` | CSS |
| `--brand-560-hsl` | `233.115 calc(1*49.194%) 51.373%` | CSS |
| `--brand-600` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--brand-600-hsl` | `232 calc(1*47.511%) 43.333%` | CSS |
| `--brand-60a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.6)` | CSS |
| `--brand-630` | `hsl(230.968 calc(1*49.206%) 37.059%/1)` | CSS |
| `--brand-630-hsl` | `230.968 calc(1*49.206%) 37.059%` | CSS |
| `--brand-65a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.65)` | CSS |
| `--brand-660` | `hsl(230.602 calc(1*50.303%) 32.353%/1)` | CSS |
| `--brand-660-hsl` | `230.602 calc(1*50.303%) 32.353%` | CSS |
| `--brand-700` | `hsl(228.358 calc(1*54.472%) 24.118%/1)` | CSS |
| `--brand-700-hsl` | `228.358 calc(1*54.472%) 24.118%` | CSS |
| `--brand-70a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.7)` | CSS |
| `--brand-730` | `hsl(228 calc(1*55.556%) 22.941%/1)` | CSS |
| `--brand-730-hsl` | `228 calc(1*55.556%) 22.941%` | CSS |
| `--brand-75a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.75)` | CSS |
| `--brand-760` | `hsl(228.197 calc(1*57.009%) 20.98%/1)` | CSS |
| `--brand-760-hsl` | `228.197 calc(1*57.009%) 20.98%` | CSS |
| `--brand-800` | `hsl(227.143 calc(1*58.333%) 18.824%/1)` | CSS |
| `--brand-800-hsl` | `227.143 calc(1*58.333%) 18.824%` | CSS |
| `--brand-80a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.8)` | CSS |
| `--brand-830` | `hsl(225.652 calc(1*65.714%) 13.725%/1)` | CSS |
| `--brand-830-hsl` | `225.652 calc(1*65.714%) 13.725%` | CSS |
| `--brand-85a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.85)` | CSS |
| `--brand-860` | `hsl(224.516 calc(1*75.61%) 8.039%/1)` | CSS |
| `--brand-860-hsl` | `224.516 calc(1*75.61%) 8.039%` | CSS |
| `--brand-900` | `hsl(229.091 calc(1*84.615%) 2.549%/1)` | CSS |
| `--brand-900-hsl` | `229.091 calc(1*84.615%) 2.549%` | CSS |
| `--brand-90a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.9)` | CSS |
| `--brand-95a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.95)` | CSS |
| `--control-brand-foreground` | `color-mix(in oklab,hsl(229.381 calc(1*96.581%) ...` | CSS |
| `--control-brand-foreground-new` | `color-mix(in oklab,hsl(229.381 calc(1*96.581%) ...` | CSS |
| `--custom-emoji-picker-constants-emoji-premium-upsell-height` | `54px` | CSS |
| `--custom-emoji-picker-constants-emoji-premium-upsell-margin-top` | `16px` | CSS |
| `--custom-premium-colors-banner-black` | `#232428` | CSS |
| `--custom-premium-colors-banner-yellow` | `#ffeaa0` | CSS |
| `--custom-premium-colors-premium-gradient-tier-0` | `linear-gradient(to right,hsl(234.935 calc(1*85....` | CSS |
| `--custom-premium-colors-premium-gradient-tier-1` | `linear-gradient(to right,hsl(234.935 calc(1*85....` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2` | `linear-gradient(to right,hsl(269.291 calc(1*52....` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-diagonal` | `linear-gradient(45deg,hsl(269.291 calc(1*52.697...` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-old` | `linear-gradient(to right,hsl(270 calc(1*86.667%...` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-transparent` | `linear-gradient(to right,hsl(269.291 calc(1*52....` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-tri-color` | `linear-gradient(to right,hsl(269.291 calc(1*52....` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-tri-color-reverse` | `linear-gradient(to left,hsl(269.291 calc(1*52.6...` | CSS |
| `--custom-premium-colors-premium-gradient-tier-2-tri-color-vertical` | `linear-gradient(to top,hsl(269.291 calc(1*52.69...` | CSS |
| `--custom-premium-guild-progress-bar-progress-bar-width` | `24px` | CSS |
| `--custom-premium-guild-progress-bar-tier-marker-size` | `16px` | CSS |
| `--custom-premium-marketing-hero-heading-padding-top` | `120px` | CSS |
| `--custom-store-colors-premium-gradient` | `linear-gradient(to right,hsl(270 calc(1*86.667%...` | CSS |
| `--custom-user-premium-guild-subscription-easter-egg-size` | `196px` | CSS |
| `--premium-nitro-pink-dark` | `hsl(299.45 calc(1*43.083%) 50.392%/1)` | CSS |
| `--premium-nitro-pink-dark-hsl` | `299.45 calc(1*43.083%) 50.392%` | CSS |
| `--premium-nitro-pink-light` | `hsl(299.333 calc(1*42.857%) 58.824%/1)` | CSS |
| `--premium-nitro-pink-light-hsl` | `299.333 calc(1*42.857%) 58.824%` | CSS |
| `--premium-nitro-pink-text` | `color-mix(in oklab,hsl(315.341 calc(1*94.624%) ...` | CSS |
| `--premium-perk-blue` | `hsl(222.047 calc(1*100%) 75.098%/1)` | CSS |
| `--premium-perk-blue-alt` | `hsl(223.03 calc(1*100%) 80.588%/1)` | CSS |
| `--premium-perk-blue-alt-hsl` | `223.03 calc(1*100%) 80.588%` | CSS |
| `--premium-perk-blue-hsl` | `222.047 calc(1*100%) 75.098%` | CSS |
| `--premium-perk-dark-blue` | `hsl(220.392 calc(1*67.401%) 55.49%/1)` | CSS |
| `--premium-perk-dark-blue-hsl` | `220.392 calc(1*67.401%) 55.49%` | CSS |
| `--premium-perk-gold` | `hsl(37.5 calc(1*95.726%) 54.118%/1)` | CSS |
| `--premium-perk-gold-hsl` | `37.5 calc(1*95.726%) 54.118%` | CSS |
| `--premium-perk-green` | `hsl(163.953 calc(1*55.128%) 69.412%/1)` | CSS |
| `--premium-perk-green-hsl` | `163.953 calc(1*55.128%) 69.412%` | CSS |
| `--premium-perk-light-blue` | `hsl(221.481 calc(1*100%) 84.118%/1)` | CSS |
| `--premium-perk-light-blue-hsl` | `221.481 calc(1*100%) 84.118%` | CSS |
| `--premium-perk-orange` | `hsl(25.424 calc(1*96.721%) 64.118%/1)` | CSS |
| `--premium-perk-orange-hsl` | `25.424 calc(1*96.721%) 64.118%` | CSS |
| `--premium-perk-pink` | `hsl(305.197 calc(1*100%) 75.098%/1)` | CSS |
| `--premium-perk-pink-hsl` | `305.197 calc(1*100%) 75.098%` | CSS |
| `--premium-perk-purple` | `hsl(272.079 calc(1*100%) 80.196%/1)` | CSS |
| `--premium-perk-purple-hsl` | `272.079 calc(1*100%) 80.196%` | CSS |
| `--premium-perk-yellow` | `hsl(46.813 calc(1*98.913%) 63.922%/1)` | CSS |
| `--premium-perk-yellow-hsl` | `46.813 calc(1*98.913%) 63.922%` | CSS |
| `--premium-tier-0-blue` | `hsl(201.649 calc(1*100%) 38.039%/1)` | CSS |
| `--premium-tier-0-blue-for-gradients` | `hsl(201.649 calc(1*100%) 38.039%/1)` | CSS |
| `--premium-tier-0-blue-for-gradients-2` | `hsl(209.022 calc(1*80%) 45.098%/1)` | CSS |
| `--premium-tier-0-blue-for-gradients-2-hsl` | `209.022 calc(1*80%) 45.098%` | CSS |
| `--premium-tier-0-blue-for-gradients-hsl` | `201.649 calc(1*100%) 38.039%` | CSS |
| `--premium-tier-0-blue-hsl` | `201.649 calc(1*100%) 38.039%` | CSS |
| `--premium-tier-0-purple` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--premium-tier-0-purple-for-gradients` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--premium-tier-0-purple-for-gradients-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--premium-tier-0-purple-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--premium-tier-1-blue` | `hsl(227.538 calc(1*86.667%) 70.588%/1)` | CSS |
| `--premium-tier-1-blue-for-gradients` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--premium-tier-1-blue-for-gradients-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--premium-tier-1-blue-hsl` | `227.538 calc(1*86.667%) 70.588%` | CSS |
| `--premium-tier-1-dark-blue-for-gradients` | `hsl(234.909 calc(1*68.465%) 52.745%/1)` | CSS |
| `--premium-tier-1-dark-blue-for-gradients-hsl` | `234.909 calc(1*68.465%) 52.745%` | CSS |
| `--premium-tier-1-purple` | `hsl(243.704 calc(1*100%) 84.118%/1)` | CSS |
| `--premium-tier-1-purple-hsl` | `243.704 calc(1*100%) 84.118%` | CSS |
| `--premium-tier-2-pink` | `hsl(342 calc(1*57.971%) 72.941%/1)` | CSS |
| `--premium-tier-2-pink-for-gradients` | `hsl(325.385 calc(1*31.707%) 51.765%/1)` | CSS |
| `--premium-tier-2-pink-for-gradients-2` | `hsl(295.42 calc(1*51.373%) 50%/1)` | CSS |
| `--premium-tier-2-pink-for-gradients-2-hsl` | `295.42 calc(1*51.373%) 50%` | CSS |
| `--premium-tier-2-pink-for-gradients-hsl` | `325.385 calc(1*31.707%) 51.765%` | CSS |
| `--premium-tier-2-pink-hsl` | `342 calc(1*57.971%) 72.941%` | CSS |
| `--premium-tier-2-purple` | `hsl(270 calc(1*86.667%) 70.588%/1)` | CSS |
| `--premium-tier-2-purple-for-gradients` | `hsl(269.291 calc(1*52.697%) 52.745%/1)` | CSS |
| `--premium-tier-2-purple-for-gradients-2` | `hsl(295.645 calc(1*50%) 51.373%/1)` | CSS |
| `--premium-tier-2-purple-for-gradients-2-hsl` | `295.645 calc(1*50%) 51.373%` | CSS |
| `--premium-tier-2-purple-for-gradients-hsl` | `269.291 calc(1*52.697%) 52.745%` | CSS |
| `--premium-tier-2-purple-hsl` | `270 calc(1*86.667%) 70.588%` | CSS |
| `BRAND_100` | `#f7f7fe` | JS |
| `BRAND_130` | `#f0f1fe` | JS |
| `BRAND_160` | `#e7e9fd` | JS |
| `BRAND_200` | `#dee0fc` | JS |
| `BRAND_230` | `#d4d7fc` | JS |
| `BRAND_260` | `#c9cdfb` | JS |
| `BRAND_300` | `#bcc1fa` | JS |
| `BRAND_330` | `#a8aff8` | JS |
| `BRAND_345` | `#9ba3f7` | JS |
| `BRAND_360` | `#949cf7` | JS |
| `BRAND_400` | `#7984f5` | JS |
| `BRAND_430` | `#707bf4` | JS |
| `BRAND_460` | `#6571f3` | JS |
| `BRAND_500` | `#5865f2` | JS |
| `BRAND_530` | `#505cdc` | JS |
| `BRAND_560` | `#4752c4` | JS |
| `BRAND_600` | `#3c45a5` | JS |
| `BRAND_630` | `#343b8f` | JS |
| `BRAND_660` | `#2d347d` | JS |
| `BRAND_700` | `#232861` | JS |
| `BRAND_730` | `#21265b` | JS |
| `BRAND_760` | `#1e2353` | JS |
| `BRAND_800` | `#1a1e49` | JS |
| `BRAND_830` | `#141738` | JS |
| `BRAND_860` | `#0d0f24` | JS |
| `BRAND_900` | `#04050c` | JS |
| `CONTROL_BRAND_FOREGROUND` | `{}` | JS |
| `CONTROL_BRAND_FOREGROUND_NEW` | `{}` | JS |
| `PREMIUM_NITRO_PINK_DARK` | `#b64ab7` | JS |
| `PREMIUM_NITRO_PINK_LIGHT` | `#c269c3` | JS |
| `PREMIUM_NITRO_PINK_TEXT` | `{}` | JS |
| `PREMIUM_PERK_BLUE` | `#80a6ff` | JS |
| `PREMIUM_PERK_BLUE_ALT` | `#9cb8ff` | JS |
| `PREMIUM_PERK_DARK_BLUE` | `#4173da` | JS |
| `PREMIUM_PERK_GOLD` | `#faa61a` | JS |
| `PREMIUM_PERK_GREEN` | `#86dcc5` | JS |
| `PREMIUM_PERK_LIGHT_BLUE` | `#aec7ff` | JS |
| `PREMIUM_PERK_ORANGE` | `#fc964b` | JS |
| `PREMIUM_PERK_PINK` | `#ff80f4` | JS |
| `PREMIUM_PERK_PURPLE` | `#d09aff` | JS |
| `PREMIUM_PERK_YELLOW` | `#fed648` | JS |
| `PREMIUM_TIER_0_BLUE` | `#007cc2` | JS |
| `PREMIUM_TIER_0_BLUE_FOR_GRADIENTS` | `#007cc2` | JS |
| `PREMIUM_TIER_0_BLUE_FOR_GRADIENTS_2` | `#1776cf` | JS |
| `PREMIUM_TIER_0_PURPLE` | `#5865f2` | JS |
| `PREMIUM_TIER_0_PURPLE_FOR_GRADIENTS` | `#5865f2` | JS |
| `PREMIUM_TIER_1_BLUE` | `#738ef5` | JS |
| `PREMIUM_TIER_1_BLUE_FOR_GRADIENTS` | `#5865f2` | JS |
| `PREMIUM_TIER_1_DARK_BLUE_FOR_GRADIENTS` | `#3442d9` | JS |
| `PREMIUM_TIER_1_PURPLE` | `#b3aeff` | JS |
| `PREMIUM_TIER_2_PINK` | `#e292aa` | JS |
| `PREMIUM_TIER_2_PINK_FOR_GRADIENTS` | `#ab5d8a` | JS |
| `PREMIUM_TIER_2_PINK_FOR_GRADIENTS_2` | `#b73ec1` | JS |
| `PREMIUM_TIER_2_PURPLE` | `#b473f5` | JS |
| `PREMIUM_TIER_2_PURPLE_FOR_GRADIENTS` | `#8547c6` | JS |
| `PREMIUM_TIER_2_PURPLE_FOR_GRADIENTS_2` | `#b845c1` | JS |

*Total: 204 variables*

---

## Colors - Primary

| Variable | Value | Type |
|----------|-------|------|
| `--card-primary-pressed-bg` | `color-mix(in oklab,hsl(228 calc(1*6.849%) 14.31...` | CSS |
| `--checkpoint-emojis-primary-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-end-primary-hsl` | `143.316 calc(1*83.55%) 54.706%` | CSS |
| `--checkpoint-friends-primary-hsl` | `234 calc(1*90%) 80.392%` | CSS |
| `--checkpoint-gaming-primary-hsl` | `34.699 calc(1*100%) 51.176%` | CSS |
| `--checkpoint-guilds-primary-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-messages-primary-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--checkpoint-persona-eight-primary-hsl` | `39.184 calc(1*56.322%) 65.882%` | CSS |
| `--checkpoint-persona-five-primary-hsl` | `339.114 calc(1*90.805%) 65.882%` | CSS |
| `--checkpoint-persona-four-primary-hsl` | `312.083 calc(1*84.706%) 66.667%` | CSS |
| `--checkpoint-persona-nine-primary-hsl` | `0 calc(1*0%) 93.333%` | CSS |
| `--checkpoint-persona-one-primary-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-persona-seven-primary-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-persona-six-primary-hsl` | `26.834 calc(1*100%) 60.98%` | CSS |
| `--checkpoint-persona-three-primary-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-persona-two-primary-hsl` | `217.982 calc(1*93.162%) 77.059%` | CSS |
| `--checkpoint-persona-zero-primary-hsl` | `143.804 calc(1*83.636%) 56.863%` | CSS |
| `--checkpoint-quests-primary-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-voice-primary-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-welcome-primary-hsl` | `143.316 calc(1*83.55%) 54.706%` | CSS |
| `--control-critical-primary-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-primary-icon-active` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-primary-icon-default` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-overlay-primary-icon-hover` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-primary-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-primary-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-primary-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--custom-expression-picker-constants-expression-picker-inspector-bar-graphic-primary-dimensions` | `28px` | CSS |
| `--custom-store-colors-primary-750` | `#191b1d` | CSS |
| `--primary-100` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--primary-100-hsl` | `0 calc(1*0%) 98.431%` | CSS |
| `--primary-130` | `hsl(240 calc(1*4.348%) 95.49%/1)` | CSS |
| `--primary-130-hsl` | `240 calc(1*4.348%) 95.49%` | CSS |
| `--primary-160` | `hsl(210 calc(1*5.263%) 92.549%/1)` | CSS |
| `--primary-160-hsl` | `210 calc(1*5.263%) 92.549%` | CSS |
| `--primary-200` | `hsl(240 calc(1*3.846%) 89.804%/1)` | CSS |
| `--primary-200-hsl` | `240 calc(1*3.846%) 89.804%` | CSS |
| `--primary-230` | `hsl(240 calc(1*4.478%) 86.863%/1)` | CSS |
| `--primary-230-hsl` | `240 calc(1*4.478%) 86.863%` | CSS |
| `--primary-260` | `hsl(225 calc(1*4.878%) 83.922%/1)` | CSS |
| `--primary-260-hsl` | `225 calc(1*4.878%) 83.922%` | CSS |
| `--primary-300` | `hsl(228 calc(1*4.854%) 79.804%/1)` | CSS |
| `--primary-300-hsl` | `228 calc(1*4.854%) 79.804%` | CSS |
| `--primary-330` | `hsl(230 calc(1*4.545%) 74.118%/1)` | CSS |
| `--primary-330-hsl` | `230 calc(1*4.545%) 74.118%` | CSS |
| `--primary-345` | `hsl(231.429 calc(1*4.348%) 68.431%/1)` | CSS |
| `--primary-345-hsl` | `231.429 calc(1*4.348%) 68.431%` | CSS |
| `--primary-360` | `hsl(232.5 calc(1*4.082%) 61.569%/1)` | CSS |
| `--primary-360-hsl` | `232.5 calc(1*4.082%) 61.569%` | CSS |
| `--primary-400` | `hsl(233.333 calc(1*3.797%) 53.529%/1)` | CSS |
| `--primary-400-hsl` | `233.333 calc(1*3.797%) 53.529%` | CSS |
| `--primary-430` | `hsl(234 calc(1*4.425%) 44.314%/1)` | CSS |
| `--primary-430-hsl` | `234 calc(1*4.425%) 44.314%` | CSS |
| `--primary-460` | `hsl(234.545 calc(1*5.641%) 38.235%/1)` | CSS |
| `--primary-460-hsl` | `234.545 calc(1*5.641%) 38.235%` | CSS |
| `--primary-500` | `hsl(234.545 calc(1*6.509%) 33.137%/1)` | CSS |
| `--primary-500-hsl` | `234.545 calc(1*6.509%) 33.137%` | CSS |
| `--primary-530` | `hsl(233.333 calc(1*6.475%) 27.255%/1)` | CSS |
| `--primary-530-hsl` | `233.333 calc(1*6.475%) 27.255%` | CSS |
| `--primary-560` | `hsl(232.5 calc(1*6.557%) 23.922%/1)` | CSS |
| `--primary-560-hsl` | `232.5 calc(1*6.557%) 23.922%` | CSS |
| `--primary-600` | `hsl(231.429 calc(1*6.542%) 20.98%/1)` | CSS |
| `--primary-600-hsl` | `231.429 calc(1*6.542%) 20.98%` | CSS |
| `--primary-630` | `hsl(230 calc(1*6.383%) 18.431%/1)` | CSS |
| `--primary-630-hsl` | `230 calc(1*6.383%) 18.431%` | CSS |
| `--primary-645` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--primary-645-hsl` | `230 calc(1*6.818%) 17.255%` | CSS |
| `--primary-660` | `hsl(240 calc(1*6.494%) 15.098%/1)` | CSS |
| `--primary-660-hsl` | `240 calc(1*6.494%) 15.098%` | CSS |
| `--primary-700` | `hsl(225 calc(1*6.25%) 12.549%/1)` | CSS |
| `--primary-700-hsl` | `225 calc(1*6.25%) 12.549%` | CSS |
| `--primary-730` | `hsl(240 calc(1*7.143%) 10.98%/1)` | CSS |
| `--primary-730-hsl` | `240 calc(1*7.143%) 10.98%` | CSS |
| `--primary-760` | `hsl(240 calc(1*6.383%) 9.216%/1)` | CSS |
| `--primary-760-hsl` | `240 calc(1*6.383%) 9.216%` | CSS |
| `--primary-800` | `hsl(240 calc(1*5.263%) 7.451%/1)` | CSS |
| `--primary-800-hsl` | `240 calc(1*5.263%) 7.451%` | CSS |
| `--primary-830` | `hsl(240 calc(1*7.692%) 5.098%/1)` | CSS |
| `--primary-830-hsl` | `240 calc(1*7.692%) 5.098%` | CSS |
| `--primary-860` | `hsl(240 calc(1*9.091%) 2.157%/1)` | CSS |
| `--primary-860-hsl` | `240 calc(1*9.091%) 2.157%` | CSS |
| `--primary-900` | `hsl(240 calc(1*20%) 0.98%/1)` | CSS |
| `--primary-900-hsl` | `240 calc(1*20%) 0.98%` | CSS |
| `CARD_PRIMARY_PRESSED_BG` | `{}` | JS |
| `PRIMARY_100` | `#f9f9f9` | JS |
| `PRIMARY_130` | `#f2f3f5` | JS |
| `PRIMARY_160` | `#ebedef` | JS |
| `PRIMARY_200` | `#e3e5e8` | JS |
| `PRIMARY_230` | `#dbdee1` | JS |
| `PRIMARY_260` | `#d2d5d9` | JS |
| `PRIMARY_300` | `#c4c9ce` | JS |
| `PRIMARY_330` | `#b5bac1` | JS |
| `PRIMARY_345` | `#a5abb3` | JS |
| `PRIMARY_360` | `#949ba4` | JS |
| `PRIMARY_400` | `#80848e` | JS |
| `PRIMARY_430` | `#6d6f78` | JS |
| `PRIMARY_460` | `#5c5e66` | JS |
| `PRIMARY_500` | `#4e5058` | JS |
| `PRIMARY_530` | `#41434a` | JS |
| `PRIMARY_560` | `#383a40` | JS |
| `PRIMARY_600` | `#313338` | JS |
| `PRIMARY_630` | `#2b2d31` | JS |
| `PRIMARY_645` | `#282a2e` | JS |
| `PRIMARY_660` | `#232428` | JS |
| `PRIMARY_700` | `#1e1f22` | JS |
| `PRIMARY_730` | `#1a1b1e` | JS |
| `PRIMARY_760` | `#161719` | JS |
| `PRIMARY_800` | `#111214` | JS |
| `PRIMARY_830` | `#0c0c0d` | JS |
| `PRIMARY_860` | `#060607` | JS |
| `PRIMARY_900` | `#020202` | JS |

*Total: 113 variables*

---

## Colors - Black/White

| Variable | Value | Type |
|----------|-------|------|
| `--black-500` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-500-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-1` | `hsl(0 calc(1*0%) 0%/0.0196078431372549)` | CSS |
| `--opacity-black-1-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-12` | `hsl(0 calc(1*0%) 0%/0.12156862745098039)` | CSS |
| `--opacity-black-12-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-16` | `hsl(0 calc(1*0%) 0%/0.1607843137254902)` | CSS |
| `--opacity-black-16-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-20` | `hsl(0 calc(1*0%) 0%/0.2)` | CSS |
| `--opacity-black-20-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-24` | `hsl(0 calc(1*0%) 0%/0.23921568627450981)` | CSS |
| `--opacity-black-24-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-28` | `hsl(0 calc(1*0%) 0%/0.2784313725490196)` | CSS |
| `--opacity-black-28-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-32` | `hsl(0 calc(1*0%) 0%/0.3215686274509804)` | CSS |
| `--opacity-black-32-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-36` | `hsl(0 calc(1*0%) 0%/0.3607843137254902)` | CSS |
| `--opacity-black-36-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-4` | `hsl(0 calc(1*0%) 0%/0.0392156862745098)` | CSS |
| `--opacity-black-4-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-40` | `hsl(0 calc(1*0%) 0%/0.4)` | CSS |
| `--opacity-black-40-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-44` | `hsl(0 calc(1*0%) 0%/0.4392156862745098)` | CSS |
| `--opacity-black-44-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-48` | `hsl(0 calc(1*0%) 0%/0.47843137254901963)` | CSS |
| `--opacity-black-48-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-52` | `hsl(0 calc(1*0%) 0%/0.5215686274509804)` | CSS |
| `--opacity-black-52-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-56` | `hsl(0 calc(1*0%) 0%/0.5607843137254902)` | CSS |
| `--opacity-black-56-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-60` | `hsl(0 calc(1*0%) 0%/0.6)` | CSS |
| `--opacity-black-60-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-64` | `hsl(0 calc(1*0%) 0%/0.6392156862745098)` | CSS |
| `--opacity-black-64-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-68` | `hsl(0 calc(1*0%) 0%/0.6784313725490196)` | CSS |
| `--opacity-black-68-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-72` | `hsl(0 calc(1*0%) 0%/0.7215686274509804)` | CSS |
| `--opacity-black-72-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-76` | `hsl(0 calc(1*0%) 0%/0.7607843137254902)` | CSS |
| `--opacity-black-76-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-8` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--opacity-black-8-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-80` | `hsl(0 calc(1*0%) 0%/0.8)` | CSS |
| `--opacity-black-80-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-84` | `hsl(0 calc(1*0%) 0%/0.8392156862745098)` | CSS |
| `--opacity-black-84-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-88` | `hsl(0 calc(1*0%) 0%/0.8784313725490196)` | CSS |
| `--opacity-black-88-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-92` | `hsl(0 calc(1*0%) 0%/0.9215686274509803)` | CSS |
| `--opacity-black-92-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-black-96` | `hsl(0 calc(1*0%) 0%/0.9607843137254902)` | CSS |
| `--opacity-black-96-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--opacity-white-1` | `hsl(0 calc(1*0%) 100%/0.0196078431372549)` | CSS |
| `--opacity-white-1-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-12` | `hsl(0 calc(1*0%) 100%/0.12156862745098039)` | CSS |
| `--opacity-white-12-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-16` | `hsl(0 calc(1*0%) 100%/0.1607843137254902)` | CSS |
| `--opacity-white-16-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-20` | `hsl(0 calc(1*0%) 100%/0.2)` | CSS |
| `--opacity-white-20-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-24` | `hsl(0 calc(1*0%) 100%/0.23921568627450981)` | CSS |
| `--opacity-white-24-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-28` | `hsl(0 calc(1*0%) 100%/0.2784313725490196)` | CSS |
| `--opacity-white-28-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-32` | `hsl(0 calc(1*0%) 100%/0.3215686274509804)` | CSS |
| `--opacity-white-32-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-36` | `hsl(0 calc(1*0%) 100%/0.3607843137254902)` | CSS |
| `--opacity-white-36-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-4` | `hsl(0 calc(1*0%) 100%/0.0392156862745098)` | CSS |
| `--opacity-white-4-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-40` | `hsl(0 calc(1*0%) 100%/0.4)` | CSS |
| `--opacity-white-40-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-44` | `hsl(0 calc(1*0%) 100%/0.4392156862745098)` | CSS |
| `--opacity-white-44-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-48` | `hsl(0 calc(1*0%) 100%/0.47843137254901963)` | CSS |
| `--opacity-white-48-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-52` | `hsl(0 calc(1*0%) 100%/0.5215686274509804)` | CSS |
| `--opacity-white-52-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-56` | `hsl(0 calc(1*0%) 100%/0.5607843137254902)` | CSS |
| `--opacity-white-56-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-60` | `hsl(0 calc(1*0%) 100%/0.6)` | CSS |
| `--opacity-white-60-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-64` | `hsl(0 calc(1*0%) 100%/0.6392156862745098)` | CSS |
| `--opacity-white-64-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-68` | `hsl(0 calc(1*0%) 100%/0.6784313725490196)` | CSS |
| `--opacity-white-68-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-72` | `hsl(0 calc(1*0%) 100%/0.7215686274509804)` | CSS |
| `--opacity-white-72-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-76` | `hsl(0 calc(1*0%) 100%/0.7607843137254902)` | CSS |
| `--opacity-white-76-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-8` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--opacity-white-8-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-80` | `hsl(0 calc(1*0%) 100%/0.8)` | CSS |
| `--opacity-white-80-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-84` | `hsl(0 calc(1*0%) 100%/0.8392156862745098)` | CSS |
| `--opacity-white-84-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-88` | `hsl(0 calc(1*0%) 100%/0.8784313725490196)` | CSS |
| `--opacity-white-88-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-92` | `hsl(0 calc(1*0%) 100%/0.9215686274509803)` | CSS |
| `--opacity-white-92-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--opacity-white-96` | `hsl(0 calc(1*0%) 100%/0.9607843137254902)` | CSS |
| `--opacity-white-96-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-500` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-500-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-hsl` | `0 calc(1*0%) 100%` | CSS |
| `BLACK_500` | `#000000` | JS |
| `OPACITY_BLACK_1` | `#00000005` | JS |
| `OPACITY_BLACK_12` | `#0000001f` | JS |
| `OPACITY_BLACK_16` | `#00000029` | JS |
| `OPACITY_BLACK_20` | `#00000033` | JS |
| `OPACITY_BLACK_24` | `#0000003d` | JS |
| `OPACITY_BLACK_28` | `#00000047` | JS |
| `OPACITY_BLACK_32` | `#00000052` | JS |
| `OPACITY_BLACK_36` | `#0000005c` | JS |
| `OPACITY_BLACK_4` | `#0000000a` | JS |
| `OPACITY_BLACK_40` | `#00000066` | JS |
| `OPACITY_BLACK_44` | `#00000070` | JS |
| `OPACITY_BLACK_48` | `#0000007a` | JS |
| `OPACITY_BLACK_52` | `#00000085` | JS |
| `OPACITY_BLACK_56` | `#0000008f` | JS |
| `OPACITY_BLACK_60` | `#00000099` | JS |
| `OPACITY_BLACK_64` | `#000000a3` | JS |
| `OPACITY_BLACK_68` | `#000000ad` | JS |
| `OPACITY_BLACK_72` | `#000000b8` | JS |
| `OPACITY_BLACK_76` | `#000000c2` | JS |
| `OPACITY_BLACK_8` | `#00000014` | JS |
| `OPACITY_BLACK_80` | `#000000cc` | JS |
| `OPACITY_BLACK_84` | `#000000d6` | JS |
| `OPACITY_BLACK_88` | `#000000e0` | JS |
| `OPACITY_BLACK_92` | `#000000eb` | JS |
| `OPACITY_BLACK_96` | `#000000f5` | JS |
| `OPACITY_WHITE_1` | `#ffffff05` | JS |
| `OPACITY_WHITE_12` | `#ffffff1f` | JS |
| `OPACITY_WHITE_16` | `#ffffff29` | JS |
| `OPACITY_WHITE_20` | `#ffffff33` | JS |
| `OPACITY_WHITE_24` | `#ffffff3d` | JS |
| `OPACITY_WHITE_28` | `#ffffff47` | JS |
| `OPACITY_WHITE_32` | `#ffffff52` | JS |
| `OPACITY_WHITE_36` | `#ffffff5c` | JS |
| `OPACITY_WHITE_4` | `#ffffff0a` | JS |
| `OPACITY_WHITE_40` | `#ffffff66` | JS |
| `OPACITY_WHITE_44` | `#ffffff70` | JS |
| `OPACITY_WHITE_48` | `#ffffff7a` | JS |
| `OPACITY_WHITE_52` | `#ffffff85` | JS |
| `OPACITY_WHITE_56` | `#ffffff8f` | JS |
| `OPACITY_WHITE_60` | `#ffffff99` | JS |
| `OPACITY_WHITE_64` | `#ffffffa3` | JS |
| `OPACITY_WHITE_68` | `#ffffffad` | JS |
| `OPACITY_WHITE_72` | `#ffffffb8` | JS |
| `OPACITY_WHITE_76` | `#ffffffc2` | JS |
| `OPACITY_WHITE_8` | `#ffffff14` | JS |
| `OPACITY_WHITE_80` | `#ffffffcc` | JS |
| `OPACITY_WHITE_84` | `#ffffffd6` | JS |
| `OPACITY_WHITE_88` | `#ffffffe0` | JS |
| `OPACITY_WHITE_92` | `#ffffffeb` | JS |
| `OPACITY_WHITE_96` | `#fffffff5` | JS |
| `WHITE_500` | `#ffffff` | JS |

*Total: 158 variables*

---

## Colors - Blue

| Variable | Value | Type |
|----------|-------|------|
| `--blue-100` | `hsl(216.923 calc(1*100%) 94.902%/1)` | CSS |
| `--blue-100-hsl` | `216.923 calc(1*100%) 94.902%` | CSS |
| `--blue-130` | `hsl(216.923 calc(1*100%) 94.902%/1)` | CSS |
| `--blue-130-hsl` | `216.923 calc(1*100%) 94.902%` | CSS |
| `--blue-160` | `hsl(216.923 calc(1*100%) 94.902%/1)` | CSS |
| `--blue-160-hsl` | `216.923 calc(1*100%) 94.902%` | CSS |
| `--blue-200` | `hsl(215.455 calc(1*100%) 91.373%/1)` | CSS |
| `--blue-200-hsl` | `215.455 calc(1*100%) 91.373%` | CSS |
| `--blue-230` | `hsl(213.803 calc(1*100%) 86.078%/1)` | CSS |
| `--blue-230-hsl` | `213.803 calc(1*100%) 86.078%` | CSS |
| `--blue-260` | `hsl(213.333 calc(1*95.745%) 81.569%/1)` | CSS |
| `--blue-260-hsl` | `213.333 calc(1*95.745%) 81.569%` | CSS |
| `--blue-300` | `hsl(213.051 calc(1*89.394%) 74.118%/1)` | CSS |
| `--blue-300-hsl` | `213.051 calc(1*89.394%) 74.118%` | CSS |
| `--blue-330` | `hsl(213.043 calc(1*86.25%) 68.627%/1)` | CSS |
| `--blue-330-hsl` | `213.043 calc(1*86.25%) 68.627%` | CSS |
| `--blue-345` | `hsl(212.866 calc(1*83.069%) 62.941%/1)` | CSS |
| `--blue-345-hsl` | `212.866 calc(1*83.069%) 62.941%` | CSS |
| `--blue-360` | `hsl(212.791 calc(1*81.905%) 58.824%/1)` | CSS |
| `--blue-360-hsl` | `212.791 calc(1*81.905%) 58.824%` | CSS |
| `--blue-400` | `hsl(211.515 calc(1*80.488%) 51.765%/1)` | CSS |
| `--blue-400-hsl` | `211.515 calc(1*80.488%) 51.765%` | CSS |
| `--blue-430` | `hsl(209.309 calc(1*100%) 42.549%/1)` | CSS |
| `--blue-430-hsl` | `209.309 calc(1*100%) 42.549%` | CSS |
| `--blue-460` | `hsl(209.684 calc(1*96.939%) 38.431%/1)` | CSS |
| `--blue-460-hsl` | `209.684 calc(1*96.939%) 38.431%` | CSS |
| `--blue-500` | `hsl(209.294 calc(1*98.837%) 33.725%/1)` | CSS |
| `--blue-500-hsl` | `209.294 calc(1*98.837%) 33.725%` | CSS |
| `--blue-530` | `hsl(209.6 calc(1*100%) 29.412%/1)` | CSS |
| `--blue-530-hsl` | `209.6 calc(1*100%) 29.412%` | CSS |
| `--blue-560` | `hsl(210 calc(1*100%) 26.275%/1)` | CSS |
| `--blue-560-hsl` | `210 calc(1*100%) 26.275%` | CSS |
| `--blue-600` | `hsl(210.508 calc(1*100%) 23.137%/1)` | CSS |
| `--blue-600-hsl` | `210.508 calc(1*100%) 23.137%` | CSS |
| `--blue-630` | `hsl(210.841 calc(1*100%) 20.98%/1)` | CSS |
| `--blue-630-hsl` | `210.841 calc(1*100%) 20.98%` | CSS |
| `--blue-660` | `hsl(211.25 calc(1*100%) 18.824%/1)` | CSS |
| `--blue-660-hsl` | `211.25 calc(1*100%) 18.824%` | CSS |
| `--blue-700` | `hsl(212.791 calc(1*100%) 16.863%/1)` | CSS |
| `--blue-700-hsl` | `212.791 calc(1*100%) 16.863%` | CSS |
| `--blue-730` | `hsl(213.6 calc(1*100%) 14.706%/1)` | CSS |
| `--blue-730-hsl` | `213.6 calc(1*100%) 14.706%` | CSS |
| `--blue-760` | `hsl(215.077 calc(1*100%) 12.745%/1)` | CSS |
| `--blue-760-hsl` | `215.077 calc(1*100%) 12.745%` | CSS |
| `--blue-800` | `hsl(216.61 calc(1*100%) 11.569%/1)` | CSS |
| `--blue-800-hsl` | `216.61 calc(1*100%) 11.569%` | CSS |
| `--blue-830` | `hsl(217.647 calc(1*100%) 10%/1)` | CSS |
| `--blue-830-hsl` | `217.647 calc(1*100%) 10%` | CSS |
| `--blue-860` | `hsl(219.574 calc(1*100%) 9.216%/1)` | CSS |
| `--blue-860-hsl` | `219.574 calc(1*100%) 9.216%` | CSS |
| `--blue-900` | `hsl(221.429 calc(1*100%) 8.235%/1)` | CSS |
| `--blue-900-hsl` | `221.429 calc(1*100%) 8.235%` | CSS |
| `--blue-new-1` | `hsl(216.923 calc(1*100%) 94.902%/1)` | CSS |
| `--blue-new-1-hsl` | `216.923 calc(1*100%) 94.902%` | CSS |
| `--blue-new-10` | `hsl(214.545 calc(1*100%) 87.059%/1)` | CSS |
| `--blue-new-10-hsl` | `214.545 calc(1*100%) 87.059%` | CSS |
| `--blue-new-100` | `hsl(240 calc(1*100%) 1.373%/1)` | CSS |
| `--blue-new-100-hsl` | `240 calc(1*100%) 1.373%` | CSS |
| `--blue-new-11` | `hsl(213.803 calc(1*100%) 86.078%/1)` | CSS |
| `--blue-new-11-hsl` | `213.803 calc(1*100%) 86.078%` | CSS |
| `--blue-new-12` | `hsl(214.4 calc(1*100%) 85.294%/1)` | CSS |
| `--blue-new-12-hsl` | `214.4 calc(1*100%) 85.294%` | CSS |
| `--blue-new-13` | `hsl(214.177 calc(1*100%) 84.51%/1)` | CSS |
| `--blue-new-13-hsl` | `214.177 calc(1*100%) 84.51%` | CSS |
| `--blue-new-14` | `hsl(214.286 calc(1*100%) 83.529%/1)` | CSS |
| `--blue-new-14-hsl` | `214.286 calc(1*100%) 83.529%` | CSS |
| `--blue-new-15` | `hsl(213.793 calc(1*97.753%) 82.549%/1)` | CSS |
| `--blue-new-15-hsl` | `213.793 calc(1*97.753%) 82.549%` | CSS |
| `--blue-new-16` | `hsl(213.333 calc(1*95.745%) 81.569%/1)` | CSS |
| `--blue-new-16-hsl` | `213.333 calc(1*95.745%) 81.569%` | CSS |
| `--blue-new-17` | `hsl(213.83 calc(1*95.918%) 80.784%/1)` | CSS |
| `--blue-new-17-hsl` | `213.83 calc(1*95.918%) 80.784%` | CSS |
| `--blue-new-18` | `hsl(213.402 calc(1*94.175%) 79.804%/1)` | CSS |
| `--blue-new-18-hsl` | `213.402 calc(1*94.175%) 79.804%` | CSS |
| `--blue-new-19` | `hsl(213.861 calc(1*94.393%) 79.02%/1)` | CSS |
| `--blue-new-19-hsl` | `213.861 calc(1*94.393%) 79.02%` | CSS |
| `--blue-new-2` | `hsl(216.774 calc(1*100%) 93.922%/1)` | CSS |
| `--blue-new-2-hsl` | `216.774 calc(1*100%) 93.922%` | CSS |
| `--blue-new-20` | `hsl(213.143 calc(1*92.92%) 77.843%/1)` | CSS |
| `--blue-new-20-hsl` | `213.143 calc(1*92.92%) 77.843%` | CSS |
| `--blue-new-21` | `hsl(213.333 calc(1*91.525%) 76.863%/1)` | CSS |
| `--blue-new-21-hsl` | `213.333 calc(1*91.525%) 76.863%` | CSS |
| `--blue-new-22` | `hsl(213.214 calc(1*91.803%) 76.078%/1)` | CSS |
| `--blue-new-22-hsl` | `213.214 calc(1*91.803%) 76.078%` | CSS |
| `--blue-new-23` | `hsl(213.391 calc(1*90.551%) 75.098%/1)` | CSS |
| `--blue-new-23-hsl` | `213.391 calc(1*90.551%) 75.098%` | CSS |
| `--blue-new-24` | `hsl(213.051 calc(1*89.394%) 74.118%/1)` | CSS |
| `--blue-new-24-hsl` | `213.051 calc(1*89.394%) 74.118%` | CSS |
| `--blue-new-25` | `hsl(213.443 calc(1*89.706%) 73.333%/1)` | CSS |
| `--blue-new-25-hsl` | `213.443 calc(1*89.706%) 73.333%` | CSS |
| `--blue-new-26` | `hsl(213.12 calc(1*88.652%) 72.353%/1)` | CSS |
| `--blue-new-26-hsl` | `213.12 calc(1*88.652%) 72.353%` | CSS |
| `--blue-new-27` | `hsl(213.281 calc(1*87.671%) 71.373%/1)` | CSS |
| `--blue-new-27-hsl` | `213.281 calc(1*87.671%) 71.373%` | CSS |
| `--blue-new-28` | `hsl(212.977 calc(1*86.755%) 70.392%/1)` | CSS |
| `--blue-new-28-hsl` | `212.977 calc(1*86.755%) 70.392%` | CSS |
| `--blue-new-29` | `hsl(213.333 calc(1*87.097%) 69.608%/1)` | CSS |
| `--blue-new-29-hsl` | `213.333 calc(1*87.097%) 69.608%` | CSS |
| `--blue-new-3` | `hsl(216 calc(1*100%) 93.137%/1)` | CSS |
| `--blue-new-3-hsl` | `216 calc(1*100%) 93.137%` | CSS |
| `--blue-new-30` | `hsl(213.043 calc(1*86.25%) 68.627%/1)` | CSS |
| `--blue-new-30-hsl` | `213.043 calc(1*86.25%) 68.627%` | CSS |
| `--blue-new-31` | `hsl(213.191 calc(1*85.455%) 67.647%/1)` | CSS |
| `--blue-new-31-hsl` | `213.191 calc(1*85.455%) 67.647%` | CSS |
| `--blue-new-32` | `hsl(212.917 calc(1*84.706%) 66.667%/1)` | CSS |
| `--blue-new-32-hsl` | `212.917 calc(1*84.706%) 66.667%` | CSS |
| `--blue-new-33` | `hsl(213.061 calc(1*84%) 65.686%/1)` | CSS |
| `--blue-new-33-hsl` | `213.061 calc(1*84%) 65.686%` | CSS |
| `--blue-new-34` | `hsl(212.98 calc(1*84.358%) 64.902%/1)` | CSS |
| `--blue-new-34-hsl` | `212.98 calc(1*84.358%) 64.902%` | CSS |
| `--blue-new-35` | `hsl(213.117 calc(1*83.696%) 63.922%/1)` | CSS |
| `--blue-new-35-hsl` | `213.117 calc(1*83.696%) 63.922%` | CSS |
| `--blue-new-36` | `hsl(212.866 calc(1*83.069%) 62.941%/1)` | CSS |
| `--blue-new-36-hsl` | `212.866 calc(1*83.069%) 62.941%` | CSS |
| `--blue-new-37` | `hsl(212.795 calc(1*82.564%) 61.765%/1)` | CSS |
| `--blue-new-37-hsl` | `212.795 calc(1*82.564%) 61.765%` | CSS |
| `--blue-new-38` | `hsl(212.927 calc(1*82%) 60.784%/1)` | CSS |
| `--blue-new-38-hsl` | `212.927 calc(1*82%) 60.784%` | CSS |
| `--blue-new-39` | `hsl(212.695 calc(1*81.463%) 59.804%/1)` | CSS |
| `--blue-new-39-hsl` | `212.695 calc(1*81.463%) 59.804%` | CSS |
| `--blue-new-4` | `hsl(216 calc(1*100%) 92.157%/1)` | CSS |
| `--blue-new-4-hsl` | `216 calc(1*100%) 92.157%` | CSS |
| `--blue-new-40` | `hsl(212.791 calc(1*81.905%) 58.824%/1)` | CSS |
| `--blue-new-40-hsl` | `212.791 calc(1*81.905%) 58.824%` | CSS |
| `--blue-new-41` | `hsl(212.571 calc(1*81.395%) 57.843%/1)` | CSS |
| `--blue-new-41-hsl` | `212.571 calc(1*81.395%) 57.843%` | CSS |
| `--blue-new-42` | `hsl(212.514 calc(1*80.995%) 56.667%/1)` | CSS |
| `--blue-new-42-hsl` | `212.514 calc(1*80.995%) 56.667%` | CSS |
| `--blue-new-43` | `hsl(212.459 calc(1*80.617%) 55.49%/1)` | CSS |
| `--blue-new-43-hsl` | `212.459 calc(1*80.617%) 55.49%` | CSS |
| `--blue-new-44` | `hsl(212.086 calc(1*80.258%) 54.314%/1)` | CSS |
| `--blue-new-44-hsl` | `212.086 calc(1*80.258%) 54.314%` | CSS |
| `--blue-new-45` | `hsl(211.875 calc(1*80%) 52.941%/1)` | CSS |
| `--blue-new-45-hsl` | `211.875 calc(1*80%) 52.941%` | CSS |
| `--blue-new-46` | `hsl(211.515 calc(1*80.488%) 51.765%/1)` | CSS |
| `--blue-new-46-hsl` | `211.515 calc(1*80.488%) 51.765%` | CSS |
| `--blue-new-47` | `hsl(211.176 calc(1*80.315%) 50.196%/1)` | CSS |
| `--blue-new-47-hsl` | `211.176 calc(1*80.315%) 50.196%` | CSS |
| `--blue-new-48` | `hsl(210.711 calc(1*85.425%) 48.431%/1)` | CSS |
| `--blue-new-48-hsl` | `210.711 calc(1*85.425%) 48.431%` | CSS |
| `--blue-new-49` | `hsl(209.327 calc(1*95.708%) 45.686%/1)` | CSS |
| `--blue-new-49-hsl` | `209.327 calc(1*95.708%) 45.686%` | CSS |
| `--blue-new-5` | `hsl(215.455 calc(1*100%) 91.373%/1)` | CSS |
| `--blue-new-5-hsl` | `215.455 calc(1*100%) 91.373%` | CSS |
| `--blue-new-50` | `hsl(209.339 calc(1*100%) 44.51%/1)` | CSS |
| `--blue-new-50-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--blue-new-51` | `hsl(209.189 calc(1*100%) 43.529%/1)` | CSS |
| `--blue-new-51-hsl` | `209.189 calc(1*100%) 43.529%` | CSS |
| `--blue-new-52` | `hsl(209.309 calc(1*100%) 42.549%/1)` | CSS |
| `--blue-new-52-hsl` | `209.309 calc(1*100%) 42.549%` | CSS |
| `--blue-new-53` | `hsl(209.151 calc(1*100%) 41.569%/1)` | CSS |
| `--blue-new-53-hsl` | `209.151 calc(1*100%) 41.569%` | CSS |
| `--blue-new-54` | `hsl(209.126 calc(1*99.038%) 40.784%/1)` | CSS |
| `--blue-new-54-hsl` | `209.126 calc(1*99.038%) 40.784%` | CSS |
| `--blue-new-55` | `hsl(209.4 calc(1*98.039%) 40%/1)` | CSS |
| `--blue-new-55-hsl` | `209.4 calc(1*98.039%) 40%` | CSS |
| `--blue-new-56` | `hsl(209.388 calc(1*98%) 39.216%/1)` | CSS |
| `--blue-new-56-hsl` | `209.388 calc(1*98%) 39.216%` | CSS |
| `--blue-new-57` | `hsl(209.684 calc(1*96.939%) 38.431%/1)` | CSS |
| `--blue-new-57-hsl` | `209.684 calc(1*96.939%) 38.431%` | CSS |
| `--blue-new-58` | `hsl(209.514 calc(1*96.859%) 37.451%/1)` | CSS |
| `--blue-new-58-hsl` | `209.514 calc(1*96.859%) 37.451%` | CSS |
| `--blue-new-59` | `hsl(209.503 calc(1*96.791%) 36.667%/1)` | CSS |
| `--blue-new-59-hsl` | `209.503 calc(1*96.791%) 36.667%` | CSS |
| `--blue-new-6` | `hsl(214.286 calc(1*100%) 90.392%/1)` | CSS |
| `--blue-new-6-hsl` | `214.286 calc(1*100%) 90.392%` | CSS |
| `--blue-new-60` | `hsl(209.492 calc(1*97.79%) 35.49%/1)` | CSS |
| `--blue-new-60-hsl` | `209.492 calc(1*97.79%) 35.49%` | CSS |
| `--blue-new-61` | `hsl(209.48 calc(1*97.74%) 34.706%/1)` | CSS |
| `--blue-new-61-hsl` | `209.48 calc(1*97.74%) 34.706%` | CSS |
| `--blue-new-62` | `hsl(209.294 calc(1*98.837%) 33.725%/1)` | CSS |
| `--blue-new-62-hsl` | `209.294 calc(1*98.837%) 33.725%` | CSS |
| `--blue-new-63` | `hsl(209.455 calc(1*98.802%) 32.745%/1)` | CSS |
| `--blue-new-63-hsl` | `209.455 calc(1*98.802%) 32.745%` | CSS |
| `--blue-new-64` | `hsl(209.259 calc(1*100%) 31.765%/1)` | CSS |
| `--blue-new-64-hsl` | `209.259 calc(1*100%) 31.765%` | CSS |
| `--blue-new-65` | `hsl(209.241 calc(1*100%) 30.98%/1)` | CSS |
| `--blue-new-65-hsl` | `209.241 calc(1*100%) 30.98%` | CSS |
| `--blue-new-66` | `hsl(209.221 calc(1*100%) 30.196%/1)` | CSS |
| `--blue-new-66-hsl` | `209.221 calc(1*100%) 30.196%` | CSS |
| `--blue-new-67` | `hsl(209.6 calc(1*100%) 29.412%/1)` | CSS |
| `--blue-new-67-hsl` | `209.6 calc(1*100%) 29.412%` | CSS |
| `--blue-new-68` | `hsl(209.589 calc(1*100%) 28.627%/1)` | CSS |
| `--blue-new-68-hsl` | `209.589 calc(1*100%) 28.627%` | CSS |
| `--blue-new-69` | `hsl(209.577 calc(1*100%) 27.843%/1)` | CSS |
| `--blue-new-69-hsl` | `209.577 calc(1*100%) 27.843%` | CSS |
| `--blue-new-7` | `hsl(215.094 calc(1*100%) 89.608%/1)` | CSS |
| `--blue-new-7-hsl` | `215.094 calc(1*100%) 89.608%` | CSS |
| `--blue-new-70` | `hsl(209.565 calc(1*100%) 27.059%/1)` | CSS |
| `--blue-new-70-hsl` | `209.565 calc(1*100%) 27.059%` | CSS |
| `--blue-new-71` | `hsl(210 calc(1*100%) 26.275%/1)` | CSS |
| `--blue-new-71-hsl` | `210 calc(1*100%) 26.275%` | CSS |
| `--blue-new-72` | `hsl(210 calc(1*100%) 25.49%/1)` | CSS |
| `--blue-new-72-hsl` | `210 calc(1*100%) 25.49%` | CSS |
| `--blue-new-73` | `hsl(210 calc(1*100%) 24.706%/1)` | CSS |
| `--blue-new-73-hsl` | `210 calc(1*100%) 24.706%` | CSS |
| `--blue-new-74` | `hsl(210 calc(1*100%) 23.922%/1)` | CSS |
| `--blue-new-74-hsl` | `210 calc(1*100%) 23.922%` | CSS |
| `--blue-new-75` | `hsl(210.508 calc(1*100%) 23.137%/1)` | CSS |
| `--blue-new-75-hsl` | `210.508 calc(1*100%) 23.137%` | CSS |
| `--blue-new-76` | `hsl(210.783 calc(1*100%) 22.549%/1)` | CSS |
| `--blue-new-76-hsl` | `210.783 calc(1*100%) 22.549%` | CSS |
| `--blue-new-77` | `hsl(210.811 calc(1*100%) 21.765%/1)` | CSS |
| `--blue-new-77-hsl` | `210.811 calc(1*100%) 21.765%` | CSS |
| `--blue-new-78` | `hsl(210.841 calc(1*100%) 20.98%/1)` | CSS |
| `--blue-new-78-hsl` | `210.841 calc(1*100%) 20.98%` | CSS |
| `--blue-new-79` | `hsl(211.154 calc(1*100%) 20.392%/1)` | CSS |
| `--blue-new-79-hsl` | `211.154 calc(1*100%) 20.392%` | CSS |
| `--blue-new-8` | `hsl(214.138 calc(1*100%) 88.627%/1)` | CSS |
| `--blue-new-8-hsl` | `214.138 calc(1*100%) 88.627%` | CSS |
| `--blue-new-80` | `hsl(211.2 calc(1*100%) 19.608%/1)` | CSS |
| `--blue-new-80-hsl` | `211.2 calc(1*100%) 19.608%` | CSS |
| `--blue-new-81` | `hsl(211.25 calc(1*100%) 18.824%/1)` | CSS |
| `--blue-new-81-hsl` | `211.25 calc(1*100%) 18.824%` | CSS |
| `--blue-new-82` | `hsl(212.258 calc(1*100%) 18.235%/1)` | CSS |
| `--blue-new-82-hsl` | `212.258 calc(1*100%) 18.235%` | CSS |
| `--blue-new-83` | `hsl(212.36 calc(1*100%) 17.451%/1)` | CSS |
| `--blue-new-83-hsl` | `212.36 calc(1*100%) 17.451%` | CSS |
| `--blue-new-84` | `hsl(212.791 calc(1*100%) 16.863%/1)` | CSS |
| `--blue-new-84-hsl` | `212.791 calc(1*100%) 16.863%` | CSS |
| `--blue-new-85` | `hsl(212.927 calc(1*100%) 16.078%/1)` | CSS |
| `--blue-new-85-hsl` | `212.927 calc(1*100%) 16.078%` | CSS |
| `--blue-new-86` | `hsl(213.418 calc(1*100%) 15.49%/1)` | CSS |
| `--blue-new-86-hsl` | `213.418 calc(1*100%) 15.49%` | CSS |
| `--blue-new-87` | `hsl(213.6 calc(1*100%) 14.706%/1)` | CSS |
| `--blue-new-87-hsl` | `213.6 calc(1*100%) 14.706%` | CSS |
| `--blue-new-88` | `hsl(214.167 calc(1*100%) 14.118%/1)` | CSS |
| `--blue-new-88-hsl` | `214.167 calc(1*100%) 14.118%` | CSS |
| `--blue-new-89` | `hsl(214.783 calc(1*100%) 13.529%/1)` | CSS |
| `--blue-new-89-hsl` | `214.783 calc(1*100%) 13.529%` | CSS |
| `--blue-new-9` | `hsl(213.871 calc(1*100%) 87.843%/1)` | CSS |
| `--blue-new-9-hsl` | `213.871 calc(1*100%) 87.843%` | CSS |
| `--blue-new-90` | `hsl(215.077 calc(1*100%) 12.745%/1)` | CSS |
| `--blue-new-90-hsl` | `215.077 calc(1*100%) 12.745%` | CSS |
| `--blue-new-91` | `hsl(215.806 calc(1*100%) 12.157%/1)` | CSS |
| `--blue-new-91-hsl` | `215.806 calc(1*100%) 12.157%` | CSS |
| `--blue-new-92` | `hsl(216.61 calc(1*100%) 11.569%/1)` | CSS |
| `--blue-new-92-hsl` | `216.61 calc(1*100%) 11.569%` | CSS |
| `--blue-new-93` | `hsl(217.091 calc(1*100%) 10.784%/1)` | CSS |
| `--blue-new-93-hsl` | `217.091 calc(1*100%) 10.784%` | CSS |
| `--blue-new-94` | `hsl(217.647 calc(1*100%) 10%/1)` | CSS |
| `--blue-new-94-hsl` | `217.647 calc(1*100%) 10%` | CSS |
| `--blue-new-95` | `hsl(219.574 calc(1*100%) 9.216%/1)` | CSS |
| `--blue-new-95-hsl` | `219.574 calc(1*100%) 9.216%` | CSS |
| `--blue-new-96` | `hsl(221.429 calc(1*100%) 8.235%/1)` | CSS |
| `--blue-new-96-hsl` | `221.429 calc(1*100%) 8.235%` | CSS |
| `--blue-new-97` | `hsl(223.333 calc(1*100%) 7.059%/1)` | CSS |
| `--blue-new-97-hsl` | `223.333 calc(1*100%) 7.059%` | CSS |
| `--blue-new-98` | `hsl(227.586 calc(1*100%) 5.686%/1)` | CSS |
| `--blue-new-98-hsl` | `227.586 calc(1*100%) 5.686%` | CSS |
| `--blue-new-99` | `hsl(231 calc(1*100%) 3.922%/1)` | CSS |
| `--blue-new-99-hsl` | `231 calc(1*100%) 3.922%` | CSS |
| `--expressive-gradient-blue-end` | `color-mix(in oklab,hsl(237.931 calc(1*72.5%) 31...` | CSS |
| `--expressive-gradient-blue-start` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--guild-boosting-blue-for-gradients` | `hsl(234.909 calc(1*68.465%) 52.745%/1)` | CSS |
| `--guild-boosting-blue-for-gradients-hsl` | `234.909 calc(1*68.465%) 52.745%` | CSS |
| `--guild-boosting-blue-hsl` | `221.132 calc(1*70.044%) 55.49%` | CSS |
| `--illo-blue-10` | `hsl(235.2 calc(1*100%) 95.098%/1)` | CSS |
| `--illo-blue-10-hsl` | `235.2 calc(1*100%) 95.098%` | CSS |
| `--illo-blue-20` | `hsl(234.737 calc(1*90.476%) 87.647%/1)` | CSS |
| `--illo-blue-20-hsl` | `234.737 calc(1*90.476%) 87.647%` | CSS |
| `--illo-blue-30` | `hsl(234 calc(1*90%) 80.392%/1)` | CSS |
| `--illo-blue-30-hsl` | `234 calc(1*90%) 80.392%` | CSS |
| `--illo-blue-40` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--illo-blue-40-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--illo-blue-50` | `hsl(236.25 calc(1*58.716%) 42.745%/1)` | CSS |
| `--illo-blue-50-hsl` | `236.25 calc(1*58.716%) 42.745%` | CSS |
| `--illo-blue-60` | `hsl(237.931 calc(1*72.5%) 31.373%/1)` | CSS |
| `--illo-blue-60-hsl` | `237.931 calc(1*72.5%) 31.373%` | CSS |
| `--illo-blue-70` | `hsl(240 calc(1*100%) 20%/1)` | CSS |
| `--illo-blue-70-hsl` | `240 calc(1*100%) 20%` | CSS |
| `--illo-nitro-blue-hsl` | `240 calc(1*82.063%) 43.725%` | CSS |
| `--opacity-blue-1` | `hsl(209.339 calc(1*100%) 44.51%/0.0196078431372...` | CSS |
| `--opacity-blue-1-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-12` | `hsl(209.339 calc(1*100%) 44.51%/0.1215686274509...` | CSS |
| `--opacity-blue-12-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-16` | `hsl(209.339 calc(1*100%) 44.51%/0.1607843137254...` | CSS |
| `--opacity-blue-16-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-20` | `hsl(209.339 calc(1*100%) 44.51%/0.2)` | CSS |
| `--opacity-blue-20-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-24` | `hsl(209.339 calc(1*100%) 44.51%/0.2392156862745...` | CSS |
| `--opacity-blue-24-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-28` | `hsl(209.339 calc(1*100%) 44.51%/0.2784313725490...` | CSS |
| `--opacity-blue-28-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-32` | `hsl(209.339 calc(1*100%) 44.51%/0.3215686274509...` | CSS |
| `--opacity-blue-32-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-36` | `hsl(209.339 calc(1*100%) 44.51%/0.3607843137254...` | CSS |
| `--opacity-blue-36-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-4` | `hsl(209.339 calc(1*100%) 44.51%/0.0392156862745...` | CSS |
| `--opacity-blue-4-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-40` | `hsl(209.339 calc(1*100%) 44.51%/0.4)` | CSS |
| `--opacity-blue-40-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-44` | `hsl(209.339 calc(1*100%) 44.51%/0.4392156862745...` | CSS |
| `--opacity-blue-44-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-48` | `hsl(209.339 calc(1*100%) 44.51%/0.4784313725490...` | CSS |
| `--opacity-blue-48-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-52` | `hsl(209.339 calc(1*100%) 44.51%/0.5215686274509...` | CSS |
| `--opacity-blue-52-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-56` | `hsl(209.339 calc(1*100%) 44.51%/0.5607843137254...` | CSS |
| `--opacity-blue-56-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-60` | `hsl(209.339 calc(1*100%) 44.51%/0.6)` | CSS |
| `--opacity-blue-60-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-64` | `hsl(209.339 calc(1*100%) 44.51%/0.6392156862745...` | CSS |
| `--opacity-blue-64-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-68` | `hsl(209.339 calc(1*100%) 44.51%/0.6784313725490...` | CSS |
| `--opacity-blue-68-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-72` | `hsl(209.339 calc(1*100%) 44.51%/0.7215686274509...` | CSS |
| `--opacity-blue-72-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-76` | `hsl(209.339 calc(1*100%) 44.51%/0.7607843137254...` | CSS |
| `--opacity-blue-76-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-8` | `hsl(209.339 calc(1*100%) 44.51%/0.0784313725490...` | CSS |
| `--opacity-blue-8-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-80` | `hsl(209.339 calc(1*100%) 44.51%/0.8)` | CSS |
| `--opacity-blue-80-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-84` | `hsl(209.339 calc(1*100%) 44.51%/0.8392156862745...` | CSS |
| `--opacity-blue-84-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-88` | `hsl(209.339 calc(1*100%) 44.51%/0.8784313725490...` | CSS |
| `--opacity-blue-88-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-92` | `hsl(209.339 calc(1*100%) 44.51%/0.9215686274509...` | CSS |
| `--opacity-blue-92-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--opacity-blue-96` | `hsl(209.339 calc(1*100%) 44.51%/0.9607843137254...` | CSS |
| `--opacity-blue-96-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--role-blue-hsl` | `203.793 calc(1*64.444%) 35.294%` | CSS |
| `--role-dark-blue-hsl` | `198.947 calc(1*18.447%) 40.392%` | CSS |
| `--role-light-blue-hsl` | `203.571 calc(1*15.909%) 65.49%` | CSS |
| `--role-sky-blue-hsl` | `204.072 calc(1*69.874%) 53.137%` | CSS |
| `BLUE_100` | `#f6fafe` | JS |
| `BLUE_130` | `#f0f7fe` | JS |
| `BLUE_160` | `#e2f0fd` | JS |
| `BLUE_200` | `#cde8fd` | JS |
| `BLUE_230` | `#b2ddfc` | JS |
| `BLUE_260` | `#94d2fc` | JS |
| `BLUE_300` | `#66c4fd` | JS |
| `BLUE_330` | `#2eb6ff` | JS |
| `BLUE_345` | `#00aafc` | JS |
| `BLUE_360` | `#0097f2` | JS |
| `BLUE_400` | `#0082eb` | JS |
| `BLUE_430` | `#006be7` | JS |
| `BLUE_460` | `#005cd1` | JS |
| `BLUE_500` | `#0051b6` | JS |
| `BLUE_530` | `#00489b` | JS |
| `BLUE_560` | `#004088` | JS |
| `BLUE_600` | `#003976` | JS |
| `BLUE_630` | `#00336a` | JS |
| `BLUE_660` | `#002d5f` | JS |
| `BLUE_700` | `#002855` | JS |
| `BLUE_730` | `#002348` | JS |
| `BLUE_760` | `#001e3f` | JS |
| `BLUE_800` | `#001a36` | JS |
| `BLUE_830` | `#001630` | JS |
| `BLUE_860` | `#00132b` | JS |
| `BLUE_900` | `#001024` | JS |
| `BLUE_NEW_1` | `#e5efff` | JS |
| `BLUE_NEW_10` | `#bdd9ff` | JS |
| `BLUE_NEW_100` | `#000007` | JS |
| `BLUE_NEW_11` | `#b8d7ff` | JS |
| `BLUE_NEW_12` | `#b4d4ff` | JS |
| `BLUE_NEW_13` | `#b0d2ff` | JS |
| `BLUE_NEW_14` | `#abcfff` | JS |
| `BLUE_NEW_15` | `#a7cdfe` | JS |
| `BLUE_NEW_16` | `#a3cbfd` | JS |
| `BLUE_NEW_17` | `#9fc8fd` | JS |
| `BLUE_NEW_18` | `#9bc6fc` | JS |
| `BLUE_NEW_19` | `#97c3fc` | JS |
| `BLUE_NEW_2` | `#e0ecff` | JS |
| `BLUE_NEW_20` | `#92c1fb` | JS |
| `BLUE_NEW_21` | `#8ebefa` | JS |
| `BLUE_NEW_22` | `#8abcfa` | JS |
| `BLUE_NEW_23` | `#86b9f9` | JS |
| `BLUE_NEW_24` | `#82b7f8` | JS |
| `BLUE_NEW_25` | `#7eb4f8` | JS |
| `BLUE_NEW_26` | `#7ab2f7` | JS |
| `BLUE_NEW_27` | `#76aff6` | JS |
| `BLUE_NEW_28` | `#72adf5` | JS |
| `BLUE_NEW_29` | `#6eaaf5` | JS |
| `BLUE_NEW_3` | `#dceaff` | JS |
| `BLUE_NEW_30` | `#6aa8f4` | JS |
| `BLUE_NEW_31` | `#66a5f3` | JS |
| `BLUE_NEW_32` | `#62a3f2` | JS |
| `BLUE_NEW_33` | `#5ea0f1` | JS |
| `BLUE_NEW_34` | `#5a9ef1` | JS |
| `BLUE_NEW_35` | `#569bf0` | JS |
| `BLUE_NEW_36` | `#5299ef` | JS |
| `BLUE_NEW_37` | `#4d96ee` | JS |
| `BLUE_NEW_38` | `#4993ed` | JS |
| `BLUE_NEW_39` | `#4591ec` | JS |
| `BLUE_NEW_4` | `#d7e7ff` | JS |
| `BLUE_NEW_40` | `#408eec` | JS |
| `BLUE_NEW_41` | `#3c8ceb` | JS |
| `BLUE_NEW_42` | `#3789ea` | JS |
| `BLUE_NEW_43` | `#3286e9` | JS |
| `BLUE_NEW_44` | `#2d84e8` | JS |
| `BLUE_NEW_45` | `#2781e7` | JS |
| `BLUE_NEW_46` | `#217fe7` | JS |
| `BLUE_NEW_47` | `#1a7ce6` | JS |
| `BLUE_NEW_48` | `#1279e5` | JS |
| `BLUE_NEW_49` | `#0577e4` | JS |
| `BLUE_NEW_5` | `#d3e5ff` | JS |
| `BLUE_NEW_50` | `#0074e3` | JS |
| `BLUE_NEW_51` | `#0072de` | JS |
| `BLUE_NEW_52` | `#006fd9` | JS |
| `BLUE_NEW_53` | `#006dd4` | JS |
| `BLUE_NEW_54` | `#016bcf` | JS |
| `BLUE_NEW_55` | `#0268ca` | JS |
| `BLUE_NEW_56` | `#0266c6` | JS |
| `BLUE_NEW_57` | `#0363c1` | JS |
| `BLUE_NEW_58` | `#0361bc` | JS |
| `BLUE_NEW_59` | `#035fb8` | JS |
| `BLUE_NEW_6` | `#cee3ff` | JS |
| `BLUE_NEW_60` | `#025cb3` | JS |
| `BLUE_NEW_61` | `#025aaf` | JS |
| `BLUE_NEW_62` | `#0158ab` | JS |
| `BLUE_NEW_63` | `#0155a6` | JS |
| `BLUE_NEW_64` | `#0053a2` | JS |
| `BLUE_NEW_65` | `#00519e` | JS |
| `BLUE_NEW_66` | `#004f9a` | JS |
| `BLUE_NEW_67` | `#004c96` | JS |
| `BLUE_NEW_68` | `#004a92` | JS |
| `BLUE_NEW_69` | `#00488e` | JS |
| `BLUE_NEW_7` | `#cae0ff` | JS |
| `BLUE_NEW_70` | `#00468a` | JS |
| `BLUE_NEW_71` | `#004386` | JS |
| `BLUE_NEW_72` | `#004182` | JS |
| `BLUE_NEW_73` | `#003f7e` | JS |
| `BLUE_NEW_74` | `#003d7a` | JS |
| `BLUE_NEW_75` | `#003a76` | JS |
| `BLUE_NEW_76` | `#003873` | JS |
| `BLUE_NEW_77` | `#00366f` | JS |
| `BLUE_NEW_78` | `#00346b` | JS |
| `BLUE_NEW_79` | `#003268` | JS |
| `BLUE_NEW_8` | `#c5deff` | JS |
| `BLUE_NEW_80` | `#003064` | JS |
| `BLUE_NEW_81` | `#002e60` | JS |
| `BLUE_NEW_82` | `#002b5d` | JS |
| `BLUE_NEW_83` | `#002959` | JS |
| `BLUE_NEW_84` | `#002756` | JS |
| `BLUE_NEW_85` | `#002552` | JS |
| `BLUE_NEW_86` | `#00234f` | JS |
| `BLUE_NEW_87` | `#00214b` | JS |
| `BLUE_NEW_88` | `#001f48` | JS |
| `BLUE_NEW_89` | `#001d45` | JS |
| `BLUE_NEW_9` | `#c1dcff` | JS |
| `BLUE_NEW_90` | `#001b41` | JS |
| `BLUE_NEW_91` | `#00193e` | JS |
| `BLUE_NEW_92` | `#00173b` | JS |
| `BLUE_NEW_93` | `#001537` | JS |
| `BLUE_NEW_94` | `#001333` | JS |
| `BLUE_NEW_95` | `#00102f` | JS |
| `BLUE_NEW_96` | `#000d2a` | JS |
| `BLUE_NEW_97` | `#000a24` | JS |
| `BLUE_NEW_98` | `#00061d` | JS |
| `BLUE_NEW_99` | `#000314` | JS |
| `EXPRESSIVE_GRADIENT_BLUE_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_BLUE_START` | `{}` | JS |
| `GUILD_BOOSTING_BLUE_FOR_GRADIENTS` | `#3442d9` | JS |
| `ILLO_BLUE_10` | `#e6e8ff` | JS |
| `ILLO_BLUE_20` | `#c3c8fc` | JS |
| `ILLO_BLUE_30` | `#a0a9fa` | JS |
| `ILLO_BLUE_40` | `#5865f2` | JS |
| `ILLO_BLUE_50` | `#2d35ad` | JS |
| `ILLO_BLUE_60` | `#161a8a` | JS |
| `ILLO_BLUE_70` | `#000066` | JS |
| `OPACITY_BLUE_1` | `#0074e305` | JS |
| `OPACITY_BLUE_12` | `#0074e31f` | JS |
| `OPACITY_BLUE_16` | `#0074e329` | JS |
| `OPACITY_BLUE_20` | `#0074e333` | JS |
| `OPACITY_BLUE_24` | `#0074e33d` | JS |
| `OPACITY_BLUE_28` | `#0074e347` | JS |
| `OPACITY_BLUE_32` | `#0074e352` | JS |
| `OPACITY_BLUE_36` | `#0074e35c` | JS |
| `OPACITY_BLUE_4` | `#0074e30a` | JS |
| `OPACITY_BLUE_40` | `#0074e366` | JS |
| `OPACITY_BLUE_44` | `#0074e370` | JS |
| `OPACITY_BLUE_48` | `#0074e37a` | JS |
| `OPACITY_BLUE_52` | `#0074e385` | JS |
| `OPACITY_BLUE_56` | `#0074e38f` | JS |
| `OPACITY_BLUE_60` | `#0074e399` | JS |
| `OPACITY_BLUE_64` | `#0074e3a3` | JS |
| `OPACITY_BLUE_68` | `#0074e3ad` | JS |
| `OPACITY_BLUE_72` | `#0074e3b8` | JS |
| `OPACITY_BLUE_76` | `#0074e3c2` | JS |
| `OPACITY_BLUE_8` | `#0074e314` | JS |
| `OPACITY_BLUE_80` | `#0074e3cc` | JS |
| `OPACITY_BLUE_84` | `#0074e3d6` | JS |
| `OPACITY_BLUE_88` | `#0074e3e0` | JS |
| `OPACITY_BLUE_92` | `#0074e3eb` | JS |
| `OPACITY_BLUE_96` | `#0074e3f5` | JS |

*Total: 487 variables*

---

## Colors - Green

| Variable | Value | Type |
|----------|-------|------|
| `--chip-green-dark-text` | `hsl(137.455 calc(1*100%) 89.216%/1)` | CSS |
| `--chip-green-light-text` | `hsl(136.216 calc(1*100%) 7.255%/1)` | CSS |
| `--chip-green-medium-text` | `hsl(131.111 calc(1*100%) 5.294%/1)` | CSS |
| `--expressive-gradient-green-end` | `color-mix(in oklab,hsl(152.941 calc(1*100%) 20%...` | CSS |
| `--expressive-gradient-green-start` | `color-mix(in oklab,hsl(145.714 calc(1*70%) 43.1...` | CSS |
| `--expressive-gradient-nitro-green-end` | `color-mix(in oklab,hsl(240 calc(1*82.063%) 43.7...` | CSS |
| `--expressive-gradient-nitro-green-start` | `color-mix(in oklab,hsl(145.714 calc(1*70%) 43.1...` | CSS |
| `--green-100` | `hsl(137.455 calc(1*100%) 89.216%/1)` | CSS |
| `--green-100-hsl` | `137.455 calc(1*100%) 89.216%` | CSS |
| `--green-130` | `hsl(137.455 calc(1*100%) 89.216%/1)` | CSS |
| `--green-130-hsl` | `137.455 calc(1*100%) 89.216%` | CSS |
| `--green-160` | `hsl(136.271 calc(1*90.769%) 87.255%/1)` | CSS |
| `--green-160-hsl` | `136.271 calc(1*90.769%) 87.255%` | CSS |
| `--green-200` | `hsl(136.364 calc(1*64.706%) 80%/1)` | CSS |
| `--green-200-hsl` | `136.364 calc(1*64.706%) 80%` | CSS |
| `--green-230` | `hsl(136.438 calc(1*50.345%) 71.569%/1)` | CSS |
| `--green-230-hsl` | `136.438 calc(1*50.345%) 71.569%` | CSS |
| `--green-260` | `hsl(137.143 calc(1*44%) 65.686%/1)` | CSS |
| `--green-260-hsl` | `137.143 calc(1*44%) 65.686%` | CSS |
| `--green-300` | `hsl(137.778 calc(1*40.704%) 60.98%/1)` | CSS |
| `--green-300-hsl` | `137.778 calc(1*40.704%) 60.98%` | CSS |
| `--green-330` | `hsl(138.353 calc(1*38.117%) 56.275%/1)` | CSS |
| `--green-330-hsl` | `138.353 calc(1*38.117%) 56.275%` | CSS |
| `--green-345` | `hsl(140 calc(1*35.433%) 50.196%/1)` | CSS |
| `--green-345-hsl` | `140 calc(1*35.433%) 50.196%` | CSS |
| `--green-360` | `hsl(141.649 calc(1*44.292%) 42.941%/1)` | CSS |
| `--green-360-hsl` | `141.649 calc(1*44.292%) 42.941%` | CSS |
| `--green-400` | `hsl(145.234 calc(1*58.47%) 35.882%/1)` | CSS |
| `--green-400-hsl` | `145.234 calc(1*58.47%) 35.882%` | CSS |
| `--green-430` | `hsl(151.406 calc(1*100%) 25.098%/1)` | CSS |
| `--green-430-hsl` | `151.406 calc(1*100%) 25.098%` | CSS |
| `--green-460` | `hsl(150.536 calc(1*98.246%) 22.353%/1)` | CSS |
| `--green-460-hsl` | `150.536 calc(1*98.246%) 22.353%` | CSS |
| `--green-500` | `hsl(150.6 calc(1*100%) 19.608%/1)` | CSS |
| `--green-500-hsl` | `150.6 calc(1*100%) 19.608%` | CSS |
| `--green-530` | `hsl(149.302 calc(1*100%) 16.863%/1)` | CSS |
| `--green-530-hsl` | `149.302 calc(1*100%) 16.863%` | CSS |
| `--green-560` | `hsl(148.052 calc(1*100%) 15.098%/1)` | CSS |
| `--green-560-hsl` | `148.052 calc(1*100%) 15.098%` | CSS |
| `--green-600` | `hsl(146.866 calc(1*100%) 13.137%/1)` | CSS |
| `--green-600-hsl` | `146.866 calc(1*100%) 13.137%` | CSS |
| `--green-630` | `hsl(144.59 calc(1*100%) 11.961%/1)` | CSS |
| `--green-630-hsl` | `144.59 calc(1*100%) 11.961%` | CSS |
| `--green-660` | `hsl(143.333 calc(1*100%) 10.588%/1)` | CSS |
| `--green-660-hsl` | `143.333 calc(1*100%) 10.588%` | CSS |
| `--green-700` | `hsl(141.25 calc(1*100%) 9.412%/1)` | CSS |
| `--green-700-hsl` | `141.25 calc(1*100%) 9.412%` | CSS |
| `--green-730` | `hsl(139.024 calc(1*100%) 8.039%/1)` | CSS |
| `--green-730-hsl` | `139.024 calc(1*100%) 8.039%` | CSS |
| `--green-760` | `hsl(136.216 calc(1*100%) 7.255%/1)` | CSS |
| `--green-760-hsl` | `136.216 calc(1*100%) 7.255%` | CSS |
| `--green-800` | `hsl(133.548 calc(1*100%) 6.078%/1)` | CSS |
| `--green-800-hsl` | `133.548 calc(1*100%) 6.078%` | CSS |
| `--green-830` | `hsl(131.111 calc(1*100%) 5.294%/1)` | CSS |
| `--green-830-hsl` | `131.111 calc(1*100%) 5.294%` | CSS |
| `--green-860` | `hsl(128.182 calc(1*100%) 4.314%/1)` | CSS |
| `--green-860-hsl` | `128.182 calc(1*100%) 4.314%` | CSS |
| `--green-900` | `hsl(129.474 calc(1*100%) 3.725%/1)` | CSS |
| `--green-900-hsl` | `129.474 calc(1*100%) 3.725%` | CSS |
| `--green-new-1` | `hsl(137.455 calc(1*100%) 89.216%/1)` | CSS |
| `--green-new-1-hsl` | `137.455 calc(1*100%) 89.216%` | CSS |
| `--green-new-10` | `hsl(136.364 calc(1*61.111%) 78.824%/1)` | CSS |
| `--green-new-10-hsl` | `136.364 calc(1*61.111%) 78.824%` | CSS |
| `--green-new-100` | `hsl(127.5 calc(1*100%) 3.137%/1)` | CSS |
| `--green-new-100-hsl` | `127.5 calc(1*100%) 3.137%` | CSS |
| `--green-new-11` | `hsl(135.882 calc(1*59.649%) 77.647%/1)` | CSS |
| `--green-new-11-hsl` | `135.882 calc(1*59.649%) 77.647%` | CSS |
| `--green-new-12` | `hsl(136.522 calc(1*57.025%) 76.275%/1)` | CSS |
| `--green-new-12-hsl` | `136.522 calc(1*57.025%) 76.275%` | CSS |
| `--green-new-13` | `hsl(136.522 calc(1*54.331%) 75.098%/1)` | CSS |
| `--green-new-13-hsl` | `136.522 calc(1*54.331%) 75.098%` | CSS |
| `--green-new-14` | `hsl(136.901 calc(1*53.383%) 73.922%/1)` | CSS |
| `--green-new-14-hsl` | `136.901 calc(1*53.383%) 73.922%` | CSS |
| `--green-new-15` | `hsl(136.056 calc(1*51.079%) 72.745%/1)` | CSS |
| `--green-new-15-hsl` | `136.056 calc(1*51.079%) 72.745%` | CSS |
| `--green-new-16` | `hsl(136.438 calc(1*50.345%) 71.569%/1)` | CSS |
| `--green-new-16-hsl` | `136.438 calc(1*50.345%) 71.569%` | CSS |
| `--green-new-17` | `hsl(136.438 calc(1*48.344%) 70.392%/1)` | CSS |
| `--green-new-17-hsl` | `136.438 calc(1*48.344%) 70.392%` | CSS |
| `--green-new-18` | `hsl(136.8 calc(1*47.771%) 69.216%/1)` | CSS |
| `--green-new-18-hsl` | `136.8 calc(1*47.771%) 69.216%` | CSS |
| `--green-new-19` | `hsl(136.8 calc(1*46.012%) 68.039%/1)` | CSS |
| `--green-new-19-hsl` | `136.8 calc(1*46.012%) 68.039%` | CSS |
| `--green-new-2` | `hsl(136.552 calc(1*100%) 88.627%/1)` | CSS |
| `--green-new-2-hsl` | `136.552 calc(1*100%) 88.627%` | CSS |
| `--green-new-20` | `hsl(137.368 calc(1*44.706%) 66.667%/1)` | CSS |
| `--green-new-20-hsl` | `137.368 calc(1*44.706%) 66.667%` | CSS |
| `--green-new-21` | `hsl(137.143 calc(1*44%) 65.686%/1)` | CSS |
| `--green-new-21-hsl` | `137.143 calc(1*44%) 65.686%` | CSS |
| `--green-new-22` | `hsl(137.143 calc(1*42.541%) 64.51%/1)` | CSS |
| `--green-new-22-hsl` | `137.143 calc(1*42.541%) 64.51%` | CSS |
| `--green-new-23` | `hsl(137.468 calc(1*42.246%) 63.333%/1)` | CSS |
| `--green-new-23-hsl` | `137.468 calc(1*42.246%) 63.333%` | CSS |
| `--green-new-24` | `hsl(137.468 calc(1*40.933%) 62.157%/1)` | CSS |
| `--green-new-24-hsl` | `137.468 calc(1*40.933%) 62.157%` | CSS |
| `--green-new-25` | `hsl(137.778 calc(1*40.704%) 60.98%/1)` | CSS |
| `--green-new-25-hsl` | `137.778 calc(1*40.704%) 60.98%` | CSS |
| `--green-new-26` | `hsl(137.778 calc(1*39.512%) 59.804%/1)` | CSS |
| `--green-new-26-hsl` | `137.778 calc(1*39.512%) 59.804%` | CSS |
| `--green-new-27` | `hsl(138.072 calc(1*39.336%) 58.627%/1)` | CSS |
| `--green-new-27-hsl` | `138.072 calc(1*39.336%) 58.627%` | CSS |
| `--green-new-28` | `hsl(138.072 calc(1*38.249%) 57.451%/1)` | CSS |
| `--green-new-28-hsl` | `138.072 calc(1*38.249%) 57.451%` | CSS |
| `--green-new-29` | `hsl(138.353 calc(1*38.117%) 56.275%/1)` | CSS |
| `--green-new-29-hsl` | `138.353 calc(1*38.117%) 56.275%` | CSS |
| `--green-new-3` | `hsl(136.271 calc(1*90.769%) 87.255%/1)` | CSS |
| `--green-new-3-hsl` | `136.271 calc(1*90.769%) 87.255%` | CSS |
| `--green-new-30` | `hsl(138.353 calc(1*37.118%) 55.098%/1)` | CSS |
| `--green-new-30-hsl` | `138.353 calc(1*37.118%) 55.098%` | CSS |
| `--green-new-31` | `hsl(138.837 calc(1*36.441%) 53.725%/1)` | CSS |
| `--green-new-31-hsl` | `138.837 calc(1*36.441%) 53.725%` | CSS |
| `--green-new-32` | `hsl(139.31 calc(1*36.1%) 52.745%/1)` | CSS |
| `--green-new-32-hsl` | `139.31 calc(1*36.1%) 52.745%` | CSS |
| `--green-new-33` | `hsl(139.773 calc(1*35.484%) 51.373%/1)` | CSS |
| `--green-new-33-hsl` | `139.773 calc(1*35.484%) 51.373%` | CSS |
| `--green-new-34` | `hsl(140 calc(1*35.433%) 50.196%/1)` | CSS |
| `--green-new-34-hsl` | `140 calc(1*35.433%) 50.196%` | CSS |
| `--green-new-35` | `hsl(140 calc(1*36%) 49.02%/1)` | CSS |
| `--green-new-35-hsl` | `140 calc(1*36%) 49.02%` | CSS |
| `--green-new-36` | `hsl(140.217 calc(1*37.705%) 47.843%/1)` | CSS |
| `--green-new-36-hsl` | `140.217 calc(1*37.705%) 47.843%` | CSS |
| `--green-new-37` | `hsl(140.645 calc(1*39.241%) 46.471%/1)` | CSS |
| `--green-new-37-hsl` | `140.645 calc(1*39.241%) 46.471%` | CSS |
| `--green-new-38` | `hsl(141.064 calc(1*40.517%) 45.49%/1)` | CSS |
| `--green-new-38-hsl` | `141.064 calc(1*40.517%) 45.49%` | CSS |
| `--green-new-39` | `hsl(141.474 calc(1*42.222%) 44.118%/1)` | CSS |
| `--green-new-39-hsl` | `141.474 calc(1*42.222%) 44.118%` | CSS |
| `--green-new-4` | `hsl(137 calc(1*83.333%) 85.882%/1)` | CSS |
| `--green-new-4-hsl` | `137 calc(1*83.333%) 85.882%` | CSS |
| `--green-new-40` | `hsl(141.649 calc(1*44.292%) 42.941%/1)` | CSS |
| `--green-new-40-hsl` | `141.649 calc(1*44.292%) 42.941%` | CSS |
| `--green-new-41` | `hsl(142.041 calc(1*46.226%) 41.569%/1)` | CSS |
| `--green-new-41-hsl` | `142.041 calc(1*46.226%) 41.569%` | CSS |
| `--green-new-42` | `hsl(143.168 calc(1*49.268%) 40.196%/1)` | CSS |
| `--green-new-42-hsl` | `143.168 calc(1*49.268%) 40.196%` | CSS |
| `--green-new-43` | `hsl(143.529 calc(1*51.515%) 38.824%/1)` | CSS |
| `--green-new-43-hsl` | `143.529 calc(1*51.515%) 38.824%` | CSS |
| `--green-new-44` | `hsl(144 calc(1*54.974%) 37.451%/1)` | CSS |
| `--green-new-44-hsl` | `144 calc(1*54.974%) 37.451%` | CSS |
| `--green-new-45` | `hsl(145.234 calc(1*58.47%) 35.882%/1)` | CSS |
| `--green-new-45-hsl` | `145.234 calc(1*58.47%) 35.882%` | CSS |
| `--green-new-46` | `hsl(145.636 calc(1*62.5%) 34.51%/1)` | CSS |
| `--green-new-46-hsl` | `145.636 calc(1*62.5%) 34.51%` | CSS |
| `--green-new-47` | `hsl(146.316 calc(1*67.857%) 32.941%/1)` | CSS |
| `--green-new-47-hsl` | `146.316 calc(1*67.857%) 32.941%` | CSS |
| `--green-new-48` | `hsl(147.731 calc(1*75.796%) 30.784%/1)` | CSS |
| `--green-new-48-hsl` | `147.731 calc(1*75.796%) 30.784%` | CSS |
| `--green-new-49` | `hsl(149.764 calc(1*87.586%) 28.431%/1)` | CSS |
| `--green-new-49-hsl` | `149.764 calc(1*87.586%) 28.431%` | CSS |
| `--green-new-5` | `hsl(135.738 calc(1*79.221%) 84.902%/1)` | CSS |
| `--green-new-5-hsl` | `135.738 calc(1*79.221%) 84.902%` | CSS |
| `--green-new-50` | `hsl(151.128 calc(1*100%) 26.078%/1)` | CSS |
| `--green-new-50-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--green-new-51` | `hsl(151.145 calc(1*100%) 25.686%/1)` | CSS |
| `--green-new-51-hsl` | `151.145 calc(1*100%) 25.686%` | CSS |
| `--green-new-52` | `hsl(151.406 calc(1*100%) 25.098%/1)` | CSS |
| `--green-new-52-hsl` | `151.406 calc(1*100%) 25.098%` | CSS |
| `--green-new-53` | `hsl(150.968 calc(1*98.413%) 24.706%/1)` | CSS |
| `--green-new-53-hsl` | `150.968 calc(1*98.413%) 24.706%` | CSS |
| `--green-new-54` | `hsl(150.984 calc(1*98.387%) 24.314%/1)` | CSS |
| `--green-new-54-hsl` | `150.984 calc(1*98.387%) 24.314%` | CSS |
| `--green-new-55` | `hsl(150.756 calc(1*98.347%) 23.725%/1)` | CSS |
| `--green-new-55-hsl` | `150.756 calc(1*98.347%) 23.725%` | CSS |
| `--green-new-56` | `hsl(150.769 calc(1*98.319%) 23.333%/1)` | CSS |
| `--green-new-56-hsl` | `150.769 calc(1*98.319%) 23.333%` | CSS |
| `--green-new-57` | `hsl(151.053 calc(1*98.276%) 22.745%/1)` | CSS |
| `--green-new-57-hsl` | `151.053 calc(1*98.276%) 22.745%` | CSS |
| `--green-new-58` | `hsl(150.536 calc(1*98.246%) 22.353%/1)` | CSS |
| `--green-new-58-hsl` | `150.536 calc(1*98.246%) 22.353%` | CSS |
| `--green-new-59` | `hsl(150.826 calc(1*98.198%) 21.765%/1)` | CSS |
| `--green-new-59-hsl` | `150.826 calc(1*98.198%) 21.765%` | CSS |
| `--green-new-6` | `hsl(136.452 calc(1*73.81%) 83.529%/1)` | CSS |
| `--green-new-6-hsl` | `136.452 calc(1*73.81%) 83.529%` | CSS |
| `--green-new-60` | `hsl(150.556 calc(1*100%) 21.176%/1)` | CSS |
| `--green-new-60-hsl` | `150.556 calc(1*100%) 21.176%` | CSS |
| `--green-new-61` | `hsl(150.857 calc(1*100%) 20.588%/1)` | CSS |
| `--green-new-61-hsl` | `150.857 calc(1*100%) 20.588%` | CSS |
| `--green-new-62` | `hsl(150.291 calc(1*100%) 20.196%/1)` | CSS |
| `--green-new-62-hsl` | `150.291 calc(1*100%) 20.196%` | CSS |
| `--green-new-63` | `hsl(150.6 calc(1*100%) 19.608%/1)` | CSS |
| `--green-new-63-hsl` | `150.6 calc(1*100%) 19.608%` | CSS |
| `--green-new-64` | `hsl(150 calc(1*100%) 19.216%/1)` | CSS |
| `--green-new-64-hsl` | `150 calc(1*100%) 19.216%` | CSS |
| `--green-new-65` | `hsl(150.316 calc(1*100%) 18.627%/1)` | CSS |
| `--green-new-65-hsl` | `150.316 calc(1*100%) 18.627%` | CSS |
| `--green-new-66` | `hsl(149.677 calc(1*100%) 18.235%/1)` | CSS |
| `--green-new-66-hsl` | `149.677 calc(1*100%) 18.235%` | CSS |
| `--green-new-67` | `hsl(149.67 calc(1*100%) 17.843%/1)` | CSS |
| `--green-new-67-hsl` | `149.67 calc(1*100%) 17.843%` | CSS |
| `--green-new-68` | `hsl(149.318 calc(1*100%) 17.255%/1)` | CSS |
| `--green-new-68-hsl` | `149.318 calc(1*100%) 17.255%` | CSS |
| `--green-new-69` | `hsl(149.302 calc(1*100%) 16.863%/1)` | CSS |
| `--green-new-69-hsl` | `149.302 calc(1*100%) 16.863%` | CSS |
| `--green-new-7` | `hsl(135.938 calc(1*71.111%) 82.353%/1)` | CSS |
| `--green-new-7-hsl` | `135.938 calc(1*71.111%) 82.353%` | CSS |
| `--green-new-70` | `hsl(148.571 calc(1*100%) 16.471%/1)` | CSS |
| `--green-new-70-hsl` | `148.571 calc(1*100%) 16.471%` | CSS |
| `--green-new-71` | `hsl(148.889 calc(1*100%) 15.882%/1)` | CSS |
| `--green-new-71-hsl` | `148.889 calc(1*100%) 15.882%` | CSS |
| `--green-new-72` | `hsl(148.101 calc(1*100%) 15.49%/1)` | CSS |
| `--green-new-72-hsl` | `148.101 calc(1*100%) 15.49%` | CSS |
| `--green-new-73` | `hsl(148.052 calc(1*100%) 15.098%/1)` | CSS |
| `--green-new-73-hsl` | `148.052 calc(1*100%) 15.098%` | CSS |
| `--green-new-74` | `hsl(147.568 calc(1*100%) 14.51%/1)` | CSS |
| `--green-new-74-hsl` | `147.568 calc(1*100%) 14.51%` | CSS |
| `--green-new-75` | `hsl(147.5 calc(1*100%) 14.118%/1)` | CSS |
| `--green-new-75-hsl` | `147.5 calc(1*100%) 14.118%` | CSS |
| `--green-new-76` | `hsl(146.571 calc(1*100%) 13.725%/1)` | CSS |
| `--green-new-76-hsl` | `146.571 calc(1*100%) 13.725%` | CSS |
| `--green-new-77` | `hsl(146.866 calc(1*100%) 13.137%/1)` | CSS |
| `--green-new-77-hsl` | `146.866 calc(1*100%) 13.137%` | CSS |
| `--green-new-78` | `hsl(145.846 calc(1*100%) 12.745%/1)` | CSS |
| `--green-new-78-hsl` | `145.846 calc(1*100%) 12.745%` | CSS |
| `--green-new-79` | `hsl(145.714 calc(1*100%) 12.353%/1)` | CSS |
| `--green-new-79-hsl` | `145.714 calc(1*100%) 12.353%` | CSS |
| `--green-new-8` | `hsl(135.938 calc(1*66.667%) 81.176%/1)` | CSS |
| `--green-new-8-hsl` | `135.938 calc(1*66.667%) 81.176%` | CSS |
| `--green-new-80` | `hsl(144.59 calc(1*100%) 11.961%/1)` | CSS |
| `--green-new-80-hsl` | `144.59 calc(1*100%) 11.961%` | CSS |
| `--green-new-81` | `hsl(144.407 calc(1*100%) 11.569%/1)` | CSS |
| `--green-new-81-hsl` | `144.407 calc(1*100%) 11.569%` | CSS |
| `--green-new-82` | `hsl(143.571 calc(1*100%) 10.98%/1)` | CSS |
| `--green-new-82-hsl` | `143.571 calc(1*100%) 10.98%` | CSS |
| `--green-new-83` | `hsl(143.333 calc(1*100%) 10.588%/1)` | CSS |
| `--green-new-83-hsl` | `143.333 calc(1*100%) 10.588%` | CSS |
| `--green-new-84` | `hsl(143.077 calc(1*100%) 10.196%/1)` | CSS |
| `--green-new-84-hsl` | `143.077 calc(1*100%) 10.196%` | CSS |
| `--green-new-85` | `hsl(141.6 calc(1*100%) 9.804%/1)` | CSS |
| `--green-new-85-hsl` | `141.6 calc(1*100%) 9.804%` | CSS |
| `--green-new-86` | `hsl(141.25 calc(1*100%) 9.412%/1)` | CSS |
| `--green-new-86-hsl` | `141.25 calc(1*100%) 9.412%` | CSS |
| `--green-new-87` | `hsl(139.565 calc(1*100%) 9.02%/1)` | CSS |
| `--green-new-87-hsl` | `139.565 calc(1*100%) 9.02%` | CSS |
| `--green-new-88` | `hsl(139.535 calc(1*100%) 8.431%/1)` | CSS |
| `--green-new-88-hsl` | `139.535 calc(1*100%) 8.431%` | CSS |
| `--green-new-89` | `hsl(139.024 calc(1*100%) 8.039%/1)` | CSS |
| `--green-new-89-hsl` | `139.024 calc(1*100%) 8.039%` | CSS |
| `--green-new-9` | `hsl(136.364 calc(1*64.706%) 80%/1)` | CSS |
| `--green-new-9-hsl` | `136.364 calc(1*64.706%) 80%` | CSS |
| `--green-new-90` | `hsl(138.462 calc(1*100%) 7.647%/1)` | CSS |
| `--green-new-90-hsl` | `138.462 calc(1*100%) 7.647%` | CSS |
| `--green-new-91` | `hsl(136.216 calc(1*100%) 7.255%/1)` | CSS |
| `--green-new-91-hsl` | `136.216 calc(1*100%) 7.255%` | CSS |
| `--green-new-92` | `hsl(135.429 calc(1*100%) 6.863%/1)` | CSS |
| `--green-new-92-hsl` | `135.429 calc(1*100%) 6.863%` | CSS |
| `--green-new-93` | `hsl(134.545 calc(1*100%) 6.471%/1)` | CSS |
| `--green-new-93-hsl` | `134.545 calc(1*100%) 6.471%` | CSS |
| `--green-new-94` | `hsl(133.548 calc(1*100%) 6.078%/1)` | CSS |
| `--green-new-94-hsl` | `133.548 calc(1*100%) 6.078%` | CSS |
| `--green-new-95` | `hsl(132.414 calc(1*100%) 5.686%/1)` | CSS |
| `--green-new-95-hsl` | `132.414 calc(1*100%) 5.686%` | CSS |
| `--green-new-96` | `hsl(131.111 calc(1*100%) 5.294%/1)` | CSS |
| `--green-new-96-hsl` | `131.111 calc(1*100%) 5.294%` | CSS |
| `--green-new-97` | `hsl(129.6 calc(1*100%) 4.902%/1)` | CSS |
| `--green-new-97-hsl` | `129.6 calc(1*100%) 4.902%` | CSS |
| `--green-new-98` | `hsl(128.182 calc(1*100%) 4.314%/1)` | CSS |
| `--green-new-98-hsl` | `128.182 calc(1*100%) 4.314%` | CSS |
| `--green-new-99` | `hsl(129.474 calc(1*100%) 3.725%/1)` | CSS |
| `--green-new-99-hsl` | `129.474 calc(1*100%) 3.725%` | CSS |
| `--illo-green-10` | `hsl(145.385 calc(1*100%) 94.902%/1)` | CSS |
| `--illo-green-10-hsl` | `145.385 calc(1*100%) 94.902%` | CSS |
| `--illo-green-20` | `hsl(144.407 calc(1*88.06%) 86.863%/1)` | CSS |
| `--illo-green-20-hsl` | `144.407 calc(1*88.06%) 86.863%` | CSS |
| `--illo-green-30` | `hsl(143.67 calc(1*87.2%) 75.49%/1)` | CSS |
| `--illo-green-30-hsl` | `143.67 calc(1*87.2%) 75.49%` | CSS |
| `--illo-green-40` | `hsl(143.804 calc(1*83.636%) 56.863%/1)` | CSS |
| `--illo-green-40-hsl` | `143.804 calc(1*83.636%) 56.863%` | CSS |
| `--illo-green-50` | `hsl(145.714 calc(1*70%) 43.137%/1)` | CSS |
| `--illo-green-50-hsl` | `145.714 calc(1*70%) 43.137%` | CSS |
| `--illo-green-60` | `hsl(149.048 calc(1*79.747%) 30.98%/1)` | CSS |
| `--illo-green-60-hsl` | `149.048 calc(1*79.747%) 30.98%` | CSS |
| `--illo-green-70` | `hsl(152.941 calc(1*100%) 20%/1)` | CSS |
| `--illo-green-70-hsl` | `152.941 calc(1*100%) 20%` | CSS |
| `--opacity-green-1` | `hsl(151.128 calc(1*100%) 26.078%/0.019607843137...` | CSS |
| `--opacity-green-1-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-12` | `hsl(151.128 calc(1*100%) 26.078%/0.121568627450...` | CSS |
| `--opacity-green-12-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-16` | `hsl(151.128 calc(1*100%) 26.078%/0.160784313725...` | CSS |
| `--opacity-green-16-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-20` | `hsl(151.128 calc(1*100%) 26.078%/0.2)` | CSS |
| `--opacity-green-20-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-24` | `hsl(151.128 calc(1*100%) 26.078%/0.239215686274...` | CSS |
| `--opacity-green-24-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-28` | `hsl(151.128 calc(1*100%) 26.078%/0.278431372549...` | CSS |
| `--opacity-green-28-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-32` | `hsl(151.128 calc(1*100%) 26.078%/0.321568627450...` | CSS |
| `--opacity-green-32-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-36` | `hsl(151.128 calc(1*100%) 26.078%/0.360784313725...` | CSS |
| `--opacity-green-36-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-4` | `hsl(151.128 calc(1*100%) 26.078%/0.039215686274...` | CSS |
| `--opacity-green-4-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-40` | `hsl(151.128 calc(1*100%) 26.078%/0.4)` | CSS |
| `--opacity-green-40-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-44` | `hsl(151.128 calc(1*100%) 26.078%/0.439215686274...` | CSS |
| `--opacity-green-44-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-48` | `hsl(151.128 calc(1*100%) 26.078%/0.478431372549...` | CSS |
| `--opacity-green-48-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-52` | `hsl(151.128 calc(1*100%) 26.078%/0.521568627450...` | CSS |
| `--opacity-green-52-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-56` | `hsl(151.128 calc(1*100%) 26.078%/0.560784313725...` | CSS |
| `--opacity-green-56-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-60` | `hsl(151.128 calc(1*100%) 26.078%/0.6)` | CSS |
| `--opacity-green-60-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-64` | `hsl(151.128 calc(1*100%) 26.078%/0.639215686274...` | CSS |
| `--opacity-green-64-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-68` | `hsl(151.128 calc(1*100%) 26.078%/0.678431372549...` | CSS |
| `--opacity-green-68-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-72` | `hsl(151.128 calc(1*100%) 26.078%/0.721568627450...` | CSS |
| `--opacity-green-72-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-76` | `hsl(151.128 calc(1*100%) 26.078%/0.760784313725...` | CSS |
| `--opacity-green-76-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-8` | `hsl(151.128 calc(1*100%) 26.078%/0.078431372549...` | CSS |
| `--opacity-green-8-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-80` | `hsl(151.128 calc(1*100%) 26.078%/0.8)` | CSS |
| `--opacity-green-80-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-84` | `hsl(151.128 calc(1*100%) 26.078%/0.839215686274...` | CSS |
| `--opacity-green-84-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-88` | `hsl(151.128 calc(1*100%) 26.078%/0.878431372549...` | CSS |
| `--opacity-green-88-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-92` | `hsl(151.128 calc(1*100%) 26.078%/0.921568627450...` | CSS |
| `--opacity-green-92-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--opacity-green-96` | `hsl(151.128 calc(1*100%) 26.078%/0.960784313725...` | CSS |
| `--opacity-green-96-hsl` | `151.128 calc(1*100%) 26.078%` | CSS |
| `--role-green-hsl` | `145 calc(1*63.529%) 33.333%` | CSS |
| `--role-light-green-hsl` | `145.443 calc(1*63.2%) 49.02%` | CSS |
| `EXPRESSIVE_GRADIENT_GREEN_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_GREEN_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_NITRO_GREEN_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_NITRO_GREEN_START` | `{}` | JS |
| `GREEN_100` | `#ecfef1` | JS |
| `GREEN_130` | `#defee7` | JS |
| `GREEN_160` | `#bdfcd3` | JS |
| `GREEN_200` | `#88fbb5` | JS |
| `GREEN_230` | `#58f39c` | JS |
| `GREEN_260` | `#48e58b` | JS |
| `GREEN_300` | `#3bd67f` | JS |
| `GREEN_330` | `#2dc771` | JS |
| `GREEN_345` | `#26b968` | JS |
| `GREEN_360` | `#23a55a` | JS |
| `GREEN_400` | `#24934e` | JS |
| `GREEN_430` | `#248045` | JS |
| `GREEN_460` | `#1f703c` | JS |
| `GREEN_500` | `#1a6334` | JS |
| `GREEN_530` | `#15562b` | JS |
| `GREEN_560` | `#124c24` | JS |
| `GREEN_600` | `#0e431f` | JS |
| `GREEN_630` | `#0c3c1c` | JS |
| `GREEN_660` | `#0a3618` | JS |
| `GREEN_700` | `#072f15` | JS |
| `GREEN_730` | `#052910` | JS |
| `GREEN_760` | `#03240e` | JS |
| `GREEN_800` | `#031f0c` | JS |
| `GREEN_830` | `#031b0a` | JS |
| `GREEN_860` | `#041708` | JS |
| `GREEN_900` | `#051307` | JS |
| `GREEN_NEW_1` | `#c8ffd8` | JS |
| `GREEN_NEW_10` | `#a8eaba` | JS |
| `GREEN_NEW_100` | `#001002` | JS |
| `GREEN_NEW_11` | `#a4e8b6` | JS |
| `GREEN_NEW_12` | `#a0e5b3` | JS |
| `GREEN_NEW_13` | `#9de2b0` | JS |
| `GREEN_NEW_14` | `#99e0ad` | JS |
| `GREEN_NEW_15` | `#96dda9` | JS |
| `GREEN_NEW_16` | `#92dba6` | JS |
| `GREEN_NEW_17` | `#8fd8a3` | JS |
| `GREEN_NEW_18` | `#8bd6a0` | JS |
| `GREEN_NEW_19` | `#88d39d` | JS |
| `GREEN_NEW_2` | `#c5ffd5` | JS |
| `GREEN_NEW_20` | `#84d09a` | JS |
| `GREEN_NEW_21` | `#81ce97` | JS |
| `GREEN_NEW_22` | `#7ecb94` | JS |
| `GREEN_NEW_23` | `#7ac991` | JS |
| `GREEN_NEW_24` | `#77c68e` | JS |
| `GREEN_NEW_25` | `#73c48b` | JS |
| `GREEN_NEW_26` | `#70c188` | JS |
| `GREEN_NEW_27` | `#6cbf85` | JS |
| `GREEN_NEW_28` | `#69bc82` | JS |
| `GREEN_NEW_29` | `#65ba7f` | JS |
| `GREEN_NEW_3` | `#c1fcd1` | JS |
| `GREEN_NEW_30` | `#62b77c` | JS |
| `GREEN_NEW_31` | `#5eb479` | JS |
| `GREEN_NEW_32` | `#5bb277` | JS |
| `GREEN_NEW_33` | `#57af74` | JS |
| `GREEN_NEW_34` | `#53ad71` | JS |
| `GREEN_NEW_35` | `#50aa6e` | JS |
| `GREEN_NEW_36` | `#4ca86b` | JS |
| `GREEN_NEW_37` | `#48a568` | JS |
| `GREEN_NEW_38` | `#45a366` | JS |
| `GREEN_NEW_39` | `#41a063` | JS |
| `GREEN_NEW_4` | `#bdf9ce` | JS |
| `GREEN_NEW_40` | `#3d9e60` | JS |
| `GREEN_NEW_41` | `#399b5d` | JS |
| `GREEN_NEW_42` | `#34995b` | JS |
| `GREEN_NEW_43` | `#309658` | JS |
| `GREEN_NEW_44` | `#2b9455` | JS |
| `GREEN_NEW_45` | `#269153` | JS |
| `GREEN_NEW_46` | `#218f50` | JS |
| `GREEN_NEW_47` | `#1b8d4d` | JS |
| `GREEN_NEW_48` | `#138a4a` | JS |
| `GREEN_NEW_49` | `#098848` | JS |
| `GREEN_NEW_5` | `#baf7ca` | JS |
| `GREEN_NEW_50` | `#008545` | JS |
| `GREEN_NEW_51` | `#008344` | JS |
| `GREEN_NEW_52` | `#008043` | JS |
| `GREEN_NEW_53` | `#017d41` | JS |
| `GREEN_NEW_54` | `#017b40` | JS |
| `GREEN_NEW_55` | `#01783e` | JS |
| `GREEN_NEW_56` | `#01763d` | JS |
| `GREEN_NEW_57` | `#01733c` | JS |
| `GREEN_NEW_58` | `#01713a` | JS |
| `GREEN_NEW_59` | `#016e39` | JS |
| `GREEN_NEW_6` | `#b6f4c7` | JS |
| `GREEN_NEW_60` | `#006c37` | JS |
| `GREEN_NEW_61` | `#006936` | JS |
| `GREEN_NEW_62` | `#006734` | JS |
| `GREEN_NEW_63` | `#006433` | JS |
| `GREEN_NEW_64` | `#006231` | JS |
| `GREEN_NEW_65` | `#005f30` | JS |
| `GREEN_NEW_66` | `#005d2e` | JS |
| `GREEN_NEW_67` | `#005b2d` | JS |
| `GREEN_NEW_68` | `#00582b` | JS |
| `GREEN_NEW_69` | `#00562a` | JS |
| `GREEN_NEW_7` | `#b2f2c3` | JS |
| `GREEN_NEW_70` | `#005428` | JS |
| `GREEN_NEW_71` | `#005127` | JS |
| `GREEN_NEW_72` | `#004f25` | JS |
| `GREEN_NEW_73` | `#004d24` | JS |
| `GREEN_NEW_74` | `#004a22` | JS |
| `GREEN_NEW_75` | `#004821` | JS |
| `GREEN_NEW_76` | `#00461f` | JS |
| `GREEN_NEW_77` | `#00431e` | JS |
| `GREEN_NEW_78` | `#00411c` | JS |
| `GREEN_NEW_79` | `#003f1b` | JS |
| `GREEN_NEW_8` | `#afefc0` | JS |
| `GREEN_NEW_80` | `#003d19` | JS |
| `GREEN_NEW_81` | `#003b18` | JS |
| `GREEN_NEW_82` | `#003816` | JS |
| `GREEN_NEW_83` | `#003615` | JS |
| `GREEN_NEW_84` | `#003414` | JS |
| `GREEN_NEW_85` | `#003212` | JS |
| `GREEN_NEW_86` | `#003011` | JS |
| `GREEN_NEW_87` | `#002e0f` | JS |
| `GREEN_NEW_88` | `#002b0e` | JS |
| `GREEN_NEW_89` | `#00290d` | JS |
| `GREEN_NEW_9` | `#abedbd` | JS |
| `GREEN_NEW_90` | `#00270c` | JS |
| `GREEN_NEW_91` | `#00250a` | JS |
| `GREEN_NEW_92` | `#002309` | JS |
| `GREEN_NEW_93` | `#002108` | JS |
| `GREEN_NEW_94` | `#001f07` | JS |
| `GREEN_NEW_95` | `#001d06` | JS |
| `GREEN_NEW_96` | `#001b05` | JS |
| `GREEN_NEW_97` | `#001904` | JS |
| `GREEN_NEW_98` | `#001603` | JS |
| `GREEN_NEW_99` | `#001303` | JS |
| `ILLO_GREEN_10` | `#e5fff0` | JS |
| `ILLO_GREEN_20` | `#c0fbd8` | JS |
| `ILLO_GREEN_30` | `#8af7b5` | JS |
| `ILLO_GREEN_40` | `#35ed7e` | JS |
| `ILLO_GREEN_50` | `#21bb63` | JS |
| `ILLO_GREEN_60` | `#108e4d` | JS |
| `ILLO_GREEN_70` | `#006638` | JS |
| `OPACITY_GREEN_1` | `#00854505` | JS |
| `OPACITY_GREEN_12` | `#0085451f` | JS |
| `OPACITY_GREEN_16` | `#00854529` | JS |
| `OPACITY_GREEN_20` | `#00854533` | JS |
| `OPACITY_GREEN_24` | `#0085453d` | JS |
| `OPACITY_GREEN_28` | `#00854547` | JS |
| `OPACITY_GREEN_32` | `#00854552` | JS |
| `OPACITY_GREEN_36` | `#0085455c` | JS |
| `OPACITY_GREEN_4` | `#0085450a` | JS |
| `OPACITY_GREEN_40` | `#00854566` | JS |
| `OPACITY_GREEN_44` | `#00854570` | JS |
| `OPACITY_GREEN_48` | `#0085457a` | JS |
| `OPACITY_GREEN_52` | `#00854585` | JS |
| `OPACITY_GREEN_56` | `#0085458f` | JS |
| `OPACITY_GREEN_60` | `#00854599` | JS |
| `OPACITY_GREEN_64` | `#008545a3` | JS |
| `OPACITY_GREEN_68` | `#008545ad` | JS |
| `OPACITY_GREEN_72` | `#008545b8` | JS |
| `OPACITY_GREEN_76` | `#008545c2` | JS |
| `OPACITY_GREEN_8` | `#00854514` | JS |
| `OPACITY_GREEN_80` | `#008545cc` | JS |
| `OPACITY_GREEN_84` | `#008545d6` | JS |
| `OPACITY_GREEN_88` | `#008545e0` | JS |
| `OPACITY_GREEN_92` | `#008545eb` | JS |
| `OPACITY_GREEN_96` | `#008545f5` | JS |

*Total: 487 variables*

---

## Colors - Red

| Variable | Value | Type |
|----------|-------|------|
| `--chip-red-dark-text` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--chip-red-light-text` | `hsl(351.6 calc(1*100%) 9.804%/1)` | CSS |
| `--chip-red-medium-text` | `hsl(354 calc(1*100%) 3.922%/1)` | CSS |
| `--custom-discover-featured-guilds-section-card-height` | `320px` | CSS |
| `--custom-discover-featured-guilds-section-gutter-size` | `16px` | CSS |
| `--custom-discover-featured-guilds-section-min-card-width` | `248px` | CSS |
| `--custom-featured-items-popout-featured-items-popout-footer-height` | `120px` | CSS |
| `--custom-forum-post-grid-view-obscured-blur-radius` | `20px` | CSS |
| `--custom-forum-post-obscured-blur-radius` | `20px` | CSS |
| `--custom-gif-picker-search-results-desired-item-width` | `160px` | CSS |
| `--custom-guild-settings-roles-edit-shared-sidebar-width` | `232px` | CSS |
| `--custom-home-resource-channels-obscured-blur-radius` | `20px` | CSS |
| `--opacity-red-1` | `hsl(355.636 calc(1*64.706%) 50%/0.0196078431372...` | CSS |
| `--opacity-red-1-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-12` | `hsl(355.636 calc(1*64.706%) 50%/0.1215686274509...` | CSS |
| `--opacity-red-12-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-16` | `hsl(355.636 calc(1*64.706%) 50%/0.1607843137254...` | CSS |
| `--opacity-red-16-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-20` | `hsl(355.636 calc(1*64.706%) 50%/0.2)` | CSS |
| `--opacity-red-20-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-24` | `hsl(355.636 calc(1*64.706%) 50%/0.2392156862745...` | CSS |
| `--opacity-red-24-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-28` | `hsl(355.636 calc(1*64.706%) 50%/0.2784313725490...` | CSS |
| `--opacity-red-28-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-32` | `hsl(355.636 calc(1*64.706%) 50%/0.3215686274509...` | CSS |
| `--opacity-red-32-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-36` | `hsl(355.636 calc(1*64.706%) 50%/0.3607843137254...` | CSS |
| `--opacity-red-36-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-4` | `hsl(355.636 calc(1*64.706%) 50%/0.0392156862745...` | CSS |
| `--opacity-red-4-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-40` | `hsl(355.636 calc(1*64.706%) 50%/0.4)` | CSS |
| `--opacity-red-40-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-44` | `hsl(355.636 calc(1*64.706%) 50%/0.4392156862745...` | CSS |
| `--opacity-red-44-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-48` | `hsl(355.636 calc(1*64.706%) 50%/0.4784313725490...` | CSS |
| `--opacity-red-48-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-52` | `hsl(355.636 calc(1*64.706%) 50%/0.5215686274509...` | CSS |
| `--opacity-red-52-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-56` | `hsl(355.636 calc(1*64.706%) 50%/0.5607843137254...` | CSS |
| `--opacity-red-56-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-60` | `hsl(355.636 calc(1*64.706%) 50%/0.6)` | CSS |
| `--opacity-red-60-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-64` | `hsl(355.636 calc(1*64.706%) 50%/0.6392156862745...` | CSS |
| `--opacity-red-64-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-68` | `hsl(355.636 calc(1*64.706%) 50%/0.6784313725490...` | CSS |
| `--opacity-red-68-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-72` | `hsl(355.636 calc(1*64.706%) 50%/0.7215686274509...` | CSS |
| `--opacity-red-72-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-76` | `hsl(355.636 calc(1*64.706%) 50%/0.7607843137254...` | CSS |
| `--opacity-red-76-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-8` | `hsl(355.636 calc(1*64.706%) 50%/0.0784313725490...` | CSS |
| `--opacity-red-8-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-80` | `hsl(355.636 calc(1*64.706%) 50%/0.8)` | CSS |
| `--opacity-red-80-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-84` | `hsl(355.636 calc(1*64.706%) 50%/0.8392156862745...` | CSS |
| `--opacity-red-84-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-88` | `hsl(355.636 calc(1*64.706%) 50%/0.8784313725490...` | CSS |
| `--opacity-red-88-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-92` | `hsl(355.636 calc(1*64.706%) 50%/0.9215686274509...` | CSS |
| `--opacity-red-92-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--opacity-red-96` | `hsl(355.636 calc(1*64.706%) 50%/0.9607843137254...` | CSS |
| `--opacity-red-96-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--red-100` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--red-100-hsl` | `1.765 calc(1*100%) 93.333%` | CSS |
| `--red-130` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--red-130-hsl` | `1.765 calc(1*100%) 93.333%` | CSS |
| `--red-160` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--red-160-hsl` | `1.765 calc(1*100%) 93.333%` | CSS |
| `--red-200` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--red-200-hsl` | `1.765 calc(1*100%) 93.333%` | CSS |
| `--red-230` | `hsl(2.4 calc(1*100%) 90.196%/1)` | CSS |
| `--red-230-hsl` | `2.4 calc(1*100%) 90.196%` | CSS |
| `--red-260` | `hsl(3.429 calc(1*100%) 86.275%/1)` | CSS |
| `--red-260-hsl` | `3.429 calc(1*100%) 86.275%` | CSS |
| `--red-300` | `hsl(2.609 calc(1*100%) 81.961%/1)` | CSS |
| `--red-300-hsl` | `2.609 calc(1*100%) 81.961%` | CSS |
| `--red-330` | `hsl(2.727 calc(1*100%) 78.431%/1)` | CSS |
| `--red-330-hsl` | `2.727 calc(1*100%) 78.431%` | CSS |
| `--red-345` | `hsl(1.385 calc(1*87.838%) 70.98%/1)` | CSS |
| `--red-345-hsl` | `1.385 calc(1*87.838%) 70.98%` | CSS |
| `--red-360` | `hsl(0.423 calc(1*76.344%) 63.529%/1)` | CSS |
| `--red-360-hsl` | `0.423 calc(1*76.344%) 63.529%` | CSS |
| `--red-400` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--red-400-hsl` | `357.692 calc(1*67.826%) 54.902%` | CSS |
| `--red-430` | `hsl(356.625 calc(1*66.116%) 52.549%/1)` | CSS |
| `--red-430-hsl` | `356.625 calc(1*66.116%) 52.549%` | CSS |
| `--red-460` | `hsl(355.541 calc(1*64.348%) 45.098%/1)` | CSS |
| `--red-460-hsl` | `355.541 calc(1*64.348%) 45.098%` | CSS |
| `--red-500` | `hsl(355.349 calc(1*66.154%) 38.235%/1)` | CSS |
| `--red-500-hsl` | `355.349 calc(1*66.154%) 38.235%` | CSS |
| `--red-530` | `hsl(354.359 calc(1*69.231%) 33.137%/1)` | CSS |
| `--red-530-hsl` | `354.359 calc(1*69.231%) 33.137%` | CSS |
| `--red-560` | `hsl(353.394 calc(1*73.154%) 29.216%/1)` | CSS |
| `--red-560-hsl` | `353.394 calc(1*73.154%) 29.216%` | CSS |
| `--red-600` | `hsl(352.277 calc(1*78.295%) 25.294%/1)` | CSS |
| `--red-600-hsl` | `352.277 calc(1*78.295%) 25.294%` | CSS |
| `--red-630` | `hsl(351.34 calc(1*81.513%) 23.333%/1)` | CSS |
| `--red-630-hsl` | `351.34 calc(1*81.513%) 23.333%` | CSS |
| `--red-660` | `hsl(350 calc(1*90%) 19.608%/1)` | CSS |
| `--red-660-hsl` | `350 calc(1*90%) 19.608%` | CSS |
| `--red-700` | `hsl(349.157 calc(1*95.402%) 17.059%/1)` | CSS |
| `--red-700-hsl` | `349.157 calc(1*95.402%) 17.059%` | CSS |
| `--red-730` | `hsl(349.565 calc(1*100%) 13.529%/1)` | CSS |
| `--red-730-hsl` | `349.565 calc(1*100%) 13.529%` | CSS |
| `--red-760` | `hsl(351 calc(1*100%) 11.765%/1)` | CSS |
| `--red-760-hsl` | `351 calc(1*100%) 11.765%` | CSS |
| `--red-800` | `hsl(351.6 calc(1*100%) 9.804%/1)` | CSS |
| `--red-800-hsl` | `351.6 calc(1*100%) 9.804%` | CSS |
| `--red-830` | `hsl(352 calc(1*100%) 8.824%/1)` | CSS |
| `--red-830-hsl` | `352 calc(1*100%) 8.824%` | CSS |
| `--red-860` | `hsl(353.143 calc(1*100%) 6.863%/1)` | CSS |
| `--red-860-hsl` | `353.143 calc(1*100%) 6.863%` | CSS |
| `--red-900` | `hsl(351.724 calc(1*100%) 5.686%/1)` | CSS |
| `--red-900-hsl` | `351.724 calc(1*100%) 5.686%` | CSS |
| `--red-new-1` | `hsl(1.765 calc(1*100%) 93.333%/1)` | CSS |
| `--red-new-1-hsl` | `1.765 calc(1*100%) 93.333%` | CSS |
| `--red-new-10` | `hsl(3.429 calc(1*100%) 86.275%/1)` | CSS |
| `--red-new-10-hsl` | `3.429 calc(1*100%) 86.275%` | CSS |
| `--red-new-100` | `hsl(354 calc(1*100%) 3.922%/1)` | CSS |
| `--red-new-100-hsl` | `354 calc(1*100%) 3.922%` | CSS |
| `--red-new-11` | `hsl(3.243 calc(1*100%) 85.49%/1)` | CSS |
| `--red-new-11-hsl` | `3.243 calc(1*100%) 85.49%` | CSS |
| `--red-new-12` | `hsl(3.846 calc(1*100%) 84.706%/1)` | CSS |
| `--red-new-12-hsl` | `3.846 calc(1*100%) 84.706%` | CSS |
| `--red-new-13` | `hsl(2.963 calc(1*100%) 84.118%/1)` | CSS |
| `--red-new-13-hsl` | `2.963 calc(1*100%) 84.118%` | CSS |
| `--red-new-14` | `hsl(2.824 calc(1*100%) 83.333%/1)` | CSS |
| `--red-new-14-hsl` | `2.824 calc(1*100%) 83.333%` | CSS |
| `--red-new-15` | `hsl(3.371 calc(1*100%) 82.549%/1)` | CSS |
| `--red-new-15-hsl` | `3.371 calc(1*100%) 82.549%` | CSS |
| `--red-new-16` | `hsl(2.609 calc(1*100%) 81.961%/1)` | CSS |
| `--red-new-16-hsl` | `2.609 calc(1*100%) 81.961%` | CSS |
| `--red-new-17` | `hsl(3.125 calc(1*100%) 81.176%/1)` | CSS |
| `--red-new-17-hsl` | `3.125 calc(1*100%) 81.176%` | CSS |
| `--red-new-18` | `hsl(3 calc(1*100%) 80.392%/1)` | CSS |
| `--red-new-18-hsl` | `3 calc(1*100%) 80.392%` | CSS |
| `--red-new-19` | `hsl(2.913 calc(1*100%) 79.804%/1)` | CSS |
| `--red-new-19-hsl` | `2.913 calc(1*100%) 79.804%` | CSS |
| `--red-new-2` | `hsl(1.579 calc(1*100%) 92.549%/1)` | CSS |
| `--red-new-2-hsl` | `1.579 calc(1*100%) 92.549%` | CSS |
| `--red-new-20` | `hsl(3.364 calc(1*100%) 79.02%/1)` | CSS |
| `--red-new-20-hsl` | `3.364 calc(1*100%) 79.02%` | CSS |
| `--red-new-21` | `hsl(2.727 calc(1*100%) 78.431%/1)` | CSS |
| `--red-new-21-hsl` | `2.727 calc(1*100%) 78.431%` | CSS |
| `--red-new-22` | `hsl(2.655 calc(1*100%) 77.843%/1)` | CSS |
| `--red-new-22-hsl` | `2.655 calc(1*100%) 77.843%` | CSS |
| `--red-new-23` | `hsl(2.586 calc(1*98.305%) 76.863%/1)` | CSS |
| `--red-new-23-hsl` | `2.586 calc(1*98.305%) 76.863%` | CSS |
| `--red-new-24` | `hsl(2.542 calc(1*96.721%) 76.078%/1)` | CSS |
| `--red-new-24-hsl` | `2.542 calc(1*96.721%) 76.078%` | CSS |
| `--red-new-25` | `hsl(2 calc(1*95.238%) 75.294%/1)` | CSS |
| `--red-new-25-hsl` | `2 calc(1*95.238%) 75.294%` | CSS |
| `--red-new-26` | `hsl(2.439 calc(1*93.893%) 74.314%/1)` | CSS |
| `--red-new-26-hsl` | `2.439 calc(1*93.893%) 74.314%` | CSS |
| `--red-new-27` | `hsl(2.4 calc(1*92.593%) 73.529%/1)` | CSS |
| `--red-new-27-hsl` | `2.4 calc(1*92.593%) 73.529%` | CSS |
| `--red-new-28` | `hsl(1.905 calc(1*90%) 72.549%/1)` | CSS |
| `--red-new-28-hsl` | `1.905 calc(1*90%) 72.549%` | CSS |
| `--red-new-29` | `hsl(1.875 calc(1*88.889%) 71.765%/1)` | CSS |
| `--red-new-29-hsl` | `1.875 calc(1*88.889%) 71.765%` | CSS |
| `--red-new-3` | `hsl(1.429 calc(1*100%) 91.765%/1)` | CSS |
| `--red-new-3-hsl` | `1.429 calc(1*100%) 91.765%` | CSS |
| `--red-new-30` | `hsl(1.385 calc(1*87.838%) 70.98%/1)` | CSS |
| `--red-new-30-hsl` | `1.385 calc(1*87.838%) 70.98%` | CSS |
| `--red-new-31` | `hsl(1.818 calc(1*85.714%) 69.804%/1)` | CSS |
| `--red-new-31-hsl` | `1.818 calc(1*85.714%) 69.804%` | CSS |
| `--red-new-32` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--red-new-32-hsl` | `1.343 calc(1*84.81%) 69.02%` | CSS |
| `--red-new-33` | `hsl(1.333 calc(1*82.822%) 68.039%/1)` | CSS |
| `--red-new-33-hsl` | `1.333 calc(1*82.822%) 68.039%` | CSS |
| `--red-new-34` | `hsl(1.314 calc(1*82.036%) 67.255%/1)` | CSS |
| `--red-new-34-hsl` | `1.314 calc(1*82.036%) 67.255%` | CSS |
| `--red-new-35` | `hsl(0.87 calc(1*80.233%) 66.275%/1)` | CSS |
| `--red-new-35-hsl` | `0.87 calc(1*80.233%) 66.275%` | CSS |
| `--red-new-36` | `hsl(0.863 calc(1*78.531%) 65.294%/1)` | CSS |
| `--red-new-36-hsl` | `0.863 calc(1*78.531%) 65.294%` | CSS |
| `--red-new-37` | `hsl(0.426 calc(1*77.901%) 64.51%/1)` | CSS |
| `--red-new-37-hsl` | `0.426 calc(1*77.901%) 64.51%` | CSS |
| `--red-new-38` | `hsl(0.423 calc(1*76.344%) 63.529%/1)` | CSS |
| `--red-new-38-hsl` | `0.423 calc(1*76.344%) 63.529%` | CSS |
| `--red-new-39` | `hsl(0 calc(1*74.869%) 62.549%/1)` | CSS |
| `--red-new-39-hsl` | `0 calc(1*74.869%) 62.549%` | CSS |
| `--red-new-4` | `hsl(2.609 calc(1*100%) 90.98%/1)` | CSS |
| `--red-new-4-hsl` | `2.609 calc(1*100%) 90.98%` | CSS |
| `--red-new-40` | `hsl(359.586 calc(1*73.604%) 61.373%/1)` | CSS |
| `--red-new-40-hsl` | `359.586 calc(1*73.604%) 61.373%` | CSS |
| `--red-new-41` | `hsl(359.592 calc(1*73.134%) 60.588%/1)` | CSS |
| `--red-new-41-hsl` | `359.592 calc(1*73.134%) 60.588%` | CSS |
| `--red-new-42` | `hsl(358.792 calc(1*71.981%) 59.412%/1)` | CSS |
| `--red-new-42-hsl` | `358.792 calc(1*71.981%) 59.412%` | CSS |
| `--red-new-43` | `hsl(358.411 calc(1*70.892%) 58.235%/1)` | CSS |
| `--red-new-43-hsl` | `358.411 calc(1*70.892%) 58.235%` | CSS |
| `--red-new-44` | `hsl(358.421 calc(1*69.725%) 57.255%/1)` | CSS |
| `--red-new-44-hsl` | `358.421 calc(1*69.725%) 57.255%` | CSS |
| `--red-new-45` | `hsl(358.052 calc(1*68.75%) 56.078%/1)` | CSS |
| `--red-new-45-hsl` | `358.052 calc(1*68.75%) 56.078%` | CSS |
| `--red-new-46` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--red-new-46-hsl` | `357.692 calc(1*67.826%) 54.902%` | CSS |
| `--red-new-47` | `hsl(357.342 calc(1*66.949%) 53.725%/1)` | CSS |
| `--red-new-47-hsl` | `357.342 calc(1*66.949%) 53.725%` | CSS |
| `--red-new-48` | `hsl(356.625 calc(1*66.116%) 52.549%/1)` | CSS |
| `--red-new-48-hsl` | `356.625 calc(1*66.116%) 52.549%` | CSS |
| `--red-new-49` | `hsl(355.951 calc(1*65.462%) 51.176%/1)` | CSS |
| `--red-new-49-hsl` | `355.951 calc(1*65.462%) 51.176%` | CSS |
| `--red-new-5` | `hsl(2.4 calc(1*100%) 90.196%/1)` | CSS |
| `--red-new-5-hsl` | `2.4 calc(1*100%) 90.196%` | CSS |
| `--red-new-50` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--red-new-50-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--red-new-51` | `hsl(355.556 calc(1*64.8%) 49.02%/1)` | CSS |
| `--red-new-51-hsl` | `355.556 calc(1*64.8%) 49.02%` | CSS |
| `--red-new-52` | `hsl(355.472 calc(1*64.898%) 48.039%/1)` | CSS |
| `--red-new-52-hsl` | `355.472 calc(1*64.898%) 48.039%` | CSS |
| `--red-new-53` | `hsl(355.355 calc(1*64.854%) 46.863%/1)` | CSS |
| `--red-new-53-hsl` | `355.355 calc(1*64.854%) 46.863%` | CSS |
| `--red-new-54` | `hsl(355.263 calc(1*64.957%) 45.882%/1)` | CSS |
| `--red-new-54-hsl` | `355.263 calc(1*64.957%) 45.882%` | CSS |
| `--red-new-55` | `hsl(355.541 calc(1*64.348%) 45.098%/1)` | CSS |
| `--red-new-55-hsl` | `355.541 calc(1*64.348%) 45.098%` | CSS |
| `--red-new-56` | `hsl(355.068 calc(1*65.179%) 43.922%/1)` | CSS |
| `--red-new-56-hsl` | `355.068 calc(1*65.179%) 43.922%` | CSS |
| `--red-new-57` | `hsl(355.385 calc(1*65.297%) 42.941%/1)` | CSS |
| `--red-new-57-hsl` | `355.385 calc(1*65.297%) 42.941%` | CSS |
| `--red-new-58` | `hsl(355.286 calc(1*65.421%) 41.961%/1)` | CSS |
| `--red-new-58-hsl` | `355.286 calc(1*65.421%) 41.961%` | CSS |
| `--red-new-59` | `hsl(355.182 calc(1*65.55%) 40.98%/1)` | CSS |
| `--red-new-59-hsl` | `355.182 calc(1*65.55%) 40.98%` | CSS |
| `--red-new-6` | `hsl(2.222 calc(1*100%) 89.412%/1)` | CSS |
| `--red-new-6-hsl` | `2.222 calc(1*100%) 89.412%` | CSS |
| `--red-new-60` | `hsl(355.075 calc(1*65.686%) 40%/1)` | CSS |
| `--red-new-60-hsl` | `355.075 calc(1*65.686%) 40%` | CSS |
| `--red-new-61` | `hsl(355 calc(1*66%) 39.216%/1)` | CSS |
| `--red-new-61-hsl` | `355 calc(1*66%) 39.216%` | CSS |
| `--red-new-62` | `hsl(355.349 calc(1*66.154%) 38.235%/1)` | CSS |
| `--red-new-62-hsl` | `355.349 calc(1*66.154%) 38.235%` | CSS |
| `--red-new-63` | `hsl(354.803 calc(1*67.196%) 37.059%/1)` | CSS |
| `--red-new-63-hsl` | `354.803 calc(1*67.196%) 37.059%` | CSS |
| `--red-new-64` | `hsl(354.677 calc(1*67.391%) 36.078%/1)` | CSS |
| `--red-new-64-hsl` | `354.677 calc(1*67.391%) 36.078%` | CSS |
| `--red-new-65` | `hsl(354.59 calc(1*67.778%) 35.294%/1)` | CSS |
| `--red-new-65-hsl` | `354.59 calc(1*67.778%) 35.294%` | CSS |
| `--red-new-66` | `hsl(354.5 calc(1*68.966%) 34.118%/1)` | CSS |
| `--red-new-66-hsl` | `354.5 calc(1*68.966%) 34.118%` | CSS |
| `--red-new-67` | `hsl(354.359 calc(1*69.231%) 33.137%/1)` | CSS |
| `--red-new-67-hsl` | `354.359 calc(1*69.231%) 33.137%` | CSS |
| `--red-new-68` | `hsl(353.793 calc(1*70.732%) 32.157%/1)` | CSS |
| `--red-new-68-hsl` | `353.793 calc(1*70.732%) 32.157%` | CSS |
| `--red-new-69` | `hsl(353.628 calc(1*71.069%) 31.176%/1)` | CSS |
| `--red-new-69-hsl` | `353.628 calc(1*71.069%) 31.176%` | CSS |
| `--red-new-7` | `hsl(3.103 calc(1*100%) 88.627%/1)` | CSS |
| `--red-new-7-hsl` | `3.103 calc(1*100%) 88.627%` | CSS |
| `--red-new-70` | `hsl(354.054 calc(1*71.613%) 30.392%/1)` | CSS |
| `--red-new-70-hsl` | `354.054 calc(1*71.613%) 30.392%` | CSS |
| `--red-new-71` | `hsl(353.394 calc(1*73.154%) 29.216%/1)` | CSS |
| `--red-new-71-hsl` | `353.394 calc(1*73.154%) 29.216%` | CSS |
| `--red-new-72` | `hsl(353.271 calc(1*73.793%) 28.431%/1)` | CSS |
| `--red-new-72-hsl` | `353.271 calc(1*73.793%) 28.431%` | CSS |
| `--red-new-73` | `hsl(352.571 calc(1*75.54%) 27.255%/1)` | CSS |
| `--red-new-73-hsl` | `352.571 calc(1*75.54%) 27.255%` | CSS |
| `--red-new-74` | `hsl(353.01 calc(1*76.296%) 26.471%/1)` | CSS |
| `--red-new-74-hsl` | `353.01 calc(1*76.296%) 26.471%` | CSS |
| `--red-new-75` | `hsl(352.277 calc(1*78.295%) 25.294%/1)` | CSS |
| `--red-new-75-hsl` | `352.277 calc(1*78.295%) 25.294%` | CSS |
| `--red-new-76` | `hsl(351.6 calc(1*80.645%) 24.314%/1)` | CSS |
| `--red-new-76-hsl` | `351.6 calc(1*80.645%) 24.314%` | CSS |
| `--red-new-77` | `hsl(351.34 calc(1*81.513%) 23.333%/1)` | CSS |
| `--red-new-77-hsl` | `351.34 calc(1*81.513%) 23.333%` | CSS |
| `--red-new-78` | `hsl(351.25 calc(1*84.211%) 22.353%/1)` | CSS |
| `--red-new-78-hsl` | `351.25 calc(1*84.211%) 22.353%` | CSS |
| `--red-new-79` | `hsl(351.064 calc(1*85.455%) 21.569%/1)` | CSS |
| `--red-new-79-hsl` | `351.064 calc(1*85.455%) 21.569%` | CSS |
| `--red-new-8` | `hsl(2.903 calc(1*100%) 87.843%/1)` | CSS |
| `--red-new-8-hsl` | `2.903 calc(1*100%) 87.843%` | CSS |
| `--red-new-80` | `hsl(350.217 calc(1*88.462%) 20.392%/1)` | CSS |
| `--red-new-80-hsl` | `350.217 calc(1*88.462%) 20.392%` | CSS |
| `--red-new-81` | `hsl(350 calc(1*90%) 19.608%/1)` | CSS |
| `--red-new-81-hsl` | `350 calc(1*90%) 19.608%` | CSS |
| `--red-new-82` | `hsl(349.773 calc(1*91.667%) 18.824%/1)` | CSS |
| `--red-new-82-hsl` | `349.773 calc(1*91.667%) 18.824%` | CSS |
| `--red-new-83` | `hsl(349.412 calc(1*93.407%) 17.843%/1)` | CSS |
| `--red-new-83-hsl` | `349.412 calc(1*93.407%) 17.843%` | CSS |
| `--red-new-84` | `hsl(349.157 calc(1*95.402%) 17.059%/1)` | CSS |
| `--red-new-84-hsl` | `349.157 calc(1*95.402%) 17.059%` | CSS |
| `--red-new-85` | `hsl(348.889 calc(1*97.59%) 16.275%/1)` | CSS |
| `--red-new-85-hsl` | `348.889 calc(1*97.59%) 16.275%` | CSS |
| `--red-new-86` | `hsl(348.608 calc(1*100%) 15.49%/1)` | CSS |
| `--red-new-86-hsl` | `348.608 calc(1*100%) 15.49%` | CSS |
| `--red-new-87` | `hsl(348.8 calc(1*100%) 14.706%/1)` | CSS |
| `--red-new-87-hsl` | `348.8 calc(1*100%) 14.706%` | CSS |
| `--red-new-88` | `hsl(349.167 calc(1*100%) 14.118%/1)` | CSS |
| `--red-new-88-hsl` | `349.167 calc(1*100%) 14.118%` | CSS |
| `--red-new-89` | `hsl(349.565 calc(1*100%) 13.529%/1)` | CSS |
| `--red-new-89-hsl` | `349.565 calc(1*100%) 13.529%` | CSS |
| `--red-new-9` | `hsl(2.727 calc(1*100%) 87.059%/1)` | CSS |
| `--red-new-9-hsl` | `2.727 calc(1*100%) 87.059%` | CSS |
| `--red-new-90` | `hsl(350 calc(1*100%) 12.941%/1)` | CSS |
| `--red-new-90-hsl` | `350 calc(1*100%) 12.941%` | CSS |
| `--red-new-91` | `hsl(350.476 calc(1*100%) 12.353%/1)` | CSS |
| `--red-new-91-hsl` | `350.476 calc(1*100%) 12.353%` | CSS |
| `--red-new-92` | `hsl(351 calc(1*100%) 11.765%/1)` | CSS |
| `--red-new-92-hsl` | `351 calc(1*100%) 11.765%` | CSS |
| `--red-new-93` | `hsl(351.579 calc(1*100%) 11.176%/1)` | CSS |
| `--red-new-93-hsl` | `351.579 calc(1*100%) 11.176%` | CSS |
| `--red-new-94` | `hsl(352.075 calc(1*100%) 10.392%/1)` | CSS |
| `--red-new-94-hsl` | `352.075 calc(1*100%) 10.392%` | CSS |
| `--red-new-95` | `hsl(351.6 calc(1*100%) 9.804%/1)` | CSS |
| `--red-new-95-hsl` | `351.6 calc(1*100%) 9.804%` | CSS |
| `--red-new-96` | `hsl(352 calc(1*100%) 8.824%/1)` | CSS |
| `--red-new-96-hsl` | `352 calc(1*100%) 8.824%` | CSS |
| `--red-new-97` | `hsl(352.683 calc(1*100%) 8.039%/1)` | CSS |
| `--red-new-97-hsl` | `352.683 calc(1*100%) 8.039%` | CSS |
| `--red-new-98` | `hsl(353.143 calc(1*100%) 6.863%/1)` | CSS |
| `--red-new-98-hsl` | `353.143 calc(1*100%) 6.863%` | CSS |
| `--red-new-99` | `hsl(351.724 calc(1*100%) 5.686%/1)` | CSS |
| `--red-new-99-hsl` | `351.724 calc(1*100%) 5.686%` | CSS |
| `OPACITY_RED_1` | `#d22d3905` | JS |
| `OPACITY_RED_12` | `#d22d391f` | JS |
| `OPACITY_RED_16` | `#d22d3929` | JS |
| `OPACITY_RED_20` | `#d22d3933` | JS |
| `OPACITY_RED_24` | `#d22d393d` | JS |
| `OPACITY_RED_28` | `#d22d3947` | JS |
| `OPACITY_RED_32` | `#d22d3952` | JS |
| `OPACITY_RED_36` | `#d22d395c` | JS |
| `OPACITY_RED_4` | `#d22d390a` | JS |
| `OPACITY_RED_40` | `#d22d3966` | JS |
| `OPACITY_RED_44` | `#d22d3970` | JS |
| `OPACITY_RED_48` | `#d22d397a` | JS |
| `OPACITY_RED_52` | `#d22d3985` | JS |
| `OPACITY_RED_56` | `#d22d398f` | JS |
| `OPACITY_RED_60` | `#d22d3999` | JS |
| `OPACITY_RED_64` | `#d22d39a3` | JS |
| `OPACITY_RED_68` | `#d22d39ad` | JS |
| `OPACITY_RED_72` | `#d22d39b8` | JS |
| `OPACITY_RED_76` | `#d22d39c2` | JS |
| `OPACITY_RED_8` | `#d22d3914` | JS |
| `OPACITY_RED_80` | `#d22d39cc` | JS |
| `OPACITY_RED_84` | `#d22d39d6` | JS |
| `OPACITY_RED_88` | `#d22d39e0` | JS |
| `OPACITY_RED_92` | `#d22d39eb` | JS |
| `OPACITY_RED_96` | `#d22d39f5` | JS |
| `RED_100` | `#fef8f9` | JS |
| `RED_130` | `#fef4f4` | JS |
| `RED_160` | `#feeaea` | JS |
| `RED_200` | `#fdddde` | JS |
| `RED_230` | `#fbcdce` | JS |
| `RED_260` | `#fbbabb` | JS |
| `RED_300` | `#fba6a8` | JS |
| `RED_330` | `#fa9193` | JS |
| `RED_345` | `#fa777b` | JS |
| `RED_360` | `#f85b5f` | JS |
| `RED_400` | `#f23f43` | JS |
| `RED_430` | `#da373c` | JS |
| `RED_460` | `#bb3033` | JS |
| `RED_500` | `#a12829` | JS |
| `RED_530` | `#8f2022` | JS |
| `RED_560` | `#7f1c1e` | JS |
| `RED_600` | `#70181a` | JS |
| `RED_630` | `#651517` | JS |
| `RED_660` | `#5a1314` | JS |
| `RED_700` | `#501012` | JS |
| `RED_730` | `#460e0f` | JS |
| `RED_760` | `#3f0b0c` | JS |
| `RED_800` | `#360a0b` | JS |
| `RED_830` | `#2e090a` | JS |
| `RED_860` | `#280808` | JS |
| `RED_900` | `#220606` | JS |
| `RED_NEW_1` | `#ffdedd` | JS |
| `RED_NEW_10` | `#ffbdb9` | JS |
| `RED_NEW_100` | `#140002` | JS |
| `RED_NEW_11` | `#ffb9b5` | JS |
| `RED_NEW_12` | `#ffb6b1` | JS |
| `RED_NEW_13` | `#ffb2ae` | JS |
| `RED_NEW_14` | `#ffaeaa` | JS |
| `RED_NEW_15` | `#ffaba6` | JS |
| `RED_NEW_16` | `#ffa7a3` | JS |
| `RED_NEW_17` | `#ffa49f` | JS |
| `RED_NEW_18` | `#ffa09b` | JS |
| `RED_NEW_19` | `#ff9d98` | JS |
| `RED_NEW_2` | `#ffdad9` | JS |
| `RED_NEW_20` | `#ff9a94` | JS |
| `RED_NEW_21` | `#ff9691` | JS |
| `RED_NEW_22` | `#ff938e` | JS |
| `RED_NEW_23` | `#fe8f8a` | JS |
| `RED_NEW_24` | `#fd8c87` | JS |
| `RED_NEW_25` | `#fc8884` | JS |
| `RED_NEW_26` | `#fb8580` | JS |
| `RED_NEW_27` | `#fa827d` | JS |
| `RED_NEW_28` | `#f87e7a` | JS |
| `RED_NEW_29` | `#f77b77` | JS |
| `RED_NEW_3` | `#ffd6d5` | JS |
| `RED_NEW_30` | `#f67774` | JS |
| `RED_NEW_31` | `#f47470` | JS |
| `RED_NEW_32` | `#f3706d` | JS |
| `RED_NEW_33` | `#f16d6a` | JS |
| `RED_NEW_34` | `#f06a67` | JS |
| `RED_NEW_35` | `#ee6664` | JS |
| `RED_NEW_36` | `#ec6361` | JS |
| `RED_NEW_37` | `#eb5f5e` | JS |
| `RED_NEW_38` | `#e95c5b` | JS |
| `RED_NEW_39` | `#e75858` | JS |
| `RED_NEW_4` | `#ffd3d1` | JS |
| `RED_NEW_40` | `#e55455` | JS |
| `RED_NEW_41` | `#e45152` | JS |
| `RED_NEW_42` | `#e24d50` | JS |
| `RED_NEW_43` | `#e0494d` | JS |
| `RED_NEW_44` | `#de464a` | JS |
| `RED_NEW_45` | `#dc4247` | JS |
| `RED_NEW_46` | `#da3e44` | JS |
| `RED_NEW_47` | `#d83a41` | JS |
| `RED_NEW_48` | `#d6363f` | JS |
| `RED_NEW_49` | `#d4313c` | JS |
| `RED_NEW_5` | `#ffcfcd` | JS |
| `RED_NEW_50` | `#d22d39` | JS |
| `RED_NEW_51` | `#ce2c38` | JS |
| `RED_NEW_52` | `#ca2b37` | JS |
| `RED_NEW_53` | `#c52a36` | JS |
| `RED_NEW_54` | `#c12935` | JS |
| `RED_NEW_55` | `#bd2934` | JS |
| `RED_NEW_56` | `#b92733` | JS |
| `RED_NEW_57` | `#b52631` | JS |
| `RED_NEW_58` | `#b12530` | JS |
| `RED_NEW_59` | `#ad242f` | JS |
| `RED_NEW_6` | `#ffcbc9` | JS |
| `RED_NEW_60` | `#a9232e` | JS |
| `RED_NEW_61` | `#a6222d` | JS |
| `RED_NEW_62` | `#a2212b` | JS |
| `RED_NEW_63` | `#9e1f2a` | JS |
| `RED_NEW_64` | `#9a1e29` | JS |
| `RED_NEW_65` | `#971d28` | JS |
| `RED_NEW_66` | `#931b26` | JS |
| `RED_NEW_67` | `#8f1a25` | JS |
| `RED_NEW_68` | `#8c1824` | JS |
| `RED_NEW_69` | `#881723` | JS |
| `RED_NEW_7` | `#ffc8c5` | JS |
| `RED_NEW_70` | `#851621` | JS |
| `RED_NEW_71` | `#811420` | JS |
| `RED_NEW_72` | `#7e131f` | JS |
| `RED_NEW_73` | `#7a111e` | JS |
| `RED_NEW_74` | `#77101c` | JS |
| `RED_NEW_75` | `#730e1b` | JS |
| `RED_NEW_76` | `#700c1a` | JS |
| `RED_NEW_77` | `#6c0b19` | JS |
| `RED_NEW_78` | `#690917` | JS |
| `RED_NEW_79` | `#660816` | JS |
| `RED_NEW_8` | `#ffc4c1` | JS |
| `RED_NEW_80` | `#620615` | JS |
| `RED_NEW_81` | `#5f0514` | JS |
| `RED_NEW_82` | `#5c0413` | JS |
| `RED_NEW_83` | `#580312` | JS |
| `RED_NEW_84` | `#550211` | JS |
| `RED_NEW_85` | `#520110` | JS |
| `RED_NEW_86` | `#4f000f` | JS |
| `RED_NEW_87` | `#4b000e` | JS |
| `RED_NEW_88` | `#48000d` | JS |
| `RED_NEW_89` | `#45000c` | JS |
| `RED_NEW_9` | `#ffc0bd` | JS |
| `RED_NEW_90` | `#42000b` | JS |
| `RED_NEW_91` | `#3f000a` | JS |
| `RED_NEW_92` | `#3c0009` | JS |
| `RED_NEW_93` | `#390008` | JS |
| `RED_NEW_94` | `#350007` | JS |
| `RED_NEW_95` | `#320007` | JS |
| `RED_NEW_96` | `#2d0006` | JS |
| `RED_NEW_97` | `#290005` | JS |
| `RED_NEW_98` | `#230004` | JS |
| `RED_NEW_99` | `#1d0004` | JS |

*Total: 465 variables*

---

## Colors - Yellow

| Variable | Value | Type |
|----------|-------|------|
| `--chip-yellow-dark-text` | `hsl(30 calc(1*100%) 90.588%/1)` | CSS |
| `--chip-yellow-light-text` | `hsl(22.326 calc(1*100%) 16.863%/1)` | CSS |
| `--chip-yellow-medium-text` | `hsl(28.696 calc(1*100%) 22.549%/1)` | CSS |
| `--illo-yellow-10` | `hsl(50 calc(1*100%) 87.059%/1)` | CSS |
| `--illo-yellow-10-hsl` | `50 calc(1*100%) 87.059%` | CSS |
| `--illo-yellow-20` | `hsl(49.714 calc(1*100%) 79.412%/1)` | CSS |
| `--illo-yellow-20-hsl` | `49.714 calc(1*100%) 79.412%` | CSS |
| `--illo-yellow-30` | `hsl(50.069 calc(1*100%) 71.569%/1)` | CSS |
| `--illo-yellow-30-hsl` | `50.069 calc(1*100%) 71.569%` | CSS |
| `--illo-yellow-40` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--illo-yellow-40-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--illo-yellow-50` | `hsl(42.551 calc(1*89.091%) 56.863%/1)` | CSS |
| `--illo-yellow-50-hsl` | `42.551 calc(1*89.091%) 56.863%` | CSS |
| `--illo-yellow-60` | `hsl(35.942 calc(1*81.176%) 50%/1)` | CSS |
| `--illo-yellow-60-hsl` | `35.942 calc(1*81.176%) 50%` | CSS |
| `--illo-yellow-70` | `hsl(30.137 calc(1*100%) 42.941%/1)` | CSS |
| `--illo-yellow-70-hsl` | `30.137 calc(1*100%) 42.941%` | CSS |
| `--opacity-yellow-1` | `hsl(39.435 calc(1*100%) 48.627%/0.0196078431372...` | CSS |
| `--opacity-yellow-1-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-12` | `hsl(39.435 calc(1*100%) 48.627%/0.1215686274509...` | CSS |
| `--opacity-yellow-12-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-16` | `hsl(39.435 calc(1*100%) 48.627%/0.1607843137254...` | CSS |
| `--opacity-yellow-16-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-20` | `hsl(39.435 calc(1*100%) 48.627%/0.2)` | CSS |
| `--opacity-yellow-20-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-24` | `hsl(39.435 calc(1*100%) 48.627%/0.2392156862745...` | CSS |
| `--opacity-yellow-24-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-28` | `hsl(39.435 calc(1*100%) 48.627%/0.2784313725490...` | CSS |
| `--opacity-yellow-28-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-32` | `hsl(39.435 calc(1*100%) 48.627%/0.3215686274509...` | CSS |
| `--opacity-yellow-32-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-36` | `hsl(39.435 calc(1*100%) 48.627%/0.3607843137254...` | CSS |
| `--opacity-yellow-36-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-4` | `hsl(39.435 calc(1*100%) 48.627%/0.0392156862745...` | CSS |
| `--opacity-yellow-4-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-40` | `hsl(39.435 calc(1*100%) 48.627%/0.4)` | CSS |
| `--opacity-yellow-40-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-44` | `hsl(39.435 calc(1*100%) 48.627%/0.4392156862745...` | CSS |
| `--opacity-yellow-44-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-48` | `hsl(39.435 calc(1*100%) 48.627%/0.4784313725490...` | CSS |
| `--opacity-yellow-48-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-52` | `hsl(39.435 calc(1*100%) 48.627%/0.5215686274509...` | CSS |
| `--opacity-yellow-52-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-56` | `hsl(39.435 calc(1*100%) 48.627%/0.5607843137254...` | CSS |
| `--opacity-yellow-56-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-60` | `hsl(39.435 calc(1*100%) 48.627%/0.6)` | CSS |
| `--opacity-yellow-60-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-64` | `hsl(39.435 calc(1*100%) 48.627%/0.6392156862745...` | CSS |
| `--opacity-yellow-64-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-68` | `hsl(39.435 calc(1*100%) 48.627%/0.6784313725490...` | CSS |
| `--opacity-yellow-68-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-72` | `hsl(39.435 calc(1*100%) 48.627%/0.7215686274509...` | CSS |
| `--opacity-yellow-72-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-76` | `hsl(39.435 calc(1*100%) 48.627%/0.7607843137254...` | CSS |
| `--opacity-yellow-76-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-8` | `hsl(39.435 calc(1*100%) 48.627%/0.0784313725490...` | CSS |
| `--opacity-yellow-8-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-80` | `hsl(39.435 calc(1*100%) 48.627%/0.8)` | CSS |
| `--opacity-yellow-80-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-84` | `hsl(39.435 calc(1*100%) 48.627%/0.8392156862745...` | CSS |
| `--opacity-yellow-84-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-88` | `hsl(39.435 calc(1*100%) 48.627%/0.8784313725490...` | CSS |
| `--opacity-yellow-88-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-92` | `hsl(39.435 calc(1*100%) 48.627%/0.9215686274509...` | CSS |
| `--opacity-yellow-92-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--opacity-yellow-96` | `hsl(39.435 calc(1*100%) 48.627%/0.9607843137254...` | CSS |
| `--opacity-yellow-96-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--role-yellow-hsl` | `48.053 calc(1*88.976%) 50.196%` | CSS |
| `--yellow-100` | `hsl(30 calc(1*100%) 90.588%/1)` | CSS |
| `--yellow-100-hsl` | `30 calc(1*100%) 90.588%` | CSS |
| `--yellow-130` | `hsl(30 calc(1*100%) 90.588%/1)` | CSS |
| `--yellow-130-hsl` | `30 calc(1*100%) 90.588%` | CSS |
| `--yellow-160` | `hsl(30 calc(1*100%) 90.588%/1)` | CSS |
| `--yellow-160-hsl` | `30 calc(1*100%) 90.588%` | CSS |
| `--yellow-200` | `hsl(35.676 calc(1*100%) 85.49%/1)` | CSS |
| `--yellow-200-hsl` | `35.676 calc(1*100%) 85.49%` | CSS |
| `--yellow-230` | `hsl(38.276 calc(1*100%) 77.255%/1)` | CSS |
| `--yellow-230-hsl` | `38.276 calc(1*100%) 77.255%` | CSS |
| `--yellow-260` | `hsl(38.785 calc(1*100%) 64.51%/1)` | CSS |
| `--yellow-260-hsl` | `38.785 calc(1*100%) 64.51%` | CSS |
| `--yellow-300` | `hsl(39.505 calc(1*98.058%) 59.608%/1)` | CSS |
| `--yellow-300-hsl` | `39.505 calc(1*98.058%) 59.608%` | CSS |
| `--yellow-330` | `hsl(39.816 calc(1*97.309%) 56.275%/1)` | CSS |
| `--yellow-330-hsl` | `39.816 calc(1*97.309%) 56.275%` | CSS |
| `--yellow-345` | `hsl(38.571 calc(1*100%) 43.922%/1)` | CSS |
| `--yellow-345-hsl` | `38.571 calc(1*100%) 43.922%` | CSS |
| `--yellow-360` | `hsl(37.612 calc(1*100%) 39.412%/1)` | CSS |
| `--yellow-360-hsl` | `37.612 calc(1*100%) 39.412%` | CSS |
| `--yellow-400` | `hsl(36.898 calc(1*100%) 36.667%/1)` | CSS |
| `--yellow-400-hsl` | `36.898 calc(1*100%) 36.667%` | CSS |
| `--yellow-430` | `hsl(35.273 calc(1*100%) 32.353%/1)` | CSS |
| `--yellow-430-hsl` | `35.273 calc(1*100%) 32.353%` | CSS |
| `--yellow-460` | `hsl(33.649 calc(1*100%) 29.02%/1)` | CSS |
| `--yellow-460-hsl` | `33.649 calc(1*100%) 29.02%` | CSS |
| `--yellow-500` | `hsl(31.603 calc(1*100%) 25.686%/1)` | CSS |
| `--yellow-500-hsl` | `31.603 calc(1*100%) 25.686%` | CSS |
| `--yellow-530` | `hsl(29.748 calc(1*100%) 23.333%/1)` | CSS |
| `--yellow-530-hsl` | `29.748 calc(1*100%) 23.333%` | CSS |
| `--yellow-560` | `hsl(27.477 calc(1*100%) 20.98%/1)` | CSS |
| `--yellow-560-hsl` | `27.477 calc(1*100%) 20.98%` | CSS |
| `--yellow-600` | `hsl(25.714 calc(1*100%) 19.216%/1)` | CSS |
| `--yellow-600-hsl` | `25.714 calc(1*100%) 19.216%` | CSS |
| `--yellow-630` | `hsl(24 calc(1*100%) 17.647%/1)` | CSS |
| `--yellow-630-hsl` | `24 calc(1*100%) 17.647%` | CSS |
| `--yellow-660` | `hsl(24 calc(1*100%) 17.647%/1)` | CSS |
| `--yellow-660-hsl` | `24 calc(1*100%) 17.647%` | CSS |
| `--yellow-700` | `hsl(21.22 calc(1*100%) 16.078%/1)` | CSS |
| `--yellow-700-hsl` | `21.22 calc(1*100%) 16.078%` | CSS |
| `--yellow-730` | `hsl(18.4 calc(1*100%) 14.706%/1)` | CSS |
| `--yellow-730-hsl` | `18.4 calc(1*100%) 14.706%` | CSS |
| `--yellow-760` | `hsl(14.328 calc(1*100%) 13.137%/1)` | CSS |
| `--yellow-760-hsl` | `14.328 calc(1*100%) 13.137%` | CSS |
| `--yellow-800` | `hsl(12.381 calc(1*100%) 12.353%/1)` | CSS |
| `--yellow-800-hsl` | `12.381 calc(1*100%) 12.353%` | CSS |
| `--yellow-830` | `hsl(4.706 calc(1*100%) 10%/1)` | CSS |
| `--yellow-830-hsl` | `4.706 calc(1*100%) 10%` | CSS |
| `--yellow-860` | `hsl(0 calc(1*100%) 5.294%/1)` | CSS |
| `--yellow-860-hsl` | `0 calc(1*100%) 5.294%` | CSS |
| `--yellow-900` | `hsl(0 calc(1*100%) 5.294%/1)` | CSS |
| `--yellow-900-hsl` | `0 calc(1*100%) 5.294%` | CSS |
| `--yellow-new-1` | `hsl(30 calc(1*100%) 90.588%/1)` | CSS |
| `--yellow-new-1-hsl` | `30 calc(1*100%) 90.588%` | CSS |
| `--yellow-new-10` | `hsl(37.66 calc(1*100%) 81.569%/1)` | CSS |
| `--yellow-new-10-hsl` | `37.66 calc(1*100%) 81.569%` | CSS |
| `--yellow-new-100` | `hsl(0 calc(1*100%) 5.294%/1)` | CSS |
| `--yellow-new-100-hsl` | `0 calc(1*100%) 5.294%` | CSS |
| `--yellow-new-11` | `hsl(37.347 calc(1*100%) 80.784%/1)` | CSS |
| `--yellow-new-11-hsl` | `37.347 calc(1*100%) 80.784%` | CSS |
| `--yellow-new-12` | `hsl(37.864 calc(1*100%) 79.804%/1)` | CSS |
| `--yellow-new-12-hsl` | `37.864 calc(1*100%) 79.804%` | CSS |
| `--yellow-new-13` | `hsl(38.131 calc(1*100%) 79.02%/1)` | CSS |
| `--yellow-new-13-hsl` | `38.131 calc(1*100%) 79.02%` | CSS |
| `--yellow-new-14` | `hsl(38.036 calc(1*100%) 78.039%/1)` | CSS |
| `--yellow-new-14-hsl` | `38.036 calc(1*100%) 78.039%` | CSS |
| `--yellow-new-15` | `hsl(38.276 calc(1*100%) 77.255%/1)` | CSS |
| `--yellow-new-15-hsl` | `38.276 calc(1*100%) 77.255%` | CSS |
| `--yellow-new-16` | `hsl(38.5 calc(1*100%) 76.471%/1)` | CSS |
| `--yellow-new-16-hsl` | `38.5 calc(1*100%) 76.471%` | CSS |
| `--yellow-new-17` | `hsl(38.4 calc(1*100%) 75.49%/1)` | CSS |
| `--yellow-new-17-hsl` | `38.4 calc(1*100%) 75.49%` | CSS |
| `--yellow-new-18` | `hsl(38.605 calc(1*100%) 74.706%/1)` | CSS |
| `--yellow-new-18-hsl` | `38.605 calc(1*100%) 74.706%` | CSS |
| `--yellow-new-19` | `hsl(38.797 calc(1*100%) 73.922%/1)` | CSS |
| `--yellow-new-19-hsl` | `38.797 calc(1*100%) 73.922%` | CSS |
| `--yellow-new-2` | `hsl(31.698 calc(1*100%) 89.608%/1)` | CSS |
| `--yellow-new-2-hsl` | `31.698 calc(1*100%) 89.608%` | CSS |
| `--yellow-new-20` | `hsl(38.54 calc(1*100%) 73.137%/1)` | CSS |
| `--yellow-new-20-hsl` | `38.54 calc(1*100%) 73.137%` | CSS |
| `--yellow-new-21` | `hsl(38.723 calc(1*100%) 72.353%/1)` | CSS |
| `--yellow-new-21-hsl` | `38.723 calc(1*100%) 72.353%` | CSS |
| `--yellow-new-22` | `hsl(38.483 calc(1*100%) 71.569%/1)` | CSS |
| `--yellow-new-22-hsl` | `38.483 calc(1*100%) 71.569%` | CSS |
| `--yellow-new-23` | `hsl(38.658 calc(1*100%) 70.784%/1)` | CSS |
| `--yellow-new-23-hsl` | `38.658 calc(1*100%) 70.784%` | CSS |
| `--yellow-new-24` | `hsl(38.824 calc(1*100%) 70%/1)` | CSS |
| `--yellow-new-24-hsl` | `38.824 calc(1*100%) 70%` | CSS |
| `--yellow-new-25` | `hsl(38.599 calc(1*100%) 69.216%/1)` | CSS |
| `--yellow-new-25-hsl` | `38.599 calc(1*100%) 69.216%` | CSS |
| `--yellow-new-26` | `hsl(38.758 calc(1*100%) 68.431%/1)` | CSS |
| `--yellow-new-26-hsl` | `38.758 calc(1*100%) 68.431%` | CSS |
| `--yellow-new-27` | `hsl(38.545 calc(1*100%) 67.647%/1)` | CSS |
| `--yellow-new-27-hsl` | `38.545 calc(1*100%) 67.647%` | CSS |
| `--yellow-new-28` | `hsl(38.698 calc(1*100%) 66.863%/1)` | CSS |
| `--yellow-new-28-hsl` | `38.698 calc(1*100%) 66.863%` | CSS |
| `--yellow-new-29` | `hsl(38.844 calc(1*100%) 66.078%/1)` | CSS |
| `--yellow-new-29-hsl` | `38.844 calc(1*100%) 66.078%` | CSS |
| `--yellow-new-3` | `hsl(33.559 calc(1*100%) 88.431%/1)` | CSS |
| `--yellow-new-3-hsl` | `33.559 calc(1*100%) 88.431%` | CSS |
| `--yellow-new-30` | `hsl(38.644 calc(1*100%) 65.294%/1)` | CSS |
| `--yellow-new-30-hsl` | `38.644 calc(1*100%) 65.294%` | CSS |
| `--yellow-new-31` | `hsl(38.785 calc(1*100%) 64.51%/1)` | CSS |
| `--yellow-new-31-hsl` | `38.785 calc(1*100%) 64.51%` | CSS |
| `--yellow-new-32` | `hsl(38.919 calc(1*98.93%) 63.333%/1)` | CSS |
| `--yellow-new-32-hsl` | `38.919 calc(1*98.93%) 63.333%` | CSS |
| `--yellow-new-33` | `hsl(39.048 calc(1*98.953%) 62.549%/1)` | CSS |
| `--yellow-new-33-hsl` | `39.048 calc(1*98.953%) 62.549%` | CSS |
| `--yellow-new-34` | `hsl(38.86 calc(1*98.974%) 61.765%/1)` | CSS |
| `--yellow-new-34-hsl` | `38.86 calc(1*98.974%) 61.765%` | CSS |
| `--yellow-new-35` | `hsl(39.289 calc(1*98.01%) 60.588%/1)` | CSS |
| `--yellow-new-35-hsl` | `39.289 calc(1*98.01%) 60.588%` | CSS |
| `--yellow-new-36` | `hsl(39.505 calc(1*98.058%) 59.608%/1)` | CSS |
| `--yellow-new-36-hsl` | `39.505 calc(1*98.058%) 59.608%` | CSS |
| `--yellow-new-37` | `hsl(39.42 calc(1*98.104%) 58.627%/1)` | CSS |
| `--yellow-new-37-hsl` | `39.42 calc(1*98.104%) 58.627%` | CSS |
| `--yellow-new-38` | `hsl(39.81 calc(1*97.235%) 57.451%/1)` | CSS |
| `--yellow-new-38-hsl` | `39.81 calc(1*97.235%) 57.451%` | CSS |
| `--yellow-new-39` | `hsl(39.816 calc(1*97.309%) 56.275%/1)` | CSS |
| `--yellow-new-39-hsl` | `39.816 calc(1*97.309%) 56.275%` | CSS |
| `--yellow-new-4` | `hsl(34.688 calc(1*100%) 87.451%/1)` | CSS |
| `--yellow-new-4-hsl` | `34.688 calc(1*100%) 87.451%` | CSS |
| `--yellow-new-40` | `hsl(40.179 calc(1*97.391%) 54.902%/1)` | CSS |
| `--yellow-new-40-hsl` | `40.179 calc(1*97.391%) 54.902%` | CSS |
| `--yellow-new-41` | `hsl(40.345 calc(1*97.479%) 53.333%/1)` | CSS |
| `--yellow-new-41-hsl` | `40.345 calc(1*97.479%) 53.333%` | CSS |
| `--yellow-new-42` | `hsl(41.311 calc(1*96.825%) 50.588%/1)` | CSS |
| `--yellow-new-42-hsl` | `41.311 calc(1*96.825%) 50.588%` | CSS |
| `--yellow-new-43` | `hsl(41.355 calc(1*100%) 49.216%/1)` | CSS |
| `--yellow-new-43-hsl` | `41.355 calc(1*100%) 49.216%` | CSS |
| `--yellow-new-44` | `hsl(41.116 calc(1*100%) 49.216%/1)` | CSS |
| `--yellow-new-44-hsl` | `41.116 calc(1*100%) 49.216%` | CSS |
| `--yellow-new-45` | `hsl(40.8 calc(1*100%) 49.02%/1)` | CSS |
| `--yellow-new-45-hsl` | `40.8 calc(1*100%) 49.02%` | CSS |
| `--yellow-new-46` | `hsl(40.56 calc(1*100%) 49.02%/1)` | CSS |
| `--yellow-new-46-hsl` | `40.56 calc(1*100%) 49.02%` | CSS |
| `--yellow-new-47` | `hsl(40.241 calc(1*100%) 48.824%/1)` | CSS |
| `--yellow-new-47-hsl` | `40.241 calc(1*100%) 48.824%` | CSS |
| `--yellow-new-48` | `hsl(40 calc(1*100%) 48.824%/1)` | CSS |
| `--yellow-new-48-hsl` | `40 calc(1*100%) 48.824%` | CSS |
| `--yellow-new-49` | `hsl(39.518 calc(1*100%) 48.824%/1)` | CSS |
| `--yellow-new-49-hsl` | `39.518 calc(1*100%) 48.824%` | CSS |
| `--yellow-new-5` | `hsl(34.783 calc(1*100%) 86.471%/1)` | CSS |
| `--yellow-new-5-hsl` | `34.783 calc(1*100%) 86.471%` | CSS |
| `--yellow-new-50` | `hsl(39.435 calc(1*100%) 48.627%/1)` | CSS |
| `--yellow-new-50-hsl` | `39.435 calc(1*100%) 48.627%` | CSS |
| `--yellow-new-51` | `hsl(39.098 calc(1*100%) 47.843%/1)` | CSS |
| `--yellow-new-51-hsl` | `39.098 calc(1*100%) 47.843%` | CSS |
| `--yellow-new-52` | `hsl(38.912 calc(1*100%) 46.863%/1)` | CSS |
| `--yellow-new-52-hsl` | `38.912 calc(1*100%) 46.863%` | CSS |
| `--yellow-new-53` | `hsl(38.974 calc(1*100%) 45.882%/1)` | CSS |
| `--yellow-new-53-hsl` | `38.974 calc(1*100%) 45.882%` | CSS |
| `--yellow-new-54` | `hsl(38.777 calc(1*100%) 44.902%/1)` | CSS |
| `--yellow-new-54-hsl` | `38.777 calc(1*100%) 44.902%` | CSS |
| `--yellow-new-55` | `hsl(38.571 calc(1*100%) 43.922%/1)` | CSS |
| `--yellow-new-55-hsl` | `38.571 calc(1*100%) 43.922%` | CSS |
| `--yellow-new-56` | `hsl(38.455 calc(1*100%) 43.137%/1)` | CSS |
| `--yellow-new-56-hsl` | `38.455 calc(1*100%) 43.137%` | CSS |
| `--yellow-new-57` | `hsl(38.233 calc(1*100%) 42.157%/1)` | CSS |
| `--yellow-new-57-hsl` | `38.233 calc(1*100%) 42.157%` | CSS |
| `--yellow-new-58` | `hsl(38 calc(1*100%) 41.176%/1)` | CSS |
| `--yellow-new-58-hsl` | `38 calc(1*100%) 41.176%` | CSS |
| `--yellow-new-59` | `hsl(37.573 calc(1*100%) 40.392%/1)` | CSS |
| `--yellow-new-59-hsl` | `37.573 calc(1*100%) 40.392%` | CSS |
| `--yellow-new-6` | `hsl(35.676 calc(1*100%) 85.49%/1)` | CSS |
| `--yellow-new-6-hsl` | `35.676 calc(1*100%) 85.49%` | CSS |
| `--yellow-new-60` | `hsl(37.612 calc(1*100%) 39.412%/1)` | CSS |
| `--yellow-new-60-hsl` | `37.612 calc(1*100%) 39.412%` | CSS |
| `--yellow-new-61` | `hsl(37.347 calc(1*100%) 38.431%/1)` | CSS |
| `--yellow-new-61-hsl` | `37.347 calc(1*100%) 38.431%` | CSS |
| `--yellow-new-62` | `hsl(36.875 calc(1*100%) 37.647%/1)` | CSS |
| `--yellow-new-62-hsl` | `36.875 calc(1*100%) 37.647%` | CSS |
| `--yellow-new-63` | `hsl(36.898 calc(1*100%) 36.667%/1)` | CSS |
| `--yellow-new-63-hsl` | `36.898 calc(1*100%) 36.667%` | CSS |
| `--yellow-new-64` | `hsl(36.393 calc(1*100%) 35.882%/1)` | CSS |
| `--yellow-new-64-hsl` | `36.393 calc(1*100%) 35.882%` | CSS |
| `--yellow-new-65` | `hsl(36.201 calc(1*100%) 35.098%/1)` | CSS |
| `--yellow-new-65-hsl` | `36.201 calc(1*100%) 35.098%` | CSS |
| `--yellow-new-66` | `hsl(35.862 calc(1*100%) 34.118%/1)` | CSS |
| `--yellow-new-66-hsl` | `35.862 calc(1*100%) 34.118%` | CSS |
| `--yellow-new-67` | `hsl(35.294 calc(1*100%) 33.333%/1)` | CSS |
| `--yellow-new-67-hsl` | `35.294 calc(1*100%) 33.333%` | CSS |
| `--yellow-new-68` | `hsl(35.273 calc(1*100%) 32.353%/1)` | CSS |
| `--yellow-new-68-hsl` | `35.273 calc(1*100%) 32.353%` | CSS |
| `--yellow-new-69` | `hsl(34.658 calc(1*100%) 31.569%/1)` | CSS |
| `--yellow-new-69-hsl` | `34.658 calc(1*100%) 31.569%` | CSS |
| `--yellow-new-7` | `hsl(36.456 calc(1*100%) 84.51%/1)` | CSS |
| `--yellow-new-7-hsl` | `36.456 calc(1*100%) 84.51%` | CSS |
| `--yellow-new-70` | `hsl(34.395 calc(1*100%) 30.784%/1)` | CSS |
| `--yellow-new-70-hsl` | `34.395 calc(1*100%) 30.784%` | CSS |
| `--yellow-new-71` | `hsl(33.725 calc(1*100%) 30%/1)` | CSS |
| `--yellow-new-71-hsl` | `33.725 calc(1*100%) 30%` | CSS |
| `--yellow-new-72` | `hsl(33.649 calc(1*100%) 29.02%/1)` | CSS |
| `--yellow-new-72-hsl` | `33.649 calc(1*100%) 29.02%` | CSS |
| `--yellow-new-73` | `hsl(32.917 calc(1*100%) 28.235%/1)` | CSS |
| `--yellow-new-73-hsl` | `32.917 calc(1*100%) 28.235%` | CSS |
| `--yellow-new-74` | `hsl(32.571 calc(1*100%) 27.451%/1)` | CSS |
| `--yellow-new-74-hsl` | `32.571 calc(1*100%) 27.451%` | CSS |
| `--yellow-new-75` | `hsl(31.765 calc(1*100%) 26.667%/1)` | CSS |
| `--yellow-new-75-hsl` | `31.765 calc(1*100%) 26.667%` | CSS |
| `--yellow-new-76` | `hsl(31.603 calc(1*100%) 25.686%/1)` | CSS |
| `--yellow-new-76-hsl` | `31.603 calc(1*100%) 25.686%` | CSS |
| `--yellow-new-77` | `hsl(30.709 calc(1*100%) 24.902%/1)` | CSS |
| `--yellow-new-77-hsl` | `30.709 calc(1*100%) 24.902%` | CSS |
| `--yellow-new-78` | `hsl(30.244 calc(1*100%) 24.118%/1)` | CSS |
| `--yellow-new-78-hsl` | `30.244 calc(1*100%) 24.118%` | CSS |
| `--yellow-new-79` | `hsl(29.748 calc(1*100%) 23.333%/1)` | CSS |
| `--yellow-new-79-hsl` | `29.748 calc(1*100%) 23.333%` | CSS |
| `--yellow-new-8` | `hsl(36.429 calc(1*100%) 83.529%/1)` | CSS |
| `--yellow-new-8-hsl` | `36.429 calc(1*100%) 83.529%` | CSS |
| `--yellow-new-80` | `hsl(28.696 calc(1*100%) 22.549%/1)` | CSS |
| `--yellow-new-80-hsl` | `28.696 calc(1*100%) 22.549%` | CSS |
| `--yellow-new-81` | `hsl(28.108 calc(1*100%) 21.765%/1)` | CSS |
| `--yellow-new-81-hsl` | `28.108 calc(1*100%) 21.765%` | CSS |
| `--yellow-new-82` | `hsl(27.477 calc(1*100%) 20.98%/1)` | CSS |
| `--yellow-new-82-hsl` | `27.477 calc(1*100%) 20.98%` | CSS |
| `--yellow-new-83` | `hsl(26.214 calc(1*100%) 20.196%/1)` | CSS |
| `--yellow-new-83-hsl` | `26.214 calc(1*100%) 20.196%` | CSS |
| `--yellow-new-84` | `hsl(25.714 calc(1*100%) 19.216%/1)` | CSS |
| `--yellow-new-84-hsl` | `25.714 calc(1*100%) 19.216%` | CSS |
| `--yellow-new-85` | `hsl(24.894 calc(1*100%) 18.431%/1)` | CSS |
| `--yellow-new-85-hsl` | `24.894 calc(1*100%) 18.431%` | CSS |
| `--yellow-new-86` | `hsl(24 calc(1*100%) 17.647%/1)` | CSS |
| `--yellow-new-86-hsl` | `24 calc(1*100%) 17.647%` | CSS |
| `--yellow-new-87` | `hsl(22.326 calc(1*100%) 16.863%/1)` | CSS |
| `--yellow-new-87-hsl` | `22.326 calc(1*100%) 16.863%` | CSS |
| `--yellow-new-88` | `hsl(21.22 calc(1*100%) 16.078%/1)` | CSS |
| `--yellow-new-88-hsl` | `21.22 calc(1*100%) 16.078%` | CSS |
| `--yellow-new-89` | `hsl(19.747 calc(1*100%) 15.49%/1)` | CSS |
| `--yellow-new-89-hsl` | `19.747 calc(1*100%) 15.49%` | CSS |
| `--yellow-new-9` | `hsl(37.079 calc(1*100%) 82.549%/1)` | CSS |
| `--yellow-new-9-hsl` | `37.079 calc(1*100%) 82.549%` | CSS |
| `--yellow-new-90` | `hsl(18.4 calc(1*100%) 14.706%/1)` | CSS |
| `--yellow-new-90-hsl` | `18.4 calc(1*100%) 14.706%` | CSS |
| `--yellow-new-91` | `hsl(16.056 calc(1*100%) 13.922%/1)` | CSS |
| `--yellow-new-91-hsl` | `16.056 calc(1*100%) 13.922%` | CSS |
| `--yellow-new-92` | `hsl(14.328 calc(1*100%) 13.137%/1)` | CSS |
| `--yellow-new-92-hsl` | `14.328 calc(1*100%) 13.137%` | CSS |
| `--yellow-new-93` | `hsl(12.381 calc(1*100%) 12.353%/1)` | CSS |
| `--yellow-new-93-hsl` | `12.381 calc(1*100%) 12.353%` | CSS |
| `--yellow-new-94` | `hsl(9.153 calc(1*100%) 11.569%/1)` | CSS |
| `--yellow-new-94-hsl` | `9.153 calc(1*100%) 11.569%` | CSS |
| `--yellow-new-95` | `hsl(6.545 calc(1*100%) 10.784%/1)` | CSS |
| `--yellow-new-95-hsl` | `6.545 calc(1*100%) 10.784%` | CSS |
| `--yellow-new-96` | `hsl(4.706 calc(1*100%) 10%/1)` | CSS |
| `--yellow-new-96-hsl` | `4.706 calc(1*100%) 10%` | CSS |
| `--yellow-new-97` | `hsl(1.277 calc(1*100%) 9.216%/1)` | CSS |
| `--yellow-new-97-hsl` | `1.277 calc(1*100%) 9.216%` | CSS |
| `--yellow-new-98` | `hsl(0 calc(1*100%) 8.235%/1)` | CSS |
| `--yellow-new-98-hsl` | `0 calc(1*100%) 8.235%` | CSS |
| `--yellow-new-99` | `hsl(0 calc(1*100%) 7.059%/1)` | CSS |
| `--yellow-new-99-hsl` | `0 calc(1*100%) 7.059%` | CSS |
| `ILLO_YELLOW_10` | `#fff4bd` | JS |
| `ILLO_YELLOW_20` | `#ffed96` | JS |
| `ILLO_YELLOW_30` | `#ffe76e` | JS |
| `ILLO_YELLOW_40` | `#ffe047` | JS |
| `ILLO_YELLOW_50` | `#f3ba2f` | JS |
| `ILLO_YELLOW_60` | `#e79418` | JS |
| `ILLO_YELLOW_70` | `#db6e00` | JS |
| `OPACITY_YELLOW_1` | `#f8a30005` | JS |
| `OPACITY_YELLOW_12` | `#f8a3001f` | JS |
| `OPACITY_YELLOW_16` | `#f8a30029` | JS |
| `OPACITY_YELLOW_20` | `#f8a30033` | JS |
| `OPACITY_YELLOW_24` | `#f8a3003d` | JS |
| `OPACITY_YELLOW_28` | `#f8a30047` | JS |
| `OPACITY_YELLOW_32` | `#f8a30052` | JS |
| `OPACITY_YELLOW_36` | `#f8a3005c` | JS |
| `OPACITY_YELLOW_4` | `#f8a3000a` | JS |
| `OPACITY_YELLOW_40` | `#f8a30066` | JS |
| `OPACITY_YELLOW_44` | `#f8a30070` | JS |
| `OPACITY_YELLOW_48` | `#f8a3007a` | JS |
| `OPACITY_YELLOW_52` | `#f8a30085` | JS |
| `OPACITY_YELLOW_56` | `#f8a3008f` | JS |
| `OPACITY_YELLOW_60` | `#f8a30099` | JS |
| `OPACITY_YELLOW_64` | `#f8a300a3` | JS |
| `OPACITY_YELLOW_68` | `#f8a300ad` | JS |
| `OPACITY_YELLOW_72` | `#f8a300b8` | JS |
| `OPACITY_YELLOW_76` | `#f8a300c2` | JS |
| `OPACITY_YELLOW_8` | `#f8a30014` | JS |
| `OPACITY_YELLOW_80` | `#f8a300cc` | JS |
| `OPACITY_YELLOW_84` | `#f8a300d6` | JS |
| `OPACITY_YELLOW_88` | `#f8a300e0` | JS |
| `OPACITY_YELLOW_92` | `#f8a300eb` | JS |
| `OPACITY_YELLOW_96` | `#f8a300f5` | JS |
| `YELLOW_100` | `#fff8ef` | JS |
| `YELLOW_130` | `#fff4e8` | JS |
| `YELLOW_160` | `#ffebd3` | JS |
| `YELLOW_200` | `#fee0b6` | JS |
| `YELLOW_230` | `#fdd18c` | JS |
| `YELLOW_260` | `#fcc145` | JS |
| `YELLOW_300` | `#f0b232` | JS |
| `YELLOW_330` | `#e1a42a` | JS |
| `YELLOW_345` | `#d49824` | JS |
| `YELLOW_360` | `#bf861c` | JS |
| `YELLOW_400` | `#af7615` | JS |
| `YELLOW_430` | `#9a650d` | JS |
| `YELLOW_460` | `#8a5709` | JS |
| `YELLOW_500` | `#7c4b04` | JS |
| `YELLOW_530` | `#6d4104` | JS |
| `YELLOW_560` | `#613803` | JS |
| `YELLOW_600` | `#543203` | JS |
| `YELLOW_630` | `#4c2d03` | JS |
| `YELLOW_660` | `#432803` | JS |
| `YELLOW_700` | `#3b2303` | JS |
| `YELLOW_730` | `#351e02` | JS |
| `YELLOW_760` | `#2e1a02` | JS |
| `YELLOW_800` | `#271602` | JS |
| `YELLOW_830` | `#221302` | JS |
| `YELLOW_860` | `#1c1002` | JS |
| `YELLOW_900` | `#160e02` | JS |
| `YELLOW_NEW_1` | `#ffe7cf` | JS |
| `YELLOW_NEW_10` | `#ffdca1` | JS |
| `YELLOW_NEW_100` | `#1b0000` | JS |
| `YELLOW_NEW_11` | `#ffda9d` | JS |
| `YELLOW_NEW_12` | `#ffd998` | JS |
| `YELLOW_NEW_13` | `#ffd894` | JS |
| `YELLOW_NEW_14` | `#ffd68f` | JS |
| `YELLOW_NEW_15` | `#ffd58b` | JS |
| `YELLOW_NEW_16` | `#ffd487` | JS |
| `YELLOW_NEW_17` | `#ffd282` | JS |
| `YELLOW_NEW_18` | `#ffd17e` | JS |
| `YELLOW_NEW_19` | `#ffd07a` | JS |
| `YELLOW_NEW_2` | `#ffe6ca` | JS |
| `YELLOW_NEW_20` | `#ffce76` | JS |
| `YELLOW_NEW_21` | `#ffcd72` | JS |
| `YELLOW_NEW_22` | `#ffcb6e` | JS |
| `YELLOW_NEW_23` | `#ffca6a` | JS |
| `YELLOW_NEW_24` | `#ffc966` | JS |
| `YELLOW_NEW_25` | `#ffc762` | JS |
| `YELLOW_NEW_26` | `#ffc65e` | JS |
| `YELLOW_NEW_27` | `#ffc45a` | JS |
| `YELLOW_NEW_28` | `#ffc356` | JS |
| `YELLOW_NEW_29` | `#ffc252` | JS |
| `YELLOW_NEW_3` | `#ffe5c4` | JS |
| `YELLOW_NEW_30` | `#ffc04e` | JS |
| `YELLOW_NEW_31` | `#ffbf4a` | JS |
| `YELLOW_NEW_32` | `#febd45` | JS |
| `YELLOW_NEW_33` | `#febc41` | JS |
| `YELLOW_NEW_34` | `#feba3d` | JS |
| `YELLOW_NEW_35` | `#fdb938` | JS |
| `YELLOW_NEW_36` | `#fdb833` | JS |
| `YELLOW_NEW_37` | `#fdb62e` | JS |
| `YELLOW_NEW_38` | `#fcb529` | JS |
| `YELLOW_NEW_39` | `#fcb323` | JS |
| `YELLOW_NEW_4` | `#ffe4bf` | JS |
| `YELLOW_NEW_40` | `#fcb21c` | JS |
| `YELLOW_NEW_41` | `#fcb014` | JS |
| `YELLOW_NEW_42` | `#fbaf07` | JS |
| `YELLOW_NEW_43` | `#fbad00` | JS |
| `YELLOW_NEW_44` | `#fbac00` | JS |
| `YELLOW_NEW_45` | `#faaa00` | JS |
| `YELLOW_NEW_46` | `#faa900` | JS |
| `YELLOW_NEW_47` | `#f9a700` | JS |
| `YELLOW_NEW_48` | `#f9a600` | JS |
| `YELLOW_NEW_49` | `#f9a400` | JS |
| `YELLOW_NEW_5` | `#ffe2ba` | JS |
| `YELLOW_NEW_50` | `#f8a300` | JS |
| `YELLOW_NEW_51` | `#f49f00` | JS |
| `YELLOW_NEW_52` | `#ef9b00` | JS |
| `YELLOW_NEW_53` | `#ea9800` | JS |
| `YELLOW_NEW_54` | `#e59400` | JS |
| `YELLOW_NEW_55` | `#e09000` | JS |
| `YELLOW_NEW_56` | `#dc8d00` | JS |
| `YELLOW_NEW_57` | `#d78900` | JS |
| `YELLOW_NEW_58` | `#d28500` | JS |
| `YELLOW_NEW_59` | `#ce8100` | JS |
| `YELLOW_NEW_6` | `#ffe1b5` | JS |
| `YELLOW_NEW_60` | `#c97e00` | JS |
| `YELLOW_NEW_61` | `#c47a00` | JS |
| `YELLOW_NEW_62` | `#c07600` | JS |
| `YELLOW_NEW_63` | `#bb7300` | JS |
| `YELLOW_NEW_64` | `#b76f00` | JS |
| `YELLOW_NEW_65` | `#b36c00` | JS |
| `YELLOW_NEW_66` | `#ae6800` | JS |
| `YELLOW_NEW_67` | `#aa6400` | JS |
| `YELLOW_NEW_68` | `#a56100` | JS |
| `YELLOW_NEW_69` | `#a15d00` | JS |
| `YELLOW_NEW_7` | `#ffe0b0` | JS |
| `YELLOW_NEW_70` | `#9d5a00` | JS |
| `YELLOW_NEW_71` | `#995600` | JS |
| `YELLOW_NEW_72` | `#945300` | JS |
| `YELLOW_NEW_73` | `#904f00` | JS |
| `YELLOW_NEW_74` | `#8c4c00` | JS |
| `YELLOW_NEW_75` | `#884800` | JS |
| `YELLOW_NEW_76` | `#834500` | JS |
| `YELLOW_NEW_77` | `#7f4100` | JS |
| `YELLOW_NEW_78` | `#7b3e00` | JS |
| `YELLOW_NEW_79` | `#773b00` | JS |
| `YELLOW_NEW_8` | `#ffdeab` | JS |
| `YELLOW_NEW_80` | `#733700` | JS |
| `YELLOW_NEW_81` | `#6f3400` | JS |
| `YELLOW_NEW_82` | `#6b3100` | JS |
| `YELLOW_NEW_83` | `#672d00` | JS |
| `YELLOW_NEW_84` | `#622a00` | JS |
| `YELLOW_NEW_85` | `#5e2700` | JS |
| `YELLOW_NEW_86` | `#5a2400` | JS |
| `YELLOW_NEW_87` | `#562000` | JS |
| `YELLOW_NEW_88` | `#521d00` | JS |
| `YELLOW_NEW_89` | `#4f1a00` | JS |
| `YELLOW_NEW_9` | `#ffdda6` | JS |
| `YELLOW_NEW_90` | `#4b1700` | JS |
| `YELLOW_NEW_91` | `#471300` | JS |
| `YELLOW_NEW_92` | `#431000` | JS |
| `YELLOW_NEW_93` | `#3f0d00` | JS |
| `YELLOW_NEW_94` | `#3b0900` | JS |
| `YELLOW_NEW_95` | `#370600` | JS |
| `YELLOW_NEW_96` | `#330400` | JS |
| `YELLOW_NEW_97` | `#2f0100` | JS |
| `YELLOW_NEW_98` | `#2a0000` | JS |
| `YELLOW_NEW_99` | `#240000` | JS |

*Total: 478 variables*

---

## Colors - Orange

| Variable | Value | Type |
|----------|-------|------|
| `--chip-orange-dark-text` | `hsl(15.789 calc(1*100%) 92.549%/1)` | CSS |
| `--chip-orange-light-text` | `hsl(2.182 calc(1*100%) 10.784%/1)` | CSS |
| `--chip-orange-medium-text` | `hsl(355 calc(1*100%) 4.706%/1)` | CSS |
| `--illo-orange-10` | `hsl(33.571 calc(1*100%) 83.529%/1)` | CSS |
| `--illo-orange-10-hsl` | `33.571 calc(1*100%) 83.529%` | CSS |
| `--illo-orange-20` | `hsl(28.029 calc(1*100%) 73.137%/1)` | CSS |
| `--illo-orange-20-hsl` | `28.029 calc(1*100%) 73.137%` | CSS |
| `--illo-orange-30` | `hsl(25.532 calc(1*98.947%) 62.745%/1)` | CSS |
| `--illo-orange-30-hsl` | `25.532 calc(1*98.947%) 62.745%` | CSS |
| `--illo-orange-40` | `hsl(24.149 calc(1*99.177%) 52.353%/1)` | CSS |
| `--illo-orange-40-hsl` | `24.149 calc(1*99.177%) 52.353%` | CSS |
| `--illo-orange-50` | `hsl(21.391 calc(1*90.551%) 49.804%/1)` | CSS |
| `--illo-orange-50-hsl` | `21.391 calc(1*90.551%) 49.804%` | CSS |
| `--illo-orange-60` | `hsl(18.356 calc(1*91.632%) 46.863%/1)` | CSS |
| `--illo-orange-60-hsl` | `18.356 calc(1*91.632%) 46.863%` | CSS |
| `--illo-orange-70` | `hsl(15 calc(1*92.035%) 44.314%/1)` | CSS |
| `--illo-orange-70-hsl` | `15 calc(1*92.035%) 44.314%` | CSS |
| `--opacity-orange-1` | `hsl(25.079 calc(1*100%) 37.059%/0.0196078431372...` | CSS |
| `--opacity-orange-1-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-12` | `hsl(25.079 calc(1*100%) 37.059%/0.1215686274509...` | CSS |
| `--opacity-orange-12-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-16` | `hsl(25.079 calc(1*100%) 37.059%/0.1607843137254...` | CSS |
| `--opacity-orange-16-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-20` | `hsl(25.079 calc(1*100%) 37.059%/0.2)` | CSS |
| `--opacity-orange-20-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-24` | `hsl(25.079 calc(1*100%) 37.059%/0.2392156862745...` | CSS |
| `--opacity-orange-24-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-28` | `hsl(25.079 calc(1*100%) 37.059%/0.2784313725490...` | CSS |
| `--opacity-orange-28-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-32` | `hsl(25.079 calc(1*100%) 37.059%/0.3215686274509...` | CSS |
| `--opacity-orange-32-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-36` | `hsl(25.079 calc(1*100%) 37.059%/0.3607843137254...` | CSS |
| `--opacity-orange-36-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-4` | `hsl(25.079 calc(1*100%) 37.059%/0.0392156862745...` | CSS |
| `--opacity-orange-4-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-40` | `hsl(25.079 calc(1*100%) 37.059%/0.4)` | CSS |
| `--opacity-orange-40-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-44` | `hsl(25.079 calc(1*100%) 37.059%/0.4392156862745...` | CSS |
| `--opacity-orange-44-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-48` | `hsl(25.079 calc(1*100%) 37.059%/0.4784313725490...` | CSS |
| `--opacity-orange-48-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-52` | `hsl(25.079 calc(1*100%) 37.059%/0.5215686274509...` | CSS |
| `--opacity-orange-52-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-56` | `hsl(25.079 calc(1*100%) 37.059%/0.5607843137254...` | CSS |
| `--opacity-orange-56-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-60` | `hsl(25.079 calc(1*100%) 37.059%/0.6)` | CSS |
| `--opacity-orange-60-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-64` | `hsl(25.079 calc(1*100%) 37.059%/0.6392156862745...` | CSS |
| `--opacity-orange-64-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-68` | `hsl(25.079 calc(1*100%) 37.059%/0.6784313725490...` | CSS |
| `--opacity-orange-68-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-72` | `hsl(25.079 calc(1*100%) 37.059%/0.7215686274509...` | CSS |
| `--opacity-orange-72-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-76` | `hsl(25.079 calc(1*100%) 37.059%/0.7607843137254...` | CSS |
| `--opacity-orange-76-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-8` | `hsl(25.079 calc(1*100%) 37.059%/0.0784313725490...` | CSS |
| `--opacity-orange-8-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-80` | `hsl(25.079 calc(1*100%) 37.059%/0.8)` | CSS |
| `--opacity-orange-80-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-84` | `hsl(25.079 calc(1*100%) 37.059%/0.8392156862745...` | CSS |
| `--opacity-orange-84-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-88` | `hsl(25.079 calc(1*100%) 37.059%/0.8784313725490...` | CSS |
| `--opacity-orange-88-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-92` | `hsl(25.079 calc(1*100%) 37.059%/0.9215686274509...` | CSS |
| `--opacity-orange-92-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--opacity-orange-96` | `hsl(25.079 calc(1*100%) 37.059%/0.9607843137254...` | CSS |
| `--opacity-orange-96-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--orange-100` | `hsl(15.789 calc(1*100%) 92.549%/1)` | CSS |
| `--orange-100-hsl` | `15.789 calc(1*100%) 92.549%` | CSS |
| `--orange-130` | `hsl(15.789 calc(1*100%) 92.549%/1)` | CSS |
| `--orange-130-hsl` | `15.789 calc(1*100%) 92.549%` | CSS |
| `--orange-160` | `hsl(15.789 calc(1*100%) 92.549%/1)` | CSS |
| `--orange-160-hsl` | `15.789 calc(1*100%) 92.549%` | CSS |
| `--orange-200` | `hsl(17.143 calc(1*100%) 90.392%/1)` | CSS |
| `--orange-200-hsl` | `17.143 calc(1*100%) 90.392%` | CSS |
| `--orange-230` | `hsl(20 calc(1*100%) 85.294%/1)` | CSS |
| `--orange-230-hsl` | `20 calc(1*100%) 85.294%` | CSS |
| `--orange-260` | `hsl(21.429 calc(1*89.091%) 78.431%/1)` | CSS |
| `--orange-260-hsl` | `21.429 calc(1*89.091%) 78.431%` | CSS |
| `--orange-300` | `hsl(22 calc(1*81.081%) 70.98%/1)` | CSS |
| `--orange-300-hsl` | `22 calc(1*81.081%) 70.98%` | CSS |
| `--orange-330` | `hsl(22.128 calc(1*71.574%) 61.373%/1)` | CSS |
| `--orange-330-hsl` | `22.128 calc(1*71.574%) 61.373%` | CSS |
| `--orange-345` | `hsl(22.252 calc(1*67.111%) 55.882%/1)` | CSS |
| `--orange-345-hsl` | `22.252 calc(1*67.111%) 55.882%` | CSS |
| `--orange-360` | `hsl(22.264 calc(1*64.372%) 51.569%/1)` | CSS |
| `--orange-360-hsl` | `22.264 calc(1*64.372%) 51.569%` | CSS |
| `--orange-400` | `hsl(22.683 calc(1*66.667%) 48.235%/1)` | CSS |
| `--orange-400-hsl` | `22.683 calc(1*66.667%) 48.235%` | CSS |
| `--orange-430` | `hsl(22.941 calc(1*74.561%) 44.706%/1)` | CSS |
| `--orange-430-hsl` | `22.941 calc(1*74.561%) 44.706%` | CSS |
| `--orange-460` | `hsl(23.625 calc(1*95.238%) 32.941%/1)` | CSS |
| `--orange-460-hsl` | `23.625 calc(1*95.238%) 32.941%` | CSS |
| `--orange-500` | `hsl(22.917 calc(1*96%) 29.412%/1)` | CSS |
| `--orange-500-hsl` | `22.917 calc(1*96%) 29.412%` | CSS |
| `--orange-530` | `hsl(22.443 calc(1*100%) 25.686%/1)` | CSS |
| `--orange-530-hsl` | `22.443 calc(1*100%) 25.686%` | CSS |
| `--orange-560` | `hsl(20.357 calc(1*100%) 21.961%/1)` | CSS |
| `--orange-560-hsl` | `20.357 calc(1*100%) 21.961%` | CSS |
| `--orange-600` | `hsl(19.245 calc(1*100%) 20.784%/1)` | CSS |
| `--orange-600-hsl` | `19.245 calc(1*100%) 20.784%` | CSS |
| `--orange-630` | `hsl(16.484 calc(1*100%) 17.843%/1)` | CSS |
| `--orange-630-hsl` | `16.484 calc(1*100%) 17.843%` | CSS |
| `--orange-660` | `hsl(15.682 calc(1*100%) 17.255%/1)` | CSS |
| `--orange-660-hsl` | `15.682 calc(1*100%) 17.255%` | CSS |
| `--orange-700` | `hsl(14.824 calc(1*100%) 16.667%/1)` | CSS |
| `--orange-700-hsl` | `14.824 calc(1*100%) 16.667%` | CSS |
| `--orange-730` | `hsl(9.296 calc(1*100%) 13.922%/1)` | CSS |
| `--orange-730-hsl` | `9.296 calc(1*100%) 13.922%` | CSS |
| `--orange-760` | `hsl(7.273 calc(1*100%) 12.941%/1)` | CSS |
| `--orange-760-hsl` | `7.273 calc(1*100%) 12.941%` | CSS |
| `--orange-800` | `hsl(3.158 calc(1*100%) 11.176%/1)` | CSS |
| `--orange-800-hsl` | `3.158 calc(1*100%) 11.176%` | CSS |
| `--orange-830` | `hsl(356.129 calc(1*100%) 6.078%/1)` | CSS |
| `--orange-830-hsl` | `356.129 calc(1*100%) 6.078%` | CSS |
| `--orange-860` | `hsl(356.129 calc(1*100%) 6.078%/1)` | CSS |
| `--orange-860-hsl` | `356.129 calc(1*100%) 6.078%` | CSS |
| `--orange-900` | `hsl(355 calc(1*100%) 4.706%/1)` | CSS |
| `--orange-900-hsl` | `355 calc(1*100%) 4.706%` | CSS |
| `--orange-new-1` | `hsl(15.789 calc(1*100%) 92.549%/1)` | CSS |
| `--orange-new-1-hsl` | `15.789 calc(1*100%) 92.549%` | CSS |
| `--orange-new-10` | `hsl(20.241 calc(1*95.402%) 82.941%/1)` | CSS |
| `--orange-new-10-hsl` | `20.241 calc(1*95.402%) 82.941%` | CSS |
| `--orange-new-100` | `hsl(355 calc(1*100%) 4.706%/1)` | CSS |
| `--orange-new-100-hsl` | `355 calc(1*100%) 4.706%` | CSS |
| `--orange-new-11` | `hsl(20.455 calc(1*95.652%) 81.961%/1)` | CSS |
| `--orange-new-11-hsl` | `20.455 calc(1*95.652%) 81.961%` | CSS |
| `--orange-new-12` | `hsl(20.44 calc(1*93.814%) 80.98%/1)` | CSS |
| `--orange-new-12-hsl` | `20.44 calc(1*93.814%) 80.98%` | CSS |
| `--orange-new-13` | `hsl(21.064 calc(1*90.385%) 79.608%/1)` | CSS |
| `--orange-new-13-hsl` | `21.064 calc(1*90.385%) 79.608%` | CSS |
| `--orange-new-14` | `hsl(21.429 calc(1*89.091%) 78.431%/1)` | CSS |
| `--orange-new-14-hsl` | `21.429 calc(1*89.091%) 78.431%` | CSS |
| `--orange-new-15` | `hsl(21.386 calc(1*87.826%) 77.451%/1)` | CSS |
| `--orange-new-15-hsl` | `21.386 calc(1*87.826%) 77.451%` | CSS |
| `--orange-new-16` | `hsl(21.714 calc(1*86.777%) 76.275%/1)` | CSS |
| `--orange-new-16-hsl` | `21.714 calc(1*86.777%) 76.275%` | CSS |
| `--orange-new-17` | `hsl(21.667 calc(1*85.714%) 75.294%/1)` | CSS |
| `--orange-new-17-hsl` | `21.667 calc(1*85.714%) 75.294%` | CSS |
| `--orange-new-18` | `hsl(21.622 calc(1*84.733%) 74.314%/1)` | CSS |
| `--orange-new-18-hsl` | `21.622 calc(1*84.733%) 74.314%` | CSS |
| `--orange-new-19` | `hsl(22.105 calc(1*82.609%) 72.941%/1)` | CSS |
| `--orange-new-19-hsl` | `22.105 calc(1*82.609%) 72.941%` | CSS |
| `--orange-new-2` | `hsl(17.727 calc(1*100%) 91.373%/1)` | CSS |
| `--orange-new-2-hsl` | `17.727 calc(1*100%) 91.373%` | CSS |
| `--orange-new-20` | `hsl(22.051 calc(1*81.818%) 71.961%/1)` | CSS |
| `--orange-new-20-hsl` | `22.051 calc(1*81.818%) 71.961%` | CSS |
| `--orange-new-21` | `hsl(22 calc(1*81.081%) 70.98%/1)` | CSS |
| `--orange-new-21-hsl` | `22 calc(1*81.081%) 70.98%` | CSS |
| `--orange-new-22` | `hsl(22.131 calc(1*79.221%) 69.804%/1)` | CSS |
| `--orange-new-22-hsl` | `22.131 calc(1*79.221%) 69.804%` | CSS |
| `--orange-new-23` | `hsl(22.08 calc(1*78.616%) 68.824%/1)` | CSS |
| `--orange-new-23-hsl` | `22.08 calc(1*78.616%) 68.824%` | CSS |
| `--orange-new-24` | `hsl(22.205 calc(1*76.97%) 67.647%/1)` | CSS |
| `--orange-new-24-hsl` | `22.205 calc(1*76.97%) 67.647%` | CSS |
| `--orange-new-25` | `hsl(22.154 calc(1*76.471%) 66.667%/1)` | CSS |
| `--orange-new-25-hsl` | `22.154 calc(1*76.471%) 66.667%` | CSS |
| `--orange-new-26` | `hsl(22.273 calc(1*75%) 65.49%/1)` | CSS |
| `--orange-new-26-hsl` | `22.273 calc(1*75%) 65.49%` | CSS |
| `--orange-new-27` | `hsl(22.222 calc(1*74.586%) 64.51%/1)` | CSS |
| `--orange-new-27-hsl` | `22.222 calc(1*74.586%) 64.51%` | CSS |
| `--orange-new-28` | `hsl(22.336 calc(1*73.262%) 63.333%/1)` | CSS |
| `--orange-new-28-hsl` | `22.336 calc(1*73.262%) 63.333%` | CSS |
| `--orange-new-29` | `hsl(22.174 calc(1*71.875%) 62.353%/1)` | CSS |
| `--orange-new-29-hsl` | `22.174 calc(1*71.875%) 62.353%` | CSS |
| `--orange-new-3` | `hsl(17.143 calc(1*100%) 90.392%/1)` | CSS |
| `--orange-new-3-hsl` | `17.143 calc(1*100%) 90.392%` | CSS |
| `--orange-new-30` | `hsl(22.128 calc(1*71.574%) 61.373%/1)` | CSS |
| `--orange-new-30-hsl` | `22.128 calc(1*71.574%) 61.373%` | CSS |
| `--orange-new-31` | `hsl(22.238 calc(1*70.443%) 60.196%/1)` | CSS |
| `--orange-new-31-hsl` | `22.238 calc(1*70.443%) 60.196%` | CSS |
| `--orange-new-32` | `hsl(22.345 calc(1*69.378%) 59.02%/1)` | CSS |
| `--orange-new-32-hsl` | `22.345 calc(1*69.378%) 59.02%` | CSS |
| `--orange-new-33` | `hsl(22.041 calc(1*69.014%) 58.235%/1)` | CSS |
| `--orange-new-33-hsl` | `22.041 calc(1*69.014%) 58.235%` | CSS |
| `--orange-new-34` | `hsl(22.148 calc(1*68.037%) 57.059%/1)` | CSS |
| `--orange-new-34-hsl` | `22.148 calc(1*68.037%) 57.059%` | CSS |
| `--orange-new-35` | `hsl(22.252 calc(1*67.111%) 55.882%/1)` | CSS |
| `--orange-new-35-hsl` | `22.252 calc(1*67.111%) 55.882%` | CSS |
| `--orange-new-36` | `hsl(22.353 calc(1*66.234%) 54.706%/1)` | CSS |
| `--orange-new-36-hsl` | `22.353 calc(1*66.234%) 54.706%` | CSS |
| `--orange-new-37` | `hsl(22.208 calc(1*65.254%) 53.725%/1)` | CSS |
| `--orange-new-37-hsl` | `22.208 calc(1*65.254%) 53.725%` | CSS |
| `--orange-new-38` | `hsl(22.166 calc(1*65.145%) 52.745%/1)` | CSS |
| `--orange-new-38-hsl` | `22.166 calc(1*65.145%) 52.745%` | CSS |
| `--orange-new-39` | `hsl(22.264 calc(1*64.372%) 51.569%/1)` | CSS |
| `--orange-new-39-hsl` | `22.264 calc(1*64.372%) 51.569%` | CSS |
| `--orange-new-4` | `hsl(17.778 calc(1*100%) 89.412%/1)` | CSS |
| `--orange-new-4-hsl` | `17.778 calc(1*100%) 89.412%` | CSS |
| `--orange-new-40` | `hsl(22.125 calc(1*63.492%) 50.588%/1)` | CSS |
| `--orange-new-40-hsl` | `22.125 calc(1*63.492%) 50.588%` | CSS |
| `--orange-new-41` | `hsl(22.222 calc(1*64.286%) 49.412%/1)` | CSS |
| `--orange-new-41-hsl` | `22.222 calc(1*64.286%) 49.412%` | CSS |
| `--orange-new-42` | `hsl(22.683 calc(1*66.667%) 48.235%/1)` | CSS |
| `--orange-new-42-hsl` | `22.683 calc(1*66.667%) 48.235%` | CSS |
| `--orange-new-43` | `hsl(22.771 calc(1*69.167%) 47.059%/1)` | CSS |
| `--orange-new-43-hsl` | `22.771 calc(1*69.167%) 47.059%` | CSS |
| `--orange-new-44` | `hsl(22.857 calc(1*71.795%) 45.882%/1)` | CSS |
| `--orange-new-44-hsl` | `22.857 calc(1*71.795%) 45.882%` | CSS |
| `--orange-new-45` | `hsl(22.941 calc(1*74.561%) 44.706%/1)` | CSS |
| `--orange-new-45-hsl` | `22.941 calc(1*74.561%) 44.706%` | CSS |
| `--orange-new-46` | `hsl(23.237 calc(1*78.281%) 43.333%/1)` | CSS |
| `--orange-new-46-hsl` | `23.237 calc(1*78.281%) 43.333%` | CSS |
| `--orange-new-47` | `hsl(23.523 calc(1*82.243%) 41.961%/1)` | CSS |
| `--orange-new-47-hsl` | `23.523 calc(1*82.243%) 41.961%` | CSS |
| `--orange-new-48` | `hsl(24 calc(1*87.379%) 40.392%/1)` | CSS |
| `--orange-new-48-hsl` | `24 calc(1*87.379%) 40.392%` | CSS |
| `--orange-new-49` | `hsl(24.649 calc(1*93.909%) 38.627%/1)` | CSS |
| `--orange-new-49-hsl` | `24.649 calc(1*93.909%) 38.627%` | CSS |
| `--orange-new-5` | `hsl(19 calc(1*100%) 88.235%/1)` | CSS |
| `--orange-new-5-hsl` | `19 calc(1*100%) 88.235%` | CSS |
| `--orange-new-50` | `hsl(25.079 calc(1*100%) 37.059%/1)` | CSS |
| `--orange-new-50-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--orange-new-51` | `hsl(24.783 calc(1*98.925%) 36.471%/1)` | CSS |
| `--orange-new-51-hsl` | `24.783 calc(1*98.925%) 36.471%` | CSS |
| `--orange-new-52` | `hsl(24.333 calc(1*97.826%) 36.078%/1)` | CSS |
| `--orange-new-52-hsl` | `24.333 calc(1*97.826%) 36.078%` | CSS |
| `--orange-new-53` | `hsl(24.343 calc(1*96.685%) 35.49%/1)` | CSS |
| `--orange-new-53-hsl` | `24.343 calc(1*96.685%) 35.49%` | CSS |
| `--orange-new-54` | `hsl(24.07 calc(1*96.629%) 34.902%/1)` | CSS |
| `--orange-new-54-hsl` | `24.07 calc(1*96.629%) 34.902%` | CSS |
| `--orange-new-55` | `hsl(23.713 calc(1*95.429%) 34.314%/1)` | CSS |
| `--orange-new-55-hsl` | `23.713 calc(1*95.429%) 34.314%` | CSS |
| `--orange-new-56` | `hsl(23.558 calc(1*95.322%) 33.529%/1)` | CSS |
| `--orange-new-56-hsl` | `23.558 calc(1*95.322%) 33.529%` | CSS |
| `--orange-new-57` | `hsl(23.625 calc(1*95.238%) 32.941%/1)` | CSS |
| `--orange-new-57-hsl` | `23.625 calc(1*95.238%) 32.941%` | CSS |
| `--orange-new-58` | `hsl(23.312 calc(1*95.152%) 32.353%/1)` | CSS |
| `--orange-new-58-hsl` | `23.312 calc(1*95.152%) 32.353%` | CSS |
| `--orange-new-59` | `hsl(23.137 calc(1*95.031%) 31.569%/1)` | CSS |
| `--orange-new-59-hsl` | `23.137 calc(1*95.031%) 31.569%` | CSS |
| `--orange-new-6` | `hsl(19.385 calc(1*100%) 87.255%/1)` | CSS |
| `--orange-new-6-hsl` | `19.385 calc(1*100%) 87.255%` | CSS |
| `--orange-new-60` | `hsl(23.046 calc(1*96.178%) 30.784%/1)` | CSS |
| `--orange-new-60-hsl` | `23.046 calc(1*96.178%) 30.784%` | CSS |
| `--orange-new-61` | `hsl(22.857 calc(1*96.078%) 30%/1)` | CSS |
| `--orange-new-61-hsl` | `22.857 calc(1*96.078%) 30%` | CSS |
| `--orange-new-62` | `hsl(22.917 calc(1*96%) 29.412%/1)` | CSS |
| `--orange-new-62-hsl` | `22.917 calc(1*96%) 29.412%` | CSS |
| `--orange-new-63` | `hsl(22.817 calc(1*97.26%) 28.627%/1)` | CSS |
| `--orange-new-63-hsl` | `22.817 calc(1*97.26%) 28.627%` | CSS |
| `--orange-new-64` | `hsl(22.446 calc(1*97.203%) 28.039%/1)` | CSS |
| `--orange-new-64-hsl` | `22.446 calc(1*97.203%) 28.039%` | CSS |
| `--orange-new-65` | `hsl(22.5 calc(1*98.551%) 27.059%/1)` | CSS |
| `--orange-new-65-hsl` | `22.5 calc(1*98.551%) 27.059%` | CSS |
| `--orange-new-66` | `hsl(22.105 calc(1*98.519%) 26.471%/1)` | CSS |
| `--orange-new-66-hsl` | `22.105 calc(1*98.519%) 26.471%` | CSS |
| `--orange-new-67` | `hsl(22.443 calc(1*100%) 25.686%/1)` | CSS |
| `--orange-new-67-hsl` | `22.443 calc(1*100%) 25.686%` | CSS |
| `--orange-new-68` | `hsl(22.031 calc(1*100%) 25.098%/1)` | CSS |
| `--orange-new-68-hsl` | `22.031 calc(1*100%) 25.098%` | CSS |
| `--orange-new-69` | `hsl(21.6 calc(1*100%) 24.51%/1)` | CSS |
| `--orange-new-69-hsl` | `21.6 calc(1*100%) 24.51%` | CSS |
| `--orange-new-7` | `hsl(19.714 calc(1*100%) 86.275%/1)` | CSS |
| `--orange-new-7-hsl` | `19.714 calc(1*100%) 86.275%` | CSS |
| `--orange-new-70` | `hsl(21.322 calc(1*100%) 23.725%/1)` | CSS |
| `--orange-new-70-hsl` | `21.322 calc(1*100%) 23.725%` | CSS |
| `--orange-new-71` | `hsl(20.847 calc(1*100%) 23.137%/1)` | CSS |
| `--orange-new-71-hsl` | `20.847 calc(1*100%) 23.137%` | CSS |
| `--orange-new-72` | `hsl(20.348 calc(1*100%) 22.549%/1)` | CSS |
| `--orange-new-72-hsl` | `20.348 calc(1*100%) 22.549%` | CSS |
| `--orange-new-73` | `hsl(20.357 calc(1*100%) 21.961%/1)` | CSS |
| `--orange-new-73-hsl` | `20.357 calc(1*100%) 21.961%` | CSS |
| `--orange-new-74` | `hsl(19.817 calc(1*100%) 21.373%/1)` | CSS |
| `--orange-new-74-hsl` | `19.817 calc(1*100%) 21.373%` | CSS |
| `--orange-new-75` | `hsl(19.245 calc(1*100%) 20.784%/1)` | CSS |
| `--orange-new-75-hsl` | `19.245 calc(1*100%) 20.784%` | CSS |
| `--orange-new-76` | `hsl(18.641 calc(1*100%) 20.196%/1)` | CSS |
| `--orange-new-76-hsl` | `18.641 calc(1*100%) 20.196%` | CSS |
| `--orange-new-77` | `hsl(18 calc(1*100%) 19.608%/1)` | CSS |
| `--orange-new-77-hsl` | `18 calc(1*100%) 19.608%` | CSS |
| `--orange-new-78` | `hsl(17.32 calc(1*100%) 19.02%/1)` | CSS |
| `--orange-new-78-hsl` | `17.32 calc(1*100%) 19.02%` | CSS |
| `--orange-new-79` | `hsl(16.596 calc(1*100%) 18.431%/1)` | CSS |
| `--orange-new-79-hsl` | `16.596 calc(1*100%) 18.431%` | CSS |
| `--orange-new-8` | `hsl(20 calc(1*100%) 85.294%/1)` | CSS |
| `--orange-new-8-hsl` | `20 calc(1*100%) 85.294%` | CSS |
| `--orange-new-80` | `hsl(16.484 calc(1*100%) 17.843%/1)` | CSS |
| `--orange-new-80-hsl` | `16.484 calc(1*100%) 17.843%` | CSS |
| `--orange-new-81` | `hsl(15.682 calc(1*100%) 17.255%/1)` | CSS |
| `--orange-new-81-hsl` | `15.682 calc(1*100%) 17.255%` | CSS |
| `--orange-new-82` | `hsl(14.824 calc(1*100%) 16.667%/1)` | CSS |
| `--orange-new-82-hsl` | `14.824 calc(1*100%) 16.667%` | CSS |
| `--orange-new-83` | `hsl(13.735 calc(1*100%) 16.275%/1)` | CSS |
| `--orange-new-83-hsl` | `13.735 calc(1*100%) 16.275%` | CSS |
| `--orange-new-84` | `hsl(12.75 calc(1*100%) 15.686%/1)` | CSS |
| `--orange-new-84-hsl` | `12.75 calc(1*100%) 15.686%` | CSS |
| `--orange-new-85` | `hsl(11.688 calc(1*100%) 15.098%/1)` | CSS |
| `--orange-new-85-hsl` | `11.688 calc(1*100%) 15.098%` | CSS |
| `--orange-new-86` | `hsl(10.541 calc(1*100%) 14.51%/1)` | CSS |
| `--orange-new-86-hsl` | `10.541 calc(1*100%) 14.51%` | CSS |
| `--orange-new-87` | `hsl(9.296 calc(1*100%) 13.922%/1)` | CSS |
| `--orange-new-87-hsl` | `9.296 calc(1*100%) 13.922%` | CSS |
| `--orange-new-88` | `hsl(7.941 calc(1*100%) 13.333%/1)` | CSS |
| `--orange-new-88-hsl` | `7.941 calc(1*100%) 13.333%` | CSS |
| `--orange-new-89` | `hsl(7.273 calc(1*100%) 12.941%/1)` | CSS |
| `--orange-new-89-hsl` | `7.273 calc(1*100%) 12.941%` | CSS |
| `--orange-new-9` | `hsl(20.506 calc(1*97.531%) 84.118%/1)` | CSS |
| `--orange-new-9-hsl` | `20.506 calc(1*97.531%) 84.118%` | CSS |
| `--orange-new-90` | `hsl(5.714 calc(1*100%) 12.353%/1)` | CSS |
| `--orange-new-90-hsl` | `5.714 calc(1*100%) 12.353%` | CSS |
| `--orange-new-91` | `hsl(4 calc(1*100%) 11.765%/1)` | CSS |
| `--orange-new-91-hsl` | `4 calc(1*100%) 11.765%` | CSS |
| `--orange-new-92` | `hsl(3.158 calc(1*100%) 11.176%/1)` | CSS |
| `--orange-new-92-hsl` | `3.158 calc(1*100%) 11.176%` | CSS |
| `--orange-new-93` | `hsl(2.182 calc(1*100%) 10.784%/1)` | CSS |
| `--orange-new-93-hsl` | `2.182 calc(1*100%) 10.784%` | CSS |
| `--orange-new-94` | `hsl(1.154 calc(1*100%) 10.196%/1)` | CSS |
| `--orange-new-94-hsl` | `1.154 calc(1*100%) 10.196%` | CSS |
| `--orange-new-95` | `hsl(358.776 calc(1*100%) 9.608%/1)` | CSS |
| `--orange-new-95-hsl` | `358.776 calc(1*100%) 9.608%` | CSS |
| `--orange-new-96` | `hsl(358.667 calc(1*100%) 8.824%/1)` | CSS |
| `--orange-new-96-hsl` | `358.667 calc(1*100%) 8.824%` | CSS |
| `--orange-new-97` | `hsl(358.537 calc(1*100%) 8.039%/1)` | CSS |
| `--orange-new-97-hsl` | `358.537 calc(1*100%) 8.039%` | CSS |
| `--orange-new-98` | `hsl(356.757 calc(1*100%) 7.255%/1)` | CSS |
| `--orange-new-98-hsl` | `356.757 calc(1*100%) 7.255%` | CSS |
| `--orange-new-99` | `hsl(356.129 calc(1*100%) 6.078%/1)` | CSS |
| `--orange-new-99-hsl` | `356.129 calc(1*100%) 6.078%` | CSS |
| `--role-orange-hsl` | `28.163 calc(1*79.675%) 51.765%` | CSS |
| `ILLO_ORANGE_10` | `#ffdaab` | JS |
| `ILLO_ORANGE_20` | `#ffb676` | JS |
| `ILLO_ORANGE_30` | `#fe9242` | JS |
| `ILLO_ORANGE_40` | `#fe6e0d` | JS |
| `ILLO_ORANGE_50` | `#f25e0c` | JS |
| `ILLO_ORANGE_60` | `#e54d0a` | JS |
| `ILLO_ORANGE_70` | `#d93d09` | JS |
| `OPACITY_ORANGE_1` | `#bd4f0005` | JS |
| `OPACITY_ORANGE_12` | `#bd4f001f` | JS |
| `OPACITY_ORANGE_16` | `#bd4f0029` | JS |
| `OPACITY_ORANGE_20` | `#bd4f0033` | JS |
| `OPACITY_ORANGE_24` | `#bd4f003d` | JS |
| `OPACITY_ORANGE_28` | `#bd4f0047` | JS |
| `OPACITY_ORANGE_32` | `#bd4f0052` | JS |
| `OPACITY_ORANGE_36` | `#bd4f005c` | JS |
| `OPACITY_ORANGE_4` | `#bd4f000a` | JS |
| `OPACITY_ORANGE_40` | `#bd4f0066` | JS |
| `OPACITY_ORANGE_44` | `#bd4f0070` | JS |
| `OPACITY_ORANGE_48` | `#bd4f007a` | JS |
| `OPACITY_ORANGE_52` | `#bd4f0085` | JS |
| `OPACITY_ORANGE_56` | `#bd4f008f` | JS |
| `OPACITY_ORANGE_60` | `#bd4f0099` | JS |
| `OPACITY_ORANGE_64` | `#bd4f00a3` | JS |
| `OPACITY_ORANGE_68` | `#bd4f00ad` | JS |
| `OPACITY_ORANGE_72` | `#bd4f00b8` | JS |
| `OPACITY_ORANGE_76` | `#bd4f00c2` | JS |
| `OPACITY_ORANGE_8` | `#bd4f0014` | JS |
| `OPACITY_ORANGE_80` | `#bd4f00cc` | JS |
| `OPACITY_ORANGE_84` | `#bd4f00d6` | JS |
| `OPACITY_ORANGE_88` | `#bd4f00e0` | JS |
| `OPACITY_ORANGE_92` | `#bd4f00eb` | JS |
| `OPACITY_ORANGE_96` | `#bd4f00f5` | JS |
| `ORANGE_100` | `#fff8f5` | JS |
| `ORANGE_130` | `#fff4ed` | JS |
| `ORANGE_160` | `#feeadf` | JS |
| `ORANGE_200` | `#fddecd` | JS |
| `ORANGE_230` | `#fccfb2` | JS |
| `ORANGE_260` | `#fcbd95` | JS |
| `ORANGE_300` | `#fbab70` | JS |
| `ORANGE_330` | `#fa9746` | JS |
| `ORANGE_345` | `#f1882a` | JS |
| `ORANGE_360` | `#db7628` | JS |
| `ORANGE_400` | `#c46926` | JS |
| `ORANGE_430` | `#ac591f` | JS |
| `ORANGE_460` | `#9b4c19` | JS |
| `ORANGE_500` | `#8c4013` | JS |
| `ORANGE_530` | `#7b3710` | JS |
| `ORANGE_560` | `#6d300e` | JS |
| `ORANGE_600` | `#5f2b0b` | JS |
| `ORANGE_630` | `#56260a` | JS |
| `ORANGE_660` | `#4c2209` | JS |
| `ORANGE_700` | `#431e09` | JS |
| `ORANGE_730` | `#3b1a07` | JS |
| `ORANGE_760` | `#331606` | JS |
| `ORANGE_800` | `#2d1305` | JS |
| `ORANGE_830` | `#261005` | JS |
| `ORANGE_860` | `#200e05` | JS |
| `ORANGE_900` | `#190d04` | JS |
| `ORANGE_NEW_1` | `#ffe3d9` | JS |
| `ORANGE_NEW_10` | `#fdc6aa` | JS |
| `ORANGE_NEW_100` | `#180002` | JS |
| `ORANGE_NEW_11` | `#fdc3a5` | JS |
| `ORANGE_NEW_12` | `#fcc0a1` | JS |
| `ORANGE_NEW_13` | `#fabd9c` | JS |
| `ORANGE_NEW_14` | `#f9ba97` | JS |
| `ORANGE_NEW_15` | `#f8b793` | JS |
| `ORANGE_NEW_16` | `#f7b48e` | JS |
| `ORANGE_NEW_17` | `#f6b18a` | JS |
| `ORANGE_NEW_18` | `#f5ae86` | JS |
| `ORANGE_NEW_19` | `#f3ab81` | JS |
| `ORANGE_NEW_2` | `#ffe0d3` | JS |
| `ORANGE_NEW_20` | `#f2a87d` | JS |
| `ORANGE_NEW_21` | `#f1a579` | JS |
| `ORANGE_NEW_22` | `#efa275` | JS |
| `ORANGE_NEW_23` | `#ee9f71` | JS |
| `ORANGE_NEW_24` | `#ec9c6d` | JS |
| `ORANGE_NEW_25` | `#eb9969` | JS |
| `ORANGE_NEW_26` | `#e99665` | JS |
| `ORANGE_NEW_27` | `#e89361` | JS |
| `ORANGE_NEW_28` | `#e6905d` | JS |
| `ORANGE_NEW_29` | `#e48d5a` | JS |
| `ORANGE_NEW_3` | `#ffdcce` | JS |
| `ORANGE_NEW_30` | `#e38a56` | JS |
| `ORANGE_NEW_31` | `#e18752` | JS |
| `ORANGE_NEW_32` | `#df844e` | JS |
| `ORANGE_NEW_33` | `#de814b` | JS |
| `ORANGE_NEW_34` | `#dc7e47` | JS |
| `ORANGE_NEW_35` | `#da7b43` | JS |
| `ORANGE_NEW_36` | `#d8783f` | JS |
| `ORANGE_NEW_37` | `#d6753c` | JS |
| `ORANGE_NEW_38` | `#d57238` | JS |
| `ORANGE_NEW_39` | `#d36f34` | JS |
| `ORANGE_NEW_4` | `#ffd9c9` | JS |
| `ORANGE_NEW_40` | `#d16c31` | JS |
| `ORANGE_NEW_41` | `#cf692d` | JS |
| `ORANGE_NEW_42` | `#cd6729` | JS |
| `ORANGE_NEW_43` | `#cb6425` | JS |
| `ORANGE_NEW_44` | `#c96121` | JS |
| `ORANGE_NEW_45` | `#c75e1d` | JS |
| `ORANGE_NEW_46` | `#c55b18` | JS |
| `ORANGE_NEW_47` | `#c35813` | JS |
| `ORANGE_NEW_48` | `#c1550d` | JS |
| `ORANGE_NEW_49` | `#bf5206` | JS |
| `ORANGE_NEW_5` | `#ffd6c3` | JS |
| `ORANGE_NEW_50` | `#bd4f00` | JS |
| `ORANGE_NEW_51` | `#b94d01` | JS |
| `ORANGE_NEW_52` | `#b64b02` | JS |
| `ORANGE_NEW_53` | `#b24a03` | JS |
| `ORANGE_NEW_54` | `#af4803` | JS |
| `ORANGE_NEW_55` | `#ab4604` | JS |
| `ORANGE_NEW_56` | `#a74404` | JS |
| `ORANGE_NEW_57` | `#a44304` | JS |
| `ORANGE_NEW_58` | `#a14104` | JS |
| `ORANGE_NEW_59` | `#9d3f04` | JS |
| `ORANGE_NEW_6` | `#ffd3be` | JS |
| `ORANGE_NEW_60` | `#9a3d03` | JS |
| `ORANGE_NEW_61` | `#963b03` | JS |
| `ORANGE_NEW_62` | `#933a03` | JS |
| `ORANGE_NEW_63` | `#903802` | JS |
| `ORANGE_NEW_64` | `#8d3602` | JS |
| `ORANGE_NEW_65` | `#893401` | JS |
| `ORANGE_NEW_66` | `#863201` | JS |
| `ORANGE_NEW_67` | `#833100` | JS |
| `ORANGE_NEW_68` | `#802f00` | JS |
| `ORANGE_NEW_69` | `#7d2d00` | JS |
| `ORANGE_NEW_7` | `#ffd0b9` | JS |
| `ORANGE_NEW_70` | `#792b00` | JS |
| `ORANGE_NEW_71` | `#762900` | JS |
| `ORANGE_NEW_72` | `#732700` | JS |
| `ORANGE_NEW_73` | `#702600` | JS |
| `ORANGE_NEW_74` | `#6d2400` | JS |
| `ORANGE_NEW_75` | `#6a2200` | JS |
| `ORANGE_NEW_76` | `#672000` | JS |
| `ORANGE_NEW_77` | `#641e00` | JS |
| `ORANGE_NEW_78` | `#611c00` | JS |
| `ORANGE_NEW_79` | `#5e1a00` | JS |
| `ORANGE_NEW_8` | `#ffcdb4` | JS |
| `ORANGE_NEW_80` | `#5b1900` | JS |
| `ORANGE_NEW_81` | `#581700` | JS |
| `ORANGE_NEW_82` | `#551500` | JS |
| `ORANGE_NEW_83` | `#531300` | JS |
| `ORANGE_NEW_84` | `#501100` | JS |
| `ORANGE_NEW_85` | `#4d0f00` | JS |
| `ORANGE_NEW_86` | `#4a0d00` | JS |
| `ORANGE_NEW_87` | `#470b00` | JS |
| `ORANGE_NEW_88` | `#440900` | JS |
| `ORANGE_NEW_89` | `#420800` | JS |
| `ORANGE_NEW_9` | `#fecaaf` | JS |
| `ORANGE_NEW_90` | `#3f0600` | JS |
| `ORANGE_NEW_91` | `#3c0400` | JS |
| `ORANGE_NEW_92` | `#390300` | JS |
| `ORANGE_NEW_93` | `#370200` | JS |
| `ORANGE_NEW_94` | `#340100` | JS |
| `ORANGE_NEW_95` | `#310001` | JS |
| `ORANGE_NEW_96` | `#2d0001` | JS |
| `ORANGE_NEW_97` | `#290001` | JS |
| `ORANGE_NEW_98` | `#250002` | JS |
| `ORANGE_NEW_99` | `#1f0002` | JS |

*Total: 478 variables*

---

## Colors - Pink

| Variable | Value | Type |
|----------|-------|------|
| `--chip-pink-dark-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--chip-pink-light-text` | `hsl(230 calc(1*6.383%) 18.431%/1)` | CSS |
| `--chip-pink-medium-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--expressive-gradient-nitro-pink-end` | `color-mix(in oklab,hsl(240 calc(1*82.063%) 43.7...` | CSS |
| `--expressive-gradient-nitro-pink-start` | `color-mix(in oklab,hsl(305.455 calc(1*76.101%) ...` | CSS |
| `--expressive-gradient-pink-end` | `color-mix(in oklab,hsl(300 calc(1*100%) 20%/0.3...` | CSS |
| `--expressive-gradient-pink-start` | `color-mix(in oklab,hsl(309.787 calc(1*64.977%) ...` | CSS |
| `--guild-boosting-pink-hsl` | `302.143 calc(1*100%) 72.549%` | CSS |
| `--illo-pink-10` | `hsl(290.4 calc(1*100%) 95.098%/1)` | CSS |
| `--illo-pink-10-hsl` | `290.4 calc(1*100%) 95.098%` | CSS |
| `--illo-pink-20` | `hsl(308 calc(1*90.909%) 87.059%/1)` | CSS |
| `--illo-pink-20-hsl` | `308 calc(1*90.909%) 87.059%` | CSS |
| `--illo-pink-30` | `hsl(312 calc(1*96.154%) 79.608%/1)` | CSS |
| `--illo-pink-30-hsl` | `312 calc(1*96.154%) 79.608%` | CSS |
| `--illo-pink-40` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--illo-pink-40-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--illo-pink-50` | `hsl(309.787 calc(1*64.977%) 42.549%/1)` | CSS |
| `--illo-pink-50-hsl` | `309.787 calc(1*64.977%) 42.549%` | CSS |
| `--illo-pink-60` | `hsl(305.455 calc(1*76.101%) 31.176%/1)` | CSS |
| `--illo-pink-60-hsl` | `305.455 calc(1*76.101%) 31.176%` | CSS |
| `--illo-pink-70` | `hsl(300 calc(1*100%) 20%/1)` | CSS |
| `--illo-pink-70-hsl` | `300 calc(1*100%) 20%` | CSS |
| `--opacity-pink-1` | `hsl(315 calc(1*100%) 64.706%/0.0196078431372549)` | CSS |
| `--opacity-pink-1-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-12` | `hsl(315 calc(1*100%) 64.706%/0.12156862745098039)` | CSS |
| `--opacity-pink-12-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-16` | `hsl(315 calc(1*100%) 64.706%/0.1607843137254902)` | CSS |
| `--opacity-pink-16-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-20` | `hsl(315 calc(1*100%) 64.706%/0.2)` | CSS |
| `--opacity-pink-20-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-24` | `hsl(315 calc(1*100%) 64.706%/0.23921568627450981)` | CSS |
| `--opacity-pink-24-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-28` | `hsl(315 calc(1*100%) 64.706%/0.2784313725490196)` | CSS |
| `--opacity-pink-28-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-32` | `hsl(315 calc(1*100%) 64.706%/0.3215686274509804)` | CSS |
| `--opacity-pink-32-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-36` | `hsl(315 calc(1*100%) 64.706%/0.3607843137254902)` | CSS |
| `--opacity-pink-36-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-4` | `hsl(315 calc(1*100%) 64.706%/0.0392156862745098)` | CSS |
| `--opacity-pink-4-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-40` | `hsl(315 calc(1*100%) 64.706%/0.4)` | CSS |
| `--opacity-pink-40-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-44` | `hsl(315 calc(1*100%) 64.706%/0.4392156862745098)` | CSS |
| `--opacity-pink-44-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-48` | `hsl(315 calc(1*100%) 64.706%/0.47843137254901963)` | CSS |
| `--opacity-pink-48-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-52` | `hsl(315 calc(1*100%) 64.706%/0.5215686274509804)` | CSS |
| `--opacity-pink-52-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-56` | `hsl(315 calc(1*100%) 64.706%/0.5607843137254902)` | CSS |
| `--opacity-pink-56-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-60` | `hsl(315 calc(1*100%) 64.706%/0.6)` | CSS |
| `--opacity-pink-60-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-64` | `hsl(315 calc(1*100%) 64.706%/0.6392156862745098)` | CSS |
| `--opacity-pink-64-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-68` | `hsl(315 calc(1*100%) 64.706%/0.6784313725490196)` | CSS |
| `--opacity-pink-68-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-72` | `hsl(315 calc(1*100%) 64.706%/0.7215686274509804)` | CSS |
| `--opacity-pink-72-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-76` | `hsl(315 calc(1*100%) 64.706%/0.7607843137254902)` | CSS |
| `--opacity-pink-76-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-8` | `hsl(315 calc(1*100%) 64.706%/0.0784313725490196)` | CSS |
| `--opacity-pink-8-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-80` | `hsl(315 calc(1*100%) 64.706%/0.8)` | CSS |
| `--opacity-pink-80-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-84` | `hsl(315 calc(1*100%) 64.706%/0.8392156862745098)` | CSS |
| `--opacity-pink-84-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-88` | `hsl(315 calc(1*100%) 64.706%/0.8784313725490196)` | CSS |
| `--opacity-pink-88-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-92` | `hsl(315 calc(1*100%) 64.706%/0.9215686274509803)` | CSS |
| `--opacity-pink-92-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--opacity-pink-96` | `hsl(315 calc(1*100%) 64.706%/0.9607843137254902)` | CSS |
| `--opacity-pink-96-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--pink-1` | `hsl(316.5 calc(1*100%) 92.157%/1)` | CSS |
| `--pink-1-hsl` | `316.5 calc(1*100%) 92.157%` | CSS |
| `--pink-10` | `hsl(314.769 calc(1*100%) 87.255%/1)` | CSS |
| `--pink-10-hsl` | `314.769 calc(1*100%) 87.255%` | CSS |
| `--pink-100` | `hsl(327.273 calc(1*100%) 2.157%/1)` | CSS |
| `--pink-100-hsl` | `327.273 calc(1*100%) 2.157%` | CSS |
| `--pink-11` | `hsl(314.118 calc(1*100%) 86.667%/1)` | CSS |
| `--pink-11-hsl` | `314.118 calc(1*100%) 86.667%` | CSS |
| `--pink-12` | `hsl(314.366 calc(1*100%) 86.078%/1)` | CSS |
| `--pink-12-hsl` | `314.366 calc(1*100%) 86.078%` | CSS |
| `--pink-13` | `hsl(314.795 calc(1*100%) 85.686%/1)` | CSS |
| `--pink-13-hsl` | `314.795 calc(1*100%) 85.686%` | CSS |
| `--pink-14` | `hsl(315 calc(1*100%) 85.098%/1)` | CSS |
| `--pink-14-hsl` | `315 calc(1*100%) 85.098%` | CSS |
| `--pink-15` | `hsl(314.615 calc(1*100%) 84.706%/1)` | CSS |
| `--pink-15-hsl` | `314.615 calc(1*100%) 84.706%` | CSS |
| `--pink-16` | `hsl(314.815 calc(1*100%) 84.118%/1)` | CSS |
| `--pink-16-hsl` | `314.815 calc(1*100%) 84.118%` | CSS |
| `--pink-17` | `hsl(315.181 calc(1*100%) 83.725%/1)` | CSS |
| `--pink-17-hsl` | `315.181 calc(1*100%) 83.725%` | CSS |
| `--pink-18` | `hsl(315.349 calc(1*100%) 83.137%/1)` | CSS |
| `--pink-18-hsl` | `315.349 calc(1*100%) 83.137%` | CSS |
| `--pink-19` | `hsl(315 calc(1*100%) 82.745%/1)` | CSS |
| `--pink-19-hsl` | `315 calc(1*100%) 82.745%` | CSS |
| `--pink-2` | `hsl(316.744 calc(1*100%) 91.569%/1)` | CSS |
| `--pink-2-hsl` | `316.744 calc(1*100%) 91.569%` | CSS |
| `--pink-20` | `hsl(315.165 calc(1*100%) 82.157%/1)` | CSS |
| `--pink-20-hsl` | `315.165 calc(1*100%) 82.157%` | CSS |
| `--pink-21` | `hsl(315.319 calc(1*100%) 81.569%/1)` | CSS |
| `--pink-21-hsl` | `315.319 calc(1*100%) 81.569%` | CSS |
| `--pink-22` | `hsl(315 calc(1*100%) 81.176%/1)` | CSS |
| `--pink-22-hsl` | `315 calc(1*100%) 81.176%` | CSS |
| `--pink-23` | `hsl(315.152 calc(1*100%) 80.588%/1)` | CSS |
| `--pink-23-hsl` | `315.152 calc(1*100%) 80.588%` | CSS |
| `--pink-24` | `hsl(315.294 calc(1*100%) 80%/1)` | CSS |
| `--pink-24-hsl` | `315.294 calc(1*100%) 80%` | CSS |
| `--pink-25` | `hsl(315 calc(1*100%) 79.608%/1)` | CSS |
| `--pink-25-hsl` | `315 calc(1*100%) 79.608%` | CSS |
| `--pink-26` | `hsl(315.14 calc(1*100%) 79.02%/1)` | CSS |
| `--pink-26-hsl` | `315.14 calc(1*100%) 79.02%` | CSS |
| `--pink-27` | `hsl(315.273 calc(1*100%) 78.431%/1)` | CSS |
| `--pink-27-hsl` | `315.273 calc(1*100%) 78.431%` | CSS |
| `--pink-28` | `hsl(314.867 calc(1*100%) 77.843%/1)` | CSS |
| `--pink-28-hsl` | `314.867 calc(1*100%) 77.843%` | CSS |
| `--pink-29` | `hsl(315 calc(1*100%) 77.255%/1)` | CSS |
| `--pink-29-hsl` | `315 calc(1*100%) 77.255%` | CSS |
| `--pink-3` | `hsl(315.652 calc(1*100%) 90.98%/1)` | CSS |
| `--pink-3-hsl` | `315.652 calc(1*100%) 90.98%` | CSS |
| `--pink-30` | `hsl(315.126 calc(1*100%) 76.667%/1)` | CSS |
| `--pink-30-hsl` | `315.126 calc(1*100%) 76.667%` | CSS |
| `--pink-31` | `hsl(315.372 calc(1*100%) 76.275%/1)` | CSS |
| `--pink-31-hsl` | `315.372 calc(1*100%) 76.275%` | CSS |
| `--pink-32` | `hsl(315 calc(1*100%) 75.686%/1)` | CSS |
| `--pink-32-hsl` | `315 calc(1*100%) 75.686%` | CSS |
| `--pink-33` | `hsl(315.118 calc(1*100%) 75.098%/1)` | CSS |
| `--pink-33-hsl` | `315.118 calc(1*100%) 75.098%` | CSS |
| `--pink-34` | `hsl(315.231 calc(1*100%) 74.51%/1)` | CSS |
| `--pink-34-hsl` | `315.231 calc(1*100%) 74.51%` | CSS |
| `--pink-35` | `hsl(315.455 calc(1*100%) 74.118%/1)` | CSS |
| `--pink-35-hsl` | `315.455 calc(1*100%) 74.118%` | CSS |
| `--pink-36` | `hsl(315.111 calc(1*100%) 73.529%/1)` | CSS |
| `--pink-36-hsl` | `315.111 calc(1*100%) 73.529%` | CSS |
| `--pink-37` | `hsl(315.217 calc(1*100%) 72.941%/1)` | CSS |
| `--pink-37-hsl` | `315.217 calc(1*100%) 72.941%` | CSS |
| `--pink-38` | `hsl(315.319 calc(1*100%) 72.353%/1)` | CSS |
| `--pink-38-hsl` | `315.319 calc(1*100%) 72.353%` | CSS |
| `--pink-39` | `hsl(315.417 calc(1*100%) 71.765%/1)` | CSS |
| `--pink-39-hsl` | `315.417 calc(1*100%) 71.765%` | CSS |
| `--pink-4` | `hsl(315.918 calc(1*100%) 90.392%/1)` | CSS |
| `--pink-4-hsl` | `315.918 calc(1*100%) 90.392%` | CSS |
| `--pink-40` | `hsl(315.51 calc(1*100%) 71.176%/1)` | CSS |
| `--pink-40-hsl` | `315.51 calc(1*100%) 71.176%` | CSS |
| `--pink-41` | `hsl(315.2 calc(1*100%) 70.588%/1)` | CSS |
| `--pink-41-hsl` | `315.2 calc(1*100%) 70.588%` | CSS |
| `--pink-42` | `hsl(315.294 calc(1*100%) 70%/1)` | CSS |
| `--pink-42-hsl` | `315.294 calc(1*100%) 70%` | CSS |
| `--pink-43` | `hsl(315.385 calc(1*100%) 69.412%/1)` | CSS |
| `--pink-43-hsl` | `315.385 calc(1*100%) 69.412%` | CSS |
| `--pink-44` | `hsl(315.472 calc(1*100%) 68.824%/1)` | CSS |
| `--pink-44-hsl` | `315.472 calc(1*100%) 68.824%` | CSS |
| `--pink-45` | `hsl(315.185 calc(1*100%) 68.235%/1)` | CSS |
| `--pink-45-hsl` | `315.185 calc(1*100%) 68.235%` | CSS |
| `--pink-46` | `hsl(315.181 calc(1*100%) 67.451%/1)` | CSS |
| `--pink-46-hsl` | `315.181 calc(1*100%) 67.451%` | CSS |
| `--pink-47` | `hsl(315.266 calc(1*100%) 66.863%/1)` | CSS |
| `--pink-47-hsl` | `315.266 calc(1*100%) 66.863%` | CSS |
| `--pink-48` | `hsl(315.349 calc(1*100%) 66.275%/1)` | CSS |
| `--pink-48-hsl` | `315.349 calc(1*100%) 66.275%` | CSS |
| `--pink-49` | `hsl(315 calc(1*100%) 65.49%/1)` | CSS |
| `--pink-49-hsl` | `315 calc(1*100%) 65.49%` | CSS |
| `--pink-5` | `hsl(315 calc(1*100%) 89.804%/1)` | CSS |
| `--pink-5-hsl` | `315 calc(1*100%) 89.804%` | CSS |
| `--pink-50` | `hsl(315 calc(1*100%) 64.706%/1)` | CSS |
| `--pink-50-hsl` | `315 calc(1*100%) 64.706%` | CSS |
| `--pink-51` | `hsl(315.341 calc(1*94.624%) 63.529%/1)` | CSS |
| `--pink-51-hsl` | `315.341 calc(1*94.624%) 63.529%` | CSS |
| `--pink-52` | `hsl(315.349 calc(1*89.583%) 62.353%/1)` | CSS |
| `--pink-52-hsl` | `315.349 calc(1*89.583%) 62.353%` | CSS |
| `--pink-53` | `hsl(315.357 calc(1*84%) 60.784%/1)` | CSS |
| `--pink-53-hsl` | `315.357 calc(1*84%) 60.784%` | CSS |
| `--pink-54` | `hsl(315.366 calc(1*79.612%) 59.608%/1)` | CSS |
| `--pink-54-hsl` | `315.366 calc(1*79.612%) 59.608%` | CSS |
| `--pink-55` | `hsl(315.375 calc(1*74.766%) 58.039%/1)` | CSS |
| `--pink-55-hsl` | `315.375 calc(1*74.766%) 58.039%` | CSS |
| `--pink-56` | `hsl(315.287 calc(1*71.041%) 56.667%/1)` | CSS |
| `--pink-56-hsl` | `315.287 calc(1*71.041%) 56.667%` | CSS |
| `--pink-57` | `hsl(315.294 calc(1*67.401%) 55.49%/1)` | CSS |
| `--pink-57-hsl` | `315.294 calc(1*67.401%) 55.49%` | CSS |
| `--pink-58` | `hsl(315.6 calc(1*64.103%) 54.118%/1)` | CSS |
| `--pink-58-hsl` | `315.6 calc(1*64.103%) 54.118%` | CSS |
| `--pink-59` | `hsl(315.51 calc(1*60.996%) 52.745%/1)` | CSS |
| `--pink-59-hsl` | `315.51 calc(1*60.996%) 52.745%` | CSS |
| `--pink-6` | `hsl(315.556 calc(1*100%) 89.412%/1)` | CSS |
| `--pink-6-hsl` | `315.556 calc(1*100%) 89.412%` | CSS |
| `--pink-60` | `hsl(315.417 calc(1*58.065%) 51.373%/1)` | CSS |
| `--pink-60-hsl` | `315.417 calc(1*58.065%) 51.373%` | CSS |
| `--pink-61` | `hsl(315.319 calc(1*55.294%) 50%/1)` | CSS |
| `--pink-61-hsl` | `315.319 calc(1*55.294%) 50%` | CSS |
| `--pink-62` | `hsl(315.766 calc(1*55.02%) 48.824%/1)` | CSS |
| `--pink-62-hsl` | `315.766 calc(1*55.02%) 48.824%` | CSS |
| `--pink-63` | `hsl(315.672 calc(1*55.372%) 47.451%/1)` | CSS |
| `--pink-63-hsl` | `315.672 calc(1*55.372%) 47.451%` | CSS |
| `--pink-64` | `hsl(315.573 calc(1*55.745%) 46.078%/1)` | CSS |
| `--pink-64-hsl` | `315.573 calc(1*55.745%) 46.078%` | CSS |
| `--pink-65` | `hsl(315.469 calc(1*56.14%) 44.706%/1)` | CSS |
| `--pink-65-hsl` | `315.469 calc(1*56.14%) 44.706%` | CSS |
| `--pink-66` | `hsl(315.714 calc(1*56.757%) 43.529%/1)` | CSS |
| `--pink-66-hsl` | `315.714 calc(1*56.757%) 43.529%` | CSS |
| `--pink-67` | `hsl(315.61 calc(1*57.209%) 42.157%/1)` | CSS |
| `--pink-67-hsl` | `315.61 calc(1*57.209%) 42.157%` | CSS |
| `--pink-68` | `hsl(315.372 calc(1*58.454%) 40.588%/1)` | CSS |
| `--pink-68-hsl` | `315.372 calc(1*58.454%) 40.588%` | CSS |
| `--pink-69` | `hsl(315.126 calc(1*59.204%) 39.412%/1)` | CSS |
| `--pink-69-hsl` | `315.126 calc(1*59.204%) 39.412%` | CSS |
| `--pink-7` | `hsl(314.737 calc(1*100%) 88.824%/1)` | CSS |
| `--pink-7-hsl` | `314.737 calc(1*100%) 88.824%` | CSS |
| `--pink-70` | `hsl(315 calc(1*59.794%) 38.039%/1)` | CSS |
| `--pink-70-hsl` | `315 calc(1*59.794%) 38.039%` | CSS |
| `--pink-71` | `hsl(315.263 calc(1*60.638%) 36.863%/1)` | CSS |
| `--pink-71-hsl` | `315.263 calc(1*60.638%) 36.863%` | CSS |
| `--pink-72` | `hsl(315.135 calc(1*61.326%) 35.49%/1)` | CSS |
| `--pink-72-hsl` | `315.135 calc(1*61.326%) 35.49%` | CSS |
| `--pink-73` | `hsl(315.413 calc(1*62.286%) 34.314%/1)` | CSS |
| `--pink-73-hsl` | `315.413 calc(1*62.286%) 34.314%` | CSS |
| `--pink-74` | `hsl(315.283 calc(1*63.095%) 32.941%/1)` | CSS |
| `--pink-74-hsl` | `315.283 calc(1*63.095%) 32.941%` | CSS |
| `--pink-75` | `hsl(315 calc(1*64.198%) 31.765%/1)` | CSS |
| `--pink-75-hsl` | `315 calc(1*64.198%) 31.765%` | CSS |
| `--pink-76` | `hsl(314.851 calc(1*65.161%) 30.392%/1)` | CSS |
| `--pink-76-hsl` | `314.851 calc(1*65.161%) 30.392%` | CSS |
| `--pink-77` | `hsl(315 calc(1*67.568%) 29.02%/1)` | CSS |
| `--pink-77-hsl` | `315 calc(1*67.568%) 29.02%` | CSS |
| `--pink-78` | `hsl(314.694 calc(1*69.014%) 27.843%/1)` | CSS |
| `--pink-78-hsl` | `314.694 calc(1*69.014%) 27.843%` | CSS |
| `--pink-79` | `hsl(314.526 calc(1*70.37%) 26.471%/1)` | CSS |
| `--pink-79-hsl` | `314.526 calc(1*70.37%) 26.471%` | CSS |
| `--pink-8` | `hsl(315 calc(1*100%) 88.235%/1)` | CSS |
| `--pink-8-hsl` | `315 calc(1*100%) 88.235%` | CSS |
| `--pink-80` | `hsl(314.839 calc(1*72.093%) 25.294%/1)` | CSS |
| `--pink-80-hsl` | `314.839 calc(1*72.093%) 25.294%` | CSS |
| `--pink-81` | `hsl(314.505 calc(1*73.984%) 24.118%/1)` | CSS |
| `--pink-81-hsl` | `314.505 calc(1*73.984%) 24.118%` | CSS |
| `--pink-82` | `hsl(314.157 calc(1*77.391%) 22.549%/1)` | CSS |
| `--pink-82-hsl` | `314.157 calc(1*77.391%) 22.549%` | CSS |
| `--pink-83` | `hsl(313.793 calc(1*79.817%) 21.373%/1)` | CSS |
| `--pink-83-hsl` | `313.793 calc(1*79.817%) 21.373%` | CSS |
| `--pink-84` | `hsl(314.118 calc(1*82.524%) 20.196%/1)` | CSS |
| `--pink-84-hsl` | `314.118 calc(1*82.524%) 20.196%` | CSS |
| `--pink-85` | `hsl(313.735 calc(1*85.567%) 19.02%/1)` | CSS |
| `--pink-85-hsl` | `313.735 calc(1*85.567%) 19.02%` | CSS |
| `--pink-86` | `hsl(314.074 calc(1*89.011%) 17.843%/1)` | CSS |
| `--pink-86-hsl` | `314.074 calc(1*89.011%) 17.843%` | CSS |
| `--pink-87` | `hsl(313.671 calc(1*92.941%) 16.667%/1)` | CSS |
| `--pink-87-hsl` | `313.671 calc(1*92.941%) 16.667%` | CSS |
| `--pink-88` | `hsl(313.421 calc(1*95%) 15.686%/1)` | CSS |
| `--pink-88-hsl` | `313.421 calc(1*95%) 15.686%` | CSS |
| `--pink-89` | `hsl(313.973 calc(1*97.333%) 14.706%/1)` | CSS |
| `--pink-89-hsl` | `313.973 calc(1*97.333%) 14.706%` | CSS |
| `--pink-9` | `hsl(314.516 calc(1*100%) 87.843%/1)` | CSS |
| `--pink-9-hsl` | `314.516 calc(1*100%) 87.843%` | CSS |
| `--pink-90` | `hsl(313.714 calc(1*100%) 13.725%/1)` | CSS |
| `--pink-90-hsl` | `313.714 calc(1*100%) 13.725%` | CSS |
| `--pink-91` | `hsl(313.636 calc(1*100%) 12.941%/1)` | CSS |
| `--pink-91-hsl` | `313.636 calc(1*100%) 12.941%` | CSS |
| `--pink-92` | `hsl(314.516 calc(1*100%) 12.157%/1)` | CSS |
| `--pink-92-hsl` | `314.516 calc(1*100%) 12.157%` | CSS |
| `--pink-93` | `hsl(314.483 calc(1*100%) 11.373%/1)` | CSS |
| `--pink-93-hsl` | `314.483 calc(1*100%) 11.373%` | CSS |
| `--pink-94` | `hsl(314.444 calc(1*100%) 10.588%/1)` | CSS |
| `--pink-94-hsl` | `314.444 calc(1*100%) 10.588%` | CSS |
| `--pink-95` | `hsl(315.6 calc(1*100%) 9.804%/1)` | CSS |
| `--pink-95-hsl` | `315.6 calc(1*100%) 9.804%` | CSS |
| `--pink-96` | `hsl(314.667 calc(1*100%) 8.824%/1)` | CSS |
| `--pink-96-hsl` | `314.667 calc(1*100%) 8.824%` | CSS |
| `--pink-97` | `hsl(316.5 calc(1*100%) 7.843%/1)` | CSS |
| `--pink-97-hsl` | `316.5 calc(1*100%) 7.843%` | CSS |
| `--pink-98` | `hsl(316.364 calc(1*100%) 6.471%/1)` | CSS |
| `--pink-98-hsl` | `316.364 calc(1*100%) 6.471%` | CSS |
| `--pink-99` | `hsl(319.2 calc(1*100%) 4.902%/1)` | CSS |
| `--pink-99-hsl` | `319.2 calc(1*100%) 4.902%` | CSS |
| `EXPRESSIVE_GRADIENT_NITRO_PINK_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_NITRO_PINK_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_PINK_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_PINK_START` | `{}` | JS |
| `ILLO_PINK_10` | `#fbe6ff` | JS |
| `ILLO_PINK_20` | `#fcc0f4` | JS |
| `ILLO_PINK_30` | `#fd99e9` | JS |
| `ILLO_PINK_40` | `#ff4cd2` | JS |
| `ILLO_PINK_50` | `#b3269c` | JS |
| `ILLO_PINK_60` | `#8c1381` | JS |
| `ILLO_PINK_70` | `#660066` | JS |
| `OPACITY_PINK_1` | `#ff4bd205` | JS |
| `OPACITY_PINK_12` | `#ff4bd21f` | JS |
| `OPACITY_PINK_16` | `#ff4bd229` | JS |
| `OPACITY_PINK_20` | `#ff4bd233` | JS |
| `OPACITY_PINK_24` | `#ff4bd23d` | JS |
| `OPACITY_PINK_28` | `#ff4bd247` | JS |
| `OPACITY_PINK_32` | `#ff4bd252` | JS |
| `OPACITY_PINK_36` | `#ff4bd25c` | JS |
| `OPACITY_PINK_4` | `#ff4bd20a` | JS |
| `OPACITY_PINK_40` | `#ff4bd266` | JS |
| `OPACITY_PINK_44` | `#ff4bd270` | JS |
| `OPACITY_PINK_48` | `#ff4bd27a` | JS |
| `OPACITY_PINK_52` | `#ff4bd285` | JS |
| `OPACITY_PINK_56` | `#ff4bd28f` | JS |
| `OPACITY_PINK_60` | `#ff4bd299` | JS |
| `OPACITY_PINK_64` | `#ff4bd2a3` | JS |
| `OPACITY_PINK_68` | `#ff4bd2ad` | JS |
| `OPACITY_PINK_72` | `#ff4bd2b8` | JS |
| `OPACITY_PINK_76` | `#ff4bd2c2` | JS |
| `OPACITY_PINK_8` | `#ff4bd214` | JS |
| `OPACITY_PINK_80` | `#ff4bd2cc` | JS |
| `OPACITY_PINK_84` | `#ff4bd2d6` | JS |
| `OPACITY_PINK_88` | `#ff4bd2e0` | JS |
| `OPACITY_PINK_92` | `#ff4bd2eb` | JS |
| `OPACITY_PINK_96` | `#ff4bd2f5` | JS |
| `PINK_1` | `#ffd7f4` | JS |
| `PINK_10` | `#ffbeef` | JS |
| `PINK_100` | `#0b0006` | JS |
| `PINK_11` | `#ffbbef` | JS |
| `PINK_12` | `#ffb8ee` | JS |
| `PINK_13` | `#ffb6ed` | JS |
| `PINK_14` | `#ffb3ec` | JS |
| `PINK_15` | `#ffb1ec` | JS |
| `PINK_16` | `#ffaeeb` | JS |
| `PINK_17` | `#ffacea` | JS |
| `PINK_18` | `#ffa9e9` | JS |
| `PINK_19` | `#ffa7e9` | JS |
| `PINK_2` | `#ffd4f3` | JS |
| `PINK_20` | `#ffa4e8` | JS |
| `PINK_21` | `#ffa1e7` | JS |
| `PINK_22` | `#ff9fe7` | JS |
| `PINK_23` | `#ff9ce6` | JS |
| `PINK_24` | `#ff99e5` | JS |
| `PINK_25` | `#ff97e5` | JS |
| `PINK_26` | `#ff94e4` | JS |
| `PINK_27` | `#ff91e3` | JS |
| `PINK_28` | `#ff8ee3` | JS |
| `PINK_29` | `#ff8be2` | JS |
| `PINK_3` | `#ffd1f3` | JS |
| `PINK_30` | `#ff88e1` | JS |
| `PINK_31` | `#ff86e0` | JS |
| `PINK_32` | `#ff83e0` | JS |
| `PINK_33` | `#ff80df` | JS |
| `PINK_34` | `#ff7dde` | JS |
| `PINK_35` | `#ff7bdd` | JS |
| `PINK_36` | `#ff78dd` | JS |
| `PINK_37` | `#ff75dc` | JS |
| `PINK_38` | `#ff72db` | JS |
| `PINK_39` | `#ff6fda` | JS |
| `PINK_4` | `#ffcef2` | JS |
| `PINK_40` | `#ff6cd9` | JS |
| `PINK_41` | `#ff69d9` | JS |
| `PINK_42` | `#ff66d8` | JS |
| `PINK_43` | `#ff63d7` | JS |
| `PINK_44` | `#ff60d6` | JS |
| `PINK_45` | `#ff5dd6` | JS |
| `PINK_46` | `#ff59d5` | JS |
| `PINK_47` | `#ff56d4` | JS |
| `PINK_48` | `#ff53d3` | JS |
| `PINK_49` | `#ff4fd3` | JS |
| `PINK_5` | `#ffcbf2` | JS |
| `PINK_50` | `#ff4bd2` | JS |
| `PINK_51` | `#fa4acd` | JS |
| `PINK_52` | `#f549c9` | JS |
| `PINK_53` | `#ef47c4` | JS |
| `PINK_54` | `#ea46c0` | JS |
| `PINK_55` | `#e444bb` | JS |
| `PINK_56` | `#df42b7` | JS |
| `PINK_57` | `#da41b3` | JS |
| `PINK_58` | `#d53fae` | JS |
| `PINK_59` | `#d03daa` | JS |
| `PINK_6` | `#ffc9f1` | JS |
| `PINK_60` | `#cb3ba6` | JS |
| `PINK_61` | `#c639a2` | JS |
| `PINK_62` | `#c1389d` | JS |
| `PINK_63` | `#bc3699` | JS |
| `PINK_64` | `#b73495` | JS |
| `PINK_65` | `#b23291` | JS |
| `PINK_66` | `#ae308d` | JS |
| `PINK_67` | `#a92e89` | JS |
| `PINK_68` | `#a42b85` | JS |
| `PINK_69` | `#a02982` | JS |
| `PINK_7` | `#ffc6f1` | JS |
| `PINK_70` | `#9b277e` | JS |
| `PINK_71` | `#97257a` | JS |
| `PINK_72` | `#922376` | JS |
| `PINK_73` | `#8e2172` | JS |
| `PINK_74` | `#891f6e` | JS |
| `PINK_75` | `#851d6b` | JS |
| `PINK_76` | `#801b67` | JS |
| `PINK_77` | `#7c1863` | JS |
| `PINK_78` | `#781660` | JS |
| `PINK_79` | `#73145c` | JS |
| `PINK_8` | `#ffc3f0` | JS |
| `PINK_80` | `#6f1258` | JS |
| `PINK_81` | `#6b1055` | JS |
| `PINK_82` | `#660d51` | JS |
| `PINK_83` | `#620b4e` | JS |
| `PINK_84` | `#5e094a` | JS |
| `PINK_85` | `#5a0747` | JS |
| `PINK_86` | `#560543` | JS |
| `PINK_87` | `#520340` | JS |
| `PINK_88` | `#4e023d` | JS |
| `PINK_89` | `#4a0139` | JS |
| `PINK_9` | `#ffc1f0` | JS |
| `PINK_90` | `#460036` | JS |
| `PINK_91` | `#420033` | JS |
| `PINK_92` | `#3e002f` | JS |
| `PINK_93` | `#3a002c` | JS |
| `PINK_94` | `#360029` | JS |
| `PINK_95` | `#320025` | JS |
| `PINK_96` | `#2d0022` | JS |
| `PINK_97` | `#28001d` | JS |
| `PINK_98` | `#210018` | JS |
| `PINK_99` | `#190011` | JS |

*Total: 408 variables*

---

## Colors - Teal

| Variable | Value | Type |
|----------|-------|------|
| `--opacity-teal-1` | `hsl(184.615 calc(1*100%) 28.039%/0.019607843137...` | CSS |
| `--opacity-teal-1-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-12` | `hsl(184.615 calc(1*100%) 28.039%/0.121568627450...` | CSS |
| `--opacity-teal-12-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-16` | `hsl(184.615 calc(1*100%) 28.039%/0.160784313725...` | CSS |
| `--opacity-teal-16-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-20` | `hsl(184.615 calc(1*100%) 28.039%/0.2)` | CSS |
| `--opacity-teal-20-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-24` | `hsl(184.615 calc(1*100%) 28.039%/0.239215686274...` | CSS |
| `--opacity-teal-24-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-28` | `hsl(184.615 calc(1*100%) 28.039%/0.278431372549...` | CSS |
| `--opacity-teal-28-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-32` | `hsl(184.615 calc(1*100%) 28.039%/0.321568627450...` | CSS |
| `--opacity-teal-32-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-36` | `hsl(184.615 calc(1*100%) 28.039%/0.360784313725...` | CSS |
| `--opacity-teal-36-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-4` | `hsl(184.615 calc(1*100%) 28.039%/0.039215686274...` | CSS |
| `--opacity-teal-4-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-40` | `hsl(184.615 calc(1*100%) 28.039%/0.4)` | CSS |
| `--opacity-teal-40-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-44` | `hsl(184.615 calc(1*100%) 28.039%/0.439215686274...` | CSS |
| `--opacity-teal-44-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-48` | `hsl(184.615 calc(1*100%) 28.039%/0.478431372549...` | CSS |
| `--opacity-teal-48-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-52` | `hsl(184.615 calc(1*100%) 28.039%/0.521568627450...` | CSS |
| `--opacity-teal-52-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-56` | `hsl(184.615 calc(1*100%) 28.039%/0.560784313725...` | CSS |
| `--opacity-teal-56-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-60` | `hsl(184.615 calc(1*100%) 28.039%/0.6)` | CSS |
| `--opacity-teal-60-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-64` | `hsl(184.615 calc(1*100%) 28.039%/0.639215686274...` | CSS |
| `--opacity-teal-64-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-68` | `hsl(184.615 calc(1*100%) 28.039%/0.678431372549...` | CSS |
| `--opacity-teal-68-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-72` | `hsl(184.615 calc(1*100%) 28.039%/0.721568627450...` | CSS |
| `--opacity-teal-72-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-76` | `hsl(184.615 calc(1*100%) 28.039%/0.760784313725...` | CSS |
| `--opacity-teal-76-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-8` | `hsl(184.615 calc(1*100%) 28.039%/0.078431372549...` | CSS |
| `--opacity-teal-8-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-80` | `hsl(184.615 calc(1*100%) 28.039%/0.8)` | CSS |
| `--opacity-teal-80-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-84` | `hsl(184.615 calc(1*100%) 28.039%/0.839215686274...` | CSS |
| `--opacity-teal-84-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-88` | `hsl(184.615 calc(1*100%) 28.039%/0.878431372549...` | CSS |
| `--opacity-teal-88-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-92` | `hsl(184.615 calc(1*100%) 28.039%/0.921568627450...` | CSS |
| `--opacity-teal-92-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--opacity-teal-96` | `hsl(184.615 calc(1*100%) 28.039%/0.960784313725...` | CSS |
| `--opacity-teal-96-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--role-dark-teal-hsl` | `168.108 calc(1*76.552%) 28.431%` | CSS |
| `--role-teal-hsl` | `168.148 calc(1*75.701%) 41.961%` | CSS |
| `--teal-100` | `hsl(183.396 calc(1*100%) 89.608%/1)` | CSS |
| `--teal-100-hsl` | `183.396 calc(1*100%) 89.608%` | CSS |
| `--teal-130` | `hsl(183.396 calc(1*100%) 89.608%/1)` | CSS |
| `--teal-130-hsl` | `183.396 calc(1*100%) 89.608%` | CSS |
| `--teal-160` | `hsl(183.396 calc(1*100%) 89.608%/1)` | CSS |
| `--teal-160-hsl` | `183.396 calc(1*100%) 89.608%` | CSS |
| `--teal-200` | `hsl(186.176 calc(1*75.556%) 82.353%/1)` | CSS |
| `--teal-200-hsl` | `186.176 calc(1*75.556%) 82.353%` | CSS |
| `--teal-230` | `hsl(185.316 calc(1*61.24%) 74.706%/1)` | CSS |
| `--teal-230-hsl` | `185.316 calc(1*61.24%) 74.706%` | CSS |
| `--teal-260` | `hsl(185.275 calc(1*53.846%) 66.863%/1)` | CSS |
| `--teal-260-hsl` | `185.275 calc(1*53.846%) 66.863%` | CSS |
| `--teal-300` | `hsl(185.347 calc(1*50.249%) 60.588%/1)` | CSS |
| `--teal-300-hsl` | `185.347 calc(1*50.249%) 60.588%` | CSS |
| `--teal-330` | `hsl(185.217 calc(1*47.325%) 52.353%/1)` | CSS |
| `--teal-330-hsl` | `185.217 calc(1*47.325%) 52.353%` | CSS |
| `--teal-345` | `hsl(184.839 calc(1*50.82%) 47.843%/1)` | CSS |
| `--teal-345-hsl` | `184.839 calc(1*50.82%) 47.843%` | CSS |
| `--teal-360` | `hsl(183.974 calc(1*78.238%) 37.843%/1)` | CSS |
| `--teal-360-hsl` | `183.974 calc(1*78.238%) 37.843%` | CSS |
| `--teal-400` | `hsl(184.586 calc(1*100%) 30.784%/1)` | CSS |
| `--teal-400-hsl` | `184.586 calc(1*100%) 30.784%` | CSS |
| `--teal-430` | `hsl(184.889 calc(1*100%) 26.471%/1)` | CSS |
| `--teal-430-hsl` | `184.889 calc(1*100%) 26.471%` | CSS |
| `--teal-460` | `hsl(185.5 calc(1*100%) 23.529%/1)` | CSS |
| `--teal-460-hsl` | `185.5 calc(1*100%) 23.529%` | CSS |
| `--teal-500` | `hsl(186.286 calc(1*100%) 20.588%/1)` | CSS |
| `--teal-500-hsl` | `186.286 calc(1*100%) 20.588%` | CSS |
| `--teal-530` | `hsl(186.522 calc(1*100%) 18.039%/1)` | CSS |
| `--teal-530-hsl` | `186.522 calc(1*100%) 18.039%` | CSS |
| `--teal-560` | `hsl(187.229 calc(1*100%) 16.275%/1)` | CSS |
| `--teal-560-hsl` | `187.229 calc(1*100%) 16.275%` | CSS |
| `--teal-600` | `hsl(187.397 calc(1*100%) 14.314%/1)` | CSS |
| `--teal-600-hsl` | `187.397 calc(1*100%) 14.314%` | CSS |
| `--teal-630` | `hsl(188.182 calc(1*100%) 12.941%/1)` | CSS |
| `--teal-630-hsl` | `188.182 calc(1*100%) 12.941%` | CSS |
| `--teal-660` | `hsl(189.153 calc(1*100%) 11.569%/1)` | CSS |
| `--teal-660-hsl` | `189.153 calc(1*100%) 11.569%` | CSS |
| `--teal-700` | `hsl(189.818 calc(1*100%) 10.784%/1)` | CSS |
| `--teal-700-hsl` | `189.818 calc(1*100%) 10.784%` | CSS |
| `--teal-730` | `hsl(191.25 calc(1*100%) 9.412%/1)` | CSS |
| `--teal-730-hsl` | `191.25 calc(1*100%) 9.412%` | CSS |
| `--teal-760` | `hsl(192.857 calc(1*100%) 8.235%/1)` | CSS |
| `--teal-760-hsl` | `192.857 calc(1*100%) 8.235%` | CSS |
| `--teal-800` | `hsl(194.211 calc(1*100%) 7.451%/1)` | CSS |
| `--teal-800-hsl` | `194.211 calc(1*100%) 7.451%` | CSS |
| `--teal-830` | `hsl(194.545 calc(1*100%) 6.471%/1)` | CSS |
| `--teal-830-hsl` | `194.545 calc(1*100%) 6.471%` | CSS |
| `--teal-860` | `hsl(197.143 calc(1*100%) 5.49%/1)` | CSS |
| `--teal-860-hsl` | `197.143 calc(1*100%) 5.49%` | CSS |
| `--teal-900` | `hsl(199.2 calc(1*100%) 4.902%/1)` | CSS |
| `--teal-900-hsl` | `199.2 calc(1*100%) 4.902%` | CSS |
| `--teal-new-1` | `hsl(183.396 calc(1*100%) 89.608%/1)` | CSS |
| `--teal-new-1-hsl` | `183.396 calc(1*100%) 89.608%` | CSS |
| `--teal-new-10` | `hsl(185.676 calc(1*67.273%) 78.431%/1)` | CSS |
| `--teal-new-10-hsl` | `185.676 calc(1*67.273%) 78.431%` | CSS |
| `--teal-new-100` | `hsl(204.545 calc(1*100%) 4.314%/1)` | CSS |
| `--teal-new-100-hsl` | `204.545 calc(1*100%) 4.314%` | CSS |
| `--teal-new-11` | `hsl(186.316 calc(1*65.517%) 77.255%/1)` | CSS |
| `--teal-new-11-hsl` | `186.316 calc(1*65.517%) 77.255%` | CSS |
| `--teal-new-12` | `hsl(185.455 calc(1*62.602%) 75.882%/1)` | CSS |
| `--teal-new-12-hsl` | `185.455 calc(1*62.602%) 75.882%` | CSS |
| `--teal-new-13` | `hsl(185.316 calc(1*61.24%) 74.706%/1)` | CSS |
| `--teal-new-13-hsl` | `185.316 calc(1*61.24%) 74.706%` | CSS |
| `--teal-new-14` | `hsl(185.926 calc(1*60%) 73.529%/1)` | CSS |
| `--teal-new-14-hsl` | `185.926 calc(1*60%) 73.529%` | CSS |
| `--teal-new-15` | `hsl(185.06 calc(1*58.042%) 71.961%/1)` | CSS |
| `--teal-new-15-hsl` | `185.06 calc(1*58.042%) 71.961%` | CSS |
| `--teal-new-16` | `hsl(185.647 calc(1*57.047%) 70.784%/1)` | CSS |
| `--teal-new-16-hsl` | `185.647 calc(1*57.047%) 70.784%` | CSS |
| `--teal-new-17` | `hsl(185.517 calc(1*56.129%) 69.608%/1)` | CSS |
| `--teal-new-17-hsl` | `185.517 calc(1*56.129%) 69.608%` | CSS |
| `--teal-new-18` | `hsl(186.067 calc(1*55.28%) 68.431%/1)` | CSS |
| `--teal-new-18-hsl` | `186.067 calc(1*55.28%) 68.431%` | CSS |
| `--teal-new-19` | `hsl(185.275 calc(1*53.846%) 66.863%/1)` | CSS |
| `--teal-new-19-hsl` | `185.275 calc(1*53.846%) 66.863%` | CSS |
| `--teal-new-2` | `hsl(186.316 calc(1*100%) 88.824%/1)` | CSS |
| `--teal-new-2-hsl` | `186.316 calc(1*100%) 88.824%` | CSS |
| `--teal-new-20` | `hsl(185.806 calc(1*53.143%) 65.686%/1)` | CSS |
| `--teal-new-20-hsl` | `185.806 calc(1*53.143%) 65.686%` | CSS |
| `--teal-new-21` | `hsl(185.684 calc(1*52.486%) 64.51%/1)` | CSS |
| `--teal-new-21-hsl` | `185.684 calc(1*52.486%) 64.51%` | CSS |
| `--teal-new-22` | `hsl(185 calc(1*51.064%) 63.137%/1)` | CSS |
| `--teal-new-22-hsl` | `185 calc(1*51.064%) 63.137%` | CSS |
| `--teal-new-23` | `hsl(185.455 calc(1*50.769%) 61.765%/1)` | CSS |
| `--teal-new-23-hsl` | `185.455 calc(1*50.769%) 61.765%` | CSS |
| `--teal-new-24` | `hsl(185.347 calc(1*50.249%) 60.588%/1)` | CSS |
| `--teal-new-24-hsl` | `185.347 calc(1*50.249%) 60.588%` | CSS |
| `--teal-new-25` | `hsl(185.243 calc(1*49.282%) 59.02%/1)` | CSS |
| `--teal-new-25-hsl` | `185.243 calc(1*49.282%) 59.02%` | CSS |
| `--teal-new-26` | `hsl(185.143 calc(1*48.837%) 57.843%/1)` | CSS |
| `--teal-new-26-hsl` | `185.143 calc(1*48.837%) 57.843%` | CSS |
| `--teal-new-27` | `hsl(185.556 calc(1*48.649%) 56.471%/1)` | CSS |
| `--teal-new-27-hsl` | `185.556 calc(1*48.649%) 56.471%` | CSS |
| `--teal-new-28` | `hsl(184.954 calc(1*47.598%) 55.098%/1)` | CSS |
| `--teal-new-28-hsl` | `184.954 calc(1*47.598%) 55.098%` | CSS |
| `--teal-new-29` | `hsl(184.821 calc(1*47.458%) 53.725%/1)` | CSS |
| `--teal-new-29-hsl` | `184.821 calc(1*47.458%) 53.725%` | CSS |
| `--teal-new-3` | `hsl(186.102 calc(1*93.651%) 87.647%/1)` | CSS |
| `--teal-new-3-hsl` | `186.102 calc(1*93.651%) 87.647%` | CSS |
| `--teal-new-30` | `hsl(185.217 calc(1*47.325%) 52.353%/1)` | CSS |
| `--teal-new-30-hsl` | `185.217 calc(1*47.325%) 52.353%` | CSS |
| `--teal-new-31` | `hsl(184.615 calc(1*46.614%) 50.784%/1)` | CSS |
| `--teal-new-31-hsl` | `184.615 calc(1*46.614%) 50.784%` | CSS |
| `--teal-new-32` | `hsl(184.959 calc(1*48.207%) 49.216%/1)` | CSS |
| `--teal-new-32-hsl` | `184.959 calc(1*48.207%) 49.216%` | CSS |
| `--teal-new-33` | `hsl(184.839 calc(1*50.82%) 47.843%/1)` | CSS |
| `--teal-new-33-hsl` | `184.839 calc(1*50.82%) 47.843%` | CSS |
| `--teal-new-34` | `hsl(185.156 calc(1*54.237%) 46.275%/1)` | CSS |
| `--teal-new-34-hsl` | `185.156 calc(1*54.237%) 46.275%` | CSS |
| `--teal-new-35` | `hsl(184.545 calc(1*58.407%) 44.314%/1)` | CSS |
| `--teal-new-35-hsl` | `184.545 calc(1*58.407%) 44.314%` | CSS |
| `--teal-new-36` | `hsl(184.38 calc(1*63.134%) 42.549%/1)` | CSS |
| `--teal-new-36-hsl` | `184.38 calc(1*63.134%) 42.549%` | CSS |
| `--teal-new-37` | `hsl(184.615 calc(1*69.082%) 40.588%/1)` | CSS |
| `--teal-new-37-hsl` | `184.615 calc(1*69.082%) 40.588%` | CSS |
| `--teal-new-38` | `hsl(183.974 calc(1*78.238%) 37.843%/1)` | CSS |
| `--teal-new-38-hsl` | `183.974 calc(1*78.238%) 37.843%` | CSS |
| `--teal-new-39` | `hsl(183.976 calc(1*95.402%) 34.118%/1)` | CSS |
| `--teal-new-39-hsl` | `183.976 calc(1*95.402%) 34.118%` | CSS |
| `--teal-new-4` | `hsl(186.774 calc(1*88.571%) 86.275%/1)` | CSS |
| `--teal-new-4-hsl` | `186.774 calc(1*88.571%) 86.275%` | CSS |
| `--teal-new-40` | `hsl(183.929 calc(1*100%) 32.941%/1)` | CSS |
| `--teal-new-40-hsl` | `183.929 calc(1*100%) 32.941%` | CSS |
| `--teal-new-41` | `hsl(183.976 calc(1*100%) 32.549%/1)` | CSS |
| `--teal-new-41-hsl` | `183.976 calc(1*100%) 32.549%` | CSS |
| `--teal-new-42` | `hsl(184.049 calc(1*100%) 31.961%/1)` | CSS |
| `--teal-new-42-hsl` | `184.049 calc(1*100%) 31.961%` | CSS |
| `--teal-new-43` | `hsl(184.099 calc(1*100%) 31.569%/1)` | CSS |
| `--teal-new-43-hsl` | `184.099 calc(1*100%) 31.569%` | CSS |
| `--teal-new-44` | `hsl(184.528 calc(1*100%) 31.176%/1)` | CSS |
| `--teal-new-44-hsl` | `184.528 calc(1*100%) 31.176%` | CSS |
| `--teal-new-45` | `hsl(184.586 calc(1*100%) 30.784%/1)` | CSS |
| `--teal-new-45-hsl` | `184.586 calc(1*100%) 30.784%` | CSS |
| `--teal-new-46` | `hsl(184.286 calc(1*100%) 30.196%/1)` | CSS |
| `--teal-new-46-hsl` | `184.286 calc(1*100%) 30.196%` | CSS |
| `--teal-new-47` | `hsl(184.371 calc(1*100%) 29.608%/1)` | CSS |
| `--teal-new-47-hsl` | `184.371 calc(1*100%) 29.608%` | CSS |
| `--teal-new-48` | `hsl(184.832 calc(1*100%) 29.216%/1)` | CSS |
| `--teal-new-48-hsl` | `184.832 calc(1*100%) 29.216%` | CSS |
| `--teal-new-49` | `hsl(184.932 calc(1*100%) 28.627%/1)` | CSS |
| `--teal-new-49-hsl` | `184.932 calc(1*100%) 28.627%` | CSS |
| `--teal-new-5` | `hsl(185.714 calc(1*81.818%) 84.902%/1)` | CSS |
| `--teal-new-5-hsl` | `185.714 calc(1*81.818%) 84.902%` | CSS |
| `--teal-new-50` | `hsl(184.615 calc(1*100%) 28.039%/1)` | CSS |
| `--teal-new-50-hsl` | `184.615 calc(1*100%) 28.039%` | CSS |
| `--teal-new-51` | `hsl(184.714 calc(1*100%) 27.451%/1)` | CSS |
| `--teal-new-51-hsl` | `184.714 calc(1*100%) 27.451%` | CSS |
| `--teal-new-52` | `hsl(184.783 calc(1*100%) 27.059%/1)` | CSS |
| `--teal-new-52-hsl` | `184.783 calc(1*100%) 27.059%` | CSS |
| `--teal-new-53` | `hsl(184.889 calc(1*100%) 26.471%/1)` | CSS |
| `--teal-new-53-hsl` | `184.889 calc(1*100%) 26.471%` | CSS |
| `--teal-new-54` | `hsl(184.545 calc(1*100%) 25.882%/1)` | CSS |
| `--teal-new-54-hsl` | `184.545 calc(1*100%) 25.882%` | CSS |
| `--teal-new-55` | `hsl(185.077 calc(1*100%) 25.49%/1)` | CSS |
| `--teal-new-55-hsl` | `185.077 calc(1*100%) 25.49%` | CSS |
| `--teal-new-56` | `hsl(184.724 calc(1*100%) 24.902%/1)` | CSS |
| `--teal-new-56-hsl` | `184.724 calc(1*100%) 24.902%` | CSS |
| `--teal-new-57` | `hsl(185.28 calc(1*100%) 24.51%/1)` | CSS |
| `--teal-new-57-hsl` | `185.28 calc(1*100%) 24.51%` | CSS |
| `--teal-new-58` | `hsl(184.918 calc(1*100%) 23.922%/1)` | CSS |
| `--teal-new-58-hsl` | `184.918 calc(1*100%) 23.922%` | CSS |
| `--teal-new-59` | `hsl(185.5 calc(1*100%) 23.529%/1)` | CSS |
| `--teal-new-59-hsl` | `185.5 calc(1*100%) 23.529%` | CSS |
| `--teal-new-6` | `hsl(185.538 calc(1*78.313%) 83.725%/1)` | CSS |
| `--teal-new-6-hsl` | `185.538 calc(1*78.313%) 83.725%` | CSS |
| `--teal-new-60` | `hsl(185.128 calc(1*100%) 22.941%/1)` | CSS |
| `--teal-new-60-hsl` | `185.128 calc(1*100%) 22.941%` | CSS |
| `--teal-new-61` | `hsl(185.739 calc(1*100%) 22.549%/1)` | CSS |
| `--teal-new-61-hsl` | `185.739 calc(1*100%) 22.549%` | CSS |
| `--teal-new-62` | `hsl(185.357 calc(1*100%) 21.961%/1)` | CSS |
| `--teal-new-62-hsl` | `185.357 calc(1*100%) 21.961%` | CSS |
| `--teal-new-63` | `hsl(186 calc(1*100%) 21.569%/1)` | CSS |
| `--teal-new-63-hsl` | `186 calc(1*100%) 21.569%` | CSS |
| `--teal-new-64` | `hsl(185.607 calc(1*100%) 20.98%/1)` | CSS |
| `--teal-new-64-hsl` | `185.607 calc(1*100%) 20.98%` | CSS |
| `--teal-new-65` | `hsl(186.286 calc(1*100%) 20.588%/1)` | CSS |
| `--teal-new-65-hsl` | `186.286 calc(1*100%) 20.588%` | CSS |
| `--teal-new-66` | `hsl(185.882 calc(1*100%) 20%/1)` | CSS |
| `--teal-new-66-hsl` | `185.882 calc(1*100%) 20%` | CSS |
| `--teal-new-67` | `hsl(186.6 calc(1*100%) 19.608%/1)` | CSS |
| `--teal-new-67-hsl` | `186.6 calc(1*100%) 19.608%` | CSS |
| `--teal-new-68` | `hsl(186.186 calc(1*100%) 19.02%/1)` | CSS |
| `--teal-new-68-hsl` | `186.186 calc(1*100%) 19.02%` | CSS |
| `--teal-new-69` | `hsl(186.316 calc(1*100%) 18.627%/1)` | CSS |
| `--teal-new-69-hsl` | `186.316 calc(1*100%) 18.627%` | CSS |
| `--teal-new-7` | `hsl(186.176 calc(1*75.556%) 82.353%/1)` | CSS |
| `--teal-new-7-hsl` | `186.176 calc(1*75.556%) 82.353%` | CSS |
| `--teal-new-70` | `hsl(186.522 calc(1*100%) 18.039%/1)` | CSS |
| `--teal-new-70-hsl` | `186.522 calc(1*100%) 18.039%` | CSS |
| `--teal-new-71` | `hsl(186.667 calc(1*100%) 17.647%/1)` | CSS |
| `--teal-new-71-hsl` | `186.667 calc(1*100%) 17.647%` | CSS |
| `--teal-new-72` | `hsl(186.818 calc(1*100%) 17.255%/1)` | CSS |
| `--teal-new-72-hsl` | `186.818 calc(1*100%) 17.255%` | CSS |
| `--teal-new-73` | `hsl(187.059 calc(1*100%) 16.667%/1)` | CSS |
| `--teal-new-73-hsl` | `187.059 calc(1*100%) 16.667%` | CSS |
| `--teal-new-74` | `hsl(187.229 calc(1*100%) 16.275%/1)` | CSS |
| `--teal-new-74-hsl` | `187.229 calc(1*100%) 16.275%` | CSS |
| `--teal-new-75` | `hsl(186.75 calc(1*100%) 15.686%/1)` | CSS |
| `--teal-new-75-hsl` | `186.75 calc(1*100%) 15.686%` | CSS |
| `--teal-new-76` | `hsl(187.692 calc(1*100%) 15.294%/1)` | CSS |
| `--teal-new-76-hsl` | `187.692 calc(1*100%) 15.294%` | CSS |
| `--teal-new-77` | `hsl(187.895 calc(1*100%) 14.902%/1)` | CSS |
| `--teal-new-77-hsl` | `187.895 calc(1*100%) 14.902%` | CSS |
| `--teal-new-78` | `hsl(187.397 calc(1*100%) 14.314%/1)` | CSS |
| `--teal-new-78-hsl` | `187.397 calc(1*100%) 14.314%` | CSS |
| `--teal-new-79` | `hsl(188.451 calc(1*100%) 13.922%/1)` | CSS |
| `--teal-new-79-hsl` | `188.451 calc(1*100%) 13.922%` | CSS |
| `--teal-new-8` | `hsl(186 calc(1*72.917%) 81.176%/1)` | CSS |
| `--teal-new-8-hsl` | `186 calc(1*72.917%) 81.176%` | CSS |
| `--teal-new-80` | `hsl(188.696 calc(1*100%) 13.529%/1)` | CSS |
| `--teal-new-80-hsl` | `188.696 calc(1*100%) 13.529%` | CSS |
| `--teal-new-81` | `hsl(188.182 calc(1*100%) 12.941%/1)` | CSS |
| `--teal-new-81-hsl` | `188.182 calc(1*100%) 12.941%` | CSS |
| `--teal-new-82` | `hsl(188.438 calc(1*100%) 12.549%/1)` | CSS |
| `--teal-new-82-hsl` | `188.438 calc(1*100%) 12.549%` | CSS |
| `--teal-new-83` | `hsl(189.677 calc(1*100%) 12.157%/1)` | CSS |
| `--teal-new-83-hsl` | `189.677 calc(1*100%) 12.157%` | CSS |
| `--teal-new-84` | `hsl(189.153 calc(1*100%) 11.569%/1)` | CSS |
| `--teal-new-84-hsl` | `189.153 calc(1*100%) 11.569%` | CSS |
| `--teal-new-85` | `hsl(189.474 calc(1*100%) 11.176%/1)` | CSS |
| `--teal-new-85-hsl` | `189.474 calc(1*100%) 11.176%` | CSS |
| `--teal-new-86` | `hsl(189.818 calc(1*100%) 10.784%/1)` | CSS |
| `--teal-new-86-hsl` | `189.818 calc(1*100%) 10.784%` | CSS |
| `--teal-new-87` | `hsl(190.189 calc(1*100%) 10.392%/1)` | CSS |
| `--teal-new-87-hsl` | `190.189 calc(1*100%) 10.392%` | CSS |
| `--teal-new-88` | `hsl(190.588 calc(1*100%) 10%/1)` | CSS |
| `--teal-new-88-hsl` | `190.588 calc(1*100%) 10%` | CSS |
| `--teal-new-89` | `hsl(191.25 calc(1*100%) 9.412%/1)` | CSS |
| `--teal-new-89-hsl` | `191.25 calc(1*100%) 9.412%` | CSS |
| `--teal-new-9` | `hsl(185.915 calc(1*68.932%) 79.804%/1)` | CSS |
| `--teal-new-9-hsl` | `185.915 calc(1*68.932%) 79.804%` | CSS |
| `--teal-new-90` | `hsl(191.739 calc(1*100%) 9.02%/1)` | CSS |
| `--teal-new-90-hsl` | `191.739 calc(1*100%) 9.02%` | CSS |
| `--teal-new-91` | `hsl(192.273 calc(1*100%) 8.627%/1)` | CSS |
| `--teal-new-91-hsl` | `192.273 calc(1*100%) 8.627%` | CSS |
| `--teal-new-92` | `hsl(192.857 calc(1*100%) 8.235%/1)` | CSS |
| `--teal-new-92-hsl` | `192.857 calc(1*100%) 8.235%` | CSS |
| `--teal-new-93` | `hsl(193.5 calc(1*100%) 7.843%/1)` | CSS |
| `--teal-new-93-hsl` | `193.5 calc(1*100%) 7.843%` | CSS |
| `--teal-new-94` | `hsl(194.211 calc(1*100%) 7.451%/1)` | CSS |
| `--teal-new-94-hsl` | `194.211 calc(1*100%) 7.451%` | CSS |
| `--teal-new-95` | `hsl(195 calc(1*100%) 7.059%/1)` | CSS |
| `--teal-new-95-hsl` | `195 calc(1*100%) 7.059%` | CSS |
| `--teal-new-96` | `hsl(194.545 calc(1*100%) 6.471%/1)` | CSS |
| `--teal-new-96-hsl` | `194.545 calc(1*100%) 6.471%` | CSS |
| `--teal-new-97` | `hsl(197.419 calc(1*100%) 6.078%/1)` | CSS |
| `--teal-new-97-hsl` | `197.419 calc(1*100%) 6.078%` | CSS |
| `--teal-new-98` | `hsl(197.143 calc(1*100%) 5.49%/1)` | CSS |
| `--teal-new-98-hsl` | `197.143 calc(1*100%) 5.49%` | CSS |
| `--teal-new-99` | `hsl(199.2 calc(1*100%) 4.902%/1)` | CSS |
| `--teal-new-99-hsl` | `199.2 calc(1*100%) 4.902%` | CSS |
| `OPACITY_TEAL_1` | `#00848f05` | JS |
| `OPACITY_TEAL_12` | `#00848f1f` | JS |
| `OPACITY_TEAL_16` | `#00848f29` | JS |
| `OPACITY_TEAL_20` | `#00848f33` | JS |
| `OPACITY_TEAL_24` | `#00848f3d` | JS |
| `OPACITY_TEAL_28` | `#00848f47` | JS |
| `OPACITY_TEAL_32` | `#00848f52` | JS |
| `OPACITY_TEAL_36` | `#00848f5c` | JS |
| `OPACITY_TEAL_4` | `#00848f0a` | JS |
| `OPACITY_TEAL_40` | `#00848f66` | JS |
| `OPACITY_TEAL_44` | `#00848f70` | JS |
| `OPACITY_TEAL_48` | `#00848f7a` | JS |
| `OPACITY_TEAL_52` | `#00848f85` | JS |
| `OPACITY_TEAL_56` | `#00848f8f` | JS |
| `OPACITY_TEAL_60` | `#00848f99` | JS |
| `OPACITY_TEAL_64` | `#00848fa3` | JS |
| `OPACITY_TEAL_68` | `#00848fad` | JS |
| `OPACITY_TEAL_72` | `#00848fb8` | JS |
| `OPACITY_TEAL_76` | `#00848fc2` | JS |
| `OPACITY_TEAL_8` | `#00848f14` | JS |
| `OPACITY_TEAL_80` | `#00848fcc` | JS |
| `OPACITY_TEAL_84` | `#00848fd6` | JS |
| `OPACITY_TEAL_88` | `#00848fe0` | JS |
| `OPACITY_TEAL_92` | `#00848feb` | JS |
| `OPACITY_TEAL_96` | `#00848ff5` | JS |
| `TEAL_100` | `#f4fbfd` | JS |
| `TEAL_130` | `#e9f9fd` | JS |
| `TEAL_160` | `#d3f4fb` | JS |
| `TEAL_200` | `#b1eff9` | JS |
| `TEAL_230` | `#7ee7f7` | JS |
| `TEAL_260` | `#5edbef` | JS |
| `TEAL_300` | `#47cbe2` | JS |
| `TEAL_330` | `#35bcd5` | JS |
| `TEAL_345` | `#2eb0c9` | JS |
| `TEAL_360` | `#289fb6` | JS |
| `TEAL_400` | `#248da1` | JS |
| `TEAL_430` | `#207a8d` | JS |
| `TEAL_460` | `#1b6b7c` | JS |
| `TEAL_500` | `#175e6d` | JS |
| `TEAL_530` | `#13525f` | JS |
| `TEAL_560` | `#0f4954` | JS |
| `TEAL_600` | `#0c4049` | JS |
| `TEAL_630` | `#0a3942` | JS |
| `TEAL_660` | `#08333a` | JS |
| `TEAL_700` | `#062d34` | JS |
| `TEAL_730` | `#05272d` | JS |
| `TEAL_760` | `#042227` | JS |
| `TEAL_800` | `#031d21` | JS |
| `TEAL_830` | `#02191d` | JS |
| `TEAL_860` | `#021619` | JS |
| `TEAL_900` | `#011215` | JS |
| `TEAL_NEW_1` | `#cafcff` | JS |
| `TEAL_NEW_10` | `#a3e6ed` | JS |
| `TEAL_NEW_100` | `#000d16` | JS |
| `TEAL_NEW_11` | `#9fe3eb` | JS |
| `TEAL_NEW_12` | `#9be1e8` | JS |
| `TEAL_NEW_13` | `#97dfe6` | JS |
| `TEAL_NEW_14` | `#93dce4` | JS |
| `TEAL_NEW_15` | `#8edae1` | JS |
| `TEAL_NEW_16` | `#8ad7df` | JS |
| `TEAL_NEW_17` | `#86d5dd` | JS |
| `TEAL_NEW_18` | `#82d2db` | JS |
| `TEAL_NEW_19` | `#7dd0d8` | JS |
| `TEAL_NEW_2` | `#c6f9ff` | JS |
| `TEAL_NEW_20` | `#79cdd6` | JS |
| `TEAL_NEW_21` | `#75cbd4` | JS |
| `TEAL_NEW_22` | `#71c9d1` | JS |
| `TEAL_NEW_23` | `#6cc6cf` | JS |
| `TEAL_NEW_24` | `#68c4cd` | JS |
| `TEAL_NEW_25` | `#63c1ca` | JS |
| `TEAL_NEW_26` | `#5fbfc8` | JS |
| `TEAL_NEW_27` | `#5abcc6` | JS |
| `TEAL_NEW_28` | `#56bac3` | JS |
| `TEAL_NEW_29` | `#51b8c1` | JS |
| `TEAL_NEW_3` | `#c2f7fd` | JS |
| `TEAL_NEW_30` | `#4cb5bf` | JS |
| `TEAL_NEW_31` | `#47b3bc` | JS |
| `TEAL_NEW_32` | `#41b0ba` | JS |
| `TEAL_NEW_33` | `#3caeb8` | JS |
| `TEAL_NEW_34` | `#36abb6` | JS |
| `TEAL_NEW_35` | `#2fa9b3` | JS |
| `TEAL_NEW_36` | `#28a7b1` | JS |
| `TEAL_NEW_37` | `#20a4af` | JS |
| `TEAL_NEW_38` | `#15a2ac` | JS |
| `TEAL_NEW_39` | `#049faa` | JS |
| `TEAL_NEW_4` | `#bdf4fb` | JS |
| `TEAL_NEW_40` | `#009da8` | JS |
| `TEAL_NEW_41` | `#009ba6` | JS |
| `TEAL_NEW_42` | `#0098a3` | JS |
| `TEAL_NEW_43` | `#0096a1` | JS |
| `TEAL_NEW_44` | `#00939f` | JS |
| `TEAL_NEW_45` | `#00919d` | JS |
| `TEAL_NEW_46` | `#008f9a` | JS |
| `TEAL_NEW_47` | `#008c97` | JS |
| `TEAL_NEW_48` | `#008995` | JS |
| `TEAL_NEW_49` | `#008692` | JS |
| `TEAL_NEW_5` | `#b9f2f8` | JS |
| `TEAL_NEW_50` | `#00848f` | JS |
| `TEAL_NEW_51` | `#00818c` | JS |
| `TEAL_NEW_52` | `#007f8a` | JS |
| `TEAL_NEW_53` | `#007c87` | JS |
| `TEAL_NEW_54` | `#007a84` | JS |
| `TEAL_NEW_55` | `#007782` | JS |
| `TEAL_NEW_56` | `#00757f` | JS |
| `TEAL_NEW_57` | `#00727d` | JS |
| `TEAL_NEW_58` | `#00707a` | JS |
| `TEAL_NEW_59` | `#006d78` | JS |
| `TEAL_NEW_6` | `#b5f0f6` | JS |
| `TEAL_NEW_60` | `#006b75` | JS |
| `TEAL_NEW_61` | `#006873` | JS |
| `TEAL_NEW_62` | `#006670` | JS |
| `TEAL_NEW_63` | `#00636e` | JS |
| `TEAL_NEW_64` | `#00616b` | JS |
| `TEAL_NEW_65` | `#005e69` | JS |
| `TEAL_NEW_66` | `#005c66` | JS |
| `TEAL_NEW_67` | `#005964` | JS |
| `TEAL_NEW_68` | `#005761` | JS |
| `TEAL_NEW_69` | `#00555f` | JS |
| `TEAL_NEW_7` | `#b0edf4` | JS |
| `TEAL_NEW_70` | `#00525c` | JS |
| `TEAL_NEW_71` | `#00505a` | JS |
| `TEAL_NEW_72` | `#004e58` | JS |
| `TEAL_NEW_73` | `#004b55` | JS |
| `TEAL_NEW_74` | `#004953` | JS |
| `TEAL_NEW_75` | `#004750` | JS |
| `TEAL_NEW_76` | `#00444e` | JS |
| `TEAL_NEW_77` | `#00424c` | JS |
| `TEAL_NEW_78` | `#004049` | JS |
| `TEAL_NEW_79` | `#003d47` | JS |
| `TEAL_NEW_8` | `#acebf2` | JS |
| `TEAL_NEW_80` | `#003b45` | JS |
| `TEAL_NEW_81` | `#003942` | JS |
| `TEAL_NEW_82` | `#003740` | JS |
| `TEAL_NEW_83` | `#00343e` | JS |
| `TEAL_NEW_84` | `#00323b` | JS |
| `TEAL_NEW_85` | `#003039` | JS |
| `TEAL_NEW_86` | `#002e37` | JS |
| `TEAL_NEW_87` | `#002c35` | JS |
| `TEAL_NEW_88` | `#002a33` | JS |
| `TEAL_NEW_89` | `#002730` | JS |
| `TEAL_NEW_9` | `#a8e8ef` | JS |
| `TEAL_NEW_90` | `#00252e` | JS |
| `TEAL_NEW_91` | `#00232c` | JS |
| `TEAL_NEW_92` | `#00212a` | JS |
| `TEAL_NEW_93` | `#001f28` | JS |
| `TEAL_NEW_94` | `#001d26` | JS |
| `TEAL_NEW_95` | `#001b24` | JS |
| `TEAL_NEW_96` | `#001921` | JS |
| `TEAL_NEW_97` | `#00161f` | JS |
| `TEAL_NEW_98` | `#00141c` | JS |
| `TEAL_NEW_99` | `#001119` | JS |

*Total: 455 variables*

---

## Colors - Neutral

| Variable | Value | Type |
|----------|-------|------|
| `--neutral-1` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--neutral-1-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--neutral-10` | `hsl(240 calc(1*4.478%) 86.863%/1)` | CSS |
| `--neutral-10-hsl` | `240 calc(1*4.478%) 86.863%` | CSS |
| `--neutral-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--neutral-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--neutral-11` | `hsl(225 calc(1*5.405%) 85.49%/1)` | CSS |
| `--neutral-11-hsl` | `225 calc(1*5.405%) 85.49%` | CSS |
| `--neutral-12` | `hsl(225 calc(1*4.878%) 83.922%/1)` | CSS |
| `--neutral-12-hsl` | `225 calc(1*4.878%) 83.922%` | CSS |
| `--neutral-13` | `hsl(240 calc(1*4.545%) 82.745%/1)` | CSS |
| `--neutral-13-hsl` | `240 calc(1*4.545%) 82.745%` | CSS |
| `--neutral-14` | `hsl(240 calc(1*4.167%) 81.176%/1)` | CSS |
| `--neutral-14-hsl` | `240 calc(1*4.167%) 81.176%` | CSS |
| `--neutral-15` | `hsl(228 calc(1*4.854%) 79.804%/1)` | CSS |
| `--neutral-15-hsl` | `228 calc(1*4.854%) 79.804%` | CSS |
| `--neutral-16` | `hsl(228 calc(1*4.505%) 78.235%/1)` | CSS |
| `--neutral-16-hsl` | `228 calc(1*4.505%) 78.235%` | CSS |
| `--neutral-17` | `hsl(240 calc(1*4.274%) 77.059%/1)` | CSS |
| `--neutral-17-hsl` | `240 calc(1*4.274%) 77.059%` | CSS |
| `--neutral-18` | `hsl(240 calc(1*4%) 75.49%/1)` | CSS |
| `--neutral-18-hsl` | `240 calc(1*4%) 75.49%` | CSS |
| `--neutral-19` | `hsl(230 calc(1*4.545%) 74.118%/1)` | CSS |
| `--neutral-19-hsl` | `230 calc(1*4.545%) 74.118%` | CSS |
| `--neutral-2` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--neutral-2-hsl` | `0 calc(1*0%) 98.431%` | CSS |
| `--neutral-20` | `hsl(230 calc(1*4.286%) 72.549%/1)` | CSS |
| `--neutral-20-hsl` | `230 calc(1*4.286%) 72.549%` | CSS |
| `--neutral-21` | `hsl(240 calc(1*4.11%) 71.373%/1)` | CSS |
| `--neutral-21-hsl` | `240 calc(1*4.11%) 71.373%` | CSS |
| `--neutral-22` | `hsl(231.429 calc(1*4.575%) 70%/1)` | CSS |
| `--neutral-22-hsl` | `231.429 calc(1*4.575%) 70%` | CSS |
| `--neutral-23` | `hsl(231.429 calc(1*4.348%) 68.431%/1)` | CSS |
| `--neutral-23-hsl` | `231.429 calc(1*4.348%) 68.431%` | CSS |
| `--neutral-24` | `hsl(240 calc(1*4.192%) 67.255%/1)` | CSS |
| `--neutral-24-hsl` | `240 calc(1*4.192%) 67.255%` | CSS |
| `--neutral-25` | `hsl(231.429 calc(1*4%) 65.686%/1)` | CSS |
| `--neutral-25-hsl` | `231.429 calc(1*4%) 65.686%` | CSS |
| `--neutral-26` | `hsl(232.5 calc(1*4.396%) 64.314%/1)` | CSS |
| `--neutral-26-hsl` | `232.5 calc(1*4.396%) 64.314%` | CSS |
| `--neutral-27` | `hsl(232.5 calc(1*4.255%) 63.137%/1)` | CSS |
| `--neutral-27-hsl` | `232.5 calc(1*4.255%) 63.137%` | CSS |
| `--neutral-28` | `hsl(232.5 calc(1*4.082%) 61.569%/1)` | CSS |
| `--neutral-28-hsl` | `232.5 calc(1*4.082%) 61.569%` | CSS |
| `--neutral-29` | `hsl(232.5 calc(1*3.96%) 60.392%/1)` | CSS |
| `--neutral-29-hsl` | `232.5 calc(1*3.96%) 60.392%` | CSS |
| `--neutral-3` | `hsl(240 calc(1*6.667%) 97.059%/1)` | CSS |
| `--neutral-3-hsl` | `240 calc(1*6.667%) 97.059%` | CSS |
| `--neutral-30` | `hsl(233.333 calc(1*4.306%) 59.02%/1)` | CSS |
| `--neutral-30-hsl` | `233.333 calc(1*4.306%) 59.02%` | CSS |
| `--neutral-31` | `hsl(232.5 calc(1*3.704%) 57.647%/1)` | CSS |
| `--neutral-31-hsl` | `232.5 calc(1*3.704%) 57.647%` | CSS |
| `--neutral-32` | `hsl(233.333 calc(1*4.036%) 56.275%/1)` | CSS |
| `--neutral-32-hsl` | `233.333 calc(1*4.036%) 56.275%` | CSS |
| `--neutral-33` | `hsl(233.333 calc(1*3.93%) 55.098%/1)` | CSS |
| `--neutral-33-hsl` | `233.333 calc(1*3.93%) 55.098%` | CSS |
| `--neutral-34` | `hsl(233.333 calc(1*3.797%) 53.529%/1)` | CSS |
| `--neutral-34-hsl` | `233.333 calc(1*3.797%) 53.529%` | CSS |
| `--neutral-35` | `hsl(233.333 calc(1*3.704%) 52.353%/1)` | CSS |
| `--neutral-35-hsl` | `233.333 calc(1*3.704%) 52.353%` | CSS |
| `--neutral-36` | `hsl(234 calc(1*4%) 50.98%/1)` | CSS |
| `--neutral-36-hsl` | `234 calc(1*4%) 50.98%` | CSS |
| `--neutral-37` | `hsl(233.333 calc(1*3.557%) 49.608%/1)` | CSS |
| `--neutral-37-hsl` | `233.333 calc(1*3.557%) 49.608%` | CSS |
| `--neutral-38` | `hsl(234 calc(1*4.065%) 48.235%/1)` | CSS |
| `--neutral-38-hsl` | `234 calc(1*4.065%) 48.235%` | CSS |
| `--neutral-39` | `hsl(234 calc(1*4.167%) 47.059%/1)` | CSS |
| `--neutral-39-hsl` | `234 calc(1*4.167%) 47.059%` | CSS |
| `--neutral-4` | `hsl(240 calc(1*4.348%) 95.49%/1)` | CSS |
| `--neutral-4-hsl` | `240 calc(1*4.348%) 95.49%` | CSS |
| `--neutral-40` | `hsl(234 calc(1*4.274%) 45.882%/1)` | CSS |
| `--neutral-40-hsl` | `234 calc(1*4.274%) 45.882%` | CSS |
| `--neutral-41` | `hsl(234 calc(1*4.425%) 44.314%/1)` | CSS |
| `--neutral-41-hsl` | `234 calc(1*4.425%) 44.314%` | CSS |
| `--neutral-42` | `hsl(234 calc(1*4.545%) 43.137%/1)` | CSS |
| `--neutral-42-hsl` | `234 calc(1*4.545%) 43.137%` | CSS |
| `--neutral-43` | `hsl(234 calc(1*4.673%) 41.961%/1)` | CSS |
| `--neutral-43-hsl` | `234 calc(1*4.673%) 41.961%` | CSS |
| `--neutral-44` | `hsl(234.545 calc(1*5.314%) 40.588%/1)` | CSS |
| `--neutral-44-hsl` | `234.545 calc(1*5.314%) 40.588%` | CSS |
| `--neutral-45` | `hsl(234.545 calc(1*5.473%) 39.412%/1)` | CSS |
| `--neutral-45-hsl` | `234.545 calc(1*5.473%) 39.412%` | CSS |
| `--neutral-46` | `hsl(234.545 calc(1*5.641%) 38.235%/1)` | CSS |
| `--neutral-46-hsl` | `234.545 calc(1*5.641%) 38.235%` | CSS |
| `--neutral-47` | `hsl(234 calc(1*5.319%) 36.863%/1)` | CSS |
| `--neutral-47-hsl` | `234 calc(1*5.319%) 36.863%` | CSS |
| `--neutral-48` | `hsl(234.545 calc(1*6.077%) 35.49%/1)` | CSS |
| `--neutral-48-hsl` | `234.545 calc(1*6.077%) 35.49%` | CSS |
| `--neutral-49` | `hsl(234.545 calc(1*6.286%) 34.314%/1)` | CSS |
| `--neutral-49-hsl` | `234.545 calc(1*6.286%) 34.314%` | CSS |
| `--neutral-5` | `hsl(240 calc(1*6.667%) 94.118%/1)` | CSS |
| `--neutral-5-hsl` | `240 calc(1*6.667%) 94.118%` | CSS |
| `--neutral-50` | `hsl(234.545 calc(1*6.509%) 33.137%/1)` | CSS |
| `--neutral-50-hsl` | `234.545 calc(1*6.509%) 33.137%` | CSS |
| `--neutral-51` | `hsl(234.545 calc(1*6.667%) 32.353%/1)` | CSS |
| `--neutral-51-hsl` | `234.545 calc(1*6.667%) 32.353%` | CSS |
| `--neutral-52` | `hsl(234 calc(1*6.173%) 31.765%/1)` | CSS |
| `--neutral-52-hsl` | `234 calc(1*6.173%) 31.765%` | CSS |
| `--neutral-53` | `hsl(234.545 calc(1*6.918%) 31.176%/1)` | CSS |
| `--neutral-53-hsl` | `234.545 calc(1*6.918%) 31.176%` | CSS |
| `--neutral-54` | `hsl(234 calc(1*6.41%) 30.588%/1)` | CSS |
| `--neutral-54-hsl` | `234 calc(1*6.41%) 30.588%` | CSS |
| `--neutral-55` | `hsl(234 calc(1*6.579%) 29.804%/1)` | CSS |
| `--neutral-55-hsl` | `234 calc(1*6.579%) 29.804%` | CSS |
| `--neutral-56` | `hsl(233.333 calc(1*6.04%) 29.216%/1)` | CSS |
| `--neutral-56-hsl` | `233.333 calc(1*6.04%) 29.216%` | CSS |
| `--neutral-57` | `hsl(233.333 calc(1*6.207%) 28.431%/1)` | CSS |
| `--neutral-57-hsl` | `233.333 calc(1*6.207%) 28.431%` | CSS |
| `--neutral-58` | `hsl(240 calc(1*6.294%) 28.039%/1)` | CSS |
| `--neutral-58-hsl` | `240 calc(1*6.294%) 28.039%` | CSS |
| `--neutral-59` | `hsl(233.333 calc(1*6.475%) 27.255%/1)` | CSS |
| `--neutral-59-hsl` | `233.333 calc(1*6.475%) 27.255%` | CSS |
| `--neutral-6` | `hsl(210 calc(1*5.263%) 92.549%/1)` | CSS |
| `--neutral-6-hsl` | `210 calc(1*5.263%) 92.549%` | CSS |
| `--neutral-60` | `hsl(233.333 calc(1*6.667%) 26.471%/1)` | CSS |
| `--neutral-60-hsl` | `233.333 calc(1*6.667%) 26.471%` | CSS |
| `--neutral-61` | `hsl(232.5 calc(1*6.061%) 25.882%/1)` | CSS |
| `--neutral-61-hsl` | `232.5 calc(1*6.061%) 25.882%` | CSS |
| `--neutral-62` | `hsl(233.333 calc(1*6.977%) 25.294%/1)` | CSS |
| `--neutral-62-hsl` | `233.333 calc(1*6.977%) 25.294%` | CSS |
| `--neutral-63` | `hsl(232.5 calc(1*6.349%) 24.706%/1)` | CSS |
| `--neutral-63-hsl` | `232.5 calc(1*6.349%) 24.706%` | CSS |
| `--neutral-64` | `hsl(232.5 calc(1*6.557%) 23.922%/1)` | CSS |
| `--neutral-64-hsl` | `232.5 calc(1*6.557%) 23.922%` | CSS |
| `--neutral-65` | `hsl(232.5 calc(1*6.667%) 23.529%/1)` | CSS |
| `--neutral-65-hsl` | `232.5 calc(1*6.667%) 23.529%` | CSS |
| `--neutral-66` | `hsl(232.5 calc(1*6.897%) 22.745%/1)` | CSS |
| `--neutral-66-hsl` | `232.5 calc(1*6.897%) 22.745%` | CSS |
| `--neutral-67` | `hsl(231.429 calc(1*6.195%) 22.157%/1)` | CSS |
| `--neutral-67-hsl` | `231.429 calc(1*6.195%) 22.157%` | CSS |
| `--neutral-68` | `hsl(240 calc(1*5.455%) 21.569%/1)` | CSS |
| `--neutral-68-hsl` | `240 calc(1*5.455%) 21.569%` | CSS |
| `--neutral-69` | `hsl(231.429 calc(1*6.542%) 20.98%/1)` | CSS |
| `--neutral-69-hsl` | `231.429 calc(1*6.542%) 20.98%` | CSS |
| `--neutral-7` | `hsl(240 calc(1*4.545%) 91.373%/1)` | CSS |
| `--neutral-7-hsl` | `240 calc(1*4.545%) 91.373%` | CSS |
| `--neutral-70` | `hsl(240 calc(1*5.769%) 20.392%/1)` | CSS |
| `--neutral-70-hsl` | `240 calc(1*5.769%) 20.392%` | CSS |
| `--neutral-71` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--neutral-71-hsl` | `230 calc(1*6%) 19.608%` | CSS |
| `--neutral-72` | `hsl(240 calc(1*6.122%) 19.216%/1)` | CSS |
| `--neutral-72-hsl` | `240 calc(1*6.122%) 19.216%` | CSS |
| `--neutral-73` | `hsl(230 calc(1*6.383%) 18.431%/1)` | CSS |
| `--neutral-73-hsl` | `230 calc(1*6.383%) 18.431%` | CSS |
| `--neutral-74` | `hsl(240 calc(1*6.522%) 18.039%/1)` | CSS |
| `--neutral-74-hsl` | `240 calc(1*6.522%) 18.039%` | CSS |
| `--neutral-75` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--neutral-75-hsl` | `230 calc(1*6.818%) 17.255%` | CSS |
| `--neutral-76` | `hsl(240 calc(1*5.882%) 16.667%/1)` | CSS |
| `--neutral-76-hsl` | `240 calc(1*5.882%) 16.667%` | CSS |
| `--neutral-77` | `hsl(240 calc(1*6.024%) 16.275%/1)` | CSS |
| `--neutral-77-hsl` | `240 calc(1*6.024%) 16.275%` | CSS |
| `--neutral-78` | `hsl(228 calc(1*6.329%) 15.49%/1)` | CSS |
| `--neutral-78-hsl` | `228 calc(1*6.329%) 15.49%` | CSS |
| `--neutral-79` | `hsl(240 calc(1*6.494%) 15.098%/1)` | CSS |
| `--neutral-79-hsl` | `240 calc(1*6.494%) 15.098%` | CSS |
| `--neutral-8` | `hsl(240 calc(1*3.846%) 89.804%/1)` | CSS |
| `--neutral-8-hsl` | `240 calc(1*3.846%) 89.804%` | CSS |
| `--neutral-80` | `hsl(228 calc(1*6.849%) 14.314%/1)` | CSS |
| `--neutral-80-hsl` | `228 calc(1*6.849%) 14.314%` | CSS |
| `--neutral-81` | `hsl(240 calc(1*5.714%) 13.725%/1)` | CSS |
| `--neutral-81-hsl` | `240 calc(1*5.714%) 13.725%` | CSS |
| `--neutral-82` | `hsl(240 calc(1*5.882%) 13.333%/1)` | CSS |
| `--neutral-82-hsl` | `240 calc(1*5.882%) 13.333%` | CSS |
| `--neutral-83` | `hsl(225 calc(1*6.25%) 12.549%/1)` | CSS |
| `--neutral-83-hsl` | `225 calc(1*6.25%) 12.549%` | CSS |
| `--neutral-84` | `hsl(240 calc(1*6.452%) 12.157%/1)` | CSS |
| `--neutral-84-hsl` | `240 calc(1*6.452%) 12.157%` | CSS |
| `--neutral-85` | `hsl(225 calc(1*6.897%) 11.373%/1)` | CSS |
| `--neutral-85-hsl` | `225 calc(1*6.897%) 11.373%` | CSS |
| `--neutral-86` | `hsl(240 calc(1*7.143%) 10.98%/1)` | CSS |
| `--neutral-86-hsl` | `240 calc(1*7.143%) 10.98%` | CSS |
| `--neutral-87` | `hsl(240 calc(1*5.66%) 10.392%/1)` | CSS |
| `--neutral-87-hsl` | `240 calc(1*5.66%) 10.392%` | CSS |
| `--neutral-88` | `hsl(225 calc(1*8%) 9.804%/1)` | CSS |
| `--neutral-88-hsl` | `225 calc(1*8%) 9.804%` | CSS |
| `--neutral-89` | `hsl(240 calc(1*6.383%) 9.216%/1)` | CSS |
| `--neutral-89-hsl` | `240 calc(1*6.383%) 9.216%` | CSS |
| `--neutral-9` | `hsl(240 calc(1*5.085%) 88.431%/1)` | CSS |
| `--neutral-9-hsl` | `240 calc(1*5.085%) 88.431%` | CSS |
| `--neutral-90` | `hsl(240 calc(1*6.667%) 8.824%/1)` | CSS |
| `--neutral-90-hsl` | `240 calc(1*6.667%) 8.824%` | CSS |
| `--neutral-91` | `hsl(220 calc(1*7.317%) 8.039%/1)` | CSS |
| `--neutral-91-hsl` | `220 calc(1*7.317%) 8.039%` | CSS |
| `--neutral-92` | `hsl(240 calc(1*5.263%) 7.451%/1)` | CSS |
| `--neutral-92-hsl` | `240 calc(1*5.263%) 7.451%` | CSS |
| `--neutral-93` | `hsl(240 calc(1*8.571%) 6.863%/1)` | CSS |
| `--neutral-93-hsl` | `240 calc(1*8.571%) 6.863%` | CSS |
| `--neutral-94` | `hsl(240 calc(1*6.667%) 5.882%/1)` | CSS |
| `--neutral-94-hsl` | `240 calc(1*6.667%) 5.882%` | CSS |
| `--neutral-95` | `hsl(240 calc(1*7.692%) 5.098%/1)` | CSS |
| `--neutral-95-hsl` | `240 calc(1*7.692%) 5.098%` | CSS |
| `--neutral-96` | `hsl(240 calc(1*9.091%) 4.314%/1)` | CSS |
| `--neutral-96-hsl` | `240 calc(1*9.091%) 4.314%` | CSS |
| `--neutral-97` | `hsl(240 calc(1*12.5%) 3.137%/1)` | CSS |
| `--neutral-97-hsl` | `240 calc(1*12.5%) 3.137%` | CSS |
| `--neutral-98` | `hsl(240 calc(1*9.091%) 2.157%/1)` | CSS |
| `--neutral-98-hsl` | `240 calc(1*9.091%) 2.157%` | CSS |
| `--neutral-99` | `hsl(240 calc(1*20%) 0.98%/1)` | CSS |
| `--neutral-99-hsl` | `240 calc(1*20%) 0.98%` | CSS |
| `NEUTRAL_1` | `#ffffff` | JS |
| `NEUTRAL_10` | `#dcdcdf` | JS |
| `NEUTRAL_100` | `#000000` | JS |
| `NEUTRAL_11` | `#d8d9dc` | JS |
| `NEUTRAL_12` | `#d4d5d8` | JS |
| `NEUTRAL_13` | `#d1d1d5` | JS |
| `NEUTRAL_14` | `#cdcdd1` | JS |
| `NEUTRAL_15` | `#c9cace` | JS |
| `NEUTRAL_16` | `#c5c6ca` | JS |
| `NEUTRAL_17` | `#c2c2c7` | JS |
| `NEUTRAL_18` | `#bebec3` | JS |
| `NEUTRAL_19` | `#babbc0` | JS |
| `NEUTRAL_2` | `#fbfbfb` | JS |
| `NEUTRAL_20` | `#b6b7bc` | JS |
| `NEUTRAL_21` | `#b3b3b9` | JS |
| `NEUTRAL_22` | `#afb0b6` | JS |
| `NEUTRAL_23` | `#abacb2` | JS |
| `NEUTRAL_24` | `#a8a8af` | JS |
| `NEUTRAL_25` | `#a4a5ab` | JS |
| `NEUTRAL_26` | `#a0a1a8` | JS |
| `NEUTRAL_27` | `#9d9ea5` | JS |
| `NEUTRAL_28` | `#999aa1` | JS |
| `NEUTRAL_29` | `#96979e` | JS |
| `NEUTRAL_3` | `#f7f7f8` | JS |
| `NEUTRAL_30` | `#92939b` | JS |
| `NEUTRAL_31` | `#8f9097` | JS |
| `NEUTRAL_32` | `#8b8c94` | JS |
| `NEUTRAL_33` | `#888991` | JS |
| `NEUTRAL_34` | `#84858d` | JS |
| `NEUTRAL_35` | `#81828a` | JS |
| `NEUTRAL_36` | `#7d7e87` | JS |
| `NEUTRAL_37` | `#7a7b83` | JS |
| `NEUTRAL_38` | `#767780` | JS |
| `NEUTRAL_39` | `#73747d` | JS |
| `NEUTRAL_4` | `#f3f3f4` | JS |
| `NEUTRAL_40` | `#70717a` | JS |
| `NEUTRAL_41` | `#6c6d76` | JS |
| `NEUTRAL_42` | `#696a73` | JS |
| `NEUTRAL_43` | `#666770` | JS |
| `NEUTRAL_44` | `#62636d` | JS |
| `NEUTRAL_45` | `#5f606a` | JS |
| `NEUTRAL_46` | `#5c5d67` | JS |
| `NEUTRAL_47` | `#595a63` | JS |
| `NEUTRAL_48` | `#555660` | JS |
| `NEUTRAL_49` | `#52535d` | JS |
| `NEUTRAL_5` | `#efeff1` | JS |
| `NEUTRAL_50` | `#4f505a` | JS |
| `NEUTRAL_51` | `#4d4e58` | JS |
| `NEUTRAL_52` | `#4c4d56` | JS |
| `NEUTRAL_53` | `#4a4b55` | JS |
| `NEUTRAL_54` | `#494a53` | JS |
| `NEUTRAL_55` | `#474851` | JS |
| `NEUTRAL_56` | `#46474f` | JS |
| `NEUTRAL_57` | `#44454d` | JS |
| `NEUTRAL_58` | `#43434c` | JS |
| `NEUTRAL_59` | `#41424a` | JS |
| `NEUTRAL_6` | `#ebeced` | JS |
| `NEUTRAL_60` | `#3f4048` | JS |
| `NEUTRAL_61` | `#3e3f46` | JS |
| `NEUTRAL_62` | `#3c3d45` | JS |
| `NEUTRAL_63` | `#3b3c43` | JS |
| `NEUTRAL_64` | `#393a41` | JS |
| `NEUTRAL_65` | `#383940` | JS |
| `NEUTRAL_66` | `#36373e` | JS |
| `NEUTRAL_67` | `#35363c` | JS |
| `NEUTRAL_68` | `#34343a` | JS |
| `NEUTRAL_69` | `#323339` | JS |
| `NEUTRAL_7` | `#e8e8ea` | JS |
| `NEUTRAL_70` | `#313137` | JS |
| `NEUTRAL_71` | `#2f3035` | JS |
| `NEUTRAL_72` | `#2e2e34` | JS |
| `NEUTRAL_73` | `#2c2d32` | JS |
| `NEUTRAL_74` | `#2b2b31` | JS |
| `NEUTRAL_75` | `#292a2f` | JS |
| `NEUTRAL_76` | `#28282d` | JS |
| `NEUTRAL_77` | `#27272c` | JS |
| `NEUTRAL_78` | `#25262a` | JS |
| `NEUTRAL_79` | `#242429` | JS |
| `NEUTRAL_8` | `#e4e4e6` | JS |
| `NEUTRAL_80` | `#222327` | JS |
| `NEUTRAL_81` | `#212125` | JS |
| `NEUTRAL_82` | `#202024` | JS |
| `NEUTRAL_83` | `#1e1f22` | JS |
| `NEUTRAL_84` | `#1d1d21` | JS |
| `NEUTRAL_85` | `#1b1c1f` | JS |
| `NEUTRAL_86` | `#1a1a1e` | JS |
| `NEUTRAL_87` | `#19191c` | JS |
| `NEUTRAL_88` | `#17181b` | JS |
| `NEUTRAL_89` | `#161619` | JS |
| `NEUTRAL_9` | `#e0e0e3` | JS |
| `NEUTRAL_90` | `#151518` | JS |
| `NEUTRAL_91` | `#131416` | JS |
| `NEUTRAL_92` | `#121214` | JS |
| `NEUTRAL_93` | `#101013` | JS |
| `NEUTRAL_94` | `#0e0e10` | JS |
| `NEUTRAL_95` | `#0c0c0e` | JS |
| `NEUTRAL_96` | `#0a0a0c` | JS |
| `NEUTRAL_97` | `#070709` | JS |
| `NEUTRAL_98` | `#050506` | JS |
| `NEUTRAL_99` | `#020203` | JS |

*Total: 300 variables*

---

## Guild & Channel

| Variable | Value | Type |
|----------|-------|------|
| `--channel-icon` | `color-mix(in oklab,hsl(233.333 calc(1*3.704%) 5...` | CSS |
| `--creator-revenue-locked-channel-icon` | `color-mix(in oklab,hsl(184.839 calc(1*50.82%) 4...` | CSS |
| `--custom-category-channel-space-before-category` | `16px` | CSS |
| `--custom-channel-attachment-upload-mini-attachment-size` | `78px` | CSS |
| `--custom-channel-attachment-upload-spoiler-blur-radius` | `44px` | CSS |
| `--custom-channel-call-participants-popout-padding-value` | `16px` | CSS |
| `--custom-channel-members-bg` | `color-mix(in oklab,hsl(240 calc(1*7.143%) 10.98...` | CSS |
| `--custom-channel-notice-icon-size` | `16px` | CSS |
| `--custom-channel-notice-padding` | `12px` | CSS |
| `--custom-demo-forum-channel-gap-size` | `8px` | CSS |
| `--custom-demo-forum-channel-padding-large` | `20px` | CSS |
| `--custom-demo-forum-channel-post-padding` | `12px` | CSS |
| `--custom-discover-static-guild-card-card-height` | `258px` | CSS |
| `--custom-emoji-picker-constants-guild-category-icon-margin-verical` | `8px` | CSS |
| `--custom-emoji-picker-constants-guild-category-icon-size` | `32px` | CSS |
| `--custom-folder-item-guild-icon-margin` | `8px` | CSS |
| `--custom-guild-boosting-marketing-progress-bar-end-markers-margin` | `4px` | CSS |
| `--custom-guild-boosting-marketing-progress-bar-marker-dimensions` | `32px` | CSS |
| `--custom-guild-boosting-marketing-progress-bar-marker-marker-dimensions` | `32px` | CSS |
| `--custom-guild-boosting-sidebar-display-conditional-bottom-margin` | `12px` | CSS |
| `--custom-guild-count-large-icon-size` | `20px` | CSS |
| `--custom-guild-count-small-icon-size` | `16px` | CSS |
| `--custom-guild-dialog-icon-padding` | `4px` | CSS |
| `--custom-guild-dialog-icon-size` | `84px` | CSS |
| `--custom-guild-dialog-popout-width` | `250px` | CSS |
| `--custom-guild-dialog-splash-ratio` | `1.77778` | CSS |
| `--custom-guild-directory-entry-card-card-height` | `274px` | CSS |
| `--custom-guild-directory-gutter-size` | `16px` | CSS |
| `--custom-guild-directory-max-page-width` | `1608px` | CSS |
| `--custom-guild-directory-min-card-width` | `248px` | CSS |
| `--custom-guild-directory-min-content-width` | `320px` | CSS |
| `--custom-guild-discovery-card-card-height` | `320px` | CSS |
| `--custom-guild-discovery-card-card-height-with-tags` | `350px` | CSS |
| `--custom-guild-discovery-gutter-size` | `16px` | CSS |
| `--custom-guild-discovery-max-page-width` | `1608px` | CSS |
| `--custom-guild-list-padding` | `16px` | CSS |
| `--custom-guild-list-width` | `calc(40px + 16px*2)` | CSS |
| `--custom-guild-member-application-review-sidebar-width` | `29vw` | CSS |
| `--custom-guild-onboarding-home-page-max-page-width` | `1128px` | CSS |
| `--custom-guild-onboarding-home-page-max-single-column-width` | `704px` | CSS |
| `--custom-guild-role-subscription-card-basic-info-tier-image-size` | `80px` | CSS |
| `--custom-guild-role-subscription-card-basic-info-tier-image-size-mobile` | `48px` | CSS |
| `--custom-guild-role-subscription-style-constants-cover-image-aspect-ratio` | `4` | CSS |
| `--custom-guild-role-subscriptions-overview-page-page-max-width` | `1180px` | CSS |
| `--custom-guild-settings-community-intro-content-spacing` | `32px` | CSS |
| `--custom-guild-settings-community-intro-hover-distance` | `-12px` | CSS |
| `--custom-guild-settings-discovery-landing-page-max-width-tab` | `905px` | CSS |
| `--custom-guild-settings-discovery-landing-page-settings-max-width` | `520px` | CSS |
| `--custom-guild-settings-partner-content-spacing` | `32px` | CSS |
| `--custom-guild-settings-role-subscriptions-max-width` | `905px` | CSS |
| `--custom-guild-settings-role-subscriptions-overview-settings-max-width` | `520px` | CSS |
| `--custom-guild-settings-roles-intro-banner-transition-delay` | `calc(250ms + 166ms)` | CSS |
| `--custom-guild-settings-roles-intro-pause-transition` | `166ms` | CSS |
| `--custom-guild-settings-roles-intro-roles-transition` | `250ms` | CSS |
| `--custom-guild-settings-roles-intro-roles-transition-delay` | `calc(250ms + 166ms*2 + 500ms)` | CSS |
| `--custom-guild-settings-store-page-settings-max-width` | `520px` | CSS |
| `--custom-guild-shop-channel-row-glow` | `0 0 4px rgba(189,149,255,.5)` | CSS |
| `--custom-guild-shop-channel-row-gradient` | `linear-gradient(113deg,#2f3570 1.98%,#422c70 94...` | CSS |
| `--custom-guild-shop-channel-row-gradient-hover` | `linear-gradient(113deg,#383f86 1.98%,#4d3385 94...` | CSS |
| `--custom-guild-shop-content-width` | `1044px` | CSS |
| `--custom-guild-shop-content-width-minimum` | `688px` | CSS |
| `--custom-guild-shop-content-width-reduced` | `788px` | CSS |
| `--custom-guild-shop-gradient-end` | `#c356fd` | CSS |
| `--custom-guild-shop-gradient-start` | `#686bff` | CSS |
| `--custom-guild-shop-page-two-column-max-width` | `1439px` | CSS |
| `--custom-guild-shop-preview-pill-shadow-dark` | `-4px 5px #1d1d1d` | CSS |
| `--custom-guild-shop-preview-pill-shadow-light` | `-4px 5px #d7dce8` | CSS |
| `--custom-guild-sidebar-width` | `268px` | CSS |
| `--custom-guild-sticker-upload-modal-emoji-margin` | `10px` | CSS |
| `--custom-guild-sticker-upload-modal-emoji-size` | `22px` | CSS |
| `--custom-guild-stickers-tiers-grid-breakpoint` | `1010px` | CSS |
| `--custom-guild-tooltip-icon-size` | `20px` | CSS |
| `--custom-guild-tooltip-icon-size-v-2` | `16px` | CSS |
| `--custom-hub-discovery-guild-list-card-height` | `320px` | CSS |
| `--custom-hub-discovery-guild-list-gutter-size` | `16px` | CSS |
| `--custom-hub-discovery-guild-list-min-card-width` | `248px` | CSS |
| `--custom-stickers-constants-stickers-list-empty-guild-upsell-height` | `54px` | CSS |
| `--custom-voice-channel-effect-voice-channel-effect-animation-size` | `800px` | CSS |
| `--custom-voice-channel-effects-bar-effect-bar-padding-x` | `16px` | CSS |
| `--custom-voice-channel-effects-bar-effect-bar-padding-y` | `12px` | CSS |
| `--custom-voice-channel-effects-bar-max-width` | `498px` | CSS |
| `--guild-boosting-blue` | `hsl(221.132 calc(1*70.044%) 55.49%/1)` | CSS |
| `--guild-boosting-pink` | `hsl(302.143 calc(1*100%) 72.549%/1)` | CSS |
| `--guild-boosting-purple` | `hsl(269.032 calc(1*83.784%) 70.98%/1)` | CSS |
| `--guild-boosting-purple-for-gradients` | `hsl(269.162 calc(1*91.795%) 61.765%/1)` | CSS |
| `--guild-boosting-purple-for-gradients-hsl` | `269.162 calc(1*91.795%) 61.765%` | CSS |
| `--guild-boosting-purple-hsl` | `269.032 calc(1*83.784%) 70.98%` | CSS |
| `--thread-channel-spine` | `color-mix(in oklab,hsl(234.545 calc(1*6.509%) 3...` | CSS |
| `CHANNEL_ICON` | `{}` | JS |
| `GUILD_BOOSTING_BLUE` | `#3e70dd` | JS |
| `GUILD_BOOSTING_PINK` | `#ff73fa` | JS |
| `GUILD_BOOSTING_PURPLE` | `#b377f3` | JS |
| `GUILD_BOOSTING_PURPLE_FOR_GRADIENTS` | `#9b44f7` | JS |
| `REDESIGN_CHANNEL_NAME_MUTED_TEXT` | `{}` | JS |
| `REDESIGN_CHANNEL_NAME_TEXT` | `{}` | JS |
| `THREAD_CHANNEL_SPINE` | `{}` | JS |

*Total: 96 variables*

---

## Modal & Popout

| Variable | Value | Type |
|----------|-------|------|
| `--custom-accept-invite-modal-invite-modal-height` | `420px` | CSS |
| `--custom-accept-invite-modal-small-screen-width` | `720px` | CSS |
| `--custom-add-permissions-modal-focus-ring-width` | `4px` | CSS |
| `--custom-edit-benefit-modal-emoji-margin` | `10px` | CSS |
| `--custom-edit-benefit-modal-emoji-size` | `22px` | CSS |
| `--custom-feedback-modal-emoji-size` | `64px` | CSS |
| `--custom-go-live-modal-art-height` | `112px` | CSS |
| `--custom-import-benefits-modal-icon-size` | `24px` | CSS |
| `--custom-import-benefits-modal-role-icon-size` | `40px` | CSS |
| `--custom-interaction-iframe-modal-modal-margin` | `80px` | CSS |
| `--custom-interaction-iframe-modal-modal-max-width` | `1280px` | CSS |
| `--custom-interaction-iframe-modal-modal-min-width` | `320px` | CSS |
| `--custom-message-helpers-popout-container-width` | `calc(256px + 16px*2)` | CSS |
| `--custom-message-helpers-popout-content-width` | `256px` | CSS |
| `--custom-message-helpers-popout-padding-width` | `16px` | CSS |
| `--custom-messages-popout-messages-popout-footer-height` | `120px` | CSS |
| `--custom-modal-min-width-large` | `800px` | CSS |
| `--custom-outbound-promotion-redemption-modal-art-height` | `120px` | CSS |
| `--custom-stickers-constants-sticker-shop-modal-preview-dimensions` | `72px` | CSS |
| `--custom-stream-upsell-modal-art-height` | `149px` | CSS |
| `--custom-tutorial-popout-height-media-approx` | `80px` | CSS |
| `--custom-tutorial-popout-padding-content` | `16px` | CSS |
| `--modal-horizontal-padding` | `24px` | CSS |
| `--modal-vertical-padding` | `16px` | CSS |
| `--modal-width-large` | `800px` | CSS |
| `--modal-width-medium` | `602px` | CSS |
| `--modal-width-small` | `442px` | CSS |
| `--search-popout-date-picker-border` | `1px solid color-mix(in oklab,hsl(240 calc(1*4%)...` | CSS |
| `--search-popout-date-picker-hint-text` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--search-popout-date-picker-hint-value-text` | `#fff` | CSS |
| `--search-popout-option-answer-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--search-popout-option-filter-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--search-popout-option-filter-text` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `--search-popout-option-user-nickname` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--search-popout-option-user-username` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |

*Total: 35 variables*

---

## Shadow & Elevation

| Variable | Value | Type |
|----------|-------|------|
| `--__spoiler-container-box-shadow-color` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--custom-keybind-shadow-width` | `2px` | CSS |
| `--custom-notification-box-shadow-blur-radius` | `7px` | CSS |
| `--custom-notification-box-shadow-opacity` | `0.8` | CSS |
| `--custom-notification-box-shadow-spread-radius` | `3px` | CSS |
| `--elevation-high` | `0 8px 16px hsl(0 calc(1*0%) 0%/0.24)` | CSS |
| `--elevation-low` | `0 1px 0 hsl(240 calc(1*20%) 0.98%/0.2),0 1.5px ...` | CSS |
| `--elevation-medium` | `0 4px 4px hsl(0 calc(1*0%) 0%/0.16)` | CSS |
| `--elevation-stroke` | `0 0 0 1px hsl(240 calc(1*20%) 0.98%/0.15)` | CSS |
| `--legacy-elevation-border` | `0 0 0 1px hsl(225 calc(1*6.25%) 12.549%/0.6)` | CSS |
| `--legacy-elevation-high` | `0 2px 10px 0 hsl(0 calc(1*0%) 0%/0.2)` | CSS |
| `--legacy-elevation-low` | `0 1px 5px 0 hsl(0 calc(1*0%) 0%/0.2784313725490...` | CSS |
| `--shadow-border` | `0 0 0 1px hsl(none 0% 100%/0.08)` | CSS |
| `--shadow-high` | `0 12px 24px 0 hsl(none 0% 0%/0.24)` | CSS |
| `--shadow-high-filter` | `drop-shadow(0 12px 24px hsl(none 0% 0%/0.24))` | CSS |
| `--shadow-ledge` | `0 2px 0 0 hsl(none 0% 0%/0.05),0 1.5px 0 0 hsl(...` | CSS |
| `--shadow-ledge-filter` | `drop-shadow(0 1.5px 0 hsl(none 0% 0%/0.24))` | CSS |
| `--shadow-low` | `0 1px 4px 0 hsl(none 0% 0%/0.14)` | CSS |
| `--shadow-low-active` | `0 0 4px 0 hsl(none 0% 0%/0.14)` | CSS |
| `--shadow-low-active-filter` | `drop-shadow(0 0 4px hsl(none 0% 0%/0.14))` | CSS |
| `--shadow-low-filter` | `drop-shadow(0 1px 4px hsl(none 0% 0%/0.14))` | CSS |
| `--shadow-low-hover` | `0 4px 10px 0 hsl(none 0% 0%/0.14)` | CSS |
| `--shadow-low-hover-filter` | `drop-shadow(0 4px 10px hsl(none 0% 0%/0.14))` | CSS |
| `--shadow-medium` | `0 4px 8px 0 hsl(none 0% 0%/0.16)` | CSS |
| `--shadow-medium-filter` | `drop-shadow(0 4px 8px hsl(none 0% 0%/0.16))` | CSS |
| `--shadow-mobile-navigator-x` | `0 0 10px 0 hsl(none 0% 0%/0.22)` | CSS |
| `--shadow-mobile-navigator-x-filter` | `drop-shadow(0 0 10px hsl(none 0% 0%/0.22))` | CSS |
| `--shadow-top-high` | `0 -12px 32px 0 hsl(none 0% 0%/0.24)` | CSS |
| `--shadow-top-high-filter` | `drop-shadow(0 -12px 32px hsl(none 0% 0%/0.24))` | CSS |
| `--shadow-top-ledge` | `0 -2px 0 0 hsl(none 0% 0%/0.05),0 -1.5px 0 0 hs...` | CSS |
| `--shadow-top-ledge-filter` | `drop-shadow(0 -1.5px 0 hsl(none 0% 0%/0.24))` | CSS |
| `--shadow-top-low` | `0 -1px 4px 0 hsl(none 0% 0%/0.14)` | CSS |
| `--shadow-top-low-filter` | `drop-shadow(0 -1px 4px hsl(none 0% 0%/0.14))` | CSS |

*Total: 33 variables*

---

## Spacing & Size

| Variable | Value | Type |
|----------|-------|------|
| `--chat-resize-handle-width` | `8px` | CSS |
| `--custom-drag-resize-container-handle-bleed` | `2px` | CSS |
| `--custom-drag-resize-container-handle-offset` | `calc(2px - 8px)` | CSS |
| `--custom-drag-resize-container-handle-size` | `8px` | CSS |
| `--custom-emoji-picker-constants-emoji-size-large` | `48px` | CSS |
| `--custom-emoji-picker-constants-emoji-size-medium` | `40px` | CSS |
| `--custom-emoji-size-emoji` | `1.375em` | CSS |
| `--custom-emoji-size-jumbo-emoji` | `3rem` | CSS |
| `--custom-keybind-space-around-key` | `8px` | CSS |
| `--custom-notification-space-around-divider` | `12px` | CSS |
| `--custom-user-profile-hype-squad-badge-shine-size-offset` | `64px` | CSS |
| `--icon-size-lg` | `32px` | CSS |
| `--icon-size-md` | `24px` | CSS |
| `--icon-size-sm` | `18px` | CSS |
| `--icon-size-xs` | `16px` | CSS |
| `--icon-size-xxs` | `12px` | CSS |
| `--size-0` | `0px` | CSS |
| `--size-12` | `12px` | CSS |
| `--size-128` | `128px` | CSS |
| `--size-16` | `16px` | CSS |
| `--size-160` | `160px` | CSS |
| `--size-192` | `192px` | CSS |
| `--size-20` | `20px` | CSS |
| `--size-24` | `24px` | CSS |
| `--size-32` | `32px` | CSS |
| `--size-4` | `4px` | CSS |
| `--size-48` | `48px` | CSS |
| `--size-64` | `64px` | CSS |
| `--size-8` | `8px` | CSS |
| `--size-80` | `80px` | CSS |
| `--size-96` | `96px` | CSS |
| `--size-lg` | `20px` | CSS |
| `--size-md` | `16px` | CSS |
| `--size-sm` | `12px` | CSS |
| `--size-xl` | `24px` | CSS |
| `--size-xs` | `8px` | CSS |
| `--size-xxl` | `32px` | CSS |
| `--size-xxs` | `4px` | CSS |
| `--space-0` | `0px` | CSS |
| `--space-10` | `10px` | CSS |
| `--space-12` | `12px` | CSS |
| `--space-128` | `128px` | CSS |
| `--space-16` | `16px` | CSS |
| `--space-160` | `160px` | CSS |
| `--space-192` | `192px` | CSS |
| `--space-20` | `20px` | CSS |
| `--space-24` | `24px` | CSS |
| `--space-26` | `26px` | CSS |
| `--space-30` | `30px` | CSS |
| `--space-32` | `32px` | CSS |
| `--space-4` | `4px` | CSS |
| `--space-40` | `40px` | CSS |
| `--space-48` | `48px` | CSS |
| `--space-6` | `6px` | CSS |
| `--space-64` | `64px` | CSS |
| `--space-8` | `8px` | CSS |
| `--space-80` | `80px` | CSS |
| `--space-96` | `96px` | CSS |
| `--space-lg` | `20px` | CSS |
| `--space-md` | `16px` | CSS |
| `--space-sm` | `12px` | CSS |
| `--space-xl` | `24px` | CSS |
| `--space-xs` | `8px` | CSS |
| `--space-xxl` | `32px` | CSS |
| `--space-xxs` | `4px` | CSS |

*Total: 65 variables*

---

## Radius

| Variable | Value | Type |
|----------|-------|------|
| `--radius-lg` | `16px` | CSS |
| `--radius-md` | `12px` | CSS |
| `--radius-none` | `0px` | CSS |
| `--radius-round` | `2147483647px` | CSS |
| `--radius-sm` | `8px` | CSS |
| `--radius-xl` | `24px` | CSS |
| `--radius-xs` | `4px` | CSS |
| `--radius-xxl` | `32px` | CSS |

*Total: 8 variables*

---

## Custom Properties

| Variable | Value | Type |
|----------|-------|------|
| `--custom-accept-invite-detail-components-small-mobile-breakpoint` | `640px` | CSS |
| `--custom-accept-invite-mobile-small-mobile-breakpoint` | `640px` | CSS |
| `--custom-app-message-embed-base-info-gap` | `4px` | CSS |
| `--custom-app-message-embed-base-info-top` | `calc(4px - 2px)` | CSS |
| `--custom-app-sidebar-target-width` | `calc(268px + calc(40px + 16px*2))` | CSS |
| `--custom-app-top-bar-height` | `32px` | CSS |
| `--custom-app-top-bar-item-radius` | `6px` | CSS |
| `--custom-application-directory-content-max-width` | `1024px` | CSS |
| `--custom-application-directory-content-min-width` | `600px` | CSS |
| `--custom-application-directory-profile-icon-size` | `122px` | CSS |
| `--custom-application-directory-profile-sidebar-margin-right` | `48px` | CSS |
| `--custom-application-directory-profile-sidebar-width` | `192px` | CSS |
| `--custom-application-directory-search-sidebar-margin-right` | `32px` | CSS |
| `--custom-application-directory-search-sidebar-width` | `200px` | CSS |
| `--custom-application-store-home-store-home-width` | `1245px` | CSS |
| `--custom-application-store-listing-body-max-width` | `880px` | CSS |
| `--custom-aspect-stable-image-container-padding` | `20px` | CSS |
| `--custom-auth-box-auth-box-padding` | `32px` | CSS |
| `--custom-broadcasting-tooltip-image-offset` | `40px` | CSS |
| `--custom-call-avatar-incoming-duration` | `5.407s` | CSS |
| `--custom-call-avatar-outgoing-duration` | `2.5s` | CSS |
| `--custom-chat-aligned-icon-offset` | `((40px - 20px)/2)` | CSS |
| `--custom-client-themes-editor-content-width` | `calc(60px*3 + 24px*2)` | CSS |
| `--custom-client-themes-editor-editor-padding` | `16px` | CSS |
| `--custom-clips-enabled-indicator-badge-icon-dimension-override` | `20px` | CSS |
| `--custom-clips-enabled-indicator-medium-break-point` | `920px` | CSS |
| `--custom-collection-gallery-column-card-height` | `600px` | CSS |
| `--custom-collection-gallery-media-breakpoint` | `1024px` | CSS |
| `--custom-collection-gallery-row-card-height` | `283px` | CSS |
| `--custom-collection-list-card-gap` | `16px` | CSS |
| `--custom-collection-list-with-image-grid-gap` | `16px` | CSS |
| `--custom-collections-collection-gap` | `32px` | CSS |
| `--custom-discover-search-results-max-search-bar-width` | `720px` | CSS |
| `--custom-editable-benefits-list-emoji-size` | `24px` | CSS |
| `--custom-embed-spoiler-blur-radius` | `44px` | CSS |
| `--custom-embedded-application-invite-content-height` | `130px` | CSS |
| `--custom-embedded-application-invite-content-height-tall` | `162px` | CSS |
| `--custom-embedded-application-invite-content-width` | `576px` | CSS |
| `--custom-embedded-application-invite-image-width-large` | `288px` | CSS |
| `--custom-embedded-application-invite-image-width-small` | `225px` | CSS |
| `--custom-emoji-picker-constants-category-separator-margin-vertical` | `12px` | CSS |
| `--custom-emoji-picker-constants-category-separator-size` | `1px` | CSS |
| `--custom-emoji-picker-constants-diversity-emoji-size` | `24px` | CSS |
| `--custom-emoji-picker-constants-emoji-container-padding-horizontal` | `4px` | CSS |
| `--custom-emoji-picker-constants-emoji-container-padding-vertical` | `4px` | CSS |
| `--custom-emoji-picker-constants-emoji-list-padding-bottom` | `8px` | CSS |
| `--custom-emoji-picker-constants-emoji-list-padding-left` | `8px` | CSS |
| `--custom-emoji-picker-constants-emoji-list-padding-right` | `0` | CSS |
| `--custom-emoji-picker-constants-emoji-list-padding-top` | `0` | CSS |
| `--custom-emoji-picker-constants-emoji-list-search-results-padding-top` | `8px` | CSS |
| `--custom-emoji-picker-constants-emoji-picker-height` | `440px` | CSS |
| `--custom-emoji-picker-constants-emoji-section-margin-bottom` | `12px` | CSS |
| `--custom-emoji-picker-constants-min-emoji-picker-width` | `498px` | CSS |
| `--custom-emoji-picker-constants-newly-added-emoji-badge-height` | `16px` | CSS |
| `--custom-emoji-picker-constants-unicode-category-icon-margin-vertical` | `2px` | CSS |
| `--custom-emoji-picker-constants-unicode-category-icon-padding` | `4px` | CSS |
| `--custom-emoji-picker-constants-unicode-category-icon-size` | `24px` | CSS |
| `--custom-emoji-picker-constants-unicode-category-shortcut-height` | `48px` | CSS |
| `--custom-event-detail-info-tab-base-spacing` | `8px` | CSS |
| `--custom-expression-picker-constants-expression-picker-inspector-bar-graphic-secondary-dimensions` | `32px` | CSS |
| `--custom-expression-picker-constants-expression-picker-inspector-bar-height` | `48px` | CSS |
| `--custom-expression-picker-constants-expression-picker-list-section-heading-height` | `32px` | CSS |
| `--custom-expression-suggestions-container-padding` | `8px` | CSS |
| `--custom-expression-suggestions-sticker-suggestion-margin` | `8px` | CSS |
| `--custom-expression-suggestions-sticker-suggestion-size` | `48px` | CSS |
| `--custom-family-center-page-responsive-width-mobile` | `900px` | CSS |
| `--custom-folder-item-animation-duration` | `150ms` | CSS |
| `--custom-forum-composer-attachments-attachment-size` | `78px` | CSS |
| `--custom-full-screen-layer-animation-duration` | `150ms` | CSS |
| `--custom-game-install-locations-item-padding` | `20px` | CSS |
| `--custom-game-list-linked-to-glow-duration` | `2000ms` | CSS |
| `--custom-game-list-row-min-height` | `62px` | CSS |
| `--custom-gif-picker-gutter-size` | `0 16px 12px 16px` | CSS |
| `--custom-gradient-progress-notch-height` | `16px` | CSS |
| `--custom-gradient-progress-notch-margin` | `2px` | CSS |
| `--custom-gradient-progress-notch-width` | `8px` | CSS |
| `--custom-historic-earnings-table-toggle-expand-column-width` | `30px` | CSS |
| `--custom-hub-discovery-add-hub-card-card-height` | `320px` | CSS |
| `--custom-hub-discovery-page-max-page-width` | `1608px` | CSS |
| `--custom-importable-benefits-list-listing-image-size` | `40px` | CSS |
| `--custom-index-scrollbar-margin` | `3px` | CSS |
| `--custom-index-scrollbar-width` | `10px` | CSS |
| `--custom-keybind-applied-vertical-padding` | `calc((8px - 2px)/2)` | CSS |
| `--custom-keybind-vertical-padding-total-height` | `8px` | CSS |
| `--custom-layout-sidebar-width` | `232px` | CSS |
| `--custom-margin-margin-large` | `40px` | CSS |
| `--custom-margin-margin-medium` | `20px` | CSS |
| `--custom-margin-margin-small` | `8px` | CSS |
| `--custom-margin-margin-x-large` | `60px` | CSS |
| `--custom-margin-margin-x-small` | `4px` | CSS |
| `--custom-media-post-attachments-horizontal-padding` | `48px` | CSS |
| `--custom-media-post-embed-spoiler-blur-radius` | `20px` | CSS |
| `--custom-media-post-embed-transition-duration` | `170ms` | CSS |
| `--custom-media-queries-media-query-mobile` | `768px` | CSS |
| `--custom-media-queries-media-query-mobile-header` | `849px` | CSS |
| `--custom-member-list-item-avatar-decoration-padding` | `2px` | CSS |
| `--custom-member-list-width` | `264px` | CSS |
| `--custom-message-attachment-spoiler-blur-radius` | `44px` | CSS |
| `--custom-message-avatar-decoration-size` | `calc(40px*1.2)` | CSS |
| `--custom-message-avatar-size` | `40px` | CSS |
| `--custom-message-margin-compact-indent` | `5rem` | CSS |
| `--custom-message-margin-horizontal` | `16px` | CSS |
| `--custom-message-margin-left-content-cozy` | `calc(40px + 16px + 16px)` | CSS |
| `--custom-message-meta-space` | `0.25rem` | CSS |
| `--custom-message-padding-vertical-container-compact` | `0.125rem` | CSS |
| `--custom-message-reply-indent` | `0.625rem` | CSS |
| `--custom-message-reply-message-preview-line-height` | `1.125rem` | CSS |
| `--custom-message-spacing-vertical-container-cozy` | `0.125rem` | CSS |
| `--custom-mobile-web-handoff-link-mobile-web-handoff-height` | `70px` | CSS |
| `--custom-monetization-info-table-expandable-rows-toggle-expand-column-width` | `30px` | CSS |
| `--custom-notification-container-width` | `300px` | CSS |
| `--custom-notification-spacing` | `12px` | CSS |
| `--custom-party-avatars-avatar-diameter` | `24px` | CSS |
| `--custom-pending-row-max-width` | `1040px` | CSS |
| `--custom-people-page-max-width-with-toolbar` | `940px` | CSS |
| `--custom-raging-demon-duration` | `0.15s` | CSS |
| `--custom-resizable-extension-size` | `4px` | CSS |
| `--custom-resizable-icon-padding` | `4px` | CSS |
| `--custom-resizable-icon-size` | `16px` | CSS |
| `--custom-role-icon-uploader-icon-size` | `24px` | CSS |
| `--custom-rtc-account-height` | `44px` | CSS |
| `--custom-scrollbar-scrollbar-margin` | `3px` | CSS |
| `--custom-scrollbar-scrollbar-width` | `14px` | CSS |
| `--custom-special-markdown-medium-break-point` | `768px` | CSS |
| `--custom-special-markdown-small-break-point` | `600px` | CSS |
| `--custom-standard-sidebar-view-sidebar-content-scrollbar-padding` | `6px` | CSS |
| `--custom-standard-sidebar-view-sidebar-content-width` | `192px` | CSS |
| `--custom-standard-sidebar-view-sidebar-total-width` | `264px` | CSS |
| `--custom-standard-sidebar-view-standard-padding` | `20px` | CSS |
| `--custom-stickers-constants-category-separator-margin-vertical` | `12px` | CSS |
| `--custom-stickers-constants-category-separator-size` | `1px` | CSS |
| `--custom-stickers-constants-sticker-category-icon-margin` | `8px` | CSS |
| `--custom-stickers-constants-sticker-category-icon-size` | `32px` | CSS |
| `--custom-stickers-constants-sticker-category-list-padding` | `8px` | CSS |
| `--custom-stickers-constants-sticker-category-unicode-icon-size` | `24px` | CSS |
| `--custom-stickers-constants-sticker-dimension` | `160px` | CSS |
| `--custom-stickers-constants-sticker-picker-breakpoint-medium` | `446px` | CSS |
| `--custom-stickers-constants-sticker-picker-breakpoint-small` | `360px` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-dimensions` | `96px` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-dimensions-small` | `80px` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-margin` | `12px` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-margin-small` | `4px` | CSS |
| `--custom-stickers-constants-sticker-picker-preview-padding` | `2px` | CSS |
| `--custom-stickers-constants-sticker-purchase-pack-preview-dimensions` | `76px` | CSS |
| `--custom-stickers-constants-sticker-purchase-pack-preview-margin` | `0` | CSS |
| `--custom-stickers-constants-sticker-purchase-pack-preview-padding` | `2px` | CSS |
| `--custom-stickers-constants-stickers-list-padding-bottom` | `0` | CSS |
| `--custom-stickers-constants-stickers-list-padding-left` | `8px` | CSS |
| `--custom-stickers-constants-stickers-list-padding-right` | `0` | CSS |
| `--custom-stickers-constants-stickers-list-padding-top` | `0` | CSS |
| `--custom-stickers-constants-stickers-list-padding-top-search-results` | `8px` | CSS |
| `--custom-stickers-constants-stickers-shop-list-section-footer-height` | `32px` | CSS |
| `--custom-stickers-constants-stickers-shop-list-section-footer-stacked-margin` | `8px` | CSS |
| `--custom-stickers-constants-stickers-shop-list-section-heading-height` | `66px` | CSS |
| `--custom-subscription-listing-previews-carousel-cards-get-cut-off-width` | `724px` | CSS |
| `--custom-summary-avatars-avatar-diameter` | `16px` | CSS |
| `--custom-theme-selection-group-column-gap` | `24px` | CSS |
| `--custom-theme-selection-selection-size` | `60px` | CSS |
| `--custom-user-profile-banner-height` | `0` | CSS |
| `--custom-user-profile-base-layer-z-index` | `0` | CSS |
| `--custom-user-profile-bottom-layer-z-index` | `1` | CSS |
| `--custom-user-profile-hoist-z-index` | `4` | CSS |
| `--custom-user-profile-hype-squad-badge-icon-size` | `24px` | CSS |
| `--custom-user-profile-middle-layer-z-index` | `2` | CSS |
| `--custom-user-profile-theme-padding` | `0` | CSS |
| `--custom-user-profile-toast-z-index` | `5` | CSS |
| `--custom-user-profile-top-layer-z-index` | `3` | CSS |
| `--custom-voice-widget-top-margin` | `calc(20px + 12px*2)` | CSS |
| `--custom-voice-widget-widget-width` | `272px` | CSS |
| `--custom-wave-splash-max-qr-login-width` | `830px` | CSS |
| `--custom-wave-splash-responsive-width-desktop` | `1080px` | CSS |
| `--custom-wave-splash-responsive-width-mobile` | `485px` | CSS |
| `--custom-wave-splash-responsive-width-mobile-first` | `486px` | CSS |
| `--custom-widget-bar-height` | `20px` | CSS |
| `--custom-widget-bar-padding` | `12px` | CSS |
| `--custom-widget-body-padding` | `4px` | CSS |
| `--custom-widget-max-widget-height` | `100vh` | CSS |

*Total: 177 variables*

---

## Miscellaneous

| Variable | Value | Type |
|----------|-------|------|
| `--app-frame-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--app-message-embed-secondary-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.7) 1...` | CSS |
| `--application-subscription-end` | `hsl(196.564 calc(1*98.788%) 32.353%/1)` | CSS |
| `--application-subscription-end-hsl` | `196.564 calc(1*98.788%) 32.353%` | CSS |
| `--application-subscription-start` | `hsl(234.909 calc(1*68.465%) 52.745%/1)` | CSS |
| `--application-subscription-start-hsl` | `234.909 calc(1*68.465%) 52.745%` | CSS |
| `--battlenet` | `hsl(199.651 calc(1*100%) 44.902%/1)` | CSS |
| `--battlenet-hsl` | `199.651 calc(1*100%) 44.902%` | CSS |
| `--bd-brand` | `#3e82e5` | CSS |
| `--bdfdb-blurple` | `hsl(235, calc(1 * 85.6%), 64.7%)` | CSS |
| `--black` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--blurple-1` | `hsl(230.4 calc(1*100%) 95.098%/1)` | CSS |
| `--blurple-1-hsl` | `230.4 calc(1*100%) 95.098%` | CSS |
| `--blurple-10` | `hsl(228.214 calc(1*100%) 89.02%/1)` | CSS |
| `--blurple-10-hsl` | `228.214 calc(1*100%) 89.02%` | CSS |
| `--blurple-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--blurple-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--blurple-11` | `hsl(227 calc(1*100%) 88.235%/1)` | CSS |
| `--blurple-11-hsl` | `227 calc(1*100%) 88.235%` | CSS |
| `--blurple-12` | `hsl(227.619 calc(1*100%) 87.647%/1)` | CSS |
| `--blurple-12-hsl` | `227.619 calc(1*100%) 87.647%` | CSS |
| `--blurple-13` | `hsl(227.463 calc(1*100%) 86.863%/1)` | CSS |
| `--blurple-13-hsl` | `227.463 calc(1*100%) 86.863%` | CSS |
| `--blurple-14` | `hsl(227.143 calc(1*100%) 86.275%/1)` | CSS |
| `--blurple-14-hsl` | `227.143 calc(1*100%) 86.275%` | CSS |
| `--blurple-15` | `hsl(227.671 calc(1*100%) 85.686%/1)` | CSS |
| `--blurple-15-hsl` | `227.671 calc(1*100%) 85.686%` | CSS |
| `--blurple-16` | `hsl(227.368 calc(1*100%) 85.098%/1)` | CSS |
| `--blurple-16-hsl` | `227.368 calc(1*100%) 85.098%` | CSS |
| `--blurple-17` | `hsl(227.848 calc(1*100%) 84.51%/1)` | CSS |
| `--blurple-17-hsl` | `227.848 calc(1*100%) 84.51%` | CSS |
| `--blurple-18` | `hsl(227.711 calc(1*100%) 83.725%/1)` | CSS |
| `--blurple-18-hsl` | `227.711 calc(1*100%) 83.725%` | CSS |
| `--blurple-19` | `hsl(227.442 calc(1*100%) 83.137%/1)` | CSS |
| `--blurple-19-hsl` | `227.442 calc(1*100%) 83.137%` | CSS |
| `--blurple-2` | `hsl(231.429 calc(1*100%) 94.51%/1)` | CSS |
| `--blurple-2-hsl` | `231.429 calc(1*100%) 94.51%` | CSS |
| `--blurple-20` | `hsl(227.865 calc(1*100%) 82.549%/1)` | CSS |
| `--blurple-20-hsl` | `227.865 calc(1*100%) 82.549%` | CSS |
| `--blurple-21` | `hsl(228.261 calc(1*100%) 81.961%/1)` | CSS |
| `--blurple-21-hsl` | `228.261 calc(1*100%) 81.961%` | CSS |
| `--blurple-22` | `hsl(228 calc(1*100%) 81.373%/1)` | CSS |
| `--blurple-22-hsl` | `228 calc(1*100%) 81.373%` | CSS |
| `--blurple-23` | `hsl(228.367 calc(1*100%) 80.784%/1)` | CSS |
| `--blurple-23-hsl` | `228.367 calc(1*100%) 80.784%` | CSS |
| `--blurple-24` | `hsl(228.713 calc(1*100%) 80.196%/1)` | CSS |
| `--blurple-24-hsl` | `228.713 calc(1*100%) 80.196%` | CSS |
| `--blurple-25` | `hsl(228.462 calc(1*100%) 79.608%/1)` | CSS |
| `--blurple-25-hsl` | `228.462 calc(1*100%) 79.608%` | CSS |
| `--blurple-26` | `hsl(228.785 calc(1*100%) 79.02%/1)` | CSS |
| `--blurple-26-hsl` | `228.785 calc(1*100%) 79.02%` | CSS |
| `--blurple-27` | `hsl(228.991 calc(1*98.198%) 78.235%/1)` | CSS |
| `--blurple-27-hsl` | `228.991 calc(1*98.198%) 78.235%` | CSS |
| `--blurple-28` | `hsl(229.189 calc(1*98.23%) 77.843%/1)` | CSS |
| `--blurple-28-hsl` | `229.189 calc(1*98.23%) 77.843%` | CSS |
| `--blurple-29` | `hsl(229.381 calc(1*96.581%) 77.059%/1)` | CSS |
| `--blurple-29-hsl` | `229.381 calc(1*96.581%) 77.059%` | CSS |
| `--blurple-3` | `hsl(230.625 calc(1*100%) 93.725%/1)` | CSS |
| `--blurple-3-hsl` | `230.625 calc(1*100%) 93.725%` | CSS |
| `--blurple-30` | `hsl(229.655 calc(1*96.667%) 76.471%/1)` | CSS |
| `--blurple-30-hsl` | `229.655 calc(1*96.667%) 76.471%` | CSS |
| `--blurple-31` | `hsl(229.322 calc(1*95.161%) 75.686%/1)` | CSS |
| `--blurple-31-hsl` | `229.322 calc(1*95.161%) 75.686%` | CSS |
| `--blurple-32` | `hsl(229.5 calc(1*93.75%) 74.902%/1)` | CSS |
| `--blurple-32-hsl` | `229.5 calc(1*93.75%) 74.902%` | CSS |
| `--blurple-33` | `hsl(230.164 calc(1*93.846%) 74.51%/1)` | CSS |
| `--blurple-33-hsl` | `230.164 calc(1*93.846%) 74.51%` | CSS |
| `--blurple-34` | `hsl(230.323 calc(1*92.537%) 73.725%/1)` | CSS |
| `--blurple-34-hsl` | `230.323 calc(1*92.537%) 73.725%` | CSS |
| `--blurple-35` | `hsl(230.476 calc(1*92.647%) 73.333%/1)` | CSS |
| `--blurple-35-hsl` | `230.476 calc(1*92.647%) 73.333%` | CSS |
| `--blurple-36` | `hsl(230.625 calc(1*91.429%) 72.549%/1)` | CSS |
| `--blurple-36-hsl` | `230.625 calc(1*91.429%) 72.549%` | CSS |
| `--blurple-37` | `hsl(230.84 calc(1*91.608%) 71.961%/1)` | CSS |
| `--blurple-37-hsl` | `230.84 calc(1*91.608%) 71.961%` | CSS |
| `--blurple-38` | `hsl(231.364 calc(1*90.411%) 71.373%/1)` | CSS |
| `--blurple-38-hsl` | `231.364 calc(1*90.411%) 71.373%` | CSS |
| `--blurple-39` | `hsl(231.111 calc(1*90.604%) 70.784%/1)` | CSS |
| `--blurple-39-hsl` | `231.111 calc(1*90.604%) 70.784%` | CSS |
| `--blurple-4` | `hsl(228.333 calc(1*100%) 92.941%/1)` | CSS |
| `--blurple-4-hsl` | `228.333 calc(1*100%) 92.941%` | CSS |
| `--blurple-40` | `hsl(231.618 calc(1*89.474%) 70.196%/1)` | CSS |
| `--blurple-40-hsl` | `231.618 calc(1*89.474%) 70.196%` | CSS |
| `--blurple-41` | `hsl(231.739 calc(1*88.462%) 69.412%/1)` | CSS |
| `--blurple-41-hsl` | `231.739 calc(1*88.462%) 69.412%` | CSS |
| `--blurple-42` | `hsl(232.286 calc(1*88.608%) 69.02%/1)` | CSS |
| `--blurple-42-hsl` | `232.286 calc(1*88.608%) 69.02%` | CSS |
| `--blurple-43` | `hsl(232.766 calc(1*87.578%) 68.431%/1)` | CSS |
| `--blurple-43-hsl` | `232.766 calc(1*87.578%) 68.431%` | CSS |
| `--blurple-44` | `hsl(232.917 calc(1*87.805%) 67.843%/1)` | CSS |
| `--blurple-44-hsl` | `232.917 calc(1*87.805%) 67.843%` | CSS |
| `--blurple-45` | `hsl(232.966 calc(1*86.826%) 67.255%/1)` | CSS |
| `--blurple-45-hsl` | `232.966 calc(1*86.826%) 67.255%` | CSS |
| `--blurple-46` | `hsl(233.469 calc(1*86.982%) 66.863%/1)` | CSS |
| `--blurple-46-hsl` | `233.469 calc(1*86.982%) 66.863%` | CSS |
| `--blurple-47` | `hsl(233.919 calc(1*86.047%) 66.275%/1)` | CSS |
| `--blurple-47-hsl` | `233.919 calc(1*86.047%) 66.275%` | CSS |
| `--blurple-48` | `hsl(234.4 calc(1*86.207%) 65.882%/1)` | CSS |
| `--blurple-48-hsl` | `234.4 calc(1*86.207%) 65.882%` | CSS |
| `--blurple-49` | `hsl(234.474 calc(1*85.393%) 65.098%/1)` | CSS |
| `--blurple-49-hsl` | `234.474 calc(1*85.393%) 65.098%` | CSS |
| `--blurple-5` | `hsl(229.231 calc(1*100%) 92.353%/1)` | CSS |
| `--blurple-5-hsl` | `229.231 calc(1*100%) 92.353%` | CSS |
| `--blurple-50` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--blurple-50-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--blurple-51` | `hsl(234.8 calc(1*79.787%) 63.137%/1)` | CSS |
| `--blurple-51-hsl` | `234.8 calc(1*79.787%) 63.137%` | CSS |
| `--blurple-52` | `hsl(234.658 calc(1*74.49%) 61.569%/1)` | CSS |
| `--blurple-52-hsl` | `234.658 calc(1*74.49%) 61.569%` | CSS |
| `--blurple-53` | `hsl(234.507 calc(1*69.608%) 60%/1)` | CSS |
| `--blurple-53-hsl` | `234.507 calc(1*69.608%) 60%` | CSS |
| `--blurple-54` | `hsl(234.388 calc(1*65.877%) 58.627%/1)` | CSS |
| `--blurple-54-hsl` | `234.388 calc(1*65.877%) 58.627%` | CSS |
| `--blurple-55` | `hsl(234.222 calc(1*61.644%) 57.059%/1)` | CSS |
| `--blurple-55-hsl` | `234.222 calc(1*61.644%) 57.059%` | CSS |
| `--blurple-56` | `hsl(234.091 calc(1*58.407%) 55.686%/1)` | CSS |
| `--blurple-56-hsl` | `234.091 calc(1*58.407%) 55.686%` | CSS |
| `--blurple-57` | `hsl(233.488 calc(1*55.365%) 54.314%/1)` | CSS |
| `--blurple-57-hsl` | `233.488 calc(1*55.365%) 54.314%` | CSS |
| `--blurple-58` | `hsl(233.28 calc(1*51.867%) 52.745%/1)` | CSS |
| `--blurple-58-hsl` | `233.28 calc(1*51.867%) 52.745%` | CSS |
| `--blurple-59` | `hsl(233.115 calc(1*49.194%) 51.373%/1)` | CSS |
| `--blurple-59-hsl` | `233.115 calc(1*49.194%) 51.373%` | CSS |
| `--blurple-6` | `hsl(227.442 calc(1*100%) 91.569%/1)` | CSS |
| `--blurple-6-hsl` | `227.442 calc(1*100%) 91.569%` | CSS |
| `--blurple-60` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--blurple-60-hsl` | `232.941 calc(1*46.667%) 50%` | CSS |
| `--blurple-61` | `hsl(232.759 calc(1*46.774%) 48.627%/1)` | CSS |
| `--blurple-61-hsl` | `232.759 calc(1*46.774%) 48.627%` | CSS |
| `--blurple-62` | `hsl(232.566 calc(1*46.888%) 47.255%/1)` | CSS |
| `--blurple-62-hsl` | `232.566 calc(1*46.888%) 47.255%` | CSS |
| `--blurple-63` | `hsl(232.432 calc(1*47.234%) 46.078%/1)` | CSS |
| `--blurple-63-hsl` | `232.432 calc(1*47.234%) 46.078%` | CSS |
| `--blurple-64` | `hsl(232.222 calc(1*47.368%) 44.706%/1)` | CSS |
| `--blurple-64-hsl` | `232.222 calc(1*47.368%) 44.706%` | CSS |
| `--blurple-65` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--blurple-65-hsl` | `232 calc(1*47.511%) 43.333%` | CSS |
| `--blurple-66` | `hsl(231.845 calc(1*47.907%) 42.157%/1)` | CSS |
| `--blurple-66-hsl` | `231.845 calc(1*47.907%) 42.157%` | CSS |
| `--blurple-67` | `hsl(231.6 calc(1*48.077%) 40.784%/1)` | CSS |
| `--blurple-67-hsl` | `231.6 calc(1*48.077%) 40.784%` | CSS |
| `--blurple-68` | `hsl(231.429 calc(1*48.515%) 39.608%/1)` | CSS |
| `--blurple-68-hsl` | `231.429 calc(1*48.515%) 39.608%` | CSS |
| `--blurple-69` | `hsl(231.158 calc(1*48.718%) 38.235%/1)` | CSS |
| `--blurple-69-hsl` | `231.158 calc(1*48.718%) 38.235%` | CSS |
| `--blurple-7` | `hsl(228.261 calc(1*100%) 90.98%/1)` | CSS |
| `--blurple-7-hsl` | `228.261 calc(1*100%) 90.98%` | CSS |
| `--blurple-70` | `hsl(230.968 calc(1*49.206%) 37.059%/1)` | CSS |
| `--blurple-70-hsl` | `230.968 calc(1*49.206%) 37.059%` | CSS |
| `--blurple-71` | `hsl(230.667 calc(1*49.451%) 35.686%/1)` | CSS |
| `--blurple-71-hsl` | `230.667 calc(1*49.451%) 35.686%` | CSS |
| `--blurple-72` | `hsl(230.455 calc(1*50%) 34.51%/1)` | CSS |
| `--blurple-72-hsl` | `230.455 calc(1*50%) 34.51%` | CSS |
| `--blurple-73` | `hsl(230.824 calc(1*49.708%) 33.529%/1)` | CSS |
| `--blurple-73-hsl` | `230.824 calc(1*49.708%) 33.529%` | CSS |
| `--blurple-74` | `hsl(230.602 calc(1*50.303%) 32.353%/1)` | CSS |
| `--blurple-74-hsl` | `230.602 calc(1*50.303%) 32.353%` | CSS |
| `--blurple-75` | `hsl(230.37 calc(1*50.943%) 31.176%/1)` | CSS |
| `--blurple-75-hsl` | `230.37 calc(1*50.943%) 31.176%` | CSS |
| `--blurple-76` | `hsl(230 calc(1*51.316%) 29.804%/1)` | CSS |
| `--blurple-76-hsl` | `230 calc(1*51.316%) 29.804%` | CSS |
| `--blurple-77` | `hsl(228.947 calc(1*52.055%) 28.627%/1)` | CSS |
| `--blurple-77-hsl` | `228.947 calc(1*52.055%) 28.627%` | CSS |
| `--blurple-78` | `hsl(228.649 calc(1*52.857%) 27.451%/1)` | CSS |
| `--blurple-78-hsl` | `228.649 calc(1*52.857%) 27.451%` | CSS |
| `--blurple-79` | `hsl(228.333 calc(1*53.731%) 26.275%/1)` | CSS |
| `--blurple-79-hsl` | `228.333 calc(1*53.731%) 26.275%` | CSS |
| `--blurple-8` | `hsl(228 calc(1*100%) 90.196%/1)` | CSS |
| `--blurple-8-hsl` | `228 calc(1*100%) 90.196%` | CSS |
| `--blurple-80` | `hsl(228.696 calc(1*53.488%) 25.294%/1)` | CSS |
| `--blurple-80-hsl` | `228.696 calc(1*53.488%) 25.294%` | CSS |
| `--blurple-81` | `hsl(228.358 calc(1*54.472%) 24.118%/1)` | CSS |
| `--blurple-81-hsl` | `228.358 calc(1*54.472%) 24.118%` | CSS |
| `--blurple-82` | `hsl(228 calc(1*55.556%) 22.941%/1)` | CSS |
| `--blurple-82-hsl` | `228 calc(1*55.556%) 22.941%` | CSS |
| `--blurple-83` | `hsl(227.619 calc(1*56.757%) 21.765%/1)` | CSS |
| `--blurple-83-hsl` | `227.619 calc(1*56.757%) 21.765%` | CSS |
| `--blurple-84` | `hsl(228.197 calc(1*57.009%) 20.98%/1)` | CSS |
| `--blurple-84-hsl` | `228.197 calc(1*57.009%) 20.98%` | CSS |
| `--blurple-85` | `hsl(226.78 calc(1*58.416%) 19.804%/1)` | CSS |
| `--blurple-85-hsl` | `226.78 calc(1*58.416%) 19.804%` | CSS |
| `--blurple-86` | `hsl(227.143 calc(1*58.333%) 18.824%/1)` | CSS |
| `--blurple-86-hsl` | `227.143 calc(1*58.333%) 18.824%` | CSS |
| `--blurple-87` | `hsl(226.667 calc(1*60%) 17.647%/1)` | CSS |
| `--blurple-87-hsl` | `226.667 calc(1*60%) 17.647%` | CSS |
| `--blurple-88` | `hsl(226.415 calc(1*62.353%) 16.667%/1)` | CSS |
| `--blurple-88-hsl` | `226.415 calc(1*62.353%) 16.667%` | CSS |
| `--blurple-89` | `hsl(226.8 calc(1*62.5%) 15.686%/1)` | CSS |
| `--blurple-89-hsl` | `226.8 calc(1*62.5%) 15.686%` | CSS |
| `--blurple-9` | `hsl(227.547 calc(1*100%) 89.608%/1)` | CSS |
| `--blurple-9-hsl` | `227.547 calc(1*100%) 89.608%` | CSS |
| `--blurple-90` | `hsl(225 calc(1*64.865%) 14.51%/1)` | CSS |
| `--blurple-90-hsl` | `225 calc(1*64.865%) 14.51%` | CSS |
| `--blurple-91` | `hsl(225.652 calc(1*65.714%) 13.725%/1)` | CSS |
| `--blurple-91-hsl` | `225.652 calc(1*65.714%) 13.725%` | CSS |
| `--blurple-92` | `hsl(225 calc(1*68.75%) 12.549%/1)` | CSS |
| `--blurple-92-hsl` | `225 calc(1*68.75%) 12.549%` | CSS |
| `--blurple-93` | `hsl(225.366 calc(1*69.492%) 11.569%/1)` | CSS |
| `--blurple-93-hsl` | `225.366 calc(1*69.492%) 11.569%` | CSS |
| `--blurple-94` | `hsl(225.789 calc(1*70.37%) 10.588%/1)` | CSS |
| `--blurple-94-hsl` | `225.789 calc(1*70.37%) 10.588%` | CSS |
| `--blurple-95` | `hsl(224.571 calc(1*74.468%) 9.216%/1)` | CSS |
| `--blurple-95-hsl` | `224.571 calc(1*74.468%) 9.216%` | CSS |
| `--blurple-96` | `hsl(224.516 calc(1*75.61%) 8.039%/1)` | CSS |
| `--blurple-96-hsl` | `224.516 calc(1*75.61%) 8.039%` | CSS |
| `--blurple-97` | `hsl(226.154 calc(1*76.471%) 6.667%/1)` | CSS |
| `--blurple-97-hsl` | `226.154 calc(1*76.471%) 6.667%` | CSS |
| `--blurple-98` | `hsl(227.368 calc(1*76%) 4.902%/1)` | CSS |
| `--blurple-98-hsl` | `227.368 calc(1*76%) 4.902%` | CSS |
| `--blurple-99` | `hsl(229.091 calc(1*84.615%) 2.549%/1)` | CSS |
| `--blurple-99-hsl` | `229.091 calc(1*84.615%) 2.549%` | CSS |
| `--breakpoint-1024` | `1024px` | CSS |
| `--breakpoint-1280` | `1280px` | CSS |
| `--breakpoint-1536` | `1536px` | CSS |
| `--breakpoint-1800` | `1800px` | CSS |
| `--breakpoint-2500` | `2500px` | CSS |
| `--breakpoint-480` | `480px` | CSS |
| `--breakpoint-640` | `640px` | CSS |
| `--breakpoint-768` | `768px` | CSS |
| `--breakpoint-lg` | `1280px` | CSS |
| `--breakpoint-max` | `2500px` | CSS |
| `--breakpoint-md` | `1024px` | CSS |
| `--breakpoint-sm` | `768px` | CSS |
| `--breakpoint-xl` | `1536px` | CSS |
| `--breakpoint-xs` | `640px` | CSS |
| `--breakpoint-xxl` | `1800px` | CSS |
| `--breakpoint-xxs` | `480px` | CSS |
| `--brightness` | `calc(1.5 - 1*0.5)` | CSS |
| `--bungie` | `hsl(196.916 calc(1*100%) 44.51%/1)` | CSS |
| `--bungie-hsl` | `196.916 calc(1*100%) 44.51%` | CSS |
| `--card-secondary-bg` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--card-secondary-pressed-bg` | `color-mix(in oklab,hsl(240 calc(1*7.143%) 10.98...` | CSS |
| `--channels-default` | `color-mix(in oklab,hsl(233.333 calc(1*3.704%) 5...` | CSS |
| `--channels-name-line-height` | `24px` | CSS |
| `--channels-spine-inverted-offset-top` | `6px` | CSS |
| `--channels-spine-offset-left` | `24px` | CSS |
| `--chat-avatar-size` | `40px` | CSS |
| `--chat-border` | `color-mix(in oklab,hsl(240 calc(1*6.452%) 12.15...` | CSS |
| `--chat-markup-line-height` | `1.375rem` | CSS |
| `--checkpoint-emojis-gradient-end` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-emojis-gradient-end-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-emojis-gradient-start` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-emojis-gradient-start-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-emojis-primary` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-emojis-secondary` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-emojis-secondary-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-end-gradient-end` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-end-gradient-end-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-end-gradient-start` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-end-gradient-start-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-end-primary` | `hsl(143.316 calc(1*83.55%) 54.706%/1)` | CSS |
| `--checkpoint-end-secondary` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-end-secondary-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--checkpoint-friends-gradient-end` | `hsl(259.481 calc(1*79.381%) 19.02%/1)` | CSS |
| `--checkpoint-friends-gradient-end-hsl` | `259.481 calc(1*79.381%) 19.02%` | CSS |
| `--checkpoint-friends-gradient-start` | `hsl(256.018 calc(1*96.507%) 55.098%/1)` | CSS |
| `--checkpoint-friends-gradient-start-hsl` | `256.018 calc(1*96.507%) 55.098%` | CSS |
| `--checkpoint-friends-primary` | `hsl(234 calc(1*90%) 80.392%/1)` | CSS |
| `--checkpoint-friends-secondary` | `hsl(234 calc(1*39.823%) 55.686%/1)` | CSS |
| `--checkpoint-friends-secondary-hsl` | `234 calc(1*39.823%) 55.686%` | CSS |
| `--checkpoint-gaming-gradient-end` | `hsl(28.8 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-gaming-gradient-end-hsl` | `28.8 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-gaming-gradient-start` | `hsl(27.595 calc(1*100%) 53.529%/1)` | CSS |
| `--checkpoint-gaming-gradient-start-hsl` | `27.595 calc(1*100%) 53.529%` | CSS |
| `--checkpoint-gaming-primary` | `hsl(34.699 calc(1*100%) 51.176%/1)` | CSS |
| `--checkpoint-gaming-secondary` | `hsl(26.809 calc(1*86.239%) 42.745%/1)` | CSS |
| `--checkpoint-gaming-secondary-hsl` | `26.809 calc(1*86.239%) 42.745%` | CSS |
| `--checkpoint-guilds-gradient-end` | `hsl(170.4 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-guilds-gradient-end-hsl` | `170.4 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-guilds-gradient-start` | `hsl(169.589 calc(1*90.123%) 47.647%/1)` | CSS |
| `--checkpoint-guilds-gradient-start-hsl` | `169.589 calc(1*90.123%) 47.647%` | CSS |
| `--checkpoint-guilds-primary` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-guilds-secondary` | `hsl(169.672 calc(1*68.539%) 34.902%/1)` | CSS |
| `--checkpoint-guilds-secondary-hsl` | `169.672 calc(1*68.539%) 34.902%` | CSS |
| `--checkpoint-messages-gradient-end` | `hsl(7.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-messages-gradient-end-hsl` | `7.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-messages-gradient-start` | `hsl(308.75 calc(1*98.969%) 61.961%/1)` | CSS |
| `--checkpoint-messages-gradient-start-hsl` | `308.75 calc(1*98.969%) 61.961%` | CSS |
| `--checkpoint-messages-primary` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--checkpoint-messages-secondary` | `hsl(315.319 calc(1*70.854%) 39.02%/1)` | CSS |
| `--checkpoint-messages-secondary-hsl` | `315.319 calc(1*70.854%) 39.02%` | CSS |
| `--checkpoint-persona-eight-gradient-end` | `hsl(31.154 calc(1*55.319%) 18.431%/1)` | CSS |
| `--checkpoint-persona-eight-gradient-end-hsl` | `31.154 calc(1*55.319%) 18.431%` | CSS |
| `--checkpoint-persona-eight-gradient-start` | `hsl(39.184 calc(1*56.322%) 65.882%/1)` | CSS |
| `--checkpoint-persona-eight-gradient-start-hsl` | `39.184 calc(1*56.322%) 65.882%` | CSS |
| `--checkpoint-persona-eight-primary` | `hsl(39.184 calc(1*56.322%) 65.882%/1)` | CSS |
| `--checkpoint-persona-eight-secondary` | `hsl(39.612 calc(1*42.387%) 47.647%/1)` | CSS |
| `--checkpoint-persona-eight-secondary-hsl` | `39.612 calc(1*42.387%) 47.647%` | CSS |
| `--checkpoint-persona-five-gradient-end` | `hsl(339.231 calc(1*67.241%) 22.745%/1)` | CSS |
| `--checkpoint-persona-five-gradient-end-hsl` | `339.231 calc(1*67.241%) 22.745%` | CSS |
| `--checkpoint-persona-five-gradient-start` | `hsl(339.114 calc(1*90.805%) 65.882%/1)` | CSS |
| `--checkpoint-persona-five-gradient-start-hsl` | `339.114 calc(1*90.805%) 65.882%` | CSS |
| `--checkpoint-persona-five-primary` | `hsl(339.114 calc(1*90.805%) 65.882%/1)` | CSS |
| `--checkpoint-persona-five-secondary` | `hsl(338.983 calc(1*71.66%) 48.431%/1)` | CSS |
| `--checkpoint-persona-five-secondary-hsl` | `338.983 calc(1*71.66%) 48.431%` | CSS |
| `--checkpoint-persona-four-gradient-end` | `hsl(7.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-four-gradient-end-hsl` | `7.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-four-gradient-start` | `hsl(308.75 calc(1*98.969%) 61.961%/1)` | CSS |
| `--checkpoint-persona-four-gradient-start-hsl` | `308.75 calc(1*98.969%) 61.961%` | CSS |
| `--checkpoint-persona-four-primary` | `hsl(312.083 calc(1*84.706%) 66.667%/1)` | CSS |
| `--checkpoint-persona-four-secondary` | `hsl(315.319 calc(1*70.854%) 39.02%/1)` | CSS |
| `--checkpoint-persona-four-secondary-hsl` | `315.319 calc(1*70.854%) 39.02%` | CSS |
| `--checkpoint-persona-nine-gradient-end` | `hsl(0 calc(1*0%) 24.706%/1)` | CSS |
| `--checkpoint-persona-nine-gradient-end-hsl` | `0 calc(1*0%) 24.706%` | CSS |
| `--checkpoint-persona-nine-gradient-start` | `hsl(0 calc(1*0%) 93.333%/1)` | CSS |
| `--checkpoint-persona-nine-gradient-start-hsl` | `0 calc(1*0%) 93.333%` | CSS |
| `--checkpoint-persona-nine-primary` | `hsl(0 calc(1*0%) 93.333%/1)` | CSS |
| `--checkpoint-persona-nine-secondary` | `hsl(0 calc(1*0%) 66.275%/1)` | CSS |
| `--checkpoint-persona-nine-secondary-hsl` | `0 calc(1*0%) 66.275%` | CSS |
| `--checkpoint-persona-one-gradient-end` | `hsl(168.98 calc(1*59.036%) 16.275%/1)` | CSS |
| `--checkpoint-persona-one-gradient-end-hsl` | `168.98 calc(1*59.036%) 16.275%` | CSS |
| `--checkpoint-persona-one-gradient-start` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-persona-one-gradient-start-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-persona-one-primary` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-persona-one-secondary` | `hsl(169.672 calc(1*68.539%) 34.902%/1)` | CSS |
| `--checkpoint-persona-one-secondary-hsl` | `169.672 calc(1*68.539%) 34.902%` | CSS |
| `--checkpoint-persona-seven-gradient-end` | `hsl(30.361 calc(1*85.567%) 19.02%/1)` | CSS |
| `--checkpoint-persona-seven-gradient-end-hsl` | `30.361 calc(1*85.567%) 19.02%` | CSS |
| `--checkpoint-persona-seven-gradient-start` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-persona-seven-gradient-start-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-persona-seven-primary` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-persona-seven-secondary` | `hsl(49.935 calc(1*74.163%) 40.98%/1)` | CSS |
| `--checkpoint-persona-seven-secondary-hsl` | `49.935 calc(1*74.163%) 40.98%` | CSS |
| `--checkpoint-persona-six-gradient-end` | `hsl(28.8 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-six-gradient-end-hsl` | `28.8 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-six-gradient-start` | `hsl(27.595 calc(1*100%) 53.529%/1)` | CSS |
| `--checkpoint-persona-six-gradient-start-hsl` | `27.595 calc(1*100%) 53.529%` | CSS |
| `--checkpoint-persona-six-primary` | `hsl(26.834 calc(1*100%) 60.98%/1)` | CSS |
| `--checkpoint-persona-six-secondary` | `hsl(26.809 calc(1*86.239%) 42.745%/1)` | CSS |
| `--checkpoint-persona-six-secondary-hsl` | `26.809 calc(1*86.239%) 42.745%` | CSS |
| `--checkpoint-persona-three-gradient-end` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-three-gradient-end-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-three-gradient-start` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-persona-three-gradient-start-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-persona-three-primary` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-persona-three-secondary` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-persona-three-secondary-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-persona-two-gradient-end` | `hsl(259.481 calc(1*79.381%) 19.02%/1)` | CSS |
| `--checkpoint-persona-two-gradient-end-hsl` | `259.481 calc(1*79.381%) 19.02%` | CSS |
| `--checkpoint-persona-two-gradient-start` | `hsl(256.018 calc(1*96.507%) 55.098%/1)` | CSS |
| `--checkpoint-persona-two-gradient-start-hsl` | `256.018 calc(1*96.507%) 55.098%` | CSS |
| `--checkpoint-persona-two-primary` | `hsl(217.982 calc(1*93.162%) 77.059%/1)` | CSS |
| `--checkpoint-persona-two-secondary` | `hsl(234 calc(1*39.823%) 55.686%/1)` | CSS |
| `--checkpoint-persona-two-secondary-hsl` | `234 calc(1*39.823%) 55.686%` | CSS |
| `--checkpoint-persona-zero-gradient-end` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-persona-zero-gradient-end-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-persona-zero-gradient-start` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-persona-zero-gradient-start-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-persona-zero-primary` | `hsl(143.804 calc(1*83.636%) 56.863%/1)` | CSS |
| `--checkpoint-persona-zero-secondary` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-persona-zero-secondary-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--checkpoint-quests-gradient-end` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-quests-gradient-end-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-quests-gradient-start` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-quests-gradient-start-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-quests-primary` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-quests-secondary` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-quests-secondary-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-voice-gradient-end` | `hsl(30.361 calc(1*85.567%) 19.02%/1)` | CSS |
| `--checkpoint-voice-gradient-end-hsl` | `30.361 calc(1*85.567%) 19.02%` | CSS |
| `--checkpoint-voice-gradient-start` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-voice-gradient-start-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-voice-primary` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-voice-secondary` | `hsl(49.935 calc(1*74.163%) 40.98%/1)` | CSS |
| `--checkpoint-voice-secondary-hsl` | `49.935 calc(1*74.163%) 40.98%` | CSS |
| `--checkpoint-welcome-gradient-end` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-welcome-gradient-end-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-welcome-gradient-start` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-welcome-gradient-start-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-welcome-primary` | `hsl(143.316 calc(1*83.55%) 54.706%/1)` | CSS |
| `--checkpoint-welcome-secondary` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-welcome-secondary-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--chip-blurple-dark-text` | `hsl(230.4 calc(1*100%) 95.098%/1)` | CSS |
| `--chip-blurple-light-text` | `hsl(225.652 calc(1*65.714%) 13.725%/1)` | CSS |
| `--chip-blurple-medium-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--chip-gray-dark-text` | `hsl(210 calc(1*5.263%) 92.549%/1)` | CSS |
| `--chip-gray-light-text` | `hsl(240 calc(1*5.455%) 21.569%/1)` | CSS |
| `--chip-gray-medium-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--chip-purple-dark-text` | `hsl(240 calc(1*4.478%) 86.863%/1)` | CSS |
| `--chip-purple-light-text` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--chip-purple-medium-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--collapse-easing-function` | `ease-in` | CSS |
| `--collapse-fade-duration` | `150ms` | CSS |
| `--collapse-structural-duration` | `150ms` | CSS |
| `--content-inventory-media-seekbar-container` | `color-mix(in oklab,hsl(228 calc(1*4.854%) 79.80...` | CSS |
| `--contrast` | `1` | CSS |
| `--control-connected-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connected-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connected-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-secondary-icon-active` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-critical-secondary-icon-default` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-critical-secondary-icon-hover` | `hsl(1.343 calc(1*84.81%) 69.02%/1)` | CSS |
| `--control-expressive-icon-active` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-icon-default` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-icon-hover` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-icon-only-icon-active` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-icon-only-icon-default` | `hsl(231.429 calc(1*4.348%) 68.431%/1)` | CSS |
| `--control-icon-only-icon-hover` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-item-height-md` | `40px` | CSS |
| `--control-item-height-sm` | `32px` | CSS |
| `--control-overlay-secondary-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-secondary-icon-active` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-icon-default` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-icon-hover` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--creator-revenue-icon-gradient-end` | `color-mix(in oklab,hsl(184.889 calc(1*100%) 26....` | CSS |
| `--creator-revenue-icon-gradient-start` | `color-mix(in oklab,hsl(183.974 calc(1*78.238%) ...` | CSS |
| `--creator-revenue-info-box-border` | `color-mix(in oklab,hsl(184.586 calc(1*100%) 30....` | CSS |
| `--creator-revenue-progress-bar` | `color-mix(in oklab,hsl(184.586 calc(1*100%) 30....` | CSS |
| `--crunchyroll` | `hsl(29.289 calc(1*92.952%) 55.49%/1)` | CSS |
| `--crunchyroll-hsl` | `29.289 calc(1*92.952%) 55.49%` | CSS |
| `--decoration-to-avatar-ratio` | `1.2` | CSS |
| `--ebay` | `hsl(211.429 calc(1*100%) 41.176%/1)` | CSS |
| `--ebay-hsl` | `211.429 calc(1*100%) 41.176%` | CSS |
| `--enhancedChannelTabs-favHeight` | `1.375rem` | CSS |
| `--enhancedChannelTabs-openTabSize` | `1.125rem` | CSS |
| `--enhancedChannelTabs-tabHeight` | `1.375rem` | CSS |
| `--enhancedChannelTabs-tabNameFontSize` | `0.75rem` | CSS |
| `--enhancedChannelTabs-tabWidth` | `13.75rem` | CSS |
| `--enhancedChannelTabs-tabWidthMin` | `8.125rem` | CSS |
| `--epic-games` | `hsl(34.286 calc(1*6.195%) 22.157%/1)` | CSS |
| `--epic-games-hsl` | `34.286 calc(1*6.195%) 22.157%` | CSS |
| `--expand-easing-function` | `ease-out` | CSS |
| `--expand-fade-duration` | `200ms` | CSS |
| `--expand-structural-duration` | `100ms` | CSS |
| `--experimental-avatar-embed-bg` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.521568...` | CSS |
| `--expressive-gradient-purple-end` | `color-mix(in oklab,hsl(260.87 calc(1*72.327%) 3...` | CSS |
| `--expressive-gradient-purple-start` | `color-mix(in oklab,hsl(268.462 calc(1*85.714%) ...` | CSS |
| `--expressive-gradient-tenure-badge-bronze-end` | `color-mix(in oklab,hsl(15 calc(1*92.035%) 44.31...` | CSS |
| `--expressive-gradient-tenure-badge-bronze-start` | `color-mix(in oklab,hsl(25.532 calc(1*98.947%) 6...` | CSS |
| `--expressive-gradient-tenure-badge-diamond-end` | `color-mix(in oklab,hsl(264.275 calc(1*59.817%) ...` | CSS |
| `--expressive-gradient-tenure-badge-diamond-start` | `color-mix(in oklab,hsl(268.462 calc(1*85.714%) ...` | CSS |
| `--expressive-gradient-tenure-badge-emerald-end` | `color-mix(in oklab,hsl(149.048 calc(1*79.747%) ...` | CSS |
| `--expressive-gradient-tenure-badge-emerald-start` | `color-mix(in oklab,hsl(143.804 calc(1*83.636%) ...` | CSS |
| `--expressive-gradient-tenure-badge-gold-end` | `color-mix(in oklab,hsl(40.345 calc(1*97.479%) 5...` | CSS |
| `--expressive-gradient-tenure-badge-gold-start` | `color-mix(in oklab,hsl(42.551 calc(1*89.091%) 5...` | CSS |
| `--expressive-gradient-tenure-badge-opal-end` | `color-mix(in oklab,hsl(209.339 calc(1*100%) 44....` | CSS |
| `--expressive-gradient-tenure-badge-opal-start` | `color-mix(in oklab,hsl(185.217 calc(1*47.325%) ...` | CSS |
| `--expressive-gradient-tenure-badge-platinum-end` | `color-mix(in oklab,hsl(185.128 calc(1*100%) 22....` | CSS |
| `--expressive-gradient-tenure-badge-platinum-start` | `color-mix(in oklab,hsl(185.806 calc(1*53.143%) ...` | CSS |
| `--expressive-gradient-tenure-badge-ruby-end` | `color-mix(in oklab,hsl(350.217 calc(1*88.462%) ...` | CSS |
| `--expressive-gradient-tenure-badge-ruby-start` | `color-mix(in oklab,hsl(358.421 calc(1*69.725%) ...` | CSS |
| `--expressive-gradient-tenure-badge-silver-end` | `color-mix(in oklab,hsl(240 calc(1*6.294%) 28.03...` | CSS |
| `--expressive-gradient-tenure-badge-silver-start` | `color-mix(in oklab,hsl(225 calc(1*4.878%) 83.92...` | CSS |
| `--facebook` | `hsl(220.714 calc(1*44.211%) 37.255%/1)` | CSS |
| `--facebook-hsl` | `220.714 calc(1*44.211%) 37.255%` | CSS |
| `--github` | `hsl(0 calc(1*4.167%) 9.412%/1)` | CSS |
| `--github-hsl` | `0 calc(1*4.167%) 9.412%` | CSS |
| `--gold` | `hsl(45.652 calc(1*100%) 54.902%/1)` | CSS |
| `--gold-hsl` | `45.652 calc(1*100%) 54.902%` | CSS |
| `--guildbar-avatar-size` | `40px` | CSS |
| `--guildbar-folder-size` | `48px` | CSS |
| `--hypesquad-house-1` | `hsl(253.458 calc(1*76.978%) 72.745%/1)` | CSS |
| `--hypesquad-house-1-hsl` | `253.458 calc(1*76.978%) 72.745%` | CSS |
| `--hypesquad-house-2` | `hsl(8.511 calc(1*86.503%) 68.039%/1)` | CSS |
| `--hypesquad-house-2-hsl` | `8.511 calc(1*86.503%) 68.039%` | CSS |
| `--hypesquad-house-3` | `hsl(168.553 calc(1*69.091%) 56.863%/1)` | CSS |
| `--hypesquad-house-3-hsl` | `168.553 calc(1*69.091%) 56.863%` | CSS |
| `--icon-default` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 94.11...` | CSS |
| `--icon-feedback-critical` | `color-mix(in oklab,hsl(1.343 calc(1*84.81%) 69....` | CSS |
| `--icon-feedback-info` | `color-mix(in oklab,hsl(213.117 calc(1*83.696%) ...` | CSS |
| `--icon-feedback-positive` | `color-mix(in oklab,hsl(140 calc(1*36%) 49.02%/1...` | CSS |
| `--icon-feedback-warning` | `color-mix(in oklab,hsl(38.455 calc(1*100%) 43.1...` | CSS |
| `--icon-invert` | `color-mix(in oklab,hsl(230 calc(1*6%) 19.608%/1...` | CSS |
| `--icon-link` | `color-mix(in oklab,hsl(212.795 calc(1*82.564%) ...` | CSS |
| `--icon-muted` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--icon-strong` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--icon-subtle` | `color-mix(in oklab,hsl(231.429 calc(1*4.348%) 6...` | CSS |
| `--icon-transparent` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0) 100%,...` | CSS |
| `--illo-nitro-blue` | `hsl(240 calc(1*82.063%) 43.725%/1)` | CSS |
| `--illo-purple-10` | `hsl(271.2 calc(1*100%) 95.098%/1)` | CSS |
| `--illo-purple-10-hsl` | `271.2 calc(1*100%) 95.098%` | CSS |
| `--illo-purple-20` | `hsl(268.966 calc(1*90.625%) 87.451%/1)` | CSS |
| `--illo-purple-20-hsl` | `268.966 calc(1*90.625%) 87.451%` | CSS |
| `--illo-purple-30` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--illo-purple-30-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--illo-purple-40` | `hsl(268.462 calc(1*85.714%) 64.314%/1)` | CSS |
| `--illo-purple-40-hsl` | `268.462 calc(1*85.714%) 64.314%` | CSS |
| `--illo-purple-50` | `hsl(264.275 calc(1*59.817%) 42.941%/1)` | CSS |
| `--illo-purple-50-hsl` | `264.275 calc(1*59.817%) 42.941%` | CSS |
| `--illo-purple-60` | `hsl(260.87 calc(1*72.327%) 31.176%/1)` | CSS |
| `--illo-purple-60-hsl` | `260.87 calc(1*72.327%) 31.176%` | CSS |
| `--illo-purple-70` | `hsl(257.059 calc(1*100%) 20%/1)` | CSS |
| `--illo-purple-70-hsl` | `257.059 calc(1*100%) 20%` | CSS |
| `--logo-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--lol` | `hsl(190.286 calc(1*89.744%) 7.647%/1)` | CSS |
| `--lol-hsl` | `190.286 calc(1*89.744%) 7.647%` | CSS |
| `--mention-foreground` | `color-mix(in oklab,hsl(227.442 calc(1*100%) 83....` | CSS |
| `--opacity-1` | `hsl(240 calc(1*4%) 60.784%/0.0196078431372549)` | CSS |
| `--opacity-1-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-12` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--opacity-12-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-16` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--opacity-16-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-20` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--opacity-20-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-24` | `hsl(240 calc(1*4%) 60.784%/0.23921568627450981)` | CSS |
| `--opacity-24-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-28` | `hsl(240 calc(1*4%) 60.784%/0.2784313725490196)` | CSS |
| `--opacity-28-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-32` | `hsl(240 calc(1*4%) 60.784%/0.3215686274509804)` | CSS |
| `--opacity-32-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-36` | `hsl(240 calc(1*4%) 60.784%/0.3607843137254902)` | CSS |
| `--opacity-36-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-4` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--opacity-4-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-40` | `hsl(240 calc(1*4%) 60.784%/0.4)` | CSS |
| `--opacity-40-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-44` | `hsl(240 calc(1*4%) 60.784%/0.4392156862745098)` | CSS |
| `--opacity-44-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-48` | `hsl(240 calc(1*4%) 60.784%/0.47843137254901963)` | CSS |
| `--opacity-48-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-52` | `hsl(240 calc(1*4%) 60.784%/0.5215686274509804)` | CSS |
| `--opacity-52-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-56` | `hsl(240 calc(1*4%) 60.784%/0.5607843137254902)` | CSS |
| `--opacity-56-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-60` | `hsl(240 calc(1*4%) 60.784%/0.6)` | CSS |
| `--opacity-60-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-64` | `hsl(240 calc(1*4%) 60.784%/0.6392156862745098)` | CSS |
| `--opacity-64-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-68` | `hsl(240 calc(1*4%) 60.784%/0.6784313725490196)` | CSS |
| `--opacity-68-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-72` | `hsl(240 calc(1*4%) 60.784%/0.7215686274509804)` | CSS |
| `--opacity-72-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-76` | `hsl(240 calc(1*4%) 60.784%/0.7607843137254902)` | CSS |
| `--opacity-76-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-8` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--opacity-8-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-80` | `hsl(240 calc(1*4%) 60.784%/0.8)` | CSS |
| `--opacity-80-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-84` | `hsl(240 calc(1*4%) 60.784%/0.8392156862745098)` | CSS |
| `--opacity-84-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-88` | `hsl(240 calc(1*4%) 60.784%/0.8784313725490196)` | CSS |
| `--opacity-88-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-92` | `hsl(240 calc(1*4%) 60.784%/0.9215686274509803)` | CSS |
| `--opacity-92-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-96` | `hsl(240 calc(1*4%) 60.784%/0.9607843137254902)` | CSS |
| `--opacity-96-hsl` | `240 calc(1*4%) 60.784%` | CSS |
| `--opacity-blurple-1` | `hsl(234.935 calc(1*85.556%) 64.706%/0.019607843...` | CSS |
| `--opacity-blurple-1-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-12` | `hsl(234.935 calc(1*85.556%) 64.706%/0.121568627...` | CSS |
| `--opacity-blurple-12-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-16` | `hsl(234.935 calc(1*85.556%) 64.706%/0.160784313...` | CSS |
| `--opacity-blurple-16-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-20` | `hsl(234.935 calc(1*85.556%) 64.706%/0.2)` | CSS |
| `--opacity-blurple-20-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-24` | `hsl(234.935 calc(1*85.556%) 64.706%/0.239215686...` | CSS |
| `--opacity-blurple-24-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-28` | `hsl(234.935 calc(1*85.556%) 64.706%/0.278431372...` | CSS |
| `--opacity-blurple-28-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-32` | `hsl(234.935 calc(1*85.556%) 64.706%/0.321568627...` | CSS |
| `--opacity-blurple-32-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-36` | `hsl(234.935 calc(1*85.556%) 64.706%/0.360784313...` | CSS |
| `--opacity-blurple-36-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-4` | `hsl(234.935 calc(1*85.556%) 64.706%/0.039215686...` | CSS |
| `--opacity-blurple-4-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-40` | `hsl(234.935 calc(1*85.556%) 64.706%/0.4)` | CSS |
| `--opacity-blurple-40-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-44` | `hsl(234.935 calc(1*85.556%) 64.706%/0.439215686...` | CSS |
| `--opacity-blurple-44-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-48` | `hsl(234.935 calc(1*85.556%) 64.706%/0.478431372...` | CSS |
| `--opacity-blurple-48-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-52` | `hsl(234.935 calc(1*85.556%) 64.706%/0.521568627...` | CSS |
| `--opacity-blurple-52-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-56` | `hsl(234.935 calc(1*85.556%) 64.706%/0.560784313...` | CSS |
| `--opacity-blurple-56-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-60` | `hsl(234.935 calc(1*85.556%) 64.706%/0.6)` | CSS |
| `--opacity-blurple-60-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-64` | `hsl(234.935 calc(1*85.556%) 64.706%/0.639215686...` | CSS |
| `--opacity-blurple-64-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-68` | `hsl(234.935 calc(1*85.556%) 64.706%/0.678431372...` | CSS |
| `--opacity-blurple-68-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-72` | `hsl(234.935 calc(1*85.556%) 64.706%/0.721568627...` | CSS |
| `--opacity-blurple-72-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-76` | `hsl(234.935 calc(1*85.556%) 64.706%/0.760784313...` | CSS |
| `--opacity-blurple-76-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-8` | `hsl(234.935 calc(1*85.556%) 64.706%/0.078431372...` | CSS |
| `--opacity-blurple-8-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-80` | `hsl(234.935 calc(1*85.556%) 64.706%/0.8)` | CSS |
| `--opacity-blurple-80-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-84` | `hsl(234.935 calc(1*85.556%) 64.706%/0.839215686...` | CSS |
| `--opacity-blurple-84-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-88` | `hsl(234.935 calc(1*85.556%) 64.706%/0.878431372...` | CSS |
| `--opacity-blurple-88-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-92` | `hsl(234.935 calc(1*85.556%) 64.706%/0.921568627...` | CSS |
| `--opacity-blurple-92-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--opacity-blurple-96` | `hsl(234.935 calc(1*85.556%) 64.706%/0.960784313...` | CSS |
| `--opacity-blurple-96-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--os-accent-color` | `#736750ff` | CSS |
| `--overlay-backdrop-lightbox` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.921568...` | CSS |
| `--panel-bg` | `color-mix(in oklab,hsl(240 calc(1*5.882%) 13.33...` | CSS |
| `--partner` | `hsl(215.376 calc(1*82.775%) 59.02%/1)` | CSS |
| `--partner-hsl` | `215.376 calc(1*82.775%) 59.02%` | CSS |
| `--paypal` | `hsl(230.455 calc(1*69.841%) 24.706%/1)` | CSS |
| `--paypal-hsl` | `230.455 calc(1*69.841%) 24.706%` | CSS |
| `--playstation` | `hsl(220 calc(1*95.652%) 27.059%/1)` | CSS |
| `--playstation-hsl` | `220 calc(1*95.652%) 27.059%` | CSS |
| `--plum-0` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--plum-0-hsl` | `0 calc(1*0%) 98.431%` | CSS |
| `--plum-1` | `hsl(240 calc(1*4.348%) 95.49%/1)` | CSS |
| `--plum-1-hsl` | `240 calc(1*4.348%) 95.49%` | CSS |
| `--plum-10` | `hsl(233.333 calc(1*3.797%) 53.529%/1)` | CSS |
| `--plum-10-hsl` | `233.333 calc(1*3.797%) 53.529%` | CSS |
| `--plum-11` | `hsl(234 calc(1*4.425%) 44.314%/1)` | CSS |
| `--plum-11-hsl` | `234 calc(1*4.425%) 44.314%` | CSS |
| `--plum-12` | `hsl(234.545 calc(1*5.641%) 38.235%/1)` | CSS |
| `--plum-12-hsl` | `234.545 calc(1*5.641%) 38.235%` | CSS |
| `--plum-13` | `hsl(234.545 calc(1*6.509%) 33.137%/1)` | CSS |
| `--plum-13-hsl` | `234.545 calc(1*6.509%) 33.137%` | CSS |
| `--plum-14` | `hsl(240 calc(1*6.294%) 28.039%/1)` | CSS |
| `--plum-14-hsl` | `240 calc(1*6.294%) 28.039%` | CSS |
| `--plum-15` | `hsl(232.5 calc(1*6.557%) 23.922%/1)` | CSS |
| `--plum-15-hsl` | `232.5 calc(1*6.557%) 23.922%` | CSS |
| `--plum-16` | `hsl(231.429 calc(1*6.542%) 20.98%/1)` | CSS |
| `--plum-16-hsl` | `231.429 calc(1*6.542%) 20.98%` | CSS |
| `--plum-17` | `hsl(230 calc(1*6.383%) 18.431%/1)` | CSS |
| `--plum-17-hsl` | `230 calc(1*6.383%) 18.431%` | CSS |
| `--plum-18` | `hsl(240 calc(1*6.024%) 16.275%/1)` | CSS |
| `--plum-18-hsl` | `240 calc(1*6.024%) 16.275%` | CSS |
| `--plum-19` | `hsl(228 calc(1*6.849%) 14.314%/1)` | CSS |
| `--plum-19-hsl` | `228 calc(1*6.849%) 14.314%` | CSS |
| `--plum-2` | `hsl(210 calc(1*5.263%) 92.549%/1)` | CSS |
| `--plum-2-hsl` | `210 calc(1*5.263%) 92.549%` | CSS |
| `--plum-20` | `hsl(240 calc(1*6.452%) 12.157%/1)` | CSS |
| `--plum-20-hsl` | `240 calc(1*6.452%) 12.157%` | CSS |
| `--plum-21` | `hsl(240 calc(1*7.143%) 10.98%/1)` | CSS |
| `--plum-21-hsl` | `240 calc(1*7.143%) 10.98%` | CSS |
| `--plum-22` | `hsl(240 calc(1*6.383%) 9.216%/1)` | CSS |
| `--plum-22-hsl` | `240 calc(1*6.383%) 9.216%` | CSS |
| `--plum-23` | `hsl(220 calc(1*7.317%) 8.039%/1)` | CSS |
| `--plum-23-alpha` | `hsl(240 calc(1*63.415%) 83.922%/0.1019607843137...` | CSS |
| `--plum-23-alpha-hsl` | `240 calc(1*63.415%) 83.922%` | CSS |
| `--plum-23-hsl` | `220 calc(1*7.317%) 8.039%` | CSS |
| `--plum-24` | `hsl(240 calc(1*8.571%) 6.863%/1)` | CSS |
| `--plum-24-hsl` | `240 calc(1*8.571%) 6.863%` | CSS |
| `--plum-25` | `hsl(240 calc(1*7.692%) 5.098%/1)` | CSS |
| `--plum-25-hsl` | `240 calc(1*7.692%) 5.098%` | CSS |
| `--plum-26` | `hsl(240 calc(1*12.5%) 3.137%/1)` | CSS |
| `--plum-26-hsl` | `240 calc(1*12.5%) 3.137%` | CSS |
| `--plum-3` | `hsl(240 calc(1*3.846%) 89.804%/1)` | CSS |
| `--plum-3-hsl` | `240 calc(1*3.846%) 89.804%` | CSS |
| `--plum-4` | `hsl(240 calc(1*4.478%) 86.863%/1)` | CSS |
| `--plum-4-hsl` | `240 calc(1*4.478%) 86.863%` | CSS |
| `--plum-5` | `hsl(225 calc(1*4.878%) 83.922%/1)` | CSS |
| `--plum-5-hsl` | `225 calc(1*4.878%) 83.922%` | CSS |
| `--plum-6` | `hsl(228 calc(1*4.854%) 79.804%/1)` | CSS |
| `--plum-6-hsl` | `228 calc(1*4.854%) 79.804%` | CSS |
| `--plum-7` | `hsl(230 calc(1*4.545%) 74.118%/1)` | CSS |
| `--plum-7-hsl` | `230 calc(1*4.545%) 74.118%` | CSS |
| `--plum-8` | `hsl(240 calc(1*4.192%) 67.255%/1)` | CSS |
| `--plum-8-hsl` | `240 calc(1*4.192%) 67.255%` | CSS |
| `--plum-9` | `hsl(232.5 calc(1*3.96%) 60.392%/1)` | CSS |
| `--plum-9-hsl` | `232.5 calc(1*3.96%) 60.392%` | CSS |
| `--polls-victor-fill` | `color-mix(in oklab,hsl(141.649 calc(1*44.292%) ...` | CSS |
| `--polls-voted-fill` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--profile-gradient-overlay` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.6) 100...` | CSS |
| `--profile-gradient-overlay-synced-with-user-theme` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.8) 100...` | CSS |
| `--profile-gradient-role-pill-border` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.2) 1...` | CSS |
| `--profile-gradient-section-box` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.45) 10...` | CSS |
| `--reddit` | `hsl(16.235 calc(1*100%) 50%/1)` | CSS |
| `--reddit-hsl` | `16.235 calc(1*100%) 50%` | CSS |
| `--riot-games` | `hsl(349.487 calc(1*100%) 45.882%/1)` | CSS |
| `--riot-games-hsl` | `349.487 calc(1*100%) 45.882%` | CSS |
| `--role-blue` | `hsl(203.793 calc(1*64.444%) 35.294%/1)` | CSS |
| `--role-brown` | `hsl(23.929 calc(1*100%) 32.941%/1)` | CSS |
| `--role-brown-hsl` | `23.929 calc(1*100%) 32.941%` | CSS |
| `--role-burgundy` | `hsl(333.725 calc(1*79.275%) 37.843%/1)` | CSS |
| `--role-burgundy-hsl` | `333.725 calc(1*79.275%) 37.843%` | CSS |
| `--role-dark-blue` | `hsl(198.947 calc(1*18.447%) 40.392%/1)` | CSS |
| `--role-dark-grey` | `hsl(199.535 calc(1*18.298%) 46.078%/1)` | CSS |
| `--role-dark-grey-hsl` | `199.535 calc(1*18.298%) 46.078%` | CSS |
| `--role-dark-purple` | `hsl(282.143 calc(1*43.75%) 37.647%/1)` | CSS |
| `--role-dark-purple-hsl` | `282.143 calc(1*43.75%) 37.647%` | CSS |
| `--role-dark-teal` | `hsl(168.108 calc(1*76.552%) 28.431%/1)` | CSS |
| `--role-default` | `hsl(203.571 calc(1*15.909%) 65.49%/1)` | CSS |
| `--role-default-hsl` | `203.571 calc(1*15.909%) 65.49%` | CSS |
| `--role-green` | `hsl(145 calc(1*63.529%) 33.333%/1)` | CSS |
| `--role-grey` | `hsl(202.5 calc(1*4%) 60.784%/1)` | CSS |
| `--role-grey-hsl` | `202.5 calc(1*4%) 60.784%` | CSS |
| `--role-light-blue` | `hsl(203.571 calc(1*15.909%) 65.49%/1)` | CSS |
| `--role-light-green` | `hsl(145.443 calc(1*63.2%) 49.02%/1)` | CSS |
| `--role-light-grey` | `hsl(183.529 calc(1*8.718%) 61.765%/1)` | CSS |
| `--role-light-grey-hsl` | `183.529 calc(1*8.718%) 61.765%` | CSS |
| `--role-magenta` | `hsl(339.606 calc(1*82.186%) 51.569%/1)` | CSS |
| `--role-magenta-hsl` | `339.606 calc(1*82.186%) 51.569%` | CSS |
| `--role-orange` | `hsl(28.163 calc(1*79.675%) 51.765%/1)` | CSS |
| `--role-purple` | `hsl(282.581 calc(1*38.912%) 53.137%/1)` | CSS |
| `--role-purple-hsl` | `282.581 calc(1*38.912%) 53.137%` | CSS |
| `--role-salmon` | `hsl(5.614 calc(1*78.082%) 57.059%/1)` | CSS |
| `--role-salmon-hsl` | `5.614 calc(1*78.082%) 57.059%` | CSS |
| `--role-sky-blue` | `hsl(204.072 calc(1*69.874%) 53.137%/1)` | CSS |
| `--role-tan` | `hsl(36.667 calc(1*86.538%) 40.784%/1)` | CSS |
| `--role-tan-hsl` | `36.667 calc(1*86.538%) 40.784%` | CSS |
| `--role-teal` | `hsl(168.148 calc(1*75.701%) 41.961%/1)` | CSS |
| `--role-terracotta` | `hsl(5.546 calc(1*63.636%) 36.667%/1)` | CSS |
| `--role-terracotta-hsl` | `5.546 calc(1*63.636%) 36.667%` | CSS |
| `--role-yellow` | `hsl(48.053 calc(1*88.976%) 50.196%/1)` | CSS |
| `--samsung` | `hsl(231 calc(1*77.778%) 35.294%/1)` | CSS |
| `--samsung-hsl` | `231 calc(1*77.778%) 35.294%` | CSS |
| `--scrollbar-auto-scrollbar-color-thumb` | `color-mix(in oklab,hsl(234.545 calc(1*5.473%) 3...` | CSS |
| `--scrollbar-auto-scrollbar-color-track` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 5.882...` | CSS |
| `--scrollbar-auto-thumb` | `color-mix(in oklab,hsl(234 calc(1*4.673%) 41.96...` | CSS |
| `--scrollbar-auto-track` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0) 100%,...` | CSS |
| `--scrollbar-thin-thumb` | `color-mix(in oklab,hsl(234.545 calc(1*5.473%) 3...` | CSS |
| `--scrollbar-thin-track` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0) 100%,...` | CSS |
| `--select-max-width` | `248px` | CSS |
| `--select-option-height` | `40px` | CSS |
| `--skype` | `hsl(196.186 calc(1*100%) 42.157%/1)` | CSS |
| `--skype-hsl` | `196.186 calc(1*100%) 42.157%` | CSS |
| `--spine-default` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--spotify` | `hsl(141.154 calc(1*72.897%) 41.961%/1)` | CSS |
| `--spotify-hsl` | `141.154 calc(1*72.897%) 41.961%` | CSS |
| `--steam` | `hsl(214.615 calc(1*35.135%) 14.51%/1)` | CSS |
| `--steam-hsl` | `214.615 calc(1*35.135%) 14.51%` | CSS |
| `--switch-thumb-icon-active` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--switch-thumb-icon-default` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--textbox-markdown-syntax` | `color-mix(in oklab,hsl(232.5 calc(1*3.96%) 60.3...` | CSS |
| `--transparent` | `hsl(0 calc(1*0%) 0%/0)` | CSS |
| `--transparent-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--twitch` | `hsl(264.13 calc(1*100%) 63.922%/1)` | CSS |
| `--twitch-hsl` | `264.13 calc(1*100%) 63.922%` | CSS |
| `--twitch-secondary` | `hsl(263.936 calc(1*80.342%) 54.118%/1)` | CSS |
| `--twitch-secondary-hsl` | `263.936 calc(1*80.342%) 54.118%` | CSS |
| `--twitter` | `hsl(202.817 calc(1*89.121%) 53.137%/1)` | CSS |
| `--twitter-hsl` | `202.817 calc(1*89.121%) 53.137%` | CSS |
| `--user-profile-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--user-profile-toolbar-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--white` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--xbox` | `hsl(120 calc(1*77.143%) 27.451%/1)` | CSS |
| `--xbox-hsl` | `120 calc(1*77.143%) 27.451%` | CSS |
| `--youtube` | `hsl(0.351 calc(1*72.766%) 46.078%/1)` | CSS |
| `--youtube-hsl` | `0.351 calc(1*72.766%) 46.078%` | CSS |
| `APP_MESSAGE_EMBED_SECONDARY_TEXT` | `{}` | JS |
| `APPLICATION_SUBSCRIPTION_END` | `#0177a4` | JS |
| `APPLICATION_SUBSCRIPTION_START` | `#3442d9` | JS |
| `BATTLENET` | `#009ae5` | JS |
| `BLACK` | `#000000` | JS |
| `BLUR_FALLBACK` | `{}` | JS |
| `BLUR_FALLBACK_PRESSED` | `{}` | JS |
| `BLURPLE_1` | `#e6eaff` | JS |
| `BLURPLE_10` | `#c7d2ff` | JS |
| `BLURPLE_100` | `#000000` | JS |
| `BLURPLE_11` | `#c3d0ff` | JS |
| `BLURPLE_12` | `#c0cdff` | JS |
| `BLURPLE_13` | `#bccaff` | JS |
| `BLURPLE_14` | `#b9c8ff` | JS |
| `BLURPLE_15` | `#b6c5ff` | JS |
| `BLURPLE_16` | `#b3c3ff` | JS |
| `BLURPLE_17` | `#b0c0ff` | JS |
| `BLURPLE_18` | `#acbdff` | JS |
| `BLURPLE_19` | `#a9bbff` | JS |
| `BLURPLE_2` | `#e3e7ff` | JS |
| `BLURPLE_20` | `#a6b8ff` | JS |
| `BLURPLE_21` | `#a3b5ff` | JS |
| `BLURPLE_22` | `#a0b3ff` | JS |
| `BLURPLE_23` | `#9db0ff` | JS |
| `BLURPLE_24` | `#9aadff` | JS |
| `BLURPLE_25` | `#97abff` | JS |
| `BLURPLE_26` | `#94a8ff` | JS |
| `BLURPLE_27` | `#91a5fe` | JS |
| `BLURPLE_28` | `#8fa3fe` | JS |
| `BLURPLE_29` | `#8ca0fd` | JS |
| `BLURPLE_3` | `#dfe4ff` | JS |
| `BLURPLE_30` | `#899dfd` | JS |
| `BLURPLE_31` | `#869bfc` | JS |
| `BLURPLE_32` | `#8398fb` | JS |
| `BLURPLE_33` | `#8195fb` | JS |
| `BLURPLE_34` | `#7e92fa` | JS |
| `BLURPLE_35` | `#7c90fa` | JS |
| `BLURPLE_36` | `#798df9` | JS |
| `BLURPLE_37` | `#768af9` | JS |
| `BLURPLE_38` | `#7487f8` | JS |
| `BLURPLE_39` | `#7185f8` | JS |
| `BLURPLE_4` | `#dbe2ff` | JS |
| `BLURPLE_40` | `#6f82f7` | JS |
| `BLURPLE_41` | `#6c7ff6` | JS |
| `BLURPLE_42` | `#6a7cf6` | JS |
| `BLURPLE_43` | `#6879f5` | JS |
| `BLURPLE_44` | `#6576f5` | JS |
| `BLURPLE_45` | `#6374f4` | JS |
| `BLURPLE_46` | `#6171f4` | JS |
| `BLURPLE_47` | `#5f6ef3` | JS |
| `BLURPLE_48` | `#5d6bf3` | JS |
| `BLURPLE_49` | `#5a68f2` | JS |
| `BLURPLE_5` | `#d8dfff` | JS |
| `BLURPLE_50` | `#5865f2` | JS |
| `BLURPLE_51` | `#5663ec` | JS |
| `BLURPLE_52` | `#5461e6` | JS |
| `BLURPLE_53` | `#525fe0` | JS |
| `BLURPLE_54` | `#505ddb` | JS |
| `BLURPLE_55` | `#4e5bd5` | JS |
| `BLURPLE_56` | `#4c59d0` | JS |
| `BLURPLE_57` | `#4a58cb` | JS |
| `BLURPLE_58` | `#4856c5` | JS |
| `BLURPLE_59` | `#4654c0` | JS |
| `BLURPLE_6` | `#d4ddff` | JS |
| `BLURPLE_60` | `#4452bb` | JS |
| `BLURPLE_61` | `#4250b6` | JS |
| `BLURPLE_62` | `#404eb1` | JS |
| `BLURPLE_63` | `#3e4cad` | JS |
| `BLURPLE_64` | `#3c4aa8` | JS |
| `BLURPLE_65` | `#3a48a3` | JS |
| `BLURPLE_66` | `#38469f` | JS |
| `BLURPLE_67` | `#36449a` | JS |
| `BLURPLE_68` | `#344296` | JS |
| `BLURPLE_69` | `#324091` | JS |
| `BLURPLE_7` | `#d1daff` | JS |
| `BLURPLE_70` | `#303e8d` | JS |
| `BLURPLE_71` | `#2e3c88` | JS |
| `BLURPLE_72` | `#2c3a84` | JS |
| `BLURPLE_73` | `#2b3880` | JS |
| `BLURPLE_74` | `#29367c` | JS |
| `BLURPLE_75` | `#273478` | JS |
| `BLURPLE_76` | `#253273` | JS |
| `BLURPLE_77` | `#23316f` | JS |
| `BLURPLE_78` | `#212f6b` | JS |
| `BLURPLE_79` | `#1f2d67` | JS |
| `BLURPLE_8` | `#cdd7ff` | JS |
| `BLURPLE_80` | `#1e2b63` | JS |
| `BLURPLE_81` | `#1c295f` | JS |
| `BLURPLE_82` | `#1a275b` | JS |
| `BLURPLE_83` | `#182557` | JS |
| `BLURPLE_84` | `#172354` | JS |
| `BLURPLE_85` | `#152250` | JS |
| `BLURPLE_86` | `#14204c` | JS |
| `BLURPLE_87` | `#121e48` | JS |
| `BLURPLE_88` | `#101c45` | JS |
| `BLURPLE_89` | `#0f1a41` | JS |
| `BLURPLE_9` | `#cad5ff` | JS |
| `BLURPLE_90` | `#0d193d` | JS |
| `BLURPLE_91` | `#0c173a` | JS |
| `BLURPLE_92` | `#0a1536` | JS |
| `BLURPLE_93` | `#091332` | JS |
| `BLURPLE_94` | `#08112e` | JS |
| `BLURPLE_95` | `#060f29` | JS |
| `BLURPLE_96` | `#050d24` | JS |
| `BLURPLE_97` | `#040a1e` | JS |
| `BLURPLE_98` | `#030716` | JS |
| `BLURPLE_99` | `#01030c` | JS |
| `BUNGIE` | `#00a3e3` | JS |
| `CARD_GRADIENT_BG` | `{}` | JS |
| `CARD_GRADIENT_PRESSED_BG` | `{}` | JS |
| `CARD_SECONDARY_BG` | `{}` | JS |
| `CARD_SECONDARY_PRESSED_BG` | `{}` | JS |
| `CHANNELS_DEFAULT` | `{}` | JS |
| `CHAT_BANNER_BG` | `{}` | JS |
| `CHAT_BORDER` | `{}` | JS |
| `CHECKPOINT_EMOJIS_GRADIENT_END` | `#1d0b24` | JS |
| `CHECKPOINT_EMOJIS_GRADIENT_START` | `#7d42f2` | JS |
| `CHECKPOINT_EMOJIS_PRIMARY` | `#ca9ef9` | JS |
| `CHECKPOINT_EMOJIS_SECONDARY` | `#a365e6` | JS |
| `CHECKPOINT_END_GRADIENT_END` | `#113e27` | JS |
| `CHECKPOINT_END_GRADIENT_START` | `#3fc07e` | JS |
| `CHECKPOINT_END_PRIMARY` | `#2bec76` | JS |
| `CHECKPOINT_END_SECONDARY` | `#14a74e` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_END` | `#230a57` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_START` | `#591efb` | JS |
| `CHECKPOINT_FRIENDS_PRIMARY` | `#a0a9fa` | JS |
| `CHECKPOINT_FRIENDS_SECONDARY` | `#616abb` | JS |
| `CHECKPOINT_GAMING_GRADIENT_END` | `#24170b` | JS |
| `CHECKPOINT_GAMING_GRADIENT_START` | `#ff7f12` | JS |
| `CHECKPOINT_GAMING_PRIMARY` | `#ff9606` | JS |
| `CHECKPOINT_GAMING_SECONDARY` | `#cb630f` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_END` | `#0b2420` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_START` | `#0ce7c1` | JS |
| `CHECKPOINT_GUILDS_PRIMARY` | `#5efde2` | JS |
| `CHECKPOINT_GUILDS_SECONDARY` | `#1c9681` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_END` | `#240e0b` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_START` | `#fe3ee2` | JS |
| `CHECKPOINT_MESSAGES_PRIMARY` | `#ff4cd2` | JS |
| `CHECKPOINT_MESSAGES_SECONDARY` | `#aa1d86` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_END` | `#493015` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_START` | `#d9b777` | JS |
| `CHECKPOINT_PERSONA_EIGHT_PRIMARY` | `#d9b777` | JS |
| `CHECKPOINT_PERSONA_EIGHT_SECONDARY` | `#ad8a46` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_END` | `#61132e` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_START` | `#f75990` | JS |
| `CHECKPOINT_PERSONA_FIVE_PRIMARY` | `#f75990` | JS |
| `CHECKPOINT_PERSONA_FIVE_SECONDARY` | `#d42361` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_END` | `#240e0b` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_START` | `#fe3ee2` | JS |
| `CHECKPOINT_PERSONA_FOUR_PRIMARY` | `#f262d5` | JS |
| `CHECKPOINT_PERSONA_FOUR_SECONDARY` | `#aa1d86` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_END` | `#3f3f3f` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_START` | `#eeeeee` | JS |
| `CHECKPOINT_PERSONA_NINE_PRIMARY` | `#eeeeee` | JS |
| `CHECKPOINT_PERSONA_NINE_SECONDARY` | `#a9a9a9` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_END` | `#114239` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_START` | `#5efde2` | JS |
| `CHECKPOINT_PERSONA_ONE_PRIMARY` | `#5efde2` | JS |
| `CHECKPOINT_PERSONA_ONE_SECONDARY` | `#1c9681` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_END` | `#5a3107` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_START` | `#ffe047` | JS |
| `CHECKPOINT_PERSONA_SEVEN_PRIMARY` | `#ffe047` | JS |
| `CHECKPOINT_PERSONA_SEVEN_SECONDARY` | `#b69c1b` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_END` | `#24170b` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_START` | `#ff7f12` | JS |
| `CHECKPOINT_PERSONA_SIX_PRIMARY` | `#ff9138` | JS |
| `CHECKPOINT_PERSONA_SIX_SECONDARY` | `#cb630f` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_END` | `#1d0b24` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_START` | `#7d42f2` | JS |
| `CHECKPOINT_PERSONA_THREE_PRIMARY` | `#ca9ef9` | JS |
| `CHECKPOINT_PERSONA_THREE_SECONDARY` | `#a365e6` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_END` | `#230a57` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_START` | `#591efb` | JS |
| `CHECKPOINT_PERSONA_TWO_PRIMARY` | `#8eb6fb` | JS |
| `CHECKPOINT_PERSONA_TWO_SECONDARY` | `#616abb` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_END` | `#113e27` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_START` | `#3fc07e` | JS |
| `CHECKPOINT_PERSONA_ZERO_PRIMARY` | `#35ed7e` | JS |
| `CHECKPOINT_PERSONA_ZERO_SECONDARY` | `#14a74e` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_END` | `#1d0b24` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_START` | `#7d42f2` | JS |
| `CHECKPOINT_QUESTS_PRIMARY` | `#ca9ef9` | JS |
| `CHECKPOINT_QUESTS_SECONDARY` | `#a365e6` | JS |
| `CHECKPOINT_VOICE_GRADIENT_END` | `#5a3107` | JS |
| `CHECKPOINT_VOICE_GRADIENT_START` | `#ffe047` | JS |
| `CHECKPOINT_VOICE_PRIMARY` | `#ffe047` | JS |
| `CHECKPOINT_VOICE_SECONDARY` | `#b69c1b` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_END` | `#113e27` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_START` | `#3fc07e` | JS |
| `CHECKPOINT_WELCOME_PRIMARY` | `#2bec76` | JS |
| `CHECKPOINT_WELCOME_SECONDARY` | `#14a74e` | JS |
| `CRUNCHYROLL` | `#f78b24` | JS |
| `EBAY` | `#0064d2` | JS |
| `EPIC_GAMES` | `#3c3935` | JS |
| `EXPRESSIVE_GRADIENT_PURPLE_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_PURPLE_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_BRONZE_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_BRONZE_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_DIAMOND_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_DIAMOND_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_EMERALD_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_EMERALD_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_GOLD_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_GOLD_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_OPAL_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_OPAL_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_PLATINUM_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_PLATINUM_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_RUBY_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_RUBY_START` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_SILVER_END` | `{}` | JS |
| `EXPRESSIVE_GRADIENT_TENURE_BADGE_SILVER_START` | `{}` | JS |
| `FACEBOOK` | `#355089` | JS |
| `GITHUB` | `#191717` | JS |
| `GOLD` | `#ffc819` | JS |
| `HYPESQUAD_HOUSE_1` | `#9c84ef` | JS |
| `HYPESQUAD_HOUSE_2` | `#f47b67` | JS |
| `HYPESQUAD_HOUSE_3` | `#45ddc0` | JS |
| `ICON_FEEDBACK_CRITICAL` | `{}` | JS |
| `ICON_FEEDBACK_INFO` | `{}` | JS |
| `ICON_FEEDBACK_POSITIVE` | `{}` | JS |
| `ICON_FEEDBACK_WARNING` | `{}` | JS |
| `ICON_MUTED` | `{}` | JS |
| `ICON_STRONG` | `{}` | JS |
| `ICON_SUBTLE` | `{}` | JS |
| `ICON_TRANSPARENT` | `{}` | JS |
| `ILLO_NITRO_BLUE` | `#1414cb` | JS |
| `ILLO_PURPLE_10` | `#f3e6ff` | JS |
| `ILLO_PURPLE_20` | `#dec2fc` | JS |
| `ILLO_PURPLE_30` | `#ca9ef9` | JS |
| `ILLO_PURPLE_40` | `#a056f2` | JS |
| `ILLO_PURPLE_50` | `#612caf` | JS |
| `ILLO_PURPLE_60` | `#3e1689` | JS |
| `ILLO_PURPLE_70` | `#1d0066` | JS |
| `LEGACY_ANDROID_BLUR_OVERLAY_DEFAULT` | `{}` | JS |
| `LEGACY_ANDROID_BLUR_OVERLAY_ULTRA_THIN` | `{}` | JS |
| `LEGACY_BLUR_FALLBACK_DEFAULT` | `{}` | JS |
| `LEGACY_BLUR_FALLBACK_ULTRA_THIN` | `{}` | JS |
| `LOL` | `#021f25` | JS |
| `MENTION_FOREGROUND` | `{}` | JS |
| `OPACITY_1` | `#97979f05` | JS |
| `OPACITY_12` | `#97979f1f` | JS |
| `OPACITY_16` | `#97979f29` | JS |
| `OPACITY_20` | `#97979f33` | JS |
| `OPACITY_24` | `#97979f3d` | JS |
| `OPACITY_28` | `#97979f47` | JS |
| `OPACITY_32` | `#97979f52` | JS |
| `OPACITY_36` | `#97979f5c` | JS |
| `OPACITY_4` | `#97979f0a` | JS |
| `OPACITY_40` | `#97979f66` | JS |
| `OPACITY_44` | `#97979f70` | JS |
| `OPACITY_48` | `#97979f7a` | JS |
| `OPACITY_52` | `#97979f85` | JS |
| `OPACITY_56` | `#97979f8f` | JS |
| `OPACITY_60` | `#97979f99` | JS |
| `OPACITY_64` | `#97979fa3` | JS |
| `OPACITY_68` | `#97979fad` | JS |
| `OPACITY_72` | `#97979fb8` | JS |
| `OPACITY_76` | `#97979fc2` | JS |
| `OPACITY_8` | `#97979f14` | JS |
| `OPACITY_80` | `#97979fcc` | JS |
| `OPACITY_84` | `#97979fd6` | JS |
| `OPACITY_88` | `#97979fe0` | JS |
| `OPACITY_92` | `#97979feb` | JS |
| `OPACITY_96` | `#97979ff5` | JS |
| `OPACITY_BLURPLE_1` | `#5865f205` | JS |
| `OPACITY_BLURPLE_12` | `#5865f21f` | JS |
| `OPACITY_BLURPLE_16` | `#5865f229` | JS |
| `OPACITY_BLURPLE_20` | `#5865f233` | JS |
| `OPACITY_BLURPLE_24` | `#5865f23d` | JS |
| `OPACITY_BLURPLE_28` | `#5865f247` | JS |
| `OPACITY_BLURPLE_32` | `#5865f252` | JS |
| `OPACITY_BLURPLE_36` | `#5865f25c` | JS |
| `OPACITY_BLURPLE_4` | `#5865f20a` | JS |
| `OPACITY_BLURPLE_40` | `#5865f266` | JS |
| `OPACITY_BLURPLE_44` | `#5865f270` | JS |
| `OPACITY_BLURPLE_48` | `#5865f27a` | JS |
| `OPACITY_BLURPLE_52` | `#5865f285` | JS |
| `OPACITY_BLURPLE_56` | `#5865f28f` | JS |
| `OPACITY_BLURPLE_60` | `#5865f299` | JS |
| `OPACITY_BLURPLE_64` | `#5865f2a3` | JS |
| `OPACITY_BLURPLE_68` | `#5865f2ad` | JS |
| `OPACITY_BLURPLE_72` | `#5865f2b8` | JS |
| `OPACITY_BLURPLE_76` | `#5865f2c2` | JS |
| `OPACITY_BLURPLE_8` | `#5865f214` | JS |
| `OPACITY_BLURPLE_80` | `#5865f2cc` | JS |
| `OPACITY_BLURPLE_84` | `#5865f2d6` | JS |
| `OPACITY_BLURPLE_88` | `#5865f2e0` | JS |
| `OPACITY_BLURPLE_92` | `#5865f2eb` | JS |
| `OPACITY_BLURPLE_96` | `#5865f2f5` | JS |
| `OVERLAY_BACKDROP_LIGHTBOX` | `{}` | JS |
| `PANEL_BG` | `{}` | JS |
| `PARTNER` | `#4087ed` | JS |
| `PAYPAL` | `#13216b` | JS |
| `PLAYSTATION` | `#032f87` | JS |
| `PLUM_0` | `#f9f9fa` | JS |
| `PLUM_1` | `#f3f3f4` | JS |
| `PLUM_10` | `#818491` | JS |
| `PLUM_11` | `#6c6f7c` | JS |
| `PLUM_12` | `#5b5e6a` | JS |
| `PLUM_13` | `#4d505b` | JS |
| `PLUM_14` | `#41434d` | JS |
| `PLUM_15` | `#383a43` | JS |
| `PLUM_16` | `#31323b` | JS |
| `PLUM_17` | `#2c2d35` | JS |
| `PLUM_18` | `#26272f` | JS |
| `PLUM_19` | `#212229` | JS |
| `PLUM_2` | `#ecedef` | JS |
| `PLUM_20` | `#1c1d23` | JS |
| `PLUM_21` | `#18191f` | JS |
| `PLUM_22` | `#16161c` | JS |
| `PLUM_23` | `#131318` | JS |
| `PLUM_23_ALPHA` | `#bcbcf01a` | JS |
| `PLUM_24` | `#0f1014` | JS |
| `PLUM_25` | `#0c0c10` | JS |
| `PLUM_26` | `#08080b` | JS |
| `PLUM_3` | `#e4e5e8` | JS |
| `PLUM_4` | `#dddee1` | JS |
| `PLUM_5` | `#d3d5d9` | JS |
| `PLUM_6` | `#c7c8ce` | JS |
| `PLUM_7` | `#b8bac1` | JS |
| `PLUM_8` | `#a8aab4` | JS |
| `PLUM_9` | `#9597a3` | JS |
| `POLLS_VICTOR_FILL` | `{}` | JS |
| `POLLS_VOTED_FILL` | `{}` | JS |
| `PROFILE_GRADIENT_OVERLAY` | `{}` | JS |
| `PROFILE_GRADIENT_OVERLAY_SYNCED_WITH_USER_THEME` | `{}` | JS |
| `PROFILE_GRADIENT_ROLE_PILL_BORDER` | `{}` | JS |
| `PROFILE_GRADIENT_SECTION_BOX` | `{}` | JS |
| `REDDIT` | `#ff4500` | JS |
| `REDESIGN_ACTIVITY_CARD_BADGE_ICON` | `{}` | JS |
| `RIOT_GAMES` | `#ea0029` | JS |
| `ROLE_BLUE` | `#206694` | JS |
| `ROLE_BROWN` | `#a84300` | JS |
| `ROLE_BURGUNDY` | `#ad1457` | JS |
| `ROLE_DARK_BLUE` | `#546e7a` | JS |
| `ROLE_DARK_GREY` | `#607d8b` | JS |
| `ROLE_DARK_PURPLE` | `#71368a` | JS |
| `ROLE_DARK_TEAL` | `#11806a` | JS |
| `ROLE_DEFAULT` | `#99aab5` | JS |
| `ROLE_GREEN` | `#1f8b4c` | JS |
| `ROLE_GREY` | `#979c9f` | JS |
| `ROLE_LIGHT_BLUE` | `#99aab5` | JS |
| `ROLE_LIGHT_GREEN` | `#2ecc71` | JS |
| `ROLE_LIGHT_GREY` | `#95a5a6` | JS |
| `ROLE_MAGENTA` | `#e91e63` | JS |
| `ROLE_ORANGE` | `#e67e22` | JS |
| `ROLE_PURPLE` | `#9b59b6` | JS |
| `ROLE_SALMON` | `#e74c3c` | JS |
| `ROLE_SKY_BLUE` | `#3498db` | JS |
| `ROLE_TAN` | `#c27c0e` | JS |
| `ROLE_TEAL` | `#1abc9c` | JS |
| `ROLE_TERRACOTTA` | `#992d22` | JS |
| `ROLE_YELLOW` | `#f1c40f` | JS |
| `SAMSUNG` | `#1429a0` | JS |
| `SKYPE` | `#009dd7` | JS |
| `SPINE_DEFAULT` | `{}` | JS |
| `SPOTIFY` | `#1db954` | JS |
| `STAGE_CARD_PILL_BG` | `{}` | JS |
| `STEAM` | `#182332` | JS |
| `THEME_LOCKED_BLUR_FALLBACK` | `{}` | JS |
| `TRANSPARENT` | `#00000000` | JS |
| `TWITCH` | `#9147ff` | JS |
| `TWITCH_SECONDARY` | `#772ce8` | JS |
| `TWITTER` | `#1da1f2` | JS |
| `VOICE_VIDEO_VIDEO_TILE_BLUR_FALLBACK` | `{}` | JS |
| `WHITE` | `#ffffff` | JS |
| `XBOX` | `#107c10` | JS |
| `YOUTUBE` | `#cb2120` | JS |

*Total: 1102 variables*
