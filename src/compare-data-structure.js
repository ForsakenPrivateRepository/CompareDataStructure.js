(function(window) {

    var ErrorMessage = {
        type: function(given, types) {
            return "given: '" + given + "' instead of: '" + types + "'";
        }
    };

    function Result(equal, message) {

        this.isEqual = function() {
            return equal;
        };

        this.getMessage = function () {
            return message;
        };

    }

    var private = {

        structure: function(data, structure) {
            var result;

            if (structure["object"]) {

                for (var index in structure["object"]) {
                    if (result = this.compare(data[index], structure["object"][index])) {
                        return result;
                    }
                }

            } else if (structure["array"]) {

                if (typeof structure["array"] === "string") {

                    for (var index in data) {
                        if (result = this.compare(data[index], structure["array"])) {
                            return result;
                        }

                    }
                }
            }

        },

        compare: function(data, structure) {

            if (typeof structure === "string") {

                var dataType = typeof data;

                if (structure.split('|').indexOf(dataType) === -1) {
                    return new Result(false, ErrorMessage.type(dataType, structure));
                }

            } else if (typeof structure === "object") {
                return this.structure(data, structure);
            }
        }

    };

    window.CDS = {

        /**
         * @param data
         * @param structure
         * @param custom
         * @returns Result
         */
        check: function(data, structure, custom) {
            var result = private.compare(data, structure);

            return result || new Result(true);
        }
    }

})(window);