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

    var container = {
        custom: {},
        temporary: {},
        set: function(custom) {
            /**
             * TODO: need merge custom with existed to temporary
             */
            this.temporary = custom;
        },
        get: function(key) {
            return this.temporary && this.temporary[key];
        }
    };

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

        types: function(data, structure) {
            var dataType = typeof data;

            var types = structure.split('|');

            if (types.indexOf(dataType) !== -1) return false;

            var intersect = [];

            for (var index in types) {
                var custom = container.get(types[index]);

                if (custom) {
                    intersect.push(custom);
                }
            }

            if (intersect.length) {
                for (var index in intersect) {
                    if (this.compare(data, intersect[index])) continue;

                    return false;
                }
            }

            return new Result(false, DiffMessage.type(dataType, structure));

        },

        compare: function(data, structure) {

            if (typeof structure === "string") {
                return this.types(data, structure);
            } else if (typeof structure === "object") {
                return this.structure(data, structure);
            }
        },

        process: function(data, structure, custom) {
            container.set(custom);

            return this.compare(data, structure)
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
            var result = private.process(data, structure, custom);

            return result || new Result(true);
        }
    }

})(window);