# Discord Modal Webpack Module — Export Map

> Module retrieved via `BdApi.Webpack.getByKeys("Modal")`
> This is actually a **mega-module** that re-exports Discord's entire "Mana" design system, not just modals.

---

## Named Exports (survived minification)

| Key | Identity | Notes |
|---|---|---|
| `Modal` | **Modal** | Main modal component. Props: `size`, `title`, `subtitle`, `input`, `preview`, `actions`, `actionBarInput`, `listProps`, `notice`, `children` |
| `ConfirmModal` | **ConfirmModal** | Confirmation dialog. Props: `confirmText`, `cancelText`, `checkboxProps`, `onConfirm`, `onCancel`, `onCloseCallback`, `variant="critical"` |
| `ExpressiveModal` | **ExpressiveModal** | Fancy modal with gradient header. Props: `size="md"`, `gradientColor="purple"`, `graphic`, `badge`, `title`, `subtitle`, `actionBarInput`, `actions` |

---

## Enums & Constants

| Key | Identity | Values |
|---|---|---|
| `F2Z` | **BackdropStyle** | `{DARK, LIGHTBOX, IMMERSIVE, SUBTLE, BLUR, TOP_RADIAL}` |
| `BWP` | **RiveLoadingStatus** | `{Loading: "loading", Loaded: "loaded"}` |
| `YCn` | **NoticeType** | `{WARNING: "warn", INFO: "info", ERROR: "danger", POSITIVE: "positive", PREVIEW: "preview"}` |
| `WD7` | **SpringConfig** | `{immediate: boolean}` — spring animation config |

---

## React Contexts

| Key | Identity | Notes |
|---|---|---|
| `CZY` | **React Context** | `_currentValue` is object — likely ManaContext or ThemeContext |
| `MVj` | **React Context** | `_currentValue` is object |
| `VOr` | **React Context** | `_currentValue` is object |
| `Vs9` | **React Context** | `_currentValue` is object |
| `_zY` | **React Context** | `_currentValue` is undefined — likely FieldContext or internal |

---

## Modal / Dialog System

| Key | Identity | Evidence |
|---|---|---|
| `Modal` | **Modal** | (see above) |
| `ConfirmModal` | **ConfirmModal** | (see above) |
| `ExpressiveModal` | **ExpressiveModal** | (see above) |
| `H7u` | **ActionBar / ModalFooter** | `{leading, actions[], actionsFullWidth, leadingLayout}` — renders `<footer>` with action buttons |
| `JnF` | **CloseButton** | Renders `XLargeIcon` with `CLOSE_BUTTON_LABEL`, `variant="icon-only"` |
| `M_l` | **ModalButtonRow / ActionRow** | Horizontal flex container, gap 8, align end — wraps action buttons |

---

## Layout & Scrolling

| Key | Identity | Evidence |
|---|---|---|
| `ArX` | **Scroller** (forwardRef) | `<div>` with scroll behavior, `paddingFix`, `fade`, `orientation` |
| `IpV` | **Scroller** variant | Same signature as ArX, different scroll specs |
| `ChK` | **AdvancedScroller** (forwardRef) | `overflow="scroll"`, `fade`, `customTheme`, `gap`, `disableFocusRingScope` |
| `GtU` | **AdvancedScroller** variant | Same as ChK, likely different default config |
| `BJc` | **Stack / Flex** (forwardRef) | `as="div"`, `gap`, `direction`, `align`, `justify`, `wrap`, `padding`, `fullWidth` |
| `$Kl` | **createVirtualizedList** (factory) | 4 params, creates forwardRef list with `sections`, `sectionHeight`, `rowHeight`, ResizeObserver |
| `Eie` | **VirtualizedList** instance (forwardRef) | `sections`, `renderSection`, `renderRow`, `renderFooter`, `renderSidebar` |
| `OZj` | **VirtualizedList** instance (forwardRef) | Same signature as Eie — different specs |
| `XIK` | **ScrollableContainer** | Wrapper with `header`, `footer`, `children` in scrollable area |

---

## Layer / Popout System

| Key | Identity | Evidence |
|---|---|---|
| `AyR` | **createLayerSystem** (factory) | Returns `{LayerProvider, LayerContainer, Layer, layerContext}` — sets displayNames |
| `Wdr` | **Layer** (consumer) | Reads from `layerContext.Consumer` |
| `QCO` | **Popout** (class component) | `nudgeAlignIntoViewport`, `spacing`, `autoInvert`, `position`, calculates absolute positioning |

---

## Heading System

