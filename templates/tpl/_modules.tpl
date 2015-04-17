<!doctype html>
<!--[if lte IE 8]> <html class="no-js lt-ie9" lang="de"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="de"> <!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title>%%project%%</title>
		<meta name="description" content="">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="cleartype" content="on">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">

		<!--[if lte IE 8]>
		<script src="/%%public%%/js/libs/vendor/html5shiv/html5shiv.min.js"></script>
		<link rel="stylesheet" href="/%%public%%/css/all-old-ie.css">
		<![endif]-->
		<!--[if gt IE 8]><!-->
		<link rel="stylesheet" href="/%%public%%/css/main.css">
		<!--<![endif]-->
	</head>
	<body>
		<!--[if lt IE 8]>
		<p class="browsehappy">Sie verwenden einen <strong>veralteten</strong> Browser. Bitte <a href="http://browsehappy.com/" target="_blank">aktualisieren Sie Ihren Browser</a> um die Seite richtig darstellen zu können.</p>
		<![endif]-->
		<noscript>
			<p><strong>JavaScript scheint in Ihrem Browser deaktiviert zu sein.</strong></p>
			<p>Sie müssen JavaScript in Ihrem Browser aktivieren um alle Funktionen der Seite nutzen zu können.</p>
		</noscript>

		<header>
			Header
			<nav role="navigation">
				Navi
			</nav>
		</header>

		<main id="main" role="main">
			<h2 class="mod-headline">Grid</h2>
			<div class="row">
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-6 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-3 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-3 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-3 .col-m-1</div>
				<div class="col-s-6 col-m-1">.col-s-3 .col-m-1</div>
			</div>

			<div class="row">
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2</div>
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2</div>
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2</div>
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2</div>
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2</div>
				<div class="col-s-6 col-m-2">.col-s-6 .col-m-2
				</div>
			</div>

			<div class="row">
				<div class="col-s-3">.col-s-3</div>
				<div class="col-s-3">.col-s-3</div>
				<div class="col-s-3">.col-s-3</div>
				<div class="col-s-3">.col-s-3</div>
			</div>

			<div class="row">
				<div class="col-s-4">.col-s-4</div>
				<div class="col-s-4">.col-s-4</div>
				<div class="col-s-4">.col-s-4</div>
			</div>

			<div class="row">
				<div class="col-s-5">.col-s-5</div>
				<div class="col-s-4">.col-s-4</div>
				<div class="col-s-3">.col-s-3</div>
			</div>

			<div class="row">
				<div class="col-s-6">.col-s-6</div>
				<div class="col-s-6">.col-s-6</div>
			</div>

			<div class="row">
				<div class="col-s-7">.col-s-7</div>
				<div class="col-s-5">.col-s-5</div>
			</div>

			<div class="row">
				<div class="col-s-8">.col-s-8</div>
				<div class="col-s-4">.col-s-4</div>
			</div>

			<div class="row">
				<div class="col-s-6 col-m-9">.col-s-9</div>
				<div class="col-s-6 col-m-3">.col-s-3</div>
			</div>

			<div class="row">
				<div class="col-s-10">.col-s-10</div>
				<div class="col-s-2">.col-s-2</div>
			</div>

			<div class="row">
				<div class="col-s-11">.col-s-11</div>
				<div class="col-s-1">.col-s-1</div>
			</div>

			<div class="row">
				<div class="col-s-12">.col-s-12</div>
			</div>

			<h2 class="mod-headline">Nested Grids</h2>
			<div class="row">
				<div class="col-s-3">.col-s-3</div>
				<div class="col-s-9">
					.col-s-9
					<div class="row">
						<div class="col-s-4">.col-s-4</div>
						<div class="col-s-4">.col-s-4</div>
						<div class="col-s-4">.col-s-4</div>
					</div>
					<h3>Nested with .container</h3>
					<div class="container">
						<div class="row">
							<div class="col-s-4">.col-s-4</div>
							<div class="col-s-4">.col-s-4</div>
							<div class="col-s-4">.col-s-4</div>
						</div>
					</div>
				</div>
			</div>

			<h2 class="mod-headline">Modules</h2>

			<!-- start|bra-pb: html -->
			<!-- end|bra-pb: html -->
		</main>

		<footer>
			Footer
		</footer>

		<!-- JS -->
		<!--[if lte IE 8]>
		<script src="/%%public%%/js/libs/vendor/jquery/jquery.min.js"></script>
		<script src="/%%public%%/js/libs/vendor/modernizr/modernizr.custom.min.js"></script>
		<![endif]-->
		<script src="/%%public%%/js/main.js"></script>
	</body>
</html>