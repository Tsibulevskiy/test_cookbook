import { extend } from "vee-validate";
import { required, alpha_dash, confirmed, numeric, digits, regex, email, min } from "vee-validate/dist/rules";

extend('required', {...required, message: "This field is required"});
extend('alpha_dash', {...alpha_dash, message: "The field may contain alpha-numeric characters as well as dashes and underscores"});
extend('min', {...confirmed, message: "The field must 6"});
extend('numeric', {...numeric, message: "The field may only contain numeric characters"});
extend('email', {...digits, message: "The field must be correct"});
extend('regex', {...regex, message: "The field no correct"});

