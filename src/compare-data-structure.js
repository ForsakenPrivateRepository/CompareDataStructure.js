(function(window) {

    var private = {

        compare: function(data, structure) {

            if (typeof structure === "string") {
                return structure.split('|').indexOf(typeof data) !== -1;
            }

        }

    };

    window.CDS = {

        check: function(data, structure, custom) {
            return private.compare(data, structure);
        }
    }

})(window);