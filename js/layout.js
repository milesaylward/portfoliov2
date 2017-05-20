var layout = (function() {

	var $main = $( '#app-main' ),
		$sections = $main.children( 'section' ),
		// works section
		$sectionPortfolio = $( '#portfolio' ),
		// work items
		$portfolioItems = $( '#portfolio-items > li' ),
		// work panels
		$workPanelsContainer = $( '#panel-project-items' ),
		$workPanels = $workPanelsContainer.children( 'div' ),
		totalWorkPanels = $workPanels.length,
		// navigating the work panels
		$nextProjectItem = $workPanelsContainer.find( 'nav > span.next-project' ),
		// if currently navigating the work items
		isAnimating = false,
		// close work panel trigger
		$closeProjectItem = $workPanelsContainer.find( 'nav > span.icon-cancel' ),
		transEndEventNames = {
			'WebkitTransition' : 'webkitTransitionEnd',
			'MozTransition' : 'transitionend',
			'OTransition' : 'oTransitionEnd',
			'msTransition' : 'MSTransitionEnd',
			'transition' : 'transitionend'
		},
		// transition end event name
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		// support css transitions
		supportTransitions = Modernizr.csstransitions;

	function init() {
		initEvents();
	}

	function initEvents() {

		$sections.each( function() {

			var $section = $( this );

			// expand the clicked section and scale down the others
			$section.on( 'click', function() {

				if( !$section.data( 'open' ) ) {
					$section.data( 'open', true ).addClass( 'expand expand-top' );
					$main.addClass( 'expand-item' );
				}

			} ).find( 'span.icon-cancel' ).on( 'click', function() {

				// close the expanded section and scale up the others
				$section.data( 'open', false ).removeClass( 'expand' ).on( transEndEventName, function( event ) {
					if( !$( event.target ).is( 'section' ) ) return false;
					$( this ).off( transEndEventName ).removeClass( 'expand-top' );
				} );

				if( !supportTransitions ) {
					$section.removeClass( 'expand-top' );
				}

				$main.removeClass( 'expand-item' );

				return false;

			} );

		} );

		// clicking on a work item: the current section scales down and the respective work panel slides up
		$portfolioItems.on( 'click', function( event ) {

			// scale down main section
			$sectionPortfolio.addClass( 'scale-down' );

			// show panel for this work item
			$workPanelsContainer.addClass( 'panel-items-show' );

			var $panel = $workPanelsContainer.find("[data-panel='" + $( this ).data( 'panel' ) + "']");
			currentWorkPanel = $panel.index();
			$panel.addClass( 'show-project' );

			return false;

		} );

		// navigating the work items: current work panel scales down and the next work panel slides up
		$nextProjectItem.on( 'click', function( event ) {

			if( isAnimating ) {
				return false;
			}
			isAnimating = true;

			var $currentPanel = $workPanels.eq( currentWorkPanel );
			currentWorkPanel = currentWorkPanel < totalWorkPanels - 1 ? currentWorkPanel + 1 : 0;
			var $nextPanel = $workPanels.eq( currentWorkPanel );

			$currentPanel.removeClass( 'show-project' ).addClass( 'hide-current-project' ).on( transEndEventName, function( event ) {
				if( !$( event.target ).is( 'div' ) ) return false;
				$( this ).off( transEndEventName ).removeClass( 'hide-current-project' );
				isAnimating = false;
			} );

			if( !supportTransitions ) {
				$currentPanel.removeClass( 'hide-current-project' );
				isAnimating = false;
			}

			$nextPanel.addClass( 'show-project' );

			return false;

		} );

		// clicking the work panels close button: the current work panel slides down and the section scales up again
		$closeProjectItem.on( 'click', function( event ) {

			// scale up main section
			$sectionPortfolio.removeClass( 'scale-down' );
			$workPanelsContainer.removeClass( 'panel-items-show' );
			$workPanels.eq( currentWorkPanel ).removeClass( 'show-project' );

			return false;

		} );

	}

	return { init : init };

})();
