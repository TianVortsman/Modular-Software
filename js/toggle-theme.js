import { Pane } from 'https://cdn.skypack.dev/tweakpane@4.0.4'

const config = {
  theme: 'system', // Default theme to 'system'
}

// Function to detect the system's theme
const getSystemTheme = () => {
  // Use the prefers-color-scheme media query to get the system's theme
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Function to apply the selected theme
const update = () => {
  let selectedTheme = config.theme;

  // If the theme is set to 'system', use the system's current theme
  if (selectedTheme === 'system') {
    selectedTheme = getSystemTheme();
  }

  // Apply the selected theme by updating the 'data-theme' attribute
  document.documentElement.dataset.theme = selectedTheme;

  // Ensure the correct classes are applied to the <html> element
  const isLightMode = selectedTheme === 'light';
  document.documentElement.classList.toggle('light-mode', isLightMode);
  document.documentElement.classList.toggle('dark-mode', !isLightMode);

  // Store the selected theme in localStorage
  localStorage.setItem('theme', selectedTheme);
}

// Sync changes whenever the theme selection changes
const sync = () => {
  update(); // Apply the theme whenever it changes
}

// Retrieve the theme from localStorage, if available
const storedTheme = localStorage.getItem('theme');
console.log('Stored theme:', storedTheme);
if (storedTheme) {
  config.theme = storedTheme; // Set the theme based on stored value
}

// Only create the pane if the body does not have the 'dashboard' id
if (!document.body.id || (document.body.id !== 'dashboard' && document.body.id !== 'invoice-dashboard')) {
  const ctrl = new Pane({
    title: 'Config',
    expanded: true,
  });

  ctrl
    .addBinding(config, 'theme', {
      label: 'Theme',
      options: {
        System: 'system',
        Light: 'light',
        Dark: 'dark',
      },
    })
    .on('change', () => {
      // This will apply the theme dynamically when it changes
      console.log('Theme changed to', config.theme);
      update();
    })

  ctrl.on('change', sync);
}

// Initial call to apply the theme when the page loads
update();

// Listen to system theme changes and update if 'system' is selected
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  if (config.theme === 'system') {
    console.log('System theme changed to', e.matches ? 'dark' : 'light');
    update(); // Reapply the theme when system theme changes
  }
});
