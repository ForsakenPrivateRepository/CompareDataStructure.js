(function() {
    var pathDataProvide = [
        {
            "data": {
                "id": 1
            },
            "structure": {
                "object": {
                    "id": "string"
                }
            },
            "path": "id"
        }
    ];

    QUnit.test( "path", function( assert ) {

        for (var index in pathDataProvide) {
            var provider = pathDataProvide[index];

            var diff = CDS.check(provider.data, provider.structure);

            assert.equal(diff.isEqual(), false);
            assert.equal(diff.getPath(), provider.path);
        }

    });
})();