$(document).ready(function () {
  let direction = 'left'
  let isAnimating = false

  function startMarquee(dir) {
    if (isAnimating) return

    isAnimating = true

    $('.logo-slider').marquee({
      speed: 50,
      gap: 0,
      delayBeforeStart: 0,
      direction: dir,
      duplicated: true,
      pauseOnHover: true,
      startVisible: true,
      allowCss3Support: true,
    })
  }

  startMarquee(direction)

  setInterval(function () {
    $('.logo-slider').marquee('destroy')

    direction = direction === 'left' ? 'right' : 'left'
    isAnimating = false

    setTimeout(() => {
      startMarquee(direction)
    }, 500)
  }, 14200)

  const serviceVideos = {
    multiproduits: '../images/service1.mp4',
    'meilleurs-prix': '../images/service2.mp4',
    flexibilite: '../images/service3.mp4',
    premium: '../images/service4.mp4',
  }

  const serviceContent = {
    multiproduits: {
      title:
        'Une seule plateforme. Une infinité de solutions pour votre atelier.',
      text: `Chez 07ZR, nous mettons à disposition des professionnels de
    l’automobile <strong>le catalogue le plus complet d’Europe</strong>, conçu pour
    répondre à l’ensemble de vos besoins techniques et logistiques. En
    un seul espace, accédez à une sélection inégalée de produits :
    <strong>pneus, jantes, chaînes, pièces détachées, pièces de réemploi,
    lubrifiants, batteries, équipements d’atelier, matériels et
    consommables.</strong><br />
    Avec 07ZR, vous centralisez vos achats, simplifiez votre gestion
    quotidienne, et bénéficiez d’un seul outil, pour tout ce qui fait
    tourner votre activité.`,
    },
    'meilleurs-prix': {
      title: 'Les meilleurs tarifs du marché, sans compromis.',
      text: `Nous vous garantissons <strong>un accès privilégié aux tarifs les plus compétitifs</strong>
    sur l’ensemble de nos gammes de produits. Grâce à notre réseau optimisé
    et nos accords exclusifs, vous réalisez des économies durables, sans
    jamais sacrifier la qualité.`,
    },
    flexibilite: {
      title: 'Gérez votre trésorerie en toute liberté.',
      text: `<strong>Choisissez les conditions de paiement</strong> qui conviennent à votre activité :
    différé, échelonné, ou au comptant. Notre objectif ? Vous offrir la
    <strong>souplesse nécessaire</strong> pour croître sereinement.`,
    },
    premium: {
      title: 'Des services premium pour les pros exigeants.',
      text: `Bénéficiez d’une <strong>logistique express</strong>, d’un accompagnement personnalisé,
    et d’outils avancés pour piloter vos achats. Avec 07ZR, <strong>vous gagnez en performance au quotidien</strong>.`,
    },
  }

  $('.services-section:not(.no-js) .service-card').on('click', function () {
    const key = $(this).data('service');
    const label = $(this).find('p').text();
    const videoSrc = $(this).find('source').attr('src');
    const title = $(this).find('h3').text();
    const description = $(this).find('span').text();

    // Update video source dynamically
    $('#service-detail video source').attr('src', videoSrc)
    $('#service-detail video')[0].load()

    // Update label and text
    $('#detail-label').text(label)
    $('.service-detail-content h3').text(title);
    $('.service-detail-content p').text(description);

    // Toggle visibility
    $('.services-grid').addClass('hidden')
    $('#service-detail').removeClass('hidden')
  })

  // Close button
  $('.service-close').on('click', function () {
    $('#service-detail').addClass('hidden')
    $('.services-grid').removeClass('hidden')
  })

  const swiper = new Swiper('.service-swiper', {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 35,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      600: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1280: {
        slidesPerView: 3,
      },
    },
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
  })

  $('.play-button').on('click', function () {
    const $wrapper = $(this).closest('.video-wrapper')
    const $poster = $wrapper.find('.poster')
    const $video = $wrapper.find('.service-video')
    const $button = $(this)

    if ($poster.length && $video.length) {
      $poster.hide()
      $video.show()[0].play()
      $button.hide()

      // Handle when the video ends
      $video.off('ended').on('ended', function () {
        $video.hide()
        $poster.show()
        $button.show()
      })
    } else {
      console.warn('Poster or video element not found in:', $wrapper)
    }
  })

  const testimonialSwiper = new Swiper('.testimonial-swiper', {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.custom-next',
      prevEl: '.custom-prev',
    },
    loop: true,
    breakpoints: {
      1024: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 2,
      },
      320: {
        slidesPerView: 1,
      },
    },
  })
})
