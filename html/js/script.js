// Code existant pour le menu mobile et autres fonctionnalités
$(document).ready(function () {
  // Toggle mobile menu
  function toggleMobileMenu() {
    $("#mobileMenu").toggleClass("show");

    // Prevent body scroll when menu is open
    if ($("#mobileMenu").hasClass("show")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "");
    }
  }

  // Click event for hamburger icon
  $(".d-md-none").on("click", function () {
    toggleMobileMenu();
  });

  // Close mobile menu when clicking on a link
  $(".mobileMenu .navbar-link").on("click", function () {
    $("#mobileMenu").removeClass("show");
    $("body").css("overflow", "");
  });

  // Close mobile menu when clicking outside
  $(document).on("click", function (e) {
    if (!$(e.target).closest(".mobileMenu, .d-md-none").length) {
      $("#mobileMenu").removeClass("show");
      $("body").css("overflow", "");
    }
  });

  // Handle window resize
  $(window).on("resize", function () {
    if ($(window).width() > 767) {
      $("#mobileMenu").removeClass("show");
      $("body").css("overflow", "");
    }
  });

  // Add hover effects for navigation links
  $(".navbar-link").hover(
    function () {
      $(this).addClass("active");
    },
    function () {
      $(this).removeClass("active");
    }
  );

  // Add click effects for top navigation icons
  $('.header-top .d-flex[style*="cursor"]').on("click", function () {
    console.log("Navigation icon clicked:", $(this).find("span").text());
  });

  // Initialiser les sliders s'ils existent
  if ($(".slider").length && !$(".slider").hasClass("slick-initialized")) {
    $(".slider").slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      prevArrow:
        '<div class="slick-arrow slick-prev"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-chevron-left" class="svg-inline--fa fa-circle-chevron-left arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"></path></svg></div>',
      nextArrow:
        '<div class="slick-arrow slick-next"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-chevron-right" class="svg-inline--fa fa-circle-chevron-right arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path></svg></div>',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  if (
    $(".slider-gold").length &&
    !$(".slider-gold").hasClass("slick-initialized")
  ) {
    $(".slider-gold").slick({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: false, // Pas de flèches pour le gold slider
      responsive: [
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            infinite: true,
            arrows: false,
          },
        },
      ],
    });
  }

  // Initialisation du slider TopSales
if ($('.topsales-slider').length && !$('.topsales-slider').hasClass('slick-initialized')) {
    $('.topsales-slider').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        prevArrow:
        '<div class="slick-arrow slick-prev"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-chevron-left" class="svg-inline--fa fa-circle-chevron-left topsales-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM271 135c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-87 87 87 87c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L167 273c-9.4-9.4-9.4-24.6 0-33.9L271 135z"></path></svg></div>',
        nextArrow:
          '<div class="slick-arrow slick-next"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-chevron-right" class="svg-inline--fa fa-circle-chevron-right topsales-arrow" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM241 377c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l87-87-87-87c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L345 239c9.4 9.4 9.4 24.6 0 33.9L241 377z"></path></svg></div>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });
}
});

// Initialisation Select2 pour le formulaire de recherche pneus
$(document).ready(function () {
  // Configuration Select2 pour les dimensions
  $(".tyre-select").select2({
    minimumResultsForSearch: Infinity, // Désactive la recherche pour les petites listes
    placeholder: function () {
      return $(this).data("placeholder");
    },
    allowClear: false,
    dropdownParent: $(".search-container"),
  });

  // Configuration Select2 pour les marques avec recherche
  $(".brand-select").select2({
    placeholder: function () {
      return $(this).data("placeholder");
    },
    allowClear: true,
    dropdownParent: $(".search-container"),
    language: {
      noResults: function () {
        return "Aucune marque ne correspond à votre recherche";
      },
      searching: function () {
        return "Recherche en cours...";
      },
    },
  });

  // Configuration Select2 pour les types de marques
  $(".brand-type-select").select2({
    placeholder: function () {
      return $(this).data("placeholder");
    },
    allowClear: true,
    minimumResultsForSearch: Infinity,
    dropdownParent: $(".search-container"),
  });

  // Chargement des données pour chaque select
  loadSelectData();

  // Gestion des dépendances entre selects
  $("#width-select, #height-select, #diameter-select").on(
    "change",
    function () {
      updateDependentSelects();
    }
  );

  // Gestion du formulaire de recherche
  $(".search-container form").on("submit", function (e) {
    e.preventDefault();
    performSearch();
  });
});

