import 'bootcss';
import 'jquery';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './../css/style.css';
import './../css/login.css';

var inst = $('[data-remodal-id=modal]').remodal();
inst.open();