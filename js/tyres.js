$(document).ready(function() {
    $('.select2').each(function() {
        const dropdownClass = $(this).data('dropdown-class')
        const placeholder = $(this).data('placeholder')

        $(this).select2({
            width: '100%',
            dropdownCssClass: dropdownClass || '',
            placeholder: placeholder || '',
        })
    })
})