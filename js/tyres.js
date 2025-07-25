$(document).ready(function () {
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
    const targetId = $toggle.attr('data-bs-target')
    const $target = $(targetId)

    if (!$target.length) return

    // Set initial state
    if ($target.hasClass('show')) {
      $icon.addClass('fa-chevron-up')
    } else {
      $icon.addClass('fa-chevron-down')
    }

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
    updateFilterList()
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

  // Helper to extract clean label text from .filter-option
  function getFilterLabel($filterOption) {
    if ($filterOption.find('span').length > 0) {
      return $filterOption
        .find('span')
        .first()
        .clone()
        .children()
        .remove()
        .end()
        .text()
        .trim()
    } else {
      return $filterOption.clone().children().remove().end().text().trim()
    }
  }

  // Utility to update the filter pills display
  function updateFilterList() {
    const $filterList = $('.filter-list')
    $filterList.find('.filter').remove()

    const checked = $('.filter-bar input[type="checkbox"]:checked')
    const $qtyInput = $('.filter-bar .qty-input')
    const qty = parseInt($qtyInput.val(), 10)

    let hasFilters = false

    checked.each(function () {
      hasFilters = true
      const $checkbox = $(this)
      const $filterOption = $checkbox
        .closest('.control--checkbox')
        .find('.filter-option')
      const label = getFilterLabel($filterOption)
      const filterGroup = $checkbox
        .closest('.filter')
        .find('.filter-type-name')
        .text()
        .trim()

      const $pill = $(`
      <div class="filter" data-label="${label}" data-group="${filterGroup}">
        ${filterGroup}: <span>${label}</span>
        <i class="fas fa-xmark icon" role="button"></i>
      </div>
    `)
      $filterList.append($pill)
    })

    if (qty > 1) {
      hasFilters = true
      const $pill = $(`
      <div class="filter" data-label="Quantité" data-group="Quantité">
        Quantité: <span>${qty}</span>
        <i class="fas fa-xmark icon" role="button"></i>
      </div>
    `)
      $filterList.append($pill)
    }

    if (hasFilters) {
      $filterList.removeClass('hidden')
      const $deleteAll = $(`
      <div class="filter delete-all">
        Tout supprimer
        <i class="fas fa-xmark icon" role="button"></i>
      </div>
    `)
      $filterList.append($deleteAll)
    } else {
      $filterList.addClass('hidden')
    }
  }

  // Bind change event to all checkboxes in the filter bar
  $('.filter-bar').on('change', 'input[type="checkbox"]', function () {
    updateFilterList()
  })

  // Handle individual filter pill removal
  $('.filter-list').on('click', '.fa-xmark', function () {
    const $pill = $(this).closest('.filter')
    const label = $pill.data('label')
    if (label === 'Quantité') {
      $('.filter-bar .qty-input').val(1)
      updateFilterList()
      return
    }
    // Uncheck the corresponding checkbox by matching label
    $('.filter-bar .filter-option').each(function () {
      const currentLabel = getFilterLabel($(this))
      if (currentLabel === label) {
        $(this)
          .closest('label')
          .find('input[type="checkbox"]')
          .prop('checked', false)
          .trigger('change')
      }
    })
  })

  // Clear all filters on "Tout supprimer"
  $('.filter-list').on('click', '.delete-all', function () {
    $('.filter-bar input[type="checkbox"]')
      .prop('checked', false)
      .trigger('change')
  })

  window.handleSelect = function (event, value, displayText) {
    event.preventDefault()

    const dropdownMenu = event.target.closest('.dropdown-menu')

    // Remove 'active' class and hide all check icons
    const items = dropdownMenu.querySelectorAll('.dropdown-item')
    items.forEach((item) => {
      item.classList.remove('active')
      const icon = item.querySelector('.check-icon')
      if (icon) icon.style.display = 'none'
    })

    // Mark selected item as active
    const selectedItem = event.target.closest('.dropdown-item')
    selectedItem.classList.add('active')

    // Show its check icon
    const selectedIcon = selectedItem.querySelector('.check-icon')
    if (selectedIcon) selectedIcon.style.display = 'inline-block'

    // Update dropdown button text
    const dropdownButton = event.target
      .closest('.dropdown')
      .querySelector('#dropdownText')
    if (dropdownButton) {
      dropdownButton.textContent = displayText
    }
  }

  $('#toggleDevis').on('change', function () {
    const isChecked = $(this).is(':checked')
    const $label = $('label[for="toggleDevis"]')

    if (isChecked) {
      $label.text('Retirer du devis')
    } else {
      $label.text('Ajouter au devis')
    }
  })

  function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  }

  function renderPagination(current, totalPages) {
    const maxPages = isMobile() ? 5 : 8

    const $ul = $('#pagination .pagination')
    $ul.empty()

    function addPage(page, label = null, active = false) {
      const $li = $('<li>').addClass('page-item')
      if (active) $li.addClass('active')
      const $link = $('<a>')
        .addClass('page-link')
        .attr('href', '#')
        .attr('data-page', page)
        .html(label !== null ? label : page)
      $li.append($link)
      $ul.append($li)
    }

    if (totalPages <= 1) return

    if (current > Math.floor(maxPages / 2)) {
      addPage(1, '<i class="icon fas fa-angle-double-left"></i>') // First
      addPage(current - 1, '<i class="icon fas fa-chevron-left"></i>') // Prev
    }

    let start = Math.max(1, current - Math.floor(maxPages / 2))
    let end = Math.min(totalPages, start + maxPages - 1)
    if (end - start + 1 < maxPages && end === totalPages) {
      start = Math.max(1, end - maxPages + 1)
    }

    for (let i = start; i <= end; i++) {
      addPage(i, null, i === current)
    }

    if (current < totalPages - Math.floor(maxPages / 2)) {
      addPage(current + 1, '<i class="icon fas fa-chevron-right"></i>') // Next
      addPage(totalPages, '<i class="icon fas fa-angle-double-right"></i>') // Last
    }
  }

  // Example usage:
  $(function () {
    const totalPages = 23
    let currentPage = 1

    renderPagination(currentPage, totalPages)

    $('#pagination').on('click', '.page-link', function (e) {
      e.preventDefault()
      const page = parseInt($(this).data('page'))
      if (!isNaN(page)) {
        currentPage = page
        renderPagination(currentPage, totalPages)
        // Trigger actual page change logic here (e.g., load content)
      }
    })
  })

  $('.mobile-filter-button').on('click', function () {
    $('.filter-bar').toggleClass('show')
  })
})
