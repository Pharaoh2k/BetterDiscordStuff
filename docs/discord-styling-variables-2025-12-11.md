# Discord Theme Variables
*Generated on 11/12/2025 at 09:22:28*

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
| `--__spoiler-background-color--hidden` | `color-mix(in oklab,hsl(234.545 calc(1*5.116%) 4...` | CSS |
| `--__spoiler-background-color--hidden--hover` | `color-mix(in oklab,hsl(233.333 calc(1*3.83%) 53...` | CSS |
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
| `--background-code-addition` | `color-mix(in oklab,hsl(145.97 calc(1*100%) 26.2...` | CSS |
| `--background-code-deletion` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--background-feedback-critical` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--background-feedback-info` | `color-mix(in oklab,hsl(209.339 calc(1*100%) 44....` | CSS |
| `--background-feedback-positive` | `color-mix(in oklab,hsl(145.97 calc(1*100%) 26.2...` | CSS |
| `--background-feedback-warning` | `color-mix(in oklab,hsl(36.894 calc(1*100%) 31.5...` | CSS |
| `--background-mobile-secondary` | `color-mix(in oklab,hsl(240 calc(1*6.452%) 12.15...` | CSS |
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
| `--badge-background-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
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
| `--button-outline-brand-background` | `hsl(0 calc(1*0%) 100%/0)` | CSS |
| `--button-outline-brand-background-hover` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--button-outline-positive-background` | `hsl(0 calc(1*0%) 100%/0)` | CSS |
| `--button-outline-primary-background` | `hsl(0 calc(1*0%) 100%/0)` | CSS |
| `--card-background-default` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--channeltextarea-background` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--chat-background` | `color-mix(in oklab,hsl(231.429 calc(1*6.542%) 2...` | CSS |
| `--chat-background-default` | `color-mix(in oklab,hsl(228 calc(1*6.849%) 14.31...` | CSS |
| `--checkbox-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--checkbox-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--checkbox-background-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--checkbox-background-selected-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--checkbox-background-selected-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--checkpoint-persona-eight-background-overlay` | `color-mix(in oklab,hsl(32 calc(1*60%) 9.804%/1)...` | CSS |
| `--checkpoint-persona-eight-background-overlay-raw` | `hsl(32 calc(1*60%) 9.804%/1)` | CSS |
| `--checkpoint-persona-eight-background-overlay-raw-hsl` | `32 calc(1*60%) 9.804%` | CSS |
| `--checkpoint-persona-five-background-overlay` | `color-mix(in oklab,hsl(339.545 calc(1*66.667%) ...` | CSS |
| `--checkpoint-persona-five-background-overlay-raw` | `hsl(339.545 calc(1*66.667%) 12.941%/1)` | CSS |
| `--checkpoint-persona-five-background-overlay-raw-hsl` | `339.545 calc(1*66.667%) 12.941%` | CSS |
| `--checkpoint-persona-four-background-overlay` | `color-mix(in oklab,hsl(312.222 calc(1*93.103%) ...` | CSS |
| `--checkpoint-persona-four-background-overlay-raw` | `hsl(312.222 calc(1*93.103%) 11.373%/1)` | CSS |
| `--checkpoint-persona-four-background-overlay-raw-hsl` | `312.222 calc(1*93.103%) 11.373%` | CSS |
| `--checkpoint-persona-nine-background-overlay` | `color-mix(in oklab,hsl(0 calc(1*0%) 14.902%/1) ...` | CSS |
| `--checkpoint-persona-nine-background-overlay-raw` | `hsl(0 calc(1*0%) 14.902%/1)` | CSS |
| `--checkpoint-persona-nine-background-overlay-raw-hsl` | `0 calc(1*0%) 14.902%` | CSS |
| `--checkpoint-persona-one-background-overlay` | `color-mix(in oklab,hsl(169.5 calc(1*76.923%) 10...` | CSS |
| `--checkpoint-persona-one-background-overlay-raw` | `hsl(169.5 calc(1*76.923%) 10.196%/1)` | CSS |
| `--checkpoint-persona-one-background-overlay-raw-hsl` | `169.5 calc(1*76.923%) 10.196%` | CSS |
| `--checkpoint-persona-seven-background-overlay` | `color-mix(in oklab,hsl(44.516 calc(1*100%) 6.07...` | CSS |
| `--checkpoint-persona-seven-background-overlay-raw` | `hsl(44.516 calc(1*100%) 6.078%/1)` | CSS |
| `--checkpoint-persona-seven-background-overlay-raw-hsl` | `44.516 calc(1*100%) 6.078%` | CSS |
| `--checkpoint-persona-six-background-overlay` | `color-mix(in oklab,hsl(27 calc(1*80%) 9.804%/1)...` | CSS |
| `--checkpoint-persona-six-background-overlay-raw` | `hsl(27 calc(1*80%) 9.804%/1)` | CSS |
| `--checkpoint-persona-six-background-overlay-raw-hsl` | `27 calc(1*80%) 9.804%` | CSS |
| `--checkpoint-persona-three-background-overlay` | `color-mix(in oklab,hsl(262.105 calc(1*80.282%) ...` | CSS |
| `--checkpoint-persona-three-background-overlay-raw` | `hsl(262.105 calc(1*80.282%) 13.922%/1)` | CSS |
| `--checkpoint-persona-three-background-overlay-raw-hsl` | `262.105 calc(1*80.282%) 13.922%` | CSS |
| `--checkpoint-persona-two-background-overlay` | `color-mix(in oklab,hsl(260.426 calc(1*70.149%) ...` | CSS |
| `--checkpoint-persona-two-background-overlay-raw` | `hsl(260.426 calc(1*70.149%) 13.137%/1)` | CSS |
| `--checkpoint-persona-two-background-overlay-raw-hsl` | `260.426 calc(1*70.149%) 13.137%` | CSS |
| `--checkpoint-persona-zero-background-overlay` | `color-mix(in oklab,hsl(148.8 calc(1*60.976%) 8....` | CSS |
| `--checkpoint-persona-zero-background-overlay-raw` | `hsl(148.8 calc(1*60.976%) 8.039%/1)` | CSS |
| `--checkpoint-persona-zero-background-overlay-raw-hsl` | `148.8 calc(1*60.976%) 8.039%` | CSS |
| `--chip-blurple-dark-background` | `hsl(230.968 calc(1*49.206%) 37.059%/1)` | CSS |
| `--chip-blurple-light-background` | `hsl(228.539 calc(1*100%) 82.549%/1)` | CSS |
| `--chip-blurple-medium-background` | `hsl(231.679 calc(1*88.387%) 69.608%/1)` | CSS |
| `--chip-gray-dark-background` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--chip-gray-light-background` | `hsl(225 calc(1*5.882%) 86.667%/1)` | CSS |
| `--chip-gray-medium-background` | `hsl(234 calc(1*4.386%) 44.706%/1)` | CSS |
| `--chip-green-dark-background` | `hsl(144.146 calc(1*100%) 16.078%/1)` | CSS |
| `--chip-green-light-background` | `hsl(130 calc(1*42.857%) 67.059%/1)` | CSS |
| `--chip-green-medium-background` | `hsl(139.266 calc(1*60.894%) 35.098%/1)` | CSS |
| `--chip-orange-dark-background` | `hsl(22.881 calc(1*100%) 23.137%/1)` | CSS |
| `--chip-orange-light-background` | `hsl(21.579 calc(1*79.167%) 71.765%/1)` | CSS |
| `--chip-orange-medium-background` | `hsl(22.36 calc(1*63.636%) 49.608%/1)` | CSS |
| `--chip-pink-dark-background` | `hsl(305.455 calc(1*76.101%) 31.176%/1)` | CSS |
| `--chip-pink-light-background` | `hsl(308 calc(1*90.909%) 87.059%/1)` | CSS |
| `--chip-pink-medium-background` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--chip-purple-dark-background` | `hsl(260.87 calc(1*72.327%) 31.176%/1)` | CSS |
| `--chip-purple-light-background` | `hsl(268.966 calc(1*90.625%) 87.451%/1)` | CSS |
| `--chip-purple-medium-background` | `hsl(268.462 calc(1*85.714%) 64.314%/1)` | CSS |
| `--chip-red-dark-background` | `hsl(356 calc(1*67.742%) 30.392%/1)` | CSS |
| `--chip-red-light-background` | `hsl(2.804 calc(1*100%) 79.02%/1)` | CSS |
| `--chip-red-medium-background` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--chip-yellow-dark-background` | `hsl(32.308 calc(1*100%) 20.392%/1)` | CSS |
| `--chip-yellow-light-background` | `hsl(33.061 calc(1*59.756%) 67.843%/1)` | CSS |
| `--chip-yellow-medium-background` | `hsl(35.172 calc(1*74.359%) 38.235%/1)` | CSS |
| `--context-menu-backdrop-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.721568...` | CSS |
| `--control-background-active-loading` | `hsl(145.97 calc(1*100%) 26.275%/1)` | CSS |
| `--control-background-critical-primary-loading` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--control-background-critical-secondary-loading` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-background-expressive-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-background-overlay-primary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-background-overlay-secondary-loading` | `hsl(0 calc(1*0%) 0%/0.5215686274509804)` | CSS |
| `--control-background-primary-loading` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--control-background-secondary-loading` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-connect-background-active` | `hsl(145.2 calc(1*96.154%) 20.392%/1)` | CSS |
| `--control-connect-background-default` | `hsl(145.97 calc(1*100%) 26.275%/1)` | CSS |
| `--control-connect-background-hover` | `hsl(144.522 calc(1*92%) 24.51%/1)` | CSS |
| `--control-critical-primary-background-active` | `hsl(355.714 calc(1*64.948%) 38.039%/1)` | CSS |
| `--control-critical-primary-background-default` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--control-critical-primary-background-hover` | `hsl(355.51 calc(1*64.192%) 44.902%/1)` | CSS |
| `--control-critical-secondary-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-critical-secondary-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-critical-secondary-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--control-expressive-background-active` | `hsl(225 calc(1*5.882%) 86.667%/1)` | CSS |
| `--control-expressive-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-expressive-background-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-only-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-icon-only-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--control-overlay-primary-background-active` | `hsl(230 calc(1*5%) 76.471%/1)` | CSS |
| `--control-overlay-primary-background-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-primary-background-hover` | `hsl(220 calc(1*4.918%) 88.039%/1)` | CSS |
| `--control-overlay-secondary-background-active` | `hsl(0 calc(1*0%) 0%/0.47843137254901963)` | CSS |
| `--control-overlay-secondary-background-default` | `hsl(0 calc(1*0%) 0%/0.5215686274509804)` | CSS |
| `--control-overlay-secondary-background-hover` | `hsl(0 calc(1*0%) 0%/0.6392156862745098)` | CSS |
| `--control-primary-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--control-primary-background-default` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--control-primary-background-hover` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--control-secondary-background-active` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--control-secondary-background-default` | `hsl(240 calc(1*4%) 60.784%/0.0784313725490196)` | CSS |
| `--control-secondary-background-hover` | `hsl(240 calc(1*4%) 60.784%/0.1607843137254902)` | CSS |
| `--creator-revenue-info-box-background` | `color-mix(in oklab,hsl(184.154 calc(1*95.588%) ...` | CSS |
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
| `--message-automod-background-default` | `color-mix(in oklab,hsl(1.417 calc(1*86.395%) 71...` | CSS |
| `--message-automod-background-hover` | `color-mix(in oklab,hsl(357.692 calc(1*67.826%) ...` | CSS |
| `--message-background-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--message-highlight-background-default` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--message-highlight-background-hover` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--message-mentioned-background-default` | `color-mix(in oklab,hsl(36.894 calc(1*100%) 31.5...` | CSS |
| `--message-mentioned-background-hover` | `color-mix(in oklab,hsl(36.894 calc(1*100%) 31.5...` | CSS |
| `--message-reacted-background-default` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--mobile-background-scrim-opaque` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/1) 100%,...` | CSS |
| `--modal-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--modal-footer-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--notice-background-critical` | `hsl(353.333 calc(1*87.805%) 16.078%/1)` | CSS |
| `--notice-background-info` | `hsl(208.732 calc(1*100%) 13.922%/1)` | CSS |
| `--notice-background-positive` | `hsl(135.349 calc(1*100%) 8.431%/1)` | CSS |
| `--notice-background-warning` | `hsl(21.905 calc(1*100%) 12.353%/1)` | CSS |
| `--polls-normal-image-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--profile-gradient-note-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.3) 100...` | CSS |
| `--profile-gradient-role-pill-background` | `color-mix(in oklab,hsl(240 calc(1*6.494%) 15.09...` | CSS |
| `--radio-background-active` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--radio-background-default` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-background-default-selected` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--radio-background-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-background-hover-selected` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--radio-thumb-background-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--redesign-button-active-background` | `color-mix(in oklab,hsl(145.238 calc(1*95.455%) ...` | CSS |
| `--redesign-button-active-pressed-background` | `color-mix(in oklab,hsl(145 calc(1*93.103%) 22.7...` | CSS |
| `--redesign-button-danger-background` | `color-mix(in oklab,hsl(356.625 calc(1*66.116%) ...` | CSS |
| `--redesign-button-danger-pressed-background` | `color-mix(in oklab,hsl(355.51 calc(1*64.192%) 4...` | CSS |
| `--redesign-button-destructive-background` | `color-mix(in oklab,hsl(356.625 calc(1*66.116%) ...` | CSS |
| `--redesign-button-destructive-pressed-background` | `color-mix(in oklab,hsl(355.51 calc(1*64.192%) 4...` | CSS |
| `--redesign-button-overlay-alpha-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.54) 10...` | CSS |
| `--redesign-button-overlay-alpha-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.64) 10...` | CSS |
| `--redesign-button-overlay-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-positive-background` | `color-mix(in oklab,hsl(145.238 calc(1*95.455%) ...` | CSS |
| `--redesign-button-positive-pressed-background` | `color-mix(in oklab,hsl(145 calc(1*93.103%) 22.7...` | CSS |
| `--redesign-button-premium-primary-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.1) 100...` | CSS |
| `--redesign-button-primary-alt-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-primary-alt-on-blurple-background` | `color-mix(in oklab,hsl(233.957 calc(1*65.877%) ...` | CSS |
| `--redesign-button-primary-alt-on-blurple-pressed-background` | `color-mix(in oklab,hsl(233.957 calc(1*65.877%) ...` | CSS |
| `--redesign-button-primary-alt-pressed-background` | `color-mix(in oklab,hsl(228.358 calc(1*54.472%) ...` | CSS |
| `--redesign-button-primary-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-primary-overlay-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-primary-overlay-pressed-background` | `color-mix(in oklab,hsl(220 calc(1*4.918%) 88.03...` | CSS |
| `--redesign-button-primary-pressed-background` | `color-mix(in oklab,hsl(233.115 calc(1*49.194%) ...` | CSS |
| `--redesign-button-secondary-background` | `color-mix(in oklab,hsl(232.5 calc(1*6.557%) 23....` | CSS |
| `--redesign-button-secondary-overlay-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.54) 10...` | CSS |
| `--redesign-button-secondary-overlay-pressed-background` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.64) 10...` | CSS |
| `--redesign-button-secondary-pressed-background` | `color-mix(in oklab,hsl(234.545 calc(1*6.509%) 3...` | CSS |
| `--redesign-button-selected-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-selected-pressed-background` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-tertiary-background` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--redesign-button-tertiary-pressed-background` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--search-popout-date-picker-hint-value-background` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--search-popout-date-picker-hint-value-background-hover` | `hsl(234.935 calc(1*85.556%) 64.706%/0.321568627...` | CSS |
| `--spoiler-hidden-background` | `color-mix(in oklab,hsl(234.545 calc(1*5.116%) 4...` | CSS |
| `--spoiler-hidden-background-hover` | `color-mix(in oklab,hsl(233.333 calc(1*3.83%) 53...` | CSS |
| `--spoiler-revealed-background` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--status-positive-background` | `hsl(145.238 calc(1*95.455%) 25.882%/1)` | CSS |
| `--status-warning-background` | `hsl(33.684 calc(1*53.774%) 58.431%/1)` | CSS |
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
| `BACKGROUND_MOBILE_PRIMARY` | `{}` | JS |
| `BACKGROUND_MOBILE_SECONDARY` | `{}` | JS |
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
| `BUTTON_OUTLINE_BRAND_BACKGROUND` | `{}` | JS |
| `BUTTON_OUTLINE_BRAND_BACKGROUND_HOVER` | `{}` | JS |
| `BUTTON_OUTLINE_POSITIVE_BACKGROUND` | `{}` | JS |
| `BUTTON_OUTLINE_PRIMARY_BACKGROUND` | `{}` | JS |
| `CARD_BACKGROUND_DEFAULT` | `{}` | JS |
| `CHANNELTEXTAREA_BACKGROUND` | `{}` | JS |
| `CHAT_INPUT_CONTAINER_BACKGROUND` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_BACKGROUND_OVERLAY_RAW` | `#281a0a` | JS |
| `CHECKPOINT_PERSONA_FIVE_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FIVE_BACKGROUND_OVERLAY_RAW` | `#370b1a` | JS |
| `CHECKPOINT_PERSONA_FOUR_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FOUR_BACKGROUND_OVERLAY_RAW` | `#38022d` | JS |
| `CHECKPOINT_PERSONA_NINE_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_NINE_BACKGROUND_OVERLAY_RAW` | `#262626` | JS |
| `CHECKPOINT_PERSONA_ONE_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ONE_BACKGROUND_OVERLAY_RAW` | `#062e27` | JS |
| `CHECKPOINT_PERSONA_SEVEN_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SEVEN_BACKGROUND_OVERLAY_RAW` | `#1f1700` | JS |
| `CHECKPOINT_PERSONA_SIX_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SIX_BACKGROUND_OVERLAY_RAW` | `#2d1705` | JS |
| `CHECKPOINT_PERSONA_THREE_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_THREE_BACKGROUND_OVERLAY_RAW` | `#1c0740` | JS |
| `CHECKPOINT_PERSONA_TWO_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_TWO_BACKGROUND_OVERLAY_RAW` | `#1a0a39` | JS |
| `CHECKPOINT_PERSONA_ZERO_BACKGROUND_OVERLAY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ZERO_BACKGROUND_OVERLAY_RAW` | `#082114` | JS |
| `CONTEXT_MENU_BACKDROP_BACKGROUND` | `{}` | JS |
| `CONTROL_CONNECT_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_CRITICAL_PRIMARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_PRIMARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_BACKGROUND_ACTIVE` | `{}` | JS |
| `CONTROL_SECONDARY_BACKGROUND_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_BACKGROUND_HOVER` | `{}` | JS |
| `DISPLAY_BANNER_OVERFLOW_BACKGROUND` | `{}` | JS |
| `EMBED_BACKGROUND` | `{}` | JS |
| `EMBED_BACKGROUND_ALTERNATE` | `{}` | JS |
| `FORUM_POST_EXTRA_MEDIA_COUNT_CONTAINER_BACKGROUND` | `{}` | JS |
| `FORUM_POST_TAG_BACKGROUND` | `{}` | JS |
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
| `MOBILE_ANDROID_BUTTON_BACKGROUND_RIPPLE` | `{}` | JS |
| `MOBILE_BACKGROUND_SCRIM_OPAQUE` | `{}` | JS |
| `MODAL_BACKGROUND` | `{}` | JS |
| `MODAL_FOOTER_BACKGROUND` | `{}` | JS |
| `NOTICE_BACKGROUND_POSITIVE` | `{}` | JS |
| `POLLS_NORMAL_IMAGE_BACKGROUND` | `{}` | JS |
| `PROFILE_GRADIENT_NOTE_BACKGROUND` | `{}` | JS |
| `PROFILE_GRADIENT_ROLE_PILL_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DANGER_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DANGER_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_POSITIVE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_POSITIVE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_ON_BLURPLE_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_ON_BLURPLE_PRESSED_BACKGROUND` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_PRESSED_BACKGROUND` | `{}` | JS |
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
| `USER_PROFILE_HEADER_OVERFLOW_BACKGROUND` | `{}` | JS |
| `VOICE_VIDEO_VIDEO_TILE_BACKGROUND` | `{}` | JS |

*Total: 556 variables*

---

## Text & Typography

| Variable | Value | Type |
|----------|-------|------|
| `--__spoiler-text-color--hidden` | `transparent` | CSS |
| `--__spoiler-warning-text-color` | `hsl(240 calc(1*5.66%) 89.608%/1)` | CSS |
| `--__spoiler-warning-text-color--hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--badge-expressive-text-default` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--badge-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--channel-text-area-placeholder` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--chat-text-muted` | `color-mix(in oklab,hsl(233.333 calc(1*3.734%) 5...` | CSS |
| `--content-inventory-overlay-text-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.85) ...` | CSS |
| `--content-inventory-overlay-text-secondary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.7) 1...` | CSS |
| `--control-connect-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connect-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connect-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-text-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-secondary-text-active` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-critical-secondary-text-default` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-critical-secondary-text-hover` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
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
| `--control-text-active-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-text-critical-primary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-text-critical-secondary-loading` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-text-expressive-loading` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-text-overlay-primary-loading` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-text-overlay-secondary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-text-primary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-text-secondary-loading` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
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
| `--deprecated-text-input-bg` | `color-mix(in oklab,hsl(225 calc(1*6.25%) 12.549...` | CSS |
| `--deprecated-text-input-border` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.3) 100...` | CSS |
| `--deprecated-text-input-border-disabled` | `color-mix(in oklab,hsl(225 calc(1*6.25%) 12.549...` | CSS |
| `--deprecated-text-input-border-hover` | `color-mix(in oklab,hsl(240 calc(1*20%) 0.98%/1)...` | CSS |
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
| `--header-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--input-placeholder-text-dark` | `hsl(216 calc(1*2.128%) 53.922%/1)` | CSS |
| `--input-placeholder-text-dark-hsl` | `216 calc(1*2.128%) 53.922%` | CSS |
| `--input-placeholder-text-default` | `color-mix(in oklab,hsl(233.333 calc(1*3.529%) 5...` | CSS |
| `--input-text-default` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--input-text-error-default` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--interactive-text-active` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--interactive-text-default` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
| `--interactive-text-hover` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--lol-text-dark` | `hsl(37.444 calc(1*81.595%) 31.961%/1)` | CSS |
| `--lol-text-dark-hsl` | `37.444 calc(1*81.595%) 31.961%` | CSS |
| `--lol-text-light` | `hsl(41.143 calc(1*50.239%) 59.02%/1)` | CSS |
| `--lol-text-light-hsl` | `41.143 calc(1*50.239%) 59.02%` | CSS |
| `--message-reacted-text-default` | `color-mix(in oklab,hsl(228 calc(1*100%) 86.275%...` | CSS |
| `--navigator-header-tint` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--notice-text-critical` | `hsl(3.636 calc(1*100%) 87.059%/1)` | CSS |
| `--notice-text-info` | `hsl(214.167 calc(1*94.737%) 85.098%/1)` | CSS |
| `--notice-text-positive` | `hsl(130 calc(1*50.769%) 74.51%/1)` | CSS |
| `--notice-text-warning` | `hsl(32.308 calc(1*68.421%) 77.647%/1)` | CSS |
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
| `--search-popout-option-non-text-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--text-brand` | `color-mix(in oklab,hsl(230.551 calc(1*91.367%) ...` | CSS |
| `--text-code` | `color-mix(in oklab,hsl(213.6 calc(1*85.034%) 71...` | CSS |
| `--text-code-addition` | `color-mix(in oklab,hsl(130.633 calc(1*38.537%) ...` | CSS |
| `--text-code-builtin` | `color-mix(in oklab,hsl(22.031 calc(1*74.419%) 6...` | CSS |
| `--text-code-bullet` | `color-mix(in oklab,hsl(33.333 calc(1*55.67%) 61...` | CSS |
| `--text-code-comment` | `color-mix(in oklab,hsl(233.333 calc(1*3.965%) 5...` | CSS |
| `--text-code-deletion` | `color-mix(in oklab,hsl(2.632 calc(1*95%) 76.471...` | CSS |
| `--text-code-keyword` | `color-mix(in oklab,hsl(2.069 calc(1*93.548%) 75...` | CSS |
| `--text-code-section` | `color-mix(in oklab,hsl(213.6 calc(1*85.034%) 71...` | CSS |
| `--text-code-string` | `color-mix(in oklab,hsl(185.06 calc(1*39.336%) 5...` | CSS |
| `--text-code-tag` | `color-mix(in oklab,hsl(130.263 calc(1*40.86%) 6...` | CSS |
| `--text-code-title` | `color-mix(in oklab,hsl(228.791 calc(1*97.849%) ...` | CSS |
| `--text-code-variable` | `color-mix(in oklab,hsl(213.889 calc(1*87.097%) ...` | CSS |
| `--text-default` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--text-feedback-critical` | `color-mix(in oklab,hsl(1.353 calc(1*82.609%) 68...` | CSS |
| `--text-feedback-info` | `color-mix(in oklab,hsl(213.423 calc(1*82.32%) 6...` | CSS |
| `--text-feedback-positive` | `color-mix(in oklab,hsl(132.809 calc(1*34.902%) ...` | CSS |
| `--text-feedback-warning` | `color-mix(in oklab,hsl(34 calc(1*50.847%) 53.72...` | CSS |
| `--text-invert` | `color-mix(in oklab,hsl(230 calc(1*6%) 19.608%/1...` | CSS |
| `--text-link` | `color-mix(in oklab,hsl(213.077 calc(1*81.25%) 6...` | CSS |
| `--text-link-low-saturation` | `color-mix(in oklab,hsl(213.237 calc(1*83.234%) ...` | CSS |
| `--text-low-contrast` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--text-message-preview-low-sat` | `color-mix(in oklab,hsl(234 calc(1*4.386%) 44.70...` | CSS |
| `--text-muted` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--text-status-dnd` | `color-mix(in oklab,hsl(357.692 calc(1*67.826%) ...` | CSS |
| `--text-status-idle` | `color-mix(in oklab,hsl(33.684 calc(1*53.774%) 5...` | CSS |
| `--text-status-offline` | `color-mix(in oklab,hsl(232.5 calc(1*4%) 60.784%...` | CSS |
| `--text-status-online` | `color-mix(in oklab,hsl(134.526 calc(1*41.485%) ...` | CSS |
| `--text-strong` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--text-subtle` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
| `CONTENT_INVENTORY_OVERLAY_TEXT_PRIMARY` | `{}` | JS |
| `CONTENT_INVENTORY_OVERLAY_TEXT_SECONDARY` | `{}` | JS |
| `CONTROL_PRIMARY_TEXT_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_TEXT_DEFAULT` | `{}` | JS |
| `HEADER_PRIMARY` | `{}` | JS |
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
| `TEXT_LINK_LOW_SATURATION` | `{}` | JS |
| `TEXT_LOW_CONTRAST` | `{}` | JS |
| `TEXT_MESSAGE_PREVIEW_LOW_SAT` | `{}` | JS |
| `TEXT_MUTED` | `{}` | JS |
| `TEXT_STATUS_DND` | `{}` | JS |
| `TEXT_STATUS_IDLE` | `{}` | JS |
| `TEXT_STATUS_OFFLINE` | `{}` | JS |
| `TEXT_STATUS_ONLINE` | `{}` | JS |
| `TEXT_STRONG` | `{}` | JS |
| `TEXT_SUBTLE` | `{}` | JS |

*Total: 170 variables*

---

## Interactive

| Variable | Value | Type |
|----------|-------|------|
| `--interactive-icon-active` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--interactive-icon-default` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
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
| `--redesign-button-danger-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-destructive-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-overlay-alpha-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-overlay-text` | `color-mix(in oklab,hsl(240 calc(1*9.091%) 2.157...` | CSS |
| `--redesign-button-positive-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-premium-primary-blue-for-gradient` | `color-mix(in oklab,hsl(209.022 calc(1*80%) 45.0...` | CSS |
| `--redesign-button-premium-primary-pink-for-gradient` | `color-mix(in oklab,hsl(325.385 calc(1*31.707%) ...` | CSS |
| `--redesign-button-premium-primary-purple-for-gradient` | `color-mix(in oklab,hsl(269.291 calc(1*52.697%) ...` | CSS |
| `--redesign-button-premium-primary-purple-for-gradient-2` | `color-mix(in oklab,hsl(295.645 calc(1*50%) 51.3...` | CSS |
| `--redesign-button-primary-alt-border` | `color-mix(in oklab,hsl(230.551 calc(1*91.367%) ...` | CSS |
| `--redesign-button-primary-alt-on-blurple-border` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-primary-alt-on-blurple-pressed-border` | `color-mix(in oklab,hsl(229.189 calc(1*94.872%) ...` | CSS |
| `--redesign-button-primary-alt-on-blurple-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-primary-alt-pressed-border` | `color-mix(in oklab,hsl(231.298 calc(1*90.345%) ...` | CSS |
| `--redesign-button-primary-alt-pressed-text` | `color-mix(in oklab,hsl(229.189 calc(1*94.872%) ...` | CSS |
| `--redesign-button-primary-alt-text` | `color-mix(in oklab,hsl(230.551 calc(1*91.367%) ...` | CSS |
| `--redesign-button-primary-on-blurple-pressed-text` | `color-mix(in oklab,hsl(233.957 calc(1*65.877%) ...` | CSS |
| `--redesign-button-primary-overlay-text` | `color-mix(in oklab,hsl(240 calc(1*7.692%) 5.098...` | CSS |
| `--redesign-button-primary-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-secondary-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--redesign-button-secondary-overlay-text` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--redesign-button-secondary-pressed-border` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--redesign-button-secondary-text` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--redesign-button-selected-text` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
| `--redesign-button-tertiary-pressed-text` | `color-mix(in oklab,hsl(225 calc(1*4.762%) 83.52...` | CSS |
| `--redesign-button-tertiary-text` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--shadow-button-overlay` | `0 12px 24px 0 hsl(none 0% 0%/0.24)` | CSS |
| `--shadow-button-overlay-filter` | `drop-shadow(0 12px 24px hsl(none 0% 0%/0.24))` | CSS |
| `BUTTON_OUTLINE_BRAND_BORDER_ACTIVE` | `{}` | JS |
| `BUTTON_OUTLINE_PRIMARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_ACTIVE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_DANGER_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_DESTRUCTIVE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_ALPHA_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_OVERLAY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_POSITIVE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_BLUE_FOR_GRADIENT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PINK_FOR_GRADIENT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PURPLE_FOR_GRADIENT` | `{}` | JS |
| `REDESIGN_BUTTON_PREMIUM_PRIMARY_PURPLE_FOR_GRADIENT_2` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_ON_BLURPLE_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_ON_BLURPLE_PRESSED_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_ON_BLURPLE_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_PRESSED_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_PRESSED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ALT_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_ON_BLURPLE_PRESSED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_OVERLAY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_PRIMARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_OVERLAY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_PRESSED_BORDER` | `{}` | JS |
| `REDESIGN_BUTTON_SECONDARY_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_SELECTED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_PRESSED_TEXT` | `{}` | JS |
| `REDESIGN_BUTTON_TERTIARY_TEXT` | `{}` | JS |

*Total: 87 variables*

---

## Input & Form

| Variable | Value | Type |
|----------|-------|------|
| `--chat-input-icon-size` | `20px` | CSS |
| `--checkbox-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--checkbox-border-default` | `hsl(234 calc(1*4.386%) 44.706%/1)` | CSS |
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
| `--input-border-default` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.2) 1...` | CSS |
| `--input-border-error-default` | `color-mix(in oklab,hsl(1.353 calc(1*82.609%) 68...` | CSS |
| `--input-border-error-hover` | `color-mix(in oklab,hsl(357.692 calc(1*67.826%) ...` | CSS |
| `--input-border-hover` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--input-border-readonly` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.0784...` | CSS |
| `--input-foreground-placeholder` | `color-mix(in oklab,hsl(233.333 calc(1*3.529%) 5...` | CSS |
| `--input-icon-default` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
| `--radio-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-border-default` | `hsl(240 calc(1*4%) 60.784%/0.6392156862745098)` | CSS |
| `--radio-border-default-selected` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.8)` | CSS |
| `--radio-border-hover-selected` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--radio-foreground-active` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--radio-foreground-default` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `--radio-foreground-hover` | `hsl(0 calc(1*0%) 0%/0.0784313725490196)` | CSS |
| `INPUT_BORDER_DEFAULT` | `{}` | JS |
| `INPUT_BORDER_ERROR_HOVER` | `{}` | JS |
| `REDESIGN_INPUT_CONTROL_ACTIVE_BG` | `{}` | JS |
| `REDESIGN_INPUT_CONTROL_SELECTED` | `{}` | JS |

*Total: 32 variables*

---

## Border & Divider

| Variable | Value | Type |
|----------|-------|------|
| `--app-border-frame` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-feedback-critical` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--border-focus` | `color-mix(in oklab,hsl(213.333 calc(1*81.818%) ...` | CSS |
| `--border-muted` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-normal` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-strong` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--border-subtle` | `color-mix(in oklab,hsl(240 calc(1*4%) 60.784%/0...` | CSS |
| `--control-border-active-loading` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-border-critical-primary-loading` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-border-critical-secondary-loading` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-border-expressive-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-border-expressive-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-border-expressive-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-border-expressive-loading` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-border-overlay-primary-loading` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--control-border-overlay-secondary-loading` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-border-primary-loading` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-border-secondary-loading` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-connect-border-active` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-connect-border-default` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-connect-border-hover` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-active` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-default` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-primary-border-hover` | `hsl(0 calc(1*0%) 100%/0.0784313725490196)` | CSS |
| `--control-critical-secondary-border-active` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-critical-secondary-border-default` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
| `--control-critical-secondary-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.0392156862745098)` | CSS |
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
| `--switch-border-active` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--switch-border-default` | `hsl(240 calc(1*4%) 60.784%/0.2)` | CSS |
| `--switch-border-hover` | `hsl(240 calc(1*4%) 60.784%/0.4)` | CSS |
| `--switch-border-selected-default` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--switch-border-selected-hover` | `hsl(240 calc(1*4%) 60.784%/0.12156862745098039)` | CSS |
| `--video-calls-base-tile-border-radius` | `16px` | CSS |
| `BORDER_FOCUS` | `{}` | JS |
| `BORDER_MUTED` | `{}` | JS |
| `BORDER_STRONG` | `{}` | JS |
| `BORDER_SUBTLE` | `{}` | JS |
| `CONTROL_CONNECT_BORDER_DEFAULT` | `{}` | JS |
| `CONTROL_SECONDARY_BORDER_DEFAULT` | `{}` | JS |

*Total: 67 variables*

---

## Status

| Variable | Value | Type |
|----------|-------|------|
| `--custom-guild-settings-premium-tier-status-progress-with-subscriptions-margin-top` | `7px` | CSS |
| `--custom-voice-channel-status-modal-emoji-margin` | `10px` | CSS |
| `--custom-voice-channel-status-modal-emoji-size` | `22px` | CSS |
| `--icon-status-dnd` | `color-mix(in oklab,hsl(357.692 calc(1*67.826%) ...` | CSS |
| `--icon-status-idle` | `color-mix(in oklab,hsl(33.684 calc(1*53.774%) 5...` | CSS |
| `--icon-status-offline` | `color-mix(in oklab,hsl(232.5 calc(1*4%) 60.784%...` | CSS |
| `--icon-status-online` | `color-mix(in oklab,hsl(134.526 calc(1*41.485%) ...` | CSS |
| `--status-danger` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--status-danger-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--status-online` | `hsl(134.526 calc(1*41.485%) 44.902%/1)` | CSS |
| `--status-positive` | `hsl(134.526 calc(1*41.485%) 44.902%/1)` | CSS |
| `--status-positive-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--status-speaking` | `hsl(134.526 calc(1*41.485%) 44.902%/1)` | CSS |
| `--status-warning` | `hsl(33.684 calc(1*53.774%) 58.431%/1)` | CSS |
| `--status-warning-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `CUSTOM_STATUS_BUBBLE_BG` | `{}` | JS |
| `ICON_STATUS_DND` | `{}` | JS |
| `ICON_STATUS_IDLE` | `{}` | JS |
| `ICON_STATUS_OFFLINE` | `{}` | JS |
| `ICON_STATUS_ONLINE` | `{}` | JS |
| `STATUS_DANGER` | `{}` | JS |
| `STATUS_DANGER_TEXT` | `{}` | JS |
| `STATUS_ONLINE` | `{}` | JS |
| `STATUS_POSITIVE` | `{}` | JS |
| `STATUS_POSITIVE_TEXT` | `{}` | JS |
| `STATUS_SPEAKING` | `{}` | JS |
| `STATUS_WARNING` | `{}` | JS |
| `STATUS_WARNING_TEXT` | `{}` | JS |

*Total: 28 variables*

---

## Brand & Premium

| Variable | Value | Type |
|----------|-------|------|
| `--bd-brand-active` | `#3268b7` | CSS |
| `--bd-brand-hover` | `#3875ce` | CSS |
| `--brand-05a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.05)` | CSS |
| `--brand-100` | `hsl(232.5 calc(1*100%) 95.294%/1)` | CSS |
| `--brand-100-hsl` | `232.5 calc(1*100%) 95.294%` | CSS |
| `--brand-10a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.1)` | CSS |
| `--brand-130` | `hsl(232.5 calc(1*100%) 95.294%/1)` | CSS |
| `--brand-130-hsl` | `232.5 calc(1*100%) 95.294%` | CSS |
| `--brand-15a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.15)` | CSS |
| `--brand-160` | `hsl(232.5 calc(1*100%) 95.294%/1)` | CSS |
| `--brand-160-hsl` | `232.5 calc(1*100%) 95.294%` | CSS |
| `--brand-200` | `hsl(229.714 calc(1*100%) 93.137%/1)` | CSS |
| `--brand-200-hsl` | `229.714 calc(1*100%) 93.137%` | CSS |
| `--brand-20a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.2)` | CSS |
| `--brand-230` | `hsl(228.261 calc(1*100%) 90.98%/1)` | CSS |
| `--brand-230-hsl` | `228.261 calc(1*100%) 90.98%` | CSS |
| `--brand-25a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.25)` | CSS |
| `--brand-260` | `hsl(228.214 calc(1*100%) 89.02%/1)` | CSS |
| `--brand-260-hsl` | `228.214 calc(1*100%) 89.02%` | CSS |
| `--brand-300` | `hsl(228 calc(1*100%) 86.275%/1)` | CSS |
| `--brand-300-hsl` | `228 calc(1*100%) 86.275%` | CSS |
| `--brand-30a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.3)` | CSS |
| `--brand-330` | `hsl(228.791 calc(1*97.849%) 81.765%/1)` | CSS |
| `--brand-330-hsl` | `228.791 calc(1*97.849%) 81.765%` | CSS |
| `--brand-345` | `hsl(228.679 calc(1*96.364%) 78.431%/1)` | CSS |
| `--brand-345-hsl` | `228.679 calc(1*96.364%) 78.431%` | CSS |
| `--brand-35a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.35)` | CSS |
| `--brand-360` | `hsl(229.189 calc(1*94.872%) 77.059%/1)` | CSS |
| `--brand-360-hsl` | `229.189 calc(1*94.872%) 77.059%` | CSS |
| `--brand-400` | `hsl(231.298 calc(1*90.345%) 71.569%/1)` | CSS |
| `--brand-400-hsl` | `231.298 calc(1*90.345%) 71.569%` | CSS |
| `--brand-40a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.4)` | CSS |
| `--brand-430` | `hsl(231.857 calc(1*88.608%) 69.02%/1)` | CSS |
| `--brand-430-hsl` | `231.857 calc(1*88.608%) 69.02%` | CSS |
| `--brand-45a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.45)` | CSS |
| `--brand-460` | `hsl(232.966 calc(1*86.826%) 67.255%/1)` | CSS |
| `--brand-460-hsl` | `232.966 calc(1*86.826%) 67.255%` | CSS |
| `--brand-500` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--brand-500-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
| `--brand-50a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.5)` | CSS |
| `--brand-530` | `hsl(233.957 calc(1*65.877%) 58.627%/1)` | CSS |
| `--brand-530-hsl` | `233.957 calc(1*65.877%) 58.627%` | CSS |
| `--brand-55a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.55)` | CSS |
| `--brand-560` | `hsl(233.115 calc(1*49.194%) 51.373%/1)` | CSS |
| `--brand-560-hsl` | `233.115 calc(1*49.194%) 51.373%` | CSS |
| `--brand-600` | `hsl(232 calc(1*47.511%) 43.333%/1)` | CSS |
| `--brand-600-hsl` | `232 calc(1*47.511%) 43.333%` | CSS |
| `--brand-60a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.6)` | CSS |
| `--brand-630` | `hsl(230.968 calc(1*49.206%) 37.059%/1)` | CSS |
| `--brand-630-hsl` | `230.968 calc(1*49.206%) 37.059%` | CSS |
| `--brand-65a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.65)` | CSS |
| `--brand-660` | `hsl(230 calc(1*51.22%) 32.157%/1)` | CSS |
| `--brand-660-hsl` | `230 calc(1*51.22%) 32.157%` | CSS |
| `--brand-700` | `hsl(228.358 calc(1*54.472%) 24.118%/1)` | CSS |
| `--brand-700-hsl` | `228.358 calc(1*54.472%) 24.118%` | CSS |
| `--brand-70a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.7)` | CSS |
| `--brand-730` | `hsl(228 calc(1*55.556%) 22.941%/1)` | CSS |
| `--brand-730-hsl` | `228 calc(1*55.556%) 22.941%` | CSS |
| `--brand-75a` | `hsla(234.935 calc(1*85.556%) 64.706%/0.75)` | CSS |
| `--brand-760` | `hsl(227.213 calc(1*57.009%) 20.98%/1)` | CSS |
| `--brand-760-hsl` | `227.213 calc(1*57.009%) 20.98%` | CSS |
| `--brand-800` | `hsl(226.667 calc(1*60%) 17.647%/1)` | CSS |
| `--brand-800-hsl` | `226.667 calc(1*60%) 17.647%` | CSS |
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
| `--control-brand-foreground` | `color-mix(in oklab,hsl(229.189 calc(1*94.872%) ...` | CSS |
| `--control-brand-foreground-new` | `color-mix(in oklab,hsl(229.189 calc(1*94.872%) ...` | CSS |
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
| `--leaderboard-league-brand-text` | `color-mix(in oklab,hsl(41.143 calc(1*50.239%) 5...` | CSS |
| `--premium-nitro-pink-dark` | `hsl(299.45 calc(1*43.083%) 50.392%/1)` | CSS |
| `--premium-nitro-pink-dark-hsl` | `299.45 calc(1*43.083%) 50.392%` | CSS |
| `--premium-nitro-pink-light` | `hsl(299.333 calc(1*42.857%) 58.824%/1)` | CSS |
| `--premium-nitro-pink-light-hsl` | `299.333 calc(1*42.857%) 58.824%` | CSS |
| `--premium-nitro-pink-text` | `color-mix(in oklab,hsl(315.172 calc(1*93.548%) ...` | CSS |
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
| `LEADERBOARD_LEAGUE_BRAND_TEXT` | `{}` | JS |
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

*Total: 206 variables*

---

## Colors - Primary

| Variable | Value | Type |
|----------|-------|------|
| `--card-primary-pressed-bg` | `color-mix(in oklab,hsl(228 calc(1*6.849%) 14.31...` | CSS |
| `--checkpoint-emojis-primary-raw` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-emojis-primary-raw-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-end-primary-raw` | `hsl(143.316 calc(1*83.55%) 54.706%/1)` | CSS |
| `--checkpoint-end-primary-raw-hsl` | `143.316 calc(1*83.55%) 54.706%` | CSS |
| `--checkpoint-friends-primary-raw` | `hsl(234 calc(1*90%) 80.392%/1)` | CSS |
| `--checkpoint-friends-primary-raw-hsl` | `234 calc(1*90%) 80.392%` | CSS |
| `--checkpoint-gaming-primary-raw` | `hsl(34.699 calc(1*100%) 51.176%/1)` | CSS |
| `--checkpoint-gaming-primary-raw-hsl` | `34.699 calc(1*100%) 51.176%` | CSS |
| `--checkpoint-guilds-primary-raw` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-guilds-primary-raw-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-messages-primary-raw` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--checkpoint-messages-primary-raw-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--checkpoint-persona-eight-primary-raw` | `hsl(39.184 calc(1*56.322%) 65.882%/1)` | CSS |
| `--checkpoint-persona-eight-primary-raw-hsl` | `39.184 calc(1*56.322%) 65.882%` | CSS |
| `--checkpoint-persona-five-primary-raw` | `hsl(339.114 calc(1*90.805%) 65.882%/1)` | CSS |
| `--checkpoint-persona-five-primary-raw-hsl` | `339.114 calc(1*90.805%) 65.882%` | CSS |
| `--checkpoint-persona-four-primary-raw` | `hsl(312.083 calc(1*84.706%) 66.667%/1)` | CSS |
| `--checkpoint-persona-four-primary-raw-hsl` | `312.083 calc(1*84.706%) 66.667%` | CSS |
| `--checkpoint-persona-nine-primary-raw` | `hsl(0 calc(1*0%) 93.333%/1)` | CSS |
| `--checkpoint-persona-nine-primary-raw-hsl` | `0 calc(1*0%) 93.333%` | CSS |
| `--checkpoint-persona-one-primary-raw` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-persona-one-primary-raw-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-persona-seven-primary-raw` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-persona-seven-primary-raw-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-persona-six-primary-raw` | `hsl(26.834 calc(1*100%) 60.98%/1)` | CSS |
| `--checkpoint-persona-six-primary-raw-hsl` | `26.834 calc(1*100%) 60.98%` | CSS |
| `--checkpoint-persona-three-primary-raw` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-persona-three-primary-raw-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-persona-two-primary-raw` | `hsl(217.982 calc(1*93.162%) 77.059%/1)` | CSS |
| `--checkpoint-persona-two-primary-raw-hsl` | `217.982 calc(1*93.162%) 77.059%` | CSS |
| `--checkpoint-persona-zero-primary-raw` | `hsl(143.804 calc(1*83.636%) 56.863%/1)` | CSS |
| `--checkpoint-persona-zero-primary-raw-hsl` | `143.804 calc(1*83.636%) 56.863%` | CSS |
| `--checkpoint-quests-primary-raw` | `hsl(269.011 calc(1*88.35%) 79.804%/1)` | CSS |
| `--checkpoint-quests-primary-raw-hsl` | `269.011 calc(1*88.35%) 79.804%` | CSS |
| `--checkpoint-voice-primary-raw` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-voice-primary-raw-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-welcome-primary-raw` | `hsl(143.316 calc(1*83.55%) 54.706%/1)` | CSS |
| `--checkpoint-welcome-primary-raw-hsl` | `143.316 calc(1*83.55%) 54.706%` | CSS |
| `--control-critical-primary-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-primary-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-critical-primary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-overlay-primary-loading` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-icon-primary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
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
| `--primary-160` | `hsl(240 calc(1*5.263%) 92.549%/1)` | CSS |
| `--primary-160-hsl` | `240 calc(1*5.263%) 92.549%` | CSS |
| `--primary-200` | `hsl(240 calc(1*5.66%) 89.608%/1)` | CSS |
| `--primary-200-hsl` | `240 calc(1*5.66%) 89.608%` | CSS |
| `--primary-230` | `hsl(225 calc(1*5.882%) 86.667%/1)` | CSS |
| `--primary-230-hsl` | `225 calc(1*5.882%) 86.667%` | CSS |
| `--primary-260` | `hsl(225 calc(1*4.762%) 83.529%/1)` | CSS |
| `--primary-260-hsl` | `225 calc(1*4.762%) 83.529%` | CSS |
| `--primary-300` | `hsl(240 calc(1*4.762%) 79.412%/1)` | CSS |
| `--primary-300-hsl` | `240 calc(1*4.762%) 79.412%` | CSS |
| `--primary-330` | `hsl(240 calc(1*4.478%) 73.725%/1)` | CSS |
| `--primary-330-hsl` | `240 calc(1*4.478%) 73.725%` | CSS |
| `--primary-345` | `hsl(240 calc(1*4.294%) 68.039%/1)` | CSS |
| `--primary-345-hsl` | `240 calc(1*4.294%) 68.039%` | CSS |
| `--primary-360` | `hsl(232.5 calc(1*4%) 60.784%/1)` | CSS |
| `--primary-360-hsl` | `232.5 calc(1*4%) 60.784%` | CSS |
| `--primary-400` | `hsl(233.333 calc(1*3.734%) 52.745%/1)` | CSS |
| `--primary-400-hsl` | `233.333 calc(1*3.734%) 52.745%` | CSS |
| `--primary-430` | `hsl(234 calc(1*4.386%) 44.706%/1)` | CSS |
| `--primary-430-hsl` | `234 calc(1*4.386%) 44.706%` | CSS |
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
| `CHECKPOINT_EMOJIS_PRIMARY_RAW` | `#ca9ef9` | JS |
| `CHECKPOINT_END_PRIMARY_RAW` | `#2bec76` | JS |
| `CHECKPOINT_FRIENDS_PRIMARY_RAW` | `#a0a9fa` | JS |
| `CHECKPOINT_GAMING_PRIMARY_RAW` | `#ff9606` | JS |
| `CHECKPOINT_GUILDS_PRIMARY_RAW` | `#5efde2` | JS |
| `CHECKPOINT_MESSAGES_PRIMARY_RAW` | `#ff4cd2` | JS |
| `CHECKPOINT_PERSONA_EIGHT_PRIMARY_RAW` | `#d9b777` | JS |
| `CHECKPOINT_PERSONA_FIVE_PRIMARY_RAW` | `#f75990` | JS |
| `CHECKPOINT_PERSONA_FOUR_PRIMARY_RAW` | `#f262d5` | JS |
| `CHECKPOINT_PERSONA_NINE_PRIMARY_RAW` | `#eeeeee` | JS |
| `CHECKPOINT_PERSONA_ONE_PRIMARY_RAW` | `#5efde2` | JS |
| `CHECKPOINT_PERSONA_SEVEN_PRIMARY_RAW` | `#ffe047` | JS |
| `CHECKPOINT_PERSONA_SIX_PRIMARY_RAW` | `#ff9138` | JS |
| `CHECKPOINT_PERSONA_THREE_PRIMARY_RAW` | `#ca9ef9` | JS |
| `CHECKPOINT_PERSONA_TWO_PRIMARY_RAW` | `#8eb6fb` | JS |
| `CHECKPOINT_PERSONA_ZERO_PRIMARY_RAW` | `#35ed7e` | JS |
| `CHECKPOINT_QUESTS_PRIMARY_RAW` | `#ca9ef9` | JS |
| `CHECKPOINT_VOICE_PRIMARY_RAW` | `#ffe047` | JS |
| `CHECKPOINT_WELCOME_PRIMARY_RAW` | `#2bec76` | JS |
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

*Total: 154 variables*

---

## Colors - Black/White

| Variable | Value | Type |
|----------|-------|------|
| `--black-100` | `hsl(0 calc(1*0%) 94.902%/1)` | CSS |
| `--black-100-hsl` | `0 calc(1*0%) 94.902%` | CSS |
| `--black-130` | `hsl(0 calc(1*0%) 90.98%/1)` | CSS |
| `--black-130-hsl` | `0 calc(1*0%) 90.98%` | CSS |
| `--black-160` | `hsl(0 calc(1*0%) 85.49%/1)` | CSS |
| `--black-160-hsl` | `0 calc(1*0%) 85.49%` | CSS |
| `--black-200` | `hsl(0 calc(1*0%) 80%/1)` | CSS |
| `--black-200-hsl` | `0 calc(1*0%) 80%` | CSS |
| `--black-230` | `hsl(0 calc(1*0%) 74.118%/1)` | CSS |
| `--black-230-hsl` | `0 calc(1*0%) 74.118%` | CSS |
| `--black-260` | `hsl(0 calc(1*0%) 67.451%/1)` | CSS |
| `--black-260-hsl` | `0 calc(1*0%) 67.451%` | CSS |
| `--black-300` | `hsl(0 calc(1*0%) 60%/1)` | CSS |
| `--black-300-hsl` | `0 calc(1*0%) 60%` | CSS |
| `--black-330` | `hsl(0 calc(1*0%) 47.843%/1)` | CSS |
| `--black-330-hsl` | `0 calc(1*0%) 47.843%` | CSS |
| `--black-345` | `hsl(0 calc(1*0%) 40%/1)` | CSS |
| `--black-345-hsl` | `0 calc(1*0%) 40%` | CSS |
| `--black-360` | `hsl(0 calc(1*0%) 36.078%/1)` | CSS |
| `--black-360-hsl` | `0 calc(1*0%) 36.078%` | CSS |
| `--black-400` | `hsl(0 calc(1*0%) 20%/1)` | CSS |
| `--black-400-hsl` | `0 calc(1*0%) 20%` | CSS |
| `--black-430` | `hsl(0 calc(1*0%) 14.51%/1)` | CSS |
| `--black-430-hsl` | `0 calc(1*0%) 14.51%` | CSS |
| `--black-460` | `hsl(0 calc(1*0%) 7.843%/1)` | CSS |
| `--black-460-hsl` | `0 calc(1*0%) 7.843%` | CSS |
| `--black-500` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-500-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-530` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-530-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-560` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-560-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-600` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-600-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-630` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-630-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-660` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-660-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-700` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-700-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-730` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-730-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-760` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-760-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-800` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-800-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-830` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-830-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-860` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-860-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--black-900` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--black-900-hsl` | `0 calc(1*0%) 0%` | CSS |
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
| `--white-100` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-100-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-130` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-130-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-160` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-160-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-200` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-200-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-230` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-230-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-260` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-260-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-300` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-300-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-330` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-330-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-345` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-345-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-360` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-360-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-400` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-400-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-430` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-430-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-460` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-460-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-500` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--white-500-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--white-530` | `hsl(0 calc(1*0%) 90.98%/1)` | CSS |
| `--white-530-hsl` | `0 calc(1*0%) 90.98%` | CSS |
| `--white-560` | `hsl(0 calc(1*0%) 81.176%/1)` | CSS |
| `--white-560-hsl` | `0 calc(1*0%) 81.176%` | CSS |
| `--white-600` | `hsl(0 calc(1*0%) 67.843%/1)` | CSS |
| `--white-600-hsl` | `0 calc(1*0%) 67.843%` | CSS |
| `--white-630` | `hsl(0 calc(1*0%) 58.824%/1)` | CSS |
| `--white-630-hsl` | `0 calc(1*0%) 58.824%` | CSS |
| `--white-660` | `hsl(0 calc(1*0%) 51.373%/1)` | CSS |
| `--white-660-hsl` | `0 calc(1*0%) 51.373%` | CSS |
| `--white-700` | `hsl(0 calc(1*0%) 40%/1)` | CSS |
| `--white-700-hsl` | `0 calc(1*0%) 40%` | CSS |
| `--white-730` | `hsl(0 calc(1*0%) 37.255%/1)` | CSS |
| `--white-730-hsl` | `0 calc(1*0%) 37.255%` | CSS |
| `--white-760` | `hsl(0 calc(1*0%) 34.51%/1)` | CSS |
| `--white-760-hsl` | `0 calc(1*0%) 34.51%` | CSS |
| `--white-800` | `hsl(0 calc(1*0%) 30.196%/1)` | CSS |
| `--white-800-hsl` | `0 calc(1*0%) 30.196%` | CSS |
| `--white-830` | `hsl(0 calc(1*0%) 23.137%/1)` | CSS |
| `--white-830-hsl` | `0 calc(1*0%) 23.137%` | CSS |
| `--white-860` | `hsl(0 calc(1*0%) 14.902%/1)` | CSS |
| `--white-860-hsl` | `0 calc(1*0%) 14.902%` | CSS |
| `--white-900` | `hsl(0 calc(1*0%) 5.098%/1)` | CSS |
| `--white-900-hsl` | `0 calc(1*0%) 5.098%` | CSS |
| `--white-hsl` | `0 calc(1*0%) 100%` | CSS |
| `BLACK_100` | `#f2f2f2` | JS |
| `BLACK_130` | `#e8e8e8` | JS |
| `BLACK_160` | `#dadada` | JS |
| `BLACK_200` | `#cccccc` | JS |
| `BLACK_230` | `#bdbdbd` | JS |
| `BLACK_260` | `#acacac` | JS |
| `BLACK_300` | `#999999` | JS |
| `BLACK_330` | `#7a7a7a` | JS |
| `BLACK_345` | `#666666` | JS |
| `BLACK_360` | `#5c5c5c` | JS |
| `BLACK_400` | `#333333` | JS |
| `BLACK_430` | `#252525` | JS |
| `BLACK_460` | `#141414` | JS |
| `BLACK_500` | `#000000` | JS |
| `BLACK_530` | `#000000` | JS |
| `BLACK_560` | `#000000` | JS |
| `BLACK_600` | `#000000` | JS |
| `BLACK_630` | `#000000` | JS |
| `BLACK_660` | `#000000` | JS |
| `BLACK_700` | `#000000` | JS |
| `BLACK_730` | `#000000` | JS |
| `BLACK_760` | `#000000` | JS |
| `BLACK_800` | `#000000` | JS |
| `BLACK_830` | `#000000` | JS |
| `BLACK_860` | `#000000` | JS |
| `BLACK_900` | `#000000` | JS |
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
| `WHITE_100` | `#ffffff` | JS |
| `WHITE_130` | `#ffffff` | JS |
| `WHITE_160` | `#ffffff` | JS |
| `WHITE_200` | `#ffffff` | JS |
| `WHITE_230` | `#ffffff` | JS |
| `WHITE_260` | `#ffffff` | JS |
| `WHITE_300` | `#ffffff` | JS |
| `WHITE_330` | `#ffffff` | JS |
| `WHITE_345` | `#ffffff` | JS |
| `WHITE_360` | `#ffffff` | JS |
| `WHITE_400` | `#ffffff` | JS |
| `WHITE_430` | `#ffffff` | JS |
| `WHITE_460` | `#ffffff` | JS |
| `WHITE_500` | `#ffffff` | JS |
| `WHITE_530` | `#e8e8e8` | JS |
| `WHITE_560` | `#cfcfcf` | JS |
| `WHITE_600` | `#adadad` | JS |
| `WHITE_630` | `#969696` | JS |
| `WHITE_660` | `#838383` | JS |
| `WHITE_700` | `#666666` | JS |
| `WHITE_730` | `#5f5f5f` | JS |
| `WHITE_760` | `#585858` | JS |
| `WHITE_800` | `#4d4d4d` | JS |
| `WHITE_830` | `#3b3b3b` | JS |
| `WHITE_860` | `#262626` | JS |
| `WHITE_900` | `#0d0d0d` | JS |

*Total: 308 variables*

---

## Colors - Blue

| Variable | Value | Type |
|----------|-------|------|
| `--blue-100` | `hsl(220.8 calc(1*100%) 95.098%/1)` | CSS |
| `--blue-100-hsl` | `220.8 calc(1*100%) 95.098%` | CSS |
| `--blue-130` | `hsl(220.8 calc(1*100%) 95.098%/1)` | CSS |
| `--blue-130-hsl` | `220.8 calc(1*100%) 95.098%` | CSS |
| `--blue-160` | `hsl(220.8 calc(1*100%) 95.098%/1)` | CSS |
| `--blue-160-hsl` | `220.8 calc(1*100%) 95.098%` | CSS |
| `--blue-200` | `hsl(216.279 calc(1*100%) 91.569%/1)` | CSS |
| `--blue-200-hsl` | `216.279 calc(1*100%) 91.569%` | CSS |
| `--blue-230` | `hsl(214.925 calc(1*94.366%) 86.078%/1)` | CSS |
| `--blue-230-hsl` | `214.925 calc(1*94.366%) 86.078%` | CSS |
| `--blue-260` | `hsl(213.793 calc(1*91.579%) 81.373%/1)` | CSS |
| `--blue-260-hsl` | `213.793 calc(1*91.579%) 81.373%` | CSS |
| `--blue-300` | `hsl(213.75 calc(1*87.5%) 74.902%/1)` | CSS |
| `--blue-300-hsl` | `213.75 calc(1*87.5%) 74.902%` | CSS |
| `--blue-330` | `hsl(213.237 calc(1*83.234%) 67.255%/1)` | CSS |
| `--blue-330-hsl` | `213.237 calc(1*83.234%) 67.255%` | CSS |
| `--blue-345` | `hsl(213.333 calc(1*81.818%) 63.333%/1)` | CSS |
| `--blue-345-hsl` | `213.333 calc(1*81.818%) 63.333%` | CSS |
| `--blue-360` | `hsl(212.982 calc(1*80.282%) 58.235%/1)` | CSS |
| `--blue-360-hsl` | `212.982 calc(1*80.282%) 58.235%` | CSS |
| `--blue-400` | `hsl(212.021 calc(1*79.424%) 52.353%/1)` | CSS |
| `--blue-400-hsl` | `212.021 calc(1*79.424%) 52.353%` | CSS |
| `--blue-430` | `hsl(209.455 calc(1*98.214%) 43.922%/1)` | CSS |
| `--blue-430-hsl` | `209.455 calc(1*98.214%) 43.922%` | CSS |
| `--blue-460` | `hsl(209.684 calc(1*94.059%) 39.608%/1)` | CSS |
| `--blue-460-hsl` | `209.684 calc(1*94.059%) 39.608%` | CSS |
| `--blue-500` | `hsl(208.902 calc(1*96.471%) 33.333%/1)` | CSS |
| `--blue-500-hsl` | `208.902 calc(1*96.471%) 33.333%` | CSS |
| `--blue-530` | `hsl(208.138 calc(1*100%) 28.431%/1)` | CSS |
| `--blue-530-hsl` | `208.138 calc(1*100%) 28.431%` | CSS |
| `--blue-560` | `hsl(208.372 calc(1*100%) 25.294%/1)` | CSS |
| `--blue-560-hsl` | `208.372 calc(1*100%) 25.294%` | CSS |
| `--blue-600` | `hsl(208.142 calc(1*100%) 22.157%/1)` | CSS |
| `--blue-600-hsl` | `208.142 calc(1*100%) 22.157%` | CSS |
| `--blue-630` | `hsl(208.515 calc(1*100%) 19.804%/1)` | CSS |
| `--blue-630-hsl` | `208.515 calc(1*100%) 19.804%` | CSS |
| `--blue-660` | `hsl(208.667 calc(1*100%) 17.647%/1)` | CSS |
| `--blue-660-hsl` | `208.667 calc(1*100%) 17.647%` | CSS |
| `--blue-700` | `hsl(208.861 calc(1*100%) 15.49%/1)` | CSS |
| `--blue-700-hsl` | `208.861 calc(1*100%) 15.49%` | CSS |
| `--blue-730` | `hsl(208.732 calc(1*100%) 13.922%/1)` | CSS |
| `--blue-730-hsl` | `208.732 calc(1*100%) 13.922%` | CSS |
| `--blue-760` | `hsl(209.508 calc(1*100%) 11.961%/1)` | CSS |
| `--blue-760-hsl` | `209.508 calc(1*100%) 11.961%` | CSS |
| `--blue-800` | `hsl(210 calc(1*100%) 10.588%/1)` | CSS |
| `--blue-800-hsl` | `210 calc(1*100%) 10.588%` | CSS |
| `--blue-830` | `hsl(210.638 calc(1*100%) 9.216%/1)` | CSS |
| `--blue-830-hsl` | `210.638 calc(1*100%) 9.216%` | CSS |
| `--blue-860` | `hsl(212.093 calc(1*100%) 8.431%/1)` | CSS |
| `--blue-860-hsl` | `212.093 calc(1*100%) 8.431%` | CSS |
| `--blue-900` | `hsl(212.727 calc(1*100%) 6.471%/1)` | CSS |
| `--blue-900-hsl` | `212.727 calc(1*100%) 6.471%` | CSS |
| `--blue-new-1` | `hsl(220.8 calc(1*100%) 95.098%/1)` | CSS |
| `--blue-new-1-hsl` | `220.8 calc(1*100%) 95.098%` | CSS |
| `--blue-new-10` | `hsl(215.625 calc(1*96.97%) 87.059%/1)` | CSS |
| `--blue-new-10-hsl` | `215.625 calc(1*96.97%) 87.059%` | CSS |
| `--blue-new-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--blue-new-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--blue-new-11` | `hsl(214.925 calc(1*94.366%) 86.078%/1)` | CSS |
| `--blue-new-11-hsl` | `214.925 calc(1*94.366%) 86.078%` | CSS |
| `--blue-new-12` | `hsl(214.167 calc(1*94.737%) 85.098%/1)` | CSS |
| `--blue-new-12-hsl` | `214.167 calc(1*94.737%) 85.098%` | CSS |
| `--blue-new-13` | `hsl(214.4 calc(1*92.593%) 84.118%/1)` | CSS |
| `--blue-new-13-hsl` | `214.4 calc(1*92.593%) 84.118%` | CSS |
| `--blue-new-14` | `hsl(214.177 calc(1*92.941%) 83.333%/1)` | CSS |
| `--blue-new-14-hsl` | `214.177 calc(1*92.941%) 83.333%` | CSS |
| `--blue-new-15` | `hsl(213.976 calc(1*91.209%) 82.157%/1)` | CSS |
| `--blue-new-15-hsl` | `213.976 calc(1*91.209%) 82.157%` | CSS |
| `--blue-new-16` | `hsl(213.793 calc(1*91.579%) 81.373%/1)` | CSS |
| `--blue-new-16-hsl` | `213.793 calc(1*91.579%) 81.373%` | CSS |
| `--blue-new-17` | `hsl(214 calc(1*90%) 80.392%/1)` | CSS |
| `--blue-new-17-hsl` | `214 calc(1*90%) 80.392%` | CSS |
| `--blue-new-18` | `hsl(213.83 calc(1*90.385%) 79.608%/1)` | CSS |
| `--blue-new-18-hsl` | `213.83 calc(1*90.385%) 79.608%` | CSS |
| `--blue-new-19` | `hsl(214.021 calc(1*88.991%) 78.627%/1)` | CSS |
| `--blue-new-19-hsl` | `214.021 calc(1*88.991%) 78.627%` | CSS |
| `--blue-new-2` | `hsl(218 calc(1*100%) 94.118%/1)` | CSS |
| `--blue-new-2-hsl` | `218 calc(1*100%) 94.118%` | CSS |
| `--blue-new-20` | `hsl(213.529 calc(1*89.474%) 77.647%/1)` | CSS |
| `--blue-new-20-hsl` | `213.529 calc(1*89.474%) 77.647%` | CSS |
| `--blue-new-21` | `hsl(213.714 calc(1*88.235%) 76.667%/1)` | CSS |
| `--blue-new-21-hsl` | `213.714 calc(1*88.235%) 76.667%` | CSS |
| `--blue-new-22` | `hsl(213.889 calc(1*87.097%) 75.686%/1)` | CSS |
| `--blue-new-22-hsl` | `213.889 calc(1*87.097%) 75.686%` | CSS |
| `--blue-new-23` | `hsl(213.75 calc(1*87.5%) 74.902%/1)` | CSS |
| `--blue-new-23-hsl` | `213.75 calc(1*87.5%) 74.902%` | CSS |
| `--blue-new-24` | `hsl(213.913 calc(1*86.466%) 73.922%/1)` | CSS |
| `--blue-new-24-hsl` | `213.913 calc(1*86.466%) 73.922%` | CSS |
| `--blue-new-25` | `hsl(213.559 calc(1*85.507%) 72.941%/1)` | CSS |
| `--blue-new-25-hsl` | `213.559 calc(1*85.507%) 72.941%` | CSS |
| `--blue-new-26` | `hsl(213.934 calc(1*85.915%) 72.157%/1)` | CSS |
| `--blue-new-26-hsl` | `213.934 calc(1*85.915%) 72.157%` | CSS |
| `--blue-new-27` | `hsl(213.6 calc(1*85.034%) 71.176%/1)` | CSS |
| `--blue-new-27-hsl` | `213.6 calc(1*85.034%) 71.176%` | CSS |
| `--blue-new-28` | `hsl(213.488 calc(1*84.314%) 70%/1)` | CSS |
| `--blue-new-28-hsl` | `213.488 calc(1*84.314%) 70%` | CSS |
| `--blue-new-29` | `hsl(213.383 calc(1*84.713%) 69.216%/1)` | CSS |
| `--blue-new-29-hsl` | `213.383 calc(1*84.713%) 69.216%` | CSS |
| `--blue-new-3` | `hsl(217.059 calc(1*100%) 93.333%/1)` | CSS |
| `--blue-new-3-hsl` | `217.059 calc(1*100%) 93.333%` | CSS |
| `--blue-new-30` | `hsl(213.529 calc(1*83.951%) 68.235%/1)` | CSS |
| `--blue-new-30-hsl` | `213.529 calc(1*83.951%) 68.235%` | CSS |
| `--blue-new-31` | `hsl(213.237 calc(1*83.234%) 67.255%/1)` | CSS |
| `--blue-new-31-hsl` | `213.237 calc(1*83.234%) 67.255%` | CSS |
| `--blue-new-32` | `hsl(213.38 calc(1*82.558%) 66.275%/1)` | CSS |
| `--blue-new-32-hsl` | `213.38 calc(1*82.558%) 66.275%` | CSS |
| `--blue-new-33` | `hsl(213.699 calc(1*82.955%) 65.49%/1)` | CSS |
| `--blue-new-33-hsl` | `213.699 calc(1*82.955%) 65.49%` | CSS |
| `--blue-new-34` | `hsl(213.423 calc(1*82.32%) 64.51%/1)` | CSS |
| `--blue-new-34-hsl` | `213.423 calc(1*82.32%) 64.51%` | CSS |
| `--blue-new-35` | `hsl(213.333 calc(1*81.818%) 63.333%/1)` | CSS |
| `--blue-new-35-hsl` | `213.333 calc(1*81.818%) 63.333%` | CSS |
| `--blue-new-36` | `hsl(213.077 calc(1*81.25%) 62.353%/1)` | CSS |
| `--blue-new-36-hsl` | `213.077 calc(1*81.25%) 62.353%` | CSS |
| `--blue-new-37` | `hsl(213.375 calc(1*81.633%) 61.569%/1)` | CSS |
| `--blue-new-37-hsl` | `213.375 calc(1*81.633%) 61.569%` | CSS |
| `--blue-new-38` | `hsl(213.293 calc(1*81.188%) 60.392%/1)` | CSS |
| `--blue-new-38-hsl` | `213.293 calc(1*81.188%) 60.392%` | CSS |
| `--blue-new-39` | `hsl(213.054 calc(1*80.676%) 59.412%/1)` | CSS |
| `--blue-new-39-hsl` | `213.054 calc(1*80.676%) 59.412%` | CSS |
| `--blue-new-4` | `hsl(216.923 calc(1*100%) 92.353%/1)` | CSS |
| `--blue-new-4-hsl` | `216.923 calc(1*100%) 92.353%` | CSS |
| `--blue-new-40` | `hsl(212.982 calc(1*80.282%) 58.235%/1)` | CSS |
| `--blue-new-40-hsl` | `212.982 calc(1*80.282%) 58.235%` | CSS |
| `--blue-new-41` | `hsl(213.103 calc(1*79.817%) 57.255%/1)` | CSS |
| `--blue-new-41-hsl` | `213.103 calc(1*79.817%) 57.255%` | CSS |
| `--blue-new-42` | `hsl(212.849 calc(1*80.269%) 56.275%/1)` | CSS |
| `--blue-new-42-hsl` | `212.849 calc(1*80.269%) 56.275%` | CSS |
| `--blue-new-43` | `hsl(212.787 calc(1*79.913%) 55.098%/1)` | CSS |
| `--blue-new-43-hsl` | `212.787 calc(1*79.913%) 55.098%` | CSS |
| `--blue-new-44` | `hsl(212.553 calc(1*79.661%) 53.725%/1)` | CSS |
| `--blue-new-44-hsl` | `212.553 calc(1*79.661%) 53.725%` | CSS |
| `--blue-new-45` | `hsl(212.021 calc(1*79.424%) 52.353%/1)` | CSS |
| `--blue-new-45-hsl` | `212.021 calc(1*79.424%) 52.353%` | CSS |
| `--blue-new-46` | `hsl(211.818 calc(1*79.2%) 50.98%/1)` | CSS |
| `--blue-new-46-hsl` | `211.818 calc(1*79.2%) 50.98%` | CSS |
| `--blue-new-47` | `hsl(211.456 calc(1*81.746%) 49.412%/1)` | CSS |
| `--blue-new-47-hsl` | `211.456 calc(1*81.746%) 49.412%` | CSS |
| `--blue-new-48` | `hsl(210.561 calc(1*88.43%) 47.451%/1)` | CSS |
| `--blue-new-48-hsl` | `210.561 calc(1*88.43%) 47.451%` | CSS |
| `--blue-new-49` | `hsl(209.339 calc(1*100%) 44.51%/1)` | CSS |
| `--blue-new-49-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--blue-new-5` | `hsl(216.279 calc(1*100%) 91.569%/1)` | CSS |
| `--blue-new-5-hsl` | `216.279 calc(1*100%) 91.569%` | CSS |
| `--blue-new-50` | `hsl(209.339 calc(1*100%) 44.51%/1)` | CSS |
| `--blue-new-50-hsl` | `209.339 calc(1*100%) 44.51%` | CSS |
| `--blue-new-51` | `hsl(209.455 calc(1*98.214%) 43.922%/1)` | CSS |
| `--blue-new-51-hsl` | `209.455 calc(1*98.214%) 43.922%` | CSS |
| `--blue-new-52` | `hsl(209.717 calc(1*96.364%) 43.137%/1)` | CSS |
| `--blue-new-52-hsl` | `209.717 calc(1*96.364%) 43.137%` | CSS |
| `--blue-new-53` | `hsl(209.709 calc(1*95.37%) 42.353%/1)` | CSS |
| `--blue-new-53-hsl` | `209.709 calc(1*95.37%) 42.353%` | CSS |
| `--blue-new-54` | `hsl(209.7 calc(1*94.34%) 41.569%/1)` | CSS |
| `--blue-new-54-hsl` | `209.7 calc(1*94.34%) 41.569%` | CSS |
| `--blue-new-55` | `hsl(209.846 calc(1*94.203%) 40.588%/1)` | CSS |
| `--blue-new-55-hsl` | `209.846 calc(1*94.203%) 40.588%` | CSS |
| `--blue-new-56` | `hsl(209.684 calc(1*94.059%) 39.608%/1)` | CSS |
| `--blue-new-56-hsl` | `209.684 calc(1*94.059%) 39.608%` | CSS |
| `--blue-new-57` | `hsl(209.514 calc(1*93.909%) 38.627%/1)` | CSS |
| `--blue-new-57-hsl` | `209.514 calc(1*93.909%) 38.627%` | CSS |
| `--blue-new-58` | `hsl(209.333 calc(1*93.75%) 37.647%/1)` | CSS |
| `--blue-new-58-hsl` | `209.333 calc(1*93.75%) 37.647%` | CSS |
| `--blue-new-59` | `hsl(209.318 calc(1*94.624%) 36.471%/1)` | CSS |
| `--blue-new-59-hsl` | `209.318 calc(1*94.624%) 36.471%` | CSS |
| `--blue-new-6` | `hsl(216.25 calc(1*100%) 90.588%/1)` | CSS |
| `--blue-new-6-hsl` | `216.25 calc(1*100%) 90.588%` | CSS |
| `--blue-new-60` | `hsl(209.123 calc(1*94.475%) 35.49%/1)` | CSS |
| `--blue-new-60-hsl` | `209.123 calc(1*94.475%) 35.49%` | CSS |
| `--blue-new-61` | `hsl(208.929 calc(1*95.455%) 34.51%/1)` | CSS |
| `--blue-new-61-hsl` | `208.929 calc(1*95.455%) 34.51%` | CSS |
| `--blue-new-62` | `hsl(208.902 calc(1*96.471%) 33.333%/1)` | CSS |
| `--blue-new-62-hsl` | `208.902 calc(1*96.471%) 33.333%` | CSS |
| `--blue-new-63` | `hsl(208.696 calc(1*97.576%) 32.353%/1)` | CSS |
| `--blue-new-63-hsl` | `208.696 calc(1*97.576%) 32.353%` | CSS |
| `--blue-new-64` | `hsl(208.28 calc(1*98.742%) 31.176%/1)` | CSS |
| `--blue-new-64-hsl` | `208.28 calc(1*98.742%) 31.176%` | CSS |
| `--blue-new-65` | `hsl(208.052 calc(1*100%) 30.196%/1)` | CSS |
| `--blue-new-65-hsl` | `208.052 calc(1*100%) 30.196%` | CSS |
| `--blue-new-66` | `hsl(208.4 calc(1*100%) 29.412%/1)` | CSS |
| `--blue-new-66-hsl` | `208.4 calc(1*100%) 29.412%` | CSS |
| `--blue-new-67` | `hsl(208.138 calc(1*100%) 28.431%/1)` | CSS |
| `--blue-new-67-hsl` | `208.138 calc(1*100%) 28.431%` | CSS |
| `--blue-new-68` | `hsl(208.085 calc(1*100%) 27.647%/1)` | CSS |
| `--blue-new-68-hsl` | `208.085 calc(1*100%) 27.647%` | CSS |
| `--blue-new-69` | `hsl(208.029 calc(1*100%) 26.863%/1)` | CSS |
| `--blue-new-69-hsl` | `208.029 calc(1*100%) 26.863%` | CSS |
| `--blue-new-7` | `hsl(215.769 calc(1*100%) 89.804%/1)` | CSS |
| `--blue-new-7-hsl` | `215.769 calc(1*100%) 89.804%` | CSS |
| `--blue-new-70` | `hsl(207.97 calc(1*100%) 26.078%/1)` | CSS |
| `--blue-new-70-hsl` | `207.97 calc(1*100%) 26.078%` | CSS |
| `--blue-new-71` | `hsl(208.372 calc(1*100%) 25.294%/1)` | CSS |
| `--blue-new-71-hsl` | `208.372 calc(1*100%) 25.294%` | CSS |
| `--blue-new-72` | `hsl(208.32 calc(1*100%) 24.51%/1)` | CSS |
| `--blue-new-72-hsl` | `208.32 calc(1*100%) 24.51%` | CSS |
| `--blue-new-73` | `hsl(208.264 calc(1*100%) 23.725%/1)` | CSS |
| `--blue-new-73-hsl` | `208.264 calc(1*100%) 23.725%` | CSS |
| `--blue-new-74` | `hsl(208.205 calc(1*100%) 22.941%/1)` | CSS |
| `--blue-new-74-hsl` | `208.205 calc(1*100%) 22.941%` | CSS |
| `--blue-new-75` | `hsl(208.142 calc(1*100%) 22.157%/1)` | CSS |
| `--blue-new-75-hsl` | `208.142 calc(1*100%) 22.157%` | CSS |
| `--blue-new-76` | `hsl(208.624 calc(1*100%) 21.373%/1)` | CSS |
| `--blue-new-76-hsl` | `208.624 calc(1*100%) 21.373%` | CSS |
| `--blue-new-77` | `hsl(208.571 calc(1*100%) 20.588%/1)` | CSS |
| `--blue-new-77-hsl` | `208.571 calc(1*100%) 20.588%` | CSS |
| `--blue-new-78` | `hsl(208.515 calc(1*100%) 19.804%/1)` | CSS |
| `--blue-new-78-hsl` | `208.515 calc(1*100%) 19.804%` | CSS |
| `--blue-new-79` | `hsl(208.454 calc(1*100%) 19.02%/1)` | CSS |
| `--blue-new-79-hsl` | `208.454 calc(1*100%) 19.02%` | CSS |
| `--blue-new-8` | `hsl(216.429 calc(1*100%) 89.02%/1)` | CSS |
| `--blue-new-8-hsl` | `216.429 calc(1*100%) 89.02%` | CSS |
| `--blue-new-80` | `hsl(208.723 calc(1*100%) 18.431%/1)` | CSS |
| `--blue-new-80-hsl` | `208.723 calc(1*100%) 18.431%` | CSS |
| `--blue-new-81` | `hsl(208.667 calc(1*100%) 17.647%/1)` | CSS |
| `--blue-new-81-hsl` | `208.667 calc(1*100%) 17.647%` | CSS |
| `--blue-new-82` | `hsl(208.605 calc(1*100%) 16.863%/1)` | CSS |
| `--blue-new-82-hsl` | `208.605 calc(1*100%) 16.863%` | CSS |
| `--blue-new-83` | `hsl(208.537 calc(1*100%) 16.078%/1)` | CSS |
| `--blue-new-83-hsl` | `208.537 calc(1*100%) 16.078%` | CSS |
| `--blue-new-84` | `hsl(208.861 calc(1*100%) 15.49%/1)` | CSS |
| `--blue-new-84-hsl` | `208.861 calc(1*100%) 15.49%` | CSS |
| `--blue-new-85` | `hsl(208.8 calc(1*100%) 14.706%/1)` | CSS |
| `--blue-new-85-hsl` | `208.8 calc(1*100%) 14.706%` | CSS |
| `--blue-new-86` | `hsl(208.732 calc(1*100%) 13.922%/1)` | CSS |
| `--blue-new-86-hsl` | `208.732 calc(1*100%) 13.922%` | CSS |
| `--blue-new-87` | `hsl(209.118 calc(1*100%) 13.333%/1)` | CSS |
| `--blue-new-87-hsl` | `209.118 calc(1*100%) 13.333%` | CSS |
| `--blue-new-88` | `hsl(209.063 calc(1*100%) 12.549%/1)` | CSS |
| `--blue-new-88-hsl` | `209.063 calc(1*100%) 12.549%` | CSS |
| `--blue-new-89` | `hsl(209.508 calc(1*100%) 11.961%/1)` | CSS |
| `--blue-new-89-hsl` | `209.508 calc(1*100%) 11.961%` | CSS |
| `--blue-new-9` | `hsl(215 calc(1*96.774%) 87.843%/1)` | CSS |
| `--blue-new-9-hsl` | `215 calc(1*96.774%) 87.843%` | CSS |
| `--blue-new-90` | `hsl(209.474 calc(1*100%) 11.176%/1)` | CSS |
| `--blue-new-90-hsl` | `209.474 calc(1*100%) 11.176%` | CSS |
| `--blue-new-91` | `hsl(210 calc(1*100%) 10.588%/1)` | CSS |
| `--blue-new-91-hsl` | `210 calc(1*100%) 10.588%` | CSS |
| `--blue-new-92` | `hsl(210 calc(1*100%) 9.804%/1)` | CSS |
| `--blue-new-92-hsl` | `210 calc(1*100%) 9.804%` | CSS |
| `--blue-new-93` | `hsl(210.638 calc(1*100%) 9.216%/1)` | CSS |
| `--blue-new-93-hsl` | `210.638 calc(1*100%) 9.216%` | CSS |
| `--blue-new-94` | `hsl(212.093 calc(1*100%) 8.431%/1)` | CSS |
| `--blue-new-94-hsl` | `212.093 calc(1*100%) 8.431%` | CSS |
| `--blue-new-95` | `hsl(211.579 calc(1*100%) 7.451%/1)` | CSS |
| `--blue-new-95-hsl` | `211.579 calc(1*100%) 7.451%` | CSS |
| `--blue-new-96` | `hsl(212.727 calc(1*100%) 6.471%/1)` | CSS |
| `--blue-new-96-hsl` | `212.727 calc(1*100%) 6.471%` | CSS |
| `--blue-new-97` | `hsl(214.286 calc(1*100%) 5.49%/1)` | CSS |
| `--blue-new-97-hsl` | `214.286 calc(1*100%) 5.49%` | CSS |
| `--blue-new-98` | `hsl(217.143 calc(1*100%) 4.118%/1)` | CSS |
| `--blue-new-98-hsl` | `217.143 calc(1*100%) 4.118%` | CSS |
| `--blue-new-99` | `hsl(218.182 calc(1*100%) 2.157%/1)` | CSS |
| `--blue-new-99-hsl` | `218.182 calc(1*100%) 2.157%` | CSS |
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
| `BLUE_NEW_1` | `#e6eeff` | JS |
| `BLUE_NEW_10` | `#bed8fe` | JS |
| `BLUE_NEW_100` | `#000000` | JS |
| `BLUE_NEW_11` | `#bad6fd` | JS |
| `BLUE_NEW_12` | `#b5d4fd` | JS |
| `BLUE_NEW_13` | `#b1d1fc` | JS |
| `BLUE_NEW_14` | `#adcffc` | JS |
| `BLUE_NEW_15` | `#a8ccfb` | JS |
| `BLUE_NEW_16` | `#a4cafb` | JS |
| `BLUE_NEW_17` | `#a0c7fa` | JS |
| `BLUE_NEW_18` | `#9cc5fa` | JS |
| `BLUE_NEW_19` | `#98c2f9` | JS |
| `BLUE_NEW_2` | `#e1ecff` | JS |
| `BLUE_NEW_20` | `#93c0f9` | JS |
| `BLUE_NEW_21` | `#8fbdf8` | JS |
| `BLUE_NEW_22` | `#8bbaf7` | JS |
| `BLUE_NEW_23` | `#87b8f7` | JS |
| `BLUE_NEW_24` | `#83b5f6` | JS |
| `BLUE_NEW_25` | `#7fb3f5` | JS |
| `BLUE_NEW_26` | `#7bb0f5` | JS |
| `BLUE_NEW_27` | `#77aef4` | JS |
| `BLUE_NEW_28` | `#72abf3` | JS |
| `BLUE_NEW_29` | `#6ea9f3` | JS |
| `BLUE_NEW_3` | `#ddeaff` | JS |
| `BLUE_NEW_30` | `#6aa6f2` | JS |
| `BLUE_NEW_31` | `#66a4f1` | JS |
| `BLUE_NEW_32` | `#62a1f0` | JS |
| `BLUE_NEW_33` | `#5e9ef0` | JS |
| `BLUE_NEW_34` | `#5a9cef` | JS |
| `BLUE_NEW_35` | `#5599ee` | JS |
| `BLUE_NEW_36` | `#5197ed` | JS |
| `BLUE_NEW_37` | `#4d94ed` | JS |
| `BLUE_NEW_38` | `#4891ec` | JS |
| `BLUE_NEW_39` | `#448feb` | JS |
| `BLUE_NEW_4` | `#d8e7ff` | JS |
| `BLUE_NEW_40` | `#3f8cea` | JS |
| `BLUE_NEW_41` | `#3b89e9` | JS |
| `BLUE_NEW_42` | `#3687e9` | JS |
| `BLUE_NEW_43` | `#3184e8` | JS |
| `BLUE_NEW_44` | `#2b81e7` | JS |
| `BLUE_NEW_45` | `#257fe6` | JS |
| `BLUE_NEW_46` | `#1f7ce5` | JS |
| `BLUE_NEW_47` | `#1779e5` | JS |
| `BLUE_NEW_48` | `#0e77e4` | JS |
| `BLUE_NEW_49` | `#0074e3` | JS |
| `BLUE_NEW_5` | `#d4e5ff` | JS |
| `BLUE_NEW_50` | `#0074e3` | JS |
| `BLUE_NEW_51` | `#0272de` | JS |
| `BLUE_NEW_52` | `#046fd8` | JS |
| `BLUE_NEW_53` | `#056dd3` | JS |
| `BLUE_NEW_54` | `#066bce` | JS |
| `BLUE_NEW_55` | `#0668c9` | JS |
| `BLUE_NEW_56` | `#0666c4` | JS |
| `BLUE_NEW_57` | `#0664bf` | JS |
| `BLUE_NEW_58` | `#0662ba` | JS |
| `BLUE_NEW_59` | `#055fb5` | JS |
| `BLUE_NEW_6` | `#cfe2ff` | JS |
| `BLUE_NEW_60` | `#055db0` | JS |
| `BLUE_NEW_61` | `#045bac` | JS |
| `BLUE_NEW_62` | `#0358a7` | JS |
| `BLUE_NEW_63` | `#0256a3` | JS |
| `BLUE_NEW_64` | `#01549e` | JS |
| `BLUE_NEW_65` | `#00529a` | JS |
| `BLUE_NEW_66` | `#004f96` | JS |
| `BLUE_NEW_67` | `#004d91` | JS |
| `BLUE_NEW_68` | `#004b8d` | JS |
| `BLUE_NEW_69` | `#004989` | JS |
| `BLUE_NEW_7` | `#cbe0ff` | JS |
| `BLUE_NEW_70` | `#004785` | JS |
| `BLUE_NEW_71` | `#004481` | JS |
| `BLUE_NEW_72` | `#00427d` | JS |
| `BLUE_NEW_73` | `#004079` | JS |
| `BLUE_NEW_74` | `#003e75` | JS |
| `BLUE_NEW_75` | `#003c71` | JS |
| `BLUE_NEW_76` | `#00396d` | JS |
| `BLUE_NEW_77` | `#003769` | JS |
| `BLUE_NEW_78` | `#003565` | JS |
| `BLUE_NEW_79` | `#003361` | JS |
| `BLUE_NEW_8` | `#c7ddff` | JS |
| `BLUE_NEW_80` | `#00315e` | JS |
| `BLUE_NEW_81` | `#002f5a` | JS |
| `BLUE_NEW_82` | `#002d56` | JS |
| `BLUE_NEW_83` | `#002b52` | JS |
| `BLUE_NEW_84` | `#00294f` | JS |
| `BLUE_NEW_85` | `#00274b` | JS |
| `BLUE_NEW_86` | `#002547` | JS |
| `BLUE_NEW_87` | `#002344` | JS |
| `BLUE_NEW_88` | `#002140` | JS |
| `BLUE_NEW_89` | `#001f3d` | JS |
| `BLUE_NEW_9` | `#c2dbfe` | JS |
| `BLUE_NEW_90` | `#001d39` | JS |
| `BLUE_NEW_91` | `#001b36` | JS |
| `BLUE_NEW_92` | `#001932` | JS |
| `BLUE_NEW_93` | `#00172f` | JS |
| `BLUE_NEW_94` | `#00142b` | JS |
| `BLUE_NEW_95` | `#001226` | JS |
| `BLUE_NEW_96` | `#000f21` | JS |
| `BLUE_NEW_97` | `#000c1c` | JS |
| `BLUE_NEW_98` | `#000815` | JS |
| `BLUE_NEW_99` | `#00040b` | JS |
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
| `--chip-green-dark-text` | `hsl(130 calc(1*100%) 90.588%/1)` | CSS |
| `--chip-green-light-text` | `hsl(131.667 calc(1*100%) 7.059%/1)` | CSS |
| `--chip-green-medium-text` | `hsl(129.6 calc(1*100%) 4.902%/1)` | CSS |
| `--expressive-gradient-green-end` | `color-mix(in oklab,hsl(152.941 calc(1*100%) 20%...` | CSS |
| `--expressive-gradient-green-start` | `color-mix(in oklab,hsl(145.714 calc(1*70%) 43.1...` | CSS |
| `--expressive-gradient-nitro-green-end` | `color-mix(in oklab,hsl(240 calc(1*82.063%) 43.7...` | CSS |
| `--expressive-gradient-nitro-green-start` | `color-mix(in oklab,hsl(145.714 calc(1*70%) 43.1...` | CSS |
| `--green-100` | `hsl(130 calc(1*100%) 90.588%/1)` | CSS |
| `--green-100-hsl` | `130 calc(1*100%) 90.588%` | CSS |
| `--green-130` | `hsl(130 calc(1*100%) 90.588%/1)` | CSS |
| `--green-130-hsl` | `130 calc(1*100%) 90.588%` | CSS |
| `--green-160` | `hsl(130.385 calc(1*86.667%) 88.235%/1)` | CSS |
| `--green-160-hsl` | `130.385 calc(1*86.667%) 88.235%` | CSS |
| `--green-200` | `hsl(129.524 calc(1*56.757%) 78.235%/1)` | CSS |
| `--green-200-hsl` | `129.524 calc(1*56.757%) 78.235%` | CSS |
| `--green-230` | `hsl(129.706 calc(1*47.887%) 72.157%/1)` | CSS |
| `--green-230-hsl` | `129.706 calc(1*47.887%) 72.157%` | CSS |
| `--green-260` | `hsl(130.541 calc(1*42.529%) 65.882%/1)` | CSS |
| `--green-260-hsl` | `130.541 calc(1*42.529%) 65.882%` | CSS |
| `--green-300` | `hsl(130.769 calc(1*39.394%) 61.176%/1)` | CSS |
| `--green-300-hsl` | `130.769 calc(1*39.394%) 61.176%` | CSS |
| `--green-330` | `hsl(132.143 calc(1*36.522%) 54.902%/1)` | CSS |
| `--green-330-hsl` | `132.143 calc(1*36.522%) 54.902%` | CSS |
| `--green-345` | `hsl(132.809 calc(1*34.902%) 50%/1)` | CSS |
| `--green-345-hsl` | `132.809 calc(1*34.902%) 50%` | CSS |
| `--green-360` | `hsl(134.526 calc(1*41.485%) 44.902%/1)` | CSS |
| `--green-360-hsl` | `134.526 calc(1*41.485%) 44.902%` | CSS |
| `--green-400` | `hsl(138.113 calc(1*56.989%) 36.471%/1)` | CSS |
| `--green-400-hsl` | `138.113 calc(1*56.989%) 36.471%` | CSS |
| `--green-430` | `hsl(145.238 calc(1*95.455%) 25.882%/1)` | CSS |
| `--green-430-hsl` | `145.238 calc(1*95.455%) 25.882%` | CSS |
| `--green-460` | `hsl(145 calc(1*93.103%) 22.745%/1)` | CSS |
| `--green-460-hsl` | `145 calc(1*93.103%) 22.745%` | CSS |
| `--green-500` | `hsl(145.2 calc(1*96.154%) 20.392%/1)` | CSS |
| `--green-500-hsl` | `145.2 calc(1*96.154%) 20.392%` | CSS |
| `--green-530` | `hsl(144.944 calc(1*100%) 17.451%/1)` | CSS |
| `--green-530-hsl` | `144.944 calc(1*100%) 17.451%` | CSS |
| `--green-560` | `hsl(143.377 calc(1*100%) 15.098%/1)` | CSS |
| `--green-560-hsl` | `143.377 calc(1*100%) 15.098%` | CSS |
| `--green-600` | `hsl(142.286 calc(1*100%) 13.725%/1)` | CSS |
| `--green-600-hsl` | `142.286 calc(1*100%) 13.725%` | CSS |
| `--green-630` | `hsl(140.952 calc(1*100%) 12.353%/1)` | CSS |
| `--green-630-hsl` | `140.952 calc(1*100%) 12.353%` | CSS |
| `--green-660` | `hsl(138.889 calc(1*100%) 10.588%/1)` | CSS |
| `--green-660-hsl` | `138.889 calc(1*100%) 10.588%` | CSS |
| `--green-700` | `hsl(136.596 calc(1*100%) 9.216%/1)` | CSS |
| `--green-700-hsl` | `136.596 calc(1*100%) 9.216%` | CSS |
| `--green-730` | `hsl(135.349 calc(1*100%) 8.431%/1)` | CSS |
| `--green-730-hsl` | `135.349 calc(1*100%) 8.431%` | CSS |
| `--green-760` | `hsl(132.353 calc(1*100%) 6.667%/1)` | CSS |
| `--green-760-hsl` | `132.353 calc(1*100%) 6.667%` | CSS |
| `--green-800` | `hsl(131.25 calc(1*100%) 6.275%/1)` | CSS |
| `--green-800-hsl` | `131.25 calc(1*100%) 6.275%` | CSS |
| `--green-830` | `hsl(129.6 calc(1*100%) 4.902%/1)` | CSS |
| `--green-830-hsl` | `129.6 calc(1*100%) 4.902%` | CSS |
| `--green-860` | `hsl(128.182 calc(1*100%) 4.314%/1)` | CSS |
| `--green-860-hsl` | `128.182 calc(1*100%) 4.314%` | CSS |
| `--green-900` | `hsl(129 calc(1*100%) 3.922%/1)` | CSS |
| `--green-900-hsl` | `129 calc(1*100%) 3.922%` | CSS |
| `--green-new-1` | `hsl(130 calc(1*100%) 90.588%/1)` | CSS |
| `--green-new-1-hsl` | `130 calc(1*100%) 90.588%` | CSS |
| `--green-new-10` | `hsl(129.836 calc(1*58.095%) 79.412%/1)` | CSS |
| `--green-new-10-hsl` | `129.836 calc(1*58.095%) 79.412%` | CSS |
| `--green-new-100` | `hsl(128.571 calc(1*100%) 1.373%/1)` | CSS |
| `--green-new-100-hsl` | `128.571 calc(1*100%) 1.373%` | CSS |
| `--green-new-11` | `hsl(129.524 calc(1*56.757%) 78.235%/1)` | CSS |
| `--green-new-11-hsl` | `129.524 calc(1*56.757%) 78.235%` | CSS |
| `--green-new-12` | `hsl(129.524 calc(1*53.846%) 77.059%/1)` | CSS |
| `--green-new-12-hsl` | `129.524 calc(1*53.846%) 77.059%` | CSS |
| `--green-new-13` | `hsl(129.375 calc(1*51.613%) 75.686%/1)` | CSS |
| `--green-new-13-hsl` | `129.375 calc(1*51.613%) 75.686%` | CSS |
| `--green-new-14` | `hsl(130 calc(1*50.769%) 74.51%/1)` | CSS |
| `--green-new-14-hsl` | `130 calc(1*50.769%) 74.51%` | CSS |
| `--green-new-15` | `hsl(129.851 calc(1*48.905%) 73.137%/1)` | CSS |
| `--green-new-15-hsl` | `129.851 calc(1*48.905%) 73.137%` | CSS |
| `--green-new-16` | `hsl(129.706 calc(1*47.887%) 72.157%/1)` | CSS |
| `--green-new-16-hsl` | `129.706 calc(1*47.887%) 72.157%` | CSS |
| `--green-new-17` | `hsl(129.565 calc(1*46.309%) 70.784%/1)` | CSS |
| `--green-new-17-hsl` | `129.565 calc(1*46.309%) 70.784%` | CSS |
| `--green-new-18` | `hsl(130.141 calc(1*45.806%) 69.608%/1)` | CSS |
| `--green-new-18-hsl` | `130.141 calc(1*45.806%) 69.608%` | CSS |
| `--green-new-19` | `hsl(129.296 calc(1*44.099%) 68.431%/1)` | CSS |
| `--green-new-19-hsl` | `129.296 calc(1*44.099%) 68.431%` | CSS |
| `--green-new-2` | `hsl(130.8 calc(1*92.593%) 89.412%/1)` | CSS |
| `--green-new-2-hsl` | `130.8 calc(1*92.593%) 89.412%` | CSS |
| `--green-new-20` | `hsl(130 calc(1*42.857%) 67.059%/1)` | CSS |
| `--green-new-20-hsl` | `130 calc(1*42.857%) 67.059%` | CSS |
| `--green-new-21` | `hsl(130.541 calc(1*42.529%) 65.882%/1)` | CSS |
| `--green-new-21-hsl` | `130.541 calc(1*42.529%) 65.882%` | CSS |
| `--green-new-22` | `hsl(129.73 calc(1*41.111%) 64.706%/1)` | CSS |
| `--green-new-22-hsl` | `129.73 calc(1*41.111%) 64.706%` | CSS |
| `--green-new-23` | `hsl(130.263 calc(1*40.86%) 63.529%/1)` | CSS |
| `--green-new-23-hsl` | `130.263 calc(1*40.86%) 63.529%` | CSS |
| `--green-new-24` | `hsl(130.909 calc(1*39.896%) 62.157%/1)` | CSS |
| `--green-new-24-hsl` | `130.909 calc(1*39.896%) 62.157%` | CSS |
| `--green-new-25` | `hsl(130.769 calc(1*39.394%) 61.176%/1)` | CSS |
| `--green-new-25-hsl` | `130.769 calc(1*39.394%) 61.176%` | CSS |
| `--green-new-26` | `hsl(130.633 calc(1*38.537%) 59.804%/1)` | CSS |
| `--green-new-26-hsl` | `130.633 calc(1*38.537%) 59.804%` | CSS |
| `--green-new-27` | `hsl(131.111 calc(1*38.389%) 58.627%/1)` | CSS |
| `--green-new-27-hsl` | `131.111 calc(1*38.389%) 58.627%` | CSS |
| `--green-new-28` | `hsl(131.111 calc(1*37.327%) 57.451%/1)` | CSS |
| `--green-new-28-hsl` | `131.111 calc(1*37.327%) 57.451%` | CSS |
| `--green-new-29` | `hsl(131.707 calc(1*36.607%) 56.078%/1)` | CSS |
| `--green-new-29-hsl` | `131.707 calc(1*36.607%) 56.078%` | CSS |
| `--green-new-3` | `hsl(130.385 calc(1*86.667%) 88.235%/1)` | CSS |
| `--green-new-3-hsl` | `130.385 calc(1*86.667%) 88.235%` | CSS |
| `--green-new-30` | `hsl(132.143 calc(1*36.522%) 54.902%/1)` | CSS |
| `--green-new-30-hsl` | `132.143 calc(1*36.522%) 54.902%` | CSS |
| `--green-new-31` | `hsl(132.706 calc(1*35.865%) 53.529%/1)` | CSS |
| `--green-new-31-hsl` | `132.706 calc(1*35.865%) 53.529%` | CSS |
| `--green-new-32` | `hsl(131.86 calc(1*35.537%) 52.549%/1)` | CSS |
| `--green-new-32-hsl` | `131.86 calc(1*35.537%) 52.549%` | CSS |
| `--green-new-33` | `hsl(132.414 calc(1*34.94%) 51.176%/1)` | CSS |
| `--green-new-33-hsl` | `132.414 calc(1*34.94%) 51.176%` | CSS |
| `--green-new-34` | `hsl(132.809 calc(1*34.902%) 50%/1)` | CSS |
| `--green-new-34-hsl` | `132.809 calc(1*34.902%) 50%` | CSS |
| `--green-new-35` | `hsl(133.333 calc(1*36.29%) 48.627%/1)` | CSS |
| `--green-new-35-hsl` | `133.333 calc(1*36.29%) 48.627%` | CSS |
| `--green-new-36` | `hsl(133.696 calc(1*38.017%) 47.451%/1)` | CSS |
| `--green-new-36-hsl` | `133.696 calc(1*38.017%) 47.451%` | CSS |
| `--green-new-37` | `hsl(134.194 calc(1*39.574%) 46.078%/1)` | CSS |
| `--green-new-37-hsl` | `134.194 calc(1*39.574%) 46.078%` | CSS |
| `--green-new-38` | `hsl(134.526 calc(1*41.485%) 44.902%/1)` | CSS |
| `--green-new-38-hsl` | `134.526 calc(1*41.485%) 44.902%` | CSS |
| `--green-new-39` | `hsl(135 calc(1*43.243%) 43.529%/1)` | CSS |
| `--green-new-39-hsl` | `135 calc(1*43.243%) 43.529%` | CSS |
| `--green-new-4` | `hsl(130.189 calc(1*79.104%) 86.863%/1)` | CSS |
| `--green-new-4-hsl` | `130.189 calc(1*79.104%) 86.863%` | CSS |
| `--green-new-40` | `hsl(135.306 calc(1*45.37%) 42.353%/1)` | CSS |
| `--green-new-40-hsl` | `135.306 calc(1*45.37%) 42.353%` | CSS |
| `--green-new-41` | `hsl(135.758 calc(1*47.368%) 40.98%/1)` | CSS |
| `--green-new-41-hsl` | `135.758 calc(1*47.368%) 40.98%` | CSS |
| `--green-new-42` | `hsl(136.471 calc(1*50.495%) 39.608%/1)` | CSS |
| `--green-new-42-hsl` | `136.471 calc(1*50.495%) 39.608%` | CSS |
| `--green-new-43` | `hsl(137.308 calc(1*53.608%) 38.039%/1)` | CSS |
| `--green-new-43-hsl` | `137.308 calc(1*53.608%) 38.039%` | CSS |
| `--green-new-44` | `hsl(138.113 calc(1*56.989%) 36.471%/1)` | CSS |
| `--green-new-44-hsl` | `138.113 calc(1*56.989%) 36.471%` | CSS |
| `--green-new-45` | `hsl(139.266 calc(1*60.894%) 35.098%/1)` | CSS |
| `--green-new-45-hsl` | `139.266 calc(1*60.894%) 35.098%` | CSS |
| `--green-new-46` | `hsl(140.357 calc(1*65.882%) 33.333%/1)` | CSS |
| `--green-new-46-hsl` | `140.357 calc(1*65.882%) 33.333%` | CSS |
| `--green-new-47` | `hsl(141.538 calc(1*72.671%) 31.569%/1)` | CSS |
| `--green-new-47-hsl` | `141.538 calc(1*72.671%) 31.569%` | CSS |
| `--green-new-48` | `hsl(143.71 calc(1*83.784%) 29.02%/1)` | CSS |
| `--green-new-48-hsl` | `143.71 calc(1*83.784%) 29.02%` | CSS |
| `--green-new-49` | `hsl(145.97 calc(1*100%) 26.275%/1)` | CSS |
| `--green-new-49-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--green-new-5` | `hsl(129.818 calc(1*75.342%) 85.686%/1)` | CSS |
| `--green-new-5-hsl` | `129.818 calc(1*75.342%) 85.686%` | CSS |
| `--green-new-50` | `hsl(145.97 calc(1*100%) 26.275%/1)` | CSS |
| `--green-new-50-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--green-new-51` | `hsl(145.581 calc(1*96.992%) 26.078%/1)` | CSS |
| `--green-new-51-hsl` | `145.581 calc(1*96.992%) 26.078%` | CSS |
| `--green-new-52` | `hsl(145.238 calc(1*95.455%) 25.882%/1)` | CSS |
| `--green-new-52-hsl` | `145.238 calc(1*95.455%) 25.882%` | CSS |
| `--green-new-53` | `hsl(145.082 calc(1*93.846%) 25.49%/1)` | CSS |
| `--green-new-53-hsl` | `145.082 calc(1*93.846%) 25.49%` | CSS |
| `--green-new-54` | `hsl(145.21 calc(1*93.701%) 24.902%/1)` | CSS |
| `--green-new-54-hsl` | `145.21 calc(1*93.701%) 24.902%` | CSS |
| `--green-new-55` | `hsl(144.522 calc(1*92%) 24.51%/1)` | CSS |
| `--green-new-55-hsl` | `144.522 calc(1*92%) 24.51%` | CSS |
| `--green-new-56` | `hsl(144.425 calc(1*91.87%) 24.118%/1)` | CSS |
| `--green-new-56-hsl` | `144.425 calc(1*91.87%) 24.118%` | CSS |
| `--green-new-57` | `hsl(144.545 calc(1*91.667%) 23.529%/1)` | CSS |
| `--green-new-57-hsl` | `144.545 calc(1*91.667%) 23.529%` | CSS |
| `--green-new-58` | `hsl(145 calc(1*93.103%) 22.745%/1)` | CSS |
| `--green-new-58-hsl` | `145 calc(1*93.103%) 22.745%` | CSS |
| `--green-new-59` | `hsl(144.34 calc(1*92.982%) 22.353%/1)` | CSS |
| `--green-new-59-hsl` | `144.34 calc(1*92.982%) 22.353%` | CSS |
| `--green-new-6` | `hsl(130.714 calc(1*70%) 84.314%/1)` | CSS |
| `--green-new-6-hsl` | `130.714 calc(1*70%) 84.314%` | CSS |
| `--green-new-60` | `hsl(144.466 calc(1*92.793%) 21.765%/1)` | CSS |
| `--green-new-60-hsl` | `144.466 calc(1*92.793%) 21.765%` | CSS |
| `--green-new-61` | `hsl(144.706 calc(1*94.444%) 21.176%/1)` | CSS |
| `--green-new-61-hsl` | `144.706 calc(1*94.444%) 21.176%` | CSS |
| `--green-new-62` | `hsl(145.2 calc(1*96.154%) 20.392%/1)` | CSS |
| `--green-new-62-hsl` | `145.2 calc(1*96.154%) 20.392%` | CSS |
| `--green-new-63` | `hsl(144.49 calc(1*96.078%) 20%/1)` | CSS |
| `--green-new-63-hsl` | `144.49 calc(1*96.078%) 20%` | CSS |
| `--green-new-64` | `hsl(145 calc(1*97.959%) 19.216%/1)` | CSS |
| `--green-new-64-hsl` | `145 calc(1*97.959%) 19.216%` | CSS |
| `--green-new-65` | `hsl(144.894 calc(1*100%) 18.431%/1)` | CSS |
| `--green-new-65-hsl` | `144.894 calc(1*100%) 18.431%` | CSS |
| `--green-new-66` | `hsl(144.783 calc(1*100%) 18.039%/1)` | CSS |
| `--green-new-66-hsl` | `144.783 calc(1*100%) 18.039%` | CSS |
| `--green-new-67` | `hsl(144.944 calc(1*100%) 17.451%/1)` | CSS |
| `--green-new-67-hsl` | `144.944 calc(1*100%) 17.451%` | CSS |
| `--green-new-68` | `hsl(144.138 calc(1*100%) 17.059%/1)` | CSS |
| `--green-new-68-hsl` | `144.138 calc(1*100%) 17.059%` | CSS |
| `--green-new-69` | `hsl(144 calc(1*100%) 16.667%/1)` | CSS |
| `--green-new-69-hsl` | `144 calc(1*100%) 16.667%` | CSS |
| `--green-new-7` | `hsl(129.474 calc(1*67.059%) 83.333%/1)` | CSS |
| `--green-new-7-hsl` | `129.474 calc(1*67.059%) 83.333%` | CSS |
| `--green-new-70` | `hsl(144.146 calc(1*100%) 16.078%/1)` | CSS |
| `--green-new-70-hsl` | `144.146 calc(1*100%) 16.078%` | CSS |
| `--green-new-71` | `hsl(143.25 calc(1*100%) 15.686%/1)` | CSS |
| `--green-new-71-hsl` | `143.25 calc(1*100%) 15.686%` | CSS |
| `--green-new-72` | `hsl(143.377 calc(1*100%) 15.098%/1)` | CSS |
| `--green-new-72-hsl` | `143.377 calc(1*100%) 15.098%` | CSS |
| `--green-new-73` | `hsl(142.4 calc(1*100%) 14.706%/1)` | CSS |
| `--green-new-73-hsl` | `142.4 calc(1*100%) 14.706%` | CSS |
| `--green-new-74` | `hsl(142.5 calc(1*100%) 14.118%/1)` | CSS |
| `--green-new-74-hsl` | `142.5 calc(1*100%) 14.118%` | CSS |
| `--green-new-75` | `hsl(142.286 calc(1*100%) 13.725%/1)` | CSS |
| `--green-new-75-hsl` | `142.286 calc(1*100%) 13.725%` | CSS |
| `--green-new-76` | `hsl(141.176 calc(1*100%) 13.333%/1)` | CSS |
| `--green-new-76-hsl` | `141.176 calc(1*100%) 13.333%` | CSS |
| `--green-new-77` | `hsl(141.231 calc(1*100%) 12.745%/1)` | CSS |
| `--green-new-77-hsl` | `141.231 calc(1*100%) 12.745%` | CSS |
| `--green-new-78` | `hsl(140.952 calc(1*100%) 12.353%/1)` | CSS |
| `--green-new-78-hsl` | `140.952 calc(1*100%) 12.353%` | CSS |
| `--green-new-79` | `hsl(139.672 calc(1*100%) 11.961%/1)` | CSS |
| `--green-new-79-hsl` | `139.672 calc(1*100%) 11.961%` | CSS |
| `--green-new-8` | `hsl(129.31 calc(1*63.043%) 81.961%/1)` | CSS |
| `--green-new-8-hsl` | `129.31 calc(1*63.043%) 81.961%` | CSS |
| `--green-new-80` | `hsl(139.655 calc(1*100%) 11.373%/1)` | CSS |
| `--green-new-80-hsl` | `139.655 calc(1*100%) 11.373%` | CSS |
| `--green-new-81` | `hsl(139.286 calc(1*100%) 10.98%/1)` | CSS |
| `--green-new-81-hsl` | `139.286 calc(1*100%) 10.98%` | CSS |
| `--green-new-82` | `hsl(138.889 calc(1*100%) 10.588%/1)` | CSS |
| `--green-new-82-hsl` | `138.889 calc(1*100%) 10.588%` | CSS |
| `--green-new-83` | `hsl(137.308 calc(1*100%) 10.196%/1)` | CSS |
| `--green-new-83-hsl` | `137.308 calc(1*100%) 10.196%` | CSS |
| `--green-new-84` | `hsl(137.143 calc(1*100%) 9.608%/1)` | CSS |
| `--green-new-84-hsl` | `137.143 calc(1*100%) 9.608%` | CSS |
| `--green-new-85` | `hsl(136.596 calc(1*100%) 9.216%/1)` | CSS |
| `--green-new-85-hsl` | `136.596 calc(1*100%) 9.216%` | CSS |
| `--green-new-86` | `hsl(136 calc(1*100%) 8.824%/1)` | CSS |
| `--green-new-86-hsl` | `136 calc(1*100%) 8.824%` | CSS |
| `--green-new-87` | `hsl(135.349 calc(1*100%) 8.431%/1)` | CSS |
| `--green-new-87-hsl` | `135.349 calc(1*100%) 8.431%` | CSS |
| `--green-new-88` | `hsl(133.5 calc(1*100%) 7.843%/1)` | CSS |
| `--green-new-88-hsl` | `133.5 calc(1*100%) 7.843%` | CSS |
| `--green-new-89` | `hsl(132.632 calc(1*100%) 7.451%/1)` | CSS |
| `--green-new-89-hsl` | `132.632 calc(1*100%) 7.451%` | CSS |
| `--green-new-9` | `hsl(129 calc(1*61.224%) 80.784%/1)` | CSS |
| `--green-new-9-hsl` | `129 calc(1*61.224%) 80.784%` | CSS |
| `--green-new-90` | `hsl(131.667 calc(1*100%) 7.059%/1)` | CSS |
| `--green-new-90-hsl` | `131.667 calc(1*100%) 7.059%` | CSS |
| `--green-new-91` | `hsl(132.353 calc(1*100%) 6.667%/1)` | CSS |
| `--green-new-91-hsl` | `132.353 calc(1*100%) 6.667%` | CSS |
| `--green-new-92` | `hsl(131.25 calc(1*100%) 6.275%/1)` | CSS |
| `--green-new-92-hsl` | `131.25 calc(1*100%) 6.275%` | CSS |
| `--green-new-93` | `hsl(130 calc(1*100%) 5.882%/1)` | CSS |
| `--green-new-93-hsl` | `130 calc(1*100%) 5.882%` | CSS |
| `--green-new-94` | `hsl(128.889 calc(1*100%) 5.294%/1)` | CSS |
| `--green-new-94-hsl` | `128.889 calc(1*100%) 5.294%` | CSS |
| `--green-new-95` | `hsl(129.6 calc(1*100%) 4.902%/1)` | CSS |
| `--green-new-95-hsl` | `129.6 calc(1*100%) 4.902%` | CSS |
| `--green-new-96` | `hsl(128.182 calc(1*100%) 4.314%/1)` | CSS |
| `--green-new-96-hsl` | `128.182 calc(1*100%) 4.314%` | CSS |
| `--green-new-97` | `hsl(129 calc(1*100%) 3.922%/1)` | CSS |
| `--green-new-97-hsl` | `129 calc(1*100%) 3.922%` | CSS |
| `--green-new-98` | `hsl(127.5 calc(1*100%) 3.137%/1)` | CSS |
| `--green-new-98-hsl` | `127.5 calc(1*100%) 3.137%` | CSS |
| `--green-new-99` | `hsl(130 calc(1*100%) 2.353%/1)` | CSS |
| `--green-new-99-hsl` | `130 calc(1*100%) 2.353%` | CSS |
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
| `--opacity-green-1` | `hsl(145.97 calc(1*100%) 26.275%/0.0196078431372...` | CSS |
| `--opacity-green-1-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-12` | `hsl(145.97 calc(1*100%) 26.275%/0.1215686274509...` | CSS |
| `--opacity-green-12-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-16` | `hsl(145.97 calc(1*100%) 26.275%/0.1607843137254...` | CSS |
| `--opacity-green-16-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-20` | `hsl(145.97 calc(1*100%) 26.275%/0.2)` | CSS |
| `--opacity-green-20-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-24` | `hsl(145.97 calc(1*100%) 26.275%/0.2392156862745...` | CSS |
| `--opacity-green-24-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-28` | `hsl(145.97 calc(1*100%) 26.275%/0.2784313725490...` | CSS |
| `--opacity-green-28-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-32` | `hsl(145.97 calc(1*100%) 26.275%/0.3215686274509...` | CSS |
| `--opacity-green-32-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-36` | `hsl(145.97 calc(1*100%) 26.275%/0.3607843137254...` | CSS |
| `--opacity-green-36-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-4` | `hsl(145.97 calc(1*100%) 26.275%/0.0392156862745...` | CSS |
| `--opacity-green-4-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-40` | `hsl(145.97 calc(1*100%) 26.275%/0.4)` | CSS |
| `--opacity-green-40-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-44` | `hsl(145.97 calc(1*100%) 26.275%/0.4392156862745...` | CSS |
| `--opacity-green-44-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-48` | `hsl(145.97 calc(1*100%) 26.275%/0.4784313725490...` | CSS |
| `--opacity-green-48-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-52` | `hsl(145.97 calc(1*100%) 26.275%/0.5215686274509...` | CSS |
| `--opacity-green-52-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-56` | `hsl(145.97 calc(1*100%) 26.275%/0.5607843137254...` | CSS |
| `--opacity-green-56-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-60` | `hsl(145.97 calc(1*100%) 26.275%/0.6)` | CSS |
| `--opacity-green-60-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-64` | `hsl(145.97 calc(1*100%) 26.275%/0.6392156862745...` | CSS |
| `--opacity-green-64-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-68` | `hsl(145.97 calc(1*100%) 26.275%/0.6784313725490...` | CSS |
| `--opacity-green-68-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-72` | `hsl(145.97 calc(1*100%) 26.275%/0.7215686274509...` | CSS |
| `--opacity-green-72-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-76` | `hsl(145.97 calc(1*100%) 26.275%/0.7607843137254...` | CSS |
| `--opacity-green-76-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-8` | `hsl(145.97 calc(1*100%) 26.275%/0.0784313725490...` | CSS |
| `--opacity-green-8-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-80` | `hsl(145.97 calc(1*100%) 26.275%/0.8)` | CSS |
| `--opacity-green-80-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-84` | `hsl(145.97 calc(1*100%) 26.275%/0.8392156862745...` | CSS |
| `--opacity-green-84-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-88` | `hsl(145.97 calc(1*100%) 26.275%/0.8784313725490...` | CSS |
| `--opacity-green-88-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-92` | `hsl(145.97 calc(1*100%) 26.275%/0.9215686274509...` | CSS |
| `--opacity-green-92-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
| `--opacity-green-96` | `hsl(145.97 calc(1*100%) 26.275%/0.9607843137254...` | CSS |
| `--opacity-green-96-hsl` | `145.97 calc(1*100%) 26.275%` | CSS |
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
| `GREEN_NEW_1` | `#cfffd7` | JS |
| `GREEN_NEW_10` | `#ace9b6` | JS |
| `GREEN_NEW_100` | `#000701` | JS |
| `GREEN_NEW_11` | `#a8e7b2` | JS |
| `GREEN_NEW_12` | `#a5e4af` | JS |
| `GREEN_NEW_13` | `#a1e1ab` | JS |
| `GREEN_NEW_14` | `#9ddfa8` | JS |
| `GREEN_NEW_15` | `#99dca4` | JS |
| `GREEN_NEW_16` | `#96daa1` | JS |
| `GREEN_NEW_17` | `#92d79d` | JS |
| `GREEN_NEW_18` | `#8ed59a` | JS |
| `GREEN_NEW_19` | `#8bd296` | JS |
| `GREEN_NEW_2` | `#cbfdd4` | JS |
| `GREEN_NEW_20` | `#87cf93` | JS |
| `GREEN_NEW_21` | `#83cd90` | JS |
| `GREEN_NEW_22` | `#80ca8c` | JS |
| `GREEN_NEW_23` | `#7cc889` | JS |
| `GREEN_NEW_24` | `#78c586` | JS |
| `GREEN_NEW_25` | `#75c383` | JS |
| `GREEN_NEW_26` | `#71c07f` | JS |
| `GREEN_NEW_27` | `#6dbe7c` | JS |
| `GREEN_NEW_28` | `#6abb79` | JS |
| `GREEN_NEW_29` | `#66b876` | JS |
| `GREEN_NEW_3` | `#c7fbd0` | JS |
| `GREEN_NEW_30` | `#62b673` | JS |
| `GREEN_NEW_31` | `#5eb370` | JS |
| `GREEN_NEW_32` | `#5bb16c` | JS |
| `GREEN_NEW_33` | `#57ae69` | JS |
| `GREEN_NEW_34` | `#53ac66` | JS |
| `GREEN_NEW_35` | `#4fa963` | JS |
| `GREEN_NEW_36` | `#4ba760` | JS |
| `GREEN_NEW_37` | `#47a45d` | JS |
| `GREEN_NEW_38` | `#43a25a` | JS |
| `GREEN_NEW_39` | `#3f9f57` | JS |
| `GREEN_NEW_4` | `#c3f8cc` | JS |
| `GREEN_NEW_40` | `#3b9d54` | JS |
| `GREEN_NEW_41` | `#379a51` | JS |
| `GREEN_NEW_42` | `#32984e` | JS |
| `GREEN_NEW_43` | `#2d954b` | JS |
| `GREEN_NEW_44` | `#289248` | JS |
| `GREEN_NEW_45` | `#239046` | JS |
| `GREEN_NEW_46` | `#1d8d43` | JS |
| `GREEN_NEW_47` | `#168b40` | JS |
| `GREEN_NEW_48` | `#0c883d` | JS |
| `GREEN_NEW_49` | `#00863a` | JS |
| `GREEN_NEW_5` | `#bff6c8` | JS |
| `GREEN_NEW_50` | `#00863a` | JS |
| `GREEN_NEW_51` | `#028339` | JS |
| `GREEN_NEW_52` | `#038138` | JS |
| `GREEN_NEW_53` | `#047e37` | JS |
| `GREEN_NEW_54` | `#047b36` | JS |
| `GREEN_NEW_55` | `#057834` | JS |
| `GREEN_NEW_56` | `#057633` | JS |
| `GREEN_NEW_57` | `#057332` | JS |
| `GREEN_NEW_58` | `#047031` | JS |
| `GREEN_NEW_59` | `#046e2f` | JS |
| `GREEN_NEW_6` | `#bbf3c5` | JS |
| `GREEN_NEW_60` | `#046b2e` | JS |
| `GREEN_NEW_61` | `#03692d` | JS |
| `GREEN_NEW_62` | `#02662c` | JS |
| `GREEN_NEW_63` | `#02642a` | JS |
| `GREEN_NEW_64` | `#016129` | JS |
| `GREEN_NEW_65` | `#005e27` | JS |
| `GREEN_NEW_66` | `#005c26` | JS |
| `GREEN_NEW_67` | `#005925` | JS |
| `GREEN_NEW_68` | `#005723` | JS |
| `GREEN_NEW_69` | `#005522` | JS |
| `GREEN_NEW_7` | `#b8f1c1` | JS |
| `GREEN_NEW_70` | `#005221` | JS |
| `GREEN_NEW_71` | `#00501f` | JS |
| `GREEN_NEW_72` | `#004d1e` | JS |
| `GREEN_NEW_73` | `#004b1c` | JS |
| `GREEN_NEW_74` | `#00481b` | JS |
| `GREEN_NEW_75` | `#00461a` | JS |
| `GREEN_NEW_76` | `#004418` | JS |
| `GREEN_NEW_77` | `#004117` | JS |
| `GREEN_NEW_78` | `#003f16` | JS |
| `GREEN_NEW_79` | `#003d14` | JS |
| `GREEN_NEW_8` | `#b4eebd` | JS |
| `GREEN_NEW_80` | `#003a13` | JS |
| `GREEN_NEW_81` | `#003812` | JS |
| `GREEN_NEW_82` | `#003611` | JS |
| `GREEN_NEW_83` | `#00340f` | JS |
| `GREEN_NEW_84` | `#00310e` | JS |
| `GREEN_NEW_85` | `#002f0d` | JS |
| `GREEN_NEW_86` | `#002d0c` | JS |
| `GREEN_NEW_87` | `#002b0b` | JS |
| `GREEN_NEW_88` | `#002809` | JS |
| `GREEN_NEW_89` | `#002608` | JS |
| `GREEN_NEW_9` | `#b0ecb9` | JS |
| `GREEN_NEW_90` | `#002407` | JS |
| `GREEN_NEW_91` | `#002207` | JS |
| `GREEN_NEW_92` | `#002006` | JS |
| `GREEN_NEW_93` | `#001e05` | JS |
| `GREEN_NEW_94` | `#001b04` | JS |
| `GREEN_NEW_95` | `#001904` | JS |
| `GREEN_NEW_96` | `#001603` | JS |
| `GREEN_NEW_97` | `#001403` | JS |
| `GREEN_NEW_98` | `#001002` | JS |
| `GREEN_NEW_99` | `#000c02` | JS |
| `ILLO_GREEN_10` | `#e5fff0` | JS |
| `ILLO_GREEN_20` | `#c0fbd8` | JS |
| `ILLO_GREEN_30` | `#8af7b5` | JS |
| `ILLO_GREEN_40` | `#35ed7e` | JS |
| `ILLO_GREEN_50` | `#21bb63` | JS |
| `ILLO_GREEN_60` | `#108e4d` | JS |
| `ILLO_GREEN_70` | `#006638` | JS |
| `OPACITY_GREEN_1` | `#00863a05` | JS |
| `OPACITY_GREEN_12` | `#00863a1f` | JS |
| `OPACITY_GREEN_16` | `#00863a29` | JS |
| `OPACITY_GREEN_20` | `#00863a33` | JS |
| `OPACITY_GREEN_24` | `#00863a3d` | JS |
| `OPACITY_GREEN_28` | `#00863a47` | JS |
| `OPACITY_GREEN_32` | `#00863a52` | JS |
| `OPACITY_GREEN_36` | `#00863a5c` | JS |
| `OPACITY_GREEN_4` | `#00863a0a` | JS |
| `OPACITY_GREEN_40` | `#00863a66` | JS |
| `OPACITY_GREEN_44` | `#00863a70` | JS |
| `OPACITY_GREEN_48` | `#00863a7a` | JS |
| `OPACITY_GREEN_52` | `#00863a85` | JS |
| `OPACITY_GREEN_56` | `#00863a8f` | JS |
| `OPACITY_GREEN_60` | `#00863a99` | JS |
| `OPACITY_GREEN_64` | `#00863aa3` | JS |
| `OPACITY_GREEN_68` | `#00863aad` | JS |
| `OPACITY_GREEN_72` | `#00863ab8` | JS |
| `OPACITY_GREEN_76` | `#00863ac2` | JS |
| `OPACITY_GREEN_8` | `#00863a14` | JS |
| `OPACITY_GREEN_80` | `#00863acc` | JS |
| `OPACITY_GREEN_84` | `#00863ad6` | JS |
| `OPACITY_GREEN_88` | `#00863ae0` | JS |
| `OPACITY_GREEN_92` | `#00863aeb` | JS |
| `OPACITY_GREEN_96` | `#00863af5` | JS |

*Total: 487 variables*

---

## Colors - Red

| Variable | Value | Type |
|----------|-------|------|
| `--chip-red-dark-text` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--chip-red-light-text` | `hsl(353.75 calc(1*100%) 9.412%/1)` | CSS |
| `--chip-red-medium-text` | `hsl(345 calc(1*100%) 0.784%/1)` | CSS |
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
| `--red-100` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--red-100-hsl` | `1.818 calc(1*100%) 93.529%` | CSS |
| `--red-130` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--red-130-hsl` | `1.818 calc(1*100%) 93.529%` | CSS |
| `--red-160` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--red-160-hsl` | `1.818 calc(1*100%) 93.529%` | CSS |
| `--red-200` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--red-200-hsl` | `1.818 calc(1*100%) 93.529%` | CSS |
| `--red-230` | `hsl(3.6 calc(1*100%) 90.196%/1)` | CSS |
| `--red-230-hsl` | `3.6 calc(1*100%) 90.196%` | CSS |
| `--red-260` | `hsl(2.609 calc(1*100%) 86.471%/1)` | CSS |
| `--red-260-hsl` | `2.609 calc(1*100%) 86.471%` | CSS |
| `--red-300` | `hsl(2.727 calc(1*100%) 82.745%/1)` | CSS |
| `--red-300-hsl` | `2.727 calc(1*100%) 82.745%` | CSS |
| `--red-330` | `hsl(2.679 calc(1*96.552%) 77.255%/1)` | CSS |
| `--red-330-hsl` | `2.679 calc(1*96.552%) 77.255%` | CSS |
| `--red-345` | `hsl(1.417 calc(1*86.395%) 71.176%/1)` | CSS |
| `--red-345-hsl` | `1.417 calc(1*86.395%) 71.176%` | CSS |
| `--red-360` | `hsl(0 calc(1*74.737%) 62.745%/1)` | CSS |
| `--red-360-hsl` | `0 calc(1*74.737%) 62.745%` | CSS |
| `--red-400` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--red-400-hsl` | `357.692 calc(1*67.826%) 54.902%` | CSS |
| `--red-430` | `hsl(356.625 calc(1*66.116%) 52.549%/1)` | CSS |
| `--red-430-hsl` | `356.625 calc(1*66.116%) 52.549%` | CSS |
| `--red-460` | `hsl(355.51 calc(1*64.192%) 44.902%/1)` | CSS |
| `--red-460-hsl` | `355.51 calc(1*64.192%) 44.902%` | CSS |
| `--red-500` | `hsl(355.814 calc(1*64.824%) 39.02%/1)` | CSS |
| `--red-500-hsl` | `355.814 calc(1*64.824%) 39.02%` | CSS |
| `--red-530` | `hsl(356.348 calc(1*65.714%) 34.314%/1)` | CSS |
| `--red-530-hsl` | `356.348 calc(1*65.714%) 34.314%` | CSS |
| `--red-560` | `hsl(356 calc(1*67.742%) 30.392%/1)` | CSS |
| `--red-560-hsl` | `356 calc(1*67.742%) 30.392%` | CSS |
| `--red-600` | `hsl(355.532 calc(1*72.308%) 25.49%/1)` | CSS |
| `--red-600-hsl` | `355.532 calc(1*72.308%) 25.49%` | CSS |
| `--red-630` | `hsl(354.483 calc(1*75.652%) 22.549%/1)` | CSS |
| `--red-630-hsl` | `354.483 calc(1*75.652%) 22.549%` | CSS |
| `--red-660` | `hsl(354.074 calc(1*80.198%) 19.804%/1)` | CSS |
| `--red-660-hsl` | `354.074 calc(1*80.198%) 19.804%` | CSS |
| `--red-700` | `hsl(353.684 calc(1*82.609%) 18.039%/1)` | CSS |
| `--red-700-hsl` | `353.684 calc(1*82.609%) 18.039%` | CSS |
| `--red-730` | `hsl(353.913 calc(1*87.342%) 15.49%/1)` | CSS |
| `--red-730-hsl` | `353.913 calc(1*87.342%) 15.49%` | CSS |
| `--red-760` | `hsl(353.898 calc(1*93.651%) 12.353%/1)` | CSS |
| `--red-760-hsl` | `353.898 calc(1*93.651%) 12.353%` | CSS |
| `--red-800` | `hsl(353.333 calc(1*96.429%) 10.98%/1)` | CSS |
| `--red-800-hsl` | `353.333 calc(1*96.429%) 10.98%` | CSS |
| `--red-830` | `hsl(353.182 calc(1*100%) 8.627%/1)` | CSS |
| `--red-830-hsl` | `353.182 calc(1*100%) 8.627%` | CSS |
| `--red-860` | `hsl(353.846 calc(1*100%) 7.647%/1)` | CSS |
| `--red-860-hsl` | `353.846 calc(1*100%) 7.647%` | CSS |
| `--red-900` | `hsl(353.333 calc(1*100%) 5.294%/1)` | CSS |
| `--red-900-hsl` | `353.333 calc(1*100%) 5.294%` | CSS |
| `--red-new-1` | `hsl(1.818 calc(1*100%) 93.529%/1)` | CSS |
| `--red-new-1-hsl` | `1.818 calc(1*100%) 93.529%` | CSS |
| `--red-new-10` | `hsl(2.609 calc(1*100%) 86.471%/1)` | CSS |
| `--red-new-10-hsl` | `2.609 calc(1*100%) 86.471%` | CSS |
| `--red-new-100` | `hsl(345 calc(1*100%) 0.784%/1)` | CSS |
| `--red-new-100-hsl` | `345 calc(1*100%) 0.784%` | CSS |
| `--red-new-11` | `hsl(3.288 calc(1*100%) 85.686%/1)` | CSS |
| `--red-new-11-hsl` | `3.288 calc(1*100%) 85.686%` | CSS |
| `--red-new-12` | `hsl(3.117 calc(1*100%) 84.902%/1)` | CSS |
| `--red-new-12-hsl` | `3.117 calc(1*100%) 84.902%` | CSS |
| `--red-new-13` | `hsl(2.963 calc(1*100%) 84.118%/1)` | CSS |
| `--red-new-13-hsl` | `2.963 calc(1*100%) 84.118%` | CSS |
| `--red-new-14` | `hsl(3.529 calc(1*100%) 83.333%/1)` | CSS |
| `--red-new-14-hsl` | `3.529 calc(1*100%) 83.333%` | CSS |
| `--red-new-15` | `hsl(2.727 calc(1*100%) 82.745%/1)` | CSS |
| `--red-new-15-hsl` | `2.727 calc(1*100%) 82.745%` | CSS |
| `--red-new-16` | `hsl(3.261 calc(1*100%) 81.961%/1)` | CSS |
| `--red-new-16-hsl` | `3.261 calc(1*100%) 81.961%` | CSS |
| `--red-new-17` | `hsl(3.125 calc(1*100%) 81.176%/1)` | CSS |
| `--red-new-17-hsl` | `3.125 calc(1*100%) 81.176%` | CSS |
| `--red-new-18` | `hsl(2.424 calc(1*100%) 80.588%/1)` | CSS |
| `--red-new-18-hsl` | `2.424 calc(1*100%) 80.588%` | CSS |
| `--red-new-19` | `hsl(2.913 calc(1*100%) 79.804%/1)` | CSS |
| `--red-new-19-hsl` | `2.913 calc(1*100%) 79.804%` | CSS |
| `--red-new-2` | `hsl(1.622 calc(1*100%) 92.745%/1)` | CSS |
| `--red-new-2-hsl` | `1.622 calc(1*100%) 92.745%` | CSS |
| `--red-new-20` | `hsl(2.804 calc(1*100%) 79.02%/1)` | CSS |
| `--red-new-20-hsl` | `2.804 calc(1*100%) 79.02%` | CSS |
| `--red-new-21` | `hsl(2.752 calc(1*98.198%) 78.235%/1)` | CSS |
| `--red-new-21-hsl` | `2.752 calc(1*98.198%) 78.235%` | CSS |
| `--red-new-22` | `hsl(2.679 calc(1*96.552%) 77.255%/1)` | CSS |
| `--red-new-22-hsl` | `2.679 calc(1*96.552%) 77.255%` | CSS |
| `--red-new-23` | `hsl(2.632 calc(1*95%) 76.471%/1)` | CSS |
| `--red-new-23-hsl` | `2.632 calc(1*95%) 76.471%` | CSS |
| `--red-new-24` | `hsl(2.069 calc(1*93.548%) 75.686%/1)` | CSS |
| `--red-new-24-hsl` | `2.069 calc(1*93.548%) 75.686%` | CSS |
| `--red-new-25` | `hsl(2.521 calc(1*92.248%) 74.706%/1)` | CSS |
| `--red-new-25-hsl` | `2.521 calc(1*92.248%) 74.706%` | CSS |
| `--red-new-26` | `hsl(1.983 calc(1*90.977%) 73.922%/1)` | CSS |
| `--red-new-26-hsl` | `1.983 calc(1*90.977%) 73.922%` | CSS |
| `--red-new-27` | `hsl(2.419 calc(1*89.855%) 72.941%/1)` | CSS |
| `--red-new-27-hsl` | `2.419 calc(1*89.855%) 72.941%` | CSS |
| `--red-new-28` | `hsl(1.92 calc(1*87.413%) 71.961%/1)` | CSS |
| `--red-new-28-hsl` | `1.92 calc(1*87.413%) 71.961%` | CSS |
| `--red-new-29` | `hsl(1.417 calc(1*86.395%) 71.176%/1)` | CSS |
| `--red-new-29-hsl` | `1.417 calc(1*86.395%) 71.176%` | CSS |
| `--red-new-3` | `hsl(1.463 calc(1*100%) 91.961%/1)` | CSS |
| `--red-new-3-hsl` | `1.463 calc(1*100%) 91.961%` | CSS |
| `--red-new-30` | `hsl(1.846 calc(1*85.526%) 70.196%/1)` | CSS |
| `--red-new-30-hsl` | `1.846 calc(1*85.526%) 70.196%` | CSS |
| `--red-new-31` | `hsl(1.374 calc(1*83.439%) 69.216%/1)` | CSS |
| `--red-new-31-hsl` | `1.374 calc(1*83.439%) 69.216%` | CSS |
| `--red-new-32` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--red-new-32-hsl` | `1.353 calc(1*82.609%) 68.431%` | CSS |
| `--red-new-33` | `hsl(0.896 calc(1*80.723%) 67.451%/1)` | CSS |
| `--red-new-33-hsl` | `0.896 calc(1*80.723%) 67.451%` | CSS |
| `--red-new-34` | `hsl(0.882 calc(1*80%) 66.667%/1)` | CSS |
| `--red-new-34-hsl` | `0.882 calc(1*80%) 66.667%` | CSS |
| `--red-new-35` | `hsl(0.438 calc(1*78.286%) 65.686%/1)` | CSS |
| `--red-new-35-hsl` | `0.438 calc(1*78.286%) 65.686%` | CSS |
| `--red-new-36` | `hsl(0.863 calc(1*76.796%) 64.51%/1)` | CSS |
| `--red-new-36-hsl` | `0.863 calc(1*76.796%) 64.51%` | CSS |
| `--red-new-37` | `hsl(0.426 calc(1*76.216%) 63.725%/1)` | CSS |
| `--red-new-37-hsl` | `0.426 calc(1*76.216%) 63.725%` | CSS |
| `--red-new-38` | `hsl(0 calc(1*74.737%) 62.745%/1)` | CSS |
| `--red-new-38-hsl` | `0 calc(1*74.737%) 62.745%` | CSS |
| `--red-new-39` | `hsl(0 calc(1*73.333%) 61.765%/1)` | CSS |
| `--red-new-39-hsl` | `0 calc(1*73.333%) 61.765%` | CSS |
| `--red-new-4` | `hsl(2.609 calc(1*100%) 90.98%/1)` | CSS |
| `--red-new-4-hsl` | `2.609 calc(1*100%) 90.98%` | CSS |
| `--red-new-40` | `hsl(359.589 calc(1*73%) 60.784%/1)` | CSS |
| `--red-new-40-hsl` | `359.589 calc(1*73%) 60.784%` | CSS |
| `--red-new-41` | `hsl(359.189 calc(1*71.845%) 59.608%/1)` | CSS |
| `--red-new-41-hsl` | `359.189 calc(1*71.845%) 59.608%` | CSS |
| `--red-new-42` | `hsl(358.8 calc(1*70.755%) 58.431%/1)` | CSS |
| `--red-new-42-hsl` | `358.8 calc(1*70.755%) 58.431%` | CSS |
| `--red-new-43` | `hsl(358.421 calc(1*69.725%) 57.255%/1)` | CSS |
| `--red-new-43-hsl` | `358.421 calc(1*69.725%) 57.255%` | CSS |
| `--red-new-44` | `hsl(358.431 calc(1*68.61%) 56.275%/1)` | CSS |
| `--red-new-44-hsl` | `358.431 calc(1*68.61%) 56.275%` | CSS |
| `--red-new-45` | `hsl(357.692 calc(1*67.826%) 54.902%/1)` | CSS |
| `--red-new-45-hsl` | `357.692 calc(1*67.826%) 54.902%` | CSS |
| `--red-new-46` | `hsl(356.962 calc(1*66.949%) 53.725%/1)` | CSS |
| `--red-new-46-hsl` | `356.962 calc(1*66.949%) 53.725%` | CSS |
| `--red-new-47` | `hsl(356.625 calc(1*66.116%) 52.549%/1)` | CSS |
| `--red-new-47-hsl` | `356.625 calc(1*66.116%) 52.549%` | CSS |
| `--red-new-48` | `hsl(356.296 calc(1*65.323%) 51.373%/1)` | CSS |
| `--red-new-48-hsl` | `356.296 calc(1*65.323%) 51.373%` | CSS |
| `--red-new-49` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--red-new-49-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--red-new-5` | `hsl(3.6 calc(1*100%) 90.196%/1)` | CSS |
| `--red-new-5-hsl` | `3.6 calc(1*100%) 90.196%` | CSS |
| `--red-new-50` | `hsl(355.636 calc(1*64.706%) 50%/1)` | CSS |
| `--red-new-50-hsl` | `355.636 calc(1*64.706%) 50%` | CSS |
| `--red-new-51` | `hsl(355.556 calc(1*64.8%) 49.02%/1)` | CSS |
| `--red-new-51-hsl` | `355.556 calc(1*64.8%) 49.02%` | CSS |
| `--red-new-52` | `hsl(355.796 calc(1*64.082%) 48.039%/1)` | CSS |
| `--red-new-52-hsl` | `355.796 calc(1*64.082%) 48.039%` | CSS |
| `--red-new-53` | `hsl(355.714 calc(1*64.167%) 47.059%/1)` | CSS |
| `--red-new-53-hsl` | `355.714 calc(1*64.167%) 47.059%` | CSS |
| `--red-new-54` | `hsl(355.629 calc(1*64.255%) 46.078%/1)` | CSS |
| `--red-new-54-hsl` | `355.629 calc(1*64.255%) 46.078%` | CSS |
| `--red-new-55` | `hsl(355.51 calc(1*64.192%) 44.902%/1)` | CSS |
| `--red-new-55-hsl` | `355.51 calc(1*64.192%) 44.902%` | CSS |
| `--red-new-56` | `hsl(355.833 calc(1*64.286%) 43.922%/1)` | CSS |
| `--red-new-56-hsl` | `355.833 calc(1*64.286%) 43.922%` | CSS |
| `--red-new-57` | `hsl(356.143 calc(1*63.636%) 43.137%/1)` | CSS |
| `--red-new-57-hsl` | `356.143 calc(1*63.636%) 43.137%` | CSS |
| `--red-new-58` | `hsl(356.058 calc(1*63.721%) 42.157%/1)` | CSS |
| `--red-new-58-hsl` | `356.058 calc(1*63.721%) 42.157%` | CSS |
| `--red-new-59` | `hsl(355.97 calc(1*63.81%) 41.176%/1)` | CSS |
| `--red-new-59-hsl` | `355.97 calc(1*63.81%) 41.176%` | CSS |
| `--red-new-6` | `hsl(3.333 calc(1*100%) 89.412%/1)` | CSS |
| `--red-new-6-hsl` | `3.333 calc(1*100%) 89.412%` | CSS |
| `--red-new-60` | `hsl(355.909 calc(1*64.706%) 40%/1)` | CSS |
| `--red-new-60-hsl` | `355.909 calc(1*64.706%) 40%` | CSS |
| `--red-new-61` | `hsl(355.814 calc(1*64.824%) 39.02%/1)` | CSS |
| `--red-new-61-hsl` | `355.814 calc(1*64.824%) 39.02%` | CSS |
| `--red-new-62` | `hsl(355.714 calc(1*64.948%) 38.039%/1)` | CSS |
| `--red-new-62-hsl` | `355.714 calc(1*64.948%) 38.039%` | CSS |
| `--red-new-63` | `hsl(356.098 calc(1*65.079%) 37.059%/1)` | CSS |
| `--red-new-63-hsl` | `356.098 calc(1*65.079%) 37.059%` | CSS |
| `--red-new-64` | `hsl(356 calc(1*65.217%) 36.078%/1)` | CSS |
| `--red-new-64-hsl` | `356 calc(1*65.217%) 36.078%` | CSS |
| `--red-new-65` | `hsl(355.897 calc(1*65.363%) 35.098%/1)` | CSS |
| `--red-new-65-hsl` | `355.897 calc(1*65.363%) 35.098%` | CSS |
| `--red-new-66` | `hsl(356.348 calc(1*65.714%) 34.314%/1)` | CSS |
| `--red-new-66-hsl` | `356.348 calc(1*65.714%) 34.314%` | CSS |
| `--red-new-67` | `hsl(355.752 calc(1*66.864%) 33.137%/1)` | CSS |
| `--red-new-67-hsl` | `355.752 calc(1*66.864%) 33.137%` | CSS |
| `--red-new-68` | `hsl(355.636 calc(1*67.073%) 32.157%/1)` | CSS |
| `--red-new-68-hsl` | `355.636 calc(1*67.073%) 32.157%` | CSS |
| `--red-new-69` | `hsl(356.075 calc(1*67.296%) 31.176%/1)` | CSS |
| `--red-new-69-hsl` | `356.075 calc(1*67.296%) 31.176%` | CSS |
| `--red-new-7` | `hsl(3.103 calc(1*100%) 88.627%/1)` | CSS |
| `--red-new-7-hsl` | `3.103 calc(1*100%) 88.627%` | CSS |
| `--red-new-70` | `hsl(356 calc(1*67.742%) 30.392%/1)` | CSS |
| `--red-new-70-hsl` | `356 calc(1*67.742%) 30.392%` | CSS |
| `--red-new-71` | `hsl(355.34 calc(1*69.128%) 29.216%/1)` | CSS |
| `--red-new-71-hsl` | `355.34 calc(1*69.128%) 29.216%` | CSS |
| `--red-new-72` | `hsl(355.8 calc(1*69.444%) 28.235%/1)` | CSS |
| `--red-new-72-hsl` | `355.8 calc(1*69.444%) 28.235%` | CSS |
| `--red-new-73` | `hsl(355.714 calc(1*70%) 27.451%/1)` | CSS |
| `--red-new-73-hsl` | `355.714 calc(1*70%) 27.451%` | CSS |
| `--red-new-74` | `hsl(355 calc(1*71.642%) 26.275%/1)` | CSS |
| `--red-new-74-hsl` | `355 calc(1*71.642%) 26.275%` | CSS |
| `--red-new-75` | `hsl(355.532 calc(1*72.308%) 25.49%/1)` | CSS |
| `--red-new-75-hsl` | `355.532 calc(1*72.308%) 25.49%` | CSS |
| `--red-new-76` | `hsl(355.385 calc(1*72.8%) 24.51%/1)` | CSS |
| `--red-new-76-hsl` | `355.385 calc(1*72.8%) 24.51%` | CSS |
| `--red-new-77` | `hsl(354.667 calc(1*75%) 23.529%/1)` | CSS |
| `--red-new-77-hsl` | `354.667 calc(1*75%) 23.529%` | CSS |
| `--red-new-78` | `hsl(354.483 calc(1*75.652%) 22.549%/1)` | CSS |
| `--red-new-78-hsl` | `354.483 calc(1*75.652%) 22.549%` | CSS |
| `--red-new-79` | `hsl(355.059 calc(1*76.577%) 21.765%/1)` | CSS |
| `--red-new-79-hsl` | `355.059 calc(1*76.577%) 21.765%` | CSS |
| `--red-new-8` | `hsl(3.871 calc(1*100%) 87.843%/1)` | CSS |
| `--red-new-8-hsl` | `3.871 calc(1*100%) 87.843%` | CSS |
| `--red-new-80` | `hsl(354.217 calc(1*79.048%) 20.588%/1)` | CSS |
| `--red-new-80-hsl` | `354.217 calc(1*79.048%) 20.588%` | CSS |
| `--red-new-81` | `hsl(354.074 calc(1*80.198%) 19.804%/1)` | CSS |
| `--red-new-81-hsl` | `354.074 calc(1*80.198%) 19.804%` | CSS |
| `--red-new-82` | `hsl(353.924 calc(1*81.443%) 19.02%/1)` | CSS |
| `--red-new-82-hsl` | `353.924 calc(1*81.443%) 19.02%` | CSS |
| `--red-new-83` | `hsl(353.684 calc(1*82.609%) 18.039%/1)` | CSS |
| `--red-new-83-hsl` | `353.684 calc(1*82.609%) 18.039%` | CSS |
| `--red-new-84` | `hsl(353.6 calc(1*86.207%) 17.059%/1)` | CSS |
| `--red-new-84-hsl` | `353.6 calc(1*86.207%) 17.059%` | CSS |
| `--red-new-85` | `hsl(353.333 calc(1*87.805%) 16.078%/1)` | CSS |
| `--red-new-85-hsl` | `353.333 calc(1*87.805%) 16.078%` | CSS |
| `--red-new-86` | `hsl(353.913 calc(1*87.342%) 15.49%/1)` | CSS |
| `--red-new-86-hsl` | `353.913 calc(1*87.342%) 15.49%` | CSS |
| `--red-new-87` | `hsl(353.731 calc(1*89.333%) 14.706%/1)` | CSS |
| `--red-new-87-hsl` | `353.731 calc(1*89.333%) 14.706%` | CSS |
| `--red-new-88` | `hsl(353.538 calc(1*91.549%) 13.922%/1)` | CSS |
| `--red-new-88-hsl` | `353.538 calc(1*91.549%) 13.922%` | CSS |
| `--red-new-89` | `hsl(353.226 calc(1*93.939%) 12.941%/1)` | CSS |
| `--red-new-89-hsl` | `353.226 calc(1*93.939%) 12.941%` | CSS |
| `--red-new-9` | `hsl(3.636 calc(1*100%) 87.059%/1)` | CSS |
| `--red-new-9-hsl` | `3.636 calc(1*100%) 87.059%` | CSS |
| `--red-new-90` | `hsl(353.898 calc(1*93.651%) 12.353%/1)` | CSS |
| `--red-new-90-hsl` | `353.898 calc(1*93.651%) 12.353%` | CSS |
| `--red-new-91` | `hsl(353.684 calc(1*96.61%) 11.569%/1)` | CSS |
| `--red-new-91-hsl` | `353.684 calc(1*96.61%) 11.569%` | CSS |
| `--red-new-92` | `hsl(353.333 calc(1*96.429%) 10.98%/1)` | CSS |
| `--red-new-92-hsl` | `353.333 calc(1*96.429%) 10.98%` | CSS |
| `--red-new-93` | `hsl(352.941 calc(1*100%) 10%/1)` | CSS |
| `--red-new-93-hsl` | `352.941 calc(1*100%) 10%` | CSS |
| `--red-new-94` | `hsl(353.75 calc(1*100%) 9.412%/1)` | CSS |
| `--red-new-94-hsl` | `353.75 calc(1*100%) 9.412%` | CSS |
| `--red-new-95` | `hsl(353.182 calc(1*100%) 8.627%/1)` | CSS |
| `--red-new-95-hsl` | `353.182 calc(1*100%) 8.627%` | CSS |
| `--red-new-96` | `hsl(353.846 calc(1*100%) 7.647%/1)` | CSS |
| `--red-new-96-hsl` | `353.846 calc(1*100%) 7.647%` | CSS |
| `--red-new-97` | `hsl(354.706 calc(1*100%) 6.667%/1)` | CSS |
| `--red-new-97-hsl` | `354.706 calc(1*100%) 6.667%` | CSS |
| `--red-new-98` | `hsl(353.333 calc(1*100%) 5.294%/1)` | CSS |
| `--red-new-98-hsl` | `353.333 calc(1*100%) 5.294%` | CSS |
| `--red-new-99` | `hsl(353.333 calc(1*100%) 3.529%/1)` | CSS |
| `--red-new-99-hsl` | `353.333 calc(1*100%) 3.529%` | CSS |
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
| `RED_NEW_1` | `#ffdfde` | JS |
| `RED_NEW_10` | `#ffbdba` | JS |
| `RED_NEW_100` | `#040001` | JS |
| `RED_NEW_11` | `#ffbab6` | JS |
| `RED_NEW_12` | `#ffb6b2` | JS |
| `RED_NEW_13` | `#ffb2ae` | JS |
| `RED_NEW_14` | `#ffafaa` | JS |
| `RED_NEW_15` | `#ffaba7` | JS |
| `RED_NEW_16` | `#ffa8a3` | JS |
| `RED_NEW_17` | `#ffa49f` | JS |
| `RED_NEW_18` | `#ffa09c` | JS |
| `RED_NEW_19` | `#ff9d98` | JS |
| `RED_NEW_2` | `#ffdbda` | JS |
| `RED_NEW_20` | `#ff9994` | JS |
| `RED_NEW_21` | `#fe9691` | JS |
| `RED_NEW_22` | `#fd928d` | JS |
| `RED_NEW_23` | `#fc8f8a` | JS |
| `RED_NEW_24` | `#fb8b87` | JS |
| `RED_NEW_25` | `#fa8883` | JS |
| `RED_NEW_26` | `#f98480` | JS |
| `RED_NEW_27` | `#f8817c` | JS |
| `RED_NEW_28` | `#f67d79` | JS |
| `RED_NEW_29` | `#f57976` | JS |
| `RED_NEW_3` | `#ffd7d6` | JS |
| `RED_NEW_30` | `#f47672` | JS |
| `RED_NEW_31` | `#f2726f` | JS |
| `RED_NEW_32` | `#f16f6c` | JS |
| `RED_NEW_33` | `#ef6b69` | JS |
| `RED_NEW_34` | `#ee6866` | JS |
| `RED_NEW_35` | `#ec6463` | JS |
| `RED_NEW_36` | `#ea615f` | JS |
| `RED_NEW_37` | `#e95d5c` | JS |
| `RED_NEW_38` | `#e75959` | JS |
| `RED_NEW_39` | `#e55656` | JS |
| `RED_NEW_4` | `#ffd3d1` | JS |
| `RED_NEW_40` | `#e45253` | JS |
| `RED_NEW_41` | `#e24e50` | JS |
| `RED_NEW_42` | `#e04a4d` | JS |
| `RED_NEW_43` | `#de464a` | JS |
| `RED_NEW_44` | `#dc4347` | JS |
| `RED_NEW_45` | `#da3e44` | JS |
| `RED_NEW_46` | `#d83a42` | JS |
| `RED_NEW_47` | `#d6363f` | JS |
| `RED_NEW_48` | `#d4323c` | JS |
| `RED_NEW_49` | `#d22d39` | JS |
| `RED_NEW_5` | `#ffd0cd` | JS |
| `RED_NEW_50` | `#d22d39` | JS |
| `RED_NEW_51` | `#ce2c38` | JS |
| `RED_NEW_52` | `#c92c37` | JS |
| `RED_NEW_53` | `#c52b36` | JS |
| `RED_NEW_54` | `#c12a35` | JS |
| `RED_NEW_55` | `#bc2934` | JS |
| `RED_NEW_56` | `#b82832` | JS |
| `RED_NEW_57` | `#b42831` | JS |
| `RED_NEW_58` | `#b02730` | JS |
| `RED_NEW_59` | `#ac262f` | JS |
| `RED_NEW_6` | `#ffccc9` | JS |
| `RED_NEW_60` | `#a8242d` | JS |
| `RED_NEW_61` | `#a4232c` | JS |
| `RED_NEW_62` | `#a0222b` | JS |
| `RED_NEW_63` | `#9c2129` | JS |
| `RED_NEW_64` | `#982028` | JS |
| `RED_NEW_65` | `#941f27` | JS |
| `RED_NEW_66` | `#911e25` | JS |
| `RED_NEW_67` | `#8d1c24` | JS |
| `RED_NEW_68` | `#891b23` | JS |
| `RED_NEW_69` | `#851a21` | JS |
| `RED_NEW_7` | `#ffc8c5` | JS |
| `RED_NEW_70` | `#821920` | JS |
| `RED_NEW_71` | `#7e171f` | JS |
| `RED_NEW_72` | `#7a161d` | JS |
| `RED_NEW_73` | `#77151c` | JS |
| `RED_NEW_74` | `#73131b` | JS |
| `RED_NEW_75` | `#701219` | JS |
| `RED_NEW_76` | `#6c1118` | JS |
| `RED_NEW_77` | `#690f17` | JS |
| `RED_NEW_78` | `#650e16` | JS |
| `RED_NEW_79` | `#620d14` | JS |
| `RED_NEW_8` | `#ffc5c1` | JS |
| `RED_NEW_80` | `#5e0b13` | JS |
| `RED_NEW_81` | `#5b0a12` | JS |
| `RED_NEW_82` | `#580911` | JS |
| `RED_NEW_83` | `#540810` | JS |
| `RED_NEW_84` | `#51060e` | JS |
| `RED_NEW_85` | `#4d050d` | JS |
| `RED_NEW_86` | `#4a050c` | JS |
| `RED_NEW_87` | `#47040b` | JS |
| `RED_NEW_88` | `#44030a` | JS |
| `RED_NEW_89` | `#400209` | JS |
| `RED_NEW_9` | `#ffc1bd` | JS |
| `RED_NEW_90` | `#3d0208` | JS |
| `RED_NEW_91` | `#3a0107` | JS |
| `RED_NEW_92` | `#370107` | JS |
| `RED_NEW_93` | `#330006` | JS |
| `RED_NEW_94` | `#300005` | JS |
| `RED_NEW_95` | `#2c0005` | JS |
| `RED_NEW_96` | `#270004` | JS |
| `RED_NEW_97` | `#220003` | JS |
| `RED_NEW_98` | `#1b0003` | JS |
| `RED_NEW_99` | `#120002` | JS |

*Total: 465 variables*

---

## Colors - Yellow

| Variable | Value | Type |
|----------|-------|------|
| `--chip-yellow-dark-text` | `hsl(27.907 calc(1*100%) 91.569%/1)` | CSS |
| `--chip-yellow-light-text` | `hsl(15 calc(1*100%) 9.412%/1)` | CSS |
| `--chip-yellow-medium-text` | `hsl(6.486 calc(1*100%) 7.255%/1)` | CSS |
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
| `--opacity-yellow-1` | `hsl(36.894 calc(1*100%) 31.569%/0.0196078431372...` | CSS |
| `--opacity-yellow-1-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-12` | `hsl(36.894 calc(1*100%) 31.569%/0.1215686274509...` | CSS |
| `--opacity-yellow-12-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-16` | `hsl(36.894 calc(1*100%) 31.569%/0.1607843137254...` | CSS |
| `--opacity-yellow-16-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-20` | `hsl(36.894 calc(1*100%) 31.569%/0.2)` | CSS |
| `--opacity-yellow-20-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-24` | `hsl(36.894 calc(1*100%) 31.569%/0.2392156862745...` | CSS |
| `--opacity-yellow-24-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-28` | `hsl(36.894 calc(1*100%) 31.569%/0.2784313725490...` | CSS |
| `--opacity-yellow-28-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-32` | `hsl(36.894 calc(1*100%) 31.569%/0.3215686274509...` | CSS |
| `--opacity-yellow-32-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-36` | `hsl(36.894 calc(1*100%) 31.569%/0.3607843137254...` | CSS |
| `--opacity-yellow-36-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-4` | `hsl(36.894 calc(1*100%) 31.569%/0.0392156862745...` | CSS |
| `--opacity-yellow-4-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-40` | `hsl(36.894 calc(1*100%) 31.569%/0.4)` | CSS |
| `--opacity-yellow-40-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-44` | `hsl(36.894 calc(1*100%) 31.569%/0.4392156862745...` | CSS |
| `--opacity-yellow-44-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-48` | `hsl(36.894 calc(1*100%) 31.569%/0.4784313725490...` | CSS |
| `--opacity-yellow-48-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-52` | `hsl(36.894 calc(1*100%) 31.569%/0.5215686274509...` | CSS |
| `--opacity-yellow-52-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-56` | `hsl(36.894 calc(1*100%) 31.569%/0.5607843137254...` | CSS |
| `--opacity-yellow-56-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-60` | `hsl(36.894 calc(1*100%) 31.569%/0.6)` | CSS |
| `--opacity-yellow-60-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-64` | `hsl(36.894 calc(1*100%) 31.569%/0.6392156862745...` | CSS |
| `--opacity-yellow-64-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-68` | `hsl(36.894 calc(1*100%) 31.569%/0.6784313725490...` | CSS |
| `--opacity-yellow-68-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-72` | `hsl(36.894 calc(1*100%) 31.569%/0.7215686274509...` | CSS |
| `--opacity-yellow-72-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-76` | `hsl(36.894 calc(1*100%) 31.569%/0.7607843137254...` | CSS |
| `--opacity-yellow-76-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-8` | `hsl(36.894 calc(1*100%) 31.569%/0.0784313725490...` | CSS |
| `--opacity-yellow-8-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-80` | `hsl(36.894 calc(1*100%) 31.569%/0.8)` | CSS |
| `--opacity-yellow-80-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-84` | `hsl(36.894 calc(1*100%) 31.569%/0.8392156862745...` | CSS |
| `--opacity-yellow-84-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-88` | `hsl(36.894 calc(1*100%) 31.569%/0.8784313725490...` | CSS |
| `--opacity-yellow-88-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-92` | `hsl(36.894 calc(1*100%) 31.569%/0.9215686274509...` | CSS |
| `--opacity-yellow-92-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--opacity-yellow-96` | `hsl(36.894 calc(1*100%) 31.569%/0.9607843137254...` | CSS |
| `--opacity-yellow-96-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--role-yellow-hsl` | `48.053 calc(1*88.976%) 50.196%` | CSS |
| `--yellow-100` | `hsl(27.907 calc(1*100%) 91.569%/1)` | CSS |
| `--yellow-100-hsl` | `27.907 calc(1*100%) 91.569%` | CSS |
| `--yellow-130` | `hsl(27.907 calc(1*100%) 91.569%/1)` | CSS |
| `--yellow-130-hsl` | `27.907 calc(1*100%) 91.569%` | CSS |
| `--yellow-160` | `hsl(27.907 calc(1*100%) 91.569%/1)` | CSS |
| `--yellow-160-hsl` | `27.907 calc(1*100%) 91.569%` | CSS |
| `--yellow-200` | `hsl(30.492 calc(1*81.333%) 85.294%/1)` | CSS |
| `--yellow-200-hsl` | `30.492 calc(1*81.333%) 85.294%` | CSS |
| `--yellow-230` | `hsl(32.593 calc(1*66.942%) 76.275%/1)` | CSS |
| `--yellow-230-hsl` | `32.593 calc(1*66.942%) 76.275%` | CSS |
| `--yellow-260` | `hsl(33.396 calc(1*56.383%) 63.137%/1)` | CSS |
| `--yellow-260-hsl` | `33.396 calc(1*56.383%) 63.137%` | CSS |
| `--yellow-300` | `hsl(33.684 calc(1*53.774%) 58.431%/1)` | CSS |
| `--yellow-300-hsl` | `33.684 calc(1*53.774%) 58.431%` | CSS |
| `--yellow-330` | `hsl(33.559 calc(1*52.679%) 56.078%/1)` | CSS |
| `--yellow-330-hsl` | `33.559 calc(1*52.679%) 56.078%` | CSS |
| `--yellow-345` | `hsl(33.871 calc(1*50%) 51.373%/1)` | CSS |
| `--yellow-345-hsl` | `33.871 calc(1*50%) 51.373%` | CSS |
| `--yellow-360` | `hsl(34.286 calc(1*57.082%) 45.686%/1)` | CSS |
| `--yellow-360-hsl` | `34.286 calc(1*57.082%) 45.686%` | CSS |
| `--yellow-400` | `hsl(34.714 calc(1*67.308%) 40.784%/1)` | CSS |
| `--yellow-400-hsl` | `34.714 calc(1*67.308%) 40.784%` | CSS |
| `--yellow-430` | `hsl(36.538 calc(1*91.765%) 33.333%/1)` | CSS |
| `--yellow-430-hsl` | `36.538 calc(1*91.765%) 33.333%` | CSS |
| `--yellow-460` | `hsl(35.474 calc(1*95.804%) 28.039%/1)` | CSS |
| `--yellow-460-hsl` | `35.474 calc(1*95.804%) 28.039%` | CSS |
| `--yellow-500` | `hsl(34.961 calc(1*98.45%) 25.294%/1)` | CSS |
| `--yellow-500-hsl` | `34.961 calc(1*98.45%) 25.294%` | CSS |
| `--yellow-530` | `hsl(33.684 calc(1*100%) 22.353%/1)` | CSS |
| `--yellow-530-hsl` | `33.684 calc(1*100%) 22.353%` | CSS |
| `--yellow-560` | `hsl(32.079 calc(1*100%) 19.804%/1)` | CSS |
| `--yellow-560-hsl` | `32.079 calc(1*100%) 19.804%` | CSS |
| `--yellow-600` | `hsl(30.968 calc(1*100%) 18.235%/1)` | CSS |
| `--yellow-600-hsl` | `30.968 calc(1*100%) 18.235%` | CSS |
| `--yellow-630` | `hsl(29.647 calc(1*100%) 16.667%/1)` | CSS |
| `--yellow-630-hsl` | `29.647 calc(1*100%) 16.667%` | CSS |
| `--yellow-660` | `hsl(27.75 calc(1*100%) 15.686%/1)` | CSS |
| `--yellow-660-hsl` | `27.75 calc(1*100%) 15.686%` | CSS |
| `--yellow-700` | `hsl(24.857 calc(1*100%) 13.725%/1)` | CSS |
| `--yellow-700-hsl` | `24.857 calc(1*100%) 13.725%` | CSS |
| `--yellow-730` | `hsl(23.077 calc(1*100%) 12.745%/1)` | CSS |
| `--yellow-730-hsl` | `23.077 calc(1*100%) 12.745%` | CSS |
| `--yellow-760` | `hsl(20.69 calc(1*100%) 11.373%/1)` | CSS |
| `--yellow-760-hsl` | `20.69 calc(1*100%) 11.373%` | CSS |
| `--yellow-800` | `hsl(18.113 calc(1*100%) 10.392%/1)` | CSS |
| `--yellow-800-hsl` | `18.113 calc(1*100%) 10.392%` | CSS |
| `--yellow-830` | `hsl(15 calc(1*100%) 9.412%/1)` | CSS |
| `--yellow-830-hsl` | `15 calc(1*100%) 9.412%` | CSS |
| `--yellow-860` | `hsl(11.163 calc(1*100%) 8.431%/1)` | CSS |
| `--yellow-860-hsl` | `11.163 calc(1*100%) 8.431%` | CSS |
| `--yellow-900` | `hsl(9 calc(1*100%) 7.843%/1)` | CSS |
| `--yellow-900-hsl` | `9 calc(1*100%) 7.843%` | CSS |
| `--yellow-new-1` | `hsl(27.907 calc(1*100%) 91.569%/1)` | CSS |
| `--yellow-new-1-hsl` | `27.907 calc(1*100%) 91.569%` | CSS |
| `--yellow-new-10` | `hsl(31.233 calc(1*72.277%) 80.196%/1)` | CSS |
| `--yellow-new-10-hsl` | `31.233 calc(1*72.277%) 80.196%` | CSS |
| `--yellow-new-100` | `hsl(0 calc(1*100%) 2.745%/1)` | CSS |
| `--yellow-new-100-hsl` | `0 calc(1*100%) 2.745%` | CSS |
| `--yellow-new-11` | `hsl(31.579 calc(1*70.37%) 78.824%/1)` | CSS |
| `--yellow-new-11-hsl` | `31.579 calc(1*70.37%) 78.824%` | CSS |
| `--yellow-new-12` | `hsl(32.308 calc(1*68.421%) 77.647%/1)` | CSS |
| `--yellow-new-12-hsl` | `32.308 calc(1*68.421%) 77.647%` | CSS |
| `--yellow-new-13` | `hsl(32.593 calc(1*66.942%) 76.275%/1)` | CSS |
| `--yellow-new-13-hsl` | `32.593 calc(1*66.942%) 76.275%` | CSS |
| `--yellow-new-14` | `hsl(32.53 calc(1*65.354%) 75.098%/1)` | CSS |
| `--yellow-new-14-hsl` | `32.53 calc(1*65.354%) 75.098%` | CSS |
| `--yellow-new-15` | `hsl(32.471 calc(1*63.91%) 73.922%/1)` | CSS |
| `--yellow-new-15-hsl` | `32.471 calc(1*63.91%) 73.922%` | CSS |
| `--yellow-new-16` | `hsl(32.36 calc(1*64.029%) 72.745%/1)` | CSS |
| `--yellow-new-16-hsl` | `32.36 calc(1*64.029%) 72.745%` | CSS |
| `--yellow-new-17` | `hsl(32.308 calc(1*62.759%) 71.569%/1)` | CSS |
| `--yellow-new-17-hsl` | `32.308 calc(1*62.759%) 71.569%` | CSS |
| `--yellow-new-18` | `hsl(32.258 calc(1*61.589%) 70.392%/1)` | CSS |
| `--yellow-new-18-hsl` | `32.258 calc(1*61.589%) 70.392%` | CSS |
| `--yellow-new-19` | `hsl(33.125 calc(1*60.759%) 69.02%/1)` | CSS |
| `--yellow-new-19-hsl` | `33.125 calc(1*60.759%) 69.02%` | CSS |
| `--yellow-new-2` | `hsl(27.5 calc(1*100%) 90.588%/1)` | CSS |
| `--yellow-new-2-hsl` | `27.5 calc(1*100%) 90.588%` | CSS |
| `--yellow-new-20` | `hsl(33.061 calc(1*59.756%) 67.843%/1)` | CSS |
| `--yellow-new-20-hsl` | `33.061 calc(1*59.756%) 67.843%` | CSS |
| `--yellow-new-21` | `hsl(33 calc(1*58.824%) 66.667%/1)` | CSS |
| `--yellow-new-21-hsl` | `33 calc(1*58.824%) 66.667%` | CSS |
| `--yellow-new-22` | `hsl(32.941 calc(1*57.955%) 65.49%/1)` | CSS |
| `--yellow-new-22-hsl` | `32.941 calc(1*57.955%) 65.49%` | CSS |
| `--yellow-new-23` | `hsl(32.885 calc(1*57.143%) 64.314%/1)` | CSS |
| `--yellow-new-23-hsl` | `32.885 calc(1*57.143%) 64.314%` | CSS |
| `--yellow-new-24` | `hsl(33.396 calc(1*56.383%) 63.137%/1)` | CSS |
| `--yellow-new-24-hsl` | `33.396 calc(1*56.383%) 63.137%` | CSS |
| `--yellow-new-25` | `hsl(33.333 calc(1*55.67%) 61.961%/1)` | CSS |
| `--yellow-new-25-hsl` | `33.333 calc(1*55.67%) 61.961%` | CSS |
| `--yellow-new-26` | `hsl(33.273 calc(1*55%) 60.784%/1)` | CSS |
| `--yellow-new-26-hsl` | `33.273 calc(1*55%) 60.784%` | CSS |
| `--yellow-new-27` | `hsl(33.214 calc(1*54.369%) 59.608%/1)` | CSS |
| `--yellow-new-27-hsl` | `33.214 calc(1*54.369%) 59.608%` | CSS |
| `--yellow-new-28` | `hsl(33.684 calc(1*53.774%) 58.431%/1)` | CSS |
| `--yellow-new-28-hsl` | `33.684 calc(1*53.774%) 58.431%` | CSS |
| `--yellow-new-29` | `hsl(33.621 calc(1*53.211%) 57.255%/1)` | CSS |
| `--yellow-new-29-hsl` | `33.621 calc(1*53.211%) 57.255%` | CSS |
| `--yellow-new-3` | `hsl(28.235 calc(1*92.727%) 89.216%/1)` | CSS |
| `--yellow-new-3-hsl` | `28.235 calc(1*92.727%) 89.216%` | CSS |
| `--yellow-new-30` | `hsl(33.559 calc(1*52.679%) 56.078%/1)` | CSS |
| `--yellow-new-30-hsl` | `33.559 calc(1*52.679%) 56.078%` | CSS |
| `--yellow-new-31` | `hsl(33.277 calc(1*51.965%) 55.098%/1)` | CSS |
| `--yellow-new-31-hsl` | `33.277 calc(1*51.965%) 55.098%` | CSS |
| `--yellow-new-32` | `hsl(34 calc(1*50.847%) 53.725%/1)` | CSS |
| `--yellow-new-32-hsl` | `34 calc(1*50.847%) 53.725%` | CSS |
| `--yellow-new-33` | `hsl(33.934 calc(1*50.413%) 52.549%/1)` | CSS |
| `--yellow-new-33-hsl` | `33.934 calc(1*50.413%) 52.549%` | CSS |
| `--yellow-new-34` | `hsl(33.871 calc(1*50%) 51.373%/1)` | CSS |
| `--yellow-new-34-hsl` | `33.871 calc(1*50%) 51.373%` | CSS |
| `--yellow-new-35` | `hsl(33.81 calc(1*49.606%) 50.196%/1)` | CSS |
| `--yellow-new-35-hsl` | `33.81 calc(1*49.606%) 50.196%` | CSS |
| `--yellow-new-36` | `hsl(34.016 calc(1*50.598%) 49.216%/1)` | CSS |
| `--yellow-new-36-hsl` | `34.016 calc(1*50.598%) 49.216%` | CSS |
| `--yellow-new-37` | `hsl(33.953 calc(1*52.653%) 48.039%/1)` | CSS |
| `--yellow-new-37-hsl` | `33.953 calc(1*52.653%) 48.039%` | CSS |
| `--yellow-new-38` | `hsl(33.893 calc(1*54.812%) 46.863%/1)` | CSS |
| `--yellow-new-38-hsl` | `33.893 calc(1*54.812%) 46.863%` | CSS |
| `--yellow-new-39` | `hsl(34.286 calc(1*57.082%) 45.686%/1)` | CSS |
| `--yellow-new-39-hsl` | `34.286 calc(1*57.082%) 45.686%` | CSS |
| `--yellow-new-4` | `hsl(28.364 calc(1*90.164%) 88.039%/1)` | CSS |
| `--yellow-new-4-hsl` | `28.364 calc(1*90.164%) 88.039%` | CSS |
| `--yellow-new-40` | `hsl(34.222 calc(1*59.471%) 44.51%/1)` | CSS |
| `--yellow-new-40-hsl` | `34.222 calc(1*59.471%) 44.51%` | CSS |
| `--yellow-new-41` | `hsl(34.412 calc(1*61.818%) 43.137%/1)` | CSS |
| `--yellow-new-41-hsl` | `34.412 calc(1*61.818%) 43.137%` | CSS |
| `--yellow-new-42` | `hsl(34.783 calc(1*64.486%) 41.961%/1)` | CSS |
| `--yellow-new-42-hsl` | `34.783 calc(1*64.486%) 41.961%` | CSS |
| `--yellow-new-43` | `hsl(34.714 calc(1*67.308%) 40.784%/1)` | CSS |
| `--yellow-new-43-hsl` | `34.714 calc(1*67.308%) 40.784%` | CSS |
| `--yellow-new-44` | `hsl(34.648 calc(1*70.297%) 39.608%/1)` | CSS |
| `--yellow-new-44-hsl` | `34.648 calc(1*70.297%) 39.608%` | CSS |
| `--yellow-new-45` | `hsl(35.172 calc(1*74.359%) 38.235%/1)` | CSS |
| `--yellow-new-45-hsl` | `35.172 calc(1*74.359%) 38.235%` | CSS |
| `--yellow-new-46` | `hsl(35.27 calc(1*78.723%) 36.863%/1)` | CSS |
| `--yellow-new-46-hsl` | `35.27 calc(1*78.723%) 36.863%` | CSS |
| `--yellow-new-47` | `hsl(35.762 calc(1*84.358%) 35.098%/1)` | CSS |
| `--yellow-new-47-hsl` | `35.762 calc(1*84.358%) 35.098%` | CSS |
| `--yellow-new-48` | `hsl(36.538 calc(1*91.765%) 33.333%/1)` | CSS |
| `--yellow-new-48-hsl` | `36.538 calc(1*91.765%) 33.333%` | CSS |
| `--yellow-new-49` | `hsl(36.894 calc(1*100%) 31.569%/1)` | CSS |
| `--yellow-new-49-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--yellow-new-5` | `hsl(30 calc(1*85.294%) 86.667%/1)` | CSS |
| `--yellow-new-5-hsl` | `30 calc(1*85.294%) 86.667%` | CSS |
| `--yellow-new-50` | `hsl(36.894 calc(1*100%) 31.569%/1)` | CSS |
| `--yellow-new-50-hsl` | `36.894 calc(1*100%) 31.569%` | CSS |
| `--yellow-new-51` | `hsl(36.688 calc(1*98.742%) 31.176%/1)` | CSS |
| `--yellow-new-51-hsl` | `36.688 calc(1*98.742%) 31.176%` | CSS |
| `--yellow-new-52` | `hsl(36.471 calc(1*97.452%) 30.784%/1)` | CSS |
| `--yellow-new-52-hsl` | `36.471 calc(1*97.452%) 30.784%` | CSS |
| `--yellow-new-53` | `hsl(36 calc(1*97.403%) 30.196%/1)` | CSS |
| `--yellow-new-53-hsl` | `36 calc(1*97.403%) 30.196%` | CSS |
| `--yellow-new-54` | `hsl(35.753 calc(1*96.053%) 29.804%/1)` | CSS |
| `--yellow-new-54-hsl` | `35.753 calc(1*96.053%) 29.804%` | CSS |
| `--yellow-new-55` | `hsl(35.664 calc(1*95.973%) 29.216%/1)` | CSS |
| `--yellow-new-55-hsl` | `35.664 calc(1*95.973%) 29.216%` | CSS |
| `--yellow-new-56` | `hsl(35.571 calc(1*95.89%) 28.627%/1)` | CSS |
| `--yellow-new-56-hsl` | `35.571 calc(1*95.89%) 28.627%` | CSS |
| `--yellow-new-57` | `hsl(35.474 calc(1*95.804%) 28.039%/1)` | CSS |
| `--yellow-new-57-hsl` | `35.474 calc(1*95.804%) 28.039%` | CSS |
| `--yellow-new-58` | `hsl(35.373 calc(1*95.714%) 27.451%/1)` | CSS |
| `--yellow-new-58-hsl` | `35.373 calc(1*95.714%) 27.451%` | CSS |
| `--yellow-new-59` | `hsl(35 calc(1*97.059%) 26.667%/1)` | CSS |
| `--yellow-new-59-hsl` | `35 calc(1*97.059%) 26.667%` | CSS |
| `--yellow-new-6` | `hsl(30.492 calc(1*81.333%) 85.294%/1)` | CSS |
| `--yellow-new-6-hsl` | `30.492 calc(1*81.333%) 85.294%` | CSS |
| `--yellow-new-60` | `hsl(34.884 calc(1*96.992%) 26.078%/1)` | CSS |
| `--yellow-new-60-hsl` | `34.884 calc(1*96.992%) 26.078%` | CSS |
| `--yellow-new-61` | `hsl(34.961 calc(1*98.45%) 25.294%/1)` | CSS |
| `--yellow-new-61-hsl` | `34.961 calc(1*98.45%) 25.294%` | CSS |
| `--yellow-new-62` | `hsl(34.56 calc(1*98.425%) 24.902%/1)` | CSS |
| `--yellow-new-62-hsl` | `34.56 calc(1*98.425%) 24.902%` | CSS |
| `--yellow-new-63` | `hsl(34.634 calc(1*100%) 24.118%/1)` | CSS |
| `--yellow-new-63-hsl` | `34.634 calc(1*100%) 24.118%` | CSS |
| `--yellow-new-64` | `hsl(34.5 calc(1*100%) 23.529%/1)` | CSS |
| `--yellow-new-64-hsl` | `34.5 calc(1*100%) 23.529%` | CSS |
| `--yellow-new-65` | `hsl(34.359 calc(1*100%) 22.941%/1)` | CSS |
| `--yellow-new-65-hsl` | `34.359 calc(1*100%) 22.941%` | CSS |
| `--yellow-new-66` | `hsl(33.684 calc(1*100%) 22.353%/1)` | CSS |
| `--yellow-new-66-hsl` | `33.684 calc(1*100%) 22.353%` | CSS |
| `--yellow-new-67` | `hsl(33.214 calc(1*100%) 21.961%/1)` | CSS |
| `--yellow-new-67-hsl` | `33.214 calc(1*100%) 21.961%` | CSS |
| `--yellow-new-68` | `hsl(33.028 calc(1*100%) 21.373%/1)` | CSS |
| `--yellow-new-68-hsl` | `33.028 calc(1*100%) 21.373%` | CSS |
| `--yellow-new-69` | `hsl(32.83 calc(1*100%) 20.784%/1)` | CSS |
| `--yellow-new-69-hsl` | `32.83 calc(1*100%) 20.784%` | CSS |
| `--yellow-new-7` | `hsl(30.938 calc(1*78.049%) 83.922%/1)` | CSS |
| `--yellow-new-7-hsl` | `30.938 calc(1*78.049%) 83.922%` | CSS |
| `--yellow-new-70` | `hsl(32.308 calc(1*100%) 20.392%/1)` | CSS |
| `--yellow-new-70-hsl` | `32.308 calc(1*100%) 20.392%` | CSS |
| `--yellow-new-71` | `hsl(32.079 calc(1*100%) 19.804%/1)` | CSS |
| `--yellow-new-71-hsl` | `32.079 calc(1*100%) 19.804%` | CSS |
| `--yellow-new-72` | `hsl(31.837 calc(1*100%) 19.216%/1)` | CSS |
| `--yellow-new-72-hsl` | `31.837 calc(1*100%) 19.216%` | CSS |
| `--yellow-new-73` | `hsl(31.25 calc(1*100%) 18.824%/1)` | CSS |
| `--yellow-new-73-hsl` | `31.25 calc(1*100%) 18.824%` | CSS |
| `--yellow-new-74` | `hsl(30.968 calc(1*100%) 18.235%/1)` | CSS |
| `--yellow-new-74-hsl` | `30.968 calc(1*100%) 18.235%` | CSS |
| `--yellow-new-75` | `hsl(30.33 calc(1*100%) 17.843%/1)` | CSS |
| `--yellow-new-75-hsl` | `30.33 calc(1*100%) 17.843%` | CSS |
| `--yellow-new-76` | `hsl(30 calc(1*100%) 17.255%/1)` | CSS |
| `--yellow-new-76-hsl` | `30 calc(1*100%) 17.255%` | CSS |
| `--yellow-new-77` | `hsl(29.647 calc(1*100%) 16.667%/1)` | CSS |
| `--yellow-new-77-hsl` | `29.647 calc(1*100%) 16.667%` | CSS |
| `--yellow-new-78` | `hsl(28.193 calc(1*100%) 16.275%/1)` | CSS |
| `--yellow-new-78-hsl` | `28.193 calc(1*100%) 16.275%` | CSS |
| `--yellow-new-79` | `hsl(27.75 calc(1*100%) 15.686%/1)` | CSS |
| `--yellow-new-79-hsl` | `27.75 calc(1*100%) 15.686%` | CSS |
| `--yellow-new-8` | `hsl(30.909 calc(1*75%) 82.745%/1)` | CSS |
| `--yellow-new-8-hsl` | `30.909 calc(1*75%) 82.745%` | CSS |
| `--yellow-new-80` | `hsl(26.923 calc(1*100%) 15.294%/1)` | CSS |
| `--yellow-new-80-hsl` | `26.923 calc(1*100%) 15.294%` | CSS |
| `--yellow-new-81` | `hsl(26.4 calc(1*100%) 14.706%/1)` | CSS |
| `--yellow-new-81-hsl` | `26.4 calc(1*100%) 14.706%` | CSS |
| `--yellow-new-82` | `hsl(25.479 calc(1*100%) 14.314%/1)` | CSS |
| `--yellow-new-82-hsl` | `25.479 calc(1*100%) 14.314%` | CSS |
| `--yellow-new-83` | `hsl(24.857 calc(1*100%) 13.725%/1)` | CSS |
| `--yellow-new-83-hsl` | `24.857 calc(1*100%) 13.725%` | CSS |
| `--yellow-new-84` | `hsl(23.824 calc(1*100%) 13.333%/1)` | CSS |
| `--yellow-new-84-hsl` | `23.824 calc(1*100%) 13.333%` | CSS |
| `--yellow-new-85` | `hsl(23.077 calc(1*100%) 12.745%/1)` | CSS |
| `--yellow-new-85-hsl` | `23.077 calc(1*100%) 12.745%` | CSS |
| `--yellow-new-86` | `hsl(21.905 calc(1*100%) 12.353%/1)` | CSS |
| `--yellow-new-86-hsl` | `21.905 calc(1*100%) 12.353%` | CSS |
| `--yellow-new-87` | `hsl(21 calc(1*100%) 11.765%/1)` | CSS |
| `--yellow-new-87-hsl` | `21 calc(1*100%) 11.765%` | CSS |
| `--yellow-new-88` | `hsl(20.69 calc(1*100%) 11.373%/1)` | CSS |
| `--yellow-new-88-hsl` | `20.69 calc(1*100%) 11.373%` | CSS |
| `--yellow-new-89` | `hsl(19.286 calc(1*100%) 10.98%/1)` | CSS |
| `--yellow-new-89-hsl` | `19.286 calc(1*100%) 10.98%` | CSS |
| `--yellow-new-9` | `hsl(30.857 calc(1*74.468%) 81.569%/1)` | CSS |
| `--yellow-new-9-hsl` | `30.857 calc(1*74.468%) 81.569%` | CSS |
| `--yellow-new-90` | `hsl(18.113 calc(1*100%) 10.392%/1)` | CSS |
| `--yellow-new-90-hsl` | `18.113 calc(1*100%) 10.392%` | CSS |
| `--yellow-new-91` | `hsl(16.471 calc(1*100%) 10%/1)` | CSS |
| `--yellow-new-91-hsl` | `16.471 calc(1*100%) 10%` | CSS |
| `--yellow-new-92` | `hsl(15 calc(1*100%) 9.412%/1)` | CSS |
| `--yellow-new-92-hsl` | `15 calc(1*100%) 9.412%` | CSS |
| `--yellow-new-93` | `hsl(13.043 calc(1*100%) 9.02%/1)` | CSS |
| `--yellow-new-93-hsl` | `13.043 calc(1*100%) 9.02%` | CSS |
| `--yellow-new-94` | `hsl(11.163 calc(1*100%) 8.431%/1)` | CSS |
| `--yellow-new-94-hsl` | `11.163 calc(1*100%) 8.431%` | CSS |
| `--yellow-new-95` | `hsl(9 calc(1*100%) 7.843%/1)` | CSS |
| `--yellow-new-95-hsl` | `9 calc(1*100%) 7.843%` | CSS |
| `--yellow-new-96` | `hsl(6.486 calc(1*100%) 7.255%/1)` | CSS |
| `--yellow-new-96-hsl` | `6.486 calc(1*100%) 7.255%` | CSS |
| `--yellow-new-97` | `hsl(3.636 calc(1*100%) 6.471%/1)` | CSS |
| `--yellow-new-97-hsl` | `3.636 calc(1*100%) 6.471%` | CSS |
| `--yellow-new-98` | `hsl(2.069 calc(1*100%) 5.686%/1)` | CSS |
| `--yellow-new-98-hsl` | `2.069 calc(1*100%) 5.686%` | CSS |
| `--yellow-new-99` | `hsl(0 calc(1*100%) 4.51%/1)` | CSS |
| `--yellow-new-99-hsl` | `0 calc(1*100%) 4.51%` | CSS |
| `ILLO_YELLOW_10` | `#fff4bd` | JS |
| `ILLO_YELLOW_20` | `#ffed96` | JS |
| `ILLO_YELLOW_30` | `#ffe76e` | JS |
| `ILLO_YELLOW_40` | `#ffe047` | JS |
| `ILLO_YELLOW_50` | `#f3ba2f` | JS |
| `ILLO_YELLOW_60` | `#e79418` | JS |
| `ILLO_YELLOW_70` | `#db6e00` | JS |
| `OPACITY_YELLOW_1` | `#a1630005` | JS |
| `OPACITY_YELLOW_12` | `#a163001f` | JS |
| `OPACITY_YELLOW_16` | `#a1630029` | JS |
| `OPACITY_YELLOW_20` | `#a1630033` | JS |
| `OPACITY_YELLOW_24` | `#a163003d` | JS |
| `OPACITY_YELLOW_28` | `#a1630047` | JS |
| `OPACITY_YELLOW_32` | `#a1630052` | JS |
| `OPACITY_YELLOW_36` | `#a163005c` | JS |
| `OPACITY_YELLOW_4` | `#a163000a` | JS |
| `OPACITY_YELLOW_40` | `#a1630066` | JS |
| `OPACITY_YELLOW_44` | `#a1630070` | JS |
| `OPACITY_YELLOW_48` | `#a163007a` | JS |
| `OPACITY_YELLOW_52` | `#a1630085` | JS |
| `OPACITY_YELLOW_56` | `#a163008f` | JS |
| `OPACITY_YELLOW_60` | `#a1630099` | JS |
| `OPACITY_YELLOW_64` | `#a16300a3` | JS |
| `OPACITY_YELLOW_68` | `#a16300ad` | JS |
| `OPACITY_YELLOW_72` | `#a16300b8` | JS |
| `OPACITY_YELLOW_76` | `#a16300c2` | JS |
| `OPACITY_YELLOW_8` | `#a1630014` | JS |
| `OPACITY_YELLOW_80` | `#a16300cc` | JS |
| `OPACITY_YELLOW_84` | `#a16300d6` | JS |
| `OPACITY_YELLOW_88` | `#a16300e0` | JS |
| `OPACITY_YELLOW_92` | `#a16300eb` | JS |
| `OPACITY_YELLOW_96` | `#a16300f5` | JS |
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
| `YELLOW_NEW_1` | `#ffe8d4` | JS |
| `YELLOW_NEW_10` | `#f1cea8` | JS |
| `YELLOW_NEW_100` | `#0e0000` | JS |
| `YELLOW_NEW_11` | `#efcba3` | JS |
| `YELLOW_NEW_12` | `#edc99f` | JS |
| `YELLOW_NEW_13` | `#ebc69a` | JS |
| `YELLOW_NEW_14` | `#e9c396` | JS |
| `YELLOW_NEW_15` | `#e7c092` | JS |
| `YELLOW_NEW_16` | `#e6bd8d` | JS |
| `YELLOW_NEW_17` | `#e4ba89` | JS |
| `YELLOW_NEW_18` | `#e2b785` | JS |
| `YELLOW_NEW_19` | `#e0b580` | JS |
| `YELLOW_NEW_2` | `#ffe5cf` | JS |
| `YELLOW_NEW_20` | `#deb27c` | JS |
| `YELLOW_NEW_21` | `#dcaf78` | JS |
| `YELLOW_NEW_22` | `#daac74` | JS |
| `YELLOW_NEW_23` | `#d8a970` | JS |
| `YELLOW_NEW_24` | `#d6a76c` | JS |
| `YELLOW_NEW_25` | `#d4a468` | JS |
| `YELLOW_NEW_26` | `#d2a164` | JS |
| `YELLOW_NEW_27` | `#d09e60` | JS |
| `YELLOW_NEW_28` | `#ce9c5c` | JS |
| `YELLOW_NEW_29` | `#cc9958` | JS |
| `YELLOW_NEW_3` | `#fde2ca` | JS |
| `YELLOW_NEW_30` | `#ca9654` | JS |
| `YELLOW_NEW_31` | `#c89351` | JS |
| `YELLOW_NEW_32` | `#c5914d` | JS |
| `YELLOW_NEW_33` | `#c38e49` | JS |
| `YELLOW_NEW_34` | `#c18b45` | JS |
| `YELLOW_NEW_35` | `#bf8841` | JS |
| `YELLOW_NEW_36` | `#bd863e` | JS |
| `YELLOW_NEW_37` | `#bb833a` | JS |
| `YELLOW_NEW_38` | `#b98036` | JS |
| `YELLOW_NEW_39` | `#b77e32` | JS |
| `YELLOW_NEW_4` | `#fcdfc5` | JS |
| `YELLOW_NEW_40` | `#b57b2e` | JS |
| `YELLOW_NEW_41` | `#b2782a` | JS |
| `YELLOW_NEW_42` | `#b07626` | JS |
| `YELLOW_NEW_43` | `#ae7322` | JS |
| `YELLOW_NEW_44` | `#ac701e` | JS |
| `YELLOW_NEW_45` | `#aa6e19` | JS |
| `YELLOW_NEW_46` | `#a86b14` | JS |
| `YELLOW_NEW_47` | `#a5680e` | JS |
| `YELLOW_NEW_48` | `#a36607` | JS |
| `YELLOW_NEW_49` | `#a16300` | JS |
| `YELLOW_NEW_5` | `#faddc0` | JS |
| `YELLOW_NEW_50` | `#a16300` | JS |
| `YELLOW_NEW_51` | `#9e6101` | JS |
| `YELLOW_NEW_52` | `#9b5f02` | JS |
| `YELLOW_NEW_53` | `#985c02` | JS |
| `YELLOW_NEW_54` | `#955a03` | JS |
| `YELLOW_NEW_55` | `#925803` | JS |
| `YELLOW_NEW_56` | `#8f5603` | JS |
| `YELLOW_NEW_57` | `#8c5403` | JS |
| `YELLOW_NEW_58` | `#895203` | JS |
| `YELLOW_NEW_59` | `#864f02` | JS |
| `YELLOW_NEW_6` | `#f8dabb` | JS |
| `YELLOW_NEW_60` | `#834d02` | JS |
| `YELLOW_NEW_61` | `#804b01` | JS |
| `YELLOW_NEW_62` | `#7e4901` | JS |
| `YELLOW_NEW_63` | `#7b4700` | JS |
| `YELLOW_NEW_64` | `#784500` | JS |
| `YELLOW_NEW_65` | `#754300` | JS |
| `YELLOW_NEW_66` | `#724000` | JS |
| `YELLOW_NEW_67` | `#703e00` | JS |
| `YELLOW_NEW_68` | `#6d3c00` | JS |
| `YELLOW_NEW_69` | `#6a3a00` | JS |
| `YELLOW_NEW_7` | `#f6d7b6` | JS |
| `YELLOW_NEW_70` | `#683800` | JS |
| `YELLOW_NEW_71` | `#653600` | JS |
| `YELLOW_NEW_72` | `#623400` | JS |
| `YELLOW_NEW_73` | `#603200` | JS |
| `YELLOW_NEW_74` | `#5d3000` | JS |
| `YELLOW_NEW_75` | `#5b2e00` | JS |
| `YELLOW_NEW_76` | `#582c00` | JS |
| `YELLOW_NEW_77` | `#552a00` | JS |
| `YELLOW_NEW_78` | `#532700` | JS |
| `YELLOW_NEW_79` | `#502500` | JS |
| `YELLOW_NEW_8` | `#f4d4b2` | JS |
| `YELLOW_NEW_80` | `#4e2300` | JS |
| `YELLOW_NEW_81` | `#4b2100` | JS |
| `YELLOW_NEW_82` | `#491f00` | JS |
| `YELLOW_NEW_83` | `#461d00` | JS |
| `YELLOW_NEW_84` | `#441b00` | JS |
| `YELLOW_NEW_85` | `#411900` | JS |
| `YELLOW_NEW_86` | `#3f1700` | JS |
| `YELLOW_NEW_87` | `#3c1500` | JS |
| `YELLOW_NEW_88` | `#3a1400` | JS |
| `YELLOW_NEW_89` | `#381200` | JS |
| `YELLOW_NEW_9` | `#f3d1ad` | JS |
| `YELLOW_NEW_90` | `#351000` | JS |
| `YELLOW_NEW_91` | `#330e00` | JS |
| `YELLOW_NEW_92` | `#300c00` | JS |
| `YELLOW_NEW_93` | `#2e0a00` | JS |
| `YELLOW_NEW_94` | `#2b0800` | JS |
| `YELLOW_NEW_95` | `#280600` | JS |
| `YELLOW_NEW_96` | `#250400` | JS |
| `YELLOW_NEW_97` | `#210200` | JS |
| `YELLOW_NEW_98` | `#1d0100` | JS |
| `YELLOW_NEW_99` | `#170000` | JS |

*Total: 478 variables*

---

## Colors - Orange

| Variable | Value | Type |
|----------|-------|------|
| `--chip-orange-dark-text` | `hsl(14.595 calc(1*100%) 92.745%/1)` | CSS |
| `--chip-orange-light-text` | `hsl(7.5 calc(1*100%) 9.412%/1)` | CSS |
| `--chip-orange-medium-text` | `hsl(353.333 calc(1*100%) 1.765%/1)` | CSS |
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
| `--orange-100` | `hsl(14.595 calc(1*100%) 92.745%/1)` | CSS |
| `--orange-100-hsl` | `14.595 calc(1*100%) 92.745%` | CSS |
| `--orange-130` | `hsl(14.595 calc(1*100%) 92.745%/1)` | CSS |
| `--orange-130-hsl` | `14.595 calc(1*100%) 92.745%` | CSS |
| `--orange-160` | `hsl(14.595 calc(1*100%) 92.745%/1)` | CSS |
| `--orange-160-hsl` | `14.595 calc(1*100%) 92.745%` | CSS |
| `--orange-200` | `hsl(16.596 calc(1*100%) 90.784%/1)` | CSS |
| `--orange-200-hsl` | `16.596 calc(1*100%) 90.784%` | CSS |
| `--orange-230` | `hsl(19.437 calc(1*94.667%) 85.294%/1)` | CSS |
| `--orange-230-hsl` | `19.437 calc(1*94.667%) 85.294%` | CSS |
| `--orange-260` | `hsl(21.064 calc(1*85.455%) 78.431%/1)` | CSS |
| `--orange-260-hsl` | `21.064 calc(1*85.455%) 78.431%` | CSS |
| `--orange-300` | `hsl(21.681 calc(1*76.774%) 69.608%/1)` | CSS |
| `--orange-300-hsl` | `21.681 calc(1*76.774%) 69.608%` | CSS |
| `--orange-330` | `hsl(22.336 calc(1*70.256%) 61.765%/1)` | CSS |
| `--orange-330-hsl` | `22.336 calc(1*70.256%) 61.765%` | CSS |
| `--orange-345` | `hsl(22 calc(1*65.789%) 55.294%/1)` | CSS |
| `--orange-345-hsl` | `22 calc(1*65.789%) 55.294%` | CSS |
| `--orange-360` | `hsl(22.166 calc(1*64.082%) 51.961%/1)` | CSS |
| `--orange-360-hsl` | `22.166 calc(1*64.082%) 51.961%` | CSS |
| `--orange-400` | `hsl(22.454 calc(1*65.992%) 48.431%/1)` | CSS |
| `--orange-400-hsl` | `22.454 calc(1*65.992%) 48.431%` | CSS |
| `--orange-430` | `hsl(22.722 calc(1*73.799%) 44.902%/1)` | CSS |
| `--orange-430-hsl` | `22.722 calc(1*73.799%) 44.902%` | CSS |
| `--orange-460` | `hsl(24.231 calc(1*96.296%) 31.765%/1)` | CSS |
| `--orange-460-hsl` | `24.231 calc(1*96.296%) 31.765%` | CSS |
| `--orange-500` | `hsl(24 calc(1*98.592%) 27.843%/1)` | CSS |
| `--orange-500-hsl` | `24 calc(1*98.592%) 27.843%` | CSS |
| `--orange-530` | `hsl(23.438 calc(1*100%) 25.098%/1)` | CSS |
| `--orange-530-hsl` | `23.438 calc(1*100%) 25.098%` | CSS |
| `--orange-560` | `hsl(22.435 calc(1*100%) 22.549%/1)` | CSS |
| `--orange-560-hsl` | `22.435 calc(1*100%) 22.549%` | CSS |
| `--orange-600` | `hsl(21.176 calc(1*100%) 20%/1)` | CSS |
| `--orange-600-hsl` | `21.176 calc(1*100%) 20%` | CSS |
| `--orange-630` | `hsl(20 calc(1*100%) 18.235%/1)` | CSS |
| `--orange-630-hsl` | `20 calc(1*100%) 18.235%` | CSS |
| `--orange-660` | `hsl(18 calc(1*100%) 15.686%/1)` | CSS |
| `--orange-660-hsl` | `18 calc(1*100%) 15.686%` | CSS |
| `--orange-700` | `hsl(16.056 calc(1*100%) 13.922%/1)` | CSS |
| `--orange-700-hsl` | `16.056 calc(1*100%) 13.922%` | CSS |
| `--orange-730` | `hsl(13.333 calc(1*100%) 12.353%/1)` | CSS |
| `--orange-730-hsl` | `13.333 calc(1*100%) 12.353%` | CSS |
| `--orange-760` | `hsl(10 calc(1*100%) 10.588%/1)` | CSS |
| `--orange-760-hsl` | `10 calc(1*100%) 10.588%` | CSS |
| `--orange-800` | `hsl(10 calc(1*100%) 10.588%/1)` | CSS |
| `--orange-800-hsl` | `10 calc(1*100%) 10.588%` | CSS |
| `--orange-830` | `hsl(6.667 calc(1*100%) 8.824%/1)` | CSS |
| `--orange-830-hsl` | `6.667 calc(1*100%) 8.824%` | CSS |
| `--orange-860` | `hsl(6.667 calc(1*100%) 8.824%/1)` | CSS |
| `--orange-860-hsl` | `6.667 calc(1*100%) 8.824%` | CSS |
| `--orange-900` | `hsl(357 calc(1*100%) 3.922%/1)` | CSS |
| `--orange-900-hsl` | `357 calc(1*100%) 3.922%` | CSS |
| `--orange-new-1` | `hsl(14.595 calc(1*100%) 92.745%/1)` | CSS |
| `--orange-new-1-hsl` | `14.595 calc(1*100%) 92.745%` | CSS |
| `--orange-new-10` | `hsl(20.506 calc(1*90.805%) 82.941%/1)` | CSS |
| `--orange-new-10-hsl` | `20.506 calc(1*90.805%) 82.941%` | CSS |
| `--orange-new-100` | `hsl(353.333 calc(1*100%) 1.765%/1)` | CSS |
| `--orange-new-100-hsl` | `353.333 calc(1*100%) 1.765%` | CSS |
| `--orange-new-11` | `hsl(20.241 calc(1*89.247%) 81.765%/1)` | CSS |
| `--orange-new-11-hsl` | `20.241 calc(1*89.247%) 81.765%` | CSS |
| `--orange-new-12` | `hsl(20.69 calc(1*87.879%) 80.588%/1)` | CSS |
| `--orange-new-12-hsl` | `20.69 calc(1*87.879%) 80.588%` | CSS |
| `--orange-new-13` | `hsl(20.667 calc(1*86.538%) 79.608%/1)` | CSS |
| `--orange-new-13-hsl` | `20.667 calc(1*86.538%) 79.608%` | CSS |
| `--orange-new-14` | `hsl(21.064 calc(1*85.455%) 78.431%/1)` | CSS |
| `--orange-new-14-hsl` | `21.064 calc(1*85.455%) 78.431%` | CSS |
| `--orange-new-15` | `hsl(21.429 calc(1*84.483%) 77.255%/1)` | CSS |
| `--orange-new-15-hsl` | `21.429 calc(1*84.483%) 77.255%` | CSS |
| `--orange-new-16` | `hsl(21.386 calc(1*83.471%) 76.275%/1)` | CSS |
| `--orange-new-16-hsl` | `21.386 calc(1*83.471%) 76.275%` | CSS |
| `--orange-new-17` | `hsl(21.714 calc(1*82.677%) 75.098%/1)` | CSS |
| `--orange-new-17-hsl` | `21.714 calc(1*82.677%) 75.098%` | CSS |
| `--orange-new-18` | `hsl(21.308 calc(1*80.451%) 73.922%/1)` | CSS |
| `--orange-new-18-hsl` | `21.308 calc(1*80.451%) 73.922%` | CSS |
| `--orange-new-19` | `hsl(21.273 calc(1*79.71%) 72.941%/1)` | CSS |
| `--orange-new-19-hsl` | `21.273 calc(1*79.71%) 72.941%` | CSS |
| `--orange-new-2` | `hsl(15.714 calc(1*100%) 91.765%/1)` | CSS |
| `--orange-new-2-hsl` | `15.714 calc(1*100%) 91.765%` | CSS |
| `--orange-new-20` | `hsl(21.579 calc(1*79.167%) 71.765%/1)` | CSS |
| `--orange-new-20-hsl` | `21.579 calc(1*79.167%) 71.765%` | CSS |
| `--orange-new-21` | `hsl(21.724 calc(1*77.333%) 70.588%/1)` | CSS |
| `--orange-new-21-hsl` | `21.724 calc(1*77.333%) 70.588%` | CSS |
| `--orange-new-22` | `hsl(21.681 calc(1*76.774%) 69.608%/1)` | CSS |
| `--orange-new-22-hsl` | `21.681 calc(1*76.774%) 69.608%` | CSS |
| `--orange-new-23` | `hsl(21.951 calc(1*76.398%) 68.431%/1)` | CSS |
| `--orange-new-23-hsl` | `21.951 calc(1*76.398%) 68.431%` | CSS |
| `--orange-new-24` | `hsl(22.08 calc(1*74.85%) 67.255%/1)` | CSS |
| `--orange-new-24-hsl` | `22.08 calc(1*74.85%) 67.255%` | CSS |
| `--orange-new-25` | `hsl(22.031 calc(1*74.419%) 66.275%/1)` | CSS |
| `--orange-new-25-hsl` | `22.031 calc(1*74.419%) 66.275%` | CSS |
| `--orange-new-26` | `hsl(22.154 calc(1*73.034%) 65.098%/1)` | CSS |
| `--orange-new-26-hsl` | `22.154 calc(1*73.034%) 65.098%` | CSS |
| `--orange-new-27` | `hsl(22.105 calc(1*72.678%) 64.118%/1)` | CSS |
| `--orange-new-27-hsl` | `22.105 calc(1*72.678%) 64.118%` | CSS |
| `--orange-new-28` | `hsl(22.222 calc(1*71.429%) 62.941%/1)` | CSS |
| `--orange-new-28-hsl` | `22.222 calc(1*71.429%) 62.941%` | CSS |
| `--orange-new-29` | `hsl(22.336 calc(1*70.256%) 61.765%/1)` | CSS |
| `--orange-new-29-hsl` | `22.336 calc(1*70.256%) 61.765%` | CSS |
| `--orange-new-3` | `hsl(16.596 calc(1*100%) 90.784%/1)` | CSS |
| `--orange-new-3-hsl` | `16.596 calc(1*100%) 90.784%` | CSS |
| `--orange-new-30` | `hsl(21.857 calc(1*70%) 60.784%/1)` | CSS |
| `--orange-new-30-hsl` | `21.857 calc(1*70%) 60.784%` | CSS |
| `--orange-new-31` | `hsl(21.972 calc(1*68.932%) 59.608%/1)` | CSS |
| `--orange-new-31-hsl` | `21.972 calc(1*68.932%) 59.608%` | CSS |
| `--orange-new-32` | `hsl(22.083 calc(1*67.925%) 58.431%/1)` | CSS |
| `--orange-new-32-hsl` | `22.083 calc(1*67.925%) 58.431%` | CSS |
| `--orange-new-33` | `hsl(21.781 calc(1*67.593%) 57.647%/1)` | CSS |
| `--orange-new-33-hsl` | `21.781 calc(1*67.593%) 57.647%` | CSS |
| `--orange-new-34` | `hsl(21.892 calc(1*66.667%) 56.471%/1)` | CSS |
| `--orange-new-34-hsl` | `21.892 calc(1*66.667%) 56.471%` | CSS |
| `--orange-new-35` | `hsl(22 calc(1*65.789%) 55.294%/1)` | CSS |
| `--orange-new-35-hsl` | `22 calc(1*65.789%) 55.294%` | CSS |
| `--orange-new-36` | `hsl(22.105 calc(1*64.957%) 54.118%/1)` | CSS |
| `--orange-new-36-hsl` | `22.105 calc(1*64.957%) 54.118%` | CSS |
| `--orange-new-37` | `hsl(22.065 calc(1*64.854%) 53.137%/1)` | CSS |
| `--orange-new-37-hsl` | `22.065 calc(1*64.854%) 53.137%` | CSS |
| `--orange-new-38` | `hsl(22.166 calc(1*64.082%) 51.961%/1)` | CSS |
| `--orange-new-38-hsl` | `22.166 calc(1*64.082%) 51.961%` | CSS |
| `--orange-new-39` | `hsl(22.264 calc(1*63.347%) 50.784%/1)` | CSS |
| `--orange-new-39-hsl` | `22.264 calc(1*63.347%) 50.784%` | CSS |
| `--orange-new-4` | `hsl(18.113 calc(1*100%) 89.608%/1)` | CSS |
| `--orange-new-4-hsl` | `18.113 calc(1*100%) 89.608%` | CSS |
| `--orange-new-40` | `hsl(22.36 calc(1*63.636%) 49.608%/1)` | CSS |
| `--orange-new-40-hsl` | `22.36 calc(1*63.636%) 49.608%` | CSS |
| `--orange-new-41` | `hsl(22.454 calc(1*65.992%) 48.431%/1)` | CSS |
| `--orange-new-41-hsl` | `22.454 calc(1*65.992%) 48.431%` | CSS |
| `--orange-new-42` | `hsl(22.545 calc(1*68.465%) 47.255%/1)` | CSS |
| `--orange-new-42-hsl` | `22.545 calc(1*68.465%) 47.255%` | CSS |
| `--orange-new-43` | `hsl(22.635 calc(1*71.064%) 46.078%/1)` | CSS |
| `--orange-new-43-hsl` | `22.635 calc(1*71.064%) 46.078%` | CSS |
| `--orange-new-44` | `hsl(22.722 calc(1*73.799%) 44.902%/1)` | CSS |
| `--orange-new-44-hsl` | `22.722 calc(1*73.799%) 44.902%` | CSS |
| `--orange-new-45` | `hsl(23.023 calc(1*77.477%) 43.529%/1)` | CSS |
| `--orange-new-45-hsl` | `23.023 calc(1*77.477%) 43.529%` | CSS |
| `--orange-new-46` | `hsl(23.314 calc(1*81.395%) 42.157%/1)` | CSS |
| `--orange-new-46-hsl` | `23.314 calc(1*81.395%) 42.157%` | CSS |
| `--orange-new-47` | `hsl(23.799 calc(1*86.473%) 40.588%/1)` | CSS |
| `--orange-new-47-hsl` | `23.799 calc(1*86.473%) 40.588%` | CSS |
| `--orange-new-48` | `hsl(24.457 calc(1*92.929%) 38.824%/1)` | CSS |
| `--orange-new-48-hsl` | `24.457 calc(1*92.929%) 38.824%` | CSS |
| `--orange-new-49` | `hsl(25.079 calc(1*100%) 37.059%/1)` | CSS |
| `--orange-new-49-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--orange-new-5` | `hsl(18.621 calc(1*100%) 88.627%/1)` | CSS |
| `--orange-new-5-hsl` | `18.621 calc(1*100%) 88.627%` | CSS |
| `--orange-new-50` | `hsl(25.079 calc(1*100%) 37.059%/1)` | CSS |
| `--orange-new-50-hsl` | `25.079 calc(1*100%) 37.059%` | CSS |
| `--orange-new-51` | `hsl(24.783 calc(1*98.925%) 36.471%/1)` | CSS |
| `--orange-new-51-hsl` | `24.783 calc(1*98.925%) 36.471%` | CSS |
| `--orange-new-52` | `hsl(24.804 calc(1*97.814%) 35.882%/1)` | CSS |
| `--orange-new-52-hsl` | `24.804 calc(1*97.814%) 35.882%` | CSS |
| `--orange-new-53` | `hsl(24.483 calc(1*96.667%) 35.294%/1)` | CSS |
| `--orange-new-53-hsl` | `24.483 calc(1*96.667%) 35.294%` | CSS |
| `--orange-new-54` | `hsl(24.211 calc(1*96.61%) 34.706%/1)` | CSS |
| `--orange-new-54-hsl` | `24.211 calc(1*96.61%) 34.706%` | CSS |
| `--orange-new-55` | `hsl(24.431 calc(1*96.532%) 33.922%/1)` | CSS |
| `--orange-new-55-hsl` | `24.431 calc(1*96.532%) 33.922%` | CSS |
| `--orange-new-56` | `hsl(24.294 calc(1*96.45%) 33.137%/1)` | CSS |
| `--orange-new-56-hsl` | `24.294 calc(1*96.45%) 33.137%` | CSS |
| `--orange-new-57` | `hsl(24 calc(1*96.386%) 32.549%/1)` | CSS |
| `--orange-new-57-hsl` | `24 calc(1*96.386%) 32.549%` | CSS |
| `--orange-new-58` | `hsl(24.231 calc(1*96.296%) 31.765%/1)` | CSS |
| `--orange-new-58-hsl` | `24.231 calc(1*96.296%) 31.765%` | CSS |
| `--orange-new-59` | `hsl(24.314 calc(1*97.452%) 30.784%/1)` | CSS |
| `--orange-new-59-hsl` | `24.314 calc(1*97.452%) 30.784%` | CSS |
| `--orange-new-6` | `hsl(18.387 calc(1*96.875%) 87.451%/1)` | CSS |
| `--orange-new-6-hsl` | `18.387 calc(1*96.875%) 87.451%` | CSS |
| `--orange-new-60` | `hsl(24 calc(1*97.403%) 30.196%/1)` | CSS |
| `--orange-new-60-hsl` | `24 calc(1*97.403%) 30.196%` | CSS |
| `--orange-new-61` | `hsl(23.836 calc(1*97.333%) 29.412%/1)` | CSS |
| `--orange-new-61-hsl` | `23.836 calc(1*97.333%) 29.412%` | CSS |
| `--orange-new-62` | `hsl(24.167 calc(1*98.63%) 28.627%/1)` | CSS |
| `--orange-new-62-hsl` | `24.167 calc(1*98.63%) 28.627%` | CSS |
| `--orange-new-63` | `hsl(24 calc(1*98.592%) 27.843%/1)` | CSS |
| `--orange-new-63-hsl` | `24 calc(1*98.592%) 27.843%` | CSS |
| `--orange-new-64` | `hsl(23.913 calc(1*100%) 27.059%/1)` | CSS |
| `--orange-new-64-hsl` | `23.913 calc(1*100%) 27.059%` | CSS |
| `--orange-new-65` | `hsl(23.556 calc(1*100%) 26.471%/1)` | CSS |
| `--orange-new-65-hsl` | `23.556 calc(1*100%) 26.471%` | CSS |
| `--orange-new-66` | `hsl(23.817 calc(1*100%) 25.686%/1)` | CSS |
| `--orange-new-66-hsl` | `23.817 calc(1*100%) 25.686%` | CSS |
| `--orange-new-67` | `hsl(23.438 calc(1*100%) 25.098%/1)` | CSS |
| `--orange-new-67-hsl` | `23.438 calc(1*100%) 25.098%` | CSS |
| `--orange-new-68` | `hsl(23.04 calc(1*100%) 24.51%/1)` | CSS |
| `--orange-new-68-hsl` | `23.04 calc(1*100%) 24.51%` | CSS |
| `--orange-new-69` | `hsl(22.81 calc(1*100%) 23.725%/1)` | CSS |
| `--orange-new-69-hsl` | `22.81 calc(1*100%) 23.725%` | CSS |
| `--orange-new-7` | `hsl(18.806 calc(1*97.101%) 86.471%/1)` | CSS |
| `--orange-new-7-hsl` | `18.806 calc(1*97.101%) 86.471%` | CSS |
| `--orange-new-70` | `hsl(22.881 calc(1*100%) 23.137%/1)` | CSS |
| `--orange-new-70-hsl` | `22.881 calc(1*100%) 23.137%` | CSS |
| `--orange-new-71` | `hsl(22.435 calc(1*100%) 22.549%/1)` | CSS |
| `--orange-new-71-hsl` | `22.435 calc(1*100%) 22.549%` | CSS |
| `--orange-new-72` | `hsl(21.964 calc(1*100%) 21.961%/1)` | CSS |
| `--orange-new-72-hsl` | `21.964 calc(1*100%) 21.961%` | CSS |
| `--orange-new-73` | `hsl(21.667 calc(1*100%) 21.176%/1)` | CSS |
| `--orange-new-73-hsl` | `21.667 calc(1*100%) 21.176%` | CSS |
| `--orange-new-74` | `hsl(21.714 calc(1*100%) 20.588%/1)` | CSS |
| `--orange-new-74-hsl` | `21.714 calc(1*100%) 20.588%` | CSS |
| `--orange-new-75` | `hsl(21.176 calc(1*100%) 20%/1)` | CSS |
| `--orange-new-75-hsl` | `21.176 calc(1*100%) 20%` | CSS |
| `--orange-new-76` | `hsl(20.606 calc(1*100%) 19.412%/1)` | CSS |
| `--orange-new-76-hsl` | `20.606 calc(1*100%) 19.412%` | CSS |
| `--orange-new-77` | `hsl(20 calc(1*100%) 18.824%/1)` | CSS |
| `--orange-new-77-hsl` | `20 calc(1*100%) 18.824%` | CSS |
| `--orange-new-78` | `hsl(20 calc(1*100%) 18.235%/1)` | CSS |
| `--orange-new-78-hsl` | `20 calc(1*100%) 18.235%` | CSS |
| `--orange-new-79` | `hsl(19.333 calc(1*100%) 17.647%/1)` | CSS |
| `--orange-new-79-hsl` | `19.333 calc(1*100%) 17.647%` | CSS |
| `--orange-new-8` | `hsl(19.437 calc(1*94.667%) 85.294%/1)` | CSS |
| `--orange-new-8-hsl` | `19.437 calc(1*94.667%) 85.294%` | CSS |
| `--orange-new-80` | `hsl(18.621 calc(1*100%) 17.059%/1)` | CSS |
| `--orange-new-80-hsl` | `18.621 calc(1*100%) 17.059%` | CSS |
| `--orange-new-81` | `hsl(18.072 calc(1*100%) 16.275%/1)` | CSS |
| `--orange-new-81-hsl` | `18.072 calc(1*100%) 16.275%` | CSS |
| `--orange-new-82` | `hsl(18 calc(1*100%) 15.686%/1)` | CSS |
| `--orange-new-82-hsl` | `18 calc(1*100%) 15.686%` | CSS |
| `--orange-new-83` | `hsl(17.143 calc(1*100%) 15.098%/1)` | CSS |
| `--orange-new-83-hsl` | `17.143 calc(1*100%) 15.098%` | CSS |
| `--orange-new-84` | `hsl(16.216 calc(1*100%) 14.51%/1)` | CSS |
| `--orange-new-84-hsl` | `16.216 calc(1*100%) 14.51%` | CSS |
| `--orange-new-85` | `hsl(16.056 calc(1*100%) 13.922%/1)` | CSS |
| `--orange-new-85-hsl` | `16.056 calc(1*100%) 13.922%` | CSS |
| `--orange-new-86` | `hsl(14.783 calc(1*100%) 13.529%/1)` | CSS |
| `--orange-new-86-hsl` | `14.783 calc(1*100%) 13.529%` | CSS |
| `--orange-new-87` | `hsl(13.636 calc(1*100%) 12.941%/1)` | CSS |
| `--orange-new-87-hsl` | `13.636 calc(1*100%) 12.941%` | CSS |
| `--orange-new-88` | `hsl(13.333 calc(1*100%) 12.353%/1)` | CSS |
| `--orange-new-88-hsl` | `13.333 calc(1*100%) 12.353%` | CSS |
| `--orange-new-89` | `hsl(12 calc(1*100%) 11.765%/1)` | CSS |
| `--orange-new-89-hsl` | `12 calc(1*100%) 11.765%` | CSS |
| `--orange-new-9` | `hsl(20 calc(1*92.593%) 84.118%/1)` | CSS |
| `--orange-new-9-hsl` | `20 calc(1*92.593%) 84.118%` | CSS |
| `--orange-new-90` | `hsl(10.526 calc(1*100%) 11.176%/1)` | CSS |
| `--orange-new-90-hsl` | `10.526 calc(1*100%) 11.176%` | CSS |
| `--orange-new-91` | `hsl(10 calc(1*100%) 10.588%/1)` | CSS |
| `--orange-new-91-hsl` | `10 calc(1*100%) 10.588%` | CSS |
| `--orange-new-92` | `hsl(8.235 calc(1*100%) 10%/1)` | CSS |
| `--orange-new-92-hsl` | `8.235 calc(1*100%) 10%` | CSS |
| `--orange-new-93` | `hsl(7.5 calc(1*100%) 9.412%/1)` | CSS |
| `--orange-new-93-hsl` | `7.5 calc(1*100%) 9.412%` | CSS |
| `--orange-new-94` | `hsl(6.667 calc(1*100%) 8.824%/1)` | CSS |
| `--orange-new-94-hsl` | `6.667 calc(1*100%) 8.824%` | CSS |
| `--orange-new-95` | `hsl(4.286 calc(1*100%) 8.235%/1)` | CSS |
| `--orange-new-95-hsl` | `4.286 calc(1*100%) 8.235%` | CSS |
| `--orange-new-96` | `hsl(3.158 calc(1*100%) 7.451%/1)` | CSS |
| `--orange-new-96-hsl` | `3.158 calc(1*100%) 7.451%` | CSS |
| `--orange-new-97` | `hsl(1.818 calc(1*100%) 6.471%/1)` | CSS |
| `--orange-new-97-hsl` | `1.818 calc(1*100%) 6.471%` | CSS |
| `--orange-new-98` | `hsl(0 calc(1*100%) 5.294%/1)` | CSS |
| `--orange-new-98-hsl` | `0 calc(1*100%) 5.294%` | CSS |
| `--orange-new-99` | `hsl(357 calc(1*100%) 3.922%/1)` | CSS |
| `--orange-new-99-hsl` | `357 calc(1*100%) 3.922%` | CSS |
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
| `ORANGE_NEW_1` | `#ffe3da` | JS |
| `ORANGE_NEW_10` | `#fbc7ac` | JS |
| `ORANGE_NEW_100` | `#090001` | JS |
| `ORANGE_NEW_11` | `#fac3a7` | JS |
| `ORANGE_NEW_12` | `#f9c0a2` | JS |
| `ORANGE_NEW_13` | `#f8bd9e` | JS |
| `ORANGE_NEW_14` | `#f7ba99` | JS |
| `ORANGE_NEW_15` | `#f6b794` | JS |
| `ORANGE_NEW_16` | `#f5b490` | JS |
| `ORANGE_NEW_17` | `#f4b18b` | JS |
| `ORANGE_NEW_18` | `#f2ad87` | JS |
| `ORANGE_NEW_19` | `#f1aa83` | JS |
| `ORANGE_NEW_2` | `#ffe0d5` | JS |
| `ORANGE_NEW_20` | `#f0a77e` | JS |
| `ORANGE_NEW_21` | `#eea47a` | JS |
| `ORANGE_NEW_22` | `#eda176` | JS |
| `ORANGE_NEW_23` | `#ec9e71` | JS |
| `ORANGE_NEW_24` | `#ea9b6d` | JS |
| `ORANGE_NEW_25` | `#e99869` | JS |
| `ORANGE_NEW_26` | `#e79565` | JS |
| `ORANGE_NEW_27` | `#e69261` | JS |
| `ORANGE_NEW_28` | `#e48f5d` | JS |
| `ORANGE_NEW_29` | `#e28c59` | JS |
| `ORANGE_NEW_3` | `#ffddd0` | JS |
| `ORANGE_NEW_30` | `#e18855` | JS |
| `ORANGE_NEW_31` | `#df8551` | JS |
| `ORANGE_NEW_32` | `#dd824d` | JS |
| `ORANGE_NEW_33` | `#dc7f4a` | JS |
| `ORANGE_NEW_34` | `#da7c46` | JS |
| `ORANGE_NEW_35` | `#d87942` | JS |
| `ORANGE_NEW_36` | `#d6763e` | JS |
| `ORANGE_NEW_37` | `#d5733a` | JS |
| `ORANGE_NEW_38` | `#d37036` | JS |
| `ORANGE_NEW_39` | `#d16d32` | JS |
| `ORANGE_NEW_4` | `#ffdaca` | JS |
| `ORANGE_NEW_40` | `#cf6a2e` | JS |
| `ORANGE_NEW_41` | `#cd672a` | JS |
| `ORANGE_NEW_42` | `#cb6426` | JS |
| `ORANGE_NEW_43` | `#c96122` | JS |
| `ORANGE_NEW_44` | `#c75e1e` | JS |
| `ORANGE_NEW_45` | `#c55b19` | JS |
| `ORANGE_NEW_46` | `#c35814` | JS |
| `ORANGE_NEW_47` | `#c1550e` | JS |
| `ORANGE_NEW_48` | `#bf5207` | JS |
| `ORANGE_NEW_49` | `#bd4f00` | JS |
| `ORANGE_NEW_5` | `#ffd7c5` | JS |
| `ORANGE_NEW_50` | `#bd4f00` | JS |
| `ORANGE_NEW_51` | `#b94d01` | JS |
| `ORANGE_NEW_52` | `#b54c02` | JS |
| `ORANGE_NEW_53` | `#b14a03` | JS |
| `ORANGE_NEW_54` | `#ae4803` | JS |
| `ORANGE_NEW_55` | `#aa4703` | JS |
| `ORANGE_NEW_56` | `#a64503` | JS |
| `ORANGE_NEW_57` | `#a34303` | JS |
| `ORANGE_NEW_58` | `#9f4203` | JS |
| `ORANGE_NEW_59` | `#9b4002` | JS |
| `ORANGE_NEW_6` | `#fed3c0` | JS |
| `ORANGE_NEW_60` | `#983e02` | JS |
| `ORANGE_NEW_61` | `#943c02` | JS |
| `ORANGE_NEW_62` | `#913b01` | JS |
| `ORANGE_NEW_63` | `#8d3901` | JS |
| `ORANGE_NEW_64` | `#8a3700` | JS |
| `ORANGE_NEW_65` | `#873500` | JS |
| `ORANGE_NEW_66` | `#833400` | JS |
| `ORANGE_NEW_67` | `#803200` | JS |
| `ORANGE_NEW_68` | `#7d3000` | JS |
| `ORANGE_NEW_69` | `#792e00` | JS |
| `ORANGE_NEW_7` | `#fed0bb` | JS |
| `ORANGE_NEW_70` | `#762d00` | JS |
| `ORANGE_NEW_71` | `#732b00` | JS |
| `ORANGE_NEW_72` | `#702900` | JS |
| `ORANGE_NEW_73` | `#6c2700` | JS |
| `ORANGE_NEW_74` | `#692600` | JS |
| `ORANGE_NEW_75` | `#662400` | JS |
| `ORANGE_NEW_76` | `#632200` | JS |
| `ORANGE_NEW_77` | `#602000` | JS |
| `ORANGE_NEW_78` | `#5d1f00` | JS |
| `ORANGE_NEW_79` | `#5a1d00` | JS |
| `ORANGE_NEW_8` | `#fdcdb6` | JS |
| `ORANGE_NEW_80` | `#571b00` | JS |
| `ORANGE_NEW_81` | `#531900` | JS |
| `ORANGE_NEW_82` | `#501800` | JS |
| `ORANGE_NEW_83` | `#4d1600` | JS |
| `ORANGE_NEW_84` | `#4a1400` | JS |
| `ORANGE_NEW_85` | `#471300` | JS |
| `ORANGE_NEW_86` | `#451100` | JS |
| `ORANGE_NEW_87` | `#420f00` | JS |
| `ORANGE_NEW_88` | `#3f0e00` | JS |
| `ORANGE_NEW_89` | `#3c0c00` | JS |
| `ORANGE_NEW_9` | `#fccab1` | JS |
| `ORANGE_NEW_90` | `#390a00` | JS |
| `ORANGE_NEW_91` | `#360900` | JS |
| `ORANGE_NEW_92` | `#330700` | JS |
| `ORANGE_NEW_93` | `#300600` | JS |
| `ORANGE_NEW_94` | `#2d0500` | JS |
| `ORANGE_NEW_95` | `#2a0300` | JS |
| `ORANGE_NEW_96` | `#260200` | JS |
| `ORANGE_NEW_97` | `#210100` | JS |
| `ORANGE_NEW_98` | `#1b0000` | JS |
| `ORANGE_NEW_99` | `#140001` | JS |

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
| `--opacity-pink-1` | `hsl(315.084 calc(1*100%) 64.902%/0.019607843137...` | CSS |
| `--opacity-pink-1-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-12` | `hsl(315.084 calc(1*100%) 64.902%/0.121568627450...` | CSS |
| `--opacity-pink-12-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-16` | `hsl(315.084 calc(1*100%) 64.902%/0.160784313725...` | CSS |
| `--opacity-pink-16-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-20` | `hsl(315.084 calc(1*100%) 64.902%/0.2)` | CSS |
| `--opacity-pink-20-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-24` | `hsl(315.084 calc(1*100%) 64.902%/0.239215686274...` | CSS |
| `--opacity-pink-24-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-28` | `hsl(315.084 calc(1*100%) 64.902%/0.278431372549...` | CSS |
| `--opacity-pink-28-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-32` | `hsl(315.084 calc(1*100%) 64.902%/0.321568627450...` | CSS |
| `--opacity-pink-32-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-36` | `hsl(315.084 calc(1*100%) 64.902%/0.360784313725...` | CSS |
| `--opacity-pink-36-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-4` | `hsl(315.084 calc(1*100%) 64.902%/0.039215686274...` | CSS |
| `--opacity-pink-4-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-40` | `hsl(315.084 calc(1*100%) 64.902%/0.4)` | CSS |
| `--opacity-pink-40-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-44` | `hsl(315.084 calc(1*100%) 64.902%/0.439215686274...` | CSS |
| `--opacity-pink-44-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-48` | `hsl(315.084 calc(1*100%) 64.902%/0.478431372549...` | CSS |
| `--opacity-pink-48-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-52` | `hsl(315.084 calc(1*100%) 64.902%/0.521568627450...` | CSS |
| `--opacity-pink-52-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-56` | `hsl(315.084 calc(1*100%) 64.902%/0.560784313725...` | CSS |
| `--opacity-pink-56-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-60` | `hsl(315.084 calc(1*100%) 64.902%/0.6)` | CSS |
| `--opacity-pink-60-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-64` | `hsl(315.084 calc(1*100%) 64.902%/0.639215686274...` | CSS |
| `--opacity-pink-64-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-68` | `hsl(315.084 calc(1*100%) 64.902%/0.678431372549...` | CSS |
| `--opacity-pink-68-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-72` | `hsl(315.084 calc(1*100%) 64.902%/0.721568627450...` | CSS |
| `--opacity-pink-72-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-76` | `hsl(315.084 calc(1*100%) 64.902%/0.760784313725...` | CSS |
| `--opacity-pink-76-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-8` | `hsl(315.084 calc(1*100%) 64.902%/0.078431372549...` | CSS |
| `--opacity-pink-8-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-80` | `hsl(315.084 calc(1*100%) 64.902%/0.8)` | CSS |
| `--opacity-pink-80-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-84` | `hsl(315.084 calc(1*100%) 64.902%/0.839215686274...` | CSS |
| `--opacity-pink-84-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-88` | `hsl(315.084 calc(1*100%) 64.902%/0.878431372549...` | CSS |
| `--opacity-pink-88-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-92` | `hsl(315.084 calc(1*100%) 64.902%/0.921568627450...` | CSS |
| `--opacity-pink-92-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--opacity-pink-96` | `hsl(315.084 calc(1*100%) 64.902%/0.960784313725...` | CSS |
| `--opacity-pink-96-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--pink-1` | `hsl(318.462 calc(1*100%) 92.353%/1)` | CSS |
| `--pink-1-hsl` | `318.462 calc(1*100%) 92.353%` | CSS |
| `--pink-10` | `hsl(315.938 calc(1*100%) 87.451%/1)` | CSS |
| `--pink-10-hsl` | `315.938 calc(1*100%) 87.451%` | CSS |
| `--pink-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--pink-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--pink-11` | `hsl(316.119 calc(1*100%) 86.863%/1)` | CSS |
| `--pink-11-hsl` | `316.119 calc(1*100%) 86.863%` | CSS |
| `--pink-12` | `hsl(316.522 calc(1*100%) 86.471%/1)` | CSS |
| `--pink-12-hsl` | `316.522 calc(1*100%) 86.471%` | CSS |
| `--pink-13` | `hsl(315.833 calc(1*100%) 85.882%/1)` | CSS |
| `--pink-13-hsl` | `315.833 calc(1*100%) 85.882%` | CSS |
| `--pink-14` | `hsl(316 calc(1*100%) 85.294%/1)` | CSS |
| `--pink-14-hsl` | `316 calc(1*100%) 85.294%` | CSS |
| `--pink-15` | `hsl(315.385 calc(1*100%) 84.706%/1)` | CSS |
| `--pink-15-hsl` | `315.385 calc(1*100%) 84.706%` | CSS |
| `--pink-16` | `hsl(315.75 calc(1*100%) 84.314%/1)` | CSS |
| `--pink-16-hsl` | `315.75 calc(1*100%) 84.314%` | CSS |
| `--pink-17` | `hsl(315.904 calc(1*100%) 83.725%/1)` | CSS |
| `--pink-17-hsl` | `315.904 calc(1*100%) 83.725%` | CSS |
| `--pink-18` | `hsl(315.349 calc(1*100%) 83.137%/1)` | CSS |
| `--pink-18-hsl` | `315.349 calc(1*100%) 83.137%` | CSS |
| `--pink-19` | `hsl(315.506 calc(1*100%) 82.549%/1)` | CSS |
| `--pink-19-hsl` | `315.506 calc(1*100%) 82.549%` | CSS |
| `--pink-2` | `hsl(318.571 calc(1*100%) 91.765%/1)` | CSS |
| `--pink-2-hsl` | `318.571 calc(1*100%) 91.765%` | CSS |
| `--pink-20` | `hsl(315.824 calc(1*100%) 82.157%/1)` | CSS |
| `--pink-20-hsl` | `315.824 calc(1*100%) 82.157%` | CSS |
| `--pink-21` | `hsl(315.319 calc(1*100%) 81.569%/1)` | CSS |
| `--pink-21-hsl` | `315.319 calc(1*100%) 81.569%` | CSS |
| `--pink-22` | `hsl(315.464 calc(1*100%) 80.98%/1)` | CSS |
| `--pink-22-hsl` | `315.464 calc(1*100%) 80.98%` | CSS |
| `--pink-23` | `hsl(315.6 calc(1*100%) 80.392%/1)` | CSS |
| `--pink-23-hsl` | `315.6 calc(1*100%) 80.392%` | CSS |
| `--pink-24` | `hsl(315.294 calc(1*100%) 80%/1)` | CSS |
| `--pink-24-hsl` | `315.294 calc(1*100%) 80%` | CSS |
| `--pink-25` | `hsl(315.429 calc(1*100%) 79.412%/1)` | CSS |
| `--pink-25-hsl` | `315.429 calc(1*100%) 79.412%` | CSS |
| `--pink-26` | `hsl(315.556 calc(1*100%) 78.824%/1)` | CSS |
| `--pink-26-hsl` | `315.556 calc(1*100%) 78.824%` | CSS |
| `--pink-27` | `hsl(315.676 calc(1*100%) 78.235%/1)` | CSS |
| `--pink-27-hsl` | `315.676 calc(1*100%) 78.235%` | CSS |
| `--pink-28` | `hsl(315.398 calc(1*100%) 77.843%/1)` | CSS |
| `--pink-28-hsl` | `315.398 calc(1*100%) 77.843%` | CSS |
| `--pink-29` | `hsl(315.517 calc(1*100%) 77.255%/1)` | CSS |
| `--pink-29-hsl` | `315.517 calc(1*100%) 77.255%` | CSS |
| `--pink-3` | `hsl(317.333 calc(1*100%) 91.176%/1)` | CSS |
| `--pink-3-hsl` | `317.333 calc(1*100%) 91.176%` | CSS |
| `--pink-30` | `hsl(315.63 calc(1*100%) 76.667%/1)` | CSS |
| `--pink-30-hsl` | `315.63 calc(1*100%) 76.667%` | CSS |
| `--pink-31` | `hsl(315.738 calc(1*100%) 76.078%/1)` | CSS |
| `--pink-31-hsl` | `315.738 calc(1*100%) 76.078%` | CSS |
| `--pink-32` | `hsl(315.36 calc(1*100%) 75.49%/1)` | CSS |
| `--pink-32-hsl` | `315.36 calc(1*100%) 75.49%` | CSS |
| `--pink-33` | `hsl(315.469 calc(1*100%) 74.902%/1)` | CSS |
| `--pink-33-hsl` | `315.469 calc(1*100%) 74.902%` | CSS |
| `--pink-34` | `hsl(315.573 calc(1*100%) 74.314%/1)` | CSS |
| `--pink-34-hsl` | `315.573 calc(1*100%) 74.314%` | CSS |
| `--pink-35` | `hsl(315.338 calc(1*100%) 73.922%/1)` | CSS |
| `--pink-35-hsl` | `315.338 calc(1*100%) 73.922%` | CSS |
| `--pink-36` | `hsl(315.441 calc(1*100%) 73.333%/1)` | CSS |
| `--pink-36-hsl` | `315.441 calc(1*100%) 73.333%` | CSS |
| `--pink-37` | `hsl(315.54 calc(1*100%) 72.745%/1)` | CSS |
| `--pink-37-hsl` | `315.54 calc(1*100%) 72.745%` | CSS |
| `--pink-38` | `hsl(315.634 calc(1*100%) 72.157%/1)` | CSS |
| `--pink-38-hsl` | `315.634 calc(1*100%) 72.157%` | CSS |
| `--pink-39` | `hsl(315.31 calc(1*100%) 71.569%/1)` | CSS |
| `--pink-39-hsl` | `315.31 calc(1*100%) 71.569%` | CSS |
| `--pink-4` | `hsl(317.5 calc(1*100%) 90.588%/1)` | CSS |
| `--pink-4-hsl` | `317.5 calc(1*100%) 90.588%` | CSS |
| `--pink-40` | `hsl(315.302 calc(1*100%) 70.784%/1)` | CSS |
| `--pink-40-hsl` | `315.302 calc(1*100%) 70.784%` | CSS |
| `--pink-41` | `hsl(315.395 calc(1*100%) 70.196%/1)` | CSS |
| `--pink-41-hsl` | `315.395 calc(1*100%) 70.196%` | CSS |
| `--pink-42` | `hsl(315.484 calc(1*100%) 69.608%/1)` | CSS |
| `--pink-42-hsl` | `315.484 calc(1*100%) 69.608%` | CSS |
| `--pink-43` | `hsl(315.19 calc(1*100%) 69.02%/1)` | CSS |
| `--pink-43-hsl` | `315.19 calc(1*100%) 69.02%` | CSS |
| `--pink-44` | `hsl(315.28 calc(1*100%) 68.431%/1)` | CSS |
| `--pink-44-hsl` | `315.28 calc(1*100%) 68.431%` | CSS |
| `--pink-45` | `hsl(315.273 calc(1*100%) 67.647%/1)` | CSS |
| `--pink-45-hsl` | `315.273 calc(1*100%) 67.647%` | CSS |
| `--pink-46` | `hsl(315.357 calc(1*100%) 67.059%/1)` | CSS |
| `--pink-46-hsl` | `315.357 calc(1*100%) 67.059%` | CSS |
| `--pink-47` | `hsl(315 calc(1*100%) 66.275%/1)` | CSS |
| `--pink-47-hsl` | `315 calc(1*100%) 66.275%` | CSS |
| `--pink-48` | `hsl(315.086 calc(1*100%) 65.686%/1)` | CSS |
| `--pink-48-hsl` | `315.086 calc(1*100%) 65.686%` | CSS |
| `--pink-49` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--pink-49-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--pink-5` | `hsl(316.8 calc(1*100%) 90.196%/1)` | CSS |
| `--pink-5-hsl` | `316.8 calc(1*100%) 90.196%` | CSS |
| `--pink-50` | `hsl(315.084 calc(1*100%) 64.902%/1)` | CSS |
| `--pink-50-hsl` | `315.084 calc(1*100%) 64.902%` | CSS |
| `--pink-51` | `hsl(315.172 calc(1*93.548%) 63.529%/1)` | CSS |
| `--pink-51-hsl` | `315.172 calc(1*93.548%) 63.529%` | CSS |
| `--pink-52` | `hsl(315.266 calc(1*87.565%) 62.157%/1)` | CSS |
| `--pink-52-hsl` | `315.266 calc(1*87.565%) 62.157%` | CSS |
| `--pink-53` | `hsl(315.273 calc(1*82.915%) 60.98%/1)` | CSS |
| `--pink-53-hsl` | `315.273 calc(1*82.915%) 60.98%` | CSS |
| `--pink-54` | `hsl(315.375 calc(1*77.67%) 59.608%/1)` | CSS |
| `--pink-54-hsl` | `315.375 calc(1*77.67%) 59.608%` | CSS |
| `--pink-55` | `hsl(315.669 calc(1*73.709%) 58.235%/1)` | CSS |
| `--pink-55-hsl` | `315.669 calc(1*73.709%) 58.235%` | CSS |
| `--pink-56` | `hsl(315.395 calc(1*69.091%) 56.863%/1)` | CSS |
| `--pink-56-hsl` | `315.395 calc(1*69.091%) 56.863%` | CSS |
| `--pink-57` | `hsl(315.705 calc(1*65.639%) 55.49%/1)` | CSS |
| `--pink-57-hsl` | `315.705 calc(1*65.639%) 55.49%` | CSS |
| `--pink-58` | `hsl(315.417 calc(1*61.538%) 54.118%/1)` | CSS |
| `--pink-58-hsl` | `315.417 calc(1*61.538%) 54.118%` | CSS |
| `--pink-59` | `hsl(315.745 calc(1*58.506%) 52.745%/1)` | CSS |
| `--pink-59-hsl` | `315.745 calc(1*58.506%) 52.745%` | CSS |
| `--pink-6` | `hsl(316.981 calc(1*100%) 89.608%/1)` | CSS |
| `--pink-6-hsl` | `316.981 calc(1*100%) 89.608%` | CSS |
| `--pink-60` | `hsl(315.766 calc(1*55.466%) 51.569%/1)` | CSS |
| `--pink-60-hsl` | `315.766 calc(1*55.466%) 51.569%` | CSS |
| `--pink-61` | `hsl(315.672 calc(1*52.756%) 50.196%/1)` | CSS |
| `--pink-61-hsl` | `315.672 calc(1*52.756%) 50.196%` | CSS |
| `--pink-62` | `hsl(315.814 calc(1*51.807%) 48.824%/1)` | CSS |
| `--pink-62-hsl` | `315.814 calc(1*51.807%) 48.824%` | CSS |
| `--pink-63` | `hsl(315.714 calc(1*52.066%) 47.451%/1)` | CSS |
| `--pink-63-hsl` | `315.714 calc(1*52.066%) 47.451%` | CSS |
| `--pink-64` | `hsl(315.61 calc(1*52.34%) 46.078%/1)` | CSS |
| `--pink-64-hsl` | `315.61 calc(1*52.34%) 46.078%` | CSS |
| `--pink-65` | `hsl(315.63 calc(1*51.965%) 44.902%/1)` | CSS |
| `--pink-65-hsl` | `315.63 calc(1*51.965%) 44.902%` | CSS |
| `--pink-66` | `hsl(316.034 calc(1*52.252%) 43.529%/1)` | CSS |
| `--pink-66-hsl` | `316.034 calc(1*52.252%) 43.529%` | CSS |
| `--pink-67` | `hsl(316.316 calc(1*52.778%) 42.353%/1)` | CSS |
| `--pink-67-hsl` | `316.316 calc(1*52.778%) 42.353%` | CSS |
| `--pink-68` | `hsl(316.216 calc(1*53.11%) 40.98%/1)` | CSS |
| `--pink-68-hsl` | `316.216 calc(1*53.11%) 40.98%` | CSS |
| `--pink-69` | `hsl(316.262 calc(1*52.709%) 39.804%/1)` | CSS |
| `--pink-69-hsl` | `316.262 calc(1*52.709%) 39.804%` | CSS |
| `--pink-7` | `hsl(317.143 calc(1*100%) 89.02%/1)` | CSS |
| `--pink-7-hsl` | `317.143 calc(1*100%) 89.02%` | CSS |
| `--pink-70` | `hsl(316.154 calc(1*53.061%) 38.431%/1)` | CSS |
| `--pink-70-hsl` | `316.154 calc(1*53.061%) 38.431%` | CSS |
| `--pink-71` | `hsl(316.04 calc(1*53.439%) 37.059%/1)` | CSS |
| `--pink-71-hsl` | `316.04 calc(1*53.439%) 37.059%` | CSS |
| `--pink-72` | `hsl(316.364 calc(1*54.098%) 35.882%/1)` | CSS |
| `--pink-72-hsl` | `316.364 calc(1*54.098%) 35.882%` | CSS |
| `--pink-73` | `hsl(316.25 calc(1*54.545%) 34.51%/1)` | CSS |
| `--pink-73-hsl` | `316.25 calc(1*54.545%) 34.51%` | CSS |
| `--pink-74` | `hsl(316.304 calc(1*54.118%) 33.333%/1)` | CSS |
| `--pink-74-hsl` | `316.304 calc(1*54.118%) 33.333%` | CSS |
| `--pink-75` | `hsl(316.667 calc(1*54.878%) 32.157%/1)` | CSS |
| `--pink-75-hsl` | `316.667 calc(1*54.878%) 32.157%` | CSS |
| `--pink-76` | `hsl(315.862 calc(1*55.414%) 30.784%/1)` | CSS |
| `--pink-76-hsl` | `315.862 calc(1*55.414%) 30.784%` | CSS |
| `--pink-77` | `hsl(316.235 calc(1*56.291%) 29.608%/1)` | CSS |
| `--pink-77-hsl` | `316.235 calc(1*56.291%) 29.608%` | CSS |
| `--pink-78` | `hsl(316.296 calc(1*55.862%) 28.431%/1)` | CSS |
| `--pink-78-hsl` | `316.296 calc(1*55.862%) 28.431%` | CSS |
| `--pink-79` | `hsl(316.709 calc(1*56.835%) 27.255%/1)` | CSS |
| `--pink-79-hsl` | `316.709 calc(1*56.835%) 27.255%` | CSS |
| `--pink-8` | `hsl(316.271 calc(1*100%) 88.431%/1)` | CSS |
| `--pink-8-hsl` | `316.271 calc(1*100%) 88.431%` | CSS |
| `--pink-80` | `hsl(316.579 calc(1*57.576%) 25.882%/1)` | CSS |
| `--pink-80-hsl` | `316.579 calc(1*57.576%) 25.882%` | CSS |
| `--pink-81` | `hsl(316.438 calc(1*57.48%) 24.902%/1)` | CSS |
| `--pink-81-hsl` | `316.438 calc(1*57.48%) 24.902%` | CSS |
| `--pink-82` | `hsl(316.286 calc(1*58.333%) 23.529%/1)` | CSS |
| `--pink-82-hsl` | `316.286 calc(1*58.333%) 23.529%` | CSS |
| `--pink-83` | `hsl(316.765 calc(1*59.649%) 22.353%/1)` | CSS |
| `--pink-83-hsl` | `316.765 calc(1*59.649%) 22.353%` | CSS |
| `--pink-84` | `hsl(316.615 calc(1*59.633%) 21.373%/1)` | CSS |
| `--pink-84-hsl` | `316.615 calc(1*59.633%) 21.373%` | CSS |
| `--pink-85` | `hsl(316.452 calc(1*60.784%) 20%/1)` | CSS |
| `--pink-85-hsl` | `316.452 calc(1*60.784%) 20%` | CSS |
| `--pink-86` | `hsl(316.271 calc(1*60.825%) 19.02%/1)` | CSS |
| `--pink-86-hsl` | `316.271 calc(1*60.825%) 19.02%` | CSS |
| `--pink-87` | `hsl(316.842 calc(1*62.637%) 17.843%/1)` | CSS |
| `--pink-87-hsl` | `316.842 calc(1*62.637%) 17.843%` | CSS |
| `--pink-88` | `hsl(315.556 calc(1*64.286%) 16.471%/1)` | CSS |
| `--pink-88-hsl` | `315.556 calc(1*64.286%) 16.471%` | CSS |
| `--pink-89` | `hsl(316.471 calc(1*64.557%) 15.49%/1)` | CSS |
| `--pink-89-hsl` | `316.471 calc(1*64.557%) 15.49%` | CSS |
| `--pink-9` | `hsl(316.721 calc(1*100%) 88.039%/1)` | CSS |
| `--pink-9-hsl` | `316.721 calc(1*100%) 88.039%` | CSS |
| `--pink-90` | `hsl(316.25 calc(1*64.865%) 14.51%/1)` | CSS |
| `--pink-90-hsl` | `316.25 calc(1*64.865%) 14.51%` | CSS |
| `--pink-91` | `hsl(316.957 calc(1*67.647%) 13.333%/1)` | CSS |
| `--pink-91-hsl` | `316.957 calc(1*67.647%) 13.333%` | CSS |
| `--pink-92` | `hsl(316.744 calc(1*68.254%) 12.353%/1)` | CSS |
| `--pink-92-hsl` | `316.744 calc(1*68.254%) 12.353%` | CSS |
| `--pink-93` | `hsl(316.098 calc(1*71.93%) 11.176%/1)` | CSS |
| `--pink-93-hsl` | `316.098 calc(1*71.93%) 11.176%` | CSS |
| `--pink-94` | `hsl(317.368 calc(1*73.077%) 10.196%/1)` | CSS |
| `--pink-94-hsl` | `317.368 calc(1*73.077%) 10.196%` | CSS |
| `--pink-95` | `hsl(315.882 calc(1*73.913%) 9.02%/1)` | CSS |
| `--pink-95-hsl` | `315.882 calc(1*73.913%) 9.02%` | CSS |
| `--pink-96` | `hsl(317.419 calc(1*75.61%) 8.039%/1)` | CSS |
| `--pink-96-hsl` | `317.419 calc(1*75.61%) 8.039%` | CSS |
| `--pink-97` | `hsl(318.462 calc(1*76.471%) 6.667%/1)` | CSS |
| `--pink-97-hsl` | `318.462 calc(1*76.471%) 6.667%` | CSS |
| `--pink-98` | `hsl(321 calc(1*76.923%) 5.098%/1)` | CSS |
| `--pink-98-hsl` | `321 calc(1*76.923%) 5.098%` | CSS |
| `--pink-99` | `hsl(327.273 calc(1*73.333%) 2.941%/1)` | CSS |
| `--pink-99-hsl` | `327.273 calc(1*73.333%) 2.941%` | CSS |
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
| `OPACITY_PINK_1` | `#ff4cd205` | JS |
| `OPACITY_PINK_12` | `#ff4cd21f` | JS |
| `OPACITY_PINK_16` | `#ff4cd229` | JS |
| `OPACITY_PINK_20` | `#ff4cd233` | JS |
| `OPACITY_PINK_24` | `#ff4cd23d` | JS |
| `OPACITY_PINK_28` | `#ff4cd247` | JS |
| `OPACITY_PINK_32` | `#ff4cd252` | JS |
| `OPACITY_PINK_36` | `#ff4cd25c` | JS |
| `OPACITY_PINK_4` | `#ff4cd20a` | JS |
| `OPACITY_PINK_40` | `#ff4cd266` | JS |
| `OPACITY_PINK_44` | `#ff4cd270` | JS |
| `OPACITY_PINK_48` | `#ff4cd27a` | JS |
| `OPACITY_PINK_52` | `#ff4cd285` | JS |
| `OPACITY_PINK_56` | `#ff4cd28f` | JS |
| `OPACITY_PINK_60` | `#ff4cd299` | JS |
| `OPACITY_PINK_64` | `#ff4cd2a3` | JS |
| `OPACITY_PINK_68` | `#ff4cd2ad` | JS |
| `OPACITY_PINK_72` | `#ff4cd2b8` | JS |
| `OPACITY_PINK_76` | `#ff4cd2c2` | JS |
| `OPACITY_PINK_8` | `#ff4cd214` | JS |
| `OPACITY_PINK_80` | `#ff4cd2cc` | JS |
| `OPACITY_PINK_84` | `#ff4cd2d6` | JS |
| `OPACITY_PINK_88` | `#ff4cd2e0` | JS |
| `OPACITY_PINK_92` | `#ff4cd2eb` | JS |
| `OPACITY_PINK_96` | `#ff4cd2f5` | JS |
| `PINK_1` | `#ffd8f3` | JS |
| `PINK_10` | `#ffbfee` | JS |
| `PINK_100` | `#000000` | JS |
| `PINK_11` | `#ffbced` | JS |
| `PINK_12` | `#ffbaec` | JS |
| `PINK_13` | `#ffb7ec` | JS |
| `PINK_14` | `#ffb4eb` | JS |
| `PINK_15` | `#ffb1eb` | JS |
| `PINK_16` | `#ffafea` | JS |
| `PINK_17` | `#fface9` | JS |
| `PINK_18` | `#ffa9e9` | JS |
| `PINK_19` | `#ffa6e8` | JS |
| `PINK_2` | `#ffd5f2` | JS |
| `PINK_20` | `#ffa4e7` | JS |
| `PINK_21` | `#ffa1e7` | JS |
| `PINK_22` | `#ff9ee6` | JS |
| `PINK_23` | `#ff9be5` | JS |
| `PINK_24` | `#ff99e5` | JS |
| `PINK_25` | `#ff96e4` | JS |
| `PINK_26` | `#ff93e3` | JS |
| `PINK_27` | `#ff90e2` | JS |
| `PINK_28` | `#ff8ee2` | JS |
| `PINK_29` | `#ff8be1` | JS |
| `PINK_3` | `#ffd2f2` | JS |
| `PINK_30` | `#ff88e0` | JS |
| `PINK_31` | `#ff85df` | JS |
| `PINK_32` | `#ff82df` | JS |
| `PINK_33` | `#ff7fde` | JS |
| `PINK_34` | `#ff7cdd` | JS |
| `PINK_35` | `#ff7add` | JS |
| `PINK_36` | `#ff77dc` | JS |
| `PINK_37` | `#ff74db` | JS |
| `PINK_38` | `#ff71da` | JS |
| `PINK_39` | `#ff6eda` | JS |
| `PINK_4` | `#ffcff1` | JS |
| `PINK_40` | `#ff6ad9` | JS |
| `PINK_41` | `#ff67d8` | JS |
| `PINK_42` | `#ff64d7` | JS |
| `PINK_43` | `#ff61d7` | JS |
| `PINK_44` | `#ff5ed6` | JS |
| `PINK_45` | `#ff5ad5` | JS |
| `PINK_46` | `#ff57d4` | JS |
| `PINK_47` | `#ff53d4` | JS |
| `PINK_48` | `#ff50d3` | JS |
| `PINK_49` | `#ff4cd2` | JS |
| `PINK_5` | `#ffcdf1` | JS |
| `PINK_50` | `#ff4cd2` | JS |
| `PINK_51` | `#f94bcd` | JS |
| `PINK_52` | `#f34ac8` | JS |
| `PINK_53` | `#ee49c4` | JS |
| `PINK_54` | `#e848bf` | JS |
| `PINK_55` | `#e346ba` | JS |
| `PINK_56` | `#dd45b6` | JS |
| `PINK_57` | `#d843b1` | JS |
| `PINK_58` | `#d242ad` | JS |
| `PINK_59` | `#cd40a8` | JS |
| `PINK_6` | `#ffcaf0` | JS |
| `PINK_60` | `#c83fa4` | JS |
| `PINK_61` | `#c33da0` | JS |
| `PINK_62` | `#bd3c9b` | JS |
| `PINK_63` | `#b83a97` | JS |
| `PINK_64` | `#b33893` | JS |
| `PINK_65` | `#ae378f` | JS |
| `PINK_66` | `#a9358a` | JS |
| `PINK_67` | `#a53386` | JS |
| `PINK_68` | `#a03182` | JS |
| `PINK_69` | `#9b307e` | JS |
| `PINK_7` | `#ffc7ef` | JS |
| `PINK_70` | `#962e7a` | JS |
| `PINK_71` | `#912c76` | JS |
| `PINK_72` | `#8d2a72` | JS |
| `PINK_73` | `#88286e` | JS |
| `PINK_74` | `#83276a` | JS |
| `PINK_75` | `#7f2566` | JS |
| `PINK_76` | `#7a2363` | JS |
| `PINK_77` | `#76215f` | JS |
| `PINK_78` | `#71205b` | JS |
| `PINK_79` | `#6d1e57` | JS |
| `PINK_8` | `#ffc4ef` | JS |
| `PINK_80` | `#681c53` | JS |
| `PINK_81` | `#641b50` | JS |
| `PINK_82` | `#5f194c` | JS |
| `PINK_83` | `#5b1748` | JS |
| `PINK_84` | `#571645` | JS |
| `PINK_85` | `#521441` | JS |
| `PINK_86` | `#4e133e` | JS |
| `PINK_87` | `#4a113a` | JS |
| `PINK_88` | `#450f37` | JS |
| `PINK_89` | `#410e33` | JS |
| `PINK_9` | `#ffc2ee` | JS |
| `PINK_90` | `#3d0d30` | JS |
| `PINK_91` | `#390b2c` | JS |
| `PINK_92` | `#350a29` | JS |
| `PINK_93` | `#310826` | JS |
| `PINK_94` | `#2d0722` | JS |
| `PINK_95` | `#28061f` | JS |
| `PINK_96` | `#24051b` | JS |
| `PINK_97` | `#1e0416` | JS |
| `PINK_98` | `#170310` | JS |
| `PINK_99` | `#0d0208` | JS |

*Total: 408 variables*

---

## Colors - Teal

| Variable | Value | Type |
|----------|-------|------|
| `--opacity-teal-1` | `hsl(183.913 calc(1*100%) 27.059%/0.019607843137...` | CSS |
| `--opacity-teal-1-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-12` | `hsl(183.913 calc(1*100%) 27.059%/0.121568627450...` | CSS |
| `--opacity-teal-12-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-16` | `hsl(183.913 calc(1*100%) 27.059%/0.160784313725...` | CSS |
| `--opacity-teal-16-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-20` | `hsl(183.913 calc(1*100%) 27.059%/0.2)` | CSS |
| `--opacity-teal-20-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-24` | `hsl(183.913 calc(1*100%) 27.059%/0.239215686274...` | CSS |
| `--opacity-teal-24-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-28` | `hsl(183.913 calc(1*100%) 27.059%/0.278431372549...` | CSS |
| `--opacity-teal-28-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-32` | `hsl(183.913 calc(1*100%) 27.059%/0.321568627450...` | CSS |
| `--opacity-teal-32-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-36` | `hsl(183.913 calc(1*100%) 27.059%/0.360784313725...` | CSS |
| `--opacity-teal-36-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-4` | `hsl(183.913 calc(1*100%) 27.059%/0.039215686274...` | CSS |
| `--opacity-teal-4-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-40` | `hsl(183.913 calc(1*100%) 27.059%/0.4)` | CSS |
| `--opacity-teal-40-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-44` | `hsl(183.913 calc(1*100%) 27.059%/0.439215686274...` | CSS |
| `--opacity-teal-44-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-48` | `hsl(183.913 calc(1*100%) 27.059%/0.478431372549...` | CSS |
| `--opacity-teal-48-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-52` | `hsl(183.913 calc(1*100%) 27.059%/0.521568627450...` | CSS |
| `--opacity-teal-52-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-56` | `hsl(183.913 calc(1*100%) 27.059%/0.560784313725...` | CSS |
| `--opacity-teal-56-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-60` | `hsl(183.913 calc(1*100%) 27.059%/0.6)` | CSS |
| `--opacity-teal-60-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-64` | `hsl(183.913 calc(1*100%) 27.059%/0.639215686274...` | CSS |
| `--opacity-teal-64-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-68` | `hsl(183.913 calc(1*100%) 27.059%/0.678431372549...` | CSS |
| `--opacity-teal-68-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-72` | `hsl(183.913 calc(1*100%) 27.059%/0.721568627450...` | CSS |
| `--opacity-teal-72-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-76` | `hsl(183.913 calc(1*100%) 27.059%/0.760784313725...` | CSS |
| `--opacity-teal-76-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-8` | `hsl(183.913 calc(1*100%) 27.059%/0.078431372549...` | CSS |
| `--opacity-teal-8-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-80` | `hsl(183.913 calc(1*100%) 27.059%/0.8)` | CSS |
| `--opacity-teal-80-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-84` | `hsl(183.913 calc(1*100%) 27.059%/0.839215686274...` | CSS |
| `--opacity-teal-84-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-88` | `hsl(183.913 calc(1*100%) 27.059%/0.878431372549...` | CSS |
| `--opacity-teal-88-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-92` | `hsl(183.913 calc(1*100%) 27.059%/0.921568627450...` | CSS |
| `--opacity-teal-92-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--opacity-teal-96` | `hsl(183.913 calc(1*100%) 27.059%/0.960784313725...` | CSS |
| `--opacity-teal-96-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--role-dark-teal-hsl` | `168.108 calc(1*76.552%) 28.431%` | CSS |
| `--role-teal-hsl` | `168.148 calc(1*75.701%) 41.961%` | CSS |
| `--teal-100` | `hsl(184.364 calc(1*100%) 89.216%/1)` | CSS |
| `--teal-100-hsl` | `184.364 calc(1*100%) 89.216%` | CSS |
| `--teal-130` | `hsl(184.364 calc(1*100%) 89.216%/1)` | CSS |
| `--teal-130-hsl` | `184.364 calc(1*100%) 89.216%` | CSS |
| `--teal-160` | `hsl(186.316 calc(1*96.61%) 88.431%/1)` | CSS |
| `--teal-160-hsl` | `186.316 calc(1*96.61%) 88.431%` | CSS |
| `--teal-200` | `hsl(185.806 calc(1*73.81%) 83.529%/1)` | CSS |
| `--teal-200-hsl` | `185.806 calc(1*73.81%) 83.529%` | CSS |
| `--teal-230` | `hsl(185.217 calc(1*54.331%) 75.098%/1)` | CSS |
| `--teal-230-hsl` | `185.217 calc(1*54.331%) 75.098%` | CSS |
| `--teal-260` | `hsl(185.6 calc(1*47.771%) 69.216%/1)` | CSS |
| `--teal-260-hsl` | `185.6 calc(1*47.771%) 69.216%` | CSS |
| `--teal-300` | `hsl(185.926 calc(1*41.969%) 62.157%/1)` | CSS |
| `--teal-300-hsl` | `185.926 calc(1*41.969%) 62.157%` | CSS |
| `--teal-330` | `hsl(184.884 calc(1*38.393%) 56.078%/1)` | CSS |
| `--teal-330-hsl` | `184.884 calc(1*38.393%) 56.078%` | CSS |
| `--teal-345` | `hsl(185.275 calc(1*36.842%) 51.569%/1)` | CSS |
| `--teal-345-hsl` | `185.275 calc(1*36.842%) 51.569%` | CSS |
| `--teal-360` | `hsl(184.948 calc(1*41.991%) 45.294%/1)` | CSS |
| `--teal-360-hsl` | `184.948 calc(1*41.991%) 45.294%` | CSS |
| `--teal-400` | `hsl(184.909 calc(1*57.895%) 37.255%/1)` | CSS |
| `--teal-400-hsl` | `184.909 calc(1*57.895%) 37.255%` | CSS |
| `--teal-430` | `hsl(184.154 calc(1*95.588%) 26.667%/1)` | CSS |
| `--teal-430-hsl` | `184.154 calc(1*95.588%) 26.667%` | CSS |
| `--teal-460` | `hsl(184.779 calc(1*93.388%) 23.725%/1)` | CSS |
| `--teal-460-hsl` | `184.779 calc(1*93.388%) 23.725%` | CSS |
| `--teal-500` | `hsl(184.66 calc(1*98.095%) 20.588%/1)` | CSS |
| `--teal-500-hsl` | `184.66 calc(1*98.095%) 20.588%` | CSS |
| `--teal-530` | `hsl(185.275 calc(1*100%) 17.843%/1)` | CSS |
| `--teal-530-hsl` | `185.275 calc(1*100%) 17.843%` | CSS |
| `--teal-560` | `hsl(185.854 calc(1*100%) 16.078%/1)` | CSS |
| `--teal-560-hsl` | `185.854 calc(1*100%) 16.078%` | CSS |
| `--teal-600` | `hsl(185.833 calc(1*100%) 14.118%/1)` | CSS |
| `--teal-600-hsl` | `185.833 calc(1*100%) 14.118%` | CSS |
| `--teal-630` | `hsl(187.273 calc(1*100%) 12.941%/1)` | CSS |
| `--teal-630-hsl` | `187.273 calc(1*100%) 12.941%` | CSS |
| `--teal-660` | `hsl(188.136 calc(1*100%) 11.569%/1)` | CSS |
| `--teal-660-hsl` | `188.136 calc(1*100%) 11.569%` | CSS |
| `--teal-700` | `hsl(189.231 calc(1*100%) 10.196%/1)` | CSS |
| `--teal-700-hsl` | `189.231 calc(1*100%) 10.196%` | CSS |
| `--teal-730` | `hsl(190.435 calc(1*100%) 9.02%/1)` | CSS |
| `--teal-730-hsl` | `190.435 calc(1*100%) 9.02%` | CSS |
| `--teal-760` | `hsl(190.244 calc(1*100%) 8.039%/1)` | CSS |
| `--teal-760-hsl` | `190.244 calc(1*100%) 8.039%` | CSS |
| `--teal-800` | `hsl(192 calc(1*100%) 6.863%/1)` | CSS |
| `--teal-800-hsl` | `192 calc(1*100%) 6.863%` | CSS |
| `--teal-830` | `hsl(194.545 calc(1*100%) 6.471%/1)` | CSS |
| `--teal-830-hsl` | `194.545 calc(1*100%) 6.471%` | CSS |
| `--teal-860` | `hsl(195 calc(1*100%) 5.49%/1)` | CSS |
| `--teal-860-hsl` | `195 calc(1*100%) 5.49%` | CSS |
| `--teal-900` | `hsl(196.8 calc(1*100%) 4.902%/1)` | CSS |
| `--teal-900-hsl` | `196.8 calc(1*100%) 4.902%` | CSS |
| `--teal-new-1` | `hsl(184.364 calc(1*100%) 89.216%/1)` | CSS |
| `--teal-new-1-hsl` | `184.364 calc(1*100%) 89.216%` | CSS |
| `--teal-new-10` | `hsl(186.364 calc(1*61.111%) 78.824%/1)` | CSS |
| `--teal-new-10-hsl` | `186.364 calc(1*61.111%) 78.824%` | CSS |
| `--teal-new-100` | `hsl(207.273 calc(1*100%) 2.157%/1)` | CSS |
| `--teal-new-100-hsl` | `207.273 calc(1*100%) 2.157%` | CSS |
| `--teal-new-11` | `hsl(185.373 calc(1*58.261%) 77.451%/1)` | CSS |
| `--teal-new-11-hsl` | `185.373 calc(1*58.261%) 77.451%` | CSS |
| `--teal-new-12` | `hsl(186.176 calc(1*56.667%) 76.471%/1)` | CSS |
| `--teal-new-12-hsl` | `186.176 calc(1*56.667%) 76.471%` | CSS |
| `--teal-new-13` | `hsl(185.217 calc(1*54.331%) 75.098%/1)` | CSS |
| `--teal-new-13-hsl` | `185.217 calc(1*54.331%) 75.098%` | CSS |
| `--teal-new-14` | `hsl(185.915 calc(1*53.383%) 73.922%/1)` | CSS |
| `--teal-new-14-hsl` | `185.915 calc(1*53.383%) 73.922%` | CSS |
| `--teal-new-15` | `hsl(185.915 calc(1*51.079%) 72.745%/1)` | CSS |
| `--teal-new-15-hsl` | `185.915 calc(1*51.079%) 72.745%` | CSS |
| `--teal-new-16` | `hsl(185.753 calc(1*50.345%) 71.569%/1)` | CSS |
| `--teal-new-16-hsl` | `185.753 calc(1*50.345%) 71.569%` | CSS |
| `--teal-new-17` | `hsl(185.753 calc(1*48.344%) 70.392%/1)` | CSS |
| `--teal-new-17-hsl` | `185.753 calc(1*48.344%) 70.392%` | CSS |
| `--teal-new-18` | `hsl(185.6 calc(1*47.771%) 69.216%/1)` | CSS |
| `--teal-new-18-hsl` | `185.6 calc(1*47.771%) 69.216%` | CSS |
| `--teal-new-19` | `hsl(185.6 calc(1*46.012%) 68.039%/1)` | CSS |
| `--teal-new-19-hsl` | `185.6 calc(1*46.012%) 68.039%` | CSS |
| `--teal-new-2` | `hsl(186.316 calc(1*96.61%) 88.431%/1)` | CSS |
| `--teal-new-2-hsl` | `186.316 calc(1*96.61%) 88.431%` | CSS |
| `--teal-new-20` | `hsl(185.455 calc(1*45.562%) 66.863%/1)` | CSS |
| `--teal-new-20-hsl` | `185.455 calc(1*45.562%) 66.863%` | CSS |
| `--teal-new-21` | `hsl(185.455 calc(1*44%) 65.686%/1)` | CSS |
| `--teal-new-21-hsl` | `185.455 calc(1*44%) 65.686%` | CSS |
| `--teal-new-22` | `hsl(186.076 calc(1*43.646%) 64.51%/1)` | CSS |
| `--teal-new-22-hsl` | `186.076 calc(1*43.646%) 64.51%` | CSS |
| `--teal-new-23` | `hsl(185.316 calc(1*42.246%) 63.333%/1)` | CSS |
| `--teal-new-23-hsl` | `185.316 calc(1*42.246%) 63.333%` | CSS |
| `--teal-new-24` | `hsl(185.926 calc(1*41.969%) 62.157%/1)` | CSS |
| `--teal-new-24-hsl` | `185.926 calc(1*41.969%) 62.157%` | CSS |
| `--teal-new-25` | `hsl(185.185 calc(1*40.704%) 60.98%/1)` | CSS |
| `--teal-new-25-hsl` | `185.185 calc(1*40.704%) 60.98%` | CSS |
| `--teal-new-26` | `hsl(185.783 calc(1*40.488%) 59.804%/1)` | CSS |
| `--teal-new-26-hsl` | `185.783 calc(1*40.488%) 59.804%` | CSS |
| `--teal-new-27` | `hsl(185.06 calc(1*39.336%) 58.627%/1)` | CSS |
| `--teal-new-27-hsl` | `185.06 calc(1*39.336%) 58.627%` | CSS |
| `--teal-new-28` | `hsl(185.647 calc(1*39.171%) 57.451%/1)` | CSS |
| `--teal-new-28-hsl` | `185.647 calc(1*39.171%) 57.451%` | CSS |
| `--teal-new-29` | `hsl(184.884 calc(1*38.393%) 56.078%/1)` | CSS |
| `--teal-new-29-hsl` | `184.884 calc(1*38.393%) 56.078%` | CSS |
| `--teal-new-3` | `hsl(185.172 calc(1*87.879%) 87.059%/1)` | CSS |
| `--teal-new-3-hsl` | `185.172 calc(1*87.879%) 87.059%` | CSS |
| `--teal-new-30` | `hsl(185.517 calc(1*37.991%) 55.098%/1)` | CSS |
| `--teal-new-30-hsl` | `185.517 calc(1*37.991%) 55.098%` | CSS |
| `--teal-new-31` | `hsl(184.773 calc(1*37.288%) 53.725%/1)` | CSS |
| `--teal-new-31-hsl` | `184.773 calc(1*37.288%) 53.725%` | CSS |
| `--teal-new-32` | `hsl(185.393 calc(1*36.929%) 52.745%/1)` | CSS |
| `--teal-new-32-hsl` | `185.393 calc(1*36.929%) 52.745%` | CSS |
| `--teal-new-33` | `hsl(185.275 calc(1*36.842%) 51.569%/1)` | CSS |
| `--teal-new-33-hsl` | `185.275 calc(1*36.842%) 51.569%` | CSS |
| `--teal-new-34` | `hsl(185.217 calc(1*36.22%) 50.196%/1)` | CSS |
| `--teal-new-34-hsl` | `185.217 calc(1*36.22%) 50.196%` | CSS |
| `--teal-new-35` | `hsl(185.745 calc(1*37.6%) 49.02%/1)` | CSS |
| `--teal-new-35-hsl` | `185.745 calc(1*37.6%) 49.02%` | CSS |
| `--teal-new-36` | `hsl(185.106 calc(1*38.525%) 47.843%/1)` | CSS |
| `--teal-new-36-hsl` | `185.106 calc(1*38.525%) 47.843%` | CSS |
| `--teal-new-37` | `hsl(185 calc(1*40.336%) 46.667%/1)` | CSS |
| `--teal-new-37-hsl` | `185 calc(1*40.336%) 46.667%` | CSS |
| `--teal-new-38` | `hsl(184.948 calc(1*41.991%) 45.294%/1)` | CSS |
| `--teal-new-38-hsl` | `184.948 calc(1*41.991%) 45.294%` | CSS |
| `--teal-new-39` | `hsl(184.848 calc(1*44%) 44.118%/1)` | CSS |
| `--teal-new-39-hsl` | `184.848 calc(1*44%) 44.118%` | CSS |
| `--teal-new-4` | `hsl(186 calc(1*83.333%) 85.882%/1)` | CSS |
| `--teal-new-4-hsl` | `186 calc(1*83.333%) 85.882%` | CSS |
| `--teal-new-40` | `hsl(185.347 calc(1*46.119%) 42.941%/1)` | CSS |
| `--teal-new-40-hsl` | `185.347 calc(1*46.119%) 42.941%` | CSS |
| `--teal-new-41` | `hsl(184.66 calc(1*48.815%) 41.373%/1)` | CSS |
| `--teal-new-41-hsl` | `184.66 calc(1*48.815%) 41.373%` | CSS |
| `--teal-new-42` | `hsl(185.143 calc(1*51.22%) 40.196%/1)` | CSS |
| `--teal-new-42-hsl` | `185.143 calc(1*51.22%) 40.196%` | CSS |
| `--teal-new-43` | `hsl(184.486 calc(1*54.315%) 38.627%/1)` | CSS |
| `--teal-new-43-hsl` | `184.486 calc(1*54.315%) 38.627%` | CSS |
| `--teal-new-44` | `hsl(184.909 calc(1*57.895%) 37.255%/1)` | CSS |
| `--teal-new-44-hsl` | `184.909 calc(1*57.895%) 37.255%` | CSS |
| `--teal-new-45` | `hsl(184.779 calc(1*61.749%) 35.882%/1)` | CSS |
| `--teal-new-45-hsl` | `184.779 calc(1*61.749%) 35.882%` | CSS |
| `--teal-new-46` | `hsl(184.655 calc(1*66.667%) 34.118%/1)` | CSS |
| `--teal-new-46-hsl` | `184.655 calc(1*66.667%) 34.118%` | CSS |
| `--teal-new-47` | `hsl(184.463 calc(1*73.333%) 32.353%/1)` | CSS |
| `--teal-new-47-hsl` | `184.463 calc(1*73.333%) 32.353%` | CSS |
| `--teal-new-48` | `hsl(184.219 calc(1*84.211%) 29.804%/1)` | CSS |
| `--teal-new-48-hsl` | `184.219 calc(1*84.211%) 29.804%` | CSS |
| `--teal-new-49` | `hsl(183.913 calc(1*100%) 27.059%/1)` | CSS |
| `--teal-new-49-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--teal-new-5` | `hsl(186 calc(1*76.923%) 84.706%/1)` | CSS |
| `--teal-new-5-hsl` | `186 calc(1*76.923%) 84.706%` | CSS |
| `--teal-new-50` | `hsl(183.913 calc(1*100%) 27.059%/1)` | CSS |
| `--teal-new-50-hsl` | `183.913 calc(1*100%) 27.059%` | CSS |
| `--teal-new-51` | `hsl(184.06 calc(1*97.08%) 26.863%/1)` | CSS |
| `--teal-new-51-hsl` | `184.06 calc(1*97.08%) 26.863%` | CSS |
| `--teal-new-52` | `hsl(184.154 calc(1*95.588%) 26.667%/1)` | CSS |
| `--teal-new-52-hsl` | `184.154 calc(1*95.588%) 26.667%` | CSS |
| `--teal-new-53` | `hsl(184.286 calc(1*94.03%) 26.275%/1)` | CSS |
| `--teal-new-53-hsl` | `184.286 calc(1*94.03%) 26.275%` | CSS |
| `--teal-new-54` | `hsl(184.39 calc(1*93.893%) 25.686%/1)` | CSS |
| `--teal-new-54-hsl` | `184.39 calc(1*93.893%) 25.686%` | CSS |
| `--teal-new-55` | `hsl(184.034 calc(1*92.248%) 25.294%/1)` | CSS |
| `--teal-new-55-hsl` | `184.034 calc(1*92.248%) 25.294%` | CSS |
| `--teal-new-56` | `hsl(184.615 calc(1*92.126%) 24.902%/1)` | CSS |
| `--teal-new-56-hsl` | `184.615 calc(1*92.126%) 24.902%` | CSS |
| `--teal-new-57` | `hsl(184.211 calc(1*91.935%) 24.314%/1)` | CSS |
| `--teal-new-57-hsl` | `184.211 calc(1*91.935%) 24.314%` | CSS |
| `--teal-new-58` | `hsl(184.779 calc(1*93.388%) 23.725%/1)` | CSS |
| `--teal-new-58-hsl` | `184.779 calc(1*93.388%) 23.725%` | CSS |
| `--teal-new-59` | `hsl(184.364 calc(1*93.22%) 23.137%/1)` | CSS |
| `--teal-new-59-hsl` | `184.364 calc(1*93.22%) 23.137%` | CSS |
| `--teal-new-6` | `hsl(185.806 calc(1*73.81%) 83.529%/1)` | CSS |
| `--teal-new-6-hsl` | `185.806 calc(1*73.81%) 83.529%` | CSS |
| `--teal-new-60` | `hsl(184.444 calc(1*94.737%) 22.353%/1)` | CSS |
| `--teal-new-60-hsl` | `184.444 calc(1*94.737%) 22.353%` | CSS |
| `--teal-new-61` | `hsl(184.486 calc(1*96.396%) 21.765%/1)` | CSS |
| `--teal-new-61-hsl` | `184.486 calc(1*96.396%) 21.765%` | CSS |
| `--teal-new-62` | `hsl(184.571 calc(1*98.131%) 20.98%/1)` | CSS |
| `--teal-new-62-hsl` | `184.571 calc(1*98.131%) 20.98%` | CSS |
| `--teal-new-63` | `hsl(184.66 calc(1*98.095%) 20.588%/1)` | CSS |
| `--teal-new-63-hsl` | `184.66 calc(1*98.095%) 20.588%` | CSS |
| `--teal-new-64` | `hsl(184.752 calc(1*100%) 19.804%/1)` | CSS |
| `--teal-new-64-hsl` | `184.752 calc(1*100%) 19.804%` | CSS |
| `--teal-new-65` | `hsl(184.848 calc(1*100%) 19.412%/1)` | CSS |
| `--teal-new-65-hsl` | `184.848 calc(1*100%) 19.412%` | CSS |
| `--teal-new-66` | `hsl(185 calc(1*100%) 18.824%/1)` | CSS |
| `--teal-new-66-hsl` | `185 calc(1*100%) 18.824%` | CSS |
| `--teal-new-67` | `hsl(185.106 calc(1*100%) 18.431%/1)` | CSS |
| `--teal-new-67-hsl` | `185.106 calc(1*100%) 18.431%` | CSS |
| `--teal-new-68` | `hsl(185.275 calc(1*100%) 17.843%/1)` | CSS |
| `--teal-new-68-hsl` | `185.275 calc(1*100%) 17.843%` | CSS |
| `--teal-new-69` | `hsl(185.393 calc(1*100%) 17.451%/1)` | CSS |
| `--teal-new-69-hsl` | `185.393 calc(1*100%) 17.451%` | CSS |
| `--teal-new-7` | `hsl(185.806 calc(1*68.889%) 82.353%/1)` | CSS |
| `--teal-new-7-hsl` | `185.806 calc(1*68.889%) 82.353%` | CSS |
| `--teal-new-70` | `hsl(185.517 calc(1*100%) 17.059%/1)` | CSS |
| `--teal-new-70-hsl` | `185.517 calc(1*100%) 17.059%` | CSS |
| `--teal-new-71` | `hsl(185.714 calc(1*100%) 16.471%/1)` | CSS |
| `--teal-new-71-hsl` | `185.714 calc(1*100%) 16.471%` | CSS |
| `--teal-new-72` | `hsl(185.854 calc(1*100%) 16.078%/1)` | CSS |
| `--teal-new-72-hsl` | `185.854 calc(1*100%) 16.078%` | CSS |
| `--teal-new-73` | `hsl(186.076 calc(1*100%) 15.49%/1)` | CSS |
| `--teal-new-73-hsl` | `186.076 calc(1*100%) 15.49%` | CSS |
| `--teal-new-74` | `hsl(186.234 calc(1*100%) 15.098%/1)` | CSS |
| `--teal-new-74-hsl` | `186.234 calc(1*100%) 15.098%` | CSS |
| `--teal-new-75` | `hsl(186.4 calc(1*100%) 14.706%/1)` | CSS |
| `--teal-new-75-hsl` | `186.4 calc(1*100%) 14.706%` | CSS |
| `--teal-new-76` | `hsl(185.833 calc(1*100%) 14.118%/1)` | CSS |
| `--teal-new-76-hsl` | `185.833 calc(1*100%) 14.118%` | CSS |
| `--teal-new-77` | `hsl(186.857 calc(1*100%) 13.725%/1)` | CSS |
| `--teal-new-77-hsl` | `186.857 calc(1*100%) 13.725%` | CSS |
| `--teal-new-78` | `hsl(187.059 calc(1*100%) 13.333%/1)` | CSS |
| `--teal-new-78-hsl` | `187.059 calc(1*100%) 13.333%` | CSS |
| `--teal-new-79` | `hsl(187.273 calc(1*100%) 12.941%/1)` | CSS |
| `--teal-new-79-hsl` | `187.273 calc(1*100%) 12.941%` | CSS |
| `--teal-new-8` | `hsl(185.625 calc(1*66.667%) 81.176%/1)` | CSS |
| `--teal-new-8-hsl` | `185.625 calc(1*66.667%) 81.176%` | CSS |
| `--teal-new-80` | `hsl(187.619 calc(1*100%) 12.353%/1)` | CSS |
| `--teal-new-80-hsl` | `187.619 calc(1*100%) 12.353%` | CSS |
| `--teal-new-81` | `hsl(187.869 calc(1*100%) 11.961%/1)` | CSS |
| `--teal-new-81-hsl` | `187.869 calc(1*100%) 11.961%` | CSS |
| `--teal-new-82` | `hsl(188.136 calc(1*100%) 11.569%/1)` | CSS |
| `--teal-new-82-hsl` | `188.136 calc(1*100%) 11.569%` | CSS |
| `--teal-new-83` | `hsl(188.421 calc(1*100%) 11.176%/1)` | CSS |
| `--teal-new-83-hsl` | `188.421 calc(1*100%) 11.176%` | CSS |
| `--teal-new-84` | `hsl(187.778 calc(1*100%) 10.588%/1)` | CSS |
| `--teal-new-84-hsl` | `187.778 calc(1*100%) 10.588%` | CSS |
| `--teal-new-85` | `hsl(189.231 calc(1*100%) 10.196%/1)` | CSS |
| `--teal-new-85-hsl` | `189.231 calc(1*100%) 10.196%` | CSS |
| `--teal-new-86` | `hsl(189.6 calc(1*100%) 9.804%/1)` | CSS |
| `--teal-new-86-hsl` | `189.6 calc(1*100%) 9.804%` | CSS |
| `--teal-new-87` | `hsl(190 calc(1*100%) 9.412%/1)` | CSS |
| `--teal-new-87-hsl` | `190 calc(1*100%) 9.412%` | CSS |
| `--teal-new-88` | `hsl(190.435 calc(1*100%) 9.02%/1)` | CSS |
| `--teal-new-88-hsl` | `190.435 calc(1*100%) 9.02%` | CSS |
| `--teal-new-89` | `hsl(190.909 calc(1*100%) 8.627%/1)` | CSS |
| `--teal-new-89-hsl` | `190.909 calc(1*100%) 8.627%` | CSS |
| `--teal-new-9` | `hsl(185.538 calc(1*63.107%) 79.804%/1)` | CSS |
| `--teal-new-9-hsl` | `185.538 calc(1*63.107%) 79.804%` | CSS |
| `--teal-new-90` | `hsl(190.244 calc(1*100%) 8.039%/1)` | CSS |
| `--teal-new-90-hsl` | `190.244 calc(1*100%) 8.039%` | CSS |
| `--teal-new-91` | `hsl(190.769 calc(1*100%) 7.647%/1)` | CSS |
| `--teal-new-91-hsl` | `190.769 calc(1*100%) 7.647%` | CSS |
| `--teal-new-92` | `hsl(191.351 calc(1*100%) 7.255%/1)` | CSS |
| `--teal-new-92-hsl` | `191.351 calc(1*100%) 7.255%` | CSS |
| `--teal-new-93` | `hsl(192 calc(1*100%) 6.863%/1)` | CSS |
| `--teal-new-93-hsl` | `192 calc(1*100%) 6.863%` | CSS |
| `--teal-new-94` | `hsl(194.545 calc(1*100%) 6.471%/1)` | CSS |
| `--teal-new-94-hsl` | `194.545 calc(1*100%) 6.471%` | CSS |
| `--teal-new-95` | `hsl(195.484 calc(1*100%) 6.078%/1)` | CSS |
| `--teal-new-95-hsl` | `195.484 calc(1*100%) 6.078%` | CSS |
| `--teal-new-96` | `hsl(195 calc(1*100%) 5.49%/1)` | CSS |
| `--teal-new-96-hsl` | `195 calc(1*100%) 5.49%` | CSS |
| `--teal-new-97` | `hsl(196.8 calc(1*100%) 4.902%/1)` | CSS |
| `--teal-new-97-hsl` | `196.8 calc(1*100%) 4.902%` | CSS |
| `--teal-new-98` | `hsl(200 calc(1*100%) 4.118%/1)` | CSS |
| `--teal-new-98-hsl` | `200 calc(1*100%) 4.118%` | CSS |
| `--teal-new-99` | `hsl(204.706 calc(1*100%) 3.333%/1)` | CSS |
| `--teal-new-99-hsl` | `204.706 calc(1*100%) 3.333%` | CSS |
| `OPACITY_TEAL_1` | `#00818a05` | JS |
| `OPACITY_TEAL_12` | `#00818a1f` | JS |
| `OPACITY_TEAL_16` | `#00818a29` | JS |
| `OPACITY_TEAL_20` | `#00818a33` | JS |
| `OPACITY_TEAL_24` | `#00818a3d` | JS |
| `OPACITY_TEAL_28` | `#00818a47` | JS |
| `OPACITY_TEAL_32` | `#00818a52` | JS |
| `OPACITY_TEAL_36` | `#00818a5c` | JS |
| `OPACITY_TEAL_4` | `#00818a0a` | JS |
| `OPACITY_TEAL_40` | `#00818a66` | JS |
| `OPACITY_TEAL_44` | `#00818a70` | JS |
| `OPACITY_TEAL_48` | `#00818a7a` | JS |
| `OPACITY_TEAL_52` | `#00818a85` | JS |
| `OPACITY_TEAL_56` | `#00818a8f` | JS |
| `OPACITY_TEAL_60` | `#00818a99` | JS |
| `OPACITY_TEAL_64` | `#00818aa3` | JS |
| `OPACITY_TEAL_68` | `#00818aad` | JS |
| `OPACITY_TEAL_72` | `#00818ab8` | JS |
| `OPACITY_TEAL_76` | `#00818ac2` | JS |
| `OPACITY_TEAL_8` | `#00818a14` | JS |
| `OPACITY_TEAL_80` | `#00818acc` | JS |
| `OPACITY_TEAL_84` | `#00818ad6` | JS |
| `OPACITY_TEAL_88` | `#00818ae0` | JS |
| `OPACITY_TEAL_92` | `#00818aeb` | JS |
| `OPACITY_TEAL_96` | `#00818af5` | JS |
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
| `TEAL_NEW_1` | `#c8fbff` | JS |
| `TEAL_NEW_10` | `#a8e3ea` | JS |
| `TEAL_NEW_100` | `#00060b` | JS |
| `TEAL_NEW_11` | `#a4e1e7` | JS |
| `TEAL_NEW_12` | `#a1dee5` | JS |
| `TEAL_NEW_13` | `#9ddce2` | JS |
| `TEAL_NEW_14` | `#99d9e0` | JS |
| `TEAL_NEW_15` | `#96d6dd` | JS |
| `TEAL_NEW_16` | `#92d4db` | JS |
| `TEAL_NEW_17` | `#8fd1d8` | JS |
| `TEAL_NEW_18` | `#8bcfd6` | JS |
| `TEAL_NEW_19` | `#88ccd3` | JS |
| `TEAL_NEW_2` | `#c5f8fe` | JS |
| `TEAL_NEW_20` | `#84cad1` | JS |
| `TEAL_NEW_21` | `#81c7ce` | JS |
| `TEAL_NEW_22` | `#7dc4cc` | JS |
| `TEAL_NEW_23` | `#7ac2c9` | JS |
| `TEAL_NEW_24` | `#76bfc7` | JS |
| `TEAL_NEW_25` | `#73bdc4` | JS |
| `TEAL_NEW_26` | `#6fbac2` | JS |
| `TEAL_NEW_27` | `#6cb8bf` | JS |
| `TEAL_NEW_28` | `#68b5bd` | JS |
| `TEAL_NEW_29` | `#64b3ba` | JS |
| `TEAL_NEW_3` | `#c1f6fb` | JS |
| `TEAL_NEW_30` | `#61b0b8` | JS |
| `TEAL_NEW_31` | `#5daeb5` | JS |
| `TEAL_NEW_32` | `#5aabb3` | JS |
| `TEAL_NEW_33` | `#56a9b1` | JS |
| `TEAL_NEW_34` | `#52a6ae` | JS |
| `TEAL_NEW_35` | `#4ea3ac` | JS |
| `TEAL_NEW_36` | `#4ba1a9` | JS |
| `TEAL_NEW_37` | `#479fa7` | JS |
| `TEAL_NEW_38` | `#439ca4` | JS |
| `TEAL_NEW_39` | `#3f9aa2` | JS |
| `TEAL_NEW_4` | `#bdf3f9` | JS |
| `TEAL_NEW_40` | `#3b97a0` | JS |
| `TEAL_NEW_41` | `#36959d` | JS |
| `TEAL_NEW_42` | `#32929b` | JS |
| `TEAL_NEW_43` | `#2d9098` | JS |
| `TEAL_NEW_44` | `#288d96` | JS |
| `TEAL_NEW_45` | `#238b94` | JS |
| `TEAL_NEW_46` | `#1d8891` | JS |
| `TEAL_NEW_47` | `#16868f` | JS |
| `TEAL_NEW_48` | `#0c838c` | JS |
| `TEAL_NEW_49` | `#00818a` | JS |
| `TEAL_NEW_5` | `#baf0f6` | JS |
| `TEAL_NEW_50` | `#00818a` | JS |
| `TEAL_NEW_51` | `#027e87` | JS |
| `TEAL_NEW_52` | `#037c85` | JS |
| `TEAL_NEW_53` | `#047982` | JS |
| `TEAL_NEW_54` | `#04767f` | JS |
| `TEAL_NEW_55` | `#05747c` | JS |
| `TEAL_NEW_56` | `#05717a` | JS |
| `TEAL_NEW_57` | `#056f77` | JS |
| `TEAL_NEW_58` | `#046c75` | JS |
| `TEAL_NEW_59` | `#046a72` | JS |
| `TEAL_NEW_6` | `#b6eef4` | JS |
| `TEAL_NEW_60` | `#03676f` | JS |
| `TEAL_NEW_61` | `#02656d` | JS |
| `TEAL_NEW_62` | `#01626a` | JS |
| `TEAL_NEW_63` | `#016068` | JS |
| `TEAL_NEW_64` | `#005d65` | JS |
| `TEAL_NEW_65` | `#005b63` | JS |
| `TEAL_NEW_66` | `#005860` | JS |
| `TEAL_NEW_67` | `#00565e` | JS |
| `TEAL_NEW_68` | `#00535b` | JS |
| `TEAL_NEW_69` | `#005159` | JS |
| `TEAL_NEW_7` | `#b3ebf1` | JS |
| `TEAL_NEW_70` | `#004f57` | JS |
| `TEAL_NEW_71` | `#004c54` | JS |
| `TEAL_NEW_72` | `#004a52` | JS |
| `TEAL_NEW_73` | `#00474f` | JS |
| `TEAL_NEW_74` | `#00454d` | JS |
| `TEAL_NEW_75` | `#00434b` | JS |
| `TEAL_NEW_76` | `#004148` | JS |
| `TEAL_NEW_77` | `#003e46` | JS |
| `TEAL_NEW_78` | `#003c44` | JS |
| `TEAL_NEW_79` | `#003a42` | JS |
| `TEAL_NEW_8` | `#afe9ef` | JS |
| `TEAL_NEW_80` | `#00373f` | JS |
| `TEAL_NEW_81` | `#00353d` | JS |
| `TEAL_NEW_82` | `#00333b` | JS |
| `TEAL_NEW_83` | `#003139` | JS |
| `TEAL_NEW_84` | `#002f36` | JS |
| `TEAL_NEW_85` | `#002c34` | JS |
| `TEAL_NEW_86` | `#002a32` | JS |
| `TEAL_NEW_87` | `#002830` | JS |
| `TEAL_NEW_88` | `#00262e` | JS |
| `TEAL_NEW_89` | `#00242c` | JS |
| `TEAL_NEW_9` | `#abe6ec` | JS |
| `TEAL_NEW_90` | `#002229` | JS |
| `TEAL_NEW_91` | `#002027` | JS |
| `TEAL_NEW_92` | `#001e25` | JS |
| `TEAL_NEW_93` | `#001c23` | JS |
| `TEAL_NEW_94` | `#001921` | JS |
| `TEAL_NEW_95` | `#00171f` | JS |
| `TEAL_NEW_96` | `#00151c` | JS |
| `TEAL_NEW_97` | `#001219` | JS |
| `TEAL_NEW_98` | `#000e15` | JS |
| `TEAL_NEW_99` | `#000a11` | JS |

*Total: 455 variables*

---

## Colors - Neutral

| Variable | Value | Type |
|----------|-------|------|
| `--neutral-1` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--neutral-1-hsl` | `0 calc(1*0%) 100%` | CSS |
| `--neutral-10` | `hsl(225 calc(1*5.882%) 86.667%/1)` | CSS |
| `--neutral-10-hsl` | `225 calc(1*5.882%) 86.667%` | CSS |
| `--neutral-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--neutral-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--neutral-11` | `hsl(225 calc(1*5.263%) 85.098%/1)` | CSS |
| `--neutral-11-hsl` | `225 calc(1*5.263%) 85.098%` | CSS |
| `--neutral-12` | `hsl(225 calc(1*4.762%) 83.529%/1)` | CSS |
| `--neutral-12-hsl` | `225 calc(1*4.762%) 83.529%` | CSS |
| `--neutral-13` | `hsl(240 calc(1*4.444%) 82.353%/1)` | CSS |
| `--neutral-13-hsl` | `240 calc(1*4.444%) 82.353%` | CSS |
| `--neutral-14` | `hsl(240 calc(1*4.082%) 80.784%/1)` | CSS |
| `--neutral-14-hsl` | `240 calc(1*4.082%) 80.784%` | CSS |
| `--neutral-15` | `hsl(240 calc(1*4.762%) 79.412%/1)` | CSS |
| `--neutral-15-hsl` | `240 calc(1*4.762%) 79.412%` | CSS |
| `--neutral-16` | `hsl(228 calc(1*4.425%) 77.843%/1)` | CSS |
| `--neutral-16-hsl` | `228 calc(1*4.425%) 77.843%` | CSS |
| `--neutral-17` | `hsl(230 calc(1*5%) 76.471%/1)` | CSS |
| `--neutral-17-hsl` | `230 calc(1*5%) 76.471%` | CSS |
| `--neutral-18` | `hsl(230 calc(1*4.687%) 74.902%/1)` | CSS |
| `--neutral-18-hsl` | `230 calc(1*4.687%) 74.902%` | CSS |
| `--neutral-19` | `hsl(240 calc(1*4.478%) 73.725%/1)` | CSS |
| `--neutral-19-hsl` | `240 calc(1*4.478%) 73.725%` | CSS |
| `--neutral-2` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--neutral-2-hsl` | `0 calc(1*0%) 98.431%` | CSS |
| `--neutral-20` | `hsl(230 calc(1*4.225%) 72.157%/1)` | CSS |
| `--neutral-20-hsl` | `230 calc(1*4.225%) 72.157%` | CSS |
| `--neutral-21` | `hsl(231.429 calc(1*4.698%) 70.784%/1)` | CSS |
| `--neutral-21-hsl` | `231.429 calc(1*4.698%) 70.784%` | CSS |
| `--neutral-22` | `hsl(231.429 calc(1*4.459%) 69.216%/1)` | CSS |
| `--neutral-22-hsl` | `231.429 calc(1*4.459%) 69.216%` | CSS |
| `--neutral-23` | `hsl(240 calc(1*4.294%) 68.039%/1)` | CSS |
| `--neutral-23-hsl` | `240 calc(1*4.294%) 68.039%` | CSS |
| `--neutral-24` | `hsl(231.429 calc(1*4.094%) 66.471%/1)` | CSS |
| `--neutral-24-hsl` | `231.429 calc(1*4.094%) 66.471%` | CSS |
| `--neutral-25` | `hsl(232.5 calc(1*4.494%) 65.098%/1)` | CSS |
| `--neutral-25-hsl` | `232.5 calc(1*4.494%) 65.098%` | CSS |
| `--neutral-26` | `hsl(240 calc(1*3.784%) 63.725%/1)` | CSS |
| `--neutral-26-hsl` | `240 calc(1*3.784%) 63.725%` | CSS |
| `--neutral-27` | `hsl(232.5 calc(1*4.167%) 62.353%/1)` | CSS |
| `--neutral-27-hsl` | `232.5 calc(1*4.167%) 62.353%` | CSS |
| `--neutral-28` | `hsl(232.5 calc(1*4%) 60.784%/1)` | CSS |
| `--neutral-28-hsl` | `232.5 calc(1*4%) 60.784%` | CSS |
| `--neutral-29` | `hsl(232.5 calc(1*3.883%) 59.608%/1)` | CSS |
| `--neutral-29-hsl` | `232.5 calc(1*3.883%) 59.608%` | CSS |
| `--neutral-3` | `hsl(240 calc(1*6.667%) 97.059%/1)` | CSS |
| `--neutral-3-hsl` | `240 calc(1*6.667%) 97.059%` | CSS |
| `--neutral-30` | `hsl(233.333 calc(1*4.225%) 58.235%/1)` | CSS |
| `--neutral-30-hsl` | `233.333 calc(1*4.225%) 58.235%` | CSS |
| `--neutral-31` | `hsl(233.333 calc(1*4.072%) 56.667%/1)` | CSS |
| `--neutral-31-hsl` | `233.333 calc(1*4.072%) 56.667%` | CSS |
| `--neutral-32` | `hsl(233.333 calc(1*3.965%) 55.49%/1)` | CSS |
| `--neutral-32-hsl` | `233.333 calc(1*3.965%) 55.49%` | CSS |
| `--neutral-33` | `hsl(233.333 calc(1*3.83%) 53.922%/1)` | CSS |
| `--neutral-33-hsl` | `233.333 calc(1*3.83%) 53.922%` | CSS |
| `--neutral-34` | `hsl(233.333 calc(1*3.734%) 52.745%/1)` | CSS |
| `--neutral-34-hsl` | `233.333 calc(1*3.734%) 52.745%` | CSS |
| `--neutral-35` | `hsl(234 calc(1*4.032%) 51.373%/1)` | CSS |
| `--neutral-35-hsl` | `234 calc(1*4.032%) 51.373%` | CSS |
| `--neutral-36` | `hsl(233.333 calc(1*3.529%) 50%/1)` | CSS |
| `--neutral-36-hsl` | `233.333 calc(1*3.529%) 50%` | CSS |
| `--neutral-37` | `hsl(234 calc(1*4.032%) 48.627%/1)` | CSS |
| `--neutral-37-hsl` | `234 calc(1*4.032%) 48.627%` | CSS |
| `--neutral-38` | `hsl(234 calc(1*4.132%) 47.451%/1)` | CSS |
| `--neutral-38-hsl` | `234 calc(1*4.132%) 47.451%` | CSS |
| `--neutral-39` | `hsl(234 calc(1*4.274%) 45.882%/1)` | CSS |
| `--neutral-39-hsl` | `234 calc(1*4.274%) 45.882%` | CSS |
| `--neutral-4` | `hsl(240 calc(1*4.348%) 95.49%/1)` | CSS |
| `--neutral-4-hsl` | `240 calc(1*4.348%) 95.49%` | CSS |
| `--neutral-40` | `hsl(234 calc(1*4.386%) 44.706%/1)` | CSS |
| `--neutral-40-hsl` | `234 calc(1*4.386%) 44.706%` | CSS |
| `--neutral-41` | `hsl(234 calc(1*4.505%) 43.529%/1)` | CSS |
| `--neutral-41-hsl` | `234 calc(1*4.505%) 43.529%` | CSS |
| `--neutral-42` | `hsl(234.545 calc(1*5.116%) 42.157%/1)` | CSS |
| `--neutral-42-hsl` | `234.545 calc(1*5.116%) 42.157%` | CSS |
| `--neutral-43` | `hsl(234 calc(1*4.808%) 40.784%/1)` | CSS |
| `--neutral-43-hsl` | `234 calc(1*4.808%) 40.784%` | CSS |
| `--neutral-44` | `hsl(234.545 calc(1*5.473%) 39.412%/1)` | CSS |
| `--neutral-44-hsl` | `234.545 calc(1*5.473%) 39.412%` | CSS |
| `--neutral-45` | `hsl(234.545 calc(1*5.641%) 38.235%/1)` | CSS |
| `--neutral-45-hsl` | `234.545 calc(1*5.641%) 38.235%` | CSS |
| `--neutral-46` | `hsl(234.545 calc(1*5.82%) 37.059%/1)` | CSS |
| `--neutral-46-hsl` | `234.545 calc(1*5.82%) 37.059%` | CSS |
| `--neutral-47` | `hsl(229.091 calc(1*6.077%) 35.49%/1)` | CSS |
| `--neutral-47-hsl` | `229.091 calc(1*6.077%) 35.49%` | CSS |
| `--neutral-48` | `hsl(234.545 calc(1*6.286%) 34.314%/1)` | CSS |
| `--neutral-48-hsl` | `234.545 calc(1*6.286%) 34.314%` | CSS |
| `--neutral-49` | `hsl(234.545 calc(1*6.509%) 33.137%/1)` | CSS |
| `--neutral-49-hsl` | `234.545 calc(1*6.509%) 33.137%` | CSS |
| `--neutral-5` | `hsl(240 calc(1*3.226%) 93.922%/1)` | CSS |
| `--neutral-5-hsl` | `240 calc(1*3.226%) 93.922%` | CSS |
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
| `--neutral-6` | `hsl(240 calc(1*5.263%) 92.549%/1)` | CSS |
| `--neutral-6-hsl` | `240 calc(1*5.263%) 92.549%` | CSS |
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
| `--neutral-7` | `hsl(240 calc(1*4.348%) 90.98%/1)` | CSS |
| `--neutral-7-hsl` | `240 calc(1*4.348%) 90.98%` | CSS |
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
| `--neutral-8` | `hsl(240 calc(1*5.66%) 89.608%/1)` | CSS |
| `--neutral-8-hsl` | `240 calc(1*5.66%) 89.608%` | CSS |
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
| `--neutral-9` | `hsl(220 calc(1*4.918%) 88.039%/1)` | CSS |
| `--neutral-9-hsl` | `220 calc(1*4.918%) 88.039%` | CSS |
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
| `NEUTRAL_10` | `#dbdcdf` | JS |
| `NEUTRAL_100` | `#000000` | JS |
| `NEUTRAL_11` | `#d7d8db` | JS |
| `NEUTRAL_12` | `#d3d4d7` | JS |
| `NEUTRAL_13` | `#d0d0d4` | JS |
| `NEUTRAL_14` | `#ccccd0` | JS |
| `NEUTRAL_15` | `#c8c8cd` | JS |
| `NEUTRAL_16` | `#c4c5c9` | JS |
| `NEUTRAL_17` | `#c0c1c6` | JS |
| `NEUTRAL_18` | `#bcbdc2` | JS |
| `NEUTRAL_19` | `#b9b9bf` | JS |
| `NEUTRAL_2` | `#fbfbfb` | JS |
| `NEUTRAL_20` | `#b5b6bb` | JS |
| `NEUTRAL_21` | `#b1b2b8` | JS |
| `NEUTRAL_22` | `#adaeb4` | JS |
| `NEUTRAL_23` | `#aaaab1` | JS |
| `NEUTRAL_24` | `#a6a7ad` | JS |
| `NEUTRAL_25` | `#a2a3aa` | JS |
| `NEUTRAL_26` | `#9f9fa6` | JS |
| `NEUTRAL_27` | `#9b9ca3` | JS |
| `NEUTRAL_28` | `#97989f` | JS |
| `NEUTRAL_29` | `#94959c` | JS |
| `NEUTRAL_3` | `#f7f7f8` | JS |
| `NEUTRAL_30` | `#909199` | JS |
| `NEUTRAL_31` | `#8c8d95` | JS |
| `NEUTRAL_32` | `#898a92` | JS |
| `NEUTRAL_33` | `#85868e` | JS |
| `NEUTRAL_34` | `#82838b` | JS |
| `NEUTRAL_35` | `#7e7f88` | JS |
| `NEUTRAL_36` | `#7b7c84` | JS |
| `NEUTRAL_37` | `#777881` | JS |
| `NEUTRAL_38` | `#74757e` | JS |
| `NEUTRAL_39` | `#70717a` | JS |
| `NEUTRAL_4` | `#f3f3f4` | JS |
| `NEUTRAL_40` | `#6d6e77` | JS |
| `NEUTRAL_41` | `#6a6b74` | JS |
| `NEUTRAL_42` | `#666771` | JS |
| `NEUTRAL_43` | `#63646d` | JS |
| `NEUTRAL_44` | `#5f606a` | JS |
| `NEUTRAL_45` | `#5c5d67` | JS |
| `NEUTRAL_46` | `#595a64` | JS |
| `NEUTRAL_47` | `#555760` | JS |
| `NEUTRAL_48` | `#52535d` | JS |
| `NEUTRAL_49` | `#4f505a` | JS |
| `NEUTRAL_5` | `#efeff0` | JS |
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
| `NEUTRAL_6` | `#ebebed` | JS |
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
| `NEUTRAL_7` | `#e7e7e9` | JS |
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
| `NEUTRAL_8` | `#e3e3e6` | JS |
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
| `NEUTRAL_9` | `#dfe0e2` | JS |
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
| `--channel-icon` | `color-mix(in oklab,hsl(233.333 calc(1*3.734%) 5...` | CSS |
| `--creator-revenue-locked-channel-icon` | `color-mix(in oklab,hsl(185.275 calc(1*36.842%) ...` | CSS |
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
| `--search-popout-date-picker-hint-text` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--search-popout-date-picker-hint-value-text` | `#fff` | CSS |
| `--search-popout-option-answer-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--search-popout-option-filter-color` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--search-popout-option-filter-text` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
| `--search-popout-option-user-nickname` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--search-popout-option-user-username` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |

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
| `--blurple-1` | `hsl(232.5 calc(1*100%) 95.294%/1)` | CSS |
| `--blurple-1-hsl` | `232.5 calc(1*100%) 95.294%` | CSS |
| `--blurple-10` | `hsl(228.214 calc(1*100%) 89.02%/1)` | CSS |
| `--blurple-10-hsl` | `228.214 calc(1*100%) 89.02%` | CSS |
| `--blurple-100` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--blurple-100-hsl` | `0 calc(1*0%) 0%` | CSS |
| `--blurple-11` | `hsl(228 calc(1*100%) 88.235%/1)` | CSS |
| `--blurple-11-hsl` | `228 calc(1*100%) 88.235%` | CSS |
| `--blurple-12` | `hsl(227.619 calc(1*100%) 87.647%/1)` | CSS |
| `--blurple-12-hsl` | `227.619 calc(1*100%) 87.647%` | CSS |
| `--blurple-13` | `hsl(228.182 calc(1*100%) 87.059%/1)` | CSS |
| `--blurple-13-hsl` | `228.182 calc(1*100%) 87.059%` | CSS |
| `--blurple-14` | `hsl(228 calc(1*100%) 86.275%/1)` | CSS |
| `--blurple-14-hsl` | `228 calc(1*100%) 86.275%` | CSS |
| `--blurple-15` | `hsl(227.671 calc(1*100%) 85.686%/1)` | CSS |
| `--blurple-15-hsl` | `227.671 calc(1*100%) 85.686%` | CSS |
| `--blurple-16` | `hsl(228.158 calc(1*100%) 85.098%/1)` | CSS |
| `--blurple-16-hsl` | `228.158 calc(1*100%) 85.098%` | CSS |
| `--blurple-17` | `hsl(228 calc(1*100%) 84.314%/1)` | CSS |
| `--blurple-17-hsl` | `228 calc(1*100%) 84.314%` | CSS |
| `--blurple-18` | `hsl(227.711 calc(1*100%) 83.725%/1)` | CSS |
| `--blurple-18-hsl` | `227.711 calc(1*100%) 83.725%` | CSS |
| `--blurple-19` | `hsl(228.14 calc(1*100%) 83.137%/1)` | CSS |
| `--blurple-19-hsl` | `228.14 calc(1*100%) 83.137%` | CSS |
| `--blurple-2` | `hsl(231.429 calc(1*100%) 94.51%/1)` | CSS |
| `--blurple-2-hsl` | `231.429 calc(1*100%) 94.51%` | CSS |
| `--blurple-20` | `hsl(228.539 calc(1*100%) 82.549%/1)` | CSS |
| `--blurple-20-hsl` | `228.539 calc(1*100%) 82.549%` | CSS |
| `--blurple-21` | `hsl(228.791 calc(1*97.849%) 81.765%/1)` | CSS |
| `--blurple-21-hsl` | `228.791 calc(1*97.849%) 81.765%` | CSS |
| `--blurple-22` | `hsl(228 calc(1*97.938%) 80.98%/1)` | CSS |
| `--blurple-22-hsl` | `228 calc(1*97.938%) 80.98%` | CSS |
| `--blurple-23` | `hsl(228.367 calc(1*98%) 80.392%/1)` | CSS |
| `--blurple-23-hsl` | `228.367 calc(1*98%) 80.392%` | CSS |
| `--blurple-24` | `hsl(228.6 calc(1*96.154%) 79.608%/1)` | CSS |
| `--blurple-24-hsl` | `228.6 calc(1*96.154%) 79.608%` | CSS |
| `--blurple-25` | `hsl(228.35 calc(1*96.262%) 79.02%/1)` | CSS |
| `--blurple-25-hsl` | `228.35 calc(1*96.262%) 79.02%` | CSS |
| `--blurple-26` | `hsl(228.679 calc(1*96.364%) 78.431%/1)` | CSS |
| `--blurple-26-hsl` | `228.679 calc(1*96.364%) 78.431%` | CSS |
| `--blurple-27` | `hsl(228.889 calc(1*94.737%) 77.647%/1)` | CSS |
| `--blurple-27-hsl` | `228.889 calc(1*94.737%) 77.647%` | CSS |
| `--blurple-28` | `hsl(229.189 calc(1*94.872%) 77.059%/1)` | CSS |
| `--blurple-28-hsl` | `229.189 calc(1*94.872%) 77.059%` | CSS |
| `--blurple-29` | `hsl(229.286 calc(1*93.333%) 76.471%/1)` | CSS |
| `--blurple-29-hsl` | `229.286 calc(1*93.333%) 76.471%` | CSS |
| `--blurple-3` | `hsl(230.625 calc(1*100%) 93.725%/1)` | CSS |
| `--blurple-3-hsl` | `230.625 calc(1*100%) 93.725%` | CSS |
| `--blurple-30` | `hsl(229.565 calc(1*93.496%) 75.882%/1)` | CSS |
| `--blurple-30-hsl` | `229.565 calc(1*93.496%) 75.882%` | CSS |
| `--blurple-31` | `hsl(229.831 calc(1*93.651%) 75.294%/1)` | CSS |
| `--blurple-31-hsl` | `229.831 calc(1*93.651%) 75.294%` | CSS |
| `--blurple-32` | `hsl(230 calc(1*92.308%) 74.51%/1)` | CSS |
| `--blurple-32-hsl` | `230 calc(1*92.308%) 74.51%` | CSS |
| `--blurple-33` | `hsl(229.756 calc(1*92.481%) 73.922%/1)` | CSS |
| `--blurple-33-hsl` | `229.756 calc(1*92.481%) 73.922%` | CSS |
| `--blurple-34` | `hsl(230.323 calc(1*91.176%) 73.333%/1)` | CSS |
| `--blurple-34-hsl` | `230.323 calc(1*91.176%) 73.333%` | CSS |
| `--blurple-35` | `hsl(230.551 calc(1*91.367%) 72.745%/1)` | CSS |
| `--blurple-35-hsl` | `230.551 calc(1*91.367%) 72.745%` | CSS |
| `--blurple-36` | `hsl(230.698 calc(1*90.21%) 71.961%/1)` | CSS |
| `--blurple-36-hsl` | `230.698 calc(1*90.21%) 71.961%` | CSS |
| `--blurple-37` | `hsl(231.298 calc(1*90.345%) 71.569%/1)` | CSS |
| `--blurple-37-hsl` | `231.298 calc(1*90.345%) 71.569%` | CSS |
| `--blurple-38` | `hsl(230.977 calc(1*89.262%) 70.784%/1)` | CSS |
| `--blurple-38-hsl` | `230.977 calc(1*89.262%) 70.784%` | CSS |
| `--blurple-39` | `hsl(231.176 calc(1*89.474%) 70.196%/1)` | CSS |
| `--blurple-39-hsl` | `231.176 calc(1*89.474%) 70.196%` | CSS |
| `--blurple-4` | `hsl(229.714 calc(1*100%) 93.137%/1)` | CSS |
| `--blurple-4-hsl` | `229.714 calc(1*100%) 93.137%` | CSS |
| `--blurple-40` | `hsl(231.679 calc(1*88.387%) 69.608%/1)` | CSS |
| `--blurple-40-hsl` | `231.679 calc(1*88.387%) 69.608%` | CSS |
| `--blurple-41` | `hsl(231.857 calc(1*88.608%) 69.02%/1)` | CSS |
| `--blurple-41-hsl` | `231.857 calc(1*88.608%) 69.02%` | CSS |
| `--blurple-42` | `hsl(232.34 calc(1*87.578%) 68.431%/1)` | CSS |
| `--blurple-42-hsl` | `232.34 calc(1*87.578%) 68.431%` | CSS |
| `--blurple-43` | `hsl(232.867 calc(1*87.73%) 68.039%/1)` | CSS |
| `--blurple-43-hsl` | `232.867 calc(1*87.73%) 68.039%` | CSS |
| `--blurple-44` | `hsl(232.966 calc(1*86.826%) 67.255%/1)` | CSS |
| `--blurple-44-hsl` | `232.966 calc(1*86.826%) 67.255%` | CSS |
| `--blurple-45` | `hsl(233.469 calc(1*86.982%) 66.863%/1)` | CSS |
| `--blurple-45-hsl` | `233.469 calc(1*86.982%) 66.863%` | CSS |
| `--blurple-46` | `hsl(233.919 calc(1*86.047%) 66.275%/1)` | CSS |
| `--blurple-46-hsl` | `233.919 calc(1*86.047%) 66.275%` | CSS |
| `--blurple-47` | `hsl(234.04 calc(1*86.286%) 65.686%/1)` | CSS |
| `--blurple-47-hsl` | `234.04 calc(1*86.286%) 65.686%` | CSS |
| `--blurple-48` | `hsl(234.474 calc(1*85.393%) 65.098%/1)` | CSS |
| `--blurple-48-hsl` | `234.474 calc(1*85.393%) 65.098%` | CSS |
| `--blurple-49` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--blurple-49-hsl` | `234.935 calc(1*85.556%) 64.706%` | CSS |
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
| `--blurple-54` | `hsl(233.957 calc(1*65.877%) 58.627%/1)` | CSS |
| `--blurple-54-hsl` | `233.957 calc(1*65.877%) 58.627%` | CSS |
| `--blurple-55` | `hsl(233.778 calc(1*61.644%) 57.059%/1)` | CSS |
| `--blurple-55-hsl` | `233.778 calc(1*61.644%) 57.059%` | CSS |
| `--blurple-56` | `hsl(233.636 calc(1*58.407%) 55.686%/1)` | CSS |
| `--blurple-56-hsl` | `233.636 calc(1*58.407%) 55.686%` | CSS |
| `--blurple-57` | `hsl(233.488 calc(1*55.365%) 54.314%/1)` | CSS |
| `--blurple-57-hsl` | `233.488 calc(1*55.365%) 54.314%` | CSS |
| `--blurple-58` | `hsl(233.333 calc(1*52.5%) 52.941%/1)` | CSS |
| `--blurple-58-hsl` | `233.333 calc(1*52.5%) 52.941%` | CSS |
| `--blurple-59` | `hsl(233.115 calc(1*49.194%) 51.373%/1)` | CSS |
| `--blurple-59-hsl` | `233.115 calc(1*49.194%) 51.373%` | CSS |
| `--blurple-6` | `hsl(230 calc(1*100%) 91.765%/1)` | CSS |
| `--blurple-6-hsl` | `230 calc(1*100%) 91.765%` | CSS |
| `--blurple-60` | `hsl(232.941 calc(1*46.667%) 50%/1)` | CSS |
| `--blurple-60-hsl` | `232.941 calc(1*46.667%) 50%` | CSS |
| `--blurple-61` | `hsl(232.759 calc(1*46.774%) 48.627%/1)` | CSS |
| `--blurple-61-hsl` | `232.759 calc(1*46.774%) 48.627%` | CSS |
| `--blurple-62` | `hsl(232.632 calc(1*47.107%) 47.451%/1)` | CSS |
| `--blurple-62-hsl` | `232.632 calc(1*47.107%) 47.451%` | CSS |
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
| `--blurple-71` | `hsl(230.769 calc(1*49.727%) 35.882%/1)` | CSS |
| `--blurple-71-hsl` | `230.769 calc(1*49.727%) 35.882%` | CSS |
| `--blurple-72` | `hsl(230.455 calc(1*50%) 34.51%/1)` | CSS |
| `--blurple-72-hsl` | `230.455 calc(1*50%) 34.51%` | CSS |
| `--blurple-73` | `hsl(230.233 calc(1*50.588%) 33.333%/1)` | CSS |
| `--blurple-73-hsl` | `230.233 calc(1*50.588%) 33.333%` | CSS |
| `--blurple-74` | `hsl(230 calc(1*51.22%) 32.157%/1)` | CSS |
| `--blurple-74-hsl` | `230 calc(1*51.22%) 32.157%` | CSS |
| `--blurple-75` | `hsl(229.63 calc(1*50.943%) 31.176%/1)` | CSS |
| `--blurple-75-hsl` | `229.63 calc(1*50.943%) 31.176%` | CSS |
| `--blurple-76` | `hsl(229.231 calc(1*51.316%) 29.804%/1)` | CSS |
| `--blurple-76-hsl` | `229.231 calc(1*51.316%) 29.804%` | CSS |
| `--blurple-77` | `hsl(228.947 calc(1*52.055%) 28.627%/1)` | CSS |
| `--blurple-77-hsl` | `228.947 calc(1*52.055%) 28.627%` | CSS |
| `--blurple-78` | `hsl(228.649 calc(1*52.857%) 27.451%/1)` | CSS |
| `--blurple-78-hsl` | `228.649 calc(1*52.857%) 27.451%` | CSS |
| `--blurple-79` | `hsl(228.333 calc(1*53.731%) 26.275%/1)` | CSS |
| `--blurple-79-hsl` | `228.333 calc(1*53.731%) 26.275%` | CSS |
| `--blurple-8` | `hsl(228.98 calc(1*100%) 90.392%/1)` | CSS |
| `--blurple-8-hsl` | `228.98 calc(1*100%) 90.392%` | CSS |
| `--blurple-80` | `hsl(228 calc(1*54.688%) 25.098%/1)` | CSS |
| `--blurple-80-hsl` | `228 calc(1*54.688%) 25.098%` | CSS |
| `--blurple-81` | `hsl(228.358 calc(1*54.472%) 24.118%/1)` | CSS |
| `--blurple-81-hsl` | `228.358 calc(1*54.472%) 24.118%` | CSS |
| `--blurple-82` | `hsl(228 calc(1*55.556%) 22.941%/1)` | CSS |
| `--blurple-82-hsl` | `228 calc(1*55.556%) 22.941%` | CSS |
| `--blurple-83` | `hsl(227.813 calc(1*57.143%) 21.961%/1)` | CSS |
| `--blurple-83-hsl` | `227.813 calc(1*57.143%) 21.961%` | CSS |
| `--blurple-84` | `hsl(227.213 calc(1*57.009%) 20.98%/1)` | CSS |
| `--blurple-84-hsl` | `227.213 calc(1*57.009%) 20.98%` | CSS |
| `--blurple-85` | `hsl(226.78 calc(1*58.416%) 19.804%/1)` | CSS |
| `--blurple-85-hsl` | `226.78 calc(1*58.416%) 19.804%` | CSS |
| `--blurple-86` | `hsl(226.316 calc(1*60%) 18.627%/1)` | CSS |
| `--blurple-86-hsl` | `226.316 calc(1*60%) 18.627%` | CSS |
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
| `--blurple-94` | `hsl(224.615 calc(1*73.585%) 10.392%/1)` | CSS |
| `--blurple-94-hsl` | `224.615 calc(1*73.585%) 10.392%` | CSS |
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
| `--channels-default` | `color-mix(in oklab,hsl(233.333 calc(1*3.734%) 5...` | CSS |
| `--channels-name-line-height` | `24px` | CSS |
| `--channels-spine-inverted-offset-top` | `6px` | CSS |
| `--channels-spine-offset-left` | `24px` | CSS |
| `--channelTabs-favHeight` | `22px` | CSS |
| `--channelTabs-openTabSize` | `18px` | CSS |
| `--channelTabs-tabHeight` | `22px` | CSS |
| `--channelTabs-tabNameFontSize` | `12px` | CSS |
| `--channelTabs-tabWidth` | `220px` | CSS |
| `--channelTabs-tabWidthMin` | `70px` | CSS |
| `--chat-avatar-size` | `40px` | CSS |
| `--chat-border` | `color-mix(in oklab,hsl(240 calc(1*6.452%) 12.15...` | CSS |
| `--chat-markup-line-height` | `1.375rem` | CSS |
| `--checkpoint-emojis-gradient-end` | `color-mix(in oklab,hsl(283.2 calc(1*53.191%) 9....` | CSS |
| `--checkpoint-emojis-gradient-end-raw` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-emojis-gradient-end-raw-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-emojis-gradient-start` | `color-mix(in oklab,hsl(260.114 calc(1*87.129%) ...` | CSS |
| `--checkpoint-emojis-gradient-start-raw` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-emojis-gradient-start-raw-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-emojis-primary` | `color-mix(in oklab,hsl(269.011 calc(1*88.35%) 7...` | CSS |
| `--checkpoint-emojis-secondary` | `color-mix(in oklab,hsl(268.837 calc(1*72.067%) ...` | CSS |
| `--checkpoint-emojis-secondary-raw` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-emojis-secondary-raw-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-end-gradient-end` | `color-mix(in oklab,hsl(149.333 calc(1*56.962%) ...` | CSS |
| `--checkpoint-end-gradient-end-raw` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-end-gradient-end-raw-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-end-gradient-start` | `color-mix(in oklab,hsl(149.302 calc(1*50.588%) ...` | CSS |
| `--checkpoint-end-gradient-start-raw` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-end-gradient-start-raw-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-end-primary` | `color-mix(in oklab,hsl(143.316 calc(1*83.55%) 5...` | CSS |
| `--checkpoint-end-secondary` | `color-mix(in oklab,hsl(143.673 calc(1*78.61%) 3...` | CSS |
| `--checkpoint-end-secondary-raw` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-end-secondary-raw-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--checkpoint-friends-gradient-end` | `color-mix(in oklab,hsl(259.481 calc(1*79.381%) ...` | CSS |
| `--checkpoint-friends-gradient-end-raw` | `hsl(259.481 calc(1*79.381%) 19.02%/1)` | CSS |
| `--checkpoint-friends-gradient-end-raw-hsl` | `259.481 calc(1*79.381%) 19.02%` | CSS |
| `--checkpoint-friends-gradient-start` | `color-mix(in oklab,hsl(256.018 calc(1*96.507%) ...` | CSS |
| `--checkpoint-friends-gradient-start-raw` | `hsl(256.018 calc(1*96.507%) 55.098%/1)` | CSS |
| `--checkpoint-friends-gradient-start-raw-hsl` | `256.018 calc(1*96.507%) 55.098%` | CSS |
| `--checkpoint-friends-primary` | `color-mix(in oklab,hsl(234 calc(1*90%) 80.392%/...` | CSS |
| `--checkpoint-friends-secondary` | `color-mix(in oklab,hsl(234 calc(1*39.823%) 55.6...` | CSS |
| `--checkpoint-friends-secondary-raw` | `hsl(234 calc(1*39.823%) 55.686%/1)` | CSS |
| `--checkpoint-friends-secondary-raw-hsl` | `234 calc(1*39.823%) 55.686%` | CSS |
| `--checkpoint-gaming-gradient-end` | `color-mix(in oklab,hsl(28.8 calc(1*53.191%) 9.2...` | CSS |
| `--checkpoint-gaming-gradient-end-raw` | `hsl(28.8 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-gaming-gradient-end-raw-hsl` | `28.8 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-gaming-gradient-start` | `color-mix(in oklab,hsl(27.595 calc(1*100%) 53.5...` | CSS |
| `--checkpoint-gaming-gradient-start-raw` | `hsl(27.595 calc(1*100%) 53.529%/1)` | CSS |
| `--checkpoint-gaming-gradient-start-raw-hsl` | `27.595 calc(1*100%) 53.529%` | CSS |
| `--checkpoint-gaming-primary` | `color-mix(in oklab,hsl(34.699 calc(1*100%) 51.1...` | CSS |
| `--checkpoint-gaming-secondary` | `color-mix(in oklab,hsl(26.809 calc(1*86.239%) 4...` | CSS |
| `--checkpoint-gaming-secondary-raw` | `hsl(26.809 calc(1*86.239%) 42.745%/1)` | CSS |
| `--checkpoint-gaming-secondary-raw-hsl` | `26.809 calc(1*86.239%) 42.745%` | CSS |
| `--checkpoint-guilds-gradient-end` | `color-mix(in oklab,hsl(170.4 calc(1*53.191%) 9....` | CSS |
| `--checkpoint-guilds-gradient-end-raw` | `hsl(170.4 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-guilds-gradient-end-raw-hsl` | `170.4 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-guilds-gradient-start` | `color-mix(in oklab,hsl(169.589 calc(1*90.123%) ...` | CSS |
| `--checkpoint-guilds-gradient-start-raw` | `hsl(169.589 calc(1*90.123%) 47.647%/1)` | CSS |
| `--checkpoint-guilds-gradient-start-raw-hsl` | `169.589 calc(1*90.123%) 47.647%` | CSS |
| `--checkpoint-guilds-primary` | `color-mix(in oklab,hsl(169.811 calc(1*97.546%) ...` | CSS |
| `--checkpoint-guilds-secondary` | `color-mix(in oklab,hsl(169.672 calc(1*68.539%) ...` | CSS |
| `--checkpoint-guilds-secondary-raw` | `hsl(169.672 calc(1*68.539%) 34.902%/1)` | CSS |
| `--checkpoint-guilds-secondary-raw-hsl` | `169.672 calc(1*68.539%) 34.902%` | CSS |
| `--checkpoint-messages-gradient-end` | `color-mix(in oklab,hsl(7.2 calc(1*53.191%) 9.21...` | CSS |
| `--checkpoint-messages-gradient-end-raw` | `hsl(7.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-messages-gradient-end-raw-hsl` | `7.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-messages-gradient-start` | `color-mix(in oklab,hsl(308.75 calc(1*98.969%) 6...` | CSS |
| `--checkpoint-messages-gradient-start-raw` | `hsl(308.75 calc(1*98.969%) 61.961%/1)` | CSS |
| `--checkpoint-messages-gradient-start-raw-hsl` | `308.75 calc(1*98.969%) 61.961%` | CSS |
| `--checkpoint-messages-primary` | `color-mix(in oklab,hsl(315.084 calc(1*100%) 64....` | CSS |
| `--checkpoint-messages-secondary` | `color-mix(in oklab,hsl(315.319 calc(1*70.854%) ...` | CSS |
| `--checkpoint-messages-secondary-raw` | `hsl(315.319 calc(1*70.854%) 39.02%/1)` | CSS |
| `--checkpoint-messages-secondary-raw-hsl` | `315.319 calc(1*70.854%) 39.02%` | CSS |
| `--checkpoint-persona-eight-gradient-end` | `color-mix(in oklab,hsl(31.154 calc(1*55.319%) 1...` | CSS |
| `--checkpoint-persona-eight-gradient-end-raw` | `hsl(31.154 calc(1*55.319%) 18.431%/1)` | CSS |
| `--checkpoint-persona-eight-gradient-end-raw-hsl` | `31.154 calc(1*55.319%) 18.431%` | CSS |
| `--checkpoint-persona-eight-gradient-start` | `color-mix(in oklab,hsl(39.184 calc(1*56.322%) 6...` | CSS |
| `--checkpoint-persona-eight-gradient-start-raw` | `hsl(39.184 calc(1*56.322%) 65.882%/1)` | CSS |
| `--checkpoint-persona-eight-gradient-start-raw-hsl` | `39.184 calc(1*56.322%) 65.882%` | CSS |
| `--checkpoint-persona-eight-primary` | `color-mix(in oklab,hsl(39.184 calc(1*56.322%) 6...` | CSS |
| `--checkpoint-persona-eight-secondary` | `color-mix(in oklab,hsl(39.612 calc(1*42.387%) 4...` | CSS |
| `--checkpoint-persona-eight-secondary-raw` | `hsl(39.612 calc(1*42.387%) 47.647%/1)` | CSS |
| `--checkpoint-persona-eight-secondary-raw-hsl` | `39.612 calc(1*42.387%) 47.647%` | CSS |
| `--checkpoint-persona-five-gradient-end` | `color-mix(in oklab,hsl(339.231 calc(1*67.241%) ...` | CSS |
| `--checkpoint-persona-five-gradient-end-raw` | `hsl(339.231 calc(1*67.241%) 22.745%/1)` | CSS |
| `--checkpoint-persona-five-gradient-end-raw-hsl` | `339.231 calc(1*67.241%) 22.745%` | CSS |
| `--checkpoint-persona-five-gradient-start` | `color-mix(in oklab,hsl(339.114 calc(1*90.805%) ...` | CSS |
| `--checkpoint-persona-five-gradient-start-raw` | `hsl(339.114 calc(1*90.805%) 65.882%/1)` | CSS |
| `--checkpoint-persona-five-gradient-start-raw-hsl` | `339.114 calc(1*90.805%) 65.882%` | CSS |
| `--checkpoint-persona-five-primary` | `color-mix(in oklab,hsl(339.114 calc(1*90.805%) ...` | CSS |
| `--checkpoint-persona-five-secondary` | `color-mix(in oklab,hsl(338.983 calc(1*71.66%) 4...` | CSS |
| `--checkpoint-persona-five-secondary-raw` | `hsl(338.983 calc(1*71.66%) 48.431%/1)` | CSS |
| `--checkpoint-persona-five-secondary-raw-hsl` | `338.983 calc(1*71.66%) 48.431%` | CSS |
| `--checkpoint-persona-four-gradient-end` | `color-mix(in oklab,hsl(7.2 calc(1*53.191%) 9.21...` | CSS |
| `--checkpoint-persona-four-gradient-end-raw` | `hsl(7.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-four-gradient-end-raw-hsl` | `7.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-four-gradient-start` | `color-mix(in oklab,hsl(308.75 calc(1*98.969%) 6...` | CSS |
| `--checkpoint-persona-four-gradient-start-raw` | `hsl(308.75 calc(1*98.969%) 61.961%/1)` | CSS |
| `--checkpoint-persona-four-gradient-start-raw-hsl` | `308.75 calc(1*98.969%) 61.961%` | CSS |
| `--checkpoint-persona-four-primary` | `color-mix(in oklab,hsl(312.083 calc(1*84.706%) ...` | CSS |
| `--checkpoint-persona-four-secondary` | `color-mix(in oklab,hsl(315.319 calc(1*70.854%) ...` | CSS |
| `--checkpoint-persona-four-secondary-raw` | `hsl(315.319 calc(1*70.854%) 39.02%/1)` | CSS |
| `--checkpoint-persona-four-secondary-raw-hsl` | `315.319 calc(1*70.854%) 39.02%` | CSS |
| `--checkpoint-persona-nine-gradient-end` | `color-mix(in oklab,hsl(0 calc(1*0%) 24.706%/1) ...` | CSS |
| `--checkpoint-persona-nine-gradient-end-raw` | `hsl(0 calc(1*0%) 24.706%/1)` | CSS |
| `--checkpoint-persona-nine-gradient-end-raw-hsl` | `0 calc(1*0%) 24.706%` | CSS |
| `--checkpoint-persona-nine-gradient-start` | `color-mix(in oklab,hsl(0 calc(1*0%) 93.333%/1) ...` | CSS |
| `--checkpoint-persona-nine-gradient-start-raw` | `hsl(0 calc(1*0%) 93.333%/1)` | CSS |
| `--checkpoint-persona-nine-gradient-start-raw-hsl` | `0 calc(1*0%) 93.333%` | CSS |
| `--checkpoint-persona-nine-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 93.333%/1) ...` | CSS |
| `--checkpoint-persona-nine-secondary` | `color-mix(in oklab,hsl(0 calc(1*0%) 66.275%/1) ...` | CSS |
| `--checkpoint-persona-nine-secondary-raw` | `hsl(0 calc(1*0%) 66.275%/1)` | CSS |
| `--checkpoint-persona-nine-secondary-raw-hsl` | `0 calc(1*0%) 66.275%` | CSS |
| `--checkpoint-persona-one-gradient-end` | `color-mix(in oklab,hsl(168.98 calc(1*59.036%) 1...` | CSS |
| `--checkpoint-persona-one-gradient-end-raw` | `hsl(168.98 calc(1*59.036%) 16.275%/1)` | CSS |
| `--checkpoint-persona-one-gradient-end-raw-hsl` | `168.98 calc(1*59.036%) 16.275%` | CSS |
| `--checkpoint-persona-one-gradient-start` | `color-mix(in oklab,hsl(169.811 calc(1*97.546%) ...` | CSS |
| `--checkpoint-persona-one-gradient-start-raw` | `hsl(169.811 calc(1*97.546%) 68.039%/1)` | CSS |
| `--checkpoint-persona-one-gradient-start-raw-hsl` | `169.811 calc(1*97.546%) 68.039%` | CSS |
| `--checkpoint-persona-one-primary` | `color-mix(in oklab,hsl(169.811 calc(1*97.546%) ...` | CSS |
| `--checkpoint-persona-one-secondary` | `color-mix(in oklab,hsl(169.672 calc(1*68.539%) ...` | CSS |
| `--checkpoint-persona-one-secondary-raw` | `hsl(169.672 calc(1*68.539%) 34.902%/1)` | CSS |
| `--checkpoint-persona-one-secondary-raw-hsl` | `169.672 calc(1*68.539%) 34.902%` | CSS |
| `--checkpoint-persona-seven-gradient-end` | `color-mix(in oklab,hsl(30.361 calc(1*85.567%) 1...` | CSS |
| `--checkpoint-persona-seven-gradient-end-raw` | `hsl(30.361 calc(1*85.567%) 19.02%/1)` | CSS |
| `--checkpoint-persona-seven-gradient-end-raw-hsl` | `30.361 calc(1*85.567%) 19.02%` | CSS |
| `--checkpoint-persona-seven-gradient-start` | `color-mix(in oklab,hsl(49.891 calc(1*100%) 63.9...` | CSS |
| `--checkpoint-persona-seven-gradient-start-raw` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-persona-seven-gradient-start-raw-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-persona-seven-primary` | `color-mix(in oklab,hsl(49.891 calc(1*100%) 63.9...` | CSS |
| `--checkpoint-persona-seven-secondary` | `color-mix(in oklab,hsl(49.935 calc(1*74.163%) 4...` | CSS |
| `--checkpoint-persona-seven-secondary-raw` | `hsl(49.935 calc(1*74.163%) 40.98%/1)` | CSS |
| `--checkpoint-persona-seven-secondary-raw-hsl` | `49.935 calc(1*74.163%) 40.98%` | CSS |
| `--checkpoint-persona-six-gradient-end` | `color-mix(in oklab,hsl(28.8 calc(1*53.191%) 9.2...` | CSS |
| `--checkpoint-persona-six-gradient-end-raw` | `hsl(28.8 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-six-gradient-end-raw-hsl` | `28.8 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-six-gradient-start` | `color-mix(in oklab,hsl(27.595 calc(1*100%) 53.5...` | CSS |
| `--checkpoint-persona-six-gradient-start-raw` | `hsl(27.595 calc(1*100%) 53.529%/1)` | CSS |
| `--checkpoint-persona-six-gradient-start-raw-hsl` | `27.595 calc(1*100%) 53.529%` | CSS |
| `--checkpoint-persona-six-primary` | `color-mix(in oklab,hsl(26.834 calc(1*100%) 60.9...` | CSS |
| `--checkpoint-persona-six-secondary` | `color-mix(in oklab,hsl(26.809 calc(1*86.239%) 4...` | CSS |
| `--checkpoint-persona-six-secondary-raw` | `hsl(26.809 calc(1*86.239%) 42.745%/1)` | CSS |
| `--checkpoint-persona-six-secondary-raw-hsl` | `26.809 calc(1*86.239%) 42.745%` | CSS |
| `--checkpoint-persona-three-gradient-end` | `color-mix(in oklab,hsl(283.2 calc(1*53.191%) 9....` | CSS |
| `--checkpoint-persona-three-gradient-end-raw` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-persona-three-gradient-end-raw-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-persona-three-gradient-start` | `color-mix(in oklab,hsl(260.114 calc(1*87.129%) ...` | CSS |
| `--checkpoint-persona-three-gradient-start-raw` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-persona-three-gradient-start-raw-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-persona-three-primary` | `color-mix(in oklab,hsl(269.011 calc(1*88.35%) 7...` | CSS |
| `--checkpoint-persona-three-secondary` | `color-mix(in oklab,hsl(268.837 calc(1*72.067%) ...` | CSS |
| `--checkpoint-persona-three-secondary-raw` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-persona-three-secondary-raw-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-persona-two-gradient-end` | `color-mix(in oklab,hsl(259.481 calc(1*79.381%) ...` | CSS |
| `--checkpoint-persona-two-gradient-end-raw` | `hsl(259.481 calc(1*79.381%) 19.02%/1)` | CSS |
| `--checkpoint-persona-two-gradient-end-raw-hsl` | `259.481 calc(1*79.381%) 19.02%` | CSS |
| `--checkpoint-persona-two-gradient-start` | `color-mix(in oklab,hsl(256.018 calc(1*96.507%) ...` | CSS |
| `--checkpoint-persona-two-gradient-start-raw` | `hsl(256.018 calc(1*96.507%) 55.098%/1)` | CSS |
| `--checkpoint-persona-two-gradient-start-raw-hsl` | `256.018 calc(1*96.507%) 55.098%` | CSS |
| `--checkpoint-persona-two-primary` | `color-mix(in oklab,hsl(217.982 calc(1*93.162%) ...` | CSS |
| `--checkpoint-persona-two-secondary` | `color-mix(in oklab,hsl(234 calc(1*39.823%) 55.6...` | CSS |
| `--checkpoint-persona-two-secondary-raw` | `hsl(234 calc(1*39.823%) 55.686%/1)` | CSS |
| `--checkpoint-persona-two-secondary-raw-hsl` | `234 calc(1*39.823%) 55.686%` | CSS |
| `--checkpoint-persona-zero-gradient-end` | `color-mix(in oklab,hsl(149.333 calc(1*56.962%) ...` | CSS |
| `--checkpoint-persona-zero-gradient-end-raw` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-persona-zero-gradient-end-raw-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-persona-zero-gradient-start` | `color-mix(in oklab,hsl(149.302 calc(1*50.588%) ...` | CSS |
| `--checkpoint-persona-zero-gradient-start-raw` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-persona-zero-gradient-start-raw-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-persona-zero-primary` | `color-mix(in oklab,hsl(143.804 calc(1*83.636%) ...` | CSS |
| `--checkpoint-persona-zero-secondary` | `color-mix(in oklab,hsl(143.673 calc(1*78.61%) 3...` | CSS |
| `--checkpoint-persona-zero-secondary-raw` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-persona-zero-secondary-raw-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--checkpoint-quests-gradient-end` | `color-mix(in oklab,hsl(283.2 calc(1*53.191%) 9....` | CSS |
| `--checkpoint-quests-gradient-end-raw` | `hsl(283.2 calc(1*53.191%) 9.216%/1)` | CSS |
| `--checkpoint-quests-gradient-end-raw-hsl` | `283.2 calc(1*53.191%) 9.216%` | CSS |
| `--checkpoint-quests-gradient-start` | `color-mix(in oklab,hsl(260.114 calc(1*87.129%) ...` | CSS |
| `--checkpoint-quests-gradient-start-raw` | `hsl(260.114 calc(1*87.129%) 60.392%/1)` | CSS |
| `--checkpoint-quests-gradient-start-raw-hsl` | `260.114 calc(1*87.129%) 60.392%` | CSS |
| `--checkpoint-quests-primary` | `color-mix(in oklab,hsl(269.011 calc(1*88.35%) 7...` | CSS |
| `--checkpoint-quests-secondary` | `color-mix(in oklab,hsl(268.837 calc(1*72.067%) ...` | CSS |
| `--checkpoint-quests-secondary-raw` | `hsl(268.837 calc(1*72.067%) 64.902%/1)` | CSS |
| `--checkpoint-quests-secondary-raw-hsl` | `268.837 calc(1*72.067%) 64.902%` | CSS |
| `--checkpoint-voice-gradient-end` | `color-mix(in oklab,hsl(30.361 calc(1*85.567%) 1...` | CSS |
| `--checkpoint-voice-gradient-end-raw` | `hsl(30.361 calc(1*85.567%) 19.02%/1)` | CSS |
| `--checkpoint-voice-gradient-end-raw-hsl` | `30.361 calc(1*85.567%) 19.02%` | CSS |
| `--checkpoint-voice-gradient-start` | `color-mix(in oklab,hsl(49.891 calc(1*100%) 63.9...` | CSS |
| `--checkpoint-voice-gradient-start-raw` | `hsl(49.891 calc(1*100%) 63.922%/1)` | CSS |
| `--checkpoint-voice-gradient-start-raw-hsl` | `49.891 calc(1*100%) 63.922%` | CSS |
| `--checkpoint-voice-primary` | `color-mix(in oklab,hsl(49.891 calc(1*100%) 63.9...` | CSS |
| `--checkpoint-voice-secondary` | `color-mix(in oklab,hsl(49.935 calc(1*74.163%) 4...` | CSS |
| `--checkpoint-voice-secondary-raw` | `hsl(49.935 calc(1*74.163%) 40.98%/1)` | CSS |
| `--checkpoint-voice-secondary-raw-hsl` | `49.935 calc(1*74.163%) 40.98%` | CSS |
| `--checkpoint-welcome-gradient-end` | `color-mix(in oklab,hsl(149.333 calc(1*56.962%) ...` | CSS |
| `--checkpoint-welcome-gradient-end-raw` | `hsl(149.333 calc(1*56.962%) 15.49%/1)` | CSS |
| `--checkpoint-welcome-gradient-end-raw-hsl` | `149.333 calc(1*56.962%) 15.49%` | CSS |
| `--checkpoint-welcome-gradient-start` | `color-mix(in oklab,hsl(149.302 calc(1*50.588%) ...` | CSS |
| `--checkpoint-welcome-gradient-start-raw` | `hsl(149.302 calc(1*50.588%) 50%/1)` | CSS |
| `--checkpoint-welcome-gradient-start-raw-hsl` | `149.302 calc(1*50.588%) 50%` | CSS |
| `--checkpoint-welcome-primary` | `color-mix(in oklab,hsl(143.316 calc(1*83.55%) 5...` | CSS |
| `--checkpoint-welcome-secondary` | `color-mix(in oklab,hsl(143.673 calc(1*78.61%) 3...` | CSS |
| `--checkpoint-welcome-secondary-raw` | `hsl(143.673 calc(1*78.61%) 36.667%/1)` | CSS |
| `--checkpoint-welcome-secondary-raw-hsl` | `143.673 calc(1*78.61%) 36.667%` | CSS |
| `--chip-blurple-dark-text` | `hsl(232.5 calc(1*100%) 95.294%/1)` | CSS |
| `--chip-blurple-light-text` | `hsl(225.652 calc(1*65.714%) 13.725%/1)` | CSS |
| `--chip-blurple-medium-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--chip-gray-dark-text` | `hsl(240 calc(1*5.263%) 92.549%/1)` | CSS |
| `--chip-gray-light-text` | `hsl(240 calc(1*5.455%) 21.569%/1)` | CSS |
| `--chip-gray-medium-text` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--chip-purple-dark-text` | `hsl(225 calc(1*5.882%) 86.667%/1)` | CSS |
| `--chip-purple-light-text` | `hsl(230 calc(1*6.818%) 17.255%/1)` | CSS |
| `--chip-purple-medium-text` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--collapse-easing-function` | `ease-in` | CSS |
| `--collapse-fade-duration` | `150ms` | CSS |
| `--collapse-structural-duration` | `150ms` | CSS |
| `--content-inventory-media-seekbar-container` | `color-mix(in oklab,hsl(240 calc(1*4.762%) 79.41...` | CSS |
| `--content-inventory-overlay-ui-mod` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/0.7) 1...` | CSS |
| `--content-inventory-overlay-ui-mod-bg` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.1) 100...` | CSS |
| `--contrast` | `1` | CSS |
| `--control-connect-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connect-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-connect-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-critical-secondary-icon-active` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-critical-secondary-icon-default` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-critical-secondary-icon-hover` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-expressive-icon-active` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-icon-default` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-expressive-icon-hover` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-icon-active-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-critical-secondary-loading` | `hsl(1.353 calc(1*82.609%) 68.431%/1)` | CSS |
| `--control-icon-expressive-loading` | `hsl(0 calc(1*0%) 0%/1)` | CSS |
| `--control-icon-icon-only-loading` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-icon-only-icon-active` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-icon-only-icon-default` | `hsl(240 calc(1*4.294%) 68.039%/1)` | CSS |
| `--control-icon-only-icon-hover` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-icon-overlay-secondary-loading` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-icon-secondary-loading` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-item-height-md` | `40px` | CSS |
| `--control-item-height-sm` | `32px` | CSS |
| `--control-overlay-secondary-icon-active` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-icon-default` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-overlay-secondary-icon-hover` | `hsl(0 calc(1*0%) 100%/1)` | CSS |
| `--control-secondary-icon-active` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-icon-default` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--control-secondary-icon-hover` | `hsl(0 calc(1*0%) 98.431%/1)` | CSS |
| `--creator-revenue-icon-gradient-end` | `color-mix(in oklab,hsl(184.154 calc(1*95.588%) ...` | CSS |
| `--creator-revenue-icon-gradient-start` | `color-mix(in oklab,hsl(184.948 calc(1*41.991%) ...` | CSS |
| `--creator-revenue-info-box-border` | `color-mix(in oklab,hsl(184.909 calc(1*57.895%) ...` | CSS |
| `--creator-revenue-progress-bar` | `color-mix(in oklab,hsl(184.909 calc(1*57.895%) ...` | CSS |
| `--crunchyroll` | `hsl(29.289 calc(1*92.952%) 55.49%/1)` | CSS |
| `--crunchyroll-hsl` | `29.289 calc(1*92.952%) 55.49%` | CSS |
| `--decoration-to-avatar-ratio` | `1.2` | CSS |
| `--deprecated-card-bg` | `color-mix(in oklab,hsl(225 calc(1*6.25%) 12.549...` | CSS |
| `--deprecated-card-editable-bg` | `color-mix(in oklab,hsl(225 calc(1*6.25%) 12.549...` | CSS |
| `--ebay` | `hsl(211.429 calc(1*100%) 41.176%/1)` | CSS |
| `--ebay-hsl` | `211.429 calc(1*100%) 41.176%` | CSS |
| `--embed-title` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--epic-games` | `hsl(34.286 calc(1*6.195%) 22.157%/1)` | CSS |
| `--epic-games-hsl` | `34.286 calc(1*6.195%) 22.157%` | CSS |
| `--expand-easing-function` | `ease-out` | CSS |
| `--expand-fade-duration` | `200ms` | CSS |
| `--expand-structural-duration` | `100ms` | CSS |
| `--experimental-avatar-embed-bg` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.521568...` | CSS |
| `--expression-picker-bg` | `color-mix(in oklab,hsl(240 calc(1*7.143%) 10.98...` | CSS |
| `--expressive-gradient-purple-end` | `color-mix(in oklab,hsl(260.87 calc(1*72.327%) 3...` | CSS |
| `--expressive-gradient-purple-start` | `color-mix(in oklab,hsl(268.462 calc(1*85.714%) ...` | CSS |
| `--expressive-gradient-tenure-badge-bronze-end` | `color-mix(in oklab,hsl(15 calc(1*92.035%) 44.31...` | CSS |
| `--expressive-gradient-tenure-badge-bronze-start` | `color-mix(in oklab,hsl(25.532 calc(1*98.947%) 6...` | CSS |
| `--expressive-gradient-tenure-badge-diamond-end` | `color-mix(in oklab,hsl(264.275 calc(1*59.817%) ...` | CSS |
| `--expressive-gradient-tenure-badge-diamond-start` | `color-mix(in oklab,hsl(268.462 calc(1*85.714%) ...` | CSS |
| `--expressive-gradient-tenure-badge-emerald-end` | `color-mix(in oklab,hsl(149.048 calc(1*79.747%) ...` | CSS |
| `--expressive-gradient-tenure-badge-emerald-start` | `color-mix(in oklab,hsl(143.804 calc(1*83.636%) ...` | CSS |
| `--expressive-gradient-tenure-badge-gold-end` | `color-mix(in oklab,hsl(34.412 calc(1*61.818%) 4...` | CSS |
| `--expressive-gradient-tenure-badge-gold-start` | `color-mix(in oklab,hsl(42.551 calc(1*89.091%) 5...` | CSS |
| `--expressive-gradient-tenure-badge-opal-end` | `color-mix(in oklab,hsl(209.339 calc(1*100%) 44....` | CSS |
| `--expressive-gradient-tenure-badge-opal-start` | `color-mix(in oklab,hsl(185.517 calc(1*37.991%) ...` | CSS |
| `--expressive-gradient-tenure-badge-platinum-end` | `color-mix(in oklab,hsl(184.444 calc(1*94.737%) ...` | CSS |
| `--expressive-gradient-tenure-badge-platinum-start` | `color-mix(in oklab,hsl(185.455 calc(1*45.562%) ...` | CSS |
| `--expressive-gradient-tenure-badge-ruby-end` | `color-mix(in oklab,hsl(354.217 calc(1*79.048%) ...` | CSS |
| `--expressive-gradient-tenure-badge-ruby-start` | `color-mix(in oklab,hsl(358.431 calc(1*68.61%) 5...` | CSS |
| `--expressive-gradient-tenure-badge-silver-end` | `color-mix(in oklab,hsl(240 calc(1*6.294%) 28.03...` | CSS |
| `--expressive-gradient-tenure-badge-silver-start` | `color-mix(in oklab,hsl(225 calc(1*4.762%) 83.52...` | CSS |
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
| `--icon-default` | `color-mix(in oklab,hsl(240 calc(1*3.226%) 93.92...` | CSS |
| `--icon-feedback-critical` | `color-mix(in oklab,hsl(1.353 calc(1*82.609%) 68...` | CSS |
| `--icon-feedback-info` | `color-mix(in oklab,hsl(213.423 calc(1*82.32%) 6...` | CSS |
| `--icon-feedback-positive` | `color-mix(in oklab,hsl(132.809 calc(1*34.902%) ...` | CSS |
| `--icon-feedback-warning` | `color-mix(in oklab,hsl(34 calc(1*50.847%) 53.72...` | CSS |
| `--icon-invert` | `color-mix(in oklab,hsl(230 calc(1*6%) 19.608%/1...` | CSS |
| `--icon-link` | `color-mix(in oklab,hsl(213.077 calc(1*81.25%) 6...` | CSS |
| `--icon-muted` | `color-mix(in oklab,hsl(232.5 calc(1*3.883%) 59....` | CSS |
| `--icon-strong` | `color-mix(in oklab,hsl(0 calc(1*0%) 98.431%/1) ...` | CSS |
| `--icon-subtle` | `color-mix(in oklab,hsl(240 calc(1*4.294%) 68.03...` | CSS |
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
| `--live-stage-tile-border` | `color-mix(in oklab,hsl(234.545 calc(1*6.509%) 3...` | CSS |
| `--logo-primary` | `color-mix(in oklab,hsl(0 calc(1*0%) 100%/1) 100...` | CSS |
| `--lol` | `hsl(190.286 calc(1*89.744%) 7.647%/1)` | CSS |
| `--lol-hsl` | `190.286 calc(1*89.744%) 7.647%` | CSS |
| `--mention-foreground` | `color-mix(in oklab,hsl(228.14 calc(1*100%) 83.1...` | CSS |
| `--menu-item-danger-active-bg` | `color-mix(in oklab,hsl(355.714 calc(1*64.948%) ...` | CSS |
| `--menu-item-danger-hover-bg` | `color-mix(in oklab,hsl(355.636 calc(1*64.706%) ...` | CSS |
| `--menu-item-default-active-bg` | `color-mix(in oklab,hsl(233.115 calc(1*49.194%) ...` | CSS |
| `--menu-item-default-hover-bg` | `color-mix(in oklab,hsl(234.935 calc(1*85.556%) ...` | CSS |
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
| `--overlay-backdrop-default` | `color-mix(in oklab,hsl(0 calc(1*0%) 0%/0.721568...` | CSS |
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
| `--plum-10` | `hsl(233.333 calc(1*3.734%) 52.745%/1)` | CSS |
| `--plum-10-hsl` | `233.333 calc(1*3.734%) 52.745%` | CSS |
| `--plum-11` | `hsl(234 calc(1*4.386%) 44.706%/1)` | CSS |
| `--plum-11-hsl` | `234 calc(1*4.386%) 44.706%` | CSS |
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
| `--plum-2` | `hsl(240 calc(1*5.263%) 92.549%/1)` | CSS |
| `--plum-2-hsl` | `240 calc(1*5.263%) 92.549%` | CSS |
| `--plum-20` | `hsl(240 calc(1*6.452%) 12.157%/1)` | CSS |
| `--plum-20-hsl` | `240 calc(1*6.452%) 12.157%` | CSS |
| `--plum-21` | `hsl(240 calc(1*7.143%) 10.98%/1)` | CSS |
| `--plum-21-hsl` | `240 calc(1*7.143%) 10.98%` | CSS |
| `--plum-22` | `hsl(240 calc(1*6.383%) 9.216%/1)` | CSS |
| `--plum-22-hsl` | `240 calc(1*6.383%) 9.216%` | CSS |
| `--plum-23` | `hsl(220 calc(1*7.317%) 8.039%/1)` | CSS |
| `--plum-23-alpha` | `hsl(240 calc(1*63.415%) 83.922%/0.1)` | CSS |
| `--plum-23-alpha-hsl` | `240 calc(1*63.415%) 83.922%` | CSS |
| `--plum-23-hsl` | `220 calc(1*7.317%) 8.039%` | CSS |
| `--plum-24` | `hsl(240 calc(1*8.571%) 6.863%/1)` | CSS |
| `--plum-24-hsl` | `240 calc(1*8.571%) 6.863%` | CSS |
| `--plum-25` | `hsl(240 calc(1*7.692%) 5.098%/1)` | CSS |
| `--plum-25-hsl` | `240 calc(1*7.692%) 5.098%` | CSS |
| `--plum-26` | `hsl(240 calc(1*12.5%) 3.137%/1)` | CSS |
| `--plum-26-hsl` | `240 calc(1*12.5%) 3.137%` | CSS |
| `--plum-3` | `hsl(240 calc(1*5.66%) 89.608%/1)` | CSS |
| `--plum-3-hsl` | `240 calc(1*5.66%) 89.608%` | CSS |
| `--plum-4` | `hsl(220 calc(1*4.918%) 88.039%/1)` | CSS |
| `--plum-4-hsl` | `220 calc(1*4.918%) 88.039%` | CSS |
| `--plum-5` | `hsl(225 calc(1*4.762%) 83.529%/1)` | CSS |
| `--plum-5-hsl` | `225 calc(1*4.762%) 83.529%` | CSS |
| `--plum-6` | `hsl(240 calc(1*4.762%) 79.412%/1)` | CSS |
| `--plum-6-hsl` | `240 calc(1*4.762%) 79.412%` | CSS |
| `--plum-7` | `hsl(240 calc(1*4.478%) 73.725%/1)` | CSS |
| `--plum-7-hsl` | `240 calc(1*4.478%) 73.725%` | CSS |
| `--plum-8` | `hsl(240 calc(1*4.294%) 68.039%/1)` | CSS |
| `--plum-8-hsl` | `240 calc(1*4.294%) 68.039%` | CSS |
| `--plum-9` | `hsl(232.5 calc(1*4%) 60.784%/1)` | CSS |
| `--plum-9-hsl` | `232.5 calc(1*4%) 60.784%` | CSS |
| `--polls-normal-fill-hover` | `color-mix(in oklab,hsl(231.429 calc(1*6.542%) 2...` | CSS |
| `--polls-victor-fill` | `color-mix(in oklab,hsl(134.526 calc(1*41.485%) ...` | CSS |
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
| `--scrollbar-auto-scrollbar-color-thumb` | `color-mix(in oklab,hsl(234 calc(1*4.808%) 40.78...` | CSS |
| `--scrollbar-auto-scrollbar-color-track` | `color-mix(in oklab,hsl(240 calc(1*6.667%) 8.824...` | CSS |
| `--scrollbar-auto-thumb` | `color-mix(in oklab,hsl(234.545 calc(1*5.116%) 4...` | CSS |
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
| `--switch-thumb-foreground-hover` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--switch-thumb-icon-active` | `hsl(234.935 calc(1*85.556%) 64.706%/1)` | CSS |
| `--switch-thumb-icon-default` | `hsl(230 calc(1*6%) 19.608%/1)` | CSS |
| `--textbox-markdown-syntax` | `color-mix(in oklab,hsl(232.5 calc(1*4%) 60.784%...` | CSS |
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
| `ALERT_BG` | `{}` | JS |
| `APP_MESSAGE_EMBED_SECONDARY_TEXT` | `{}` | JS |
| `APPLICATION_SUBSCRIPTION_END` | `#0177a4` | JS |
| `APPLICATION_SUBSCRIPTION_START` | `#3442d9` | JS |
| `BATTLENET` | `#009ae5` | JS |
| `BLACK` | `#000000` | JS |
| `BLUR_FALLBACK` | `{}` | JS |
| `BLUR_FALLBACK_PRESSED` | `{}` | JS |
| `BLURPLE_1` | `#e7eaff` | JS |
| `BLURPLE_10` | `#c7d2ff` | JS |
| `BLURPLE_100` | `#000000` | JS |
| `BLURPLE_11` | `#c3cfff` | JS |
| `BLURPLE_12` | `#c0cdff` | JS |
| `BLURPLE_13` | `#bdcaff` | JS |
| `BLURPLE_14` | `#b9c7ff` | JS |
| `BLURPLE_15` | `#b6c5ff` | JS |
| `BLURPLE_16` | `#b3c2ff` | JS |
| `BLURPLE_17` | `#afbfff` | JS |
| `BLURPLE_18` | `#acbdff` | JS |
| `BLURPLE_19` | `#a9baff` | JS |
| `BLURPLE_2` | `#e3e7ff` | JS |
| `BLURPLE_20` | `#a6b7ff` | JS |
| `BLURPLE_21` | `#a3b4fe` | JS |
| `BLURPLE_22` | `#9fb2fe` | JS |
| `BLURPLE_23` | `#9caffe` | JS |
| `BLURPLE_24` | `#99acfd` | JS |
| `BLURPLE_25` | `#96aafd` | JS |
| `BLURPLE_26` | `#93a7fd` | JS |
| `BLURPLE_27` | `#90a4fc` | JS |
| `BLURPLE_28` | `#8da1fc` | JS |
| `BLURPLE_29` | `#8b9ffb` | JS |
| `BLURPLE_3` | `#dfe4ff` | JS |
| `BLURPLE_30` | `#889cfb` | JS |
| `BLURPLE_31` | `#8599fb` | JS |
| `BLURPLE_32` | `#8296fa` | JS |
| `BLURPLE_33` | `#7f94fa` | JS |
| `BLURPLE_34` | `#7d91f9` | JS |
| `BLURPLE_35` | `#7a8ef9` | JS |
| `BLURPLE_36` | `#778bf8` | JS |
| `BLURPLE_37` | `#7588f8` | JS |
| `BLURPLE_38` | `#7286f7` | JS |
| `BLURPLE_39` | `#6f83f7` | JS |
| `BLURPLE_4` | `#dce2ff` | JS |
| `BLURPLE_40` | `#6d80f6` | JS |
| `BLURPLE_41` | `#6a7df6` | JS |
| `BLURPLE_42` | `#687af5` | JS |
| `BLURPLE_43` | `#6677f5` | JS |
| `BLURPLE_44` | `#6374f4` | JS |
| `BLURPLE_45` | `#6171f4` | JS |
| `BLURPLE_46` | `#5f6ef3` | JS |
| `BLURPLE_47` | `#5c6bf3` | JS |
| `BLURPLE_48` | `#5a68f2` | JS |
| `BLURPLE_49` | `#5865f2` | JS |
| `BLURPLE_5` | `#d8dfff` | JS |
| `BLURPLE_50` | `#5865f2` | JS |
| `BLURPLE_51` | `#5663ec` | JS |
| `BLURPLE_52` | `#5461e6` | JS |
| `BLURPLE_53` | `#525fe0` | JS |
| `BLURPLE_54` | `#505edb` | JS |
| `BLURPLE_55` | `#4e5cd5` | JS |
| `BLURPLE_56` | `#4c5ad0` | JS |
| `BLURPLE_57` | `#4a58cb` | JS |
| `BLURPLE_58` | `#4856c6` | JS |
| `BLURPLE_59` | `#4654c0` | JS |
| `BLURPLE_6` | `#d5dcff` | JS |
| `BLURPLE_60` | `#4452bb` | JS |
| `BLURPLE_61` | `#4250b6` | JS |
| `BLURPLE_62` | `#404eb2` | JS |
| `BLURPLE_63` | `#3e4cad` | JS |
| `BLURPLE_64` | `#3c4aa8` | JS |
| `BLURPLE_65` | `#3a48a3` | JS |
| `BLURPLE_66` | `#38469f` | JS |
| `BLURPLE_67` | `#36449a` | JS |
| `BLURPLE_68` | `#344296` | JS |
| `BLURPLE_69` | `#324091` | JS |
| `BLURPLE_7` | `#d1daff` | JS |
| `BLURPLE_70` | `#303e8d` | JS |
| `BLURPLE_71` | `#2e3c89` | JS |
| `BLURPLE_72` | `#2c3a84` | JS |
| `BLURPLE_73` | `#2a3880` | JS |
| `BLURPLE_74` | `#28367c` | JS |
| `BLURPLE_75` | `#273578` | JS |
| `BLURPLE_76` | `#253373` | JS |
| `BLURPLE_77` | `#23316f` | JS |
| `BLURPLE_78` | `#212f6b` | JS |
| `BLURPLE_79` | `#1f2d67` | JS |
| `BLURPLE_8` | `#ced7ff` | JS |
| `BLURPLE_80` | `#1d2b63` | JS |
| `BLURPLE_81` | `#1c295f` | JS |
| `BLURPLE_82` | `#1a275b` | JS |
| `BLURPLE_83` | `#182558` | JS |
| `BLURPLE_84` | `#172454` | JS |
| `BLURPLE_85` | `#152250` | JS |
| `BLURPLE_86` | `#13204c` | JS |
| `BLURPLE_87` | `#121e48` | JS |
| `BLURPLE_88` | `#101c45` | JS |
| `BLURPLE_89` | `#0f1a41` | JS |
| `BLURPLE_9` | `#cad5ff` | JS |
| `BLURPLE_90` | `#0d193d` | JS |
| `BLURPLE_91` | `#0c173a` | JS |
| `BLURPLE_92` | `#0a1536` | JS |
| `BLURPLE_93` | `#091332` | JS |
| `BLURPLE_94` | `#07112e` | JS |
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
| `CHECKPOINT_EMOJIS_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_EMOJIS_GRADIENT_END_RAW` | `#1d0b24` | JS |
| `CHECKPOINT_EMOJIS_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_EMOJIS_GRADIENT_START_RAW` | `#7d42f2` | JS |
| `CHECKPOINT_EMOJIS_PRIMARY` | `{}` | JS |
| `CHECKPOINT_EMOJIS_SECONDARY` | `{}` | JS |
| `CHECKPOINT_EMOJIS_SECONDARY_RAW` | `#a365e6` | JS |
| `CHECKPOINT_END_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_END_GRADIENT_END_RAW` | `#113e27` | JS |
| `CHECKPOINT_END_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_END_GRADIENT_START_RAW` | `#3fc07e` | JS |
| `CHECKPOINT_END_PRIMARY` | `{}` | JS |
| `CHECKPOINT_END_SECONDARY` | `{}` | JS |
| `CHECKPOINT_END_SECONDARY_RAW` | `#14a74e` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_END_RAW` | `#230a57` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_FRIENDS_GRADIENT_START_RAW` | `#591efb` | JS |
| `CHECKPOINT_FRIENDS_PRIMARY` | `{}` | JS |
| `CHECKPOINT_FRIENDS_SECONDARY` | `{}` | JS |
| `CHECKPOINT_FRIENDS_SECONDARY_RAW` | `#616abb` | JS |
| `CHECKPOINT_GAMING_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_GAMING_GRADIENT_END_RAW` | `#24170b` | JS |
| `CHECKPOINT_GAMING_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_GAMING_GRADIENT_START_RAW` | `#ff7f12` | JS |
| `CHECKPOINT_GAMING_PRIMARY` | `{}` | JS |
| `CHECKPOINT_GAMING_SECONDARY` | `{}` | JS |
| `CHECKPOINT_GAMING_SECONDARY_RAW` | `#cb630f` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_END_RAW` | `#0b2420` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_GUILDS_GRADIENT_START_RAW` | `#0ce7c1` | JS |
| `CHECKPOINT_GUILDS_PRIMARY` | `{}` | JS |
| `CHECKPOINT_GUILDS_SECONDARY` | `{}` | JS |
| `CHECKPOINT_GUILDS_SECONDARY_RAW` | `#1c9681` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_END_RAW` | `#240e0b` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_MESSAGES_GRADIENT_START_RAW` | `#fe3ee2` | JS |
| `CHECKPOINT_MESSAGES_PRIMARY` | `{}` | JS |
| `CHECKPOINT_MESSAGES_SECONDARY` | `{}` | JS |
| `CHECKPOINT_MESSAGES_SECONDARY_RAW` | `#aa1d86` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_END_RAW` | `#493015` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_GRADIENT_START_RAW` | `#d9b777` | JS |
| `CHECKPOINT_PERSONA_EIGHT_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_EIGHT_SECONDARY_RAW` | `#ad8a46` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_END_RAW` | `#61132e` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_FIVE_GRADIENT_START_RAW` | `#f75990` | JS |
| `CHECKPOINT_PERSONA_FIVE_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FIVE_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FIVE_SECONDARY_RAW` | `#d42361` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_END_RAW` | `#240e0b` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_FOUR_GRADIENT_START_RAW` | `#fe3ee2` | JS |
| `CHECKPOINT_PERSONA_FOUR_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FOUR_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_FOUR_SECONDARY_RAW` | `#aa1d86` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_END_RAW` | `#3f3f3f` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_NINE_GRADIENT_START_RAW` | `#eeeeee` | JS |
| `CHECKPOINT_PERSONA_NINE_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_NINE_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_NINE_SECONDARY_RAW` | `#a9a9a9` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_END_RAW` | `#114239` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_ONE_GRADIENT_START_RAW` | `#5efde2` | JS |
| `CHECKPOINT_PERSONA_ONE_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ONE_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ONE_SECONDARY_RAW` | `#1c9681` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_END_RAW` | `#5a3107` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_SEVEN_GRADIENT_START_RAW` | `#ffe047` | JS |
| `CHECKPOINT_PERSONA_SEVEN_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SEVEN_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SEVEN_SECONDARY_RAW` | `#b69c1b` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_END_RAW` | `#24170b` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_SIX_GRADIENT_START_RAW` | `#ff7f12` | JS |
| `CHECKPOINT_PERSONA_SIX_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SIX_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_SIX_SECONDARY_RAW` | `#cb630f` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_END_RAW` | `#1d0b24` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_THREE_GRADIENT_START_RAW` | `#7d42f2` | JS |
| `CHECKPOINT_PERSONA_THREE_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_THREE_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_THREE_SECONDARY_RAW` | `#a365e6` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_END_RAW` | `#230a57` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_TWO_GRADIENT_START_RAW` | `#591efb` | JS |
| `CHECKPOINT_PERSONA_TWO_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_TWO_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_TWO_SECONDARY_RAW` | `#616abb` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_END_RAW` | `#113e27` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_PERSONA_ZERO_GRADIENT_START_RAW` | `#3fc07e` | JS |
| `CHECKPOINT_PERSONA_ZERO_PRIMARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ZERO_SECONDARY` | `{}` | JS |
| `CHECKPOINT_PERSONA_ZERO_SECONDARY_RAW` | `#14a74e` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_END_RAW` | `#1d0b24` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_QUESTS_GRADIENT_START_RAW` | `#7d42f2` | JS |
| `CHECKPOINT_QUESTS_PRIMARY` | `{}` | JS |
| `CHECKPOINT_QUESTS_SECONDARY` | `{}` | JS |
| `CHECKPOINT_QUESTS_SECONDARY_RAW` | `#a365e6` | JS |
| `CHECKPOINT_VOICE_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_VOICE_GRADIENT_END_RAW` | `#5a3107` | JS |
| `CHECKPOINT_VOICE_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_VOICE_GRADIENT_START_RAW` | `#ffe047` | JS |
| `CHECKPOINT_VOICE_PRIMARY` | `{}` | JS |
| `CHECKPOINT_VOICE_SECONDARY` | `{}` | JS |
| `CHECKPOINT_VOICE_SECONDARY_RAW` | `#b69c1b` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_END` | `{}` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_END_RAW` | `#113e27` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_START` | `{}` | JS |
| `CHECKPOINT_WELCOME_GRADIENT_START_RAW` | `#3fc07e` | JS |
| `CHECKPOINT_WELCOME_PRIMARY` | `{}` | JS |
| `CHECKPOINT_WELCOME_SECONDARY` | `{}` | JS |
| `CHECKPOINT_WELCOME_SECONDARY_RAW` | `#14a74e` | JS |
| `COACHMARK_BG` | `{}` | JS |
| `CONTENT_INVENTORY_OVERLAY_UI_MOD` | `{}` | JS |
| `CONTENT_INVENTORY_OVERLAY_UI_MOD_BG` | `{}` | JS |
| `CRUNCHYROLL` | `#f78b24` | JS |
| `EBAY` | `#0064d2` | JS |
| `EMBED_TITLE` | `{}` | JS |
| `EPIC_GAMES` | `#3c3935` | JS |
| `EXPRESSION_PICKER_BG` | `{}` | JS |
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
| `LIVE_STAGE_TILE_BORDER` | `{}` | JS |
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
| `OVERLAY_BACKDROP_DEFAULT` | `{}` | JS |
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
| `POLLS_NORMAL_FILL_HOVER` | `{}` | JS |
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
| `TOAST_BG` | `{}` | JS |
| `TRANSPARENT` | `#00000000` | JS |
| `TWITCH` | `#9147ff` | JS |
| `TWITCH_SECONDARY` | `#772ce8` | JS |
| `TWITTER` | `#1da1f2` | JS |
| `TYPING_INDICATOR_BG` | `{}` | JS |
| `VOICE_VIDEO_VIDEO_TILE_BLUR_FALLBACK` | `{}` | JS |
| `WHITE` | `#ffffff` | JS |
| `XBOX` | `#107c10` | JS |
| `YOUTUBE` | `#cb2120` | JS |

*Total: 1246 variables*

---

## Summary

- **Total CSS Variables:** 4719
- **Total JS Constants:** 2115
- **Grand Total:** 6834

## Usage

### CSS Variables
```css
.my-element {
  color: var(--text-primary);
  background: var(--background-secondary);
}
```

### JS Constants (via BdApi)
```javascript
const colors = BdApi.Webpack.getByKeys('colors').colors;
const bgPrimary = colors.BACKGROUND_PRIMARY;
```
