export const useThemeSwitcher = () => {
  const theme = useColorMode()

  const toggleTheme = () => {
    theme.preference = theme.value === 'light' ? 'dark' : 'light'
  }

  const themeIcon = computed(() =>
    theme.preference === 'light' ? 'mynaui:sun' : 'mynaui:moon',
  )

  return { toggleTheme, themeIcon }
}