// Fonction pour charger les données des selects
function loadSelectData() {
  // Chargement des largeurs
  loadOptionsForSelect("#width-select", ENDPOINTS.width, [
    "155",
    "165",
    "175",
    "185",
    "195",
    "205",
    "215",
    "225",
    "235",
    "245",
    "255",
    "265",
    "275",
    "285",
    "295",
    "305",
  ]);

  // Chargement des hauteurs
  loadOptionsForSelect("#height-select", ENDPOINTS.height, [
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
    "60",
    "65",
    "70",
    "75",
    "80",
  ]);

  // Chargement des diamètres
  loadOptionsForSelect("#diameter-select", ENDPOINTS.diameter, [
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
  ]);

  // Chargement des indices de charge
  loadOptionsForSelect("#load-select", ENDPOINTS.load, [
    "75",
    "80",
    "84",
    "87",
    "91",
    "94",
    "98",
    "101",
    "104",
  ]);

  // Chargement des indices de vitesse
  loadOptionsForSelect("#speed-select", ENDPOINTS.speed, [
    "H",
    "V",
    "W",
    "Y",
    "Z",
  ]);

  // Chargement des marques
  loadBrands();

  // Chargement des types de marques
  loadBrandTypes();
}

// Fonction générique pour charger les options d'un select
function loadOptionsForSelect(selectId, endpoint, fallbackData) {
  const $select = $(selectId);
  const currentValue = $select.val();

  // Utiliser les données de fallback pour l'instant
  $select.empty();
  if ($select.data("placeholder")) {
    $select.append("<option></option>");
  }

  fallbackData.forEach(function (value) {
    const option = new Option(value, value, false, value === currentValue);
    $select.append(option);
  });

  $select.trigger("change.select2");
}

// Fonction pour charger les marques
function loadBrands() {
  const brands = [
    "BRIDGESTONE",
    "CONTINENTAL",
    "DUNLOP",
    "GOOD YEAR",
    "GOODYEAR",
    "MICHELIN",
    "PIRELLI",
    "YOKOHAMA",
    "HANKOOK",
    "KUMHO",
  ];

  const $select = $("#brand-select");
  $select.empty();
  $select.append("<option></option>");

  brands.forEach(function (brand) {
    $select.append(new Option(brand, brand, false, false));
  });

  $select.trigger("change.select2");
}

// Fonction pour charger les types de marques
function loadBrandTypes() {
  const brandTypes = [
    { id: "premium", text: "Premium" },
    { id: "quality", text: "Quality" },
    { id: "budgetplus", text: "Budget +" },
    { id: "budget", text: "Budget" },
  ];

  const $select = $("#brand-type-select");
  $select.empty();
  $select.append("<option></option>");

  brandTypes.forEach(function (type) {
    $select.append(new Option(type.text, type.id, false, false));
  });

  $select.trigger("change.select2");
}

// Fonction pour mettre à jour les selects dépendants
function updateDependentSelects() {
  const width = $("#width-select").val();
  const height = $("#height-select").val();
  const diameter = $("#diameter-select").val();

  // Activer/désactiver les selects en fonction des valeurs sélectionnées
  const hasBasicDimensions = width && height && diameter;

  $("#load-select, #speed-select").prop("disabled", !hasBasicDimensions);
  $("#brand-select, #brand-type-select").prop("disabled", !hasBasicDimensions);

  // Gérer les checkboxes
  $('input[name="season"]').prop("disabled", !hasBasicDimensions);
  $(".checkbox-wrapper").toggleClass("disabled", !hasBasicDimensions);

  // Rafraîchir Select2
  $("#load-select, #speed-select, #brand-select, #brand-type-select").trigger(
    "change.select2"
  );
}

