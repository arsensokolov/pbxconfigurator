<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="utf8">
	<title>{title} {suffix}</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	
	<!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
	<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	
	<!-- Styles -->
	<link href="css/bootstrap.css" rel="stylesheet">
	<link href="css/bootstrap-responsive.css" rel="stylesheet">
	<link href="css/application.css" rel="stylesheet">
</head>
<body>
<div class="container">
	<div class="row">
		<div class="span12">
			<form class="form-horizontal" action="test.php" method="post" id="didi">
				<div class="control-group">
					<label class="control-label" for="fff">ХУЙ</label>
					<div class="controls">
						<select id="fff" name="fff" size="5" multiple>
							<option value="1">1111</option>
							<option value="2">2222</option>
							<option value="3">3333</option>
							<option value="4">4444</option>
							<option value="5">5555</option>
						</select>
						<span class="help-block"></span>
					</div>
				</div>
				<div class="form-actions">
					<button type="button" class="btn btn-primary" id="bbb" name="bbb">ПИЗДА</button>
				</div>
			</form>
		</div>
	</div>
</div>

<!-- Scripts -->
<script src="js/jquery.js"></script>
<script src="js/jquery.form.js"></script>
<script src="js/bootstrap-transition.js"></script>
<script src="js/bootstrap-alert.js"></script>
<script src="js/bootstrap-modal.js"></script>
<script src="js/bootstrap-dropdown.js"></script>
<script src="js/bootstrap-scrollspy.js"></script>
<script src="js/bootstrap-tab.js"></script>
<script src="js/bootstrap-tooltip.js"></script>
<script src="js/bootstrap-popover.js"></script>
<script src="js/bootstrap-button.js"></script>
<script src="js/bootstrap-collapse.js"></script>
<script src="js/bootstrap-carousel.js"></script>
<script src="js/bootstrap-affix.js"></script>
<script src="js/bootstrap-typeahead.js"></script>
<script src="js/autoNumeric.js"></script>
<script src="js/application.js"></script>
<script>
$('#fff').change(function () {
	var fff = $(this).val() || []
	$('.help-block').empty().html(fff.join(','))
})
$('#bbb').click(function() {
	var fff = $('#fff').val() || []
	var f1 = fff.join(',')
	if (f1 == "1,3,5") {
		$('#fff').val(["2", "4"])
	} else {
		$('#fff').val(["1", "3", "5"])
	}
})
</script>
</body>
</html>