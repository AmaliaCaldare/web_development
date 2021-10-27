<?php 
            function celsiusToFahrenheit($number) {
                $value = (float) (($c * 9/5)+32);
                return $value;
            }

            function celsiusToKelvin($number) {
                $value  = (float) ($number+273.15);
                return $value;
            }

            function fahrenheitToCelsius($number) {
                $value = (float) (5/9*($number-32));
                return $value;

            }

            function fahrenheitToKelvin($number) {
                $value = (float) (fahrenheitToCelsius($number) + 273.15);
                return $value;
            }

            function kelvinToCelsius($number) {
                $value = (float) ($number-273.15);
                return $value;
            }

            function kelvinToFahrenheit($number) {
                $value = (float) (9/5*($number - 273.15) + 32);
                return $value;
            }

            if(isset($_POST['button'])) {
                $number = (float) $_POST['number'];
                $from = $_POST['from'];
                $to = $_POST['to'];

                if ($number != 0.00) {
                    // Celsius to fagrenheit and kelvin
                    if ($from == 'C') {
                        $result_from = $number. '*C';

                        if ($to == 'F') {
                            $result_to = celsiusToFahrenheit($number). '*F';
                        }

                        if ($to == 'K') {
                            $result_to = celsiusToKelvin($number). '*K';
                        }
                    }

                    // Fahrenheit to celsius and kelvin
                    if ($from == 'F') {
                        $result_from = $number. '*F';

                        if ($to == 'C') {
                            $result_to = fahrenheitToCelsius($number). '*C';
                        }

                        if ($to == 'K') {
                            $result_to = fahrenheitToKelvin($number). '*K';
                        }
                    }

                    // Kelvin to celsius and fahrenheit
                    if ($from == 'K') {
                        $result_from = $number. '*K';

                        if ($to == 'C') {
                            $result_to = kelvinToCelsius($number. '*C');
                        }

                        if ($to == 'F') {
                            $result_to = kelvinToFahrenheit($number). '*F';
                        }
                    }

                    echo '<style type="text/css">
                    .results {
                        display: block;
                    }
                    </style>';
                }
            }
        ?>