// Fonction pour effectuer la recherche
function performSearch() {
  const formData = {
    width: $("#width-select").val(),
    height: $("#height-select").val(),
    diameter: $("#diameter-select").val(),
    load: $("#load-select").val(),
    speed: $("#speed-select").val(),
    brand: $("#brand-select").val(),
    brandType: $("#brand-type-select").val(),
    seasons: $('input[name="season"]:checked')
      .map(function () {
        return this.value;
      })
      .get(),
  };

  console.log("Recherche avec les critères:", formData);

  // Ici vous pouvez rediriger vers la page de résultats
  // window.location.href = '/recherche-pneus?' + $.param(formData);
}

// Configuration des endpoints (à adapter selon votre API)
const ENDPOINTS = {
  width: "/api/tyre-widths.json",
  height: "/api/tyre-heights.json",
  diameter: "/api/tyre-diameters.json",
  load: "/api/tyre-loads.json",
  speed: "/api/tyre-speeds.json",
  brands: "/api/tyre-brands.json",
  brandTypes: "/api/brand-types.json",
};

$(document).ready(function() {
    // Ouvrir la sidebar
    $('#openVehicleSearch').on('click', function() {
        $('#vehicleSidebar').show().addClass('open');
        $('#overlay').show();
        $('body').css('overflow', 'hidden');
    });
    
    // Fermer la sidebar
    function closeSidebar() {
        $('#vehicleSidebar').removeClass('open');
        $('#overlay').hide();
        $('body').css('overflow', '');
        
        setTimeout(function() {
            $('#vehicleSidebar').hide();
        }, 300);
    }
    
    $('#closeSidebar').on('click', closeSidebar);
    $('#overlay').on('click', closeSidebar);
    
    // Gestion des selects
    $('#marqueSelect').on('change', function() {
        const $modeleSelect = $('#modeleSelect');
        const $motorisationSelect = $('#motorisationSelect');
        const $modeleWrapper = $modeleSelect.closest('.select-wrapper');
        const $motorisationWrapper = $motorisationSelect.closest('.select-wrapper');
        
        if ($(this).val()) {
            $modeleSelect.prop('disabled', false);
            $modeleWrapper.removeClass('disabled');
        } else {
            $modeleSelect.prop('disabled', true);
            $motorisationSelect.prop('disabled', true);
            $modeleWrapper.addClass('disabled');
            $motorisationWrapper.addClass('disabled');
            $modeleSelect.val('');
            $motorisationSelect.val('');
        }
        updateSearchButton();
    });
    
    $('#modeleSelect').on('change', function() {
        const $motorisationSelect = $('#motorisationSelect');
        const $motorisationWrapper = $motorisationSelect.closest('.select-wrapper');
        
        if ($(this).val()) {
            $motorisationSelect.prop('disabled', false);
            $motorisationWrapper.removeClass('disabled');
        } else {
            $motorisationSelect.prop('disabled', true);
            $motorisationWrapper.addClass('disabled');
            $motorisationSelect.val('');
        }
        updateSearchButton();
    });
    
    $('#motorisationSelect').on('change', updateSearchButton);
    
    function updateSearchButton() {
        const marque = $('#marqueSelect').val();
        const modele = $('#modeleSelect').val();
        const motorisation = $('#motorisationSelect').val();
        const $button = $('#searchVehicleBtn');
        
        if (marque && modele && motorisation) {
            $button.prop('disabled', false).removeClass('disabled');
        } else {
            $button.prop('disabled', true).addClass('disabled');
        }
    }
    
    // Action du bouton rechercher
    $('#searchVehicleBtn').on('click', function() {
        if (!$(this).hasClass('disabled')) {
            const marque = $('#marqueSelect').val();
            const modele = $('#modeleSelect').val();
            const motorisation = $('#motorisationSelect').val();
            
            console.log('Recherche avec:', { marque, modele, motorisation });
            // Ici vous pouvez ajouter votre logique de recherche
            
            closeSidebar();
        }
    });
});

