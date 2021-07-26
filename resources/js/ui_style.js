// Input Text, Search active
$(document).on('click focusin change', '[class^="inpTxt"] input[type="text"], [class^="inpTxt"] input[type="tel"], [class^="inpTxt"] input[type="password"]', function() {
	var _this = $(this);
	var _val = _this.val();
	var _inpBox = _this.closest('[class^="inpTxt"]');

	if(!_inpBox.hasClass('active')) {
		_inpBox.addClass('active');
	}else if(_inpBox.hasClass('active') && _val == '') {
		_inpBox.removeClass('active');
	}
});

// Input Text Focus Out
$(document).on('focusout', '[class^="inpTxt"] input[type="text"], [class^="inpTxt"] input[type="tel"], [class^="inpTxt"] input[type="password"]', function() {
	var _this = $(this);
	var _val = _this.val();
	var _inpBox = _this.closest('[class^="inpTxt"]');

	if(_val == '') {
		_inpBox.removeClass('active');
	}
});

// Input date active
$(document).on('click focusin change', '[class^="inpTxt"] input[type="date"], [class^="inpTxt"] input[type="month"], [class^="inpTxt"] input[type="time"], [class^="inpTxt"] input[type="datetime-local"]', function() {
	var _this = $(this);
	var _val = _this.val();
	var _inpBox = _this.closest('[class^="inpTxt"]');

	if(!_inpBox.hasClass('active')) {
		_inpBox.addClass('active');
	}else if(_inpBox.hasClass('active') && _val == '') {
		_inpBox.removeClass('active');
	}
});

// Input date Focus Out
$(document).on('focusout', '[class^="inpTxt"] input[type="date"], [class^="inpTxt"] input[type="month"], [class^="inpTxt"] input[type="time"], [class^="inpTxt"] input[type="datetime-local"]', function() {
	var _this = $(this);
	var _val = _this.val();
	var _inpBox = _this.closest('[class^="inpTxt"]');

	if(_val == '') {
		_inpBox.removeClass('active');
	}
});

// Selectbox form active
var createSelectHtml = function(target) {
	var _selectWrap = target;
	var _title = $('.btnSelect em', _selectWrap).text();
	var _optBox = $('.selectOpt', _selectWrap);
	var _optItems = $('li', _optBox);
	var _html = '';

	_html += '<article class="layerWrap floatB" id="selectBundleBox" aria-hidden="true"><div class="layerBox"><header class="header">';
	_html += '<h1 class="layerTitle">' + _title + '</h1>';
	_html += '</header><div class="layerBody"><div class="layerContents"><div class="layerOptionBox"><ul>';

	for(var i=0; i < _optItems.length; i++) {
		_html += '<li><button type="button"><em>' + _optItems.eq(i).text() + '</em></button></li>';
	}

	_html += '</ul></div></div></div><button type="button" class="btnCloseLayer"><em class="blind">닫기</em></button></div></article>';

	return _html;
}
$(document).on('click', '[class^="inpSelect"] .btnSelect', function() {
	var _this = $(this);
	var _selectWrap = _this.closest('[class^="inpSelect"]');
	var _optBox = $('.selectOpt', _selectWrap);
	var _optItems = $('li', _optBox);
	var _viewBox = $('.inp', _selectWrap);
	var _view = $('.inpView', _viewBox);
	var _html = createSelectHtml(_selectWrap);

	$('.wrap').append(_html);

	layerOpenFn('#selectBundleBox', _this);

	$('#selectBundleBox .btnCloseLayer').click(function() {
		$('#selectBundleBox').remove();
	});

	$('#selectBundleBox .layerOptionBox button').click(function() {
		var _optItem = $(this);
		var _optItemIdx = _optItem.parents().index();

		$('body').removeClass('isPop');
		_view.text(_optItem.text());
		_optItems.attr('aria-selected', false).eq(_optItemIdx).attr('aria-selected', true);
		_selectWrap.addClass('active');
		_this.focus();
		$('#selectBundleBox').remove();
	});

});

// Form Phone
$(document).on('click', '[class^="inpPhone"] .btnSelect', function() {
	var _this = $(this);
	var _phoneWrap = _this.closest('[class^="inpPhone"]');
	var _optBox = $('.selectOpt', _phoneWrap);
	var _optItems = $('li', _optBox);
	var _viewBox = $('.PhCode', _phoneWrap);
	var _view = $('.view', _viewBox);
	var _html = createSelectHtml(_phoneWrap);

	$('.wrap').append(_html);

	layerOpenFn('#selectBundleBox', _this);

	$('#selectBundleBox .btnCloseLayer').click(function() {
		$('#selectBundleBox').remove();
	});

	$('#selectBundleBox .layerOptionBox button').click(function() {
		var _optItem = $(this);
		var _optItemIdx = _optItem.parents().index();

		$('body').removeClass('isPop');
		_view.text(_optItem.text());
		_optItems.attr('aria-selected', false).eq(_optItemIdx).attr('aria-selected', true);
		_phoneWrap.addClass('active');
		_this.focus();
		$('#selectBundleBox').remove();
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

// tab box
$(document).on('click', '[class^="tabBox"] .tabInner ul li button, [class^="tabBox"] .tabInner ul li a', function() {
	var _this = $(this);
	var _thisItem = _this.parent();
	var _wrapper = _this.closest('[class^="tabBox"]');
	var _tabCase = $('.tabCase', _wrapper);
	var _tabItems = $('li', _tabCase);

	if(!_thisItem.parent().hasClass('active')) {
		console.log(_tabItems)
		_tabItems.removeClass('active');
		_thisItem.addClass('active');
	}
});

/*********************************************************************************************************
	tab free scroll fnc
*********************************************************************************************************/
var tabFreeScrollFn = function(target, options) {
	var _target = $(target);
	var _swiperWrap = $("> div", _target);
	var _tabCase = $('.tabCase', _swiperWrap);
	var _tabItems = $('li', _tabCase);
	var _tabBtn = $('button, a', _tabItems);
	var _options = options || {};
	var _defaulOpt = {
		initialSlide : 0,
		freeMode : true,
		slidesPerView :'auto',
		spaceBetween : 5
	}
	var _extendOpt = Object.assign(_defaulOpt, _options);
	var _swiperLib = new Swiper(_swiperWrap[0], _extendOpt);

	var _chTabItemFn = function(target) {
		_tabItems.removeClass('active');
		target.addClass('active');
	}

	if(_extendOpt.initialSlide > 0) _chTabItemFn(_tabItems.eq(_extendOpt.initialSlide));

	_tabBtn.on('click', function() {
		var _this = $(this);
		var _thisCase = _this.parent();
		var _thisIdx = _thisCase.index();
		
		if(!_thisCase.hasClass('active')) {
			_chTabItemFn(_thisCase);
			_swiperLib.slideTo(_thisIdx);
		}
	});
}

/*********************************************************************************************************
	layer pop
*********************************************************************************************************/
var layerOpenFn = function(target, clickTarget) {
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
		layerCloseFn(target);
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

var layerCloseFn = function(target) {
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
}