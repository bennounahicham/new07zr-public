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

  $('.filter-type').each(function () {
    const $toggle = $(this)
    const $icon = $toggle.find('.icon')
    const targetId = $toggle.attr('data-bs-target') // ex: "#quantityCollapse"
    const $target = $(targetId)

    if (!$target.length) return

    // Set initial state
    if ($target.hasClass('show')) {
      $icon.addClass('fa-chevron-up')
    } else {
      $icon.addClass('fa-chevron-down')
    }

    // Listen to collapse events
    $target.on('show.bs.collapse', function () {
      $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up')
    })

    $target.on('hide.bs.collapse', function () {
      $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down')
    })
  })

  // Quantity increment/decrement
  $('.qty').on('click', '.qty-selector', function () {
    const $input = $(this).siblings('.qty-input')
    const currentVal = parseInt($input.val())

    if ($(this).find('i').hasClass('fa-plus')) {
      $input.val(currentVal + 1)
    } else if ($(this).find('i').hasClass('fa-minus') && currentVal > 1) {
      $input.val(currentVal - 1)
    }
  })

  // Brand filtering
  $('#brand-search').on('input', function () {
    const searchTerm = $(this).val().toLowerCase()

    $('#brands-list li').each(function () {
      const text = $(this)
        .find('.filter-option span:first-child')
        .text()
        .toLowerCase()
      $(this).toggle(text.includes(searchTerm))
    })
  })
})