| Key | Identity | Evidence |
|---|---|---|
| `H` | **Heading** (native) | Renders `<h1>`–`<h6>` based on heading level from context |
| `DZT` | **Heading** (styled, forwardRef) | Same as H but with variant prop + Text component styling |
| `$Il` | **useHeadingLevel** (hook) | `getLevelAndMarkUsed` from HeadingLevel context |
| `Fmo` | **HeadingLevelProvider** | `{component, children, forceLevel}` — increments heading level for children |

---

## Text & Typography

| Key | Identity | Evidence |
|---|---|---|
| `EYj` | **Text** (forwardRef) | `variant`, `tag="div"`, `selectable`, `lineClamp`, `color`, `tabularNumbers`, `scaleFontToUserSetting` |

---

## Buttons

| Key | Identity | Evidence |
|---|---|---|
| `SCx` | **Button** (Mana) | `variant="primary"`, `size="md"`, `text`, `icon`, `iconPosition`, `fullWidth`, `loading`, `rounded`, `focusProps` |
| `TVs` | **IconButton** | Wraps Button with `text=void 0, fullWidth=false` |
| `QWc` | **TextButton** | `text`, `textVariant`, `variant="primary"`, `lineClamp`, `focusProps` |
| `DMX` | **PlayPauseButton** | Toggles between `PlayIcon`/`PauseIcon` based on `playing` prop |
| `DUT` | **Clickable** (class) | `<div role="button">` with Space/Enter keyboard handling, `tabIndex=0` |

---

## Form Controls

| Key | Identity | Evidence |
|---|---|---|
| `D0$` | **FormField / Field** | `label`, `hideLabel`, `required`, `disabled`, `description`, `errorMessage`, `layout="vertical"`, `badge`, `icon` |
| `$dE` | **TextInputField** | Wraps TextInput inside FormField (label, description, required, errorMessage) |
| `FON` | **InputContainer** | `as`, `readOnly`, `disabled`, `fullWidth`, `validation`, `data-error`, `data-read-only` |
| `KjF` | **Checkbox** (legacy) | `disabled`, `readOnly`, `value`, `size=24`, `type="default"`, `shape` (BOX), `onChange`, `reverse` |
| `JuY` | **Checkbox** (Mana) | `checked`, `description`, `onChange`, `disabled`, `leadingIcon`, `labelType`, animations |
| `P7L` | **CheckboxIndicator** | Display-only checkbox indicator, `checked`, `disabled`, `size` |
| `$QX` | **CheckboxGroup** | `onChange`, `options`, `selectedValues`, `disabled` — with Mana toggle experiment |
| `Ad5` | **ToggleField / SwitchField** | `checked`, `disabled`, `onChange` wrapped in horizontal FormField |
| `TOt` | **Switch / Toggle** | Animated toggle with spring animation, `checked`, `onChange`, `disabled` |
| `Sc0` | **Radio** | Renders new or legacy radio based on `mana-toggle-inputs` experiment |
| `TN6` | **RadioIndicator** | Renders new or legacy radio indicator based on experiment |
| `CR_` | **ListBox** | `listRef`, `label`, `selectionMode`, `disabledKeys`, `items`, `onRemove`, keyboard nav |
| `_uI` | **useRadioGroup** (hook) | Returns radio group props — `orientation`, `isDisabled`, focus management |
| `GxR` | **getRadioProps** (utility) | `{isSelected, label}` → `{role: "radio", tabIndex, aria-label, aria-checked}` |

---

## Tab System

| Key | Identity | Evidence |
|---|---|---|
| `VQ0` | **TabBar** (class) | Statics: `Header`, `Item`, `Separator`, `Panel` — focus management for `[role="tab"]` elements |

---

## Rive Animations

| Key | Identity | Default Artboard |
|---|---|---|
| `MgY` | **RiveAnimation** (generic) | `"Artboard"` |
| `E_w` | **RiveAnimation** (Game Server Hosting) | `"Game_Server_Hosting_Main"` |
| `Rfp` | **RiveAnimation** (Wumpus) | `"Wumpus"` |
| `Zd_` | **RiveAnimation** (Wumpus) variant | `"Wumpus"` |
| `Vs8` | **RiveAnimation** (Icon Unlock) | `"Icon Unlock"` |
| `CEU` | **useRiveAsset** (hook) | Loads & caches Rive files, returns `{status, buffer}` |
| `DSP` | **setRiveOverride** | `(key, value)` → sets override in Rive cache store |
| `GyQ` | **getRiveOverride** | `(key)` → reads from Rive override cache |
| `BWP` | **RiveLoadingStatus** | `{Loading, Loaded}` |

