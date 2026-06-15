/* === Country Code Selector with Flags === */
(function() {
  'use strict';

  /* Convert ISO 3166-1 alpha-2 code to flag emoji */
  function flag(code) {
    return String.fromCodePoint(
      ...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65)
    );
  }

  /* All countries: [name, dial code, ISO alpha-2, min digits, max digits] */
  var COUNTRIES = [
    ["Afghanistan", "+93", "AF", 9, 9],
    ["Albania", "+355", "AL", 8, 9],
    ["Algeria", "+213", "DZ", 9, 9],
    ["American Samoa", "+1-684", "AS", 10, 10],
    ["Andorra", "+376", "AD", 6, 9],
    ["Angola", "+244", "AO", 9, 9],
    ["Anguilla", "+1-264", "AI", 10, 10],
    ["Antigua and Barbuda", "+1-268", "AG", 10, 10],
    ["Argentina", "+54", "AR", 10, 11],
    ["Armenia", "+374", "AM", 8, 8],
    ["Aruba", "+297", "AW", 7, 7],
    ["Australia", "+61", "AU", 9, 9],
    ["Austria", "+43", "AT", 10, 13],
    ["Azerbaijan", "+994", "AZ", 9, 9],
    ["Bahamas", "+1-242", "BS", 10, 10],
    ["Bahrain", "+973", "BH", 8, 8],
    ["Bangladesh", "+880", "BD", 10, 10],
    ["Barbados", "+1-246", "BB", 10, 10],
    ["Belarus", "+375", "BY", 9, 9],
    ["Belgium", "+32", "BE", 9, 9],
    ["Belize", "+501", "BZ", 7, 7],
    ["Benin", "+229", "BJ", 8, 8],
    ["Bermuda", "+1-441", "BM", 10, 10],
    ["Bhutan", "+975", "BT", 8, 8],
    ["Bolivia", "+591", "BO", 8, 8],
    ["Bosnia and Herzegovina", "+387", "BA", 8, 8],
    ["Botswana", "+267", "BW", 8, 8],
    ["Brazil", "+55", "BR", 10, 11],
    ["British Virgin Islands", "+1-284", "VG", 10, 10],
    ["Brunei", "+673", "BN", 7, 7],
    ["Bulgaria", "+359", "BG", 8, 9],
    ["Burkina Faso", "+226", "BF", 8, 8],
    ["Burundi", "+257", "BI", 8, 8],
    ["Cambodia", "+855", "KH", 8, 9],
    ["Cameroon", "+237", "CM", 9, 9],
    ["Canada", "+1", "CA", 10, 10],
    ["Cape Verde", "+238", "CV", 7, 7],
    ["Cayman Islands", "+1-345", "KY", 10, 10],
    ["Central African Republic", "+236", "CF", 8, 8],
    ["Chad", "+235", "TD", 8, 8],
    ["Chile", "+56", "CL", 9, 9],
    ["China", "+86", "CN", 11, 11],
    ["Colombia", "+57", "CO", 10, 10],
    ["Comoros", "+269", "KM", 7, 7],
    ["Congo (DRC)", "+243", "CD", 9, 9],
    ["Congo (Republic)", "+242", "CG", 9, 9],
    ["Costa Rica", "+506", "CR", 8, 8],
    ["Croatia", "+385", "HR", 8, 9],
    ["Cuba", "+53", "CU", 8, 8],
    ["Curaçao", "+599", "CW", 7, 7],
    ["Cyprus", "+357", "CY", 8, 8],
    ["Czech Republic", "+420", "CZ", 9, 9],
    ["Denmark", "+45", "DK", 8, 8],
    ["Djibouti", "+253", "DJ", 8, 8],
    ["Dominica", "+1-767", "DM", 10, 10],
    ["Dominican Republic", "+1-809", "DO", 10, 10],
    ["East Timor", "+670", "TL", 8, 8],
    ["Ecuador", "+593", "EC", 9, 9],
    ["Egypt", "+20", "EG", 10, 10],
    ["El Salvador", "+503", "SV", 8, 8],
    ["Equatorial Guinea", "+240", "GQ", 9, 9],
    ["Eritrea", "+291", "ER", 7, 7],
    ["Estonia", "+372", "EE", 7, 8],
    ["Ethiopia", "+251", "ET", 9, 9],
    ["Falkland Islands", "+500", "FK", 5, 5],
    ["Faroe Islands", "+298", "FO", 6, 6],
    ["Fiji", "+679", "FJ", 7, 7],
    ["Finland", "+358", "FI", 9, 10],
    ["France", "+33", "FR", 9, 9],
    ["French Guiana", "+594", "GF", 9, 9],
    ["French Polynesia", "+689", "PF", 8, 8],
    ["Gabon", "+241", "GA", 7, 7],
    ["Gambia", "+220", "GM", 7, 7],
    ["Georgia", "+995", "GE", 9, 9],
    ["Germany", "+49", "DE", 10, 12],
    ["Ghana", "+233", "GH", 9, 9],
    ["Gibraltar", "+350", "GI", 8, 8],
    ["Greece", "+30", "GR", 10, 10],
    ["Greenland", "+299", "GL", 6, 6],
    ["Grenada", "+1-473", "GD", 10, 10],
    ["Guadeloupe", "+590", "GP", 9, 9],
    ["Guam", "+1-671", "GU", 10, 10],
    ["Guatemala", "+502", "GT", 8, 8],
    ["Guinea", "+224", "GN", 9, 9],
    ["Guinea-Bissau", "+245", "GW", 7, 7],
    ["Guyana", "+592", "GY", 7, 7],
    ["Haiti", "+509", "HT", 8, 8],
    ["Honduras", "+504", "HN", 8, 8],
    ["Hong Kong", "+852", "HK", 8, 8],
    ["Hungary", "+36", "HU", 9, 9],
    ["Iceland", "+354", "IS", 7, 7],
    ["India", "+91", "IN", 10, 10],
    ["Indonesia", "+62", "ID", 10, 12],
    ["Iran", "+98", "IR", 10, 10],
    ["Iraq", "+964", "IQ", 10, 10],
    ["Ireland", "+353", "IE", 8, 9],
    ["Israel", "+972", "IL", 9, 9],
    ["Italy", "+39", "IT", 9, 11],
    ["Ivory Coast", "+225", "CI", 10, 10],
    ["Jamaica", "+1-876", "JM", 10, 10],
    ["Japan", "+81", "JP", 10, 11],
    ["Jordan", "+962", "JO", 9, 9],
    ["Kazakhstan", "+7", "KZ", 10, 10],
    ["Kenya", "+254", "KE", 9, 10],
    ["Kiribati", "+686", "KI", 5, 5],
    ["Kosovo", "+383", "XK", 8, 8],
    ["Kuwait", "+965", "KW", 8, 8],
    ["Kyrgyzstan", "+996", "KG", 9, 9],
    ["Laos", "+856", "LA", 8, 9],
    ["Latvia", "+371", "LV", 8, 8],
    ["Lebanon", "+961", "LB", 7, 8],
    ["Lesotho", "+266", "LS", 8, 8],
    ["Liberia", "+231", "LR", 7, 8],
    ["Libya", "+218", "LY", 9, 9],
    ["Liechtenstein", "+423", "LI", 7, 9],
    ["Lithuania", "+370", "LT", 8, 8],
    ["Luxembourg", "+352", "LU", 8, 8],
    ["Macau", "+853", "MO", 8, 8],
    ["Madagascar", "+261", "MG", 9, 9],
    ["Malawi", "+265", "MW", 9, 9],
    ["Malaysia", "+60", "MY", 9, 10],
    ["Maldives", "+960", "MV", 7, 7],
    ["Mali", "+223", "ML", 8, 8],
    ["Malta", "+356", "MT", 8, 8],
    ["Marshall Islands", "+692", "MH", 7, 7],
    ["Martinique", "+596", "MQ", 9, 9],
    ["Mauritania", "+222", "MR", 8, 8],
    ["Mauritius", "+230", "MU", 7, 8],
    ["Mexico", "+52", "MX", 10, 10],
    ["Micronesia", "+691", "FM", 7, 7],
    ["Moldova", "+373", "MD", 8, 8],
    ["Monaco", "+377", "MC", 8, 8],
    ["Mongolia", "+976", "MN", 8, 8],
    ["Montenegro", "+382", "ME", 8, 8],
    ["Montserrat", "+1-664", "MS", 10, 10],
    ["Morocco", "+212", "MA", 9, 9],
    ["Mozambique", "+258", "MZ", 9, 9],
    ["Myanmar", "+95", "MM", 7, 9],
    ["Namibia", "+264", "NA", 9, 9],
    ["Nauru", "+674", "NR", 7, 7],
    ["Nepal", "+977", "NP", 10, 10],
    ["Netherlands", "+31", "NL", 9, 9],
    ["New Caledonia", "+687", "NC", 6, 6],
    ["New Zealand", "+64", "NZ", 8, 9],
    ["Nicaragua", "+505", "NI", 8, 8],
    ["Niger", "+227", "NE", 8, 8],
    ["Nigeria", "+234", "NG", 10, 11],
    ["North Korea", "+850", "KP", 10, 10],
    ["North Macedonia", "+389", "MK", 8, 8],
    ["Northern Mariana Islands", "+1-670", "MP", 10, 10],
    ["Norway", "+47", "NO", 8, 8],
    ["Oman", "+968", "OM", 8, 8],
    ["Pakistan", "+92", "PK", 10, 10],
    ["Palau", "+680", "PW", 7, 7],
    ["Palestine", "+970", "PS", 9, 9],
    ["Panama", "+507", "PA", 8, 8],
    ["Papua New Guinea", "+675", "PG", 7, 7],
    ["Paraguay", "+595", "PY", 9, 9],
    ["Peru", "+51", "PE", 9, 9],
    ["Philippines", "+63", "PH", 10, 10],
    ["Poland", "+48", "PL", 9, 9],
    ["Portugal", "+351", "PT", 9, 9],
    ["Puerto Rico", "+1-787", "PR", 10, 10],
    ["Qatar", "+974", "QA", 8, 8],
    ["Réunion", "+262", "RE", 9, 9],
    ["Romania", "+40", "RO", 9, 9],
    ["Russia", "+7", "RU", 10, 10],
    ["Rwanda", "+250", "RW", 9, 9],
    ["Saint Kitts and Nevis", "+1-869", "KN", 10, 10],
    ["Saint Lucia", "+1-758", "LC", 10, 10],
    ["Saint Vincent and the Grenadines", "+1-784", "VC", 10, 10],
    ["Samoa", "+685", "WS", 7, 7],
    ["San Marino", "+378", "SM", 8, 10],
    ["São Tomé and Príncipe", "+239", "ST", 7, 7],
    ["Saudi Arabia", "+966", "SA", 9, 9],
    ["Senegal", "+221", "SN", 9, 9],
    ["Serbia", "+381", "RS", 8, 9],
    ["Seychelles", "+248", "SC", 7, 7],
    ["Sierra Leone", "+232", "SL", 8, 8],
    ["Singapore", "+65", "SG", 8, 8],
    ["Sint Maarten", "+1-721", "SX", 10, 10],
    ["Slovakia", "+421", "SK", 9, 9],
    ["Slovenia", "+386", "SI", 8, 8],
    ["Solomon Islands", "+677", "SB", 7, 7],
    ["Somalia", "+252", "SO", 8, 8],
    ["South Africa", "+27", "ZA", 9, 9],
    ["South Korea", "+82", "KR", 10, 11],
    ["South Sudan", "+211", "SS", 9, 9],
    ["Spain", "+34", "ES", 9, 9],
    ["Sri Lanka", "+94", "LK", 9, 9],
    ["Sudan", "+249", "SD", 9, 9],
    ["Suriname", "+597", "SR", 6, 7],
    ["Sweden", "+46", "SE", 9, 10],
    ["Switzerland", "+41", "CH", 9, 9],
    ["Syria", "+963", "SY", 9, 9],
    ["Taiwan", "+886", "TW", 9, 9],
    ["Tajikistan", "+992", "TJ", 9, 9],
    ["Tanzania", "+255", "TZ", 9, 9],
    ["Thailand", "+66", "TH", 9, 9],
    ["Togo", "+228", "TG", 8, 8],
    ["Tonga", "+676", "TO", 7, 7],
    ["Trinidad and Tobago", "+1-868", "TT", 10, 10],
    ["Tunisia", "+216", "TN", 8, 8],
    ["Turkey", "+90", "TR", 10, 10],
    ["Turkmenistan", "+993", "TM", 8, 8],
    ["Turks and Caicos Islands", "+1-649", "TC", 10, 10],
    ["Tuvalu", "+688", "TV", 5, 5],
    ["Uganda", "+256", "UG", 9, 9],
    ["Ukraine", "+380", "UA", 9, 9],
    ["United Arab Emirates", "+971", "AE", 9, 9],
    ["United Kingdom", "+44", "GB", 10, 10],
    ["United States", "+1", "US", 10, 10],
    ["Uruguay", "+598", "UY", 8, 8],
    ["US Virgin Islands", "+1-340", "VI", 10, 10],
    ["Uzbekistan", "+998", "UZ", 9, 9],
    ["Vanuatu", "+678", "VU", 7, 7],
    ["Vatican City", "+379", "VA", 8, 10],
    ["Venezuela", "+58", "VE", 10, 10],
    ["Vietnam", "+84", "VN", 9, 10],
    ["Wallis and Futuna", "+681", "WF", 6, 6],
    ["Western Sahara", "+212", "EH", 9, 9],
    ["Yemen", "+967", "YE", 9, 9],
    ["Zambia", "+260", "ZM", 9, 9],
    ["Zimbabwe", "+263", "ZW", 9, 9]
  ];

  /* Build processed list with flags */
  var countries = COUNTRIES.map(function(c) {
    return { name: c[0], dial: c[1], code: c[2], flag: flag(c[2]), minDigits: c[3], maxDigits: c[4] };
  });

  /* Convert dial code to search-friendly form (digits only) */
  function normalizeDial(d) {
    return d.replace(/\D/g, '');
  }

  /* Validate phone number digits against country rules */
  function validatePhone(digits, country) {
    if (!digits || digits.length === 0) return { valid: false, message: 'Phone number is required' };
    var len = digits.length;
    if (len < country.minDigits) return { valid: false, message: 'Too short — ' + country.name + ' requires ' + country.minDigits + ' digits' };
    if (len > country.maxDigits) return { valid: false, message: 'Too long — ' + country.name + ' allows max ' + country.maxDigits + ' digits' };
    return { valid: true, message: '' };
  }

  /**
   * Initialize a phone input group.
   * @param {HTMLElement} group - The .phone-input-group element
   * @param {string} defaultDial - Default dial code (e.g. "+254")
   * @param {string} defaultCountryCode - Default ISO code (e.g. "KE")
   */
  function initCountrySelector(group, defaultDial, defaultCountryCode) {
    var selector = group.querySelector('.country-selector');
    var btn = group.querySelector('.country-selector-btn');
    var dropdown = group.querySelector('.country-dropdown');
    var search = group.querySelector('.country-search');
    var list = group.querySelector('.country-list');
    var hiddenInput = group.querySelector('[data-country-value]');
    var flagDisplay = group.querySelector('[data-country-flag]');
    var dialDisplay = group.querySelector('[data-country-dial]');
    var phoneInput = group.querySelector('.phone-number-input');
    var validationMsg = group.querySelector('.phone-validation-msg');

    var selected = null;

    /* Find country by dial code or ISO code */
    if (defaultCountryCode) {
      selected = countries.find(function(c) { return c.code === defaultCountryCode; });
    }
    if (!selected && defaultDial) {
      selected = countries.find(function(c) { return normalizeDial(c.dial) === normalizeDial(defaultDial); });
    }
    if (!selected) {
      /* Default to Kenya */
      selected = countries.find(function(c) { return c.code === 'KE'; }) || countries[0];
    }

    function selectCountry(c) {
      selected = c;
      hiddenInput.value = c.dial;
      flagDisplay.textContent = c.flag;
      dialDisplay.textContent = c.dial;
      /* Update selected state in list */
      list.querySelectorAll('.country-option').forEach(function(opt) {
        opt.classList.toggle('selected', opt.dataset.code === c.code);
      });
      search.value = '';
      renderList('');
      closeDropdown();
      /* Dispatch change event */
      hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
      /* Re-validate phone number with new country */
      if (phoneInput && phoneInput.value) {
        validatePhoneInput();
      }
    }

    function validatePhoneInput() {
      if (!phoneInput || !validationMsg) return;
      var digits = phoneInput.value.replace(/\D/g, '');
      var result = validatePhone(digits, selected);
      if (digits.length === 0) {
        phoneInput.style.borderColor = '';
        phoneInput.classList.remove('phone-valid', 'phone-invalid');
        validationMsg.textContent = '';
        validationMsg.style.display = 'none';
      } else if (result.valid) {
        phoneInput.style.borderColor = '#10B981';
        phoneInput.classList.add('phone-valid');
        phoneInput.classList.remove('phone-invalid');
        validationMsg.textContent = '✓ Valid ' + selected.name + ' number';
        validationMsg.style.color = '#10B981';
        validationMsg.style.display = 'block';
      } else {
        phoneInput.style.borderColor = '#EF4444';
        phoneInput.classList.add('phone-invalid');
        phoneInput.classList.remove('phone-valid');
        validationMsg.textContent = result.message;
        validationMsg.style.color = '#EF4444';
        validationMsg.style.display = 'block';
      }
    }

    function renderList(query) {
      var q = (query || '').toLowerCase().trim();
      var filtered = q
        ? countries.filter(function(c) {
            return c.name.toLowerCase().indexOf(q) !== -1 ||
                   c.dial.indexOf(q) !== -1 ||
                   c.code.toLowerCase().indexOf(q) !== -1;
          })
        : countries;

      list.innerHTML = '';
      filtered.forEach(function(c) {
        var div = document.createElement('div');
        div.className = 'country-option' + (c.code === selected.code ? ' selected' : '');
        div.dataset.code = c.code;
        div.innerHTML = '<span class="country-option-flag">' + c.flag + '</span>' +
          '<span class="country-option-name">' + c.name + '</span>' +
          '<span class="country-option-dial">' + c.dial + '</span>';
        div.addEventListener('click', function() { selectCountry(c); });
        list.appendChild(div);
      });

      /* Scroll selected into view */
      if (!q) {
        var selEl = list.querySelector('.selected');
        if (selEl) selEl.scrollIntoView({ block: 'nearest' });
      }
    }

    function openDropdown() {
      selector.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      search.value = '';
      renderList('');
      setTimeout(function() { search.focus(); }, 50);
    }

    function closeDropdown() {
      selector.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }

    /* Toggle on button click */
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (selector.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    /* Search filtering */
    search.addEventListener('input', function() {
      renderList(this.value);
    });

    /* Prevent dropdown click from closing */
    dropdown.addEventListener('click', function(e) { e.stopPropagation(); });

    /* Close on outside click */
    document.addEventListener('click', function(e) {
      if (!selector.contains(e.target)) {
        closeDropdown();
      }
    });

    /* Close on Escape */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && selector.classList.contains('open')) {
        closeDropdown();
        btn.focus();
      }
    });

    /* Keyboard navigation in search */
    search.addEventListener('keydown', function(e) {
      var opts = list.querySelectorAll('.country-option');
      var current = list.querySelector('.country-option:focus');
      var idx = Array.from(opts).indexOf(current);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (idx < opts.length - 1) opts[idx + 1].focus();
        else if (opts.length > 0) opts[0].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (idx > 0) opts[idx - 1].focus();
        else if (opts.length > 0) opts[opts.length - 1].focus();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (current) current.click();
      }
    });

    /* Phone input validation on input */
    if (phoneInput) {
      phoneInput.addEventListener('input', function() {
        /* Strip non-digits for validation */
        validatePhoneInput();
      });
      phoneInput.addEventListener('blur', function() {
        validatePhoneInput();
      });
    }

    /* Initial render */
    selectCountry(selected);
  }

  /**
   * Auto-initialize all phone input groups found on the page.
   * Looks for elements with [data-phone-group].
   * The hidden input inside should have data-default-country="XX" and data-default-dial="+NN".
   */
  function autoInit() {
    var groups = document.querySelectorAll('[data-phone-group]');
    groups.forEach(function(group) {
      var hidden = group.querySelector('[data-country-value]');
      if (!hidden) return;
      var defaultCountry = hidden.dataset.defaultCountry || '';
      var defaultDial = hidden.dataset.defaultDial || '';
      initCountrySelector(group, defaultDial, defaultCountry);
    });
  }

  /* Run on DOM ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  /* Expose for manual use */
  window.PhoneCountrySelector = {
    init: initCountrySelector,
    countries: countries,
    autoInit: autoInit
  };
})();