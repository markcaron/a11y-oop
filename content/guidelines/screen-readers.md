---
title: "Screen readers"
layout: guide
section: guidelines
guide: screen-readers
---

<p class="eyebrow">Guidelines / RHDS library</p>

# Screen readers

<div class="source-note">Adapted for this site from <a href="https://ux.redhat.com/accessibility/screen-readers/">RHDS accessibility guidance</a> · source <a href="https://github.com/RedHat-UX/red-hat-design-system/blob/7b65f1378496ac57cc207be8f84822afc8180345/docs/accessibility/screen-readers.md">7b65f137</a>. Original prose retained; presentation wrappers, links and assets adapted.</div>

## Why test with screen readers?

When testing with screen readers, our goal is to verify that an assistive tech user will have an experience equivalent to that of any other user. Tests may include the following:

1. Can you use and understand the purpose of all interactive elements on the page?
2. Can you accomplish all the same tasks with and without assistive tech (e.g. navigating the site, submitting forms, adding items to a cart, etc.)?
3. When page contents are read, are you presented with all the meaningful info you would expect as a visual user? (This includes status updates on dynamic pages.)

## Computer screen readers

On computers, screen reader testing often lets you perform two tests simultaneously:

1. It ensures that all meaningful web content and interactions are available to assistive tech.
2. It helps you verify that your experiences are keyboard operable (which is a [WCAG requirement](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible.html)).

After turning on your computer’s screen reader and opening your browser, use your keyboard to access the entire experience, top to bottom. Use the <kbd>Tab</kbd>, <kbd>Shift-Tab</kbd>, and <kbd>↑ → ↓ ←</kbd> keys to move among (and within) focusable elements like links, form controls, and interactive components. And you can then use other keys like <kbd>Space</kbd>, <kbd>Enter</kbd>, and <kbd>Escape</kbd> to interact with those elements.

Each screen reader also has its own set of keyboard shortcuts to navigate and read non-interactive content within an experience. Different keypresses can start (or stop) reading the page, jump to the next heading element, move vertically and horizontally among table cells, and so on. Links to keyboard shortcut resources are included in each screen reader’s section.

### Getting started with computer screen readers

<nav class="grid xs-two-columns sm-three-columns" aria-label="Desktop screen readers">
  <div>
    <h3><a href="/guidelines/screen-readers-computer/#voiceover-macos">VoiceOver (macOS)</a></h3>
    VoiceOver is the built-in screen reader for macOS.
  </div>
  <div>
    <h3><a href="/guidelines/screen-readers-computer/#nvda-windows">NVDA (Windows)</a></h3>
    NVDA is a free, downloadable screen reader for Windows. 
  </div>
  <div>
    <h3><a href="/guidelines/screen-readers-computer/#jaws-windows">JAWS (Windows)</a></h3>
    JAWS is a paid, downloadable screen reader for Windows.
  </div>
  <div>
    <h3><a href="/guidelines/screen-readers-computer/#narrator-windows">Narrator (Windows)</a></h3>
    Narrator is the built-in screen reader for Windows.
  </div>
  <div>
    <h3><a href="/guidelines/screen-readers-computer/#orca-linux">Orca (Linux)</a></h3>
    Orca comes packaged with GNOME and other desktop environments.
  </div>
</nav>

## Mobile screen readers

On mobile devices, you will use touchscreen gestures and taps instead of a keyboard to navigate the page and activate interactive elements.
For basic navigation, you can swipe right, left, up, and down with one finger to move forward and backward through the page, and then double-tap to activate form controls and links. Each platform has many other gestures for more advanced navigation. View the linked gesture shortcuts pages within each section for more guidance.

### Getting started with mobile screen readers

<nav class="grid xs-two-columns sm-three-columns" aria-label="Mobile screen readers">
  <div>
    <h3><a href="/guidelines/screen-readers-mobile/#voiceover-ios">VoiceOver (iOS)</a></h3>
    VoiceOver is the built-in screen reader for iOS and iPadOS devices.
  </div>
  <div>
    <h3><a href="/guidelines/screen-readers-mobile/#talkback-android">Talkback (Android)</a></h3>
    TalkBack is the built-in screen reader for most Android devices.
  </div>
</nav>

## Browser and screen reader pairings

If you can only test on one platform, it never hurts to try your screen reader with as many browsers as possible. For example, if you only have a Mac, go ahead and pair VoiceOver with Safari, Chrome, and Firefox.

But if you’re either pressed for time or have access to multiple operating systems, these are the most common browser and screen reader pairings, and thus the ones to prioritize when testing:

- macOS: Safari and VoiceOver
- Windows: Firefox and NVDA
- Windows: Chrome and JAWS or NVDA
- Windows: Edge and Narrator
- Linux: Firefox and Orca
- iOS: Safari and VoiceOver
- Android: Chrome and TalkBack
