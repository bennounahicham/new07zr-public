$(document).ready(function() {
    const swiper = new Swiper('.selected-products-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        breakpoints: {
            768: {
                slidesPerView: 1,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 35,
            },
            1280: {
                slidesPerView: 4,
            },
        },
        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },
    })

    $('.select2').each(function() {
        const $el = $(this)

        if ($el.hasClass('select2-hidden-accessible')) {
            $el.select2('destroy')
        }

        const isDimension = $el.hasClass('dimension')
        const dropdownClass = isDimension ?
            'dimension-dropdown' :
            $el.data('dropdown-class') || ''

        $el.select2({
            width: '100%',
            minimumResultsForSearch: 0,
            dropdownCssClass: dropdownClass,
            placeholder: $el.data('placeholder') || '',
        })
    })

    $('.filter-type').each(function() {
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

        $target.on('show.bs.collapse', function() {
            $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up')
        })

        $target.on('hide.bs.collapse', function() {
            $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down')
        })
    })

    // Quantity increment/decrement
    $('.qty').on('click', '.qty-selector', function() {
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
    $('#brand-search').on('input', function() {
        const searchTerm = $(this).val().toLowerCase()

        $('#brands-list li').each(function() {
            const text = $(this)
                .find('.filter-option span:first-child')
                .text()
                .toLowerCase()
            $(this).toggle(text.includes(searchTerm))
        })
    })

    // Helper to extract clean label text from .filter-option
    function getFilterLabel($filterOption) {
        return $filterOption.find('span').length > 0 ?
            $filterOption.find('span').first().text().trim() :
            $filterOption.text().trim()
    }

    // Utility to update the filter pills display
    function updateFilterList() {
        const $filterList = $('.filter-list')
        $filterList.find('.filter').remove()

        const checked = $('.filter-bar input[type="checkbox"]:checked')
        const qty = parseInt($('.filter-bar .qty-input').val(), 10)
        let hasFilters = false

        // Add checkbox filters
        checked.each(function() {
            hasFilters = true
            const $checkbox = $(this)
            const label = getFilterLabel(
                $checkbox.closest('.control--checkbox').find('.filter-option')
            )
            const filterGroup = $checkbox
                .closest('.filter')
                .find('.filter-type-name')
                .text()
                .trim()

            const $pill = $(`<div class="filter" data-label="${label}">
      ${filterGroup}: <span>${label}</span>
      <i class="fas fa-xmark icon" role="button"></i>
    </div>`)
            $pill.data('checkbox', $checkbox)
            $filterList.append($pill)
        })

        if (qty > 1) {
            hasFilters = true
            $filterList.append(`<div class="filter" data-label="Quantité">
      Quantité: <span>${qty}</span>
      <i class="fas fa-xmark icon" role="button"></i>
    </div>`)
        }

        if (hasFilters) {
            $filterList.removeClass('hidden').append(`<div class="filter delete-all">
      Tout supprimer <i class="fas fa-xmark icon" role="button"></i>
    </div>`)
        } else {
            $filterList.addClass('hidden')
        }
    }

    $('.filter-bar').on('change', 'input[type="checkbox"]', function() {
        updateFilterList()
        if (typeof isMobile === 'function' && isMobile()) {
            $('.mobile-filter-panel').removeClass('active')
        }
    })

    $('.filter-bar').on('change', 'input[type="checkbox"]', updateFilterList)

    $('.filter-list').on('click', '.fa-xmark', function() {
        const $pill = $(this).closest('.filter')

        if ($pill.hasClass('delete-all')) {
            $('.filter-bar input[type="checkbox"]').prop('checked', false)
            $('.filter-bar .qty-input').val(1)
            updateFilterList()
            return
        }

        if ($pill.data('label') === 'Quantité') {
            $('.filter-bar .qty-input').val(1)
            updateFilterList()
            return
        }

        const $checkbox =
            $pill.data('checkbox') ||
            $('.filter-bar input[type="checkbox"]:checked').filter(function() {
                return (
                    getFilterLabel(
                        $(this).closest('.control--checkbox').find('.filter-option')
                    ) === $pill.data('label')
                )
            })

        $checkbox.prop('checked', false)
        updateFilterList()
    })

    window.handleSelect = function(event, value, displayText) {
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

    $('.toggle-devis').on('change', function() {
        const isChecked = $(this).is(':checked')
        const id = $(this).attr('id')
        const $label = $('label[for="' + id + '"]')

        $label.text(isChecked ? 'Retirer du devis' : 'Ajouter au devis')
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
    $(function() {
        const totalPages = 23
        let currentPage = 1

        renderPagination(currentPage, totalPages)

        $('#pagination').on('click', '.page-link', function(e) {
            e.preventDefault()
            const page = parseInt($(this).data('page'))
            if (!isNaN(page)) {
                currentPage = page
                renderPagination(currentPage, totalPages)
                    // Trigger actual page change logic here (e.g., load content)
            }
        })
    })

    $('.mobile-filter-button').on('click', function() {
        $('.mobile-filter-panel').addClass('active')
    })
    $('.mobile-filter-close').on('click', function() {
        $('.mobile-filter-panel').removeClass('active')
    })

    const tyreSwiper = new Swiper('.tyre-swiper', {
        loop: true,
        slidesPerView: 2,
        spaceBetween: 10,
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
            1240: {
                slidesPerView: 5,
                spaceBetween: 15,
            },
            1280: {
                slidesPerView: 6,
            },
        },
        navigation: {
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
        },
    })

    function loadVideo(container) {
        const video = document.createElement('video')
        video.src = 'path/to/video.mp4'
        video.controls = true
        video.autoplay = true
        video.playsInline = true
        video.style.width = '100%'
        video.style.borderRadius = '10px'

        container.replaceWith(video)
    }

    // function calculateSimplePadding() {

    //     const filterSlider = document.querySelector('.filter-slider')
    //     const swiper = document.querySelector('.filter-swiper')
    //     const slides = document.querySelectorAll('.filter-swiper .swiper-slide')
    //     const containerWidth = filterSlider.offsetWidth

    //     let totalWidth = 0
    //     let visibleSlides = 0
    //     let maxVisibleWidth = 0

    //     for (let i = 0; i < slides.length; i++) {
    //         const slideWidth = slides[i].offsetWidth
    //         const gap = i > 0 ? 20 : 0
    //         const newTotal = totalWidth + slideWidth + gap
    //         const availableWidth = containerWidth

    //         if (newTotal <= availableWidth) {
    //             totalWidth = newTotal
    //             visibleSlides++
    //             maxVisibleWidth = newTotal
    //         } else {
    //             break
    //         }
    //     }
    //     if (visibleSlides === slides.length) {
    //         swiper.style.width = '100%'
    //     } else {
    //         swiper.style.width = `${maxVisibleWidth}px`
    //     }

    //     return visibleSlides
    // }

    // setTimeout(() => {
    //     // calculateSimplePadding()

    //     new Swiper('.filter-swiper', {
    //         loop: true,
    //         slidesPerView: 'auto',
    //         spaceBetween: 20,
    //         navigation: {
    //             nextEl: '.custom-next',
    //         },
    //         watchOverflow: true,
    //     })
    // }, 100)

    new Swiper('.filter-swiper', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 20,
        navigation: {
            nextEl: '.custom-next',
        },
        slidesOffsetAfter: 60,
        watchOverflow: true,
    })

    const thumbSwiper = new Swiper('.thumb-swiper', {
        freeMode: true,
        spaceBetween: 10,
        slidesPerView: 3,
        watchSlidesProgress: true,
        navigation: {
            nextEl: '.thumb-next',
            prevEl: '.thumb-prev',
        },
    })

    const mainSwiper = new Swiper('.main-swiper', {
        spaceBetween: 10,
        thumbs: {
            swiper: thumbSwiper,
        },
        on: {
            slideChange: function() {
                const activeSlide = this.slides[this.activeIndex]
                const activeImg = activeSlide.querySelector('img')
                const zoomTrigger = document.getElementById('zoomTrigger')
                if (zoomTrigger && activeImg) {
                    zoomTrigger.href = activeImg.src
                        .replace('.jpg', '-large.jpg')
                        .replace('.png', '-large.png')
                }
            },
        },
    })

    // Set initial zoom link
    document.addEventListener('DOMContentLoaded', () => {
        const firstImg = document.querySelector('.main-swiper .swiper-slide img')
        if (firstImg) {
            document.getElementById('zoomTrigger').href = firstImg.src
                .replace('.jpg', '-large.jpg')
                .replace('.png', '-large.png')
        }
    })

    const modelData = {
        citroen: [
            'C4 I (LC_) - 1.6 HDi - 66 kw - 90 cv',
            'C4 I (LC_) - 1.6 HDi - 80 kw - 109 cv',
            'C4 II (NC_) - 1.2 THP 130 (NCHNYM, NCHNYT) - 96 kw - 130 cv',
            'C4 I (LC_) - 1.6 HDi - 66 kw - 90 cv',
            'C4 I (LC_) - 1.6 HDi - 80 kw - 109 cv',
            'C4 II (NC_) - 1.2 THP 130 (NCHNYM, NCHNYT) - 96 kw - 130 cv',
        ],
        peugeot: [
            '308 I - 1.6 HDi - 80 kw - 109 cv',
            '308 II - 1.2 PureTech - 96 kw - 130 cv',
            '208 I - 1.4 HDi - 50 kw - 68 cv',
            '308 I - 1.6 HDi - 80 kw - 109 cv',
            '308 II - 1.2 PureTech - 96 kw - 130 cv',
            '208 I - 1.4 HDi - 50 kw - 68 cv',
        ],
    }
    $('.compatibility-container').each(function() {
        const $block = $(this)
        const $buttons = $block.find('.brand-btn')
        const $modelList = $block.find('.model-list')

        $buttons.on('click', function() {
            const brand = $(this).data('brand')

            $buttons.removeClass('selected')
            $(this).addClass('selected')

            const models = modelData[brand] || []
            $modelList.empty()

            $.each(models, function(index, model) {
                const highlight = index % 2 === 1 ? 'highlighted' : ''
                $modelList.append(`<div class="model ${highlight}">${model}</div>`)
            })
        })

        // Trigger initial load on first selected
        $block.find('.brand-btn.selected').trigger('click')
    })
})