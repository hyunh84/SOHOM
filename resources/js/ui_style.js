// Input Text, Search active
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

//Selectbox form active
var createSelectHtml = function(target) {
	var _selectWrap = target;
	var _select = $('select', _selectWrap);
	var _selectTitle = _select.data('select-title');
	var _opt = $('option', _select);
	var _html = '';

	_html += '<article class="layerWrap floatB" id="selectBundleBox" aria-hidden="true"><div class="layerBox"><header class="header">';
	_html += '<h1 class="layerTitle">' + _selectTitle + '</h1>';
	_html += '</header><div class="layerBody"><div class="layerContents"><div class="layerOptionBox"><ul>';

	for(var i=0; i < _opt.length; i++) {
		_html += '<li><button type="button"><em>' + _opt.eq(i).text() + '</em></button></li>';
	}

	_html += '</ul></div></div></div><button type="button" class="btnCloseLayer"><em class="blind">닫기</em></button></div></article>';

	return _html;
}
$(document).on('click', '.inpSelect .inpTit, .inpSelect select', function() {
	var _this = $(this);
	var _selectWrap = _this.closest('.inpSelect');
	var _selectBox = $('.selectbox', _selectWrap);
	var _select = $('select', _selectBox);
	var _opt = $('option', _select);
	var _html = createSelectHtml(_selectWrap);

	$('.wrap').append(_html);
	layerOpenFn('#selectBundleBox', _this, function() {
		$('#selectBundleBox').remove();
	});

	_select.off('click').on('click', function(e) {e.preventDefault()});

	$('#selectBundleBox .layerOptionBox button').click(function() {
		var _optItem = $(this);
		var _optItemIdx = _optItem.closest('li').index();
		_opt.prop('selected', false);
		_opt.eq(_optItemIdx).prop('selected', true);

		if(_selectBox.is(':hidden')) {
			_this.attr('aria-expanded', 'true');
			_selectBox.attr('aria-hidden', 'false');
			_selectWrap.addClass('active');
			_select.focus();
		}

		layerCloseFn('#selectBundleBox', function() {
			_select.focus();
			$('#selectBundleBox').remove();
		});
	});
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

/*********************************************************************************************************
	layer pop
*********************************************************************************************************/
var layerOpenFn = function(target, clickTarget, closeCallback) {
	var _clickTarget = clickTarget;
	var _layerWrap = $(target);
	var _layerBox = $('.layerBox', _layerWrap).attr('tabindex', 0);
	var _btnCloseLayer = $('.btnCloseLayer', _layerBox);
	var _accessible01;
	var _accessible02;

	_layerWrap.data('click-target', clickTarget);
	_layerWrap.attr('aria-hidden', false);
	_layerWrap.prepend('<div class="AccessibilityHtml1" tabindex="0" aria-hidden="true"></div>');
	_layerWrap.prepend('<div class="layerMask" aria-hidden="true"></div>');
	_layerWrap.append('<div class="AccessibilityHtml2" tabindex="0" aria-hidden="true"></div>');
	_accessible01 = $('.AccessibilityHtml1', _layerWrap);
	_accessible02 = $('.AccessibilityHtml2', _layerWrap);

	$('body').addClass('isPop');
	_layerWrap.show();
	if(_layerWrap.hasClass('floatB')) _layerBox.slideDown();
	_layerBox.focus();

	_btnCloseLayer.off('click').on('click', function() {
		layerCloseFn(target, closeCallback);
	});
	_accessible01.off('focusin').on('focusin', function() {
		console.log(_btnCloseLayer.is(':hidden') || !_btnCloseLayer.length);
		if(_btnCloseLayer.is(':hidden') || !_btnCloseLayer.length) {
			_layerBox.focus();
		}else{
			_btnCloseLayer.focus();
		}
	});
	_accessible02.off('focusin').on('focusin', function() {
		_layerBox.focus();
	});
}

var layerCloseFn = function(target, callback) {
	var _layerWrap = $(target);
	var _layerBox = $('.layerBox', _layerWrap);
	var _clickTarget = _layerWrap.data('click-target');
	var _accessible01 = $('.AccessibilityHtml1', _layerWrap);
	var _accessible02 = $('.AccessibilityHtml2', _layerWrap);
	var _layerMask = $('.layerMask', _layerWrap);

	$('body').removeClass('isPop');
	_accessible01.remove();
	_accessible02.remove();
	_layerMask.remove();
	_layerWrap.attr('aria-hidden', true);
	_layerWrap.hide();
	if(_layerWrap.hasClass('floatB')) _layerBox.hide();
	_layerBox.removeAttr('tabindex');
	$(_clickTarget).focus();
	if(callback) callback();
}