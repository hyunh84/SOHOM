// Input Text active
$(document).on('click', '.inpTxt .inpTit, .inpSrch .inpTit ', function() {
	var _this = $(this);
	var _inpBox = _this.parent();
	var _inp = $('.inp', _inpBox);
	var _inpUnit = $('input[type="text"], input[type="tel"], input[type="password"]', _inp);
	

	if(_inp.is(':hidden')) {
		_this.attr('aria-expanded', 'true');
		_inp.attr('aria-hidden', 'false');
		_inpBox.addClass('active');
		_inpUnit.focus();
	}
});

// Input Text Focus Out
$(document).on('focusout', '.inpTxt input[type="text"], .inpTxt input[type="tel"], .inpTxt input[type="password"], .inpSrch input[type="text"]', function() {
	var _this = $(this);
	var _val = _this.val();
	var _inpBox = _this.closest('.inpTxt, .inpSrch');
	var _inpTit = $('.inpTit', _inpBox);
	var _inp = _this.parent();

	

	if(_val == '') {
		_inpTit.attr('aria-expanded', 'false');
		_inp.attr('aria-hidden', 'true');
		_inpBox.removeClass('active');
	}
});

// Button Switch 
$(document).on('click', '[class^="btnSwitch"]', function() {
	var _this = $(this);

	if(_this.hasClass('checked')) {
		_this.removeClass('checked');
		$('em', _this).text('미선택');
	}else{
		_this.addClass('checked');
		$('em', _this).text('선택');
	}
});

// Button Check Type
$(document).on('click', '[class^="btnChkCase"] button', function() {
	var _this = $(this);
	var _wrapper = _this.closest('.btnChkCase');

	if(!_this.hasClass('active')) {
		$('button', _wrapper).removeClass('active');
		_this.addClass('active');
	}

	
});