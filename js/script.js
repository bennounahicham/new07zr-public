$(document).ready(function () {
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

	// Données des sous-catégories pour chaque catégorie
	const subcategoriesData = {
		outillage: [
			{
				name: "Crics et chandelles",
				url: "/fr/equipment/search?categoryId=3&subcategories=23&categoryName=Outillage/équipement",
			},
			{
				name: "Outillages divers",
				url: "/fr/equipment/search?categoryId=3&subcategories=71&categoryName=Outillage/équipement",
			},
			{
				name: "Récupérateur d'huile",
				url: "/fr/equipment/search?categoryId=3&subcategories=24&categoryName=Outillage/équipement",
			},
			{
				name: "Servantes",
				url: "/fr/equipment/search?categoryId=3&subcategories=22&categoryName=Outillage/équipement",
			},
			{
				name: "Autres Clés",
				url: "/fr/equipment/search?categoryId=3&subcategories=72&categoryName=Outillage/équipement",
			},
			{
				name: "Autres pinces",
				url: "/fr/equipment/search?categoryId=3&subcategories=73&categoryName=Outillage/équipement",
			},
			{
				name: "Clé à chocs",
				url: "/fr/equipment/search?categoryId=3&subcategories=25&categoryName=Outillage/équipement",
			},
		],
		montage: [
			{
				name: "Équilibreuse",
				url: "/fr/equipment/search?categoryId=2&subcategories=1&categoryName=Montage/équilibrage/réparation",
			},
			{
				name: "Monte-pneu",
				url: "/fr/equipment/search?categoryId=2&subcategories=2&categoryName=Montage/équilibrage/réparation",
			},
		],
		electricite: [
			{
				name: "Éclairage atelier",
				url: "/fr/equipment/search?categoryId=8&subcategories=40&categoryName=Électricité/éclairage",
			},
			{
				name: "Ampoules",
				url: "/fr/equipment/search?categoryId=8&subcategories=41&categoryName=Électricité/éclairage",
			},
		],
		exterieur: [
			{
				name: "Carrosserie",
				url: "/fr/equipment/search?categoryId=5&subcategories=35&categoryName=Extérieur véhicule",
			},
			{
				name: "Vitrage",
				url: "/fr/equipment/search?categoryId=5&subcategories=36&categoryName=Extérieur véhicule",
			},
		],
		machines: [
			{
				name: "Compresseurs",
				url: "/fr/equipment/search?categoryId=6&subcategories=37&categoryName=Machines",
			},
			{
				name: "Outillage pneumatique",
				url: "/fr/equipment/search?categoryId=6&subcategories=38&categoryName=Machines",
			},
		],
		entretien: [
			{
				name: "Liquides moteur",
				url: "/fr/equipment/search?categoryId=4&subcategories=15&categoryName=Entretien/nettoyage/ liquides/additifs",
			},
			{
				name: "Produits de nettoyage",
				url: "/fr/equipment/search?categoryId=4&subcategories=16&categoryName=Entretien/nettoyage/ liquides/additifs",
			},
		],
	};

	// Données de test pour les véhicules (batteries)
	const vehicleData = {
		audi: {
			models: ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "TT"],
			motorisations: {
				A3: ["1.4 TFSI 150ch", "2.0 TDI 150ch", "2.0 TFSI 190ch"],
				A4: ["2.0 TDI 150ch", "2.0 TFSI 190ch", "3.0 TDI 245ch"],
				Q5: ["2.0 TDI 190ch", "2.0 TFSI 252ch", "3.0 TDI 286ch"],
			},
		},
		bmw: {
			models: ["Série 1", "Série 3", "Série 5", "X1", "X3", "X5"],
			motorisations: {
				"Série 3": ["320d 190ch", "330i 258ch", "M340i 374ch"],
				X3: ["xDrive20d 190ch", "xDrive30i 252ch", "M40i 360ch"],
			},
		},
		peugeot: {
			models: ["208", "308", "3008", "5008", "508"],
			motorisations: {
				308: ["1.2 PureTech 130ch", "1.5 BlueHDi 130ch", "1.6 PureTech 180ch"],
				3008: ["1.2 PureTech 130ch", "1.5 BlueHDi 130ch", "1.6 PureTech 180ch"],
			},
		},
	};

	let isModalOpen = false;
	let currentHoveredCategory = null;

	// ===== MENU MOBILE =====
	function toggleMobileMenu() {
		$("#mobileMenu").toggleClass("show");
		if ($("#mobileMenu").hasClass("show")) {
			$("body").css("overflow", "hidden");
		} else {
			$("body").css("overflow", "");
		}
	}

	// Click event for hamburger icon
	if ($(".d-md-none").length) {
		$(".d-md-none").on("click", function () {
			toggleMobileMenu();
		});
	}

	// Close mobile menu when clicking on a link
	if ($(".mobileMenu .navbar-link").length) {
		$(".mobileMenu .navbar-link").on("click", function () {
			$("#mobileMenu").removeClass("show");
			$("body").css("overflow", "");
		});
	}

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

	// ===== NAVIGATION EFFECTS =====

	if ($('.header-top .d-flex[style*="cursor"]').length) {
		$('.header-top .d-flex[style*="cursor"]').on("click", function () {
			console.log("Navigation icon clicked:", $(this).find("span").text());
		});
	}

	// ===== SLIDERS =====
	// Slider principal
	if (
		$(".universe-slider .slider").length &&
		!$(".universe-slider .slider").hasClass("slick-initialized")
	) {
		$(".universe-slider .slider").slick({
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

	// Slider gold
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
			arrows: false,
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

	// Slider TopSales
	if (
		$(".topsales-slider").length &&
		!$(".topsales-slider").hasClass("slick-initialized")
	) {
		$(".topsales-slider").slick({
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
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		});
	}

	// ===== RECHERCHE PNEUS - SELECT2 =====
	// if ($(".tyre-select").length) {
	// 	$(".tyre-select").select2({
	// 		minimumResultsForSearch: Infinity,
	// 		placeholder: function () {
	// 			return $(this).data("placeholder");
	// 		},
	// 		allowClear: false,
	// 		dropdownParent: $(".search-container"),
	// 	});
	// }

	// if ($(".brand-select").length) {
	// 	$(".brand-select").select2({
	// 		placeholder: function () {
	// 			return $(this).data("placeholder");
	// 		},
	// 		allowClear: true,
	// 		dropdownParent: $(".search-container"),
	// 		language: {
	// 			noResults: function () {
	// 				return "Aucune marque ne correspond à votre recherche";
	// 			},
	// 			searching: function () {
	// 				return "Recherche en cours...";
	// 			},
	// 		},
	// 	});
	// }

	// if ($(".brand-type-select").length) {
	// 	$(".brand-type-select").select2({
	// 		placeholder: function () {
	// 			return $(this).data("placeholder");
	// 		},
	// 		allowClear: true,
	// 		minimumResultsForSearch: Infinity,
	// 		dropdownParent: $(".search-container"),
	// 	});
	// }

	// Gestion des dépendances entre selects pneus
	if ($("#width-select, #height-select, #diameter-select").length) {
		$("#width-select, #height-select, #diameter-select").on(
			"change",
			function () {
				updateDependentSelects();
			}
		);
	}

	// ===== SIDEBAR VEHICULE =====
	if ($("#openVehicleSearch").length) {
		$("#openVehicleSearch").on("click", function () {
			$("#vehicleSidebar").show().addClass("open");
			$("#overlay").show();
			$("body").css("overflow", "hidden");
		});
	}

	function closeSidebar() {
		$("#vehicleSidebar").removeClass("open");
		$("#overlay").hide();
		$("body").css("overflow", "");

		setTimeout(function () {
			$("#vehicleSidebar").hide();
		}, 300);
	}

	if ($("#closeSidebar").length) {
		$("#closeSidebar").on("click", closeSidebar);
	}

	if ($("#overlay").length) {
		$("#overlay").on("click", closeSidebar);
	}

	// Gestion des selects de la sidebar
	if ($("#marqueSelect").length) {
		$("#marqueSelect").on("change", function () {
			const $modeleSelect = $("#modeleSelect");
			const $motorisationSelect = $("#motorisationSelect");
			const $modeleWrapper = $modeleSelect.closest(".select-wrapper");
			const $motorisationWrapper =
				$motorisationSelect.closest(".select-wrapper");

			if ($(this).val()) {
				$modeleSelect.prop("disabled", false);
				$modeleWrapper.removeClass("disabled");
			} else {
				$modeleSelect.prop("disabled", true);
				$motorisationSelect.prop("disabled", true);
				$modeleWrapper.addClass("disabled");
				$motorisationWrapper.addClass("disabled");
				$modeleSelect.val("");
				$motorisationSelect.val("");
			}
			updateSearchButton();
		});
	}

	if ($("#modeleSelect").length) {
		$("#modeleSelect").on("change", function () {
			const $motorisationSelect = $("#motorisationSelect");
			const $motorisationWrapper =
				$motorisationSelect.closest(".select-wrapper");

			if ($(this).val()) {
				$motorisationSelect.prop("disabled", false);
				$motorisationWrapper.removeClass("disabled");
			} else {
				$motorisationSelect.prop("disabled", true);
				$motorisationWrapper.addClass("disabled");
				$motorisationSelect.val("");
			}
			updateSearchButton();
		});
	}

	if ($("#motorisationSelect").length) {
		$("#motorisationSelect").on("change", updateSearchButton);
	}

	function updateSearchButton() {
		if ($("#searchVehicleBtn").length) {
			const marque = $("#marqueSelect").val();
			const modele = $("#modeleSelect").val();
			const motorisation = $("#motorisationSelect").val();
			const $button = $("#searchVehicleBtn");

			if (marque && modele && motorisation) {
				$button.prop("disabled", false).removeClass("disabled");
			} else {
				$button.prop("disabled", true).addClass("disabled");
			}
		}
	}

	if ($("#searchVehicleBtn").length) {
		$("#searchVehicleBtn").on("click", function () {
			if (!$(this).hasClass("disabled")) {
				const marque = $("#marqueSelect").val();
				const modele = $("#modeleSelect").val();
				const motorisation = $("#motorisationSelect").val();

				console.log("Recherche avec:", { marque, modele, motorisation });
				closeSidebar();
			}
		});
	}

	// ===== RECHERCHE JANTES =====
	if ($("#search_jante .select-picker").length) {
		$("#search_jante .select-picker").select2({
			minimumResultsForSearch: Infinity,
			placeholder: function () {
				return $(this).find("option:first").text();
			},
		});

		// Gérer l'activation des selects suivants
		if ($("#marque").length) {
			$("#marque").on("change", function () {
				if ($(this).val()) {
					if ($("#modele").length) {
						$("#modele").prop("disabled", false).select2();
					}
				} else {
					$("#modele, #carosserie, #annee, #motorisation")
						.prop("disabled", true)
						.select2();
				}
			});
		}

		if ($("#modele").length) {
			$("#modele").on("change", function () {
				if ($(this).val()) {
					if ($("#carosserie").length) {
						$("#carosserie").prop("disabled", false).select2();
					}
				} else {
					$("#carosserie, #annee, #motorisation")
						.prop("disabled", true)
						.select2();
				}
			});
		}

		if ($("#carosserie").length) {
			$("#carosserie").on("change", function () {
				if ($(this).val()) {
					if ($("#annee").length) {
						$("#annee").prop("disabled", false).select2();
					}
				} else {
					$("#annee, #motorisation").prop("disabled", true).select2();
				}
			});
		}

		if ($("#annee").length) {
			$("#annee").on("change", function () {
				if ($(this).val()) {
					if ($("#motorisation").length) {
						$("#motorisation").prop("disabled", false).select2();
					}
				} else {
					$("#motorisation").prop("disabled", true).select2();
				}
			});
		}

		if ($("#motorisation").length) {
			$("#motorisation").on("change", function () {
				if ($(".search-button").length) {
					if ($(this).val()) {
						$(".search-button").removeClass("disabled").prop("disabled", false);
					} else {
						$(".search-button").addClass("disabled").prop("disabled", true);
					}
				}
			});
		}
	}

	// ===== RECHERCHE FLUIDES =====
	if ($("#search_fluides .select-picker").length) {
		$("#search_fluides .select-picker").select2({
			minimumResultsForSearch: Infinity,
			placeholder: function () {
				return $(this).find("option:first").text();
			},
			dropdownParent: $("#search_fluides .search-container"),
		});

		// Gérer la dépendance entre Catégorie et Sous-catégorie
		if ($("#categorie").length) {
			$("#categorie").on("change", function () {
				if ($("#sous-categorie").length) {
					if ($(this).val()) {
						$("#sous-categorie")
							.prop("disabled", false)
							.select2({
								minimumResultsForSearch: Infinity,
								placeholder: function () {
									return $(this).find("option:first").text();
								},
								dropdownParent: $("#search_fluides .search-container"),
							});
					} else {
						$("#sous-categorie")
							.prop("disabled", true)
							.select2({
								minimumResultsForSearch: Infinity,
								placeholder: function () {
									return $(this).find("option:first").text();
								},
								dropdownParent: $("#search_fluides .search-container"),
							});
					}
				}
			});
		}
	}

	// ===== MODAL CATEGORIES =====
	if ($("#categoriesBtn").length) {
		$("#categoriesBtn").on("click", function (e) {
			e.preventDefault();
			e.stopPropagation();

			if (isModalOpen) {
				closeModal();
			} else {
				openModal();
			}
		});
	}

	function openModal() {
		if ($("#categoriesModal").length) {
			$("#categoriesModal").fadeIn(200);
			$("#categoriesBtn").addClass("open");
			isModalOpen = true;
		}
	}

	function closeModal() {
		if ($("#categoriesModal").length) {
			$("#categoriesModal").fadeOut(200);
			$("#categoriesBtn").removeClass("open");
			if ($("#subcategoriesPanel").length) {
				$("#subcategoriesPanel").hide();
			}
			isModalOpen = false;
			currentHoveredCategory = null;
		}
	}

	// Fermer la modal en cliquant ailleurs
	$(document).on("click", function (e) {
		if (isModalOpen && !$(e.target).closest(".dropdown-container").length) {
			closeModal();
		}
	});

	// Hover sur les catégories
	if ($(".nav-item").length) {
		$(".nav-item").on("mouseenter", function () {
			const categoryType = $(this).data("category");
			currentHoveredCategory = categoryType;

			if (subcategoriesData[categoryType]) {
				showSubcategories(subcategoriesData[categoryType]);
			}
		});

		$(".nav-item").on("mouseleave", function () {
			setTimeout(function () {
				if (
					currentHoveredCategory &&
					!$("#subcategoriesPanel:hover").length &&
					!$(".nav-item:hover").length
				) {
					if ($("#subcategoriesPanel").length) {
						$("#subcategoriesPanel").hide();
					}
					currentHoveredCategory = null;
				}
			}, 100);
		});
	}

	// Hover sur le panel des sous-catégories
	if ($("#subcategoriesPanel").length) {
		$("#subcategoriesPanel").on("mouseenter", function () {
			// Maintenir le panel ouvert
		});

		$("#subcategoriesPanel").on("mouseleave", function () {
			$(this).hide();
			currentHoveredCategory = null;
		});
	}

	function showSubcategories(subcategories) {
		if ($("#subcategoriesList").length) {
			const $subcategoriesList = $("#subcategoriesList");
			$subcategoriesList.empty();

			subcategories.forEach(function (subcat) {
				const $li = $("<li>");
				const $a = $("<a>").attr("href", subcat.url).text(subcat.name);
				$li.append($a);
				$subcategoriesList.append($li);
			});

			$("#subcategoriesPanel").show();
		}
	}

	// Fermer la modal lors du clic sur un lien
	if ($(".cat-dropdown a").length) {
		$(".cat-dropdown a").on("click", function () {
			closeModal();
		});
	}

	// ===== RECHERCHE BATTERIES =====
	const $searchBatteries = $("#search_batteries");

	if ($searchBatteries.length) {
		// Fonction pour vérifier la validité des formulaires
		function checkFormValidity(type) {
			if (type === "amperage") {
				const amperage = $("#amperageSelect").val();
				const power = $("#powerSelect").val();
				const brand = $("#brandSelect").val();
				const $button = $("#searchAmperageBtn");

				if ($button.length) {
					if (amperage || power || brand) {
						$button.removeClass("disabled");
					} else {
						$button.addClass("disabled");
					}
				}
			} else if (type === "vehicle") {
				const brand = $("#vehicleBrandSelect").val();
				const model = $("#vehicleModelSelect").val();
				const motor = $("#vehicleMotorSelect").val();
				const $button = $("#searchVehicleBtn");

				if ($button.length) {
					if (brand && model && motor) {
						$button.removeClass("disabled");
					} else {
						$button.addClass("disabled");
					}
				}
			}
		}

		// Ouvrir les sidebars
		$searchBatteries.find(".open-sidebar").on("click", function () {
			const tab = $(this).attr("data-tab");
			const $sidebar = $searchBatteries.find(`#sidebar-${tab}`);
			const $overlay = $searchBatteries.find(".overlay");

			// Fermer toutes les sidebars
			$searchBatteries.find(".sidebar").removeClass("open");

			// Ouvrir la sidebar correspondante
			if ($sidebar.length) {
				$sidebar.addClass("open");
				if ($overlay.length) {
					$overlay.addClass("active");
				}
			}
		});

		// Fermer les sidebars
		function closeBatterySidebar() {
			$searchBatteries.find(".sidebar").removeClass("open");
			$searchBatteries.find(".overlay").removeClass("active");
		}

		$searchBatteries.find(".close-sidebar").on("click", closeBatterySidebar);
		$searchBatteries.find(".overlay").on("click", closeBatterySidebar);

		// Gestion des selects d'ampérage
		["amperageSelect", "powerSelect", "brandSelect"].forEach((id) => {
			const $select = $(`#${id}`);
			if ($select.length) {
				$select.on("change", () => checkFormValidity("amperage"));
			}
		});

		// Gestion des selects de véhicule pour batteries
		const $vehicleBrandSelect = $("#vehicleBrandSelect");
		const $vehicleModelSelect = $("#vehicleModelSelect");
		const $vehicleMotorSelect = $("#vehicleMotorSelect");

		if ($vehicleBrandSelect.length) {
			$vehicleBrandSelect.on("change", function () {
				const selectedBrand = $(this).val();
				const $modelWrapper = $vehicleModelSelect.parent();
				const $motorWrapper = $vehicleMotorSelect.parent();

				// Reset des modèles et motorisations
				$vehicleModelSelect.html('<option value="">Modèle</option>');
				$vehicleMotorSelect.html('<option value="">Motorisation</option>');

				if (selectedBrand && vehicleData[selectedBrand]) {
					// Activer le select des modèles
					$modelWrapper.removeClass("disabled");
					$vehicleModelSelect.prop("disabled", false);

					// Remplir les modèles
					vehicleData[selectedBrand].models.forEach((model) => {
						const $option = $("<option>")
							.val(model.toLowerCase().replace(/\s+/g, "-"))
							.text(model);
						$vehicleModelSelect.append($option);
					});
				} else {
					// Désactiver les selects
					$modelWrapper.addClass("disabled");
					$motorWrapper.addClass("disabled");
					$vehicleModelSelect.prop("disabled", true);
					$vehicleMotorSelect.prop("disabled", true);
				}

				checkFormValidity("vehicle");
			});
		}

		if ($vehicleModelSelect.length) {
			$vehicleModelSelect.on("change", function () {
				const selectedBrand = $vehicleBrandSelect.val();
				const selectedModel = $(this).val();
				const $motorWrapper = $vehicleMotorSelect.parent();

				// Reset des motorisations
				$vehicleMotorSelect.html('<option value="">Motorisation</option>');

				if (selectedBrand && selectedModel && vehicleData[selectedBrand]) {
					const modelName = $(this).find("option:selected").text();
					const motorisations =
						vehicleData[selectedBrand].motorisations[modelName];

					if (motorisations) {
						// Activer le select des motorisations
						$motorWrapper.removeClass("disabled");
						$vehicleMotorSelect.prop("disabled", false);

						// Remplir les motorisations
						motorisations.forEach((motor) => {
							const $option = $("<option>")
								.val(motor.toLowerCase().replace(/\s+/g, "-"))
								.text(motor);
							$vehicleMotorSelect.append($option);
						});
					}
				} else {
					// Désactiver le select
					$motorWrapper.addClass("disabled");
					$vehicleMotorSelect.prop("disabled", true);
				}

				checkFormValidity("vehicle");
			});
		}

		if ($vehicleMotorSelect.length) {
			$vehicleMotorSelect.on("change", function () {
				checkFormValidity("vehicle");
			});
		}

		// Recherche par IMMAT
		const $immatButton = $searchBatteries.find(".searchInputWrapper button");
		const $immatInput = $searchBatteries.find(".immat");

		if ($immatButton.length && $immatInput.length) {
			$immatButton.on("click", function (e) {
				e.preventDefault();
				const immat = $immatInput.val().trim();

				if (immat) {
					console.log("Recherche par IMMAT:", immat);
					window.location.href = `/battery/search?immat=${encodeURIComponent(
						immat
					)}`;
				}
			});
		}

		// Recherche par ampérage
		const $searchAmperageBtn = $("#searchAmperageBtn");
		if ($searchAmperageBtn.length) {
			$searchAmperageBtn.on("click", function (e) {
				e.preventDefault();

				if ($(this).hasClass("disabled")) return;

				const amperage = $("#amperageSelect").val();
				const power = $("#powerSelect").val();
				const brand = $("#brandSelect").val();

				const params = new URLSearchParams();
				if (amperage) params.set("amperage", amperage);
				if (power) params.set("power", power);
				if (brand) params.set("brands", brand);

				console.log("Recherche par ampérage:", { amperage, power, brand });
				window.location.href = `/battery/search?${params.toString()}`;
			});
		}

		// Recherche par véhicule
		const $searchVehicleBtn = $("#searchVehicleBtn");
		if ($searchVehicleBtn.length) {
			$searchVehicleBtn.on("click", function (e) {
				e.preventDefault();

				if ($(this).hasClass("disabled")) return;

				const brand = $("#vehicleBrandSelect").val();
				const model = $("#vehicleModelSelect").val();
				const motor = $("#vehicleMotorSelect").val();

				const params = new URLSearchParams();
				if (brand) params.set("brand", brand);
				if (model) params.set("model", model);
				if (motor) params.set("car_id", motor);

				console.log("Recherche par véhicule:", { brand, model, motor });
				window.location.href = `/battery/search?${params.toString()}`;
			});
		}

		// Gestion des flèches des selects (rotation au focus)
		const $selectWrappers = $searchBatteries.find(".select-wrapper");
		$selectWrappers.each(function () {
			const $wrapper = $(this);
			const $select = $wrapper.find("select");
			const $arrow = $wrapper.find(".select-arrow");

			if ($select.length && $arrow.length) {
				$select.on("focus", function () {
					$arrow.css("transform", "translateY(-50%) rotate(180deg)");
				});

				$select.on("blur", function () {
					$arrow.css("transform", "translateY(-50%) rotate(0deg)");
				});
			}
		});

		// Validation initiale des formulaires
		checkFormValidity("amperage");
		checkFormValidity("vehicle");
	}

	// ===== GESTION DES CHAINES =====
	const $chainSelects = $(
		".chain-selectpicker select, .chain-brand-selectpicker select"
	);

	if ($chainSelects.length) {
		$chainSelects.on("change", function () {
			console.log("Valeur sélectionnée:", $(this).val());
		});
	}

	const $chainSearchButton = $(".chain-search-button");
	if ($chainSearchButton.length) {
		$chainSearchButton.on("click", function (e) {
			e.preventDefault();
			console.log("Recherche lancée");
		});
	}

	// ===== FONCTIONS UTILITAIRES =====

	// Fonction pour charger les données des selects pneus
	function loadSelectData() {
		if ($("#width-select").length) {
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
		}

		if ($("#height-select").length) {
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
		}

		if ($("#diameter-select").length) {
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
		}

		if ($("#load-select").length) {
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
		}

		if ($("#speed-select").length) {
			loadOptionsForSelect("#speed-select", ENDPOINTS.speed, [
				"H",
				"V",
				"W",
				"Y",
				"Z",
			]);
		}

		if ($("#brand-select").length) {
			loadBrands();
		}

		if ($("#brand-type-select").length) {
			loadBrandTypes();
		}
	}

	// Fonction générique pour charger les options d'un select
	function loadOptionsForSelect(selectId, endpoint, fallbackData) {
		const $select = $(selectId);
		if (!$select.length) return;

		const currentValue = $select.val();

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
		if (!$select.length) return;

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
		if (!$select.length) return;

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

		const hasBasicDimensions = width && height && diameter;

		if ($("#load-select, #speed-select").length) {
			$("#load-select, #speed-select").prop("disabled", !hasBasicDimensions);
		}

		if ($("#brand-select, #brand-type-select").length) {
			$("#brand-select, #brand-type-select").prop(
				"disabled",
				!hasBasicDimensions
			);
		}

		if ($('input[name="season"]').length) {
			$('input[name="season"]').prop("disabled", !hasBasicDimensions);
		}

		if ($(".checkbox-wrapper").length) {
			$(".checkbox-wrapper").toggleClass("disabled", !hasBasicDimensions);
		}

		if (
			$("#load-select, #speed-select, #brand-select, #brand-type-select").length
		) {
			$(
				"#load-select, #speed-select, #brand-select, #brand-type-select"
			).trigger("change.select2");
		}
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
		// window.location.href = '/recherche-pneus?' + $.param(formData);
	}
});

// Slider Silver
if (
	$(".silver-slider .slider").length &&
	!$(".silver-slider .slider").hasClass("slick-initialized")
) {
	$(".silver-slider .slider").slick({
		infinite: true,
		speed: 300,
		slidesToShow: 3,
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
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	});
}

// ===== DROPDOWN LANGUE HEADER =====
$(function () {
	var $langSelector = $(".language-selector");
	var $toggle = $langSelector.find(".language-toggle");
	var $menu = $langSelector.find(".language-menu");

	$toggle.on("click keydown", function (e) {
		if (e.type === "click" || e.key === "Enter" || e.key === " ") {
			$langSelector.toggleClass("open");
			if ($langSelector.hasClass("open")) {
				$toggle.attr("aria-expanded", "true");
			} else {
				$toggle.attr("aria-expanded", "false");
			}
		}
	});

	// Ferme le menu si clic ailleurs (mais PAS sur un lien du menu)
	$(document).on("click", function (e) {
		if (
			!$langSelector.is(e.target) &&
			$langSelector.has(e.target).length === 0
		) {
			$langSelector.removeClass("open");
			$toggle.attr("aria-expanded", "false");
		}
	});
});

$(document).ready(function () {
	// Toggle des sous-catégories (sauf pour les produits populaires)
	$("#spareparts-categories").on("click", ".subcategory .title", function (e) {
		e.preventDefault();

		const $subcategory = $(this).closest(".subcategory");
		const $secsubcategorys = $subcategory.find(".secsubcategorys");
		const $arrow = $(this).find("svg");

		// Vérifier si c'est les produits populaires (pas de flèche)
		if ($arrow.length === 0) {
			// Logique pour les produits populaires
			const productName = $(this).text().trim();
			console.log("Recherche produit populaire:", productName);
			return;
		}

		// Toggle pour les autres catégories
		if ($secsubcategorys.is(":visible")) {
			$secsubcategorys.slideUp(300);
			$arrow.css("transform", "rotate(0deg)");
		} else {
			$secsubcategorys.slideDown(300);
			$arrow.css("transform", "rotate(180deg)");
		}
	});

	// Recherche dans les catégories
	$("#spareparts-categories .searchInput").on("input", function () {
		const searchValue = $(this).val().toLowerCase().trim();
		const $cards = $("#spareparts-categories .cat-cards .card");

		if (searchValue === "") {
			// Afficher toutes les cartes et tous les éléments
			$cards.show();
			$cards.find(".subcategory, .secsubcategorys a").show();
			return;
		}

		$cards.each(function () {
			const $card = $(this);
			const categoryName = $card.find(".card-header span").text().toLowerCase();
			let cardHasMatch = false;

			// Niveau 1 : Vérifier si le nom de la catégorie parente correspond
			if (categoryName.includes(searchValue)) {
				cardHasMatch = true;
				// Afficher toutes les sous-catégories si la catégorie parente correspond
				$card.find(".subcategory, .secsubcategorys a").show();
			} else {
				// Vérifier chaque sous-catégorie
				$card.find(".subcategory").each(function () {
					const $subcategory = $(this);
					const subcategoryText = $subcategory
						.find(".title")
						.clone()
						.children()
						.remove()
						.end()
						.text()
						.toLowerCase()
						.trim();
					let subcategoryHasMatch = false;

					// Niveau 2 : Vérifier si la sous-catégorie correspond
					if (subcategoryText.includes(searchValue)) {
						subcategoryHasMatch = true;
						cardHasMatch = true;
						$subcategory.show();
						// Afficher toutes les sous-sous-catégories si la sous-catégorie correspond
						$subcategory.find(".secsubcategorys a").show();
					} else {
						// Niveau 3 : Vérifier les sous-sous-catégories
						let hasMatchingSubSubcategory = false;

						$subcategory.find(".secsubcategorys a").each(function () {
							const $secSubcategory = $(this);
							const secSubcategoryText = $secSubcategory
								.text()
								.toLowerCase()
								.trim();

							if (secSubcategoryText.includes(searchValue)) {
								hasMatchingSubSubcategory = true;
								cardHasMatch = true;
								$secSubcategory.show();
							} else {
								$secSubcategory.hide();
							}
						});

						// Afficher la sous-catégorie seulement si elle a des sous-sous-catégories correspondantes
						if (hasMatchingSubSubcategory) {
							$subcategory.show();
						} else {
							$subcategory.hide();
						}
					}
				});
			}

			// Afficher ou masquer la carte selon le résultat
			if (cardHasMatch) {
				$card.show();
			} else {
				$card.hide();
			}
		});
	});

	// Gestion des boutons de l'iframe
	$("#spareparts-categories .expanded button:last-child").on(
		"click",
		function () {
			console.log("Agrandir iframe");
		}
	);

	$("#spareparts-categories .expanded button:first-child").on(
		"click",
		function () {
			if (!$(this).prop("disabled")) {
				console.log("Retour iframe");
			}
		}
	);

	// Gestion du clic sur les sous-sous-catégories
	$("#spareparts-categories").on("click", ".secsubcategorys div", function (e) {
		e.stopPropagation();
		const categoryName = $(this).text().trim();
		console.log("Clic sur sous-sous-catégorie:", categoryName);
	});
});

$(document).ready(function () {
	// Égaliser la hauteur des cartes
	function equalizeCardHeights() {
		let maxHeight = 0;
		const cards = $("#equipment-categories .equipment-card");

		// Reset heights
		cards.css("height", "auto");

		// Find max height
		cards.each(function () {
			const height = $(this).outerHeight();
			if (height > maxHeight) {
				maxHeight = height;
			}
		});

		// Set all cards to max height
		cards.css("height", maxHeight + "px");
	}

	// Equal heights on load and resize
	equalizeCardHeights();
	$(window).resize(equalizeCardHeights);

	// Smooth scrolling for subcategories
	$("#equipment-categories .equipment-subcategories").on("scroll", function () {
		$(this).addClass("scrolling");
		clearTimeout($(this).data("scrollTimer"));
		$(this).data(
			"scrollTimer",
			setTimeout(() => {
				$(this).removeClass("scrolling");
			}, 150)
		);
	});
});

$(document).ready(function () {
	$(".select2").each(function () {
		const $el = $(this);

        console.log($el);

		if ($el.hasClass("select2-hidden-accessible")) {
			$el.select2("destroy");
		}

		$el.select2({
			width: "100%",
			minimumResultsForSearch: 0,
            allowClear: true,
			placeholder: $el.data("placeholder") || "",
		});
	});

	$(".filter-type").each(function () {
		const $toggle = $(this);
		const $icon = $toggle.find(".icon");
		const targetId = $toggle.attr("data-bs-target");
		const $target = $(targetId);

		if (!$target.length) return;

		// Set initial state
		if ($target.hasClass("show")) {
			$icon.addClass("fa-chevron-up");
		} else {
			$icon.addClass("fa-chevron-down");
		}

		$target.on("show.bs.collapse", function () {
			$icon.removeClass("fa-chevron-down").addClass("fa-chevron-up");
		});

		$target.on("hide.bs.collapse", function () {
			$icon.removeClass("fa-chevron-up").addClass("fa-chevron-down");
		});
	});

	// Quantity increment/decrement
	$(".qty").on("click", ".qty-selector", function () {
		const $input = $(this).siblings(".qty-input");
		const currentVal = parseInt($input.val());

		if ($(this).find("i").hasClass("fa-plus")) {
			$input.val(currentVal + 1);
		} else if ($(this).find("i").hasClass("fa-minus") && currentVal > 1) {
			$input.val(currentVal - 1);
		}
		updateFilterList();
	});

	// Element filtering
	$(".element-search").on("input", function () {
		const searchTerm = $(this).val().toLowerCase();
		console.log("Searched term:", searchTerm);

		$(this)
			.closest(".filter")
			.find(".filter-options .filter-option")
			.each(function () {
				const text = $(this).find("span:first-child").text().toLowerCase();
				console.log("Filter option text:", text);
				$(this).closest('li').toggle(text.includes(searchTerm));
			});
	});

	// Helper to extract clean label text from .filter-option
	function getFilterLabel($filterOption) {
		return $filterOption.find("span").length > 0
			? $filterOption.find("span").first().text().trim()
			: $filterOption.text().trim();
	}

	// Utility to update the filter pills display
	function updateFilterList(refresh = true) {
		const $filterList = $(".filter-list");
		$filterList.find(".filter").remove();

		const checked = $('.filter-bar input[type="checkbox"]:checked');
		const qty = parseInt($(".filter-bar .qty-input").val(), 10);

		// Get Select2 values
		const select2Values = [];
		$('.filter-bar .select2').each(function() {
			const $select = $(this);
			const value = $select.val();
			if (value && value !== '') {
				const text = $select.find('option:selected').text();
				const label = $select.closest('.filter').find('.filter-type-name').text().trim();
				select2Values.push({
					label: label,
					value: value,
					text: text,
					element: $select
				});
			}
		});

		let hasFilters = false;

		// Add checkbox filters
		checked.each(function () {
			hasFilters = true;
			const $checkbox = $(this);
			const label = getFilterLabel(
				$checkbox.closest(".control--checkbox").find(".filter-option")
			);
			const filterGroup = $checkbox
				.closest(".filter")
				.find(".filter-type-name")
				.text()
				.trim();

			const $pill = $(`<div class="filter" data-label="${label}" data-type="checkbox">
			${filterGroup}: <span>${label}</span>
			<i class="fas fa-xmark icon" role="button"></i>
			</div>`);
			$pill.data("checkbox", $checkbox);
			$filterList.append($pill);
		});

		// Add Select2 filters
		select2Values.forEach(function(select2) {
			hasFilters = true;
			const $pill = $(`<div class="filter" data-label="${select2.value}" data-type="select2">
			${select2.label}: <span>${select2.text}</span>
			<i class="fas fa-xmark icon" role="button"></i>
			</div>`);
			$pill.data("select2", select2.element);
			$filterList.append($pill);
		});

		if (qty > 1) {
			hasFilters = true;
			$filterList.append(`<div class="filter" data-label="Quantité" data-type="quantity">
			Quantité: <span>${qty}</span>
			<i class="fas fa-xmark icon" role="button"></i>
			</div>`);
		}

		if (hasFilters) {
			$filterList.removeClass("hidden").append(`<div class="filter delete-all">
			Tout supprimer <i class="fas fa-xmark icon" role="button"></i>
			</div>`);
		} else {
			$filterList.addClass("hidden");
		}

        let filterGroups = {};

        if(refresh)
            updateResults(true);
	}

    updateFilterList(false);

    function updateResults(include_filters = false, reload = false)
    {
        let filterGroups = {};
        let baseSearchUrl = null;

        if($('.search-form').length) {
            baseSearchUrl = $('.search-form').data("action");
            $('.search-form')
                .find("input, select, button.active")
                .each(function () {
                    if ($(this).val()) {
                        const name = $(this).attr("name");
                        const value = $(this).val();

                        if (!filterGroups[name]) {
                            filterGroups[name] = [];
                        }
                        filterGroups[name].push(value);
                    }
                });
        }

        if(include_filters)
        {
            if($('.filter-bar').length) {
                if($('.filter-bar').data("action") != '')
                {
                    baseSearchUrl = $('.filter-bar').data("action");
                }

                if(!baseSearchUrl) {
                    return;
                }
                $('.filter-bar')
                    .find("input[type='text'], input[type='checkbox']:checked, select, button.active")
                    .each(function () {
                        if ($(this).val()) {
                            let name = $(this).attr("name");
                            if (name) {
                                name = name.replace(/\[|\]/g, "");
                            }
                            let value = $(this).val();

                            if (!filterGroups[name]) {
                                filterGroups[name] = [];
                            }
                            // filterGroups[name].push(value);
                            if (name && !filterGroups[name].includes(value)) {
                                filterGroups[name].push(value);
                            }
                        }
                    });
            }
        }

        let filters = [];
		Object.keys(filterGroups).forEach(function (name) {
			const values = filterGroups[name].join("&");
			filters.push([name, values].join("-"));
		});

        let finalUrl = baseSearchUrl+"/"; // Enlever le slash final

        if (finalUrl.endsWith("-/")) {
            finalUrl = finalUrl.slice(0, -1);
        }

		if (filters.length > 0) {
			finalUrl += filters.join("/");
		} else {
			// redirect to parent URL if no filters
            finalUrl = finalUrl.replace(/\/[^/]+$/, "");
		}


		if(reload)
        {
		    window.location.href = finalUrl;
        }
        else
        {
            window.history.pushState({}, "", finalUrl);
            getResults(finalUrl);
            // Update pagination URLs
        }
    }

    function getResults(url)
    {
        $('#products_container').addClass('loading');
        $.ajax({
            url: url,
            method: "GET",
            dataType: "html",
            success: function (data) {
                $('#products_container').html(data);
                updateFilterList(false);
                $('#products_container').removeClass('loading');
            },
            error: function (xhr, status, error) {
                console.error("Erreur lors de la récupération des résultats:", error);
                updateFilterList(false);
                $('#products_container').removeClass('loading');
            }
        });
    }

    // Gestion du formulaire de recherche pneus
	$(".search-form").on("submit", function (e) {
		e.preventDefault();
		// Collecter tous les filtres
		updateResults(false, true);
	});


	$(".filter-bar").on("change", 'input[type="checkbox"]', function () {
		updateFilterList();
		if (typeof isMobile === "function" && isMobile()) {
			$(".mobile-filter-panel").removeClass("active");
		}
	});

	// Add Select2 change event listener
	$(".filter-bar").on("change", ".select2", function () {
		updateFilterList();
	});

	$("#products_container").on("click", ".filter-list .fa-xmark", function () {
		console.log(
			"Filter pill clicked to remove:",
			$(this).closest(".filter").data("label")
		);

		const $pill = $(this).closest(".filter");

		if ($pill.hasClass("delete-all")) {
			$('.filter-bar input[type="checkbox"]').prop("checked", false);
			$(".filter-bar .qty-input").val(1);
			// Reset Select2 elements
			$('.filter-bar .select2').each(function() {
				$(this).val('').trigger('change');
			});
			updateFilterList();
			return;
		}

		if ($pill.data("label") === "Quantité" || $pill.data("type") === "quantity") {
			$(".filter-bar .qty-input").val(1);
			updateFilterList();
			return;
		}

		// Handle Select2 filter removal
		if ($pill.data("type") === "select2") {
			const $select2 = $pill.data("select2");
			$select2.val('').trigger('change');
			updateFilterList();
			return;
		}

		// Handle checkbox filter removal
		const $checkbox =
			$pill.data("checkbox") ||
			$('.filter-bar input[type="checkbox"]:checked').filter(function () {
				return (
					getFilterLabel(
						$(this).closest(".control--checkbox").find(".filter-option")
					) === $pill.data("label")
				);
			});

		$checkbox.prop("checked", false);
		updateFilterList();
	});

	window.handleSelect = function (event, value, displayText) {
		event.preventDefault();

		const dropdownMenu = event.target.closest(".dropdown-menu");

		// Remove 'active' class and hide all check icons
		const items = dropdownMenu.querySelectorAll(".dropdown-item");
		items.forEach((item) => {
			item.classList.remove("active");
			const icon = item.querySelector(".check-icon");
			if (icon) icon.style.display = "none";
		});

		// Mark selected item as active
		const selectedItem = event.target.closest(".dropdown-item");
		selectedItem.classList.add("active");

		// Show its check icon
		const selectedIcon = selectedItem.querySelector(".check-icon");
		if (selectedIcon) selectedIcon.style.display = "inline-block";

		// Update dropdown button text
		const dropdownButton = event.target
			.closest(".dropdown")
			.querySelector("#dropdownText");
		if (dropdownButton) {
			dropdownButton.textContent = displayText;
		}
	};

	$(".toggle-devis").on("change", function () {
		const isChecked = $(this).is(":checked");
		const id = $(this).attr("id");
		const $label = $('label[for="' + id + '"]');

		$label.text(isChecked ? "Retirer du devis" : "Ajouter au devis");
	});

	function isMobile() {
		return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		);
	}

	$(".mobile-filter-button").on("click", function () {
		$(".mobile-filter-panel").addClass("active");
	});
	$(".mobile-filter-close").on("click", function () {
		$(".mobile-filter-panel").removeClass("active");
	});
});

$(function () {
	$("button.toggle").click(function () {
		$(this).toggleClass("active");
	});

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
    });

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
    });
});
