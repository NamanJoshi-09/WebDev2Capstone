// src/utils/constants.js

export const APP_NAME = 'Trackify';
export const APP_VERSION = '1.0.0';

export const RENEWAL_THRESHOLDS = {
  URGENT: 3,   // days — shown in red
  SOON:   7,   // days — shown in yellow
};

export const ITEMS_PER_PAGE = 8;

export const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';
export const BASE_CURRENCY = 'INR';

export const TOAST_CONFIG = {
  position:         'bottom-right',
  autoClose:        3000,
  hideProgressBar:  false,
  closeOnClick:     true,
  pauseOnHover:     true,
  draggable:        true,
  theme:            'dark',
};

export const SORT_OPTIONS = [
  { value: 'recent',     label: 'Recently Added' },
  { value: 'renewal',    label: 'Renewal Date'   },
  { value: 'price_high', label: 'Price: High → Low' },
  { value: 'price_low',  label: 'Price: Low → High' },
  { value: 'name',       label: 'Name A → Z'     },
];

export const STATUS_OPTIONS = [
  { value: 'All',      label: 'All Status'  },
  { value: 'active',   label: 'Active'      },
  { value: 'inactive', label: 'Inactive'    },
];