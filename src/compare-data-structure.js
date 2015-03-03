(function(window) {

    var DiffMessage = {
        type: function(given, types) {
            return "given: '" + given + "' instead of: '" + types + "'";
        },

        set: function(data, set) {
            return "value: '" + data + "' out of set: '" + set.join() + "'";
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

            } else if (structure["set"]) {

                if (structure["set"].indexOf(data) === -1) {
                    return new Result(false, DiffMessage.set(data, structure["set"]))
                }
            }

        },

        compare: function(data, structure) {

            if (typeof structure === "string") {

                var dataType = typeof data;

                if (structure.split('|').indexOf(dataType) === -1) {
                    return new Result(false, DiffMessage.type(dataType, structure));
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