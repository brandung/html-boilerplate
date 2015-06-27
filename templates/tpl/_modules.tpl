{# brandung boilerplate template v1.0.0 #}

	{# head.tpl #}
	{% include "./partials/head.tpl" %}

	<body>

		{# browsehappy.tpl #}
		{% include "./partials/component/browsehappy.tpl" %}

		{# noscript.tpl #}
		{% include "./partials/component/noscript.tpl" %}

		{# header.tpl #}
		{% include "./partials/component/header.tpl" %}

		<main id="main" role="main">

			<h2 class="mod-headline">1. Colors</h2>
			<div style="overflow-x: auto">
				{% include "./partials/colors.tpl" %}
			</div>

			<hr/>

			<h2 class="mod-headline">2. Icons</h2>
			<div style="overflow-x: auto">
				{% include "./partials/icons.tpl" %}
			</div>

			<hr/>

			<h2 class="mod-headline">3. Breakpoints</h2>
			<div style="overflow-x: auto">
				{% include "./partials/breakpoints.tpl" %}
			</div>

			<hr/>

			<h2 class="mod-headline">4. Grid</h2>
			{# grid.tpl #}
			{% include "./partials/grid.tpl" %}

			<h2 class="mod-headline">5. Components</h2>

			<!-- <@newComponent@> -->

			<!-- start|bra-pb: html -->
			<!-- end|bra-pb: html -->

			<h2 class="mod-headline">6. Views</h2>

			<!-- <@newView@> -->
		</main>

		{# footer.tpl #}
		{% include "./partials/component/footer.tpl" %}

		{# jsfooter.tpl #}
		{% include "./partials/jsfooter.tpl" %}

	</body>
</html>