$(document).ready(function() {
    // Initialiser tous les selects avec Select2
    $('#search_jante .select-picker').select2({
        minimumResultsForSearch: Infinity, // Cache la barre de recherche
        placeholder: function() {
            return $(this).find('option:first').text();
        }
    });

    // Gérer l'activation des selects suivants
    $('#marque').on('change', function() {
        if ($(this).val()) {
            $('#modele').prop('disabled', false).select2();
        } else {
            $('#modele, #carosserie, #annee, #motorisation').prop('disabled', true).select2();
        }
    });

    $('#modele').on('change', function() {
        if ($(this).val()) {
            $('#carosserie').prop('disabled', false).select2();
        } else {
            $('#carosserie, #annee, #motorisation').prop('disabled', true).select2();
        }
    });

    $('#carosserie').on('change', function() {
        if ($(this).val()) {
            $('#annee').prop('disabled', false).select2();
        } else {
            $('#annee, #motorisation').prop('disabled', true).select2();
        }
    });

    $('#annee').on('change', function() {
        if ($(this).val()) {
            $('#motorisation').prop('disabled', false).select2();
        } else {
            $('#motorisation').prop('disabled', true).select2();
        }
    });

    $('#motorisation').on('change', function() {
        if ($(this).val()) {
            $('.search-button').removeClass('disabled').prop('disabled', false);
        } else {
            $('.search-button').addClass('disabled').prop('disabled', true);
        }
    });
});

$(document).ready(function() {
    // Initialiser TOUS les selects avec la même configuration
    $('#search_fluides .select-picker').select2({
        minimumResultsForSearch: Infinity,
        placeholder: function() {
            return $(this).find('option:first').text();
        },
        dropdownParent: $('#search_fluides .search-container')
    });

    // Gérer la dépendance entre Catégorie et Sous-catégorie
    $('#categorie').on('change', function() {
        if ($(this).val()) {
            $('#sous-categorie').prop('disabled', false).select2({
                minimumResultsForSearch: Infinity,
                placeholder: function() {
                    return $(this).find('option:first').text();
                },
                dropdownParent: $('#search_fluides .search-container')
            });
        } else {
            $('#sous-categorie').prop('disabled', true).select2({
                minimumResultsForSearch: Infinity,
                placeholder: function() {
                    return $(this).find('option:first').text();
                },
                dropdownParent: $('#search_fluides .search-container')
            });
        }
    });
});

