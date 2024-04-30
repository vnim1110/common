$(function() {

// 사용자가 입력칸에 키를 누를 때마다 restrictToNumbers 함수를 호출
document.querySelectorAll("input[type='text']").forEach(input => {
	alert("d");
	input.addEventListener("keypress", restrictToNumbers);
});
	

	
  $("input[format=number]").each(function() {
		$(this).keyup(function() {
			$(this).val($(this).val().replace(/[^0-9]/g,''));
		});


	});
	
	$("input[format=rate2]").each(function() {
		$(this).change(function() {
			$(this).val(gfn_rate_format($(this).val().replace(/[^.0-9]/g,''),2));
		});


	});

	$("input[format=rate1]").each(function() {
		$(this).change(function() {
			$(this).val(gfn_rate_format($(this).val().replace(/[^.0-9]/g,''),1));
		});


	});


	



});



function restrictToNumbers(event) {
	alert("1");
	const keyCode = event.keyCode || event.which; // 크로스 브라우징을 위한 코드
	const key = String.fromCharCode(keyCode);

	// 숫자가 아닌 문자가 입력된 경우 입력을 제한
	if (!/^\d+$/.test(key)) {
			event.preventDefault();
	}
}








/********************************************************************************
 * Function name : fn_isnull
 * Description   : 
 * ------------------------------------------------------------------------------
 * Parameter
 * - vale : 대상문자열
 * - def  : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_isnull(value, def) {
	if (!value)
		return !def ? "" : def;
	else
		return $.trim(value);
}



/********************************************************************************
 * Function name : gfn_unformat_numb
 * Description   : 숫자 포맷을 제거하는 함수
 * ------------------------------------------------------------------------------
 * Parameter
 * - str : 대상문자열
 * - def : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_unformat_numb(str, def) {
	var rtn = gfn_isnull(str, def);
	rtn = rtn.replace(/\,/g,"");
	return rtn;
}

/********************************************************************************
 * Function name : gfn_unformat_date
 * Description   : 날짜 포맷을 제거하는 함수
 * ------------------------------------------------------------------------------
 * Parameter
 * - str : 대상문자열
 * - def : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_unformat_date(str, def) {
	var rtn = gfn_isnull(str, def);
	rtn = rtn.replace(/\-/g,"");
	return rtn;
}



/********************************************************************************
 * Function name : gfn_unformat_datetime
 * Description   : 일시(yyyy-mm-dd hh:mm:ss)  포맷을 제거하는 함수
 * ------------------------------------------------------------------------------
 * Parameter
 * - str : 대상문자열
 * - def : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_unformat_datetime(str, def) {
	var rtn = gfn_isnull(str, def);
	rtn = rtn.replace(/\-/g,"");
	rtn = rtn.replace(/\:/g,"");
	rtn = rtn.replace(/\ /g,"");
	return rtn;
}



/********************************************************************************
 * Function name : gfn_unformat_time
 * Description   : 일시(hh:mm:ss)  포맷을 제거하는 함수
 * ------------------------------------------------------------------------------
 * Parameter
 * - str : 대상문자열
 * - def : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_unformat_time(str, def) {
	var rtn = gfn_isnull(str, def);
	rtn = rtn.replace(/\:/g,"");
	return rtn;
}



/********************************************************************************
 * Function name : gfn_date_format
 * Description   : 날짜 포맷으로 리턴(yyyy-mm-dd)
 * ------------------------------------------------------------------------------
 * Parameter
 * - dateStr: 날짜문자열
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_date_format(dateStr) {
	return gw.date.format(gfn_isnull(gfn_del_format(dateStr)),"yyyyMMdd","yyyy-MM-dd");
}


/********************************************************************************
 * Function name : gfn_dateTime_format
 * Description   : 일시 포맷으로 리턴(yyyy-MM-dd HH:mm:ss)
 * ------------------------------------------------------------------------------
 * Parameter
 * - dateStr: 날짜문자열
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_dateTime_format(dateStr) {
	return gw.date.format(gfn_isnull(gfn_del_format(dateStr)),"yyyyMMddHHmmss","yyyy-MM-dd HH:mm:ss");
}


/********************************************************************************
 * Function name : gfn_month_format
 * Description   : 월 포맷으로 리턴(yyyy-MM)
 * ------------------------------------------------------------------------------
 * Parameter
 * - monthStr : 월문자열
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_month_format(monthStr) {
	monthStr  = gfn_isnull(monthStr).substring(0, 6);
	return gw.date.format(gfn_isnull(gfn_del_format(monthStr)),"yyyyMM","yyyy-MM");
}


/********************************************************************************
 * Function name : gfn_numb_format
 * Description   : 숫자형 포맷으로 리턴(#,###)
 * ------------------------------------------------------------------------------
 * Parameter
 * - numbStr : 숫자형문자열
 * - def     : 기본값
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_numb_format(numbStr, def) {

	numbStr	= gfn_unformat_numb(numbStr, def);

	if(isNaN(numbStr)) numbStr = "0";

	numbStr = gfn_isnull(numbStr, gfn_isnull(def, "0"));

	return numbStr.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


}


/********************************************************************************
 * Function name : gfn_rate_format
 * Description   : rate 포맷으로 리턴(##.##)
 * ------------------------------------------------------------------------------
 * Parameter
 * - floatStr : 숫자형문자열
 * - float    : 소수점 몇자리까지 출력할지
 * - int      : 자연수 몇자리까지 출력할지
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_rate_format(floatStr, float, int) {

    var inputValue = floatStr;
		var naturalNumber;

    if (inputValue.indexOf('.') !== -1) {
        if (typeof(int) === "undefined"){
					naturalNumber = inputValue.split('.')[0];
				}else{
					naturalNumber = inputValue.split('.')[0].slice(0, int);
				} 
        var decimalNumber = inputValue.split('.')[1].slice(0, float);
        inputValue = naturalNumber + '.' + decimalNumber;
    } else {
        inputValue = inputValue.slice(0, int);
    }

	return inputValue;
}





/********************************************************************************
 * Function name : gfn_ssn_format
 * Description   : 주민번호 포맷팅
 * ------------------------------------------------------------------------------
 * Parameter
 * - ssnStr  	: 주민번호
 * - maskYn		: 마스크 처리 여부
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_ssn_format(value, maskYn) {

	var strMask = "******";
	
	if(gfn_isnull(value) == "") return "";

	var strSSN 	= "";
	
	strSSN = value.replace(/\-/g,"");

	if(strSSN.length == 13) {
		if(strSSN.substr(7,6) =="000000") {
			strMask = "000000";
		}

		if(gfn_isnull(maskYn, "Y") == "Y") {
			strSSN = strSSN.substring(0,6) + "-" + strSSN.substring(6,7) + strMask;
		} else {
			strSSN = strSSN.substring(0,6) + "-" + strSSN.substring(6,13);
		}
	}
	
	return strSSN;

}




/********************************************************************************
 * Function name : gfn_bizno_format
 * Description   : 사업자번호 포맷팅
 * ------------------------------------------------------------------------------
 * Parameter
 * - ssnStr  	: 주민번호
 * - maskYn		: 마스크 처리 여부
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_bizno_format(bizNo) {

	var tmpBizNo = gfn_unformat_date(bizNo);

	if(tmpBizNo == "") return "";

	if(tmpBizNo.length == 10) {

		tmpBizNo = tmpBizNo.substring(0,3) + "-" + tmpBizNo.substring(3,5) + "-" + tmpBizNo.substring(5,10);
	}

	return tmpBizNo;
}
/********************************************************************************
 * Function name : gfn_set_check
 * Description   : checkbox & radio 값 설정
 * ------------------------------------------------------------------------------
 * Parameter
 * - objType  : Checkbox/Radio 구분
 * - setValue : 설정값
 * - objName  : Checkbox/Radio ID
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_set_check(objType, setValue, objName) {
	if(objType.toUpperCase() == "R" ) {
	    
	    $("input:radio[name='" + objName + "']").each(function() {
	        
	        var thisVal = $(this).val();    
	        $(this).attr('checked', (thisVal == setValue));
	    });
	} else {
        $("input:checkbox[name='" + objName + "']").prop("checked", (setValue == "Y"));
	}
}


/********************************************************************************
 * Function name : gfn_get_check
 * Description   : checkbox & radio 값 가져오는 함수
 * ------------------------------------------------------------------------------
 * Parameter
 * - objType  : Checkbox/Radio 구분
 * - objName  : Checkbox/Radio ID
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_get_check(objType, objName, defValue) {
	var value = "";

	if(objType.toUpperCase()  == "R") {
	    value = $('input:radio[name="'+objName+'"]:checked').val();


		if(gfn_isnull(value) == "" ) {
			if (gfn_isnull(defValue) != "") {
				value = defValue;
			} else {
				value = "";
			}
		}
	}else{
		if( $("input:checked[name='"+objName+"']").is(':checked') ) {
			value = "Y";
		}else{
			value = "N";
		}
	}
	return value;
}


/********************************************************************************
 * Function name : gfn_add_date
 * Description   : 특정 날짜에 년, 월, 일을 더한 값
 * ------------------------------------------------------------------------------
 * Parameter
 * - strDate    : 날짜문자열
 * - strFlag    : 날짜를 더할 대상 "Y":년, "M":월, "D":일
 * - intAdd     : 추가할 년, 월, 일 수
 * - rtnFormat  : 변환 날짜 형식
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 ********************************************************************************/
function gfn_add_date(strDate, strFlag, intAdd, rtnFormat) {
   
    var rtnFormat   = gfn_isnull(rtnFormat, "yyyyMMdd");
    
    var dateDt; 
    
    if(strDate == "") {

    	var dateDt	= new Date();
    } else {

        var dateStr = gfn_unformat_date(strDate);
        
        var year    = dateStr.substring(0,4);
        var month   = Number(dateStr.substring(4,6)) - 1;
        var day     = dateStr.substring(6,9);

        dateDt 		= new Date(year, month, day);
	
    }    
    
    switch(strFlag) {
    case "Y":
        dateDt.setFullYear(dateDt.getFullYear() + intAdd);    
        break;
    case "M":
        dateDt.setMonth(dateDt.getMonth() + intAdd);
        break;
    case "D":
        dateDt.setDate(dateDt.getDate() + intAdd);
        break;
    }
    
    return dateDt.toString(rtnFormat);
}



/***************************************************************************
 * Function name : gfn_phone_format
 * Description   : 휴대폰 전화 표시형식
 * ------------------------------------------------------------------------------
 * Parameter
 * - pPhone  : 휴대폰번호
 * ------------------------------------------------------------------------------
 * 00000000 | 홍길동 | 신규
 **************************************************************************/
function gfn_phone_format(pPhone) {
	
	var strPhoneNo	= gfn_isnull(pPhone);
	
	var rtnValue = "";
	
	if (strPhoneNo.length == 11) {
		rtnValue = strPhoneNo.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
	} else if (strPhoneNo.length == 8) {
		rtnValue = strPhoneNo.replace(/(\d{4})(\d{4})/, '$1-$2');
	} else {
		if(strPhoneNo.indexOf('02')==0) {
			rtnValue = strPhoneNo.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3');
        }else{
            rtnValue = strPhoneNo.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
        }
	}
	
	return rtnValue;
}



