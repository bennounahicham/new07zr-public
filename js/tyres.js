$(document).ready(function () {
  function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent)
  }

  $('.select2').each(function () {
    const $select = $(this)
    let dropdownClass = $select.data('dropdown-class') || ''
    const placeholder = $select.data('placeholder') || ''

    if (
      isMobile() &&
      ($select.closest('.column').hasClass('load') ||
        $select.closest('.column').hasClass('speed'))
    ) {
      dropdownClass = 'custom-dropdown-mobile'
    }

    $(this).select2({
      width: '100%',
      dropdownCssClass: dropdownClass || '',
      placeholder: placeholder || '',
    })
  })
})