---

## Lottie Animation

| Key | Identity | Evidence |
|---|---|---|
| `akl` | **LottieAnimation** (class) | `loop`, `autoplay`, `renderer="svg"`, `importData`, `shouldAnimate`, `resetOnPlay`, Renderers static |

---

## Progress Indicators

| Key | Identity | Evidence |
|---|---|---|
| `a3E` | **ProgressRing / CircularProgress** (class) | `StrokeSizes` static, `percent`, `strokeSize`, renders SVG circle |
| `LvI` | **ProgressBar** | `percents`, `size="small"`, `foregroundColors`, `backgroundColor`, `animate` |

---

## Accessibility

| Key | Identity | Evidence |
|---|---|---|
| `AC4` | **VisuallyHidden** | `tag="span"`, `showOnFocus`, hides content visually but keeps for screen readers |
| `ORC` | **LiveRegion / Announcer** | `{announce, clearAnnouncements}` for ARIA live region |
| `Oky` | **FocusRingScope** | `keyboardModeEnabled`, `containerRef` — manages focus ring visibility |
| `OpQ` | **useKeydownListener** (hook) | Registers global `keydown` event listener |
| `RDc` | **BooleanContextProvider** | Wraps children with `Provider value={true}` — likely "inside modal" flag |

---

## Theming

| Key | Identity | Evidence |
|---|---|---|
| `NPJ` | **ThemeProvider** | `theme`, `gradient`, `disableAdaptiveTheme`, `reduceAdaptiveTheme`, `customBackgroundClassName` |
| `Mwr` | **isDarkTheme** (utility) | Returns `true` for DARK, MIDNIGHT, DARKER themes |

---

## Mana Design System Core

| Key | Identity | Evidence |
|---|---|---|
| `G98` | **useManaContext** (hook) | Reads ManaContext, warns if used outside Provider |
| `GE8` | **ManaProvider** | Wraps children with Mana context + IntlProvider locale |

---

## Utilities

| Key | Identity | Evidence |
|---|---|---|
| `HG$` | **portalContains** | Checks if element A contains element B, traversing portal boundaries |
| `JtX` | **getIconSize** | Maps size string (e.g. "md") to `{width, height}`, returns null for "custom" |
| `WHe` | **getSpaceVariable** | Reads CSS `--space-{n}` custom property value |
| `RJq` | **isMediaExtension** | Checks if file extension is in a media format list |
| `R7z` | **useScrollerContext** (hook) | Reads from context, returns memoized object |

---

## Misc Components

| Key | Identity | Evidence |
|---|---|---|
| `VeA` | **SectionHeader** | Renders eyebrow text in a styled container |
| `Exy` | **Badge** | `type`, `variant="default"`, `icon` — renders eyebrow-styled badge |
| `A0N` | **Styled wrapper** | Wraps `i.A0` with a className |
| `BFY` | **Styled wrapper** | Wraps `i.BF` with a className |
| `Hjg` | **Styled wrapper** | Wraps `i.fI` with a className |
| `$nd` | **Component passthrough** | Thin wrapper: `(e) => jsx(i.S, {...e})` |
| `K0` | **Component passthrough** | Thin wrapper: `(e) => jsx(i.T, {...e})` |
| `Utq` | **React.memo wrapper** | Memoized component |

---

## SVG Icons (~80% of all exports)

All share the identical signature:
```js
e => {
  let {size: t = "md", width: n, height: o,
       color: l = i.A.colors.INTERACTIVE_ICON_DEFAULT,
       colorClass: u = "", ...c} = e
  // renders <svg> with <path>
}
```

To identify which icon is which, you'd need to diff the SVG `<path d="...">` data. There are **hundreds** of these. They include icons like Close, Check, Arrow, Plus, Minus, Search, Settings, etc.

---

## Summary

| Category | Count |
|---|---|
| SVG Icons | ~350+ |
| Form Controls | ~12 |
| Layout/Scrolling | ~9 |
| Modal/Dialog | ~6 |
| Buttons | ~5 |
| Rive Animations | ~8 |
| Heading System | ~4 |
| Enums/Constants | ~4 |
| React Contexts | ~5 |
| Accessibility | ~5 |
| Layer/Popout | ~3 |
| Other Components | ~15 |
| Utilities | ~5 |

**This module is Discord's entire Mana (design system) component library**, not just a "Modal" module. `getByKeys("Modal")` found it because `Modal` happens to be one of its named exports.