$(document).ready(function() {
    
    // Données des sous-catégories pour chaque catégorie
    const subcategoriesData = {
        'outillage': [
            { name: 'Crics et chandelles', url: '/fr/equipment/search?categoryId=3&subcategories=23&categoryName=Outillage/équipement' },
            { name: 'Outillages divers', url: '/fr/equipment/search?categoryId=3&subcategories=71&categoryName=Outillage/équipement' },
            { name: 'Récupérateur d\'huile', url: '/fr/equipment/search?categoryId=3&subcategories=24&categoryName=Outillage/équipement' },
            { name: 'Servantes', url: '/fr/equipment/search?categoryId=3&subcategories=22&categoryName=Outillage/équipement' },
            { name: 'Autres Clés', url: '/fr/equipment/search?categoryId=3&subcategories=72&categoryName=Outillage/équipement' },
            { name: 'Autres pinces', url: '/fr/equipment/search?categoryId=3&subcategories=73&categoryName=Outillage/équipement' },
            { name: 'Clé à chocs', url: '/fr/equipment/search?categoryId=3&subcategories=25&categoryName=Outillage/équipement' }
        ],
        'montage': [
            { name: 'Équilibreuse', url: '/fr/equipment/search?categoryId=2&subcategories=1&categoryName=Montage/équilibrage/réparation' },
            { name: 'Monte-pneu', url: '/fr/equipment/search?categoryId=2&subcategories=2&categoryName=Montage/équilibrage/réparation' }
        ],
        'electricite': [
            { name: 'Éclairage atelier', url: '/fr/equipment/search?categoryId=8&subcategories=40&categoryName=Électricité/éclairage' },
            { name: 'Ampoules', url: '/fr/equipment/search?categoryId=8&subcategories=41&categoryName=Électricité/éclairage' }
        ],
        'exterieur': [
            { name: 'Carrosserie', url: '/fr/equipment/search?categoryId=5&subcategories=35&categoryName=Extérieur véhicule' },
            { name: 'Vitrage', url: '/fr/equipment/search?categoryId=5&subcategories=36&categoryName=Extérieur véhicule' }
        ],
        'machines': [
            { name: 'Compresseurs', url: '/fr/equipment/search?categoryId=6&subcategories=37&categoryName=Machines' },
            { name: 'Outillage pneumatique', url: '/fr/equipment/search?categoryId=6&subcategories=38&categoryName=Machines' }
        ],
        'entretien': [
            { name: 'Liquides moteur', url: '/fr/equipment/search?categoryId=4&subcategories=15&categoryName=Entretien/nettoyage/ liquides/additifs' },
            { name: 'Produits de nettoyage', url: '/fr/equipment/search?categoryId=4&subcategories=16&categoryName=Entretien/nettoyage/ liquides/additifs' }
        ]
    };
    
    let isModalOpen = false;
    let currentHoveredCategory = null;
    
    // Toggle modal
    $('#categoriesBtn').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isModalOpen) {
            closeModal();
        } else {
            openModal();
        }
    });
    
    function openModal() {
        $('#categoriesModal').fadeIn(200);
        $('#categoriesBtn').addClass('open');
        isModalOpen = true;
    }
    
    function closeModal() {
        $('#categoriesModal').fadeOut(200);
        $('#categoriesBtn').removeClass('open');
        $('#subcategoriesPanel').hide();
        isModalOpen = false;
        currentHoveredCategory = null;
    }
    
    // Fermer la modal en cliquant ailleurs
    $(document).on('click', function(e) {
        if (isModalOpen && !$(e.target).closest('.dropdown-container').length) {
            closeModal();
        }
    });
    
    // Hover sur les catégories
    $('.nav-item').on('mouseenter', function() {
        const categoryType = $(this).data('category');
        currentHoveredCategory = categoryType;
        
        if (subcategoriesData[categoryType]) {
            showSubcategories(subcategoriesData[categoryType]);
        }
    });
    
    $('.nav-item').on('mouseleave', function() {
        // Délai pour permettre le passage vers les sous-catégories
        setTimeout(function() {
            if (currentHoveredCategory && !$('#subcategoriesPanel:hover').length && !$('.nav-item:hover').length) {
                $('#subcategoriesPanel').hide();
                currentHoveredCategory = null;
            }
        }, 100);
    });
    
    // Hover sur le panel des sous-catégories
    $('#subcategoriesPanel').on('mouseenter', function() {
        // Maintenir le panel ouvert
    });
    
    $('#subcategoriesPanel').on('mouseleave', function() {
        $('#subcategoriesPanel').hide();
        currentHoveredCategory = null;
    });
    
    function showSubcategories(subcategories) {
        const $subcategoriesList = $('#subcategoriesList');
        $subcategoriesList.empty();
        
        subcategories.forEach(function(subcat) {
            const $li = $('<li>');
            const $a = $('<a>').attr('href', subcat.url).text(subcat.name);
            $li.append($a);
            $subcategoriesList.append($li);
        });
        
        $('#subcategoriesPanel').show();
    }
    
    // Fermer la modal lors du clic sur un lien
    $('.cat-dropdown a').on('click', function() {
        closeModal();
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const searchBatteries = document.getElementById('search_batteries');
  const openSidebarButtons = searchBatteries.querySelectorAll('.open-sidebar');
  const closeSidebarButtons = searchBatteries.querySelectorAll('.close-sidebar');
  const overlay = searchBatteries.querySelector('.overlay');
  const sidebars = searchBatteries.querySelectorAll('.sidebar');

  // Données de test pour les véhicules
  const vehicleData = {
    audi: {
      models: ['A3', 'A4', 'A5', 'A6', 'Q3', 'Q5', 'Q7', 'TT'],
      motorisations: {
        'A3': ['1.4 TFSI 150ch', '2.0 TDI 150ch', '2.0 TFSI 190ch'],
        'A4': ['2.0 TDI 150ch', '2.0 TFSI 190ch', '3.0 TDI 245ch'],
        'Q5': ['2.0 TDI 190ch', '2.0 TFSI 252ch', '3.0 TDI 286ch']
      }
    },
    bmw: {
      models: ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'],
      motorisations: {
        'Série 3': ['320d 190ch', '330i 258ch', 'M340i 374ch'],
        'X3': ['xDrive20d 190ch', 'xDrive30i 252ch', 'M40i 360ch']
      }
    },
    peugeot: {
      models: ['208', '308', '3008', '5008', '508'],
      motorisations: {
        '308': ['1.2 PureTech 130ch', '1.5 BlueHDi 130ch', '1.6 PureTech 180ch'],
        '3008': ['1.2 PureTech 130ch', '1.5 BlueHDi 130ch', '1.6 PureTech 180ch']
      }
    }
  };

  // Fonction pour vérifier si un formulaire est valide
  function checkFormValidity(type) {
    if (type === 'amperage') {
      const amperage = document.getElementById('amperageSelect').value;
      const power = document.getElementById('powerSelect').value;
      const brand = document.getElementById('brandSelect').value;
      const button = document.getElementById('searchAmperageBtn');
      
      if (amperage || power || brand) {
        button.classList.remove('disabled');
      } else {
        button.classList.add('disabled');
      }
    } else if (type === 'vehicle') {
      const brand = document.getElementById('vehicleBrandSelect').value;
      const model = document.getElementById('vehicleModelSelect').value;
      const motor = document.getElementById('vehicleMotorSelect').value;
      const button = document.getElementById('searchVehicleBtn');
      
      if (brand && model && motor) {
        button.classList.remove('disabled');
      } else {
        button.classList.add('disabled');
      }
    }
  }

  // Ouvrir les sidebars
  openSidebarButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tab = this.getAttribute('data-tab');
      const sidebar = searchBatteries.querySelector(`#sidebar-${tab}`);
      
      // Fermer toutes les sidebars
      sidebars.forEach(s => s.classList.remove('open'));
      
      // Ouvrir la sidebar correspondante
      if (sidebar) {
        sidebar.classList.add('open');
        overlay.classList.add('active');
      }
    });
  });

  // Fermer les sidebars
  function closeSidebar() {
    sidebars.forEach(s => s.classList.remove('open'));
    overlay.classList.remove('active');
  }

  closeSidebarButtons.forEach(button => {
    button.addEventListener('click', closeSidebar);
  });

  overlay.addEventListener('click', closeSidebar);

  // Gestion des selects d'ampérage
  ['amperageSelect', 'powerSelect', 'brandSelect'].forEach(id => {
    const select = document.getElementById(id);
    if (select) {
      select.addEventListener('change', () => checkFormValidity('amperage'));
    }
  });

  // Gestion des selects de véhicule
  const vehicleBrandSelect = document.getElementById('vehicleBrandSelect');
  const vehicleModelSelect = document.getElementById('vehicleModelSelect');
  const vehicleMotorSelect = document.getElementById('vehicleMotorSelect');

  if (vehicleBrandSelect) {
    vehicleBrandSelect.addEventListener('change', function() {
      const selectedBrand = this.value;
      const modelWrapper = vehicleModelSelect.parentElement;
      const motorWrapper = vehicleMotorSelect.parentElement;
      
      // Reset des modèles et motorisations
      vehicleModelSelect.innerHTML = '<option value="">Modèle</option>';
      vehicleMotorSelect.innerHTML = '<option value="">Motorisation</option>';
      
      if (selectedBrand && vehicleData[selectedBrand]) {
        // Activer le select des modèles
        modelWrapper.classList.remove('disabled');
        vehicleModelSelect.disabled = false;
        
        // Remplir les modèles
        vehicleData[selectedBrand].models.forEach(model => {
          const option = document.createElement('option');
          option.value = model.toLowerCase().replace(/\s+/g, '-');
          option.textContent = model;
          vehicleModelSelect.appendChild(option);
        });
      } else {
        // Désactiver les selects
        modelWrapper.classList.add('disabled');
        motorWrapper.classList.add('disabled');
        vehicleModelSelect.disabled = true;
        vehicleMotorSelect.disabled = true;
      }
      
      checkFormValidity('vehicle');
    });
  }

  if (vehicleModelSelect) {
    vehicleModelSelect.addEventListener('change', function() {
      const selectedBrand = vehicleBrandSelect.value;
      const selectedModel = this.value;
      const motorWrapper = vehicleMotorSelect.parentElement;
      
      // Reset des motorisations
      vehicleMotorSelect.innerHTML = '<option value="">Motorisation</option>';
      
      if (selectedBrand && selectedModel && vehicleData[selectedBrand]) {
        const modelName = this.options[this.selectedIndex].textContent;
        const motorisations = vehicleData[selectedBrand].motorisations[modelName];
        
        if (motorisations) {
          // Activer le select des motorisations
          motorWrapper.classList.remove('disabled');
          vehicleMotorSelect.disabled = false;
          
          // Remplir les motorisations
          motorisations.forEach(motor => {
            const option = document.createElement('option');
            option.value = motor.toLowerCase().replace(/\s+/g, '-');
            option.textContent = motor;
            vehicleMotorSelect.appendChild(option);
          });
        }
      } else {
        // Désactiver le select
        motorWrapper.classList.add('disabled');
        vehicleMotorSelect.disabled = true;
      }
      
      checkFormValidity('vehicle');
    });
  }

  if (vehicleMotorSelect) {
    vehicleMotorSelect.addEventListener('change', function() {
     checkFormValidity('vehicle');
   });
 }

 // Recherche par IMMAT
 const immatButton = searchBatteries.querySelector('.searchInputWrapper button');
 const immatInput = searchBatteries.querySelector('.immat');

 if (immatButton) {
   immatButton.addEventListener('click', function(e) {
     e.preventDefault();
     const immat = immatInput.value.trim();
     
     if (immat) {
       console.log('Recherche par IMMAT:', immat);
       // Redirection vers la page de résultats
       window.location.href = `/battery/search?immat=${encodeURIComponent(immat)}`;
     }
   });
 }

 // Recherche par ampérage
 const searchAmperageBtn = document.getElementById('searchAmperageBtn');
 if (searchAmperageBtn) {
   searchAmperageBtn.addEventListener('click', function(e) {
     e.preventDefault();
     
     if (this.classList.contains('disabled')) return;
     
     const amperage = document.getElementById('amperageSelect').value;
     const power = document.getElementById('powerSelect').value;
     const brand = document.getElementById('brandSelect').value;
     
     const params = new URLSearchParams();
     if (amperage) params.set('amperage', amperage);
     if (power) params.set('power', power);
     if (brand) params.set('brands', brand);
     
     console.log('Recherche par ampérage:', { amperage, power, brand });
     window.location.href = `/battery/search?${params.toString()}`;
   });
 }

 // Recherche par véhicule
 const searchVehicleBtn = document.getElementById('searchVehicleBtn');
 if (searchVehicleBtn) {
   searchVehicleBtn.addEventListener('click', function(e) {
     e.preventDefault();
     
     if (this.classList.contains('disabled')) return;
     
     const brand = document.getElementById('vehicleBrandSelect').value;
     const model = document.getElementById('vehicleModelSelect').value;
     const motor = document.getElementById('vehicleMotorSelect').value;
     
     const params = new URLSearchParams();
     if (brand) params.set('brand', brand);
     if (model) params.set('model', model);
     if (motor) params.set('car_id', motor);
     
     console.log('Recherche par véhicule:', { brand, model, motor });
     window.location.href = `/battery/search?${params.toString()}`;
   });
 }

 // Gestion des flèches des selects (rotation au focus)
 const selectWrappers = searchBatteries.querySelectorAll('.select-wrapper');
 selectWrappers.forEach(wrapper => {
   const select = wrapper.querySelector('select');
   const arrow = wrapper.querySelector('.select-arrow');
   
   if (select && arrow) {
     select.addEventListener('focus', () => {
       arrow.style.transform = 'translateY(-50%) rotate(180deg)';
     });
     
     select.addEventListener('blur', () => {
       arrow.style.transform = 'translateY(-50%) rotate(0deg)';
     });
   }
 });

 // Validation initiale des formulaires
 checkFormValidity('amperage');
 checkFormValidity('vehicle');
});

// Gestion des selects pour les chaînes
document.addEventListener('DOMContentLoaded', function() {
  // Initialisation des selects si nécessaire
  const chainSelects = document.querySelectorAll('.chain-selectpicker select, .chain-brand-selectpicker select');
  
  chainSelects.forEach(select => {
    select.addEventListener('change', function() {
      // Logique de changement si nécessaire
      console.log('Valeur sélectionnée:', this.value);
    });
  });

  // Gestion du bouton de recherche
  const searchButton = document.querySelector('.chain-search-button');
  if (searchButton) {
    searchButton.addEventListener('click', function(e) {
      e.preventDefault();
      // Logique de recherche
      console.log('Recherche lancée');
    });
  }
});