import { pt, pn } from '../helpers'

export default () => [
  pt('text', 'Text', 'Link label'),
  pt('iconF7', 'Icon', 'Framework7 icon to display (<a class="external text-color-blue" target="_blank" href="https://framework7.io/icons/">Framework7 icon</a>)'),
  pt('iconMaterial', 'Icon', 'Material design icon to display'),
  pt('iconColor', 'Icon Color', 'Color of the icon'),
  pn('iconSize', 'Icon Size', 'Size of the icon in px'),
  pt('badge', 'Badge', 'Text to display in a badge on the opposite side of the item (set either this or "after")').a(),
  pt('badgeColor', 'Badge color', 'Color of the badge').a(),
  pt('tooltip', 'Tooltip', 'Button tooltip text to show on button hover/press').a()
]
