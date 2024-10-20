export const usePasswordVisibility = () => {
  const isPasswordVisible = ref(false)

  const inputType = computed(() =>
    isPasswordVisible.value ? 'text' : 'password',
  )

  const toggleVisibility = () => {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  const eyeIcon = computed(() =>
    isPasswordVisible.value ? 'mynaui:eye-slash' : 'mynaui:eye',
  )

  return { toggleVisibility, inputType, eyeIcon }
}
