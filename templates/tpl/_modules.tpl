{# brandung boilerplate template v1.0.0 #}

	{# head.tpl #}
	{% include "./partials/head.tpl" %}

	<body>

		{# browsehappy.tpl #}
		{% include "./partials/browsehappy.tpl" %}

		{# noscript.tpl #}
		{% include "./partials/noscript.tpl" %}

		{# header.tpl #}
		{% include "./partials/header.tpl" %}

		<main id="main" role="main">

			<h2 class="mod-headline">Grid</h2>
			{# grid.tpl #}
			{% include "./partials/grid.tpl" %}

			<h2 class="mod-headline">Modules</h2>
			<!-- start|bra-pb: html -->
			<!-- end|bra-pb: html -->
		</main>

		{# footer.tpl #}
		{% include "./partials/footer.tpl" %}

		{# jsfooter.tpl #}
		{% include "./partials/jsfooter.tpl" %}

	</body>
</html>
